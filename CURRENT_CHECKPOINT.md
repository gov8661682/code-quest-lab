# Code Quest Lab - Current Checkpoint

Updated: 2026-08-07

## Current checkpoint

**Checkpoint 1 - Core game stability and complete V1 path**
Status: **Active; not complete**

## Main progress checkpoint

<!-- checkpoint-progress:start -->
Active checkpoint completion: **74%**

Overall project completion: **17%**

Scoring date: 2026-08-07. Overall progress is rounded from one completed
checkpoint plus 74% of the active checkpoint across ten checkpoints.

| Acceptance lane | Weight | Earned | Evidence currently credited | Evidence still required |
|---|---:|---:|---|---|
| Fresh-profile D1-8 route, bosses, rewards, final portal, and ending | 30 | 16 | A disposable clean Mage completed every observable D1 room, the Stone Guardian, and the exit portal into The Fallen Kingdom Entrance through normal touch controls; automated D1-8 route contracts also pass | One fresh player-completed D1-8 route through D2-8, final portal, and intended ending |
| Meaningful 10-30 minute touch-first session | 20 | 13 | Dated touch-first play covered Town, D1 combat rooms, shrine, treasure, elite, boss, target lock, and deliberate portal travel; the run's safe-stop/resume/summary sequence is still open | One dated 10-30 minute touch-first session with the full safe-stop sequence |
| Reload, background, forced-close, and deliberate-finish recovery | 15 | 15 | Page-background and lifecycle contracts; same-room and boss-room recovery; real-storage page-close/reopen simulation; recovered Dungeon 1 combat resume, pause, and deliberate Finish For Now | Native/physical-device suspension and cross-device migration evidence remain later release gates |
| Keyboard/mouse and touch playability with no open P0/P1 defect | 15 | 12 | Input contracts plus a full observable D1 touch route on a tablet-sized managed-browser surface using the visible target lock; no P0/P1 issue was observed during that route | Representative full-route tablet/device evidence with recorded diagnostics and no P0/P1 issue |
| Versioned plain-text profile transfer | 10 | 10 | Exported the retained Level 4 Barbarian, uploaded the `.txt` through the real browser file chooser, imported a matching Level 4 copy with the same dungeon/room/run/play-time values, and confirmed the original remained unchanged before deleting only the temporary copy; contracts also cover active-run preservation and non-overwrite behavior | Cross-version/device fixtures and future-class migration evidence |
| Tests, current records, GitHub, and website milestone | 10 | 8 | The 80-test release verification, build/package audit, native sync, updated records, and pushed milestone preparation are complete; live publication is the final step | Deploy this tested milestone and live-verify desktop/tablet playability |
<!-- checkpoint-progress:end -->

## Current objective

Prove that a clean profile can complete the locked Version 1 Dungeon 1-8 path
and that a touch-first 10-30 minute session can pause, recover, summarize, and
stop without losing progress. Preserve the existing story, classes, combat,
dungeon, boss, dialogue, and ending direction while fixing only verified
defects. Shape the implementation so Town, entrances, waypoints, and saved
world locations can grow into the explicit compact open-world direction without
expanding the untested V1 content boundary.

Autonomous continuation follows `AUTORUN.md`. The score above changes only
when its table gains or loses named evidence; retries and effort alone do not
change it.

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
- `npm.cmd run release:verify` passed on 2026-08-07: release contracts, 80 Node
  tests, a 17-file static build, and the static-package audit. The new
  session-transient UI, no-waypoint cleanup, and final-enemy status-refresh
  contracts are included; `npm.cmd run native:sync` also passed.
- The versioned local profile-transfer contract preserves durable profile data,
  a valid backup, and an active-run checkpoint; import creates a new profile
  without overwriting the current profile. A real local browser upload
  round-trip on 2026-08-07 matched the retained Barbarian's level, dungeon,
  highest room, run count, and play time; only the temporary imported copy was
  deleted afterward.
- The last major web checkpoint is live-verified at
  `https://code-quest-lab.gov8661682.com/` and the current production check
  passes.

## Remaining acceptance criteria

1. Complete a fresh profile through the full bounded D1-8 route, including
   rooms, bosses, rewards, final portal, and intended session ending.
2. Record a meaningful 10-30 minute touch-first session with a clear objective,
   checkpoint/autosave, pause/resume, summary, next step, and safe stop.
3. Verify the current route and recovery behavior on representative
   tablet-sized browser surfaces, with no P0/P1 defect or browser diagnostics.
4. Run the relevant tests/build again after any evidence-driven fixes, update
   status/changelog, and complete the GitHub + website checkpoint before
   marking this checkpoint complete.

## Active tasks

