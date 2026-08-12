# Code Quest Lab - Release Roadmap

Updated: 2026-08-12

The numbered checkpoint sequence and evidence-backed progress report are
canonical in `CHECKPOINTS.md` and `PROJECT_PROGRESS.md`. `CURRENT_CHECKPOINT.md`
defines the one active work boundary; read it with `COMPLETED_WORK.md` and
`DECISIONS.md` before selecting a task.

## Phase 0 - Baseline, direction, and release foundation (complete for this session)

- Preserve the playable baseline and checkpoint it.
- Maintain the release documents and lock V1 scope.
- Add deterministic checks for source mirroring, static contracts, and critical save/entitlement logic.
- Add an offline-capable web shell without changing the game loop.
- Prepare the complete static web deployment package and first-party About, Educational Purpose, Privacy, Support, Contact, and School Review pages.
- Remove or clearly exclude unfinished release-surface items.
- Lock the teen-first, tablet-first, offline, privacy-minimal, and authentic-learning direction.

Acceptance: the existing browser game still launches, the baseline smoke journey remains green, the product documents agree, the complete static package is buildable, and static/offline checks pass. Evidence is recorded in `STATUS.md`.

## Creative parity lane - audit complete, implementation queued

Joey's latest output is preserved as a creative reference in `CREATIVE_REFERENCE_AUDIT.md`. It is a content ledger and parity reference, not a replacement source file.

- Preserve Joey's original dungeon names, character identities, skill names, boss names, dialogue, endings, purification journey, and “Last Light” idea.
- Keep the current D1-12 release surface bounded until later routes, rewards, progression, dialogue, save behavior, and desktop/tablet playability are evidenced.
- Correct stale source comments that describe already-present D9-16 boss dispatches as reserved or environment-only; do not change gameplay behavior as part of the audit.
- Add Ranger, Necromancer, Alchemist, and Paladin in isolated milestones, including class selection/save migration, HUD resources, passives, all skill tiers, skill-tree behavior, class-restricted equipment, set bonuses, materials, balance, and playability.
- Promote D13-D16 only through explicit route/boss/reward/progression milestones. Source-resident boss functions do not by themselves make a dungeon release-ready.
- Preserve and later verify Joey's D16 Phase 4 Pure Corruption mechanics (`pcCleaveSpin`, `pcCrown`, `pcWarShock`, `pcBarrage`, `pcSnare`, `pcTendril`, and `pcStorm`) as an endgame parity milestone.
- Keep the Smelter as an original idea, but do not expose a contradictory placeholder; its UI, 55-material recipe data, costs, saves, and tests must agree before activation.

Creative parity acceptance: the exact named content is represented, the relevant pure contracts pass, a fresh-profile desktop/tablet play path is verified, the V1 boundary and privacy/offline rules remain intact, and the milestone checkpoint protocol below is completed.

## Open-world direction lane - explicit design target, staged implementation

The product now deliberately aims toward a compact, connected open world.
`OPEN_WORLD_DIRECTION.md` defines the player experience, region/landmark/dungeon
layers, world-state model, save boundaries, and acceptance bar.

- Treat the existing Town, entrance hubs, waypoints, `worldLocation`, dungeon
  registries, and room engine as the first open-world-compatible foundation.
- Keep the current route guard and finish the D1-12 evidence before adding broad
  exploration or promoting D13-16.
- After the current path is playable, build a tested World Atlas, region graph,
  discovered destinations, optional landmarks, and persistent return state.
- Promote Joey's later classes, regions, Pure Corruption, Smelter, and story
  threads into the connected world only through complete content milestones.
- Do not simulate an infinite world, live-service pressure, or a second
  untestable engine. Every visible destination needs a tested travel, save,
  reward, and return path.

### Completed local slice: released-route World Atlas (2026-08-12)

- [x] Add a dashboard World Atlas that uses Town, `REGION_ORDER`, existing
  `worldLocation`, waypoint discovery, and dungeon unlock data.
- [x] Show honest locked-route conditions and keep D13+ content outside the
  atlas until its complete route, reward, save, balance, and device evidence
  exists.
- [x] Route charted destinations through the existing difficulty/modifier
  flow rather than introducing a second travel engine or save schema.
- [x] Add regression coverage for atlas navigation, release-route filtering,
  and premium entitlement gating.
- [x] Run the **139/139** release gate, `qa:fast`, static/package audit,
  Capacitor sync, production checks, and deployed UI smokes; commit and push
  `7b961b9`, then deploy preview `https://79d7af68.code-quest-lab.pages.dev/`
  and the configured hostname.

### Completed milestone: world-state and connection registry (2026-08-12; deployed)

- [x] Add `WORLD_STATE_VERSION=1` normalization that migrates existing
  unlocks/current location into discovered regions and opened connections while
  preserving safe future flags.
- [x] Add shared data-driven `WorldRegion`/`WorldConnection` definitions and
  make the World Atlas consume them without introducing a second travel engine
  or expanding the released D1-D12 route boundary.
- [x] Add focused registry, migration, save/export, future-flag, and Atlas
  contracts; pass `release:verify` (**151/151**), `qa:fast`, package audit, and
  Capacitor synchronization in runtime `f0ce0e9`.
- [x] Push `f0ce0e9` to `origin/main`, deploy preview
  `https://596095e6.code-quest-lab.pages.dev/` and the configured hostname, and
  verify the live Atlas shows Town plus 11 released routes at `1/11 routes
  charted` for a fresh Mage with no Dungeon 13 card.

This is a tested save/architecture milestone that advances the open-world
foundation without claiming full open-world completion or increasing the C1
evidence score. Clean-player D1-D12 and physical/native-device acceptance
remain the next score-bearing lanes.

This is a tested and deployed open-world foundation slice. It does not claim
the full open-world acceptance bar or increase the C1 evidence score by itself.

### Completed milestone: guidance and release-readiness checkpoint (2026-08-12; deployed)

- [x] Keep the `TO DEPTHS`, `TO GATE`, and `NEXT ROOM` arrows attached to the
  character and aimed at the next destination; remove the gate-mounted pulsing
  directional arrow.
