# WordGuess — Polish Implementation Guide

A detailed implementation plan for all polishing improvements. Each section includes
what to do, where to change it, and code-level guidance.

---

## 1. Hard Mode

**Goal:** Restrict guesses so players must use hints (green/yellow) from previous guesses.

### Rules
- Green letters must stay in the same position.
- Yellow letters must appear somewhere in the guess.
- Gray letters from previous guesses cannot be reused (unless they were also green/yellow elsewhere).

### Implementation

**`script.js`** — add a validation function before `submitGuess()`:

```js
function validateHardMode(guess) {
  const s = loadSettings();
  if (!s.hard) return true; // not hard mode

  for (let r = 0; r < eng.history.length; r++) {
    const prevGuess = getGuessText(r);
    const prevStates = eng.history[r];

    for (let c = 0; c < COLS; c++) {
      // Green: letter must stay in same position
      if (prevStates[c] === 'correct' && guess[c] !== prevGuess[c]) {
        toast(t('hard_green', { pos: c + 1, letter: prevGuess[c] }));
        return false;
      }
    }

    // Yellow: letter must appear somewhere in this guess
    for (let c = 0; c < COLS; c++) {
      if (prevStates[c] === 'present' && !guess.includes(prevGuess[c])) {
        toast(t('hard_yellow', { letter: prevGuess[c] }));
        return false;
      }
    }

    // Gray: letter not in any green/yellow position — cannot reuse
    // (only if the letter doesn't appear as green/yellow in ANY position)
    for (let c = 0; c < COLS; c++) {
      if (prevStates[c] === 'absent') {
        const letter = prevGuess[c];
        const isHinted = eng.history.some((states, ri) =>
          ri < r && states.some((s, ci) => s !== 'absent' && getGuessText(ri)[ci] === letter)
        );
        if (!isHinted && guess.includes(letter)) {
          toast(t('hard_absent', { letter }));
          return false;
        }
      }
    }
  }
  return true;
}
```

Call `validateHardMode(guess)` inside `submitGuess()` right after the valid-word check,
before evaluating the guess.

**`i18n.js`** — add keys:
```
hard_mode:    'Hard Mode',
hard_green:   'Position {pos} must be {letter}',
hard_yellow:  'Guess must contain {letter}',
hard_absent:  '{letter} not in target',
```

**`index.html`** — add a toggle in settings (after Easy Mode):
```html
<label class="setting-row">
  <span class="setting-label" data-i18n="hard_mode">Hard Mode</span>
  <input type="checkbox" class="toggle" data-setting="hard">
</label>
```

**`script.js`** — add `hard: false` to `defaultSettings()`. Show a toast when toggled on.

### UI feedback
- When Hard Mode is ON and player submits an invalid guess, show a specific toast explaining why.
- When player tries to toggle Hard Mode mid-game, show a warning toast.

---

## 2. Remaining Guesses Counter

**Goal:** Show "X/Y" remaining guesses on the game screen.

### Implementation

**`index.html`** — add inside `.game-actions`:
```html
<span class="guess-counter" data-guess-counter aria-live="polite"></span>
```

**`script.js`** — add function:
```js
function updateGuessCounter() {
  const el = document.querySelector('[data-guess-counter]');
  if (!el) return;
  const remaining = (eng.rows || 6) - eng.currentRow;
  el.textContent = `${remaining}/${eng.rows || 6}`;
}
```

Call `updateGuessCounter()` in:
- `initGame()` — initial state
- `submitGuess()` — after incrementing `currentRow`
- After losing on the last row

**`style.css`**:
```css
.guess-counter {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
  min-width: 3ch;
  text-align: center;
}
```

When remaining === 1, add a subtle red highlight:
```css
.guess-counter[data-low] {
  color: var(--color-correct);
}
```

---

## 3. Game Timer

**Goal:** Show elapsed time on the game screen.

### Implementation

**`index.html`** — add in `.game-actions`:
```html
<span class="game-timer" data-game-timer aria-live="off"></span>
```

