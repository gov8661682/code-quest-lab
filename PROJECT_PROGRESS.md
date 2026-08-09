# Code Quest Lab - Project Progress Report

Reviewed: 2026-08-09
Active checkpoint: Checkpoint 1 - Core game stability and complete V1 path
Release status: pre-release hardening; architecture checkpoint deployed; not a Release Candidate

Main checkpoint completion: **79%**
Overall project completion: **18%**

The evidence-scored source is `CURRENT_CHECKPOINT.md`. Autonomous continuation,
progress-delta requirements, and the three/five-attempt loop breaker are
defined in `AUTORUN.md` and verified by an executable project-control contract.

## Latest hardening evidence

On 2026-08-09, a fresh protected Mage route on the uncached local shell at
540x720 reached a cleared D1 room, then reproduced a managed-browser
navigation failure: normal directional input did not reach the forward door.
Keyboard, arrow, joystick-drag, refocus, and pause/resume paths were bounded
under the five-attempt loop policy and the route was stopped. The disposable
profile was deleted; no clean-player or touch-only score was claimed.

The targeted response adds a contextual `Proceed Through Exit` button. It is
hidden in Entrance/`START` and unclaimed static rooms, appears after a real
forward combat clear or a claimed shrine/treasure reward, and preserves the
existing save and transition handoff. Fresh 540x720 runtime checks used the
local QA room-clear aid to advance `room_m0` to `room_m1`, then claimed a
shrine and advanced into the treasure room. The source mirror, **94-test**
release gate, `qa:fast`, production build, and native sync pass. The score
remains **79%** / **18%** and no deployment checkpoint was created.

On 2026-08-08, a local 540x720 touch-surface probe used a disposable Mage to
exercise D1 combat, shrine, treasure, level-up, the Stone Guardian Phase 2
fight, and the portal into the Fallen Kingdom entrance. D2 pause/reload showed
`SESSION RECOVERED` in the same combat room; a separate protected probe then
survived a bounded idle interval, cleared a D2 room, paused, and used `Finish
and Return to Dashboard`. The managed browser did not deliver joystick drags
reliably, so movement used the bounded keyboard fallback after diagnosis. The
first resumed attempt also ended before the session-scoped invincibility aid
was re-enabled. This is not full touch-only, 10-30 minute, summary, ending, or
physical-device evidence; harness-inflated play time is not credited. The
temporary profile was deleted and retained profiles were unchanged. The score
remains **79%** / **18%**, and no deployment was made for this incomplete local
evidence slice.

The same cycle also ran a new disposable Mage through the full functional V1
route boundary: D1, D2, and D4-D8. All named bosses, shrine/treasure surfaces,
portal handoffs, `THE SESSION IS COMPLETE`, optional Pattern recognition
support, next-step copy, `Finish for Now`, and Pause -> `Finish and Return to
Dashboard` were observed. Because the managed-browser joystick/attack path
still failed to deliver normal attacks, enemy-free and current-encounter QA
controls completed combat rooms; this is fresh-profile functional evidence,
not clean-player or touch-only acceptance. The diagnostic log was empty and
the disposable Level 22/2527-Soul profile was deleted; retained profiles were
unchanged. The score remains **79%** / **18%**, and no deployment was made.

The follow-up input hardening is local and intentionally unscored. The shared
Attack joystick now accepts a guarded click fallback for managed surfaces that
emit a click but lose pointer-up delivery; duplicate pointer-up taps and
directional drags remain suppressed. The source mirror is synchronized, and
18 focused combat contracts, `release:verify` (93 tests), `qa:fast`, the
production build, and native sync pass. A fresh post-edit browser run on an
uncached `localhost:4173` origin at 540x720 confirmed one real center tap
reduced D1 `Enemies: 2` to `Enemies: 1` with empty browser diagnostics, and a
directional drag left a three-enemy room unchanged. The room clear used the
bounded high-damage QA aid, so this is managed-browser input evidence, not
physical-device, full-route, or clean-player acceptance; the score remains
**79%** / **18%** and no deployment was made.

