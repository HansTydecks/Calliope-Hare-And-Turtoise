/* =============================================
   GERMAN CONTENT — content-de.js
   9 Kapitel pro Pfad:
     Grundlagen (Kap. 1–5)  → Schritt-für-Schritt-Anleitung
     Bonus 1    (Kap. 6–7)  → Auftrag + wenige Tipps
     Bonus 2    (Kap. 8–9)  → Auftrag + höchstens ein Tipp
   Jedes Kapitel hat eine Merke-Kiste: kurze Erklärung,
   EIN Merksatz zum Abschreiben und ein Ablaufdiagramm (js/diagram.js).
   ============================================= */

window.CONTENT_DE = (function () {

  /* Hilfsfunktion: MakeCode-Block hervorheben */
  const b = (t) => `<span class="calliope-block">${t}</span>`;

  /* ---------- Ablaufdiagramme (Grundlagen zeigen das Aufgaben-Programm) ---------- */
  const breathe = (ms) => [
    { a: 'zeige LEDs: großes Herz' },
    { a: `pausiere ${ms} ms`, t: 'wait' },
    { a: 'zeige LEDs: kleines Herz' },
    { a: `pausiere ${ms} ms`, t: 'wait' }
  ];

  const D = {
    sequence: (ms, symbol) => [
      { event: 'beim Start', body: [
        { a: 'zeige LEDs: Herz' },
        { a: `pausiere ${ms} ms`, t: 'wait' },
        { a: `zeige Symbol: ${symbol}` },
        { a: `pausiere ${ms} ms`, t: 'wait' },
        { a: 'Bildschirminhalt löschen' }
      ] }
    ],
    loop: (ms) => [
      { event: 'dauerhaft', loop: true, body: breathe(ms) }
    ],
    sensor: (ms, threshold) => [
      { event: 'dauerhaft', loop: true, body: [
        { if: `Lichtstärke > ${threshold}`, then: breathe(ms), else: [{ a: 'zeige Zeichenfolge "z"' }] }
      ] }
    ],
    buttons: (think) => {
      const react = (what) => [
        ...(think ? [{ a: 'pausiere 1000 ms (nachdenken)', t: 'wait' }] : []),
        { a: `zeige Symbol: ${what}` },
        { a: 'pausiere 500 ms', t: 'wait' },
        { a: 'Bildschirminhalt löschen' }
      ];
      return [
        { event: 'wenn Knopf A gedrückt', body: react('Freude') },
        { event: 'wenn Knopf B gedrückt', body: react('Fressen') },
        { event: 'dauerhaft', loop: true, body: [{ a: 'Atmen / Schlafen (wie bisher)' }] }
      ];
    },
    motors: (speed) => [
      { event: 'dauerhaft', loop: true, body: [
        { if: 'Lichtstärke > 10',
          then: [
            { if: 'Abstand (cm) > 5',
              then: [{ a: `Motor beide vorwärts Tempo ${speed}`, t: 'motor' }, { a: 'Atem-Animation' }],
              else: [{ a: 'Motor beide anhalten', t: 'motor' }] }
          ],
          else: [{ a: 'Motor beide anhalten', t: 'motor' }, { a: 'zeige Zeichenfolge "z"' }] }
      ] }
    ],
    /* Bonus: allgemeine Beispiele, nicht die Lösung */
    events: (shake) => [
      { event: 'wenn Pin P1 berührt', body: [{ a: 'zeige Symbol: überrascht' }] },
      { event: 'wenn geschüttelt', body: [{ a: shake }] },
      { event: 'dauerhaft', loop: true, body: [
        { if: 'Lautstärke > 100', then: [{ a: 'Motor: wegdrehen', t: 'motor' }] }
      ] }
    ],
    variable: [
      { event: 'dauerhaft', loop: true, body: [
        { if: 'wenn Knopf A ist geklickt', then: [
          { a: 'setze RGB-LED auf Farbe rot' },
          { a: 'ändere zaehler um 1', t: 'var' },
          { a: 'Warte, bis Knopf A losgelassen', t: 'wait' },
          { a: 'eingebaute RGB-LED ausschalten' }
        ] },
        { if: 'wenn Knopf B ist geklickt', then: [{ a: 'zeige Zahl zaehler' }] }
      ] },
      { event: 'beim Start', body: [{ a: 'setze zaehler auf 0', t: 'var' }] }
    ],
    andOr: [
      { event: 'dauerhaft', loop: true, body: [
        { if: 'Lichtstärke > 50 UND Abstand (cm) > 10',
          then: [{ a: 'Motor beide vorwärts', t: 'motor' }],
          else: [{ a: 'Motor beide anhalten', t: 'motor' }] }
      ] }
    ],
    parameter: (ms) => [
      { event: 'beim Start', body: [{ a: `setze pause auf ${ms}`, t: 'var' }] },
      { event: 'dauerhaft', loop: true, body: [
        { a: 'zeige LEDs: großes Herz' },
        { a: 'pausiere (pause) ms', t: 'wait' },
        { a: 'zeige LEDs: kleines Herz' },
        { a: 'pausiere (pause) ms', t: 'wait' }
      ] }
    ]
  };

  /* ---------- Merksätze (gleich für beide Tiere) ---------- */
  const M = {
    sequence: 'Eine <strong>Sequenz</strong> ist eine Reihe von Befehlen, die der Calliope nacheinander von oben nach unten ausführt.',
    loop: 'Alles im Block <strong>dauerhaft</strong> wiederholt der Calliope immer wieder. Das ist eine <strong>Endlosschleife</strong>.',
    sensor: 'Ein <strong>Sensor</strong> misst etwas aus der Umwelt (z. B. Licht) und gibt dem Programm eine Zahl. Das ist eine <strong>Eingabe</strong>.',
    condition: 'Mit <strong>wenn … dann</strong> entscheidet der Calliope: Nur wenn die Bedingung stimmt (z. B. Knopf A gedrückt), führt er diese Befehle aus.',
    nested: 'Eine Bedingung kann in einer anderen stecken (<strong>verschachtelte Bedingung</strong>). Die innere wird nur geprüft, wenn die äußere stimmt.',
    events: 'Ein Programm kann auf viele <strong>Ereignisse</strong> reagieren. Jedes Ereignis bekommt seinen eigenen Block.',
    variable: 'Eine <strong>Variable</strong> ist ein Speicher mit Namen. Darin merkt sich der Calliope einen Wert, der sich ändern kann.',
    andOr: 'Bei <strong>UND</strong> müssen beide Bedingungen stimmen. Bei <strong>ODER</strong> reicht es, wenn eine stimmt.',
    algorithm: 'Ein <strong>Algorithmus</strong> ist ein genauer Ablaufplan. Mit <strong>Parametern</strong> (z. B. der Pausenlänge) verändere ich sein Verhalten, ohne den Ablauf zu ändern.'
  };

  /* ---------- Kurze Erklärungen für die Merke-Kiste ---------- */
  const C = {
    sequence: `<p>Der Calliope arbeitet deine Blöcke <strong>der Reihe nach</strong> ab – von oben nach unten. Vertauschst du zwei Blöcke, passiert etwas anderes.</p>`,
    loop: `<p>Was in ${b('beim Start')} steht, passiert nur einmal. Was in ${b('dauerhaft')} steht, beginnt nach dem letzten Block wieder von vorne.</p>`,
    sensor: `<p>Der Lichtsensor gibt eine Zahl von <strong>0</strong> (stockdunkel) bis <strong>255</strong> (sehr hell). Mit ${b('wenn … dann … sonst')} prüft dein Programm diese Zahl.</p>`,
    condition: `<p>Der Block ${b('wenn Knopf A gedrückt')} wartet. Nur <strong>wenn</strong> der Knopf gedrückt wird, <strong>dann</strong> laufen die Befehle darin. Der Block ${b('wenn … dann … sonst')} aus Kapitel 3 funktioniert genauso.</p>`,
    nested: `<p>Der Ultraschallsensor misst den Abstand in cm – wie ein Echolot. Erst prüft der Calliope das Licht. Nur wenn es hell ist, prüft er auch den Abstand.</p>`,
    events: `<p>Dein Calliope kann auf vieles gleichzeitig warten: Knöpfe, Berührung, Schütteln. Jedes Ereignis startet seinen eigenen Block, sobald es passiert.</p>`,
    variable: `<p>Damit sich der Calliope etwas merken kann, braucht er eine <strong>Variable</strong>: eine Schublade mit Etikett, in der eine Zahl liegt. Das Diagramm zeigt ein Beispiel: Ein Zähler zählt, wie oft Knopf A gedrückt wurde.</p>`,
    andOr: `<p>Mit ${b('… und …')} und ${b('… oder …')} aus <strong>Logik</strong> verbindest du zwei Bedingungen zu einer.</p>`,
    algorithm: `<p>Die Zahlen in deinem Programm – Pausen, Tempo, Schwellenwerte – heißen <strong>Parameter</strong>. Gleicher Ablauf, andere Parameter: anderer Charakter.</p>`
  };

  return {

    /* --- UI Strings --- */
    ui: {
      siteTitle: 'Hase & Schildkröte',
      siteSubtitle: 'Eine algorithmische Reise mit dem Calliope mini',
      landingIntro: 'Zwei Tiere. Zwei Geschichten. Ein gemeinsamer Weg.<br>Wähle dein Tier — und erwecke es zum Leben.',
      hareName: 'Der Hase',
      hareDesc: 'Schnell, neugierig, ungeduldig.<br>Er lernt, dass Geschwindigkeit nicht alles ist.',
      tortoiseName: 'Die Schildkröte',
      tortoiseDesc: 'Ruhig, bedacht, beharrlich.<br>Sie entdeckt, dass Langsamkeit eine Stärke ist.',
      or: 'oder',
      backToSelection: 'Zurück',
      lrs: 'LRS',
      python: 'Python',
      prevChapter: 'Vorheriges Kapitel',
      nextChapter: 'Nächstes Kapitel',
      problemTitle: 'Das Problem',
      conceptTitle: 'Merke-Kiste',
      merkeCopy: 'Schreib das in deinen Hefter:',
      diagramLabel: 'Der Ablauf als Diagramm',
      diagramThen: 'dann',
      diagramElse: 'sonst',
      guidedTaskTitle: 'Aufgabe',
      chapterLabel: 'Kapitel',
      groupBasics: 'Grundlagen',
      groupBonus1: 'Bonus 1',
      groupBonus2: 'Bonus 2',
      missionRequirements: 'Das muss dein Programm können:',
      abilitiesIntro: 'Klicke auf eine Fähigkeit, um mehr zu erfahren:',
      hintLabel: 'Tipp',
      merkCheckTitle: 'Hast du den Merksatz in deinen Hefter abgeschrieben?',
      merkCheckText: 'Der Merksatz steht in der Merke-Kiste. Schreib ihn ab, bevor du weitermachst.',
      merkCheckYes: 'Ja, weiter ✓',
      merkCheckNo: 'Nein, zeig ihn mir',
      openMakeCode: 'MakeCode öffnen',
      hardwareLabel: 'Ich besitze die nötige Hardware (Calliope mini + Motoren + Sensoren)'
    },

    /* --- Chapter Data --- */
    chapters: {

      /* ==========================================
         HASE — 9 Kapitel
         ========================================== */
      hare: [

        /* ---- KAPITEL 1: ERWACHEN (Sequenz) — GRUNDLAGEN ---- */
        {
          id: 1,
          title: 'Erwachen',
          conceptLabel: 'Sequenz — Befehle nacheinander',
          conceptShort: 'Sequenz',
          image: 'img/chapters/hare/h1.png',
          narrative: `<p>Auf einer kleinen Platine blinkt ein Licht. Es ist ein Hase – nicht aus Fell, sondern aus Licht und Strom. Er wurde gerade eingeschaltet und will zeigen: <em>Hier bin ich!</em></p>`,
          problem: `<p>Wie bringst du den Calliope mini dazu, <strong>nacheinander</strong> verschiedene LED-Bilder zu zeigen?</p>`,
          concept: C.sequence,
          merksatz: M.sequence,
          diagram: D.sequence(500, 'Pfeil ↑'),
          guidedTask: {
            title: 'Dein Hase zeigt sein erstes Lebenszeichen',
            steps: [
              { title: 'Öffne den Editor',
                text: `Gehe zu <a href="https://makecode.calliope.cc" target="_blank" rel="noopener">makecode.calliope.cc</a> und klicke auf <strong>Neues Projekt</strong>. Gib ihm einen Namen.` },
              { title: 'Zeige ein Herz',
                text: `Ziehe ${b('zeige LEDs')} aus <strong>Grundlagen</strong> in ${b('beim Start')}. Klicke die LEDs an, bis ein Herz entsteht.` },
              { title: 'Füge eine Pause ein',
                text: `Ziehe ${b('pausiere (ms)')} aus <strong>Grundlagen</strong> darunter. Stelle <strong>500</strong> ein – der Hase ist schnell!` },
              { title: 'Zeige einen Pfeil',
                text: `Ziehe ${b('zeige Symbol')} darunter und wähle den Pfeil nach oben. Danach wieder ${b('pausiere (ms) 500')}.` },
              { title: 'Lösche die Anzeige',
                text: `Ziehe ${b('Bildschirminhalt löschen')} ganz nach unten.` },
              { title: 'Teste dein Programm',
                text: `Klicke im Simulator auf ▶. Erst das Herz, dann der Pfeil, dann ist alles dunkel? Das ist deine <strong>Sequenz</strong>!`,
                textHw: `Klicke auf <strong>Herunterladen</strong> und ziehe die Datei auf deinen Calliope mini. Erst das Herz, dann der Pfeil, dann ist alles dunkel? Das ist deine <strong>Sequenz</strong>!` }
            ]
          }
        },

        /* ---- KAPITEL 2: ATMEN (Endlosschleife) — GRUNDLAGEN ---- */
        {
          id: 2,
          title: 'Atmen',
          conceptLabel: 'Endlosschleife — Dauerhaftes Wiederholen',
          conceptShort: 'Endlosschleife',
          image: 'img/chapters/hare/h2.png',
          narrative: `<p>Dein Hase hat sich gezeigt – und dann ist er wieder still. Aber Lebewesen hören nicht einfach auf. Sie atmen, immer weiter. Und ein Hase atmet schnell!</p>`,
          problem: `<p>Wie bringst du deinen Hasen dazu, <strong>immer weiter</strong> zu atmen?</p>`,
          concept: C.loop,
          merksatz: M.loop,
          diagram: D.loop(300),
          guidedTask: {
            title: 'Der Herzschlag des Hasen',
            steps: [
              { title: 'Öffne dein Projekt',
                text: 'Öffne dein Projekt aus Kapitel 1.' },
              { title: 'Finde den Dauerhaft-Block',
                text: `Der Block ${b('dauerhaft')} ist schon im Editor. Alles darin wird endlos wiederholt.` },
              { title: 'Zeige ein großes Herz',
                text: `Ziehe ${b('zeige LEDs')} in ${b('dauerhaft')}. Male ein großes Herz.` },
              { title: 'Pause – Einatmen',
                text: `Füge ${b('pausiere (ms)')} ein und stelle <strong>300</strong> ein. Der Hase atmet schnell!` },
              { title: 'Zeige ein kleines Herz',
                text: `Füge noch einen ${b('zeige LEDs')} ein. Male ein kleines Herz – das ist das Ausatmen.` },
              { title: 'Pause – Ausatmen',
                text: `Füge noch einmal ${b('pausiere (ms) 300')} ein.` },
              { title: 'Beobachte',
                text: 'Starte den Simulator. Groß, klein, groß, klein … Dein Hase atmet!',
                textHw: 'Lade das Programm auf deinen Calliope mini. Groß, klein, groß, klein … Dein Hase atmet!' }
            ]
          }
        },

        /* ---- KAPITEL 3: WAHRNEHMEN (Sensoren) — GRUNDLAGEN ---- */
        {
          id: 3,
          title: 'Wahrnehmen',
          conceptLabel: 'Eingaben und Sensoren',
          conceptShort: 'Sensoren',
          image: 'img/chapters/hare/h3.png',
          narrative: `<p>Dein Hase atmet Tag und Nacht. Echte Hasen schlafen aber, wenn es dunkel ist. Dein Calliope hat einen <strong>Lichtsensor</strong> – damit merkt der Hase, ob es hell oder dunkel ist. Ihm reicht schon ein bisschen Licht.</p>`,
          problem: `<p>Dein Hase soll nur atmen, wenn es <strong>hell</strong> ist. Im Dunkeln soll er schlafen.</p>`,
          concept: C.sensor,
          merksatz: M.sensor,
          diagram: D.sensor(300, 50),
          guidedTask: {
            title: 'Der Hase sieht das Licht',
            steps: [
              { title: 'Sensor kennenlernen',
                text: `Unter <strong>Eingabe</strong> findest du ${b('Lichtstärke')}. Dieser Block liefert eine Zahl.` },
              { title: 'Lichtstärke anzeigen',
                text: `Ziehe ${b('zeige Zahl')} in ${b('dauerhaft')} und setze ${b('Lichtstärke')} hinein. Teste: Wie verändert sich die Zahl?` },
              { title: 'Bedingung vorbereiten',
                text: `Nimm ${b('zeige Zahl')} wieder heraus. Ziehe ${b('wenn … dann … sonst')} aus <strong>Logik</strong> in ${b('dauerhaft')}.` },
              { title: 'Schwellenwert festlegen',
                text: `Baue die Bedingung ${b('Lichtstärke > 50')}. Den Vergleich findest du in <strong>Logik</strong>.` },
              { title: 'Wach-Animation einfügen',
                text: 'Schiebe deine Atem-Animation (großes Herz, Pause, kleines Herz, Pause) in den <strong>dann</strong>-Teil.' },
              { title: 'Schlaf-Modus einfügen',
                text: `In den <strong>sonst</strong>-Teil kommt ${b('zeige Zeichenfolge "z"')}. Der Hase schläft.` },
              { title: 'Teste mit Licht und Schatten',
                text: 'Stelle im Simulator die Lichtstärke niedrig → der Hase schläft. Stelle sie hoch → er wacht auf.',
                textHw: 'Lade das Programm herunter. Bedecke den Sensor → der Hase schläft. Licht an → er wacht auf.' }
            ]
          }
        },

        /* ---- KAPITEL 4: ENTSCHEIDEN (Wenn-Dann) — GRUNDLAGEN ---- */
        {
          id: 4,
          title: 'Entscheiden',
          conceptLabel: 'Bedingungen — Wenn-Dann',
          conceptShort: 'Wenn-Dann',
          image: 'img/chapters/hare/h4.png',
          narrative: `<p>Dein Hase wacht auf, wenn es hell wird. Jetzt soll er auf dich reagieren: <strong>Knopf A</strong> heißt Streicheln, <strong>Knopf B</strong> heißt Füttern. Der Hase reagiert blitzschnell.</p>`,
          problem: `<p>Dein Hase soll beim Streicheln (A) etwas anderes zeigen als beim Füttern (B) – und dazwischen weiteratmen.</p>`,
          concept: C.condition,
          merksatz: M.condition,
          diagram: D.buttons(false),
          guidedTask: {
            title: 'Der Hase lernt zu unterscheiden',
            steps: [
              { title: 'Knopf A: Streicheln',
                text: `Ziehe ${b('wenn Knopf A gedrückt')} aus <strong>Eingabe</strong> auf eine freie Stelle.` },
              { title: 'Freude zeigen',
                text: `Wie zeigt dein Hase Freude? Lege ein LED-Bild oder Symbol hinein. Dann ${b('pausiere (ms) 500')} und ${b('Bildschirminhalt löschen')}.` },
              { title: 'Knopf B: Füttern',
                text: `Ziehe noch einen ${b('wenn Knopf A gedrückt')} heraus und stelle ihn auf <strong>B</strong> um.` },
              { title: 'Fressen zeigen',
                text: 'Was zeigt dein Hase beim Fressen? Wähle ein anderes Bild als bei A. Pause und Löschen wie vorher.' },
              { title: 'Atmung beibehalten',
                text: `Dein ${b('dauerhaft')}-Block bleibt, wie er ist. So atmet der Hase weiter.` },
              { title: 'Teste beide Knöpfe',
                text: 'Klicke im Simulator auf A und B. Der Hase freut sich, frisst – und atmet dazwischen weiter.',
                textHw: 'Lade das Programm herunter und drücke A und B auf deinem Calliope mini.' }
            ]
          }
        },

        /* ---- KAPITEL 5: BEWEGEN (Motoren + Ultraschall) — GRUNDLAGEN ---- */
        {
          id: 5,
          title: 'Bewegen',
          conceptLabel: 'Motorsteuerung und Ultraschallsensor',
          conceptShort: 'Motoren',
          image: 'img/chapters/hare/h5.png',
          narrative: `<p>Dein Hase kann atmen, sehen und reagieren – aber er sitzt still. Mit dem <strong>Motion Kit</strong> bekommt er Räder und einen <strong>Ultraschallsensor</strong>, der Abstände misst.</p>`,
          problem: `<p>Dein Hase soll losfahren, wenn es hell ist – aber anhalten, wenn ein Hindernis vor ihm steht.</p>`,
          concept: C.nested,
          merksatz: M.nested,
          diagram: D.motors(200),
          guidedTask: {
            title: 'Der Hase lernt sich zu bewegen',
            steps: [
              { title: 'MotionKit-Erweiterung laden',
                text: 'Öffne dein Projekt. Klicke auf <strong>Erweiterungen</strong> und wähle <strong>MotionKit (V2)</strong>. Die neuen Blöcke findest du in der Kategorie <strong>MotionKit</strong>. Steht es nicht in der Liste? Füge den Link <a href="https://github.com/tinysuperlab/MotionKitV2" target="_blank" rel="noopener">github.com/tinysuperlab/MotionKitV2</a> in das Suchfeld ein.' },
              { title: 'Licht-Bedingung anpassen',
                text: `In ${b('dauerhaft')} steht schon ${b('wenn Lichtstärke > 50 dann … sonst')}. Ändere die Zahl auf <strong>10</strong>.` },
              { title: 'Losfahren bei Licht',
                text: `Lege ${b('Motor beide Richtung vorwärts Tempo 200')} aus <strong>MotionKit</strong> in den <strong>dann</strong>-Teil, über deine Atem-Animation.` },
              { title: 'Anhalten im Dunkeln',
                text: `Lege ${b('Motor beide anhalten')} in den <strong>sonst</strong>-Teil, zu deinem „z". Teste: Dunkel → der Hase stoppt.` },
              { title: 'Zweite Bedingung einbauen',
                text: `Ziehe ein neues ${b('wenn … dann … sonst')} <strong>in den dann-Teil</strong>. Bedingung: ${b('Ultraschallsensor cm > 5')} (aus <strong>MotionKit</strong>).` },
              { title: 'Blöcke einsortieren',
                text: `Schiebe ${b('Motor beide … vorwärts')} und die Atem-Animation ins <strong>innere dann</strong>. Ins <strong>innere sonst</strong> kommt ${b('Motor beide anhalten')}.` },
              { title: 'Testen',
                text: 'Starte den Simulator. Wenig Licht → er schläft. Viel Licht → er fährt. Kleiner Abstand → er stoppt.',
                textHw: 'Lade das Programm auf deinen Calliope. Licht an → er fährt. Hand vor den Sensor → er stoppt. Licht aus → er schläft.' }
            ]
          }
        },

        /* ---- KAPITEL 6: MEIN TIER (Ereignisse / Integration) — BONUS 1 ---- */
        {
          id: 6,
          title: 'Mein Tier',
          conceptLabel: 'Persönlichkeit — Ereignisse kombinieren',
          conceptShort: 'Integration',
          image: 'img/chapters/hare/h6.png',
          narrative: `<p>Bis jetzt hast du Anleitungen befolgt. Jetzt machst du deinen Hasen zu <em>deinem</em> Tier. Neue Sinne warten auf ihn: <strong>Berührung</strong>, <strong>Schütteln</strong> und <strong>Geräusche</strong>.</p>`,
          problem: `<p>Wie reagiert dein Hase, wenn man ihn berührt, schüttelt oder anschreit? Das entscheidest du – passend zu einem schnellen, ungeduldigen Hasen.</p>`,
          concept: C.events,
          merksatz: M.events,
          diagram: D.events('zeige Symbol: schwindelig'),
          guidedTask: {
            title: 'Gib deinem Hasen Persönlichkeit',
            goal: 'Wähle neue Fähigkeiten aus und baue sie in dein Programm ein. Plane zuerst in deinem Hefter, wie dein Hase reagieren soll.',
            abilities: [
              { icon: '👆', title: 'Touch-Pins', short: 'Der Hase spürt Berührungen.',
                detail: `<p>Block: ${b('wenn Pin P1 berührt')} in <strong>Eingabe</strong>.</p><p>Idee: Berührung links → der Hase weicht nach rechts aus.</p>` },
              { icon: '📳', title: 'Schütteln', short: 'Der Hase merkt, wenn er geschüttelt wird.',
                detail: `<p>Block: ${b('wenn geschüttelt')} in <strong>Eingabe</strong>.</p><p>Idee: Erschrickt er? Wird ihm schwindelig? Hüpft er vor Freude?</p>` },
              { icon: '🎤', title: 'Mikrofon', short: 'Der Hase hört, wie laut es ist.',
                detail: `<p>Block: ${b('Lautstärke')} in <strong>Eingabe</strong> – eine Zahl, wie bei der Lichtstärke.</p><p>Idee: Wird es zu laut, dreht er sich mit den Motoren weg.</p><p>Überlege: Wo muss die Bedingung stehen, damit der Calliope sie immer wieder prüft?</p>` },
            ],
            requirements: [
              'Mindestens <strong>zwei</strong> neue Fähigkeiten sind eingebaut.',
              'Du hast vorher im Hefter notiert: <em>Ereignis → Reaktion</em>.',
              'Jede Reaktion passt zum Charakter deines Hasen.',
              'Atmen, Licht, Knöpfe und Fahren funktionieren weiterhin.',
              'Zeige deinen Hasen jemandem: Erkennt die Person seinen Charakter?'
            ],
            hints: [
              `Neue Ereignis-Blöcke legst du auf eine freie Stelle – nicht in ${b('dauerhaft')}.`
            ]
          }
        },

        /* ---- KAPITEL 7: GEFÜHLE (Variablen) — BONUS 1 ---- */
        {
          id: 7,
          title: 'Gefühle',
          conceptLabel: 'Zustände und Variablen',
          conceptShort: 'Variablen',
          image: 'img/chapters/hare/h7.png',
          narrative: `<p>Echte Tiere haben Gefühle: hungrig, satt, müde. Dein Hase soll sich merken, wie viel er gefressen hat. Er ist ungeduldig – er will ständig Futter!</p>`,
          problem: `<p>Jedes Mal, wenn du deinen Hasen fütterst (Knopf B), leuchtet eine RGB-LED mehr. Leuchten alle <strong>3 LEDs</strong>, ist er satt.</p>`,
          concept: C.variable,
          merksatz: M.variable,
          diagram: D.variable,
          guidedTask: {
            title: 'Der Hase bekommt Futter',
            goal: 'Dein Hase merkt sich in einer Variable, wie satt er ist, und zeigt es mit den RGB-LEDs.',
            requirements: [
              'Es gibt eine Variable <code>futter</code>. Am Start ist sie 0 – keine RGB-LED leuchtet.',
              'Knopf B erhöht <code>futter</code> um 1. Dann leuchtet eine RGB-LED mehr.',
              'Bei 3 ist Schluss: Der Hase frisst nicht mehr und zeigt, dass er satt ist.'
            ],
            hints: [
              'Variablen erstellst du unter <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Die RGB-LEDs findest du unter <strong>RGB-LED</strong>.',
              'Damit bei 3 Schluss ist, muss dein Programm <em>vor</em> dem Füttern prüfen, wie groß <code>futter</code> ist.'
            ]
          }
        },

        /* ---- KAPITEL 8: LERNEN (UND / ODER) — BONUS 2 ---- */
        {
          id: 8,
          title: 'Lernen',
          conceptLabel: 'Kombination mehrerer Bedingungen',
          conceptShort: 'UND / ODER',
          image: 'img/chapters/hare/h8.png',
          narrative: `<p>Bis jetzt entscheidet dein Hase nach einer Sache. Kluge Tiere denken an mehreres gleichzeitig: <em>Ich habe Hunger <strong>und</strong> es ist hell – also suche ich Futter.</em></p>`,
          problem: `<p>Dein Hase soll Entscheidungen treffen, bei denen er <strong>zwei Dinge</strong> gleichzeitig beachtet.</p>`,
          concept: C.andOr,
          merksatz: M.andOr,
          diagram: D.andOr,
          guidedTask: {
            title: 'Der Hase denkt nach',
            goal: 'Dein Hase bekommt zwei Gefühle: <code>hunger</code> und <code>muedigkeit</code>. Danach entscheidet er, was er tut.',
            requirements: [
              'Es gibt die Variablen <code>hunger</code> und <code>muedigkeit</code>. Beide werden mit der Zeit größer.',
              'Hat er großen Hunger <strong>und</strong> ist es hell, sucht er Futter: Er fährt los.',
              'Ist er sehr müde <strong>oder</strong> ist es dunkel, schläft er: Motoren aus.',
              'Sonst atmet er ganz normal.',
              'Man kann ihn füttern und ausschlafen lassen – sonst wachsen die Werte endlos.',
              'Die Schwellenwerte wählst du selbst – passend zu einem ungeduldigen Hasen.'
            ],
            hints: [
              `Die Reihenfolge ist wichtig: In ${b('wenn … dann … sonst wenn …')} gewinnt die erste Bedingung, die stimmt.`
            ]
          }
        },

        /* ---- KAPITEL 9: BEGEGNUNG (Algorithmen) — BONUS 2 ---- */
        {
          id: 9,
          title: 'Begegnung',
          conceptLabel: 'Algorithmen und Parameter',
          conceptShort: 'Algorithmen',
          image: 'img/chapters/hare/h9.png',
          narrative: `<p>Heute trifft dein Hase eine Schildkröte. So langsam – was kann die schon? Doch dann merkt er: Sie kann genau dasselbe wie er. Nur ihre Zahlen sind anders.</p>`,
          problem: `<p>Hase und Schildkröte haben fast dasselbe Programm. Was genau ist anders – und können die beiden zusammenarbeiten?</p>`,
          concept: C.algorithm,
          merksatz: M.algorithm,
          diagram: D.parameter(300),
          guidedTask: {
            title: 'Hase trifft Schildkröte',
            goal: 'Arbeite mit jemandem zusammen, der die Schildkröte programmiert hat.',
            requirements: [
              'Vergleicht eure Programme. Schreibt auf, welche Blöcke gleich sind und welche <strong>Parameter</strong> sich unterscheiden.',
              'Tauscht die Parameter: Dein Hase bekommt die Werte der Schildkröte. Wie wirkt er jetzt?',
              'Verbindet eure Calliope über <strong>Funk</strong>: Der Hase meldet ein Hindernis, die Schildkröte antwortet.',
              'Denkt euch eine Aufgabe aus, die nur zu zweit klappt – und programmiert sie.'
            ],
            hints: [
              'Beide Calliope müssen in derselben <strong>Funkgruppe</strong> sein.'
            ]
          }
        }
      ],

      /* ==========================================
         SCHILDKRÖTE — 9 Kapitel
         ========================================== */
      tortoise: [

        /* ---- KAPITEL 1: ERWACHEN (Sequenz) — GRUNDLAGEN ---- */
        {
          id: 1,
          title: 'Erwachen',
          conceptLabel: 'Sequenz — Befehle nacheinander',
          conceptShort: 'Sequenz',
          image: 'img/chapters/tortoise/t1.png',
          narrative: `<p>Auf einer kleinen Platine regt sich etwas. Eine Schildkröte wacht auf – langsam, sehr langsam. Sie hat es nie eilig. Sie muss nicht schnell sein, sondern genau.</p>`,
          problem: `<p>Wie bringst du den Calliope mini dazu, <strong>nacheinander</strong> verschiedene LED-Bilder zu zeigen?</p>`,
          concept: C.sequence,
          merksatz: M.sequence,
          diagram: D.sequence(1500, 'Diamant ◇'),
          guidedTask: {
            title: 'Deine Schildkröte zeigt ihr erstes Lebenszeichen',
            steps: [
              { title: 'Öffne den Editor',
                text: `Gehe zu <a href="https://makecode.calliope.cc" target="_blank" rel="noopener">makecode.calliope.cc</a> und klicke auf <strong>Neues Projekt</strong>. Gib ihm einen Namen.` },
              { title: 'Zeige ein Herz',
                text: `Ziehe ${b('zeige LEDs')} aus <strong>Grundlagen</strong> in ${b('beim Start')}. Klicke die LEDs an, bis ein Herz entsteht.` },
              { title: 'Füge eine Pause ein',
                text: `Ziehe ${b('pausiere (ms)')} aus <strong>Grundlagen</strong> darunter. Stelle <strong>1500</strong> ein – die Schildkröte lässt sich Zeit.` },
              { title: 'Zeige ein Symbol',
                text: `Ziehe ${b('zeige Symbol')} darunter und wähle den Diamanten (◇). Danach wieder ${b('pausiere (ms) 1500')}.` },
              { title: 'Lösche die Anzeige',
                text: `Ziehe ${b('Bildschirminhalt löschen')} ganz nach unten.` },
              { title: 'Teste dein Programm',
                text: `Klicke im Simulator auf ▶. Erst das Herz, dann der Diamant, dann ist alles dunkel? Das ist deine <strong>Sequenz</strong>!`,
                textHw: `Klicke auf <strong>Herunterladen</strong> und ziehe die Datei auf deinen Calliope mini. Erst das Herz, dann der Diamant, dann ist alles dunkel? Das ist deine <strong>Sequenz</strong>!` }
            ]
          }
        },

        /* ---- KAPITEL 2: ATMEN (Endlosschleife) — GRUNDLAGEN ---- */
        {
          id: 2,
          title: 'Atmen',
          conceptLabel: 'Endlosschleife — Dauerhaftes Wiederholen',
          conceptShort: 'Endlosschleife',
          image: 'img/chapters/tortoise/t2.png',
          narrative: `<p>Deine Schildkröte hat sich gezeigt – und dann ist sie wieder still. Aber Schildkröten sind keine Steine. Sie atmen: langsam, tief und immer weiter.</p>`,
          problem: `<p>Wie bringst du deine Schildkröte dazu, <strong>immer weiter</strong> zu atmen?</p>`,
          concept: C.loop,
          merksatz: M.loop,
          diagram: D.loop(1500),
          guidedTask: {
            title: 'Der Herzschlag der Schildkröte',
            steps: [
              { title: 'Öffne dein Projekt',
                text: 'Öffne dein Projekt aus Kapitel 1.' },
              { title: 'Finde den Dauerhaft-Block',
                text: `Der Block ${b('dauerhaft')} ist schon im Editor. Alles darin wird endlos wiederholt.` },
              { title: 'Zeige ein großes Herz',
                text: `Ziehe ${b('zeige LEDs')} in ${b('dauerhaft')}. Male ein großes Herz.` },
              { title: 'Pause – Einatmen',
                text: `Füge ${b('pausiere (ms)')} ein und stelle <strong>1500</strong> ein. Die Schildkröte atmet langsam und tief.` },
              { title: 'Zeige ein kleines Herz',
                text: `Füge noch einen ${b('zeige LEDs')} ein. Male ein kleines Herz – das ist das Ausatmen.` },
              { title: 'Pause – Ausatmen',
                text: `Füge noch einmal ${b('pausiere (ms) 1500')} ein.` },
              { title: 'Beobachte',
                text: 'Starte den Simulator. Groß … klein … groß … klein … Deine Schildkröte atmet!',
                textHw: 'Lade das Programm auf deinen Calliope mini. Groß … klein … groß … klein … Deine Schildkröte atmet!' }
            ]
          }
        },

        /* ---- KAPITEL 3: WAHRNEHMEN (Sensoren) — GRUNDLAGEN ---- */
        {
          id: 3,
          title: 'Wahrnehmen',
          conceptLabel: 'Eingaben und Sensoren',
          conceptShort: 'Sensoren',
          image: 'img/chapters/tortoise/t3.png',
          narrative: `<p>Deine Schildkröte atmet Tag und Nacht. Echte Schildkröten warten aber auf die Sonne. Dein Calliope hat einen <strong>Lichtsensor</strong> – damit merkt die Schildkröte, ob es hell ist. Sie wacht erst auf, wenn es richtig hell wird.</p>`,
          problem: `<p>Deine Schildkröte soll nur atmen, wenn es <strong>hell</strong> ist. Im Dunkeln soll sie ruhen.</p>`,
          concept: C.sensor,
          merksatz: M.sensor,
          diagram: D.sensor(1500, 120),
          guidedTask: {
            title: 'Die Schildkröte spürt die Sonne',
            steps: [
              { title: 'Sensor kennenlernen',
                text: `Unter <strong>Eingabe</strong> findest du ${b('Lichtstärke')}. Dieser Block liefert eine Zahl.` },
              { title: 'Lichtstärke anzeigen',
                text: `Ziehe ${b('zeige Zahl')} in ${b('dauerhaft')} und setze ${b('Lichtstärke')} hinein. Teste: Wie verändert sich die Zahl?` },
              { title: 'Bedingung vorbereiten',
                text: `Nimm ${b('zeige Zahl')} wieder heraus. Ziehe ${b('wenn … dann … sonst')} aus <strong>Logik</strong> in ${b('dauerhaft')}.` },
              { title: 'Schwellenwert festlegen',
                text: `Baue die Bedingung ${b('Lichtstärke > 120')}. Den Vergleich findest du in <strong>Logik</strong>.` },
              { title: 'Wach-Animation einfügen',
                text: 'Schiebe deine Atem-Animation (großes Herz, Pause, kleines Herz, Pause) in den <strong>dann</strong>-Teil.' },
              { title: 'Ruhe-Modus einfügen',
                text: `In den <strong>sonst</strong>-Teil kommt ${b('zeige Zeichenfolge "z"')}. Die Schildkröte ruht.` },
              { title: 'Teste mit Licht und Schatten',
                text: 'Stelle im Simulator die Lichtstärke niedrig → die Schildkröte ruht. Stelle sie hoch → sie wacht auf.',
                textHw: 'Lade das Programm herunter. Bedecke den Sensor → die Schildkröte ruht. Viel Licht → sie wacht auf.' }
            ]
          }
        },

        /* ---- KAPITEL 4: ENTSCHEIDEN (Wenn-Dann) — GRUNDLAGEN ---- */
        {
          id: 4,
          title: 'Entscheiden',
          conceptLabel: 'Bedingungen — Wenn-Dann',
          conceptShort: 'Wenn-Dann',
          image: 'img/chapters/tortoise/t4.png',
          narrative: `<p>Deine Schildkröte wacht auf, wenn die Sonne scheint. Jetzt soll sie auf dich reagieren: <strong>Knopf A</strong> heißt Streicheln, <strong>Knopf B</strong> heißt Füttern. Die Schildkröte denkt erst kurz nach – dann antwortet sie.</p>`,
          problem: `<p>Deine Schildkröte soll beim Streicheln (A) etwas anderes zeigen als beim Füttern (B) – und dazwischen weiteratmen.</p>`,
          concept: C.condition,
          merksatz: M.condition,
          diagram: D.buttons(true),
          guidedTask: {
            title: 'Die Schildkröte lernt zu unterscheiden',
            steps: [
              { title: 'Knopf A: Streicheln',
                text: `Ziehe ${b('wenn Knopf A gedrückt')} aus <strong>Eingabe</strong> auf eine freie Stelle.` },
              { title: 'Bedächtige Freude',
                text: `Zuerst denkt sie nach: ${b('pausiere (ms) 1000')}. Dann ein LED-Bild für Freude, ${b('pausiere (ms) 500')} und ${b('Bildschirminhalt löschen')}.` },
              { title: 'Knopf B: Füttern',
                text: `Ziehe noch einen ${b('wenn Knopf A gedrückt')} heraus und stelle ihn auf <strong>B</strong> um.` },
              { title: 'Fressen zeigen',
                text: 'Auch hier denkt sie erst nach. Wähle dann ein anderes Bild als bei A. Pause und Löschen wie vorher.' },
              { title: 'Atmung beibehalten',
                text: `Dein ${b('dauerhaft')}-Block bleibt, wie er ist. So atmet die Schildkröte weiter.` },
              { title: 'Teste beide Knöpfe',
                text: 'Klicke im Simulator auf A und B. Sie überlegt, freut sich, frisst – und atmet dazwischen weiter.',
                textHw: 'Lade das Programm herunter und drücke A und B auf deinem Calliope mini.' }
            ]
          }
        },

        /* ---- KAPITEL 5: BEWEGEN (Motoren + Ultraschall) — GRUNDLAGEN ---- */
        {
          id: 5,
          title: 'Bewegen',
          conceptLabel: 'Motorsteuerung und Ultraschallsensor',
          conceptShort: 'Motoren',
          image: 'img/chapters/tortoise/t5.png',
          narrative: `<p>Deine Schildkröte kann atmen, sehen und reagieren – aber sie sitzt still. Mit dem <strong>Motion Kit</strong> bekommt sie Räder und einen <strong>Ultraschallsensor</strong>, der Abstände misst. Langsam, aber unaufhaltsam!</p>`,
          problem: `<p>Deine Schildkröte soll losfahren, wenn es hell ist – aber anhalten, wenn ein Hindernis vor ihr steht.</p>`,
          concept: C.nested,
          merksatz: M.nested,
          diagram: D.motors(80),
          guidedTask: {
            title: 'Die Schildkröte lernt sich zu bewegen',
            steps: [
              { title: 'MotionKit-Erweiterung laden',
                text: 'Öffne dein Projekt. Klicke auf <strong>Erweiterungen</strong> und wähle <strong>MotionKit (V2)</strong>. Die neuen Blöcke findest du in der Kategorie <strong>MotionKit</strong>. Steht es nicht in der Liste? Füge den Link <a href="https://github.com/tinysuperlab/MotionKitV2" target="_blank" rel="noopener">github.com/tinysuperlab/MotionKitV2</a> in das Suchfeld ein.' },
              { title: 'Licht-Bedingung anpassen',
                text: `In ${b('dauerhaft')} steht schon ${b('wenn Lichtstärke > 120 dann … sonst')}. Ändere die Zahl auf <strong>10</strong>.` },
              { title: 'Losfahren bei Licht',
                text: `Lege ${b('Motor beide Richtung vorwärts Tempo 80')} aus <strong>MotionKit</strong> in den <strong>dann</strong>-Teil, über deine Atem-Animation.` },
              { title: 'Anhalten im Dunkeln',
                text: `Lege ${b('Motor beide anhalten')} in den <strong>sonst</strong>-Teil, zu deinem „z". Teste: Dunkel → die Schildkröte stoppt.` },
              { title: 'Zweite Bedingung einbauen',
                text: `Ziehe ein neues ${b('wenn … dann … sonst')} <strong>in den dann-Teil</strong>. Bedingung: ${b('Ultraschallsensor cm > 5')} (aus <strong>MotionKit</strong>).` },
              { title: 'Blöcke einsortieren',
                text: `Schiebe ${b('Motor beide … vorwärts')} und die Atem-Animation ins <strong>innere dann</strong>. Ins <strong>innere sonst</strong> kommt ${b('Motor beide anhalten')}.` },
              { title: 'Testen',
                text: 'Starte den Simulator. Wenig Licht → sie ruht. Viel Licht → sie fährt. Kleiner Abstand → sie stoppt.',
                textHw: 'Lade das Programm auf deinen Calliope. Licht an → sie fährt. Hand vor den Sensor → sie stoppt. Licht aus → sie ruht.' }
            ]
          }
        },

        /* ---- KAPITEL 6: MEIN TIER (Ereignisse / Integration) — BONUS 1 ---- */
        {
          id: 6,
          title: 'Mein Tier',
          conceptLabel: 'Persönlichkeit — Ereignisse kombinieren',
          conceptShort: 'Integration',
          image: 'img/chapters/tortoise/t6.png',
          narrative: `<p>Bis jetzt hast du Anleitungen befolgt. Jetzt machst du deine Schildkröte zu <em>deinem</em> Tier. Neue Sinne warten auf sie: <strong>Berührung</strong>, <strong>Schütteln</strong> und <strong>Geräusche</strong>.</p>`,
          problem: `<p>Wie reagiert deine Schildkröte, wenn man sie berührt, schüttelt oder anschreit? Das entscheidest du – passend zu einer ruhigen, bedachten Schildkröte.</p>`,
          concept: C.events,
          merksatz: M.events,
          diagram: D.events('zeige Symbol: schwindelig'),
          guidedTask: {
            title: 'Gib deiner Schildkröte Persönlichkeit',
            goal: 'Wähle neue Fähigkeiten aus und baue sie in dein Programm ein. Plane zuerst in deinem Hefter, wie deine Schildkröte reagieren soll.',
            abilities: [
              { icon: '👆', title: 'Touch-Pins', short: 'Die Schildkröte spürt Berührungen.',
                detail: `<p>Block: ${b('wenn Pin P1 berührt')} in <strong>Eingabe</strong>.</p><p>Idee: Berührung links → sie lenkt sanft nach rechts.</p>` },
              { icon: '📳', title: 'Schütteln', short: 'Die Schildkröte merkt, wenn sie geschüttelt wird.',
                detail: `<p>Block: ${b('wenn geschüttelt')} in <strong>Eingabe</strong>.</p><p>Idee: Zieht sie sich in den Panzer zurück? Wartet sie, bis alles wieder ruhig ist?</p>` },
              { icon: '🎤', title: 'Mikrofon', short: 'Die Schildkröte hört, wie laut es ist.',
                detail: `<p>Block: ${b('Lautstärke')} in <strong>Eingabe</strong> – eine Zahl, wie bei der Lichtstärke.</p><p>Idee: Wird es zu laut, stoppt sie erschrocken.</p><p>Überlege: Wo muss die Bedingung stehen, damit der Calliope sie immer wieder prüft?</p>` },
            ],
            requirements: [
              'Mindestens <strong>zwei</strong> neue Fähigkeiten sind eingebaut.',
              'Du hast vorher im Hefter notiert: <em>Ereignis → Reaktion</em>.',
              'Jede Reaktion passt zum Charakter deiner Schildkröte.',
              'Atmen, Licht, Knöpfe und Fahren funktionieren weiterhin.',
              'Zeige deine Schildkröte jemandem: Erkennt die Person ihren Charakter?'
            ],
            hints: [
              `Neue Ereignis-Blöcke legst du auf eine freie Stelle – nicht in ${b('dauerhaft')}.`
            ]
          }
        },

        /* ---- KAPITEL 7: GEFÜHLE (Variablen) — BONUS 1 ---- */
        {
          id: 7,
          title: 'Gefühle',
          conceptLabel: 'Zustände und Variablen',
          conceptShort: 'Variablen',
          image: 'img/chapters/tortoise/t7.png',
          narrative: `<p>Echte Tiere haben Gefühle: hungrig, satt, müde. Deine Schildkröte soll sich merken, wie viel sie gefressen hat. Sie ist genügsam – aber vergessen darfst du sie nicht.</p>`,
          problem: `<p>Jedes Mal, wenn du deine Schildkröte fütterst (Knopf B), leuchtet eine RGB-LED mehr. Leuchten alle <strong>3 LEDs</strong>, ist sie satt.</p>`,
          concept: C.variable,
          merksatz: M.variable,
          diagram: D.variable,
          guidedTask: {
            title: 'Die Schildkröte bekommt Futter',
            goal: 'Deine Schildkröte merkt sich in einer Variable, wie satt sie ist, und zeigt es mit den RGB-LEDs.',
            requirements: [
              'Es gibt eine Variable <code>futter</code>. Am Start ist sie 0 – keine RGB-LED leuchtet.',
              'Knopf B erhöht <code>futter</code> um 1. Dann leuchtet eine RGB-LED mehr.',
              'Bei 3 ist Schluss: Die Schildkröte frisst nicht mehr und zeigt, dass sie satt ist.'
            ],
            hints: [
              'Variablen erstellst du unter <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Die RGB-LEDs findest du unter <strong>RGB-LED</strong>.',
              'Damit bei 3 Schluss ist, muss dein Programm <em>vor</em> dem Füttern prüfen, wie groß <code>futter</code> ist.'
            ]
          }
        },

        /* ---- KAPITEL 8: LERNEN (UND / ODER) — BONUS 2 ---- */
        {
          id: 8,
          title: 'Lernen',
          conceptLabel: 'Kombination mehrerer Bedingungen',
          conceptShort: 'UND / ODER',
          image: 'img/chapters/tortoise/t8.png',
          narrative: `<p>Bis jetzt entscheidet deine Schildkröte nach einer Sache. Weise Tiere wägen mehreres ab: <em>Ich habe Hunger <strong>und</strong> die Sonne scheint – also suche ich Futter.</em></p>`,
          problem: `<p>Deine Schildkröte soll Entscheidungen treffen, bei denen sie <strong>zwei Dinge</strong> gleichzeitig beachtet.</p>`,
          concept: C.andOr,
          merksatz: M.andOr,
          diagram: D.andOr,
          guidedTask: {
            title: 'Die Schildkröte wägt ab',
            goal: 'Deine Schildkröte bekommt zwei Gefühle: <code>hunger</code> und <code>muedigkeit</code>. Danach entscheidet sie, was sie tut.',
            requirements: [
              'Es gibt die Variablen <code>hunger</code> und <code>muedigkeit</code>. Beide werden mit der Zeit größer.',
              'Hat sie großen Hunger <strong>und</strong> ist es hell, sucht sie Futter: Sie fährt langsam los.',
              'Ist sie sehr müde <strong>oder</strong> ist es dunkel, ruht sie: Motoren aus.',
              'Sonst atmet sie ganz normal.',
              'Man kann sie füttern und ausruhen lassen – sonst wachsen die Werte endlos.',
              'Die Schwellenwerte wählst du selbst – passend zu einer geduldigen Schildkröte.'
            ],
            hints: [
              `Die Reihenfolge ist wichtig: In ${b('wenn … dann … sonst wenn …')} gewinnt die erste Bedingung, die stimmt.`
            ]
          }
        },

        /* ---- KAPITEL 9: BEGEGNUNG (Algorithmen) — BONUS 2 ---- */
        {
          id: 9,
          title: 'Begegnung',
          conceptLabel: 'Algorithmen und Parameter',
          conceptShort: 'Algorithmen',
          image: 'img/chapters/tortoise/t9.png',
          narrative: `<p>Heute begegnet deine Schildkröte einem Hasen. So hektisch – was soll das? Doch dann merkt sie: Er kann genau dasselbe wie sie. Nur seine Zahlen sind anders.</p>`,
          problem: `<p>Schildkröte und Hase haben fast dasselbe Programm. Was genau ist anders – und können die beiden zusammenarbeiten?</p>`,
          concept: C.algorithm,
          merksatz: M.algorithm,
          diagram: D.parameter(1500),
          guidedTask: {
            title: 'Schildkröte trifft Hase',
            goal: 'Arbeite mit jemandem zusammen, der den Hasen programmiert hat.',
            requirements: [
              'Vergleicht eure Programme. Schreibt auf, welche Blöcke gleich sind und welche <strong>Parameter</strong> sich unterscheiden.',
              'Tauscht die Parameter: Deine Schildkröte bekommt die Werte des Hasen. Wie wirkt sie jetzt?',
              'Verbindet eure Calliope über <strong>Funk</strong>: Der Hase meldet ein Hindernis, die Schildkröte antwortet.',
              'Denkt euch eine Aufgabe aus, die nur zu zweit klappt – und programmiert sie.'
            ],
            hints: [
              'Beide Calliope müssen in derselben <strong>Funkgruppe</strong> sein.'
            ]
          }
        }
      ]
    },

  /* ============================================================
     TEACHER SOLUTIONS — Password-protected reference programs
     ============================================================ */
  teacherSolutions: {
    password: 'Fabel2025',

    hare: [
      {
        chapter: 1,
        title: 'Nach Kapitel 1 — Aufwachen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 500
    zeige Symbol ↑`
      },
      {
        chapter: 2,
        title: 'Nach Kapitel 2 — Erste Reaktionen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 500
    zeige Symbol ↑

wenn Knopf A gedrückt
    zeige Symbol 😊
    pausiere (ms) 333
    zeige Symbol ♥

wenn Knopf B gedrückt
    zeige Symbol 😮
    pausiere (ms) 333
    zeige Symbol ↑`
      },
      {
        chapter: 3,
        title: 'Nach Kapitel 3 — Sehen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 500
    zeige Symbol ↑

wenn Knopf A gedrückt
    zeige Symbol 😊
    pausiere (ms) 333
    zeige Symbol ♥

wenn Knopf B gedrückt
    zeige Symbol 😮
    pausiere (ms) 333
    zeige Symbol ↑

dauerhaft
    wenn Lichtstärke > 10
        zeige LEDs          (Atem-Muster klein)
        pausiere (ms) 300
        zeige LEDs          (Atem-Muster groß)
        pausiere (ms) 300
    sonst
        zeige Zeichenfolge "z"`
      },
      {
        chapter: 4,
        title: 'Nach Kapitel 4 — Interaktion',
        note: 'Knopf A, Knopf B und Touch-Pins sind kreativ — jedes Kind wählt eigene Symbole/LEDs. Die Struktur bleibt gleich, der Inhalt variiert.'
      },
      {
        chapter: 5,
        title: 'Nach Kapitel 5 — Bewegung (MotionKit)',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 500
    zeige Symbol ↑

wenn Knopf A gedrückt
    zeige Symbol 😊

wenn Knopf B gedrückt
    zeige Symbol 😮

dauerhaft
    wenn Lichtstärke > 10
        wenn Ultraschallsensor cm > 5
            Motor beide Richtung vorwärts Tempo 200
            zeige LEDs      (Atem klein)
            pausiere (ms) 300
            zeige LEDs      (Atem groß)
            pausiere (ms) 300
        sonst
            Motor beide anhalten
    sonst
        Motor beide anhalten
        zeige Zeichenfolge "z"`
      },
      {
        chapter: 6,
        title: 'Nach Kapitel 6 — Persönlichkeit',
        note: 'Dieses Kapitel erweitert durch kreative Blöcke (Schütteln, Lautstärke, Pins). Beispiel:',
        code: `... (alles von Kapitel 5) ...

wenn geschüttelt
    zeige Symbol 😵
    pausiere (ms) 500
    Bildschirminhalt löschen

dauerhaft  (Ergänzung)
    wenn Lautstärke > 128
        Motor beide Richtung vorwärts Tempo 255    (lauter → schneller)
    sonst
        ... (bisherige Logik)`
      },
      {
        chapter: 7,
        title: 'Nach Kapitel 7 — Gefühle (RGB-LEDs)',
        code: `Variable: futter

beim Start
    setze futter auf 0
    zeige Symbol ♥
    pausiere (ms) 500
    zeige Symbol ↑

wenn Knopf B gedrückt
    wenn futter < 3
        ändere futter um 1
        wenn futter = 1
            setze RGB-LED 1 auf grün
        sonst wenn futter = 2
            setze RGB-LED 1 auf grün
            setze RGB-LED 2 auf grün
        sonst wenn futter = 3
            setze RGB-LED 1 auf grün
            setze RGB-LED 2 auf grün
            setze RGB-LED 3 auf grün
    sonst
        zeige Symbol 😊    (schon satt!)

... (+ dauerhaft-Block von Kapitel 5/6)`
      }
    ],

    tortoise: [
      {
        chapter: 1,
        title: 'Nach Kapitel 1 — Aufwachen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 1500
    zeige Symbol ◇`
      },
      {
        chapter: 2,
        title: 'Nach Kapitel 2 — Erste Reaktionen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 1500
    zeige Symbol ◇

wenn Knopf A gedrückt
    zeige Symbol 😊
    pausiere (ms) 1500
    zeige Symbol ♥

wenn Knopf B gedrückt
    zeige Symbol 😮
    pausiere (ms) 1500
    zeige Symbol ◇`
      },
      {
        chapter: 3,
        title: 'Nach Kapitel 3 — Sehen',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 1500
    zeige Symbol ◇

wenn Knopf A gedrückt
    zeige Symbol 😊
    pausiere (ms) 1500
    zeige Symbol ♥

wenn Knopf B gedrückt
    zeige Symbol 😮
    pausiere (ms) 1500
    zeige Symbol ◇

dauerhaft
    wenn Lichtstärke > 10
        zeige LEDs          (Atem-Muster klein)
        pausiere (ms) 600
        zeige LEDs          (Atem-Muster groß)
        pausiere (ms) 600
    sonst
        zeige Zeichenfolge "z"`
      },
      {
        chapter: 4,
        title: 'Nach Kapitel 4 — Interaktion',
        note: 'Knopf A, Knopf B und Touch-Pins sind kreativ — jedes Kind wählt eigene Symbole/LEDs. Die Struktur bleibt gleich, der Inhalt variiert.'
      },
      {
        chapter: 5,
        title: 'Nach Kapitel 5 — Bewegung (MotionKit)',
        code: `beim Start
    zeige Symbol ♥
    pausiere (ms) 1500
    zeige Symbol ◇

wenn Knopf A gedrückt
    zeige Symbol 😊

wenn Knopf B gedrückt
    zeige Symbol 😮

dauerhaft
    wenn Lichtstärke > 10
        wenn Ultraschallsensor cm > 5
            Motor beide Richtung vorwärts Tempo 80
            zeige LEDs      (Atem klein)
            pausiere (ms) 600
            zeige LEDs      (Atem groß)
            pausiere (ms) 600
        sonst
            Motor beide anhalten
    sonst
        Motor beide anhalten
        zeige Zeichenfolge "z"`
      },
      {
        chapter: 6,
        title: 'Nach Kapitel 6 — Persönlichkeit',
        note: 'Dieses Kapitel erweitert durch kreative Blöcke (Schütteln, Lautstärke, Pins). Beispiel:',
        code: `... (alles von Kapitel 5) ...

wenn geschüttelt
    zeige Symbol 😵
    pausiere (ms) 1000
    Bildschirminhalt löschen

dauerhaft  (Ergänzung)
    wenn Lautstärke > 128
        Motor beide Richtung vorwärts Tempo 150    (lauter → schneller)
    sonst
        ... (bisherige Logik)`
      },
      {
        chapter: 7,
        title: 'Nach Kapitel 7 — Gefühle (RGB-LEDs)',
        code: `Variable: futter

beim Start
    setze futter auf 0
    zeige Symbol ♥
    pausiere (ms) 1500
    zeige Symbol ◇

wenn Knopf B gedrückt
    wenn futter < 3
        ändere futter um 1
        wenn futter = 1
            setze RGB-LED 1 auf grün
        sonst wenn futter = 2
            setze RGB-LED 1 auf grün
            setze RGB-LED 2 auf grün
        sonst wenn futter = 3
            setze RGB-LED 1 auf grün
            setze RGB-LED 2 auf grün
            setze RGB-LED 3 auf grün
    sonst
        zeige Symbol 😊    (schon satt!)

... (+ dauerhaft-Block von Kapitel 5/6)`
      }
    ]
  }
  };
})();
