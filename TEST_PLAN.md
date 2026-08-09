# Code Quest Lab - Test Plan

Updated: 2026-08-09

## Test rules

- A check is marked passed only after it runs and produces evidence.
- Use a clean browser profile or a documented isolated storage state for destructive save tests.
- Do not use real store purchases. Use development/sandbox entitlements only.
- Record browser, viewport, commit, date, and result for each manual run.
- Treat 13-17-year-old tablet users as the primary test audience; inspect clarity and tone without adding childish language.
- Treat the public review pages and deployment package as release surfaces: verify every same-origin route, CSP/permissions headers, HTTPS, and clean-browser rendering.

## Managed touch-surface travel fallback - 2026-08-09

- On a fresh 540x720 local run, verify `Follow Northern Road` in Town enters
  the existing D1 Entrance zone without removing the walkable portal.
- Verify the entrance button opens the existing Dungeon Gate and difficulty
  selection, then verify the dungeon `START` button enters the first combat
  room.
- Clear one combat room with the protected developer QA aid, confirm
  `Proceed Through Exit` advances to the graph's forward room, and confirm the
  prompt is hidden in Town, entrance hubs, and unclaimed shrine/treasure rooms.
- Claim a shrine reward and confirm the same contextual exit fallback advances
  to its forward treasure room. In the unclaimed treasure room, confirm
  `Open Treasure` opens the existing loot overlay, then confirm closing the
  reward exposes the ordinary forward exit. Record this as managed-surface
  usability evidence only; it does not substitute for a clean player route,
  physical touch device, or the 10-30 minute tablet-session lane.
- Current result: Town -> D1 Entrance -> gate selection -> D1 `room_m0`,
  `room_m0` -> `room_m1`, shrine -> treasure, and treasure reward -> forward
  exit passed with empty browser diagnostics. Full release gate: 96/96; no
  deployment checkpoint.

## Baseline smoke journey

1. Open the app over HTTP.
2. Confirm the profile screen renders without console errors.
3. Create a Barbarian profile and confirm the class selection state.
4. Confirm entry into Town and visible keyboard/mouse instructions.
5. Send movement and attack input; confirm the game remains responsive.
6. Reload; confirm the saved profile appears.
7. Reopen the profile; open and close Pause/Resume.
8. Repeat the navigation checks at a phone viewport.

## Tablet session journey

1. Start with a clean profile on a 10- to 13-inch landscape tablet viewport.
2. Use touch controls only; do not rely on a keyboard or mouse.
3. Complete a meaningful 10-30 minute objective or checkpoint.
4. Pause, background/suspend, force-close if the test environment permits, and relaunch.
5. Confirm progress recovery, a clear session summary, a sensible next-step suggestion, and a safe stop point.
6. Repeat with audio muted and with headphones connected where hardware is available.

Baseline run on 2026-08-04 passed manually at 1280x720 and 390x844. The updated shell regression, pause/resume check, and offline cached reload also passed on 2026-08-04 with no browser error/warning entries. These are not yet full automated gameplay tests.

The active-run recovery slice also passed on 2026-08-04: a live dungeon run was reloaded, the local Session Recovered surface appeared after profile selection, Resume Session returned to the saved room, and Return to Town cleared the recovery state. A 1024x768 landscape HUD pass confirmed the objective and banner no longer overlap; this is browser evidence, not physical iPad/Android evidence.

A separate local-origin smoke pass on 2026-08-04 created a temporary Mage profile, traversed profile selection, Town, the Dungeons 1-8 route boundary, Dungeon 1 Normal and modifier selection, and the Dungeon 1 start-room surface. The temporary profile was deleted through Manage Data and browser logs were empty. Repeated in-app keyboard pulses did not produce a visible movement/door transition in that browser harness, so this pass does not count as full progression evidence.

A current clean-origin touch-layout pass on 2026-08-04 verified the in-world Town portal, Dungeon Entrance gate, Normal trial/modifier selection, and entry into a first procedural combat room at 540x720. The normal defeat summary and Return to Waypoint safe-stop path appeared with no browser error or warning entries. This does not yet pass the full-combat, boss, ending, suspension, or physical-device requirements.

A fresh touch-only 390x844 pass on 2026-08-04 repeated the Town-to-Dungeon-1 entrance, Normal trial/modifier selection, active `Ashen Pit` combat, and normal defeat/session-summary recovery flow. The temporary profile was deleted through Manage Data and the browser log was empty; this remains traversal/recovery evidence rather than a full V1 playthrough.

The deployed checkpoint was smoke-tested on 2026-08-04 at desktop 1280x720 and tablet 1024x768. A fresh desktop profile reached class selection, Town, the route/trial/modifier screens, and a first combat room; the tablet run reached the same first-combat surface, then used Finish and Manage Data to confirm the temporary profile's local run summary and delete it. Both live sessions reported zero browser diagnostics. This is deployed-flow evidence, not touch-only hardware, full-combat, 10-30 minute, suspension, forced-closure, boss, or ending evidence.