**`script.js`**:
```js
let timerInterval = null;

function startTimer() {
  stopTimer();
  eng.startTime = Date.now();
  const el = document.querySelector('[data-game-timer]');
  if (!el) return;
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - eng.startTime) / 1000);
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    el.textContent = `${min}:${String(sec).padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}
```

Call `startTimer()` at end of `initGame()`. Call `stopTimer()` when game is won/lost.

**`style.css`**:
```css
.game-timer {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
}
```

---

## 4. Screen Transitions

**Goal:** Fade/slide between menu and game screens instead of instant swap.

### Implementation

**`style.css`** — add transition styles:
```css
[data-screen] {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

[data-screen][hidden] {
  display: flex; /* keep in layout but invisible */
  opacity: 0;
  pointer-events: none;
  position: absolute;
  inset: 0;
}

[data-screen]:not([hidden]) {
  opacity: 1;
  transform: translateY(0);
}
```

**`script.js`** — modify `showScreen()`:
```js
function showScreen(name) {
  document.querySelectorAll('[data-screen]').forEach(el => {
    if (el.dataset.screen === name) {
      el.hidden = false;
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.style.opacity = '1';
      });
    } else {
      el.style.opacity = '0';
      setTimeout(() => { el.hidden = true; }, 200);
    }
  });
  // ... rest of function
}
```

---

## 5. Modal Animations

**Goal:** Scale-in on open, fade-out on close.

### Implementation

**`style.css`**:
```css
.modal-overlay {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.modal-overlay:not([hidden]) {
  opacity: 1;
}

.modal-card {
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

.modal-overlay:not([hidden]) .modal-card {
  transform: scale(1);
}
```

---

## 6. Settings Toast Feedback

**Goal:** Show a brief toast when toggling Dark/HC/Easy/Hard mode.

### Implementation

**`script.js`** — modify `toggleSetting()`:
```js
function toggleSetting(key) {
  const s = loadSettings();
  s[key] = !s[key];
  saveSettings(s);
  applySettings();
  updateRuleTries();

  // Show feedback toast
  const label = t(key + '_mode') || t(key);
  const state = s[key] ? t('on') : t('off');
  toast(`${label} ${state}`);
}
```

**`i18n.js`** — add keys:
```
on:  'ON',
off: 'OFF',
```

---

## 7. Streak Flame Icon

**Goal:** Show 🔥 next to current streak in the end-game modal.

### Implementation

**`script.js`** — modify the streak update in `renderStats()`:
```js
function renderStats(s) {
  // ... existing code ...
  document.querySelectorAll('[data-stat="streak"]').forEach(el => {
    el.textContent = s.currentStreak > 0 ? `${s.currentStreak} 🔥` : s.currentStreak;
  });
  // ...
}
```

---

## 8. Prevent Double-Tap Zoom (iOS)

**Goal:** Prevent iOS Safari from zooming on double-tap.

### Implementation

**`style.css`**:
```css
.key, .btn, .toggle, .lang-btn, .lang-btn-sm, .btn-howto, .btn-hint {
  touch-action: manipulation;
}
```

Already partially done via `touch-action: manipulation` on `.btn` and `.key`.
Verify all interactive elements have this property.

**`index.html`** — add to viewport meta:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
```

---

## 9. Better Touch Targets

**Goal:** Ensure all interactive elements meet 44×44px minimum.

### Audit
Check each interactive element's computed size:
- `.key` on mobile — currently `48px` height ✅
- `.toggle` — currently `44×24px` — height is 24px, below 44px minimum ⚠️
- `.btn-howto`, `.btn-hint` — use `padding: 2px`, likely too small ⚠️
- `.lang-btn-sm` — use `padding: 2px`, likely too small ⚠️

### Implementation

**`style.css`**:
```css
.toggle {
  min-height: 44px;
  min-width: 44px;
}

.btn-howto, .btn-hint {
  min-height: 44px;
  padding: var(--space-2) var(--space-3);
}

.lang-btn-sm {
  min-height: 44px;
  padding: var(--space-2) var(--space-3);
}
```

---

## 10. Viewport Meta Fix

**Goal:** Prevent accidental zoom while keeping the page responsive.

### Implementation

**`index.html`** — update the viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
```

Remove `user-scalable=no` for accessibility (screen readers need zoom).
Keep `maximum-scale=1` to prevent pinch-zoom.

---

## 11. Focus Trap in Modals

**Goal:** Tab cycles within the modal, not escaping to the page behind.

### Implementation

**`script.js`** — add focus trap utility:
```js
function trapFocus(modal) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  modal.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // Remove trap when modal closes
    if (modal.hidden) {
      modal.removeEventListener('keydown', handler);
    }
  });

  first.focus();
}
```

Call `trapFocus(overlay)` when opening any modal (settings, stats, game-end).

---

## 12. prefers-color-scheme Auto-Detect

**Goal:** Respect system dark mode on first visit.

### Implementation

**`script.js`** — modify `defaultSettings()`:
```js
function defaultSettings() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { dark: prefersDark, hc: false, easy: false, hard: false };
}
```

This only affects first-time visitors (no saved settings). Returning users keep their choice.

---

## 13. OG Meta Tags

**Goal:** Show a nice preview when sharing on social media.

### Implementation

**`index.html`** — add in `<head>`:
```html
<meta property="og:title" content="WordGuess — Word guessing game">
<meta property="og:description" content="Guess the hidden 5-letter word in 6 tries.">
<meta property="og:image" content="https://nyeinchan-lwin.github.io/wordguess/screenshots/og-image.png">
<meta property="og:url" content="https://nyeinchan-lwin.github.io/wordguess/">
<meta property="og:type" content="website">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="WordGuess — Word guessing game">
<meta name="twitter:description" content="Guess the hidden 5-letter word in 6 tries.">
<meta name="twitter:image" content="https://nyeinchan-lwin.github.io/wordguess/screenshots/og-image.png">
```

**TODO:** Create a 1200×630px screenshot for `og-image.png`.

---

## 14. Error Boundary for localStorage

**Goal:** Graceful fallback if localStorage is full or blocked (private browsing).

### Implementation

**`script.js`** — wrap all localStorage calls:
```js
function safeGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    toast(t('storage_error'));
    return false;
  }
}
```

Replace `JSON.parse(localStorage.getItem(...))` calls with `safeGet(...)`.
Replace `localStorage.setItem(...)` calls with `safeSet(...)`.

**`i18n.js`** — add key:
```
storage_error: 'Could not save data',
```

---

## 15. Prevent Duplicate Guess Animation

**Goal:** Guard against double-tap Enter causing a guess to submit twice.

### Implementation

**`script.js`** — add a debounce flag:
```js
let submitting = false;

