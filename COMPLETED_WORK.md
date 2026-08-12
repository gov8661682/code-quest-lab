# Code Quest Lab - Completed Work Ledger

Updated: 2026-08-11

This is the canonical record of work that should not be repeated. Reopen an
item only for a failing test, confirmed regression, changed dependency, or a
documented acceptance-criterion failure. Optional improvements belong in
`BACKLOG.md`.

## D4 Normal ambush pacing and player-following exit guide (2026-08-12; deployed checkpoint)

- Preserved Joey's Omen Chamber three-wave structure, enemy roster, and final
  elite while giving Normal a finite touch-sized event budget: 2/3 targets in
  the first two waves, `0.78` regular health, `0.85` damage, bounded final
  elite health relief, and a shorter wave handoff. Veteran and higher
  difficulties keep the authored pressure.
- Routed developer invincibility through shared hazard suppression so cursed
  circles cannot falsify local QA HP telemetry. The aid remains loopback-only,
  session-only, and excluded from saves/exports/production.
- Cleared rooms now show a steady `NEXT ROOM` arrow above the player, aimed at
  the open forward door and following the player's movement; gate pulsing was
  removed. Boss rooms retain their deliberate exit-portal interaction.
- The **125/125** release gate, `qa:fast`, static package audit, Capacitor
  sync, and a fresh D4 loopback browser smoke pass. The smoke used documented
  QA accelerators, reached D4, resolved an event, verified the moving guide,
  and recorded empty browser warning/error diagnostics. Clean-player D1-D12
  and physical/native-device acceptance remain open.
- Commit `471cf96` was pushed to `origin/main` and deployed on 2026-08-12 to
  preview `https://f55bf568.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`. Deployed source hash:
  `BE1349634B3F97983A19FBE2C192056B48778D2916A66CADE4DB6D906F21B34C`; PWA
  shell v11. Production, desktop, and tablet live checks passed.

## Local route guidance and release-route contract (2026-08-12; no deployment checkpoint)

- Cleared rooms now render a steady `NEXT ROOM` arrow above the player. The
  arrow follows the player's world position and rotates toward the existing
  open forward door; it does not pulse on the gate or change route logic.
  Boss-room exit portals remain a separate deliberate handoff.
- Added a bounded release-route contract covering the released D1-D12 chain:
  generated forward links, authored finale identities, shared boss defeat and
  portal handoff, region order, and the existing D12 session ending.
- The local gate passes **125/125** tests. This route contract is included in
  the grouped deployment checkpoint above. Clean-player D1-D12 and
  physical/native-device evidence remain open.

## Completed baseline and direction

| Work | Evidence | Reopen condition |
|---|---|---|
| Preserved the original playable repository and created a recoverable baseline | Tag `code-quest-lab-baseline-2026-08-04`, backup path recorded in `STATUS.md`, clean Git history | Only a verified defect or lost baseline evidence |
| Reviewed Joey's latest self-contained output as a creative reference | `CREATIVE_REFERENCE_AUDIT.md`; reference hash `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB` | Only if a new reference or a specific parity discrepancy is supplied |
| Recorded preserved story, Bob dialogue, classes, dungeons, bosses, endings, and missing parity content | Creative audit comparisons and exact named-content ledger | Only if implementation contradicts the ledger or a scope decision promotes content |
| Locked the teen-first, tablet-first, offline, privacy-minimal, optional-learning, and non-manipulative V1 direction | `PRODUCT_VISION.md`, `V1_SCOPE.md`, `TARGET_AUDIENCE.md`, `DECISIONS.md` | Only by an explicit product decision recorded in `DECISIONS.md` |
| Recorded Joey's explicit open-world product direction and staged technical target | `OPEN_WORLD_DIRECTION.md`, `PRODUCT_VISION.md`, `V1_SCOPE.md`, `DECISIONS.md`, and `ROADMAP.md`; no runtime open-world completion is claimed | Only when the owner changes the direction or a future open-world milestone is promoted |
| Established bounded autonomous work and evidence-scored progress | `AUTORUN.md`, `CURRENT_CHECKPOINT.md`, D-018, and `tests/project-control-contracts.test.mjs`; 75-test release verification passes | Only if the control contract fails or the owner changes the working policy |
| Cleared stale static-room door status text | `updateRoomProgress` now clears `doorStatus.textContent` for Town/Entrance/Shrine/Treasure; focused lifecycle test and packaged local smoke pass | Reopen only if a supported surface still exposes stale status text |

