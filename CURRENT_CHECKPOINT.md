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
- `npm.cmd run release:verify` passed on 2026-08-05: release contracts, 57 Node
  tests, a 17-file static build, and the static-package audit.
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

1. Execute the highest-priority clean-profile, touch-first D1-8 playthrough;
   record the first failing room/system if the run cannot complete. The
   2026-08-05 primary-hostname harness reached three randomized first-combat
   rooms, but did not establish an enemy defeat with touch Attack-joystick or
   desktop click input; reproduce this on another supported browser/device or
   isolate the event-delivery cause before changing combat code.
2. Exercise the existing pause, page-background, reload, Finish For Now, and
   recovery paths around the clean run.
3. Add or fix only evidence-driven defects, then run the focused and full
   verification suite. The expert playtest identified an encoding-safe
   onboarding prompt fix and a follow-up enemy/door readability review.
4. Update the manual evidence, `PROJECT_PROGRESS.md`, `STATUS.md`, and
   `CHANGELOG.md`; do not deploy until a substantial stable milestone exists.

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

- Runtime: `32d83d0` (`Harden page-background save coverage`)
- Control record: `194bcc5` (`Record project checkpoint controls and QA gap`)
- Branch: `main`; this change set records the open-world direction, AI expert
  playtest, and synchronized copy-only usability fixes; no release checkpoint is
  claimed for it
- Baseline tag retained: `code-quest-lab-baseline-2026-08-04`

## Last verified website deployment

- Commit: `bf07810` (`Finalize creative-reference release checkpoint`)
- Deployment date: 2026-08-04
- Primary: `https://code-quest-lab.gov8661682.com/`
- Preview: `https://4489e0ec.code-quest-lab.pages.dev/`
- Shell SHA-256: `F4A12AD085F8AF3E7272CFDB03AEAC82DFA6F6205836270A192D2A8B1D085FD3`
- Current read-only production check: passed on 2026-08-05

The local change set after `bf07810` includes documentation, AI playtest
evidence, and synchronized copy-only runtime fixes. The tested local shell is
SHA-256 `56BD21461F55FE29FF177BFACC40B13C78DA830D430C17D06A503A3FBCBE32C8`,
while the live shell remains `F4A12AD085F8AF3E7272CFDB03AEAC82DFA6F6205836270A192D2A8B1D085FD3`.
The copy fixes are not yet a stable major milestone, so they are recorded for
the next tested checkpoint rather than deployed alone.

## Exact condition required to advance

Advance to Checkpoint 2 only when every remaining acceptance criterion above is
supported by dated manual evidence, relevant automated tests and a successful
production build; no unresolved P0/P1 issue remains; project status,
changelog, backlog, blockers, and checkpoint records are updated; and the
stable milestone has been committed, pushed, deployed, and live-verified.

Do not advance merely because source code or tests were added. Do not reopen
Checkpoint 0 or repeat the completed creative audit unless a specific regression
or release blocker is documented.
