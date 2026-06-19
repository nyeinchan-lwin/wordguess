# WordGuess

A Wordle-style word game built in plain HTML, CSS, and JavaScript —
no framework, no build step, no dependencies.

**Live:** https://nyeinchan-lwin.github.io/wordguess/

---

## What the Game Does

Players get **6 attempts** to guess a hidden **5-letter word**.

After each guess, tiles flip to reveal per-letter feedback:

- **Green** — correct letter, correct position
- **Yellow** — correct letter, wrong position
- **Gray** — letter not in the word

An on-screen QWERTY keyboard tracks used letters across guesses.

---

## Skill: `design-system`

`.claude/skills/design-system/SKILL.md` defines the complete visual language:
colour tokens, spacing scale, tile and key dimensions, animation timings,
and WCAG contrast requirements.

Invoked before every slice that touched `index.html` or `style.css`.
All CSS values use `var(--token)` — zero hardcoded numbers in rules outside
the `:root` token block.

---

## Subagent: `design-reviewer`

A read-only subagent (`.claude/agents/design-reviewer.md`) reviewed every
UI slice for design-system compliance, accessibility gaps, and dead code.

Its Slice 5 report caught a real WCAG AA failure: `--color-present`
(`#b59f3b`) rendered keyboard key text at only **2.7 : 1** contrast.
The fix darkened it to `#8a7000` — **4.8 : 1** — passing AA at 12 px.

---

## MCP + Slice Methodology

`.mcp.json` wired the **GitHub MCP server**, used to verify authentication
and list repositories during setup.

Development used **vertical slices** — each a playable, reviewable increment:

| Slice | Deliverable |
|-------|-------------|
| 1 | Menu screen + screen switching |
| 2 | Full English game (grid, keyboard, win/lose) |
| 4 | Polish — animations, responsive layout, tokens |
| 5 | Design-review fixes — contrast, dead code, new tokens |

---

## Demo + Repo

Open the live site and play a round — the on-screen keyboard and physical
keyboard both work. Try a wrong guess to see the shake animation; a correct
one to see the flip reveal.

**Play:** https://nyeinchan-lwin.github.io/wordguess/

**Source:** https://github.com/nyeinchan-lwin/wordguess
