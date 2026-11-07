/* =============================================
   ENGLISH CONTENT — content-en.js
   9 chapters per path:
     Basics  (ch. 1–5)  → step-by-step guide
     Bonus 1 (ch. 6–7)  → task + a few hints
     Bonus 2 (ch. 8–9)  → task + at most one hint
   Every chapter has a Remember Box: a short explanation,
   ONE key sentence to copy and a flowchart (js/diagram.js).
   ============================================= */

window.CONTENT_EN = (function () {

  /* Helper: highlight a MakeCode block */
  const b = (t) => `<span class="calliope-block">${t}</span>`;

  /* ---------- Flowcharts (Basics show the task program) ---------- */
  const breathe = (ms) => [
    { a: 'show leds: big heart' },
    { a: `pause ${ms} ms`, t: 'wait' },
    { a: 'show leds: small heart' },
    { a: `pause ${ms} ms`, t: 'wait' }
  ];

  const D = {
    sequence: (ms, symbol) => [
      { event: 'on start', body: [
        { a: 'show leds: heart' },
        { a: `pause ${ms} ms`, t: 'wait' },
        { a: `show icon: ${symbol}` },
        { a: `pause ${ms} ms`, t: 'wait' },
        { a: 'clear screen' }
      ] }
    ],
    loop: (ms) => [
      { event: 'forever', loop: true, body: breathe(ms) }
    ],
    sensor: (ms, threshold) => [
      { event: 'forever', loop: true, body: [
        { if: `light level > ${threshold}`, then: breathe(ms), else: [{ a: 'show string "z"' }] }
      ] }
    ],
    buttons: (think) => {
      const react = (what) => [
        ...(think ? [{ a: 'pause 1000 ms (thinking)', t: 'wait' }] : []),
        { a: `show icon: ${what}` },
        { a: 'pause 500 ms', t: 'wait' },
        { a: 'clear screen' }
      ];
      return [
        { event: 'on button A pressed', body: react('joy') },
        { event: 'on button B pressed', body: react('eating') },
        { event: 'forever', loop: true, body: [{ a: 'breathe / sleep (as before)' }] }
      ];
    },
    motors: (speed) => [
      { event: 'forever', loop: true, body: [
        { if: 'light level > 10',
          then: [
            { if: 'distance (cm) > 5',
              then: [{ a: `Motor both forward Speed ${speed}`, t: 'motor' }, { a: 'breathing animation' }],
              else: [{ a: 'Motors both stop', t: 'motor' }] }
          ],
          else: [{ a: 'Motors both stop', t: 'motor' }, { a: 'show string "z"' }] }
      ] }
    ],
    /* Bonus: general examples, not the solution */
    events: (shake) => [
      { event: 'on pin P1 touched', body: [{ a: 'show icon: surprised' }] },
      { event: 'on shake', body: [{ a: shake }] },
      { event: 'forever', loop: true, body: [
        { if: 'sound level > 100', then: [{ a: 'motor: turn away', t: 'motor' }] }
      ] }
    ],
    variable: [
      { event: 'forever', loop: true, body: [
        { if: 'button A is pressed', then: [
          { a: 'set RGB LED to color red' },
          { a: 'change counter by 1', t: 'var' },
          { a: 'wait until button A released', t: 'wait' },
          { a: 'turn built-in RGB LED off' }
        ] },
        { if: 'button B is pressed', then: [{ a: 'show number counter' }] }
      ] },
      { event: 'on start', body: [{ a: 'set counter to 0', t: 'var' }] }
    ],
    andOr: [
      { event: 'forever', loop: true, body: [
        { if: 'light level > 50 AND distance (cm) > 10',
          then: [{ a: 'Motor both forward', t: 'motor' }],
          else: [{ a: 'Motors both stop', t: 'motor' }] }
      ] }
    ],
    parameter: (ms) => [
      { event: 'on start', body: [{ a: `set delay to ${ms}`, t: 'var' }] },
      { event: 'forever', loop: true, body: [
        { a: 'show leds: big heart' },
        { a: 'pause (delay) ms', t: 'wait' },
        { a: 'show leds: small heart' },
        { a: 'pause (delay) ms', t: 'wait' }
      ] }
    ]
  };

  /* ---------- Key sentences (same for both animals) ---------- */
  const M = {
    sequence: 'A <strong>sequence</strong> is a list of commands that the Calliope runs one after another, from top to bottom.',
    loop: 'Everything inside the <strong>forever</strong> block is repeated again and again. This is a <strong>forever loop</strong>.',
    sensor: 'A <strong>sensor</strong> measures something in the world (for example light) and gives the program a number. This is an <strong>input</strong>.',
    condition: 'With <strong>if … then</strong> the Calliope decides: only if the condition is true (for example button A is pressed), it runs these commands.',
    nested: 'A condition can sit inside another one (<strong>nested condition</strong>). The inner one is only checked if the outer one is true.',
    events: 'A program can react to many <strong>events</strong>. Each event gets its own block.',
    variable: 'A <strong>variable</strong> is a storage box with a name. In it, the Calliope remembers a value that can change.',
    andOr: 'With <strong>AND</strong>, both conditions must be true. With <strong>OR</strong>, it is enough if one is true.',
    algorithm: 'An <strong>algorithm</strong> is an exact plan of steps. With <strong>parameters</strong> (for example the pause length) I change how it behaves without changing the steps.'
  };

  /* ---------- Short explanations for the Remember Box ---------- */
  const C = {
    sequence: `<p>The Calliope runs your blocks <strong>in order</strong> – from top to bottom. If you swap two blocks, something different happens.</p>`,
    loop: `<p>What is in ${b('on start')} happens only once. What is in ${b('forever')} starts again from the top after the last block.</p>`,
    sensor: `<p>The light sensor gives a number from <strong>0</strong> (pitch dark) to <strong>255</strong> (very bright). With ${b('if … then … else')} your program checks this number.</p>`,
    condition: `<p>The block ${b('on button A pressed')} waits. Only <strong>if</strong> the button is pressed, <strong>then</strong> the commands inside run. The block ${b('if … then … else')} from Chapter 3 works the same way.</p>`,
    nested: `<p>The ultrasonic sensor measures distance in cm – like sonar. First the Calliope checks the light. Only if it is bright, it also checks the distance.</p>`,
    events: `<p>Your Calliope can wait for many things at the same time: buttons, touch, shaking. Each event starts its own block as soon as it happens.</p>`,
    variable: `<p>To remember something, the Calliope needs a <strong>variable</strong>: a drawer with a label that holds a number. The flowchart shows an example: a counter counts how often button A was pressed.</p>`,
    andOr: `<p>With ${b('… and …')} and ${b('… or …')} from <strong>Logic</strong> you join two conditions into one.</p>`,
    algorithm: `<p>The numbers in your program – pauses, speed, thresholds – are called <strong>parameters</strong>. Same steps, different parameters: a different character.</p>`
  };

  return {

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
      conceptTitle: 'Remember Box',
      merkeCopy: 'Copy this into your notebook:',
      diagramLabel: 'The program as a flowchart',
      diagramThen: 'then',
      diagramElse: 'else',
      guidedTaskTitle: 'Task',
      chapterLabel: 'Chapter',
      groupBasics: 'Basics',
      groupBonus1: 'Bonus 1',
      groupBonus2: 'Bonus 2',
      missionRequirements: 'Your program must be able to:',
      abilitiesIntro: 'Click an ability to learn more:',
      hintLabel: 'Hint',
      merkCheckTitle: 'Did you copy the key sentence into your notebook?',
      merkCheckText: 'The key sentence is in the Remember Box. Copy it before you go on.',
      merkCheckYes: 'Yes, continue ✓',
      merkCheckNo: 'No, show it to me',
      openMakeCode: 'Open MakeCode',
      openSimulator: 'Garden simulator',
      hardwareLabel: 'I have the required hardware (Calliope mini + motors + sensors)'
    },

    /* --- Chapter Data --- */
    chapters: {

      /* ==========================================
         HARE — 9 chapters
         ========================================== */
      hare: [

        /* ---- CHAPTER 1: AWAKENING (Sequence) — BASICS ---- */
        {
          id: 1,
          title: 'Awakening',
          conceptLabel: 'Sequence — Commands in Order',
          conceptShort: 'Sequence',
          image: 'img/chapters/hare/h1.png',
          narrative: `<p>A light blinks on a small board. It's a hare – not made of fur, but of light and electricity. It has just been switched on and wants to show: <em>Here I am!</em></p>`,
          problem: `<p>How can you make the Calliope mini show different LED pictures <strong>one after another</strong>?</p>`,
          concept: C.sequence,
          merksatz: M.sequence,
          diagram: D.sequence(500, 'arrow ↑'),
          guidedTask: {
            title: 'Your hare shows its first sign of life',
            steps: [
              { title: 'Open the editor',
                text: `Go to <a href="https://makecode.calliope.cc" target="_blank" rel="noopener">makecode.calliope.cc</a> and click <strong>New Project</strong>. Give it a name.` },
              { title: 'Show a heart',
                text: `Drag ${b('show leds')} from <strong>Basic</strong> into ${b('on start')}. Click the LEDs until you see a heart.` },
              { title: 'Add a pause',
                text: `Drag ${b('pause (ms)')} from <strong>Basic</strong> below it. Set it to <strong>500</strong> – the hare is fast!` },
              { title: 'Show an arrow',
                text: `Drag ${b('show icon')} below it and choose the arrow pointing up. Then add ${b('pause (ms) 500')} again.` },
              { title: 'Clear the display',
                text: `Drag ${b('clear screen')} to the very bottom.` },
              { title: 'Test your program',
                text: `Click ▶ in the simulator. First the heart, then the arrow, then everything is dark? That is your <strong>sequence</strong>!`,
                textHw: `Click <strong>Download</strong> and drag the file onto your Calliope mini. First the heart, then the arrow, then everything is dark? That is your <strong>sequence</strong>!` }
            ]
          }
        },

        /* ---- CHAPTER 2: BREATHING (Forever Loop) — BASICS ---- */
        {
          id: 2,
          title: 'Breathing',
          conceptLabel: 'Forever Loop — Repeating Again and Again',
          conceptShort: 'Forever Loop',
          image: 'img/chapters/hare/h2.png',
          narrative: `<p>Your hare showed itself – and then it went quiet. But living beings don't just stop. They breathe, again and again. And a hare breathes fast!</p>`,
          problem: `<p>How can you make your hare keep breathing <strong>forever</strong>?</p>`,
          concept: C.loop,
          merksatz: M.loop,
          diagram: D.loop(300),
          guidedTask: {
            title: 'The hare\'s heartbeat',
            steps: [
              { title: 'Open your project',
                text: 'Open your project from Chapter 1.' },
              { title: 'Find the forever block',
                text: `The block ${b('forever')} is already in the editor. Everything inside it repeats endlessly.` },
              { title: 'Show a big heart',
                text: `Drag ${b('show leds')} into ${b('forever')}. Draw a big heart.` },
              { title: 'Pause – breathe in',
                text: `Add ${b('pause (ms)')} and set it to <strong>300</strong>. The hare breathes fast!` },
              { title: 'Show a small heart',
                text: `Add another ${b('show leds')}. Draw a small heart – that is breathing out.` },
              { title: 'Pause – breathe out',
                text: `Add ${b('pause (ms) 300')} once more.` },
              { title: 'Watch',
                text: 'Start the simulator. Big, small, big, small … Your hare is breathing!',
                textHw: 'Download the program to your Calliope mini. Big, small, big, small … Your hare is breathing!' }
            ]
          }
        },

        /* ---- CHAPTER 3: PERCEIVING (Sensors) — BASICS ---- */
        {
          id: 3,
          title: 'Perceiving',
          conceptLabel: 'Inputs and Sensors',
          conceptShort: 'Sensors',
          image: 'img/chapters/hare/h3.png',
          narrative: `<p>Your hare breathes day and night. But real hares sleep when it is dark. Your Calliope has a <strong>light sensor</strong> – with it the hare can tell if it is bright or dark. Just a little light is enough for the hare.</p>`,
          problem: `<p>Your hare should only breathe when it is <strong>bright</strong>. In the dark it should sleep.</p>`,
          concept: C.sensor,
          merksatz: M.sensor,
          diagram: D.sensor(300, 50),
          guidedTask: {
            title: 'The hare sees the light',
            steps: [
              { title: 'Get to know the sensor',
                text: `Under <strong>Input</strong> you will find ${b('light level')}. This block gives you a number.` },
              { title: 'Show the light level',
                text: `Drag ${b('show number')} into ${b('forever')} and put ${b('light level')} inside it. Test: How does the number change?` },
              { title: 'Prepare a condition',
                text: `Take ${b('show number')} out again. Drag ${b('if … then … else')} from <strong>Logic</strong> into ${b('forever')}.` },
              { title: 'Set the threshold',
                text: `Build the condition ${b('light level > 50')}. You will find the comparison in <strong>Logic</strong>.` },
              { title: 'Add the awake animation',
                text: 'Move your breathing animation (big heart, pause, small heart, pause) into the <strong>then</strong> part.' },
              { title: 'Add sleep mode',
                text: `Put ${b('show string "z"')} into the <strong>else</strong> part. The hare is asleep.` },
              { title: 'Test with light and shadow',
                text: 'Set the light level low in the simulator → the hare sleeps. Set it high → it wakes up.',
                textHw: 'Download the program. Cover the sensor → the hare sleeps. Light on → it wakes up.' }
            ]
          }
        },

        /* ---- CHAPTER 4: DECIDING (If-Then) — BASICS ---- */
        {
          id: 4,
          title: 'Deciding',
          conceptLabel: 'Conditions — If-Then',
          conceptShort: 'If-Then',
          image: 'img/chapters/hare/h4.png',
          narrative: `<p>Your hare wakes up when it gets bright. Now it should react to you: <strong>Button A</strong> means petting, <strong>Button B</strong> means feeding. The hare reacts in a flash.</p>`,
          problem: `<p>Your hare should show something different when you pet it (A) than when you feed it (B) – and keep breathing in between.</p>`,
          concept: C.condition,
          merksatz: M.condition,
          diagram: D.buttons(false),
          guidedTask: {
            title: 'The hare learns to tell things apart',
            steps: [
              { title: 'Button A: petting',
                text: `Drag ${b('on button A pressed')} from <strong>Input</strong> to an empty spot.` },
              { title: 'Show joy',
                text: `How does your hare show joy? Put an LED picture or icon inside. Then ${b('pause (ms) 500')} and ${b('clear screen')}.` },
              { title: 'Button B: feeding',
                text: `Drag out another ${b('on button A pressed')} and change it to <strong>B</strong>.` },
              { title: 'Show eating',
                text: 'What does your hare show when it eats? Choose a different picture than for A. Pause and clear as before.' },
              { title: 'Keep breathing',
                text: `Your ${b('forever')} block stays as it is. This way the hare keeps breathing.` },
              { title: 'Test both buttons',
                text: 'Click A and B in the simulator. The hare is happy, eats – and keeps breathing in between.',
                textHw: 'Download the program and press A and B on your Calliope mini.' }
            ]
          }
        },

        /* ---- CHAPTER 5: MOVING (Motors + Ultrasonic) — BASICS ---- */
        {
          id: 5,
          title: 'Moving',
          conceptLabel: 'Motor Control and Ultrasonic Sensor',
          conceptShort: 'Motors',
          image: 'img/chapters/hare/h5.png',
          narrative: `<p>Your hare can breathe, see and react – but it sits still. With the <strong>Motion Kit</strong> it gets wheels and an <strong>ultrasonic sensor</strong> that measures distances.</p>`,
          problem: `<p>Your hare should start driving when it is bright – but stop when there is an obstacle in front of it.</p>`,
          concept: C.nested,
          merksatz: M.nested,
          diagram: D.motors(200),
          guidedTask: {
            title: 'The hare learns to move',
            steps: [
              { title: 'Add the MotionKit extension',
                text: 'Open your project. Click <strong>Extensions</strong> and choose <strong>MotionKit (V2)</strong>. The new blocks are in the <strong>MotionKit</strong> category. Not in the list? Paste the link <a href="https://github.com/tinysuperlab/MotionKitV2" target="_blank" rel="noopener">github.com/tinysuperlab/MotionKitV2</a> into the search box.' },
              { title: 'Change the light condition',
                text: `In ${b('forever')} you already have ${b('if light level > 50 then … else')}. Change the number to <strong>10</strong>.` },
              { title: 'Drive when it is bright',
                text: `Put ${b('Motor both Direction forward Speed 200')} from <strong>MotionKit</strong> into the <strong>then</strong> part, above your breathing animation.` },
              { title: 'Stop in the dark',
                text: `Put ${b('Motors both stop')} into the <strong>else</strong> part, next to your "z". Test: dark → the hare stops.` },
              { title: 'Add a second condition',
                text: `Drag a new ${b('if … then … else')} <strong>into the then part</strong>. Condition: ${b('Ultrasonic cm > 5')} (from <strong>MotionKit</strong>).` },
              { title: 'Sort the blocks',
                text: `Move ${b('Motor both … forward')} and the breathing animation into the <strong>inner then</strong>. Put ${b('Motors both stop')} into the <strong>inner else</strong>.` },
              { title: 'Test',
                text: 'Click <strong>Download</strong> and drag the .hex file into the <a href="simulator.html" target="_blank" rel="noopener">garden simulator</a>. Little light → it sleeps. Lots of light → it drives. Hedge in front → it stops.',
                textHw: 'Download the program to your Calliope. Light on → it drives. Hand in front of the sensor → it stops. Light off → it sleeps.' }
            ]
          }
        },

        /* ---- CHAPTER 6: MY ANIMAL (Events / Integration) — BONUS 1 ---- */
        {
          id: 6,
          title: 'My Animal',
          conceptLabel: 'Personality — Combining Events',
          conceptShort: 'Integration',
          image: 'img/chapters/hare/h6.png',
          narrative: `<p>Until now you followed instructions. Now you turn your hare into <em>your</em> animal. New senses are waiting for it: <strong>touch</strong>, <strong>shaking</strong> and <strong>sounds</strong>.</p>`,
          problem: `<p>How does your hare react when someone touches it, shakes it or shouts at it? You decide – to fit a fast, impatient hare.</p>`,
          concept: C.events,
          merksatz: M.events,
          diagram: D.events('show icon: dizzy'),
          guidedTask: {
            title: 'Give your hare a personality',
            goal: 'Choose new abilities and add them to your program. First plan in your notebook how your hare should react.',
            abilities: [
              { icon: '👆', title: 'Touch pins', short: 'The hare feels touch.',
                detail: `<p>Block: ${b('on pin P1 touched')} in <strong>Input</strong>.</p><p>Idea: touch on the left → the hare dodges to the right.</p>` },
              { icon: '📳', title: 'Shaking', short: 'The hare notices when it is shaken.',
                detail: `<p>Block: ${b('on shake')} in <strong>Input</strong>.</p><p>Idea: Does it get scared? Does it get dizzy? Does it jump for joy?</p>` },
              { icon: '🎤', title: 'Microphone', short: 'The hare hears how loud it is.',
                detail: `<p>Block: ${b('sound level')} in <strong>Input</strong> – a number, just like the light level.</p><p>Idea: If it gets too loud, it turns away with its motors.</p><p>Think: Where must the condition be so the Calliope checks it again and again?</p>` },
            ],
            requirements: [
              'At least <strong>two</strong> new abilities are added.',
              'You wrote it down in your notebook first: <em>event → reaction</em>.',
              'Every reaction fits your hare\'s character.',
              'Breathing, light, buttons and driving still work.',
              'Show your hare to someone: Can they tell its character?'
            ],
            hints: [
              `Put new event blocks on an empty spot – not inside ${b('forever')}.`
            ]
          }
        },

        /* ---- CHAPTER 7: FEELINGS (Variables) — BONUS 1 ---- */
        {
          id: 7,
          title: 'Feelings',
          conceptLabel: 'States and Variables',
          conceptShort: 'Variables',
          image: 'img/chapters/hare/h7.png',
          narrative: `<p>Real animals have feelings: hungry, full, tired. Your hare should remember how much it has eaten. It is impatient – it wants food all the time!</p>`,
          problem: `<p>Every time you feed your hare (button B), one more RGB LED lights up. When all <strong>3 LEDs</strong> are on, it is full.</p>`,
          concept: C.variable,
          merksatz: M.variable,
          diagram: D.variable,
          guidedTask: {
            title: 'The hare gets food',
            goal: 'Your hare remembers in a variable how full it is and shows it with the RGB LEDs.',
            requirements: [
              'There is a variable <code>food</code>. At the start it is 0 – no RGB LED is on.',
              'Button B increases <code>food</code> by 1. Then one more RGB LED lights up.',
              'At 3 it is enough: the hare stops eating and shows that it is full.'
            ],
            hints: [
              'You create variables under <strong>Variables</strong> → <strong>Make a Variable</strong>. You will find the RGB LEDs under <strong>RGB LED</strong>.',
              'To stop at 3, your program must check how big <code>food</code> is <em>before</em> feeding.'
            ]
          }
        },

        /* ---- CHAPTER 8: LEARNING (AND / OR) — BONUS 2 ---- */
        {
          id: 8,
          title: 'Learning',
          conceptLabel: 'Combining Several Conditions',
          conceptShort: 'AND / OR',
          image: 'img/chapters/hare/h8.png',
          narrative: `<p>Until now your hare decides by looking at one thing. Clever animals think about several things at once: <em>I am hungry <strong>and</strong> it is bright – so I look for food.</em></p>`,
          problem: `<p>Your hare should make decisions where it looks at <strong>two things</strong> at the same time.</p>`,
          concept: C.andOr,
          merksatz: M.andOr,
          diagram: D.andOr,
          guidedTask: {
            title: 'The hare thinks',
            goal: 'Your hare gets two feelings: <code>hunger</code> and <code>tiredness</code>. It uses them to decide what to do.',
            requirements: [
              'There are the variables <code>hunger</code> and <code>tiredness</code>. Both grow over time.',
              'If it is very hungry <strong>and</strong> it is bright, it looks for food: it starts driving.',
              'If it is very tired <strong>or</strong> it is dark, it sleeps: motors off.',
              'Otherwise it breathes normally.',
              'You can feed it and let it sleep – otherwise the values grow forever.',
              'You choose the thresholds yourself – to fit an impatient hare.'
            ],
            hints: [
              `The order matters: in ${b('if … then … else if …')} the first condition that is true wins.`
            ]
          }
        },

        /* ---- CHAPTER 9: ENCOUNTER (Algorithms) — BONUS 2 ---- */
        {
          id: 9,
          title: 'Encounter',
          conceptLabel: 'Algorithms and Parameters',
          conceptShort: 'Algorithms',
          image: 'img/chapters/hare/h9.png',
          narrative: `<p>Today your hare meets a tortoise. So slow – what can it do? But then the hare notices: it can do exactly the same things. Only its numbers are different.</p>`,
          problem: `<p>Hare and tortoise have almost the same program. What exactly is different – and can the two work together?</p>`,
          concept: C.algorithm,
          merksatz: M.algorithm,
          diagram: D.parameter(300),
          guidedTask: {
            title: 'Hare meets tortoise',
            goal: 'Work together with someone who programmed the tortoise.',
            requirements: [
              'Compare your programs. Write down which blocks are the same and which <strong>parameters</strong> are different.',
              'Swap the parameters: your hare gets the tortoise\'s values. How does it seem now?',
              'Connect your Calliopes with <strong>radio</strong>: the hare reports an obstacle, the tortoise answers.',
              'Think of a task that only works as a pair – and program it.'
            ],
            hints: [
              'Both Calliopes must be in the same <strong>radio group</strong>.'
            ]
          }
        }
      ],

      /* ==========================================
         TORTOISE — 9 chapters
         ========================================== */
      tortoise: [

        /* ---- CHAPTER 1: AWAKENING (Sequence) — BASICS ---- */
        {
          id: 1,
          title: 'Awakening',
          conceptLabel: 'Sequence — Commands in Order',
          conceptShort: 'Sequence',
          image: 'img/chapters/tortoise/t1.png',
          narrative: `<p>Something stirs on a small board. A tortoise wakes up – slowly, very slowly. It is never in a hurry. It doesn't need to be fast, it needs to be exact.</p>`,
          problem: `<p>How can you make the Calliope mini show different LED pictures <strong>one after another</strong>?</p>`,
          concept: C.sequence,
          merksatz: M.sequence,
          diagram: D.sequence(1500, 'diamond ◇'),
          guidedTask: {
            title: 'Your tortoise shows its first sign of life',
            steps: [
              { title: 'Open the editor',
                text: `Go to <a href="https://makecode.calliope.cc" target="_blank" rel="noopener">makecode.calliope.cc</a> and click <strong>New Project</strong>. Give it a name.` },
              { title: 'Show a heart',
                text: `Drag ${b('show leds')} from <strong>Basic</strong> into ${b('on start')}. Click the LEDs until you see a heart.` },
              { title: 'Add a pause',
                text: `Drag ${b('pause (ms)')} from <strong>Basic</strong> below it. Set it to <strong>1500</strong> – the tortoise takes its time.` },
              { title: 'Show an icon',
                text: `Drag ${b('show icon')} below it and choose the diamond (◇). Then add ${b('pause (ms) 1500')} again.` },
              { title: 'Clear the display',
                text: `Drag ${b('clear screen')} to the very bottom.` },
              { title: 'Test your program',
                text: `Click ▶ in the simulator. First the heart, then the diamond, then everything is dark? That is your <strong>sequence</strong>!`,
                textHw: `Click <strong>Download</strong> and drag the file onto your Calliope mini. First the heart, then the diamond, then everything is dark? That is your <strong>sequence</strong>!` }
            ]
          }
        },

        /* ---- CHAPTER 2: BREATHING (Forever Loop) — BASICS ---- */
        {
          id: 2,
          title: 'Breathing',
          conceptLabel: 'Forever Loop — Repeating Again and Again',
          conceptShort: 'Forever Loop',
          image: 'img/chapters/tortoise/t2.png',
          narrative: `<p>Your tortoise showed itself – and then it went quiet. But tortoises aren't stones. They breathe: slowly, deeply and on and on.</p>`,
          problem: `<p>How can you make your tortoise keep breathing <strong>forever</strong>?</p>`,
          concept: C.loop,
          merksatz: M.loop,
          diagram: D.loop(1500),
          guidedTask: {
            title: 'The tortoise\'s heartbeat',
            steps: [
              { title: 'Open your project',
                text: 'Open your project from Chapter 1.' },
              { title: 'Find the forever block',
                text: `The block ${b('forever')} is already in the editor. Everything inside it repeats endlessly.` },
              { title: 'Show a big heart',
                text: `Drag ${b('show leds')} into ${b('forever')}. Draw a big heart.` },
              { title: 'Pause – breathe in',
                text: `Add ${b('pause (ms)')} and set it to <strong>1500</strong>. The tortoise breathes slowly and deeply.` },
              { title: 'Show a small heart',
                text: `Add another ${b('show leds')}. Draw a small heart – that is breathing out.` },
              { title: 'Pause – breathe out',
                text: `Add ${b('pause (ms) 1500')} once more.` },
              { title: 'Watch',
                text: 'Start the simulator. Big … small … big … small … Your tortoise is breathing!',
                textHw: 'Download the program to your Calliope mini. Big … small … big … small … Your tortoise is breathing!' }
            ]
          }
        },

        /* ---- CHAPTER 3: PERCEIVING (Sensors) — BASICS ---- */
        {
          id: 3,
          title: 'Perceiving',
          conceptLabel: 'Inputs and Sensors',
          conceptShort: 'Sensors',
          image: 'img/chapters/tortoise/t3.png',
          narrative: `<p>Your tortoise breathes day and night. But real tortoises wait for the sun. Your Calliope has a <strong>light sensor</strong> – with it the tortoise can tell if it is bright. It only wakes up when it gets really bright.</p>`,
          problem: `<p>Your tortoise should only breathe when it is <strong>bright</strong>. In the dark it should rest.</p>`,
          concept: C.sensor,
          merksatz: M.sensor,
          diagram: D.sensor(1500, 120),
          guidedTask: {
            title: 'The tortoise feels the sun',
            steps: [
              { title: 'Get to know the sensor',
                text: `Under <strong>Input</strong> you will find ${b('light level')}. This block gives you a number.` },
              { title: 'Show the light level',
                text: `Drag ${b('show number')} into ${b('forever')} and put ${b('light level')} inside it. Test: How does the number change?` },
              { title: 'Prepare a condition',
                text: `Take ${b('show number')} out again. Drag ${b('if … then … else')} from <strong>Logic</strong> into ${b('forever')}.` },
              { title: 'Set the threshold',
                text: `Build the condition ${b('light level > 120')}. You will find the comparison in <strong>Logic</strong>.` },
              { title: 'Add the awake animation',
                text: 'Move your breathing animation (big heart, pause, small heart, pause) into the <strong>then</strong> part.' },
              { title: 'Add rest mode',
                text: `Put ${b('show string "z"')} into the <strong>else</strong> part. The tortoise is resting.` },
              { title: 'Test with light and shadow',
                text: 'Set the light level low in the simulator → the tortoise rests. Set it high → it wakes up.',
                textHw: 'Download the program. Cover the sensor → the tortoise rests. Lots of light → it wakes up.' }
            ]
          }
        },

        /* ---- CHAPTER 4: DECIDING (If-Then) — BASICS ---- */
        {
          id: 4,
          title: 'Deciding',
          conceptLabel: 'Conditions — If-Then',
          conceptShort: 'If-Then',
          image: 'img/chapters/tortoise/t4.png',
          narrative: `<p>Your tortoise wakes up when the sun shines. Now it should react to you: <strong>Button A</strong> means petting, <strong>Button B</strong> means feeding. The tortoise thinks for a moment first – then it answers.</p>`,
          problem: `<p>Your tortoise should show something different when you pet it (A) than when you feed it (B) – and keep breathing in between.</p>`,
          concept: C.condition,
          merksatz: M.condition,
          diagram: D.buttons(true),
          guidedTask: {
            title: 'The tortoise learns to tell things apart',
            steps: [
              { title: 'Button A: petting',
                text: `Drag ${b('on button A pressed')} from <strong>Input</strong> to an empty spot.` },
              { title: 'Thoughtful joy',
                text: `First it thinks: ${b('pause (ms) 1000')}. Then an LED picture for joy, ${b('pause (ms) 500')} and ${b('clear screen')}.` },
              { title: 'Button B: feeding',
                text: `Drag out another ${b('on button A pressed')} and change it to <strong>B</strong>.` },
              { title: 'Show eating',
                text: 'Here, too, it thinks first. Then choose a different picture than for A. Pause and clear as before.' },
              { title: 'Keep breathing',
                text: `Your ${b('forever')} block stays as it is. This way the tortoise keeps breathing.` },
              { title: 'Test both buttons',
                text: 'Click A and B in the simulator. It thinks, is happy, eats – and keeps breathing in between.',
                textHw: 'Download the program and press A and B on your Calliope mini.' }
            ]
          }
        },

        /* ---- CHAPTER 5: MOVING (Motors + Ultrasonic) — BASICS ---- */
        {
          id: 5,
          title: 'Moving',
          conceptLabel: 'Motor Control and Ultrasonic Sensor',
          conceptShort: 'Motors',
          image: 'img/chapters/tortoise/t5.png',
          narrative: `<p>Your tortoise can breathe, see and react – but it sits still. With the <strong>Motion Kit</strong> it gets wheels and an <strong>ultrasonic sensor</strong> that measures distances. Slow, but unstoppable!</p>`,
          problem: `<p>Your tortoise should start driving when it is bright – but stop when there is an obstacle in front of it.</p>`,
          concept: C.nested,
          merksatz: M.nested,
          diagram: D.motors(80),
          guidedTask: {
            title: 'The tortoise learns to move',
            steps: [
              { title: 'Add the MotionKit extension',
                text: 'Open your project. Click <strong>Extensions</strong> and choose <strong>MotionKit (V2)</strong>. The new blocks are in the <strong>MotionKit</strong> category. Not in the list? Paste the link <a href="https://github.com/tinysuperlab/MotionKitV2" target="_blank" rel="noopener">github.com/tinysuperlab/MotionKitV2</a> into the search box.' },
              { title: 'Change the light condition',
                text: `In ${b('forever')} you already have ${b('if light level > 120 then … else')}. Change the number to <strong>10</strong>.` },
              { title: 'Drive when it is bright',
                text: `Put ${b('Motor both Direction forward Speed 80')} from <strong>MotionKit</strong> into the <strong>then</strong> part, above your breathing animation.` },
              { title: 'Stop in the dark',
                text: `Put ${b('Motors both stop')} into the <strong>else</strong> part, next to your "z". Test: dark → the tortoise stops.` },
              { title: 'Add a second condition',
                text: `Drag a new ${b('if … then … else')} <strong>into the then part</strong>. Condition: ${b('Ultrasonic cm > 5')} (from <strong>MotionKit</strong>).` },
              { title: 'Sort the blocks',
                text: `Move ${b('Motor both … forward')} and the breathing animation into the <strong>inner then</strong>. Put ${b('Motors both stop')} into the <strong>inner else</strong>.` },
              { title: 'Test',
                text: 'Click <strong>Download</strong> and drag the .hex file into the <a href="simulator.html" target="_blank" rel="noopener">garden simulator</a>. Little light → it rests. Lots of light → it drives. Hedge in front → it stops.',
                textHw: 'Download the program to your Calliope. Light on → it drives. Hand in front of the sensor → it stops. Light off → it rests.' }
            ]
          }
        },

        /* ---- CHAPTER 6: MY ANIMAL (Events / Integration) — BONUS 1 ---- */
        {
          id: 6,
          title: 'My Animal',
          conceptLabel: 'Personality — Combining Events',
          conceptShort: 'Integration',
          image: 'img/chapters/tortoise/t6.png',
          narrative: `<p>Until now you followed instructions. Now you turn your tortoise into <em>your</em> animal. New senses are waiting for it: <strong>touch</strong>, <strong>shaking</strong> and <strong>sounds</strong>.</p>`,
          problem: `<p>How does your tortoise react when someone touches it, shakes it or shouts at it? You decide – to fit a calm, thoughtful tortoise.</p>`,
          concept: C.events,
          merksatz: M.events,
          diagram: D.events('show icon: dizzy'),
          guidedTask: {
            title: 'Give your tortoise a personality',
            goal: 'Choose new abilities and add them to your program. First plan in your notebook how your tortoise should react.',
            abilities: [
              { icon: '👆', title: 'Touch pins', short: 'The tortoise feels touch.',
                detail: `<p>Block: ${b('on pin P1 touched')} in <strong>Input</strong>.</p><p>Idea: touch on the left → it gently steers to the right.</p>` },
              { icon: '📳', title: 'Shaking', short: 'The tortoise notices when it is shaken.',
                detail: `<p>Block: ${b('on shake')} in <strong>Input</strong>.</p><p>Idea: Does it pull back into its shell? Does it wait until everything is calm again?</p>` },
              { icon: '🎤', title: 'Microphone', short: 'The tortoise hears how loud it is.',
                detail: `<p>Block: ${b('sound level')} in <strong>Input</strong> – a number, just like the light level.</p><p>Idea: If it gets too loud, it stops in fright.</p><p>Think: Where must the condition be so the Calliope checks it again and again?</p>` },
            ],
            requirements: [
              'At least <strong>two</strong> new abilities are added.',
              'You wrote it down in your notebook first: <em>event → reaction</em>.',
              'Every reaction fits your tortoise\'s character.',
              'Breathing, light, buttons and driving still work.',
              'Show your tortoise to someone: Can they tell its character?'
            ],
            hints: [
              `Put new event blocks on an empty spot – not inside ${b('forever')}.`
            ]
          }
        },

        /* ---- CHAPTER 7: FEELINGS (Variables) — BONUS 1 ---- */
        {
          id: 7,
          title: 'Feelings',
          conceptLabel: 'States and Variables',
          conceptShort: 'Variables',
          image: 'img/chapters/tortoise/t7.png',
          narrative: `<p>Real animals have feelings: hungry, full, tired. Your tortoise should remember how much it has eaten. It doesn't need much – but you must not forget it.</p>`,
          problem: `<p>Every time you feed your tortoise (button B), one more RGB LED lights up. When all <strong>3 LEDs</strong> are on, it is full.</p>`,
          concept: C.variable,
          merksatz: M.variable,
          diagram: D.variable,
          guidedTask: {
            title: 'The tortoise gets food',
            goal: 'Your tortoise remembers in a variable how full it is and shows it with the RGB LEDs.',
            requirements: [
              'There is a variable <code>food</code>. At the start it is 0 – no RGB LED is on.',
              'Button B increases <code>food</code> by 1. Then one more RGB LED lights up.',
              'At 3 it is enough: the tortoise stops eating and shows that it is full.'
            ],
            hints: [
              'You create variables under <strong>Variables</strong> → <strong>Make a Variable</strong>. You will find the RGB LEDs under <strong>RGB LED</strong>.',
              'To stop at 3, your program must check how big <code>food</code> is <em>before</em> feeding.'
            ]
          }
        },

        /* ---- CHAPTER 8: LEARNING (AND / OR) — BONUS 2 ---- */
        {
          id: 8,
          title: 'Learning',
          conceptLabel: 'Combining Several Conditions',
          conceptShort: 'AND / OR',
          image: 'img/chapters/tortoise/t8.png',
          narrative: `<p>Until now your tortoise decides by looking at one thing. Wise animals weigh up several things: <em>I am hungry <strong>and</strong> the sun is shining – so I look for food.</em></p>`,
          problem: `<p>Your tortoise should make decisions where it looks at <strong>two things</strong> at the same time.</p>`,
          concept: C.andOr,
          merksatz: M.andOr,
          diagram: D.andOr,
          guidedTask: {
            title: 'The tortoise weighs things up',
            goal: 'Your tortoise gets two feelings: <code>hunger</code> and <code>tiredness</code>. It uses them to decide what to do.',
            requirements: [
              'There are the variables <code>hunger</code> and <code>tiredness</code>. Both grow over time.',
              'If it is very hungry <strong>and</strong> it is bright, it looks for food: it slowly starts driving.',
              'If it is very tired <strong>or</strong> it is dark, it rests: motors off.',
              'Otherwise it breathes normally.',
              'You can feed it and let it rest – otherwise the values grow forever.',
              'You choose the thresholds yourself – to fit a patient tortoise.'
            ],
            hints: [
              `The order matters: in ${b('if … then … else if …')} the first condition that is true wins.`
            ]
          }
        },

        /* ---- CHAPTER 9: ENCOUNTER (Algorithms) — BONUS 2 ---- */
        {
          id: 9,
          title: 'Encounter',
          conceptLabel: 'Algorithms and Parameters',
          conceptShort: 'Algorithms',
          image: 'img/chapters/tortoise/t9.png',
          narrative: `<p>Today your tortoise meets a hare. So hectic – what is that about? But then the tortoise notices: it can do exactly the same things. Only its numbers are different.</p>`,
          problem: `<p>Tortoise and hare have almost the same program. What exactly is different – and can the two work together?</p>`,
          concept: C.algorithm,
          merksatz: M.algorithm,
          diagram: D.parameter(1500),
          guidedTask: {
            title: 'Tortoise meets hare',
            goal: 'Work together with someone who programmed the hare.',
            requirements: [
              'Compare your programs. Write down which blocks are the same and which <strong>parameters</strong> are different.',
              'Swap the parameters: your tortoise gets the hare\'s values. How does it seem now?',
              'Connect your Calliopes with <strong>radio</strong>: the hare reports an obstacle, the tortoise answers.',
              'Think of a task that only works as a pair – and program it.'
            ],
            hints: [
              'Both Calliopes must be in the same <strong>radio group</strong>.'
            ]
          }
        }
      ]
    }
  };
})();