- [x] Add adaptive first-room pointer/touch guidance without changing Joey's
  authored combat, story, or balance systems.
- [x] Run `release:verify` (**140/140**), deterministic `qa:fast` for all 11
  released finales, static/package audit, Capacitor synchronization, and both
  production checks.
- [x] Publish runtime `b5d701e` from current main snapshot `cca39fb` to
  preview `https://ce226dfb.code-quest-lab.pages.dev/` and the configured
  hostname; source hash is
  `530E64C00A4DCFEE59BD7B7F4AF2640AD8BB142E54C8B5909BF40A8195EF6EF6`.
- [x] Verify a fresh live profile through Town, entrance, first combat, pause,
  safe finish, and UI cleanup with empty diagnostics.

This is a tested release-surface milestone, not a Release Candidate. Clean
player D1-D12 and physical/native-device evidence remain open, so the score
stays **93%** / **19%**.

### Current local QA: touch pointer-capture fallback (2026-08-12)

- [x] Make shared joystick startup tolerate absent or rejected Pointer Capture
  on browser/webview surfaces before continuing with the normal input update.
- [x] Add the focused contract and pass the **141/141** release gate,
  `qa:fast`, package audit, and Capacitor synchronization.
- [x] Push runtime `72451c3` with source/mirror hash
  `DB127E831F46778CD6FBD5E7EB0E5C6C403AC2A49BF74B6607FE1865D53CF0EA`.

This is local tablet-compatibility hardening rather than a major deployment
checkpoint. It does not change the **93%** / **19%** score or replace the
owner-run device acceptance packet.

### Current local QA: shared mobile viewport reflow (2026-08-12)

- [x] Route window and `visualViewport` resize events through one active-world
  handler that refreshes room dimensions, player bounds, and camera position.
- [x] Add the focused contract and pass the **142/142** release gate,
  `qa:fast`, package audit, and Capacitor synchronization.
- [x] Push runtime `3cce0e0` with source/mirror hash
  `659C4A9A8AC97D7B7F514B778B01686BAD641D7351D03C83D2E3D419939C33C3`.
- [x] Record a fresh managed-browser smoke across 1280x720, 1024x768, and
  600x800 with matching canvas dimensions and empty browser diagnostics.

This is local tablet/orientation hardening rather than a major deployment
checkpoint. It does not change the **93%** / **19%** score or replace the
owner-run device acceptance packet.

### Current local QA: screen-attached destination guidance (2026-08-12)

- [x] Render the Town, entrance, and cleared-room destination arrows after the
  camera pass from the player's current screen anchor.
- [x] Keep target direction in world space so `TO DEPTHS`, `TO GATE`, and
  `NEXT ROOM` continue to point at the actual portal, gate, or forward door.
- [x] Pass the **142/142** release gate, `qa:fast`, package audit, Capacitor
  synchronization, and a local browser smoke with empty diagnostics; push
  runtime `69a9915` with source/mirror hash
  `9C908ECC72B83CC51AE317B78509CF315B334A88E6D25EFB4B74AAA3D033CFE1`.

This is a minor local usability correction rather than a major deployment
checkpoint. The deployed `b5d701e` runtime and **93%** / **19%** evidence score
remain unchanged; owner-run device acceptance is still the next score-bearing
lane.

### Completed milestone: tablet-control resilience (2026-08-12; deployed)

- [x] Group safe-area reservations, pointer-capture fallback, active-world
  viewport reflow, and player-following destination guidance into one coherent
  tablet/native-readiness milestone.
- [x] Pass the **143/143** release gate, `qa:fast`, package audit, and
  Capacitor synchronization; push runtime `830ce00` with source/mirror hash
  `124B67C1F1301212A25224BAFAC5AC06A6E693E23107A50C8A0A5BD50EC14318`.
- [x] Publish preview `https://6dc4ee18.code-quest-lab.pages.dev/` and the
  configured hostname, then verify the player-following `TO GATE` arrow,
  first-room attack, safe finish, cleanup, and empty diagnostics.

This is a tested and deployed user-visible milestone. It does not change the
**93%** / **19%** score because clean-player D1-D12 and physical/native-device
acceptance remain open; use the owner-run device acceptance packet next.

## Phase 1 - Tablet sessions and core V1 hardening (current)

### Completed milestone: optional gameplay audio feedback (2026-08-12; deployed)

- [x] Add a fail-safe procedural feedback layer for attacks, hits, criticals,
  defeats, incoming damage, doors, room clears, boss moments, and level-ups
  without removing Joey's authored cues.
- [x] Add the visible `Gameplay Audio` local toggle and keep it outside the
  character save/export schema.
- [x] Pass `release:verify` (**147/147**), `qa:fast` for all 11 released
  finales, static/package audit, and Capacitor synchronization; push runtime
  `80a6562` with source/mirror hash
  `C76C4F8A11B6BE12ECF4BEDE19FB9A4D9526D20BCF1E559E2E2B3DC7516FB34A`.
- [x] Publish preview `https://4aef14a3.code-quest-lab.pages.dev/` and the
  configured hostname; verify settings/audio toggling, first-combat attack
  and defeat, safe cleanup, and empty live diagnostics.

This is a tested and deployed user-visible polish milestone. It does not
increase the **93%** / **19%** score because clean-player D1-D12 and
physical/native-device acceptance remain open.

### Current local QA follow-up: fresh Mage first-boss diagnostic (2026-08-12)

- [x] Stop the repeated no-aid route method under the three/five-attempt loop
  breaker after the fourth bounded 600x768 audit produced attack-only death
  with no movement; preserve the result as input evidence, not a balance claim.
- [x] Add a deterministic fresh Normal Mage/Stone Guardian scenario that uses
  the ordinary Fire Bolt cadence, crosses the authored summon phase, takes real
  damage, and wins without invincibility or other developer aids.
- [x] Pass the focused QA test, `qa:fast`, and the full **128/128** local
  release gate. Keep the evidence score at **93%** / **19%** because this is
  release-readiness diagnostics, not a clean-player route or device session.
- [x] Make the first Normal D1 combat instruction adapt to touch-first and
  pointer controls without changing the authored combat or balance systems.