1. Continue the highest-priority clean-profile, touch-first D1-8 playthrough;
   record the first failing room/system if the run cannot complete. A fresh
   1024x768 Pages-preview Mage run now produced visible first-hit feedback,
   defeated enemies, cleared the opening route rooms, and reached the Elite
   room before ending; a later bounded local run reached `Burial Hall`, where
   one hidden/offscreen Soul Wraith remained. The full D1-8 route is still
   unproven. Apply the `AUTORUN.md` failure fingerprint: switch strategy after
   three materially identical technical failures and stop the same manual
   route after five materially identical attempts.
2. Exercise the existing pause, page-background, reload, Finish For Now, and
   recovery paths around the clean run, including a meaningful 10-30 minute
   touch-first session.
3. Keep the deployed profile-transfer and grouped enemy/door readability
  changes under regression coverage. The local follow-up also clears stale
  dungeon lock and waypoint messages when a session returns to Town or uses
  Finish for Now; combat
  calculations remain unchanged. A separate loopback-gated, session-only
  developer invincibility aid and the first-combat visible-spawn hardening are
  local QA tools only and are not part of the deployed checkpoint. The local
  follow-up also resets a regenerating elite's recovery timer after every
  successful hit and restores the exact generated route before applying a
  saved room checkpoint; these are combat/recovery correctness fixes, not new
  gameplay systems.
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
- On 2026-08-05, a resumed local QA profile traversed its saved D2 route from
  `START Castle Gatehouse` through `COMBAT 2`, `SHRINE 3`, `TREASURE 4`, and
  `ELITE 5` into `BOSS 6 The Fallen King's Throne Room`. With the loopback-only
  developer invincibility aid enabled, bounded desktop click probes reduced
  the Stone Guardian from `3675/3675` to `2715/3675` and the Fallen King
  guardian from `100%` to `74%`, then the run was paused safely. This is
  resumed-session combat evidence, not fresh-profile D1-8 completion or direct
  regenerating-elite manual evidence.
- The same local verification reproduced and covered the regenerating-elite
  recovery-timer defect: successful damage now resets the timer, the canonical
  source/mirror hashes remain identical, and `npm.cmd run release:verify`
  passed all 65 tests after build and native web-copy sync.
- A clean local Mage profile paused in D1 `COMBAT Ashen Pit`, was reloaded,
  and resumed in the same generated room with the same two remaining Zombies
  and locked door. This confirms the saved route is restored before room state
  is applied; the full D1-8 route and tablet lifecycle evidence remain open.
- A separate clean local Mage profile reached D1 `COMBAT Crypt Passage` with
  the loopback-only invincibility aid enabled for QA. After two visible enemy
  defeats, one normal enemy remained outside the 1024x768 visible viewport and
  the door stayed locked. The run was paused and preserved as an evidence gap;
  no indefinite target-search loop or unverified gameplay workaround was added.
- On 2026-08-05, a fresh local Mage QA profile progressed through D1 `Crypt
  Passage`, `Mystic Sanctum`, `Hidden Cache`, and `Burial Hall` with the
  loopback-only developer aid enabled. Visible combat, shrine interaction,
  treasure rewards, and level-up/gear surfaces were observed. `Burial Hall`
  then retained one hidden/offscreen Soul Wraith after the visible enemies were
  defeated, reproducing the target-location playability gap without further
  repeated search attempts.
- Added a restrained screen-space locator for the nearest live offscreen enemy;
  hidden Soul Wraiths are marked `THREAT` rather than exposed visually. The
  canonical HTML, downloadable mirror, and focused source contract are recorded
  in pushed commit `4747413`; this is local QA hardening and is not deployed.
- The same profile was paused, reloaded, recovered from the saved `Burial Hall`
  checkpoint, and resumed without data loss or browser diagnostics. The
  indicator-specific live screenshot remains unrecorded, so this evidence does
  not complete the room, D1-8, or tablet lifecycle criteria.
- Commit `3106820` refreshes room progress and the HUD immediately after the
  final enemy leaves the array, covering the level-up pause boundary that had
  left a stale lock message. Focused and full release verification passed all
  67 tests, the 17-file package audit, and native sync; a local resumed
  `Ruined Archway` smoke showed an active game screen with empty door status
  and no enemy count. This minor local follow-up is not deployed.
- After local browser access was restored, a fresh cache-busting loopback QA
  URL loaded the current shell. The saved Mage level 10 session reopened at
  the defeated D1 Guardian room, rendered a visible `EXIT PORTAL`, and walking
  into it completed the handoff to the next entrance area without browser
  diagnostics. This proves recovered boss-room exit behavior, not full D1-8
  completion.
