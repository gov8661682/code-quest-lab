# Code Quest Lab - Known Issues

Updated: 2026-08-05

## P1 - release blocking

- The current checkpoint's public hostname and Pages preview now serve the verified shell, manifest, service worker, assets, build identity, and review routes. Repeat the production check after each later major-milestone deployment.
- Android/iOS projects are generated and synced, but no native build evidence exists. `native:android:build` stops because `JAVA_HOME`/`java` are absent; `cap build ios` stops because `xcodebuild` is unavailable. iOS requires Mac/Xcode.
- The generated iOS Swift Package manifest contains the Windows-side local App-plugin path; rerun `npx cap sync` on the Mac checkout so Capacitor regenerates a valid Mac-side package path before opening Xcode.
- Live StoreKit/Google Play purchase and restore adapters and sandbox transaction
  tests do not exist yet. The shared shell now has a fail-closed Capacitor
  discovery seam, and a non-purchasing development adapter is available for
  deterministic CI/reviewer harnesses but is excluded from `dist\`.
- Full V1 combat progression, boss fights, and ending are not fully executed by a player; route/boss handoff contracts and save-parser/loader matrices are automated, while browser/device migration and corruption-recovery evidence remain open.
- The first production-host 1024x768 QA run on 2026-08-05 reached three
  first-combat rooms but did not establish an enemy defeat through the tested
  touch Attack-joystick and desktop canvas-click inputs. A subsequent fresh
  Mage run on the 1024x768 Pages preview did establish visible click damage,
  enemy defeats, and progression through shrine, treasure, and Elite rooms,
  with no browser diagnostics. Full D1-8 completion and touch-device evidence
  remain active Checkpoint 1 gaps; no combat calculation change is justified.
- The 2026-08-05 AI expert playtest found low enemy/UI contrast and door-lock feedback close to the player at 1024x768, plus a corrupted dash in the first-combat onboarding prompt. The grouped follow-up is now in the verified 2026-08-05 deployment: encoding-safe combat/Town copy, a schematic Town minimap, a stable lock banner, stronger enemy silhouettes, and outlined HP bars. The live shell/profile/Town/Manage Data smoke passed; initial click-to-damage response is now reproduced on the Pages preview, while full route and touch-device evidence remain open. See `AI_EXPERT_PLAYTEST.md`.
- Dungeons 9-16 remain source-resident for future work but are now intentionally hidden from the V1 selection, waypoint, saved-world resume, and boss-exit chain. Their completion, balance, rewards, and device evidence remain post-release backlog work.
- A local session-exit follow-up clears stale dungeon lock and waypoint
  messages when returning to Town and is covered by two new contracts, but the
  fix is not in the deployed shell until the next substantial tested milestone.
- Local QA reproduced a D2 Corrupted-elite summon escalation under `Elite
  Invasion` that reached 15 enemies and held the door closed. Commit `6423ecb`
  bounds each elite to two summoned minions and preserves that budget in room
  checkpoints; the fix is tested locally but is not in the deployed shell
  until the next major checkpoint.
- A 2026-08-07 D4 elite-room follow-up reached five elites, defeated three, and
  then stalled on a fast/regenerating pair during bounded manual attacks. The
  local hardening now bounds D4 corruption to one surge per room and caps each
  Regenerating elite's total recovery at 25% of maximum health. The room must
  be rerun from a fresh post-fix session before this P1 progression risk can be
  closed or deployed.

## P2 - important but currently workaroundable

- Store screenshots, feature graphics, and final platform metadata are still not prepared or owner-approved; the PWA and Capacitor icon/splash raster set is now generated from the local branded SVG source.
- Boss and mini-boss fights are checkpointed at room level; an interrupted encounter restarts from the beginning of that room instead of restoring an exact combat frame.
- The existing source is a 56,957-line HTML file, which makes isolated testing and future maintenance difficult.

## P3 - backlog

- No TypeScript types or module boundaries.
- No bundled custom font or store artwork beyond the generated app icon/splash set.
- No physical-device performance or audio-session evidence.
- Generated Android templates retain Capacitor's default `INTERNET` manifest declaration; the owner must decide whether to retain or remove it after a native smoke build and permission audit.
