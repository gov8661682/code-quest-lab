# Code Quest Lab - Blockers and Owner Actions

Updated: 2026-08-12

These are genuine blockers or owner-gated decisions. Codex should complete all
independent browser, documentation, test, and preparation work and should not
repeatedly retry the same blocked action.

| ID | Blocker | Evidence | Exact action required | Affected checkpoint(s) | Status/workaround |
|---|---|---|---|---|---|
| B-001 | Android build environment missing | `npm.cmd run native:doctor` reports Android looking great, but `JAVA_HOME` is empty and `java` is not on `PATH`; a native build still cannot run here | Owner provides a supported JDK, Android SDK/platform tools, and Gradle-capable Windows/CI environment, then runs `npm.cmd run native:android:build` and records the APK/AAB | 5, 8, 9 | Blocked; generated project and sync are ready |
| B-002 | iOS build environment missing | Windows has no `xcodebuild`; `native:doctor` reports Xcode is not installed | Owner provides a Mac with Xcode, reruns native sync to regenerate the Mac-side Swift package path, builds `ios\App\App.xcworkspace`, and records simulator/device evidence | 5, 8, 9 | Blocked; generated project and lifecycle seam are ready |
| B-003 | Live store access and products missing | No StoreKit/Google Play adapters, live product IDs, sandbox accounts, signing, or store credentials are in the repository | Owner creates the one-time products, supplies final IDs/sandbox instructions and approved price/refund policy, and grants platform access without placing credentials in Git | 6, 8, 9 | Blocked; fail-closed core and development adapter remain usable for tests |
| B-004 | Physical-device evidence unavailable in this environment | The current web checkpoint is live-verified on desktop and tablet-sized browser surfaces, but no iPad/Android hardware or Mac build is available | Owner follows `DEVICE_ACCEPTANCE_RUNBOOK.md` on a representative iPhone/iPad/Android phone/tablet or approved test lab and records clean route, touch session, safe-area, audio, offline, suspension, local-save, and (if claimed) transfer results | 1, 2, 3, 5, 8, 9 | Blocked for hardware; the acceptance packet is prepared and browser QA remains loop-broken |
| B-005 | Commercial/legal/privacy/age/school approvals open | `LICENSES.md`, `PRIVACY.md`, `STORE_READINESS.md`, `SCHOOL_REVIEW.md`, and `OWNER_ACTIONS.md` list rights, rating, hosting-log, support/privacy, and school decisions | Owner confirms code/asset rights, final name/rating, privacy/support wording and URLs, CDN-log treatment, parental language, school requirements, and final distribution approval | 4, 6, 7, 8, 9 | Blocked for RC/store approval; does not block local development |
| B-006 | Future publication is approval-gated | The 2026-08-12 guidance and release-readiness milestone was published and live-verified; later major-milestone publishes still change external hosting state | Owner approves each stable milestone publish; Codex then runs the documented build/deploy/live-check flow and records the result | 4, 5, 6, 7, 8, 9 | Resolved for runtime `b5d701e` / checkpoint record `47c01db`; keep approval-gated for the next milestone |
| B-007 | In-app browser permission denied for the manual C1 run | The initial 2026-08-05 attempts at the local QA page and designated Pages preview were denied before the game loaded; later the loopback QA surface loaded successfully and allowed a saved-session recovery smoke | No owner action is required for the current local continuation; approve Pages-preview access later if a live-preview QA pass needs it | 1 | Resolved for loopback QA on 2026-08-05: the current shell loaded, the defeated boss room rendered its exit portal, and portal travel completed without browser diagnostics |
| B-008 | Codex goal service retains the previous blocked state | On 2026-08-07 the goal service rejected a replacement because the prior unfinished goal remains marked blocked; repository work and verification continue normally | Owner uses the Codex goal control to Resume the existing goal once; do not delete or falsely complete it | Automation only | Repository workaround complete: `AUTORUN.md` and its executable contract contain the updated continuation rules; interactive work is not blocked |
| B-009 | Current in-app browser permission denied for the clean C1 route | The earlier 2026-08-10 denial applied to a prior localhost attempt; the current loopback browser session now loads the local build on port 4174 and supports bounded QA route verification | If a future clean route again requires the denied surface, grant browser access before retrying; do not repeat the denied target without a material permission change | 1 | Resolved for the current loopback continuation on 2026-08-10; clean-player evidence remains open but is no longer blocked from local QA work |
| B-010 | Git metadata is read-only to the current Codex process | The earlier `.git/index.lock` permission failure no longer reproduces; commit `a7b5f2d` and `git push origin main` succeeded | Reopen only if a later Git checkpoint again loses metadata write access | GitHub checkpoint only | Resolved on 2026-08-12; commit `a7b5f2d` is pushed to `origin/main` |
| B-011 | Current production reachability cannot be verified from this environment | After the 2026-08-12 Cloudflare Pages publish, `production:check` passed for preview `ce226dfb.code-quest-lab.pages.dev` and `code-quest-lab.gov8661682.com`; the fresh first-combat/safe-stop UI smoke and primary shell check also passed | Reopen only if a future production check fails or the configured hostname changes | 4, 5, 7, 8, 9 | Resolved on 2026-08-12 for the current deployment; keep the live check in every future milestone |
| B-012 | GitHub network unavailable for the latest record push | Commit `7b98b4a` was created locally after the responsive smoke, but `git push origin main` failed on 2026-08-12 because `github.com:443` was unreachable | Retry one push after GitHub connectivity materially changes; do not vary the URL, shell, or command in a loop | GitHub record checkpoint | Open; local commit is preserved and runtime commits remain pushed |

## Not blockers

- The missing four classes, D9-16, D16 Phase 4, and Smelter activation are
  deferred creative parity work under the locked V1 scope, not reasons to stop
  the current C1 browser path.
- The current 58,304-line monolith is a maintainability risk, not a release
  blocker while the contract tests protect the existing game.
- The current live website is healthy for the latest tested shell;
  `production:check` passed on 2026-08-10. The deployed shell is not evidence
  that the whole game has been completed.
- B-008 is a Codex continuation-state limitation, not a game, build, GitHub, or
  website blocker.
