# Code Quest Lab - Changelog

## Touch pointer-capture fallback (2026-08-12; local QA)

- Shared touch joysticks now feature-detect Pointer Capture and continue
  initializing if a browser or webview rejects it. This protects movement and
  attack startup on mobile surfaces without changing combat math or targeting.
- The source/mirror, native package, static audit, `release:verify`
  (**141/141**), and all-11-finale `qa:fast` pass. Runtime `72451c3` is pushed;
  source hash:
  `DB127E831F46778CD6FBD5E7EB0E5C6C403AC2A49BF74B6607FE1865D53CF0EA`.
- This is local release-readiness hardening, not a website checkpoint or score
  change; the deployed runtime remains `b5d701e`.

## Guidance and release-readiness checkpoint (2026-08-12; deployed)

- Grouped the steady `TO DEPTHS`, `TO GATE`, and `NEXT ROOM` cues so the arrow
  follows the character and points toward the destination; removed the
  gate-mounted pulsing directional arrow. Joey's combat, story, and balance
  systems are unchanged.
- Added the adaptive first-room pointer/touch hint and ran the **140/140**
  release gate, deterministic `qa:fast` for all 11 released finales, static
  package audit, Capacitor sync, and production checks.
- Published runtime `b5d701e` from current main snapshot `cca39fb` to preview
  `https://ce226dfb.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`; deployed source hash:
  `530E64C00A4DCFEE59BD7B7F4AF2640AD8BB142E54C8B5909BF40A8195EF6EF6`.
- Fresh live preview smoke reached first combat, pause, and safe finish from
  a disposable profile; cleanup succeeded and diagnostics were empty. The
  evidence score remains **93% / 19%** because clean-player and device lanes
  are still open.

## Adaptive first-room control guidance (2026-08-12; local QA)

- The first Normal D1 combat banner now detects touch-first surfaces and tells
  players to center-hold Attack to lock and fire; pointer surfaces receive
  nearest-target Attack/click guidance. This is a bounded onboarding hint and
  does not alter Joey's combat or balance.
- The canonical source/mirror, Capacitor-synchronized package,
  `release:verify` (**140/140**), `qa:fast`, and a fresh first-room smoke on an
  isolated loopback origin passed with empty browser diagnostics. The disposable
  test profile was deleted; commit `b5d701e` is pushed with no deployment or
  score credit.

## No-aid released-route QA (2026-08-12; local QA)

- Added a data-driven mechanics-confidence simulation for all 11 released
  finales: D1, D2, and D4-D12. It uses ordinary attack cadence, real incoming
  damage, authored phase thresholds, and finite add budgets without developer
  aids or route shortcuts; D11 and D12 retain their distinct content modes.
- The local gate is **140/140** and `qa:fast` reports all finales victorious.
  This does not claim clean-player, touch/device, room-interaction, or balance
  acceptance, so no website deployment or score change was created. Commit
  `c1d4ba0` is pushed.

## Junction-safe Capacitor commands (2026-08-12; local release readiness)

- Added repository-root-safe wrappers for native synchronization and the
  Android build command. They resolve the real Git path before invoking npm,
  npx, and Capacitor, so the Codex workspace junction cannot corrupt generated
  Gradle or Swift dependency paths.
- Alias-launched sync, the full **139/139** release gate, static package audit,
  and `qa:fast` pass. Commit `0a6e729` is pushed; no website deployment was
  created because the runtime and deployed milestone were unchanged.

## Steady gate landmark polish (2026-08-12; local QA)

- Kept the destination cue attached to the player and aimed at the Town portal
  or dungeon gate; it no longer becomes a screen-edge or gate-mounted arrow.
- Removed the remaining time-varying destination glow so the steady arrow is
  the only directional cue. The full local gate remains **139/139** and the
  deployed milestone/score are unchanged; this minor visual refinement is
  grouped for the next meaningful website checkpoint.

## Released-route World Atlas foundation (2026-08-12; deployed milestone)

- Added a touch-friendly dashboard atlas for Town and the released route
  registry, including current location, waypoint discovery, objectives, and
  honest unlock conditions.
- Charted destinations reuse the existing difficulty/modifier flow; D13+
  remains sealed and no new save schema or travel engine was added.
- The complete release gate is **139/139**, `qa:fast`, static package audit,
  Capacitor synchronization, both production checks, and preview UI smoke all
  pass. Commit `7b961b9` is pushed and deployed to the configured hostname
  with preview `https://79d7af68.code-quest-lab.pages.dev/`; the C1 evidence
  score is unchanged.

## Player-following guide regression contract (2026-08-12; local QA)

- Added regression coverage for the steady arrow beside the player: it points
  toward the Town portal or entrance gate without pulsing or mounting an arrow
  on the destination.
- The full local gate is now **138/138**. This is navigation regression
  protection only; no runtime deployment or score change was created.

## Device acceptance handoff (2026-08-12; control/release readiness)

- Added `DEVICE_ACCEPTANCE_RUNBOOK.md` for the remaining owner-side clean
  route, touch-session, device/lifecycle, audio, offline, local-save, and
  optional transfer checks.
- Linked the packet from blocker/owner records and explicitly kept developer
  QA aids out of clean-player score credit. No deployment or percentage change
  was made; the managed-browser route remains loop-broken.

## PWA cache happy-path regression (2026-08-12; local QA)

- Added service-worker coverage for caching a successful same-origin asset and
  reusing it after simulated network loss without retrying the network.
- The full local gate is now **137/137**. This is offline-readiness coverage
  only; no physical-device evidence, score change, or deployment was created.

## D13 authored story parity guard (2026-08-12; local)

- Contract-tested Joey's complete D13 story delivery: Threshold of the Void
  arrival, the arena arrival line, post-defeat stillness, and the exact
  purification farewell.
- Corrected the audit and roadmap to show dialogue parity as complete; no
  extra cutscene was invented and no website deployment or score credit was
  created.

## D13 reward-boundary closure (2026-08-12; local gated runtime)

- Added Joey-preserving standard completion rewards to Corruption of Space:
  2.0x guardian souls, boss XP/mastery, named defeat statistics, best-level
  tracking, authored death effects, achievement refresh, and the shared exit
  handoff.
- Kept Realm of Space outside the release route, unlock graph, and active-run
  recovery until future-region progression, story/dialogue, save/resume,
  balance, and return-to-world acceptance are tested. No D13-specific loot was
  invented because the reference build does not define it.
- Updated the gated-content contracts and audit. The local **135/135** gate
  passes; no website deployment or score credit was created.

## Plain-text profile transfer fixture matrix (2026-08-12; local QA)

- Added synthetic `.txt` fixtures covering legacy v1 raw saves, current v2
  Mage progress with a valid backup and active-run checkpoint, invalid
  optional checkpoints, future save version 3, and an unsupported Ranger
  class.
- The focused parser contracts load the fixtures from disk and exercise BOM,
  Windows line-ending, safe-migration, and fail-closed boundaries. This is a
  test/documentation milestone only: no runtime hash changed, no deployment
  was created, and cross-device/native-storage runtime evidence remains open.

## Fresh-origin profile-transfer smoke (2026-08-12; local browser evidence)

- Imported the current v2 fixture through the real browser file chooser on a
  fresh loopback origin and recovered Dungeon 1 room `d1_room_a` at Level 7 / 42
  Souls.
- Imported the legacy v1 fixture on a second fresh loopback origin and observed
  Level 5 / 17 Souls with highest room 4. Both temporary profiles were deleted
  through Manage Data. This is alternate-origin browser evidence only; it does
  not replace physical-device or true cross-device validation, and no website
  deployment was created because the runtime hash is unchanged.

## Fresh Mage first-boss QA diagnostic (2026-08-12; local)

- Added a deterministic fresh Normal Mage/Stone Guardian scenario to fast QA.
  It exercises the ordinary attack cadence, the authored summon phase, real
  incoming damage, and victory without invincibility or developer shortcuts.
