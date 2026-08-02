# WordGuess — Remaining Polish & Implementation

## ▶️ Start here next session

Stopped 2026-08-02. Working tree clean, `npm test` green (4 suites).
**Nothing since `b91208a` is pushed** — `git log --oneline origin/main..HEAD` lists what is waiting.

Planned order:

1. **#48** — validate challenge links. Last of the three gameplay bugs, ~15 min.
   Require `/^[A-Z]+$/` and `word.length === len` in `initGame`, else start a normal game.
2. **#49** — decide what "daily" means. A design call, not a code fix: either seed from the
   date alone (same word for everyone) or rename the mode. Now live, see the bugs table.
3. **#38–42** — submission artifacts. Mechanical; #40 and #42 are factual errors in `report.md`.
4. **#43–46** — word content. The real remaining work; 7-letter mode has only 31 answers.
5. Older polish backlog (#3–#19), of which **#16** (high-contrast chips) is the most worthwhile.

Run `npm test` before and after anything — it catches all of today's fixes regressing.

## ✅ Completed

### Core Features (Slices 1–7)
- [x] Static HTML shell + CSS grid/keyboard
- [x] Word list + random word picker
- [x] Input handling (physical + on-screen keyboard)
- [x] Guess evaluation + tile flip animation
- [x] Win/lose detection + end-game modal
- [x] Accessibility pass (ARIA, focus, reduced motion)
- [x] Hard mode, high contrast, share button

### Polish (16 items)
- [x] Hard Mode toggle with guess validation
- [x] Remaining guesses counter (X/Y)
- [x] Game timer (M:SS)
- [x] Screen transitions (fade)
- [x] Modal animations (scale-in)
- [x] Settings toast feedback
- [x] Streak flame icon 🔥
- [x] Prevent double-tap zoom (iOS)
- [x] Better touch targets (44×44px)
- [x] Viewport meta fix
- [x] Focus trap in modals
- [x] prefers-color-scheme auto-detect
- [x] OG meta tags
- [x] localStorage error boundary
- [x] Prevent duplicate guess animation
- [x] Themed word lists (6 categories)
- [x] Keyboard sound effects (click, buzz, ding)
- [x] Word length selector (4, 5, 6, 7 letters)
- [x] Statistics per theme (with theme tabs in stats overlay)
- [x] Theme indicator in game header (with emojis)
- [x] Screen reader theme announcement
- [x] Share theme in result
- [x] Dark mode toast icon (🌙/☀️)
- [x] More themes (Music, Movies, Technology, History, Art)
- [x] Themed daily challenges
- [x] Theme of the day
- [x] Achievement system (12 badges)
- [x] Multiplayer via share links
- [x] Weekly tournament mode

### Accessibility fixes (2026-08-01)
- [x] Stats tablist made spec-compliant (roving tabindex, Arrow/Home/End keys, real `role="tabpanel"`)
- [x] `aria-pressed` on theme chips + word-length chips
- [x] `role="group"` on theme/word-length/distribution containers (their `aria-label`s were on bare divs and were being ignored)
- [x] `data-i18n-aria-label` support in `applyTranslations()` — aria-labels were English-only in Burmese
- [x] Focus-trap bug: cached `first`/`last` let Shift+Tab escape the modal once roving tabindex changed which tab was tabbable
- [x] `test/a11y-check.mjs` — 26 browser assertions covering the above

### Word lists & test wiring (2026-08-02)
- [x] `npm test` wired to `test/run.mjs` — serves the project and runs every suite, no manual server
- [x] Game-flow suite now exits nonzero on page errors (it reported failures but still exited 0)
- [x] Word list cleanup: 23 misfiled-by-length entries rehomed, 5 mixed-case entries fixed
      (`ARctic`, `Observe`, `Pioneer`, `TRouble`, `Fresco` — all were unmatchable), typo
      `DEPLOT`→`DEPLOY`, non-word `KNAG` dropped, duplicate `MELON`/`FLORA` removed, new `EXTRA_5`
- [x] **Themed answers are guessable.** `THEMES` was never merged into `VALID_SET`, so 151 of 250
      themed answers could not be typed — a Countries game with the answer `FRANCE` rejected
      `FRANCE` as "Not a valid word". Countries was 29/30 unwinnable, Sports 16/20, Food 18/30
- [x] `test/wordlists.mjs` — 27 static assertions locking in both fixes
- [x] **Daily Challenge and Weekly Tournament actually run.** Both markers are valueless attributes,
      so `!!btn.dataset.daily` was always false and each button started an ordinary random game —
      no daily state saved, no tournament stats, daily-devotee unreachable. Now `'daily' in dataset`
- [x] `pickDailyWord()` honours the word length. Its fallbacks re-ran an empty filter and then
      ignored length, so 4/6/7-letter dailies got a 5-letter answer behind a wider grid (#47)
- [x] `test/daily-modes.mjs` — 20 browser assertions; reverting either fix alone fails it

---

## 🔲 Remaining Polish

### 🐞 Bugs — gameplay broken (found 2026-08-02)

Highest priority: these break the game itself, so they outrank everything below.

| # | Bug | Effort | Notes |
|---|-----|--------|-------|
| 47 | ~~**Daily challenge is unwinnable at 4, 6 and 7 letters**~~ | ~~Small~~ | ~~Fixed 2026-08-02~~ ✅ — and the root cause was worse: the Daily and Tournament buttons never started their modes at all (`data-daily` is valueless, so `!!btn.dataset.daily` was always false). Both fixed; guarded by `test/daily-modes.mjs` |
| 48 | **Challenge links are not validated** | Small | Observed: `?w=HI&l=6` → 6-wide grid with a 2-letter answer; `?w=FRANCE&l=4` → 4-wide grid with a 6-letter answer; `?w=12345&l=5` → digits accepted as the answer; `?w=&l=5` → starts a normal game with the banner off. No crash, but any truncated or hand-edited link yields a dead game. Fix in `initGame`: require `/^[A-Z]+$/` and `word.length === len`, else ignore the params and start a normal game |
| 49 | **"Daily challenge" is not the same word for everyone** | Medium | ⚠️ Only became reachable on 2026-08-02 — before that the daily button never started a daily at all, so this sat latent. `pickDailyWord()` draws from the player's *current theme*, so one date yields 12 different answers (all→TOWER, countries→ITALY, food→OLIVE, animals→MOOSE, sports→RUGBY, science→GENES, music→FLUTE, history→QUEEN, …). Share text says `WordGuess 3/6` as if results are comparable, but players solved different puzzles — and switching theme before playing re-rolls the draw, since only *completion* is date-locked. Design call: either seed from the date alone and ignore theme/length, or rename the mode so it stops promising a shared puzzle |

### Submission artifacts — do before submitting (found 2026-08-02)

These drifted behind the code. Nothing here is a code bug; they are things a
reviewer sees first, and 40–42 are outright wrong in a document being submitted.

| # | Fix | Effort | Notes |
|---|-----|--------|-------|
| 38 | **Regenerate screenshots** | Small | `screenshots/*.png` last updated 2026-07-25, before themes, word-length selector, daily-theme banner, achievements and tournament. `report.md` shows the game three features out of date. Regenerate all 5 (3 desktop @ 1280×800 + 2 mobile) — Playwright can drive it |
| 39 | **Link feedback from `report.md`** | Trivial | `feedback/user-feedback.md` and `feedback/ai-playthrough.md` exist and are tracked, but the rewritten report has no section pointing at either. The templates require the report to link one |
| 40 | **Fix the one-line summary** | Trivial | `report.md:8` says "a hidden 5-letter word in six tries" — it is now 4–7 letters and 8 tries in easy mode |
| 41 | **Create `og-image.png`** | Small | 1200×630. `index.html` references it twice in the OG/Twitter tags, so every social preview currently 404s |
| 42 | **Resolve the license mismatch** | Trivial | `report.md:7` says MIT, `package.json:22` says ISC, and there is a `LICENSE` file — pick one and make all three agree |

### Word content (found 2026-08-02)

| # | Fix | Effort | Notes |
|---|-----|--------|-------|
| 43 | **Thin answer pools for 4/6/7 letters** | Medium | `ANSWERS` is 589 words, *all* 5 letters, so the other modes fall through to the themed lists as their entire answer pool: 4→39 answers, 6→73, 7→**31**. A 7-letter player sees the same 31 words cycle. Needs ~100–150 new themed words |
| 44 | **4 theme×length combos have zero answers** | Small | Countries×7, Tech×7, Nature×4, Art×4. `pickWord` falls back to *any* theme's words of that length while the badge still says the chosen theme, so you get an animal in a Countries game. 20 of the 44 combos have fewer than 5 answers |
| 45 | **13 themed words can never be picked** | Trivial | No 3/8/9/10-letter mode exists, so these are dead weight: `FOX`, `CLIMBING`, `LACROSSE`, `SPECTRUM`, `SAXOPHONE`, `THRILLER`, `DIRECTOR`, `MEDIEVAL`, `REVOLUTION`, `CONQUEST`, `HERITAGE`, `PORTRAIT`, `WATERCOLOR` |
| 46 | **`SCIFI` is not a word** | Trivial | In the movies theme. Now that themed words are accepted as guesses it is a valid guess everywhere. `NIUE`, `ZESTY` and `CYBER` are also dictionary-flagged but are legitimate (a country, and two real words) |

### Gameplay
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 1 | ~~**Themed daily challenges**~~ | ~~Small~~ | ~~Use selected theme for daily word, not just random~~ ✅ |
| 2 | ~~**Statistics per theme**~~ | ~~Medium~~ | ~~Track win rate/distribution per category~~ ✅ |
| 3 | **Streak tracking by theme** | Small | Separate streaks for Animals, Food, etc. |
| 4 | **Guess limit by theme** | Small | Some themes could have fewer words → adjust difficulty |

### Visual / UX
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 5 | ~~**Theme indicator in game**~~ | ~~Trivial~~ | ~~Show theme name in header, not just mode badge~~ ✅ |
| 6 | **Theme preview on hover** | Small | Show word count when hovering theme chip |
| 7 | **Animated theme switch** | Small | Fade word list when changing theme |
| 8 | ~~**Keyboard sound effects**~~ | ~~Small~~ | ~~Subtle click on keypress, ding on win~~ ✅ |
| 9 | **Tile shake improvement** | Trivial | Current shake is basic, could be smoother |
| 10 | ~~**Dark mode toast icon**~~ | ~~Trivial~~ | ~~Show 🌙/☀️ in dark mode toggle toast~~ ✅ |

### Mobile
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 11 | **Haptic feedback** | Small | Vibrate on guess submit (mobile only) |
| 12 | **Landscape mode** | Medium | Better layout for landscape phones |
| 13 | **PWA install prompt** | Small | Show "Add to Home Screen" banner |

### Accessibility
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 14 | ~~**Screen reader theme announcement**~~ | ~~Trivial~~ | ~~Announce "Theme: Animals" when selected~~ ✅ |
| 15 | **Keyboard navigation for themes** | Trivial | Stats tabs ✅ (arrow keys done). Menu theme chips still Tab-only — that is spec-correct for a button group, so this may be a no-op; only worth doing if 12 tab stops feels tedious |
| 16 | **High contrast theme chips** | Trivial | Still open — `body.hc` (style.css:75) has no rules for `.theme-chip`, `.word-length-chip`, `.stats-theme-chip` |

### Technical
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 17 | **Service worker update** | Small | Cache theme word lists for offline play |
| 18 | **Performance audit** | Medium | Check bundle size, lazy-load themes |
| 19 | **Unit tests** | Medium | Test theme filtering, validation, stats |
| 20 | ~~**E2E tests**~~ | ~~Medium~~ | ~~`npm test` runs `test/run.mjs`, which serves the project and runs both suites (game flow + ARIA)~~ ✅ |

---

## 🚀 New Features (Future)

### Game Modes
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 21 | ~~**Word length selector**~~ | ~~Medium~~ | ~~4, 5, 6, 7 letter words~~ ✅ |
| 22 | **Timed mode** | Medium | Guess as many words as possible in 5 min |
| 23 | ~~**Multiplayer**~~ | ~~Large~~ | ~~Share a game link, compare results~~ ✅ |
| 24 | ~~**Tournament mode**~~ | ~~Large~~ | ~~Weekly competitions with leaderboards~~ ✅ |
| 25 | **Practice mode** | Small | Unlimited guesses, no stats tracking |

### Content
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 26 | ~~**More themes**~~ | ~~Small~~ | ~~Music, Movies, Technology, History, Art~~ ✅ |
| 27 | **Custom word lists** | Medium | Import your own word list via URL or file |
| 28 | ~~**Theme of the day**~~ | ~~Small~~ | ~~Featured theme rotates daily~~ ✅ |
| 29 | **Seasonal themes** | Small | Holiday-specific word lists |
| 30 | **Difficulty levels** | Small | Easy (common words) vs Hard (rare words) |

### Social
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 31 | ~~**Share theme in result**~~ | ~~Trivial~~ | ~~Include theme emoji in share text~~ ✅ |
| 32 | **Theme leaderboard** | Large | Global stats per theme |
| 33 | **Friend challenges** | Large | Challenge friends to a specific theme |
| 34 | ~~**Achievement system**~~ | ~~Medium~~ | ~~Badges for completing themes~~ ✅ |

### Analytics
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 35 | **Theme popularity stats** | Small | Which themes are played most |
| 36 | **Win rate by theme** | Small | Track which themes are hardest |
| 37 | **Time per theme** | Small | Average solve time per category |

---

## 📋 Priority Order

### Phase 1: Polish (Quick wins) ✅
1. ~~Theme indicator in game header (#5)~~ ✅
2. ~~Screen reader theme announcement (#14)~~ ✅
3. ~~Share theme in result (#31)~~ ✅
4. ~~Dark mode toast icon (#10)~~ ✅

### Phase 2: Content ✅
5. ~~More themes (#26)~~ ✅
6. ~~Themed daily challenges (#1)~~ ✅
7. ~~Theme of the day (#28)~~ ✅

### Phase 3: Features ✅
8. ~~Word length selector (#21)~~ ✅
9. ~~Statistics per theme (#2)~~ ✅
10. ~~Keyboard sound effects (#8)~~ ✅

### Phase 4: Advanced ✅
11. ~~Multiplayer (#23)~~ ✅
12. ~~Tournament mode (#24)~~ ✅
13. ~~Achievement system (#34)~~ ✅

---

## 📝 Notes

- ✅ All of the above is committed and pushed to `origin/main` (2026-08-02).
- `npm test` serves the project on port 8123 (override with `WG_PORT`) and runs all three suites.
  Use `npm run test:words` / `test:flow` / `test:a11y` to run one alone — `test:words` needs no
  browser and no server. Run `npm run test:browsers` if Playwright's Chromium is not installed yet.
- `test/wordlists.mjs` guards the word lists: it rebuilds `VALID_SET` from the merge statements
  actually present in `script.js`, so removing a merge fails the suite. Run it after any list edit.
- Theme word lists could be expanded (currently ~20–30 words each, aim for 50+) — see 43/44
- Consider lazy-loading theme word lists to reduce initial bundle size
- All new features should maintain i18n support (EN + MY)
