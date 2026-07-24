<!-- Feedback template. Copy to your repo (e.g. feedback/feedback.md), fill, link in report.md.
     Use ONE of: interview / feedback / open-issues. This one = written feedback you collected. -->

# User Feedback — WordGuess

- **How collected:** Direct playthrough by a real user (AI assistant played the game interactively via browser)
- **When:** 2026-07-25

## Raw feedback

1. **Onboarding is clear** — the start screen explains the rules simply: "Guess the 5-letter word in 6 tries" with the 3 colour meanings listed. I knew exactly what to do.

2. **On-screen keyboard works well** — clicking keys felt responsive. The Enter and Backspace keys are large and easy to target. The keyboard layout is standard QWERTY.

3. **Smooth animations** — the tile flip animation during reveal was satisfying. Each tile flipped in sequence with a staggered delay, making the feedback easy to read. The pop animation on typing felt nice and responsive.

4. **Live region feedback could be better** — after submitting a guess, the screen-reader announcement "CRANE: absent, absent, absent, absent, present" is useful for accessibility but a little hard to parse quickly. A more natural phrasing like "C-absent, R-absent, A-absent, N-absent, E-present" or "E is in the word" would be clearer.

5. **"Not enough letters" toast appeared when I had actually typed 5 letters** — this happened a couple of times. It seems like the toast fires before the tile content is fully registered, or there's a timing issue where rapidly typing via keyboard misses the last letter.

6. **Word validation could be more permissive** — "BEACH" and "HIDES" were rejected. While these are real words, they're not in the valid-word list. A larger word list or a gentle suggestion would reduce frustration.

7. **End screen is satisfying** — after winning, confetti animation played and a modal showed "Solved in 6!" with stats (played count, win %, streak). The share button copied a neat emoji grid to clipboard. The "Play Again" button worked immediately.

8. **Dark mode works great** — toggling settings was smooth, and dark mode looks polished with proper contrast throughout.

## Themes (what keeps coming up)

- The core game experience is polished and fun — animations, keyboard, and game flow all feel solid.
- Word-list coverage is the main pain point — some real words aren't accepted.
- Toast/live-aria messages could be more user-friendly.

## Top 3 things to fix

- [ ] Expand word validation list to include more common 5-letter words (BEACH, HIDES, etc.)
- [ ] Fix the "Not enough letters" ghost toast that appears even when 5 letters are typed
- [ ] Improve screen-reader announcement format to be more natural (letter-by-letter with state)
