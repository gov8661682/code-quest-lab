# Code Quest Lab - Major Checkpoints to Release Candidate

Updated: 2026-08-05

Only one checkpoint may be active. A checkpoint is complete only when its
acceptance criteria, tests, manual evidence, documentation, and required
GitHub/website checkpoint are complete. Minor fixes are grouped into the next
meaningful milestone and do not trigger a deployment by themselves.

## Checkpoint 0 - Baseline, creative direction, and release foundation

Status: **Complete**

- Objective: preserve the playable baseline, review Joey's latest output, lock
  the teen-first/offline V1 direction, and make the current web/native
  foundation verifiable.
- Included work: baseline backup and tag; creative reference audit; V1 scope,
  safety, monetisation, privacy, and QA records; source mirror; release tests;
  PWA shell; public review pages; static package; generated Capacitor projects;
  entitlement/lifecycle seams; session recovery and input hardening; D1-8
  release guard; first desktop/tablet web checkpoint.
- Excluded work: full D1-8 player completion, new classes, D9-16 promotion,
  live billing, native builds, physical-device QA, store submission, and legal
  approval.
- Dependencies: existing baseline, Joey reference, Node/npm, configured GitHub
  and Cloudflare Pages access.
- Acceptance criteria: baseline preserved; reference findings recorded;
  product documents agree; the static package builds; release contracts and
  tests pass; the web checkpoint is playable and live-verified.
- Required tests: `npm.cmd run release:verify`, native sync, production check,
  desktop/tablet browser smoke, source mirror and static-package audit.
- GitHub and website deployment: required and complete; commit `bf07810` was
  pushed and deployed on 2026-08-04, with build shell hash
  `F4A12AD085F8AF3E7272CFDB03AEAC82DFA6F6205836270A192D2A8B1D085FD3`.
- Completion evidence: `CREATIVE_REFERENCE_AUDIT.md`, `RELEASE_AUDIT.md`,
  `STATUS.md`, commit `bf07810`, primary hostname, and Pages preview.
- Next checkpoint: Checkpoint 1.

## Checkpoint 1 - Core game stability and complete V1 path

Status: **Active**

- Objective: prove that a clean profile can enjoyably complete the locked V1
  D1-8 route and safely stop, resume, or recover a meaningful session.
- Included work: clean-profile onboarding; four current classes; combat rooms,
  bosses, rewards, progression, final V1 endpoint and intended ending;
  10-30 minute session shape; pause/resume; Finish For Now; session summary;
  optional Learning Support; touch-first and desktop fallback behavior; a
  versioned local plain-text profile transfer; fixes for verified P0/P1
  gameplay defects.
- Excluded work: Ranger/Necromancer/Alchemist/Paladin, D9-16, D16 Phase 4,
  Smelter activation, live billing, native signing, and non-critical refactors.
- Dependencies: current web build, clean browser storage, stable input, and
  representative tablet-sized browser access.
- Acceptance criteria:
  1. A fresh profile completes the D1-8 route, bosses, rewards, final portal,
     and intended session ending without a critical defect.
  2. A touch-first 10-30 minute session has a clear objective, checkpoint,
     autosave, pause/resume, summary, next step, and safe stop.
  3. Reload/background/forced-close simulation recovers the latest safe state;
     deliberate finish clears the active-run checkpoint and preserves Town
     progression.
  4. Keyboard/mouse and touch paths remain usable and no P0/P1 issue is open.
  5. The profile-transfer contract preserves durable data, a valid backup, and
     any active-run checkpoint; import never overwrites the current profile.
  6. Automated tests, status records, and the checkpoint changelog are green.
- Required tests: `npm.cmd run release:verify`; targeted progression, combat,
  save, profile-transfer, session-lifecycle, and learning-support tests;
  clean-profile browser
  playthrough; touch-only session; pause/reload/finish/recovery; browser log
  capture; and a fresh production build.
- GitHub and website deployment: required only after all criteria are met and
  the milestone is stable; commit, push, deploy the tested build, run
  `production:check`, and verify live desktop/tablet flow before completion.
