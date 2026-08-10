# Code Quest Lab - Decisions

Updated: 2026-08-08

## D-001 - Preserve the existing game

The current HTML/Canvas game is the canonical baseline. Work proceeds incrementally. No full rewrite or broad source split is allowed until parity tests protect the gameplay loop, save format, and visible navigation.

## D-002 - Offline-first, local-only V1

No accounts, backend, cloud saves, chat, multiplayer, analytics, or advertising are required for V1. This reduces privacy, reliability, and store-review risk. Local saves need backup and corruption recovery because browser/native storage can be cleared or interrupted.

## D-003 - V1 commerce model

Use one non-consumable full-game unlock behind a parent gate. Keep store calls in platform adapters and provide a development entitlement mode. Browser builds do not invent a separate payment path.

## D-004 - Child-safe defaults

The primary audience is secondary-school students approximately 13-17. This is not an automatic Kids-category decision, but the product remains teen-safe by default: no behavioral ads, no chat, no unnecessary permissions, no loot boxes, and no manipulative purchase flow.

## D-005 - No placeholder release surface

Unfinished systems are either completed, hidden from the V1 navigation, or clearly labeled as post-release content. Disabled buttons that look like promised V1 features are not acceptable.

## D-006 - No unverified asset acquisition

Use only original/procedural assets or assets with a recorded commercial license. Do not download third-party game art, music, fonts, or branding without an explicit provenance record.

## D-007 - Provisional application identity

Display name remains `Code Quest Lab`. Recommended provisional bundle identifier is `com.gov8661682.codequestlab`, pending owner confirmation and availability checks. This is not a trademark or identifier clearance.

## D-008 - Genuine but optional learning support

The game remains a fantasy action RPG first. Learning Support may explain patterns, sequencing, planning, decomposition, optimization, conditions, loops, cause-and-effect, and debugging after play, but it must not turn the adventure into a forced quiz or make unsupported claims about programming or academic outcomes.

## D-009 - Tablet session design

Landscape tablet touch is the primary path. V1 targets natural 10-30 minute sessions with checkpoints, autosave, pause/resume, suspension recovery, session summaries, next-step suggestions, and explicit stopping points. Engagement comes from mastery and fun, not streaks, energy, scarcity, or pressure.

## D-010 - Checkpoint control files are canonical

`CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`, `DECISIONS.md`, `CHECKPOINTS.md`,
`PROJECT_PROGRESS.md`, `BLOCKERS.md`, `BACKLOG.md`, and `CHANGELOG.md` are the
control record for autonomous progression. At the beginning of a work cycle,
read the current checkpoint, completed ledger, and decisions before selecting a
task. Only one checkpoint may be active.

## D-011 - Checkpoint 1 is the active work boundary

The active checkpoint is `Checkpoint 1 - Core game stability and complete V1
path`. The highest-priority unmet criterion is a fresh-profile, player-completed
D1-12 path through the final portal/ending plus the remaining meaningful
session/device evidence. The locally verified release surface is D1, D2, and
D4-D12; D13 and later remain gated. Do not start creative parity, monetisation,
native integration, or broad refactoring while this criterion remains open
unless a verified blocker or regression requires it.

## D-012 - Deployment evidence is separated from local verification

`32d83d0` is the prior stable runtime base; control-record commit `194bcc5`
records the project controls. `bf07810` is the last website checkpoint because
the current follow-up contains an incomplete open-world/design review and
copy-only usability fixes, not a stable major milestone. A later major
milestone must repeat tests, build, push, deploy, live verification, and status
recording. Minor documentation, test-only, or incomplete usability changes do
not trigger a deployment.

## D-013 - Joey parity remains protected but does not silently expand V1

Joey's named story, characters, classes, skills, dungeons, bosses, dialogue,
endings, and distinctive mechanics remain the creative reference. Ranger,
Necromancer, Alchemist, Paladin, D9-16, D16 Phase 4, and Smelter work stay in
the documented parity backlog unless the owner explicitly changes the V1 scope.
The D1-8 release guard remains in force.

## D-014 - Evidence outranks representation

Code presence, comments, route generators, or a source-resident boss function
does not prove a feature is release-ready. A feature is complete only when its
acceptance criteria, automated contracts, relevant manual play, documentation,
and required milestone checkpoint are evidenced. Stale comments may be fixed;
creative behavior must not be removed merely to simplify the code.

## D-015 - Owner blockers are recorded once and worked around safely

Missing JDK/Android SDK, Mac/Xcode, store products/access, physical devices,
legal approvals, and publication approval are recorded in `BLOCKERS.md` and
`OWNER_ACTIONS.md`. Codex should prepare exact commands and all independent
work, then stop retrying the same blocked action until the owner changes the
external state.

## D-016 - Explicit open-world direction, staged behind evidence

The owner has explicitly chosen an open-world direction for Code Quest Lab.
The target is a compact, connected, hand-authored world with Town as a home
region, discoverable landmarks and waypoints, meaningful destination choices,
and authored dungeons as regional landmarks. It is not an infinite map,
multiplayer service, cloud world, or live-service pressure system.

`OPEN_WORLD_DIRECTION.md` is the canonical design and technical target. Town,
entrance hubs, `worldLocation`, waypoints, region registries, save migrations,
and the current room engine should be extended toward that target. The V1 D1-8
release guard remains in force, and Checkpoint 1 remains active: open-world
design is allowed now, but new regions, broad refactors, and untested
exploration systems do not interrupt the current player-completion evidence.

## D-017 - Plain-text profile transfer preserves local progress without overwrite

The game now exports a versioned `CODE QUEST LAB PROFILE EXPORT` text envelope
from Manage Data. It includes the current durable profile, a valid local backup,
and any valid active-run checkpoint. Import creates a new local profile, leaves
the current profile untouched, and performs no network or cloud synchronization.

The current runtime class whitelist is enforced during import so unsupported
future Joey classes are rejected safely rather than silently mapped to another
class. This is a convenience transfer/backup format, not account sync, cloud
backup, or evidence that the full cross-version/device save milestone is
complete.

## D-018 - Autonomous work is bounded and progress is evidence-scored

`AUTORUN.md` is the canonical autonomous work protocol. Every work cycle must
produce a concrete progress delta against the active checkpoint. Three
materially identical technical failures require a strategy change; five
materially identical gameplay/manual attempts require the route to stop and
the evidence to be recorded. Small variations do not reset either count.

`CURRENT_CHECKPOINT.md` displays the main active-checkpoint and overall-project
percentages. The active score is the sum of earned points in its 100-point
acceptance table. Overall progress is the completed-checkpoint count plus the
earned share of the active checkpoint across the ten documented checkpoints.
Scores change only when named evidence changes and never replace acceptance
criteria or release gates.

## D-019 - Fast functional QA precedes repeated manual play

The game remains a browser-first, human-feel product, but invariant combat
checks must not depend on repeated normal-speed Codex playthroughs. The
fixed-seed `tools/qa/fast-combat-sim.mjs` suite is the first functional gate
for representative attacks, collision, damage, phases, finite summons,
victory, loss, timeout, and accelerated modes. Loopback developer controls may
accelerate the real browser runtime and expose local telemetry, but they are
session-only, gated, not exported, and not part of player progression. Human
play remains required for touch, rendering, comprehension, fun, pacing, and
final balance.