This is a local QA improvement and does not create a website deployment
checkpoint. The next manual route evidence must use a genuinely touch-capable
surface or another materially different strategy; do not repeat attack-only
browser batches.

### Device acceptance handoff (2026-08-12; owner-environment preparation)

- [x] Publish `DEVICE_ACCEPTANCE_RUNBOOK.md` with separate clean-player route,
  10-30 minute touch-session, device/lifecycle, audio, offline, local-save,
  and optional cross-device transfer checks.
- [x] Link the packet from `BLOCKERS.md`, `OWNER_ACTIONS.md`,
  `CURRENT_CHECKPOINT.md`, and `PROJECT_PROGRESS.md`.
- [x] Add `npm.cmd run acceptance:report` to seed a dated, non-personal report
  with the repository control commit plus tested deployed runtime/source
  identity; contract-test refusal to overwrite an existing report and
  separation from developer QA.
- [x] Add `npm.cmd run acceptance:preflight` to refuse a device handoff when the
  local runtime, exact source mirror, runbook deployment hash, or PWA shell
  identity disagree; keep live production and physical-device checks separate.
- [ ] Owner supplies a representative physical device or approved lab and
  records the dated Runs A-C packet before C1 score credit can advance.

This prepares the exact external acceptance action without claiming hardware
evidence, changing the **93%** / **19%** score, or creating a deployment
checkpoint. The consumed managed-browser route remains loop-broken.

### PWA cache happy-path regression (2026-08-12; deployed correction)

- [x] Contract-test successful same-origin asset caching and later offline
  reuse after simulated network loss.
- [x] Bump the first-party shell cache to v12, deploy the corrected shell, and
  verify a normal-URL reload shows the steady player-following `TO GATE` arrow
  instead of the stale gate-mounted cue. Runtime `b7e70c3` is live at preview
  `https://6c9c3107.code-quest-lab.pages.dev/` and the configured hostname.
- [ ] Complete deployed-cache update, install/Add to Home Screen, and physical
  offline/forced-close soak in Checkpoint 2 on an approved device surface.

The deterministic contract and deployed shell refresh pass in the current
**153/153** gate. This closes the web-side cache update portion without claiming
the physical install/offline soak that remains in Checkpoint 2.

### D13 preflight audit: keep Realm of Space gated (2026-08-12; local)

- [x] Confirm the source-resident two-room route, Corruption of Space identity,
  authored attack/phase/death sequence, shared exit portal, and purification
  hook without promoting the region.
- [x] Implement and contract-test Joey's standard D13 reward boundary: 2.0x
  guardian souls, boss XP/mastery, named defeat statistic, death effects,
  achievement refresh, and the standard completion handoff.
- [x] Record that Joey's reference does not define a D13-specific material or
  loot helper; do not fabricate one during promotion preparation.
- [x] Verify and contract-test the complete authored D13 story delivery rather
  than inventing a longer cutscene: threshold/arena arrival, post-defeat
  stillness, and purification farewell.
- [x] Keep D13 outside `REGION_ORDER`, normal unlock refresh, and active-run
  recovery until a complete route/save/reward/return milestone exists.
- [ ] Add the future-region progression handoff, save/resume coverage, fresh
  desktop/tablet balance evidence, and return-to-world acceptance before
  exposing the region.

The three guard contracts are local release-readiness coverage only. They do
not expose D13, advance Checkpoint 1, or create a website deployment. This
runtime change is intentionally not deployed while the route remains gated.

### Plain-text transfer portability fixtures (2026-08-12; local)

- [x] Load checked-in `.txt` fixtures from disk instead of relying only on
  inline test objects.
- [x] Cover legacy v1 raw saves, current v2 durable data plus backup and
  active-run checkpoint, invalid optional checkpoints, future save version 3,
  and an unsupported future class.
- [x] Exercise a BOM and Windows line-ending variant while preserving the
  non-overwrite import contract.
- [ ] Validate the same transfer matrix on a real second browser/device and
  against a preserved baseline save before claiming cross-device migration.

The alternate-origin browser smoke is now complete, but it does not satisfy
the physical-device or true cross-device requirement. This closes the local
fixture gap without changing the runtime or claiming cross-device
compatibility. It is not a website deployment checkpoint.

### Completed milestone: Level 1 onboarding balance pass (2026-08-10; deployed)

- Reduced the fresh Barbarian starter damage multiplier to `0.75`.
- Applied `0.65` health, damage, and speed tuning only to the first Normal
  Dungeon 1 combat room, preserving later dungeon scaling and Joey's enemy
  identities.
- Moved the two first-room targets into a close, readable starter lane and
  kept Standard Expedition as the recommended/default first-run choice while
  preserving the optional authored modifiers.
- Bumped the PWA shell to v8 so existing controlled browsers receive the
  corrected runtime after deployment.
- Passed the **115/115** release gate, `qa:fast`, package/native sync, both
  production checks, local loopback room-clear smoke, and live first-room
  smoke. Runtime commit `7113366` is deployed at
  `https://caacd1f4.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`.

This resolves the current Level 1 scaling blocker without increasing the
evidence score: full clean-player D1-D12 and physical/native touch evidence
remain open.

### Completed milestone: fine-pointer attack affordance (2026-08-12; deployed)

- [x] Add a visible, keyboard-accessible nearest-target Attack control on
  fine-pointer surfaces where the touch joystick is hidden.
- [x] Route the control through the existing shared attack queue and preserve
  the touch joystick, target assist, and canvas mouse paths.
- [x] Pass the ordered **127/127** release gate, `qa:fast`, package audit, and
  Capacitor synchronization; verify the control in a canonical `1280x720`
  first-room smoke with empty browser diagnostics.
- [x] Commit `7f1ea4f`, push to `origin/main`, deploy, and verify both
  configured production origins plus the Pages preview.

This resolves a reproducible managed-browser combat dead end without changing
Joey's combat design. It does not advance the score until clean-player D1-D12
and physical/native-device acceptance lanes have named evidence.

### Completed milestone: player-following entrance guidance (2026-08-12; deployed)

- [x] Render Town and dungeon-entrance guidance beside the player in the
  world-space camera pass, aimed at the actual portal/gate.
