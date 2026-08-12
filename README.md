# WordGuess

> A Wordle-style word-guessing game — built in plain HTML, CSS, and JavaScript. No framework. No build step. No dependencies.

**▶️ Play the live game: https://nyeinchan-lwin.github.io/wordguess/**

![WordGuess menu screenshot](screenshots/01-menu.png)

---

## How to Play

1. You have **6 tries** (or **8 in Easy Mode**) to guess a hidden word — **4 to 7 letters**, your choice.
2. Type with your **physical keyboard** or tap the **on-screen keys**.
3. After each guess, the tiles change colour to show how close you are:

| Colour | Meaning |
|--------|---------|
| 🟩 **Green** | Right letter, right position |
| 🟨 **Amber** | Right letter, wrong position |
| ⬜ **Gray** | Not in the word at all |

4. Use the **💡 Hint** button (once per game) if you're stuck — it reveals one correct letter.
5. Toggle **Easy Mode** in Settings for 8 guesses instead of 6.

Pick a **theme** to draw from (Animals, Countries, Food and ten more), a **word length**,
and how awkward you want the letters to be — **Any**, **Easier letters** or
**Trickier letters**.

---

## Features

- **Five game modes:**
  - **Random** — a new word every play
  - **Daily Challenge** — one shared puzzle a day, the same word for everyone
  - **Weekly Tournament** — a running score across the week
  - **Timed** — five minutes, as many words as you can solve
  - **Practice** — unlimited guesses, nothing recorded
- **13 themes:** eleven year-round, plus Halloween and Winter which appear in season
- **Custom word lists:** import a `.txt`, or open a `?list=` link — every word is
  validated so an imported list can never build a board you cannot win
- **Word length & letter difficulty:** 4–7 letters; Any / Easier / Trickier letters
- **Dual input:** Physical keyboard + on-screen keyboard
- **Hint system:** One free hint per game
- **Easy Mode:** 8 guesses for a more relaxed experience
- **Dark Mode & High Contrast:** every state meets WCAG AA in all four combinations,
  and high contrast is genuinely higher-contrast than the default
- **Share results:** Copy your emoji scoreboard, or challenge a friend to your word
- **Stats per theme:** wins, streaks, guess distribution, average solve time, and
  which themes you play most
- **Achievements:** 12 badges
- **Responsive:** portrait and landscape, with a side-by-side board on landscape phones
- **Haptics:** a tap on each guess, where the browser supports it
- **Offline-ready:** service worker caches the game, and updates reach you rather
  than being cached forever
- **PWA:** add to your home screen as a standalone app

---

## Screenshots

| Desktop (1280×800) | Mobile (390×844) |
|---|---|
| ![Game in progress](screenshots/02-game.png) | ![Mobile game](screenshots/05-mobile-game.png) |
| ![Win result](screenshots/03-result.png) | ![Mobile menu](screenshots/04-mobile-menu.png) |

---

## Tech Stack

```
HTML5         → Semantic markup with ARIA roles
CSS3          → Custom properties, flexbox, keyframe animations
Vanilla JS    → ES6+ (IIFE pattern, no framework)
Service Worker→ Offline caching via sw.js (Workbox-free)
Manifest      → PWA installable web app
```

---

## Run Locally

```bash
# Any static file server works:
python3 -m http.server 8080
# then open http://localhost:8080
```

No build step, no `npm install`, no config.

## Tests

```bash
npm install        # Playwright, dev-only
npm test           # 11 suites: word lists, game flow, accessibility,
                   # daily modes, challenge links, screens, contrast and
                   # touch targets, game modes, offline, mobile, content
```

Individual suites: `npm run test:words`, `test:a11y`, `test:visual`, `test:modes`,
`test:offline`, `test:mobile`, `test:content` and the rest. `test:words` needs
neither a browser nor a server.

---

## License

[MIT](LICENSE)