function submitGuess() {
  if (submitting) return;
  submitting = true;

  // ... existing validation and submit logic ...

  // Reset flag after animation completes
  const flipDone = (COLS - 1) * FLIP_STAGGER + FLIP_MS + POST_FLIP_MS;
  setTimeout(() => { submitting = false; }, flipDone);
}
```

Also reset `submitting = false` in early-return paths (not enough letters, invalid word).

---

## 16. Remaining Guesses in Share Text

**Goal:** Update share text to show max guesses (currently hardcoded to 6).

### Implementation

Already handled — `buildShareText()` uses `eng.rows || 6`. Just verify it works with
easy mode (8 guesses) and hard mode.

---

## Implementation Order

| # | Feature | Files | Effort |
|---|---------|-------|--------|
| 1 | Hard Mode | script.js, i18n.js, index.html | Medium |
| 2 | Remaining guesses counter | index.html, script.js, style.css | Small |
| 3 | Game timer | index.html, script.js, style.css | Small |
| 4 | Screen transitions | style.css, script.js | Small |
| 5 | Modal animations | style.css | Trivial |
| 6 | Settings toast | script.js, i18n.js | Small |
| 7 | Streak flame icon | script.js | Trivial |
| 8 | Prevent double-tap zoom | style.css, index.html | Trivial |
| 9 | Touch targets audit | style.css | Small |
| 10 | Viewport meta fix | index.html | Trivial |
| 11 | Focus trap in modals | script.js | Medium |
| 12 | prefers-color-scheme | script.js | Trivial |
| 13 | OG meta tags | index.html | Trivial |
| 14 | localStorage error boundary | script.js, i18n.js | Small |
| 15 | Prevent duplicate animation | script.js | Trivial |
| 16 | Share text max guesses | verify only | None |

---

## Testing Checklist

After implementing each feature:
- [ ] Toggle works in both languages (EN / MY)
- [ ] Works in both light and dark mode
- [ ] Works on mobile (iOS Safari, Android Chrome)
- [ ] Screen reader announces changes
- [ ] Reduced motion preference respected
- [ ] No console errors
- [ ] Stats update correctly
- [ ] Daily challenge unaffected
