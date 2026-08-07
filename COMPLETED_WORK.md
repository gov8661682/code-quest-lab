# Code Quest Lab - Completed Work Ledger

Updated: 2026-08-07

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
| Established bounded autonomous work and evidence-scored progress | `AUTORUN.md`, `CURRENT_CHECKPOINT.md`, D-018, and `tests/project-control-contracts.test.mjs`; 75-test release verification passes | Only if the control contract fails or the owner changes the working policy |
| Cleared stale static-room door status text | `updateRoomProgress` now clears `doorStatus.textContent` for Town/Entrance/Shrine/Treasure; focused lifecycle test and packaged local smoke pass | Reopen only if a supported surface still exposes stale status text |

| Touch-first D1 boss/portal slice | A disposable Mage completed the observable Dungeon 1 route through the Stone Guardian and exit portal with the session-only target lock; two disposable QA profiles were removed and the retained Mage/Barbarian profiles were verified unchanged | Reopen only for a route regression; full D1-8, ending, and safe-stop-session evidence remains in Checkpoint 1 |
| Boss dead-summon handoff | Boss-room progress counts live summons, discards dead summon objects after boss defeat, reopens the exit, and clears stale `CLEAR SUMMONS` text; the focused contract is part of the 80-test release gate | Reopen only if a defeated boss room remains locked or displays stale summon status |
| Dungeon 2 QA route and queued level-up clarity | A disposable Mage QA route completed Dungeon 2 Normal through the Fallen King and portal into The Shadow Realm Entrance; queued level-up cards now display their earned level and remaining choices; commit `9c451af`, 81-test release gate | Reopen only for a route regression, an upgrade overlay dead-end, or full D1-8 acceptance |
| Elite pacing and queued attack input hardening | Local disposable Mage QA cleared the D2 two-elite Executioner's Court after the shared post-modifier health budget was applied, completed the three-phase Fallen King, and entered The Shadow Realm Entrance; touch and desktop attack taps now wait for cooldown readiness; two focused contracts pass | Reopen only for a fresh-room pacing regression, a discarded ready-intent report, or full D1-8 acceptance |

## Completed release foundation

| Work | Evidence | Reopen condition |
|---|---|---|
| Source mirror and dependency-free verification loop | `index.html` equals `code-quest-lab-source.txt`; `npm.cmd run release:verify` passes | Mirror/test/build failure |
| Static/offline web foundation | Relative manifest, v6 service worker, local assets, public review pages, headers, deterministic `build-info.json` | A failing package/service-worker contract or changed release requirement |
| V1 route boundary | `REGION_ORDER` and progression contracts expose D1-8 only and reject post-release checkpoint bypasses | A route guard regression or explicit scope promotion |
| Save and active-run contract layer | Save parser/loader matrices, backup promotion/default fallback, checkpoint parser, lifecycle tests, and deletion coverage | A failing test or real data-loss/unsafe-resume evidence |
| Versioned plain-text profile transfer | `CODE QUEST LAB PROFILE EXPORT` preserves durable profile data, valid backup, and active-run checkpoint; a real browser file-chooser upload imported a matching Level 4 Barbarian copy with the same dungeon, highest room, run count, and play time while leaving the original untouched; import creates a new local profile and enforces the current class whitelist | A failing transfer contract, data-loss/overwrite evidence, or a promoted cross-version/device migration requirement |
| Browser input/session hardening | Focusable canvas; touch/mouse/joystick paths; release fallbacks; first-room onboarding; pause/resume/Finish For Now/recovery surfaces; bounded offscreen live-threat cue; immediate final-enemy room/HUD refresh | A reproducible input, freeze, recovery, or P1 usability defect |
| Local developer playtest aid | Loopback URL gate plus hidden key sequence toggles a session-only invincibility mode; focused contract and local runtime smoke passed; no save/export field and no public/native activation | A save/export leak, public-host activation, or runtime failure; keep it out of deployed builds unless explicitly promoted |
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
