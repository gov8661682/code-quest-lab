# Code Quest Lab - Status

Date: 2026-08-07
State: pre-release hardening; not a Release Candidate

## Creative reference audit

- Reviewed `F:\Downloads\20260804_latest output.txt` on 2026-08-04 as Joey's latest creative/gameplay reference. Size: 4,785,331 bytes; 80,806 lines; SHA-256: `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB`.
- The audit is recorded in `CREATIVE_REFERENCE_AUDIT.md`; no wholesale source replacement or gameplay simplification was made.
- Verified parity gap: the reference has eight class IDs, while the current selectable/runtime surface has Barbarian, Mage, Rogue, and Druid only. Ranger, Necromancer, Alchemist, and Paladin names, skills, resources, passives, skill trees, class gear, set families, and materials are queued as isolated parity milestones.
- Verified representation issue: current source contains later-dungeon boss dispatches for the Oathbreaker King, Alchemist, Corrupted Ranger Captain, Corrupted Necromancer, Corruption of Life, and the D16 encounters, but several current comments still describe those paths as reserved or environment-only. The V1 D1-8 release guard remains intentional until full later-dungeon rewards, progression, save behavior, and hands-on evidence are complete.
- Verified story preservation: Bob's normal/hidden/final/recognition conversations and the Pure Corruption choice, purification journey, rematch, and “Last Light” ending content remain represented in the current source.
- Verified endgame gap: Joey's reference adds seven Phase 4 Pure Corruption attack families (`pcCleaveSpin`, `pcCrown`, `pcWarShock`, `pcBarrage`, `pcSnare`, `pcTendril`, `pcStorm`) that are not in the current source.
- The roadmap, V1 scope, backlog, and changelog now carry the creative parity lane and the major-milestone checkpoint protocol. Creative implementation has not begun from this audit.
- Corrected stale current-source dungeon comments so source-resident D9-D15 boss paths are distinguished from the still-gated V1 release surface; gameplay behavior was not changed by this documentation correction.

## Checkpoint process status

- Evidence-scored progress: Checkpoint 1 is **54%** complete and overall
  project progress is **15%** using the ten-checkpoint formula in
  `AUTORUN.md`. `tests/project-control-contracts.test.mjs` prevents score drift
  and verifies the three/five-attempt loop breaker.
- Autonomous work protocol: `AUTORUN.md` requires a concrete progress delta per
  cycle, a strategy change after three materially identical technical
  failures, and a hard stop after five materially identical gameplay/manual
  attempts. Independent checkpoint work continues around external blockers.
- Major-milestone GitHub and website checkpoint protocol: recorded in `ROADMAP.md`.
- Current checkpoint: Checkpoint 1 - Core game stability and complete V1 path; the creative-reference audit and release-foundation checkpoint are complete and must not be repeated.
- Control record: `PROJECT_PROGRESS.md`, `CHECKPOINTS.md`, `CURRENT_CHECKPOINT.md`, `COMPLETED_WORK.md`, `BLOCKERS.md`, `DECISIONS.md`, `BACKLOG.md`, and `CHANGELOG.md` are now the canonical progression controls.
- Latest deployed milestone runtime: `9da1d0e` (`Add local profile transfer and combat readability`); local hardening commits `5db6db5`, `3e33470`, `8e165e1`, `4747413`, `3106820`, `e1380c4` (`Harden recovered boss progression QA`), `90f4f36` (`Protect touch joystick releases`), and `c8b50c8` (`Guide Town portal discovery`) are pushed to `origin/main` but not deployed because they are minor follow-ups. Prior stable runtime `32d83d0` and control-record commit `194bcc5` remain in history. `8e165e1` adds exact generated-route restoration on resume, corrects the first-combat room guard, and records the bounded off-viewport target finding; `4747413` adds a restrained `THREAT` locator for hidden live targets outside the viewport; `3106820` refreshes room/HUD status as the final enemy is removed; `e1380c4` restores a recovered boss-room portal, corrects entrance objectives, and adds a gated local summons-clear aid; `90f4f36` protects movement-joystick releases from adjacent skill buttons; `c8b50c8` adds the Town portal direction cue.
- Checkpoint record: commit `9da1d0e`, deployed 2026-08-05 to `https://code-quest-lab.gov8661682.com/` (Pages preview: `https://8d5f404a.code-quest-lab.pages.dev/`), build SHA-256 `3A39EF4158EA494523FE04323D5D40BAA082E4C09F526A499707C3656EF139DA`.
- Production verification passed with `npm.cmd run production:check -- https://code-quest-lab.gov8661682.com`; the new preview live smoke reached profile/class/Town, pause/finish, Manage Data export, and cleanup at 1024x768, with zero browser diagnostics. The configured hostname loaded with no diagnostics; an existing primary-origin Mage profile was preserved and not modified.
- Browser blocker `B-007` was cleared for loopback QA on 2026-08-05. A fresh cache-busting local shell reopened the saved Mage level 10 Guardian room, rendered the recovered exit portal, and completed portal travel into the next entrance area without browser diagnostics. This is local evidence only; the latest deployed site remains the prior stable checkpoint.

