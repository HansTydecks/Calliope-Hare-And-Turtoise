/* =============================================
   GARTEN-SIMULATOR — main.js
   Oberfläche: Drag & Drop der .hex, zwei Tier-Plätze,
   Calliope-Bedienfeld, Sensoren an die Worker schicken.
   ============================================= */

import { World } from './world.js';

/* ---------- Texte ---------- */
const T = {
  de: {
    back: 'Zur Lernseite', title: 'Garten-Simulator', openMakeCode: 'MakeCode öffnen',
    gWiese: 'Wiese', gHecken: 'Hecken', gPfad: 'Pfad', gBegegnung: 'Begegnung',
    camOverview: 'Überblick (drehen mit der Maus)', camFollow: 'Tier folgen', camTop: 'Von oben',
    pause: 'Pause', play: 'Weiter', resetAll: 'Alles neu starten', trail: 'Spur',
    emptyTitle: 'Zieh deine .hex-Datei hierher',
    step1: 'In MakeCode programmieren', step2: '„Herunterladen" klicken → .hex-Datei', step3: 'Datei hier in den Garten ziehen',
    chooseFile: 'Datei wählen', tryDemo: 'Beispiel ansehen', dropHere: 'Loslassen – dein Tier startet sofort!',
    calliopeOf: 'Calliope von', shake: 'Schütteln', clap: 'Klatschen', pins: 'Pins:',
    keysHint: 'Tastatur: A und B drücken', world: 'Umgebung', light: 'Licht', temp: 'Temperatur',
    sensors: 'Was das Tier misst', distance: 'Ultraschall', line: 'Liniensensor L / R',
    motorL: 'Motor links', motorR: 'Motor rechts', messages: 'Meldungen',
    helpTitle: 'Hilfe & Tipps',
    help1: 'Du kannst ein Tier mit der Maus im Garten verschieben.',
    help2: 'Hase und Schildkröte können gleichzeitig fahren und sich per Funk Nachrichten schicken.',
    help3: 'Im Pfad-Garten gibt es eine schwarze Linie für den Liniensensor.',
    help4: 'Der Simulator rechnet nur nach – echte Motoren fahren nie ganz genau gleich schnell.',
    hare: 'Hase', tortoise: 'Schildkröte',
    noProgram: 'Noch kein Programm', running: 'läuft', paused: 'pausiert', error: 'Fehler',
    file: 'Datei', demo: 'Beispiel', restart: 'Neu starten', remove: 'Entfernen', turnL: 'Nach links drehen', turnR: 'Nach rechts drehen',
    dropOnSlot: '.hex hierher ziehen',
    started: n => `Programm „${n}" gestartet.`,
    demoName: 'Beispiel',
    errNothex: 'Das ist keine .hex-Datei. Lade in MakeCode mit „Herunterladen" eine .hex-Datei herunter.',
    errNosource: 'In dieser .hex-Datei steckt kein MakeCode-Programm. Nimm die Datei, die MakeCode beim „Herunterladen" speichert.',
    errCorrupt: 'Die Datei ist beschädigt oder unvollständig. Lade sie in MakeCode noch einmal herunter.',
    errPyonly: 'Das Programm wurde nur in Python gespeichert. Öffne es in MakeCode einmal im Blöcke- oder JavaScript-Bereich und lade es neu herunter.',
    errNolzma: 'Der Entpacker konnte nicht geladen werden. Lade die Seite neu.',
    errCompile: (l, m) => `Das Programm lässt sich nicht lesen${l ? ' (Zeile ' + l + ')' : ''}: ${m}`,
    errRun: (l, m) => `Fehler beim Ausführen${l ? ' in Zeile ' + l : ''}: ${m}`,
    unsupported: n => `Der Block „${n}" wird im Simulator nicht unterstützt und wird übersprungen.`,
    radioSent: (who, what) => `${who} funkt: ${what}`,
    output: who => `${who} schreibt:`,
    noWebgl: 'Dein Browser kann leider keine 3D-Grafik anzeigen (WebGL fehlt).'
  },
  en: {
    back: 'Back to lessons', title: 'Garden simulator', openMakeCode: 'Open MakeCode',
    gWiese: 'Meadow', gHecken: 'Hedges', gPfad: 'Path', gBegegnung: 'Meeting',
    camOverview: 'Overview (drag to rotate)', camFollow: 'Follow animal', camTop: 'From above',
    pause: 'Pause', play: 'Resume', resetAll: 'Restart everything', trail: 'Trail',
    emptyTitle: 'Drag your .hex file here',
    step1: 'Program in MakeCode', step2: 'Click "Download" → .hex file', step3: 'Drag the file into the garden',
    chooseFile: 'Choose file', tryDemo: 'Show an example', dropHere: 'Let go – your animal starts right away!',
    calliopeOf: 'Calliope of the', shake: 'Shake', clap: 'Clap', pins: 'Pins:',
    keysHint: 'Keyboard: press A and B', world: 'Surroundings', light: 'Light', temp: 'Temperature',
    sensors: 'What the animal measures', distance: 'Ultrasonic', line: 'Line sensor L / R',
    motorL: 'Left motor', motorR: 'Right motor', messages: 'Messages',
    helpTitle: 'Help & tips',
    help1: 'You can drag an animal around the garden with the mouse.',
    help2: 'Hare and tortoise can drive at the same time and send each other radio messages.',
    help3: 'The path garden has a black line for the line sensor.',
    help4: 'The simulator only calculates – real motors never run at exactly the same speed.',
    hare: 'hare', tortoise: 'tortoise',
    noProgram: 'No program yet', running: 'running', paused: 'paused', error: 'error',
    file: 'File', demo: 'Example', restart: 'Restart', remove: 'Remove', turnL: 'Turn left', turnR: 'Turn right',
    dropOnSlot: 'drag .hex here',
    started: n => `Program "${n}" started.`,
    demoName: 'Example',
    errNothex: 'This is not a .hex file. Use "Download" in MakeCode to get a .hex file.',
    errNosource: 'This .hex file contains no MakeCode program. Use the file MakeCode saves when you click "Download".',
    errCorrupt: 'The file is damaged or incomplete. Download it again in MakeCode.',
    errPyonly: 'The program was only saved as Python. Open it once in the Blocks or JavaScript view in MakeCode and download again.',
    errNolzma: 'The unpacker could not be loaded. Please reload the page.',
    errCompile: (l, m) => `The program cannot be read${l ? ' (line ' + l + ')' : ''}: ${m}`,
    errRun: (l, m) => `Error while running${l ? ' in line ' + l : ''}: ${m}`,
    unsupported: n => `The block "${n}" is not supported in the simulator and is skipped.`,
    radioSent: (who, what) => `${who} radios: ${what}`,
    output: who => `${who} writes:`,
    noWebgl: 'Sorry, your browser cannot show 3D graphics (WebGL is missing).'
  }
};

