# Code Quest Lab - Known Issues

Updated: 2026-08-04

## P1 - release blocking

- The current checkpoint's public hostname and Pages preview now serve the verified shell, manifest, service worker, assets, build identity, and review routes. Repeat the production check after each later major-milestone deployment.
- Android/iOS projects are generated and synced, but no native build evidence exists. `native:android:build` stops because `JAVA_HOME`/`java` are absent; `cap build ios` stops because `xcodebuild` is unavailable. iOS requires Mac/Xcode.
- The generated iOS Swift Package manifest contains the Windows-side local App-plugin path; rerun `npx cap sync` on the Mac checkout so Capacitor regenerates a valid Mac-side package path before opening Xcode.
- Live StoreKit/Google Play purchase and restore adapters and sandbox transaction
  tests do not exist yet. The shared shell now has a fail-closed Capacitor
  discovery seam, and a non-purchasing development adapter is available for
  deterministic CI/reviewer harnesses but is excluded from `dist\`.
- Full V1 combat progression, boss fights, and ending are not fully executed by a player; route/boss handoff contracts and save-parser/loader matrices are automated, while browser/device migration and corruption-recovery evidence remain open.
- Dungeons 9-16 remain source-resident for future work but are now intentionally hidden from the V1 selection, waypoint, saved-world resume, and boss-exit chain. Their completion, balance, rewards, and device evidence remain post-release backlog work.

## P2 - important but currently workaroundable

- Store screenshots, feature graphics, and final platform metadata are still not prepared or owner-approved; the PWA and Capacitor icon/splash raster set is now generated from the local branded SVG source.
- Boss and mini-boss fights are checkpointed at room level; an interrupted encounter restarts from the beginning of that room instead of restoring an exact combat frame.
- The existing source is a 56,689-line HTML file, which makes isolated testing and future maintenance difficult.

## P3 - backlog

- No TypeScript types or module boundaries.
- No bundled custom font or store artwork beyond the generated app icon/splash set.
- No physical-device performance or audio-session evidence.
- Generated Android templates retain Capacitor's default `INTERNET` manifest declaration; the owner must decide whether to retain or remove it after a native smoke build and permission audit.