## Baseline evidence

- Git worktree was clean on `main` at commit `052a517`.
- Untouched source backup: `C:\Users\vlsf\Desktop\Codex\backups\Joey's Game\baseline-2026-08-04`.
- Baseline tag: `code-quest-lab-baseline-2026-08-04`.
- Baseline source and backup `index.html` SHA-256 values matched.
- Local HTTP smoke run passed at 1280x720: profile creation, Barbarian selection, Town entry, movement/attack input, reload, saved profile reopen, and pause/resume.
- Local HTTP smoke run passed at 390x844: saved profile reopen and phone pause/resume surface.
- Browser console had no error or warning entries during the baseline run.
- `npm.cmd run release:verify` passed: source mirror, static contract check, 22 Node tests, and 16-file static build.
- Updated shell regression passed at 390x844 and the desktop viewport after a reload; profile reopen and pause/resume remained usable with no browser errors.
- Offline check passed after the local HTTP server was stopped: the cached profile screen still loaded.
- Active-run checkpoint recovery passed in the browser: forced reload reopened a local recovery prompt, resumed the saved room, and the explicit Return to Town path cleared the checkpoint.
- Landscape tablet HUD pass passed at 1024x768, and the narrow touch layout pass passed at 390x844 with touch joysticks/buttons visible and no browser errors.
- `npm.cmd run native:sync` passed and registered `@capacitor/app@8.1.1` for both generated platforms.
- `npm.cmd run assets:generate` passed: branded 192/512px PWA icons, Android density/foreground icon resources, Android splash resources, and iOS AppIcon/Splash resources were generated from `assets/icon.svg`; representative dimensions and local/dist/native web-copy hashes matched.
- `npm.cmd run native:doctor` confirmed Android configuration but reported that Xcode is not installed; `npm.cmd run native:android:build` stopped because `JAVA_HOME` and `java` are absent; `npx.cmd cap build ios` stopped because `xcodebuild` is unavailable.
- Public same-origin About, Educational Purpose, Privacy, Support, Contact, and School Review pages are prepared, included in the static build/service-worker shell, and verified by the current deployed production check.
- After the local HTTP test server was stopped, the cached web app and all six public review routes loaded in the browser with no console errors.
- The pre-deployment production audit on 2026-08-04 returned the old HTML shell for asset and review routes; after the authorized Pages publish, the current primary hostname and preview deployment both pass the production contract.
- The non-RC evidence and owner/environment gates are consolidated in `RELEASE_AUDIT.md`.
- Local QA tooling added after the deployed checkpoint: `?cql-dev=1` on a
  loopback HTTP/HTTPS URL plus the hidden `F8 F7 F6 F3` sequence toggles a
  session-only developer invincibility mode. With invincibility already
  enabled, `F8 F7 F6 F4` clears live boss summons for local debugging. Neither
  sequence is serialized, exported, deployed, or available on the native
  protocol; the local runtime smoke kept the player at full HP through enemy
  damage and toggled the mode off.
