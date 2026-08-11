# Code Quest Lab - Rolling Project Memory

Updated: 2026-08-11
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
- Current verified local gate: **120/120** tests, static build/package audit,
  Capacitor Android/iOS synchronization, and deterministic fast QA pass.
- Current local milestone delta (pending checkpoint): the first Normal D1
  combat room now uses a bounded, data-driven approach lane
  (`132/28/18/84/36` side offset, side step, jitter, forward offset, and
  forward step). Joey's roster, attack math, later procedural placement, and
  stationary enemies are unchanged. A clean 600x768 smoke reached the room and
  showed enemy repositioning across two captures; the room clear remains open.
  The release build carries PWA shell v11.
- Previous deployed milestone: runtime commit `c6004be` is pushed to
  `origin/main` and the final build is deployed on 2026-08-11 to preview
  `6434f214` and the configured hostname; both production checks passed. The
  source/mirror hash is
  `A21333514999991BAE0725648B8CD018FB0B79EE2151570EB61419D25FD83112` and
  the PWA shell is v10. The temporary profile was paused, finished, and
  deleted; retained profiles were not changed.
- Current release surface: D1, D2, D4-D12. D9 reaches Vow Breaker's Castle,
  D10 reaches The Abandoned Laboratory, D11 reaches Ranger Watchtowers, and
  D12 reaches Necromancer's Stolen Graveyard; promoted routes retain authored
  bosses/rewards, Veteran unlocks, portal exits, and final summaries. D13-D16
  remain gated until separately verified.
- Canonical runtime: `index.html`; `code-quest-lab-source.txt` must remain an
  exact mirror after every runtime edit.
- Joey's story, classes, skills, bosses, dialogue, endings, and open-world
  direction are creative constraints, not optional complexity to remove.
- Level 1 relief is intentionally narrow: fresh Barbarian damage remains
  `0.75`; only the first Normal D1 combat room uses `0.50` health, `0.45`
  damage, `0.55` speed, `1.80` attack-cooldown scaling, a close lane, and a
  10-second read-and-respond grace window. Ordinary D1 combat depths 2-3 use
  the separate early-route budget (`0.90` health, `0.65` damage, `0.90` speed,
  `1.35` attack-cooldown scaling) on Normal only. Standard Expedition remains
  recommended while authored modifiers stay available.
- Fast QA models that two-enemy opening with the real melee cadence: it clears
  in 6.1 simulated seconds with the player alive and no developer aids.
- A disposable Mage completed a managed 13-minute 600x768 tablet session with
  visible Move/Attack controls, target lock, step movement, D1-D2 rewards and
  bosses, all Fallen King phases, pause, and Finish and Return to Dashboard.
- QA phase routing now dispatches the real custom fields for D2, D4-D12, and
  later corruption bosses. Managed Mage route coverage through D1-D12 and
  D4-D6 remains QA-assisted, not clean-player acceptance; browser diagnostics
  were clear.
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
- A managed browser can spend the first-room prompt in tool round-trips; use one
  rapid smoke sequence and claim a clean clear only when enemies are defeated.
  Keep intro repositioning active as the damage guard, and keep the bounded
  arrival step active for the whole prompt so a newly entered room never reads
  as a frozen sprite. The latest clean smoke proved movement but did not clear
  the room; do not count it as a completed D1-D12 route.
- The invincibility aid is page-session state. `CQLI` is idempotent and always
  enables it; verify the visible `Invincibility enabled` banner before combat
  after each fresh page/run. A page reload resets the aid. Keep it outside
  saves, exports, native builds, and production.
- Do not retry the same blocked surface without a material state change:
  physical-device, native-build, and owner approval gaps remain genuine.
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
