# WordGuess — Project Report

slides_url: slides/pitch.md
personal_repo_url: https://github.com/nyeinchan-lwin/wordguess

Evidence:
- path: .mcp.json
- path: .claude/skills/design-system/SKILL.md
- path: .claude/agents/design-reviewer.md
- path: slides/pitch.md
- path: CLAUDE.md

**Live:** https://nyeinchan-lwin.github.io/wordguess/

A Wordle-style word-guessing game built in plain HTML, CSS, and JavaScript
with no framework, no build step, and no runtime dependencies. Built
end-to-end using Claude Code.

---

## How I used Claude Code

### Skill — `design-system`

Stored in `.claude/skills/design-system/SKILL.md`. It defines every visual
decision in the project: CSS token names, colour values, spacing scale,
tile/key dimensions, animation timings, and WCAG contrast requirements.

Claude Code invoked it before every slice that touched `index.html` or
`style.css`, ensuring all CSS values flow through `var(--token)` — no
hardcoded numbers in rules.

### Subagent — `design-reviewer`

A read-only subagent (`design-reviewer`) audited UI files after each slice
for token compliance, accessibility, and dead code. Launched explicitly for
Slice 5, it caught a real WCAG AA failure: `--color-present` (`#b59f3b`)
was only 2.7 : 1 contrast on 12 px keyboard-key text. Fixed by darkening
to `#8a7000` (4.8 : 1). The same pass removed a dead `window.WG = {}`
stub and tokenised seven hardcoded `#ffffff` literals.

### MCP — `.mcp.json`

```json
{ "mcpServers": { "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" } } }
```

Wired the GitHub MCP server at project setup. Used to list repositories and
confirm GitHub authentication before any code was pushed. Subsequent
repository creation, branch push, and GitHub Pages configuration were
handled via `gh` CLI in the same authenticated session.

### Methodology — vertical slices

`CLAUDE.md` defines a seven-slice delivery plan; each slice is a playable
or reviewable increment that ships as its own commit.

| Slice | Deliverable |
|-------|-------------|
| 1 | Menu screen and screen-switching logic |
| 2 | Full English game — grid, keyboard, win/lose modal |
| 4 | Polish — flip animation, responsive layout, full token audit |
| 5 | Design-review fixes — contrast, dead code, new tokens |

The design-reviewer subagent ran after each UI slice, closing the loop
between implementation and spec on every increment.
