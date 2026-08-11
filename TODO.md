# WordGuess — Remaining Polish & Implementation

## ▶️ Start here next session

Stopped 2026-08-10. Working tree clean, `npm test` green (7 suites, 287 assertions).
Every numbered defect (#38–#62) is closed; what remains is feature backlog.
Everything is pushed, and GitHub Pages is serving it — the 2026-08-06 deploy had
failed (Pages' own deploy step timed out at 10 minutes, nothing to do with the
code), so the live site sat five days behind `main` until it was rebuilt.
Pages is on legacy branch builds, so a failed deploy shows no error to a visitor:
the previous build just keeps serving. Check `last-modified` on the live site,
not the page itself, when you want to know whether a change actually shipped.

Planned order:

1. ~~**#55** — the tab-reachable hidden screens.~~ ✅ Done 2026-08-08.
2. ~~**#56–#59** — the accessibility items from the same review.~~ ✅ Done
   2026-08-08, and **#16 closed with #57**. Every one was worse or wider than
   reported, so keep verifying before acting: the gear was 36×38 not 38×38,
   `.btn-back` was under the floor too, the invisible focus ring also affected
   `.btn-primary`, and six more selectors were animating under reduced motion.
3. ~~**#62** — muted text, dark keyboard labels and hue-as-text.~~ ✅ Done
   2026-08-09. Contrast is now swept rather than spot-checked: every visible
   text node, both screens, a challenge link, four colour modes.
4. ~~**#60–#61** — dead CSS and design-system drift.~~ ✅ Done 2026-08-10.
5. The rest of the older backlog (#3–#19) — all feature work now, no known
   defects outstanding. #15 may be a no-op; #19 is largely covered by the
   seven suites that now exist.

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

### Design review findings (2026-08-06)

From a `design-reviewer` pass over the header rework. The two defects it found
in `72338f8` are already fixed in `HEAD`; the rest are pre-existing and open.
**Only #53 and #54 below were verified in a browser by me** — the others are the
agent's report and should be reproduced before being acted on.

| # | Finding | Effort | Notes |
|---|---------|--------|-------|
| 53 | ~~**`hidden` on a `.btn` did nothing**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — `.btn { display: inline-flex }` is author-origin and outranks the UA `[hidden] { display: none }`, so #52's `tourBtn.hidden = !eng.tournament` was a no-op: the button stayed visible and clickable, and was merely dropped from the focus trap. Verified with the modal open (`display: flex`, 316×42, clickable) before adding `.btn[hidden] { display: none; }` |
| 54 | ~~**880px tier widened side padding on phones**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — the tier used the `padding` shorthand, so phones in the 700–880px band (390×844, 360×800) had side padding doubled from the base 8px to 16px, at the width where the board is tightest. Now `padding-block` only |
| 55 | ~~**Hidden screens stay tab-reachable**~~ | ~~Medium~~ | ~~Fixed 2026-08-08~~ ✅ — confirmed in a browser first, and it was worse than reported: the hidden menu was still laid out at its full 1265×800 with **23** tabbable controls, and the a11y tree carried *both* screens at once — two `banner` landmarks, two `main`s, two `h1`s, two Settings buttons stacked on the live game. `[data-screen][hidden] { display: none; }` fixes all of it. `showScreen` also sets `inert` on the outgoing screen, which covers the 200ms fade while it is still on screen. That made the deferred hide a hazard it had never been — a fast back-and-forth let a stale timeout hide the screen that had since become current, blanking the page — so the timeout now only hides what is still outgoing. Guarded by `test/screens.mjs`; reverting either half fails it |
| 56 | ~~**`.btn-settings` is ~38×38px**~~ | ~~Trivial~~ | ~~Fixed 2026-08-08~~ ✅ — measured 36×38, not 38×38, on both screens at every viewport, and `.btn-back` was 42px tall, also under the floor (the report only flagged its overflow). New `--touch-target` token; the floor had been spelled `44px` in five separate rules, which is why the header buttons were missed. The `max-height: 600px` tier hardcoded `height: 40px`, shorter than the buttons it holds, so it now derives from `calc(var(--touch-target) + var(--border-width))` — `box-sizing: border-box` counts the border against the height |
| 57 | ~~**High contrast mode is less legible than default**~~ | ~~Small~~ | ~~Fixed 2026-08-08~~ ✅ — **supersedes #16.** Both claims measured true: hc scored 2.73:1 and 1.93:1, and the default green 3.97:1 under the 4.5 the 12px bold key label needs. The orange/blue are chosen for hue separation under colour blindness, not luminance, so the hues stay and the *text* flips to black — 7.68:1 and 10.91:1. New per-state `--color-correct-text`/`-present-text`/`-absent-text` tokens make that expressible; a single `--color-state-text` could not. Default green darkened `#538d4e` → `#4a7f46` (3.97 → 4.76), which also lifts `--color-accent` and every button using it. Skill updated. Guarded by `test/visual-a11y.mjs`, which also asserts hc *beats* default rather than merely passing |
| 58 | ~~**No `:focus-visible` on chips**~~ | ~~Trivial~~ | ~~Fixed 2026-08-08~~ ✅ — all four had no ring of their own (plus `.lang-btn-sm`, which the report missed). The same defect ran wider than chips: `.btn:focus-visible` drew its ring in `--color-accent`, and `.btn-primary`'s background *is* the accent, so primary buttons had an invisible ring too. New `--color-focus-ring` (text colour, contrasts on surface and accent alike, light and dark) now backs every focus rule |
| 59 | ~~**Reduced-motion gaps**~~ | ~~Trivial~~ | ~~Fixed 2026-08-08~~ ✅ — the audit found more than the four listed: every chip, `.btn-howto`, `.btn-hint`, `.achievement-card`, `.toggle` and `.toggle::before` were uncovered as well. Replaced the selector list with a blanket `*, *::before, *::after` rule, because the confetti sets `animation` as an inline style from JS (script.js:1684) and nothing but `!important` reaches it. Durations go near-zero rather than `none` so the `animationend` cleanup listeners still fire |
| 60 | ~~**Dead CSS**~~ | ~~Trivial~~ | ~~Fixed 2026-08-10~~ ✅ — `.game-rule` matched nothing in `index.html`, `script.js` or `i18n.js`; both its rules removed. The `(max-width: 480px) and (max-height: 640px)` block was confirmed dead by measurement, not by reading: at 390×640 and 390×620 `.game-main` already computed to the `max-height: 700px` tier's `8px 4px`, not its own `4px 4px`. Removing it leaves every measurement byte-identical |
| 61 | ~~**Design-system drift**~~ | ~~Small~~ | ~~Fixed 2026-08-10~~ ✅ — skill now documents all five responsive tiers (height-driven as well as width) and warns against shadowed combined tiers; `--color-absent` corrected to `#737678`. `.btn-tournament-share` was worse than 'a size smaller': at 316×42 it and `.btn-play-again` were both under the 44px floor, and the ghost buttons only cleared it because of their 1px border. Fixed at the root with `min-height: var(--touch-target)` on `.btn`, plus one shared rule for the four stacked actions. `script.js` now derives `FLIP_MS`/`BOUNCE_MS` from `--duration-flip`/`--duration-bounce` instead of restating them |
| 62 | ~~**Muted text and dark keyboard labels miss AA**~~ | ~~Small~~ | ~~Fixed 2026-08-09~~ ✅ — narrower than first written: the *dark* muted value already passed (4.92:1), only the light one failed. `--color-text-muted` `#787c7e` → `#6e7275` (4.21 → 4.85). Dark keyboard labels flip to black, matching the #57 approach — `#818384` carries white at 3.81:1 and black at 5.51:1. The sweep also caught a third failure the first pass missed entirely: `.daily-theme-banner`, `.challenge-banner`, `.mode-badge`, `.guess-counter[data-low]` and the win message colour *text* with a state hue, and those hues are tuned to carry white on top, so on a dark page they sit at ~3.9:1. New `--color-*-ink` tokens (the mirror of `--color-*-text`) lighten them in dark mode. Guarded by a full-node sweep in `test/visual-a11y.mjs` across both screens, a challenge link and four colour modes — reverting the fix fails 12 of its assertions |

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
| 3 | ~~**Streak tracking by theme**~~ | ~~Small~~ | ~~Already done — verified 2026-08-10~~ ✅ — delivered by #2 and never ticked off. `emptyThemeStats()` carries `currentStreak`/`bestStreak` per theme, `updateStats` maintains them per theme, and `renderStats` reads `statsData[activeStatsTheme]`. Confirmed in a browser with seeded stats: all 2🔥/best 5, animals 4🔥/best 4, food 0/best 1 |
| 4 | ~~**Guess limit by theme**~~ | ~~Small~~ | ~~Closed 2026-08-11~~ ✅ — premise no longer holds. It rested on 'some themes could have fewer words', but #43/#44 took the pools from 235 to 662 with a floor of 8 per theme+length. Varying the guess count per theme would also make the per-theme distribution charts incomparable, which costs more than it buys. #30 covers deliberate difficulty instead |

### Visual / UX
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 5 | ~~**Theme indicator in game**~~ | ~~Trivial~~ | ~~Show theme name in header, not just mode badge~~ ✅ |
| 6 | ~~**Theme preview on hover**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — a preview line under the theme chips reporting the theme and how many answers it holds **at the length currently selected**, so the number matches the pool `pickWord` will draw from. Wired to `focusin` as well as `mouseover`, so it is not mouse-only, and the count also goes into each chip's `aria-label` — that reaches a screen reader without a live region announcing on every hover. Difficulty is deliberately excluded: it halves whatever this reports rather than changing what the theme contains |
| 7 | ~~**Animated theme switch**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — there is no word list on screen to fade, so the target is the #6 preview, which is the only theme-dependent text on the menu: selecting a theme fades it out and back rather than swapping instantly. The reduced-motion block neutralises the CSS transition but not the 120ms JS timeout behind it, so that is guarded separately — otherwise the text still lagged the click for someone who asked for no motion |
| 8 | ~~**Keyboard sound effects**~~ | ~~Small~~ | ~~Subtle click on keypress, ding on win~~ ✅ |
| 9 | ~~**Tile shake improvement**~~ | ~~Trivial~~ | ~~Done 2026-08-11~~ ✅ — the old shake drove four equal 4px reversals on `linear`, arriving at each extreme at full speed, which read as a buzz. Now a damped oscillation, 6px decaying to 1px over seven stops on `cubic-bezier(0.36, 0.07, 0.19, 0.97)`, so the row settles instead of stopping dead |
| 10 | ~~**Dark mode toast icon**~~ | ~~Trivial~~ | ~~Show 🌙/☀️ in dark mode toggle toast~~ ✅ |

### Mobile
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 11 | ~~**Haptic feedback**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — a 20ms tap on a submitted guess, a `[30,40,30]` double pulse on a refused one, a short flourish on a win. Feature-detected: `navigator.vibrate` is Chromium-and-Android only and iOS Safari has never supported it, so the settings row is hidden entirely where it would do nothing. Guarded both ways — that a browser without vibration still plays, and that nothing fires with the setting off |
| 12 | ~~**Landscape mode**~~ | ~~Medium~~ | ~~Done 2026-08-11~~ ✅ — worse than 'better layout': the stacked layout needed **524px of height on a ~390px viewport**, so the page loaded already scrolled with the header (Back, title, settings) off-screen above the fold. `.game-main` was also capped at `--layout-max-width` 500px, so an 844px-wide phone used none of its width. New `(orientation: landscape) and (max-height: 520px)` tier puts board and keyboard side by side, drops the cap, and shrinks tiles to 40px — they are not interactive, so `--touch-target` does not apply. Now fits with no scrolling at 667×375, 844×390 and 915×412. The tier had to go **after** the `max-height: 600px` block or that one shadowed its `.tile` rule — the same trap as #60 |
| 50 | ~~**Mobile header overlaps**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — the header was `justify-content: center` with both buttons absolutely positioned, so "← Back" sat on top of the title (13px of overlap at 390px, 28px at 360, 48px at 320). Now a `1fr auto 1fr` grid, so the buttons take real space. The title also drops to `--font-size-lg` under 480px, without which the three tracks pushed 13px past the edge at 320px |
| 51 | ~~**Keyboard below the fold at 1280×800**~~ | ~~Small~~ | ~~Fixed 2026-08-06~~ ✅ — new `@media (max-height: 880px)` tier drops to `--tile-size-sm`/`--key-height-sm` and tighter gaps. Keyboard bottom went 850 → 748 at 1280×800, 850 → 708 at 1280×720, 850 → 732 at 1366×768. 1440×900 and taller keep the full 62px tile |
| 52 | ~~**"Share Tournament" shows in non-tournament results**~~ | ~~Trivial~~ | ~~Fixed 2026-08-06~~ ✅ — `setModal()` now hides it unless `eng.tournament`. Verified in a browser: hidden after a random and a daily game, shown after a tournament game. "Challenge a Friend" still shows in every mode, which is correct — it shares the word you just played |
| 13 | ~~**PWA install prompt**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — captures `beforeinstallprompt`, shows a banner on the menu, and calls through on click; `appinstalled` clears it. The banner stays hidden unless the browser actually offers, so Safari and Firefox never see a button that would do nothing. Found while here: `manifest.json` still carried the pre-#57 `#538d4e` in both `theme_color` and the icon, so the installed app advertised a colour the game no longer uses. The suite now asserts the manifest and the `theme-color` meta both match `--color-accent` |

### Accessibility
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 14 | ~~**Screen reader theme announcement**~~ | ~~Trivial~~ | ~~Announce "Theme: Animals" when selected~~ ✅ |
| 15 | **Keyboard navigation for themes** | Trivial | Stats tabs ✅ (arrow keys done). Menu theme chips still Tab-only — that is spec-correct for a button group, so this may be a no-op; only worth doing if 12 tab stops feels tedious |
| 16 | ~~**High contrast theme chips**~~ | ~~Trivial~~ | ~~Closed 2026-08-08~~ ✅ — superseded by #57. Chips take their colours from `--color-accent`/`--color-state-text`, so the per-state text tokens and the darkened accent cover them; `body.hc` needs no chip-specific rules |

### Technical
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 17 | ~~**Service worker update**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — the item asked to cache theme word lists, which was already true (they live in `script.js`). Reading the file turned up two real defects instead. **`i18n.js` was absent from `ASSETS`** despite `index.html:246` loading it — Chromium's own HTTP cache covers for it in practice, so the offline assertions still pass without the fix, but it was never actually guaranteed offline. **The worker answered everything cache-first under a name that never changed**, so a returning visitor kept the files they first received: `wordguess-v1` was written in `3bd3809` and 64 commits shipped behind it. Now `v2`, network-first for the document (which decides what assets are asked for) and stale-while-revalidate for the rest. Guarded by `test/offline.mjs`, including a static check that whatever `index.html` references locally is in `ASSETS` — that is the class of bug, not just the instance |
| 18 | ~~**Performance audit**~~ | ~~Medium~~ | ~~Closed 2026-08-11~~ ✅ — measured rather than done. Core payload is 169,075 B raw / **45,355 B gzipped** with no framework and no dependencies, so there is nothing to chase. The suggested fix aims at the wrong target: word data is 28,363 B of `script.js` (29%) and `THEMES` alone is only 6,390 B, so lazy-loading themes saves a few KB gzipped in exchange for an extra request and a load-order dependency. No minification, which is the no-build-step architecture working as intended and mostly recovered by gzip |
| 19 | **Unit tests** | Medium | Test theme filtering, validation, stats |
| 20 | ~~**E2E tests**~~ | ~~Medium~~ | ~~`npm test` runs `test/run.mjs`, which serves the project and runs both suites (game flow + ARIA)~~ ✅ |

---

## 🚀 New Features (Future)

### Game Modes
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 21 | ~~**Word length selector**~~ | ~~Medium~~ | ~~4, 5, 6, 7 letter words~~ ✅ |
| 22 | ~~**Timed mode**~~ | ~~Medium~~ | ~~Done 2026-08-10~~ ✅ — `Timed Mode` on the menu. Five minutes counting down, a solve banks the word and deals another, running out of guesses recycles the word rather than ending the run, and the clock landing on zero closes it with a score and a persisted best (`wg_timed_best`). Kept out of the main stats and achievements entirely. Guarded by `test/game-modes.mjs`, which drives it on a fake clock |
| 23 | ~~**Multiplayer**~~ | ~~Large~~ | ~~Share a game link, compare results~~ ✅ |
| 24 | ~~**Tournament mode**~~ | ~~Large~~ | ~~Weekly competitions with leaderboards~~ ✅ |
| 25 | ~~**Practice mode**~~ | ~~Small~~ | ~~Done 2026-08-10~~ ✅ — `Practice` on the menu. The grid grows a row instead of ending the game, so guesses really are unlimited; the counter shows guesses taken rather than a countdown; a win still shows the modal but nothing reaches stats, streaks or achievements. `buildGrid` was split so a row grown mid-game is identical to one built up front |

### Content
| # | Feature | Effort | Notes |
|---|---------|--------|-------|
| 26 | ~~**More themes**~~ | ~~Small~~ | ~~Music, Movies, Technology, History, Art~~ ✅ |
| 27 | **Custom word lists** | Medium | Import your own word list via URL or file |
| 28 | ~~**Theme of the day**~~ | ~~Small~~ | ~~Featured theme rotates daily~~ ✅ |
| 29 | **Seasonal themes** | Small | Holiday-specific word lists |
| 30 | ~~**Difficulty levels**~~ | ~~Small~~ | ~~Done 2026-08-11~~ ✅ — `Any / Easier letters / Trickier letters` chips on the menu. There is no word-frequency data and a corpus would dwarf the word lists, so difficulty is scored from the letters a word is built from — mean English letter frequency, minus a penalty for repeats, which are a known source of wrong guesses. The pool splits at its own **median** rather than a fixed score: a fixed threshold empties the pool for a small theme, which is exactly the failure #44 was. Labelled for what it measures, not what it approximates — a sample of the 'trickier' half returned TOOTH, LIGHT, FLOOR, SHELL, all common words with awkward letters, so calling them 'Rare' would have been a lie |

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
| 36 | ~~**Win rate by theme**~~ | ~~Small~~ | ~~Already done — verified 2026-08-10~~ ✅ — delivered by #2. The stats overlay's theme tabs show played, win %, streak and best per theme |
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
- `npm test` serves the project on port 8123 (override with `WG_PORT`) and runs all seven suites.
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