- Profile-save reliability was strengthened with versioned structural validation, valid-backup promotion, and an explicit user-facing recovery notice; full migration/corruption matrix coverage remains open.
- An automated compatibility matrix now executes the shipped `parseCharacterSave` validator against current and legacy-compatible shapes, malformed JSON, future versions, and invalid field types; browser storage backup-promotion and cross-platform migration evidence remain open.
- An automated mocked-storage matrix now executes the shipped `loadPermanentData` path for valid primary data, backup promotion, unsafe primary/backup fallback, and retired legacy mastery-stat migration; browser/device storage, suspension, forced-closure, and cross-platform migration evidence remain open.
- An automated checkpoint-parser matrix now rejects future versions, static zones, missing route definitions, incomplete paths, array/object shape confusion, and malformed room state before recovery; full browser/device lifecycle evidence remains open.
- The checkpoint parser also rejects post-release Dungeon 9-16 IDs, preventing an older active-run snapshot from reopening hidden content.
- An automated progression matrix now exercises every shipped V1 generator (Dungeon 1, 2, and 4-8), the validator, broken route shapes, the shared boss-room clear/exit handoff, and the full region-order handoff; it does not replace a player-completed dungeon and ending.
- An automated combat contract matrix now checks starter attack data, shared touch/mouse/joystick attack routing, bounded desktop click/hold attack fallback, and pointer/touch joystick release fallbacks; it does not replace hands-on combat completion evidence.
- The first Dungeon 1 combat room now opens with a bounded 10-second `Read the room — move or attack` introduction: player movement and attacks remain active while hostile simulation is paused. The release contract test covers the onboarding timer, scope, prompt, and update-loop guard; full room-clear evidence remains open.
- The touch Attack joystick now has a bounded tap fallback that queues one nearest-target attack while preserving directional drag aiming; the joystick release guard also accepts document-level releases with no pointer ID. This is contract/build evidence, not a completed room-clear result.
- Fresh-profile browser journey passed: class selection, Town onboarding, first module/difficulty/modifier, active gameplay, pause checkpoint, reload, Resume Session, deliberate Finish and Return to Dashboard, and no browser logs. The temporary QA profile was removed through the in-game Manage Data confirmation after testing.
- Isolated clean-origin touch journey passed through the free dungeon entrance into multiple first combat rooms (`Burial Hall`, `Dark Corridor`, `Ashen Pit`, and `Forsaken Vault`); the normal defeat summary, saved-progress notice, Return to Waypoint path, and no-browser-log result were observed. A current 540x720 touch-layout pass additionally verified Town portal -> Dungeon Entrance gate -> Normal trial -> first procedural combat. Combat completion, boss progression, and the final V1 ending remain unvalidated.
- Fresh touch QA after the first-combat hardening reached the in-world entrance, Normal trial, modifier, clean active session, and normal defeat/recovery flow; the browser recorded no error or warning entries. This confirms the release path remains runnable after the combat-intro change, not that full combat or boss progression is complete.
- A bounded fresh Mage attack probe reached randomized first combat rooms and reduced one live room from `Enemies: 2` to `Enemies: 1`; the profile then persisted `First Blood — Defeat one enemy`. The run still ended before the room cleared, so this is partial attack evidence rather than full combat completion.
- Latest live QA on 2026-08-05 used a fresh Barbarian profile at 1024x768 and reached three first-combat rooms (`Ashen Pit`, `Crypt Passage`, and `Dark Corridor`) with no browser errors or warnings. A touch Attack-joystick drag, touch tap plus movement, and repeated desktop canvas clicks did not produce an observed enemy defeat in this harness; treat attack response as an evidence gap to reproduce on another supported browser/device, not as a confirmed runtime defect. The temporary QA profile was deleted in Manage Data.
- Local save-transfer smoke on 2026-08-05 created a synthetic Mage profile, exported it from Manage Data as `.txt`, confirmed the visible status that the current profile was unchanged, and then deleted the test profile. The focused transfer contracts preserve durable data, a valid backup, and a valid active-run checkpoint; real upload round-trip and cross-device/cross-version evidence remain open.
- Post-checkpoint attack probe on the deployed Pages preview used a fresh Mage
  at 1024x768, selected Dungeon 1 Normal with the `Blessed Journey` modifier,
  reached `START Ancient Entrance`, and then stopped at the room-0 entry after
  managed-browser movement/interaction attempts. No browser errors or warnings
  were recorded; the temporary profile was deleted. Treat this as additional
  input/route evidence, not a combat-calculation diagnosis.