- Completion evidence: dated manual records with viewport/device, profile,
  route, boss/ending result, session duration, save/recovery result, browser
  diagnostics, test output, commit, deployment URL/hash, and status update.
- The save-portability/readability work was accepted as a stable sub-milestone
  within C1: commit `9da1d0e` was tested, pushed, deployed, and live-verified on
  2026-08-05. That checkpoint does not complete C1 without the full D1-8
  player-completion evidence above.
- Next checkpoint: Checkpoint 2 after all criteria are met.

## Checkpoint 2 - Tablet, browser, PWA, and offline readiness

Status: Pending; foundation complete, field evidence open.

- Objective: prove the web game is touch-friendly and reliable on the intended
  browser and managed-device surfaces.
- Included work: landscape tablet touch-only flow; safe areas; readable HUD;
  joystick edge-release; keyboard/mouse fallback; muted audio/headphones;
  reduced motion; Add to Home Screen; cache update; offline launch/play/reload;
  public review pages; restricted-network behavior.
- Excluded work: platform billing, store submission, new creative classes, and
  cloud services.
- Dependencies: Checkpoint 1 playable route, HTTPS deployment, and iPad/Android
  tablet or equivalent browser/device test environments.
- Acceptance criteria: touch-only play works at representative 10-13 inch
  landscape sizes; no P0/P1 layout/input defect; safe stop/reload/offline
  behavior is understood; all public routes remain readable; no unexpected
  external request or permission is needed for normal play.
- Required tests: release verification; PWA install/cache/update/offline soak;
  clean browser public-route check; touch joystick release and center-tap;
  safe-area/readability/audio/reduced-motion checks; production check.
- GitHub and website deployment: required after the tested tablet/PWA milestone
  and live verification; not for individual UI tweaks.
- Completion evidence: device/browser matrix, screenshots or recordings where
  useful, offline/cache result, commit, deployment date/hash, and status entry.
- Next checkpoint: Checkpoint 3.

## Checkpoint 3 - Save reliability, migration, and lifecycle persistence

Status: Pending; automated boundary is strong, real-storage evidence open.

- Objective: make profile and active-run data recoverable across supported web
  and native lifecycle events without claiming cross-device sync.
- Included work: create/load/switch/delete; version migration; primary/backup
  recovery; malformed/corrupt data; interrupted writes; background/suspend;
  forced-close/relaunch; baseline-to-candidate compatibility; entitlement
  separation; Manage Data verification.
- Excluded work: cloud saves, accounts, multiplayer, or a broad data-layer
  rewrite.
- Dependencies: Checkpoint 1/2 gameplay, baseline backup, browser storage
  profiles, Android build, and iOS build where available.
- Acceptance criteria: safe recovery and deletion are demonstrated on every
  supported surface; no loss or unsafe resume; cross-version behavior is
  recorded; storage boundaries remain truthful.
- Required tests: all save/checkpoint/session/native lifecycle tests; real
  browser corruption and backup-promotion scenarios; suspension/forced-close;
  baseline-to-current migration; Android/iOS local storage checks.
- GitHub and website deployment: required after the stable save migration
  milestone; deploy the exact tested web build and verify it live.
- Completion evidence: fixture and manual matrix, migration notes, commit,
  deployment hash/date, and updated `STORAGE_BOUNDARIES.md`/status.
- Next checkpoint: Checkpoint 4.

## Checkpoint 4 - Website production readiness and release deployment

Status: Pending for the final release candidate; current checkpoint foundation
is already deployed and verified.

- Objective: ensure the public web package is the exact tested artifact and is
  safe to serve to students, families, schools, and reviewers.
- Included work: final static build; exact package/native-copy audit; headers;
  manifest/service worker; public review pages; build identity; clean-host
  production check; live desktop/tablet smoke; deployment record.
- Excluded work: native store submission, live payments, and promotion of
  deferred creative content.
