---
marp: true
paginate: true
transition: fade
auto-advance: 20
---

# Tech Stack

**Zero dependencies. Zero build steps. Zero frameworks.**

WordGuess is a single-page application running on plain:

- **HTML** — semantic markup with ARIA roles (`role="grid"`, `role="gridcell"`, `aria-live`)
- **CSS** — custom properties for every colour, spacing, and animation token
- **JavaScript** — one state object (`window.WG`), no libraries, no virtual DOM

Everything lives in static files served by any HTTP server:

```
wordguess/
├── index.html   # Shell: grid, keyboard, modal
├── style.css    # All visual styles
├── app.js       # Game logic (state machine, input, win/lose)
└── words.js     # Word list + daily-word picker
```

No `npm install`. No build step. Just open and play.

---

# Agents — `design-reviewer`

A **read-only subagent** that audits every UI slice for quality before it ships.

What it checks:

| Check | What it catches |
|-------|----------------|
| Design-system compliance | Hardcoded hex values, off-scale spacing, magic-number durations |
| Token completeness | Undefined `--var` references |
| State coverage | All 5 `data-state` values handled for tiles and keys |
| Animation hygiene | Flip, pop, shake animations + `prefers-reduced-motion` |
| Accessibility | ARIA roles, focus-visible, contrast ratios (WCAG AA) |
| Dead CSS / JS | Selectors matching nothing, unused exports |

**Real result:** Caught a 2.7 : 1 contrast failure and fixed it to 4.8 : 1 — a defect a human might have missed until the first accessibility audit.

---

# Skills — `design-system`

An **always-active rule set** that enforces every visual decision through a shared token vocabulary.

All colour, typography, spacing, and animation values live in one place:

| Token | Example | Usage |
|-------|---------|-------|
| `--color-correct` | `#538d4e` (green) | Right letter, right spot |
| `--color-present` | `#b59f3b` (yellow) | Right letter, wrong spot |
| `--color-absent` | `#787c7e` (gray) | Not in the word |
| `--space-3` | `0.75rem` | Tile padding, key gaps |
| `--font-size-xl` | `1.5rem` | Tile letters |

The skill is invoked before every UI slice. It means you never hardcode a value — every `border`, `gap`, and `animation-duration` references a named token. Design changes happen in one file, not a hundred.

---

# Methodology — Vertical Slices

The game was delivered in **6 vertical slices**, each a playable or reviewable increment:

| Slice | What shipped |
|-------|-------------|
| 1 | Static HTML shell + CSS grid/keyboard (no logic) |
| 2 | `words.js` word list + random word picker |
| 3 | Keyboard input: physical + on-screen |
| 4 | Guess evaluation + tile colour flip animation |
| 5 | Win/lose detection + end-game modal |
| 6 | Accessibility (ARIA, focus, reduced-motion) |

**Commit rule:** one Conventional Commit per slice (`feat:`, `fix:`, `style:`, `a11y:`).

Every slice was reviewed by the subagent before the next one started — no pile-up of technical debt, no late-surfacing design drift.

---

# Trigger — When Each Fires

| Mechanism | Trigger | Auto or Manual? |
|-----------|---------|-----------------|
| **Design system skill** | Creating or editing any UI file (`index.html`, `style.css`) | **Auto** — always active during UI work |
| **Design reviewer agent** | After any slice that touches `index.html` or `style.css` | **Manual** — you invoke it when ready for a review pass |

The skill is **passive enforcement**: it constrains what you write as you write it. The agent is **active verification**: it reads the final result and flags violations.

This separation means you never get slowed down during creative work, but you always get a quality gate before shipping.

---

# Commands

| What | Exact phrase |
|------|-------------|
| Apply design-system rules | `/design-system` |
| Run a design review | `/design-reviewer` |
| Start a worktree | `Start a worktree` |
| Commit a slice | `git commit -m "feat: add ... "` (Conventional Commit) |

**Workflow loop:**

1. Edit UI files — the design-system skill loads automatically
2. When the slice is ready, run `/design-reviewer`
3. Fix any findings flagged in the review report
4. Commit with a Conventional Commit message
5. Push or move to the next slice

No extra configuration. No CI pipeline to set up. The entire quality workflow lives inside the `.claude/` directory — checked into the repo, shared with every teammate.
