# Code Quest Lab - Changelog

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
