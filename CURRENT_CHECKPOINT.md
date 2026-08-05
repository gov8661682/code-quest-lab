# Code Quest Lab - Current Checkpoint

Updated: 2026-08-05

## Current checkpoint

**Checkpoint 1 - Core game stability and complete V1 path**
Status: **Active; not complete**

## Current objective

Prove that a clean profile can complete the locked Version 1 Dungeon 1-8 path
and that a touch-first 10-30 minute session can pause, recover, summarize, and
stop without losing progress. Preserve the existing story, classes, combat,
dungeon, boss, dialogue, and ending direction while fixing only verified
defects. Shape the implementation so Town, entrances, waypoints, and saved
world locations can grow into the explicit compact open-world direction without
expanding the untested V1 content boundary.

## Completed acceptance criteria

- The current four-class browser game launches and has a tested profile/Town/
  entrance/trial/modifier/first-combat flow.
- Dungeons 1, 2, and 4-8 have route-generation/validation contracts and the
  V1 release guard prevents D9-16 from selection, waypoint, saved-world resume,
  or boss-exit bypasses.
- Active-run checkpoints, Resume Session, Return to Town, Finish For Now,
  session summary, optional contextual Learning Support, and page-background
  save paths exist and are contract-tested.
- Keyboard/mouse and touch/joystick input contracts, canvas focus, bounded
  first-room onboarding, and safe release fallbacks are covered.
- `npm.cmd run release:verify` passed on 2026-08-05: release contracts, 60 Node
  tests, a 17-file static build, and the static-package audit. The new
  session-transient UI and no-waypoint cleanup contracts are included.
- The versioned local profile-transfer contract preserves durable profile data,
  a valid backup, and an active-run checkpoint; import creates a new profile
  without overwriting the current profile. The local Manage Data export smoke
  also passed for a synthetic Mage profile, which was deleted afterward.
- The last major web checkpoint is live-verified at
  `https://code-quest-lab.gov8661682.com/` and the current production check
  passes.

## Remaining acceptance criteria

1. Complete a fresh profile through the full bounded D1-8 route, including
   rooms, bosses, rewards, final portal, and intended session ending.
2. Record a meaningful 10-30 minute touch-first session with a clear objective,
   checkpoint/autosave, pause/resume, summary, next step, and safe stop.
3. Demonstrate reload/background/forced-close recovery and deliberate finish in
   real browser storage without data loss or unsafe resume.
4. Verify the current route and recovery behavior on representative
   tablet-sized browser surfaces, with no P0/P1 defect or browser diagnostics.
5. Run the relevant tests/build again after any evidence-driven fixes, update
   status/changelog, and complete the GitHub + website checkpoint before
   marking this checkpoint complete.

## Active tasks

1. Continue the highest-priority clean-profile, touch-first D1-8 playthrough;
   record the first failing room/system if the run cannot complete. A fresh
   1024x768 Pages-preview Mage run now produced visible first-hit feedback,
   defeated enemies, cleared the opening route rooms, and reached the Elite
   room before ending; the full D1-8 route is still unproven.
2. Exercise the existing pause, page-background, reload, Finish For Now, and
   recovery paths around the clean run, including a meaningful 10-30 minute
   touch-first session.
3. Keep the deployed profile-transfer and grouped enemy/door readability
   changes under regression coverage. The local follow-up also clears stale
   dungeon lock and waypoint messages when a session returns to Town; combat
   calculations remain unchanged.
4. Continue the clean-profile D1-8 route on a representative supported
   surface. Initial attack response is now reproduced on the Pages preview;
   the save/readability milestone has passed its tests, GitHub push, deployment,
   and live verification, while C1 remains active because D1-8 completion and
   tablet/lifecycle evidence are still open.

The open-world design is now recorded in `OPEN_WORLD_DIRECTION.md`. It is a
product/architecture constraint for future implementation, not permission to
skip the active C1 route, save, input, and session acceptance criteria.

## Latest active-checkpoint QA evidence

- On 2026-08-05, the configured production hostname was tested at 1024x768
  with a fresh Barbarian profile created for this run. The profile reached
  Town, the Dungeon 1 entrance, Normal trial, modifier selection, and three
  first-combat rooms: `Ashen Pit`, `Crypt Passage`, and `Dark Corridor`.
