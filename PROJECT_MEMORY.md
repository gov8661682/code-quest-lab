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
- Current verified local gate: **116/116** tests, static build/package audit,
  Capacitor Android/iOS synchronization, and deterministic fast QA pass.
- Latest milestone checkpoint: runtime commit `7113366` is pushed to
  `origin/main` and deployed on 2026-08-10 to preview `caacd1f4` and the
  configured hostname; both production checks passed. Live smoke reached the
  fresh profile, Normal trial, Standard Expedition, and corrected D1 opening
  room. The source/mirror hash is
  `78FB1959FBF58656E4278CB3D418E7CCED8A465B10DD605F08333F9E84D1F44A`.
- Current release surface: D1, D2, D4-D12. D9 reaches Vow Breaker's Castle,
  D10 reaches The Abandoned Laboratory, D11 reaches Ranger Watchtowers, and
  D12 reaches Necromancer's Stolen Graveyard; promoted routes retain authored
  bosses/rewards, Veteran unlocks, portal exits, and final summaries. D13-D16
  remain gated until separately verified.
- Canonical runtime: `index.html`; `code-quest-lab-source.txt` must remain an
  exact mirror after every runtime edit.
- Joey's story, classes, skills, bosses, dialogue, endings, and open-world
  direction are creative constraints, not optional complexity to remove.
- Level 1 balance relief is intentionally narrow: fresh Barbarian damage is
  `0.75`; only the first Normal D1 combat room uses `0.65` health/damage/speed
  and a close starter lane. Standard Expedition is recommended on the first
  run, while the authored modifier choices remain available.
- Fast QA now includes an ordinary-player model of that two-enemy opening
  room: it clears in 7.2 simulated seconds with the player alive, proving the
  configured starter budget without developer aids. This is local regression
  protection; the deployed milestone remains the prior runtime checkpoint.
- The prior retained D1 handoff has been consumed: a loopback Mage route now
  reaches the D1-D12 final session summary with the bounded QA route aid. This
  remains QA-assisted evidence, not clean-player acceptance.
- A disposable Mage completed a managed 13-minute 600x768 tablet session with
  visible Move/Attack controls, target lock, step movement, D1-D2 rewards and
  bosses, all Fallen King phases, pause, and Finish and Return to Dashboard.
  The disposable profile was deleted; retained profiles remain intact.
- `developerQaAdvanceBossPhase` now dispatches the real custom phase fields for
  D2, D4-D12, and later corruption/Pure Corruption bosses; the exact source
  mirror and **115/115** release gate are green.
- A fresh loopback Mage route extended managed coverage through D4-D6,
  including D4's Void Monarch, D5's Chieftain phase 3, and D6's Archmage
  defeat handoff. It used bounded QA aids after a high-health D4 elite pair
  became impractical at normal Mage damage; keep this separate from clean
  player evidence. The browser recorded no warning/error diagnostics.

## Durable lessons

- The highest-value missing evidence is a fresh normal D1-12 player route
  without developer encounter aids and physical/native-device acceptance. A
  managed 13-minute tablet session now exists; do not repeat it or substitute
  managed-browser evidence for physical-device evidence.
- On the 600x768 tablet layout, use the visible Attack joystick's center-lock
  hold for nearest-target combat. Desktop canvas taps can be misleading when a
  target overlaps the encounter banner; this is a managed-input observation,
  not a confirmed production blocker.
- Large D4 rooms can place a live target outside the tablet viewport. Follow
  the on-screen TARGET/THREAT edge indicator before changing combat logic; a
  short south-west movement brought the remaining target into view and the
  normal target lock then defeated it.
- A managed web browser can spend the first-room read-and-respond window in
  tool round-trips; record a no-cheat clear only when the player actually
  defeats the enemies. The Level 1 local smoke cleared the room with the
  visible loopback invincibility aid, while live smoke verified load, close
  placement, and attack damage without claiming a clean clear.
- The invincibility aid is page-session state. `CQLI` is idempotent and always
  enables it; verify the visible `Invincibility enabled` banner before combat
  after each fresh page/run. A page reload resets the aid. Keep it outside
  saves, exports, native builds, and production.
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
2. Do not restart the consumed D1 handoff or repeat the completed D4-D6 QA
   route. A future route run must be clean if it is intended to close the
   D1-D12 lane; otherwise move to the next independent acceptance item.
3. Finish clean D1-D12 evidence, then inspect D13 for a bounded promotion
   milestone with route, save, reward, and return coverage.
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
