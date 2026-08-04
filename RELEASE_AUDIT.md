# Code Quest Lab - Non-RC Release Audit

Date: 2026-08-04
Status: not a Release Candidate; owner/environment gates remain

This audit records what was actually checked in the current workspace. It does
not approve deployment, store submission, purchase, or legal wording.

## Passing evidence

- Baseline was preserved in `C:\Users\vlsf\Desktop\Codex\backups\Joey's Game\baseline-2026-08-04` and tagged `code-quest-lab-baseline-2026-08-04`.
- `index.html`, `code-quest-lab-source.txt`, `dist\index.html`, and the synced Android/iOS web copies match byte-for-byte; current SHA-256: `7BBCDE4F4815F3CAEF0C03C8786C5ED8E3FCA7402C61914E560C97E9E492FFB0`.
- Inline JavaScript syntax check passed with Node.
- `npm.cmd run release:verify` passed: release contracts, 56 Node tests, a 17-file static build, and the static-package audit.
- The static-package audit passed against `dist\` and both native public bundles: the expected 17 files, including deterministic `build-info.json`, are present with no stale extras, every native web asset matches `dist\`, review pages remain script-free, and no source-map reference, credential-like string, or external runtime resource was found.
- `STORAGE_BOUNDARIES.md` documents the shared origin-scoped web/WebView storage model, local recovery keys, entitlement separation, and absence of cross-device sync; physical lifecycle and cross-version evidence remain open.
- A fresh touch-only 390x844 browser pass traversed Town, the Dungeon 1 entrance, Normal trial/modifier selection, active `Ashen Pit` combat, and the normal defeat/session-summary recovery flow; the temporary profile was removed through the visible Manage Data flow and browser logs were empty. This is traversal/recovery evidence, not full combat, boss, ending, or device evidence.
- `npm.cmd audit --json` reported zero vulnerabilities.
- `npm.cmd run assets:generate` passed and produced deterministic branded PWA, Android, and iOS raster derivatives from `assets/icon.svg`; representative PWA and synced-web copies matched SHA-256, and native raster dimensions were validated.
- `npm.cmd run native:sync` passed and registered `@capacitor/app@8.1.1` for Android and iOS.
- Browser smoke passed with no console logs after the entitlement and public-page changes: profile/dashboard, Full Adventure Unlock surface, parent confirmation controls, free-preview start, and touch-sized layout.
- The automated entitlement matrix passed for the shipped core boundary: full-unlock product identity, approved verified sources, duplicate ownership, decline/pending, revocation, parent gating, adapter errors, and enforced free-user denial; live store adapters remain absent.
- The native entitlement bridge contract passed for iOS/Android source mapping, unavailable-plugin fail-closed behavior, and preservation of an explicitly supplied adapter. The development-only non-purchasing adapter contract passed for ownership, restore, pending, revocation, unavailable, and wrong-product states; it is not included in `dist\`.
- The six public routes `/about/`, `/education/`, `/privacy/`, `/support/`, `/contact/`, and `/schools/` loaded from the local HTTP server.
- After the local HTTP server was stopped, the cached game and all six public routes loaded with no browser logs.
- Native static contracts passed: landscape orientation, App back-button configuration, generated package paths, and shared `dist\` assets.
- Fresh-profile journey passed through onboarding and first-session entry; paused-run recovery, resume, deliberate stop, and temporary test-profile deletion passed with no browser logs.
- The production `parseCharacterSave` validator has a passing fixture matrix for current and legacy-compatible saves, malformed JSON, future versions, and invalid field shapes; this does not replace browser storage and cross-platform migration evidence.
- The exact production `loadPermanentData` path has a passing mocked-storage matrix for valid primary data, backup promotion, unsafe primary/backup fallback, and retired legacy mastery-stat migration; this does not replace browser/device storage, suspension, forced-closure, or cross-platform migration evidence.
- The production `parseRunCheckpoint` path has a passing matrix for valid routes, future versions, static zones, incomplete paths, missing definitions, array/object confusion, and malformed room state; this does not replace browser/device lifecycle evidence.
- The active-run checkpoint parser now rejects post-release dungeon IDs as well as malformed routes, so a legacy D9+ checkpoint cannot bypass the V1 route boundary.
- The production dungeon generator/validator and region-order helpers have a passing repeated-route matrix, including broken route rejection and end-of-order handling; this does not replace a player-completed dungeon and ending.
- The V1 release surface now ends at Dungeon 8: source-resident Dungeons 9-16 are hidden from selection, waypoints, saved-world resume, and boss-exit progression, while the final portal opens the existing session summary. The release-surface contract matrix covers this boundary; full Dungeon 1-8 playthrough evidence remains open.
- The production combat contract matrix checks starter attack data, shared touch/mouse/joystick attack routing, bounded desktop click/hold attack fallback, and pointer/touch joystick release fallbacks; this does not replace hands-on combat completion evidence.
- The first Dungeon 1 combat room now opens with a bounded 10-second `Read the room — move or attack` introduction. Player movement and attacks remain active while hostile simulation is paused; the release contract test covers the timer, first-room scope, prompt, and update-loop guard. This is an onboarding safeguard, not evidence of room completion.
- The touch Attack joystick now supports a bounded center tap that queues one nearest-target attack while directional drags retain continuous aiming; the global release guard also handles releases without a pointer ID. The contract is covered locally, but no physical touch-device or full room-clear claim is made here.
- An isolated clean-origin 390x844 touch run entered the free dungeon and reached multiple first combat rooms (`Burial Hall`, `Dark Corridor`, `Ashen Pit`, and `Forsaken Vault`); the normal defeat summary, saved-progress notice, Return to Waypoint path, and empty browser logs were observed. This is a traversal/recovery slice, not evidence of combat completion, boss progression, or the V1 ending.
- The current clean-origin touch pass also verified the in-world Town portal, Dungeon Entrance gate, Normal difficulty/modifier selection, and entry into a first procedural combat room at a 540x720 touch-layout viewport; the run was intentionally allowed to reach the normal defeat flow. No browser error or warning entries were recorded. Combat completion, boss progression, and the V1 ending remain unvalidated.
- A fresh-origin browser pass after the V1 route guard showed exactly the Dungeon 1-8 selection surface, with Dungeons 9-16 absent, and recorded no browser logs. This verifies the release-surface boundary, not a complete dungeon playthrough.
- A fresh touch QA pass after the first-combat hardening reached the in-world entrance, Normal trial, modifier, clean active session, and normal defeat/recovery flow with no browser error or warning entries. This confirms the post-change release path remains runnable; it does not establish full combat, boss, or ending completion.
- A bounded fresh Mage attack probe in a randomized first combat room reduced the live enemy count from `2` to `1` and persisted the `First Blood — Defeat one enemy` milestone. The run ended before the room cleared, so this is partial attack evidence and does not establish full combat, boss, or ending completion.

The shared `gameCanvas` now has a labelled keyboard-focus target and pointer-focus handoff; the release contract and combat test pass. A bounded touch joystick probe showed movement without the earlier neighboring Potion activation, but this remains browser input evidence rather than physical-device evidence.

Desktop WASD/arrow handling also preserves a bounded 120 ms release nudge for short key pulses in managed or embedded browser surfaces; held-key state is still cleared on blur/visibility changes and the contract is covered by the 56-test run.

The V1 progression contracts now execute every shipped Dungeon 1, 2, and 4-8 generator repeatedly, verify each route's intended boss marker, and assert that generic and Dungeon 4 special defeat paths mark the final room cleared before unlocking the shared exit portal. This is procedural regression evidence, not a substitute for full player-completed combat and ending evidence.

## Remaining owner or environment gates

1. Redeploy and verify the complete `dist\` package at the owner-approved HTTPS domain. The current Cloudflare host returns the older HTML shell for the manifest, service worker, build identity, assets, and public review routes; `npm.cmd run production:check -- https://code-quest-lab.gov8661682.com` fails accordingly. Codex has not published it.
2. Provide JDK, Android SDK, and Gradle tooling, then run and record an Android build. The current failure is `JAVA_HOME is not set and no 'java' command could be found in your PATH.`
3. Provide a Mac/Xcode environment, rerun Capacitor sync there, and build/test iOS. The current Windows failure is `xcodebuild is not recognized`.
4. Perform physical iPhone/iPad and Android phone/tablet tests, including safe areas, orientation, audio, suspension, offline launch, and storage.
5. Supply final store product IDs, prices, signing, sandbox accounts, and approved platform adapters. The current browser surface makes no real charge.
6. Finish clean-profile combat/boss/ending across the V1 Dungeon 1-8 route, save migration/corruption, and long-session evidence; current browser evidence is a traversal/recovery slice, not full V1 completion.
7. Approve commercial rights, final privacy/support policy, age/content ratings, icon/screenshot/store artwork, and school deployment requirements.

