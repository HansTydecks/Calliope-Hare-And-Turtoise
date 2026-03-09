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
              text: 'Gehe zu <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> und erstelle ein neues Projekt. Benenne dein Projekt <strong>wie du möchtest.</strong>.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe den Block <span class="calliope-block">zeige LEDs</span> aus der Kategorie <strong>Grundlagen</strong> in den Block <span class="calliope-block">beim Start</span>. Male ein Herz-Muster in die LED-Matrix.'
            },
            {
              title: 'Füge eine Pause ein',
              text: 'Ziehe den Block <span class="calliope-block">pausiere (ms) </span> aus <strong>Grundlagen</strong> unter deinen LED-Block. Der Hase ist schnell — eine halbe Sekunde reicht ihm.'
            },
            {
              title: 'Zeige einen Pfeil',
              text: 'Ziehe den Block <span class="calliope-block">zeige Symbol</span> aus <strong>Grundlagen</strong> darunter und wähle den Pfeil nach oben (↑). Füge wieder eine Pause von einer halben Sekunde ein.'
            },
            {
              title: 'Lösche die Anzeige',
              text: 'Ziehe <span class="calliope-block">Bildschirminhalt löschen</span> als letzten Block in die Sequenz.'
            },
            {
              title: 'Teste dein Programm',
              text: 'Klicke auf den ▶ Play-Button im Simulator. Siehst du, wie zuerst das Herz erscheint, dann der Pfeil, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.',
              textHw: 'Klicke auf <strong>Herunterladen</strong>, öffne die Datei im Datei-Explorer und ziehe sie auf deinen Calliope mini. Blinkt dein Mini? Dann hast du alles richtig gemacht! Siehst du, wie zuerst das Herz erscheint, dann der Pfeil, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.'
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
              text: 'Öffne dein Projekt.'
            },
            {
              title: 'Finde den Dauerhaft-Block',
              text: 'Du siehst den Block <span class="calliope-block">dauerhaft</span> bereits im Editor. Programme werden von oben nach unten abgearbeitet — und alles im <span class="calliope-block">dauerhaft</span>-Block wird danach endlos wiederholt.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe <span class="calliope-block">zeige LEDs</span> in den <span class="calliope-block">dauerhaft</span>-Block. Male ein großes Herz (♥).'
            },
            {
              title: 'Pause — Einatmen',
              text: 'Füge <span class="calliope-block">pausiere (ms)</span> ein — wie lange? Der Hase atmet schnell, ein Drittel einer Sekunde passt zu ihm!'
            },
            {
              title: 'Zeige ein kleines Herz',
              text: 'Füge einen zweiten <span class="calliope-block">zeige LEDs</span> Block ein. Male ein kleineres Herz — das ist das „Ausatmen".'
            },
            {
              title: 'Pause — Ausatmen',
              text: 'Füge eine weitere Pause derselben Länge ein.'
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
              text: 'In den <strong>sonst</strong>-Bereich: <span class="calliope-block">zeige Zeichenfolge „z"</span>. Wenn es dunkel ist, schläft der Hase — und zeigt es auch!'
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
              text: 'Überlege dir: Wie zeigt dein Hase, dass er sich freut? Wähle ein passendes LED-Muster oder Symbol, füge eine kurze Pause ein und lösche danach den Bildschirm.'
            },
            {
              title: 'Knopf B: Füttern',
              text: 'Ziehe einen weiteren <span class="calliope-block">wenn Knopf B gedrückt</span> Block in den Editor.'
            },
            {
              title: 'Fressen zeigen',
              text: 'Überlege dir: Was zeigt dein Hase, wenn er frisst? Wähle ein anderes Muster oder Symbol als bei Knopf A. Pause und Löschen wie vorher.'
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

<p>Mit dem <strong>Maqueen</strong>-Roboter bekommt dein Calliope mini Räder und Sensoren. Der Maqueen hat zwei Motoren und einen <strong>Ultraschallsensor</strong>. Dein Hase soll nur losfahren, wenn es hell genug ist — und anhalten, wenn ein Hindernis vor ihm steht. Das baust du Schritt für Schritt auf!</p>`,

        problem: `<p>Dein Hase soll sich bewegen — aber nur, wenn es hell genug ist. Und selbst dann muss er auf Hindernisse achten. Wie bringst du ihm bei, seine Umgebung zu prüfen, bevor er losfährt?</p>`,

        concept: `<p>Der <strong>Maqueen</strong>-Roboter hat zwei Motoren und einen <strong>Ultraschallsensor</strong>, der Abstände misst — wie ein Echolot.</p>
<p>Dein Programm prüft zwei Dinge, bevor der Hase fährt:</p>
<code>WENN Lichtstärke > 10 (es ist hell)
  UND WENN Ultraschall > 5 cm (kein Hindernis)
    DANN fahre vorwärts!
  SONST → stoppe die Motoren
SONST (es ist dunkel)
  → stoppe und zeige „z"</code>
<p>Wir bauen das in zwei Schritten auf: Erst reagiert der Hase nur auf Licht, dann kommt die Hindernis-Erkennung dazu.</p>`,

        guidedTask: {
          title: 'Der Hase lernt sich zu bewegen',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne dein Projekt.'
            },
            {
              title: 'Maqueen-Erweiterung laden',
              text: 'Klicke auf <strong>Erweiterungen</strong> und suche nach <strong>Maqueen</strong>. Füge das Paket hinzu — neue Blöcke für Motoren und Sensoren erscheinen.'
            },
            {
              title: 'Schritt 1 — Fahren bei Licht',
              text: 'In <span class="calliope-block">dauerhaft</span>: Füge <span class="calliope-block">wenn … dann … sonst</span> ein. Bedingung: <span class="calliope-block">Lichtstärke > 10</span>. Im <strong>dann</strong>-Bereich: <span class="calliope-block">Motor alle vorwärts Tempo 50</span> und deine Atem-Animation (großes Herz → kleines Herz). Im <strong>sonst</strong>-Bereich: <span class="calliope-block">Motor alle stoppen</span> und <span class="calliope-block">zeige Zeichenfolge „z"</span>. Teste: Bedecke den Lichtsensor — der Hase stoppt und schläft!'
            },
            {
              title: 'Schritt 2 — Hindernis-Erkennung',
              text: 'Erweitere den <strong>dann</strong>-Bereich: Füge <em>innerhalb</em> der Licht-Bedingung eine zweite Bedingung ein: <span class="calliope-block">wenn Ultraschall Abstand (cm) > 5</span>. Nur wenn nichts im Weg ist, fährt der Hase. Im neuen <strong>sonst</strong>-Bereich: <span class="calliope-block">Motor alle stoppen</span>. Der Hase fährt jetzt nur, wenn es hell ist <strong>und</strong> kein Hindernis vor ihm steht!'
            },
            {
              title: 'Testen',
              text: 'Starte den Simulator. Bedecke den Lichtsensor → der Hase schläft. Gib Licht → er fährt. Setze ein Hindernis nahe → er stoppt.',
              textHw: 'Lade das Programm auf deinen Calliope und teste: Licht an → er fährt. Hand vor den Ultraschallsensor → er stoppt. Licht aus → er schläft!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Geschwindigkeit anpassen',
            text: 'Was passiert bei Tempo 20? Bei Tempo 100? Wie schnell soll dein Hase fahren? Probiere verschiedene Werte!'
          },
          {
            level: 'create',
            title: 'Verhalten bei Hindernis',
            text: 'Was soll der Hase tun, wenn ein Hindernis erkannt wird? Nur stoppen — oder auch ein warnendes Symbol zeigen? Oder vielleicht einen Ton spielen?'
          }
        ],

        extensions: [
          'Was wäre, wenn der Hase sein Tempo an die Helligkeit anpasst? Bei viel Licht rennt er, bei wenig Licht schleicht er.',
          'Kannst du den Hasen rückwärts fahren lassen, wenn ein Hindernis erkannt wird?'
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

<p>In diesem Kapitel bekommt dein Hase drei neue Fähigkeiten: Er reagiert auf <strong>Berührung</strong> (Touch-Pins), auf <strong>Schütteln</strong> und auf <strong>Geräusche</strong> (Mikrofon). Damit und mit allem, was du bisher gelernt hast, gestaltest du die Persönlichkeit deines Hasen. Wie reagiert er, wenn er gestreichelt wird? Was passiert, wenn du ihn anschreist? Das entscheidest jetzt du!</p>`,

        problem: `<p>Dein Hase hat viele Fähigkeiten — aber noch keine eigene Persönlichkeit. Kombiniere alles, was du bisher gelernt hast, und füge neue Interaktionen hinzu: Touch-Pins, Schütteln und Mikrofon. Mach aus deinem Hasen ein einzigartiges Tier!</p>`,

        concept: `<p>Der Calliope mini hat <strong>Touch-Pins</strong> (berührungsempfindliche Kontakte), einen <strong>Beschleunigungssensor</strong> (Schütteln) und ein <strong>Mikrofon</strong> (Lautstärke).</p>
<code>wenn Pin P1 berührt → Hase dreht nach links
wenn geschüttelt → Hase zeigt überraschtes Gesicht
wenn Lautstärke > 100 → Hase erschrickt und dreht sich schnell</code>
<p><strong>Integration</strong> bedeutet: Du verbindest alle bisherigen Konzepte (Sequenz, Schleife, Sensoren, Bedingungen, Motoren) zu einem zusammenhängenden, eigenen Programm. Weniger Anleitung, mehr eigene Ideen!</p>`,

        guidedTask: {
          title: 'Gib deinem Hasen Persönlichkeit',
          steps: [
            {
              title: 'Überblick verschaffen',
              text: 'Öffne dein Projekt. Schau dir an, was dein Hase schon kann: Atmen, Licht erkennen, auf Knöpfe reagieren, fahren, ausweichen.'
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
              title: 'Mikrofon nutzen',
              text: 'Unter <strong>Eingabe</strong> findest du <span class="calliope-block">Lautstärke</span>. Baue eine Bedingung ein: Wenn die Lautstärke hoch genug ist (z.B. wenn du den Hasen anschreist), soll er mit den Motoren reagieren — vielleicht dreht er sich schnell weg oder fährt einen Schlenker!'
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

<p>In der Programmierung speichern wir solche Zustände in <strong>Variablen</strong> — Schubladen mit Etikett und einer Zahl darin. Der Calliope mini hat <strong>3 RGB-LEDs</strong> — perfekt, um den Hunger deines Hasen sichtbar zu machen!</p>

<p>Dein Hase ist ungeduldig, auch mit seinen Gefühlen: Sein Hunger steigt schnell, er braucht viel Aufmerksamkeit!</p>`,

        problem: `<p>Dein Hase soll „hungrig" werden können. Jedes Mal, wenn er gefüttert wird (Knopf B), geht eine RGB-LED an — bis alle <strong>3 LEDs</strong> leuchten. Dann ist er satt und kann nicht mehr gefüttert werden.</p>`,

        concept: `<p>Eine <strong>Variable</strong> ist ein benannter Speicherplatz mit einem Namen und einem Wert.</p>
<code>futter = 0          → Der Hase ist hungrig (keine LED an).
futter = futter + 1  → Er bekommt Futter (eine LED mehr).
futter = 3           → Er ist satt (alle 3 LEDs an).</code>
<p>Du kannst Variablen abfragen und begrenzen:</p>
<code>WENN futter < 3
  DANN futter = futter + 1
SONST
  → nichts tun (schon satt!)</code>
<p>In MakeCode: <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Die RGB-LEDs findest du unter <strong>RGB-LED</strong>.</p>`,

        guidedTask: {
          title: 'Der Hase bekommt Futter',
          steps: [
            {
              title: 'Variable erstellen',
              text: 'Gehe zu <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Nenne sie <code>futter</code>.'
            },
            {
              title: 'Startwert setzen',
              text: 'In <span class="calliope-block">beim Start</span>: Setze <span class="calliope-block">futter auf 0</span>. Dein Hase startet hungrig — keine LED leuchtet.'
            },
            {
              title: 'Füttern mit Knopf B',
              text: 'In <span class="calliope-block">wenn Knopf B gedrückt</span>: Prüfe mit <span class="calliope-block">wenn futter &lt; 3</span> — nur dann darf gefüttert werden. Wenn ja: <span class="calliope-block">ändere futter um 1</span>.'
            },
            {
              title: 'RGB-LEDs anzeigen',
              text: 'Noch im Knopf-B-Block: Nutze <span class="calliope-block">wenn … dann … sonst wenn …</span>, um je nach Wert von <code>futter</code> die passende Anzahl RGB-LEDs einzuschalten. Bei 1 leuchtet eine LED, bei 2 zwei, bei 3 alle drei.'
            },
            {
              title: 'Satt-Meldung',
              text: 'Im <strong>sonst</strong>-Teil (wenn <code>futter</code> schon 3 ist): Zeige kurz ein fröhliches Symbol — der Hase ist satt und braucht nichts mehr!'
            },
            {
              title: 'Beobachte',
              text: 'Drücke B mehrmals. Die LEDs gehen eine nach der anderen an. Nach dem dritten Mal passiert nichts mehr — dein Hase ist satt!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Hunger über Zeit',
            text: 'Baue in <span class="calliope-block">dauerhaft</span> ein, dass <code>futter</code> langsam sinkt (z.B. alle paar Sekunden um 1). Jetzt musst du dich dauerhaft um deinen Hasen kümmern!'
          },
          {
            level: 'create',
            title: 'Farben zeigen Stimmung',
            text: 'Ändere die Farbe der RGB-LEDs je nach Futter-Stand: rot = hungrig, gelb = etwas satt, grün = voll satt.'
          }
        ],

        extensions: [
          'Was wäre, wenn der Hase sich anders bewegt, wenn er hungrig ist?',
          'Kannst du ein „Game Over" einbauen, wenn der Hase zu lange nicht gefüttert wird?'
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
              text: 'Gehe zu <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> und erstelle ein neues Projekt. Benenne dein Projekt <strong>wie du möchtest.</strong>'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe den Block <span class="calliope-block">zeige LEDs</span> aus <strong>Grundlagen</strong> in <span class="calliope-block">beim Start</span>. Male ein Herz-Muster.'
            },
            {
              title: 'Füge eine Pause ein',
              text: 'Ziehe den Block <span class="calliope-block">pausiere (ms)</span> aus <strong>Grundlagen</strong> unter deinen LED-Block. Die Schildkröte lässt sich Zeit — anderthalb Sekunden.'
            },
            {
              title: 'Zeige ein Symbol',
              text: 'Ziehe den Block <span class="calliope-block">zeige Symbol</span> aus <strong>Grundlagen</strong> darunter und wähle ein Diamant-Muster (◇). Füge wieder eine Pause von anderthalb Sekunden ein.'
            },
            {
              title: 'Lösche die Anzeige',
              text: 'Ziehe <span class="calliope-block">Bildschirminhalt löschen</span> als letzten Block.'
            },
            {
              title: 'Teste dein Programm',
              text: 'Klicke auf den ▶ Play-Button im Simulator. Siehst du, wie zuerst das Herz erscheint, dann der Diamant, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.',
              textHw: 'Klicke auf <strong>Herunterladen</strong>, öffne die Datei im Datei-Explorer und ziehe sie auf deinen Calliope mini. Blinkt dein Mini? Dann hast du alles richtig gemacht! Siehst du, wie zuerst das Herz erscheint, dann der Diamant, und dann alles erlischt? Das ist eine <strong>Sequenz</strong>.'
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
              text: 'Öffne dein Projekt.'
            },
            {
              title: 'Finde den Dauerhaft-Block',
              text: 'Der <span class="calliope-block">dauerhaft</span>-Block ist bereits im Editor. Programme werden von oben nach unten abgearbeitet — und alles im <span class="calliope-block">dauerhaft</span>-Block wird danach endlos wiederholt.'
            },
            {
              title: 'Zeige ein Herz',
              text: 'Ziehe <span class="calliope-block">zeige LEDs</span> in den <span class="calliope-block">dauerhaft</span>-Block. Male ein großes Herz (♥).'
            },
            {
              title: 'Pause — Einatmen',
              text: 'Füge <span class="calliope-block">pausiere (ms)</span> ein — wie lange? Die Schildkröte atmet langsam und tief, anderthalb Sekunden passen gut zu ihr!'
            },
            {
              title: 'Zeige ein kleines Herz',
              text: 'Zweiter <span class="calliope-block">zeige LEDs</span>-Block mit kleinerem Herz — das „Ausatmen".'
            },
            {
              title: 'Pause — Ausatmen',
              text: 'Füge eine weitere Pause derselben Länge ein.'
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
              text: 'Im <strong>sonst</strong>-Bereich: <span class="calliope-block">zeige Zeichenfolge „z"</span>. Wenn es dunkel ist, ruht die Schildkröte — und zeigt es auch!'
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
              text: 'Überlege dir: Wie zeigt deine Schildkröte, dass sie sich freut? Sie denkt erst nach (kurze Pause), dann zeigt sie ihre Reaktion, wartet und löscht den Bildschirm.'
            },
            {
              title: 'Knopf B: Füttern',
              text: '<span class="calliope-block">wenn Knopf B gedrückt</span> — Überlege dir: Was zeigt deine Schildkröte, wenn sie frisst? Wähle ein anderes Muster oder Symbol als bei Knopf A.'
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

<p>Mit dem <strong>Maqueen</strong>-Roboter bekommt dein Calliope mini Räder und Sensoren. Der Maqueen hat zwei Motoren und einen <strong>Ultraschallsensor</strong>. Deine Schildkröte soll nur losfahren, wenn es hell genug ist — und anhalten, wenn ein Hindernis vor ihr steht. Das baust du Schritt für Schritt auf!</p>`,

        problem: `<p>Deine Schildkröte soll sich bewegen — aber nur, wenn es hell genug ist. Und selbst dann muss sie auf Hindernisse achten. Wie bringst du ihr bei, ihre Umgebung zu prüfen, bevor sie losfährt?</p>`,

        concept: `<p>Der <strong>Maqueen</strong>-Roboter hat zwei Motoren und einen <strong>Ultraschallsensor</strong>, der Abstände misst — wie ein Echolot.</p>
<p>Dein Programm prüft zwei Dinge, bevor die Schildkröte fährt:</p>
<code>WENN Lichtstärke > 10 (es ist hell)
  UND WENN Ultraschall > 5 cm (kein Hindernis)
    DANN fahre vorwärts!
  SONST → stoppe die Motoren
SONST (es ist dunkel)
  → stoppe und zeige „z"</code>
<p>Wir bauen das in zwei Schritten auf: Erst reagiert die Schildkröte nur auf Licht, dann kommt die Hindernis-Erkennung dazu.</p>`,

        guidedTask: {
          title: 'Die Schildkröte lernt sich zu bewegen',
          steps: [
            {
              title: 'Öffne dein Projekt',
              text: 'Öffne dein Projekt.'
            },
            {
              title: 'Maqueen-Erweiterung laden',
              text: 'Klicke auf <strong>Erweiterungen</strong> und suche nach <strong>Maqueen</strong>. Füge das Paket hinzu — neue Blöcke für Motoren und Sensoren erscheinen.'
            },
            {
              title: 'Schritt 1 — Fahren bei Licht',
              text: 'In <span class="calliope-block">dauerhaft</span>: Füge <span class="calliope-block">wenn … dann … sonst</span> ein. Bedingung: <span class="calliope-block">Lichtstärke > 10</span>. Im <strong>dann</strong>-Bereich: <span class="calliope-block">Motor alle vorwärts Tempo 50</span> und deine Atem-Animation (großes Herz → kleines Herz). Im <strong>sonst</strong>-Bereich: <span class="calliope-block">Motor alle stoppen</span> und <span class="calliope-block">zeige Zeichenfolge „z"</span>. Teste: Bedecke den Lichtsensor — die Schildkröte stoppt und ruht!'
            },
            {
              title: 'Schritt 2 — Hindernis-Erkennung',
              text: 'Erweitere den <strong>dann</strong>-Bereich: Füge <em>innerhalb</em> der Licht-Bedingung eine zweite Bedingung ein: <span class="calliope-block">wenn Ultraschall Abstand (cm) > 5</span>. Nur wenn nichts im Weg ist, fährt die Schildkröte. Im neuen <strong>sonst</strong>-Bereich: <span class="calliope-block">Motor alle stoppen</span>. Die Schildkröte fährt jetzt nur, wenn es hell ist <strong>und</strong> kein Hindernis vor ihr steht!'
            },
            {
              title: 'Testen',
              text: 'Starte den Simulator. Bedecke den Lichtsensor → die Schildkröte ruht. Gib Licht → sie fährt. Setze ein Hindernis nahe → sie stoppt.',
              textHw: 'Lade das Programm auf deinen Calliope und teste: Licht an → sie fährt. Hand vor den Ultraschallsensor → sie stoppt. Licht aus → sie ruht!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Geschwindigkeit anpassen',
            text: 'Was passiert bei Tempo 20? Bei Tempo 100? Wie schnell soll deine Schildkröte fahren? Probiere verschiedene Werte!'
          },
          {
            level: 'create',
            title: 'Verhalten bei Hindernis',
            text: 'Was soll die Schildkröte tun, wenn ein Hindernis erkannt wird? Nur stoppen — oder sich in den Panzer zurückziehen? Oder vielleicht einen Ton spielen?'
          }
        ],

        extensions: [
          'Was wäre, wenn die Schildkröte ihr Tempo an die Helligkeit anpasst? Bei viel Licht gleitet sie, bei wenig Licht schleicht sie.',
          'Kannst du die Schildkröte rückwärts fahren lassen, wenn ein Hindernis erkannt wird?'
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

<p>Drei neue Fähigkeiten warten: <strong>Touch-Pins</strong> (Berührung), <strong>Schütteln</strong> und <strong>Geräusche</strong> (Mikrofon). Kombiniert mit allem Bisherigen gestaltest du eine einzigartige Persönlichkeit. Weniger Anleitung, mehr eigene Ideen. Wie reagiert deine Schildkröte, wenn man sie berührt? Was tut sie, wenn du sie anschreist? Du entscheidest!</p>`,

        problem: `<p>Deine Schildkröte hat viele Fähigkeiten, aber noch keine eigene Persönlichkeit. Kombiniere alles und füge Touch-Pins, Schütteln und Mikrofon hinzu. Mach sie einzigartig!</p>`,

        concept: `<p>Der Calliope hat <strong>Touch-Pins</strong>, einen <strong>Beschleunigungssensor</strong> (Schütteln) und ein <strong>Mikrofon</strong> (Lautstärke).</p>
<code>wenn Pin P1 berührt → Schildkröte dreht langsam links
wenn geschüttelt → Schildkröte zieht sich in Panzer zurück
wenn Lautstärke > 100 → Schildkröte stoppt erschrocken</code>
<p><strong>Integration</strong>: Du verbindest alle bisherigen Konzepte zu einem eigenen, zusammenhängenden Programm.</p>`,

        guidedTask: {
          title: 'Gib deiner Schildkröte Persönlichkeit',
          steps: [
            {
              title: 'Überblick verschaffen',
              text: 'Öffne dein Projekt. Was kann sie schon? Atmen, Licht, Knöpfe, Fahren, Ausweichen.'
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
              title: 'Mikrofon nutzen',
              text: 'Unter <strong>Eingabe</strong> findest du <span class="calliope-block">Lautstärke</span>. Baue eine Bedingung ein: Wenn die Lautstärke hoch genug ist (z.B. wenn du die Schildkröte anschreist), soll sie mit den Motoren reagieren — vielleicht stoppt sie erschrocken und zieht sich in den Panzer zurück!'
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

<p>In <strong>Variablen</strong> speichern wir solche Zustände. Der Calliope mini hat <strong>3 RGB-LEDs</strong> — perfekt, um den Hunger deiner Schildkröte sichtbar zu machen!</p>

<p>Deine Schildkröte ist genügsam — sie braucht wenig, aber beständig. Wer sich eine Schildkröte aussucht, muss nicht ständig aufpassen — aber er darf sie nicht vergessen.</p>`,

        problem: `<p>Deine Schildkröte soll „hungrig" werden. Jedes Mal, wenn sie gefüttert wird (Knopf B), geht eine RGB-LED an — bis alle <strong>3 LEDs</strong> leuchten. Dann ist sie satt und kann nicht mehr gefüttert werden.</p>`,

        concept: `<p>Eine <strong>Variable</strong> ist ein benannter Speicherplatz.</p>
<code>futter = 0          → hungrig (keine LED an)
futter = futter + 1  → bekommt Futter (eine LED mehr)
futter = 3           → satt (alle 3 LEDs an)</code>
<code>WENN futter < 3
  DANN futter = futter + 1
SONST
  → nichts tun (schon satt!)</code>
<p>In MakeCode: <strong>Variablen</strong> → <strong>Variable erstellen</strong>. Die RGB-LEDs findest du unter <strong>RGB-LED</strong>.</p>`,

        guidedTask: {
          title: 'Die Schildkröte bekommt Futter',
          steps: [
            {
              title: 'Variable erstellen',
              text: '<strong>Variablen</strong> → <strong>Variable erstellen</strong> → <code>futter</code>.'
            },
            {
              title: 'Startwert',
              text: 'In <span class="calliope-block">beim Start</span>: <span class="calliope-block">futter auf 0</span>. Deine Schildkröte startet hungrig — keine LED leuchtet.'
            },
            {
              title: 'Füttern mit Knopf B',
              text: 'In <span class="calliope-block">wenn Knopf B gedrückt</span>: Prüfe mit <span class="calliope-block">wenn futter &lt; 3</span> — nur dann darf gefüttert werden. Wenn ja: <span class="calliope-block">ändere futter um 1</span>.'
            },
            {
              title: 'RGB-LEDs anzeigen',
              text: 'Noch im Knopf-B-Block: Nutze <span class="calliope-block">wenn … dann … sonst wenn …</span>, um je nach Wert von <code>futter</code> die passende Anzahl RGB-LEDs einzuschalten. Bei 1 leuchtet eine LED, bei 2 zwei, bei 3 alle drei.'
            },
            {
              title: 'Satt-Meldung',
              text: 'Im <strong>sonst</strong>-Teil (wenn <code>futter</code> schon 3 ist): Zeige ein zufriedenes Symbol — die Schildkröte ist satt und braucht nichts mehr.'
            },
            {
              title: 'Beobachte',
              text: 'Drücke B mehrmals. Die LEDs gehen eine nach der anderen an. Nach dem dritten Mal passiert nichts mehr — deine Schildkröte ist satt.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Hunger über Zeit',
            text: 'Baue in <span class="calliope-block">dauerhaft</span> ein, dass <code>futter</code> langsam sinkt (z.B. alle paar Sekunden um 1). Jetzt musst du dich dauerhaft kümmern!'
          },
          {
            level: 'create',
            title: 'Farben zeigen Stimmung',
            text: 'Ändere die Farbe der RGB-LEDs je nach Futter-Stand: rot = hungrig, gelb = etwas satt, grün = voll satt.'
          }
        ],

        extensions: [
          'Langsamere Bewegung bei Hunger?',
          'Kannst du eine Warnung einbauen, wenn die Schildkröte zu lange nicht gefüttert wird?'
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
        title: 'Nach Kapitel 5 — Bewegung (Maqueen)',
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
        wenn Ultraschall (cm) > 5
            Motor alle vorwärts Tempo 50
            zeige LEDs      (Atem klein)
            pausiere (ms) 300
            zeige LEDs      (Atem groß)
            pausiere (ms) 300
        sonst
            Motor alle stoppen
    sonst
        Motor alle stoppen
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
        Motor alle vorwärts Tempo 80    (lauter → schneller)
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
        title: 'Nach Kapitel 5 — Bewegung (Maqueen)',
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
        wenn Ultraschall (cm) > 5
            Motor alle vorwärts Tempo 30
            zeige LEDs      (Atem klein)
            pausiere (ms) 600
            zeige LEDs      (Atem groß)
            pausiere (ms) 600
        sonst
            Motor alle stoppen
    sonst
        Motor alle stoppen
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
        Motor alle vorwärts Tempo 50    (lauter → schneller)
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