/* ---------- Beispielprogramme (MakeCode-JavaScript) ---------- */
const DEMOS = {
  hare: `// Der Hase: flitzt los, weicht Hindernissen aus und schläft im Dunkeln
basic.showIcon(IconNames.Rabbit)
basic.forever(function () {
    if (input.lightLevel() > 50) {
        if (maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters) < 25) {
            maqueen.motorStop(maqueen.Motors.All)
            basic.showIcon(IconNames.Surprised, 0)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 150)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 150)
            basic.pause(450)
            basic.showIcon(IconNames.Rabbit, 0)
        } else {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 200)
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showString("z")
    }
})
`,
  tortoise: `// Die Schildkröte: startet mit Knopf A, läuft langsam und dreht vor Hindernissen ab
let laeuft = false
basic.showIcon(IconNames.Tortoise)
input.onButtonPressed(Button.A, function () {
    laeuft = !(laeuft)
    if (laeuft) {
        basic.showIcon(IconNames.Happy)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showIcon(IconNames.Asleep)
    }
})
basic.forever(function () {
    if (laeuft) {
        if (maqueen.ultrasonic(maqueen.DistanceUnit.Centimeters) > 15) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 80)
            basic.pause(900)
        }
    }
})
`
};

/* ---------- Zustand ---------- */
const KINDS = ['hare', 'tortoise'];
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function store(key, val) {
  try {
    if (val === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, val);
  } catch (e) { /* privat-Modus o. Ä. */ }
  return null;
}
function initialLang() {
  try {
    const st = JSON.parse(localStorage.getItem('ht-state') || '{}');
    if (st.lang === 'en') return 'en';
  } catch (e) { /* egal */ }
  return 'de';
}

