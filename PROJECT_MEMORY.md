# Code Quest Lab - Rolling Project Memory

Updated: 2026-08-12
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
- Current verified local gate: **138/138** tests, static build/package audit,
  Capacitor Android/iOS synchronization, and deterministic fast QA pass.
- Current deployed milestone (2026-08-12): the Town/entrance destination cue
  is a steady world-space arrow beside the player, rotating toward the
  portal/gate and following movement; there is no pulsing or gate-mounted
  arrow. Commit `4580631` is pushed to `origin/main` and deployed to preview
  `932a4fb6.code-quest-lab.pages.dev` and the configured hostname; source hash
  is `6E6998C32F899B48BC68C06439D213AE8D866B8068F84A29EBF7D5F10B79685A`.
  Production checks and live 1280x720/600x768 smokes pass with empty browser
  diagnostics. This does not change the **93% / 19%** score: clean-player
  D1-D12 and physical/native-device evidence remain open.
- Current local QA follow-up (2026-08-12): D13 is protected by three future-
  content contracts and remains gated; the local release gate is **138/138**.
  Its Joey-preserving standard reward boundary is now implemented locally:
  2.0x guardian souls, boss XP/mastery, named defeat statistics, death effects,
  and completion handoff. D13 is not credited until future-region progression,
  save, balance, and return work are complete. Joey's complete reference story
  beats are present and contract-tested; no longer cutscene is invented. No
  D13-specific loot is invented because Joey's reference does not define one.
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
  acceptance. The latest fourth 600x768 no-aid audit delivered one attack then
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
  Do not retry the same blocked surface without a material state change;
  physical-device, native-build, and owner approval gaps remain genuine.
- Run `npm.cmd run qa:fast` before long combat checks; `release:verify` rebuilds
  and synchronizes generated web/native assets first. New encounter code must
  use `getEncounterTuning(dungeonId)` and `MINIBOSS_TYPES_BY_DUNGEON`; named
  boss mechanics may remain bespoke for Joey parity.
- A failed method is not progress. After three materially identical technical
  failures, change strategy; never exceed five materially identical gameplay
  attempts. Continue an independent acceptance item when one surface is blocked.

## Next-action rule

1. Recheck whether a blocker materially changed; do not probe it merely because
   a new cycle started.
2. Do not restart consumed D1 handoff or D4-D6 QA routes. A future route run
   must be clean to close D1-D12; otherwise choose an independent lane.
3. Finish clean D1-D12 evidence remains the highest score-bearing lane, but the managed-browser method is loop-broken and must not be repeated; use the
  `DEVICE_ACCEPTANCE_RUNBOOK.md` packet when a materially different
  touch-capable/physical surface is available. D13 reward/story parity is
  audited and protected; reopen only for bounded save/return or route-
  promotion validation, not cosmetic churn.
## Update protocol

- Read this file with `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`,
  `DECISIONS.md`, and `AUTORUN.md` at the start of every cycle.
- Update this file only when a durable fact, blocker, lesson, verified gate, or
  next-action priority changes.
- Replace stale statements in place and consolidate overlapping lessons.
- Keep this file under 120 lines; detailed history belongs in `CHANGELOG.md` and `COMPLETED_WORK.md`.
