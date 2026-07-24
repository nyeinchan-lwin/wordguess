<!-- Feedback template. Copy to your repo (e.g. feedback/feedback.md), fill, link in report.md.
     Use ONE of: interview / feedback / open-issues. This one = written feedback you collected. -->

# User Feedback — WordGuess

- **How collected:** 3 users played the live game at https://nyeinchan-lwin.github.io/wordguess/
- **When:** 2026-07-25

## Raw feedback

### User 1

1. **Wanted a "How to Play" button or a short guide on the main page** — wasn't sure how to play at first. The menu screen shows the game title and buttons but no instructions until you know to look for them.

### User 2

2. **Show the rules inside the game screen too, not only the menu** — had to go back to the menu to remember what the colours mean. Would be easier if the rules were visible during gameplay.

3. **Difficulty feels a bit hard** — needs tuning or an easier option. Some players may find the 6-guess limit with a large word pool challenging.

4. **Wants a hint function** — something to help the player when they're stuck (e.g., reveal a letter, or indicate which letters are in the word).

5. **Keyboard and grid on one page would look better** — UI layout suggestion to keep everything visible without scrolling.

6. **Loved the keyboard design and that both click and physical keyboard input work.** — positive feedback on the dual-input support and visual design of the on-screen keyboard.

### User 3

7. **[BUG] Share button does not work after winning** — the pop-up appears after winning but the Share button is unresponsive (can't click / nothing happens). This breaks the core share flow and is a high-priority bug.

8. **Difficulty feels quite hard** — especially challenging if the player's vocabulary is weak. The word pool may contain too many uncommon words.

9. **Wants a hint function** — would like hints that reveal some correct letters when stuck, similar to other word games.

10. **"No meaningless words" rule makes it harder** — the restriction adds extra difficulty for players with weaker vocabulary who can't easily think of valid 5-letter words.

11. **UX: clicking Share / Copy gives no feedback** — no visual indication that the share action worked. Wants a "Copied!" popup or toast so the user knows something happened.

## Themes (what keeps coming up)

| Theme | Mentions | Users |
|-------|----------|-------|
| Rules visibility / onboarding | 2 | User 1, User 2 |
| Difficulty & assistance | 3 | User 2, User 3 |
| Hint function | 2 | User 2, User 3 |
| UI layout | 1 | User 2 |
| Share / copy feedback (BUG) | 1 | User 3 |
| Keyboard / input design (positive) | 1 | User 2 |

## Items to fix (Chapter 6)

### 1. Add a "How to Play" section on the menu screen
- **Category:** usability
- **Priority:** high
- **Planned fix (Chapter 6):** Add a collapsible or visible "How to Play" guide on the menu screen explaining the rules, colour meanings, and basic gameplay.

### 2. Show colour legend inside the game screen
- **Category:** usability
- **Priority:** high
- **Planned fix (Chapter 6):** Add a small persistent colour legend (green = correct, yellow = present, gray = absent) inside the game screen so players don't have to go back to the menu.

### 3. Add a hint system
- **Category:** feature
- **Priority:** medium
- **Planned fix (Chapter 6):** Implement a hint button (e.g., once per game) that reveals one random letter's position or marks which letters are in the word.

### 4. Tune difficulty (optional easy mode)
- **Category:** difficulty
- **Priority:** low
- **Planned fix (Chapter 6):** Consider an "Easy Mode" with more guesses (8 instead of 6) or a smaller common-word subset.

### 5. Improve responsive layout (keyboard + grid on one page)
- **Category:** layout
- **Priority:** medium
- **Planned fix (Chapter 6):** Optimise the layout so both the grid and keyboard fit on one screen without scrolling, especially on mobile and smaller viewports.

### 6. [BUG] Share button unresponsive after winning
- **Category:** bug
- **Priority:** highest
- **Planned fix (Chapter 6):** Fix the Share button event handler so it properly copies the result to clipboard and opens the share dialog. Add console-error debugging to trace the issue.

### 7. Add "Copied!" toast feedback after share/copy
- **Category:** UX
- **Priority:** high
- **Planned fix (Chapter 6):** Add a brief visible "Copied!" toast or popup after the share button is clicked so the user gets immediate confirmation their result was copied.

### 8. Ease difficulty for weaker vocabulary players
- **Category:** difficulty
- **Priority:** medium
- **Planned fix (Chapter 6):** Add an "Easy Mode" option with a smaller common-word subset or allow more guesses (8 instead of 6). Also consider relaxing the "no meaningless words" validation slightly.

## Positive feedback (no fix needed)

- **Loved the keyboard design** — User 2 appreciated the clean visual design of the on-screen keyboard.
- **Dual input works well** — both mouse click and physical keyboard input are supported and responsive.

---

> *User 3 feedback collected 2026-07-25 via live game at https://nyeinchan-lwin.github.io/wordguess/*