const state = {
  lang: initialLang(),
  selected: 'hare',
  paused: false,
  garden: store('sim-garden') || 'wiese',
  env: { light: 200, temp: 21, sound: 10 },
  buttons: { A: false, B: false },
  pins: [false, false, false, false],
  slots: {}
};
KINDS.forEach(k => { state.slots[k] = { kind: k, worker: null, source: null, name: '', status: 'empty', display: null, motors: null, msg: '' }; });

const t = key => {
  const v = T[state.lang][key];
  return v === undefined ? T.de[key] : v;
};
const animal = k => t(k);
const Animal = k => { const s = t(k); return s.charAt(0).toUpperCase() + s.slice(1); };

/* ---------- 3D-Welt ---------- */
let world;
try {
  world = new World($('#canvasHost'), {
    onSelect: kind => select(kind),
    onTick: dt => tick(dt)
  });
  window.__sim = { world, state };
} catch (e) {
  $('#canvasHost').innerHTML = `<p class="no-webgl">${t('noWebgl')}</p>`;
  console.error(e);
}
if (world) world.setGarden(state.garden);

/* ---------- Plätze ---------- */
function slotHTML(k) {
  return `
  <div class="slot slot--${k}" data-kind="${k}" tabindex="0" role="button" aria-pressed="false">
    <div class="slot__head">
      <img class="slot__icon" src="img/${k}-select.svg" alt="" width="44" height="44">
      <div class="slot__text">
        <div class="slot__name">${Animal(k)}</div>
        <div class="slot__status" data-status></div>
      </div>
      <span class="slot__drop">${t('dropOnSlot')}</span>
    </div>
    <div class="slot__actions">
      <button class="sbtn" data-act="file" title="${t('file')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>${t('file')}</span>
      </button>
      <button class="sbtn" data-act="demo" title="${t('demo')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12 2 15 9 22 9 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9 9 9"/></svg>
        <span>${t('demo')}</span>
      </button>
      <span class="slot__spacer"></span>
      <button class="sbtn sbtn--icon" data-act="turnL" title="${t('turnL')}" aria-label="${t('turnL')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10"/></svg>
      </button>
      <button class="sbtn sbtn--icon" data-act="turnR" title="${t('turnR')}" aria-label="${t('turnR')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 4v6h-6"/><path d="M20.5 15a9 9 0 1 1-2.1-9.4L23 10"/></svg>
      </button>
      <button class="sbtn sbtn--icon" data-act="restart" title="${t('restart')}" aria-label="${t('restart')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>
      </button>
      <button class="sbtn sbtn--icon" data-act="remove" title="${t('remove')}" aria-label="${t('remove')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </div>`;
}

function renderSlots() {
  $('#slots').innerHTML = KINDS.map(slotHTML).join('');
  $$('.slot').forEach(el => {
    const k = el.dataset.kind;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) { select(k); return; }
      e.stopPropagation();
      const act = b.dataset.act;
      if (act === 'file') { pickTarget = k; $('#fileInput').click(); }
      else if (act === 'demo') startProgram(k, DEMOS[k], t('demoName'));
      else if (act === 'restart') restart(k);
      else if (act === 'remove') removeSlot(k);
      else if (act === 'turnL') world && world.rotateRobot(k, 45);
      else if (act === 'turnR') world && world.rotateRobot(k, -45);
      select(k);
    });
    el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); select(k); } });
    el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('is-drop'); });
    el.addEventListener('dragleave', () => el.classList.remove('is-drop'));
    el.addEventListener('drop', e => {
      e.preventDefault(); e.stopPropagation();
      el.classList.remove('is-drop');
      hideDrop();
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) loadFile(f, k);
    });
  });
  updateSlots();
}

