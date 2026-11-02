/* =============================================
   HASE & SCHILDKRÖTE — Ablaufdiagramme (Zustandsdiagramme)
   diagram.js

   Zeichnet kleine Ablaufdiagramme als SVG im Stil der
   Calliope-Unterrichtsdiagramme:
   - Ereignis (beim Start, dauerhaft, wenn …) → türkise Ellipse
   - Bedingung → Raute mit magentafarbener Pille, „dann" nach rechts
   - Befehle → farbige Rechtecke (Farbe nach Block-Art)
   - dauerhaft → Rücklauf-Linie links außen

   Datenformat:
   [
     { event: 'beim Start', body: [ { a: 'zeige LEDs ♥', t: 'show' } ] },
     { event: 'dauerhaft', loop: true, body: [
         { if: 'Lichtstärke > 50', then: [ … ], else: [ … ] }
     ] }
   ]
   Block-Arten (t): show | wait | var | motor | sound | radio
   ============================================= */

(function () {
  'use strict';

  const COLORS = {
    event:   { fill: '#3CC8CC', text: '#000' },
    diamond: { fill: '#0E9E9A', text: '#fff' },
    pill:    { fill: '#C8106E', text: '#fff' },
    show:    { fill: '#4FC9CC', text: '#000' },
    wait:    { fill: '#FF9F00', text: '#fff' },
    var:     { fill: '#A50000', text: '#fff' },
    motor:   { fill: '#2E5DA8', text: '#fff' },
    sound:   { fill: '#7B3FA0', text: '#fff' },
    radio:   { fill: '#5B6770', text: '#fff' }
  };

  const FONT = 12;          // px
  const CHAR_W = 6.6;       // geschätzte Zeichenbreite
  const ACT_H = 26;         // Höhe Befehl
  const DIA_H = 64;         // Höhe Raute
  const EVT_H = 34;         // Höhe Ellipse
  const GAP_V = 22;         // vertikaler Abstand (Pfeil)
  const GAP_H = 40;         // Abstand Raute → dann-Zweig
  const LOOP_M = 20;        // Abstand Rücklauf-Linie
  const COL_GAP = 36;       // Abstand zwischen Ereignis-Spalten
  const PAD = 14;           // Rand

  let uid = 0;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function textW(s) {
    return String(s).length * CHAR_W;
  }

  /* ---------- Layout ---------- */

  // Liefert für eine Folge von Knoten: { left, right, h, firstH, draw(x, y, out) }
  function layoutSeq(nodes) {
    nodes = nodes || [];
    // Alle Befehle einer Spalte bekommen dieselbe Breite (wie in der Vorlage)
    let actW = 0;
    nodes.forEach(n => { if (!n.if) actW = Math.max(actW, textW(n.a) + 26); });
    actW = Math.max(actW, 150);

    const items = nodes.map(n => n.if ? layoutIf(n) : layoutAct(n, actW));

    let h = 0, left = 0, right = 0;
    items.forEach((it, i) => {
      h += it.h + (i > 0 ? GAP_V : 0);
      left = Math.max(left, it.left);
      right = Math.max(right, it.right);
    });

    return {
      left, right, h,
      firstH: items.length ? items[0].firstH : 0,
      firstHalfW: items.length ? items[0].halfW : 0,
      draw(x, y, out) {
        let cy = y;
        items.forEach((it, i) => {
          if (i > 0) {
            arrow(out, x, cy, x, cy + GAP_V);
            cy += GAP_V;
          }
          it.draw(x, cy, out);
          cy += it.h;
        });
      }
    };
  }

  function layoutAct(n, w) {
    const c = COLORS[n.t] || COLORS.show;
    return {
      left: w / 2, right: w / 2, h: ACT_H, firstH: ACT_H, halfW: w / 2,
      draw(x, y, out) {
        out.push(`<rect x="${x - w / 2}" y="${y}" width="${w}" height="${ACT_H}" fill="${c.fill}" stroke="#000" stroke-width="1"/>`);
        out.push(`<text x="${x}" y="${y + ACT_H / 2 + 4}" text-anchor="middle" fill="${c.text}">${esc(n.a)}</text>`);
      }
    };
  }

  function layoutIf(n) {
    const pillW = textW(n.if) + 22;
    const dw = pillW * 1.45 + 10;
    const thenL = layoutSeq(n.then);
    const elseL = n.else && n.else.length ? layoutSeq(n.else) : null;

    const elseRight = elseL ? elseL.right : 0;
    const thenCx = Math.max(dw / 2, elseRight) + GAP_H + thenL.left;
    const thenTop = DIA_H / 2 - thenL.firstH / 2;
    const elseTop = DIA_H + GAP_V;
    const thenBottom = thenTop + thenL.h;
    const elseBottom = elseL ? elseTop + elseL.h : DIA_H;
    const mergeY = Math.max(thenBottom, elseBottom) + GAP_V;

    return {
      left: Math.max(dw / 2, elseL ? elseL.left : 0),
      right: thenCx + thenL.right,
      h: mergeY,
      firstH: DIA_H,
      halfW: dw / 2,
      draw(x, y, out) {
        const cy = y + DIA_H / 2;
        // Raute
        out.push(`<polygon points="${x},${y} ${x + dw / 2},${cy} ${x},${y + DIA_H} ${x - dw / 2},${cy}" fill="${COLORS.diamond.fill}" stroke="#000" stroke-width="1"/>`);
        // Pille
        out.push(`<rect x="${x - pillW / 2}" y="${cy - 10}" width="${pillW}" height="20" rx="10" ry="10" fill="${COLORS.pill.fill}"/>`);
        out.push(`<text x="${x}" y="${cy + 4}" text-anchor="middle" fill="${COLORS.pill.text}">${esc(n.if)}</text>`);

        // dann-Zweig (rechts)
        const tx = x + thenCx;
        arrow(out, x + dw / 2, cy, tx - thenL.firstHalfW, cy);
        out.push(`<text x="${x + dw / 2 + 4}" y="${cy - 6}" fill="#000" font-size="${FONT - 1}">${esc(labels.then)}</text>`);
        thenL.draw(tx, y + thenTop, out);
        // dann-Zweig → Zusammenführung
        line(out, [[tx, y + thenBottom], [tx, y + mergeY], [x, y + mergeY]]);

        // sonst-Zweig (unten)
        if (elseL) {
          arrow(out, x, y + DIA_H, x, y + elseTop);
          out.push(`<text x="${x + 6}" y="${y + DIA_H + 14}" fill="#000" font-size="${FONT - 1}">${esc(labels.else)}</text>`);
          elseL.draw(x, y + elseTop, out);
          line(out, [[x, y + elseBottom], [x, y + mergeY]]);
        } else {
          line(out, [[x, y + DIA_H], [x, y + mergeY]]);
        }
      }
    };
  }

  function layoutEvent(ev) {
    const seq = layoutSeq(ev.body);
    const ew = Math.max(textW(ev.event) + 36, 110);
    const loopX = ev.loop ? seq.left + LOOP_M : 0;
    const left = Math.max(ew / 2, seq.left, loopX);
    const right = Math.max(ew / 2, seq.right);
    const seqTop = EVT_H + GAP_V + (ev.loop ? 10 : 0);
    const h = seqTop + seq.h + (ev.loop ? 16 : 0);

    return {
      left, right, h,
      draw(x, y, out) {
        const c = COLORS.event;
        out.push(`<ellipse cx="${x}" cy="${y + EVT_H / 2}" rx="${ew / 2}" ry="${EVT_H / 2}" fill="${c.fill}" stroke="#000" stroke-width="1"/>`);
        out.push(`<text x="${x}" y="${y + EVT_H / 2 + 4}" text-anchor="middle" fill="${c.text}">${esc(ev.event)}</text>`);
        arrow(out, x, y + EVT_H, x, y + seqTop);
        seq.draw(x, y + seqTop, out);
        if (ev.loop) {
          const bottom = y + seqTop + seq.h;
          const joinY = y + EVT_H + GAP_V / 2 + 2;
          line(out, [[x, bottom], [x, bottom + 16], [x - loopX, bottom + 16], [x - loopX, joinY], [x, joinY]]);
        }
      }
    };
  }

  /* ---------- SVG-Helfer ---------- */

  let markerId = '';
  let labels = { then: 'dann', else: 'sonst' };

  function arrow(out, x1, y1, x2, y2) {
    out.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000" stroke-width="1.2" marker-end="url(#${markerId})"/>`);
  }

  function line(out, pts) {
    out.push(`<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="#000" stroke-width="1.2"/>`);
  }

  /* ---------- Öffentliche Funktion ---------- */

  // opts: { label: 'Bildbeschreibung', then: 'dann', else: 'sonst' }
  function renderDiagram(spec, opts) {
    if (!spec || !spec.length) return '';
    opts = typeof opts === 'string' ? { label: opts } : (opts || {});
    labels = { then: opts.then || 'dann', else: opts.else || 'sonst' };
    const ariaLabel = opts.label || '';
    markerId = 'arrowhead-' + (++uid);

    const cols = spec.map(layoutEvent);
    let width = PAD;
    const xs = cols.map(c => {
      const x = width + c.left;
      width += c.left + c.right + COL_GAP;
      return x;
    });
    width = width - COL_GAP + PAD;
    const height = Math.max(...cols.map(c => c.h)) + PAD * 2;

    const out = [];
    cols.forEach((c, i) => c.draw(xs[i], PAD, out));

    return `<svg class="flow-diagram" viewBox="0 0 ${Math.ceil(width)} ${Math.ceil(height)}" width="${Math.ceil(width)}" style="min-width:${Math.min(Math.ceil(width), 520)}px" role="img" aria-label="${esc(ariaLabel || '')}" xmlns="http://www.w3.org/2000/svg" font-family="Arial, Helvetica, sans-serif" font-size="${FONT}">
<defs><marker id="${markerId}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#000"/></marker></defs>
${out.join('\n')}
</svg>`;
  }

  window.renderDiagram = renderDiagram;
})();