| Touch-first D1 boss/portal slice | A disposable Mage completed the observable Dungeon 1 route through the Stone Guardian and exit portal with the session-only target lock; two disposable QA profiles were removed and the retained Mage/Barbarian profiles were verified unchanged | Reopen only for a route regression; full D1-8, ending, and safe-stop-session evidence remains in Checkpoint 1 |
| Boss dead-summon handoff | Boss-room progress counts live summons, discards dead summon objects after boss defeat, reopens the exit, and clears stale `CLEAR SUMMONS` text; the focused contract is part of the 80-test release gate | Reopen only if a defeated boss room remains locked or displays stale summon status |
| Dungeon 2 QA route and queued level-up clarity | A disposable Mage QA route completed Dungeon 2 Normal through the Fallen King and portal into The Shadow Realm Entrance; queued level-up cards now display their earned level and remaining choices; commit `9c451af`, 81-test release gate | Reopen only for a route regression, an upgrade overlay dead-end, or full D1-8 acceptance |
| Elite pacing and queued attack input hardening | Local disposable Mage QA cleared the D2 two-elite Executioner's Court after the shared post-modifier health budget was applied, completed the three-phase Fallen King, and entered The Shadow Realm Entrance; touch and desktop attack taps now wait for cooldown readiness; two focused contracts pass | Reopen only for a fresh-room pacing regression, a discarded ready-intent report, or full D1-8 acceptance |

## Room-entry motion and early D1 onboarding hardening (2026-08-11; deployed checkpoint)

- Fixed the remaining pause-like entry behavior: mobile enemies receive a
  short `1.35s` arrival-motion budget with bounded tangential drift, and that
  timer is no longer extended by the opening read-and-respond prompt. The
  prompt remains a damage grace state; it does not freeze or hold enemies in
  an orbit.
- Tuned only the first Normal D1 onboarding band: ordinary rooms through
  depth 5, the first elite, and the first mini-boss each use explicit finite
  health/damage/speed/cadence budgets and short response grace where needed.
  Joey's named enemies, authored mechanics, later scaling, and stationary
  enemies remain unchanged.
- The source mirror, **121/121** release gate, fast QA, static package audit,
  Android/iOS sync, and production checks passed. A clean local route cleared
  the first combat room and reached the first mini-boss before ending. Live
  600x768 tablet and 1024x768 desktop smokes reached the first combat room,
  returned through the normal dashboard flow, and recorded no browser
  diagnostics; disposable smoke profiles were deleted.
- Commit `ae91268` was pushed to `origin/main` and deployed on 2026-08-11 to
  preview `https://dfb05e32.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`. Deployed source hash:
  `ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094`; PWA
  shell v11.
- This is a release checkpoint, not completion of Checkpoint 1: clean-player
  D1-D12 and physical/native-device acceptance remain open.

## Level 1 room-entry approach lane (2026-08-11; deployed checkpoint)

- Fixed the reported pause-like appearance when entering the first Normal D1
  room: its opening melee roster now uses a bounded, data-driven visible
  approach lane (`132/28/18/84/36` side offset, side step, jitter, forward
  offset, and forward step) rather than spawning inside attack range.
- Preserved Joey's authored roster, attack math, later procedural placement,
  stationary enemies, and the separate early-route Normal-only budget. The
  exact source mirror, **120/120** release gate, fast QA, static package audit,
  Android/iOS sync, and production build passed.
- Commit `0000f0d` was pushed to `origin/main` and deployed on 2026-08-11 to
  preview `https://ca1ac0fa.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`. Deployed source hash:
  `E60F8F1D603A4F8FEE74715DE66A7ED04AE0325B4B7C715DF49E90338B33B56E`; PWA
  shell v11. Live 600x768 no-aid smoke reached the first combat room and two
  captures showed enemies repositioning. The temporary test profile was
  deleted after the normal dashboard flow.
