---
marp: true
paginate: true
transition: fade
auto-advance: 20
---

# Who's my person?

Casual players and language learners who want a quick word game they can open right now — no app store, no account, no download.

Just a browser tab and a spare two minutes.

---

# Their problem

Every popular word game needs an app, an account, or a paywall.

There's no instant, lightweight Wordle you can just send someone a link to and have them playing in seconds — on any device, offline-capable, with nothing to install.

---

# What I built

**WordGuess** — a Wordle-style game in plain HTML, CSS, and JS. No framework. No build step.

Guess a hidden 5-letter word in 6 tries. Each guess flips to green / yellow / gray. Physical keyboard and on-screen keyboard both work.

**Live:** https://nyeinchan-lwin.github.io/wordguess/

---

# How I built it

**MCP** — `.mcp.json` wired the GitHub MCP server; used to verify auth and publish the repo without leaving the editor.

**Skill** — `design-system` defined every colour token, spacing value, tile/key spec, and WCAG rule. Invoked before every UI slice.

**Agent** — `design-reviewer` audited each slice for compliance. Caught a real contrast failure (2.7 : 1 → 4.8 : 1) and removed dead code.

---

# Why it matters

Zero install. Instant link. Runs on any device.

Built in vertical slices with Claude Code — each slice a shippable increment reviewed by a subagent before the next one started.

Accessible by default: WCAG AA contrast enforced by tooling, not by hand.

---

# Done

- [x] Repo public on GitHub
- [x] MCP + skill + agent used and documented
- [x] `report.md` committed to team repo
