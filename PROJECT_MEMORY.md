# Code Quest Lab - Rolling Project Memory

Updated: 2026-08-12
Mode: **Replace and consolidate; never append a chronological work log**

## Purpose

This is the project's single short-term learning memory; edit stale facts in place. Do not add a second memory file, daily entry, repeated failure note, or
cumulative session transcript.
## Current state
- Active boundary: Checkpoint 1 - Core game stability and complete V1 path.
- Evidence score: **93% active checkpoint / 19% overall**. Automated work alone
  must not increase this score without satisfying a named acceptance lane.
- Current verified local gate: **153/153** tests, static build/package audit,
  Capacitor Android/iOS synchronization, deterministic fast QA, and a bounded
  no-aid mechanics pass over all 11 released finales.
- Current deployed milestone (2026-08-12): the bounded, save-compatible
  `WorldState` plus shared `WorldRegion`/`WorldConnection` registry is live on
  top of the retained open-world/Town, tablet-control, and audio foundations.
  Runtime `f0ce0e9` was published to preview
  `596095e6.code-quest-lab.pages.dev` and the configured hostname; source hash
  is `AA469B00C64FDE728A04BBE088CC92E2F767075E7C590AFC1F044DE4D2E611F1`.
  Production checks, 151/151 release verification, deterministic fast QA, and
  live Atlas/shell smokes pass. Score stays **93% / 19%**:
  clean-player D1-D12 and physical/native-device evidence remain open.
- Current verified follow-up (2026-08-12): legacy profiles migrate their
  discovered routes from existing unlocks and current location; the Atlas
  renders Town plus the 11 released destinations, honest lock/connection state,
  and `1/11 routes charted` for a fresh Mage. D13 stays gated until future-
  region progression, save, balance, return, and device evidence exist. The
  `TO DEPTHS`, `TO GATE`, and `NEXT ROOM` cues still stay beside the character;
  no gate-mounted pulse is used.
- Owner handoff: `npm.cmd run acceptance:report` seeds a dated report with the
  commit/source hash and refuses overwrite; it is preparation only. The current
  local gate is **153/153**, while deployed `f0ce0e9` remains **151/151** and
  physical/device evidence is still required.
- Current portability QA (2026-08-12): checked-in synthetic `.txt` fixtures
  cover legacy v1, current v2 Mage data with backup and active-run checkpoint,
  invalid optional checkpoints, future v3, and unsupported Ranger content. A
  real file-chooser smoke imported current v2 on fresh origin `127.0.0.2:4193`
  and recovered D1 room `d1_room_a` at Level 7/42 Souls; legacy v1 imported on
  `127.0.0.3:4193` as Level 5/17 Souls. Physical/true-cross-device and
  baseline-to-release runtime evidence remain open; no cloud-sync claim.
- Current release surface: D1, D2, D4-D12. D9 reaches Vow Breaker's Castle,
  D10 reaches The Abandoned Laboratory, D11 reaches Ranger Watchtowers, and
  D12 reaches Necromancer's Stolen Graveyard; promoted routes retain authored
  bosses/rewards, Veteran unlocks, portal exits, and final summaries. D13-D16
  remain gated. D13 preflight confirms the two-room Realm of Space route,
  named boss, and standard reward boundary are present, but future-region
  progression, dialogue, save/resume, balance, and return handoff remain open.
- Canonical runtime: `index.html`; `code-quest-lab-source.txt` must remain an
  exact mirror after every runtime edit.
- Joey's story, classes, skills, bosses, dialogue, endings, and open-world
  direction are creative constraints, not optional complexity to remove.