- Dependencies: all prior web-facing criteria, owner-approved hosting and
  policy URLs.
- Acceptance criteria: tested artifact is deployed to the configured hostname;
  root, manifest, service worker, assets, review routes, headers, and build
  identity pass; live play reaches the verified flow with no diagnostics.
- Required tests: `npm.cmd run release:verify`, production check, clean-browser
  route checks, live desktop/tablet smoke, and package hash comparison.
- GitHub and website deployment: mandatory for this milestone and every later
  major milestone; never publish a broken or incomplete build.
- Completion evidence: commit/push, deployment URL/date, Pages preview if used,
  shell hash, production-check output, and status/changelog entry.
- Next checkpoint: Checkpoint 5.

## Checkpoint 5 - Native packaging and managed-device readiness

Status: Pending; currently blocked by owner environments.

- Objective: produce buildable, testable iOS and Android shells for the same
  verified web game.
- Included work: Android JDK/SDK/Gradle build; iOS Mac/Xcode build; landscape
  orientation; safe area/status bar; App lifecycle/back button; local saves;
  muted/headphones; offline launch; permission audit; debug/release artifacts.
- Excluded work: store submission and live transactions.
- Dependencies: Checkpoint 3, owner-provided JDK/Android SDK/Gradle, Mac/Xcode,
  signing setup, and representative hardware.
- Acceptance criteria: Android and iOS projects build; physical or approved
  simulator/device smoke passes; generated artifacts and configuration are
  recorded; no unnecessary permission or external redirect is introduced.
- Required tests: `native:sync`, `native:doctor`, Android build, Xcode build,
  native lifecycle contracts, phone/tablet device matrix, offline/save/audio
  checks.
- GitHub and website deployment: a website checkpoint is required if the web
  shell changes; native-only fixes receive a GitHub milestone and deploy only
  when they also change the tested web artifact.
- Completion evidence: build artifacts/logs, device matrix, commit, and any
  website deployment record.
- Next checkpoint: Checkpoint 6.

## Checkpoint 6 - Parent-safe monetisation and entitlement readiness

Status: Pending; core boundary complete, live platform work blocked.

- Objective: make the one-time full-game unlock legitimate, transparent,
  parent-gated, verifiable, and recoverable.
- Included work: StoreKit and Google Play adapters; product identity; purchase,
  restore, pending, decline, revocation, refund, offline verified cache;
  parent gate; platform review; optional web policy decision.
- Excluded work: ads, loot boxes, gambling, energy/scarcity, FOMO, behavioral
  tracking, or an unverified browser unlock.
- Dependencies: signed native builds, owner-created product IDs, sandbox
  accounts, price/refund policy, privacy review, and owner credentials outside
  Git.
- Acceptance criteria: sandbox transactions and all failure states pass;
  only verified platform results unlock; restore/revocation are safe; parent
  gate and price are clear; no browser shortcut exists.
- Required tests: entitlement contract matrix, development adapter matrix,
  platform sandbox tests, offline/restore/revocation, parent-gate manual review,
  and package audit proving test adapters are not public.
- GitHub and website deployment: required after the tested entitlement
  milestone; deploy only the matching web artifact and verify live behavior.
- Completion evidence: product IDs (without secrets), sandbox logs, test output,
  commit, deployment date/hash, and owner approval record.
- Next checkpoint: Checkpoint 7.

## Checkpoint 7 - Compliance, privacy, assets, and store materials

Status: Pending; owner decisions open.

- Objective: make the release truthful, age-appropriate, licensable, and
  reviewable by platform and school administrators.
- Included work: final name/rating; dialogue/fantasy-violence review; privacy
  and infrastructure-log treatment; support route; code/asset rights; icons,
  screenshots, feature graphic, metadata, data-safety answers, school review
  notes, and parental wording.
- Excluded work: unsupported educational claims, bypassing MDM/network controls,
  and adding unapproved tracking or permissions.
- Dependencies: stable RC candidate, owner/legal review, platform requirements,
  and final hosting configuration.
