/* =============================================
   ENGLISH CONTENT — content-en.js
   Full content: 9 chapters (6 core + 3 bonus), both paths
   v2 — shortened narratives, no reflections, new ch6, bonus ch7-9
   ============================================= */

window.CONTENT_EN = {

  /* --- UI Strings --- */
  ui: {
    siteTitle: 'Hare & Tortoise',
    siteSubtitle: 'An algorithmic journey with the Calliope mini',
    landingIntro: 'Two animals. Two stories. One shared path.<br>Choose your animal — and bring it to life.',
    hareName: 'The Hare',
    hareDesc: 'Fast, curious, impatient.<br>He learns that speed isn\'t everything.',
    tortoiseName: 'The Tortoise',
    tortoiseDesc: 'Calm, thoughtful, persistent.<br>She discovers that slowness is a strength.',
    or: 'or',
    backToSelection: 'Back',
    lrs: 'LRS',
    python: 'Python',
    prevChapter: 'Previous Chapter',
    nextChapter: 'Next Chapter',
    problemTitle: 'The Problem',
    conceptTitle: 'The Computer Science Idea',
    guidedTaskTitle: 'Task',
    openTasksTitle: 'Tasks',
    extensionTitle: 'What if…?',
    chapterLabel: 'Chapter',
    stepLabel: 'Step',
    checkDone: 'Done',
    taskLevelGuided: 'Step-by-step',
    taskLevelExplore: 'Explore',
    taskLevelCreate: 'Create',
    openInMakeCode: 'Open in MakeCode',
    bonusLabel: 'Bonus',
    hardwareLabel: 'I have the required hardware (Calliope mini + motors + sensors)'
  },

  /* --- Chapter Data --- */
  chapters: {

    /* ==========================================
       HARE PATH — 9 Chapters
       ========================================== */
    hare: [

      /* ---- CHAPTER 1: AWAKENING (Sequence) ---- */
      {
        id: 1,
        title: 'Awakening',
        conceptLabel: 'Sequence — Commands in Order',
        conceptShort: 'Sequence',
        image: 'img/chapters/hare/h1.png',

        narrative: `<p>Something stirs in the digital world. A tiny light blinks on a small board. It's a hare — not one of flesh and bone, but one of light and electricity. Right now, it's just a possibility. It knows only one thing: it has just been switched on.</p>

<p>Every being needs a first moment — a first heartbeat. For your hare, this begins with light. One LED comes on, then another. Step by step, command by command, it shows its first signs of life. In programming, this sequence of steps is called a <strong>sequence</strong>. You decide what comes first and what comes next.</p>`,

        problem: `<p>Your hare exists — but nobody knows it. It needs to give a sign. Something that says: <em>Here I am.</em></p>
<p>How can you make the Calliope mini display different LED patterns one after another?</p>`,

        concept: `<p>A <strong>sequence</strong> is a series of instructions executed one after another. Each command waits until the previous one is finished.</p>
<p>Imagine giving someone directions:</p>
<code>Go straight ahead.
Turn left.
Walk 50 steps.
Stop.</code>
<p>That's exactly how a sequence works. The order matters — if you turn first and then go straight, you end up somewhere else.</p>`,

        guidedTask: {
          title: 'Your hare shows its first sign of life',
          steps: [
            {
              title: 'Open the editor',
              text: 'Go to <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> and create a new project. Name it <strong>"My Hare"</strong>.'
            },
            {
              title: 'Show a heart',
              text: 'Drag the <span class="calliope-block">show leds</span> block from <strong>Basic</strong> into the <span class="calliope-block">on start</span> block. Draw a heart pattern in the LED grid.'
            },
            {
              title: 'Add a pause',
              text: 'Drag <span class="calliope-block">pause (ms) 500</span> from <strong>Basic</strong> below your LED block. The hare is fast — 500 milliseconds is enough.'
            },
            {
              title: 'Show a star',
              text: 'Drag another <span class="calliope-block">show leds</span> block below. Draw a star pattern (★). Add another 500 ms pause.'
            },
            {
              title: 'Clear the display',
              text: 'Drag <span class="calliope-block">clear screen</span> as the last block in the sequence.'
            },
            {
              title: 'Test your program',
              text: 'Click the ▶ Play button in the simulator. See the heart, then the star, then darkness? That\'s a <strong>sequence</strong>.',
              textHw: 'Download the program to your Calliope mini. See the heart, then the star, then darkness? That\'s a <strong>sequence</strong>.'
            }
          ]
        },

        openTasks: [
          {
            level: 'create',
            title: 'Your hare\'s name',
            text: 'Use the <span class="calliope-block">show string</span> block to scroll your hare\'s name across the LEDs. Add matching LED patterns before and after.'
          },
          {
            level: 'explore',
            title: 'Blinking sequence',
            text: 'Can you create a sequence that makes it look like your hare is blinking? Use LED patterns for open and closed eyes.'
          }
        ],

        extensions: [
          'What happens when you make the pauses shorter or longer? How does it change your hare\'s "personality"?',
          'What happens if you swap the order of the blocks?'
        ]
      },

      /* ---- CHAPTER 2: BREATHING (Forever Loop) ---- */
      {
        id: 2,
        title: 'Breathing',
        conceptLabel: 'Forever Loop — Continuous Repetition',
        conceptShort: 'Forever Loop',
        image: 'img/chapters/hare/h2.png',

        narrative: `<p>Your hare gave its first sign of life. But then — silence. The program is finished and the hare stands still. Living beings don't just go quiet. They breathe. Inhale, exhale, over and over.</p>

<p>Your hare needs a rhythm — something that never stops. In programming, this is called a <strong>forever loop</strong>. The hare breathes fast, as hares do. Its LED heart pulses at a quick tempo — it lives at high speed.</p>`,

        problem: `<p>Your hare shows its heart — but only once. Then silence. How do you make it "breathe" continuously?</p>`,

        concept: `<p>A <strong>forever loop</strong> repeats instructions again and again, never stopping. In MakeCode, the block is called <span class="calliope-block">forever</span>.</p>
<p>Think of repeating things in nature:</p>
<code>Inhale → Exhale → Inhale → Exhale → …
Day → Night → Day → Night → …
Heartbeat → Pause → Heartbeat → Pause → …</code>
<p>Without a forever loop, your program stops after the last command.</p>`,

        guidedTask: {
          title: 'The hare\'s heartbeat',
          steps: [
            {
              title: 'Open your project',
              text: 'Open your project <strong>"My Hare"</strong>.'
            },
            {
              title: 'Find the forever block',
              text: 'The <span class="calliope-block">forever</span> block is already in the editor. Everything inside it repeats endlessly.'
            },
            {
              title: 'Show a heart',
              text: 'Drag <span class="calliope-block">show leds</span> into <span class="calliope-block">forever</span>. Draw a big heart (♥).'
            },
            {
              title: 'Pause — Inhale',
              text: 'Add <span class="calliope-block">pause (ms) 300</span>. The hare breathes fast!'
            },
            {
              title: 'Show a small heart',
              text: 'Add a second <span class="calliope-block">show leds</span> block. Draw a smaller heart — the "exhale."'
            },
            {
              title: 'Pause — Exhale',
              text: 'Add another pause of <span class="calliope-block">300</span> ms.'
            },
            {
              title: 'Observe',
              text: 'Start the simulator. Your hare is breathing! The heart pulses — big, small, big, small — forever.',
              textHw: 'Download to your Calliope mini. Your hare is breathing! The heart pulses — big, small, big, small — forever.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Breathe faster or slower',
            text: 'Change the pauses. What happens at 100 ms? At 1000 ms? An excited hare breathes differently from a sleeping one.'
          },
          {
            level: 'create',
            title: 'Your own breathing animation',
            text: 'Design a breathing animation with at least 3 different LED images. Maybe your hare hops while breathing? Or its ears move?'
          }
        ],

        extensions: [
          'What happens if you remove <span class="calliope-block">forever</span> and put everything in <span class="calliope-block">on start</span> instead?',
          'How would a giant animal\'s "breathing" look compared to a small hare\'s?'
        ]
      },

      /* ---- CHAPTER 3: PERCEIVING (Sensors) ---- */
      {
        id: 3,
        title: 'Perceiving',
        conceptLabel: 'Inputs and Sensors',
        conceptShort: 'Sensors',
        image: 'img/chapters/hare/h3.png',

        narrative: `<p>Your hare breathes steadily — day and night the same. But living beings sleep when it's dark and wake when light comes. They sense the world around them.</p>

<p>Your Calliope mini has a light sensor. With it, your hare can tell bright from dark. Imagine: The hare sleeps peacefully. Then a beam of light hits the sensor. In a flash — as hares do — its LEDs blaze to life. Even the tiniest bit of light is enough to startle it awake.</p>`,

        problem: `<p>Your hare breathes without pause — even at midnight. How can you use the light sensor so your hare only "lives" in brightness?</p>`,

        concept: `<p><strong>Sensors</strong> are your Calliope mini's sense organs. The light sensor measures brightness — a value between 0 (pitch dark) and 255 (very bright).</p>
<code>Light level → a number between 0 and 255

If the number is large → it's bright
If the number is small → it's dark</code>
<p>Your program can constantly "ask" the sensor: How bright is it? This is called <strong>input</strong> — information from the outside world.</p>`,

        guidedTask: {
          title: 'The hare sees the light',
          steps: [
            {
              title: 'Get to know the sensor',
              text: 'In MakeCode, under <strong>Input</strong>, find the <span class="calliope-block">light level</span> block. It returns a number.'
            },
            {
              title: 'Display light level',
              text: 'In the <span class="calliope-block">forever</span> block: <span class="calliope-block">show number (light level)</span>. Test it — cover the sensor or shine a light.'
            },
            {
              title: 'Prepare a condition',
              text: 'Drag <span class="calliope-block">if … then … else</span> from <strong>Logic</strong> into the <span class="calliope-block">forever</span> block.'
            },
            {
              title: 'Set the threshold',
              text: 'Set condition: <span class="calliope-block">light level > 50</span>. The hare doesn\'t need much light — 50 is enough!'
            },
            {
              title: 'Add wake animation',
              text: 'In the <strong>then</strong> area: Add your heart-breathing animation (big heart → pause → small heart → pause).'
            },
            {
              title: 'Add sleep mode',
              text: 'In the <strong>else</strong> area: <span class="calliope-block">clear screen</span>. When it\'s dark, the hare sleeps.'
            },
            {
              title: 'Test with light and shadow',
              text: 'Cover the sensor → hare sleeps. Give light → it wakes up. Quick and sensitive!',
              textHw: 'Download and test: Cover the sensor → hare sleeps. Give light → it wakes. Quick and sensitive!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Adjust sensitivity',
            text: 'Change the threshold. What happens at 20? At 100? At 200? How sensitive should your hare be?'
          },
          {
            level: 'create',
            title: 'Wake-up animation',
            text: 'Create a special animation showing your hare waking up: maybe it opens its eyes slowly, stretches, then starts breathing.'
          }
        ],

        extensions: [
          'What if your hare reacted to sound instead of light? The Calliope has a microphone!'
        ]
      },

      /* ---- CHAPTER 4: DECIDING (If-Then) ---- */
      {
        id: 4,
        title: 'Deciding',
        conceptLabel: 'Conditions — If-Then',
        conceptShort: 'If-Then',
        image: 'img/chapters/hare/h4.png',

        narrative: `<p>Your hare can see now. It wakes when light falls on it and sleeps when it's dark. But its world knows only two states: on and off. Real living beings make decisions — small, everyday ones. Is it warm enough? Is someone approaching?</p>

<p>Your hare gets touched on the Calliope's buttons — Button A, Button B. Perhaps A means "pet" and B means "feed." The hare decides fast — that's its nature. The moment someone presses the button, it responds instantly.</p>`,

        problem: `<p>Your hare should react to touch — but not always the same way. "Petting" (Button A) should show joy. "Feeding" (Button B) should show something different.</p>
<p>How do you teach it to distinguish between different inputs?</p>`,

        concept: `<p>A <strong>condition</strong> (If-Then) lets your program react differently.</p>
<code>IF Button A pressed
  THEN show a heart ♥
IF Button B pressed
  THEN show a star ★</code>
<p>You know conditions from daily life: <em>If it rains, I take an umbrella.</em></p>
<p>In MakeCode: <span class="calliope-block">on button A pressed</span> reacts every time the button is pressed.</p>`,

        guidedTask: {
          title: 'The hare learns to distinguish',
          steps: [
            {
              title: 'Button A: Petting',
              text: 'Drag <span class="calliope-block">on button A pressed</span> from <strong>Input</strong> into the editor.'
            },
            {
              title: 'Show joy',
              text: 'Add: <span class="calliope-block">show leds</span> — draw a happy face (😊). Then <span class="calliope-block">pause (ms) 500</span> and <span class="calliope-block">clear screen</span>.'
            },
            {
              title: 'Button B: Feeding',
              text: 'Drag another <span class="calliope-block">on button B pressed</span> block into the editor.'
            },
            {
              title: 'Show eating',
              text: 'Add a different LED pattern — maybe a carrot or open mouth. Pause and clear as before.'
            },
            {
              title: 'Keep breathing',
              text: 'Keep the <span class="calliope-block">forever</span> block with the breathing animation running.'
            },
            {
              title: 'Test both buttons',
              text: 'Press A — happy hare. Press B — it "eats." In between, it breathes calmly.',
              textHw: 'Download and test both buttons on your Calliope mini.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Both buttons at once',
            text: 'What should happen when you press A and B simultaneously? Use <span class="calliope-block">on button A+B pressed</span>. Maybe a special gesture?'
          },
          {
            level: 'create',
            title: 'Three reactions',
            text: 'Program three reactions: A = joy, B = hunger, A+B = surprise. Each with its own LED pattern and sound.'
          }
        ],

        extensions: [
          'Can you combine this with the light sensor from Chapter 3?',
          'What happens when two conditions are true at the same time?'
        ]
      },

      /* ---- CHAPTER 5: MOVING (Motors + Ultrasonic) ---- */
      {
        id: 5,
        title: 'Moving',
        conceptLabel: 'Motor Control and Ultrasonic Sensor',
        conceptShort: 'Motors',
        image: 'img/chapters/hare/h5.png',

        narrative: `<p>Your hare can breathe, see, and decide. But it still sits motionless. A hare that doesn't move isn't a real hare. Movement changes everything — a being that can move explores the world, flees from danger, and discovers new things.</p>

<p>The Calliope mini can control motors. Your hare wants to be fast, of course. But speed has its price — go too fast and you miss the obstacles. That's why your hare also gets an <strong>ultrasonic sensor</strong>: it detects what's in the way so it can dodge in time. Escape behaviour — just like a real hare!</p>`,

        problem: `<p>Your hare should move and detect obstacles. The motors start automatically. If the ultrasonic sensor spots an obstacle, the hare should dodge instantly — escape behaviour!</p>`,

        concept: `<p>A <strong>motor</strong> converts electricity into movement. You control direction and speed (0–100).</p>
<p>An <strong>ultrasonic sensor</strong> measures distances — like sonar. It sends sound waves and measures how long they take to come back.</p>
<code>Motor A + B forward at speed 80
→ The hare runs!

Ultrasonic distance < 15 cm
→ Obstacle detected! Dodge!</code>
<p>Motors A and B can spin at different speeds — that's how your hare turns.</p>`,

        guidedTask: {
          title: 'The hare escapes obstacles',
          steps: [
            {
              title: 'Open your project',
              text: 'Open your project <strong>"My Hare"</strong>.'
            },
            {
              title: 'Find motor blocks',
              text: 'Go to <strong>Motors</strong>. You\'ll find blocks like <span class="calliope-block">set motor A to speed</span>.'
            },
            {
              title: 'Set up ultrasonic',
              text: 'Under <strong>Sensors</strong>, find <span class="calliope-block">ultrasonic distance (cm)</span>.'
            },
            {
              title: 'Drive forward',
              text: 'In <span class="calliope-block">forever</span>: Set both motors to speed 80. Show an up-arrow on the LEDs.'
            },
            {
              title: 'Obstacle detection',
              text: 'Add condition: <span class="calliope-block">if ultrasonic distance < 15</span> → Stop both motors, show exclamation mark.'
            },
            {
              title: 'Escape behaviour',
              text: 'After stopping: Motor A to −80, Motor B to 80 (spin turn), <span class="calliope-block">pause 500</span>, then both forward again. Lightning-fast dodge!'
            },
            {
              title: 'Test the escape behaviour',
              text: 'Start the simulator and observe the sensor values. Change the distance to test the behaviour.',
              textHw: 'Download to your Calliope, place an obstacle, and watch it dodge!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Turning',
            text: 'What happens when Motor A is at 80 and Motor B at 30? Try different combinations — your hare can turn!'
          },
          {
            level: 'create',
            title: 'Improve the escape',
            text: 'Enhance the escape: alternate dodging left and right. Or react at different speeds depending on distance.'
          }
        ],

        extensions: [
          'What if the hare adapts speed to brightness? Bright = run, dim = creep.',
          'What happens when one motor goes forward and the other backward?'
        ]
      },

      /* ---- CHAPTER 6: MY ANIMAL (Personality / Integration) ---- */
      {
        id: 6,
        title: 'My Animal',
        conceptLabel: 'Personality — Integrating All Concepts',
        conceptShort: 'Integration',
        image: 'img/chapters/hare/h6.png',

        narrative: `<p>Your hare can breathe, see, react to buttons, move, and dodge obstacles. All these pieces together already make quite a lively creature. But so far, you've been following instructions — now it's time to make your hare truly <em>your</em> animal.</p>

<p>In this chapter your hare gains two new abilities: it responds to <strong>touch</strong> (touch pins) and to <strong>shaking</strong>. Combined with everything you've learned, you'll shape your hare's personality. How does it react when petted? What happens when it's shaken? How does it move near obstacles? You decide!</p>`,

        problem: `<p>Your hare has many abilities — but no personality yet. Combine everything you've learned and add new interactions: touch pins and shaking. Make your hare unique!</p>`,

        concept: `<p>The Calliope mini has <strong>touch pins</strong> (touch-sensitive contacts) and an <strong>accelerometer</strong> that detects shaking.</p>
<code>on pin P1 touched → hare turns left
on pin P2 touched → hare turns right
on shake → hare shows surprised face</code>
<p><strong>Integration</strong> means connecting all previous concepts (sequence, loop, sensors, conditions, motors) into one coherent programme of your own. Less guidance, more of your own ideas!</p>`,

        guidedTask: {
          title: 'Give your hare personality',
          steps: [
            {
              title: 'Take stock',
              text: 'Open your project <strong>"My Hare"</strong>. Review what it can already do: breathing, light detection, button reactions, driving, dodging.'
            },
            {
              title: 'Discover touch pins',
              text: 'Under <strong>Input</strong>, find <span class="calliope-block">on pin P1 touched</span>. Touching the left pin could make the hare dodge right.'
            },
            {
              title: 'Add shake',
              text: 'Use <span class="calliope-block">on shake</span> from <strong>Input</strong>. What should your hare do when shaken? Panic? Jump for joy? You decide!'
            },
            {
              title: 'Combine behaviours',
              text: 'Plan: How should it move? What happens near obstacles? How does it react to light, touch, shaking? Write down your ideas.'
            },
            {
              title: 'Program and test',
              text: 'Build your ideas in MakeCode. Test after every change in the simulator.',
              textHw: 'Build your ideas in MakeCode. Download regularly to your Calliope and test with your real hare.'
            },
            {
              title: 'Introduce your personality',
              text: 'Show your hare to a classmate. Can they tell what character it has? What makes it special?'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Reaction chain',
            text: 'When shaken, the hare blinks wildly for 2 seconds then drives faster than normal. After 5 seconds, it returns to normal speed.'
          },
          {
            level: 'create',
            title: 'Character profile',
            text: 'Create a full profile: speed, light reaction, touch reaction, obstacle behaviour, shake response. Programme all behaviours to match its personality.'
          }
        ],

        extensions: [
          'Can you make different pins trigger different reactions — e.g., left pin = gentle turn, right pin = sharp spin?',
          'What if the hare remembers how many times it has been shaken and becomes more scared each time?'
        ]
      },

      /* ---- CHAPTER 7: FEELINGS (Variables) — BONUS ---- */
      {
        id: 7,
        title: 'Feelings',
        conceptLabel: 'States and Variables',
        conceptShort: 'Variables',
        image: 'img/chapters/hare/h7.png',
        bonus: true,

        narrative: `<p>Your hare can do many things — but does it truly live? What gives a being real life are inner states: hungry, tired, content. These states change how it reacts to the world.</p>

<p>In programming, we store such states in <strong>variables</strong> — labelled drawers containing a number. Your hare is impatient, even with its feelings: its hunger rises fast and it needs lots of attention!</p>`,

        problem: `<p>Your hare should be able to get "hungry." A hunger value rises slowly. When fed (Button B), hunger drops. The LEDs should show this.</p>`,

        concept: `<p>A <strong>variable</strong> is a named storage location with a name and a value.</p>
<code>hunger = 0           → The hare is full.
hunger = hunger + 1   → It gets a bit hungrier.
hunger = 0            → It was fed.</code>
<p>You can query variables:</p>
<code>IF hunger > 5
  THEN show sad face
ELSE
  show happy face</code>
<p>In MakeCode: <strong>Variables</strong> → <strong>Make a Variable</strong>.</p>`,

        guidedTask: {
          title: 'The hare gets hungry',
          steps: [
            {
              title: 'Create variable',
              text: 'Go to <strong>Variables</strong> → <strong>Make a Variable</strong>. Name it <code>hunger</code>.'
            },
            {
              title: 'Set initial value',
              text: 'In <span class="calliope-block">on start</span>: Set <span class="calliope-block">hunger to 0</span>.'
            },
            {
              title: 'Increase hunger',
              text: 'In <span class="calliope-block">forever</span>: <span class="calliope-block">change hunger by 1</span>, then <span class="calliope-block">pause (ms) 2000</span>. Every 2 seconds, it gets hungrier.'
            },
            {
              title: 'Show face',
              text: '<span class="calliope-block">if hunger > 5</span> → sad LED face. <strong>Else</strong> → happy face.'
            },
            {
              title: 'Feed with Button B',
              text: 'In <span class="calliope-block">on button B pressed</span>: Set <span class="calliope-block">hunger to 0</span>. Briefly show a heart (♥).'
            },
            {
              title: 'Observe',
              text: 'Happy at first, then sad. Press B → content again. You have to take care of it!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Second feeling: Tiredness',
            text: 'Create a second variable <code>tiredness</code>. Button A lets the hare "sleep." Now it has two needs!'
          },
          {
            level: 'create',
            title: 'Feelings display',
            text: 'Show hunger as a growing LED bar. The hungrier, the more LEDs light up.'
          }
        ],

        extensions: [
          'What if the hare moves differently when hungry?',
          'What happens when hunger goes above 10? Is there a "game over"?'
        ]
      },

      /* ---- CHAPTER 8: LEARNING (Combined Conditions) — BONUS ---- */
      {
        id: 8,
        title: 'Learning',
        conceptLabel: 'Combining Multiple Conditions',
        conceptShort: 'AND / OR',
        image: 'img/chapters/hare/h8.png',
        bonus: true,

        narrative: `<p>So far your hare makes simple choices: hungry or not, bright or dark. Real learning begins where simple answers aren't enough — when it's bright AND the hare is hungry, but also tired.</p>

<p>Now your hare learns to consider multiple things at once. It combines in a flash — sometimes too hastily. But every day it gets a little wiser.</p>`,

        problem: `<p>Your hare should get smarter: If hungry AND bright, search for food. If tired OR dark, sleep.</p>`,

        concept: `<p>You can combine conditions with <strong>AND</strong> and <strong>OR</strong>:</p>
<code>IF hunger > 5 AND light level > 50
  THEN search for food (drive forward)

IF tiredness > 7 OR light level < 30
  THEN sleep (LEDs off, motors off)</code>
<p><strong>AND</strong>: Both must be true. <strong>OR</strong>: At least one must be true.</p>
<p>In MakeCode: <span class="calliope-block">… and …</span> and <span class="calliope-block">… or …</span> under <strong>Logic</strong>.</p>`,

        guidedTask: {
          title: 'The hare combines its knowledge',
          steps: [
            {
              title: 'Prepare variables',
              text: 'Ensure you have <code>hunger</code> and <code>tiredness</code> (from Chapter 7). Both start at 0 and rise over time.'
            },
            {
              title: 'Combined condition',
              text: 'In <span class="calliope-block">forever</span>: <span class="calliope-block">if … then … else</span> with <span class="calliope-block">… and …</span> from Logic.'
            },
            {
              title: 'Food search',
              text: 'Condition: <span class="calliope-block">hunger > 5 and light level > 50</span> → Motor forward + LED arrow.'
            },
            {
              title: 'Sleep mode',
              text: '<span class="calliope-block">else if tiredness > 7 or light level < 30</span> → Motor stop + LEDs off.'
            },
            {
              title: 'Default behaviour',
              text: 'In <strong>else</strong>: The normal breathing animation.'
            },
            {
              title: 'Test',
              text: 'Watch the hare show different behaviours depending on hunger, tiredness, and light.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Even more complex',
            text: 'Add <code>joy</code>. If joyful AND full, show a special dance animation.'
          },
          {
            level: 'create',
            title: 'Daily routine',
            text: 'Programme: Wake up → Eat → Play → Sleep. Your hare lives a whole day!'
          }
        ],

        extensions: [
          'How many combinations with three conditions at once?',
          'What\'s more important for your hare: sleep or food?'
        ]
      },

      /* ---- CHAPTER 9: ENCOUNTER (Convergence) — BONUS ---- */
      {
        id: 9,
        title: 'Encounter',
        conceptLabel: 'Convergence — Algorithms as Blueprints',
        conceptShort: 'Algorithms',
        image: 'img/chapters/hare/h9.png',
        bonus: true,

        narrative: `<p>Your hare has come far. It can breathe, see, decide, move, and feel. But today it meets another being — slow, deliberate. A tortoise. At first the hare thinks: What can this slow creature do?</p>

<p>Then it notices: The tortoise can do exactly the same things. Same loops, conditions, variables. Just different numbers — different <strong>parameters</strong>. Speed is just a setting. Character comes from parameters.</p>`,

        problem: `<p>The hare is fast enough to spot obstacles — but too impatient for solutions. The tortoise is patient — but too slow alone. Together they can make it!</p>`,

        concept: `<p>An <strong>algorithm</strong> is like a blueprint. The same blueprint produces different results depending on the settings.</p>
<code>Algorithm: Breathing Animation
  Parameter: Speed = ?

Hare:     Speed = 300ms  → fast
Tortoise: Speed = 1500ms → slow

Same algorithm. Different character.</code>
<p><em>Algorithms are universal — character comes from settings.</em></p>`,

        guidedTask: {
          title: 'Comparing the programmes',
          steps: [
            {
              title: 'Overview',
              text: 'Place your hare programme next to a tortoise programme (from a classmate or example).'
            },
            {
              title: 'Compare structure',
              text: 'Mark shared building blocks: <span class="calliope-block">forever</span>, <span class="calliope-block">if…then</span>, variables, motors.'
            },
            {
              title: 'Find parameters',
              text: 'Find the numbers that differ: pause times, speeds, thresholds.'
            },
            {
              title: 'Swap parameters',
              text: 'Change your hare parameters to tortoise values. What happens?'
            },
            {
              title: 'Radio collaboration',
              text: 'Connect two Calliope minis via <strong>Radio</strong>. The hare sends "Obstacle!", the tortoise responds "Solution found."'
            },
            {
              title: 'Insight',
              text: 'Both animals share the same blueprint. The difference is in the settings.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Radio communication',
            text: 'Use <span class="calliope-block">radio send string</span> and <span class="calliope-block">on radio received</span> for message exchange.'
          },
          {
            level: 'create',
            title: 'Joint problem',
            text: 'Design a task in pairs that can only be solved by cooperating. The hare spots fast, the tortoise navigates safely.'
          }
        ],

        extensions: [
          'Is there an animal between hare and tortoise?',
          'Invent a third animal with different parameter combinations.'
        ]
      }
    ],

    /* ==========================================
       TORTOISE PATH — 9 Chapters
       ========================================== */
    tortoise: [

      /* ---- CHAPTER 1: AWAKENING (Sequence) ---- */
      {
        id: 1,
        title: 'Awakening',
        conceptLabel: 'Sequence — Commands in Order',
        conceptShort: 'Sequence',
        image: 'img/chapters/tortoise/t1.png',

        narrative: `<p>Deep in the circuits of a small board, something ancient stirs. A tortoise wakes up. Slowly. Very slowly. It never rushes. A small light appears — gently, like a sunrise.</p>

<p>The tortoise doesn't need to be fast. It needs to be precise. In programming, this precision has a name: <strong>sequence</strong>. A list of instructions executed one after another. Every step placed deliberately before the next one follows.</p>`,

        problem: `<p>Your tortoise exists — but nobody knows it. It needs a calm, deliberate sign: <em>I have awakened.</em></p>
<p>How can you make the Calliope mini display different LED patterns one after another?</p>`,

        concept: `<p>A <strong>sequence</strong> is a series of instructions executed one after another. Each command waits until the previous one completes.</p>
<code>Go straight ahead.
Turn left.
Walk 50 steps.
Stop.</code>
<p>The order matters — swapping steps changes the result.</p>`,

        guidedTask: {
          title: 'Your tortoise shows its first sign of life',
          steps: [
            {
              title: 'Open the editor',
              text: 'Go to <a href="https://makecode.calliope.cc" target="_blank">makecode.calliope.cc</a> and create a new project. Name it <strong>"My Tortoise"</strong>.'
            },
            {
              title: 'Show a heart',
              text: 'Drag <span class="calliope-block">show leds</span> from <strong>Basic</strong> into <span class="calliope-block">on start</span>. Draw a heart pattern.'
            },
            {
              title: 'Add a pause',
              text: 'Add <span class="calliope-block">pause (ms) 1500</span>. The tortoise takes its time — 1500 milliseconds.'
            },
            {
              title: 'Show a sun',
              text: 'Add another <span class="calliope-block">show leds</span>. Draw a sun pattern. Pause 1500 ms.'
            },
            {
              title: 'Clear the display',
              text: 'Add <span class="calliope-block">clear screen</span> at the end.'
            },
            {
              title: 'Test your program',
              text: 'Heart, then sun, then silence. That\'s a <strong>sequence</strong> — slow and deliberate.',
              textHw: 'Download to your Calliope mini. Heart, then sun, then silence. A <strong>sequence</strong>.'
            }
          ]
        },

        openTasks: [
          {
            level: 'create',
            title: 'Your tortoise\'s name',
            text: 'Use <span class="calliope-block">show string</span> to display its name across the LEDs.'
          },
          {
            level: 'explore',
            title: 'Emerging from the shell',
            text: 'Can you make a sequence that looks like the tortoise slowly emerging from its shell?'
          }
        ],

        extensions: [
          'How do pauses affect its personality?',
          'What happens if you swap the block order?'
        ]
      },

      /* ---- CHAPTER 2: BREATHING (Forever Loop) ---- */
      {
        id: 2,
        title: 'Breathing',
        conceptLabel: 'Forever Loop — Continuous Repetition',
        conceptShort: 'Forever Loop',
        image: 'img/chapters/tortoise/t2.png',

        narrative: `<p>Your tortoise gave its first sign. But then — silence. Tortoises aren't stones. They live. They breathe. Slowly and steadily, with a rhythm unchanged for centuries.</p>

<p>Your digital tortoise needs this rhythm — a <strong>forever loop</strong>. It lives in repetition and finds comfort in constancy. Its LEDs pulse gently — where others flicker hectically, it glows warmly and steadily.</p>`,

        problem: `<p>Your tortoise shows its heart only once. How do you make it "breathe" continuously?</p>`,

        concept: `<p>A <strong>forever loop</strong> repeats endlessly. In MakeCode: <span class="calliope-block">forever</span>.</p>
<code>Inhale → Exhale → Inhale → Exhale → …
Ebb → Flow → Ebb → Flow → …</code>
<p>Without a forever loop, the program stops after the last command.</p>`,

        guidedTask: {
          title: 'The tortoise\'s heartbeat',
          steps: [
            {
              title: 'Open your project',
              text: 'Open <strong>"My Tortoise"</strong>.'
            },
            {
              title: 'Find the forever block',
              text: 'The <span class="calliope-block">forever</span> block is already there. Everything inside repeats endlessly.'
            },
            {
              title: 'Show a heart',
              text: 'Drag <span class="calliope-block">show leds</span> into <span class="calliope-block">forever</span>. Draw a big heart (♥).'
            },
            {
              title: 'Pause — Inhale',
              text: '<span class="calliope-block">pause (ms) 1500</span>. The tortoise breathes slowly and deeply.'
            },
            {
              title: 'Show a small heart',
              text: 'Second <span class="calliope-block">show leds</span> with a smaller heart — the "exhale."'
            },
            {
              title: 'Pause — Exhale',
              text: 'Another <span class="calliope-block">1500</span> ms pause.'
            },
            {
              title: 'Observe',
              text: 'The heart pulses slowly and evenly. Like a being with all the time in the world.',
              textHw: 'Download and observe. The heart pulses slowly and evenly — it lives!'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Feel the rhythm',
            text: 'What happens at 500 ms? At 3000 ms? Find the rhythm that suits your tortoise.'
          },
          {
            level: 'create',
            title: 'Shell animation',
            text: 'Design a breathing animation with 3+ LED images. Perhaps the tortoise retreats into its shell when "exhaling"?'
          }
        ],

        extensions: [
          'What happens if you use <span class="calliope-block">on start</span> instead of <span class="calliope-block">forever</span>?',
          'Real tortoises can hold their breath for 30 minutes. How long can yours?'
        ]
      },

      /* ---- CHAPTER 3: PERCEIVING (Sensors) ---- */
      {
        id: 3,
        title: 'Perceiving',
        conceptLabel: 'Inputs and Sensors',
        conceptShort: 'Sensors',
        image: 'img/chapters/tortoise/t3.png',

        narrative: `<p>Your tortoise breathes steadily — day and night the same. But real tortoises feel the sun's warmth on their shells. They know when it's time to wake and when to rest.</p>

<p>Your Calliope has a light sensor. With it, your tortoise can tell bright from dark. Its threshold is high — where others startle awake at the faintest light, the tortoise waits patiently until the sun is truly there.</p>`,

        problem: `<p>Your tortoise breathes even at night. How can you use the light sensor so it only "lives" when it's bright enough?</p>`,

        concept: `<p><strong>Sensors</strong> are the Calliope's sense organs. The light sensor measures brightness: 0 (dark) to 255 (bright).</p>
<code>Light level → a number between 0 and 255

Large number → bright
Small number → dark</code>
<p>The programme receives information from outside — that's <strong>input</strong>.</p>`,

        guidedTask: {
          title: 'The tortoise feels the sun',
          steps: [
            {
              title: 'Get to know the sensor',
              text: 'Under <strong>Input</strong>: <span class="calliope-block">light level</span> returns a number.'
            },
            {
              title: 'Display light level',
              text: '<span class="calliope-block">show number (light level)</span> in <span class="calliope-block">forever</span>. Test it!'
            },
            {
              title: 'Prepare a condition',
              text: '<span class="calliope-block">if … then … else</span> from <strong>Logic</strong> into <span class="calliope-block">forever</span>.'
            },
            {
              title: 'Set the threshold',
              text: '<span class="calliope-block">light level > 120</span>. The tortoise is patient — only real daylight wakes it!'
            },
            {
              title: 'Wake animation',
              text: 'In <strong>then</strong>: Your breathing animation.'
            },
            {
              title: 'Rest mode',
              text: 'In <strong>else</strong>: <span class="calliope-block">clear screen</span>.'
            },
            {
              title: 'Test with light and shadow',
              text: 'Cover sensor → rest. Strong light → it wakes. Patient and wise.',
              textHw: 'Download and test: Cover sensor → rest. Give light → she wakes. Patient and wise.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Adjust sensitivity',
            text: 'Try thresholds 50, 150, 220. How much light does your tortoise need?'
          },
          {
            level: 'create',
            title: 'Slow awakening',
            text: 'Animate: first a foot emerges, then the head, then the eyes open.'
          }
        ],

        extensions: [
          'What if it reacted to sound instead of light? The Calliope has a microphone!'
        ]
      },

      /* ---- CHAPTER 4: DECIDING (If-Then) ---- */
      {
        id: 4,
        title: 'Deciding',
        conceptLabel: 'Conditions — If-Then',
        conceptShort: 'If-Then',
        image: 'img/chapters/tortoise/t4.png',

        narrative: `<p>Your tortoise can see — wakes in sunlight, rests in darkness. But its world has only two states. Real tortoises make decisions — thoughtfully, deliberately.</p>

<p>Button A or Button B? The tortoise takes time. It pauses, considers. Only after a little thinking time does it show its response — calm and firm. No haste, no uncertainty.</p>`,

        problem: `<p>Your tortoise should react differently to Button A (petting) and Button B (feeding).</p>`,

        concept: `<p>A <strong>condition</strong> (If-Then) makes different reactions possible.</p>
<code>IF Button A pressed
  THEN show heart ♥
IF Button B pressed
  THEN show star ★</code>
<p>In MakeCode: <span class="calliope-block">on button A pressed</span>.</p>`,

        guidedTask: {
          title: 'The tortoise learns to distinguish',
          steps: [
            {
              title: 'Button A: Petting',
              text: '<span class="calliope-block">on button A pressed</span> from <strong>Input</strong>.'
            },
            {
              title: 'Thoughtful joy',
              text: 'First <span class="calliope-block">pause 500</span> (thinking time). Then happy face, <span class="calliope-block">pause 1500</span>, clear.'
            },
            {
              title: 'Button B: Feeding',
              text: '<span class="calliope-block">on button B pressed</span> → Thinking pause, different pattern (leaf/lettuce), long pause, clear.'
            },
            {
              title: 'Keep breathing',
              text: 'The <span class="calliope-block">forever</span> block with breathing continues running.'
            },
            {
              title: 'Test both buttons',
              text: 'A → Think, then joy. B → Think, then eating. In between, steady breathing.',
              textHw: 'Download and test on your Calliope mini.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Both buttons at once',
            text: '<span class="calliope-block">on button A+B pressed</span> — maybe it retreats into its shell in surprise?'
          },
          {
            level: 'create',
            title: 'Three reactions',
            text: 'Joy, hunger, surprise — each with its own pattern, sound, and timing.'
          }
        ],

        extensions: [
          'Can you combine with the light sensor from Chapter 3?',
          'What\'s the advantage of thinking before reacting?'
        ]
      },

      /* ---- CHAPTER 5: MOVING (Motors + Ultrasonic) ---- */
      {
        id: 5,
        title: 'Moving',
        conceptLabel: 'Motor Control and Ultrasonic Sensor',
        conceptShort: 'Motors',
        image: 'img/chapters/tortoise/t5.png',

        narrative: `<p>Your tortoise can breathe, see, and decide. But it still sits still. Even the wisest tortoise must eventually move — slowly, steadily, unstoppably. Tortoises have crossed oceans, not through speed, but through persistence.</p>

<p>With motors, your tortoise moves as its nature demands: calmly and reliably. With the <strong>ultrasonic sensor</strong>, it spots obstacles in time. No frantic dodging — a careful, deliberate course change.</p>`,

        problem: `<p>Your tortoise should move and detect obstacles. The motors run automatically. When it spots an obstacle, it carefully redirects — not escape, but steady navigation.</p>`,

        concept: `<p>A <strong>motor</strong> converts electricity into movement. An <strong>ultrasonic sensor</strong> measures distances with sound waves.</p>
<code>Motor A + B forward at speed 30
→ The tortoise glides.

Ultrasonic distance < 20 cm
→ Obstacle! Steer around carefully.</code>
<p>Different motor speeds = turns.</p>`,

        guidedTask: {
          title: 'The tortoise navigates carefully',
          steps: [
            {
              title: 'Open your project',
              text: 'Open <strong>"My Tortoise"</strong>.'
            },
            {
              title: 'Find motor blocks',
              text: 'Under <strong>Motors</strong>: <span class="calliope-block">set motor A to speed</span>.'
            },
            {
              title: 'Set up ultrasonic',
              text: 'Under <strong>Sensors</strong>: <span class="calliope-block">ultrasonic distance (cm)</span>.'
            },
            {
              title: 'Glide forward',
              text: 'In <span class="calliope-block">forever</span>: Both motors to speed 30. Slow arrow on LEDs.'
            },
            {
              title: 'Obstacle detection',
              text: '<span class="calliope-block">if ultrasonic distance < 20</span> → Stop motors, show shell symbol.'
            },
            {
              title: 'Careful redirect',
              text: 'After stopping: Motor A to 30, Motor B to 10 (gentle curve), <span class="calliope-block">pause 1000</span>, then straight again. Calm and deliberate.'
            },
            {
              title: 'Test',
              text: 'Watch in the simulator: the tortoise gently steers around obstacles.',
              textHw: 'Download, place an obstacle, and watch the careful navigation.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Gentle curves',
            text: 'Motor A at 30, Motor B at 15 — what happens? Try different combinations.'
          },
          {
            level: 'create',
            title: 'Safe navigation',
            text: 'Programme three levels: far = normal speed, medium = slower, close = redirect. Three stages!'
          }
        ],

        extensions: [
          'What if speed depended on brightness?',
          'What happens when one motor goes forward and the other backward?'
        ]
      },

      /* ---- CHAPTER 6: MY ANIMAL (Personality / Integration) ---- */
      {
        id: 6,
        title: 'My Animal',
        conceptLabel: 'Personality — Integrating All Concepts',
        conceptShort: 'Integration',
        image: 'img/chapters/tortoise/t6.png',

        narrative: `<p>Your tortoise can breathe, see, react, move, and steer around obstacles. All that together makes a wise little creature. But so far you followed instructions — now you'll make your tortoise truly <em>your</em> animal.</p>

<p>Two new abilities await: <strong>touch pins</strong> and <strong>shaking</strong>. Combined with everything so far, you shape a unique personality. Less guidance, more of your own ideas. How does it react when touched? What does it do when shaken? You decide!</p>`,

        problem: `<p>Your tortoise has many abilities but no personality yet. Combine everything and add touch pins and shaking. Make it unique!</p>`,

        concept: `<p>The Calliope has <strong>touch pins</strong> and an <strong>accelerometer</strong> (detects shaking).</p>
<code>on pin P1 touched → tortoise turns slowly left
on pin P2 touched → tortoise turns slowly right
on shake → tortoise retreats into shell</code>
<p><strong>Integration</strong>: connecting all concepts into one coherent programme of your own.</p>`,

        guidedTask: {
          title: 'Give your tortoise personality',
          steps: [
            {
              title: 'Take stock',
              text: 'Open <strong>"My Tortoise"</strong>. What can it do? Breathing, light, buttons, driving, steering.'
            },
            {
              title: 'Discover touch pins',
              text: 'Under <strong>Input</strong>: <span class="calliope-block">on pin P1 touched</span>. Left touch → gently steer right.'
            },
            {
              title: 'Add shake',
              text: '<span class="calliope-block">on shake</span>: What does your tortoise do? Retreat into shell? Blink slowly? You decide!'
            },
            {
              title: 'Combine behaviours',
              text: 'Plan: How does it move? React to light, touch, shaking, obstacles? Write down your ideas.'
            },
            {
              title: 'Program and test',
              text: 'Build your ideas. Test after every change.',
              textHw: 'Build your ideas. Download regularly and test with your real tortoise.'
            },
            {
              title: 'Introduce its personality',
              text: 'Show your tortoise to a classmate. Can they identify its character?'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Shell mode',
            text: 'On shake: stop all motors, show shell symbol, wait 5 seconds, then slowly resume driving.'
          },
          {
            level: 'create',
            title: 'Character profile',
            text: 'Create a full profile: speed, light reaction, touch reaction, obstacle behaviour, shake response — all matching its personality.'
          }
        ],

        extensions: [
          'Different pins, different reactions — gentle vs. firm?',
          'What if it counts how many times it\'s been shaken and becomes more cautious?'
        ]
      },

      /* ---- CHAPTER 7: FEELINGS (Variables) — BONUS ---- */
      {
        id: 7,
        title: 'Feelings',
        conceptLabel: 'States and Variables',
        conceptShort: 'Variables',
        image: 'img/chapters/tortoise/t7.png',
        bonus: true,

        narrative: `<p>Your tortoise can do many things — but does it truly live? What makes a being alive are inner states: hungry, tired, content. These change behaviour — subtly but noticeably.</p>

<p>In <strong>variables</strong> we store these states. Your tortoise is modest — its hunger rises slowly. It needs little, but needs it steadily. Those who pick a tortoise don't need to fuss, but must not forget it.</p>`,

        problem: `<p>Your tortoise should get "hungry." Hunger rises slowly. Feeding (Button B) resets it. The LEDs should show the difference.</p>`,

        concept: `<p>A <strong>variable</strong> is a named storage location.</p>
<code>hunger = 0           → full
hunger = hunger + 1   → hungrier
hunger = 0            → fed</code>
<code>IF hunger > 8
  THEN sad face
ELSE
  content face</code>
<p>In MakeCode: <strong>Variables</strong> → <strong>Make a Variable</strong>.</p>`,

        guidedTask: {
          title: 'The tortoise knows hunger',
          steps: [
            {
              title: 'Create variable',
              text: '<strong>Variables</strong> → <strong>Make a Variable</strong> → <code>hunger</code>.'
            },
            {
              title: 'Initial value',
              text: 'In <span class="calliope-block">on start</span>: <span class="calliope-block">hunger to 0</span>.'
            },
            {
              title: 'Increase hunger',
              text: 'In <span class="calliope-block">forever</span>: <span class="calliope-block">change hunger by 1</span>, <span class="calliope-block">pause 5000</span>. Every 5 seconds, slightly hungrier.'
            },
            {
              title: 'Show face',
              text: '<span class="calliope-block">if hunger > 8</span> → sad. Else → content.'
            },
            {
              title: 'Feed with Button B',
              text: '<span class="calliope-block">on button B</span>: <span class="calliope-block">hunger to 0</span>. Show heart.'
            },
            {
              title: 'Observe',
              text: 'Content at first, gradually sad. Feed it → happy again. Patience is caring.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Tiredness',
            text: 'Second variable <code>tiredness</code>. Button A = rest. Two needs!'
          },
          {
            level: 'create',
            title: 'Slow hunger bar',
            text: 'Hunger as a slowly growing LED bar display.'
          }
        ],

        extensions: [
          'Slower movement when hungry?',
          'What happens at hunger above 15 — a warning?'
        ]
      },

      /* ---- CHAPTER 8: LEARNING (Combined Conditions) — BONUS ---- */
      {
        id: 8,
        title: 'Learning',
        conceptLabel: 'Combining Multiple Conditions',
        conceptShort: 'AND / OR',
        image: 'img/chapters/tortoise/t8.png',
        bonus: true,

        narrative: `<p>So far, simple decisions: hungry or not, bright or dark. True wisdom begins where simple answers aren't enough. It's bright, BUT the tortoise is tired — should it get up?</p>

<p>Your tortoise takes time to weigh all factors. Not the speed of its decisions makes it wise, but their thoroughness.</p>`,

        problem: `<p>Wiser decisions: Hungry AND bright → search for food. Tired OR dark → rest.</p>`,

        concept: `<p>Combine conditions with <strong>AND</strong> and <strong>OR</strong>:</p>
<code>IF hunger > 8 AND light level > 120
  THEN search for food

IF tiredness > 10 OR light level < 50
  THEN rest</code>
<p><strong>AND</strong>: Both true. <strong>OR</strong>: At least one true.</p>
<p>MakeCode: <span class="calliope-block">… and …</span> / <span class="calliope-block">… or …</span> under <strong>Logic</strong>.</p>`,

        guidedTask: {
          title: 'The tortoise weighs carefully',
          steps: [
            {
              title: 'Prepare variables',
              text: '<code>hunger</code> and <code>tiredness</code> from Chapter 7.'
            },
            {
              title: 'Combined condition',
              text: '<span class="calliope-block">if … then … else</span> with <span class="calliope-block">… and …</span> from Logic.'
            },
            {
              title: 'Food search',
              text: '<span class="calliope-block">hunger > 8 and light level > 120</span> → Motor forward slowly.'
            },
            {
              title: 'Rest mode',
              text: '<span class="calliope-block">tiredness > 10 or light level < 50</span> → Motor stop, LEDs off.'
            },
            {
              title: 'Default',
              text: 'Else: Peaceful breathing animation.'
            },
            {
              title: 'Test',
              text: 'Watch the wise, deliberate behavioural changes.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Deeper thoughts',
            text: 'Add <code>contentment</code>. Content AND full → special sun animation.'
          },
          {
            level: 'create',
            title: 'Wise daily routine',
            text: 'Wake → Eat → Bask → Rest. A full, wisely lived day!'
          }
        ],

        extensions: [
          'Three states at once — how many combinations?',
          'What\'s more important: sleep or food?'
        ]
      },

      /* ---- CHAPTER 9: ENCOUNTER (Convergence) — BONUS ---- */
      {
        id: 9,
        title: 'Encounter',
        conceptLabel: 'Convergence — Algorithms as Blueprints',
        conceptShort: 'Algorithms',
        image: 'img/chapters/tortoise/t9.png',
        bonus: true,

        narrative: `<p>Your tortoise has come far — slowly but steadily. Today it meets another being: fast, excited — a hare. At first the tortoise thinks: What good is this frantic creature?</p>

<p>Then it notices: The hare can do exactly the same things. Same structure, same building blocks — just different <strong>parameters</strong>. Slowness isn't weakness — it's a different path. Character comes from settings.</p>`,

        problem: `<p>The tortoise is patient enough to think — but too slow alone. The hare is fast — but too impatient. Together they can manage!</p>`,

        concept: `<p>An <strong>algorithm</strong> is a blueprint. Different settings → different results.</p>
<code>Breathing Animation:
Hare:     300ms  → fast
Tortoise: 1500ms → slow

Same algorithm. Different character.</code>
<p><em>Algorithms are universal — character comes from settings.</em></p>`,

        guidedTask: {
          title: 'Comparing the programmes',
          steps: [
            {
              title: 'Overview',
              text: 'Place your tortoise programme next to a hare programme.'
            },
            {
              title: 'Compare structure',
              text: 'Shared building blocks: <span class="calliope-block">forever</span>, conditions, variables, motors.'
            },
            {
              title: 'Find parameters',
              text: 'Differing numbers: pauses, speeds, thresholds.'
            },
            {
              title: 'Swap parameters',
              text: 'Tortoise values → hare values. What happens?'
            },
            {
              title: 'Radio collaboration',
              text: 'Two Calliopes via <strong>Radio</strong>. Hare: "Obstacle!" Tortoise: "Solution found."'
            },
            {
              title: 'Insight',
              text: 'Same blueprint, different settings. That\'s the power of algorithms.'
            }
          ]
        },

        openTasks: [
          {
            level: 'explore',
            title: 'Radio communication',
            text: '<span class="calliope-block">radio send string</span> and <span class="calliope-block">on radio received</span> for exchanging messages.'
          },
          {
            level: 'create',
            title: 'Cooperative problem',
            text: 'Design in pairs: a challenge that can only be solved by cooperating. The hare spots fast, the tortoise navigates safely.'
          }
        ],

        extensions: [
          'Is there an animal between tortoise and hare?',
          'Invent a third animal with different parameters.'
        ]
      }
    ]
  }
};
