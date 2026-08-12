# Code Quest Lab architecture review

Updated: 2026-08-12
Scope: current working tree after the boss-identity, QA-simulation, save-
portability, player-guidance, D13 gated-content, device-handoff, PWA cache,
steady-guide regression, adaptive first-room guidance, released-route atlas,
viewport reflow, and safe-area overlay slices; `origin/main` is writable and
synchronized at tested local QA commit `830ce00`. The deployed runtime remains
`b5d701e` at the configured hostname and preview
`https://ce226dfb.code-quest-lab.pages.dev/`; the local source/mirror hash is
`124B67C1F1301212A25224BAFAC5AC06A6E693E23107A50C8A0A5BD50EC14318`.

## Executive result

The current game is stable enough to improve incrementally: the working tree
has **143 passing Node tests**, passing release contracts, a generated static
package, synchronized Capacitor assets, and an existing central room/enemy/
difficulty foundation. The largest risk is not a missing feature; it is the
cost and fragility of validating a very large inline runtime by repeatedly
playing it at normal speed.

This review therefore recommends a bounded architecture step rather than a
rewrite. The existing HTML/Canvas runtime remains canonical while shared
contracts, local developer controls, and deterministic logic tests make future
content safer to add and faster to verify.

## Implemented architecture slices - 2026-08-12

`getEncounterTuning(dungeonId)` remains the shared composition point for
difficulty tiers, dungeon scaling, and temporary Blood Moon/Titanic Foes rules.
The normal enemy path, miniboss path, Void Monarch compatibility path, and all
named boss spawners consume the same tuning snapshot. Boss-specific phases,
attacks, dialogue, visuals, and endings remain in their existing bespoke
systems; this change only removes repeated stat-composition formulas. Miniboss
HP and damage now also respect the selected difficulty, correcting the prior
inconsistency with normal enemies and final bosses.

The boss identity registry/helper now drives player-facing HUD and room
messaging for current and source-resident bosses, preventing the old generic
Stone Guardian label from misrepresenting later encounters. The loopback-only
QA layer and dependency-free fixed-seed simulator are active and excluded from
saves, exports, native packages, and production activation. The source mirror,
static build, Capacitor sync, deterministic fast QA, and full **143/143** local
test suite pass. The current local adaptive first-room hint, pointer-capture
fallback, and visual-viewport reflow are covered by focused contracts. This remains architecture
hardening; no checkpoint percentage is
claimed until the open clean-player/device evidence is completed.

## Findings by category

### Critical — current status

- **Resolved: boss identity was represented inconsistently.** The shared
  `BOSS_IDENTITY_DEFS` registry and `getBossIdentity()`/`getBossDisplayName()`
  helpers now drive HUD, recovery, and room-facing messaging for named bosses.
  The contract covers current and source-resident identities; do not reopen this
  as per-boss UI patches unless a regression is reproduced.
- **No release-breaking defect is currently known.** The full 143-test suite
  and release contracts pass, so broad gameplay rewrites are not justified by
  current evidence.

### Architectural

- The canonical runtime is one 58,304-line `index.html` containing UI, input,
  state, storage, encounter generation, AI, rendering, audio, and platform
  bridges. This is productive for a small offline game but expensive to reason
  about and easy to regress.
- Shared foundations already exist: `ROOM_DEFS`/route generators,
  `spawnEnemyByKind()`, `DUNGEON_SCALING`, `DIFFICULTY_DEFS`, common attack and
  damage paths, shared room-clear/exit handling, and a boss update/draw
  dispatcher. These should remain the seams for future extraction.
- Boss AI is still mostly one implementation per boss. The common dispatcher
  is a useful compatibility seam, but metadata, phase thresholds, labels,
  spawn branches, and finalization behavior are distributed across many
  sections. A registry and contract layer is the safest first consolidation.

### Duplication and coupling

- The runtime contains 18 boss spawn functions, 64 boss-related update
  functions, and 67 dungeon-specific update branches. Several later dungeons
  deliberately reuse earlier flag-driven behavior, which is good, but the
  scheduling and identity rules remain scattered.
- Boss mechanics, objective strings, and some reward/finalization behavior
  remain bespoke by design; player-facing boss identity is now derived from the
  authoritative registry. New content should extend that registry first.
- `loadRoom()` is a large state-transition hub. It is the correct place to
  preserve behavior for now, but new content should enter through configuration
  and shared helpers instead of another bespoke branch whenever practical.

