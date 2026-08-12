# Code Quest Lab - Web Deployment Package

Status: current checkpoint deployed and verified; future milestone publishes remain owner-approved (2026-08-11)

## Intended deployment

- Product: Code Quest Lab web version, a complete supported game surface rather than a mobile-only demo.
- Primary hostname: `https://code-quest-lab.gov8661682.com/`.
- Hosting plan: Cloudflare Pages static delivery for the `dist\` package.
- Required transport: HTTPS with a valid certificate and the owner-controlled DNS record.
- No server, database, login, analytics SDK, external script, or secret is required for the static game package.

## Package contents

`npm.cmd run build` produces `dist\` containing:

- `index.html`, the game entry point and complete browser experience;
- `build-info.json`, a deterministic package version and canonical shell hash for clean-host verification;
- `manifest.webmanifest`, `service-worker.js`, and `site.css`;
- original local SVG icon, logo, and loading assets plus generated PWA install icons;
- same-origin public review pages: `/about/`, `/education/`, `/privacy/`, `/support/`, `/contact/`, and `/schools/`;
- `_headers`, including the restrictive content-security and permissions policies.

Before any owner-approved publish, run `npm.cmd run release:verify`. Its final
static-package audit checks that `dist\` contains exactly the prepared files,
matches the canonical sources, and has no source-map references, credential-like
strings, or external runtime resources.

The package is intentionally static and reviewable. The service worker caches
the app shell and public review pages after the first successful load, only
intercepts same-origin GETs, and falls back to `index.html` only for document
navigation. It does not create a server-side save or bypass an offline/network
policy.

## Owner-controlled publish flow

Run from the repository root after the owner has approved deployment:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\sync-source.ps1
npm.cmd run release:verify
npm.cmd run build
npx.cmd --yes wrangler pages deploy .\dist --project-name code-quest-lab --branch main --commit-dirty=true
```

If the owner confirms that the Pages project does not yet exist, create it
once before the deploy command and keep the production branch explicit:

```powershell
npx.cmd --yes wrangler pages project create code-quest-lab --production-branch main
```

Project creation and deployment change external hosting state and therefore
remain owner-approved actions. Do not run them as part of local verification.

Codex has prepared the files and instructions but does not publish, change DNS,
accept Cloudflare terms, or expose credentials.

## Post-deployment checks

1. Confirm the certificate, hostname, and redirect policy use HTTPS.
2. Load `/`, `/about/`, `/education/`, `/privacy/`, `/support/`, `/contact/`, and `/schools/` in a clean browser profile.
3. Confirm `/build-info.json` reports the expected version and 64-character shell hash; confirm the manifest and service worker register without third-party requests.
4. Test a fresh profile, a reload, a background/foreground transition, and an offline reload after caching.
5. Inspect response headers and confirm no debug secrets, source-map exposure, unexpected domains, or unnecessary permissions were introduced.
6. Record the final deployment URL, build identifier, and owner-approved privacy/support URLs in `STATUS.md` before calling the web surface an RC.

The repeatable read-only check is:

```powershell
npm.cmd run production:check -- https://code-quest-lab.gov8661682.com
```

## Current production audit

The 2026-08-12 Stone Guardian onboarding and player-following-guide checkpoint
was published from runtime commit `6e5812f` to the configured Cloudflare Pages
project `code-quest-lab`. Preview:
`https://ab0fd517.code-quest-lab.pages.dev/`; primary hostname:
`https://code-quest-lab.gov8661682.com/`. The deployed source hash is
`800B75EA81A332BD2BAA6A51E36390C444FACC507CA0F2F5E29BD2FE453A3DE9` and the
deployed service-worker shell is v11.

`npm.cmd run production:check` passed for both origins on 2026-08-12. The
live 600x768 smoke created a disposable Mage, reached Town, the Forgotten
Depths gate, Normal, Standard Expedition, and the first D1 combat room,
paused, finished through the dashboard, and deleted only the disposable
profile. Browser warning/error diagnostics were empty. The smoke is
QA-assisted and does not claim clean-player D1-D12 or physical/native-device
acceptance.

