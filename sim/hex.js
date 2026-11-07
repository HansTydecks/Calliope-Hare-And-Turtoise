/* =============================================
   GARTEN-SIMULATOR — hex.js
   Liest eine MakeCode-.hex-Datei und holt den eingebetteten
   Quelltext (main.ts) heraus. Format wie in MakeCode
   (pxtlib/cpp.ts → extractSource / unpackSourceFromHexAsync).
   ============================================= */

(function (root) {
  'use strict';

  const MAGIC = [0x41, 0x14, 0x0E, 0x2F, 0xB8, 0x2F, 0xA2, 0xBB];

  class HexError extends Error {
    constructor(code, detail) { super(detail || code); this.code = code; }
  }

  // Alle Daten-Datensätze (Typ 00 und 0D/0E bei Universal-Hex) als Byte-Strom
  function hexToBytes(text) {
    const out = [];
    const lines = text.split(/\r?\n/);
    for (const ln of lines) {
      if (ln.length < 11 || ln[0] !== ':') continue;
      const len = parseInt(ln.substr(1, 2), 16);
      const type = parseInt(ln.substr(7, 2), 16);
      if (type !== 0x00 && type !== 0x0D && type !== 0x0E) continue;
      for (let i = 0; i < len; i++) {
        out.push(parseInt(ln.substr(9 + i * 2, 2), 16));
      }
    }
    return Uint8Array.from(out);
  }

  function findEmbed(bin) {
    outer: for (let p = 0; p + 16 <= bin.length; p++) {
      if (bin[p] !== MAGIC[0]) continue;
      for (let i = 1; i < MAGIC.length; i++) if (bin[p + i] !== MAGIC[i]) continue outer;
      const metaLen = bin[p + 8] | (bin[p + 9] << 8);
      const textLen = (bin[p + 10] | (bin[p + 11] << 8) | (bin[p + 12] << 16) | (bin[p + 13] << 24)) >>> 0;
      const start = p + 16;
      const end = start + metaLen + textLen;
      if (end > bin.length || metaLen === 0) continue;
      return { meta: bin.slice(start, start + metaLen), text: bin.slice(start + metaLen, end) };
    }
    return null;
  }

  function utf8(bytes) {
    return new TextDecoder('utf-8').decode(bytes);
  }

  function lzmaDecompress(bytes) {
    const L = root.LZMA;
    if (!L) return Promise.reject(new HexError('nolzma'));
    return new Promise((resolve, reject) => {
      // lzma.js erwartet ein normales Array mit vorzeichenbehafteten Bytes
      const arr = Array.from(bytes, b => (b > 127 ? b - 256 : b));
      L.decompress(arr, (res, err) => {
        if (err || res == null) reject(new HexError('corrupt', String(err)));
        else resolve(typeof res === 'string' ? res : utf8(Uint8Array.from(res, b => b & 0xff)));
      });
    });
  }

  // Ergebnis: { name, files: { 'main.ts': …, … }, source: 'main.ts'-Text, language: 'ts'|'py' }
  async function extractProgram(input) {
    let text;
    if (typeof input === 'string') text = input;
    else text = utf8(input instanceof Uint8Array ? input : new Uint8Array(input));

    if (text.charCodeAt(0) !== 0x3A /* : */) throw new HexError('nothex');

    const embed = findEmbed(hexToBytes(text));
    if (!embed) throw new HexError('nosource');

    let hd;
    try { hd = JSON.parse(utf8(embed.meta)); } catch (e) { throw new HexError('corrupt'); }

    let payload;
    if (hd.compression === 'LZMA') payload = await lzmaDecompress(embed.text);
    else if (!hd.compression) payload = utf8(embed.text);
    else throw new HexError('corrupt', 'compression ' + hd.compression);

    const headSize = hd.headerSize || hd.metaSize || 0;
    let meta = {};
    try { if (headSize) meta = JSON.parse(payload.slice(0, headSize)); } catch (e) { /* egal */ }
    let files;
    try { files = JSON.parse(payload.slice(headSize)); } catch (e) { throw new HexError('corrupt'); }

    const ts = files['main.ts'];
    if (typeof ts !== 'string' || !ts.trim()) {
      if (files['main.py']) throw new HexError('pyonly');
      throw new HexError('nosource');
    }
    // weitere .ts-Dateien des Projekts (z. B. custom.ts) mitnehmen
    const extra = Object.keys(files)
      .filter(f => /\.ts$/.test(f) && f !== 'main.ts' && !/^test/.test(f) && !/\.d\.ts$/.test(f))
      .map(f => files[f]);

    return {
      name: meta.name || hd.name || '',
      files,
      source: extra.concat([ts]).join('\n\n')
    };
  }

  const api = { extractProgram, hexToBytes, findEmbed, HexError, MAGIC };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SimHex = api;
})(typeof self !== 'undefined' ? self : globalThis);