- The recovered boss-room load path now restores the forward door and exit
  portal after reload/background recovery, and the loopback-only developer QA
  aid has an additional gated `F8`, `F7`, `F6`, `F4` sequence for clearing live
  boss summons during local debugging. The invincibility toggle also accepts
  the ordinary-key fallback `C`, `Q`, `L`, `I` when a managed browser reserves
  function keys. Neither behavior is enabled on the deployed/public shell or
  included in profile export.
- A cache-busted loopback combat smoke used the ordinary-key fallback before
  entering Dungeon 1's first combat room; after 12 seconds with two enemies
  present, the session remained active at `100/100 HP`. The temporary profile
  was deleted afterward, and this remains QA evidence only.
- The portal handoff QA also found and corrected a stale entrance objective:
  each entrance now resolves its objective from the underlying dungeon, so the
  Fallen Kingdom entrance correctly names the Fallen King rather than the
  previous Stone Guardian objective. The browser smoke verified both the HUD
  objective and entrance banner.
- A 600x700 touch-layout replay found that an upward movement-joystick drag
  could release over the adjacent Potion control in the managed browser
  harness. Joystick pointer ownership now cancels the overlapping skill
  release instead of activating Potion; the replay no longer showed the
  unintended `NO POTIONS` action. The temporary route remained in Town after
  bounded navigation attempts, so full touch-first D1-8 evidence remains open.
- On 2026-08-05, clean-profile touch-first runs were initially stopped by
  in-app browser permission denial on both QA surfaces; this was recorded as
  blocker `B-007`. Loopback access was subsequently restored, the saved boss
  recovery path was manually verified, and manual route/lifecycle evidence
  can continue locally. Pages-preview and physical-device evidence remain
  separate open acceptance items.
- After the latest control update, `npm.cmd run release:verify` passed all 75
  tests, the 17-file static package audit, and the build; the prior
  `npm.cmd run native:sync` also passed.
- The AI expert review is recorded in `AI_EXPERT_PLAYTEST.md`. It confirms
  Town's useful hub foundation but finds that the current dashboard/route flow
  still feels menu-driven, the minimap/landmarks do not yet communicate an open
  world, and first-combat enemy/lock feedback needs improvement.
- On 2026-08-07, two bounded fresh-Mage loopback attempts completed Town,
  Entrance, Normal trial, session modifier, start room, and first combat. The
  first reached `Forsaken Vault` and the second reached `Crypt Passage`; both
  ended before an enemy defeat in the managed browser surface, with no browser
  diagnostics. The loopback-only developer key sequence did not register in
  this input surface, so no further identical combat attempts were made. Both
  synthetic profiles were deleted; the existing Barbarian profile was not
  changed.
- A verified status-polish defect was fixed locally: static Town/Entrance/
  shrine/treasure rooms now clear stale lock text as well as hiding the status
  element. The focused lifecycle contracts and packaged local Town smoke pass;
  this is a minor local hardening change, not a deployment checkpoint.
- On 2026-08-07, a fresh temporary Mage profile survived a real local-storage
  page-close/reopen simulation from Dungeon 1 combat. Reopening the profile
  showed `SESSION RECOVERED`; Resume Session restored the saved combat
  checkpoint, Pause exposed the safe-stop menu, and Finish and Return to
  Dashboard banked the run. The temporary profile was deleted through Manage
  Data; the existing Barbarian profile was untouched. This completes the
  browser-storage lifecycle lane, while native/physical-device lifecycle
  evidence remains open.
- On 2026-08-07, a cache-busted local smoke reproduced and then verified the
  Finish for Now transition fix: the old dungeon lock text is now cleared both
  before and after Town rebuild, with the returned `#doorStatus` empty and
  hidden. The source mirror, focused lifecycle contract, 77-test release
  verification, static package, and native web-asset sync all pass. This is
  local hardening, not a deployment checkpoint.
- On 2026-08-07, a bounded local Mage run used the loopback-only developer
  invincibility aid and completed the observable Dungeon 1 route: `Burial Hall`,
  `Ancient Shrine`, `Sunken Treasury`, `Ashen Pit`, `Guardian's Sanctum`, and
  the exit portal into `The Fallen Kingdom Entrance`. The Stone Guardian was
  reduced from `750/750` to zero through the normal touch attack control, and
  the next-region entrance was observed. This is valid D1 boss/portal evidence,
  but it used the existing Mage profile rather than a clean profile and does
  not establish D1-8, touch-first, or ending completion. The Manage Data
  surface retained both Mage and Level 4 Barbarian profiles; no profile was
  deleted. At that earlier point, the checkpoint and overall scores were 61%
  and 16%; the current score is recorded at the top of this file.
