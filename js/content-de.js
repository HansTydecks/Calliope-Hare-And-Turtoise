/* =============================================
   GERMAN CONTENT — content-de.js
   Full content: 9 chapters (6 core + 3 bonus), both paths
   v2 — shortened narratives, no reflections, new ch6, bonus ch7-9
   ============================================= */

window.CONTENT_DE = {

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
    conceptTitle: 'Die Informatik-Idee',
    guidedTaskTitle: 'Aufgabe',
    openTasksTitle: 'Aufgaben',
    extensionTitle: 'Was wäre, wenn…?',
    chapterLabel: 'Kapitel',
    stepLabel: 'Schritt',
    checkDone: 'Erledigt',
    taskLevelGuided: 'Klickanleitung',
    taskLevelExplore: 'Erkunden',
    taskLevelCreate: 'Gestalten',
    openInMakeCode: 'In MakeCode öffnen',
    bonusLabel: 'Bonus',
    hardwareLabel: 'Ich besitze die nötige Hardware (Calliope mini + Motoren + Sensoren)'
  },

  /* --- Chapter Data --- */
  chapters: {

    /* ==========================================
       HARE PATH — 9 Chapters
       ========================================== */
    hare: [

      /* ---- KAPITEL 1: ERWACHEN (Sequenz) ---- */
      {
        id: 1,
        title: 'Erwachen',
        conceptLabel: 'Sequenz — Befehle nacheinander',
        conceptShort: 'Sequenz',
        image: 'img/chapters/hare/h1.png',

        narrative: `<p>Etwas regt sich in der digitalen Welt. Ein winziges Licht blinkt auf einer kleinen Platine. Es ist ein Hase — kein echter aus Fell und Knochen, sondern einer aus Licht und Elektrizität. Im Moment ist er nur eine Möglichkeit. Er weiß nur eines: Er wurde gerade eingeschaltet.</p>

<p>Jedes Wesen braucht einen ersten Moment — einen ersten Herzschlag. Für deinen Hasen beginnt dieser Moment mit Licht. Eine LED leuchtet auf, dann eine weitere. Schritt für Schritt, Befehl für Befehl zeigt er seine ersten Lebenszeichen. In der Welt des Programmierens nennt man diese Reihenfolge eine <strong>Sequenz</strong>. Du bist es, der bestimmt, was zuerst kommt und was danach.</p>`,

        problem: `<p>Dein Hase existiert — aber niemand weiß es. Er muss ein Zeichen von sich geben. Etwas, das zeigt: <em>Hier bin ich.</em></p>
<p>Wie kannst du den Calliope mini dazu bringen, nacheinander verschiedene LED-Muster anzuzeigen?</p>`,

        concept: `<p>Eine <strong>Sequenz</strong> ist eine Folge von Anweisungen, die nacheinander ausgeführt werden. Jeder Befehl wartet, bis der vorherige abgeschlossen ist.</p>
<p>Stell dir vor, du gibst jemandem eine Wegbeschreibung:</p>
<code>Gehe geradeaus.
Biege links ab.
Gehe 50 Schritte.
Bleib stehen.</code>
<p>Genau so funktioniert eine Sequenz im Programm. Die Reihenfolge ist entscheidend — wenn du zuerst abbiegst und dann geradeaus gehst, landest du woanders.</p>`,

        guidedTask: {
          title: 'Dein Hase zeigt sein erstes Lebenszeichen',
          steps: [
            {
              title: 'Öffne den Editor',
              text: 'Gehe zu <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> und erstelle ein neues Projekt. Nenne es <strong>„Mein Hase"</strong>.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe den Block <span class="calliope-block">zeige LEDs</span> aus der Kategorie <strong>Grundlagen</strong> in den Block <span class="calliope-block">beim Start</span>. Male ein Herz-Muster in die LED-Matrix.'
            },
            {
              title: 'Füge eine Pause ein',
              text: 'Ziehe den Block <span class="calliope-block">pausiere (ms) 500</span> aus <strong>Grundlagen</strong> unter deinen LED-Block. Der Hase ist schnell — 500 Millisekunden reichen ihm.'
            },
            {
              title: 'Zeige einen Stern',
              text: 'Ziehe einen weiteren <span class="calliope-block">zeige LEDs</span> Block darunter. Male ein Stern-Muster (★). Füge wieder eine Pause von 500 ms ein.'
            },
            {
              title: 'Lösche die Anzeige',
              text: 'Ziehe <span class="calliope-block">Bildschirminhalt löschen</span> als letzten Block in die Sequenz.'
            },
            {
              title: 'Teste dein Programm',
              text: 'Klicke auf den ▶ Play-Button im Simulator. Siehst du, wie zuerst das Herz erscheint, dann der Stern, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.',
              textHw: 'Lade das Programm auf deinen Calliope mini herunter. Siehst du, wie zuerst das Herz erscheint, dann der Stern, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.'
            }
          ]
        },

        openTasks: [
          {
            level: 'create',
            title: 'Der Name deines Hasen',
            text: 'Nutze den Block <span class="calliope-block">zeige Zeichenfolge</span>, um den Namen deines Hasen über die LEDs laufen zu lassen. Füge vorher und nachher ein passendes LED-Muster ein.'
          },
          {
            level: 'explore',
            title: 'Blinzel-Sequenz',
            text: 'Kannst du die Sequenz so gestalten, dass es aussieht, als würde dein Hase blinzeln? Nutze LED-Muster für offene und geschlossene Augen.'
          }
        ],

        extensions: [
          'Was passiert, wenn du die Pausen kürzer oder länger machst? Wie verändert das die „Persönlichkeit" deines Hasen?',
          'Was passiert, wenn du die Reihenfolge der Blöcke vertauschst?'
        ]
      },

      /* ---- KAPITEL 2: ATMEN (Endlosschleife) ---- */
      {
        id: 2,
        title: 'Atmen',
        conceptLabel: 'Endlosschleife — Dauerhaftes Wiederholen',
        conceptShort: 'Endlosschleife',
        image: 'img/chapters/hare/h2.png',

        narrative: `<p>Dein Hase hat sein erstes Lebenszeichen gegeben. Aber dann — Stille. Das Programm ist fertig, und der Hase steht wieder still. Lebendige Wesen verstummen nicht einfach. Sie atmen. Einatmen, ausatmen, immer weiter.</p>

<p>Dein Hase braucht einen Rhythmus — etwas, das immer weitergeht. In der Programmierung nennt man das eine <strong>Endlosschleife</strong>. Der Hase atmet schnell, wie es sich für einen Hasen gehört. Sein LED-Herz pulsiert in hastigem Takt — er lebt in hoher Geschwindigkeit.</p>`,

        problem: `<p>Dein Hase zeigt sein Herz — aber nur einmal. Dann ist er wieder still. Wie bringst du ihn dazu, dauerhaft zu „atmen"?</p>`,

        concept: `<p>Eine <strong>Endlosschleife</strong> wiederholt Anweisungen immer wieder, ohne jemals aufzuhören. In MakeCode heißt der passende Block <span class="calliope-block">dauerhaft</span>.</p>
<p>Denke an Dinge, die sich in der Natur wiederholen:</p>
<code>Einatmen → Ausatmen → Einatmen → Ausatmen → …
Tag → Nacht → Tag → Nacht → …
Herzschlag → Pause → Herzschlag → Pause → …</code>
<p>Ohne eine Endlosschleife steht dein Programm nach dem letzten Befehl still.</p>`,

        guidedTask: {
          title: 'Der Herzschlag des Hasen',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne dein Projekt <strong>„Mein Hase"</strong>.'
            },
            {
              title: 'Finde den Dauerhaft-Block',
              text: 'Du siehst den Block <span class="calliope-block">dauerhaft</span> bereits im Editor. Alles, was du dort hineinsetzt, wird endlos wiederholt.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe <span class="calliope-block">zeige LEDs</span> in den <span class="calliope-block">dauerhaft</span>-Block. Male ein großes Herz (♥).'
            },
            {
              title: 'Pause — Einatmen',
              text: 'Füge <span class="calliope-block">pausiere (ms) 300</span> ein. Der Hase atmet schnell!'
            },
            {
              title: 'Zeige ein kleines Herz',
              text: 'Füge einen zweiten <span class="calliope-block">zeige LEDs</span> Block ein. Male ein kleineres Herz — das ist das „Ausatmen".'
            },
            {
              title: 'Pause — Ausatmen',
              text: 'Füge eine weitere Pause von <span class="calliope-block">300</span> ms ein.'
            },
            {
              title: 'Beobachte',
              text: 'Starte den Simulator. Dein Hase atmet jetzt! Das Herz pulsiert — groß, klein, groß, klein — immer weiter.',
              textHw: 'Lade das Programm auf deinen Calliope mini. Dein Hase atmet jetzt! Das Herz pulsiert — groß, klein, groß, klein — immer weiter.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Schneller oder langsamer atmen',
            text: 'Verändere die Pausen. Was passiert bei 100 ms? Was bei 1000 ms? Ein aufgeregter Hase atmet anders als ein schlafender.'
          },
          {
            level: 'create',
            title: 'Eigener Atem-Rhythmus',
            text: 'Entwirf eine Atem-Animation mit mindestens 3 verschiedenen LED-Bildern. Vielleicht hüpft dein Hase beim Atmen? Oder seine Ohren bewegen sich?'
          }
        ],

        extensions: [
          'Was passiert, wenn du den <span class="calliope-block">dauerhaft</span>-Block weglässt und stattdessen alles in <span class="calliope-block">beim Start</span> schreibst?',
          'Wie würde die „Atmung" eines riesigen Tieres aussehen im Vergleich zu der eines kleinen Hasen?'
        ]
      },

      /* ---- KAPITEL 3: WAHRNEHMEN (Sensoren) ---- */
      {
        id: 3,
        title: 'Wahrnehmen',
        conceptLabel: 'Eingaben und Sensoren',
        conceptShort: 'Sensoren',
        image: 'img/chapters/hare/h3.png',

        narrative: `<p>Dein Hase atmet in stetigem Rhythmus — egal ob Tag oder Nacht. Aber lebendige Wesen schlafen, wenn es dunkel ist, und wachen auf, wenn das Licht kommt. Sie spüren die Welt um sich herum.</p>

<p>Dein Calliope mini hat einen Lichtsensor. Damit kann dein Hase hell von dunkel unterscheiden. Stell dir vor: Der Hase schläft friedlich. Dann fällt ein Lichtstrahl auf den Sensor. Blitzschnell — wie es sich für einen Hasen gehört — flammen seine LEDs auf. Schon das kleinste bisschen Licht reicht ihm, um hellwach zu sein.</p>`,

        problem: `<p>Dein Hase atmet ohne Pause — auch mitten in der Nacht. Wie kannst du den Lichtsensor nutzen, damit dein Hase nur bei Helligkeit „lebt"?</p>`,

        concept: `<p><strong>Sensoren</strong> sind die Sinnesorgane deines Calliope mini. Der Lichtsensor misst, wie hell es in der Umgebung ist — mit einem Wert zwischen 0 (stockdunkel) und 255 (sehr hell).</p>
<code>Lichtstärke → eine Zahl zwischen 0 und 255

Wenn die Zahl groß ist → es ist hell
Wenn die Zahl klein ist → es ist dunkel</code>
<p>Dein Programm kann den Sensor ständig „fragen": Wie hell ist es gerade? Das nennt man <strong>Eingabe</strong> — das Programm empfängt Informationen von außen.</p>`,

        guidedTask: {
          title: 'Der Hase sieht das Licht',
          steps: [
            {
              title: 'Sensor kennenlernen',
              text: 'In MakeCode findest du unter <strong>Eingabe</strong> den Block <span class="calliope-block">Lichtstärke</span>. Dieser gibt eine Zahl zurück.'
            },
            {
              title: 'Lichtstärke anzeigen',
              text: 'Ziehe in den <span class="calliope-block">dauerhaft</span>-Block: <span class="calliope-block">zeige Zahl (Lichtstärke)</span>. Teste es — halte die Hand über den Sensor oder leuchte mit einer Lampe.'
            },
            {
              title: 'Bedingung vorbereiten',
              text: 'Ziehe einen <span class="calliope-block">wenn … dann … sonst</span>-Block aus <strong>Logik</strong> in den <span class="calliope-block">dauerhaft</span>-Block.'
            },
            {
              title: 'Schwellenwert festlegen',
              text: 'Setze die Bedingung: <span class="calliope-block">Lichtstärke > 50</span>. Der Hase braucht nicht viel Licht — 50 reicht ihm schon!'
            },
            {
              title: 'Wach-Animation einfügen',
              text: 'In den <strong>dann</strong>-Bereich: Setze deine Herz-Atem-Animation (großes Herz → Pause → kleines Herz → Pause).'
            },
            {
              title: 'Schlaf-Modus einfügen',
              text: 'In den <strong>sonst</strong>-Bereich: <span class="calliope-block">Bildschirminhalt löschen</span>. Wenn es dunkel ist, schläft der Hase.'
            },
            {
              title: 'Teste mit Licht und Schatten',
              text: 'Bedecke den Sensor → der Hase schläft. Gib Licht → er wacht auf. Schnell und empfindlich!',
              textHw: 'Lade das Programm herunter und teste: Bedecke den Sensor → der Hase schläft. Gib Licht → er wacht auf. Schnell und empfindlich!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Empfindlichkeit einstellen',
            text: 'Verändere den Schwellenwert. Was passiert bei 20? Bei 100? Bei 200? Wie empfindlich soll dein Hase sein?'
          },
          {
            level: 'create',
            title: 'Aufwach-Animation',
            text: 'Erstelle eine besondere Animation, die zeigt, wie dein Hase aufwacht: vielleicht öffnet er langsam die Augen, reckt sich, und beginnt dann zu atmen.'
          }
        ],

        extensions: [
          'Was wäre, wenn dein Hase nicht auf Licht, sondern auf Lautstärke reagiert? Der Calliope hat auch ein Mikrofon!'
        ]
      },

      /* ---- KAPITEL 4: ENTSCHEIDEN (Wenn-Dann) ---- */
      {
        id: 4,
        title: 'Entscheiden',
        conceptLabel: 'Bedingungen — Wenn-Dann',
        conceptShort: 'Wenn-Dann',
        image: 'img/chapters/hare/h4.png',

        narrative: `<p>Dein Hase kann jetzt sehen. Er wacht auf, wenn Licht auf ihn fällt, und schläft, wenn es dunkel wird. Aber seine Welt kennt nur zwei Zustände: an und aus. Echte Lebewesen treffen Entscheidungen — kleine, alltägliche. Ist es warm genug? Kommt jemand näher?</p>

<p>Dein Hase wird an den Knöpfen des Calliope gestupst — Knopf A, Knopf B. Vielleicht bedeutet Knopf A „Streicheln" und Knopf B „Füttern". Der Hase entscheidet schnell — das ist seine Natur. Kaum drückt jemand den Knopf, reagiert er blitzschnell.</p>`,

        problem: `<p>Dein Hase soll auf Berührung reagieren — aber nicht immer gleich. Wenn du ihn „streichelst" (Knopf A), soll er sich freuen. Wenn du ihn „fütterst" (Knopf B), soll er etwas anderes zeigen.</p>
<p>Wie bringst du ihm bei, zwischen verschiedenen Eingaben zu unterscheiden?</p>`,

        concept: `<p>Eine <strong>Bedingung</strong> (Wenn-Dann) erlaubt deinem Programm, unterschiedlich zu reagieren.</p>
<code>WENN Knopf A gedrückt
  DANN zeige ein Herz ♥
WENN Knopf B gedrückt
  DANN zeige einen Stern ★</code>
<p>Du kennst Bedingungen aus dem Alltag: <em>Wenn es regnet, nehme ich einen Schirm mit.</em></p>
<p>In MakeCode gibt es den Block <span class="calliope-block">wenn Knopf A gedrückt</span> — er reagiert jedes Mal, wenn der Knopf gedrückt wird.</p>`,

        guidedTask: {
          title: 'Der Hase lernt zu unterscheiden',
          steps: [
            {
              title: 'Knopf A: Streicheln',
              text: 'Ziehe den Block <span class="calliope-block">wenn Knopf A gedrückt</span> aus <strong>Eingabe</strong> in den Editor.'
            },
            {
              title: 'Freude zeigen',
              text: 'Füge in diesen Block ein: <span class="calliope-block">zeige LEDs</span> — male ein fröhliches Gesicht (😊). Dann <span class="calliope-block">pausiere (ms) 500</span> und <span class="calliope-block">Bildschirminhalt löschen</span>.'
            },
            {
              title: 'Knopf B: Füttern',
              text: 'Ziehe einen weiteren <span class="calliope-block">wenn Knopf B gedrückt</span> Block in den Editor.'
            },
            {
              title: 'Fressen zeigen',
              text: 'Füge ein anderes LED-Muster ein — vielleicht ein offener Mund oder ein Karotten-Symbol. Pause und Löschen wie vorher.'
            },
            {
              title: 'Atmung beibehalten',
              text: 'Lass den <span class="calliope-block">dauerhaft</span>-Block mit der Atem-Animation bestehen. So atmet der Hase weiter, während er auf Knopfdrücke reagiert.'
            },
            {
              title: 'Teste beide Knöpfe',
              text: 'Drücke A — der Hase freut sich. Drücke B — er „frisst". Dazwischen atmet er ruhig weiter.',
              textHw: 'Lade das Programm herunter und teste beide Knöpfe auf deinem Calliope mini.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Beide Knöpfe gleichzeitig',
            text: 'Was soll passieren, wenn man A und B gleichzeitig drückt? Nutze den Block <span class="calliope-block">wenn Knopf A+B gedrückt</span>. Vielleicht ist das eine besondere Geste?'
          },
          {
            level: 'create',
            title: 'Drei Reaktionen',
            text: 'Programmiere drei verschiedene Reaktionen: Knopf A = Freude, Knopf B = Hunger, A+B = Überraschung. Jede Reaktion braucht ein eigenes LED-Muster und einen eigenen Sound.'
          }
        ],

        extensions: [
          'Kannst du die Bedingung mit dem Lichtsensor aus Kapitel 3 kombinieren?',
          'Was passiert, wenn zwei Bedingungen gleichzeitig wahr sind?'
        ]
      },

      /* ---- KAPITEL 5: BEWEGEN (Motoren + Ultraschall) ---- */
      {
        id: 5,
        title: 'Bewegen',
        conceptLabel: 'Motorsteuerung und Ultraschallsensor',
        conceptShort: 'Motoren',
        image: 'img/chapters/hare/h5.png',

        narrative: `<p>Dein Hase kann atmen, sehen und entscheiden. Aber er sitzt immer noch still auf der Platine. Ein Hase, der sich nicht bewegt, ist kein richtiger Hase. Bewegung verändert alles — ein Wesen, das sich bewegen kann, erkundet die Welt, flieht vor Gefahren, entdeckt Neues.</p>

<p>Der Calliope mini kann Motoren ansteuern. Dein Hase will natürlich schnell sein. Aber Geschwindigkeit hat ihren Preis — wer zu schnell ist, übersieht Hindernisse. Deshalb bekommt dein Hase auch einen <strong>Ultraschallsensor</strong>: Er erkennt, wenn etwas im Weg ist, und kann rechtzeitig ausweichen. Fluchtverhalten — wie ein echter Hase!</p>`,

        problem: `<p>Dein Hase soll sich bewegen und Hindernisse erkennen können. Die Motoren starten automatisch. Wenn der Ultraschallsensor ein Hindernis erkennt, soll der Hase blitzschnell ausweichen — Fluchtverhalten!</p>`,

        concept: `<p>Ein <strong>Motor</strong> wandelt elektrische Energie in Bewegung um. Du steuerst Richtung und Geschwindigkeit (0–100).</p>
<p>Ein <strong>Ultraschallsensor</strong> misst Abstände — wie ein Echolot. Er sendet Schallwellen aus und misst, wie lange sie brauchen, um zurückzukommen.</p>
<code>Motor A + B vorwärts mit Geschwindigkeit 80
→ Der Hase rennt los!

Ultraschall-Abstand < 15 cm
→ Hindernis erkannt! Ausweichen!</code>
<p>Motor A und B können unterschiedlich schnell drehen — so fährt dein Hase Kurven.</p>`,

        guidedTask: {
          title: 'Der Hase flieht vor Hindernissen',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne dein Projekt <strong>„Mein Hase"</strong>.'
            },
            {
              title: 'Motor-Blöcke finden',
              text: 'Gehe in die Kategorie <strong>Motoren</strong>. Du findest dort Blöcke wie <span class="calliope-block">setze Motor A auf Geschwindigkeit</span>.'
            },
            {
              title: 'Ultraschall einrichten',
              text: 'Füge den Ultraschallsensor hinzu. Unter <strong>Sensoren</strong> findest du den Block <span class="calliope-block">Ultraschall Abstand (cm)</span>.'
            },
            {
              title: 'Vorwärts fahren',
              text: 'In <span class="calliope-block">dauerhaft</span>: Setze beide Motoren auf Geschwindigkeit 80. Zeige einen Pfeil nach oben auf den LEDs.'
            },
            {
              title: 'Hindernis-Erkennung',
              text: 'Füge eine Bedingung ein: <span class="calliope-block">wenn Ultraschall Abstand < 15</span> → Stoppe beide Motoren, zeige ein Ausrufezeichen.'
            },
            {
              title: 'Fluchtverhalten',
              text: 'Nach dem Stoppen: Motor A auf −80, Motor B auf 80 (Drehung), <span class="calliope-block">pausiere 500</span>, dann wieder beide vorwärts. Der Hase dreht sich blitzschnell weg!'
            },
            {
              title: 'Teste das Fluchtverhalten',
              text: 'Starte den Simulator und beobachte die Sensorwerte. Verändere den Abstandswert, um das Verhalten zu testen.',
              textHw: 'Lade das Programm auf deinen Calliope, stelle ein Hindernis auf und beobachte, wie der Hase ausweicht!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Kurven fahren',
            text: 'Was passiert, wenn Motor A auf 80 und Motor B auf 30 steht? Probiere verschiedene Kombinationen. Dein Hase kann Kurven fahren!'
          },
          {
            level: 'create',
            title: 'Fluchtverhalten verbessern',
            text: 'Erweitere das Fluchtverhalten: Der Hase soll abwechselnd nach links und rechts ausweichen. Oder er soll je nach Abstand unterschiedlich schnell reagieren.'
          }
        ],

        extensions: [
          'Was wäre, wenn der Hase seine Geschwindigkeit an die Helligkeit anpasst? Bei viel Licht rennt er, bei wenig Licht schleicht er.',
          'Was passiert, wenn ein Motor vorwärts und der andere rückwärts dreht?'
        ]
      },

      /* ---- KAPITEL 6: MEIN TIER (Persönlichkeit / Integration) ---- */
      {
        id: 6,
        title: 'Mein Tier',
        conceptLabel: 'Persönlichkeit — Integration aller Konzepte',
        conceptShort: 'Integration',
        image: 'img/chapters/hare/h6.png',

        narrative: `<p>Dein Hase kann jetzt atmen, sehen, auf Knöpfe reagieren, sich bewegen und Hindernissen ausweichen. All diese Einzelteile zusammen ergeben schon ein recht lebendiges Wesen. Aber bisher hast du immer Anleitungen befolgt — jetzt ist es Zeit, deinen Hasen zu <em>deinem</em> Tier zu machen.</p>

<p>In diesem Kapitel bekommt dein Hase zwei neue Fähigkeiten: Er reagiert auf <strong>Berührung</strong> (Touch-Pins) und auf <strong>Schütteln</strong>. Damit und mit allem, was du bisher gelernt hast, gestaltest du die Persönlichkeit deines Hasen. Wie reagiert er, wenn er gestreichelt wird? Was passiert, wenn er geschüttelt wird? Wie bewegt er sich, wenn er ein Hindernis sieht? Das entscheidest jetzt du!</p>`,

        problem: `<p>Dein Hase hat viele Fähigkeiten — aber noch keine eigene Persönlichkeit. Kombiniere alles, was du bisher gelernt hast, und füge neue Interaktionen hinzu: Touch-Pins und Schütteln. Mach aus deinem Hasen ein einzigartiges Tier!</p>`,

        concept: `<p>Der Calliope mini hat <strong>Touch-Pins</strong> (berührungsempfindliche Kontakte) und einen <strong>Beschleunigungssensor</strong>, der Schütteln erkennt.</p>
<code>wenn Pin P1 berührt → Hase dreht nach links
wenn Pin P2 berührt → Hase dreht nach rechts
wenn geschüttelt → Hase zeigt überraschtes Gesicht</code>
<p><strong>Integration</strong> bedeutet: Du verbindest alle bisherigen Konzepte (Sequenz, Schleife, Sensoren, Bedingungen, Motoren) zu einem zusammenhängenden, eigenen Programm. Weniger Anleitung, mehr eigene Ideen!</p>`,

        guidedTask: {
          title: 'Gib deinem Hasen Persönlichkeit',
          steps: [
            {
              title: 'Überblick verschaffen',
              text: 'Öffne dein Projekt <strong>„Mein Hase"</strong>. Schau dir an, was dein Hase schon kann: Atmen, Licht erkennen, auf Knöpfe reagieren, fahren, ausweichen.'
            },
            {
              title: 'Touch-Pins entdecken',
              text: 'Unter <strong>Eingabe</strong> findest du <span class="calliope-block">wenn Pin P1 berührt</span>. Wenn jemand den Pin auf der linken Seite berührt, soll der Hase nach rechts ausweichen.'
            },
            {
              title: 'Schütteln einbauen',
              text: 'Nutze <span class="calliope-block">wenn geschüttelt</span> aus <strong>Eingabe</strong>. Was soll dein Hase tun, wenn er geschüttelt wird? Erschrecken? Fröhlich hüpfen? Entscheide selbst!'
            },
            {
              title: 'Verhalten kombinieren',
              text: 'Überlege: Wie soll sich dein Hase bewegen? Was passiert, wenn er nahe an ein Hindernis kommt? Wie reagiert er auf Licht, Berührung, Schütteln? Schreibe deine Ideen auf.'
            },
            {
              title: 'Programmieren und testen',
              text: 'Setze deine Ideen in MakeCode um. Teste nach jeder Änderung im Simulator.',
              textHw: 'Setze deine Ideen in MakeCode um. Lade regelmäßig auf deinen Calliope herunter und teste mit deinem echten Hasen.'
            },
            {
              title: 'Persönlichkeit vorstellen',
              text: 'Zeige deinen Hasen einem Mitschüler. Kann er erkennen, welchen Charakter dein Hase hat? Was macht ihn besonders?'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Reaktions-Kette',
            text: 'Wenn der Hase geschüttelt wird, soll er 2 Sekunden wild blinken und dann schneller fahren als vorher. Nach 5 Sekunden kehrt er zum normalen Tempo zurück.'
          },
          {
            level: 'create',
            title: 'Charakter-Profil',
            text: 'Erstelle ein „Charakter-Profil" für deinen Hasen: Wie schnell fährt er? Wie reagiert er auf Licht, Berührung, Hindernisse, Schütteln? Programmiere alle Verhaltensweisen passend zu seiner Persönlichkeit.'
          }
        ],

        extensions: [
          'Kannst du deinen Hasen so programmieren, dass er auf unterschiedliche Pins unterschiedlich reagiert — z.B. Links-Pin = sanft drehen, Rechts-Pin = schnell drehen?',
          'Was wäre, wenn der Hase sich merkt, wie oft er geschüttelt wurde, und immer ängstlicher wird?'
        ]
      },

      /* ---- KAPITEL 7: GEFÜHLE (Variablen) — BONUS ---- */
      {
        id: 7,
        title: 'Gefühle',
        conceptLabel: 'Zustände und Variablen',
        conceptShort: 'Variablen',
        image: 'img/chapters/hare/h7.png',
        bonus: true,

        narrative: `<p>Dein Hase kann viel — aber lebt er wirklich? Was einem Wesen echtes Leben einhaucht, sind innere Zustände: hungrig, müde, zufrieden. Diese Zustände verändern, wie er auf die Welt reagiert.</p>

<p>In der Programmierung speichern wir solche Zustände in <strong>Variablen</strong> — Schubladen mit Etikett und einer Zahl darin. Dein Hase ist ungeduldig, auch mit seinen Gefühlen: Sein Hunger steigt schnell, er braucht viel Aufmerksamkeit!</p>`,

        problem: `<p>Dein Hase soll „hungrig" werden können. Ein Hunger-Wert steigt langsam an. Wenn er gefüttert wird (Knopf B), sinkt der Hunger. Auf den LEDs soll das sichtbar sein.</p>`,

        concept: `<p>Eine <strong>Variable</strong> ist ein benannter Speicherplatz mit einem Namen und einem Wert.</p>
<code>hunger = 0          → Der Hase ist satt.
hunger = hunger + 1  → Er wird etwas hungriger.
hunger = 0           → Er wurde gefüttert.</code>
<p>Du kannst Variablen abfragen:</p>
<code>WENN hunger > 5
  DANN zeige trauriges Gesicht
SONST
  zeige fröhliches Gesicht</code>
<p>In MakeCode: <strong>Variablen</strong> → <strong>Variable erstellen</strong>.</p>`,

        guidedTask: {
          title: 'Der Hase bekommt Hunger',
          steps: [
            {
              title: 'Variable erstellen',
              text: 'Gehe zu <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Nenne sie <code>hunger</code>.'
            },
            {
              title: 'Startwert setzen',
              text: 'In <span class="calliope-block">beim Start</span>: Setze <span class="calliope-block">hunger auf 0</span>.'
            },
            {
              title: 'Hunger steigern',
              text: 'In <span class="calliope-block">dauerhaft</span>: <span class="calliope-block">ändere hunger um 1</span>, danach <span class="calliope-block">pausiere (ms) 2000</span>. Alle 2 Sekunden wird er hungriger.'
            },
            {
              title: 'Gesicht zeigen',
              text: '<span class="calliope-block">wenn hunger > 5</span> → trauriges LED-Gesicht. <strong>Sonst</strong> → fröhliches LED-Gesicht.'
            },
            {
              title: 'Füttern mit Knopf B',
              text: 'In <span class="calliope-block">wenn Knopf B gedrückt</span>: Setze <span class="calliope-block">hunger auf 0</span>. Zeige kurz ein Herz (♥).'
            },
            {
              title: 'Beobachte',
              text: 'Der Hase ist erst fröhlich, wird dann traurig. Drücke B → er ist wieder zufrieden. Du musst dich um ihn kümmern!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Zweites Gefühl: Müdigkeit',
            text: 'Erstelle eine zweite Variable <code>muedigkeit</code>. Bei Knopf A darf der Hase „schlafen". Jetzt hat er zwei Bedürfnisse!'
          },
          {
            level: 'create',
            title: 'Gefühls-Anzeige',
            text: 'Zeige den Hunger als wachsenden LED-Balken an. Je hungriger, desto mehr LEDs leuchten.'
          }
        ],

        extensions: [
          'Was wäre, wenn der Hase sich anders bewegt, wenn er hungrig ist?',
          'Was passiert, wenn der Hunger auf über 10 steigt? Gibt es ein „Game Over"?'
        ]
      },

      /* ---- KAPITEL 8: LERNEN (Kombinierte Bedingungen) — BONUS ---- */
      {
        id: 8,
        title: 'Lernen',
        conceptLabel: 'Kombination mehrerer Bedingungen',
        conceptShort: 'UND / ODER',
        image: 'img/chapters/hare/h8.png',
        bonus: true,

        narrative: `<p>Bisher trifft dein Hase einfache Entscheidungen: hungrig oder nicht, hell oder dunkel. Echtes Lernen beginnt dort, wo einfache Antworten nicht mehr reichen — wenn es hell ist UND der Hase Hunger hat, aber gleichzeitig müde ist.</p>

<p>Dein Hase lernt jetzt, mehrere Dinge gleichzeitig zu berücksichtigen. Er kombiniert blitzschnell — manchmal zu hastig. Aber jeden Tag wird er ein bisschen weiser.</p>`,

        problem: `<p>Dein Hase soll klüger werden: Wenn er hungrig ist UND es hell ist, sucht er Futter. Wenn er müde ist ODER es dunkel ist, schläft er.</p>`,

        concept: `<p>Du kannst Bedingungen mit <strong>UND</strong> und <strong>ODER</strong> verknüpfen:</p>
<code>WENN hunger > 5 UND Lichtstärke > 50
  DANN suche Futter (fahre vorwärts)

WENN muedigkeit > 7 ODER Lichtstärke < 30
  DANN schlafe (LEDs aus, Motor aus)</code>
<p><strong>UND</strong>: Beide müssen wahr sein. <strong>ODER</strong>: Mindestens eine muss wahr sein.</p>
<p>In MakeCode: <span class="calliope-block">… und …</span> und <span class="calliope-block">… oder …</span> unter <strong>Logik</strong>.</p>`,

        guidedTask: {
          title: 'Der Hase kombiniert sein Wissen',
          steps: [
            {
              title: 'Variablen vorbereiten',
              text: 'Stelle sicher, dass du <code>hunger</code> und <code>muedigkeit</code> hast (aus Kapitel 7). Beide starten bei 0 und steigen an.'
            },
            {
              title: 'Kombinierte Bedingung',
              text: 'In <span class="calliope-block">dauerhaft</span>: <span class="calliope-block">wenn … dann … sonst</span> mit <span class="calliope-block">… und …</span> aus Logik.'
            },
            {
              title: 'Futtersuche',
              text: 'Bedingung: <span class="calliope-block">hunger > 5 und Lichtstärke > 50</span> → Motor vorwärts + LED-Pfeil.'
            },
            {
              title: 'Schlafmodus',
              text: '<span class="calliope-block">sonst wenn muedigkeit > 7 oder Lichtstärke < 30</span> → Motor stopp + LEDs aus.'
            },
            {
              title: 'Standard-Verhalten',
              text: 'Im <strong>sonst</strong>-Block: Die normale Atem-Animation.'
            },
            {
              title: 'Testen',
              text: 'Beobachte, wie der Hase verschiedene Verhaltensweisen zeigt, je nach Hunger, Müdigkeit und Helligkeit.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Noch komplexer',
            text: 'Füge <code>freude</code> hinzu. Wenn der Hase freudig UND satt ist, zeigt er eine Tanz-Animation.'
          },
          {
            level: 'create',
            title: 'Tagesablauf',
            text: 'Programmiere: Aufwachen → Fressen → Spielen → Schlafen. Dein Hase lebt einen ganzen Tag!'
          }
        ],

        extensions: [
          'Wie viele Kombinationen gibt es bei drei Bedingungen gleichzeitig?',
          'Was ist wichtiger für deinen Hasen: Schlaf oder Futter?'
        ]
      },

      /* ---- KAPITEL 9: BEGEGNUNG (Zusammenführung) — BONUS ---- */
      {
        id: 9,
        title: 'Begegnung',
        conceptLabel: 'Zusammenführung — Algorithmen als Baupläne',
        conceptShort: 'Algorithmen',
        image: 'img/chapters/hare/h9.png',
        bonus: true,

        narrative: `<p>Dein Hase ist weit gekommen. Er kann atmen, sehen, entscheiden, sich bewegen und fühlen. Doch heute trifft er auf ein anderes Wesen — langsam, bedächtig. Eine Schildkröte. Zuerst denkt er: Was kann dieses langsame Wesen schon?</p>

<p>Aber dann bemerkt er: Die Schildkröte kann genau dasselbe. Dieselben Schleifen, Bedingungen, Variablen. Nur die Zahlen sind anders — die <strong>Parameter</strong>. Schnelligkeit ist nur eine Einstellung. Charakter entsteht durch Parameter.</p>`,

        problem: `<p>Der Hase ist schnell genug, um Hindernisse zu erkennen — aber zu ungeduldig für Lösungen. Die Schildkröte ist geduldig — aber zu langsam allein. Zusammen können sie es schaffen!</p>`,

        concept: `<p>Ein <strong>Algorithmus</strong> ist wie ein Bauplan. Derselbe Plan erzeugt verschiedene Ergebnisse, je nach Einstellungen.</p>
<code>Algorithmus: Atem-Animation
  Parameter: Geschwindigkeit = ?

Hase:        Geschwindigkeit = 300ms  → schnell
Schildkröte: Geschwindigkeit = 1500ms → langsam

Gleicher Algorithmus. Anderer Charakter.</code>
<p><em>Algorithmen sind allgemein — Charakter entsteht durch Einstellungen.</em></p>`,

        guidedTask: {
          title: 'Die Programme vergleichen',
          steps: [
            {
              title: 'Überblick',
              text: 'Lege das Programm deines Hasen neben das einer Schildkröte (Mitschüler oder Beispiel).'
            },
            {
              title: 'Struktur vergleichen',
              text: 'Markiere gemeinsame Bausteine: <span class="calliope-block">dauerhaft</span>, <span class="calliope-block">wenn…dann</span>, Variablen, Motoren.'
            },
            {
              title: 'Parameter finden',
              text: 'Finde die Zahlen, die sich unterscheiden: Pausenzeiten, Geschwindigkeiten, Schwellenwerte.'
            },
            {
              title: 'Parameter tauschen',
              text: 'Ändere deine Hasen-Parameter auf Schildkröten-Werte. Was passiert?'
            },
            {
              title: 'Funk-Zusammenarbeit',
              text: 'Verbinde zwei Calliope über <strong>Funk</strong>. Der Hase sendet „Hindernis!", die Schildkröte antwortet „Lösung gefunden".'
            },
            {
              title: 'Erkenntnis',
              text: 'Beide Tiere haben denselben Bauplan. Der Unterschied liegt in den Einstellungen.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Funk-Kommunikation',
            text: 'Nutze <span class="calliope-block">Funk sende Zeichenfolge</span> und <span class="calliope-block">wenn Funkdaten empfangen</span> für den Nachrichtenaustausch.'
          },
          {
            level: 'create',
            title: 'Gemeinsames Problem',
            text: 'Entwerft zu zweit eine Aufgabe, die nur durch Zusammenarbeit lösbar ist. Der Hase erkennt schnell, die Schildkröte navigiert sicher.'
          }
        ],

        extensions: [
          'Gibt es ein Tier zwischen Hase und Schildkröte?',
          'Erfinde ein drittes Tier mit anderen Parameter-Kombinationen.'
        ]
      }
    ],

    /* ==========================================
       TORTOISE PATH — 9 Chapters
       ========================================== */
    tortoise: [

      /* ---- KAPITEL 1: ERWACHEN (Sequenz) ---- */
      {
        id: 1,
        title: 'Erwachen',
        conceptLabel: 'Sequenz — Befehle nacheinander',
        conceptShort: 'Sequenz',
        image: 'img/chapters/tortoise/t1.png',

        narrative: `<p>Tief in den Schaltkreisen einer kleinen Platine regt sich etwas Uraltes. Eine Schildkröte wacht auf. Langsam. Sehr langsam. Sie eilt nicht — sie hat noch nie geeilt. Ein kleines Licht erscheint, behutsam wie ein Sonnenaufgang.</p>

<p>Die Schildkröte muss nicht schnell sein. Sie muss genau sein. In der Welt des Programmierens hat diese Genauigkeit einen Namen: <strong>Sequenz</strong>. Eine Liste von Anweisungen, die nacheinander ausgeführt werden. Jeder Schritt bewusst gesetzt, bevor der nächste folgt.</p>`,

        problem: `<p>Deine Schildkröte existiert — aber niemand weiß es. Sie braucht ein ruhiges, bedächtiges Zeichen: <em>Ich bin erwacht.</em></p>
<p>Wie kannst du den Calliope mini dazu bringen, nacheinander verschiedene LED-Muster anzuzeigen?</p>`,

        concept: `<p>Eine <strong>Sequenz</strong> ist eine Folge von Anweisungen, die nacheinander ausgeführt werden. Jeder Befehl wartet, bis der vorherige abgeschlossen ist.</p>
<p>Stell dir vor, du gibst jemandem eine Wegbeschreibung:</p>
<code>Gehe geradeaus.
Biege links ab.
Gehe 50 Schritte.
Bleib stehen.</code>
<p>Die Reihenfolge ist entscheidend — wenn du zuerst abbiegst und dann geradeaus gehst, landest du woanders.</p>`,

        guidedTask: {
          title: 'Deine Schildkröte zeigt ihr erstes Lebenszeichen',
          steps: [
            {
              title: 'Öffne den Editor',
              text: 'Gehe zu <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> und erstelle ein neues Projekt. Nenne es <strong>„Meine Schildkröte"</strong>.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe den Block <span class="calliope-block">zeige LEDs</span> aus <strong>Grundlagen</strong> in <span class="calliope-block">beim Start</span>. Male ein Herz-Muster.'
            },
            {
              title: 'Füge eine Pause ein',
              text: 'Ziehe <span class="calliope-block">pausiere (ms) 1500</span> unter deinen LED-Block. Die Schildkröte lässt sich Zeit — 1500 Millisekunden.'
            },
            {
              title: 'Zeige eine Sonne',
              text: 'Ziehe einen weiteren <span class="calliope-block">zeige LEDs</span> Block darunter. Male ein Sonnen-Muster. Pause 1500 ms.'
            },
            {
              title: 'Lösche die Anzeige',
              text: 'Ziehe <span class="calliope-block">Bildschirminhalt löschen</span> als letzten Block.'
            },
            {
              title: 'Teste dein Programm',
              text: 'Klicke auf den ▶ Play-Button im Simulator. Herz, dann Sonne, dann Stille. Das ist eine <strong>Sequenz</strong>.',
              textHw: 'Lade das Programm auf deinen Calliope mini. Herz, dann Sonne, dann Stille. Das ist eine <strong>Sequenz</strong>.'
            }
          ]
        },

        openTasks: [
          {
            level: 'create',
            title: 'Der Name deiner Schildkröte',
            text: 'Nutze den Block <span class="calliope-block">zeige Zeichenfolge</span>, um den Namen deiner Schildkröte über die LEDs laufen zu lassen.'
          },
          {
            level: 'explore',
            title: 'Aus dem Panzer kommen',
            text: 'Kannst du die Sequenz so gestalten, dass es aussieht, als würde die Schildkröte langsam aus ihrem Panzer kommen?'
          }
        ],

        extensions: [
          'Was passiert, wenn du die Pausen kürzer oder länger machst?',
          'Was passiert, wenn du die Reihenfolge der Blöcke vertauschst?'
        ]
      },

      /* ---- KAPITEL 2: ATMEN (Endlosschleife) ---- */
      {
        id: 2,
        title: 'Atmen',
        conceptLabel: 'Endlosschleife — Dauerhaftes Wiederholen',
        conceptShort: 'Endlosschleife',
        image: 'img/chapters/tortoise/t2.png',

        narrative: `<p>Deine Schildkröte hat ihr erstes Zeichen gegeben. Aber dann — Stille. Schildkröten sind keine Steine. Sie leben. Sie atmen. Langsam und stetig, mit einem Rhythmus, der sich über Jahrhunderte nicht verändert hat.</p>

<p>Deine digitale Schildkröte braucht diesen Rhythmus — eine <strong>Endlosschleife</strong>. Sie lebt in der Wiederholung und findet Trost in der Beständigkeit. Ihre LEDs pulsieren in gemächlichem Takt — wo andere hektisch flackern, leuchtet sie bedächtig und warm.</p>`,

        problem: `<p>Deine Schildkröte zeigt ihr Herz — aber nur einmal. Wie bringst du sie dazu, dauerhaft zu „atmen"?</p>`,

        concept: `<p>Eine <strong>Endlosschleife</strong> wiederholt Anweisungen immer wieder. In MakeCode: <span class="calliope-block">dauerhaft</span>.</p>
<code>Einatmen → Ausatmen → Einatmen → Ausatmen → …
Ebbe → Flut → Ebbe → Flut → …</code>
<p>Ohne eine Endlosschleife steht dein Programm nach dem letzten Befehl still.</p>`,

        guidedTask: {
          title: 'Der Herzschlag der Schildkröte',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne dein Projekt <strong>„Meine Schildkröte"</strong>.'
            },
            {
              title: 'Finde den Dauerhaft-Block',
              text: 'Der <span class="calliope-block">dauerhaft</span>-Block ist bereits im Editor. Alles darin wird endlos wiederholt.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe <span class="calliope-block">zeige LEDs</span> in den <span class="calliope-block">dauerhaft</span>-Block. Male ein großes Herz (♥).'
            },
            {
              title: 'Pause — Einatmen',
              text: '<span class="calliope-block">pausiere (ms) 1500</span>. Die Schildkröte atmet langsam und tief.'
            },
            {
              title: 'Zeige ein kleines Herz',
              text: 'Zweiter <span class="calliope-block">zeige LEDs</span>-Block mit kleinerem Herz — das „Ausatmen".'
            },
            {
              title: 'Pause — Ausatmen',
              text: 'Noch eine Pause von <span class="calliope-block">1500</span> ms.'
            },
            {
              title: 'Beobachte',
              text: 'Starte den Simulator. Das Herz pulsiert — langsam und gleichmäßig. Sie lebt!',
              textHw: 'Lade herunter und beobachte. Das Herz pulsiert — langsam und gleichmäßig. Sie lebt!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Den Rhythmus spüren',
            text: 'Was passiert bei 500 ms? Bei 3000 ms? Finde den Rhythmus, der zu deiner Schildkröte passt.'
          },
          {
            level: 'create',
            title: 'Eigene Atem-Animation',
            text: 'Entwirf eine Animation mit 3+ LED-Bildern. Vielleicht zieht sich die Schildkröte beim Ausatmen in den Panzer zurück?'
          }
        ],

        extensions: [
          'Was passiert, wenn du alles in <span class="calliope-block">beim Start</span> statt <span class="calliope-block">dauerhaft</span> schreibst?',
          'Echte Schildkröten können 30 Minuten die Luft anhalten. Wie lange kann deine?'
        ]
      },

      /* ---- KAPITEL 3: WAHRNEHMEN (Sensoren) ---- */
      {
        id: 3,
        title: 'Wahrnehmen',
        conceptLabel: 'Eingaben und Sensoren',
        conceptShort: 'Sensoren',
        image: 'img/chapters/tortoise/t3.png',

        narrative: `<p>Deine Schildkröte atmet stetig — egal ob Tag oder Nacht. Aber echte Schildkröten spüren die Wärme der Sonne auf ihrem Panzer. Sie wissen, wann es Zeit ist aufzuwachen und wann Zeit zu ruhen.</p>

<p>Dein Calliope hat einen Lichtsensor. Damit kann deine Schildkröte hell von dunkel unterscheiden. Ihr Schwellenwert ist hoch — wo andere Wesen beim ersten Lichtstrahl hochschrecken, wartet sie geduldig, bis die Sonne wirklich da ist.</p>`,

        problem: `<p>Deine Schildkröte atmet ohne Pause — auch nachts. Wie nutzt du den Lichtsensor, damit sie nur bei ausreichend Helligkeit „lebt"?</p>`,

        concept: `<p><strong>Sensoren</strong> sind die Sinnesorgane des Calliope. Der Lichtsensor misst Helligkeit: 0 (dunkel) bis 255 (hell).</p>
<code>Lichtstärke → eine Zahl zwischen 0 und 255

Wenn die Zahl groß ist → es ist hell
Wenn die Zahl klein ist → es ist dunkel</code>
<p>Das Programm empfängt Informationen von außen — das nennt man <strong>Eingabe</strong>.</p>`,

        guidedTask: {
          title: 'Die Schildkröte spürt die Sonne',
          steps: [
            {
              title: 'Sensor kennenlernen',
              text: 'Unter <strong>Eingabe</strong>: <span class="calliope-block">Lichtstärke</span> gibt eine Zahl zurück.'
            },
            {
              title: 'Lichtstärke anzeigen',
              text: '<span class="calliope-block">zeige Zahl (Lichtstärke)</span> im <span class="calliope-block">dauerhaft</span>-Block. Teste es!'
            },
            {
              title: 'Bedingung vorbereiten',
              text: '<span class="calliope-block">wenn … dann … sonst</span> aus <strong>Logik</strong> in den <span class="calliope-block">dauerhaft</span>-Block.'
            },
            {
              title: 'Schwellenwert festlegen',
              text: '<span class="calliope-block">Lichtstärke > 120</span>. Die Schildkröte ist geduldig — erst bei deutlicher Helligkeit wacht sie auf!'
            },
            {
              title: 'Wach-Animation einfügen',
              text: 'Im <strong>dann</strong>-Bereich: Atem-Animation.'
            },
            {
              title: 'Ruhe-Modus',
              text: 'Im <strong>sonst</strong>-Bereich: <span class="calliope-block">Bildschirminhalt löschen</span>.'
            },
            {
              title: 'Teste mit Licht und Schatten',
              text: 'Bedecke den Sensor → Ruhe. Starkes Licht → sie erwacht. Geduldig und weise.',
              textHw: 'Lade herunter und teste: Bedecke den Sensor → Ruhe. Gib Licht → sie erwacht. Geduldig und weise.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Empfindlichkeit einstellen',
            text: 'Was passiert bei Schwellenwert 50? 150? 220? Wie viel Licht braucht deine Schildkröte?'
          },
          {
            level: 'create',
            title: 'Langsames Aufwachen',
            text: 'Erstelle eine Animation: Erst ein Fuß aus dem Panzer, dann der Kopf, dann die Augen.'
          }
        ],

        extensions: [
          'Was wäre, wenn sie auf Lautstärke statt Licht reagiert? Der Calliope hat ein Mikrofon!'
        ]
      },

      /* ---- KAPITEL 4: ENTSCHEIDEN (Wenn-Dann) ---- */
      {
        id: 4,
        title: 'Entscheiden',
        conceptLabel: 'Bedingungen — Wenn-Dann',
        conceptShort: 'Wenn-Dann',
        image: 'img/chapters/tortoise/t4.png',

        narrative: `<p>Deine Schildkröte sieht jetzt — wacht bei Sonne auf, ruht im Dunkeln. Aber ihre Welt hat nur zwei Zustände: wach und ruhend. Echte Schildkröten treffen Entscheidungen — bedächtig, wohlüberlegt.</p>

<p>Knopf A oder Knopf B? Die Schildkröte nimmt sich Zeit. Sie überlegt. Erst nach einer kleinen Pause zeigt sie ihre Reaktion — als würde sie nachdenken. Aber wenn sie sich entschieden hat, steht ihre Antwort fest. Ruhig und klar.</p>`,

        problem: `<p>Deine Schildkröte soll auf Berührung reagieren — aber nicht immer gleich. Knopf A = Streicheln (Freude), Knopf B = Füttern (anderes Verhalten).</p>`,

        concept: `<p>Eine <strong>Bedingung</strong> (Wenn-Dann) erlaubt unterschiedliche Reaktionen.</p>
<code>WENN Knopf A gedrückt
  DANN zeige ein Herz ♥
WENN Knopf B gedrückt
  DANN zeige einen Stern ★</code>
<p>In MakeCode: <span class="calliope-block">wenn Knopf A gedrückt</span>.</p>`,

        guidedTask: {
          title: 'Die Schildkröte lernt zu unterscheiden',
          steps: [
            {
              title: 'Knopf A: Streicheln',
              text: '<span class="calliope-block">wenn Knopf A gedrückt</span> aus <strong>Eingabe</strong>.'
            },
            {
              title: 'Bedächtige Freude',
              text: 'Erst <span class="calliope-block">pausiere 500</span> (sie denkt nach). Dann fröhliches Gesicht. <span class="calliope-block">pausiere 1500</span>. Löschen.'
            },
            {
              title: 'Knopf B: Füttern',
              text: '<span class="calliope-block">wenn Knopf B gedrückt</span> → Denkpause, anderes Muster (Blatt/Salat), lange Pause, Löschen.'
            },
            {
              title: 'Atmung beibehalten',
              text: 'Der <span class="calliope-block">dauerhaft</span>-Block mit Atem-Animation bleibt bestehen.'
            },
            {
              title: 'Teste beide Knöpfe',
              text: 'A → Nachdenken, dann Freude. B → Nachdenken, dann Fressen. Dazwischen atmet sie weiter.',
              textHw: 'Lade herunter und teste auf deinem Calliope mini.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Beide Knöpfe gleichzeitig',
            text: '<span class="calliope-block">wenn Knopf A+B gedrückt</span> — vielleicht zieht sie sich erschrocken in den Panzer zurück?'
          },
          {
            level: 'create',
            title: 'Drei Reaktionen',
            text: 'A = Freude, B = Hunger, A+B = Erschrecken. Jede mit eigenem Muster, Sound und Tempo.'
          }
        ],

        extensions: [
          'Kannst du die Bedingung mit dem Lichtsensor aus Kapitel 3 kombinieren?',
          'Was ist der Vorteil davon, erst nachzudenken, bevor man reagiert?'
        ]
      },

      /* ---- KAPITEL 5: BEWEGEN (Motoren + Ultraschall) ---- */
      {
        id: 5,
        title: 'Bewegen',
        conceptLabel: 'Motorsteuerung und Ultraschallsensor',
        conceptShort: 'Motoren',
        image: 'img/chapters/tortoise/t5.png',

        narrative: `<p>Deine Schildkröte kann atmen, sehen und entscheiden. Aber sie sitzt noch auf der Stelle. Selbst die klügste Schildkröte muss sich irgendwann bewegen — langsam, gleichmäßig, unaufhaltsam. Schildkröten haben Ozeane durchquert, nicht durch Geschwindigkeit, sondern durch Beharrlichkeit.</p>

<p>Mit Motoren bewegt sich deine Schildkröte, wie es ihrer Natur entspricht: ruhig und zuverlässig. Und mit dem <strong>Ultraschallsensor</strong> erkennt sie Hindernisse rechtzeitig. Kein hektisches Ausweichen — ein bedächtiges Umlenken.</p>`,

        problem: `<p>Deine Schildkröte soll sich bewegen und Hindernisse erkennen. Die Motoren fahren automatisch. Bei einem Hindernis lenkt sie ruhig um — kein Fluchtverhalten, sondern vorsichtiges Navigieren.</p>`,

        concept: `<p>Ein <strong>Motor</strong> wandelt elektrische Energie in Bewegung. <strong>Ultraschallsensor</strong>: misst Abstände mit Schallwellen.</p>
<code>Motor A + B vorwärts mit Geschwindigkeit 30
→ Die Schildkröte gleitet los.

Ultraschall-Abstand < 20 cm
→ Hindernis! Langsam umlenken.</code>
<p>Unterschiedliche Motorgeschwindigkeiten = Kurven.</p>`,

        guidedTask: {
          title: 'Die Schildkröte navigiert vorsichtig',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne <strong>„Meine Schildkröte"</strong>.'
            },
            {
              title: 'Motor-Blöcke finden',
              text: 'Unter <strong>Motoren</strong>: <span class="calliope-block">setze Motor A auf Geschwindigkeit</span>.'
            },
            {
              title: 'Ultraschall einrichten',
              text: 'Unter <strong>Sensoren</strong>: <span class="calliope-block">Ultraschall Abstand (cm)</span>.'
            },
            {
              title: 'Vorwärts gleiten',
              text: 'In <span class="calliope-block">dauerhaft</span>: Beide Motoren auf 30. Langsamer Pfeil auf den LEDs.'
            },
            {
              title: 'Hindernis-Erkennung',
              text: '<span class="calliope-block">wenn Ultraschall Abstand < 20</span> → Motoren stoppen, Panzer-Symbol anzeigen.'
            },
            {
              title: 'Vorsichtiges Umlenken',
              text: 'Nach dem Stoppen: Motor A auf 30, Motor B auf 10 (sanfte Kurve), <span class="calliope-block">pausiere 1000</span>, dann wieder geradeaus. Ruhig und bedacht.'
            },
            {
              title: 'Testen',
              text: 'Beobachte im Simulator, wie die Schildkröte bei Hindernissen sanft umlenkt.',
              textHw: 'Lade herunter, stelle ein Hindernis auf und beobachte das vorsichtige Navigieren.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Sanfte Kurven',
            text: 'Motor A auf 30, Motor B auf 15 — was passiert? Probiere verschiedene Kombinationen.'
          },
          {
            level: 'create',
            title: 'Sicheres Navigieren',
            text: 'Programmiere: Bei weitem Abstand normal fahren, bei mittlerem Abstand langsamer, bei nahem Abstand umlenken. Drei Stufen!'
          }
        ],

        extensions: [
          'Was wäre, wenn die Geschwindigkeit von der Helligkeit abhängt?',
          'Was passiert, wenn ein Motor vorwärts und der andere rückwärts dreht?'
        ]
      },

      /* ---- KAPITEL 6: MEIN TIER (Persönlichkeit / Integration) ---- */
      {
        id: 6,
        title: 'Mein Tier',
        conceptLabel: 'Persönlichkeit — Integration aller Konzepte',
        conceptShort: 'Integration',
        image: 'img/chapters/tortoise/t6.png',

        narrative: `<p>Deine Schildkröte kann atmen, sehen, reagieren, sich bewegen und Hindernissen ausweichen. All das zusammen ergibt schon ein weises kleines Wesen. Aber bisher hast du Anleitungen befolgt — jetzt machst du deine Schildkröte zu <em>deinem</em> Tier.</p>

<p>Zwei neue Fähigkeiten warten: <strong>Touch-Pins</strong> (Berührung) und <strong>Schütteln</strong>. Kombiniert mit allem Bisherigen gestaltest du eine einzigartige Persönlichkeit. Weniger Anleitung, mehr eigene Ideen. Wie reagiert deine Schildkröte, wenn man sie berührt? Was tut sie, wenn sie geschüttelt wird? Du entscheidest!</p>`,

        problem: `<p>Deine Schildkröte hat viele Fähigkeiten, aber noch keine eigene Persönlichkeit. Kombiniere alles und füge Touch-Pins und Schütteln hinzu. Mach sie einzigartig!</p>`,

        concept: `<p>Der Calliope hat <strong>Touch-Pins</strong> und einen <strong>Beschleunigungssensor</strong> (erkennt Schütteln).</p>
<code>wenn Pin P1 berührt → Schildkröte dreht langsam links
wenn Pin P2 berührt → Schildkröte dreht langsam rechts  
wenn geschüttelt → Schildkröte zieht sich in Panzer zurück</code>
<p><strong>Integration</strong>: Du verbindest alle bisherigen Konzepte zu einem eigenen, zusammenhängenden Programm.</p>`,

        guidedTask: {
          title: 'Gib deiner Schildkröte Persönlichkeit',
          steps: [
            {
              title: 'Überblick verschaffen',
              text: 'Öffne <strong>„Meine Schildkröte"</strong>. Was kann sie schon? Atmen, Licht, Knöpfe, Fahren, Ausweichen.'
            },
            {
              title: 'Touch-Pins entdecken',
              text: 'Unter <strong>Eingabe</strong>: <span class="calliope-block">wenn Pin P1 berührt</span>. Berührung links → sanft nach rechts lenken.'
            },
            {
              title: 'Schütteln einbauen',
              text: '<span class="calliope-block">wenn geschüttelt</span>: Was tut deine Schildkröte? Sich in den Panzer zurückziehen? Langsam blinken? Du entscheidest!'
            },
            {
              title: 'Verhalten kombinieren',
              text: 'Plane: Wie bewegt sie sich? Wie reagiert sie auf Licht, Berührung, Schütteln, Hindernisse? Schreibe deine Ideen auf.'
            },
            {
              title: 'Programmieren und testen',
              text: 'Setze deine Ideen um. Teste nach jeder Änderung.',
              textHw: 'Setze deine Ideen um. Lade regelmäßig herunter und teste mit deiner echten Schildkröte.'
            },
            {
              title: 'Persönlichkeit vorstellen',
              text: 'Zeige deine Schildkröte einem Mitschüler. Kann er ihren Charakter erkennen?'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Panzer-Modus',
            text: 'Wenn geschüttelt: Schildkröte stoppt alle Motoren, zeigt Panzer-Symbol, wartet 5 Sekunden, fährt dann langsam weiter.'
          },
          {
            level: 'create',
            title: 'Charakter-Profil',
            text: 'Erstelle ein Profil: Geschwindigkeit, Reaktion auf Licht, Berührung, Hindernisse, Schütteln — alles passend zur Persönlichkeit.'
          }
        ],

        extensions: [
          'Verschiedene Pins, verschiedene Reaktionen — sanft vs. bestimmt?',
          'Was wäre, wenn die Schildkröte zählt, wie oft sie geschüttelt wird, und immer vorsichtiger wird?'
        ]
      },

      /* ---- KAPITEL 7: GEFÜHLE (Variablen) — BONUS ---- */
      {
        id: 7,
        title: 'Gefühle',
        conceptLabel: 'Zustände und Variablen',
        conceptShort: 'Variablen',
        image: 'img/chapters/tortoise/t7.png',
        bonus: true,

        narrative: `<p>Deine Schildkröte kann viel — aber lebt sie wirklich? Was ein Wesen lebendig macht, sind innere Zustände: satt oder hungrig, wach oder müde. Diese verändern das Verhalten — subtil, aber spürbar.</p>

<p>In <strong>Variablen</strong> speichern wir solche Zustände. Deine Schildkröte ist genügsam — ihr Hunger steigt nur langsam. Sie braucht wenig, aber beständig. Wer sich eine Schildkröte aussucht, muss nicht ständig aufpassen — aber er darf sie nicht vergessen.</p>`,

        problem: `<p>Deine Schildkröte soll „hungrig" werden. Hunger steigt langsam. Füttern (Knopf B) senkt ihn. Auf den LEDs soll das sichtbar sein.</p>`,

        concept: `<p>Eine <strong>Variable</strong> ist ein benannter Speicherplatz.</p>
<code>hunger = 0          → satt
hunger = hunger + 1  → hungriger
hunger = 0           → gefüttert</code>
<code>WENN hunger > 8
  DANN trauriges Gesicht
SONST
  zufriedenes Gesicht</code>
<p>In MakeCode: <strong>Variablen</strong> → <strong>Variable erstellen</strong>.</p>`,

        guidedTask: {
          title: 'Die Schildkröte kennt Hunger',
          steps: [
            {
              title: 'Variable erstellen',
              text: '<strong>Variablen</strong> → <strong>Variable erstellen</strong> → <code>hunger</code>.'
            },
            {
              title: 'Startwert',
              text: 'In <span class="calliope-block">beim Start</span>: <span class="calliope-block">hunger auf 0</span>.'
            },
            {
              title: 'Hunger steigern',
              text: 'In <span class="calliope-block">dauerhaft</span>: <span class="calliope-block">ändere hunger um 1</span>, <span class="calliope-block">pausiere 5000</span>. Alle 5 Sekunden etwas hungriger.'
            },
            {
              title: 'Gesicht zeigen',
              text: '<span class="calliope-block">wenn hunger > 8</span> → traurig. Sonst → zufrieden.'
            },
            {
              title: 'Füttern',
              text: '<span class="calliope-block">wenn Knopf B</span>: <span class="calliope-block">hunger auf 0</span>. Herz zeigen.'
            },
            {
              title: 'Beobachte',
              text: 'Erst zufrieden, dann langsam traurig. Knopf B → wieder satt. Geduld gehört zum Kümmern.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Müdigkeit',
            text: 'Zweite Variable <code>muedigkeit</code>. Knopf A = Ruhen. Jetzt zwei Bedürfnisse!'
          },
          {
            level: 'create',
            title: 'Gefühls-Balken',
            text: 'Hunger als langsam wachsender LED-Balken.'
          }
        ],

        extensions: [
          'Langsamere Bewegung bei Hunger?',
          'Was bei Hunger über 15 — eine Warnung?'
        ]
      },

      /* ---- KAPITEL 8: LERNEN (Kombinierte Bedingungen) — BONUS ---- */
      {
        id: 8,
        title: 'Lernen',
        conceptLabel: 'Kombination mehrerer Bedingungen',
        conceptShort: 'UND / ODER',
        image: 'img/chapters/tortoise/t8.png',
        bonus: true,

        narrative: `<p>Bisher einfache Entscheidungen: hungrig oder nicht, hell oder dunkel. Wahre Weisheit beginnt, wo einfache Antworten nicht reichen. Es ist hell, ABER die Schildkröte ist müde — soll sie aufstehen?</p>

<p>Deine Schildkröte hat Geduld. Sie nimmt sich Zeit, alle Faktoren zu prüfen. Nicht die Geschwindigkeit ihrer Entscheidungen macht sie klug, sondern ihre Gründlichkeit.</p>`,

        problem: `<p>Weisere Entscheidungen: Hungrig UND hell → Nahrungssuche. Müde ODER dunkel → Ruhen.</p>`,

        concept: `<p><strong>UND</strong> und <strong>ODER</strong> verknüpfen Bedingungen:</p>
<code>WENN hunger > 8 UND Lichtstärke > 120
  DANN Nahrungssuche

WENN muedigkeit > 10 ODER Lichtstärke < 50
  DANN ruhen</code>
<p><strong>UND</strong>: Beide wahr. <strong>ODER</strong>: Mindestens eine wahr.</p>
<p>MakeCode: <span class="calliope-block">… und …</span> / <span class="calliope-block">… oder …</span> unter <strong>Logik</strong>.</p>`,

        guidedTask: {
          title: 'Die Schildkröte wägt ab',
          steps: [
            {
              title: 'Variablen vorbereiten',
              text: '<code>hunger</code> und <code>muedigkeit</code> aus Kapitel 7.'
            },
            {
              title: 'Kombinierte Bedingung',
              text: '<span class="calliope-block">wenn … dann … sonst</span> mit <span class="calliope-block">… und …</span> aus Logik.'
            },
            {
              title: 'Nahrungssuche',
              text: '<span class="calliope-block">hunger > 8 und Lichtstärke > 120</span> → Motor langsam vorwärts.'
            },
            {
              title: 'Ruhemodus',
              text: '<span class="calliope-block">muedigkeit > 10 oder Lichtstärke < 50</span> → Motor stopp, LEDs aus.'
            },
            {
              title: 'Standard',
              text: 'Sonst: Ruhige Atem-Animation.'
            },
            {
              title: 'Testen',
              text: 'Beobachte die verschiedenen Verhaltensweisen — immer bedächtig und begründet.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Tiefere Überlegungen',
            text: '<code>zufriedenheit</code> hinzufügen. Zufrieden UND satt → Sonnen-Animation.'
          },
          {
            level: 'create',
            title: 'Weiser Tagesablauf',
            text: 'Aufwachen → Fressen → Sonnen → Ruhen. Ein ganzer Tag!'
          }
        ],

        extensions: [
          'Drei Zustände gleichzeitig — wie viele Kombinationen?',
          'Was ist wichtiger: Schlaf oder Nahrung?'
        ]
      },

      /* ---- KAPITEL 9: BEGEGNUNG (Zusammenführung) — BONUS ---- */
      {
        id: 9,
        title: 'Begegnung',
        conceptLabel: 'Zusammenführung — Algorithmen als Baupläne',
        conceptShort: 'Algorithmen',
        image: 'img/chapters/tortoise/t9.png',
        bonus: true,

        narrative: `<p>Deine Schildkröte ist weit gekommen — langsam, aber stetig. Doch heute begegnet sie einem anderen Wesen: schnell, aufgeregt, ein Hase. Zuerst denkt sie: Was soll dieses hektische Wesen?</p>

<p>Doch dann: Der Hase kann genau dasselbe. Dieselbe Struktur, dieselben Bausteine — nur andere <strong>Parameter</strong>. Langsamkeit ist keine Schwäche, sondern ein anderer Weg. Charakter entsteht durch Einstellungen.</p>`,

        problem: `<p>Die Schildkröte ist geduldig genug zum Nachdenken — aber zu langsam allein. Der Hase ist schnell — aber zu ungeduldig. Zusammen schaffen sie es!</p>`,

        concept: `<p>Ein <strong>Algorithmus</strong> ist ein Bauplan. Verschiedene Einstellungen → verschiedene Ergebnisse.</p>
<code>Atem-Animation:
Hase:        300ms  → schnell
Schildkröte: 1500ms → langsam

Gleicher Algorithmus. Anderer Charakter.</code>
<p><em>Algorithmen sind allgemein — Charakter entsteht durch Einstellungen.</em></p>`,

        guidedTask: {
          title: 'Die Programme vergleichen',
          steps: [
            {
              title: 'Überblick',
              text: 'Lege das Programm deiner Schildkröte neben das eines Hasen.'
            },
            {
              title: 'Struktur vergleichen',
              text: 'Gemeinsame Bausteine markieren: <span class="calliope-block">dauerhaft</span>, Bedingungen, Variablen, Motoren.'
            },
            {
              title: 'Parameter finden',
              text: 'Unterschiedliche Zahlen: Pausen, Geschwindigkeiten, Schwellenwerte.'
            },
            {
              title: 'Parameter tauschen',
              text: 'Schildkröten-Werte → Hasen-Werte. Was passiert?'
            },
            {
              title: 'Funk-Zusammenarbeit',
              text: 'Zwei Calliope über <strong>Funk</strong> verbinden. Hase: „Hindernis!". Schildkröte: „Lösung gefunden".'
            },
            {
              title: 'Erkenntnis',
              text: 'Gleicher Bauplan, andere Einstellungen. Das ist die Kraft der Algorithmen.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Funk-Kommunikation',
            text: '<span class="calliope-block">Funk sende Zeichenfolge</span> und <span class="calliope-block">wenn Funkdaten empfangen</span> für den Austausch.'
          },
          {
            level: 'create',
            title: 'Gemeinsames Problem',
            text: 'Zu zweit: Eine Aufgabe, die nur zusammen lösbar ist. Der Hase erkennt schnell, die Schildkröte navigiert sicher.'
          }
        ],

        extensions: [
          'Gibt es ein Tier zwischen Schildkröte und Hase?',
          'Erfinde ein drittes Tier mit anderen Parametern.'
        ]
      }
    ]
  }
};