function updateSlots() {
  KINDS.forEach(k => {
    const el = $(`.slot[data-kind="${k}"]`);
    if (!el) return;
    const s = state.slots[k];
    el.classList.toggle('is-selected', state.selected === k);
    el.setAttribute('aria-pressed', state.selected === k ? 'true' : 'false');
    el.classList.toggle('is-empty', s.status === 'empty');
    el.classList.toggle('is-error', s.status === 'error');
    el.classList.toggle('is-running', s.status === 'running');
    const st = el.querySelector('[data-status]');
    if (s.status === 'empty') st.textContent = t('noProgram');
    else if (s.status === 'error') st.textContent = `${s.name} · ${t('error')}`;
    else st.textContent = `${s.name} · ${state.paused ? t('paused') : t('running')}`;
    el.querySelectorAll('[data-act="restart"],[data-act="remove"],[data-act="turnL"],[data-act="turnR"]').forEach(b => { b.disabled = s.status === 'empty'; });
  });
  const any = KINDS.some(k => state.slots[k].status !== 'empty');
  $('#emptyHint').hidden = any;
  $('#calliopeOwner').textContent = state.lang === 'en' ? animal(state.selected) : Animal(state.selected);
}

function select(k) {
  state.selected = k;
  if (world) world.selected = k;
  updateSlots();
  renderMatrix();
}

/* ---------- Programme starten ---------- */
let serialNo = 1;
function startProgram(k, source, name) {
  const s = state.slots[k];
  stopWorker(k);
  s.source = source;
  s.name = name || Animal(k);
  s.status = 'running';
  s.display = null;
  if (world) { world.addRobot(k); world.resetRobot(k); }
  const w = new Worker('sim/worker.js');
  s.worker = w;
  w.onmessage = e => onWorkerMessage(k, w, e.data);
  w.onerror = e => { e.preventDefault(); onWorkerMessage(k, w, { type: 'error', stage: 'run', message: e.message }); };
  w.postMessage({ type: 'start', source, robot: k, serial: serialNo++ });
  if (state.paused) w.postMessage({ type: 'pause', paused: true });
  sendSensors(k);
  select(k);
}

function stopWorker(k) {
  const s = state.slots[k];
  if (s.worker) { s.worker.terminate(); s.worker = null; }
  if (world && world.robots[k]) world.setMotors(k, { dir: 0, speed: 0 }, { dir: 0, speed: 0 });
}

function restart(k) {
  const s = state.slots[k];
  if (s.source) startProgram(k, s.source, s.name);
}

function removeSlot(k) {
  stopWorker(k);
  const s = state.slots[k];
  Object.assign(s, { source: null, name: '', status: 'empty', display: null, motors: null });
  if (world) world.removeRobot(k);
  updateSlots();
  renderMatrix();
}

function onWorkerMessage(k, w, m) {
  const s = state.slots[k];
  if (s.worker !== w) return; // alter Worker
  switch (m.type) {
    case 'started':
      logMsg(k, t('started')(s.name), 'ok');
      toast(`${Animal(k)}: ${t('started')(s.name)}`);
      break;
    case 'display':
      s.display = m;
      if (world) world.setDisplay(k, m);
      if (state.selected === k) renderMatrix();
      break;
    case 'motors':
      s.motors = m;
      if (world) world.setMotors(k, m.left, m.right);
      break;
    case 'radio': {
      const what = m.kind === 'value' ? `${m.name} = ${m.payload}` : m.kind === 'string' ? `"${m.payload}"` : String(m.payload);
      logMsg(k, t('radioSent')(Animal(k), what), 'radio');
      KINDS.forEach(o => {
        if (o === k) return;
        const os = state.slots[o];
        if (!os.worker) return;
        const d = world ? world.distanceBetween(k, o) : 50;
        const signal = Math.max(-128, Math.min(-42, Math.round(-42 - d * 0.18)));
        os.worker.postMessage({ type: 'event', ev: 'radio', group: m.group, kind: m.kind, payload: m.payload, name: m.name, signal, serial: 0 });
      });
      break;
    }
    case 'log':
      logMsg(k, `${t('output')(Animal(k))} ${m.text}`, 'out');
      break;
    case 'unsupported':
      logMsg(k, t('unsupported')(m.name), 'warn');
      break;
    case 'error':
      if (m.stage === 'compile') {
        s.status = 'error';
        stopWorker(k);
        logMsg(k, t('errCompile')(m.line, m.message), 'err');
        toast(t('errCompile')(m.line, ''), true);
      } else {
        logMsg(k, t('errRun')(m.line, m.message), 'err');
      }
      updateSlots();
      break;
    case 'reset':
      setTimeout(() => restart(k), 50);
      break;
  }
}

