# Code Quest Lab - Owner Actions

Updated: 2026-08-12

These are human-only or account/legal actions. The development work should continue around them.

- The earlier local-browser permission issue is resolved for the current
  loopback continuation: port 4176 loaded the game, the protected D1 route was
  paused at Death Chamber, and diagnostics were empty. If a future run is
  specifically blocked again, grant access to the requested loopback URL once;
  do not retry a denied target through another browser or an indirect
  workaround.
- Git metadata write access is currently resolved: control commit `a7b5f2d`
  was created and pushed to `origin/main`. Reopen this action only if a later
  checkpoint again cannot create `.git/index.lock`.
- The configured site was verified from the current environment after runtime
  `830ce00`: preview `6dc4ee18.code-quest-lab.pages.dev` and
  `https://code-quest-lab.gov8661682.com` passed production checks. The live
  smoke followed Town to first combat, showed the player-following `TO GATE`
  arrow, defeated one enemy with ordinary attack input, safely finished, and
  removed its disposable profile with no captured browser diagnostics. Owner
  review remains appropriate before a future publication checkpoint, but this
  is no longer an active reachability blocker.

- Confirm the final product name and obtain professional trademark/name clearance. A preliminary web search on 2026-08-04 did not surface an obvious exact-match game result, but this is not clearance.
- Confirm the target audience and age-rating position: the current product direction is secondary-school students approximately 13-17, not an automatic Apple Kids-category claim.
- Review the final dialogue, fantasy combat, imagery, humour, difficulty, and purchase language for 13-17-year-old users and approve any required content changes.
- Confirm whether any school deployment requires allowlisting, additional consent, filtering, accessibility, or device-management documentation. Codex will not bypass those controls.
- Confirm commercial rights to the existing repository code and any owner-supplied assets; provide a project license decision.
- Approve the final public support URL and privacy-policy URL/text. Draft same-origin Support and Privacy pages are present in the repository, but their final wording and hosting/log disclosures require owner review.
- Confirm the static web deployment, DNS/HTTPS certificate, hosting/CDN log
  treatment, and clean-host verification for
  `code-quest-lab.gov8661682.com`. The 2026-08-12 tablet-control resilience
  checkpoint is deployed from runtime `830ce00`; owner approval is still
  required for each future milestone publish.
- For the next substantial, tested milestone, approve publishing the complete
  `dist\` package to the existing Cloudflare Pages project and repeat the
  post-deployment checks. Do not publish a minor fix or incomplete feature.
- Provide Apple Developer and Google Play Console access when native submission work is ready. Do not put credentials in the repository.
- Confirm the final application/bundle identifier; the provisional recommendation is `com.gov8661682.codequestlab`.
- Provide signing certificates, provisioning profiles, Android keystore, and release account configuration.
- Create the Apple non-consumable product and Google Play one-time product, then provide the final product IDs and sandbox/test-account instructions.
- Decide whether the public website remains a free preview or receives a separately reviewed web payment adapter; if the latter, select the legitimate provider, privacy/security review, product ID, refund handling, and owner-controlled credentials.
- Confirm final price, regional availability, refund/support policy, and tax/business details.
- Review and approve parental gate copy, privacy disclosures, age/content declarations, and store metadata.
- Review and approve the `PRIVACY.md` data inventory after hosting/CDN logs and native dependencies are known.
- Review and approve the optional Learning Support wording; keep claims limited to supporting problem-solving and computational-thinking skills through play.
- Review and approve the generated app icon/splash set in `ASSET_REGISTER.md`; provide or approve the remaining feature graphic, screenshots, and promotional assets.
- Perform physical-device testing on representative iPhone/iPad and Android
  hardware by following `DEVICE_ACCEPTANCE_RUNBOOK.md`. Start from the
  currently deployed `830ce00` build at the configured hostname and record Runs
  A-C, including the clean D1-D12 route,
  10-30 minute touch session, safe-area, audio, offline, suspension, local-save,
  and (if claimed) transfer results. A Mac/Xcode environment is required to
  produce a signed iOS build.
- Provide a Windows or CI environment with a supported JDK, Android SDK/platform tools, and Gradle access; run `npm.cmd run native:android:build` and record the resulting APK/AAB build evidence.
- Current native check (2026-08-12): `npm.cmd run native:doctor` reports Android
  looking great, but `java`/`JAVA_HOME` and Xcode are unavailable here, so the
  Android build and iOS build remain owner-environment actions.
- On a Mac, run `npm run native:sync`, open `ios/App/App.xcworkspace` in Xcode, confirm the landscape orientation choice (including whether iPad full-screen orientation locking is acceptable), and perform unsigned/signed device builds as appropriate.
- The Windows-generated iOS Swift Package manifest points at the local Windows-side `node_modules` path; the Mac-side `native:sync` step must regenerate it before the Xcode build.
- Review the generated Android manifest's default `INTERNET` declaration during the native permission audit; remove it only after an Android smoke build proves the local Capacitor shell still loads without it.
- Approve any store submission, publication, legal agreement, purchase, or external distribution action. Codex will not perform those actions.
- The earlier in-app browser permission issue for the local QA surface was
  cleared on 2026-08-05; the recovered local boss-room path was verified and
  Checkpoint 1 work can continue. Approve Pages-preview access only if a
  future live-preview QA pass requires it; physical-device evidence remains an
  owner action under `BLOCKERS.md`.
