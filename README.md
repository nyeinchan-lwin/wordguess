# WordGuess

A Wordle-style word-guessing game built in plain HTML, CSS, and JavaScript —
no framework, no build step, no dependencies.

**Live:** https://nyeinchan-lwin.github.io/wordguess/

---

## How to play

Guess the hidden **5-letter English word** in **6 tries**.

After each guess, every tile flips to show per-letter feedback:

| Colour | Meaning |
|--------|---------|
| Green | Correct letter, correct position |
| Yellow | Correct letter, wrong position |
| Gray | Letter not in the word at all |

Use the feedback to narrow down the answer. The keyboard below the grid
tracks which letters you have already evaluated.

**Input — physical keyboard:** type letters, press Enter to submit,
Backspace to delete.

**Input — on-screen keyboard:** tap letter keys to type, the wide Enter
and ⌫ keys to submit or delete. Works on mobile with no extra setup.

A new word is chosen at random each time you load or reload the page.

---

## Run locally

Any static file server works — no build step required:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Built with Claude Code

This project was built end-to-end using [Claude Code](https://claude.ai/code),
Anthropic's CLI for AI-assisted software engineering. Below is exactly where
each Claude Code feature was used.

### Skill — `design-system`

Defined in `.claude/skills/design-system/SKILL.md`. The skill encodes the
complete visual language for the project: CSS custom-property names and
their values, the spacing scale, tile and keyboard-key dimensions, animation
timings, state-colour mappings, and WCAG accessibility requirements.

Claude Code invoked this skill automatically before every slice that touched
`index.html` or `style.css`. The result is that all CSS rules reference
`var(--token)` — there are zero hardcoded colour, size, or timing values
outside the `:root` token block.

### Subagent — `design-reviewer`

Defined in `.claude/agents/design-reviewer.md`. This read-only subagent
reads UI files and audits them for design-system compliance, accessibility
gaps, and dead code. It was launched after each UI slice and reported
findings grouped by severity.

Its most significant catch (Slice 5 review): `--color-present` (`#b59f3b`)
produced only **2.7 : 1** contrast between keyboard-key text and background
at 12 px — a genuine WCAG AA failure. The fix darkened it to `#8a7000`,
raising contrast to **4.8 : 1**. The same review pass removed a dead
`window.WG = {}` stub and replaced seven hardcoded `#ffffff` literals with
a new `--color-state-text` token.

### MCP — `.mcp.json` GitHub server

`.mcp.json` at the project root wires the GitHub MCP server:

```json
{ "mcpServers": { "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" } } }
```

This was used at project setup to list repositories and confirm that GitHub
authentication was live before any code was pushed. Later, `gh` CLI commands
(backed by the same auth) created the remote repository, pushed all commits,
and enabled GitHub Pages in a single session.

### Slice methodology

Development followed a **vertical-slice plan** defined in `CLAUDE.md`.
Each slice is a self-contained, playable or reviewable increment — nothing
is left half-finished between commits.

| Slice | Commit | Deliverable |
|-------|--------|-------------|
| 1 | `b4f63cf` | Static HTML shell, menu screen, screen-switching logic |
| 2 | `a7b3be7` | Full English game — grid, on-screen keyboard, win/lose modal |
| 4 | `5e011bc` | Polish — tile-flip animation, responsive layout, hover states, full token pass |
| 5 | `0eca5ad` | Design-review fixes — contrast, dead code, seven new tokens |

Slices 3 (Japanese game) and 6–7 (accessibility, hard mode, share button)
are planned but not yet implemented.

---

## Repo

https://github.com/nyeinchan-lwin/wordguess