/* ---------- Dateien ---------- */
let pickTarget = null;
function guessKind(name) {
  const n = (name || '').toLowerCase();
  if (/schild|kr[öo]te|tortoise|turtle/.test(n)) return 'tortoise';
  if (/hase|hare|rabbit|bunny/.test(n)) return 'hare';
  return null;
}

async function loadFile(file, target) {
  let buf;
  try { buf = new Uint8Array(await file.arrayBuffer()); } catch (e) { return showError(target || state.selected, t('errCorrupt')); }
  const isHex = /\.hex$/i.test(file.name) || buf[0] === 0x3A;
  let source, name;
  if (isHex) {
    try {
      const prog = await window.SimHex.extractProgram(buf);
      source = prog.source;
      name = prog.name || file.name.replace(/\.hex$/i, '');
    } catch (e) {
      const key = { nothex: 'errNothex', nosource: 'errNosource', corrupt: 'errCorrupt', pyonly: 'errPyonly', nolzma: 'errNolzma' }[e.code] || 'errCorrupt';
      return showError(target || state.selected, t(key));
    }
  } else {
    source = new TextDecoder().decode(buf);
    name = file.name.replace(/\.(ts|js|txt)$/i, '');
  }
  const k = target || guessKind(name) || guessKind(file.name) || state.selected;
  startProgram(k, source, name.replace(/^calliope-?/i, '') || Animal(k));
}

function showError(k, msg) {
  logMsg(k, msg, 'err');
  toast(msg, true);
}

$('#fileInput').addEventListener('change', e => {
  const f = e.target.files && e.target.files[0];
  if (f) loadFile(f, pickTarget);
  pickTarget = null;
  e.target.value = '';
});
$('#btnEmptyOpen').addEventListener('click', () => { pickTarget = null; $('#fileInput').click(); });
$('#btnEmptyDemo').addEventListener('click', () => {
  startProgram('hare', DEMOS.hare, t('demoName'));
});

// Drag & Drop auf die ganze Seite
let dragDepth = 0;
const hasFiles = e => e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files');
function hideDrop() { dragDepth = 0; $('#dropOverlay').classList.remove('is-on'); }
window.addEventListener('dragenter', e => { if (!hasFiles(e)) return; e.preventDefault(); dragDepth++; $('#dropOverlay').classList.add('is-on'); });
window.addEventListener('dragleave', e => { if (!hasFiles(e)) return; dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) hideDrop(); });
window.addEventListener('dragover', e => { if (hasFiles(e)) e.preventDefault(); });
window.addEventListener('drop', e => {
  if (!hasFiles(e)) return;
  e.preventDefault();
  hideDrop();
  const f = e.dataTransfer.files[0];
  if (f) loadFile(f, null);
});

/* ---------- Calliope-Ansicht ---------- */
const matrix = $('#matrix');
matrix.innerHTML = Array.from({ length: 25 }, () => '<span class="led"></span>').join('');
const ledEls = Array.from(matrix.children);
function renderMatrix() {
  const s = state.slots[state.selected];
  const d = s && s.display;
  ledEls.forEach((el, i) => {
    const v = d ? d.leds[i] / 255 : 0;
    el.style.setProperty('--b', v.toFixed(3));
    el.classList.toggle('on', v > 0.02);
  });
  const rgb = d && d.rgb ? '#' + d.rgb.toString(16).padStart(6, '0') : '';
  $('#boardRgb').style.background = rgb || '';
  $('#boardRgb').style.color = rgb || '';
  $('#boardRgb').classList.toggle('on', !!rgb);
}

function postAll(msg, only) {
  KINDS.forEach(k => {
    if (only && only !== k) return;
    const w = state.slots[k].worker;
    if (w) w.postMessage(msg);
  });
}