- Product direction was updated to teen-first (approximately 13-17), landscape tablet touch-first, 10-30 minute sessions, restricted-device compatibility, optional authentic Learning Support, and non-manipulative monetisation. The updated direction is reflected in `PRODUCT_VISION.md`, `V1_SCOPE.md`, `TARGET_AUDIENCE.md`, `ROADMAP.md`, `RELEASE_CRITERIA.md`, `STORE_READINESS.md`, `TEST_PLAN.md`, `MONETISATION.md`, `PRIVACY.md`, and `OWNER_ACTIONS.md`.
- Joey's explicit open-world preference is now recorded as a staged product and architecture direction in `OPEN_WORLD_DIRECTION.md`: Town, connected regions, landmarks, waypoints, and authored dungeons should form a compact discovery-led world. The runtime remains honestly bounded at the tested D1-8 surface until C1 evidence is complete; no future destination is presented as playable by this decision alone.
- The AI expert playtest is recorded in `AI_EXPERT_PLAYTEST.md`: Town is a promising hub foundation, but the current flow still feels route-menu-driven; the Town objective uses “practice module” language, the minimap/landmarks are not informative, the first modifier may be too aggressive for level 1, and first-combat enemy/door feedback needs stronger readability. The 2026-08-05 checkpoint includes encoding-safe copy, Town orientation, a stable lock banner, stronger enemy silhouettes, outlined HP bars, and a locally tested session-status reset; a first click-to-damage response is now reproduced, while full attack/progression evidence remains open.

The deployed AI-follow-up implementation includes a stable lock banner,
stronger enemy silhouettes, and outlined HP bars; the unreleased local
follow-up also clears stale dungeon/waypoint status on Town recovery. Combat
calculations were not changed. The preview live smoke passed, and a later
1024x768 Mage run produced visible click damage and enemy defeats; full
attack/progression evidence remains open.

## Current audit

The game is a 57,085-line self-contained HTML file with Canvas rendering, DOM overlays, procedural game logic, localStorage saves, save backup/migration logic, versioned plain-text profile transfer, four selectable classes, progression, equipment/crafting, achievements, Town/NPC systems, dungeon definitions, touch controls, and a procedural audio path. Joey's reference contains four additional class families that are not yet part of this runtime. The project now has a dependency-free package/check/build loop, a relative manifest, a service worker, original vector artwork plus deterministic PWA/Capacitor raster derivatives, and generated Capacitor Android/iOS projects. The v8.1.1 App plugin is wired for lifecycle/back-button handling; live platform purchase integration is still absent.

## Release blockers

- P1: native Android/iOS build evidence is absent. The projects are generated, but this Windows environment has no Android SDK/JDK or Xcode.
- P1: live StoreKit/Google Play/web payment adapters and sandbox entitlement tests are absent; the shared verified-entitlement boundary, product identity check, parent-gated unlock surface, and mocked core matrix are implemented.
- Resolved for this checkpoint: production HTTPS deployment and clean-host verification pass at `https://code-quest-lab.gov8661682.com/`; redeploy remains part of every later major-milestone checkpoint.
- P1: full progression and browser/device storage, suspension, forced-closure, and cross-platform save-compatibility coverage remains open; automated parser and production-loader matrices now cover the validator/recovery boundary.
- P1: the clean-profile path now has a reproduced click-to-damage response and partial enemy defeat/progression evidence on a 1024x768 Pages preview, but full combat completion, boss progression, touch-device behavior, and the V1 end-state have not yet been validated.
- P1: the Dungeon 1-8 route endpoint is now bounded and source-resident Dungeons 9-16 are hidden until completed; clean-profile completion of the bounded V1 path and ending remains unvalidated.
- P2: store screenshots, feature graphics, and final platform metadata are not prepared or owner-approved; native icon/splash rasters are generated but still need native build and device verification.
- P2: an interrupted boss or mini-boss encounter resumes at the room checkpoint and restarts that encounter rather than restoring an exact combat frame.

## Completed this session

Built the release foundation and first tablet-session hardening slice, then
completed milestone `9da1d0e`: added versioned plain-text profile transfer that
preserves durable data, backup, and active-run checkpoint without overwriting
the current profile; added grouped enemy/door readability refinements without
changing combat calculations; and pushed/deployed/live-verified the tested
package. The unreleased local follow-up clears stale dungeon lock and waypoint
status after session exit, adds two lifecycle contracts, and records a preview
Mage run that reached the Elite room with visible attack feedback. The earlier
slice added static/offline web shell metadata,
deterministic QA contracts, a bounded first-combat read-and-respond window,
draft original vector assets, local run checkpoint recovery, optional
after-session play notes, a clear finish-for-now path, and removed the
unfinished Smelter from the active release navigation. Generated Capacitor
Android/iOS projects, added the local App lifecycle bridge, pinned the audited
v8 dependency set, and prepared the public web/school-review surface.

## Next task