- Recorded the fourth bounded 600x768 no-aid audit as input evidence: one
  attack landed, then attack-only input without movement ended in death. No
  additional global damage nerf was justified, and the evidence score remains
  **93%** / **19%**.
- The full local release gate is now **128/128**; this test-only slice is not a
  deployment checkpoint.

## D13 preflight guard (2026-08-12; local)

- Added three contracts that keep the source-resident Realm of Space outside
  the V1 release route until its reward, material, achievement,
  unlock/progression, dialogue, save, and return work is complete.
- The audit preserves the authored two-room atmosphere, Corruption of Space
  phases/attacks/death sequence, exit portal, and purification hook. The local
  suite is now **131/131**; no D13 content was exposed and no site deployment
  was created.

## Player-following entrance guide refinement (2026-08-12; deployed checkpoint)

- Replaced the Town and dungeon-entrance edge cue with a steady arrow rendered
  beside the character in world space. It rotates toward the actual destination
  and follows player movement; no pulsing or directional arrow is mounted on
  the gate.
- Kept the existing cleared-room forward-door guide and boss-room portal
  handoff intact. The mirrored source and ordered local gate pass **127/127**,
  `qa:fast`, package audit, and Capacitor synchronization.
- Live desktop `1280x720` and tablet `600x768` main-flow smokes passed with
  empty warning/error diagnostics; the tablet touch joystick defeated one
  opening enemy. Commit `4580631` was pushed and deployed to
  `https://932a4fb6.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/` on 2026-08-12. Source hash:
  `6E6998C32F899B48BC68C06439D213AE8D866B8068F84A29EBF7D5F10B79685A`.

## Fine-pointer attack fallback (2026-08-12; deployed checkpoint)

- Added a visible, keyboard-accessible `Attack nearest target` control for
  fine-pointer surfaces where the touch Attack joystick is intentionally
  hidden. It uses the existing shared nearest-target queue, so the input
  behavior remains consistent with touch Attack taps and target assist.
- Kept the touch layout unchanged and preserved the existing mouse canvas
  attack path. A canonical `1280x720` first-room smoke displayed and clicked
  the control with empty browser warning/error logs.
- The ordered release gate passes **127/127**, `qa:fast`, package checks, and
  native synchronization. Clean-player D1-D12 and physical/native-device
  acceptance remain open. Commit `7f1ea4f` was pushed to `origin/main` and
  deployed to `https://c3162cd3.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`; source hash:
  `EC14E3B24CFF952F5D38C57E733B8B7C55DF7225EC12B95C03DF25E073856C82`.
  Production checks, live first-room control smoke, and preview shell load
  passed on 2026-08-12 with empty browser diagnostics.

## Stone Guardian onboarding and player-following guide (2026-08-12; deployed checkpoint)

- Added a Normal D1-only Stone Guardian onboarding budget
  (`0.60/0.55/0.90/1.40/0.60` plus `4.0s` entry grace) so the first full boss
  teaches its patterns on the web platform without removing Joey's phases,
  summons, hazards, identity, rewards, or higher-difficulty pressure.
- Kept the directional guide beside the player and moving with the character;
  removed the gate-mounted directional cue. The first-boss QA aid now also
  suppresses all of the boss's shared hazard paths truthfully.
- The local release gate passes **126/126**, `qa:fast`, package audit, and
  Capacitor synchronization. Commit `6e5812f` is pushed to `origin/main` and
  deployed to `https://ab0fd517.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/` on 2026-08-12. Source hash:
  `800B75EA81A332BD2BAA6A51E36390C444FACC507CA0F2F5E29BD2FE453A3DE9`.
  This remains QA-assisted evidence rather than a clean-player D1-D12 or
  physical-device claim.

## Normal D1 onboarding balance correction (2026-08-12; deployed checkpoint)

- Responded to the web-platform level-1 difficulty report without removing
  Joey's enemy identities, elite rewards, mini-boss patterns, or later route
  progression. Normal D1 ordinary rooms through depth 6 now use a finite
  `0.68` health / `0.28` damage / `0.80` speed / `1.80` attack-cooldown budget
  with `4.5s` response grace; the first elite uses `0.45/0.22/0.75/2.00` with
  `5.0s` grace; the first mini-boss uses `0.60/0.35/0.78/1.60` plus `3.5s`
  entry grace. Higher difficulties and later rooms are unchanged.
- Updated the source mirror and generated web/native surfaces. The release
  suite passes **125/125**, `qa:fast`, the static package audit, and the
  Capacitor synchronization check. Fresh no-aid 600x768 local play cleared
  the opening room and bounded runs reached the first D1 mini-boss; a full
  clean D1-D12 route and physical/native-device evidence remain open.
- Runtime commit `baaab57` was pushed to `origin/main` and deployed to
  `https://051a6921.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/` on 2026-08-12. Source hash:
  `C937213507EEAC5F837DC7F733EB6DB950142BA8B412B2EA4FEEA9764D8C31C1`.
  Production checks and live desktop/tablet first-room smokes passed.

## D4 Normal ambush pacing and player-following exit guide (2026-08-12; deployed checkpoint)

- Kept Joey's Omen Chamber three-wave identity, roster, and elite finale while
  adding a finite Normal touch budget: 2/3 targets in the first two waves,
  `0.78` regular health, `0.85` damage, bounded final-elite relief, and a
  shorter wave handoff. Veteran and higher difficulties retain the authored
  pressure.
- Added shared developer-invincibility hazard suppression for cursed circles,
  keeping the loopback-only QA aid's HP telemetry truthful without putting it
  in saves, exports, native builds, or production activation.
- Replaced the cleared-room gate cue with a steady `NEXT ROOM` arrow above the
  player that rotates toward the open forward door and follows movement. Boss
  rooms retain the deliberate exit-portal handoff.
- The **125/125** release gate, `qa:fast`, static package audit, Capacitor sync,
  and a fresh D4 loopback browser smoke pass with empty warning/error logs.
  This is QA-assisted evidence; clean-player D1-D12 and physical/native-device
  acceptance remain open. Commit `471cf96` was pushed to `origin/main` and
  deployed to preview `https://f55bf568.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`. The deployed source hash is
  `BE1349634B3F97983A19FBE2C192056B48778D2916A66CADE4DB6D906F21B34C`, PWA
  shell v11, and production/desktop/tablet live checks passed.

## Included route guidance and release-route contract (2026-08-12 checkpoint)

- Replaced the cleared-room gate cue with a steady `NEXT ROOM` arrow that is
  anchored above the player and rotates toward the open forward door. It moves
  with the character each frame, so the player does not have to search for a
  pulsing marker left at the gate. Boss rooms continue to use their deliberate
  exit-portal handoff.
- Added a bounded release-route QA contract that generates every released
  D1-D12 route, checks forward connectivity and Joey's named finale identity,
  verifies the shared boss/portal handoff, and confirms D12 reaches the
  existing session ending. This is automated route coverage, not a substitute
  for clean-player or physical-device acceptance.
- The local gate now passes **125/125** tests. This route contract is included
  in the grouped tested deployment checkpoint above; it is not clean-player
  D1-D12 or physical-device evidence.

# Room-entry motion and early D1 onboarding hardening (2026-08-11; deployed checkpoint)

- Fixed the pause-like monster entry behavior by giving mobile enemies a
  short bounded `1.35s` arrival step with visible tangential drift. The arrival
  timer now ends independently of the opening read-and-respond prompt, so the
  prompt remains a damage grace state without holding enemies in an orbit.
- Added finite Normal-only onboarding budgets for early D1 ordinary rooms,
  the first elite, and the first mini-boss. Joey's enemy identities, authored
  mechanics, stationary enemies, later scaling, and optional modifiers remain
  intact.
- Passed the **121/121** release gate, fast QA, static package audit,
  Android/iOS Capacitor sync, and both production checks. Live 600x768 tablet
  and 1024x768 desktop smokes reached the first combat room and returned
  through the normal dashboard flow with no browser diagnostics. A clean local
  route cleared the first room and reached the first mini-boss before ending.