function buttonDown(b) {
  if (b === 'AB') { state.buttons.A = state.buttons.B = true; }
  else state.buttons[b] = true;
  postAll({ type: 'event', ev: 'button', btn: b, action: 'down' }, state.selected);
  sendSensors(state.selected);
}
function buttonUp(b) {
  if (b === 'AB') { state.buttons.A = state.buttons.B = false; }
  else state.buttons[b] = false;
  postAll({ type: 'event', ev: 'button', btn: b, action: 'up' }, state.selected);
  postAll({ type: 'event', ev: 'button', btn: b, action: 'click' }, state.selected);
  sendSensors(state.selected);
}
function bindPress(el, down, up) {
  let active = false;
  el.addEventListener('pointerdown', e => { e.preventDefault(); active = true; el.classList.add('is-down'); el.setPointerCapture(e.pointerId); down(); });
  const end = () => { if (!active) return; active = false; el.classList.remove('is-down'); up(); };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); active = true; el.classList.add('is-down'); down(); } });
  el.addEventListener('keyup', e => { if (e.key === 'Enter' || e.key === ' ') end(); });
}
$$('[data-btn]').forEach(el => bindPress(el, () => buttonDown(el.dataset.btn), () => buttonUp(el.dataset.btn)));
$$('[data-pin]').forEach(el => {
  const p = +el.dataset.pin;
  bindPress(el,
    () => { state.pins[p] = true; postAll({ type: 'event', ev: 'pin', pin: p, action: 'down' }, state.selected); sendSensors(state.selected); },
    () => {
      state.pins[p] = false;
      postAll({ type: 'event', ev: 'pin', pin: p, action: 'up' }, state.selected);
      postAll({ type: 'event', ev: 'pin', pin: p, action: 'click' }, state.selected);
      sendSensors(state.selected);
    });
});

const keyMap = { a: 'A', b: 'B' };
window.addEventListener('keydown', e => {
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName)) return;
  const b = keyMap[e.key.toLowerCase()];
  if (b) { buttonDown(b); document.querySelector(`.board__btn[data-btn="${b}"]`).classList.add('is-down'); }
});
window.addEventListener('keyup', e => {
  const b = keyMap[e.key.toLowerCase()];
  if (b && state.buttons[b]) { buttonUp(b); document.querySelector(`.board__btn[data-btn="${b}"]`).classList.remove('is-down'); }
});

let shakeT = 0;
$('#btnShake').addEventListener('click', () => {
  shakeT = 0.6;
  postAll({ type: 'event', ev: 'gesture', g: 'Shake' }, state.selected);
  if (world && world.robots[state.selected]) world.robots[state.selected].bump = 0.5;
});
let clapT = 0;
$('#btnClap').addEventListener('click', () => {
  clapT = 0.4;
  postAll({ type: 'event', ev: 'sound', s: 'Loud' });
});

/* ---------- Umgebung ---------- */
$('#rngLight').addEventListener('input', e => {
  state.env.light = +e.target.value;
  $('#outLight').textContent = state.env.light;
  if (world) world.setLight(state.env.light);
});
$('#rngTemp').addEventListener('input', e => {
  state.env.temp = +e.target.value;
  $('#outTemp').textContent = state.env.temp + ' °C';
});

/* ---------- Garten & Kamera ---------- */
function setGarden(key) {
  state.garden = key;
  store('sim-garden', key);
  $$('#gardenChips .chip').forEach(c => c.classList.toggle('is-on', c.dataset.garden === key));
  if (world) world.setGarden(key);
  KINDS.forEach(k => { if (state.slots[k].status === 'running') restart(k); });
}
$$('#gardenChips .chip').forEach(c => c.addEventListener('click', () => setGarden(c.dataset.garden)));
$$('#gardenChips .chip').forEach(c => c.classList.toggle('is-on', c.dataset.garden === state.garden));

function setCam(mode) {
  $$('#cameraChips .chip').forEach(c => c.classList.toggle('is-on', c.dataset.cam === mode));
  if (world) world.setCameraMode(mode);
}
$$('#cameraChips .chip').forEach(c => c.addEventListener('click', () => setCam(c.dataset.cam)));
setCam('overview');

$('#chkTrail').addEventListener('change', e => world && world.setTrail(e.target.checked));

$('#btnPlay').addEventListener('click', () => {
  state.paused = !state.paused;
  $('#btnPlay').setAttribute('aria-pressed', state.paused ? 'false' : 'true');
  $('#btnPlay').classList.toggle('is-paused', state.paused);
  if (world) world.setPaused(state.paused);
  postAll({ type: 'pause', paused: state.paused });
  updateSlots();
});
$('#btnResetAll').addEventListener('click', () => {
  KINDS.forEach(k => { if (state.slots[k].source) restart(k); });
});