The next route QA slice is locally verified and recorded as a GitHub/website
checkpoint.
On a disposable loopback Mage profile, the invincibility aid and 10x QA speed
completed the functional D1, D2, D4, D5, D6, D7, and D8 chain, including every
named boss, each portal handoff, the final session summary, and `Finish for
Now` back to Town. The shared fixes now clear QA-completed boss summons, keep
the exit objective truthful, and replace the stale `Back to Practice Modules`
copy with `Back to Dungeon Entrance`. The full suite passes 93 tests, while the
score remains **79%** / **18%** because this is not clean-player route or
touch-first acceptance evidence. Commit `20f85ba` (`Harden V1 route exit
handoffs`) was pushed to `origin/main` and deployed on 2026-08-08. Pages
preview: `https://d8829db6.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. Production checks and live
desktop/tablet profile-shell smoke passed. Deployed source SHA-256:
`553C51477907DDDA9CA67AF0D1C79581378A676EAE83741627645ED1D4682A19`.

The 2026-08-08 architecture slice is locally verified and recorded as a
GitHub/website checkpoint. `ARCHITECTURE_REVIEW.md` documents the 57,394-line
runtime audit and the bounded plan. `BOSS_IDENTITY_DEFS` now centralizes named
boss representation, while loopback-only developer QA provides accelerated
time, phase/room/boss stepping, enemy-free/high-damage modes, and structured
telemetry. The fixed-seed representative combat model passes its 11 focused
tests and `npm.cmd run qa:fast`; the full suite passes 92 tests, the build and
17-file package audit pass, and `npm.cmd run native:sync` passes. No creative
content was removed and no acceptance percentage is claimed from this work;
the active score remains **79%** / **18%** until route, ending, and tablet
session evidence changes the weighted table.

The checkpoint commit is `2c1d6ba` (`Add deterministic gameplay QA
architecture`), pushed to `origin/main` and deployed on 2026-08-08. Pages
preview: `https://7c154632.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. Preview and hostname production
checks passed, and the live browser smoke passed at 1024x768 and 1440x900 with
the playable profile/entrance surface and no horizontal overflow. Deployed
source SHA-256:
`00349B9312F68EE8402F143785AEEA28FB5FD5D0386E114D0501E5B2336448FC`.

Commit `9886f50` (`Bound Void Monarch summon pressure`) was pushed and deployed
on 2026-08-07. The Void Monarch now has four finite beast summon waves and
four phase-aware crystal summon waves, preserving encounter pressure while
ensuring target assist and player damage can converge on the boss. The earlier
loopback-only `F8 F7 F6 F4` aid still preserves live boss encounters while
clearing summons, and the D4 HUD identifies the Void Monarch correctly. All
84 tests, the 17-file build/package audit, native sync, production checks, and
live smoke passed. Preview: `https://c45c9c7c.code-quest-lab.pages.dev/`;
deployed shell SHA-256:
`C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
The evidence score remains **79%** / **18%** because D4-8, the ending, and
the full touch-first safe-stop acceptance lane are still open.

## Review basis

This report is based on the implementation, executable tests, generated package,
Git history, and current deployment—not only on comments or planning files.

- Repository: `C:\Users\vlsf\Desktop\Codex\Joey's Game`
- Git state: `main` contains source milestone commit `9886f50` (`Bound Void
  Monarch summon pressure`) plus the earlier deployed checkpoint history.
  Control baseline `944c8c3` (`Add bounded autonomous progress controls`) and
  the route/input/recovery hardening commits remain in history. The deployment
  record for source commit `5cbe80c` is maintained below; later incomplete work must remain
  grouped into the next meaningful checkpoint.
- Canonical game: `index.html`, SHA-256
  `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`
- Download mirror: `code-quest-lab-source.txt` is byte-identical to `index.html`
- Latest Joey reference audit: `CREATIVE_REFERENCE_AUDIT.md`, reference SHA-256
  `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB`; the
  audit is complete and is not being repeated
- Current local verification: `npm.cmd run release:verify` passes 84 tests,
  the 17-file build, and the static-package audit; `npm.cmd run native:sync`
  also passes after the elite pacing/input hardening.
- Current live verification: `npm.cmd run production:check -- https://code-quest-lab.gov8661682.com`
  and the matching preview check passed; both report shell SHA-256
  `C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
- Last website checkpoint: source commit `9886f50`, deployed and live-verified
  on 2026-08-07 at `https://code-quest-lab.gov8661682.com/`; preview
  `https://c45c9c7c.code-quest-lab.pages.dev/` also passed the live smoke
  surface
