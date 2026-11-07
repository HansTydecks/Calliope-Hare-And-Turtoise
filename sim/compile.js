/* =============================================
   GARTEN-SIMULATOR — compile.js
   MakeCode-TypeScript → ausführbares, asynchrones JavaScript.

   1. Typen entfernen (sucrase)
   2. Mit acorn parsen und direkt im Text einfügen:
      - jede Funktion wird `async`
      - jeder Aufruf wird `(await …)`  → basic.pause blockiert wirklich
      - Array-Methoden mit Rückruf → __arr.forEach(liste, …) usw.
      - jede Schleife bekommt `await __tick();`
        (damit Endlosschleifen den Browser nicht einfrieren)
   ============================================= */

(function (root) {
  'use strict';

  const CALLBACK_METHODS = new Set(['forEach', 'map', 'filter', 'some', 'every', 'find', 'findIndex', 'reduce', 'sort']);
  const LOOPS = new Set(['ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement']);
  const FUNCS = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression']);

  class CompileError extends Error {
    constructor(message, line) { super(message); this.line = line; }
  }

  function lineOf(src, pos) {
    let n = 1;
    for (let i = 0; i < pos && i < src.length; i++) if (src.charCodeAt(i) === 10) n++;
    return n;
  }

  function compile(tsSource) {
    const T = root.TsTools;
    let js;
    try {
      js = T.stripTypes(tsSource);
    } catch (e) {
      const m = /\((\d+):(\d+)\)/.exec(e.message);
      throw new CompileError(e.message, m ? +m[1] : undefined);
    }

    let ast;
    try {
      ast = T.acorn.parse(js, {
        ecmaVersion: 'latest',
        sourceType: 'script',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        locations: false
      });
    } catch (e) {
      throw new CompileError(e.message, e.loc ? e.loc.line : undefined);
    }

    // Einfügungen: { pos, text, close:bool, size } ; Ersetzungen: { start, end, text }
    const ins = [];
    const reps = [];
    const open = (pos, text, size) => ins.push({ pos, text, close: false, size });
    const close = (pos, text, size) => ins.push({ pos, text, close: true, size });

    function visit(node, asyncCtx, parent) {
      if (!node || typeof node.type !== 'string') return;

      // ---- Funktionen ----
      if (FUNCS.has(node.type)) {
        const isMethodLike = parent && ((parent.type === 'MethodDefinition') || (parent.type === 'Property' && (parent.method || parent.kind !== 'init')));
        let canAsync = !node.generator;
        if (isMethodLike) {
          const kind = parent.kind;
          if (kind === 'get' || kind === 'set' || kind === 'constructor') canAsync = false;
          else if (canAsync && !node.async) {
            // async vor den Schlüssel setzen
            const kpos = parent.computed ? findBracket(js, parent.key.start) : parent.key.start;
            open(kpos, 'async ', 1e9);
          }
        } else if (canAsync && !node.async) {
          open(node.start, 'async ', node.end - node.start + 0.5);
        }
        (node.params || []).forEach(p => visit(p, false, node));
        visit(node.body, canAsync || node.async, node);
        return;
      }

      // ---- Schleifen ----
      if (LOOPS.has(node.type) && asyncCtx) {
        const body = node.body;
        if (body.type === 'BlockStatement') {
          open(body.start + 1, 'await __tick();', 1e9);
        } else {
          open(body.start, '{await __tick();', 1e12);
          close(body.end, '}', 1e12);
        }
      }

      // ---- Einzelne Anweisung nach if/else → in {} setzen ----
      if (node.type === 'IfStatement') {
        [node.consequent, node.alternate].forEach(b => {
          if (b && b.type !== 'BlockStatement' && b.type !== 'IfStatement') {
            open(b.start, '{', 1e12);
            close(b.end, '}', 1e12);
          }
        });
      }

      // ---- „;" davor, damit „(await …)" nicht an die Zeile davor gehängt wird ----
      if (node.type === 'ExpressionStatement') open(node.start, ';', 1e11);

      // ---- Aufrufe ----
      if (node.type === 'CallExpression' && asyncCtx && node.callee.type !== 'Super' && !node.optional && !hasOptionalChain(node.callee)) {
        const size = node.end - node.start;
        open(node.start, '(await ', size);
        close(node.end, ')', size);

        const c = node.callee;
        if (c.type === 'MemberExpression' && !c.computed && c.property.type === 'Identifier' &&
            CALLBACK_METHODS.has(c.property.name) && node.arguments.length &&
            FUNCS.has(node.arguments[0].type)) {
          open(c.object.start, `__arr.${c.property.name}(`, size - 0.25);
          reps.push({ start: c.object.end, end: node.arguments[0].start, text: ', ' });
        }
      }

      for (const key in node) {
        if (key === 'type' || key === 'start' || key === 'end') continue;
        const v = node[key];
        if (Array.isArray(v)) v.forEach(ch => ch && typeof ch.type === 'string' && visit(ch, asyncCtx, node));
        else if (v && typeof v.type === 'string') visit(v, asyncCtx, node);
      }
    }

    visit(ast, true, null);

    // ---- Text zusammensetzen ----
    // gleiche Position: erst schließen (innen → außen), dann öffnen (außen → innen)
    ins.sort((a, b) => {
      if (a.pos !== b.pos) return a.pos - b.pos;
      if (a.close !== b.close) return a.close ? -1 : 1;
      return a.close ? a.size - b.size : b.size - a.size;
    });
    reps.sort((a, b) => a.start - b.start);

    let out = '';
    let i = 0, ii = 0, ri = 0;
    while (i <= js.length) {
      // Schließende Einfügungen an Position i
      while (ii < ins.length && ins[ii].pos <= i) out += ins[ii++].text;
      if (ri < reps.length && reps[ri].start === i) {
        out += reps[ri].text;
        i = reps[ri].end;
        ri++;
        continue;
      }
      if (i < js.length) out += js[i];
      i++;
    }
    return out;
  }

  function hasOptionalChain(n) {
    while (n) {
      if (n.optional) return true;
      if (n.type === 'ChainExpression') return true;
      n = n.object || n.callee;
    }
    return false;
  }

  function findBracket(src, pos) {
    let p = pos;
    while (p > 0 && src[p] !== '[') p--;
    return p;
  }

  const api = { compile, CompileError, lineOf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SimCompile = api;
})(typeof self !== 'undefined' ? self : globalThis);