- Runtime commit `ae91268` was pushed to `origin/main` and deployed to preview
  `https://dfb05e32.code-quest-lab.pages.dev/` and the configured hostname
  `https://code-quest-lab.gov8661682.com/`. Source hash:
  `ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094`; PWA
  shell v11. Clean-player D1-D12 and physical/native-device acceptance remain
  open.

## Level 1 room-entry approach lane (2026-08-11; deployed checkpoint)

- Followed up on the room-entry report by moving the first Normal D1 melee
  roster into a bounded, data-driven visible approach lane
  (`132/28/18/84/36` side offset, side step, jitter, forward offset, and
  forward step). This removes the pause-like appearance caused by spawning
  inside attack range while preserving Joey's roster, attack math, later
  procedural placement, and stationary enemies. The **120/120** release gate,
  `qa:fast`, static package audit, and Android/iOS Capacitor sync pass.
- Commit `0000f0d` was pushed to `origin/main` and deployed to preview
  `https://ca1ac0fa.code-quest-lab.pages.dev/` and the configured hostname
  `https://code-quest-lab.gov8661682.com/`; both production checks passed. The
  deployed source hash is
  `E60F8F1D603A4F8FEE74715DE66A7ED04AE0325B4B7C715DF49E90338B33B56E` and the
  PWA shell is v11. A fresh no-aid 600x768 live smoke reached the first combat
  room and showed enemy repositioning across two captures about half a second
  apart; the temporary profile was deleted after the normal dashboard flow.
  Clean-player D1-D12 and physical/native-device acceptance remain open.

## Historical follow-up - 2026-08-10 (superseded by deployed checkpoint)

- Followed up on the Level 1 web balance report after comparing the production
  enemy cadence with the regression model. The first Normal Dungeon 1 room now
  uses `0.50` health, `0.45` damage, `0.55` movement speed, and `1.80` attack-
  cooldown scaling, plus a bounded 10-second read-and-respond grace window.
  Enemies reposition immediately during that prompt, and the intro state
  directly suppresses player damage across the shared melee, projectile,
  debuff, and opening special-attack guards. Joey's enemy identities, later
  dungeon scaling, and optional modifiers are unchanged. The corrected
  ordinary-player model clears the room in **6.1 simulated seconds**; the full
  local release gate is **116/116**. Runtime commits `1987310`, `a169c11`, and
  `fc7f738` were pushed and deployed on 2026-08-10 to
  `https://bad086fb.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`; both production checks passed.
  The PWA shell is v10. A cache-busted live smoke showed enemy movement while
  HP stayed at 100% across 1.8 seconds, with no browser diagnostics.

- Fixed the Level 1 Normal onboarding balance after a fresh web Barbarian
  could spend too long closing on the first room. Fresh Barbarian damage now
  starts at `0.75`; only the first Normal Dungeon 1 combat room receives
  finite `0.65` health, damage, and speed tuning; and its two starter targets
  spawn in a close, readable lane. Standard Expedition is recommended by
  default before the first guardian while Joey's authored modifiers remain
  available through the optional choice. The shell cache is now v8 so existing
  PWA sessions receive the gameplay fix. Release gate: **115/115**. Runtime
  commit `7113366` was pushed and deployed on 2026-08-10 to
  `https://caacd1f4.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`; both production checks passed.

- Added a deterministic ordinary-player fast-QA model for the fresh Normal D1
  two-enemy opening room. It verifies the production onboarding budget clears
  in 6.1 simulated seconds with the starter player alive and no developer aid
  or route shortcut. The full local release gate is now **116/116**. This
  regression protection is included in the deployed `1987310`/`fc7f738`
  follow-up checkpoint.

- Extended a fresh loopback Mage route through D4-D6. The run verified D4's
  Fallen Hero event, off-screen target indicator, elite Crystal Hollow, and
  Void Monarch; D5's Fallen Hero event and Chieftain phase-3 transition; and
  D6's Archmage arena/defeat handoff. It used session invincibility and
  bounded developer damage/room/phase aids after a high-health D4 elite pair
  made normal Mage damage impractical. This is QA-assisted evidence only;
  browser diagnostics were empty. The tested milestone was checkpointed as
  commit `095aa30`, pushed to `origin/main`, deployed to
  `https://050a6395.code-quest-lab.pages.dev/` and
  `https://code-quest-lab.gov8661682.com/`, and passed both production checks
  plus live desktop/tablet smoke.

- Completed a loopback QA-assisted D1-D12 route through the final session
  summary, preserving the named D5-D12 bosses, authored phases, dialogue,
  rewards, Veteran unlocks, and portal handoffs. This remains QA-assisted
  evidence and does not claim clean-player acceptance; the tested milestone
  checkpoint is recorded in the entry above.

- Ran a disposable 13-minute 600x768 managed tablet session through D1 and D2
  with the visible Move/Attack controls, target lock, step movement, shrines,
  treasure, queued upgrades, elite bounty, Prison Warden, all Fallen King
  phases, pause, and Finish and Return to Dashboard. The temporary profile was
  deleted after verification; retained profiles were preserved. Physical-device
  acceptance remains open.

- Extended the developer phase-step QA helper across the real custom phase
  fields for D2, D4-D12, later corruption bosses, and Pure Corruption. The
  source mirror, production build, Capacitor sync, package audit, and full
  **113/113** release gate pass. This is local QA tooling only; no deployment
  checkpoint was created.

- Hardened the loopback-only developer test aid: repeating the `CQLI`
  activation sequence is now idempotent and always enables invincibility with
  a visible confirmation; reloading the page resets it. Focused contracts and
  the full **113/113** release gate pass. This is QA workflow hardening only,
  so it does not change the manual evidence score or trigger a deployment.

- Continued the protected normal-control route with a retained Mage: D1 rooms
  through Ashen Pit were cleared using ordinary mouse-target attacks and normal
  reward/exit controls, Death Chamber was reached, one elite was defeated, and
  the run was paused safely with two elites remaining at 36 kills. Diagnostics
  were empty; this partial route evidence does not create a deployment
  checkpoint or change the score.

- Added fresh managed route evidence: a new Mage completed D1 and D2 Normal
  with ordinary attacks, target assist, touch-sized controls, rewards, the D2
  mini-boss and Fallen King, Veteran unlock, and portal entry into D4 Shadow
  Realm. A D4
  death/restart probe also verified truthful session saving and the visible
  local invincibility enable state. Diagnostics were clean; this does not
  claim full D1-D12, clean-player, or physical-device acceptance and does not
  create a deployment checkpoint.

- Published the stable recovery-safe gameplay milestone from commit `e7871b0`
  (`Checkpoint recovery-safe gameplay milestone`) to Cloudflare Pages after
  the **113/113** release gate, `qa:fast`, build/package audit, and Capacitor
  sync passed. Preview `https://a89328df.code-quest-lab.pages.dev/` and the
  configured hostname `https://code-quest-lab.gov8661682.com/` passed
  `production:check`; live desktop and 1024x768 tablet smoke reached D1
  combat and paused safely with no browser warnings or errors.

- Made recovered combat sessions player-safe: `Resume Session` now restores the
  exact checkpointed room and opens the existing pause menu before damage or
  enemy updates resume. Verified the D1 pause/reload/`SESSION RECOVERED`/Resume/
  Finish flow on the current build at port 4176 with the loopback invincibility
  aid and zero browser error/warning diagnostics. Added the focused lifecycle
  contract; the source mirror, build/package audit, Capacitor sync, and full
  **113/113** release gate pass. The tested milestone was published and live-
  verified as recorded above.

