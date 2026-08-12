# Code Quest Lab - Release Candidate Criteria

Status: pre-release, not yet an RC (2026-08-12)

Evidence must be recorded when a check is actually executed. A document or
assumption is not a passing test. The seven release surfaces below are tracked
separately so a green browser check cannot conceal a missing native build or
purchase test.

## 1. Web production build and deployment package

- [x] `index.html` and `code-quest-lab-source.txt` are an exact mirror.
- [x] `npm.cmd run release:verify` passes the static contracts, Node tests, and static build.
- [x] `dist\` contains the complete game, headers, manifest, service worker, deterministic `build-info.json`, local assets, and public review pages.
- [x] The static-package audit rejects stale extras, mismatched generated copies, source-map references, credential-like strings, external runtime resources, inaccurate review-page metadata, and stale Android/iOS web bundles.
- [x] Post-release dungeon sources are not reachable from V1 selection, waypoint, saved-world resume, or the boss-exit chain; the last validated endpoint uses the existing session summary.
- [x] Repeated route-generation contracts exercise every shipped V1 generator (Dungeon 1, 2, and 4-8) and validate connected paths with boss endpoints.
- [x] Owner approves deployment to the HTTPS production hostname for the 2026-08-04 checkpoint.
- [x] Deployed hostname, certificate, headers, support URL, privacy URL, and build identifier are verified by the production contract and live browser smoke for the 2026-08-12 World Atlas checkpoint (`7b961b9`, preview `79d7af68`).
- [x] No unexpected external request, debug secret, source-map leak, or inaccurate public metadata is present in the deployed package audit.

## 2. Progressive Web App and offline behaviour

- [x] Relative manifest and landscape orientation metadata are present.
- [x] Service worker caches the game shell and same-origin public review pages.
- [x] Service-worker contracts cover v6 cache replacement, stale-cache cleanup, same-origin request isolation, and navigation-only offline fallback.
- [x] Local browser shell reload worked after the development server was stopped.
- [ ] Clean-browser install and Add to Home Screen flow is tested on iPad/iPhone and Android hardware.
- [ ] Offline soak covers first cache, launch, gameplay, reload, public pages, and recovery after a forced close.
- [ ] Cache versioning and update behavior are tested against a deployed HTTPS build.

## 3. Desktop and tablet browser testing

- [x] Baseline desktop smoke passed at 1280x720, including profile creation, Town, movement/attack, reload, and pause/resume.
- [x] Landscape tablet HUD pass passed at 1024x768.
- [x] Narrow touch layout pass passed at 390x844 with touch controls visible and no browser errors.
- [x] Shared game canvas exposes a labelled keyboard-focus target and focuses on pointer input; the contract is covered by the release check and combat test.
- [x] Desktop WASD/arrow input preserves a bounded release nudge for short managed-browser key pulses and clears safely on blur/visibility changes.
- [x] Updated browser smoke passed after the native bridge and public links were added; console logs were empty.
- [ ] Clean profile completes the intended V1 dungeon path and ending.
- [ ] A meaningful 10-30 minute session, muted audio, headphones, suspension, and forced closure are tested on representative browsers/devices.
- [ ] No open P0/P1 browser usability or progression issue remains.

## 4. iOS application build

- [x] Capacitor iOS project is generated and synced from `dist\`.
- [x] App lifecycle plugin is registered, handles pause/inactive app-state/resume events, and the native orientation configuration is landscape-first.
- [ ] Project builds in Xcode on a supported Mac; current Windows evidence is the owner-only blocker recorded in `STATUS.md`.
- [ ] iPhone and iPad device smoke covers touch, safe area, status bar, pause/resume, audio muted/headphones, local saves, and offline launch.
- [ ] Bundle identifier, signing, privacy disclosures, icon set, and store metadata are owner-approved.

## 5. Android application build

- [x] Capacitor Android project is generated and synced from `dist\`.
- [x] App lifecycle/back-button bridge handles pause/inactive app-state/resume events and the activity is landscape-first.
- [ ] Debug/release Android build succeeds with a supported JDK, Android SDK, and Gradle environment; current `JAVA_HOME`/`java` absence is recorded.
- [ ] Android phone and tablet smoke covers touch, back button, safe area, status bar, audio muted/headphones, local saves, and offline launch.
- [ ] Application ID, signing, permission set, icon set, and store metadata are owner-approved.

## 6. Save-data reliability across supported platforms

- [x] Local active-run checkpoint recovery passed after browser reload.
- [x] Deliberate Return to Town clears the active-run checkpoint.
- [x] Profile data remains local-only and the Manage Data path is present.
- [x] Versioned save validation rejects malformed/unsupported shapes, promotes a valid local backup, and surfaces a recovery notice.
- [x] The shipped save validator has an automated fixture matrix for current/legacy-compatible, malformed, future-version, and invalid-shape inputs.
- [x] The exact production save loader has a mocked-storage matrix for valid primary data, backup promotion, unsafe primary/backup fallback, and retired legacy mastery-stat migration.
- [x] Local session-lifecycle contracts cover Return to Main Menu banking/checkpoint clearing, Finish For Now Town persistence, and active-profile deletion across all save keys.
- [ ] Save creation, loading, backup recovery, migration, corruption recovery, deletion, suspension recovery, and forced-closure recovery pass with evidence.
- [ ] Cross-version compatibility is tested from the baseline save through the RC build.
- [x] Web, iOS, and Android storage boundaries are documented without claiming cross-device sync in `STORAGE_BOUNDARIES.md`.

## 7. Platform-appropriate monetisation and entitlement handling

- [x] Product direction defines a free introduction plus a single non-consumable full-game unlock, with no ads, loot boxes, energy, gambling, FOMO, or random paid content.
- [x] Parent-gate, restore, revocation, offline entitlement, and platform-adapter requirements are documented in `MONETISATION.md`.
- [x] Shared verified-entitlement boundary and parent-gated unlock surface are implemented and separated from platform payment handling.
- [x] Shared core validates the full-unlock product identity and has a mocked matrix for ownership, duplicate callbacks, decline/pending, revocation, parent gating, adapter errors, and enforced free-user denial.
- [x] A non-purchasing development adapter models owned, not-owned, pending, revoked, unavailable, restore, and wrong-product results; it is tested and excluded from the public package.
- [ ] Owner-approved web entitlement is available if the owner chooses to support web purchases; the public browser build intentionally makes no payment request.
- [ ] Apple StoreKit adapter and sandbox purchase/restore tests pass.
- [ ] Google Play Billing adapter and test purchase/restore tests pass.
- [ ] Parent gate, clear price, restore path, refund/revocation handling, and local entitlement cache are reviewed on each platform.
- [ ] No browser payment shortcut or unverified local entitlement can unlock production premium content.

## Cross-cutting release gates

- [x] V1 direction is locked in `V1_SCOPE.md`; completion is not yet claimed.
- [x] Optional Learning Support is contextual, age-appropriate in the current product wording, on-device, and never required to play; automated contracts reject unsupported educational claims in the public review surfaces and current product metadata.
- [ ] Core play works without login, email, chat, external redirects, unrestricted web access, third-party advertising/tracking, or unnecessary device permissions.
- [ ] Required privacy, teen-safety, parental-gate, and age-appropriate presentation controls are implemented and owner-reviewed.
- [ ] All shipped assets and dependencies have documented commercial-use rights.
- [ ] Store metadata, support content, privacy policy, screenshots, icons, and feature graphics are prepared and internally consistent.
- [ ] `OWNER_ACTIONS.md` contains every remaining human-only action.
- [ ] Two consecutive full release audits produce no new P0/P1 issue.

The project must not be called a Release Candidate until every applicable item
is green, the final web/native/purchase evidence exists, and the final
checkpoint/report is written.
