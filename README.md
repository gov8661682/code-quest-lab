# Code Quest Lab

`index.html` is the learning portal. `code-quest-lab-source.txt` is an exact,
downloadable text copy of the current HTML for easy editing. `text 2.txt` is the
untouched original copy.

## Play

Live site: https://code-quest-lab.gov8661682.com/

Cloudflare Pages fallback: https://code-quest-lab.pages.dev/

On iPad, open the link in Safari and use the on-screen movement and skill controls. On a desktop browser, use:

- Move: `WASD` or arrow keys
- Aim and attack: mouse
- Skills: `Q` core, `E` movement, `R` ultimate, `F` potion, `G` interact
- Pause: `Esc`

Phones use the same touch controls with a compact HUD, smaller skill buttons,
safe-area spacing, and joysticks that adapt to the available screen size.

If Safari offers **Share > Add to Home Screen** and the school allows that feature, the site can launch more like an app. Progress is stored in Safari on that iPad, so clearing website data or changing browsers removes the local save.

The release shell includes a relative web manifest and a first-party service worker for the static app shell. It caches same-origin pages and uses the cached game entry only for offline document navigation; local save data is still device/browser-local.

This project does not attempt to bypass device-management or school web restrictions. If the published page is blocked, the school's administrator must allow the site.

## Update and publish

After every edit to `index.html`, refresh the downloadable text copy before
committing. The GitHub check will reject a change if the two files differ:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\sync-source.ps1
```

`index.html` is the game entry point, `site.css` and the page directories are
the public review surface, and `_headers` contains the Cloudflare security
headers. Build the complete static deployment package before publishing to the
`code-quest-lab` Cloudflare Pages project:

```powershell
npm.cmd run build
npx.cmd --yes wrangler pages deploy .\dist --project-name code-quest-lab --branch main --commit-dirty=true
```

The deployment package includes the game, manifest, service worker, original
vector assets, generated PWA install icons, and same-origin `/about/`, `/education/`, `/privacy/`,
`/support/`, `/contact/`, and `/schools/` pages. Do not run the publish command
until the owner approves public deployment.

## Local release checks

The repository has a dependency-free Node check/test/build loop:

```powershell
npm.cmd run release:verify
```

For fast gameplay-logic QA, run the deterministic representative encounter
suite before starting a long browser route:

```powershell
npm.cmd run qa:fast
```

It covers fixed-seed attack/collision/damage cycles, phase transitions, finite
summons, victory/loss/timeout, accelerated time, invincibility, high damage,
and enemy-free testing. Browser play remains necessary for input, rendering,
audio, saves, and tablet feel.

The build copies the static release surface to `dist\`. It does not publish or create native store builds.

## Native packaging scaffold

The repository includes generated Capacitor Android and iOS projects. The
branded native and PWA raster assets are regenerated from `assets/icon.svg`
with the development-only Pillow helper, then synchronized into the native
projects:

```powershell
npm.cmd run assets:generate
npm.cmd run native:sync
```

The helper is deterministic and requires Pillow only on the machine generating
assets. It is not a runtime dependency.

Android build evidence requires a supported JDK, Android SDK, and Gradle setup:

```powershell
npm.cmd run native:android:build
```

iOS builds require macOS and Xcode. Open `ios\App\App.xcworkspace` after
syncing, then perform the owner-controlled signing and device checks. These
commands do not publish, submit, or purchase anything.
