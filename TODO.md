# WordGuess — Remaining Polish & Implementation

## ▶️ Start here next session

Stopped 2026-08-06. Working tree clean, `npm test` green (5 suites).
**Nothing since `b91208a` is pushed** — `git log --oneline origin/main..HEAD` lists what is waiting.

Planned order:

1. **A `design-reviewer` pass on `style.css`** — #50–52 changed the header layout
   and added a viewport tier; CLAUDE.md asks for that review after any slice
   touching `index.html`/`style.css`, and it has not been run yet.
2. **Regenerate screenshots** (`npm run screenshots`) — the current ones show all
   three bugs #50–52 fixed, and the desktop shots no longer need to be full-page.
3. Older polish backlog (#3–#19), of which **#16** (high-contrast chips) is the most worthwhile.

Run `npm test` before and after anything — it catches all of the fixes above regressing.

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
- [x] **Challenge links validated.** A truncated or hand-edited link built a board no guess could
      match (`?w=HI&l=6` → 2-letter answer in a 6-wide grid; `?w=12345` → digits as the answer;
      `?w=WATERCOLOR&l=10` → a 10-wide grid). Bad links now fall back to a normal game (#48)
- [x] `test/challenge-links.mjs` — 22 browser assertions, incl. a good link still winning
- [x] **Stats counted every game twice for the default player.** `updateStats` iterated
      `['all', themeKey]`, and `themeKey` is `'all'` when no theme is selected — so played, wins,
      streak and distribution all doubled. Found because a regenerated screenshot showed
      "2 Played" after one game. Now deduped; `test/daily-modes.mjs` asserts one game counts once
- [x] Submission artifacts refreshed (#38–42): screenshots, og-image, report summary, feedback
      links, MIT everywhere. `npm run screenshots` regenerates the images
- [x] **The daily is one shared puzzle** (#49). Theme now comes from `getDailyTheme()` and length
      from `DAILY_LENGTH = 5`, so personal settings can no longer change it — or re-roll it by
      switching theme before playing. The menu banner and the mode badge finally agree
- [x] `THEME_EMOJI` hoisted to one map; it was duplicated 4× and the copy in `buildShareText()`
      was missing the 5 newer themes, so they shared with a blank emoji

---

## 🔲 Remaining Polish

### 🐞 Bugs — gameplay broken (found 2026-08-02)

Highest priority: these break the game itself, so they outrank everything below.

| # | Bug | Effort | Notes |
|---|-----|--------|-------|
| 47 | ~~**Daily challenge is unwinnable at 4, 6 and 7 letters**~~ | ~~Small~~ | ~~Fixed 2026-08-02~~ ✅ — and the root cause was worse: the Daily and Tournament buttons never started their modes at all (`data-daily` is valueless, so `!!btn.dataset.daily` was always false). Both fixed; guarded by `test/daily-modes.mjs` |
| 48 | ~~**Challenge links are not validated**~~ | ~~Small~~ | ~~Fixed 2026-08-02~~ ✅ — `getChallengeParams()` now returns null unless the link describes a winnable game (A–Z only, a length the UI plays, length matching the word, and a word in `VALID_SET`); anything else starts a normal game. Guarded by `test/challenge-links.mjs` |
| 49 | ~~**"Daily challenge" is not the same word for everyone**~~ | ~~Medium~~ | ~~Fixed 2026-08-02~~ ✅ — the daily now comes entirely from the date: theme from `getDailyTheme()` (the rotation the menu banner already advertised) and length pinned to `DAILY_LENGTH = 5`, ignoring the player's settings. Badge and share text name the daily's own theme, and the share line reads `Daily Challenge <date> 3/6`. Guarded by `test/daily-modes.mjs` |

### Submission artifacts — do before submitting (found 2026-08-02)

These drifted behind the code. Nothing here is a code bug; they are things a
reviewer sees first, and 40–42 are outright wrong in a document being submitted.

| # | Fix | Effort | Notes |
|---|-----|--------|-------|
| 38 | ~~**Regenerate screenshots**~~ | ~~Small~~ | ~~Fixed 2026-08-04~~ ✅ — all 5 regenerated via `npm run screenshots` (`tools/screenshots.mjs`), which plays a real daily game so the board shows genuine feedback colours. Desktop shots are full page (the keyboard falls below the fold at 1280×800) and the two mobile shots are finally at a mobile viewport — they were 1280×800 before |
| 39 | ~~**Link feedback from `report.md`**~~ | ~~Trivial~~ | ~~Fixed 2026-08-04~~ ✅ — new "User Feedback" section links both `feedback/` files |
| 40 | ~~**Fix the one-line summary**~~ | ~~Trivial~~ | ~~Fixed 2026-08-04~~ ✅ — now describes 11 themes, 4–7 letters and the shared daily |
| 41 | ~~**Create `og-image.png`**~~ | ~~Small~~ | ~~Fixed 2026-08-04~~ ✅ — 1200×630, generated from `tools/og-image.html` off the design-system tokens in `style.css`; regenerated by the same `npm run screenshots` |
| 42 | ~~**Resolve the license mismatch**~~ | ~~Trivial~~ | ~~Fixed 2026-08-04~~ ✅ — `LICENSE` is MIT, so `package.json` was the outlier; now MIT everywhere |

### Word content (found 2026-08-02)

| # | Fix | Effort | Notes |
|---|-----|--------|-------|
| 43 | ~~**Thin answer pools for 4/6/7 letters — and for the daily**~~ | ~~Medium~~ | ~~Fixed 2026-08-06~~ ✅ — themed lists rewritten, 235 → 662 words, grouped by length. Every theme now has ≥15 five-letter answers (sports went 1 → 17, history 2 → 16), so the daily no longer repeats. Separately `ANSWER_POOLS` gives unthemed games a real pool per length (`EXTRA_4`/`ANSWERS`/`EXTRA_6`/`EXTRA_7`) instead of falling through to themed words: 7-letter went from 31 answers to 404 |
| 44 | ~~**4 theme×length combos have zero answers**~~ | ~~Small~~ | ~~Fixed 2026-08-06~~ ✅ — Countries×7, Tech×7, Nature×4 and Art×4 are filled; the weakest combo is now 8 answers, so the silent cross-theme fallback in `pickWord` no longer fires. Verified in a browser: Countries×7 returns `MYANMAR`/`ECUADOR`/`SOMALIA`/`VIETNAM`, not an animal |
| 45 | ~~**13 themed words can never be picked**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — all removed. `test/wordlists.mjs` now fails on any themed entry outside 4–7 letters |
| 46 | ~~**`SCIFI` is not a word**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — dropped from movies, and it is the only word the rewrite made unguessable (checked by diffing VALID_SET against `HEAD`). `NIUE`, `ZESTY` and `CYBER` were left alone as legitimate |

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
| 50 | ~~**Mobile header overlaps**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — the header was `justify-content: center` with both buttons absolutely positioned, so "← Back" sat on top of the title (13px of overlap at 390px, 28px at 360, 48px at 320). Now a `1fr auto 1fr` grid, so the buttons take real space. The title also drops to `--font-size-lg` under 480px, without which the three tracks pushed 13px past the edge at 320px |
| 51 | ~~**Keyboard below the fold at 1280×800**~~ | ~~Small~~ | ~~Fixed 2026-08-06~~ ✅ — new `@media (max-height: 880px)` tier drops to `--tile-size-sm`/`--key-height-sm` and tighter gaps. Keyboard bottom went 850 → 748 at 1280×800, 850 → 708 at 1280×720, 850 → 732 at 1366×768. 1440×900 and taller keep the full 62px tile |
| 52 | ~~**"Share Tournament" shows in non-tournament results**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — `setModal()` now hides it unless `eng.tournament`. Verified in a browser: hidden after a random and a daily game, shown after a tournament game. "Challenge a Friend" still shows in every mode, which is correct — it shares the word you just played |
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
  It also enforces the pool floors — ≥5 answers per theme per length, ≥15 five-letter per theme
  (the daily draws from those), no entry outside 4–7 letters, no duplicates, and an `ANSWER_POOLS`
  entry per length whose words are all in `VALID_SET`.
- Theme word lists could be expanded (currently ~20–30 words each, aim for 50+) — see 43/44
- Consider lazy-loading theme word lists to reduce initial bundle size
- All new features should maintain i18n support (EN + MY)
