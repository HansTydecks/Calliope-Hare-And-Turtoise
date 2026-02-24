/* =============================================
   PYTHON CONTENT — content-python.js
   Python / MakeCode Python content for all chapters
   Both paths (hare + tortoise), DE + EN
   ============================================= */

window.PYTHON_CONTENT = {

  /* ===========================
     GERMAN — Python content
     =========================== */
  de: {
    hare: [

      /* ---- Kapitel 1: Erwachen (Sequenz) ---- */
      {
        concept: {
          explanation: `<p>In MakeCode kannst du oben im Editor zwischen <strong>Blöcken</strong> und <strong>Python</strong> umschalten. Klicke dazu auf den <strong>Python</strong>-Button oben in der Leiste.</p>
<p>In Python schreibst du die gleichen Befehle wie mit Blöcken — aber als Text. Eine <strong>Sequenz</strong> ist einfach: Du schreibst die Befehle untereinander, Zeile für Zeile. Python führt sie von oben nach unten aus.</p>
<p>Wichtige Befehle, die du hier brauchst:</p>
<ul>
<li><code>basic.show_leds()</code> — zeigt ein 5×5-LED-Muster</li>
<li><code>basic.pause(500)</code> — wartet 500 Millisekunden</li>
<li><code>basic.clear_screen()</code> — löscht die Anzeige</li>
</ul>`,
          code: `# Sequenz — Befehle nacheinander
# Jede Zeile wird nacheinander ausgeführt

basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(500)
basic.show_leds("""
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .
""")
basic.pause(500)
basic.clear_screen()`,
          tip: `In Python ist die Einrückung (Leerzeichen am Anfang) wichtig! MakeCode macht das meistens automatisch richtig. Die drei Anführungszeichen <code>"""</code> erlauben mehrzeiligen Text — perfekt für LED-Muster.`
        },
        steps: {
          0: {
            explanation: `<p>Wenn du in MakeCode ein neues Projekt erstellst, klicke oben auf <strong>Python</strong> statt <strong>Blöcke</strong>. Du siehst dann einen Texteditor statt bunter Blöcke.</p>`,
            code: `# So sieht ein leeres MakeCode-Python-Projekt aus:
# (Der Cursor blinkt — du kannst direkt lostippen!)`,
            tip: `Du kannst jederzeit zwischen Blöcken und Python hin- und herschalten. MakeCode übersetzt automatisch!`
          },
          1: {
            explanation: `<p>Statt den Block <span class="calliope-block">zeige LEDs</span> zu ziehen, schreibst du in Python:</p>`,
            code: `basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")`,
            tip: `<code>#</code> bedeutet LED an, <code>.</code> bedeutet LED aus. Jede Zeile hat 5 Zeichen für die 5 Spalten.`
          },
          2: {
            explanation: `<p>Eine Pause schreibst du als Funktionsaufruf mit der Zeit in Millisekunden:</p>`,
            code: `basic.pause(500)  # 500ms = eine halbe Sekunde`,
            tip: `Alles nach dem <code>#</code>-Zeichen ist ein Kommentar — Python ignoriert es. Nutze Kommentare, um deinen Code zu erklären!`
          },
          4: {
            explanation: `<p>Den Bildschirm löschen geht mit:</p>`,
            code: `basic.clear_screen()`,
            tip: `Beachte die Klammern <code>()</code> am Ende — sie sagen Python, dass es eine Funktion aufrufen soll.`
          }
        },
        fullTask: {
          explanation: `<p><strong>Das vollständige Programm in Python:</strong></p>
<p>Hier siehst du alle Befehle zusammen — genau die Sequenz, die dein Hase als Lebenszeichen zeigt:</p>`,
          code: `# Mein Hase — Kapitel 1: Erwachen
# Eine Sequenz: Befehle werden nacheinander ausgeführt

# Schritt 1: Zeige ein Herz
basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")

# Schritt 2: Kurze Pause (der Hase ist schnell!)
basic.pause(500)

# Schritt 3: Zeige einen Stern
basic.show_leds("""
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .
""")

# Schritt 4: Noch eine Pause
basic.pause(500)

# Schritt 5: Alles löschen
basic.clear_screen()`,
          tip: `Versuche, die Reihenfolge der Zeilen zu ändern — was passiert? Genau wie bei den Blöcken bestimmt die Reihenfolge, was der Hase tut.`
        }
      },

      /* ---- Kapitel 2: Atmen (Endlosschleife) ---- */
      {
        concept: {
          explanation: `<p>Eine <strong>Endlosschleife</strong> heißt in Python <code>while True:</code> — der Code darin wird für immer wiederholt. In MakeCode Python nutzt du stattdessen die Funktion <code>basic.forever()</code> mit einer eigenen Funktion darin.</p>
<p>MakeCode bietet zwei Wege:</p>
<ul>
<li><code>basic.forever(funktion)</code> — wie der <span class="calliope-block">dauerhaft</span>-Block</li>
<li><code>while True:</code> — klassische Python-Endlosschleife</li>
</ul>`,
          code: `# Weg 1: MakeCode-Stil mit basic.forever()
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)
basic.forever(on_forever)

# Weg 2: Klassisches Python mit while True
while True:
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)`,
          tip: `<code>def on_forever():</code> definiert eine Funktion. Alles Eingerückte darunter gehört dazu. <code>basic.forever(on_forever)</code> ruft diese Funktion endlos auf.`
        },
        steps: {
          2: {
            explanation: `<p>In Python zeigst du Symbole mit <code>basic.show_icon()</code>:</p>`,
            code: `basic.show_icon(IconNames.HEART)        # Großes Herz ♥
basic.show_icon(IconNames.HEART_SMALL)  # Kleines Herz`,
            tip: `<code>IconNames</code> enthält viele vordefinierte Symbole: <code>HEART</code>, <code>HAPPY</code>, <code>SAD</code>, <code>STAR</code>, <code>DIAMOND</code> und viele mehr!`
          }
        },
        fullTask: {
          explanation: `<p><strong>Der Herzschlag des Hasen in Python:</strong></p>`,
          code: `# Mein Hase — Kapitel 2: Atmen
# Endlosschleife: Das Herz pulsiert für immer

def on_forever():
    # Einatmen — großes Herz
    basic.show_icon(IconNames.HEART)
    basic.pause(300)  # Hase atmet schnell!
    
    # Ausatmen — kleines Herz
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)

# Starte die Endlosschleife
basic.forever(on_forever)`,
          tip: `Ändere die <code>300</code> in der Pause — z.B. auf <code>100</code> für hektisches Atmen oder <code>800</code> für ruhiges Atmen. Das verändert die Persönlichkeit!`
        }
      },

      /* ---- Kapitel 3: Wahrnehmen (Sensoren) ---- */
      {
        concept: {
          explanation: `<p><strong>Sensoren</strong> liest du in Python mit Funktionen aus. Der Lichtsensor liefert einen Wert zwischen 0 und 255:</p>
<ul>
<li><code>input.light_level()</code> — gibt die aktuelle Lichtstärke zurück</li>
</ul>
<p>Du kannst den Wert in einer <strong>Variable</strong> speichern oder direkt in einer Bedingung verwenden.</p>`,
          code: `# Lichtstärke lesen und anzeigen
licht = input.light_level()    # Wert 0-255
basic.show_number(licht)       # Auf LEDs anzeigen

# In einer Bedingung verwenden
if input.light_level() > 50:
    # Es ist hell genug
    basic.show_icon(IconNames.HEART)
else:
    # Es ist zu dunkel
    basic.clear_screen()`,
          tip: `<code>if</code> ist die Python-Version von „wenn…dann". Der Doppelpunkt <code>:</code> am Ende ist wichtig! Alles Eingerückte darunter gehört zum <code>if</code>- oder <code>else</code>-Block.`
        },
        steps: {
          1: {
            explanation: `<p>Lichtstärke anzeigen in Python:</p>`,
            code: `def on_forever():
    basic.show_number(input.light_level())
basic.forever(on_forever)`,
            tip: `<code>input.light_level()</code> wird als Argument direkt in <code>basic.show_number()</code> eingesetzt — verschachtelte Funktionsaufrufe!`
          },
          3: {
            explanation: `<p>Den Schwellenwert als Bedingung formulieren:</p>`,
            code: `if input.light_level() > 50:
    # hell → wach
else:
    # dunkel → schlafen`,
            tip: `Der Hase reagiert auf wenig Licht (Schwelle = 50). Ändere den Wert, um die Empfindlichkeit anzupassen.`
          }
        },
        fullTask: {
          explanation: `<p><strong>Der Hase sieht das Licht — vollständiges Programm:</strong></p>`,
          code: `# Mein Hase — Kapitel 3: Wahrnehmen
# Lichtsensor + Bedingung

def on_forever():
    if input.light_level() > 50:
        # Hell → Hase ist wach, atmet schnell
        basic.show_icon(IconNames.HEART)
        basic.pause(300)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(300)
    else:
        # Dunkel → Hase schläft
        basic.clear_screen()

basic.forever(on_forever)`,
          tip: `Beachte die <strong>Einrückung</strong>: Der <code>if</code>-Block und der <code>else</code>-Block müssen gleich eingerückt sein. Der Code innerhalb muss noch weiter eingerückt sein.`
        }
      },

      /* ---- Kapitel 4: Entscheiden (Wenn-Dann) ---- */
      {
        concept: {
          explanation: `<p>Auf <strong>Knopfdruck</strong> reagieren geht in Python mit Event-Funktionen:</p>
<ul>
<li><code>input.on_button_pressed(Button.A, funktion)</code> — reagiert auf Knopf A</li>
<li><code>input.on_button_pressed(Button.B, funktion)</code> — reagiert auf Knopf B</li>
<li><code>input.on_button_pressed(Button.AB, funktion)</code> — beide gleichzeitig</li>
</ul>
<p>Jeder Knopf bekommt seine eigene Funktion — so kann dein Hase unterschiedlich reagieren.</p>`,
          code: `# Auf Knopf A reagieren: Streicheln
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

# Auf Knopf B reagieren: Füttern
def on_button_b():
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `In Python definierst du erst die Funktion (<code>def</code>) und registrierst sie dann mit <code>input.on_button_pressed()</code>. Die Reihenfolge ist wichtig: Definition vor Registrierung!`
        },
        fullTask: {
          explanation: `<p><strong>Der Hase unterscheidet Knöpfe — vollständiges Programm:</strong></p>`,
          code: `# Mein Hase — Kapitel 4: Entscheiden
# Knöpfe als Eingabe + Bedingungen

# Knopf A: Streicheln → fröhlich
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

# Knopf B: Füttern → Herz
def on_button_b():
    basic.show_leds("""
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
    """)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# Dauerhaft: Atem-Animation
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)
basic.forever(on_forever)`,
          tip: `Die Event-Funktionen (Knöpfe) unterbrechen die <code>forever</code>-Schleife automatisch. Danach läuft die Atmung weiter — genau wie bei den Blöcken.`
        }
      },

      /* ---- Kapitel 5: Bewegen (Motoren) ---- */
      {
        concept: {
          explanation: `<p><strong>Motoren</strong> und <strong>Ultraschallsensor</strong> in MakeCode Python:</p>
<ul>
<li><code>motors.motor_A.set_speed(80)</code> — Motor A auf Geschwindigkeit 80</li>
<li><code>motors.motor_B.set_speed(80)</code> — Motor B auf Geschwindigkeit 80</li>
<li><code>sensors.ultrasonic_distance()</code> — Abstand in cm messen</li>
</ul>
<p>Negative Geschwindigkeit = rückwärts. <code>0</code> = stoppen.</p>`,
          code: `# Motoren steuern
motors.motor_A.set_speed(80)          # Vorwärts
motors.motor_B.set_speed(80)

# Ultraschall-Abstand lesen
abstand = sensors.ultrasonic_distance()

# Hindernis-Erkennung
if abstand < 15:
    # Stoppen!
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    # Drehen (Flucht!)
    motors.motor_A.set_speed(-80)
    motors.motor_B.set_speed(80)
    basic.pause(500)`,
          tip: `Wenn Motor A rückwärts und Motor B vorwärts dreht, macht der Hase eine schnelle Drehung auf der Stelle — perfekt für Fluchtverhalten!`
        },
        fullTask: {
          explanation: `<p><strong>Fluchtverhalten des Hasen — vollständiges Programm:</strong></p>`,
          code: `# Mein Hase — Kapitel 5: Bewegen
# Motorsteuerung + Ultraschallsensor

def on_forever():
    abstand = sensors.ultrasonic_distance()
    
    if abstand < 15:
        # Hindernis erkannt! Flucht!
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.show_string("!")
        basic.pause(200)
        
        # Blitzschnelle Drehung
        motors.motor_A.set_speed(-80)
        motors.motor_B.set_speed(80)
        basic.pause(500)
    else:
        # Kein Hindernis → vorwärts!
        motors.motor_A.set_speed(80)
        motors.motor_B.set_speed(80)
        basic.show_arrow(ArrowNames.NORTH)

basic.forever(on_forever)`,
          tip: `Die Motoren-Befehle können je nach Calliope-Erweiterung leicht anders heißen. Schau in MakeCode unter <strong>Motoren</strong>, welche Blöcke verfügbar sind, und wechsle dann zu Python.`
        }
      },

      /* ---- Kapitel 6: Mein Tier (Integration) ---- */
      {
        concept: {
          explanation: `<p>Neue Python-Befehle für dieses Kapitel:</p>
<ul>
<li><code>input.on_pin_pressed(TouchPin.P1, funktion)</code> — Touch-Pin P1 (links)</li>
<li><code>input.on_pin_pressed(TouchPin.P2, funktion)</code> — Touch-Pin P2 (rechts)</li>
<li><code>input.on_gesture(Gesture.SHAKE, funktion)</code> — Schütteln erkennen</li>
</ul>
<p>Jetzt kombinierst du alles: Schleifen, Bedingungen, Sensoren, Motoren, Pins und Schütteln — zu einem einzigartigen Tier!</p>`,
          code: `# Touch-Pins
def on_pin_p1():
    # Links berührt → nach rechts ausweichen
    motors.motor_A.set_speed(80)
    motors.motor_B.set_speed(30)
    basic.pause(500)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

# Schütteln
def on_shake():
    # Erschrecken!
    basic.show_icon(IconNames.SURPRISED)
    basic.pause(1000)
input.on_gesture(Gesture.SHAKE, on_shake)`,
          tip: `In „echtem" Python (nicht MakeCode) gäbe es Bibliotheken wie <code>calliope_mini</code>. MakeCode Python ist aber eine vereinfachte Version, die speziell für den Calliope gemacht ist.`
        },
        fullTask: {
          explanation: `<p><strong>Persönlichkeit — ein vollständiges Beispiel:</strong></p>
<p>Hier ein Beispiel, wie ein Hasen-Programm aussehen könnte. Passe die Werte und Reaktionen an deine eigenen Ideen an!</p>`,
          code: `# Mein Hase — Kapitel 6: Persönlichkeit
# Kombination aller bisherigen Konzepte

# === Knöpfe ===
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

def on_button_b():
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# === Touch-Pins ===
def on_pin_p1():
    motors.motor_A.set_speed(80)
    motors.motor_B.set_speed(30)
    basic.pause(500)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

def on_pin_p2():
    motors.motor_A.set_speed(30)
    motors.motor_B.set_speed(80)
    basic.pause(500)
input.on_pin_pressed(TouchPin.P2, on_pin_p2)

# === Schütteln ===
def on_shake():
    basic.show_icon(IconNames.SURPRISED)
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.pause(1000)
input.on_gesture(Gesture.SHAKE, on_shake)

# === Hauptschleife ===
def on_forever():
    if input.light_level() > 50:
        abstand = sensors.ultrasonic_distance()
        if abstand < 15:
            # Flucht!
            motors.motor_A.set_speed(-80)
            motors.motor_B.set_speed(80)
            basic.pause(500)
        else:
            # Normal fahren + atmen
            motors.motor_A.set_speed(80)
            motors.motor_B.set_speed(80)
            basic.show_icon(IconNames.HEART)
            basic.pause(300)
            basic.show_icon(IconNames.HEART_SMALL)
            basic.pause(300)
    else:
        # Dunkel → schlafen
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
        basic.pause(1000)

basic.forever(on_forever)`,
          tip: `Das ist nur ein Vorschlag. Dein Hase soll <em>deine</em> Persönlichkeit haben! Ändere die Geschwindigkeiten, Pausen, Symbole und Reaktionen.`
        }
      },

      /* ---- Kapitel 7: Gefühle (Variablen) ---- */
      {
        concept: {
          explanation: `<p><strong>Variablen</strong> in Python sind einfacher als in Blöcken — du brauchst sie nicht extra zu „erstellen". Schreibe einfach einen Namen und weise einen Wert zu:</p>
<ul>
<li><code>hunger = 0</code> — Variable erstellen und auf 0 setzen</li>
<li><code>hunger = hunger + 1</code> oder kürzer: <code>hunger += 1</code> — Wert erhöhen</li>
<li><code>hunger = 0</code> — zurücksetzen</li>
</ul>`,
          code: `# Variablen erstellen
hunger = 0

# In der Schleife erhöhen
def on_forever():
    global hunger          # "global" sagt Python: benutze
    hunger += 1            # die Variable von oben!
    
    if hunger > 5:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    
    basic.pause(2000)
basic.forever(on_forever)

# Beim Füttern zurücksetzen
def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `Das Schlüsselwort <code>global</code> ist wichtig! Ohne es kann Python die Variable innerhalb einer Funktion nicht verändern. Schreibe <code>global hunger</code> am Anfang jeder Funktion, die den Hunger ändern soll.`
        },
        fullTask: {
          explanation: `<p><strong>Der hungrige Hase — vollständiges Programm:</strong></p>`,
          code: `# Mein Hase — Kapitel 7: Gefühle
# Variablen für innere Zustände

# Innere Zustände
hunger = 0

# Hunger steigt alle 2 Sekunden
def on_forever():
    global hunger
    hunger += 1
    
    # Gefühl als Gesicht anzeigen
    if hunger > 5:
        basic.show_icon(IconNames.SAD)    # hungrig :(
    else:
        basic.show_icon(IconNames.HAPPY)  # satt :)
    
    basic.pause(2000)
basic.forever(on_forever)

# Knopf B: Füttern → Hunger auf 0
def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `Probiere eine zweite Variable: <code>muedigkeit = 0</code>. Bei Knopf A darf der Hase schlafen (<code>muedigkeit = 0</code>). Jetzt hat er zwei Bedürfnisse!`
        }
      },

      /* ---- Kapitel 8: Lernen (UND / ODER) ---- */
      {
        concept: {
          explanation: `<p><strong>Kombinierte Bedingungen</strong> in Python:</p>
<ul>
<li><code>and</code> — UND: beide Bedingungen müssen wahr sein</li>
<li><code>or</code> — ODER: mindestens eine muss wahr sein</li>
<li><code>not</code> — NICHT: kehrt eine Bedingung um</li>
</ul>
<p>Das ist intuitiver als die MakeCode-Blöcke, weil du es fast wie einen englischen Satz lesen kannst!</p>`,
          code: `# UND-Verknüpfung
if hunger > 5 and input.light_level() > 50:
    # hungrig UND hell → Futter suchen
    motors.motor_A.set_speed(60)
    motors.motor_B.set_speed(60)

# ODER-Verknüpfung
if muedigkeit > 7 or input.light_level() < 30:
    # müde ODER dunkel → schlafen
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.clear_screen()

# Kombination mit NICHT
if not (hunger > 5) and not (muedigkeit > 7):
    # weder hungrig noch müde → normal atmen
    basic.show_icon(IconNames.HEART)`,
          tip: `Python liest sich fast wie Englisch: <code>if hunger > 5 and light > 50</code> = „wenn Hunger größer als 5 und Licht größer als 50". Das macht Python besonders gut lesbar!`
        },
        fullTask: {
          explanation: `<p><strong>Kluge Entscheidungen — vollständiges Programm:</strong></p>`,
          code: `# Mein Hase — Kapitel 8: Lernen
# Kombinierte Bedingungen mit and/or

hunger = 0
muedigkeit = 0

def on_forever():
    global hunger, muedigkeit
    hunger += 1
    muedigkeit += 1
    
    if hunger > 5 and input.light_level() > 50:
        # Hungrig UND hell → Futtersuche
        motors.motor_A.set_speed(60)
        motors.motor_B.set_speed(60)
        basic.show_arrow(ArrowNames.NORTH)
    elif muedigkeit > 7 or input.light_level() < 30:
        # Müde ODER dunkel → Schlafen
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
    else:
        # Normal → Atmen
        basic.show_icon(IconNames.HEART)
        basic.pause(300)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(300)
    
    basic.pause(2000)
basic.forever(on_forever)

# Füttern
def on_button_b():
    global hunger
    hunger = 0
input.on_button_pressed(Button.B, on_button_b)

# Schlafen
def on_button_a():
    global muedigkeit
    muedigkeit = 0
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `<code>elif</code> ist die Abkürzung für <code>else if</code> — „sonst wenn". Du kannst beliebig viele <code>elif</code>-Blöcke hintereinander schreiben!`
        }
      },

      /* ---- Kapitel 9: Begegnung (Algorithmen) ---- */
      {
        concept: {
          explanation: `<p>Ein <strong>Algorithmus</strong> ist ein Bauplan. In Python wird das besonders sichtbar: Derselbe Code mit unterschiedlichen <strong>Parametern</strong> erzeugt völlig verschiedene Tiere.</p>
<p>Du kannst Parameter als <strong>Variablen am Anfang</strong> definieren — und mit einer einzigen Änderung den ganzen Charakter wechseln!</p>
<p>Funk-Kommunikation zwischen zwei Calliope geht mit:</p>
<ul>
<li><code>radio.send_string("Nachricht")</code> — Nachricht senden</li>
<li><code>radio.on_received_string(funktion)</code> — Nachricht empfangen</li>
<li><code>radio.set_group(1)</code> — Funkgruppe festlegen</li>
</ul>`,
          code: `# === PARAMETER === (ändere nur diese Zeilen!)
ATEM_PAUSE = 300      # Hase: schnell (300ms)
# ATEM_PAUSE = 1500   # Schildkröte: langsam (1500ms)

MOTOR_SPEED = 80      # Hase: schnell
# MOTOR_SPEED = 30    # Schildkröte: langsam

LICHT_SCHWELLE = 50   # Hase: empfindlich
# LICHT_SCHWELLE = 120  # Schildkröte: geduldig

# === ALGORITHMUS === (gleich für beide Tiere!)
def on_forever():
    if input.light_level() > LICHT_SCHWELLE:
        basic.show_icon(IconNames.HEART)
        basic.pause(ATEM_PAUSE)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(ATEM_PAUSE)
    else:
        basic.clear_screen()
basic.forever(on_forever)`,
          tip: `Kommentiere die Hasen-Parameter aus (mit <code>#</code>) und entferne das <code>#</code> vor den Schildkröten-Parametern. Gleicher Code — völlig anderer Charakter! Das ist die Kraft der Algorithmen.`
        },
        fullTask: {
          explanation: `<p><strong>Funk-Kommunikation zwischen Hase und Schildkröte:</strong></p>`,
          code: `# Mein Hase — Kapitel 9: Begegnung
# Funk-Kommunikation + Parameter

# Funkgruppe (muss bei beiden gleich sein!)
radio.set_group(1)

# Parameter: Hase
ATEM_PAUSE = 300
MOTOR_SPEED = 80

def on_forever():
    abstand = sensors.ultrasonic_distance()
    if abstand < 15:
        # Hindernis! Per Funk melden
        radio.send_string("Hindernis!")
        basic.show_string("!")
    else:
        motors.motor_A.set_speed(MOTOR_SPEED)
        motors.motor_B.set_speed(MOTOR_SPEED)
        basic.show_icon(IconNames.HEART)
        basic.pause(ATEM_PAUSE)
basic.forever(on_forever)

# Nachricht von der Schildkröte empfangen
def on_received(text):
    if text == "Loesung":
        basic.show_icon(IconNames.HAPPY)
        basic.pause(1000)
radio.on_received_string(on_received)`,
          tip: `Beide Calliope müssen die gleiche Funkgruppe haben (<code>radio.set_group(1)</code>). Sprecht euch ab! Der Hase meldet Hindernisse, die Schildkröte sendet Lösungen.`
        }
      }
    ],

    /* ==========================================
       TORTOISE PATH (DE) — 9 Chapters
       ========================================== */
    tortoise: [

      /* ---- Kapitel 1: Erwachen (Sequenz) ---- */
      {
        concept: {
          explanation: `<p>In MakeCode kannst du oben im Editor zwischen <strong>Blöcken</strong> und <strong>Python</strong> umschalten. Klicke dazu auf den <strong>Python</strong>-Button oben in der Leiste.</p>
<p>In Python schreibst du die gleichen Befehle wie mit Blöcken — aber als Text. Eine <strong>Sequenz</strong> ist einfach: Du schreibst die Befehle untereinander, Zeile für Zeile.</p>
<p>Wichtige Befehle:</p>
<ul>
<li><code>basic.show_leds()</code> — zeigt ein 5×5-LED-Muster</li>
<li><code>basic.pause(1500)</code> — wartet 1500 Millisekunden (die Schildkröte lässt sich Zeit!)</li>
<li><code>basic.clear_screen()</code> — löscht die Anzeige</li>
</ul>`,
          code: `# Sequenz — Befehle nacheinander
# Die Schildkröte nimmt sich Zeit

basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)      # Schildkröte: langsam und bedächtig
basic.show_leds("""
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)
basic.clear_screen()`,
          tip: `Beachte die längere Pause von <code>1500</code> ms — die Schildkröte eilt nicht. Die drei Anführungszeichen <code>"""</code> erlauben mehrzeiligen Text für LED-Muster.`
        },
        fullTask: {
          explanation: `<p><strong>Das erste Lebenszeichen der Schildkröte:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 1: Erwachen
# Sequenz: Befehle nacheinander, langsam und bedächtig

# Herz zeigen
basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)

# Sonne zeigen
basic.show_leds("""
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)

# Stille
basic.clear_screen()`,
          tip: `Die Schildkröte zeigt jedes Muster langsam und bewusst. Ändere <code>1500</code> auf andere Werte, um ihren Rhythmus zu finden.`
        }
      },

      /* ---- Kapitel 2: Atmen (Endlosschleife) ---- */
      {
        concept: {
          explanation: `<p>Die <strong>Endlosschleife</strong> funktioniert in Python genau wie beim Hasen — nur die Pausen sind länger, weil die Schildkröte langsam und gleichmäßig atmet:</p>`,
          code: `# Schildkröten-Atem: langsam und stetig
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)     # Langsames Einatmen
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)     # Langsames Ausatmen
basic.forever(on_forever)`,
          tip: `<code>1500</code> ms statt <code>300</code> ms — das ist der ganze Unterschied zwischen Hase und Schildkröte. Gleicher Algorithmus, andere Parameter!`
        },
        fullTask: {
          explanation: `<p><strong>Der Herzschlag der Schildkröte:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 2: Atmen
# Endlosschleife: langsamer, gleichmäßiger Rhythmus

def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)  # Langsam und tief einatmen
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)  # Langsam und tief ausatmen

basic.forever(on_forever)`,
          tip: `Was passiert bei <code>3000</code> ms? Die Schildkröte wird noch ruhiger. Bei <code>500</code> ms wird sie unruhig — das passt nicht zu ihr!`
        }
      },

      /* ---- Kapitel 3: Wahrnehmen (Sensoren) ---- */
      {
        concept: {
          explanation: `<p>Der <strong>Lichtsensor</strong> funktioniert identisch — aber die Schildkröte hat einen höheren <strong>Schwellenwert</strong> (<code>120</code> statt <code>50</code>). Sie wartet geduldig, bis richtig helles Licht kommt:</p>`,
          code: `# Schildkröte: hoher Schwellenwert = geduldig
if input.light_level() > 120:
    # Richtig hell → aufwachen
    basic.show_icon(IconNames.HEART)
else:
    # Noch nicht hell genug → weiter ruhen
    basic.clear_screen()`,
          tip: `Die Schildkröte reagiert erst bei Lichtstärke über <code>120</code>. Der Hase schon bei <code>50</code>. Gleicher Sensor, andere Empfindlichkeit!`
        },
        fullTask: {
          explanation: `<p><strong>Die Schildkröte spürt die Sonne:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 3: Wahrnehmen
# Lichtsensor mit hohem Schwellenwert

def on_forever():
    if input.light_level() > 120:
        # Hell → langsam atmen
        basic.show_icon(IconNames.HEART)
        basic.pause(1500)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(1500)
    else:
        # Dunkel → ruhen
        basic.clear_screen()

basic.forever(on_forever)`,
          tip: `Probiere verschiedene Schwellenwerte: Was passiert bei <code>50</code>? Bei <code>200</code>? Finde die richtige Empfindlichkeit für deine Schildkröte.`
        }
      },

      /* ---- Kapitel 4: Entscheiden (Wenn-Dann) ---- */
      {
        concept: {
          explanation: `<p>Die Schildkröte reagiert auf <strong>Knöpfe</strong> — aber bedächtig. Sie fügt vor jeder Reaktion eine Denkpause ein:</p>`,
          code: `# Schildkröte: Erst denken, dann reagieren
def on_button_a():
    basic.pause(500)                   # Denkpause!
    basic.show_icon(IconNames.HAPPY)   # Dann Freude zeigen
    basic.pause(1500)                  # Lange genießen
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `Die <code>basic.pause(500)</code> vor der Reaktion ist die „Denkpause". Der Hase reagiert sofort — die Schildkröte überlegt erst.`
        },
        fullTask: {
          explanation: `<p><strong>Bedächtige Entscheidungen:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 4: Entscheiden
# Knöpfe mit Denkpause

# Knopf A: Streicheln → Nachdenken, dann Freude
def on_button_a():
    basic.pause(500)     # Denkpause
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1500)    # Lange genießen
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

# Knopf B: Füttern → Nachdenken, dann Fressen
def on_button_b():
    basic.pause(500)     # Denkpause
    basic.show_leds("""
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
    """)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# Dauerhaft: Langsame Atem-Animation
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)
basic.forever(on_forever)`,
          tip: `Vergleiche die Pausen mit dem Hasen: <code>1500</code> ms statt <code>300</code> ms. Die Schildkröte lebt in ihrem eigenen Tempo.`
        }
      },

      /* ---- Kapitel 5: Bewegen (Motoren) ---- */
      {
        concept: {
          explanation: `<p>Die Schildkröte fährt langsamer (<code>30</code> statt <code>80</code>) und erkennt Hindernisse früher (<code>20</code> cm statt <code>15</code> cm). Kein hektisches Ausweichen — ein sanftes Umlenken:</p>`,
          code: `# Schildkröte: langsam und vorsichtig
motors.motor_A.set_speed(30)   # Langsam
motors.motor_B.set_speed(30)

# Hindernis bei 20 cm erkennen (früher als Hase!)
if sensors.ultrasonic_distance() < 20:
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    # Sanfte Kurve statt Flucht
    motors.motor_A.set_speed(30)
    motors.motor_B.set_speed(10)
    basic.pause(1000)`,
          tip: `Die Schildkröte lenkt sanft um (<code>30</code>/<code>10</code>) statt sich zu drehen (<code>-80</code>/<code>80</code>). Ruhig und besonnen.`
        },
        fullTask: {
          explanation: `<p><strong>Vorsichtiges Navigieren:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 5: Bewegen
# Langsame Motoren + vorsichtiges Ausweichen

def on_forever():
    abstand = sensors.ultrasonic_distance()
    
    if abstand < 20:
        # Hindernis → anhalten und umlenken
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.show_leds("""
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
        """)       # Panzer-Symbol
        basic.pause(500)
        
        # Sanfte Kurve
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(10)
        basic.pause(1000)
    else:
        # Kein Hindernis → langsam geradeaus
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(30)
        basic.show_arrow(ArrowNames.NORTH)

basic.forever(on_forever)`,
          tip: `Die Schildkröte navigiert mit Geschwindigkeit <code>30</code> — deutlich langsamer als der Hase mit <code>80</code>. Aber sie erkennt Hindernisse früher (bei <code>20</code> cm).`
        }
      },

      /* ---- Kapitel 6: Mein Tier (Integration) ---- */
      {
        concept: {
          explanation: `<p>Die gleichen neuen Befehle wie beim Hasen — aber die Schildkröte reagiert anders:</p>
<ul>
<li><code>input.on_pin_pressed(TouchPin.P1, funktion)</code> — sanft nach rechts lenken</li>
<li><code>input.on_gesture(Gesture.SHAKE, funktion)</code> — in den Panzer zurückziehen</li>
</ul>`,
          code: `# Schütteln: Schildkröte zieht sich zurück
def on_shake():
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
    """)    # Panzer
    basic.pause(5000)   # 5 Sekunden warten
input.on_gesture(Gesture.SHAKE, on_shake)`,
          tip: `Die Schildkröte wartet 5 Sekunden im Panzer (<code>5000</code> ms). Der Hase würde nach 1 Sekunde schon wieder losrennen!`
        },
        fullTask: {
          explanation: `<p><strong>Schildkröten-Persönlichkeit — Beispiel:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 6: Persönlichkeit

# === Knöpfe ===
def on_button_a():
    basic.pause(500)     # Denkpause
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

def on_button_b():
    basic.pause(500)
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# === Touch-Pins ===
def on_pin_p1():
    motors.motor_A.set_speed(30)
    motors.motor_B.set_speed(10)
    basic.pause(1000)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

# === Schütteln = Panzer ===
def on_shake():
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
    """)
    basic.pause(5000)
input.on_gesture(Gesture.SHAKE, on_shake)

# === Hauptschleife ===
def on_forever():
    if input.light_level() > 120:
        abstand = sensors.ultrasonic_distance()
        if abstand < 20:
            motors.motor_A.set_speed(30)
            motors.motor_B.set_speed(10)
            basic.pause(1000)
        else:
            motors.motor_A.set_speed(30)
            motors.motor_B.set_speed(30)
            basic.show_icon(IconNames.HEART)
            basic.pause(1500)
            basic.show_icon(IconNames.HEART_SMALL)
            basic.pause(1500)
    else:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
        basic.pause(2000)

basic.forever(on_forever)`,
          tip: `Vergleiche die Parameter mit dem Hasen: Alles langsamer, geduldiger, vorsichtiger. Das ist die Persönlichkeit deiner Schildkröte!`
        }
      },

      /* ---- Kapitel 7: Gefühle (Variablen) ---- */
      {
        concept: {
          explanation: `<p><strong>Variablen</strong> funktionieren genau wie beim Hasen — aber die Schildkröte ist genügsam. Ihr Hunger steigt langsamer (alle 5 Sekunden statt alle 2) und der Schwellenwert ist höher (<code>8</code> statt <code>5</code>):</p>`,
          code: `hunger = 0

def on_forever():
    global hunger
    hunger += 1
    
    if hunger > 8:       # Schildkröte: höhere Toleranz
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    
    basic.pause(5000)    # Alle 5 Sekunden = langsamer Hunger
basic.forever(on_forever)`,
          tip: `Die Schildkröte wird erst bei Hunger über <code>8</code> traurig (Hase: <code>5</code>). Sie ist genügsamer und braucht weniger Aufmerksamkeit.`
        },
        fullTask: {
          explanation: `<p><strong>Die geduldige Schildkröte:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 7: Gefühle

hunger = 0

def on_forever():
    global hunger
    hunger += 1
    
    if hunger > 8:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    
    basic.pause(5000)  # Langsamer Hunger
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(1000)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `Füge <code>muedigkeit</code> hinzu. Die Schildkröte braucht mehr Schlaf als der Hase — vielleicht wird sie erst bei <code>10</code> wach?`
        }
      },

      /* ---- Kapitel 8: Lernen (UND / ODER) ---- */
      {
        concept: {
          explanation: `<p>Gleiche Python-Syntax wie beim Hasen — aber andere Schwellenwerte:</p>`,
          code: `# Schildkröte: höhere Schwellenwerte
if hunger > 8 and input.light_level() > 120:
    # hungrig UND wirklich hell
    motors.motor_A.set_speed(30)

if muedigkeit > 10 or input.light_level() < 50:
    # müde ODER dunkel
    basic.clear_screen()`,
          tip: `Die Schildkröte braucht mehr Hunger (<code>8</code>), mehr Müdigkeit (<code>10</code>) und mehr Licht (<code>120</code>), bevor sie reagiert. Geduld in jeder Bedingung!`
        },
        fullTask: {
          explanation: `<p><strong>Weise Entscheidungen:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 8: Lernen

hunger = 0
muedigkeit = 0

def on_forever():
    global hunger, muedigkeit
    hunger += 1
    muedigkeit += 1
    
    if hunger > 8 and input.light_level() > 120:
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(30)
        basic.show_arrow(ArrowNames.NORTH)
    elif muedigkeit > 10 or input.light_level() < 50:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
    else:
        basic.show_icon(IconNames.HEART)
        basic.pause(1500)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(1500)
    
    basic.pause(5000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
input.on_button_pressed(Button.B, on_button_b)

def on_button_a():
    global muedigkeit
    muedigkeit = 0
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `Vergleiche alle Zahlen mit dem Hasen-Programm. Der Algorithmus ist identisch — nur die Parameter unterscheiden sich!`
        }
      },

      /* ---- Kapitel 9: Begegnung (Algorithmen) ---- */
      {
        concept: {
          explanation: `<p>Der gleiche <strong>Algorithmus</strong> wie beim Hasen — mit Schildkröten-Parametern. Hier wird es besonders deutlich: Tausche nur die Variablen am Anfang aus und das Tier ändert seinen Charakter komplett!</p>`,
          code: `# === PARAMETER === (ändere nur diese Zeilen!)
# ATEM_PAUSE = 300    # Hase: schnell
ATEM_PAUSE = 1500     # Schildkröte: langsam

# MOTOR_SPEED = 80    # Hase: schnell
MOTOR_SPEED = 30      # Schildkröte: langsam

# LICHT_SCHWELLE = 50   # Hase: empfindlich
LICHT_SCHWELLE = 120    # Schildkröte: geduldig

# === Gleicher Algorithmus! ===
def on_forever():
    if input.light_level() > LICHT_SCHWELLE:
        basic.show_icon(IconNames.HEART)
        basic.pause(ATEM_PAUSE)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(ATEM_PAUSE)
    else:
        basic.clear_screen()
basic.forever(on_forever)`,
          tip: `Das ist die zentrale Erkenntnis: <strong>Algorithmen sind allgemein. Charakter entsteht durch Parameter.</strong> In Python sind diese Parameter einfach Variablen am Anfang des Programms.`
        },
        fullTask: {
          explanation: `<p><strong>Funk-Kommunikation — die Schildkröte antwortet:</strong></p>`,
          code: `# Meine Schildkröte — Kapitel 9: Begegnung
# Funk-Kommunikation + Parameter

radio.set_group(1)

# Parameter: Schildkröte
ATEM_PAUSE = 1500
MOTOR_SPEED = 30

# Nachricht vom Hasen empfangen
def on_received(text):
    if text == "Hindernis!":
        # Schildkröte denkt nach...
        basic.pause(1000)
        # ...und sendet eine Lösung
        radio.send_string("Loesung")
        basic.show_icon(IconNames.YES)
        basic.pause(2000)
radio.on_received_string(on_received)

def on_forever():
    motors.motor_A.set_speed(MOTOR_SPEED)
    motors.motor_B.set_speed(MOTOR_SPEED)
    basic.show_icon(IconNames.HEART)
    basic.pause(ATEM_PAUSE)
basic.forever(on_forever)`,
          tip: `Der Hase erkennt Hindernisse schnell und meldet sie. Die Schildkröte nimmt sich Zeit, eine Lösung zu finden. Zusammen sind sie stärker als allein!`
        }
      }
    ]
  },

  /* ===========================
     ENGLISH — Python content
     =========================== */
  en: {
    hare: [

      /* ---- Chapter 1: Awakening (Sequence) ---- */
      {
        concept: {
          explanation: `<p>In MakeCode, you can switch between <strong>Blocks</strong> and <strong>Python</strong> at the top of the editor. Click the <strong>Python</strong> button in the toolbar.</p>
<p>In Python, you write the same commands as with blocks — but as text. A <strong>sequence</strong> is simple: write commands one below the other, line by line. Python runs them from top to bottom.</p>
<p>Key commands for this chapter:</p>
<ul>
<li><code>basic.show_leds()</code> — shows a 5×5 LED pattern</li>
<li><code>basic.pause(500)</code> — waits 500 milliseconds</li>
<li><code>basic.clear_screen()</code> — clears the display</li>
</ul>`,
          code: `# Sequence — commands one after another
# Each line runs after the previous one finishes

basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(500)
basic.show_leds("""
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .
""")
basic.pause(500)
basic.clear_screen()`,
          tip: `In Python, indentation (spaces at the beginning) matters! MakeCode usually handles this automatically. The triple quotes <code>"""</code> allow multi-line text — perfect for LED patterns.`
        },
        fullTask: {
          explanation: `<p><strong>The complete program in Python:</strong></p>`,
          code: `# My Hare — Chapter 1: Awakening
# A sequence: commands run one after another

# Step 1: Show a heart
basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")

# Step 2: Short pause (the hare is fast!)
basic.pause(500)

# Step 3: Show a star
basic.show_leds("""
    . . # . .
    . # . # .
    # . . . #
    . # . # .
    . . # . .
""")

# Step 4: Another pause
basic.pause(500)

# Step 5: Clear everything
basic.clear_screen()`,
          tip: `Try changing the order of lines — what happens? Just like with blocks, the order determines what the hare does.`
        }
      },

      /* ---- Chapter 2: Breathing (Forever Loop) ---- */
      {
        concept: {
          explanation: `<p>A <strong>forever loop</strong> in Python is <code>while True:</code> — the code inside repeats forever. In MakeCode Python, you can use <code>basic.forever()</code> with a function.</p>
<p>MakeCode offers two ways:</p>
<ul>
<li><code>basic.forever(function)</code> — like the <span class="calliope-block">forever</span> block</li>
<li><code>while True:</code> — classic Python forever loop</li>
</ul>`,
          code: `# Method 1: MakeCode style with basic.forever()
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)
basic.forever(on_forever)

# Method 2: Classic Python with while True
while True:
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)`,
          tip: `<code>def on_forever():</code> defines a function. Everything indented below belongs to it. <code>basic.forever(on_forever)</code> calls this function endlessly.`
        },
        fullTask: {
          explanation: `<p><strong>The hare's heartbeat in Python:</strong></p>`,
          code: `# My Hare — Chapter 2: Breathing
# Forever loop: the heart pulses endlessly

def on_forever():
    # Inhale — big heart
    basic.show_icon(IconNames.HEART)
    basic.pause(300)  # Hare breathes fast!
    
    # Exhale — small heart
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)

basic.forever(on_forever)`,
          tip: `Change the <code>300</code> — try <code>100</code> for frantic breathing or <code>800</code> for calm. This changes the personality!`
        }
      },

      /* ---- Chapter 3: Perceiving (Sensors) ---- */
      {
        concept: {
          explanation: `<p>Read <strong>sensors</strong> in Python using functions. The light sensor returns 0–255:</p>
<ul>
<li><code>input.light_level()</code> — returns the current brightness</li>
</ul>`,
          code: `# Read and show light level
light = input.light_level()     # Value 0-255
basic.show_number(light)

# Use in a condition
if input.light_level() > 50:
    basic.show_icon(IconNames.HEART)
else:
    basic.clear_screen()`,
          tip: `<code>if</code> is Python's version of "if…then". The colon <code>:</code> at the end is required! Everything indented below belongs to the <code>if</code> or <code>else</code> block.`
        },
        fullTask: {
          explanation: `<p><strong>The hare sees the light — full program:</strong></p>`,
          code: `# My Hare — Chapter 3: Perceiving
# Light sensor + condition

def on_forever():
    if input.light_level() > 50:
        # Bright → hare is awake, breathes fast
        basic.show_icon(IconNames.HEART)
        basic.pause(300)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(300)
    else:
        # Dark → hare sleeps
        basic.clear_screen()

basic.forever(on_forever)`,
          tip: `Note the <strong>indentation</strong>: the <code>if</code> and <code>else</code> blocks must be aligned. The code inside must be indented further.`
        }
      },

      /* ---- Chapter 4: Deciding (If-Then) ---- */
      {
        concept: {
          explanation: `<p>React to <strong>button presses</strong> in Python with event functions:</p>
<ul>
<li><code>input.on_button_pressed(Button.A, function)</code> — reacts to Button A</li>
<li><code>input.on_button_pressed(Button.B, function)</code> — reacts to Button B</li>
<li><code>input.on_button_pressed(Button.AB, function)</code> — both at once</li>
</ul>`,
          code: `# React to Button A: Petting
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

# React to Button B: Feeding
def on_button_b():
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `In Python, you first define the function (<code>def</code>) then register it with <code>input.on_button_pressed()</code>. Order matters: definition before registration!`
        },
        fullTask: {
          explanation: `<p><strong>The hare distinguishes buttons — full program:</strong></p>`,
          code: `# My Hare — Chapter 4: Deciding
# Buttons as input + conditions

# Button A: Pet → happy
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

# Button B: Feed → heart
def on_button_b():
    basic.show_leds("""
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
    """)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# Forever: breathing animation
def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(300)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(300)
basic.forever(on_forever)`,
          tip: `Event functions (buttons) automatically interrupt the <code>forever</code> loop. Afterwards, breathing continues — just like with blocks.`
        }
      },

      /* ---- Chapter 5: Moving (Motors) ---- */
      {
        concept: {
          explanation: `<p><strong>Motors</strong> and <strong>ultrasonic sensor</strong> in MakeCode Python:</p>
<ul>
<li><code>motors.motor_A.set_speed(80)</code> — Motor A at speed 80</li>
<li><code>motors.motor_B.set_speed(80)</code> — Motor B at speed 80</li>
<li><code>sensors.ultrasonic_distance()</code> — distance in cm</li>
</ul>
<p>Negative speed = reverse. <code>0</code> = stop.</p>`,
          code: `# Control motors
motors.motor_A.set_speed(80)
motors.motor_B.set_speed(80)

# Obstacle detection
distance = sensors.ultrasonic_distance()
if distance < 15:
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    motors.motor_A.set_speed(-80)
    motors.motor_B.set_speed(80)
    basic.pause(500)`,
          tip: `When Motor A goes backward and Motor B forward, the hare spins in place — perfect for escape behaviour!`
        },
        fullTask: {
          explanation: `<p><strong>Escape behaviour — full program:</strong></p>`,
          code: `# My Hare — Chapter 5: Moving
# Motors + ultrasonic sensor

def on_forever():
    distance = sensors.ultrasonic_distance()
    
    if distance < 15:
        # Obstacle! Escape!
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.show_string("!")
        basic.pause(200)
        # Lightning-fast spin
        motors.motor_A.set_speed(-80)
        motors.motor_B.set_speed(80)
        basic.pause(500)
    else:
        # No obstacle → forward!
        motors.motor_A.set_speed(80)
        motors.motor_B.set_speed(80)
        basic.show_arrow(ArrowNames.NORTH)

basic.forever(on_forever)`,
          tip: `Motor commands may differ slightly depending on the Calliope extension. Check MakeCode's <strong>Motors</strong> category for available blocks, then switch to Python.`
        }
      },

      /* ---- Chapter 6: My Animal (Integration) ---- */
      {
        concept: {
          explanation: `<p>New Python commands for this chapter:</p>
<ul>
<li><code>input.on_pin_pressed(TouchPin.P1, function)</code> — Touch Pin P1</li>
<li><code>input.on_pin_pressed(TouchPin.P2, function)</code> — Touch Pin P2</li>
<li><code>input.on_gesture(Gesture.SHAKE, function)</code> — detect shaking</li>
</ul>
<p>Combine everything: loops, conditions, sensors, motors, pins and shaking — into your unique animal!</p>`,
          code: `# Touch pins
def on_pin_p1():
    motors.motor_A.set_speed(80)
    motors.motor_B.set_speed(30)
    basic.pause(500)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

# Shake
def on_shake():
    basic.show_icon(IconNames.SURPRISED)
    basic.pause(1000)
input.on_gesture(Gesture.SHAKE, on_shake)`,
          tip: `In "real" Python (not MakeCode), you'd use libraries like <code>calliope_mini</code>. MakeCode Python is a simplified version designed for the Calliope.`
        },
        fullTask: {
          explanation: `<p><strong>Full personality example:</strong></p>`,
          code: `# My Hare — Chapter 6: Personality
# Combining all concepts

# === Buttons ===
def on_button_a():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

def on_button_b():
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

# === Touch Pins ===
def on_pin_p1():
    motors.motor_A.set_speed(80)
    motors.motor_B.set_speed(30)
    basic.pause(500)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

# === Shake ===
def on_shake():
    basic.show_icon(IconNames.SURPRISED)
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.pause(1000)
input.on_gesture(Gesture.SHAKE, on_shake)

# === Main loop ===
def on_forever():
    if input.light_level() > 50:
        distance = sensors.ultrasonic_distance()
        if distance < 15:
            motors.motor_A.set_speed(-80)
            motors.motor_B.set_speed(80)
            basic.pause(500)
        else:
            motors.motor_A.set_speed(80)
            motors.motor_B.set_speed(80)
            basic.show_icon(IconNames.HEART)
            basic.pause(300)
            basic.show_icon(IconNames.HEART_SMALL)
            basic.pause(300)
    else:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
        basic.pause(1000)
basic.forever(on_forever)`,
          tip: `This is just a suggestion. Your hare should have <em>your</em> personality! Change speeds, pauses, icons and reactions.`
        }
      },

      /* ---- Chapter 7: Feelings (Variables) ---- */
      {
        concept: {
          explanation: `<p><strong>Variables</strong> in Python are simpler than in blocks — no need to "create" them separately:</p>
<ul>
<li><code>hunger = 0</code> — create a variable set to 0</li>
<li><code>hunger += 1</code> — increase by 1 (short for <code>hunger = hunger + 1</code>)</li>
<li><code>hunger = 0</code> — reset</li>
</ul>`,
          code: `hunger = 0

def on_forever():
    global hunger       # "global" tells Python: use the
    hunger += 1         # variable from above!
    
    if hunger > 5:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    basic.pause(2000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `The <code>global</code> keyword is important! Without it, Python can't modify the variable inside a function. Write <code>global hunger</code> at the start of every function that changes hunger.`
        },
        fullTask: {
          explanation: `<p><strong>The hungry hare — full program:</strong></p>`,
          code: `# My Hare — Chapter 7: Feelings
# Variables for inner states

hunger = 0

def on_forever():
    global hunger
    hunger += 1
    
    if hunger > 5:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    basic.pause(2000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(500)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `Try adding a second variable: <code>tiredness = 0</code>. Button A lets the hare sleep. Now it has two needs!`
        }
      },

      /* ---- Chapter 8: Learning (AND / OR) ---- */
      {
        concept: {
          explanation: `<p><strong>Combined conditions</strong> in Python:</p>
<ul>
<li><code>and</code> — AND: both conditions must be true</li>
<li><code>or</code> — OR: at least one must be true</li>
<li><code>not</code> — NOT: reverses a condition</li>
</ul>
<p>More intuitive than MakeCode blocks because you can read it like English!</p>`,
          code: `# AND
if hunger > 5 and input.light_level() > 50:
    motors.motor_A.set_speed(60)

# OR
if tiredness > 7 or input.light_level() < 30:
    basic.clear_screen()`,
          tip: `Python reads almost like English: <code>if hunger > 5 and light > 50</code>. This makes Python especially readable!`
        },
        fullTask: {
          explanation: `<p><strong>Smart decisions — full program:</strong></p>`,
          code: `# My Hare — Chapter 8: Learning
# Combined conditions with and/or

hunger = 0
tiredness = 0

def on_forever():
    global hunger, tiredness
    hunger += 1
    tiredness += 1
    
    if hunger > 5 and input.light_level() > 50:
        motors.motor_A.set_speed(60)
        motors.motor_B.set_speed(60)
        basic.show_arrow(ArrowNames.NORTH)
    elif tiredness > 7 or input.light_level() < 30:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
    else:
        basic.show_icon(IconNames.HEART)
        basic.pause(300)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(300)
    basic.pause(2000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
input.on_button_pressed(Button.B, on_button_b)

def on_button_a():
    global tiredness
    tiredness = 0
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `<code>elif</code> is short for <code>else if</code>. You can chain as many <code>elif</code> blocks as you like!`
        }
      },

      /* ---- Chapter 9: Encounter (Algorithms) ---- */
      {
        concept: {
          explanation: `<p>An <strong>algorithm</strong> is a blueprint. In Python this becomes very visible: the same code with different <strong>parameters</strong> creates completely different animals.</p>
<p>Radio communication between two Calliopes:</p>
<ul>
<li><code>radio.send_string("message")</code> — send</li>
<li><code>radio.on_received_string(function)</code> — receive</li>
<li><code>radio.set_group(1)</code> — set radio group</li>
</ul>`,
          code: `# === PARAMETERS === (change only these lines!)
BREATH_PAUSE = 300     # Hare: fast
# BREATH_PAUSE = 1500  # Tortoise: slow

MOTOR_SPEED = 80       # Hare: fast
# MOTOR_SPEED = 30     # Tortoise: slow

LIGHT_THRESHOLD = 50       # Hare: sensitive
# LIGHT_THRESHOLD = 120    # Tortoise: patient

# === ALGORITHM === (same for both animals!)
def on_forever():
    if input.light_level() > LIGHT_THRESHOLD:
        basic.show_icon(IconNames.HEART)
        basic.pause(BREATH_PAUSE)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(BREATH_PAUSE)
    else:
        basic.clear_screen()
basic.forever(on_forever)`,
          tip: `Comment out hare parameters (with <code>#</code>) and uncomment tortoise parameters. Same code — totally different character! That's the power of algorithms.`
        },
        fullTask: {
          explanation: `<p><strong>Radio communication between hare and tortoise:</strong></p>`,
          code: `# My Hare — Chapter 9: Encounter
# Radio + parameters

radio.set_group(1)
BREATH_PAUSE = 300
MOTOR_SPEED = 80

def on_forever():
    distance = sensors.ultrasonic_distance()
    if distance < 15:
        radio.send_string("Obstacle!")
        basic.show_string("!")
    else:
        motors.motor_A.set_speed(MOTOR_SPEED)
        motors.motor_B.set_speed(MOTOR_SPEED)
        basic.show_icon(IconNames.HEART)
        basic.pause(BREATH_PAUSE)
basic.forever(on_forever)

def on_received(text):
    if text == "Solution":
        basic.show_icon(IconNames.HAPPY)
        basic.pause(1000)
radio.on_received_string(on_received)`,
          tip: `Both Calliopes need the same radio group (<code>radio.set_group(1)</code>). The hare reports obstacles, the tortoise sends solutions.`
        }
      }
    ],

    /* ==========================================
       TORTOISE PATH (EN) — 9 Chapters
       ========================================== */
    tortoise: [

      /* ---- Chapter 1: Awakening ---- */
      {
        concept: {
          explanation: `<p>In MakeCode, switch between <strong>Blocks</strong> and <strong>Python</strong> at the top. A <strong>sequence</strong> in Python means writing commands line by line, top to bottom.</p>
<p>Key commands:</p>
<ul>
<li><code>basic.show_leds()</code> — shows a 5×5 LED pattern</li>
<li><code>basic.pause(1500)</code> — waits 1500ms (the tortoise takes its time!)</li>
<li><code>basic.clear_screen()</code> — clears the display</li>
</ul>`,
          code: `# Sequence — commands one after another
# The tortoise takes its time

basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)
basic.show_leds("""
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)
basic.clear_screen()`,
          tip: `Note the longer pause of <code>1500</code>ms — the tortoise doesn't rush. Triple quotes <code>"""</code> allow multi-line text for LED patterns.`
        },
        fullTask: {
          explanation: `<p><strong>The tortoise's first sign of life:</strong></p>`,
          code: `# My Tortoise — Chapter 1: Awakening
# Sequence: commands one after another, slow and deliberate

basic.show_leds("""
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)
basic.show_leds("""
    . . # . .
    . # # # .
    # # # # #
    . # # # .
    . . # . .
""")
basic.pause(1500)
basic.clear_screen()`,
          tip: `The tortoise shows each pattern slowly and deliberately. Change <code>1500</code> to find its rhythm.`
        }
      },

      /* ---- Chapter 2: Breathing ---- */
      {
        concept: {
          explanation: `<p>The <strong>forever loop</strong> works the same as for the hare — only the pauses are longer because the tortoise breathes slowly and steadily:</p>`,
          code: `def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)     # Slow inhale
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)     # Slow exhale
basic.forever(on_forever)`,
          tip: `<code>1500</code>ms instead of <code>300</code>ms — that's the whole difference between hare and tortoise. Same algorithm, different parameters!`
        },
        fullTask: {
          explanation: `<p><strong>The tortoise's heartbeat:</strong></p>`,
          code: `# My Tortoise — Chapter 2: Breathing

def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)
basic.forever(on_forever)`,
          tip: `What happens at <code>3000</code>ms? Even calmer. At <code>500</code>ms? Too restless for a tortoise!`
        }
      },

      /* ---- Chapter 3: Perceiving ---- */
      {
        concept: {
          explanation: `<p>Same light sensor — but the tortoise has a higher <strong>threshold</strong> (<code>120</code> instead of <code>50</code>). It waits patiently for proper brightness:</p>`,
          code: `if input.light_level() > 120:
    basic.show_icon(IconNames.HEART)  # Bright enough
else:
    basic.clear_screen()              # Still too dim`,
          tip: `Tortoise reacts at light level above <code>120</code>. The hare at <code>50</code>. Same sensor, different sensitivity!`
        },
        fullTask: {
          explanation: `<p><strong>The tortoise senses the sun:</strong></p>`,
          code: `# My Tortoise — Chapter 3: Perceiving

def on_forever():
    if input.light_level() > 120:
        basic.show_icon(IconNames.HEART)
        basic.pause(1500)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(1500)
    else:
        basic.clear_screen()
basic.forever(on_forever)`,
          tip: `Try different thresholds: What happens at <code>50</code>? At <code>200</code>? Find the right sensitivity for your tortoise.`
        }
      },

      /* ---- Chapter 4: Deciding ---- */
      {
        concept: {
          explanation: `<p>The tortoise reacts to <strong>buttons</strong> — but thoughtfully, with a thinking pause before each reaction:</p>`,
          code: `def on_button_a():
    basic.pause(500)                   # Thinking pause!
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1500)                  # Enjoy it
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `The <code>basic.pause(500)</code> before the reaction is the "thinking pause". The hare reacts instantly — the tortoise thinks first.`
        },
        fullTask: {
          explanation: `<p><strong>Thoughtful decisions:</strong></p>`,
          code: `# My Tortoise — Chapter 4: Deciding

def on_button_a():
    basic.pause(500)
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

def on_button_b():
    basic.pause(500)
    basic.show_leds("""
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
    """)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

def on_forever():
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)
    basic.show_icon(IconNames.HEART_SMALL)
    basic.pause(1500)
basic.forever(on_forever)`,
          tip: `Compare pauses with the hare: <code>1500</code>ms vs <code>300</code>ms. The tortoise lives at its own pace.`
        }
      },

      /* ---- Chapter 5: Moving ---- */
      {
        concept: {
          explanation: `<p>The tortoise drives slower (<code>30</code> vs <code>80</code>) and detects obstacles earlier (<code>20</code>cm vs <code>15</code>cm). No frantic dodging — gentle course correction:</p>`,
          code: `motors.motor_A.set_speed(30)   # Slow
motors.motor_B.set_speed(30)

if sensors.ultrasonic_distance() < 20:
    motors.motor_A.set_speed(30)
    motors.motor_B.set_speed(10)   # Gentle curve
    basic.pause(1000)`,
          tip: `The tortoise steers gently (<code>30</code>/<code>10</code>) instead of spinning (<code>-80</code>/<code>80</code>). Calm and deliberate.`
        },
        fullTask: {
          explanation: `<p><strong>Careful navigation:</strong></p>`,
          code: `# My Tortoise — Chapter 5: Moving

def on_forever():
    distance = sensors.ultrasonic_distance()
    
    if distance < 20:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.show_leds("""
            . # # # .
            # . . . #
            # . . . #
            # . . . #
            . # # # .
        """)
        basic.pause(500)
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(10)
        basic.pause(1000)
    else:
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(30)
        basic.show_arrow(ArrowNames.NORTH)
basic.forever(on_forever)`,
          tip: `Speed <code>30</code> vs the hare's <code>80</code>. But it detects obstacles earlier (at <code>20</code>cm vs <code>15</code>cm).`
        }
      },

      /* ---- Chapter 6: My Animal ---- */
      {
        concept: {
          explanation: `<p>Same new commands as the hare — but the tortoise reacts differently:</p>
<ul>
<li><code>input.on_pin_pressed(TouchPin.P1, function)</code> — gentle turn</li>
<li><code>input.on_gesture(Gesture.SHAKE, function)</code> — retreat into shell</li>
</ul>`,
          code: `def on_shake():
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
    """)    # Shell
    basic.pause(5000)   # Wait 5 seconds
input.on_gesture(Gesture.SHAKE, on_shake)`,
          tip: `5 seconds in the shell (<code>5000</code>ms). The hare only waits 1 second before running off again!`
        },
        fullTask: {
          explanation: `<p><strong>Tortoise personality example:</strong></p>`,
          code: `# My Tortoise — Chapter 6: Personality

def on_button_a():
    basic.pause(500)
    basic.show_icon(IconNames.HAPPY)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a)

def on_button_b():
    basic.pause(500)
    basic.show_icon(IconNames.HEART)
    basic.pause(1500)
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b)

def on_pin_p1():
    motors.motor_A.set_speed(30)
    motors.motor_B.set_speed(10)
    basic.pause(1000)
input.on_pin_pressed(TouchPin.P1, on_pin_p1)

def on_shake():
    motors.motor_A.set_speed(0)
    motors.motor_B.set_speed(0)
    basic.show_leds("""
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
    """)
    basic.pause(5000)
input.on_gesture(Gesture.SHAKE, on_shake)

def on_forever():
    if input.light_level() > 120:
        distance = sensors.ultrasonic_distance()
        if distance < 20:
            motors.motor_A.set_speed(30)
            motors.motor_B.set_speed(10)
            basic.pause(1000)
        else:
            motors.motor_A.set_speed(30)
            motors.motor_B.set_speed(30)
            basic.show_icon(IconNames.HEART)
            basic.pause(1500)
            basic.show_icon(IconNames.HEART_SMALL)
            basic.pause(1500)
    else:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
        basic.pause(2000)
basic.forever(on_forever)`,
          tip: `Compare every parameter with the hare: everything slower, more patient, more careful. That's your tortoise's personality!`
        }
      },

      /* ---- Chapter 7: Feelings ---- */
      {
        concept: {
          explanation: `<p>Variables work just like the hare's — but the tortoise is frugal. Hunger rises slower (every 5s instead of 2s) and the threshold is higher (<code>8</code> vs <code>5</code>):</p>`,
          code: `hunger = 0

def on_forever():
    global hunger
    hunger += 1
    if hunger > 8:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    basic.pause(5000)  # Slower hunger
basic.forever(on_forever)`,
          tip: `Tortoise gets sad at hunger above <code>8</code> (hare: <code>5</code>). More frugal, needs less attention.`
        },
        fullTask: {
          explanation: `<p><strong>The patient tortoise:</strong></p>`,
          code: `# My Tortoise — Chapter 7: Feelings

hunger = 0

def on_forever():
    global hunger
    hunger += 1
    if hunger > 8:
        basic.show_icon(IconNames.SAD)
    else:
        basic.show_icon(IconNames.HAPPY)
    basic.pause(5000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
    basic.show_icon(IconNames.HEART)
    basic.pause(1000)
input.on_button_pressed(Button.B, on_button_b)`,
          tip: `Add <code>tiredness</code>. The tortoise needs more sleep than the hare — maybe it only wakes at <code>10</code>?`
        }
      },

      /* ---- Chapter 8: Learning ---- */
      {
        concept: {
          explanation: `<p>Same Python syntax, different thresholds:</p>`,
          code: `if hunger > 8 and input.light_level() > 120:
    motors.motor_A.set_speed(30)

if tiredness > 10 or input.light_level() < 50:
    basic.clear_screen()`,
          tip: `Higher hunger (<code>8</code>), more tiredness (<code>10</code>), more light (<code>120</code>) needed. Patience in every condition!`
        },
        fullTask: {
          explanation: `<p><strong>Wise decisions:</strong></p>`,
          code: `# My Tortoise — Chapter 8: Learning

hunger = 0
tiredness = 0

def on_forever():
    global hunger, tiredness
    hunger += 1
    tiredness += 1
    
    if hunger > 8 and input.light_level() > 120:
        motors.motor_A.set_speed(30)
        motors.motor_B.set_speed(30)
        basic.show_arrow(ArrowNames.NORTH)
    elif tiredness > 10 or input.light_level() < 50:
        motors.motor_A.set_speed(0)
        motors.motor_B.set_speed(0)
        basic.clear_screen()
    else:
        basic.show_icon(IconNames.HEART)
        basic.pause(1500)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(1500)
    basic.pause(5000)
basic.forever(on_forever)

def on_button_b():
    global hunger
    hunger = 0
input.on_button_pressed(Button.B, on_button_b)

def on_button_a():
    global tiredness
    tiredness = 0
input.on_button_pressed(Button.A, on_button_a)`,
          tip: `Compare every number with the hare's program. The algorithm is identical — only the parameters differ!`
        }
      },

      /* ---- Chapter 9: Encounter ---- */
      {
        concept: {
          explanation: `<p>Same <strong>algorithm</strong> — different parameters. Swap the variables at the top and the character changes completely!</p>`,
          code: `# === PARAMETERS ===
# BREATH_PAUSE = 300   # Hare
BREATH_PAUSE = 1500    # Tortoise

# MOTOR_SPEED = 80     # Hare
MOTOR_SPEED = 30       # Tortoise

# LIGHT_THRESHOLD = 50    # Hare
LIGHT_THRESHOLD = 120     # Tortoise

# === Same algorithm! ===
def on_forever():
    if input.light_level() > LIGHT_THRESHOLD:
        basic.show_icon(IconNames.HEART)
        basic.pause(BREATH_PAUSE)
        basic.show_icon(IconNames.HEART_SMALL)
        basic.pause(BREATH_PAUSE)
    else:
        basic.clear_screen()
basic.forever(on_forever)`,
          tip: `The core insight: <strong>Algorithms are general. Character comes from parameters.</strong> In Python, parameters are simply variables at the top of your program.`
        },
        fullTask: {
          explanation: `<p><strong>Radio — the tortoise responds:</strong></p>`,
          code: `# My Tortoise — Chapter 9: Encounter
# Radio communication + parameters

radio.set_group(1)
BREATH_PAUSE = 1500
MOTOR_SPEED = 30

def on_received(text):
    if text == "Obstacle!":
        basic.pause(1000)      # Think...
        radio.send_string("Solution")
        basic.show_icon(IconNames.YES)
        basic.pause(2000)
radio.on_received_string(on_received)

def on_forever():
    motors.motor_A.set_speed(MOTOR_SPEED)
    motors.motor_B.set_speed(MOTOR_SPEED)
    basic.show_icon(IconNames.HEART)
    basic.pause(BREATH_PAUSE)
basic.forever(on_forever)`,
          tip: `The hare detects obstacles quickly. The tortoise takes time to find solutions. Together they're stronger than alone!`
        }
      }
    ]
  }
};