- Latest local route evidence: a disposable Mage profile completed the full
  observable Dungeon 1 touch-first slice through the Stone Guardian and exit
  portal, then completed the patched Dungeon 2 Normal route through shrine,
  treasure, a bounded two-elite room, the three-phase Fallen King, and the exit
  portal into The Shadow Realm Entrance with the loopback developer aid
  enabled. The disposable profile was deleted after the run and the retained
  Mage/Barbarian profiles were verified unchanged. This maintains the evidence
  score at 79% / 18%; D4-8, the ending, and the full safe-stop session remain
  open.
- The elite pacing follow-up caps the combined health consequence of depth,
  dungeon, elite, and Giant modifiers at 2.5x authored base health while
  leaving their size, damage, defense, and behavior identities intact. Touch
  and desktop attack taps also wait for cooldown readiness. The two focused
  contracts are included in the 83-test release gate and the verified deployed
  milestone.
- Latest isolated QA evidence: a temporary Mage profile completed Dungeon 1
  through the Stone Guardian and portal, then reached the D2 `Dark Inquisition
  Chamber` elite room. `Elite Invasion` plus a Corrupted elite reproduced an
  escalation to 15 live enemies and a locked door during bounded attacks;
  the run was finished safely and the temporary profile was deleted. Commit
  `6423ecb` bounds each Corrupted elite to two summoned minions and persists
  that budget through room checkpoints. This is a progression-hardening result,
  not a completed D1-8 route or ending.
- Follow-up D4 QA reached `ELITE The Long Fall` after clearing the preceding
  D4 combat, shrine, ambush/reward, and story rooms; three of five elites were
  defeated before the remaining fast/regenerating pair was safely stopped.
  The temporary Level 20/1199 Souls profile was deleted through Manage Data.
  The local fix now bounds D4 corruption to one surge per room and limits each
  Regenerating elite to a finite 25% maximum-health recovery budget. This does
  not change the C1 score until a fresh route rerun proves the room is playable.

A separate fresh temporary Mage profile verified the patched local shell
through Dungeon 1 Normal content including first combat, shrine, event,
treasure, elite, and a later cleared combat room. It reached Level 7, so the
Dungeon 4 route remained correctly locked; the temporary profile was safely
deleted and the retained Mage/Barbarian profiles were unchanged. This adds
clean-profile D1 progression evidence but does not close the D4 rerun or
D1-8 acceptance gates.

