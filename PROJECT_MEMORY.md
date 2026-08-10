# Code Quest Lab - Rolling Project Memory

Updated: 2026-08-10
Mode: **Replace and consolidate; never append a chronological work log**

## Purpose

This is the project's single short-term learning memory. It records only the
current facts and durable lessons needed to choose the next useful action.
When a fact changes, edit or remove the old statement in place. Do not add a
second memory file, daily entry, repeated failure note, or cumulative session
transcript.

## Current state

- Active boundary: Checkpoint 1 - Core game stability and complete V1 path.
- Evidence score: **93% active checkpoint / 19% overall**. Automated work alone
  must not increase this score without satisfying a named acceptance lane.
- Current verified local gate: **113/113** tests, static build/package audit,
  Capacitor Android/iOS synchronization, and deterministic fast QA pass.
- Current release surface: D1, D2, D4-D12. D9 reaches Vow Breaker's Castle,
  D10 reaches The Abandoned Laboratory, D11 reaches Ranger Watchtowers, and
  D12 reaches Necromancer's Stolen Graveyard; promoted routes retain authored
  bosses/rewards, Veteran unlocks, portal exits, and final summaries. D13-D16
  remain gated until separately verified.
- Canonical runtime: `index.html`; `code-quest-lab-source.txt` must remain an
  exact mirror after every runtime edit.
- Joey's story, classes, skills, bosses, dialogue, endings, and open-world
  direction are creative constraints, not optional complexity to remove.

## Durable lessons

- The highest-value missing evidence is a fresh normal D1-12 player route and a
  10-30 minute touch-only/device session. The current build now proves managed-
  browser pause, reload, safe resume, and deliberate Finish For Now; do not
  repeat that check or substitute contracts for the remaining clean/device
  evidence. A fresh managed route has now completed D1 and D2 and reached D3,
  but it is still not full-route, clean-player, or physical-device evidence.
- The invincibility aid is page-session state and toggles. Verify the visible
  `Invincibility enabled` banner once before combat after each fresh page/run;
  an accidental disable produced a truthful D3 death summary, not a game
  defect. Keep the aid outside saves, exports, native builds, and production.
- Do not retry the same blocked surface without a material state change:
  B-009, B-010, and B-011 are resolved for the current loopback/GitHub/Pages
  checkpoint. Reopen only after a new failure or changed external target;
  physical-device, native-build, and owner approval gaps remain genuine.
- Use developer invincibility during permitted playthrough testing, but keep
  it loopback-only, session-only, and outside saves, exports, and production.
- Run `npm.cmd run qa:fast` before repeating long combat checks. The composite
  `release:verify` gate rebuilds and synchronizes generated web/native assets
  before tests, preventing stale-package loops.
- New encounter code must consume `getEncounterTuning(dungeonId)` rather than
  recreating dungeon/difficulty/modifier formulas. Mini-boss rosters route
  through `MINIBOSS_TYPES_BY_DUNGEON`; named boss mechanics may remain bespoke
  to preserve Joey's creative direction.
- A failed method is not progress. After three materially identical technical
  failures, change strategy; never exceed five materially identical gameplay
  attempts. Continue an independent acceptance item when one surface is blocked.
- GitHub and website checkpoints are for substantial, stable, user-visible
  milestones only. Do not deploy isolated tests, wording, or architecture
  housekeeping.

## Next-action rule

1. Recheck whether a recorded blocker has materially changed; do not probe it
   merely because a new cycle started.
2. If permitted browser evidence is available, extend the protected
  normal-control route from D3 with invincibility only after verifying its
  banner; do not count the managed run as full D1-12 or device evidence.
3. Otherwise finish the clean D1-12 evidence, then inspect D13 for a bounded
   promotion milestone with route, save, reward, and return coverage.
4. Stop cosmetic churn. One coherent verified delta is better than many small
   status rewrites.

## Update protocol

- Read this file with `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`,
  `DECISIONS.md`, and `AUTORUN.md` at the start of every cycle.
- Update this file only when a durable fact, blocker, lesson, verified gate, or
  next-action priority changes.
- Replace stale statements in place and consolidate overlapping lessons.
- Keep this file under 120 lines. If it grows, merge or delete obsolete detail.
- Detailed history belongs in `CHANGELOG.md` and `COMPLETED_WORK.md`, not here.
