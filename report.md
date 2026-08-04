# ch-4 Personal Project — Report

## Project
- **GitHub username:** @nyeinchan-lwin
- **Repo URL:** https://github.com/nyeinchan-lwin/wordguess
- **Live / download URL:** https://nyeinchan-lwin.github.io/wordguess/
- **License:** MIT
- **One-line summary:** A browser-based Wordle-style game — guess the hidden word from colour-coded letter feedback, across 11 themed word lists, 4 to 7 letters, with a daily challenge that is the same puzzle for everyone.

## Product-Intro Slides
- **Slides path:** slides/intro.md

## Demo Screenshots
- **Captured at:** 1280 px wide desktop and 390 px wide mobile, full page.
  Regenerate with `npm run screenshots` after any visual change.

![screenshot 1 — start menu with themes, word length and how-to-play](screenshots/01-menu.png)
![screenshot 2 — mid-game daily challenge with colour feedback](screenshots/02-game.png)
![screenshot 3 — win screen with stats and share options](screenshots/03-result.png)
![screenshot 4 — start menu on mobile](screenshots/04-mobile-menu.png)
![screenshot 5 — mid-game on mobile](screenshots/05-mobile-game.png)

## User Feedback
- **Collected feedback:** [feedback/user-feedback.md](feedback/user-feedback.md)
- **Playthrough notes:** [feedback/ai-playthrough.md](feedback/ai-playthrough.md)

## Notes (optional)
Built in plain HTML, CSS, and JavaScript — no framework, no build step, no runtime
dependencies. Open the live link and start guessing; both the on-screen and physical
keyboard work. Playwright is a dev dependency only, for the test suites in `test/`
(`npm test`).
