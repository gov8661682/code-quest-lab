# Code Quest Lab - Store Readiness

Status: draft; do not submit (2026-08-04)

## Current release surfaces

- Web deployment package: prepared in `dist\`; the 2026-08-04 checkpoint is deployed and verified from `https://code-quest-lab.gov8661682.com/`. Repeat the publish/check sequence for each later major milestone.
- PWA shell: manifest, service worker, and same-origin public review pages are included and locally cached successfully.
- Native shells: Capacitor Android/iOS projects are generated at app version `0.1.0`, but platform build and device evidence remain pending.
- Monetisation: shared verified-entitlement contract, fail-closed native discovery seam, parent-gated UI, and test-only non-purchasing adapter are present; no live product, payment adapter, or sandbox transaction exists.

## Product metadata draft

- Display name: Code Quest Lab
- Subtitle/short description: Offline fantasy action RPG that builds problem-solving through play
- Long description: Create a hero, learn responsive touch-first combat, explore layered dungeon runs, and build permanent mastery in an offline-first fantasy action adventure. Plan encounters, recognize patterns, manage resources, and experiment with builds while the fantasy game remains fun on its own. Sessions are designed for a natural 10-30 minute stop, with pause, autosave, checkpoints, and a clear summary. No account, chat, advertising, or network connection is required for core play.
- Suggested category: Games / Action or Adventure; owner to confirm.
- Provisional audience: secondary-school students approximately 13-17; not a Kids-category claim. Owner must complete the Apple and Google rating questionnaires and confirm final positioning.
- Keywords: action RPG, dungeon crawler, offline game, fantasy combat, touch controls, mastery, problem solving, computational thinking
- Ads: none planned for V1.
- User-generated content/chat: none planned for V1.
- Network requirement: none for core play.
- Permissions: no camera, microphone, location, contacts, or unnecessary device permissions planned.
- Normal play: no external websites, browser redirects, social login, classroom account, or unrestricted web access.
- Educational wording: use "builds/supports problem-solving and computational-thinking skills through play"; do not say the game teaches programming, improves grades, or is school-approved.

## Monetisation draft

- Free content: onboarding, Town, and the locked V1 introduction/dungeon slice.
- Premium content: permanent full-game unlock for the completed V1 scope (the current Dungeon 1-8 release route); later source-resident dungeons are hidden until completed and reviewed.
- Suggested owner-review price range: approximately US$2.99-US$5.99 equivalent, with final regional pricing set in the stores.
- Product ID placeholder: `codequestlab.full_unlock` (not live; owner must create and confirm platform-specific IDs).
- Purchase type: non-consumable / one-time product.
- Required flow: parent gate -> platform store purchase -> entitlement grant -> local entitlement cache -> restore purchases.
- Offline behavior: preserve the last verified entitlement for offline play; do not grant a live entitlement from an untrusted local flag outside development mode.
- Refund/revocation: platform result must remove the premium entitlement on the next verified status check; core save data must remain intact.

See `MONETISATION.md` for the full parent-gated, non-consumable design and test cases.

## Learning-support positioning

Learning Support is optional and on-device. It may explain a pattern, sequence, plan, optimization choice, condition, loop, decomposition, cause-and-effect relationship, or debugging step after play. It must not block the fantasy adventure with forced quizzes or long lessons.

## Store assets and remaining work

- App icon sets for Apple and Android are generated from the original local SVG source; owner approval and native build/device verification remain open.
- Branded splash/loading rasters are generated for the Capacitor projects; native build/device verification remains open.
- Gameplay screenshots at current store dimensions.
- Google Play feature graphic.
- Promotional image and optional preview video.
- Public support page and privacy-policy URL.

The repository now includes draft same-origin `/about/`, `/education/`,
`/privacy/`, `/support/`, `/contact/`, and `/schools/` pages. The owner must
approve the final public URLs and legal wording before store metadata is
considered complete.

## Screenshot plan

- Landscape iPad gameplay with touch controls and a clear objective.
- Android tablet gameplay showing a short session and readable HUD.
- Town/build planning screen showing meaningful choices without classroom-heavy copy.
- Optional after-session summary showing a strategy insight, not a score claim.
- No screenshot should imply online accounts, school approval, unsupported learning outcomes, or features not in the submitted build.

## Review notes draft

The app is playable without an account or network. Reviewer test mode should expose the full V1 path through a separately injected, non-purchasing entitlement adapter; the public build must not expose a production unlock toggle. Purchases are non-consumable and parent-gated. No ads, chat, user-generated content, precise location, microphone, camera, or contacts are used. Any platform purchase product IDs and sandbox instructions will be added before submission.
