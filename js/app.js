/* =============================================
   HASE & SCHILDKRÖTE — Main Application Logic
   app.js  (v3 — Grundlagen / Bonus 1 / Bonus 2, Merke-Kiste, Diagramme)
   ============================================= */

(function () {
  'use strict';

  const TOTAL_CHAPTERS = 9;

  /* Kapitel-Gruppen: 1–5 Grundlagen, 6–7 Bonus 1, 8–9 Bonus 2 (0-indiziert) */
  const GROUPS = [
    { key: 'groupBasics', from: 0, to: 4, bonus: false },
    { key: 'groupBonus1', from: 5, to: 6, bonus: true },
    { key: 'groupBonus2', from: 7, to: 8, bonus: true }
  ];

  /* Kapitel, bei denen vor dem Weiterblättern nach dem Merksatz gefragt wird */
  const MERK_CHECK_CHAPTERS = [0, 1];

  function getGroup(index) {
    return GROUPS.find(g => index >= g.from && index <= g.to) || GROUPS[0];
  }

  /* --- State --- */
  const state = {
    lang: 'de',
    path: null,       // 'hare' or 'tortoise'
    chapter: 0,       // 0-indexed
    lrs: false,
    python: false,
    hardware: false
  };

  /* Merksatz bestätigt? Nur im Arbeitsspeicher — nach Neuladen wird wieder gefragt */
  const merkConfirmed = new Set();

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
    sectionConcept: $('#sectionConcept'),
    merkModal: $('#merkModal'),
    merkYes: $('#merkYes'),
    merkNo: $('#merkNo'),
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
        hardware: state.hardware
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

    // Merksatz-Checker
    els.merkYes.addEventListener('click', confirmMerk);
    els.merkNo.addEventListener('click', declineMerk);
    els.merkModal.addEventListener('click', (e) => {
      if (e.target === els.merkModal) declineMerk();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!els.merkModal.hidden) {
        if (e.key === 'Escape') declineMerk();
        return;
      }
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

      // Gruppen-Überschrift vor dem ersten Kapitel jeder Gruppe
      const group = getGroup(i);
      if (i === group.from) {
        const divider = document.createElement('li');
        divider.className = 'bonus-divider' + (group.bonus ? '' : ' bonus-divider--basics');
        divider.textContent = ui[group.key] || group.key;
        els.chapterList.appendChild(divider);
      }

      const li = document.createElement('li');
      li.className = 'chapter-list__item';

      const link = document.createElement('a');
      link.className = 'chapter-list__link';
      if (i === state.chapter) link.classList.add('active');
      if (group.bonus) link.classList.add('bonus');
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

    // Gruppen-Badge (Bonus 1 / Bonus 2)
    const group = getGroup(state.chapter);
    if (group.bonus) {
      els.chapterConcept.innerHTML = chapter.conceptLabel + ' <span class="bonus-badge">' + (ui[group.key] || 'Bonus') + '</span>';
    }

    // Narrative
    els.narrativeText.innerHTML = chapter.narrative || '<p><em>Inhalt wird geladen...</em></p>';

    // Problem
    els.problemText.innerHTML = chapter.problem || '';

    // Merke-Kiste: kurze Erklärung → Merksatz → Ablaufdiagramm
    els.conceptText.innerHTML = renderConcept(chapter, ui);

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

    // Navigation buttons
    const maxIndex = TOTAL_CHAPTERS - 1;
    els.btnPrevChapter.hidden = state.chapter === 0;
    els.btnNextChapter.hidden = state.chapter >= maxIndex;

    // Update sidebar active state
    $$('.chapter-list__link').forEach((link, i) => {
      link.classList.toggle('active', i === state.chapter);
      link.setAttribute('aria-current', i === state.chapter ? 'true' : 'false');
    });

    updateProgress();
    saveState();

    // Animation
    els.chapterContent.style.animation = 'none';
    els.chapterContent.offsetHeight; // force reflow
    els.chapterContent.style.animation = 'fadeIn 0.5s ease';
  }

  /* --- Merke-Kiste --- */
  function renderConcept(chapter, ui) {
    let html = chapter.concept || '';

    if (chapter.merksatz) {
      html += `
        <div class="merksatz" id="merksatzBox">
          <div class="merksatz__label">✏️ ${ui.merkeCopy || 'Schreib das in deinen Hefter:'}</div>
          <p class="merksatz__text">${chapter.merksatz}</p>
        </div>`;
    }

    if (chapter.diagram && window.renderDiagram) {
      // Diagramm-Beschriftung in der Sprache des Kapiteltextes (EN oder DE-Fallback)
      const diaUi = (state.lang === 'en' && contentMap.en) ? contentMap.en.ui : contentMap.de.ui;
      const svg = window.renderDiagram(chapter.diagram, {
        label: ui.diagramLabel || '',
        then: diaUi.diagramThen || 'dann',
        else: diaUi.diagramElse || 'sonst'
      });
      html += `
        <figure class="flow-figure">
          <div class="flow-figure__scroll">${svg}</div>
          <figcaption>${ui.diagramLabel || ''}</figcaption>
        </figure>`;
    }

    return html;
  }

  /* --- Aufgabe: Klickanleitung (Grundlagen) oder Auftrag (Bonus) --- */
  function renderGuidedTask(task, ui) {
    if (!task) {
      els.guidedTaskContent.innerHTML = '';
      return;
    }

    const pyData = getPythonData(state.chapter);

    let html = `<h3 class="guided-task__title">${task.title}</h3>`;

    if (task.steps) {
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
            </div>
          </div>
        `;
      });
    } else {
      html += renderMission(task, ui);
    }

    // Python full guided task block
    if (state.python && pyData && pyData.fullTask) {
      html += renderPythonBlock(pyData.fullTask);
    }

    els.guidedTaskContent.innerHTML = html;
  }

  function renderMission(task, ui) {
    let html = '';

    if (task.goal) {
      html += `<p class="mission__goal">${task.goal}</p>`;
    }

    // Fähigkeiten-Karten (Überblick zum Anklicken)
    if (task.abilities && task.abilities.length) {
      html += `<p class="mission__hint-line">${ui.abilitiesIntro || ''}</p><div class="ability-grid">`;
      task.abilities.forEach(ab => {
        html += `
          <details class="ability-card">
            <summary>
              <span class="ability-card__icon" aria-hidden="true">${ab.icon || ''}</span>
              <span class="ability-card__head">
                <strong>${ab.title}</strong>
                <span>${ab.short || ''}</span>
              </span>
            </summary>
            <div class="ability-card__detail">${ab.detail || ''}</div>
          </details>`;
      });
      html += `</div>`;
    }

    if (task.requirements && task.requirements.length) {
      html += `
        <div class="mission">
          <h4 class="mission__heading">${ui.missionRequirements || ''}</h4>
          <ul class="mission__list">
            ${task.requirements.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>`;
    }

    if (task.hints && task.hints.length) {
      task.hints.forEach((hint, i) => {
        const label = (ui.hintLabel || 'Tipp') + (task.hints.length > 1 ? ' ' + (i + 1) : '');
        html += `
          <details class="hint">
            <summary>💡 ${label}</summary>
            <div class="hint__body">${hint}</div>
          </details>`;
      });
    }

    return html;
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

  /* --- Navigation --- */
  function goToChapter(index) {
    if (index < 0 || index >= TOTAL_CHAPTERS) return;

    // Merksatz-Checker: in Kapitel 1 und 2 vor dem Weiterblättern nachfragen
    const merkKey = `${state.path}-${state.chapter}`;
    if (index > state.chapter
        && MERK_CHECK_CHAPTERS.includes(state.chapter)
        && !merkConfirmed.has(merkKey)) {
      askMerk(index);
      return;
    }

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

  /* --- Merksatz-Checker --- */
  let merkTarget = null;

  function askMerk(target) {
    merkTarget = target;
    els.merkModal.hidden = false;
    setTimeout(() => els.merkYes.focus(), 50);
  }

  function confirmMerk() {
    merkConfirmed.add(`${state.path}-${state.chapter}`);
    els.merkModal.hidden = true;
    const target = merkTarget;
    merkTarget = null;
    if (target !== null) goToChapter(target);
  }

  function declineMerk() {
    els.merkModal.hidden = true;
    merkTarget = null;
    const box = document.getElementById('merksatzBox') || els.sectionConcept;
    if (!box) return;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    box.classList.remove('merksatz--flash');
    void box.offsetWidth; // Animation neu starten
    box.classList.add('merksatz--flash');
  }

  /* --- Progress: zeigt nur die aktuelle Position, nichts wird gespeichert --- */
  function updateProgress() {
    const ui = getUI();
    if (!state.path) {
      els.progressFill.style.width = '0%';
      els.progressText.textContent = '';
      return;
    }

    const current = state.chapter + 1;
    const percent = Math.round((current / TOTAL_CHAPTERS) * 100);
    els.progressFill.style.width = `${percent}%`;
    els.progressText.textContent = `${ui.chapterLabel} ${current} / ${TOTAL_CHAPTERS}`;
  }

  /* --- Start --- */
  document.addEventListener('DOMContentLoaded', init);

  /* --- Teacher Solutions --- */
  (function initTeacher() {
    document.addEventListener('DOMContentLoaded', () => {
      const btnTeacher   = document.querySelector('#btnTeacher');
      const modal        = document.querySelector('#teacherModal');
      const modalClose   = document.querySelector('#teacherModalClose');
      const modalContent = document.querySelector('#teacherModalContent');

      if (!btnTeacher || !modal) return;

      let authenticated = false;

      btnTeacher.addEventListener('click', () => {
        modal.hidden = false;
        if (authenticated) {
          renderSolutionsView('hare');
        } else {
          renderPasswordForm();
        }
      });

      modalClose.addEventListener('click', () => { modal.hidden = true; });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.hidden = true;
      });

      function renderPasswordForm() {
        modalContent.innerHTML = `
          <div class="teacher-password">
            <h2>Bereich für Lehrkräfte</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem; text-align: center;">
              Bitte geben Sie das Passwort ein, um die Lösungen zu sehen.
            </p>
            <input type="password" id="teacherPwInput" placeholder="Passwort" autocomplete="off">
            <button class="btn-submit" id="teacherPwSubmit">Anmelden</button>
            <span class="error-msg" id="teacherPwError"></span>
          </div>
        `;

        const pwInput  = document.querySelector('#teacherPwInput');
        const pwSubmit = document.querySelector('#teacherPwSubmit');
        const pwError  = document.querySelector('#teacherPwError');

        const checkPassword = () => {
          const solutions = (window.CONTENT_DE && window.CONTENT_DE.teacherSolutions) || {};
          if (pwInput.value === solutions.password) {
            authenticated = true;
            renderSolutionsView('hare');
          } else {
            pwError.textContent = 'Falsches Passwort.';
            pwInput.value = '';
            pwInput.focus();
          }
        };

        pwSubmit.addEventListener('click', checkPassword);
        pwInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') checkPassword();
        });

        setTimeout(() => pwInput.focus(), 100);
      }

      function renderSolutionsView(activePath) {
        const solutions = (window.CONTENT_DE && window.CONTENT_DE.teacherSolutions) || {};
        const hareData = solutions.hare || [];
        const tortoiseData = solutions.tortoise || [];
        const data = activePath === 'hare' ? hareData : tortoiseData;

        const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        let chaptersHtml = '';
        data.forEach(item => {
          let inner = '';
          if (item.note) {
            inner += `<p class="solution-note">${item.note}</p>`;
          }
          if (item.code) {
            inner += `<pre>${esc(item.code)}</pre>`;
          }
          chaptersHtml += `
            <div class="teacher-solution-chapter">
              <h3>${item.title}</h3>
              ${inner}
            </div>
          `;
        });

        modalContent.innerHTML = `
          <div class="teacher-solutions">
            <h2>Lehrerlösungen</h2>
            <div class="teacher-path-tabs">
              <button class="teacher-path-tab ${activePath === 'hare' ? 'active' : ''}" data-path="hare">🐇 Hase</button>
              <button class="teacher-path-tab ${activePath === 'tortoise' ? 'active' : ''}" data-path="tortoise">🐢 Schildkröte</button>
            </div>
            ${chaptersHtml}
          </div>
        `;

        // Tab switching
        modalContent.querySelectorAll('.teacher-path-tab').forEach(tab => {
          tab.addEventListener('click', () => renderSolutionsView(tab.dataset.path));
        });
      }
    });
  })();

})();