- This is a release checkpoint, not completion of Checkpoint 1: clean-player
  D1-D12 and physical/native-device acceptance remain open.

## Completed web milestone (2026-08-10; deployed)

- Commit `095aa30` (`Checkpoint D4-D6 route QA and phase hardening`) was pushed
  to `origin/main` and deployed to Cloudflare Pages on 2026-08-10. Preview:
  `https://050a6395.code-quest-lab.pages.dev/`; configured hostname:
  `https://code-quest-lab.gov8661682.com/`. Both production checks passed, and
  live desktop/tablet smoke reached the Mage entrance, pause/resume, and
  movement input with no browser warning/error diagnostics.

## Level 1 opening-pressure and enemy-motion correction (2026-08-10; deployed checkpoint)

- Corrected the opening-room regression model to include the production melee
  cadence, then tuned only the first Normal Dungeon 1 room to `0.50` health,
  `0.45` damage, `0.55` movement speed, and `1.80` attack-cooldown scaling.
  The existing 10-second read-and-respond message now keeps enemies moving
  while the intro state directly suppresses player damage across the shared
  melee, projectile, debuff, and opening special-attack guards. Joey's enemy
  roster and later dungeon scaling remain unchanged.
- Ordinary-player fast QA clears the two-enemy room in **6.1 simulated
  seconds** with the player alive. The source mirror, static build, native
  sync, package audit, and full **116/116** release gate pass. Runtime commits
  `1987310`, `a169c11`, and `fc7f738` were pushed and deployed to preview
  `https://bad086fb.code-quest-lab.pages.dev/` and the configured hostname
  `https://code-quest-lab.gov8661682.com/`; both production checks passed.
  PWA shell v10 and source/mirror hash
  `FF72502DB480DF89225A7335E68574DD983C75C08DC4077E2F223A1CC35AEDC4` are
  recorded. Cache-busted live smoke showed two enemies repositioning while
  the prompt remained visible and HP stayed at 100% across 1.8 seconds, with
  no browser warning/error diagnostics. Clean-player full-route and
  physical-device evidence remain separate acceptance lanes.

## Level 1 opening-room regression contract (2026-08-10; local)

- Added a dependency-free `simulateOpeningRoom` model to the fast QA suite.
  It exercises the fresh Normal D1 two-enemy health/damage/timing/range budget
  with ordinary Barbarian attacks only, clears in 6.1 simulated seconds, and
  confirms the player survives the opening pressure. The complete local gate
  is **116/116**. The regression contract is included in deployed runtime
  commits `1987310` and `fc7f738`; player/device acceptance lanes remain open.

## Recovery-safe pause handoff (2026-08-10; deployed)

## D1-D12 route continuation and custom phase QA hardening (2026-08-10; deployed)

- A fresh loopback Mage route extended managed route coverage through D4-D6.
  It observed D4's Fallen Hero event, off-screen target guidance, elite
  Crystal Hollow, and Void Monarch; D5's Fallen Hero event and Chieftain
  phase-3 transition; and D6's Archmage arena and QA defeat handoff. A D4
  high-health elite pair required bounded developer damage after normal Mage
  damage became impractical at the tablet viewport; this remains QA-assisted
  evidence and does not close clean-player or physical-device acceptance.
  Browser warning/error diagnostics were empty.

- A loopback Mage route continued the protected D1 handoff through D1 and D2,
  then used the bounded developer route aid to traverse The Shadow Realm and
  D5-D12 through `THE SESSION IS COMPLETE`. The route observed Joey's named
  bosses, authored phases/dialogue/defeat sequences, rewards, Veteran unlocks,
  portal exits, Ranger Captain's delayed peaceful defeat, and the D12 terminal
  summary. This is QA-assisted evidence, not clean-player acceptance; the
  tested milestone checkpoint is recorded above.
- `developerQaAdvanceBossPhase` now dispatches the real custom phase fields for
  Fallen King, Void Monarch, High Chieftain, Valen, Hollow World Tree, Broker,
  later corruption bosses, and Pure Corruption. The exact source mirror,
  production build, Capacitor sync, package audit, and **113/113** gate pass.

## Managed tablet touch session (2026-08-10; local; no deployment checkpoint)