- Acceptance criteria: every shipped asset has provenance; public/store copy
  matches the build; required privacy, age, and school decisions are approved;
  no misleading learning or monetisation claim remains.
- Required tests: product-safety contracts, clean public-route review, asset
  register/license audit, privacy/data-safety review, age-appropriateness
  review, and school-managed-device review.
- GitHub and website deployment: deploy the approved, tested web package as a
  major checkpoint and verify every public route.
- Completion evidence: signed owner decisions, asset register, screenshots,
  metadata, test output, commit, deployment record, and status update.
- Next checkpoint: Checkpoint 8.

## Checkpoint 8 - Full QA, balancing, accessibility, and release readiness

Status: Pending.

- Objective: remove release-critical defects and demonstrate the entire
  product against the Release Candidate Criteria.
- Included work: full test plan; two complete audits; balance/difficulty;
  performance; accessibility/readability; touch/keyboard/mouse; audio;
  offline; saves; native; monetisation; privacy; school review; regression;
  release notes.
- Excluded work: optional post-V1 classes/dungeons, broad refactors, and new
  engagement systems.
- Dependencies: Checkpoints 1-7, available devices, owner decisions, and stable
  release candidate build.
- Acceptance criteria: all applicable `RELEASE_CRITERIA.md` items are green or
  explicitly tied to a documented owner action; no unresolved P0/P1 defect;
  two consecutive full audits produce no new P0/P1 issue.
- Required tests: `npm.cmd run release:verify`, native/store tests, full manual
  matrix, production check, live browser smoke, security/dependency audit, and
  two release audit records.
- GitHub and website deployment: mandatory for the major release-readiness
  checkpoint; deploy and live-verify the tested artifact.
- Completion evidence: audit reports, test matrix, known-issue disposition,
  commit, deployment date/hash, and status/changelog update.
- Next checkpoint: Checkpoint 9.

## Checkpoint 9 - Release Candidate

Status: Pending.

- Objective: freeze and accurately label a build that meets the stated web,
  iOS, Android, monetisation, privacy, and store-readiness bar.
- Included work: final versioning; freeze; RC report; final web/native artifacts;
  release notes; owner approval and handoff.
- Excluded work: untested last-minute features, scope expansion, and public
  submission without owner approval.
- Dependencies: every prior checkpoint and all named owner actions resolved or
  accepted as explicit release blockers under the product owner's direction.
- Acceptance criteria: all applicable Release Candidate Criteria are green;
  final tests and live checks pass; artifacts are reproducible; no P0/P1 issue;
  creative direction is preserved; `RELEASE_CANDIDATE_REPORT.md` exists.
- Required tests: final full verification, two audits, clean-profile route,
  device matrix, store sandbox matrix, offline/save checks, production check,
  and live website smoke.
- GitHub and website deployment: mandatory final checkpoint; commit and push the
  frozen RC, deploy the tested web build, verify it live, and record the exact
  commit/date/hash. Store submission or public publication still requires owner
  approval.
- Completion evidence: RC report, GitHub commit/push, deployment record, device
  and store evidence, owner approvals, and final status.
- Next checkpoint: none; post-RC parity/content work returns to the backlog.

## Open-world design gate (cross-cutting, not an active checkpoint)

The explicit open-world direction is a product constraint that shapes later
implementation; it does not create a second active checkpoint or bypass C1.
Before an open-world foundation milestone can be accepted, it must provide a
tested World Atlas/region graph, at least one optional landmark, persistent
discovery and safe return, honest unavailable-content states, save migration,
offline behavior, and a playable 10-30 minute touch path. It must then follow
the same GitHub and website checkpoint protocol as every other major milestone.
The canonical design target is `OPEN_WORLD_DIRECTION.md`.

## Progression rule

The active checkpoint is Checkpoint 1. Complete its highest-priority unmet
criterion, record evidence, and only then advance. The four missing classes,
D9-16, D16 Phase 4, and Smelter remain preserved creative work but are not
silently promoted into V1 or allowed to interrupt the current release path.