## Completed

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Baseline preservation and Git checkpoint | Complete | Baseline tag `code-quest-lab-baseline-2026-08-04`; backup recorded in `STATUS.md`; `main` is clean and synchronized with `origin/main` | Reuse the baseline; reopen only for a verified defect | GitHub access for future milestone pushes | Yes | Do not restart the baseline audit |
| Joey creative-reference audit | Complete as an audit and content ledger | `CREATIVE_REFERENCE_AUDIT.md` records the reference hash, preserved story/dialogue/endings, missing classes, later content, D16 Phase 4 gap, and Smelter contradiction | Implement only through isolated parity milestones; do not replace the current source wholesale | Product decision if any audited content is promoted into V1 | The audit is V1 governance; most parity content is deferred | Preserve the ledger and work from the active checkpoint |
| Product direction and V1 scope lock | Complete | `PRODUCT_VISION.md`, `V1_SCOPE.md`, `TARGET_AUDIENCE.md`, `MONETISATION.md`, and `DECISIONS.md` define teen-first, touch-first, offline, privacy-minimal, optional-learning, and fair-monetisation boundaries | Owner review and final release decisions remain | Owner approval of ratings, privacy, and commercial position | Yes | Keep new ideas in `BACKLOG.md` unless release-critical |
| Source mirror, release contracts, build and static package | Complete for the current checkpoint | `npm.cmd run release:verify` passed; `index.html` and the downloadable mirror match; `dist\` contains 17 expected files and matches native web bundles | Repeat after each major milestone and before RC | Node/npm environment | Yes | Keep the verification command green |
| Versioned plain-text profile transfer | Complete at local web/package boundary | Manage Data exports a `CODE QUEST LAB PROFILE EXPORT` `.txt` envelope containing durable data, a valid backup, and any valid active-run checkpoint; a real browser file-chooser upload imported a matching Level 4 Barbarian copy without changing the original; 81 tests and export/import smoke pass | Cross-device/cross-version fixtures and future-class migration evidence remain open | Clean storage profiles and representative supported surfaces | No; supports save portability | Keep the format stable while completing the later migration evidence |
| V1 navigation boundary and procedural route contracts | Complete as a release guard | `REGION_ORDER` exposes Dungeons 1, 2, and 4-8; automated contracts cover every shipped generator, route validation, boss endpoints, legacy checkpoint rejection, and the Dungeon 8 summary endpoint | Manually complete the bounded route before calling gameplay complete | Stable combat and manual QA | Yes | Validate the path in a clean profile; do not promote D9-16 yet |
| Core save parser/loader contracts | Complete at the tested code boundary | `parseCharacterSave`, `loadPermanentData`, backup promotion, defaults fallback, legacy mastery migration, checkpoint parsing, session lifecycle, and profile-transfer contracts are executable; 81 tests pass; a fresh local Mage survived page close/reopen, resumed the visible checkpoint, and finished safely | Native/device migration, corruption, suspension, and cross-version evidence | Clean profiles and representative devices | Yes | Continue the remaining native/device and migration evidence in Checkpoint 1/3 |
| Session recovery, pause/stop surfaces, and input hardening | Complete at the implemented browser contract boundary | Active-run checkpoint, Resume Session, Return to Town, Finish For Now, page-background save order, keyboard focus, touch/mouse attack paths, joystick release, and first-room onboarding are implemented and covered | Prove a complete 10-30 minute touch session and device behavior | Browser/device QA | Yes | Continue with clean-profile playthrough and lifecycle QA |
| Public review pages, safety boundaries, and local-first architecture | Complete as an implementation foundation | About, Educational Purpose, Privacy, Support, Contact, School Review, same-origin navigation, restrictive headers, no account/chat/analytics/ad runtime, and bounded educational claims are present and tested | Owner/legal review, hosting-log disclosure, school review, and final wording approval | Owner decisions and final hosting configuration | Yes | Keep the surfaces synchronized with the shipped build |
| Capacitor project scaffold and lifecycle seam | Complete as a scaffold | Android/iOS projects are generated and synced from `dist\`; landscape configuration, App lifecycle/back-button bridge, native entitlement discovery seam, and static native contracts pass | Native builds, hardware QA, Mac-side sync, permission review, and signing | Android JDK/SDK/Gradle; Mac/Xcode; owner accounts | Packaging is required for the stated product, but not complete | Resolve the owner/environment blockers without changing the web game |
| Entitlement boundary and development adapter | Complete as a non-purchasing core | Product identity validation, verified-source checks, parent gate, restore/revocation handling, fail-closed native discovery, and development adapter matrix pass; development adapter is excluded from `dist\` | Live StoreKit/Google Play adapters, sandbox transactions, pricing, refund flow, and owner approval | Store products, credentials, sandbox accounts, platform builds | Yes for a monetised release; not yet live | Keep the boundary; do not add a browser unlock shortcut |
| Current web deployment checkpoint | Complete for the 2026-08-07 Dungeon 2 progression/level-up milestone | Cloudflare Pages project `code-quest-lab`; source commit `9c451af` was pushed, preview `3edbf5d2` and the configured hostname passed production checks, and the live browser smoke reached profile creation, Town, Dungeon 1 start, a combat room, pause/finish, and cleanup; shell SHA-256 is `404D82FD0AC5DDF612540B28C13BCAE93FDE5CA05798BAA731C433230B793AEA` | Repeat the owner-approved publish after the next major tested milestone; full D1-8 combat/ending evidence remains separate | Owner-approved hosting access for future publishes | Yes | Resume the active D4-8 route and safe-stop evidence |
| Open-world product and architecture direction | Complete as a design decision; runtime implementation is intentionally staged | `OPEN_WORLD_DIRECTION.md` defines the connected-world player experience, region/landmark/dungeon layers, `WorldState` target, save boundaries, Joey-content preservation, and acceptance bar; the existing Town layout now also feeds a local schematic minimap; `DECISIONS.md` records the explicit owner direction | Implement and test the first World Atlas/region graph only after C1 playability and relevant save/input evidence are stable | C1 route completion, save migration design, touch/PWA evidence, and a major milestone scope decision | Open-world compatibility is required; full open-world expansion is post-C1 | Preserve the design target while completing C1; do not add untested destinations |
| AI expert playtest and first usability fixes | Playtest complete; grouped copy, Town orientation, and readability follow-up are deployed; initial attack response is reproduced; full progression evidence remains open | `AI_EXPERT_PLAYTEST.md` records the fresh 1024x768 live journey, zero browser diagnostics, open-world observations, combat readability findings, modifier concern, and prioritized recommendations; onboarding/Town copy, minimap, lock banner, enemy silhouettes, and HP-bar treatment are live in the checkpoint shell; the D2 elite playthrough reproduced a Corrupted summon escalation and local commit `6423ecb` bounds it with a finite budget | Continue the clean-profile C1 route and complete the touch/tablet lifecycle evidence; keep the local hardening fix under regression coverage before the next deployment | Supported browser/device input, C1 combat evidence, and stable build | Yes for release usability; open-world suggestions are staged | Re-test the corrected D2 elite room, then continue D1-8 evidence |

## Partially completed

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Full V1 gameplay and progression | Dungeon 1 touch-first slice is now player-completed; the full V1 path remains incomplete | `index.html` contains Town, four classes, combat, equipment, crafting, achievements, dungeon definitions, boss dispatches, and the D1-8 release guard; a disposable Mage cleared every observable D1 room, Stone Guardian, and exit portal, and the dead-summon handoff was fixed and contract-tested | Continue the bounded D1-8 path from a fresh profile; complete D2-8, final portal, and intended session ending, recording failures and balance issues | Clean browser profile, supported input surface, and stable combat | Yes | Continue from the next entrance with the developer QA aid, then capture a deliberate safe stop |
| 10-30 minute session design | Meaningful touch-first progression is proven; the complete safe-stop sequence is not yet field-validated | Checkpoint/autosave, pause/resume, session summary, next-step copy, optional Learning Support, and Finish For Now are in the shell and contracts; the latest touch-first run reached the D1 boss and portal, but did not capture the full pause/recover/summary/stop sequence | Observe a meaningful session on representative tablet-sized browsers/devices, including stopping and resuming without loss | Tablet/browser or device access and working combat input | Yes | Run the next D2 route segment and capture the complete safe-stop sequence |
| Save migration, corruption recovery, and lifecycle | Strong automated boundary, incomplete real-storage evidence | Save version 2, primary/backup recovery, migration, active-run checkpoint, page-background order, and deletion tests pass | Test malformed primary with backup, interrupted writes, reload/background/forced-close, baseline-to-current compatibility, and deletion in real browser/native storage | Isolated storage profiles and native devices | Yes | Use the existing tests as the guardrail and add only evidence-driven coverage |
| Tablet, touch, accessibility, and audio experience | Browser layout/input hardening exists; physical and full usability review is open | Live 1024x768 and local 390x844/540x720 passes; keyboard-focus target, touch joysticks, release fallbacks, reduced-motion/audio settings and safe-stop surfaces are present | Touch-only hardware testing, safe areas, readability, muted/headphones, reduced motion, full accessibility review, and no P1 usability defects | iPad/Android tablet or equivalent managed-browser environments | Yes | Complete the browser/device slice after the clean route is playable |
| PWA and offline behavior | Local shell and deterministic service-worker contracts pass | Relative manifest, v6 service worker, same-origin GET isolation, navigation-only fallback, public-page cache, and stopped-server reload evidence are present | Clean install/Add to Home Screen, deployed cache update, forced-close/offline soak, and physical device offline launch | HTTPS browser/device access | Yes for the web release | Run the PWA/offline journey as a separate major checkpoint |
| Creative parity beyond the current four classes and D1-8 | Preserved and documented, not runtime-complete | Current selectable `CLASS_ORDER` has Barbarian, Mage, Rogue, Druid; source-resident later bosses/story remain gated; Joey's reference adds Ranger, Necromancer, Alchemist, Paladin, extra sets/materials, and seven D16 Phase 4 attack families | Decide promotion scope; implement each class/content family with save, HUD, skills, equipment, balance, browser play, and milestone evidence | Product decision and substantial engineering/QA time | No under the locked V1 scope; preserve for post-V1 | Keep in backlog; do not mix with active C1 work |
| Website release readiness | Current deployment works, but RC publication evidence is not complete | Current production check passes and the 2026-08-04 deployment is recorded; public pages and headers are present | Re-run release/build/deploy/live verification for the final RC, reconcile owner-approved policy/support URLs and logs | Owner deployment approval and final build | Yes | Use the major-milestone protocol; no ad-hoc deploys |
| Native packaging | Project generation and sync are done; build/device path is open | `android\`, `ios\`, Capacitor config, generated assets, and lifecycle contracts exist; `native:doctor` reports Android configuration okay and Xcode absent | Build Android and iOS, regenerate the iOS package on Mac, test lifecycle/storage/audio/safe areas, and record artifacts | Environment blockers in `BLOCKERS.md` | Yes for iOS/Android release | Prepare exact commands and hand off owner-only environment actions |
| Monetisation and store integration | Core policy and fail-closed boundary exist; production transactions do not | `MONETISATION.md`, `platform\ENTITLEMENT_CONTRACT.md`, entitlement tests, parent gate, and development adapter are present | Integrate and test real platform adapters only after owner supplies products, accounts, sandbox data, pricing, and refund policy | Apple/Google accounts, product IDs, credentials, signed builds | Yes for a monetised release; not yet live | Keep production access fail-closed until verified |
| Compliance, licensing, and store materials | Drafts exist; owner approval is absent | `PRIVACY.md`, `LICENSES.md`, `ASSET_REGISTER.md`, `STORE_READINESS.md`, `SCHOOL_REVIEW.md`, and `OWNER_ACTIONS.md` identify the open decisions | Confirm code/asset rights, age/content rating, privacy/log treatment, school requirements, icon/screenshot/feature graphic, metadata, and support route | Owner/legal/platform decisions | Yes for public/store release | Resolve owner actions in dependency order |

## Not started

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Manual clean-profile completion of every shipped V1 dungeon and ending | Partial evidence only; not complete | The latest 2026-08-05 1024x768 Pages-preview Mage run showed click damage, defeated enemies, progressed through shrine/treasure, and reached `Gladiator Pit` before ending; automated generators do not simulate a player | Produce a dated, reproducible D1-8 completion record with bosses, endpoint, rewards, ending, and no browser diagnostics; then validate touch/tablet lifecycle behavior | Stable gameplay, working supported input, and enough time/device access | Yes | Continue the clean route from the now-confirmed first-combat response |
| Cross-version save soak from baseline to RC | Not started as end-to-end evidence | Parser fixtures and mocked loader matrices exist, but no recorded baseline-save-to-RC browser/native run | Load a preserved baseline save, migrate it through the RC candidate, verify progression/equipment/dialogue and backup behavior | Baseline backup, RC build, isolated profiles | Yes | Add to the save checkpoint after C1 playability |
| Live StoreKit and Google Play transaction evidence | Not started | No platform adapter implementation or sandbox transaction record exists | Build adapters, purchase/restore/revoke tests, parent-gate review, and offline verified entitlement behavior | Owner products, store access, sandbox accounts, signed native builds | Yes for paid native release | Remain blocked; do not simulate completion |
| Signed/native build artifacts and physical-device release QA | Not started | No Android APK/AAB or iOS Xcode build/device evidence is present | Produce supported debug/release builds and test representative phone/tablet hardware | JDK/Android SDK; Mac/Xcode; signing | Yes for the stated iOS/Android goal | Complete environment setup first |
| Final store artwork, metadata, and submission packet | Not started | Only local icon/logo/loading assets and draft metadata exist | Capture approved screenshots, feature graphic, descriptions, ratings, privacy/data-safety answers, and review notes | Owner approvals and stable RC build | Yes for store submission; not needed for current web checkpoint | Prepare after native/UI stability |
| Two consecutive full release audits and RC report | Not started | `RELEASE_AUDIT.md` is a non-RC audit; no `RELEASE_CANDIDATE_REPORT.md` exists | Run the full test plan twice, resolve P0/P1 issues, freeze/version the build, and write the RC report | All prior checkpoints | Yes | Make this the final gate, not a documentation shortcut |

## Blocked

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies / exact owner action | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Android build | Blocked by the current machine | `npm.cmd run native:doctor` reports Android configuration but no JDK; `JAVA_HOME` is empty and `java` is missing | Run `npm.cmd run native:android:build` and record the artifact | Owner provides a Windows/CI machine with supported JDK, Android SDK/platform tools, and Gradle access | Yes for Android release | Do not repeatedly retry locally; use the documented owner action |
| iOS build | Blocked by the current machine | `native:doctor` reports Xcode is not installed; Windows cannot run `xcodebuild` | On Mac, rerun native sync, open `ios\App\App.xcworkspace`, build and test | Owner provides Mac/Xcode, signing configuration, and regenerates the Mac-side Swift package path | Yes for iOS release | Hand off the exact Mac steps in `OWNER_ACTIONS.md` |
| Live monetisation | Blocked by owner/platform access | No StoreKit/Play products, IDs, sandbox accounts, or credentials are present; current adapter is intentionally fail-closed | Implement platform adapters and run sandbox purchase/restore/revocation tests | Owner creates products, supplies IDs/sandbox instructions, and approves price/refund policy; credentials must stay out of Git | Yes for monetised native release | Keep the development adapter test-only |
| Legal, commercial, age, privacy, and school decisions | Blocked by owner decisions | `LICENSES.md`, `PRIVACY.md`, `STORE_READINESS.md`, and `OWNER_ACTIONS.md` explicitly mark rights, ratings, log treatment, support/privacy wording, and school requirements as open | Obtain approvals and update the records | Owner confirms code/asset rights, final name/rating, hosting logs, privacy/support text, and school allowlisting requirements | Yes for public/store release | Resolve before calling the project RC |
| Future major-milestone publication | Gated, not currently blocking local work | The current deployment is already verified; the local copy/usability fixes are incomplete, and the user requires stable tested checkpoints | Publish only the next substantial tested milestone and verify its live package | Owner-approved Cloudflare/GitHub publication access for that milestone | Yes for each release checkpoint | Do not deploy this incomplete review alone |

## Deferred from Version 1

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for Version 1? | Recommended next action |
|---|---|---|---|---|---|---|
| Ranger, Necromancer, Alchemist, and Paladin parity | Deferred, creative direction preserved | Names, skills, resources, passives, skill trees, class sets, and materials are recorded in `CREATIVE_REFERENCE_AUDIT.md`; current runtime exposes four classes | Implement in isolated post-V1 parity milestones if promoted | Product decision, design/engineering/QA capacity | No under current V1 lock | Preserve exact names and mechanics in backlog |
| Dungeons 9-16, later rewards/progression, and D16 Phase 4 | Deferred, source content retained and release-gated | Later dungeon definitions/boss dispatches and Bob/Pure Corruption/Last Light content remain in source; `REGION_ORDER` intentionally excludes D9-16; Phase 4 IDs are absent | Finish route, rewards, progression, save, dialogue, balance, device play, and Phase 4 mechanics before exposure | Content QA and explicit scope promotion | No under current V1 lock | Keep the D1-8 guard until evidence exists |
| Forge Smelter activation | Deferred, engine/data present but UI exposure is withheld | Current source contains recipe data/renderer and no active Forge navigation button, avoiding Joey's contradictory “no recipes” surface | Reconcile UI, recipes, costs, save behavior, and tests before exposure | Design decision and end-to-end QA | No unless promoted | Do not re-add a placeholder |
| Accounts, cloud saves, multiplayer, chat, UGC, analytics, ads, and live services | Deferred/excluded by safety decision | `DECISIONS.md`, safety contracts, privacy docs, and V1 scope prohibit them | No V1 implementation; reconsider only through a new privacy/product decision | New product and privacy review | No | Do not add them to solve current save or engagement gaps |
| Full modular rewrite, controller support, cloud backup, and extra accessibility presets | Deferred after the stable V1 path | `BACKLOG.md` records modularization and controller/cloud work; current monolith remains protected by contracts | Promote only if a concrete release or maintainability need is documented | Stable parity tests and a scoped architecture decision | No for the current V1 release bar | Record improvements in backlog; do not reopen C0 |

## Current conclusion

The project has a real, tested release foundation and a verified playable web
checkpoint. It is not yet a Release Candidate because the most important
remaining evidence is player-completed V1 progression and lifecycle/device QA,
followed by native, monetisation, owner, and final audit gates. The next task is
therefore the active Checkpoint 1 clean-profile playthrough, not another audit,
rewrite, or deployment.