- Promoted Necromancer's Stolen Graveyard into the local playable release
  surface after Ranger Watchtowers. Verified the Cemetery Gate, corrupted
  horde rooms, authored Soul Collector content, Ritual Altar, Corrupted
  Necromancer transformation and Phase 2, soul-release defeat, standard boss
  rewards, Veteran unlock, saved-boss portal recovery, managed exit fallback,
  and final session summary in a loopback QA-assisted route. The source mirror,
  `qa:fast`, build/package audit, Capacitor sync, and full **112/112** release
  gate pass; no GitHub or website deployment checkpoint is claimed.

- Promoted Ranger Watchtowers into the playable chain after The Abandoned
  Laboratory. Verified its environment-first watchtower route, first-visit
  salvage, Corrupted Ranger Captain intro/transformation, custom Phase 2,
  peaceful defeat dialogue, guaranteed Tier 8 materials, Veteran unlock,
  managed portal fallback, and final session summary in a loopback
  QA-assisted route. Extended the developer phase-step helper for the Ranger
  Captain's bespoke phase fields. The source mirror, `qa:fast`, build/package
  audit, Capacitor sync, and full **111/111** release gate pass; no new
  deployment is claimed.

- Promoted The Abandoned Laboratory into the playable chain after D9.
  Verified randomized laboratory chambers, the Head Researcher mini-boss,
  The Alchemist's introduction and Perfect Serum transformation, rewards,
  Veteran unlock, final portal, and session summary in a loopback QA-assisted
  route.
- Extended the developer phase-step helper for the Oathbreaker King and The
  Alchemist's custom phase fields, and added a portal-only managed touch exit
  action for cleared boss rooms. The source mirror, fast QA, build/package
  audit, Capacitor sync, and full **110/110** release gate pass; no new
  deployment is claimed.

- Promoted the existing Vow Breaker's Castle route to the playable release
  surface after D8. Verified the Royal Commander mini-boss, Oathbreaker King
  phase transition, boss vault, rewards, Veteran unlock, exit, and final
  session summary in a loopback QA-assisted route.
- Fixed the delayed mini-boss exit race: an unspawned mini-boss now blocks the
  room exit and `CQLR` reports that the encounter is still spawning. The
  source mirror, `qa:fast`, build/package audit, Capacitor sync, and full
  **109/109** release gate pass. This is local milestone evidence; no new
  deployment is claimed.

- Made mini-boss selection data-driven with `MINIBOSS_TYPES_BY_DUNGEON`.
  Joey's D1, D2, D4, D5, D6, and D10 rosters remain unchanged, while future
  open-world regions gain an explicit registration seam and a safe D1 fallback.
  The source mirror, production build/package audit, Capacitor sync,
  deterministic QA, and full local release gate pass **108/108**; no deployment
  checkpoint was created.
- Added `PROJECT_MEMORY.md` as one bounded rolling learning record and wired it
  into every autonomous cycle. Existing facts are replaced or consolidated in
  place; per-cycle memory files and appended transcripts are forbidden. Added
  an executable control contract for the read rule, blocker state-change rule,
  and 120-line limit. The full local release gate passes **108/108**.
- Centralized difficulty, dungeon progression, and temporary run-modifier
  composition in `getEncounterTuning(dungeonId)`. Shared enemies, minibosses,
  Void Monarch compatibility logic, and all named boss spawners now consume
  the same stat-tuning contract; Joey's bespoke mechanics and content remain
  intact. Minibosses now respect selected difficulty consistently. Added a
  registry invariant test for complete, finite, positive, monotonic dungeon
  and difficulty scaling. The full local release suite passes **108/108**; no
  deployment checkpoint was created.
- Reordered `release:verify` so generated web and Capacitor assets are
  refreshed before static-package tests, preventing stale-build failures after
source edits. Added an executable ordering contract; the full gate passes
  **108/108**.
- Clarified first-session onboarding with a fantasy-adventure premise, a
  temporary/profile-safe modifier explanation, and a single readable reward
  line on unlocked route cards. Route cards now point back to the Town gate.
- Added a physical `North Road` Town signpost and matching `ROAD` minimap
  landmark pointing toward the existing Forgotten Depths portal. This improves
  the open-world first breadcrumb without adding a shortcut or changing
  progression.
- Added a duplicate-safe DOM-click fallback for skill, potion, optional Bob
  beam, and Auto Rush action controls. Normal pointer-up activation remains the
  primary path; the guarded fallback helps managed tablet/browser surfaces
  that lose pointer-up delivery without changing combat, saves, exports, or
  developer-only controls.
- Added focused contract coverage. The source mirror, deterministic QA,
  production build/package audit, native sync, and **108/108** release gate pass.
  This remains local usability hardening with no deployment checkpoint.
- Recorded an incomplete fresh normal-control Mage probe through Dungeon 1,
  Dungeon 2, and early Dungeon 4. The run ended before the Corrupted Champion,
  so it does not add clean-route or touch-session evidence. The next local
  browser attempt was denied permission; B-009 records the owner action.
- Added profile-transfer migration fixtures covering legacy raw saves, future
  save versions, unsupported future classes, and invalid optional checkpoints.
  The current `.txt` import promise remains local-only and non-overwriting;
  cross-device runtime evidence is still deferred. The release gate is now
  **108/108**.

## Unreleased - 2026-08-09

- Added a visible, optional Step movement pad for constrained tablet/managed
  browser surfaces. North/West/South/East taps queue short directional input in
  the shared player movement and collision path, behind keyboard and joystick
  input; they do not teleport, skip encounters, or affect save/export state.
  Fresh 540x720 play used the pad through the world portals and reached the D8
  ending in a bounded QA-assisted functional run. The disposable profile was
  deleted and browser diagnostics were empty.
- Added the movement contract and re-ran the release workflow: `qa:fast`, build,
  Capacitor native sync, and **97/97** tests pass. This remains local usability
  hardening; no website deployment checkpoint or score change was made.

- Added an optional touch travel fallback for constrained browser surfaces:
  Town can follow the Northern Road, entrance hubs open their existing gate
  flow, and dungeon `START` rooms can enter the first combat room. Normal
  walking remains available, preserving the open-world route. The cleared-room
  fallback remains hidden in Town, entrance hubs, and unclaimed static rooms,
  then appears after a combat clear or claimed shrine/treasure reward. Fresh
  540x720 checks passed Town -> D1 Entrance -> gate selection -> D1 `room_m0`,
  `room_m0` -> `room_m1`, and shrine -> treasure. An unclaimed treasure also
  exposed `Open Treasure`, delivered the existing loot overlay, and then
  exposed the ordinary forward exit.
- The source mirror, 97-test release gate, deterministic QA, production build,
  and Capacitor native sync pass. No website deployment checkpoint or score
  change was made for this local hardening slice.

- Added a contextual `Proceed Through Exit` fallback for cleared forward rooms.
  It remains hidden in Dungeon Entrance, `START`, and unclaimed static rooms;
  after a combat clear or claimed shrine/treasure reward it preserves the
  existing save/fade transition. Fresh 540x720 local runtime checks advanced
  `room_m0` to `room_m1` and a completed shrine into the treasure room. The
  change responds to a bounded managed-browser directional-input diagnosis; it
  does not replace physical touch testing or claim a clean-player route.
- The source mirror, 96-test release gate, deterministic QA, production build,
  and Capacitor native sync pass. No website deployment checkpoint or score
  change was made for this minor local hardening slice.

- Revalidated the managed-browser joystick fallback on 2026-08-09 using a
  fresh uncached `localhost:4173` profile at 540x720. One center tap reduced a
  real D1 room from two enemies to one with empty browser diagnostics; a
  directional drag left a three-enemy room unchanged, and the room was cleared
  with the bounded high-damage QA aid. This is input evidence only, not a
  physical-device/full-route acceptance or deployment checkpoint.

## Unreleased - 2026-08-08

- Added a guarded click fallback to the shared touch Attack joystick for
  managed/embedded surfaces that emit a click after losing pointer-up delivery;
  normal pointer-up taps and directional drags remain protected from duplicate
  activation. Re-synced the source mirror and added focused contract coverage.
  The 93-test release gate, fast QA, production build, and native sync pass,
  but post-edit browser/device validation is still required. No score change
  or deployment checkpoint was made.