- Level 1 relief remains narrow and Normal-only: the opening room keeps its
  `0.50/0.45/0.55/1.80` budget and 10-second read-and-respond grace window;
  ordinary D1 depths 2-6 now use `0.68` health, `0.28` damage, `0.80` speed,
  `1.80` attack-cooldown scaling, and `4.5s` grace; the first Normal D1 elite
  uses `0.45` health, `0.22` damage, `0.75` speed, `2.00` attack-cooldown
  scaling, and `5.0s` grace; the first D1 mini-boss uses
  `0.60/0.35/0.78/1.60` plus a `3.5s` entry grace. Joey's rosters and
  mechanics remain intact; higher difficulties and later rooms retain their
  authored scaling. Standard Expedition remains recommended.
- Fast QA models the two-enemy opening with real melee cadence and clears it in
  6.1 simulated seconds without developer aids. It now also models a fresh
  Normal Mage against the first Stone Guardian: one authored summon phase,
  real incoming damage, and victory in 9.15 simulated seconds without any QA
  aid. Managed D1-D12 Mage coverage remains QA-assisted, not clean-player
  acceptance. First-room guidance now adapts to pointer versus touch controls; the latest fourth 600x768 no-aid audit delivered one attack then
  died during an attack-only/no-movement follow-up; this is input evidence,
  not a full D1-D12 acceptance claim or a reason for another global nerf.
## Durable lessons

- The highest-value missing evidence is a fresh normal D1-12 player route
  without developer encounter aids and physical/native-device acceptance; do
  not substitute managed-browser evidence for physical-device evidence.
- On 600x768 use the visible Attack joystick's center-lock hold for nearest
  targets; desktop canvas taps can be misleading under the encounter banner.
- Large D4 rooms can place a live target outside the tablet viewport. Follow
  the TARGET/THREAT edge indicator before changing combat logic; a short
  south-west movement brought the remaining target into view.
- Use one rapid smoke sequence and claim a clean clear only when enemies are
  defeated. Keep intro damage grace separate from the short arrival timer so a
  long prompt cannot hold an orbit. The latest clean smoke reached the first
  mini-boss but did not finish it; it is not a D1-D12 route.
- The invincibility aid is page-session state: `CQLI` idempotently enables it;
  verify the visible banner after each fresh run. Reload resets it; keep it
  outside saves, exports, native builds, and production.
- Native readiness is still environment-gated: `native:doctor` sees the Android
  project, but `java`/`JAVA_HOME`, Xcode, and physical devices are unavailable.
  Capacitor `native:sync` and `native:android:build` now resolve the real Git
  root through junctions, preventing generated Android/iOS path corruption.
  Do not retry the same blocked surface without a material state change;
  physical-device, native-build, and owner approval gaps remain genuine.
- Run `npm.cmd run qa:fast` before long combat checks; `release:verify`
  rebuilds/synchronizes generated web/native assets first. New encounter code
  must use `getEncounterTuning(dungeonId)` and `MINIBOSS_TYPES_BY_DUNGEON`; named boss mechanics may remain bespoke for Joey parity.
- A failed method is not progress. After three materially identical technical
  failures, change strategy; never exceed five materially identical gameplay
  attempts. Continue an independent acceptance item when one surface is blocked.

## Next-action rule

1. Recheck whether a blocker materially changed; do not probe it merely because
   a new cycle started.
2. Do not restart consumed D1 handoff or D4-D6 QA routes. A future route run
   must be clean to close D1-D12; otherwise choose an independent lane.
3. Finish clean D1-D12 evidence remains the highest score-bearing lane, but the
  managed-browser method is loop-broken and must not be repeated; use the
  `DEVICE_ACCEPTANCE_RUNBOOK.md` packet when a materially different
  touch-capable/physical surface is available. The `f0ce0e9` world-state
  milestone is deployed; do not repeat its Atlas smoke or create another
  checkpoint until new route/device evidence exists.
## Update protocol

- Read this file with `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`, `DECISIONS.md`, and `AUTORUN.md` at the start of every cycle.
- Update this file only when a durable fact, blocker, lesson, verified gate, or next-action priority changes.
- Replace stale statements in place and consolidate overlapping lessons. Keep this file under 120 lines; detailed history belongs in `CHANGELOG.md` and
  `COMPLETED_WORK.md`.
