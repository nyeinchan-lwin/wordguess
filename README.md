# WordGuess

A Wordle-style word-guessing game — built in plain HTML/CSS/JS with no framework and no build step.

**▶️ Play: https://nyeinchan-lwin.github.io/wordguess/**

---

## How to Play

Guess the hidden **5-letter word** in **6 tries**. After each guess the tiles reveal your feedback:

| | Meaning |
|---|---------|
| 🟩 Green | Right letter, right spot |
| 🟨 Yellow | Right letter, wrong spot |
| ⬜ Gray | Not in the word |

Type with your keyboard or tap the on-screen keys. A new word is chosen every page load.

---

## Built with Claude Code

This project was built end-to-end using [Claude Code](https://claude.ai/code) across four vertical slices — each one a playable, committed increment.

| Slice | Deliverable |
|-------|-------------|
| 1 | Menu screen + screen-switching |
| 2 | Full game — grid, keyboard, win/lose modal |
| 3 | Polish — flip animation, responsive layout, full token audit |
| 4 | Design-review fixes — contrast, dead code, new tokens |

**Design-system skill** (`design-system/SKILL.md`) — encodes every CSS token, colour, spacing value, and WCAG requirement. Claude Code invoked it before touching any UI file, so there are zero hardcoded values outside `:root`.

**Design-reviewer subagent** (`design-reviewer.md`) — a read-only agent that audited UI files after each slice for token compliance, accessibility gaps, and dead code. It caught a real WCAG AA failure: `--color-present` was 2.7 : 1 contrast at 12 px and was darkened to clear 4.5 : 1.

**GitHub MCP** (`.mcp.json`) — wired the GitHub MCP server to confirm auth, then used `gh` CLI to create the remote, push commits, and enable GitHub Pages in one session.

---

## Tech

Plain HTML · CSS custom properties · vanilla JS — no framework, no build step, no dependencies.