- Recorded a local 540x720 touch-surface and recovery probe with a disposable
  Mage: D1 combat/shrine/treasure/boss/portal progression, D2 checkpoint
  recovery, protected room play, pause, and deliberate Finish and Return to
  Dashboard. Joystick drag delivery required the bounded keyboard fallback in
  the managed harness, so this is not touch-only or 10-30 minute acceptance;
  harness-inflated duration is excluded. The temporary profile was deleted,
  retained profiles were unchanged, the score remains 79% / 18%, and no
  deployment was made.

- Ran a new disposable Mage through the complete functional V1 route boundary
  (D1, D2, D4-D8) on Normal. All named bosses, shrine/treasure progression,
  portal handoffs, `THE SESSION IS COMPLETE`, optional learning support,
  next-step copy, Finish for Now, and Finish and Return to Dashboard were
  observed. Enemy-free/current-encounter QA controls were required after the
  managed-browser joystick attack path failed, so this is not clean-player or
  touch-only acceptance. Browser logs were empty; the temporary profile was
  deleted, retained profiles were unchanged, the score remains 79% / 18%, and
  no deployment was made.

- Hardened the shared route handoff after an accelerated disposable-profile QA
  run traversed the functional D1, D2, D4, D5, D6, D7, and D8 chain. Developer
  encounter completion now clears leftover boss adds, captures the correct boss
  identity in telemetry, and keeps the exit objective truthful. Replaced stale
  `Back to Practice Modules` wording with `Back to Dungeon Entrance`. The final
  D8 session summary and `Finish for Now` Town return were observed; this is
  functional QA evidence only and does not change the 79% / 18% score. Release
  verification passes 93 tests; commit `20f85ba` was pushed and deployed on
  2026-08-08 to the configured domain with preview
  `https://d8829db6.code-quest-lab.pages.dev/`. Production checks and live
  desktop/tablet profile-shell smoke passed.

- Completed a repository-wide architecture review without rewriting the
  parity-protected inline runtime. Added a shared boss identity registry so
  HUD, room progress, recovery, and generic rendering use the correct named
  boss instead of a Stone Guardian fallback.
- Added a loopback-only developer QA workflow: 1x/10x/25x time scaling,
  high-damage and enemy-free modes, phase/room/boss stepping, and structured
  local telemetry. The controls remain session-only and are excluded from
  saves, text exports, native packages, and public activation.
- Added fixed-seed deterministic combat simulation for representative early,
  mid, and late encounters, collision/damage boundaries, finite summons,
  victory/loss/timeout, and accelerated QA. The focused suite passes 11 tests;
  the full Node suite passes 92 tests. Commit `2c1d6ba` was pushed to GitHub
  and deployed on 2026-08-08 to the configured domain, with preview
  `https://7c154632.code-quest-lab.pages.dev/`; production checks and live
  browser smoke at 1024x768 and 1440x900 passed. Progress stays at 79% for
  Checkpoint 1 and 18% overall.

## Unreleased - 2026-08-07

- Bounded Void Monarch summon pressure so each encounter has four finite beast
  waves and four phase-aware crystal waves. The three-phase boss identity is
  preserved while target assist and player damage can converge instead of
  entering an endless add-clear loop. Release verification passed **84 tests**,
  the 17-file build/package audit, native sync, production checks, and live
  smoke. Source commit `9886f50` was pushed and deployed to
  `https://code-quest-lab.gov8661682.com/` with preview
  `https://c45c9c7c.code-quest-lab.pages.dev/`; deployed shell hash:
  `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
- Hardened the local developer boss QA aid: `F8 F7 F6 F4` now clears live
  summons without falsely completing a live boss room or opening its exit.
  Corrected the D4 HUD label from the generic Stone Guardian name to Void
  Monarch. The change is loopback-gated and session-only. All 83 tests, the
  17-file build/package audit, native sync, production checks, and live smoke
  passed. Commit `cd90db4` was pushed and deployed to
  `https://code-quest-lab.gov8661682.com/` with preview
  `https://0db3ee6b.code-quest-lab.pages.dev/` and deployed shell hash
  `C6D5E0A29FD8AD5F52F868C4E873E4B031CE5219D3E61252F93E3FE6085A1099`.
- A disposable local D4 run reached room 11 and verified pause/resume and
  deliberate Finish and Return to Dashboard. Only the disposable profile was
  removed; retained saves were unchanged. Progress remains 79% for Checkpoint
  1 and 18% overall because D4-8, the intended ending, and the full
  touch-first safe-stop acceptance lane remain open.

- Tightened the shared elite health budget from 4x to 2.5x authored base health
  after a Dungeon 2 calculation showed that depth and dungeon scaling could
  still create a starter-damage wall for fully stacked elites. Modifier size,
  damage, defense, and behavior remain intact. A fresh disposable Mage
  regression route re-entered Dungeon 2 Normal, cleared early rooms, shrine,
  treasure, later combat, and the Prison Warden route segment, then stopped
  safely. Release verification passed 83 tests, the 17-file package audit,
  native sync, and live production checks. Source commit `944675b` was pushed
  and deployed at `https://code-quest-lab.gov8661682.com/` with preview
  `https://52fc1d32.code-quest-lab.pages.dev/`; deployed shell hash is
  `408F0CE6E60D3D0A8D526FE337730FFB9A78667E1B5A4D67653349B24AF6F00B`.

- Completed the next bounded D2 playthrough with a disposable Mage: shrine,
  treasure, the two-elite Executioner's Court, all three Fallen King phases,
  and the exit portal into The Shadow Realm Entrance. Added a post-modifier
  elite health budget so depth, dungeon, elite, and Giant scaling cannot create
  multi-minute damage sponges while the modifier identities remain intact.
  Attack taps received during cooldown now wait for readiness on touch and
  desktop paths. The 83-test release gate, 17-file package audit, native sync,
  GitHub commit `5cbe80c`, Cloudflare preview `cfe817cd`, configured-hostname
  production check, and desktop/tablet live smoke all passed.
- Completed a disposable Mage QA route through all observable Dungeon 2
  rooms, the Prison Warden mini-boss, the Fallen King through Phase 3, and
  the exit portal into The Shadow Realm Entrance using the requested local
  invincibility aid. This advances the evidence score to 79% for Checkpoint 1
  and 18% overall; D4-8, the ending, and the full safe-stop session remain
  open.
- Fixed queued level-up presentation: each reward now shows the level that
  earned it and reports any remaining queued choices instead of repeatedly
  displaying the final level. Added a focused progression contract; release
  verification passes 81 tests, the 17-file package audit, and native sync.
- Completed a fresh, disposable Mage touch-first Dungeon 1 milestone: Town,
  target-assisted combat, shrine, treasure, elite, later combat, Stone
  Guardian Phase 2, and exit-portal travel into The Fallen Kingdom Entrance
  all worked on the local tablet-sized surface. Removed only the two disposable
  QA profiles after verifying the retained Mage and Barbarian profiles. The
  evidence score is now 74% for Checkpoint 1 and 17% overall; D2-8, ending,
  and the full safe-stop session remain open.
- Fixed a boss-room handoff edge case where a dead summon object could leave
  `CLEAR SUMMONS` visible after the boss was defeated. The room now counts live
  summons only, clears dead objects, reopens the exit, and removes stale status
  text. Release verification passes 80 tests, build/package audit, and native
  web-asset sync. This milestone is prepared for its GitHub/website checkpoint.
- Created the GitHub and website checkpoint as commit `0c960fc` on 2026-08-07.
  Cloudflare Pages preview `88bd6ae9` and `code-quest-lab.gov8661682.com` both
  passed production checks; the live browser smoke reached profile creation,
  Town, pause/finish, dashboard return, and cleanup. The deployed shell hash
  is `975FD97E55D2AB013EE63082398519F29722E698DEC32221CE38441B597D6E3F`.

