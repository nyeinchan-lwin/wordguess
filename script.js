window.WG = {};

(function () {

  // ── Word list ──────────────────────────────────────────────────
  const WORDS = [
    'CRANE', 'SLATE', 'TRACE', 'ARISE', 'STALE', 'SNARE', 'IRATE', 'AROSE',
    'LATER', 'SANER', 'CRATE', 'TEARS', 'NOTES', 'STORE', 'STONE', 'TIRED',
    'TONES', 'RATES', 'PLAIN', 'RAISE', 'GROAN', 'SPORT', 'LIGHT', 'MIGHT',
    'RIGHT', 'NIGHT', 'SIGHT', 'FIGHT', 'HEART', 'STEAM', 'CREAM', 'DREAM',
    'GREAT', 'GREET', 'BREAD', 'BREAK', 'BROWN', 'BRAVE', 'GRACE', 'GRANT',
    'GRAND', 'GRAPE', 'GRASP', 'GRASS', 'GRAVE', 'GRAZE', 'PLACE', 'PLANE',
    'PLANT', 'PLATE', 'BLEND', 'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BOARD',
    'BOAST', 'BOUND', 'BRAIN', 'BRAND', 'CLASH', 'CLASS', 'CLEAN', 'CLEAR',
    'CLIMB', 'CLONE', 'CLOSE', 'CLOUD', 'COUNT', 'COVER', 'CRAFT', 'CRASH',
    'CRISP', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE',
    'DEPTH', 'DRIFT', 'DRINK', 'DRIVE', 'EARLY', 'EARTH', 'EIGHT', 'ELITE',
    'EMPTY', 'ENJOY', 'EQUAL', 'EVERY', 'EXIST', 'FAINT', 'FAITH', 'FALSE',
    'FANCY', 'FAULT', 'FEAST', 'FENCE', 'FIELD', 'FIFTH', 'FIRST', 'FIXED',
    'FLAME', 'FLARE', 'FLASH', 'FLEET', 'FLOAT', 'FLOOR', 'FLOUR', 'FLOWN',
    'FLUID', 'FOCUS', 'FORCE', 'FORGE', 'FORTH', 'FOUND', 'FRAME', 'FRANK',
    'FRESH', 'FRONT', 'FROST', 'FROZE', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT',
    'GIVEN', 'GLAND', 'GLARE', 'GLASS', 'GLEAM', 'GLIDE', 'GLOBE', 'GLOOM',
    'GLORY', 'GLOSS', 'GLOVE', 'GLUED', 'GOING', 'GRACE', 'GRADE', 'GRAIL',
  ];

  function pickWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  // ── Screen management ──────────────────────────────────────────
  const screenLang  = { en: 'en', menu: 'en' };
  const screenLabel = { menu: 'Select game', en: 'English game' };

  function showScreen(name) {
    document.querySelectorAll('[data-screen]').forEach(el => {
      el.hidden = el.dataset.screen !== name;
    });
    document.documentElement.lang = screenLang[name] || 'en';
    live(screenLabel[name] || '');
    if (name === 'en') initGame();
  }

  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => showScreen('menu'));
  });

  // ── English game ───────────────────────────────────────────────
  const ROWS = 6;
  const COLS = 5;
  const FLIP_MS = 250;
  const FLIP_STAGGER = 50;

  const KB_LAYOUT = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Enter','Z','X','C','V','B','N','M','⌫'],
  ];

  let eng = {};

  function initGame() {
    eng = {
      answer:       pickWord(),
      currentRow:   0,
      currentInput: '',
      gameOver:     false,
      toastTimer:   null,
    };
    buildGrid();
    buildKeyboard();
    setModal(null);
  }

  // Scoped DOM helpers
  function qs(sel)       { return document.querySelector(`[data-screen="en"] ${sel}`); }
  function getTile(r, c) { return qs(`[data-tile="${r}-${c}"]`); }
  function getRow(r)     { return qs(`[data-row="${r}"]`); }

  function buildGrid() {
    const grid = qs('[data-grid]');
    if (!grid) return;
    grid.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'grid-row';
      rowEl.setAttribute('role', 'row');
      rowEl.dataset.row = r;
      for (let c = 0; c < COLS; c++) {
        const t = document.createElement('div');
        t.className = 'tile';
        t.setAttribute('role', 'gridcell');
        t.setAttribute('aria-label', 'Empty');
        t.dataset.state = 'empty';
        t.dataset.tile  = `${r}-${c}`;
        rowEl.appendChild(t);
      }
      grid.appendChild(rowEl);
    }
  }

  function buildKeyboard() {
    const kb = qs('[data-keyboard]');
    if (!kb) return;
    kb.innerHTML = '';
    KB_LAYOUT.forEach(keys => {
      const rowEl = document.createElement('div');
      rowEl.className = 'keyboard-row';
      keys.forEach(k => {
        const btn = document.createElement('button');
        btn.className = 'key' + (k.length > 1 ? ' key--wide' : '');
        btn.textContent = k;
        btn.dataset.key = k;
        btn.type = 'button';
        btn.addEventListener('click', () => handleKey(k));
        rowEl.appendChild(btn);
      });
      kb.appendChild(rowEl);
    });
  }

  // ── Input handling ─────────────────────────────────────────────
  function handleKey(key) {
    if (eng.gameOver) return;
    if (key === '⌫' || key === 'Backspace') return deleteLetter();
    if (key === 'Enter')                     return submitGuess();
    if (/^[A-Za-z]$/.test(key))             addLetter(key.toUpperCase());
  }

  function addLetter(letter) {
    if (eng.currentInput.length >= COLS) return;
    const col = eng.currentInput.length;
    const t   = getTile(eng.currentRow, col);
    if (!t) return;
    eng.currentInput += letter;
    t.textContent = letter;
    t.dataset.state = 'tbd';
    t.setAttribute('aria-label', letter);
    t.classList.remove('tile--pop');
    void t.offsetWidth;          // reflow to restart animation
    t.classList.add('tile--pop');
  }

  function deleteLetter() {
    if (!eng.currentInput.length) return;
    eng.currentInput = eng.currentInput.slice(0, -1);
    const t = getTile(eng.currentRow, eng.currentInput.length);
    if (!t) return;
    t.textContent = '';
    t.dataset.state = 'empty';
    t.setAttribute('aria-label', 'Empty');
  }

  function submitGuess() {
    if (eng.currentInput.length < COLS) {
      shakeRow(eng.currentRow);
      toast('Not enough letters');
      return;
    }

    const guess   = eng.currentInput;
    const states  = evaluate(guess, eng.answer);
    revealRow(eng.currentRow, guess, states);

    const won        = states.every(s => s === 'correct');
    const lastRow    = eng.currentRow === ROWS - 1;
    const postReveal = (COLS - 1) * FLIP_STAGGER + FLIP_MS + 400;

    if (won) {
      eng.gameOver = true;
      setTimeout(() => setModal('You got it!'), postReveal);
    } else if (lastRow) {
      eng.gameOver = true;
      setTimeout(() => setModal(`The word was ${eng.answer}`), postReveal);
    } else {
      eng.currentRow++;
      eng.currentInput = '';
    }
  }

  // ── Evaluation (standard Wordle algorithm) ─────────────────────
  function evaluate(guess, answer) {
    const result   = Array(COLS).fill('absent');
    const ansChars = answer.split('');
    const gChars   = guess.split('');

    // Pass 1 — exact matches
    for (let i = 0; i < COLS; i++) {
      if (gChars[i] === ansChars[i]) {
        result[i]   = 'correct';
        ansChars[i] = null;
        gChars[i]   = null;
      }
    }
    // Pass 2 — present but wrong position
    for (let i = 0; i < COLS; i++) {
      if (!gChars[i]) continue;
      const j = ansChars.indexOf(gChars[i]);
      if (j !== -1) {
        result[i]   = 'present';
        ansChars[j] = null;
      }
    }
    return result;
  }

  // ── Tile reveal animation ──────────────────────────────────────
  function revealRow(rowIdx, guess, states) {
    for (let i = 0; i < COLS; i++) {
      const t = getTile(rowIdx, i);
      const s = states[i];
      setTimeout(() => {
        t.classList.add('tile--flip');
        // Change colour at the exact midpoint (tile is edge-on, invisible)
        setTimeout(() => {
          t.dataset.state = s;
          t.setAttribute('aria-label', `${guess[i]} ${s}`);
        }, FLIP_MS / 2);
        t.addEventListener('animationend', () => t.classList.remove('tile--flip'), { once: true });
      }, i * FLIP_STAGGER);
    }

    // Update keyboard keys once all tiles have finished flipping
    const allDone = (COLS - 1) * FLIP_STAGGER + FLIP_MS;
    setTimeout(() => {
      states.forEach((s, i) => updateKey(guess[i], s));
      live(`${guess}: ${states.join(', ')}`);
    }, allDone);
  }

  const KEY_RANK = { correct: 3, present: 2, absent: 1 };

  function updateKey(letter, state) {
    const btn = qs(`[data-key="${letter}"]`);
    if (!btn) return;
    if ((KEY_RANK[state] || 0) > (KEY_RANK[btn.dataset.state] || 0)) {
      btn.dataset.state = state;
    }
  }

  // ── Row shake ──────────────────────────────────────────────────
  function shakeRow(r) {
    const rowEl = getRow(r);
    if (!rowEl) return;
    rowEl.classList.remove('grid-row--shake');
    void rowEl.offsetWidth;
    rowEl.classList.add('grid-row--shake');
    rowEl.addEventListener('animationend', () => rowEl.classList.remove('grid-row--shake'), { once: true });
  }

  // ── End-game modal ─────────────────────────────────────────────
  function setModal(message) {
    const overlay = qs('[data-modal]');
    const msgEl   = qs('[data-modal-message]');
    if (!overlay) return;
    if (message === null) { overlay.hidden = true; return; }
    if (msgEl) msgEl.textContent = message;
    overlay.hidden = false;
    live(message);
    const action = overlay.querySelector('[data-modal-action]');
    if (action) setTimeout(() => action.focus(), 50);
  }

  // ── Toast notification ─────────────────────────────────────────
  function toast(msg) {
    const el = document.querySelector('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    live(msg);
    clearTimeout(eng.toastTimer);
    eng.toastTimer = setTimeout(() => { el.hidden = true; }, 1200);
  }

  // ── Screen-reader live region ──────────────────────────────────
  function live(msg) {
    const el = document.querySelector('[data-announce]');
    if (el) el.textContent = msg;
  }

  // ── Physical keyboard ──────────────────────────────────────────
  document.addEventListener('keydown', e => {
    const enScreen = document.querySelector('[data-screen="en"]');
    if (!enScreen || enScreen.hidden) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    handleKey(e.key === 'Backspace' ? '⌫' : e.key);
  });

  // ── Play Again ─────────────────────────────────────────────────
  document.addEventListener('click', e => {
    if (e.target.closest('[data-modal-action]')) initGame();
  });

}());
