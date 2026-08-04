# Code Quest Lab - Asset Register

Updated: 2026-08-04

The repository contains original vector source artwork and deterministic raster
release outputs. This register records what is present and what still needs
owner confirmation.

| Asset or system | Source | License/provenance | Status |
|---|---|---|---|
| Canvas world, characters, enemies, effects, minimap | `index.html` drawing code | Original/procedural project code; owner confirmation required | In use |
| DOM/CSS interface | `index.html` styles and markup | Original project code; owner confirmation required | In use |
| Sound effects/jingles | Runtime Web Audio/procedural code, if enabled by the current build | No bundled third-party audio; confirm all generated code is original | Audit required |
| Emoji/glyph icons | Unicode characters rendered by the device/browser | System-rendered glyphs; no bundled font asset | In use |
| Georgia/Times New Roman fallback fonts | Device/system font stack | Not bundled; final platform availability and licensing to be confirmed | In use |
| Logo, app icon, splash | `assets/logo.svg`, `assets/icon.svg`, `assets/loading.svg`; generated PNGs from `scripts/generate-native-assets.py` | Original procedural SVG source created for this project; raster outputs are deterministic derivatives; owner confirmation required | Web and Capacitor assets prepared |
| PWA install icons | `assets/icon-192.png`, `assets/icon-512.png` | Deterministic derivatives of the original `assets/icon.svg` | Included in manifest, static build, and offline shell |
| Native launcher and splash rasters | Android `mipmap-*`/`drawable-*` resources; iOS `AppIcon`/`Splash` asset catalogs | Deterministic derivatives of the original `assets/icon.svg`; no third-party artwork | Generated; native build/device verification remains open |
| Store screenshots, feature graphic, promotional image | Not yet shipped | Must be original/procedural or separately licensed and recorded before submission | Missing |

No asset is cleared for commercial distribution solely because it renders locally. Add creator, source URL, license, and receipt/permission evidence for every future non-procedural asset.
