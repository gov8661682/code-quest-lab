# Code Quest Lab architecture review

Updated: 2026-08-08
Scope: current repository at `1849c59` (`Record bounded boss deployment checkpoint`)

## Executive result

The current game is stable enough to improve incrementally: the baseline has
84 passing Node tests, passing release contracts, a generated static package,
and an existing central room/enemy/difficulty foundation. The largest risk is
not a missing feature; it is the cost and fragility of validating a very large
inline runtime by repeatedly playing it at normal speed.

This review therefore recommends a bounded architecture step rather than a
rewrite. The existing HTML/Canvas runtime remains canonical while shared
contracts, local developer controls, and deterministic logic tests make future
content safer to add and faster to verify.

## Findings by category

### Critical

- **Boss identity is represented inconsistently.** `loadRoom()` knows the
  dungeon-specific boss flags and the boss dispatch knows the concrete boss,
  but `updateHUD()` labels every non-Void Monarch boss as `Stone Guardian`.
  This misrepresents Joey's Fallen King, Chieftain, Valen, Hollow World Tree,
  Broker, and later boss content to the player. It is a shared UI defect, not a
  reason to patch individual encounters.
- **No release-breaking defect was found in the baseline.** The full 84-test
  suite and release contracts pass, so broad gameplay rewrites are not
  justified by current evidence.

### Architectural

- The canonical runtime is one 57,394-line `index.html` containing UI, input,
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
- Boss room flags, display names, objective strings, victory messages, and
  update dispatch keys are not derived from one authoritative identity map.
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

- The 84 tests provide strong static/contract coverage for saves, lifecycle,
  input, route generation, package safety, and selected combat fixes.
- The gap is fast gameplay logic validation: there is no fixed-seed encounter
  simulation, accelerated runtime mode, stage/phase skip, or structured local
  QA overlay. Normal-speed browser play is therefore doing work that can be
  tested in seconds by a deterministic harness.
- Functional correctness and balance are not yet clearly separated in the
  workflow. The proposed simulator will assert invariants such as collision,
  damage, phase transitions, finite summon convergence, victory/loss, and
  pause-safe state. Human play remains the authority for feel, clarity, and
  tablet responsiveness.

### Gameplay consistency

- The recent D4 playthrough confirmed finite Void Monarch summon pressure and
  a correct specific banner, while exposing the generic HUD-label defect above.
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

## Implementation plan

1. Add one boss identity registry/helper used by HUD and room-facing
   representation, with regression tests for all shipped V1 bosses and later
   source-resident identities.
2. Add a loopback-only developer QA layer that supports accelerated simulation,
   high-damage mode, enemy-free mode, phase stepping, room completion, and a
   small telemetry overlay. Keep it session-only and excluded from saves,
   exports, native/public activation, and production claims.
3. Add a dependency-free deterministic encounter simulator with a fixed seed,
   configurable player/encounter profiles, phase transitions, collision and
   damage checks, finite summons, victory/loss, accelerated time, and structured
   results. Use early, mid, and late representative scenarios rather than
   duplicating every dungeon.
4. Add focused source contracts and simulator tests, then run the focused and
   full release gates after each logical group.
5. Update the testing workflow, roadmap, status, changelog, and checkpoint
   evidence. Do not increase the percentage unless the new evidence satisfies a
   named acceptance lane.
6. If the runtime correction and QA workflow form a stable user-visible
   milestone, build, sync, test, commit, push, deploy, and live-verify it.

## Deliberately deferred

- Splitting the 57k-line HTML into modules before parity tests and a migration
  plan exist.
- Replacing every boss AI with one generic behavior tree. Boss-specific
  mechanics are part of Joey's creative direction; the shared contract should
  grow around them first.
- Object pooling, random-source replacement across the full renderer, and
  balance retuning without profiler or play-feel evidence.
- Expanding the V1 D1-8 route boundary or claiming full open-world completion.

## Acceptance for this architecture slice

- A single helper produces the correct boss identity in the HUD and remains
  compatible with all existing boss flags.
- Local QA acceleration and test modes are loopback/query gated, session-only,
  observable, and never serialized/exported.
- Deterministic representative simulations complete in seconds and fail with
  structured diagnostics if a shared combat invariant regresses.
- Existing creative behavior and the 84-test baseline remain intact.