Resume the highest-priority clean-profile touch-first attempt through the
bounded Dungeon 1-8 path, using the now-reproduced attack response before
changing combat code. The save-portability/readability milestone was
committed as `9da1d0e`, pushed, deployed, and live-verified on 2026-08-05.
Continue with dated evidence for room/boss/ending progress, session duration,
pause/reload/finish behavior, and browser diagnostics. Native Android/JDK and
Mac/Xcode actions remain owner/environment blockers recorded in
`BLOCKERS.md`.

## Latest local hardening

- The game-over screen now chooses an optional, on-device learning note from outcome context: final challenge and boss signals map to pattern recognition, route/support rooms map to planning, elite evidence maps to decomposition, and early defeats map to debugging. The focused contract suite and full `npm.cmd run release:verify` run pass; age-appropriateness review and hands-on session evidence remain open.
- The automated learning-support contract matrix covers contextual outcome notes and the optional concept label; it does not replace teen/school review or full-session evidence.
- The V1 route guard now limits selection, waypoints, saved-world resume, and boss-exit progression to Dungeons 1-8. The final validated portal opens the existing session summary; focused progression tests cover the guard, while hands-on Dungeon 1-8 completion remains open.
- Latest local verification: `npm.cmd run release:verify` passed with 75 Node tests, a 17-file build including deterministic `build-info.json`, and the static-package audit; the prior `npm.cmd run native:sync` passed. The unreleased local shell and mirror share SHA-256 `D2D5351A749E9905FA93211BAD0705EABDCBE99C2B812827D4F6058457931E9F`; the deployed checkpoint remains `3A39EF4158EA494523FE04323D5D40BAA082E4C09F526A499707C3656EF139DA` until the next major milestone.
- The Town minimap now exposes the existing hub's roads, Waypoint Plaza, buildings, pond, player marker, and northern `DEPTHS` destination; it is live in the checkpoint shell but is not claimed as a full World Atlas.
- Merged the upstream accessibility checkpoint while retaining Joey's Adventure Routes and Learning Support direction; the joystick contract test now tolerates Windows CRLF boundaries, and the release package was rebuilt and re-synced after the merge.
- Completed the major-milestone checkpoint: commit `9da1d0e` was pushed and deployed to the configured domain on 2026-08-05; production contracts passed, and the new preview/primary live smoke verified the shell, profile/Town flow, and Manage Data export with zero browser diagnostics. Full combat completion remains open.
- The service-worker contract harness now covers v6 cache installation and stale-cache cleanup, same-origin request isolation, and navigation-only offline fallback; this is deterministic package evidence, not deployed-HTTPS/offline-soak evidence.
- The session-lifecycle contract harness now covers Return to Main Menu banking/cleanup, Finish For Now Town persistence, and active-profile deletion across all local save keys; browser/device suspension, forced-closure, and cross-platform evidence remain open.
- The session-lifecycle contract now also verifies page-background saves use Town/entrance position persistence or active-dungeon checkpoints before the permanent-data flush; the 58-test release verification is green.
- Repeated generation contracts now execute every shipped V1 dungeon generator (Dungeon 1, 2, and 4-8), validating connected paths, aligned room IDs, and boss endpoints; player-completed progression remains open.
- The Capacitor lifecycle contract now covers `pause`, inactive `appStateChange`, `resume` entitlement refresh, and back-button routing; this strengthens native behavior but does not replace signed builds or device suspension/forced-close evidence.
- The Capacitor entitlement seam now discovers only an available native `CodeQuestEntitlements` plugin, maps iOS/Android to approved store sources, preserves an explicitly supplied adapter, and remains inert on web/unavailable shells. A test-only development adapter covers deterministic non-purchasing outcomes and is excluded from the public package; live store adapters remain open.
- The static-package contract now rejects stale or unexpected `dist` files, source-map references, credential-like strings, external runtime resources, inaccurate review-page metadata, and mismatched generated copies; it also proves every prepared web asset matches the Android and iOS bundled copies. It does not replace clean-host or deployed-HTTPS verification.
- `STORAGE_BOUNDARIES.md` now records the shared origin/WebView storage model, local recovery keys, entitlement separation, and the explicit absence of cross-device sync; device lifecycle, cross-version, and owner backup-policy evidence remain open.
- A fresh touch-only 390x844 browser pass traversed Town, the Dungeon 1 entrance, Normal trial/modifier selection, the active procedural `Ashen Pit` combat room, and the normal defeat/session-summary recovery flow; the temporary profile was deleted through Manage Data and browser logs were empty. Full combat, boss, ending, and device evidence remain open.
- The shared play surface now exposes a keyboard-focusable, labelled `gameCanvas` and focuses on pointer input; its release contract is covered by the new combat test. A follow-up touch-control probe confirmed bounded joystick movement and avoided the neighboring Potion action; this is input/path evidence, not full V1 completion or hardware evidence.
- Desktop movement now preserves a bounded 120 ms nudge after a WASD/arrow release, covering short key pulses common in managed/embedded browser surfaces without creating an endless input latch; the new contract is included in the 58-test verification.
- Desktop mouse input now queues one bounded first shot for a pointer or managed-browser DOM click and retains the held-mouse path for continuous attacks; omitted or invalid click coordinates fall back to the nearest live target, while blur and pointer cancellation clear pending state. The desktop hint now says `Mouse click / hold`; the 58-test verification covers the contract, but browser probes still do not establish full room, boss, or ending completion.
- Waypoint Close now suppresses the hold-to-open action until the player leaves the waypoint, so the menu is genuinely dismissible on desktop, touch, and managed webviews. A fresh-origin browser probe reproduced the old reopen loop and then observed the patched menu remain closed for more than one hold interval.
- The first-combat read-and-respond window is now 10 seconds on the first Dungeon 1 combat room, giving touch-first players enough time to orient after the room transition without pausing their movement or attack input; hostile simulation remains paused only during that bounded onboarding window.
- V1 route contracts now execute every shipped generator and assert the shared boss defeat marks the final room cleared before opening the exit portal; the new evidence is included in the 58-test verification, while full hands-on combat and ending evidence remain open.
- The touch Attack joystick now supports a bounded center tap that queues one nearest-target attack while directional drags retain continuous aiming; the global release guard also handles releases without a pointer ID. The focused contract is included in the 58-test verification, but browser and device evidence still do not establish full room, boss, or ending completion.
- Session initialization now clears inherited movement locks, class mobility states, and final-ending cutscene state before loading a new route; a focused combat contract covers the reset block so profile switches and intentional stops cannot carry a stale control lock into the next session.
- Product-safety contracts now cover account-free/local-first normal play, absence of unnecessary browser permissions and external runtime scripts, same-origin public navigation, script-free review pages, and bounded educational claims; these checks are static evidence and do not replace owner age, privacy, or school review.
- `npm.cmd audit` and `npm.cmd audit --omit=dev` both report zero known vulnerabilities for the locked dependency tree.
- A fresh local PWA check cached the shell, stopped the local HTTP server, reloaded the root successfully, and opened the retained local Barbarian save into Town with no browser logs. This is stronger local shell evidence, but not deployed-HTTPS, forced-close, or physical-device offline-soak evidence.
- A fresh local-origin browser pass created a Mage profile, entered Town, confirmed the Adventure Routes boundary exposes only Dungeons 1-8, selected Dungeon 1 Normal with a session modifier, reached the Dungeon 1 start room, and then removed the temporary profile through Manage Data; browser logs were empty. The in-app keyboard bridge did not produce an observable movement/door transition during this run, so no full progression claim is made from it; clean-browser/device confirmation remains open.
- A bounded 2026-08-05 local Mage run reached D1 `Crypt Passage`, `Mystic Sanctum`, `Hidden Cache`, and `Burial Hall` with the loopback developer aid enabled. It observed visible combat, shrine/treasure interaction, rewards, and level-up/gear surfaces, then reproduced one hidden/offscreen Soul Wraith retaining the Burial Hall lock after visible enemies were defeated. Commit `4747413` adds a contract-tested `THREAT` edge cue for that case; the run was paused, reloaded, recovered from the saved Burial Hall checkpoint, and resumed without browser diagnostics. Full room-clear, D1-8, touch-duration, and tablet lifecycle evidence remain open.
- Commit `3106820` refreshes room progress and the HUD immediately when the final normal enemy is removed, so a level-up pause cannot leave a stale locked-door message. Focused and full release verification passed all 67 tests, the 17-file package audit, and native sync; the local resumed `Ruined Archway` smoke showed no stale lock or enemy count. This minor follow-up is not deployed; full D1-8 remains open.
- The next clean-profile touch-first D1-8 run was initially stopped by the
  in-app browser permission denial recorded as `B-007`. Loopback access has
  since been restored and local recovery QA has resumed; Pages-preview and
  physical-device route/lifecycle evidence remain open.