The 2026-08-11 room-entry motion and early Normal D1 onboarding checkpoint
was published from runtime commit `ae91268` to the configured Cloudflare
Pages project `code-quest-lab`. Preview:
`https://dfb05e32.code-quest-lab.pages.dev/`; primary hostname:
`https://code-quest-lab.gov8661682.com/`. The deployed source hash is
`ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094` and the
deployed service-worker shell is v11.

`npm.cmd run production:check` passed for both origins on 2026-08-11. A
fresh live 600x768 tablet smoke reached Town, the Forgotten Depths gate,
Normal, Standard Expedition, and the first D1 combat room, then returned
through the normal dashboard flow. A fresh 1024x768 desktop smoke reached the
same combat room and verified the desktop control surface. Browser warning and
error diagnostics were empty, and both disposable smoke profiles were deleted.
The local no-aid route cleared the first combat room and reached the first
mini-boss before ending; this checkpoint does not claim a complete clean
D1-D12 route.

The 2026-08-11 Level 1 room-entry approach-lane checkpoint was published from
runtime commit `0000f0d` to the configured
Cloudflare Pages project `code-quest-lab`. Preview:
`https://ca1ac0fa.code-quest-lab.pages.dev/`; primary hostname:
`https://code-quest-lab.gov8661682.com/`. The deployed source hash is
`E60F8F1D603A4F8FEE74715DE66A7ED04AE0325B4B7C715DF49E90338B33B56E` and
the deployed service-worker shell is v11.

`npm.cmd run production:check` passed for both origins on 2026-08-11. A
no-aid 600x768 live browser smoke reached Town, the Forgotten Depths gate,
Normal, Standard Expedition, and the first D1 combat room. Two captures about
half a second apart showed the enemies repositioning during the visible prompt.
The run was paused and finished through the normal dashboard flow, and the
temporary profile was deleted. This verifies the reported entry behavior and
main web flow without claiming full D1-D12 completion.

The 2026-08-10 Level 1 opening-pressure and enemy-motion correction was
published from runtime commits `1987310`, `a169c11`, and `fc7f738` to the
configured Cloudflare Pages project `code-quest-lab`. Preview:
`https://bad086fb.code-quest-lab.pages.dev/`; primary hostname:
`https://code-quest-lab.gov8661682.com/`. The deployed source hash is
`FF72502DB480DF89225A7335E68574DD983C75C08DC4077E2F223A1CC35AEDC4` and the
deployed service-worker shell is v10.

`npm.cmd run production:check` passed for both origins on 2026-08-10. A
cache-busted live smoke reached Town, the Forgotten Depths gate, Normal,
Standard Expedition, and the first D1 combat room. The room showed two enemies
and the `Read the room - move or attack` prompt; screenshots 1.8 seconds apart
showed enemy repositioning while HP stayed at 100%. No browser warning or
error diagnostics were recorded during the live route check. An earlier
cache-busted deployment also cleared both opening enemies with ordinary target
clicks; that supporting smoke remains recorded separately from the latest
movement-focused check.

The 2026-08-07 Dungeon 2 progression/level-up checkpoint was published to the
configured Cloudflare Pages project `code-quest-lab` at source commit
`9c451af`, with primary hostname `https://code-quest-lab.gov8661682.com/` and
preview `https://3edbf5d2.code-quest-lab.pages.dev/`. The deployed shell hash
is `404D82FD0AC5DDF612540B28C13BCAE93FDE5CA05798BAA731C433230B793AEA`.

`npm.cmd run production:check` passed on 2026-08-07 for both the configured
hostname and the preview. The live browser smoke reached profile creation,
Mage selection, Town, visible target assist, pause/finish, dashboard return,
and temporary-profile cleanup at the current 1078x912 managed browser surface
with no diagnostics; the primary-origin Mage profile was left untouched.
The 1078x912 live smoke created a Mage, reached Town, started Dungeon 1,
entered `COMBAT Cursed Gallery`, paused, finished, returned to the dashboard,
and removed only the temporary profile. Both production checks passed and no
browser error or warning diagnostics were recorded. Repeat the owner-approved
publish and live checks after the next substantial tested milestone.