- On 2026-08-07, a separate isolated Mage QA profile completed the fresh
  Dungeon 1 boss-and-portal route, then entered Dungeon 2 with `Elite Invasion`.
  In `Dark Inquisition Chamber`, the Corrupted elite modifier reproduced an
  unbounded-feeling escalation to `Enemies: 15` and a locked exit after several
  distinct, bounded attack/reposition attempts. The run was safely finished;
  only the temporary QA profile was deleted, while the retained Mage (116
  Souls) and Barbarian (0 Souls) profiles were preserved. The follow-up fix in
  `6423ecb` gives each Corrupted elite a finite two-minion summon budget,
  preserves it through room checkpoints, and adds a 77-test contract. This is
  local hardening evidence, not D1-8 completion; the then-current scores were
  61% and 16%, before the later clean D1 touch-route evidence.

- On 2026-08-07, a new disposable Mage profile verified the patched local
  shell through Dungeon 1 Normal's first combat, shrine, sealed-chest event,
  treasure vault, elite lair, and a later cleared combat room. It reached
  Level 7, so Dungeon 4 remained correctly locked behind progression. The run
  was finished safely and only that profile was deleted; the retained Mage and
  Barbarian profiles were unchanged. This is clean-profile D1 evidence, not a
  post-fix D4 rerun or D1-8 completion.

## Latest milestone evidence

- On 2026-08-07, a separate disposable Mage completed the full observable
  Dungeon 1 touch-first slice: `Shadow Hall`, `Elder Stone`, `Cursed Gallery`,
  `Relic Chamber`, `Dark Corridor`, `Forsaken Vault`, `Guardian's Sanctum`,
  the Stone Guardian through Phase 2, and the exit portal into `The Fallen
  Kingdom Entrance`. The visible session-only target lock made center-hold
  Attack usable throughout the route; the local developer invincibility aid
  was enabled only for QA. The two disposable Mage profiles from this run
  were deleted through Manage Data; the retained Mage and Barbarian profiles
  were verified unchanged. This advances the evidence score to 74% / 17%,
  while the D1-8 ending and full safe-stop session remain open.
- The boss handoff edge case found during that run is now fixed: dead summon
  objects no longer leave `CLEAR SUMMONS` visible or keep a defeated boss room
  locked. The runtime counts only live summons, clears dead objects, reopens
  the exit, and removes stale status text; the focused combat contract and the
  80-test release gate cover the behavior.

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

- Current verified code head: `e093cd3` (`Bound Dungeon 4 recovery pressure`),
  pushed to `origin/main` after 78-test release verification, build/package
  audit, and native asset sync. This is local hardening, intentionally not a
  website deployment checkpoint because Checkpoint 1 remains incomplete.

- Current local QA follow-up: `3106820` (`Refresh combat status after final
  enemy defeat`), pushed to `origin/main` on 2026-08-05 after focused and full
  release verification; it is intentionally not a website deployment
  checkpoint.
- Current local QA follow-up: `4747413` (`Point toward hidden offscreen combat
  threats`), pushed to `origin/main` on 2026-08-05; it is intentionally not a
  website deployment checkpoint.
- Current local QA follow-up: `8e165e1` (`Fix route restoration and first
  combat onboarding`), pushed to `origin/main` on 2026-08-05; it records the
  exact-route recovery fix, corrected first-combat guard, and bounded
  off-viewport target finding. It is intentionally not a website deployment
  checkpoint.
- Unreleased local QA hardening: `3e33470` (`Add gated developer invincibility
  cheat`), pushed to `origin/main` on 2026-08-05; it is intentionally not a
  website deployment checkpoint.
- Unreleased local combat fix: regenerating-elite recovery-timer reset;
  committed and pushed to `origin/main` on 2026-08-05 after the focused
  regression and full release verification passed. It is intentionally not a
  website deployment checkpoint.
- Unreleased local hardening: `5db6db5` (`Fix stale session status cleanup`),
  pushed to `origin/main` on 2026-08-05; tests and package sync pass, but this
  minor follow-up is intentionally not a separate website deployment.
- Unreleased local hardening: `e1380c4` (`Harden recovered boss progression QA`)
  restores recovered boss-room exit portals, corrects entrance objectives, and
  adds a gated local summons-clear QA sequence; source contracts, package
  sync, and browser recovery smoke pass. It is not a website deployment
  checkpoint because full Checkpoint 1 remains incomplete.
- Touch-control follow-up `90f4f36` (`Protect touch joystick releases`) records
  the 600x700 overlap fix, its contract, and the bounded local replay. It is
  also not a website deployment checkpoint.
- Open-world discoverability follow-up `c8b50c8` (`Guide Town portal discovery`)
  adds a screen-edge direction arrow for the off-screen Town portal. The
  compact-viewport smoke rendered the cue without adding a menu shortcut; it
  is not a website deployment checkpoint.
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