- [x] Remove the pulsing/gate-mounted entrance arrow while preserving the
  cleared-room forward-door guide and boss exit portal.
- [x] Pass the **127/127** release gate, `qa:fast`, package audit, and native
  synchronization; verify live desktop `1280x720` and tablet `600x768`
  main-flow controls with empty browser diagnostics.
- [x] Commit `4580631`, push to `origin/main`, deploy, and verify both
  configured production origins plus the Pages preview.

This improves route readability without changing Joey's story, encounters,
rewards, or open-world direction. It does not advance the evidence score:
clean-player D1-D12 and physical/native-device acceptance remain open.

### Completed follow-up: room-entry motion and early D1 onboarding hardening (2026-08-11; deployed checkpoint)

- [x] Shorten mobile enemy arrival to a bounded `1.35s` visible step and
  decouple it from the opening prompt so the prompt cannot make enemies appear
  frozen.
- [x] Keep Joey's authored roster, attack math, stationary-enemy behavior, and
  later procedural scaling intact.
- [x] Add finite Normal-only onboarding budgets for D1 ordinary depths through
  5, the first elite, and the first mini-boss, with explicit response grace.
- [x] Pass the **121/121** release gate, `qa:fast`, static package audit,
  Android/iOS Capacitor sync, and both production checks.
- [x] Push runtime commit `ae91268` to `origin/main` and deploy the tested
  build to preview `https://dfb05e32.code-quest-lab.pages.dev/` and the
  configured hostname `https://code-quest-lab.gov8661682.com/`; source hash
  `ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094`, PWA
  shell v11.

Live tablet and desktop smokes reached the first combat room and returned
through the dashboard without browser diagnostics. A clean local route cleared
the first room and reached the first mini-boss before ending; this milestone
does not close the clean-player D1-D12 or physical-device evidence lanes. The
score remains **93%** / **19%**.

### Current follow-up: Level 1 room-entry approach lane (2026-08-11; deployed checkpoint)

- [x] Move only the first Normal D1 melee roster into a bounded, data-driven
  visible approach lane (`132/28/18/84/36` side offset, side step, jitter,
  forward offset, and forward step) so enemies do not appear frozen at melee
  range on entry.
- [x] Preserve Joey's authored roster, attack math, later procedural placement,
  stationary enemies, and the separate early-route balance budget.
- [x] Pass the **120/120** release gate, `qa:fast`, static package audit,
  Android/iOS Capacitor sync, and both production checks.
- [x] Push runtime commit `0000f0d` to `origin/main` and deploy the tested
  build to preview `https://ca1ac0fa.code-quest-lab.pages.dev/` and the
  configured hostname `https://code-quest-lab.gov8661682.com/`; source hash
  `E60F8F1D603A4F8FEE74715DE66A7ED04AE0325B4B7C715DF49E90338B33B56E`, PWA
  shell v11.

The no-aid 600x768 live smoke reached the first combat room and showed enemy
repositioning across two captures about half a second apart. It is a movement
fix checkpoint, not clean-player D1-D12 completion; the evidence score stays
**93%** / **19%**.

### Completed milestone: Stone Guardian onboarding and player-following guide (2026-08-12; deployed checkpoint)

- [x] Keep the first Normal D1 Stone Guardian's Joey-authored mechanics and
  rewards while applying a finite web onboarding budget of
  `0.60/0.55/0.90/1.40/0.60` plus `4.0s` entry grace.
- [x] Keep the developer invincibility aid truthful across the boss's melee,
  cleave, slam, charge, and meteor damage paths without exposing it to saves,
  exports, native builds, or production activation.
- [x] Keep `TO DEPTHS`, `TO GATE`, and `NEXT ROOM` as steady guides that follow
  the player; do not mount or pulse a directional arrow on the gate.
- [x] Pass the ordered **126/126** release gate, `qa:fast`, static package
  checks, and Capacitor synchronization; verify the 600x768 loopback smoke.
- [x] Commit, push, deploy, and live-verify this grouped user-visible
  milestone, then record its exact commit, source hash, and deployment date.

The smoke is QA-assisted evidence and does not increase the **93%** / **19%**
score. Commit `6e5812f` is pushed to `origin/main` and deployed on 2026-08-12
to preview `https://ab0fd517.code-quest-lab.pages.dev/` and the configured
hostname `https://code-quest-lab.gov8661682.com/`; source hash
`800B75EA81A332BD2BAA6A51E36390C444FACC507CA0F2F5E29BD2FE453A3DE9`. Both
production checks and the live tablet main-flow smoke passed. Clean-player
D1-D12 and physical/native-device acceptance remain the next evidence lanes.

### Current deployed milestone: D4 Normal pacing, player-following exit guide, and route contract (2026-08-12)

- [x] Replace the cleared-room gate cue with a steady arrow anchored above the
  player and aimed at the open forward door; do not add a pulsing gate marker.
- [x] Keep boss rooms on the existing deliberate exit-portal handoff.
- [x] Keep Joey's Omen Chamber three-wave roster and elite finale while giving
  Normal a finite 2/3 target wave budget, bounded health/damage relief, and a
  shorter handoff; retain authored pressure at higher difficulties.
- [x] Route the loopback developer invincibility aid through shared hazard
  suppression, including D4 cursed circles, without exposing it to saves,
  exports, native builds, or production activation.
- [x] Add the bounded D1-D12 release-route contract for generated connectivity,
  authored finale identities, portal handoff, region order, and the final
  session ending.
- [x] Pass the local **125/125** gate, `qa:fast`, static package checks, and
  Capacitor sync.

A fresh loopback browser smoke reached D4, resolved an event, verified the
player-following guide with empty browser diagnostics, and stopped safely. This
is QA-assisted evidence rather than clean-player D1-D12 or physical-device
acceptance. The **125/125** release gate, `qa:fast`, package/native checks,
production check, desktop/tablet live smokes, and safe disposable-profile
cleanup passed. Commit `471cf96` is pushed to `origin/main` and deployed to
preview `https://f55bf568.code-quest-lab.pages.dev/` and
`https://code-quest-lab.gov8661682.com/`; source hash
`BE1349634B3F97983A19FBE2C192056B48778D2916A66CADE4DB6D906F21B34C`, PWA shell
v11. Continue with the next open evidence lane.