- A disposable Mage completed a managed 600x768 tablet session recorded by the
  profile data screen as **13 minutes**. It used the visible Move/Attack
  joysticks, target lock, step movement, shrine and treasure taps, queued level
  ups, elite bounty, Prison Warden, all three Fallen King phases, pause, and
  deliberate Finish and Return to Dashboard. The disposable profile was then
  deleted; the retained profiles were not changed. This improves managed
  tablet evidence but does not satisfy physical-device or clean-player lanes.

## Fresh managed D1-D4 route evidence (2026-08-10; no deployment checkpoint)

- A fresh Mage used only loopback session invincibility and normal player
  controls to complete D1 and D2 Normal at 1024x768/600x768, including the D2
  Prison Warden mini-boss, Fallen King phases, queued rewards, Veteran unlock,
  and portal into D4, The Shadow Realm. The managed browser recorded no warning or
  error diagnostics.
- A D4 attempt reached Broken Crossing and correctly saved a death summary
  after invincibility was accidentally toggled off. A second D4 start verified
  the aid's visible enabled banner, protected combat, pause, and deliberate
  finish. This is managed route evidence only; full D1-D12, clean-player,
  physical-device, and deployment-checkpoint requirements remain open.
- Hardened the local developer aid after that probe: repeating `CQLI` can no
  longer disable an already-enabled session, and page reload remains the reset
  boundary. The focused contract and full **113/113** release gate pass; this
  does not add player-route or deployment evidence.

## Fresh D1 normal-control continuation (2026-08-10; no deployment checkpoint)

- A retained Level 3 Mage started a new D1 Normal run with only loopback session
  invincibility. Normal mouse-target attacks and reward/exit controls cleared
  Shadow Hall, the Elder Stone shrine, Bone Chamber, Treasure Chamber, Ruined
  Archway, and Ashen Pit; Death Chamber was reached, one elite was defeated,
  and the run was safely paused with two elites remaining at 36 kills. Browser
  diagnostics were empty. This is partial route evidence only and does not
  satisfy fresh-profile, full-route, clean-player, or device acceptance.

- Recovered combat checkpoints now restore the exact room and open the normal
  pause menu before the game loop resumes. This prevents damage from landing
  before a returning player can read the objective or choose Resume, and gives
  managed-tablet QA a deterministic point to arm the session-only invincibility
  aid. A current-build browser run at port 4176 verified D1 combat, pause,
  reload, `SESSION RECOVERED`, safe Resume, a second pause, Finish and Return
  to Dashboard, and zero error/warning diagnostics. The focused lifecycle
  contract and full **113/113** release gate pass. Physical-device and
  10-30-minute touch evidence remain open. Tested commit `e7871b0` was pushed
  to `origin/main` and deployed to Cloudflare Pages; preview `a89328df` and
  the configured hostname passed production checks, and live desktop/tablet
  smoke reached D1 combat and safe pause with no browser diagnostics.

- Promoted Necromancer's Stolen Graveyard after Ranger Watchtowers. A
  loopback QA-assisted Mage route verified the Cemetery Gate, corrupted horde
  rooms, Soul Collector content, The Ritual Altar, the Corrupted
  Necromancer's authored Phase 1/Phase 2 transformation and soul-release
  defeat sequence, standard boss rewards, Veteran unlock, final portal, and
  `THE SESSION IS COMPLETE`. Reloading the saved defeated-boss checkpoint
  recreated the portal and exposed the managed `Proceed through exit`
  fallback. The source mirror, deterministic QA, build/package audit,
  Capacitor sync, and **112/112** release gate pass. This is functional
  loopback evidence, not clean-player, physical-device, GitHub, or website
  evidence.

- Promoted Ranger Watchtowers after The Abandoned Laboratory. A loopback
  QA-assisted Mage route verified the environment-first randomized watchtower
  rooms, first-visit salvage, Shattered Signal Tower, Corrupted Ranger
  Captain intro/transformation, custom Phase 2, peaceful defeat sequence,
  guaranteed Tier 8 materials, Veteran unlock, managed portal fallback, and
  `THE SESSION IS COMPLETE` summary. The source mirror, deterministic QA,
  build/package audit, Capacitor sync, and **111/111** release gate pass. This
  is functional local evidence, not clean-player, physical-device, GitHub,
  or website evidence.