The latest live QA pass on 2026-08-05 used the configured production hostname at
1024x768 with a fresh Barbarian profile. It reached Town, the Dungeon 1
entrance, Normal trial, modifier selection, and three randomized first-combat
rooms (`Ashen Pit`, `Crypt Passage`, and `Dark Corridor`). The bounded onboarding
prompt and normal defeat/recovery flow appeared with no browser error or warning
diagnostics. A touch Attack-joystick drag, a touch tap plus movement, and
repeated desktop canvas clicks did not produce an observed enemy defeat in this
harness. This is a failed/incomplete combat-evidence attempt, not enough to
attribute the result to a product defect; repeat on another supported
browser/device or isolate event delivery before changing the attack path. The
temporary profile was removed through the in-game Manage Data confirmation.

### Local touch-surface and recovery probe - 2026-08-08

- URL: loopback shell with the developer QA gate, viewport 540x720, managed
  in-app browser, disposable Mage, Normal trial.
- Result: the visible touch attack control completed D1 combat, shrine,
  treasure, level-up, Stone Guardian Phase 2, and the portal into the Fallen
  Kingdom entrance. D2 pause/reload restored the same first combat checkpoint
  and displayed `SESSION RECOVERED`. A separate fresh-page probe re-enabled
  session-scoped invincibility, survived a bounded idle interval, cleared a
  D2 room, paused, and used `Finish and Return to Dashboard`.
- Limitation: the first resumed attempt ended because the session-only aid was
  not active after reload; a later protected probe verified the aid separately.
  Joystick drag events were not reliably delivered by this managed browser, so
  movement used the bounded keyboard fallback after repeated diagnosis. This
  is touch-surface evidence, not touch-only acceptance. The stored harness
  duration was inflated by waits and is not evidence of a meaningful 10-30
  minute human session. The temporary profile was removed through Manage Data;
  retained profiles were unchanged.
- Status: no confirmed product defect, no browser deployment, no score change;
  full touch-only session, summary/next-step review, clean D1-8/ending route,
  and physical-device lifecycle evidence remain required.

### Joystick click-fallback hardening - 2026-08-09

- The shared Attack joystick now has a guarded click fallback for managed
  surfaces that emit a click after pointer-up delivery is lost. The guard must
  not fire twice for a normal pointer-up tap and must not convert a directional
  drag into an attack.
- Focused combat contracts (18), `npm.cmd run release:verify` (93 tests),
  `npm.cmd run qa:fast`, the production build, and native sync passed after the
  change. A fresh uncached `localhost:4173` browser at 540x720 then confirmed a
  real center tap reduced D1 `Enemies: 2` to `Enemies: 1` with empty logs; a
  directional drag left a three-enemy room unchanged. The clear used the
  bounded high-damage QA aid, so physical-device/full-route and clean-player
  acceptance remain open.

### Contextual cleared-room exit fallback - 2026-08-09

- The bounded fresh-route diagnosis reached a cleared combat room on the
  uncached local shell at 540x720, but the managed browser did not complete
  forward-door movement through keyboard, arrow, joystick-drag, refocus, or
  pause/resume attempts. The route was stopped at the five-attempt limit; this
  is recorded as an input-surface limitation, not clean-player acceptance.
- The new `Proceed Through Exit` action must remain hidden in Dungeon Entrance
  and `START` rooms and in unclaimed shrine/treasure rooms, appear after a
  real forward combat clear or claimed reward, and preserve the existing
  save/fade transition. The local browser checks passed: it appeared after the
  QA room clear and advanced `room_m0` to `room_m1`, then advanced a claimed
  shrine into the treasure room.
- Focused contracts and the full **96-test** release gate passed, as did
  `qa:fast`, the production build, and Capacitor native sync. No deployment or
  score change is warranted by this local hardening slice.

### Fresh-profile functional V1 route probe - 2026-08-08

- Surface: loopback shell with `?cql-dev=1`, managed in-app browser, 540x720,
  new Mage profile, Normal difficulty.
- Result: D1, D2, and D4-D8 advanced through their authored entrance, room,
  reward, boss, and portal handoffs. The named bosses, final
  `THE SESSION IS COMPLETE` summary, optional Pattern recognition note,
  next-step suggestion, `Finish for Now`, and Pause -> `Finish and Return to
  Dashboard` were observed. Manage Data recorded the temporary profile before
  deletion; the three retained profiles remained present.
- Limitation: the managed browser again did not deliver normal attack input
  through the joystick or canvas coordinate path. Loopback enemy-free and
  current-encounter QA controls were used to finish combat, so this is
  progression/ending handoff evidence only, not clean-player or touch-only
  acceptance. Browser diagnostic logs were empty. Harness-inflated play time
  is not meaningful 10-30 minute human-session evidence.
- Status: no confirmed product defect, no deployment, no score change; repeat
  on a real touch-capable surface or a different supported browser for the
  outstanding combat and session acceptance lane.

## Required automated coverage

