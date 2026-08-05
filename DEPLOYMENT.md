# Code Quest Lab - Web Deployment Package

Status: current checkpoint deployed and verified; future milestone publishes remain owner-approved (2026-08-05)

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

The 2026-08-05 checkpoint was published to the configured Cloudflare Pages
project `code-quest-lab` at commit `9da1d0e`, with primary hostname
`https://code-quest-lab.gov8661682.com/` and preview
`https://8d5f404a.code-quest-lab.pages.dev/`. The deployed shell hash is
`3A39EF4158EA494523FE04323D5D40BAA082E4C09F526A499707C3656EF139DA`.

`npm.cmd run production:check -- https://code-quest-lab.gov8661682.com` passed
on 2026-08-05. The preview live smoke reached profile creation, Town,
pause/finish, Manage Data export, and cleanup at 1024x768 with no browser
diagnostics; the primary hostname loaded with no diagnostics and its existing
Mage profile was left untouched. Repeat the owner-approved publish and live
checks after the next substantial tested milestone.