### Follow-up: Level 1 opening-pressure and enemy-motion correction (2026-08-10; deployed checkpoint)

- [x] Reconcile the production melee cadence with the ordinary-player QA model.
- [x] Keep the relief scoped to the first Normal D1 combat room: `0.50` HP,
  `0.45` damage, `0.55` movement speed, `1.80` attack-cooldown scaling, and a
  bounded 10-second read-and-respond grace window; keep enemies moving during
  the prompt and suppress opening damage directly from the intro state.
- [x] Preserve Joey's authored enemy identities, later dungeon scaling, and
  optional modifiers.
- [x] Pass the ordinary-player opening simulation, `qa:fast`, full **116/116**
  release verification, static package audit, and native sync.
- [x] Create the GitHub and website checkpoint after commit, deployment, and
  live opening-room verification: runtime commits `1987310`, `a169c11`, and
  `fc7f738`, preview `https://bad086fb.code-quest-lab.pages.dev/`, configured
  hostname `https://code-quest-lab.gov8661682.com/`, source hash
  `FF72502DB480DF89225A7335E68574DD983C75C08DC4077E2F223A1CC35AEDC4`, and
  PWA shell v10. Both production checks passed; live smoke showed enemies
  repositioning during the prompt and HP stable at 100% across 1.8 seconds.

### D1-D12 route continuation and managed tablet evidence (2026-08-10; deployed checkpoint)

A fresh loopback Mage route extended live managed coverage through D4-D6.
D4 exercised the Fallen Hero event, off-screen target guidance, elite Crystal
Hollow, and Void Monarch; D5 exercised the Fallen Hero event and Chieftain
phase-3 transition; D6 exercised the Archmage arena and QA defeat handoff.
The route used bounded developer damage/room/phase aids after a D4 elite pair
became impractical at normal Mage damage. This is QA-assisted evidence only;
the score remains **93%** / **19%**. The tested milestone was checkpointed as
commit `095aa30`, pushed to `origin/main`, and deployed on 2026-08-10. Preview:
`https://050a6395.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. Both production checks and live
desktop/tablet smoke passed with no browser warning/error diagnostics.

A loopback Mage route reaches the D1-D12 final session summary after bounded
QA exercise of the authored D5-D12 bosses, transformations, dialogue, rewards,
Veteran unlocks, portal exits, and final flow. The developer phase helper now
dispatches production custom phase fields across the named bosses, and the
full **113/113** local gate remains green.

A disposable **13-minute** 600x768 managed tablet session exercised the
visible Move/Attack controls, target lock, step movement, D1-D2 rewards,
shrine/treasure choices, the Prison Warden, all Fallen King phases, pause, and
dashboard return. The temporary profile was removed after verification;
physical/native-device, clean-player, and full-route evidence remain open.
This is local progress only and creates no deployment checkpoint.

### Recovery-safe pause handoff (2026-08-10; deployed milestone checkpoint)

Recovered combat runs now restore their exact saved room and open the shared
pause menu before resuming the live loop. This protects players on managed
tablets from taking damage while they orient themselves and gives QA a stable
point for session-only aids. A current-build D1 browser run verified pause,
reload, `SESSION RECOVERED`, safe Resume, Finish and Return to Dashboard, and
zero browser diagnostics. The focused contract and **113/113** release gate
pass. Tested commit `e7871b0` was pushed to `origin/main` and deployed to the
configured Cloudflare Pages project. Preview
`https://a89328df.code-quest-lab.pages.dev/` and
`https://code-quest-lab.gov8661682.com/` both passed `production:check`.
Published desktop flow reached D1 `Burial Hall`; published 1024x768 tablet
flow paused into the Character Menu with no browser warnings or errors.
Physical-device and 10-30-minute touch evidence remain the next C1 work.

### Managed D1-D4 route evidence (2026-08-10; no deployment checkpoint)

A fresh Mage completed D1 and D2 Normal with ordinary combat/target-assist
controls, touch-sized viewport controls, D2 rewards, the Prison Warden,
Fallen King phases, Veteran unlock, and entry to D4, The Shadow Realm. A bounded
D4 probe reached Broken Crossing, verified truthful death/session saving when
the local aid was disabled, then restarted with the aid visibly enabled and
finished safely from the pause menu. This improves route evidence but leaves
the full D1-D12, physical-device, and clean-player lanes open; the next useful
acceptance item is a longer protected route continuation with the cheat banner
verified before each fresh page/session.

The developer aid workflow is now safer for that continuation: repeating
`CQLI` always enables the page-session invincibility aid instead of toggling it
off accidentally. This is a local QA improvement and does not advance the
manual evidence score or create a deployment checkpoint.

The next protected route handoff is now paused at D1 Death Chamber after a
retained Mage cleared the earlier D1 rooms with ordinary mouse-target attacks,
defeated one elite, and reached 36 kills with two elites remaining. Resume this
run and continue through D2 and D4-D12 before considering a full-route evidence
update; the partial run does not change the score.

### Necromancer's Stolen Graveyard release-surface expansion (2026-08-10; local milestone)

The source-resident D12 route is now promoted after Ranger Watchtowers. Its
quiet Cemetery Gate opens into corrupted horde rooms using the Ancient Ruins
pool plus the authored Soul Collector, then culminates at The Ritual Altar.
The Corrupted Necromancer retains Joey's two-phase transformation, soul-
release defeat sequence, and named dialogue beats. The release handoff now
awards standard boss souls/XP/mastery, records the Necromancer defeat, unlocks
Veteran, and restores the exit portal when a defeated boss checkpoint is
reloaded. The managed `Proceed through exit` control is available only while
the physical portal is active. The full **112/112** release gate,
build/package audit, deterministic QA, and Capacitor sync pass. This is
QA-assisted local evidence, not clean-player, physical-device, GitHub, or
website checkpoint evidence; D13-D16 remain gated.

### Ranger Watchtowers release-surface expansion (2026-08-10; local milestone)