### Fast logic QA before normal-speed play

Run `npm.cmd run qa:fast` and the focused `tests/fast-qa.test.mjs` suite before
repeating a manual encounter. The fixed-seed model covers representative
early, mid, and late bosses plus loss and collision-miss boundaries. It checks
attack cadence, collision, damage, phase transitions, finite summon budgets,
victory, loss, timeout, accelerated time, invincibility, high damage, and
enemy-free mode in seconds. This is functional coverage; it does not replace
human assessment of fun, pacing, touch responsiveness, visual readability, or
audio.

For route-handoff regressions, the loopback-only QA controls can traverse the
functional D1, D2, D4, D5, D6, D7, and D8 chain in accelerated time. The
developer encounter-complete command must clear leftover boss adds, report the
correct boss identity, open the next portal, and leave the final session
summary/`Finish for Now` path usable. A disposable-profile run is diagnostic
functional evidence only; clean-player route, ending, and touch-session lanes
remain separate acceptance requirements.

- Save creation, serialization, loading, backup recovery, corruption recovery, migration, and deletion.
- Character creation, selection, switching, and deletion.
- Combat calculations and damage boundaries.
- XP/mastery progression, dungeon unlocks, achievements, equipment, crafting, and game completion.
- Purchase entitlement, restore, revocation/failure, and parent gate in development mode.
- Development entitlement adapter: owned, not-owned, pending, revoked,
  unavailable, restore, and wrong-product states; verify the adapter is not
  copied into `dist\` or exposed by the public browser shell.
- Settings persistence, input mapping, navigation, pause/resume, visibility/page lifecycle, and Android back behavior.
- Session checkpoints, summary/next-step state, Learning Support explanations, and no forced-quiz path.
- Starter attack data, shared touch/mouse/joystick attack routing, bounded desktop click/hold and managed-browser DOM/click attack fallbacks with nearest-target recovery, a bounded nearest-target tap on the touch Attack joystick, guarded duplicate-safe joystick click fallback, and pointer/touch joystick release fallbacks.
- Keyboard play-surface focus target and pointer-focus handoff.
- Bounded WASD/arrow release nudge for short key pulses, with blur/visibility clearing.
- Waypoint menu Close must remain dismissed while the player stays inside the waypoint radius; re-entry must be required to reopen it.
- The first Dungeon 1 combat room must provide the bounded ten-second read-and-respond window while player movement and attacks remain active and hostile simulation is paused; desktop pointer and DOM click input must share the production attack path, and a quick touch Attack-joystick tap must queue one nearest-target attack.

## Required manual coverage

- Desktop keyboard/mouse and touch on phone/tablet portrait and landscape.
- iPad and Android tablet landscape at representative 10- to 13-inch dimensions; touch-only operation.
- Drag both joysticks to the edge of their bases and release outside the base; confirm movement and attack input return to neutral after release on each supported browser/webview.
- Tap the center of the touch Attack joystick once; confirm one nearest-target basic attack is queued, then drag the same joystick to aim and confirm continuous directional attacks still work.
- Safe-area inset devices and narrow widths.
- Offline launch and offline play after first load, including restricted or blocked external network conditions.
- Interrupted save, corrupted save, repeated start/reload, and long-session soak.
- Reduced-motion/audio settings and readable text at the smallest supported viewport.
- No external window/redirect, account/login, or unnecessary permission request during normal play.
- Public web routes `/about/`, `/education/`, `/privacy/`, `/support/`, `/contact/`, and `/schools/` load in a clean browser profile and remain readable offline after shell caching.
- The deployment package contains no unexpected third-party script, host, source map, credential-like string, or debug route.
- Run `npm.cmd run production:check -- https://code-quest-lab.gov8661682.com` only after owner-approved deployment; it verifies current root, manifest, service worker, stylesheet, assets, public routes, and content types without mutating the host.
- Age-appropriate review of dialogue, fantasy violence, humour, visual tone, purchase language, and learning copy for 13-17-year-old users.
- Review that the game remains enjoyable without reading optional Learning Support.
- Android emulator/release build and physical Android device if available.
- iOS simulator/physical device if available; otherwise record the Mac/Xcode owner action.

## Available local commands

The repository now has a dependency-free Node check/test/build loop. `npm.cmd run release:verify` passed on 2026-08-04 with 57 Node tests and copies the complete static release surface to `dist\`. After the local server was stopped, the cached game and all six public review routes loaded with no browser logs. The source-mirror check remains in `.github/workflows/source-mirror.yml`. Native projects exist and sync successfully; native builds remain unavailable until the owner provides the required Android/JDK or Mac/Xcode environment.

Dependency security checks on 2026-08-04 passed with zero known vulnerabilities from both `npm.cmd audit` and `npm.cmd audit --omit=dev`.

The fresh local PWA check also passed on 2026-08-04: after a cached shell reload with the server stopped, the profile screen and retained local save opened into Town without browser logs. It does not replace the deployed-HTTPS, forced-close, or physical-device offline soak.
