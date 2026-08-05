# Code Quest Lab - Owner Actions

Updated: 2026-08-05

These are human-only or account/legal actions. The development work should continue around them.

- Confirm the final product name and obtain professional trademark/name clearance. A preliminary web search on 2026-08-04 did not surface an obvious exact-match game result, but this is not clearance.
- Confirm the target audience and age-rating position: the current product direction is secondary-school students approximately 13-17, not an automatic Apple Kids-category claim.
- Review the final dialogue, fantasy combat, imagery, humour, difficulty, and purchase language for 13-17-year-old users and approve any required content changes.
- Confirm whether any school deployment requires allowlisting, additional consent, filtering, accessibility, or device-management documentation. Codex will not bypass those controls.
- Confirm commercial rights to the existing repository code and any owner-supplied assets; provide a project license decision.
- Approve the final public support URL and privacy-policy URL/text. Draft same-origin Support and Privacy pages are present in the repository, but their final wording and hosting/log disclosures require owner review.
- Confirm the static web deployment, DNS/HTTPS certificate, hosting/CDN log treatment, and clean-host verification for `code-quest-lab.gov8661682.com`. The current 2026-08-04 checkpoint is already deployed and `production:check` passed on 2026-08-05; owner approval is still required for each future milestone publish.
- For the next substantial, tested milestone, approve publishing the complete `dist\` package to the existing Cloudflare Pages project and repeat the post-deployment checks. Do not treat the current open-world/design review, AI playtest, or incomplete copy/usability fixes as a deployment milestone.
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
- Perform physical-device testing on representative iPhone/iPad and Android hardware. A Mac/Xcode environment is required to produce a signed iOS build.
- Provide a Windows or CI environment with a supported JDK, Android SDK/platform tools, and Gradle access; run `npm.cmd run native:android:build` and record the resulting APK/AAB build evidence.
- On a Mac, run `npm run native:sync`, open `ios/App/App.xcworkspace` in Xcode, confirm the landscape orientation choice (including whether iPad full-screen orientation locking is acceptable), and perform unsigned/signed device builds as appropriate.
- The Windows-generated iOS Swift Package manifest points at the local Windows-side `node_modules` path; the Mac-side `native:sync` step must regenerate it before the Xcode build.
- Review the generated Android manifest's default `INTERNET` declaration during the native permission audit; remove it only after an Android smoke build proves the local Capacitor shell still loads without it.
- Approve any store submission, publication, legal agreement, purchase, or external distribution action. Codex will not perform those actions.
- Re-enable or approve Codex in-app browser access to the designated QA pages,
  including `http://127.0.0.1:4175/` and
  `https://8d5f404a.code-quest-lab.pages.dev/`. On 2026-08-05, both the local
  and Pages clean-profile Checkpoint 1 attempts were stopped before page access
  when browser security permission was denied; once access is allowed, ask
  Codex to resume the 1024x768 touch-first D1-8 and recovery evidence run.