The source-resident D11 route is now promoted after D10. The route is
environment-first by design: randomized watchtower/cliff/bridge/barracks
rooms, gradual corruption atmosphere, and first-visit salvage lead to the
Shattered Signal Tower. The Corrupted Ranger Captain owns an authored
kneeling/transformation intro, custom Phase 2, peaceful defeat dialogue,
guaranteed Tier 8 materials, Veteran unlock, and the existing portal-to-summary
handoff. Older saves unlock D11 after The Alchemist or at Level 260. The
developer phase helper covers the custom Ranger transition, and the managed
portal action remains available only while the physical portal is active. The
full **111/111** release gate, build/package audit, deterministic QA, and
Capacitor sync pass. This is QA-assisted local evidence, not a clean-player,
physical-device, GitHub, or website checkpoint; D13-D16 remain gated.

### Vow Breaker's Castle release-surface expansion (2026-08-10; local milestone)

The source-resident D9 route is now promoted after D8. The tested local route
includes the Castle Gate, Royal Commander mini-boss, Oathbreaker King phase
transition and authored dialogue, reward vault, Veteran unlock, and final
session summary. A delayed mini-boss exit race was fixed and contract-tested.
The **109/109** release gate, build/package audit, deterministic QA, and
Capacitor sync pass. The route is QA-assisted and not yet a clean-player,
physical-device, GitHub, or website checkpoint. D12 is now promoted; the next
content candidate is D13, which remains gated until its own route, save,
reward, and return path are verified.

### The Abandoned Laboratory release-surface expansion (2026-08-10; local milestone)

The source-resident D10 route is now promoted after D9. The tested local route
includes randomized lab chambers, the Head Researcher mini-boss, The Alchemist
introduction and Perfect Serum phase, rewards, Veteran unlock, and a
portal-to-summary handoff. The named-boss QA phase helper and boss-portal touch
fallback are covered by contracts. The **110/110** release gate, build,
package audit, deterministic QA, and Capacitor sync pass. This is QA-assisted
local evidence; D11 and D12 are now promoted and D13-D16 remain gated until
their own milestones.

### Rolling project learning memory (2026-08-10; execution control)

`PROJECT_MEMORY.md` is the single bounded memory read at the start of each
cycle. It is updated by replacement and consolidation, never by stacking
session logs. A project-control contract enforces this behavior and the
120-line ceiling. The full local gate passes **108/108**; this is not a
deployment checkpoint or manual acceptance evidence.

### Shared encounter tuning architecture (2026-08-10; local workflow milestone)

Difficulty, dungeon scaling, and temporary run modifiers now flow through the
single `getEncounterTuning(dungeonId)` contract. The shared enemy and miniboss
paths and every named boss spawner use it, while Joey's boss-specific
mechanics remain deliberately bespoke. The change also makes miniboss
difficulty behavior consistent with the rest of the combat roster.

The source mirror, deterministic QA, static build/package audit, Capacitor sync,
and **108/108** tests pass. This is not a deployment checkpoint and does not
change the **79%** / **18%** evidence score. GitHub/website checkpoint work
remains reserved for the next stable, user-visible milestone after the manual
route/device evidence and owner blockers are resolved.

### Data-driven mini-boss roster routing (2026-08-10; local architecture slice)

`MINIBOSS_TYPES_BY_DUNGEON` now routes all authored mini-boss pools through one
explicit registry, preserving Joey's current rosters and leaving a safe D1
fallback for unregistered regions. The focused architecture contract, source
mirror, static/package audit, native sync, deterministic QA, and **108/108**
release gate pass. This is not a deployment checkpoint and does not change the
**79%** / **18%** evidence score.

### Self-preparing release gate (2026-08-10; local workflow hardening)

`release:verify` now rebuilds the static package and synchronizes Capacitor
web assets before its tests and package audit. An executable project-control
contract protects the order; the 108-test gate passes locally. This is not a
deployment checkpoint and does not replace the clean-route or tablet-session
acceptance evidence.

