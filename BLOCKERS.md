# Code Quest Lab - Blockers and Owner Actions

Updated: 2026-08-10

These are genuine blockers or owner-gated decisions. Codex should complete all
independent browser, documentation, test, and preparation work and should not
repeatedly retry the same blocked action.

| ID | Blocker | Evidence | Exact action required | Affected checkpoint(s) | Status/workaround |
|---|---|---|---|---|---|
| B-001 | Android build environment missing | `JAVA_HOME` is empty; `java` is not on `PATH`; `native:doctor` reports the Android configuration but no usable JDK | Owner provides a supported JDK, Android SDK/platform tools, and Gradle-capable Windows/CI environment, then runs `npm.cmd run native:android:build` and records the APK/AAB | 5, 8, 9 | Blocked; generated project and sync are ready |
| B-002 | iOS build environment missing | Windows has no `xcodebuild`; `native:doctor` reports Xcode is not installed | Owner provides a Mac with Xcode, reruns native sync to regenerate the Mac-side Swift package path, builds `ios\App\App.xcworkspace`, and records simulator/device evidence | 5, 8, 9 | Blocked; generated project and lifecycle seam are ready |
| B-003 | Live store access and products missing | No StoreKit/Google Play adapters, live product IDs, sandbox accounts, signing, or store credentials are in the repository | Owner creates the one-time products, supplies final IDs/sandbox instructions and approved price/refund policy, and grants platform access without placing credentials in Git | 6, 8, 9 | Blocked; fail-closed core and development adapter remain usable for tests |
| B-004 | Physical-device evidence unavailable in this environment | Existing evidence is browser viewport smoke only; no iPad/Android hardware or Mac build is available | Owner supplies representative iPhone/iPad/Android phone/tablet or approved test lab and records touch, safe-area, audio, offline, suspension, and local-save results | 2, 3, 5, 8, 9 | Blocked for hardware; browser QA continues |
| B-005 | Commercial/legal/privacy/age/school approvals open | `LICENSES.md`, `PRIVACY.md`, `STORE_READINESS.md`, `SCHOOL_REVIEW.md`, and `OWNER_ACTIONS.md` list rights, rating, hosting-log, support/privacy, and school decisions | Owner confirms code/asset rights, final name/rating, privacy/support wording and URLs, CDN-log treatment, parental language, school requirements, and final distribution approval | 4, 6, 7, 8, 9 | Blocked for RC/store approval; does not block local development |
| B-006 | Future publication is approval-gated | Current web deployment is verified, but new major-milestone publishes change external hosting state | Owner approves each stable milestone publish; Codex then runs the documented build/deploy/live-check flow and records the result | 4, 5, 6, 7, 8, 9 | Not blocking current C1; no deploy for this documentation/test review |
| B-007 | In-app browser permission denied for the manual C1 run | The initial 2026-08-05 attempts at the local QA page and designated Pages preview were denied before the game loaded; later the loopback QA surface loaded successfully and allowed a saved-session recovery smoke | No owner action is required for the current local continuation; approve Pages-preview access later if a live-preview QA pass needs it | 1 | Resolved for loopback QA on 2026-08-05: the current shell loaded, the defeated boss room rendered its exit portal, and portal travel completed without browser diagnostics |
| B-008 | Codex goal service retains the previous blocked state | On 2026-08-07 the goal service rejected a replacement because the prior unfinished goal remains marked blocked; repository work and verification continue normally | Owner uses the Codex goal control to Resume the existing goal once; do not delete or falsely complete it | Automation only | Repository workaround complete: `AUTORUN.md` and its executable contract contain the updated continuation rules; interactive work is not blocked |
| B-009 | Current in-app browser permission denied for the clean C1 route | The earlier 2026-08-10 denial applied to a prior localhost attempt; the current loopback browser session now loads the local build on port 4174 and supports bounded QA route verification | If a future clean route again requires the denied surface, grant browser access before retrying; do not repeat the denied target without a material permission change | 1 | Resolved for the current loopback continuation on 2026-08-10; clean-player evidence remains open but is no longer blocked from local QA work |
| B-010 | Git metadata is read-only to the current Codex process | `git add` cannot create `.git/index.lock` (`Permission denied`); no stale lock exists, while the working-tree source remains writable | Grant the current Codex sandbox identity Modify access to the repository `.git` directory, or run the prepared `git add`, commit, and push from an owner terminal after reviewing the working-tree diff | GitHub checkpoint only | Commit preparation is complete locally; no commit or push was claimed, and no Git metadata was deleted or bypassed |
| B-011 | Current production reachability cannot be verified from this environment | On 2026-08-10, `production:check` reported `fetch failed` for every configured route; DNS resolved and ICMP ping succeeded, but TCP 443 failed to both Cloudflare IPv4 addresses | Owner verifies `https://code-quest-lab.gov8661682.com` from an external browser/network or permits outbound TCP 443, then records the result before the next website checkpoint | 4, 5, 7, 8, 9 | Current live state is unknown from this environment; the last successful production verification remains the authoritative prior checkpoint, and no new deployment was attempted |

## Not blockers

- The missing four classes, D9-16, D16 Phase 4, and Smelter activation are
  deferred creative parity work under the locked V1 scope, not reasons to stop
  the current C1 browser path.
- The current 56,689-line monolith is a maintainability risk, not a release
  blocker while the contract tests protect the existing game.
- The current live website is healthy for the last tested shell;
  `production:check` passed on 2026-08-05. The deployed shell is not evidence
  that the whole game has been completed.
- B-008 is a Codex continuation-state limitation, not a game, build, GitHub, or
  website blocker.