- Promoted The Abandoned Laboratory after D9. A loopback QA-assisted route
  verified its randomized combat rooms, Head Researcher mini-boss, The
  Alchemist's authored phase transition, reward flow, Veteran unlock, portal,
  and final session summary. The phase-aware QA helper and boss-portal touch
  fallback are covered by the focused contracts and the **110/110** gate.

- Promoted the existing Vow Breaker's Castle route into the playable chain
  after D8. A loopback QA-assisted route verified the Castle Gate, Royal
  Commander mini-boss, Oathbreaker King phase/dialogue transition, reward
  vault, Veteran unlock, final portal, and `THE SESSION IS COMPLETE` summary.
- Fixed the delayed mini-boss race exposed during that route: the exit prompt
  and developer room-complete helper now wait for a mini-boss to spawn and be
  defeated. The source mirror, deterministic QA, static build/package audit,
  Capacitor sync, and **109/109** release gate pass. This is functional local
  evidence, not clean-player, physical-device, GitHub, or website evidence.

## Completed release foundation

| Work | Evidence | Reopen condition |
|---|---|---|
| Source mirror and dependency-free verification loop | `index.html` equals `code-quest-lab-source.txt`; `npm.cmd run release:verify` passes | Mirror/test/build failure |
| Self-preparing release verification | `release:verify` now runs source contracts, `native:sync` (build plus Capacitor web-asset synchronization), tests, and the static-package audit in that order; the project-control contract and 108-test release gate pass locally | Reopen if a source edit can again leave `dist` or native web bundles stale during the composite gate |
| Static/offline web foundation | Relative manifest, v6 service worker, local assets, public review pages, headers, deterministic `build-info.json` | A failing package/service-worker contract or changed release requirement |
| V1 route boundary | `REGION_ORDER` and progression contracts expose D1, D2, and D4-12 while rejecting D13-16 and post-release checkpoint bypasses | A route guard regression or explicit scope promotion |
| Save and active-run contract layer | Save parser/loader matrices, backup promotion/default fallback, checkpoint parser, lifecycle tests, and deletion coverage | A failing test or real data-loss/unsafe-resume evidence |
| Versioned plain-text profile transfer | `CODE QUEST LAB PROFILE EXPORT` preserves durable profile data, valid backup, and active-run checkpoint; a real browser file-chooser upload imported a matching Level 4 Barbarian copy with the same dungeon, highest room, run count, and play time while leaving the original untouched; import creates a new local profile and enforces the current class whitelist | A failing transfer contract, data-loss/overwrite evidence, or a promoted cross-version/device migration requirement |
| Browser input/session hardening | Focusable canvas; touch/mouse/joystick paths; release fallbacks; first-room onboarding; pause/resume/Finish For Now/recovery surfaces; bounded offscreen live-threat cue; immediate final-enemy room/HUD refresh | A reproducible input, freeze, recovery, or P1 usability defect |
| Town first-world breadcrumb | Town now renders a physical `North Road` signpost and matching `ROAD` minimap landmark toward the existing Forgotten Depths portal; it preserves free walking, portal interaction, and route boundaries; the static contract, 108-test release gate, build/package audit, deterministic QA, and native sync pass locally | Reopen for a visual/readability regression or a promoted World Atlas milestone; permitted browser/device replay remains open |
| First-session onboarding clarity | Profile copy explains the Town-led fantasy premise; the modifier screen explains temporary run rules; unlocked route cards point to the Town gate and show one reward line; the focused progression contract, 108-test release gate, build/package audit, deterministic QA, and native sync pass locally | Reopen for a comprehension or layout regression; permitted browser/device visual replay remains open |
| Managed action-button click fallback | Skill, potion, optional Bob Beam, and Auto Rush controls share `wireActionButtonPress`, with duplicate-safe DOM-click recovery, delayed-pointer-up suppression, cancellation handling, and behavioral contract coverage; the 108-test release gate, build/package audit, deterministic QA, and native sync pass locally | Reopen for a reproducible duplicate activation, cancelled-gesture activation, or physical-device/browser validation failure |
| Plain-text transfer migration fixtures | Legacy raw saves remain importable; future save versions and unsupported future classes are rejected; invalid optional checkpoints are dropped without invalidating durable profile data; all three focused fixtures and the 108-test release gate pass | Reopen for a failing migration, overwrite/data-loss evidence, or promoted cross-device/cross-origin acceptance requirement |
| Local developer playtest aid | Loopback URL gate plus hidden key sequence toggles a session-only invincibility mode; focused contract and local runtime smoke passed; no save/export field and no public/native activation | A save/export leak, public-host activation, or runtime failure; keep it out of deployed builds unless explicitly promoted |
| Rolling project learning memory | `PROJECT_MEMORY.md` is read at the start of every autonomous cycle and updated by replacement/consolidation rather than stacked logs; the project-control contract enforces the read rule, material-state-change blocker rule, and 120-line limit; the full **108/108** gate passes | Reopen if a cycle bypasses the memory, stale facts accumulate, another project memory is created, or the bounded-memory contract fails |
| Shared encounter tuning architecture | `getEncounterTuning(dungeonId)` now composes difficulty, dungeon progression, and temporary run modifiers for the reusable enemy/miniboss paths and every named boss spawner; the architecture contract validates every spawner plus finite, complete, monotonic dungeon/difficulty registries; source mirror, static build/package audit, native sync, fast QA, and **108/108** tests pass while Joey's bespoke boss mechanics remain intact | Reopen for a stat-composition regression, a new encounter path that bypasses the contract, or a deliberately promoted balance change |
| Data-driven mini-boss roster routing | `MINIBOSS_TYPES_BY_DUNGEON` preserves Joey's existing D1, D2, D4, D5, D6, and D10 mini-boss pools, gives future regions one registry seam, and retains the D1 fallback; the focused architecture contract, source mirror, build/package audit, native sync, deterministic QA, and **108/108** release gate pass | Reopen for a roster regression, a missing promoted-region pool, or a balance/content decision that changes the authored roster |
| Architecture review and deterministic QA workflow | `ARCHITECTURE_REVIEW.md`; shared `BOSS_IDENTITY_DEFS`; loopback-only accelerated/phase/room/boss QA controls; fixed-seed `tools/qa/fast-combat-sim.mjs`; 92-test full suite, build/package audit, native sync, GitHub commit `2c1d6ba`, Cloudflare preview `7c154632`, configured-domain production checks, and live browser smoke pass | Reopen only for a regression in the identity contract, QA gate, simulator invariants, or a promoted architecture migration |
| V1 route QA and exit-handoff hardening | Loopback Mage QA now traverses the functional D1, D2, D4, D5, D6, D7, D8, D9, D10, D11, and D12 boss/portal chain with the QA aid, reaches the final session summary, and verifies the Royal Commander/Head Researcher/Oathbreaker King/Alchemist/Ranger Captain/Corrupted Necromancer content; shared QA cleanup, truthful exit objective, saved-boss portal recovery, and dungeon-entry wording are covered by the 112-test gate | Reopen for a route-handoff regression; clean-player D1-12, ending, and touch-session acceptance remain separate |
| Bounded Dungeon 4 recovery pressure | D4 corruption now permits one Shadow Wraith surge per room; Regenerating elites can recover only a finite 25% of maximum health per encounter, with room-checkpoint persistence; focused contracts and the 78-test release gate pass; a fresh local D1 route also clears an elite room under the developer test aid | Fresh post-fix D4 elite-room rerun and full D1-8 route acceptance; do not deploy this hardening alone |
| Session transient-status cleanup | New sessions clear stale dungeon door text, lock styling, and waypoint activation state; no-waypoint zones also hide leftover activation status. Focused contracts and a local defeat-to-Town screenshot pass cover the regression. | A reproduced stale status in a new Town/Entrance session |
| Public safety/review surface | About, Educational Purpose, Privacy, Support, Contact, School Review, same-origin/static/package safety contracts | A product-safety regression or owner-approved policy change |
| Capacitor/native scaffolding | Android/iOS projects, `dist` sync, landscape config, App lifecycle/back-button bridge, native entitlement seam | Native sync/contract failure or platform requirement change |
| Entitlement core/development adapter | Product identity, verified-source, parent gate, restore/revoke/fail-closed tests; development adapter excluded from public package | Entitlement contract failure or approved platform integration work |
| Branded PWA/native assets | SVG sources and deterministic PNG derivatives generated and registered | Asset hash/provenance mismatch or approved artwork replacement |