### Performance and stability

- The file contains about 1,169 `Math.random()` call sites, 73 `setTimeout()`
  call sites, one interval, and 24 animation-frame scheduling sites. This does
  not prove a frame-rate problem, but it prevents reproducible simulation and
  makes timing-sensitive defects costly to reproduce.
- Runtime frame errors are caught and reported, which prevents a single
  optional effect from permanently stopping the loop. The existing error
  record is intentionally small; local QA needs structured encounter telemetry
  to identify phase, room, enemy count, and timing failures quickly.
- Object creation and array mutation are extensive in projectile, particle,
  summon, and hazard paths. Pooling should be considered only after a measured
  mobile performance issue; speculative pooling would add risk at this stage.

### Testing and workflow

- The 135 tests provide strong static/contract coverage for saves, lifecycle,
  input, route generation, package safety, profile transfer, D13 guards, and
  selected combat fixes.
- Fixed-seed encounter simulation, accelerated runtime mode, phase/room skip,
  and structured local QA telemetry now cover invariant combat checks in
  seconds. The remaining gap is human feel: a clean D1-D12 route and
  representative physical/tablet evidence cannot be replaced by the harness.
- Functional correctness and balance are deliberately separated in the
  workflow. The simulator asserts invariants such as collision, damage, phase
  transitions, finite summon convergence, victory/loss, and bounded timing;
  human play remains the authority for feel, clarity, and tablet responsiveness.

### Gameplay consistency

- The recent D4 playthrough confirmed finite Void Monarch summon pressure and
  a correct specific banner; the former generic HUD-label defect is now covered
  by the identity registry contract.
- Enemy spawning and dungeon scaling are already centralized enough to test
  representative early/mid/late configurations without replaying every room.
- Joey's story, classes, skills, dungeons, bosses, progression, dialogue,
  endings, and open-world direction remain creative constraints. This review
  does not remove or simplify those ideas.

### Balancing

- `DUNGEON_SCALING` is a valuable central table, but it carries both target
  percentages and compound multipliers plus legacy dungeon-specific modifiers.
  The values need invariant tests and a future normalization pass; changing
  them during an architecture task would mix functional correctness with
  balance tuning.
- Representative minimum-player, maximum-player, Normal, and highest
  difficulty simulations are more useful now than further manual attempts at
  one unfinished route.

## Completed architecture work and next boundary

- [x] Add one boss identity registry/helper used by HUD and room-facing
  representation, with regression tests for all shipped V1 bosses and later
  source-resident identities.
- [x] Add a loopback-only developer QA layer that supports accelerated simulation,
  high-damage mode, enemy-free mode, phase stepping, room completion, and a
  small telemetry overlay. Keep it session-only and excluded from saves,
  exports, native/public activation, and production claims.
- [x] Add a dependency-free deterministic encounter simulator with a fixed seed,
  configurable player/encounter profiles, phase transitions, collision and
  damage checks, finite summons, victory/loss, accelerated time, and structured
  results. Use early, mid, and late representative scenarios rather than
  duplicating every dungeon.
- [x] Add focused source contracts and simulator tests, then run the focused and
  full release gates after each logical group.
- [x] Update the testing workflow, roadmap, status, changelog, and checkpoint
  evidence. Do not increase the percentage unless the new evidence satisfies a
  named acceptance lane.
- [ ] After the active C1 player/device evidence is available, select the next
  measured architecture or open-world milestone; deploy only when it is stable,
  user-visible, fully tested, and within the current release boundary.

## Deliberately deferred

- Splitting the 58k-line HTML into modules before parity tests and a migration
  plan exist.
- Replacing every boss AI with one generic behavior tree. Boss-specific
  mechanics are part of Joey's creative direction; the shared contract should
  grow around them first.
- Object pooling, random-source replacement across the full renderer, and
  balance retuning without profiler or play-feel evidence.
- Expanding the V1 D1-8 route boundary or claiming full open-world completion.

## Acceptance for this architecture record

- A single helper produces the correct boss identity in the HUD and remains
  compatible with all existing boss flags.
- Local QA acceleration and test modes are loopback/query gated, session-only,
  observable, and never serialized/exported.
- Deterministic representative simulations complete in seconds and fail with
  structured diagnostics if a shared combat invariant regresses.
- Existing creative behavior and the 143-test baseline remain intact. D13
  reward/story parity is protected but the realm remains correctly gated until
  route, save, return, balance, and device acceptance are complete.