- The run reached the bounded read-and-respond onboarding surface and normal
  defeat/recovery flow each time, with no browser error or warning diagnostics.
  Three controlled attempts did not produce a visible enemy defeat: a touch
  Attack-joystick drag, a touch Attack-joystick tap plus movement, and
  repeated desktop canvas clicks. This is an incomplete gameplay result, not a
  confirmed product-side combat defect; the browser harness/input delivery
  must be reproduced on another supported surface before implementation is
  changed.
- The temporary QA profile was deleted through the in-game Manage Data
  confirmation. No pre-existing profile data was present at the start of this
  run.
- After the 2026-08-05 deployment checkpoint, a fresh Mage probe on the Pages
  preview at 1024x768 reached Dungeon 1 `START Ancient Entrance` with no
  browser diagnostics but did not transition from room 0 after the tested
  managed-browser movement/interaction inputs. The temporary profile was
  deleted; this is additional input/route evidence, not a confirmed combat
  calculation defect.
- A subsequent fresh Mage run on the same 1024x768 Pages-preview surface
  entered `Burial Hall`, showed a visible damage response and HP change after
  a canvas click, defeated enemies, progressed through a shrine and treasure
  room, and reached `Gladiator Pit` before the session ended. No browser
  diagnostics were recorded; the controlled run did not complete the full
  D1-8 route.
- A local fresh-Mage regression run reached `Shadow Hall`, displayed the
  normal defeat summary, and used `Finish For Now`. The returned Town screenshot
  was visually free of the old dungeon lock/waypoint messages; the known
  synthetic Mage profile was deleted afterward, while an unrelated existing
  Barbarian profile was left untouched.
- The AI expert review is recorded in `AI_EXPERT_PLAYTEST.md`. It confirms
  Town's useful hub foundation but finds that the current dashboard/route flow
  still feels menu-driven, the minimap/landmarks do not yet communicate an open
  world, and first-combat enemy/lock feedback needs improvement.

## Known blockers

- Android build evidence requires an owner-provided JDK, Android SDK/platform
  tools, and Gradle environment; the current machine has no `JAVA_HOME` or
  `java` command.
- iOS build evidence requires an owner-provided Mac/Xcode environment; the
  current Windows machine has no `xcodebuild`.
- Live StoreKit/Google Play work requires owner-created products, IDs, sandbox
  accounts, signing, and platform access.
- Physical-device, legal, commercial-rights, privacy/log, age-rating, school,
  and store-material approvals remain owner actions.

These blockers do not prevent the browser-side Checkpoint 1 work.

## Last verified Git commit

- Unreleased local hardening: `5db6db5` (`Fix stale session status cleanup`),
  pushed to `origin/main` on 2026-08-05; tests and package sync pass, but this
  minor follow-up is intentionally not a separate website deployment.
- Runtime/milestone: `9da1d0e` (`Add local profile transfer and combat readability`)
- Prior stable runtime: `32d83d0` (`Harden page-background save coverage`)
- Control record: `194bcc5` (`Record project checkpoint controls and QA gap`)
- Branch: `main`; milestone commit `9da1d0e` records the open-world direction,
  AI expert playtest, synchronized copy-only usability fixes, profile transfer,
  and grouped readability changes; its GitHub/website checkpoint is verified
- Baseline tag retained: `code-quest-lab-baseline-2026-08-04`

## Last verified website deployment

- Commit: `9da1d0e` (`Add local profile transfer and combat readability`)
- Deployment date: 2026-08-05
- Primary: `https://code-quest-lab.gov8661682.com/`
- Preview: `https://8d5f404a.code-quest-lab.pages.dev/`
- Shell SHA-256: `3A39EF4158EA494523FE04323D5D40BAA082E4C09F526A499707C3656EF139DA`
- Current read-only production check: passed on 2026-08-05

The verified milestone shell includes the existing-Town minimap, copy-only
fixes, versioned profile transfer, and grouped readability fixes. The preview
live smoke reached profile creation, Town, pause/finish, Manage Data export,
and cleanup; the configured hostname loaded with no browser diagnostics and
the existing primary-origin Mage profile was left untouched. The next step is
to resume the active Checkpoint 1 attack-response and clean-profile route
evidence.

## Exact condition required to advance

Advance to Checkpoint 2 only when every remaining acceptance criterion above is
supported by dated manual evidence, relevant automated tests and a successful
production build; no unresolved P0/P1 issue remains; project status,
changelog, backlog, blockers, and checkpoint records are updated; and the
stable milestone has been committed, pushed, deployed, and live-verified.

Do not advance merely because source code or tests were added. Do not reopen
Checkpoint 0 or repeat the completed creative audit unless a specific regression
or release blocker is documented.