## Completed milestone evidence

- Checkpoint 0 was completed and recorded in commit `bf07810`, pushed to
  `origin/main`, deployed on 2026-08-04, and live-verified at the configured
  domain.
- The save-portability/readability major milestone was recorded in commit
  `9da1d0e`, pushed to `origin/main`, deployed on 2026-08-05, and live-verified
  at the configured domain and Pages preview. It does not complete Checkpoint
  1 because full D1-8 player completion and attack-response evidence remain
  open.
- The fresh touch-first D1 boss/portal milestone was recorded in commit
  `0c960fc`, pushed to `origin/main`, deployed on 2026-08-07, and live-verified
  at the configured hostname and preview `88bd6ae9`. Its 80-test release gate,
  live browser flow, target-assist control, and boss dead-summon handoff are
  recorded; D1-8, the ending, and the full safe-stop session remain open.
- The elite-pacing/input major milestone was recorded in commit `5cbe80c`,
  pushed to `origin/main`, deployed on 2026-08-07, and live-verified at the
  configured hostname and preview `cfe817cd`. Its 83-test release gate,
  17-file package audit, native sync, and desktop/tablet browser smoke passed;
  the deployed shell SHA-256 is
  `4134FC9D7DE891F5D890AF59774CC26BB711AAA8BA8277CF967962F7880B9840`.
