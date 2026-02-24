/* =============================================
   HASE & SCHILDKRÖTE — Main Application Logic
   app.js  (v2 — 9 chapters, hardware mode, bonus chapters)
   ============================================= */

(function () {
  'use strict';

  const TOTAL_CHAPTERS = 9;     // 6 core + 3 bonus
  const CORE_CHAPTERS  = 6;     // chapters 1-6 are core

  /* --- State --- */
  const state = {
    lang: 'de',
    path: null,       // 'hare' or 'tortoise'
    chapter: 0,       // 0-indexed
    lrs: false,
    python: false,
    hardware: false,
    completedChapters: new Set()
  };

  /* --- Content Lookup --- */
  const contentMap = {
    de: window.CONTENT_DE,
    en: window.CONTENT_EN,
    uk: window.CONTENT_UK,
    fr: window.CONTENT_FR,
    es: window.CONTENT_ES
  };

  function getContent() {
    return contentMap[state.lang] || contentMap.de;
  }

  function getUI() {
    return getContent().ui;
  }

  /* Get full chapter data, falling back to DE/EN for languages without full content */
  function getChapterData(index) {
    const content = getContent();
    const path = state.path;
    const chapters = content.chapters && content.chapters[path];

    if (chapters && chapters[index] && chapters[index].narrative) {
      return chapters[index];
    }

    // Fallback: use DE content with translated title/concept from current language
    const fallbackContent = contentMap.de;
    const fallbackChapter = fallbackContent.chapters[path][index];
    const translatedChapter = chapters && chapters[index];

    if (translatedChapter) {
      return {
        ...fallbackChapter,
        title: translatedChapter.title || fallbackChapter.title,
        conceptLabel: translatedChapter.conceptLabel || fallbackChapter.conceptLabel
      };
    }

    return fallbackChapter;
  }

  /* --- DOM References --- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    topBar: $('#topBar'),
    landing: $('#landing'),
    readingView: $('#readingView'),
    sidebar: $('#sidebar'),
    sidebarToggle: $('#sidebarToggle'),
    sidebarAnimalImg: $('#sidebarAnimalImg'),
    sidebarAnimalName: $('#sidebarAnimalName'),
    chapterList: $('#chapterList'),
    chapterContent: $('#chapterContent'),
    chapterImage: $('#chapterImg'),
    chapterNumber: $('#chapterNumber'),
    chapterTitle: $('#chapterTitle'),
    chapterConcept: $('#chapterConcept'),
    narrativeText: $('#narrativeText'),
    problemText: $('#problemText'),
    conceptText: $('#conceptText'),
    guidedTaskContent: $('#guidedTaskContent'),
    openTasksContent: $('#openTasksContent'),
    extensionContent: $('#extensionContent'),
    progressFill: $('#progressFill'),
    progressText: $('#progressText'),
    btnPrevChapter: $('#btnPrevChapter'),
    btnNextChapter: $('#btnNextChapter'),
    btnBackToSelection: $('#btnBackToSelection'),
    btnLRS: $('#btnLRS'),
    btnPython: $('#btnPython'),
    hardwareCheckbox: $('#hardwareCheckbox')
  };

  /* --- Initialize --- */
  function init() {
    loadState();
    bindEvents();
    applyLanguage();

    // Restore hardware toggle visual state
    if (els.hardwareCheckbox) {
      els.hardwareCheckbox.checked = state.hardware;
    }

    if (state.path) {
      showReadingView();
      renderChapter();
    } else {
      showLanding();
    }
  }

  /* --- State Persistence --- */
  function saveState() {
    try {
      localStorage.setItem('ht-state', JSON.stringify({
        lang: state.lang,
        path: state.path,
        chapter: state.chapter,
        lrs: state.lrs,
        python: state.python,
        hardware: state.hardware,
        completed: [...state.completedChapters]
      }));
    } catch (e) { /* ignore */ }
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem('ht-state'));
      if (saved) {
        state.lang = saved.lang || 'de';
        state.path = saved.path || null;
        state.chapter = saved.chapter || 0;
        state.lrs = saved.lrs || false;
        state.python = saved.python || false;
        state.hardware = saved.hardware || false;
        state.completedChapters = new Set(saved.completed || []);
      }
    } catch (e) { /* ignore */ }
  }

  /* --- Events --- */
  function bindEvents() {
    // Story selection
    $('#chooseHare').addEventListener('click', () => selectStory('hare'));
    $('#chooseTortoise').addEventListener('click', () => selectStory('tortoise'));

    // Language selector
    $$('.btn-lang').forEach(btn => {
      btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });

    // LRS toggle
    els.btnLRS.addEventListener('click', toggleLRS);

    // Python toggle
    if (els.btnPython) {
      els.btnPython.addEventListener('click', togglePython);
    }

    // Hardware toggle
    if (els.hardwareCheckbox) {
      els.hardwareCheckbox.addEventListener('change', () => {
        state.hardware = els.hardwareCheckbox.checked;
        saveState();
        if (state.path) {
          renderChapter();
        }
      });
    }

    // Sidebar toggle (mobile)
    els.sidebarToggle.addEventListener('click', () => {
      els.sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking content on mobile
    els.chapterContent.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        els.sidebar.classList.remove('open');
      }
    });

    // Back to story selection
    els.btnBackToSelection.addEventListener('click', () => {
      state.path = null;
      saveState();
      showLanding();
    });

    // Chapter navigation
    els.btnPrevChapter.addEventListener('click', () => navigateChapter(-1));
    els.btnNextChapter.addEventListener('click', () => navigateChapter(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!state.path) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          navigateChapter(1);
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          navigateChapter(-1);
        }
      }
    });
  }

  /* --- Story Selection --- */
  function selectStory(path) {
    state.path = path;
    state.chapter = 0;
    document.documentElement.setAttribute('data-theme', path);
    saveState();
    showReadingView();
    renderChapter();
  }

  /* --- Language --- */
  function switchLanguage(lang) {
    state.lang = lang;
    document.documentElement.setAttribute('lang', lang);

    $$('.btn-lang').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    applyLanguage();
    saveState();

    if (state.path) {
      renderSidebar();
      renderChapter();
    }
  }

  function applyLanguage() {
    const ui = getUI();
    document.documentElement.setAttribute('lang', state.lang);

    // Update all data-i18n elements
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (ui[key]) {
        el.innerHTML = ui[key];
      }
    });

    // Active language button
    $$('.btn-lang').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });

    // LRS state
    if (state.lrs) {
      document.documentElement.setAttribute('data-lrs', 'true');
      els.btnLRS.classList.add('active');
    }

    // Python state
    if (state.python) {
      document.documentElement.setAttribute('data-python', 'true');
      if (els.btnPython) els.btnPython.classList.add('active');
    }
  }

  /* --- LRS --- */
  function toggleLRS() {
    state.lrs = !state.lrs;
    document.documentElement.setAttribute('data-lrs', state.lrs.toString());
    els.btnLRS.classList.toggle('active', state.lrs);
    saveState();
  }

  /* --- Python Mode --- */
  function togglePython() {
    state.python = !state.python;
    document.documentElement.setAttribute('data-python', state.python.toString());
    els.btnPython.classList.toggle('active', state.python);
    saveState();
    if (state.path) {
      renderChapter();
    }
  }

  /* --- Views --- */
  function showLanding() {
    document.documentElement.setAttribute('data-theme', 'neutral');
    els.landing.hidden = false;
    els.readingView.hidden = true;
    updateProgress();
  }

  function showReadingView() {
    document.documentElement.setAttribute('data-theme', state.path);
    els.landing.hidden = true;
    els.readingView.hidden = false;
    renderSidebar();
    updateProgress();
  }

  /* --- Sidebar --- */
  function renderSidebar() {
    const ui = getUI();
    const content = getContent();
    const path = state.path;

    // Animal info
    const isHare = path === 'hare';
    els.sidebarAnimalImg.src = isHare ? 'img/hare-select.png' : 'img/tortoise-select.png';
    els.sidebarAnimalImg.alt = isHare ? ui.hareName : ui.tortoiseName;
    els.sidebarAnimalName.textContent = isHare ? ui.hareName : ui.tortoiseName;

    // Chapter list
    const chapters = content.chapters[path];
    els.chapterList.innerHTML = '';

    for (let i = 0; i < TOTAL_CHAPTERS; i++) {
      const ch = chapters[i];
      if (!ch) continue;

      // Add bonus divider before first bonus chapter
      if (i === CORE_CHAPTERS) {
        const divider = document.createElement('li');
        divider.className = 'bonus-divider';
        divider.textContent = ui.bonusLabel || 'Bonus';
        els.chapterList.appendChild(divider);
      }

      const li = document.createElement('li');
      li.className = 'chapter-list__item';

      const link = document.createElement('a');
      link.className = 'chapter-list__link';
      if (i === state.chapter) link.classList.add('active');
      if (state.completedChapters.has(`${path}-${i}`)) link.classList.add('completed');
      if (ch.bonus) link.classList.add('bonus');
      link.href = '#';
      link.setAttribute('role', 'button');
      link.setAttribute('aria-current', i === state.chapter ? 'true' : 'false');

      // Show concept keyword in parentheses in the sidebar
      const conceptShort = ch.conceptShort || '';
      const conceptHtml = conceptShort ? `<span class="chapter-list__concept">(${conceptShort})</span>` : '';

      link.innerHTML = `
        <span class="chapter-list__number">${i + 1}</span>
        <span class="chapter-list__title">${ch.title}${conceptHtml}</span>
      `;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        goToChapter(i);
        if (window.innerWidth <= 1024) {
          els.sidebar.classList.remove('open');
        }
      });

      li.appendChild(link);
      els.chapterList.appendChild(li);
    }
  }

  /* --- Chapter Rendering --- */
  function renderChapter() {
    const ui = getUI();
    const chapter = getChapterData(state.chapter);

    if (!chapter) return;

    // Scroll to top
    els.chapterContent.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Header
    els.chapterImage.src = chapter.image || `img/chapters/ch${chapter.id}-default.svg`;
    els.chapterImage.alt = chapter.title;
    els.chapterNumber.textContent = `${ui.chapterLabel} ${chapter.id}`;
    els.chapterTitle.textContent = chapter.title;
    els.chapterConcept.textContent = chapter.conceptLabel;

    // Bonus badge
    if (chapter.bonus) {
      els.chapterConcept.innerHTML = chapter.conceptLabel + ' <span class="bonus-badge">' + (ui.bonusLabel || 'Bonus') + '</span>';
    }

    // Narrative
    els.narrativeText.innerHTML = chapter.narrative || '<p><em>Inhalt wird geladen...</em></p>';

    // Problem
    els.problemText.innerHTML = chapter.problem || '';

    // Concept
    els.conceptText.innerHTML = chapter.concept || '';

    // Python concept supplement
    const pyData = getPythonData(state.chapter);
    if (state.python && pyData && pyData.concept) {
      els.conceptText.innerHTML += renderPythonBlock(pyData.concept);
    }

    // Python narrative supplement (appears after narrative)
    if (state.python && pyData && pyData.narrative) {
      els.narrativeText.innerHTML += renderPythonBlock(pyData.narrative);
    }

    // Guided Task (with hardware mode support)
    renderGuidedTask(chapter.guidedTask, ui);

    // Open Tasks
    renderOpenTasks(chapter.openTasks, ui);

    // Extensions
    renderExtensions(chapter.extensions);

    // Navigation buttons
    const maxIndex = TOTAL_CHAPTERS - 1;
    els.btnPrevChapter.hidden = state.chapter === 0;
    els.btnNextChapter.hidden = state.chapter >= maxIndex;

    // Update sidebar active state
    $$('.chapter-list__link').forEach((link, i) => {
      link.classList.toggle('active', i === state.chapter);
      link.setAttribute('aria-current', i === state.chapter ? 'true' : 'false');
    });

    // Mark current chapter as completed when viewed
    state.completedChapters.add(`${state.path}-${state.chapter}`);
    updateProgress();
    saveState();

    // Animation
    els.chapterContent.style.animation = 'none';
    els.chapterContent.offsetHeight; // force reflow
    els.chapterContent.style.animation = 'fadeIn 0.5s ease';
  }

  function renderGuidedTask(task, ui) {
    if (!task || !task.steps) {
      els.guidedTaskContent.innerHTML = '<p><em>Aufgabe wird geladen...</em></p>';
      return;
    }

    const pyData = getPythonData(state.chapter);

    let html = `<h3 style="margin-bottom: 1rem; font-family: var(--font-serif);">${task.title}</h3>`;

    task.steps.forEach((step, i) => {
      // Pick text based on hardware mode
      const text = (state.hardware && step.textHw) ? step.textHw : step.text;
      // Python alternative for this step
      const pyStep = (state.python && pyData && pyData.steps && pyData.steps[i])
        ? renderPythonBlock(pyData.steps[i]) : '';

      html += `
        <div class="task-step">
          <span class="task-step__number">${i + 1}</span>
          <div class="task-step__content">
            <h4>${step.title}</h4>
            <p>${text}</p>
            ${pyStep}
            <label class="task-step__check">
              <input type="checkbox"> ${ui.checkDone || 'Erledigt'}
            </label>
          </div>
        </div>
      `;
    });

    // Python full guided task block
    if (state.python && pyData && pyData.fullTask) {
      html += renderPythonBlock(pyData.fullTask);
    }

    els.guidedTaskContent.innerHTML = html;
  }

  /* --- Python Data Lookup --- */
  function getPythonData(chapterIndex) {
    if (!state.python || !state.path) return null;
    const pyContent = window.PYTHON_CONTENT;
    if (!pyContent) return null;
    const langData = pyContent[state.lang] || pyContent.de;
    if (!langData) return null;
    const pathData = langData[state.path];
    if (!pathData) return null;
    return pathData[chapterIndex] || null;
  }

  /* --- Python Block Renderer --- */
  function renderPythonBlock(pyContent) {
    if (!pyContent) return '';

    const header = `<div class="python-section__header">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD43B" stroke-width="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
      Python / MakeCode
    </div>`;

    let body = '';

    if (typeof pyContent === 'string') {
      body = `<div class="python-section__explanation">${pyContent}</div>`;
    } else if (typeof pyContent === 'object') {
      if (pyContent.explanation) {
        body += `<div class="python-section__explanation">${pyContent.explanation}</div>`;
      }
      if (pyContent.code) {
        body += `<pre><code>${escapeHtml(pyContent.code)}</code></pre>`;
      }
      if (pyContent.tip) {
        body += `<div class="python-section__tip"><strong>💡 Tipp:</strong> ${pyContent.tip}</div>`;
      }
    }

    return `<div class="python-section">${header}${body}</div>`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderOpenTasks(tasks, ui) {
    if (!tasks || tasks.length === 0) {
      els.openTasksContent.innerHTML = '';
      return;
    }

    let html = '';
    tasks.forEach(task => {
      const levelClass = task.level === 'guided' ? 'task-level--guided'
        : task.level === 'explore' ? 'task-level--explore'
        : 'task-level--create';
      const levelLabel = task.level === 'guided' ? (ui.taskLevelGuided || 'Klickanleitung')
        : task.level === 'explore' ? (ui.taskLevelExplore || 'Erkunden')
        : (ui.taskLevelCreate || 'Gestalten');

      html += `
        <div class="task-card">
          <span class="task-level ${levelClass}">${levelLabel}</span>
          <h4>${task.title}</h4>
          <p>${task.text}</p>
        </div>
      `;
    });

    els.openTasksContent.innerHTML = html;
  }

  function renderExtensions(extensions) {
    if (!extensions || extensions.length === 0) {
      els.extensionContent.innerHTML = '';
      return;
    }

    let html = '';
    extensions.forEach(ext => {
      html += `<div class="extension-item">${ext}</div>`;
    });

    els.extensionContent.innerHTML = html;
  }

  /* --- Navigation --- */
  function goToChapter(index) {
    if (index < 0 || index >= TOTAL_CHAPTERS) return;
    state.chapter = index;
    saveState();
    renderChapter();
    renderSidebar();
  }

  function navigateChapter(delta) {
    const next = state.chapter + delta;
    if (next >= 0 && next < TOTAL_CHAPTERS) {
      goToChapter(next);
    }
  }

  /* --- Progress --- */
  function updateProgress() {
    if (!state.path) {
      els.progressFill.style.width = '0%';
      els.progressText.textContent = `0 / ${TOTAL_CHAPTERS}`;
      return;
    }

    let completed = 0;
    for (let i = 0; i < TOTAL_CHAPTERS; i++) {
      if (state.completedChapters.has(`${state.path}-${i}`)) {
        completed++;
      }
    }

    const percent = Math.round((completed / TOTAL_CHAPTERS) * 100);
    els.progressFill.style.width = `${percent}%`;
    els.progressText.textContent = `${completed} / ${TOTAL_CHAPTERS}`;
  }

  /* --- Start --- */
  document.addEventListener('DOMContentLoaded', init);

})();
