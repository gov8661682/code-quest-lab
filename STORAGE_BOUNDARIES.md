# Code Quest Lab - Storage Boundaries

Status: documented; device and cross-version evidence remain open (2026-08-04)

This document describes where the current release stores data. It does not
claim cloud backup, cross-device sync, or platform-store purchase verification.

## Shared web-layer rules

- The game stores profile progression, active-run checkpoints, and the verified
  entitlement cache in origin-scoped browser storage through the shared game
  core. Character data has a primary key and a local backup key; active runs
  have a profile-scoped checkpoint key.
- Save parsing is versioned and fail-closed. A malformed primary save can be
  replaced by a valid local backup; if both are unsafe, the game uses safe
  defaults and surfaces a recovery notice without treating corrupted data as
  valid progression.
- Deliberate Finish for Now, Return to Main Menu, and profile deletion have
  explicit lifecycle rules. Profile deletion removes the profile, backup,
  checkpoint, index entry, and active pointer. The product-level entitlement
  cache is a separate key, not character progression, and its persistence
  policy must remain aligned with the final platform purchase design.
- The service worker caches the game shell and first-party review pages only.
  It does not upload or cache user save records in a server-side store.
- The entitlement cache is separate from character progression. A local flag,
  URL parameter, DOM edit, or unverified adapter result cannot grant premium
  access in the production core.

## Website

- Web saves are scoped to the browser origin and the local browser profile.
  Clearing site data, using a different browser profile, or an unsupported
  browser storage eviction can remove access to local saves.
- The website has no login, account database, save API, analytics service, or
  cross-device sync endpoint. The public build intentionally remains a
  local-only free preview until an owner-approved web entitlement adapter is
  separately reviewed.
- A deployed HTTPS browser test must still verify first-cache launch, reload,
  background/foreground behavior, offline launch, and forced-close recovery.

## iOS and Android applications

- Capacitor packages the same `dist\` web core into the platform WebView. The
  current native projects do not add a separate game database or a cloud-sync
  service; app-local WebView storage is the intended save boundary.
- Installing the app on another device does not transfer a save through Code
  Quest Lab. Any operating-system backup or restore behavior is platform
  controlled and is not advertised as cross-device sync. It must be reviewed
  in the final privacy and store disclosures.
- Android's generated `allowBackup` setting and the final native permission
  set remain owner-reviewed decisions. iOS backup behavior and storage
  retention must be confirmed on supported hardware before release.
- Native pause, inactive app-state, resume, and Android back-button callbacks
  are wired to the shared lifecycle bridge, but signed builds and physical
  suspension/forced-close evidence are still required.

## Evidence and open verification

The current automated evidence covers versioned save parsing, backup promotion,
unsafe-save fallback, legacy mastery migration, checkpoint validation, profile
deletion, Return to Main Menu cleanup, Finish for Now persistence, and native
lifecycle callback routing. It does not replace:

- cross-version loading from the preserved baseline save through the release
  candidate;
- corruption, suspension, forced-close, and offline recovery on representative
  browsers and physical iOS/Android devices; or
- owner review of backup behavior, privacy wording, platform disclosures, and
  any future web/store adapter.