- The local follow-up commit `32d83d0` added page-background save-order test
  coverage and documentation/status corrections; it is not a new website
  milestone because the shipped shell did not change.
- On 2026-08-05, `npm.cmd run release:verify` passed 65 tests, a 17-file build,
  and the static-package audit; `npm.cmd run native:sync` passed. The earlier
  production check and deployed profile-transfer UI smoke remain valid for
  `9da1d0e`; hardening commit `5db6db5` is pushed to `origin/main`, while the
  stale-status follow-up is tested locally but is not deployed.
- On 2026-08-07, the retained Barbarian completed a real local export/upload/
  import round trip. The imported copy matched its visible progress fields,
  the original remained unchanged, and only the temporary copy was deleted.
  This closes the local upload evidence lane but not cross-version/device
  migration.
- Commit `3e33470` (`Add gated developer invincibility cheat`) is pushed to
  `origin/main`. It groups the local first-combat spawn hardening, developer
  cheat contract, and current control-record updates; it is intentionally not
  a website checkpoint or deployment.
- Commit `8e165e1` adds exact generated-route restoration before
  checkpoint room-state application and corrects the first-combat room guard;
  focused contracts, the 65-test release verification, source-mirror equality,
  native sync, and a clean same-room resume smoke pass. It is intentionally not
  a website checkpoint or deployment; the bounded off-viewport target finding
  remains open for future route/playability work.
- Commit `4747413` adds a focused, contract-tested `THREAT` cue for a hidden
  live enemy outside an enlarged combat viewport. A bounded local Mage run
  reproduced the Soul Wraith lock, then a pause/reload/recovery/resume smoke
  passed without data loss; the full route and touch/tablet acceptance bar
  remain open. The 66-test release verification, 17-file package audit, and
  native sync pass; this is intentionally not a website checkpoint or
  deployment.
- Commit `3106820` (`Refresh combat status after final enemy defeat`) adds the
  evidence-driven final-enemy room/HUD refresh for level-up pause timing.
  Focused and full release verification passed all 67 tests, the 17-file
  package audit, and native sync; a local recovered-room smoke showed no stale
  lock. It is intentionally not a website checkpoint or deployment.

## Explicitly not completed by these records

The following must not be inferred from the completed work above: a full
player-completed D1-8 run, a complete ending, a physical-device test, a signed
native build, a live store transaction, cross-version/device save evidence,
owner/legal approval, or Release Candidate status.
