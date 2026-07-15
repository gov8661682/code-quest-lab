# Code Quest Lab

`index.html` is the learning portal. `text 2.txt` is the untouched original copy.

## Play

Live site: https://code-quest-lab.gov8661682.com/

Cloudflare Pages fallback: https://code-quest-lab.pages.dev/

On iPad, open the link in Safari and use the on-screen movement and skill controls. On a desktop browser, use:

- Move: `WASD` or arrow keys
- Aim and attack: mouse
- Skills: `Q` core, `E` movement, `R` ultimate, `F` potion, `G` interact
- Pause: `Esc`

If Safari offers **Share > Add to Home Screen** and the school allows that feature, the site can launch more like an app. Progress is stored in Safari on that iPad, so clearing website data or changing browsers removes the local save.

This project does not attempt to bypass device-management or school web restrictions. If the published page is blocked, the school's administrator must allow the site.

## Update and publish

`index.html` is the site and `_headers` contains the Cloudflare security headers. After testing a change, publish the two files to the `code-quest-lab` Cloudflare Pages project:

```powershell
$deployDir=Join-Path $env:TEMP 'code-quest-lab-pages-deploy'
New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
Copy-Item -LiteralPath 'index.html' -Destination (Join-Path $deployDir 'index.html') -Force
Copy-Item -LiteralPath '_headers' -Destination (Join-Path $deployDir '_headers') -Force
npx.cmd --yes wrangler pages deploy $deployDir --project-name code-quest-lab --branch main --commit-dirty=true
```
