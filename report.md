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

I built WordGuess in vertical slices with Claude Code, where each slice was a playable increment — starting with the menu screen and screen-switching logic, then the full English game (grid, keyboard, win/lose modal), and finally a polish pass covering flip animations, responsive layout, and a full token audit. After completing each slice I committed the result, using the design-system skill throughout to keep every CSS value flowing through named tokens and maintain a consistent UI without hardcoded numbers. Before deploying, I ran the design-reviewer subagent to catch accessibility issues, which surfaced a real WCAG AA contrast failure and removed dead code. Finally, I used the GitHub MCP server to confirm authentication and publish the project to GitHub Pages.