- Followed up the AI-expert combat recommendations with a bounded Dungeon 4
  route playtest. The route cleared the D4 combat, shrine, ambush/reward, and
  story rooms, then defeated three of five elites in `The Long Fall` before a
  safe stop under the autonomous five-attempt guard. Bounded the D4 corruption
  wraith surge to one per room and capped each Regenerating elite at a finite
  25% maximum-health recovery budget, including room-checkpoint persistence.
  The local release verification now passes 78 tests, build/package audit, and
  native asset sync; no deployment was made because C1 remains incomplete.
- Ran a fresh temporary Mage profile through Dungeon 1 Normal content after
  the hardening: first combat, shrine, sealed-chest event, treasure vault,
  elite lair, and a later cleared combat room all advanced; the profile reached
  Level 7 before the run was safely finished and deleted. Dungeon 4 stayed
  correctly locked by progression, so this adds D1 evidence without claiming
  a post-fix D4 rerun, D1-8 completion, or deployment checkpoint.
- Reproduced a D2 `Dark Inquisition Chamber` progression stall on an isolated
  Mage QA profile: `Elite Invasion` plus a Corrupted elite grew the room to
  `Enemies: 15` and kept the exit locked during bounded attacks. Added a finite
  two-minion summon budget per Corrupted elite, saved/restored with the room
  checkpoint, plus a combat contract. The 77-test release verification,
  packaged build, and Capacitor web-asset sync pass; this is local hardening,
  not a deployment checkpoint.
- Recorded a bounded local Dungeon 1 route pass with the loopback-only developer
  invincibility aid: the run cleared the shrine, treasure, and combat rooms,
  defeated the Stone Guardian through the normal touch attack control, and
  reached The Fallen Kingdom Entrance through the exit portal. This is partial
  route evidence only because it used the existing Mage profile and did not
  complete D1-8, touch-first session, or ending acceptance; no deployment was
  created and no saved profile was deleted.
- Completed the real local `.txt` profile-transfer round trip: exported the
  retained Level 4 Barbarian, uploaded it through the browser file chooser,
  confirmed the imported copy matched its dungeon, highest room, run count,
  and play time, and verified the original profile stayed unchanged. Deleted
  only the temporary imported copy; cross-version/device migration remains
  open.
- Added a gated ordinary-key fallback `C Q L I` for the developer-only
  invincibility aid because some managed browser surfaces reserve function
  keys. The primary `F8 F7 F6 F3` sequence, loopback query gate, session-only
  scope, export exclusion, and public/native exclusion remain unchanged. A
  cache-busted local smoke confirmed `DEV TEST MODE` activation, and the
  temporary profile was removed afterward. A follow-up first-combat smoke
  kept the session active at `100/100 HP` for 12 seconds with two enemies
  present, confirming the aid works in the managed browser surface.
- Fixed a verified Finish for Now transition edge case where old dungeon lock
  text could remain in the Town status element after a stopped run. Town now
  clears the transient status before and after rebuilding the static room;
  added a lifecycle contract and cache-busted browser smoke. The synchronized
  package passes 76 tests, build/package audit, and native web-asset sync. This
  is local hardening and is not a website deployment checkpoint.
- Cleared stale lock-message text from static Town, Entrance, Shrine, and
  Treasure room status elements, not only their visual state. Added a focused
  lifecycle contract and verified the packaged local Town surface.
- Completed a real local-storage lifecycle smoke with an isolated Mage:
  page-close/reopen recovered the Dungeon 1 combat checkpoint, Resume Session
  restored it, Pause exposed the safe-stop menu, and Finish and Return to
  Dashboard banked the run. The temporary profile was deleted afterward and
  no existing profile was changed. Native/device lifecycle evidence remains
  open.
- Recorded two bounded fresh-Mage route attempts: both reached Dungeon 1 first
  combat without browser diagnostics but neither established a defeat through
  the managed browser input surface. The approved loopback QA cheat remains
  unchanged; no further identical combat retries or deployment were made.

- Added the canonical bounded autonomous-work protocol in `AUTORUN.md`.
  Every cycle must produce new checkpoint evidence; three materially identical
  technical failures force a strategy change, and five materially identical
  gameplay/manual attempts force that route to stop and be recorded.
- Added the main evidence-scored progress display to `CURRENT_CHECKPOINT.md`:
  Checkpoint 1 is 61% complete and the ten-checkpoint project is 16% complete.
  An executable project-control contract validates the scoring arithmetic,
  retry limits, and status consistency during release verification.

## Unreleased - 2026-08-05

- Fixed recovered boss-room progression: when a defeated boss room is restored
  after reload or background recovery, the forward door and deliberate exit
  portal are recreated instead of leaving the player in a portal-less cleared
  room. A local cache-busting browser smoke reopened the saved Mage level 10
  Guardian room, showed `EXIT PORTAL`, and completed travel into the next
  entrance area. Added the developer-only boss-summon escape sequence
  `F8`, `F7`, `F6`, `F4`, gated behind local `?cql-dev=1` and already-enabled
  invincibility; it is session-only and excluded from exports/public builds.
  The synchronized package passes 69 tests, build, and static-package audit.
  Commit `e1380c4` records this local hardening; it is not a website
  deployment checkpoint.
- Cleared browser blocker `B-007` for loopback QA after the initial permission
  denial: the current shell loaded in the in-app browser and the recovered
  portal travel smoke completed without browser diagnostics. Full D1-8,
  touch-duration, tablet, and physical-device evidence remain open, so this is
  not a website deployment checkpoint.
- Corrected entrance-area objective resolution so a portal handoff into the
  Fallen Kingdom names the Fallen King in the HUD and entrance banner instead
  of retaining Dungeon 1's Stone Guardian text. Added a progression contract;
  the synchronized package now passes 69 tests.
- Hardened touch pointer ownership: a movement-joystick release that crosses
  the adjacent Potion control no longer activates that skill. The 600x700
  local replay no longer emitted the unintended `NO POTIONS` action, and the
  focused/full release verification now passes 70 tests. The temporary route
  did not complete Town navigation, so this remains local QA hardening rather
  than a deployment checkpoint. Commit `90f4f36` records the change.
- Added a compact screen-edge direction arrow for the existing Town-to-Depths
  portal when it is outside the camera. This supports open-world discovery on
  tablet-sized surfaces without replacing free movement or the minimap. A
  local 600x700 smoke rendered the cue; commit `c8b50c8` records it, and the
  full release verification passes 71 tests.
- Fixed a reproducible stale combat-status edge case: when the final enemy
  defeat triggers a level-up pause, room progress and the HUD now refresh
  immediately so a cleared room cannot retain a locked-door message. Added a
  focused source contract. Full `npm.cmd run release:verify` passes 67 tests,
  the 17-file static package audit, and the build; `npm.cmd run native:sync`
  also passes. A local recovered `Ruined Archway` smoke showed an active game
  screen with no door lock or enemy count. Commit `3106820` is pushed to
  GitHub as local QA hardening and is intentionally not a website deployment
  checkpoint.
- A new clean-profile touch-first D1-8 run was initially prepared at 1024x768
  on both the local QA surface and the designated Pages preview, but the
  in-app browser denied access before either game loaded. No alternate browser
  or policy workaround was used; this was recorded as blocker `B-007` and was
  later cleared for loopback QA in the latest entry above.
- Reproduced a bounded local Dungeon 1 playability gap in enlarged rooms: a
  hidden/offscreen Soul Wraith could remain alive while the door stayed locked
  after visible enemies were defeated. Added a restrained screen-space cue that
  labels the nearest hidden threat `THREAT` without revealing its body or
  changing movement, attack calculations, or authored room layout. Added a
  focused source contract. Commit `4747413` is pushed to GitHub; this minor QA
  hardening is not a website deployment checkpoint.
- Paused, reloaded, recovered, and resumed the same local `Burial Hall`
  checkpoint without browser diagnostics or data loss. The run remains partial:
  full D1-8 completion, the live indicator screenshot, and meaningful touch/
  tablet lifecycle evidence are still open.
