/* =============================================
   GARTEN-SIMULATOR — worker.js
   Läuft als Web Worker (einer pro Tier) und bildet die
   Calliope-mini- und MotionKit-V2-Befehle nach.
   ============================================= */

/* global importScripts, SIM_DATA, SimCompile */
importScripts('vendor/ts-tools.js', 'sim-data.js', 'compile.js');
self.TsTools = self.TsTools || TsTools; // eslint-disable-line no-undef

(function () {
  'use strict';

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

  /* ---------- Zeit (pausierbar) ---------- */
  let paused = false;
  let vt = 0;
  let lastReal = performance.now();
  function now() {
    const r = performance.now();
    if (!paused) vt += r - lastReal;
    lastReal = r;
    return vt;
  }
  const realSleep = ms => new Promise(r => setTimeout(r, ms));

  async function sleep(ms) {
    ms = Number(ms) || 0;
    const target = now() + Math.max(0, ms);
    for (;;) {
      const rem = target - now();
      if (rem <= 0 && !paused) return;
      await realSleep(paused ? 50 : Math.min(Math.max(rem, 0), 50));
    }
  }

  let lastYield = performance.now();
  async function tick() {
    if (paused || performance.now() - lastYield > 8) {
      do { await realSleep(paused ? 50 : 0); } while (paused);
      lastYield = performance.now();
    }
  }

  /* ---------- Sensoren (kommen von der Hauptseite) ---------- */
  let sensors = {
    light: 128, temp: 21, sound: 10, btnA: false, btnB: false,
    pins: [false, false, false, false], distance: 400,
    patrol: [false, false], heading: 0, accel: { x: 0, y: 0, z: -1023 }
  };
  let shakeUntil = -1;

  /* ---------- Ausgaben ---------- */
  const leds = new Uint8Array(25);
  let ledBrightness = 255;
  let displayOn = true;
  let rgb = 0;
  const frontLeds = [0, 0];
  const servos = [90, 90];
  let flushTimer = 0;

  function markDirty() {
    if (flushTimer) return;
    flushTimer = setTimeout(flush, 16);
  }
  function flush() {
    flushTimer = 0;
    const scale = displayOn ? ledBrightness / 255 : 0;
    self.postMessage({
      type: 'display',
      leds: Array.from(leds, v => Math.round(v * scale)),
      rgb, frontLeds: frontLeds.slice(), servos: servos.slice()
    });
  }

  const motors = [{ dir: 0, speed: 0 }, { dir: 0, speed: 0 }];
  function postMotors() {
    self.postMessage({ type: 'motors', left: Object.assign({}, motors[0]), right: Object.assign({}, motors[1]) });
  }

  const reported = new Set();
  function unsupported(name) {
    if (reported.has(name)) return;
    reported.add(name);
    self.postMessage({ type: 'unsupported', name });
  }

  /* ---------- Fehler & Abläufe ---------- */
  let lineOffset = 0;
  function errLine(e) {
    const st = String(e && e.stack || '');
    const m = /<anonymous>:(\d+):\d+/.exec(st) || /anonymous[^:]*:(\d+):\d+/.exec(st);
    return m ? Math.max(1, +m[1] - lineOffset) : undefined;
  }
  function reportRun(e) {
    self.postMessage({ type: 'error', stage: 'run', message: String(e && e.message || e), line: errLine(e) });
  }

  function spawn(fn, args) {
    Promise.resolve().then(() => fn.apply(null, args || [])).catch(reportRun);
  }

  // Ereignis-Handler: läuft er noch, wird das neue Ereignis angestellt (wie auf dem Gerät)
  function makeHandler(fn) {
    const h = { fn, busy: false, queue: [] };
    h.fire = (...args) => {
      if (h.busy) { if (h.queue.length < 8) h.queue.push(args); return; }
      h.busy = true;
      (async () => {
        let a = args;
        while (a) {
          try { await h.fn.apply(null, a); } catch (e) { reportRun(e); }
          a = h.queue.shift();
        }
        h.busy = false;
      })();
    };
    return h;
  }
  const handlers = {};
  function on(key, fn) {
    if (typeof fn !== 'function') return;
    (handlers[key] = handlers[key] || []).push(makeHandler(fn));
  }
  function fire(key, ...args) {
    (handlers[key] || []).forEach(h => h.fire(...args));
  }

  /* ---------- Hilfen für Bilder & Text ---------- */
  function parseLeds(str) {
    const bits = [];
    for (const ch of String(str)) {
      if (ch === '#' || ch === '1' || ch === '*') bits.push(1);
      else if (ch === '.' || ch === '0') bits.push(0);
    }
    return bits;
  }
  function setFrame(bits, width, offset) {
    width = width || 5;
    offset = offset || 0;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const sx = x + offset;
        const v = sx >= 0 && sx < width ? bits[y * width + sx] : 0;
        leds[y * 5 + x] = v ? 255 : 0;
      }
    }
    markDirty();
  }
  function pattern(str) { return str.split('').map(Number); }

  function charColumns(ch) {
    const code = ch.charCodeAt(0);
    const idx = code >= 32 && code <= 126 ? code - 32 : ('?'.charCodeAt(0) - 32);
    const rows = SIM_DATA.font.slice(idx * 5, idx * 5 + 5);
    const cols = [];
    for (let x = 0; x < 5; x++) cols.push(rows.map(r => (r >> (4 - x)) & 1));
    return cols;
  }
  function textStrip(text) {
    const strip = [];
    for (const ch of replaceUmlauts(text)) {
      charColumns(ch).forEach(c => strip.push(c));
      strip.push([0, 0, 0, 0, 0]);
    }
    return strip;
  }
  function replaceUmlauts(s) {
    return String(s).replace(/[äÄ]/g, m => m === 'ä' ? 'a' : 'A').replace(/[öÖ]/g, m => m === 'ö' ? 'o' : 'O')
      .replace(/[üÜ]/g, m => m === 'ü' ? 'u' : 'U').replace(/ß/g, 'ss');
  }
  function showColumns(strip, start) {
    for (let x = 0; x < 5; x++) {
      const col = strip[start + x] || [0, 0, 0, 0, 0];
      for (let y = 0; y < 5; y++) leds[y * 5 + x] = col[y] ? 255 : 0;
    }
    markDirty();
  }
  async function scrollText(text, interval) {
    const strip = textStrip(text);
    for (let k = -5; k <= strip.length; k++) {
      showColumns(strip, k);
      await sleep(interval);
    }
    leds.fill(0); markDirty();
  }
  function fmtNumber(n) {
    n = Number(n);
    if (!isFinite(n)) return String(n);
    if (Number.isInteger(n)) return String(n);
    return String(parseFloat(n.toFixed(6)));
  }
  async function showString(text, interval) {
    interval = interval > 0 ? interval : 150;
    text = String(text);
    if (text.length === 0) { leds.fill(0); markDirty(); await sleep(interval * 5); }
    else if (text.length === 1) { showColumns(textStrip(text), 0); await sleep(interval * 5); }
    else await scrollText(text, interval);
  }

  class Image {
    constructor(width, bits) { this._w = width; this._b = bits; }
    width() { return this._w; }
    height() { return 5; }
    async showImage(offset, interval) { setFrame(this._b, this._w, offset || 0); await sleep(interval == null ? 400 : interval); }
    plotImage(offset) { setFrame(this._b, this._w, offset || 0); }
    plotFrame(i) { setFrame(this._b, this._w, (i || 0) * 5); }
    async showFrame(i, interval) { setFrame(this._b, this._w, (i || 0) * 5); await sleep(interval == null ? 400 : interval); }
    async scrollImage(step, interval) {
      step = step || 1;
      for (let o = -5; o <= this._w; o += step) { setFrame(this._b, this._w, o); await sleep(interval == null ? 200 : interval); }
      leds.fill(0); markDirty();
    }
    setPixel(x, y, v) { if (x >= 0 && x < this._w && y >= 0 && y < 5) this._b[y * this._w + x] = v ? 1 : 0; }
    pixel(x, y) { return !!this._b[y * this._w + x]; }
    clear() { this._b.fill(0); }
  }
  function imageFromString(str) {
    const lines = String(str).split('\n').map(l => parseLeds(l)).filter(l => l.length);
    const w = lines.length ? Math.max(...lines.map(l => l.length)) : 5;
    const bits = [];
    for (let y = 0; y < 5; y++) for (let x = 0; x < w; x++) bits.push((lines[y] || [])[x] || 0);
    return new Image(w, bits);
  }

  /* ---------- Aufzählungen ---------- */
  function enumOf(names, start) {
    const o = {};
    names.forEach((n, i) => { o[n] = (start || 0) + i; });
    return o;
  }
  function keyOf(en, v) { return Object.keys(en).find(k => en[k] === v); }

  const Button = { A: 1, B: 2, AB: 3 };
  const Gesture = enumOf(['Shake', 'LogoUp', 'LogoDown', 'ScreenUp', 'ScreenDown', 'TiltLeft', 'TiltRight', 'FreeFall', 'ThreeG', 'SixG', 'EightG', 'TwoG'], 1);
  const TouchPin = { P0: 0, P1: 1, P2: 2, P3: 3 };
  const Dimension = enumOf(['X', 'Y', 'Z', 'Strength']);
  const Rotation = enumOf(['Pitch', 'Roll']);
  const DetectedSound = { Loud: 2, Quiet: 1 };
  const RadioPacketProperty = { SignalStrength: 2, Time: 0, SerialNumber: 1 };
  const Colors = {
    Red: 0xFF0000, Orange: 0xFFA500, Yellow: 0xFFFF00, Green: 0x00FF00, Blue: 0x0000FF,
    Indigo: 0x4B0082, Violet: 0x8A2BE2, Purple: 0xA033E5, Pink: 0xFF69B4, White: 0xFFFFFF, Black: 0, Off: 0
  };
  const DigitalPin = new Proxy({}, { get: (t, k) => typeof k === 'string' ? k : undefined });

  const maqueenEnums = {
    DistanceUnit: { Centimeters: 0 },
    Servos: { S1: 0, S2: 1 },
    Motors: { M1: 0, M2: 1, All: 2 },
    Dir: { CW: 0, CCW: 1 },
    Led: { LedLeft: 0, LedRight: 1, LedAll: 2 },
    LedSwitch: { LedOn: 1, LedOff: 0 },
    Patrol: { PatrolLeft: 0, PatrolRight: 1 },
    Voltage: { High: 1, Low: 0 },
    Brightness: { Bright: 0, Dark: 1 }
  };

  /* ---------- Platzhalter für Unbekanntes ---------- */
  function stub(path, silent) {
    const f = function () {};
    return new Proxy(f, {
      get(t, k) {
        if (k === 'then') return undefined;
        if (k === Symbol.toPrimitive) return hint => (hint === 'string' ? '' : 0);
        if (k === 'valueOf') return () => 0;
        if (k === 'toString') return () => '';
        if (typeof k === 'symbol') return undefined;
        return stub(path + '.' + k, silent);
      },
      apply() { if (!silent) unsupported(path); return stub(path + '()', true); },
      construct() { if (!silent) unsupported(path); return stub(path, true); }
    });
  }
  function ns(name, obj) {
    return new Proxy(obj, {
      get(t, k) {
        if (k in t) return t[k];
        if (typeof k === 'symbol' || k === 'then') return undefined;
        return stub(name + '.' + k);
      }
    });
  }

  /* ---------- basic ---------- */
  const basic = ns('basic', {
    showIcon: async (i, interval) => { setFrame(pattern(SIM_DATA.icons[i] || SIM_DATA.icons[0])); await sleep(interval == null ? 600 : interval); },
    showArrow: async (i, interval) => { setFrame(pattern(SIM_DATA.arrows[i] || SIM_DATA.arrows[0])); await sleep(interval == null ? 600 : interval); },
    showLeds: async (str, interval) => { setFrame(parseLeds(str)); await sleep(interval == null ? 400 : interval); },
    plotLeds: str => setFrame(parseLeds(str)),
    showAnimation: async (str, interval) => {
      const img = imageFromString(str);
      for (let f = 0; f * 5 < img._w; f++) { setFrame(img._b, img._w, f * 5); await sleep(interval == null ? 400 : interval); }
    },
    showString: (t, interval) => showString(t, interval),
    showNumber: (n, interval) => showString(fmtNumber(n), interval),
    showValue: (name, v, interval) => showString(String(name) + ':' + fmtNumber(v), interval),
    clearScreen: () => { leds.fill(0); markDirty(); },
    pause: ms => sleep(ms),
    forever: fn => {
      if (typeof fn !== 'function') return;
      setTimeout(() => spawn(async () => {
        for (;;) { await fn(); await sleep(20); }
      }), 0);
    },
    setLedColor: c => { rgb = Number(c) >>> 0; markDirty(); },
    setLedColors: (a) => { rgb = Number(a) >>> 0; markDirty(); },
    turnRgbLedOff: () => { rgb = 0; markDirty(); },
    rgb: (r, g, b) => ((r & 255) << 16) | ((g & 255) << 8) | (b & 255),
    rgbw: (r, g, b) => ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)
  });

  /* ---------- led ---------- */
  const inGrid = (x, y) => x >= 0 && x < 5 && y >= 0 && y < 5;
  const led = ns('led', {
    plot: (x, y) => { x |= 0; y |= 0; if (inGrid(x, y)) { leds[y * 5 + x] = 255; markDirty(); } },
    unplot: (x, y) => { x |= 0; y |= 0; if (inGrid(x, y)) { leds[y * 5 + x] = 0; markDirty(); } },
    toggle: (x, y) => { x |= 0; y |= 0; if (inGrid(x, y)) { leds[y * 5 + x] = leds[y * 5 + x] ? 0 : 255; markDirty(); } },
    point: (x, y) => { x |= 0; y |= 0; return inGrid(x, y) && leds[y * 5 + x] > 0; },
    plotBrightness: (x, y, b) => { x |= 0; y |= 0; if (inGrid(x, y)) { leds[y * 5 + x] = Math.max(0, Math.min(255, b | 0)); markDirty(); } },
    pointBrightness: (x, y) => inGrid(x | 0, y | 0) ? leds[(y | 0) * 5 + (x | 0)] : 0,
    brightness: () => ledBrightness,
    setBrightness: v => { ledBrightness = Math.max(0, Math.min(255, v | 0)); markDirty(); },
    enable: on => { displayOn = !!on; markDirty(); },
    stopAnimation: () => {},
    setDisplayMode: () => {},
    plotBarGraph: (value, high) => {
      const v = Math.abs(value); const h = high > 0 ? high : 1;
      const lit = Math.round(Math.min(1, v / h) * 25);
      for (let i = 0; i < 25; i++) {
        const row = 4 - Math.floor(i / 5); const col = i % 5;
        leds[row * 5 + col] = i < lit ? 255 : 0;
      }
      markDirty();
    }
  });

  /* ---------- images ---------- */
  const images = ns('images', {
    createImage: s => imageFromString(s),
    createBigImage: s => imageFromString(s),
    iconImage: i => new Image(5, pattern(SIM_DATA.icons[i] || SIM_DATA.icons[0])),
    arrowImage: i => new Image(5, pattern(SIM_DATA.arrows[i] || SIM_DATA.arrows[0])),
    arrowNumber: i => i
  });

  /* ---------- input ---------- */
  const btnKey = b => keyOf(Button, b) || 'A';
  const input = ns('input', {
    onButtonPressed: (b, fn) => on('btn:click:' + btnKey(b), fn),
    onButtonEvent: (b, ev, fn) => on('btn:' + (ev || 'click') + ':' + btnKey(b), fn),
    buttonEventClick: () => 'click',
    buttonEventDown: () => 'down',
    buttonEventUp: () => 'up',
    buttonEventLongClick: () => 'long',
    buttonIsPressed: b => {
      const k = btnKey(b);
      return k === 'AB' ? (sensors.btnA && sensors.btnB) : k === 'A' ? sensors.btnA : sensors.btnB;
    },
    onGesture: (g, fn) => on('gesture:' + keyOf(Gesture, g), fn),
    isGesture: g => keyOf(Gesture, g) === 'Shake' ? now() < shakeUntil : (keyOf(Gesture, g) === 'ScreenUp'),
    onPinPressed: (p, fn) => on('pin:click:' + p, fn),
    onPinReleased: (p, fn) => on('pin:up:' + p, fn),
    onPinTouchEvent: (p, ev, fn) => on('pin:' + (ev || 'click') + ':' + p, fn),
    pinIsPressed: p => !!sensors.pins[p],
    onSound: (s, fn) => on('sound:' + (keyOf(DetectedSound, s) || 'Loud'), fn),
    setSoundThreshold: () => {},
    soundLevel: () => Math.round(sensors.sound),
    lightLevel: () => Math.round(sensors.light),
    temperature: () => Math.round(sensors.temp),
    acceleration: d => {
      const k = keyOf(Dimension, d);
      if (k === 'Strength') return Math.round(Math.hypot(sensors.accel.x, sensors.accel.y, sensors.accel.z));
      return Math.round(sensors.accel[(k || 'X').toLowerCase()] || 0);
    },
    rotation: () => 0,
    compassHeading: () => Math.round(((sensors.heading % 360) + 360) % 360),
    calibrateCompass: () => {},
    magneticForce: () => 0,
    runningTime: () => Math.round(now()),
    runningTimeMicros: () => Math.round(now() * 1000),
    setAccelerometerRange: () => {},
    onLogoEvent: () => unsupported('input.onLogoEvent'),
    logoIsPressed: () => false
  });

  /* ---------- radio ---------- */
  let radioGroup = 0;
  let lastPacket = { signal: -128, time: 0, serial: 0 };
  const radio = ns('radio', {
    setGroup: g => { radioGroup = g | 0; },
    sendNumber: n => self.postMessage({ type: 'radio', group: radioGroup, kind: 'number', payload: Number(n) }),
    sendString: s => self.postMessage({ type: 'radio', group: radioGroup, kind: 'string', payload: String(s).slice(0, 19) }),
    sendValue: (name, v) => self.postMessage({ type: 'radio', group: radioGroup, kind: 'value', name: String(name).slice(0, 8), payload: Number(v) }),
    onReceivedNumber: fn => on('radio:number', fn),
    onReceivedString: fn => on('radio:string', fn),
    onReceivedValue: fn => on('radio:value', fn),
    receivedPacket: p => p === RadioPacketProperty.SignalStrength ? lastPacket.signal
      : p === RadioPacketProperty.SerialNumber ? lastPacket.serial : lastPacket.time,
    setTransmitPower: () => {},
    setTransmitSerialNumber: () => {},
    setFrequencyBand: () => {},
    on: () => {}, off: () => {}
  });

  /* ---------- MotionKit V2 (maqueen) ---------- */
  let patrolWatcher = false;
  function watchPatrol() {
    if (patrolWatcher) return;
    patrolWatcher = true;
    let prev = sensors.patrol.slice();
    spawn(async () => {
      for (;;) {
        await sleep(20);
        [0, 1].forEach(i => {
          const cur = sensors.patrol[i];
          if (cur !== prev[i]) fire('patrol:' + i + ':' + (cur ? 1 : 0));
        });
        prev = sensors.patrol.slice();
      }
    });
  }
  const setMotor = (i, dir, speed) => {
    speed = Math.max(0, Math.min(255, Math.round(Number(speed) || 0)));
    const m = motors[i];
    if (m.dir !== dir || m.speed !== speed) { m.dir = dir ? 1 : 0; m.speed = speed; return true; }
    return false;
  };
  const maqueen = ns('maqueen', Object.assign({
    motorRun: (index, direction, speed) => {
      let ch = false;
      if (index === 0 || index === 2) ch = setMotor(0, direction, speed) || ch;
      if (index === 1 || index === 2) ch = setMotor(1, direction, speed) || ch;
      if (ch) postMotors();
    },
    motorStop: index => {
      let ch = false;
      if (index === 0 || index === 2) ch = setMotor(0, 0, 0) || ch;
      if (index === 1 || index === 2) ch = setMotor(1, 0, 0) || ch;
      if (ch) postMotors();
    },
    ultrasonic: () => {
      const d = Math.round(sensors.distance);
      return d > 399 ? 400 : d < 1 ? -1 : d;
    },
    readPatrol: (p, brightness) => {
      const dark = !!sensors.patrol[p === 1 ? 1 : 0];
      return brightness === 1 ? dark : !dark;
    },
    ltEvent: (p, v, fn) => { on('patrol:' + (p === 1 ? 1 : 0) + ':' + (v ? 1 : 0), fn); watchPatrol(); },
    writeLED: (l, sw) => {
      if (l === 0 || l === 2) frontLeds[0] = sw ? 1 : 0;
      if (l === 1 || l === 2) frontLeds[1] = sw ? 1 : 0;
      markDirty();
    },
    setColor: c => { rgb = Number(c) >>> 0; markDirty(); },
    setRgb: (r, g, b) => ((r & 255) << 16) + ((g & 255) << 8) + (b & 255),
    servoRun: (i, angle) => {
      angle = Math.max(0, Math.min(180, Number(angle) || 0));
      if (i === 0 || i > 1) servos[0] = angle;
      if (i === 1 || i > 1) servos[1] = angle;
      markDirty();
    },
    getVersion: () => 'MotionKit V2 (Simulator)',
    irRead: () => { unsupported('maqueen.irRead'); return 0; },
    irEvent: () => unsupported('maqueen.irEvent')
  }, maqueenEnums));

  /* ---------- control, serial, pins ---------- */
  const log = text => self.postMessage({ type: 'log', text: String(text) });
  const control = ns('control', {
    inBackground: fn => spawn(fn),
    runInBackground: fn => spawn(fn),
    runInParallel: fn => spawn(fn),
    waitMicros: us => sleep((Number(us) || 0) / 1000),
    reset: () => { self.postMessage({ type: 'reset' }); return new Promise(() => {}); },
    millis: () => Math.round(now()),
    deviceSerialNumber: () => robotSerial,
    deviceName: () => robotName,
    assert: (cond, code) => { if (!cond) throw new Error('control.assert ' + (code || '')); },
    panic: code => { throw new Error('panic ' + code); }
  });
  const serial = ns('serial', {
    writeLine: s => log(s),
    writeString: s => log(s),
    writeNumber: n => log(fmtNumber(n)),
    writeValue: (name, v) => log(name + ': ' + fmtNumber(v)),
    writeNumbers: arr => log((arr || []).map(fmtNumber).join(',')),
    readLine: () => '',
    readString: () => '',
    redirectToUSB: () => {},
    setBaudRate: () => {},
    onDataReceived: () => {}
  });
  const pinIndex = p => ({ P0: 0, P1: 1, P2: 2, P3: 3, C16: -1 })[p] ?? (typeof p === 'number' && p < 4 ? p : -1);
  const pins = ns('pins', {
    digitalReadPin: p => { const i = pinIndex(p); return i >= 0 && sensors.pins[i] ? 1 : 0; },
    analogReadPin: p => { const i = pinIndex(p); return i >= 0 && sensors.pins[i] ? 1023 : 0; },
    digitalWritePin: () => {}, analogWritePin: () => {}, servoWritePin: () => {},
    analogSetPeriod: () => {}, setPull: () => {}, touchSetMode: () => {},
    map: (v, a, b, c, d) => c + (v - a) * (d - c) / (b - a)
  });

  /* ---------- Sprache: Math, Array, String ---------- */
  const randint = (a, b) => {
    a = Math.round(a); b = Math.round(b);
    if (a > b) [a, b] = [b, a];
    return a + Math.floor(Math.random() * (b - a + 1));
  };
  Object.assign(Math, {
    randomRange: randint,
    constrain: (v, lo, hi) => Math.min(Math.max(v, lo), hi),
    map: (v, a, b, c, d) => c + (v - a) * (d - c) / (b - a),
    idiv: (a, b) => (a / b) | 0,
    randomBoolean: () => Math.random() < 0.5,
    roundWithPrecision: (x, d) => { const f = Math.pow(10, d | 0); return Math.round(x * f) / f; }
  });
  const AP = Array.prototype;
  const def = (o, k, f) => { if (!o[k]) Object.defineProperty(o, k, { value: f, configurable: true, writable: true }); };
  def(AP, 'removeAt', function (i) { return this.splice(i, 1)[0]; });
  def(AP, 'insertAt', function (i, v) { this.splice(i, 0, v); });
  def(AP, 'removeElement', function (v) { const i = this.indexOf(v); if (i >= 0) { this.splice(i, 1); return true; } return false; });
  def(AP, 'get', function (i) { return this[i]; });
  def(AP, 'set', function (i, v) { this[i] = v; });
  def(AP, 'contains', function (v) { return this.indexOf(v) >= 0; });
  def(AP, '_pickRandom', function () { return this[Math.floor(Math.random() * this.length)]; });
  def(String.prototype, 'compare', function (b) { return this < b ? -1 : this > b ? 1 : 0; });
  def(String.prototype, 'isEmpty', function () { return this.length === 0; });

  const __arr = {
    async forEach(l, f) { for (let i = 0; i < l.length; i++) { await f(l[i], i, l); await tick(); } },
    async map(l, f) { const o = []; for (let i = 0; i < l.length; i++) { o.push(await f(l[i], i, l)); await tick(); } return o; },
    async filter(l, f) { const o = []; for (let i = 0; i < l.length; i++) { if (await f(l[i], i, l)) o.push(l[i]); await tick(); } return o; },
    async some(l, f) { for (let i = 0; i < l.length; i++) if (await f(l[i], i, l)) return true; return false; },
    async every(l, f) { for (let i = 0; i < l.length; i++) if (!(await f(l[i], i, l))) return false; return true; },
    async find(l, f) { for (let i = 0; i < l.length; i++) if (await f(l[i], i, l)) return l[i]; return undefined; },
    async findIndex(l, f) { for (let i = 0; i < l.length; i++) if (await f(l[i], i, l)) return i; return -1; },
    async reduce(l, f, init) {
      let i = 0, acc = init;
      if (arguments.length < 3) { acc = l[0]; i = 1; }
      for (; i < l.length; i++) acc = await f(acc, l[i], i, l);
      return acc;
    },
    async sort(l, f) {
      for (let i = 1; i < l.length; i++) {
        const v = l[i]; let j = i - 1;
        while (j >= 0 && (await f(l[j], v)) > 0) { l[j + 1] = l[j]; j--; }
        l[j + 1] = v;
        await tick();
      }
      return l;
    }
  };

  /* ---------- Umgebung für das Programm ---------- */
  let robotSerial = 1;
  let robotName = 'hase';
  const silent = n => stub(n, true);
  const env = Object.assign({
    basic, led, images, input, radio, maqueen, control, serial, pins,
    Button, Gesture, TouchPin, Dimension, Rotation, DetectedSound, RadioPacketProperty, Colors,
    IconNames: SIM_DATA.IconNames, ArrowNames: SIM_DATA.ArrowNames,
    DigitalPin, AnalogPin: DigitalPin,
    randint, convertToText: v => (typeof v === 'number' ? fmtNumber(v) : String(v)),
    __tick: tick, __arr,
    // Töne gibt es im Simulator nicht – alles stumm
    music: silent('music'), soundExpression: silent('soundExpression'), Note: silent('Note'),
    BeatFraction: silent('BeatFraction'), Melodies: silent('Melodies'), MelodyOptions: silent('MelodyOptions'),
    MelodyStopOptions: silent('MelodyStopOptions'), SoundExpressionPlayMode: silent('SoundExpressionPlayMode'),
    WaveShape: silent('WaveShape'), SoundExpressionEffect: silent('SoundExpressionEffect'),
    InterpolationCurve: silent('InterpolationCurve')
  }, maqueenEnums);

  const scope = new Proxy(env, {
    has(t, k) {
      if (typeof k !== 'string') return false;
      if (k in t) return true;
      return !(k in self);
    },
    get(t, k) {
      if (k === Symbol.unscopables) return undefined;
      if (k in t) return t[k];
      if (typeof k === 'string' && !(k in self)) return stub(k);
      return self[k];
    },
    set(t, k, v) { t[k] = v; return true; }
  });

  /* ---------- Nachrichten von der Hauptseite ---------- */
  function onEvent(ev) {
    switch (ev.ev) {
      case 'button':
        fire('btn:' + ev.action + ':' + ev.btn);
        break;
      case 'gesture':
        if (ev.g === 'Shake') shakeUntil = now() + 1000;
        fire('gesture:' + ev.g);
        break;
      case 'pin':
        fire('pin:' + ev.action + ':' + ev.pin);
        break;
      case 'sound':
        fire('sound:' + (ev.s || 'Loud'));
        break;
      case 'radio': {
        if ((ev.group | 0) !== radioGroup) break;
        lastPacket = { signal: ev.signal, time: Math.round(now()), serial: ev.serial || 0 };
        if (ev.kind === 'number') fire('radio:number', ev.payload);
        else if (ev.kind === 'string') fire('radio:string', ev.payload);
        else if (ev.kind === 'value') fire('radio:value', ev.name, ev.payload);
        break;
      }
    }
  }

  async function start(msg) {
    robotSerial = msg.serial || 1;
    robotName = msg.robot || 'hase';
    let code;
    try {
      code = SimCompile.compile(msg.source);
    } catch (e) {
      self.postMessage({ type: 'error', stage: 'compile', message: e.message, line: e.line });
      return;
    }
    let fn;
    try {
      // Zeilenversatz bestimmen, damit Fehlermeldungen die richtige Zeile nennen
      try { new AsyncFunction('__scope', 'with(__scope){\nthrow new Error("x")\n}')(scope).catch(e => { lineOffset = (errLine(e) || 2) - 1; }); } catch (e) { /* egal */ }
      fn = new AsyncFunction('__scope', 'with(__scope){\n' + code + '\n}');
    } catch (e) {
      self.postMessage({ type: 'error', stage: 'compile', message: e.message });
      return;
    }
    self.postMessage({ type: 'started' });
    flush();
    postMotors();
    await realSleep(0);
    try { await fn(scope); } catch (e) { reportRun(e); }
  }

  self.onmessage = e => {
    const m = e.data;
    switch (m.type) {
      case 'start': start(m); break;
      case 'sensors':
        Object.assign(sensors, m.s);
        break;
      case 'event': onEvent(m); break;
      case 'pause':
        now();
        paused = !!m.paused;
        lastReal = performance.now();
        break;
    }
  };
})();