/* ---------- Sensoren an die Worker ---------- */
function sensorsFor(k) {
  const sense = world ? world.sense(k) : null;
  const sel = state.selected === k;
  const accel = { x: 0, y: 0, z: -1023 };
  if (shakeT > 0 && sel) { accel.x = Math.round((Math.random() - 0.5) * 3000); accel.y = Math.round((Math.random() - 0.5) * 3000); }
  return {
    light: state.env.light,
    temp: state.env.temp,
    sound: clapT > 0 ? 255 : 10 + Math.round(Math.random() * 4),
    btnA: sel && state.buttons.A,
    btnB: sel && state.buttons.B,
    pins: sel ? state.pins.slice() : [false, false, false, false],
    distance: sense ? sense.distance : 400,
    patrol: sense ? sense.patrol : [false, false],
    heading: sense ? sense.heading : 0,
    accel
  };
}
function sendSensors(k) {
  const w = state.slots[k].worker;
  if (w) w.postMessage({ type: 'sensors', s: sensorsFor(k) });
}

let roTimer = 0;
function tick(dt) {
  if (shakeT > 0) shakeT -= dt;
  if (clapT > 0) clapT -= dt;
  KINDS.forEach(sendSensors);
  roTimer -= dt;
  if (roTimer <= 0) { roTimer = 0.1; updateReadout(); }
}

function updateReadout() {
  const k = state.selected;
  const sense = world && world.robots[k] ? world.sense(k) : null;
  $('#roDist').textContent = sense ? `${Math.round(sense.distance)} cm` : '–';
  $('#roLine').textContent = sense ? sense.patrol.map(d => (d ? '●' : '○')).join('  ') : '–';
  const m = state.slots[k].motors;
  const bar = (el, mm) => {
    const v = mm ? (mm.speed / 255) * (mm.dir ? -1 : 1) : 0;
    el.style.width = Math.abs(v * 50) + '%';
    el.style.left = v >= 0 ? '50%' : (50 + v * 50) + '%';
    el.classList.toggle('neg', v < 0);
    el.parentElement.title = mm ? `${mm.dir ? '−' : ''}${mm.speed}` : '0';
  };
  bar($('#roML'), m && m.left);
  bar($('#roMR'), m && m.right);
}

/* ---------- Meldungen ---------- */
function logMsg(k, text, kind) {
  const log = $('#log');
  const row = document.createElement('div');
  row.className = `log__row log__row--${kind || 'info'} log__row--${k}`;
  const who = document.createElement('img');
  who.src = `img/${k}-select.svg`; who.alt = Animal(k); who.width = 18; who.height = 18;
  const span = document.createElement('span');
  span.textContent = text;
  row.append(who, span);
  log.prepend(row);
  while (log.children.length > 60) log.lastChild.remove();
}
let toastTimer = 0;
function toast(msg, isErr) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.toggle('is-err', !!isErr);
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), isErr ? 6000 : 2600);
}

/* ---------- Sprache ---------- */
function applyLang() {
  document.documentElement.lang = state.lang;
  $$('[data-t]').forEach(el => { const v = t(el.dataset.t); if (typeof v === 'string') el.textContent = v; });
  $$('[data-tt]').forEach(el => { const v = t(el.dataset.tt); el.title = v; el.setAttribute('aria-label', v); });
  $$('.lang__btn').forEach(b => b.classList.toggle('is-on', b.dataset.lang === state.lang));
  document.title = `${t('title')} — ${state.lang === 'en' ? 'Hare & Tortoise' : 'Hase & Schildkröte'}`;
  renderSlots();
}
$$('.lang__btn').forEach(b => b.addEventListener('click', () => {
  state.lang = b.dataset.lang;
  try {
    const st = JSON.parse(localStorage.getItem('ht-state') || '{}');
    st.lang = state.lang;
    localStorage.setItem('ht-state', JSON.stringify(st));
  } catch (e) { /* egal */ }
  applyLang();
}));

applyLang();
select('hare');
renderMatrix();