- Rebuilt and re-synced the package after the fix. `npm.cmd run
  release:verify` passes 66 Node tests, the 17-file static package audit, and
  the build; `npm.cmd run native:sync` also passes.
- Added a hidden developer-only invincibility aid for local playtesting. It
  requires the loopback `?cql-dev=1` gate plus `F8`, `F7`, `F6`, `F3`; the same
  sequence toggles it off. It is session-scoped, excluded from profile export
  and save data, and cannot activate on the configured public hostname or
  Capacitor protocol. Commit `3e33470` is pushed; this is not deployed.
- Hardened Dungeon 1's first combat onboarding locally so its initial enemies
  spawn in a readable viewport band instead of anywhere in the enlarged room;
  normal procedural placement and combat calculations remain unchanged. Added
  a focused source contract. This is not deployed.
- Fixed a verified session-exit UI regression: returning to Town now clears
  stale dungeon lock text, lock styling, and waypoint activation status, and
  rooms without waypoints always hide an old activation message. Added two
  executable lifecycle contracts. A local fresh-Mage defeat-to-Town screenshot
  pass is clean. Commit `5db6db5` is pushed to GitHub; this follow-up is not
  yet deployed.
- Reproduced first-combat attack response on the 1024x768 Pages preview with a
  fresh Mage: a canvas click produced visible damage feedback and enemies were
  defeated, with progression reaching the shrine, treasure, and Elite rooms
  before the run ended. Full D1-8 completion remains open.
- Rebuilt and re-synced the package after the follow-up. `npm.cmd run
  release:verify` now passes 65 Node tests, the 17-file static package audit,
  and the native web-copy sync.
- Fixed a verified regenerating-elite combat defect: every successful hit now
  resets the elite's recovery timer, so sustained player pressure interrupts
  regeneration as intended. The canonical HTML and source mirror remain
  synchronized; focused and full release verification pass. This minor local
  follow-up is not a website deployment checkpoint.
- Fixed a verified active-run recovery defect: resuming after reload now
  restores the checkpointed generated dungeon route before rebuilding room
  state, preventing a saved room from being interpreted against a different
  procedural layout. Added a contract and verified a clean Mage resume in the
  same room with the same enemies and locked-door state. This minor local
  follow-up is not a website deployment checkpoint. Commit `8e165e1` is
  pushed to GitHub.
- Corrected the first-combat onboarding guard so it checks the current room
  definition rather than the enemy definition when deciding whether to use the
  readable spawn band. Added the regression assertion and re-ran the full
  release verification. This minor local follow-up is not a website
  deployment checkpoint.
- Bounded local route QA at D1 `Crypt Passage`: one remaining normal enemy
  could not be located within the visible tablet viewport after two kills, so
  the run was paused and retained as an open playtest finding. No further
  repeated target-search attempts were made.
- Added the evidence-backed project control record: `PROJECT_PROGRESS.md`,
  `CHECKPOINTS.md`, `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`, and
  `BLOCKERS.md`; clarified that Checkpoint 1 is active and the completed Joey
  creative audit must not be repeated.
- Recorded the current verification state: milestone commit `9da1d0e` is on
  `main` alongside the prior control records; this follow-up records the
  open-world direction, AI expert playtest, copy-only usability fixes, versioned
  plain-text profile transfer, and grouped first-combat readability refinements.
  `npm.cmd run release:verify` passes 58 tests, the 17-file package audit and
  native sync pass, and the configured production check passes.
- Completed the major-milestone GitHub and website checkpoint for local save
  portability and first-combat readability: pushed `9da1d0e`, deployed on
  2026-08-05 to `https://code-quest-lab.gov8661682.com/`, preview
  `https://8d5f404a.code-quest-lab.pages.dev/`, and live-verified the new shell
  hash `3A39EF4158EA494523FE04323D5D40BAA082E4C09F526A499707C3656EF139DA`.
- Reconciled deployment and store-readiness records with the verified current
  Cloudflare Pages checkpoint. Checkpoint 1 remains active because full D1-8
  player completion and the first-combat attack-response evidence are still
  open.
- Recorded the latest active Checkpoint 1 QA result: a fresh 1024x768 live run
  reached three first-combat rooms with no browser diagnostics, but did not
  establish an enemy defeat through the tested touch/click inputs. The result is
  retained as an evidence gap for reproduction on another supported surface;
  no combat code or website deployment was changed.
- Recorded Joey's explicit open-world direction: a compact connected world with
  Town, discoverable regions, landmarks, waypoints, and authored dungeons. Added
  the staged player/technical target in `OPEN_WORLD_DIRECTION.md` while keeping
  the tested D1-8 release guard and active Checkpoint 1 unchanged.
- Added `AI_EXPERT_PLAYTEST.md` with a dated live 1024x768 first-run review and
  prioritized improvements. Fixed the corrupted first-combat onboarding dash,
  replaced the school-like Town objective wording, and live-verified the
  resulting profile/Town/Manage Data surface in the new deployment.
- Added a local Town minimap using the existing world layout, showing roads,
  safe-hub landmarks, the player, Waypoint Plaza, and the northern dungeon
  destination. The static package and the major-milestone deployment are
  verified; this does not claim full open-world completion.
- Added a versioned `CODE QUEST LAB PROFILE EXPORT` plain-text envelope. It
  exports the durable profile, valid backup, and active-run checkpoint; import
  creates a new local profile without overwriting the current one. The format
  is local-only and accepts only the four current runtime classes.
- Applied grouped, low-risk first-combat readability fixes in the source and
  deployed shell:
  the locked-door message is anchored in a stable top banner and enemies have
  stronger silhouettes and outlined HP bars. Combat calculations were not
  changed; supported-surface attack evidence remains open.
- Continued Checkpoint 1 QA after deployment with a fresh Mage preview probe:
  Dungeon 1 reached `START Ancient Entrance` at 1024x768 with no browser
  diagnostics, but the managed-browser movement/interaction sequence did not
  enter room 1. The synthetic profile was removed and no combat math was
  changed from this evidence gap.

## Unreleased - 2026-08-04