Latest milestone: `2c1d6ba` (`Add deterministic gameplay QA architecture`) bounds
the architecture/testing workflow after `9886f50` bounded the Void Monarch's
summon pressure. It passed the 92-test release gate, static/package/native
checks, GitHub push, Cloudflare deployment, production checks, and live smoke
at 1024x768 and 1440x900. Pages preview:
`https://7c154632.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. This does not count as D4-8
completion; continue with the clean-profile route and remaining touch/tablet
lifecycle evidence.

- Extract pure save, progression, combat, entitlement, and configuration logic behind tests.
- Validate save creation, load, backup recovery, migration, profile deletion, settings, pause/resume, and lifecycle behavior.
- Provide a versioned local plain-text profile transfer that preserves durable
  progression, a valid backup, and any active-run checkpoint; import must
  create a new profile without overwriting the current one and remain outside
  cloud/account sync.
- Validate one complete release path from onboarding through the current Dungeon 1-8 endpoint and intended ending; keep later incomplete regions out of the V1 surface.
- Make touch the primary input path on iPad/Android tablet landscape layouts; test safe areas, muted devices, headphones, suspension, forced closure, and restricted-network conditions.
- Shape 10-30 minute sessions with clear objectives, checkpoints, autosave, session summary, next-step suggestions, and a satisfying stop point.
- Keep the C1 implementation compatible with the open-world direction: preserve explorable hub/waypoint seams and truthful destination context without expanding the tested D1-12 content boundary.
- Add optional Learning Support to the library/after-action surfaces: pattern, sequence, planning, decomposition, optimization, condition, loop, cause-and-effect, and debugging explanations without forced quizzes.
- Keep active-run checkpoints separate from profile progression: recover the latest safe room locally after suspension or forced closure, while deliberately finishing a run clears the checkpoint.
- Review dialogue, combat presentation, difficulty, humour, and monetisation for 13-17-year-old users; remove graphic, shocking, childish, or manipulative presentation.
- Fix P0/P1 usability, progression, mobile layout, and data-loss issues.
- Keep elite pressure bounded for touch-first progression: Corrupted summons
  and Regenerating recovery must have finite per-encounter limits, and every
  fix requires a fresh-room rerun before it receives checkpoint or deployment
  credit.
- Keep combined elite scaling bounded as well: the shared health budget must be
  applied after depth, dungeon, elite, and Giant modifiers so stacked rooms do
  not become multi-minute damage sponges. Attack taps received during cooldown
  must remain queued. Both behaviors require focused contracts and a fresh-room
  playthrough before the next major deployment.

### Managed-surface movement hardening (2026-08-09; local follow-up)

The visible Step movement pad is a normal player-control fallback for managed
or embedded surfaces that do not reliably deliver continuous joystick drags. It
is bounded to a short input duration, prioritized behind keyboard and joystick
movement, and covered by a focused contract. Fresh 540x720 route evidence
verified the pad across Town and dungeon portal handoffs, with the D8 ending
reachable in a QA-assisted functional run. This does not close the clean-player
or 10-30-minute touch acceptance lanes and does not trigger a deployment
checkpoint; the next high-priority item remains clean route/session evidence.

Acceptance: a clean profile can complete a meaningful 10-30 minute tablet session and the locked V1 path in supported browser viewports; active-run recovery and optional play-support checks pass; remaining save-compatibility and full-path evidence is recorded.

### Architecture and fast QA slice (2026-08-08; deployed milestone checkpoint)

The holistic review is recorded in `ARCHITECTURE_REVIEW.md`. It preserves the
single-file parity baseline while improving the reusable seams that already
exist:

- `BOSS_IDENTITY_DEFS` now supplies one player-facing identity/defeat-message
  contract for the named bosses, fixing the shared HUD/room-label fallback
  without changing boss mechanics or Joey's creative content.
- Loopback-only developer QA now supports 1x/10x/25x time, high damage,
  enemy-free mode, phase stepping, current-encounter completion, jump-to-boss,
  and a structured telemetry overlay. All controls remain session-only and
  excluded from saves, exports, native packages, and public activation.
- `tools/qa/fast-combat-sim.mjs` and `npm.cmd run qa:fast` provide fixed-seed
  early/mid/late encounter, collision, damage, phase, summon-budget,
  victory/loss, timeout, and accelerated-time checks.
- This milestone passed the full release gate, native sync, production build,
  GitHub push, Cloudflare deployment, production checks, and live browser smoke.
  It does not raise the C1 percentage until a named route or tablet acceptance
  lane gains evidence.

### Route QA and exit-handoff hardening (2026-08-08; deployed milestone checkpoint)

- A disposable loopback QA run now covers the functional D1, D2, D4, D5, D6,
  D7, and D8 boss/portal chain in accelerated time, ending at the existing
  session summary and safe `Finish for Now` Town return.
- QA encounter completion clears live boss adds and refreshes the shared exit
  handoff; player-facing objectives do not announce an unlocked exit while live
  summons remain. Trial navigation uses world language (`Back to Dungeon
  Entrance`) instead of the retired module wording.
- The full 93-test release gate, deterministic QA suite, static/package audit,
  native sync, GitHub push, Cloudflare deployment, production checks, and live
  desktop/tablet profile-shell smoke all pass. This remains functional QA
  evidence, not clean-player route/ending acceptance, so the C1 percentage is
  unchanged.

### Touch surface and recovery probe (2026-08-08; local evidence only)

- A disposable Mage on a 540x720 loopback surface completed a representative
  D1 Normal sequence with the visible target-lock attack control, shrine,
  treasure, level-up, Stone Guardian Phase 2, and portal handoff into D2.
- Pause, reload, and profile reopen restored the same D2 combat checkpoint with
  `SESSION RECOVERED`. A separate probe re-enabled session-scoped developer
  invincibility after reload, survived an idle interval and room clear, and
  completed a deliberate pause/Finish and Return to Dashboard stop.
- This did not close C1: one resumed attempt ended before the session aid was
  re-enabled, joystick drag delivery was unreliable in the managed harness and
  required the bounded keyboard fallback, and the stored harness duration was
  not meaningful human-session evidence. The remaining priority is a clean
  D1-8/ending route plus touch-only tablet/device lifecycle evidence. No
  runtime change or website checkpoint is warranted for this incomplete slice.

### Fresh-profile functional V1 route probe (2026-08-08; local QA evidence only)

- A new Mage traversed D1, D2, and D4-D8 on Normal and reached all seven
  named bosses, shrine/treasure rewards, portal handoffs, the final session
  summary, optional learning note, next-step suggestion, and both safe-stop
  paths. The profile list and Manage Data record were verified before deleting
  only the temporary profile.
- The route used loopback enemy-free and current-encounter QA controls after
  the managed-browser joystick/attack delivery failed again. It therefore
  proves the progression/ending handoffs on a fresh profile, but not a
  player-completed clean route or touch-only acceptance. Empty browser logs and
  unchanged retained profiles were confirmed. No runtime change or website
  checkpoint is warranted for this incomplete evidence slice.

### Managed-surface attack-input hardening (2026-08-09; local, not a milestone checkpoint)

- The fresh route probe isolated a resilience gap in managed/embedded input
  delivery: `#joyRight` received coordinate hits, while the Attack joystick did
  not reliably complete its tap/drag event sequence. Add only a guarded click
  fallback for tap actions; preserve the existing nearest-target routing,
  directional aiming, pointer ownership, and drag semantics.
- Contract coverage and the release gate pass locally (18 focused combat
  contracts, 93-test `release:verify`, `qa:fast`, build, and native sync).
- A fresh uncached `localhost:4173` route at 540x720 now proves one real center
  tap (`Enemies: 2` -> `Enemies: 1`) and one three-enemy directional drag with
  no count change; browser diagnostics were empty. The room clear used the
  bounded high-damage QA aid, so physical-device, full-route, and clean-player
  acceptance remain open. Do not raise the evidence percentage or deploy this
  minor hardening until it is grouped with a substantial stable milestone.

### Contextual cleared-room exit fallback (2026-08-09; local, not a milestone checkpoint)

- A fresh protected route reproduced a bounded managed-browser failure after a
  combat room was cleared: directional keyboard and joystick paths did not
  reach the forward door. The five-attempt policy stopped the route; the
  disposable profile was removed and no clean-player evidence was claimed.
