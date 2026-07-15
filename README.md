# Infinite Dungeon

`index.html` is the playable game. `text 2.txt` is the untouched original copy.

## Play

Live game: https://joeys-game.gov8661682.com

On iPad, open the link in Safari and use the on-screen movement and skill controls. On a desktop browser, use:

- Move: `WASD` or arrow keys
- Aim and attack: mouse
- Skills: `Q` core, `E` movement, `R` ultimate, `F` potion, `G` interact
- Pause: `Esc`

If Safari offers **Share > Add to Home Screen** and the school allows that feature, the game can launch more like an app. Progress is stored in Safari on that iPad, so clearing website data or changing browsers removes the local save.

This project does not attempt to bypass device-management or school web restrictions. If the published page is blocked, the school's administrator must allow the site.

## Update and publish

`index.html` is the game and `_headers` contains the Cloudflare security headers. After testing a change, publish the two files to the `joeys-game` Cloudflare Pages project:

```powershell
$deployDir=Join-Path $env:TEMP 'joeys-game-pages-deploy'
New-Item -ItemType Directory -Force -Path $deployDir | Out-Null
Copy-Item -LiteralPath 'index.html' -Destination (Join-Path $deployDir 'index.html') -Force
Copy-Item -LiteralPath '_headers' -Destination (Join-Path $deployDir '_headers') -Force
npx.cmd --yes wrangler pages deploy $deployDir --project-name joeys-game --branch main --commit-dirty=true
```
