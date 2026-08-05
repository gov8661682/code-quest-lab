# Code Quest Lab - Completed Work Ledger

Updated: 2026-08-05

This is the canonical record of work that should not be repeated. Reopen an
item only for a failing test, confirmed regression, changed dependency, or a
documented acceptance-criterion failure. Optional improvements belong in
`BACKLOG.md`.

## Completed baseline and direction

| Work | Evidence | Reopen condition |
|---|---|---|
| Preserved the original playable repository and created a recoverable baseline | Tag `code-quest-lab-baseline-2026-08-04`, backup path recorded in `STATUS.md`, clean Git history | Only a verified defect or lost baseline evidence |
| Reviewed Joey's latest self-contained output as a creative reference | `CREATIVE_REFERENCE_AUDIT.md`; reference hash `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB` | Only if a new reference or a specific parity discrepancy is supplied |
| Recorded preserved story, Bob dialogue, classes, dungeons, bosses, endings, and missing parity content | Creative audit comparisons and exact named-content ledger | Only if implementation contradicts the ledger or a scope decision promotes content |
| Locked the teen-first, tablet-first, offline, privacy-minimal, optional-learning, and non-manipulative V1 direction | `PRODUCT_VISION.md`, `V1_SCOPE.md`, `TARGET_AUDIENCE.md`, `DECISIONS.md` | Only by an explicit product decision recorded in `DECISIONS.md` |
| Recorded Joey's explicit open-world product direction and staged technical target | `OPEN_WORLD_DIRECTION.md`, `PRODUCT_VISION.md`, `V1_SCOPE.md`, `DECISIONS.md`, and `ROADMAP.md`; no runtime open-world completion is claimed | Only when the owner changes the direction or a future open-world milestone is promoted |

## Completed release foundation

| Work | Evidence | Reopen condition |
|---|---|---|
| Source mirror and dependency-free verification loop | `index.html` equals `code-quest-lab-source.txt`; `npm.cmd run release:verify` passes | Mirror/test/build failure |
| Static/offline web foundation | Relative manifest, v6 service worker, local assets, public review pages, headers, deterministic `build-info.json` | A failing package/service-worker contract or changed release requirement |
| V1 route boundary | `REGION_ORDER` and progression contracts expose D1-8 only and reject post-release checkpoint bypasses | A route guard regression or explicit scope promotion |
| Save and active-run contract layer | Save parser/loader matrices, backup promotion/default fallback, checkpoint parser, lifecycle tests, and deletion coverage | A failing test or real data-loss/unsafe-resume evidence |
| Versioned plain-text profile transfer | `CODE QUEST LAB PROFILE EXPORT` preserves durable profile data, valid backup, and active-run checkpoint; Manage Data export smoke confirmed the current profile remained unchanged; import contract creates a new local profile and enforces the current class whitelist | A failing transfer contract, data-loss/overwrite evidence, or a promoted cross-version/device migration requirement |
| Browser input/session hardening | Focusable canvas; touch/mouse/joystick paths; release fallbacks; first-room onboarding; pause/resume/Finish For Now/recovery surfaces | A reproducible input, freeze, recovery, or P1 usability defect |
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
- The local follow-up commit `32d83d0` added page-background save-order test
  coverage and documentation/status corrections; it is not a new website
  milestone because the shipped shell did not change.
- On 2026-08-05, `npm.cmd run release:verify` passed 60 tests, a 17-file build,
  and the static-package audit; `npm.cmd run native:sync` passed. The earlier
  production check and deployed profile-transfer UI smoke remain valid for
  `9da1d0e`; hardening commit `5db6db5` is pushed to `origin/main`, while the
  stale-status follow-up is tested locally but is not deployed.

## Explicitly not completed by these records

The following must not be inferred from the completed work above: a full
player-completed D1-8 run, a complete ending, a physical-device test, a signed
native build, a live store transaction, cross-version/device save evidence,
owner/legal approval, or Release Candidate status.