- Added an accessible `Proceed Through Exit` action that appears only after a
  real forward combat room is cleared or a shrine/treasure reward is claimed.
  It is hidden in Entrance/`START` and unclaimed static rooms and reuses the
  existing room save and fade transition, so it is a touch fallback rather than
  a new progression shortcut. Fresh 540x720 local runtime checks advanced
  `room_m0` to `room_m1`, then advanced a completed shrine into the treasure
  room with the action.
- The source mirror, 96-test release gate, deterministic QA, production build,
  and native sync pass. Full D1-8 normal combat, 10-30 minute touch-only
  session, physical-device validation, and the next website checkpoint remain
  open; the score stays **79%** / **18%**.

### Static-hub and dungeon-start travel fallback (2026-08-09; local, not a milestone checkpoint)

- The same managed-surface diagnosis showed that a player could also be
  stranded before the first combat room because continuous movement was not
  reaching the Town portal or entrance gate. Added optional buttons that reuse
  the existing Town -> Entrance -> Dungeon Gate flow, plus a dungeon-start
  `Enter Dungeon` action. Walking remains the primary open-world interaction;
  the buttons are a constrained touch/browser fallback.
- Fresh 540x720 runtime checks completed Town -> D1 Entrance -> Normal trial ->
  modifier -> D1 `room_m0`, then used the cleared-room fallback to reach
  `room_m1` and the shrine-to-treasure handoff. A treasure room then exposed
  `Open Treasure`, delivered the existing loot overlay, and exposed its
  ordinary forward exit. No new content boundary was opened and no
  clean-player/touch-only score was claimed.
- The 96-test release gate, deterministic QA, production build, source mirror,
  and native sync pass. This remains local hardening; group it with the next
  substantial stable route milestone before deploying.

## Phase 2 - Native packaging for managed devices (scaffold in progress)

- [x] Package the web build with Capacitor 8.4.2 using `dist` as the web asset directory.
- [x] Generate Android and iOS projects; add the v8 App plugin for lifecycle/back-button integration.
- [ ] Create Android project and build it in an environment with JDK, Android SDK, and Gradle support.
- [ ] Build the iOS project on a Mac with Xcode and document the signed-build path.
- [x] Add the initial lifecycle, back-button, local-storage, and landscape-orientation handling.
- [ ] Validate safe-area, status-bar, audio-session, muted-device, and headphone behavior on hardware.
- Confirm normal play needs no external browser redirect or unnecessary permission and handles a muted device/headphones gracefully.

Acceptance: Android build succeeds; iOS project is generated and either builds or has a precise owner-only blocker.

## Phase 3 - Parent-safe monetisation and store package

- [x] Add a fail-closed Capacitor entitlement discovery seam and a test-only,
  non-purchasing development adapter; keep both outside the public runtime.
- [ ] Implement live StoreKit and Google Play Billing adapters and sandbox
  transaction evidence after the owner supplies product IDs and store access.
- Add the parent-gated purchase and restore UI without exposing a browser payment shortcut.
- Finalize and approve the generated app icons/splash, then prepare screenshots, feature graphic, listing copy, privacy draft, support content, and review notes.
- Use accurate wording: the product builds/supports problem-solving and computational-thinking skills through play; do not claim programming instruction, academic improvement, school approval, or clinical outcomes.
- Verify current Apple/Google requirements again immediately before submission.

Acceptance: purchase/restore flows pass without real transactions, assets have provenance, and store metadata is internally consistent.

## Phase 4 - Release candidate audit

- Run the full test plan, offline checks, interrupted-save and corruption recovery checks, responsive viewport checks, and available-device checks.
- Run two consecutive complete release audits.
- Freeze V1, version the build, create a release-candidate checkpoint, and write `RELEASE_CANDIDATE_REPORT.md`.

Acceptance: all release criteria are green or explicitly blocked by a named owner action; no P0/P1 issue remains.

## Major-milestone checkpoint protocol

Create a GitHub and website checkpoint after a major project milestone has been completed and tested. Major milestones include a major gameplay system, dungeon/class/progression phase, substantial UI or tablet-control improvement, significant architecture/save migration, PWA/offline support, major testing/release-readiness phase, or release candidate. Do not create checkpoints for minor fixes, small balancing adjustments, wording changes, or incomplete work; group related smaller changes into one meaningful milestone.

For each major milestone:

1. Run the relevant tests and production build.
2. Confirm that the game remains playable.
3. Update the roadmap, status, and changelog.
4. Create a clear Git commit describing the completed milestone.
5. Push it to GitHub.
6. Deploy the tested web build to the configured domain.
7. Verify the live deployment.
8. Record the Git commit, deployment date, and milestone in project status.

Deployment must not interrupt autonomous development. After a checkpoint is verified, continue immediately with the highest-priority unfinished item in the existing Goal. The working order is: creative reference audit -> scoped implementation -> tests/build/playability -> GitHub and website checkpoint -> next unfinished Goal item.

Autonomous continuation follows `AUTORUN.md`: every cycle must produce a
concrete progress delta, three materially identical technical failures force a
strategy change, and five materially identical manual/gameplay attempts force
that route to stop and be recorded. `CURRENT_CHECKPOINT.md` is the canonical
percentage display; percentages are earned from named evidence and do not
replace acceptance criteria.

Latest verified checkpoint (2026-08-12): runtime `f0ce0e9` adds the
backward-compatible `WorldState` migration and shared `WorldRegion`/
`WorldConnection` registry on top of the tested Atlas, player-following
guidance, tablet controls, and audio foundation. The gate has no directional
pulsing arrow; the guide follows the character and points at the destination.
The release surface was published at preview
`https://596095e6.code-quest-lab.pages.dev/` and the configured hostname with
source hash
`AA469B00C64FDE728A04BBE088CC92E2F767075E7C590AFC1F044DE4D2E611F1`; both
production checks passed, and the fresh preview smoke reached Town, returned
safely to the dashboard, verified `1/11 routes charted` with no Dungeon 13
card, cleaned its disposable profile, and the configured hostname loaded the
current shell. The active next priority is the owner-supplied clean D1-12
route, meaningful touch session, and device evidence in
`DEVICE_ACCEPTANCE_RUNBOOK.md`. Later milestones must repeat the same test,
push, deploy, and live-verification sequence.