Until these gates are resolved, the project remains a prepared pre-release
build rather than an RC.

## Latest local hardening

- The production learning-support contract matrix checks contextual game-over notes for victory, boss/miniboss, planning-room, elite-run, and early-defeat outcomes, plus the optional concept label; this does not replace teen/school review or full-session evidence.
- The V1 release-surface guard now keeps Dungeons 9-16 post-release and gives the final validated portal a session-summary stopping point; focused progression contracts and the full release verification pass cover the boundary, not a hands-on Dungeon 1-8 completion.
- The service-worker contract harness now covers the v6 shell cache, first-party app-shell paths, stale-cache cleanup, same-origin GET isolation, and navigation-only offline fallback; this does not replace deployed-HTTPS cache-update or physical-device offline-soak evidence.
- The session-lifecycle contract harness passed for Return to Main Menu reward banking/checkpoint clearing, Finish For Now Town persistence, and active-profile deletion across primary, backup, checkpoint, index, and active-pointer storage; it does not replace browser/device lifecycle evidence.
- Repeated route-generation contracts now execute every shipped V1 generator (Dungeon 1, 2, and 4-8), validating connected paths, aligned room IDs, and boss endpoints; this does not replace player-completed progression evidence.
- Product-safety contracts now check account-free/local-first normal play, permission-light browser behavior, same-origin public navigation, script-free review pages, and bounded educational claims; owner age, privacy, and school review remain open.
- Session initialization now clears inherited movement locks, class mobility states, and final-ending cutscene state before loading a new route; the focused regression contract passes, but hands-on progression evidence remains required.
- Desktop mouse input now queues one bounded first shot for a pointer or managed-browser DOM click, retains continuous held-mouse attacks, and falls back to the nearest live target when click coordinates are unavailable; blur and pointer cancellation clear pending state. The focused combat contracts pass in the 56-test run, but the current browser probe still stops before full combat completion.
- Waypoint Close now records a leave-before-reopen guard. The fresh-origin reproduction showed that the patched menu stays dismissed beyond one hold interval; the player must leave and re-enter before opening it again.
- `npm.cmd audit` and `npm.cmd audit --omit=dev` both report zero known vulnerabilities for the locked dependency tree; this does not replace code review or native-store security review.
- A fresh local PWA check cached the shell, stopped the local HTTP server, reloaded the root, and opened the retained local Barbarian save into Town with empty browser logs; deployed-HTTPS and device offline-soak evidence remain open.
- A fresh local-origin browser pass created and later deleted a temporary Mage profile through the visible UI, reached Town, confirmed only Dungeons 1-8 in Adventure Routes, selected Dungeon 1 Normal plus a modifier, and reached the start room with empty browser logs. The in-app keyboard bridge did not yield a visible movement/door transition, so this run is recorded as navigation/start-room evidence rather than full progression evidence.
- The native lifecycle contract covers `pause`, inactive `appStateChange`, `resume` entitlement refresh, and back-button routing; it does not replace signed builds or physical-device suspension/forced-close evidence.