- Completed the major-milestone GitHub and website checkpoint for the creative-reference audit plus release-foundation/first tablet-session hardening: pushed `bf07810`, deployed the tested build on 2026-08-04 to `https://code-quest-lab.gov8661682.com/`, passed the production contract, and verified desktop 1280x720/tablet 1024x768 flows through first combat with zero browser diagnostics.
- Added a page-background lifecycle contract covering Town/entrance position saves and active-dungeon checkpoint saves before the permanent-data flush; the full release verification now passes 57 Node tests.
- Merged the upstream accessibility and pinned-CI checkpoint while preserving Joey's Adventure Routes, Learning Support direction, and intentionally unreleased Smelter boundary; made the joystick release contract tolerant of Windows line endings and revalidated the five synchronized web copies at SHA-256 `F4A12AD085F8AF3E7272CFDB03AEAC82DFA6F6205836270A192D2A8B1D085FD3`.
- Preserved and tagged the playable baseline before release-candidate work.
- Added the initial product vision, V1 scope lock, roadmap, release criteria, status, QA plan, store-readiness, policy-source, asset, license, owner-action, known-issue, decision, and backlog documents.
- Recorded baseline browser evidence at desktop and phone viewports.
- Added a relative install manifest, service-worker app-shell cache, and dependency-free Node check/test/static-build loop.
- Added original SVG draft sources for the icon, logo, and loading screen.
- Removed the unfinished Smelter from the active Forge navigation and removed its disabled/"Coming soon" UI.
- Adjusted narrow-phone objective layout to avoid the minimap region.
- Updated product direction for secondary-school students approximately 13-17: touch-first landscape tablets, restricted/offline devices, 10-30 minute sessions, optional computational-thinking support, age-appropriate presentation, and non-manipulative engagement/monetisation.
- Added a local-only active-run checkpoint with profile-scoped recovery after reload/backgrounding, a deliberate discard-to-Town path, and a dashboard/character recovery surface.
- Added optional after-session play notes covering patterns, planning, decomposition, and debugging, plus a clear Finish for Now stop path; adjusted visible copy so the fantasy adventure remains primary.
- Added landscape-tablet HUD spacing for the 1024x768 class of viewport and verified the touch layout at 390x844.
- Generated Capacitor Android/iOS projects with `dist` as the web asset directory, pinned Capacitor packages to audited v8 versions, added the App lifecycle/back-button bridge, and configured landscape-first native orientation.
- Added first-party public About, Educational Purpose, Privacy, Support, Contact, and School Review pages plus the complete static deployment package and offline cache entries.
- Added the shared entitlement boundary and transparent Full Adventure Unlock surface: parent confirmation, verified adapter-only results, restore handling, offline verified cache, and no browser payment shortcut.
- Added full-unlock product identity validation and a mocked entitlement-core matrix covering ownership, duplicate callbacks, decline/pending, revocation, parent gating, adapter errors, and enforced free-user denial.
- Added a fail-closed Capacitor `CodeQuestEntitlements` discovery seam for iOS/Android and a test-only non-purchasing development adapter covering store-state outcomes without exposing a public unlock toggle.
- Strengthened profile saves with a version marker, structural validation, valid-backup promotion after a malformed primary save, and a visible recovery notice.
- Added a production-parser save compatibility matrix covering current/legacy-compatible, malformed, future-version, and invalid-shape fixtures.
- Added a production-loader recovery matrix covering valid primary data, backup promotion, unsafe-save fallback, and retired legacy mastery-stat migration.
- Hardened interrupted-run checkpoint parsing so static zones, incomplete routes, missing room definitions, and unsafe array/object shapes are rejected before session recovery.
- Added a repeated production progression matrix for procedural dungeon generation, route validation, broken-route rejection, and region-order handoff; full player-completed progression remains a manual release gate.
- Added a production combat contract matrix for starter attack data, shared touch/mouse/joystick attack routing, and joystick release fallbacks.
- Added a bounded first-combat onboarding window for a fresh Dungeon 1 run: `Read the room — move or attack` is shown for ten seconds while player movement and attacks remain active and hostile simulation is paused.
- Added document-level joystick release fallbacks for embedded/restricted webviews where pointer capture may not deliver a release on the control element.
- Bumped the service-worker shell cache to v5 after the save, entitlement, and touch-input changes so installed web clients receive the current app shell.
- Replaced Capacitor's provisional blue launcher and splash artwork with deterministic branded PNG derivatives generated from `assets/icon.svg`; added PWA install icons and included them in the static/offline shell.
- Reviewed Joey's latest self-contained game output (`F:\Downloads\20260804_latest output.txt`, SHA-256 `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB`) as a creative reference. Recorded the four missing class families, class resources/passives, class gear/material expansion, D16 Phase 4 additions, stale later-dungeon representations, and Smelter consistency issue in `CREATIVE_REFERENCE_AUDIT.md` and the roadmap without merging or simplifying Joey's content.
- Added the major-milestone GitHub and website checkpoint protocol to the roadmap: tests/build, playability, documentation, commit, push, deployment, live verification, and status record; minor or incomplete work is not deployed independently.
- Corrected stale D9-D15 source comments so existing later-dungeon boss dispatches are not represented as absent, while leaving the V1 release guard and gameplay behavior unchanged.

## Latest local hardening

- Made the optional after-session note contextual and transparent: the game-over summary now labels the relevant concept and selects guidance from the outcome room, defeat context, enemy evidence, or completed final challenge; added deterministic contract tests for the mapping.
- Bounded the V1 release surface at the current Dungeon 1-8 route: later source-resident regions are hidden from selection, waypoints, saved-world resume, and boss-exit progression, and the final portal uses the existing session summary as a safe stopping point.
- Added regression coverage for the release boundary and ran the full verification: 33 Node tests passed, the 16-file static build passed, native sync passed, and the source/dist/Android/iOS web copies were re-synced to one SHA-256.
- Hardened the offline service worker: it now intercepts same-origin GETs only, scopes the cached `index.html` fallback to document navigation, returns an honest failed response for offline assets, and bumps the shell cache to v6; install/activate/fetch behavior is covered by an executable harness.
- Added local session-lifecycle contracts for Return to Main Menu reward banking and checkpoint clearing, Finish For Now Town persistence, and active-profile deletion across primary, backup, checkpoint, index, and active-pointer storage.
- Extended progression coverage across every shipped V1 generator (Dungeon 1, 2, and 4-8): repeated generated routes must validate, retain aligned room IDs, and end at a boss; this remains procedural evidence rather than hands-on completion evidence.
- Hardened the Capacitor lifecycle bridge with `appStateChange` and `resume` handling: inactive native app state now saves and pauses active runs, resume rechecks an available entitlement adapter, and back-button behavior remains covered by executable contracts.
- Added a static-package audit to the release verifier: `dist\\` must contain exactly the prepared 16-file package, match canonical sources, remain free of source-map and credential-like leaks, avoid external runtime resources, and keep school-review metadata accurate.
- Added `STORAGE_BOUNDARIES.md` as the canonical web/iOS/Android storage record, explicitly separating local WebView saves and entitlement state from unsupported cross-device sync.
- Added deterministic `dist\\build-info.json` with the package version and canonical shell SHA-256; production checks now validate that build identity and `_headers` declares its JSON content type.
- Made the shared game canvas an explicit keyboard-focus target with an accessible label and pointer-focus handoff, then re-synced the identical shell to Android and iOS. The fresh verification passed all 47 Node tests, the 17-file static build, and the static-package audit; bounded touch QA confirmed joystick movement without triggering the adjacent potion control.
- Added a 120 ms release nudge for WASD/arrow input so short key pulses remain usable in managed or embedded browser surfaces; held-key movement, touch controls, and blur/visibility clearing remain intact. The synchronized package now passes all 49 Node tests and the static-package audit.
- Closed the V1 progression evidence gap with executable contracts for every shipped Dungeon 2 and 4-8 generator plus the shared boss-room clear/exit handoff; this is procedural regression evidence and does not replace a player-completed Dungeon 1-8 run.
- Added product-safety contracts for account-free/local-first normal play, permission-light browser behavior, same-origin public navigation, script-free review pages, and bounded educational claims; the full suite now passes 53 Node tests.
- Hardened session boundaries so Town, entrance, arena, and dungeon starts clear inherited movement locks, class mobility states, and final-ending cutscene state; added a regression contract for the reset block and resynchronized all web/native copies.
- Added a bounded desktop click-to-attack fallback: click/hold attacks share the production attack path, pointer-cancel/blur clears pending state, and the desktop hint documents click/hold input; the focused combat suite now passes 54 Node tests.
- Fixed waypoint-menu dismissal so Close requires leaving and re-entering the hold radius before reopening, and extended the first Dungeon 1 combat read-and-respond window to six seconds for touch and managed-browser orientation.
- Added a managed-browser DOM click fallback so one-shot desktop attacks remain usable when a webview does not deliver the complete pointer sequence or supplies no `button` value; the full release verification now passes 55 Node tests.
- Extended the first Dungeon 1 combat read-and-respond window to 10 seconds for touch-first room entry while keeping hostile simulation paused only during that bounded onboarding period.
- Added nearest-target recovery for touch or managed-browser taps that arrive without usable aim coordinates; normal directional joystick and pointer aiming remain unchanged.
- Added a bounded nearest-target tap to the touch Attack joystick and hardened document-level joystick release handling for restricted webviews; directional joystick aiming remains unchanged.
- The synchronized release now passes 56 Node tests, the 17-file static-package audit, and native web-asset sync after the touch Attack-joystick hardening.

## Baseline before release-candidate work

- Existing game checkpoint: `052a517`.
- Baseline tag: `code-quest-lab-baseline-2026-08-04`.
