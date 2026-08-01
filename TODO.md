# WordGuess — Remaining Polish & Implementation

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

---

## 🔲 Remaining Polish

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

- ⚠️ **Nothing above is committed.** Everything from "Polish (16 items)" onward — achievements, tournament,
  challenge links, sound, per-theme stats, and the a11y fixes — lives only in the working tree
  (~1,100 lines across 5 files, last commit `920af22`). Commit before starting anything new.
- `npm test` serves the project on port 8123 (override with `WG_PORT`) and runs both suites.
  Use `npm run test:flow` / `npm run test:a11y` against an already-running server, and
  `npm run test:browsers` if Playwright's Chromium is not installed yet.
- **og-image.png** still needs to be created (1200×630px) for social previews
- Theme word lists could be expanded (currently ~30 words each, aim for 50+)
- Consider lazy-loading theme word lists to reduce initial bundle size
- All new features should maintain i18n support (EN + MY)
