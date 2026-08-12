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
- Current verified local gate: **125/125** tests, static build/package audit,
  Capacitor Android/iOS synchronization, and deterministic fast QA pass.
- Current deployed milestone (2026-08-12): Normal D1 onboarding keeps Joey's
  rosters, rewards, and later pressure while using a finite opening budget:
  ordinary depths 2-6 `0.68/0.28/0.80/1.80` plus `4.5s` grace, first elite
  `0.45/0.22/0.75/2.00` plus `5.0s` grace, and first mini-boss
  `0.60/0.35/0.78/1.60` plus `3.5s` entry grace. D4's authored three-wave
  event and the steady player-following `NEXT ROOM` arrow remain intact;
  higher difficulties retain authored pressure. The **125/125** gate,
  `qa:fast`, package audit, native sync, and live desktop/tablet first-room
  smokes pass. Runtime commit `baaab57` is pushed to `origin/main` and
  deployed to preview `051a6921.code-quest-lab.pages.dev` and the configured
  hostname; source hash is
  `C937213507EEAC5F837DC7F733EB6DB950142BA8B412B2EA4FEEA9764D8C31C1`, PWA
  shell v11. This does not change the 93%/19% score: clean-player D1-D12 and
  physical/native-device evidence remain open.
- Prior input milestone (2026-08-11): the first Normal D1 combat room keeps a
  bounded, data-driven approach lane and now uses a brief `1.35s` mobile
  arrival window whose
  tangential drift is independent of the 10-second read-and-respond prompt.
  The prompt remains a damage grace state, not an enemy movement lock. Joey's
  roster, attack math, later procedural placement, stationary enemies, and
  authored modifiers remain intact. Runtime commit `ae91268` is pushed to
  preview `dfb05e32.code-quest-lab.pages.dev` and the configured hostname. The
  deployed source hash is
  `ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094`; the
  PWA shell is v11. The **121/121** release gate, `qa:fast`, package audit,
  native sync, both production checks, and desktop/tablet live smoke passed.
  A clean local route cleared the first room and reached the first mini-boss
  before ending; it does not claim full D1-D12 completion.
- Current release surface: D1, D2, D4-D12. D9 reaches Vow Breaker's Castle,
  D10 reaches The Abandoned Laboratory, D11 reaches Ranger Watchtowers, and
  D12 reaches Necromancer's Stolen Graveyard; promoted routes retain authored
  bosses/rewards, Veteran unlocks, portal exits, and final summaries. D13-D16
  remain gated until separately verified.
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
  6.1 simulated seconds without developer aids. Managed D1-D12 Mage coverage
  remains QA-assisted, not clean-player acceptance. A fresh current-build
  600x768 no-aid smoke cleared the opening room; bounded local runs also reached
  D1's first mini-boss before the browser-control batch stopped. This is progress
  evidence, not a full D1-D12 acceptance claim.
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
3. Finish clean D1-D12 evidence, then inspect D13 for bounded route/save/
   reward/return coverage. Stop cosmetic churn.
## Update protocol

- Read this file with `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`,
  `DECISIONS.md`, and `AUTORUN.md` at the start of every cycle.
- Update this file only when a durable fact, blocker, lesson, verified gate, or
  next-action priority changes.
- Replace stale statements in place and consolidate overlapping lessons.
- Keep this file under 120 lines; detailed history belongs in `CHANGELOG.md` and `COMPLETED_WORK.md`.
