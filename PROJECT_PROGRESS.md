# Code Quest Lab - Project Progress Report

Reviewed: 2026-08-12
Active checkpoint: Checkpoint 1 - Core game stability and complete V1 path
Release status: pre-release hardening; guidance and release-readiness milestone deployed and verified; not a Release Candidate

Main checkpoint completion: **93%**
Overall project completion: **19%**

The evidence-scored source is `CURRENT_CHECKPOINT.md`. Autonomous continuation,
progress-delta requirements, and the three/five-attempt loop breaker are
defined in `AUTORUN.md` and verified by an executable project-control contract.

## Latest 2026-08-12 progress delta

The shared touch joystick still treats Pointer Capture as optional, and window
and `visualViewport` changes now share an active-world reflow handler. During a
live session the handler refreshes room dimensions, clamps the player, and
recenters the camera after orientation or browser-chrome changes. Runtime
`3cce0e0` is pushed with source/mirror hash
`659C4A9A8AC97D7B7F514B778B01686BAD641D7351D03C83D2E3D419939C33C3`; the
local `release:verify` gate is **142/142** and `qa:fast` still clears all 11
released finales. It is local tablet release-readiness hardening, not a
deployment or score change; the deployed runtime remains `b5d701e`.

A fresh managed-browser smoke resized the current build through 1280x720,
1024x768, and 600x800; canvas dimensions matched each viewport, touch-oriented
controls remained visible, and no browser warnings/errors were captured. This
strengthens responsive browser evidence only; it is not physical-device,
touch-only, or full-route acceptance.

The player-following guidance checkpoint is now deployed: `TO DEPTHS`, `TO
GATE`, and `NEXT ROOM` arrows stay anchored to the character and point toward
the next destination, with no gate-mounted pulsing arrow. The first Normal D1
instruction remains surface-aware for pointer versus touch controls. Joey's
combat, story, and balance are unchanged. The canonical mirror, Capacitor
package, `release:verify` (**140/140**), `qa:fast`, production checks, and a
fresh live preview smoke through first combat, pause, and safe finish passed;
the disposable profile was deleted and diagnostics were empty. Runtime
`b5d701e` was published from current main snapshot `cca39fb` to preview
`https://ce226dfb.code-quest-lab.pages.dev/` and the configured hostname;
source hash `530E64C00A4DCFEE59BD7B7F4AF2640AD8BB142E54C8B5909BF40A8195EF6EF6`.
The **93%** / **19%** evidence score remains unchanged because clean-player and
physical/device acceptance are still open.

The accelerated QA layer now includes a data-driven no-aid mechanics-confidence
pass for all 11 released finales: D1, D2, and D4-D12. It exercises each named
boss's configured phase/add budget with ordinary attack cadence and real
incoming damage; D11 stays environment-first and D12 stays horde-and-explore.
The full local gate is **140/140**, and `qa:fast` reports all finales victorious
without developer aids. Commit `c1d4ba0` is pushed to `origin/main`. This does
not replace a clean human route or physical touch evidence, so the **93%** /
**19%** score and deployed `b5d701e` guidance checkpoint are unchanged.

Capacitor native commands are now junction-safe. The `native:sync` and
`native:android:build` wrappers resolve the real Git repository before running
the web build and Capacitor CLI, preventing the workspace alias from writing
invalid Android/Swift dependency paths. An alias-launched sync left the
generated native path files unchanged; **139/139** tests, the package audit,
Capacitor sync, and `qa:fast` passed. Commit `0a6e729` is pushed to
`origin/main`. This is release-tooling hardening rather than a runtime or
website milestone, so the **93%** / **19%** score and deployed `7b961b9`
checkpoint are unchanged.

The remaining C1 physical/native evidence boundary is now operationally
prepared in `DEVICE_ACCEPTANCE_RUNBOOK.md`. It defines separate clean-route,
10-30 minute touch-session, device/lifecycle, audio, offline, local-save, and
optional transfer checks, with a metadata/evidence packet and an explicit rule
that developer aids do not earn score credit. This is a release-readiness
handoff, not hardware evidence or a percentage increase; the **93%** / **19%**
score remains unchanged.

The PWA service-worker contract now also covers the successful same-origin
asset path: a network response is cached and the same asset is served after a
simulated network loss without retrying the network. This is deterministic
offline-readiness coverage, not physical-device/offline-soak evidence; the
local gate was **138/138** before the atlas slice and the **93%** / **19%**
score is unchanged.

The first open-world foundation slice now adds a touch-friendly World Atlas
to the dashboard. It uses Town, the released `REGION_ORDER`, existing
`worldLocation`, waypoint discovery, unlock conditions, and entitlement
gating; charted destinations continue through the current difficulty/modifier
flow, and D13+ remains sealed. The focused contract and full local gate pass
**139/139**. Commit `7b961b9` is pushed and deployed to the configured hostname
with preview `https://79d7af68.code-quest-lab.pages.dev/` and shell hash
`941F3BF438D61BBF3FFBC8D904AD06C6CAAD08986ADB5DB2998B6B5DD7A0A4E6`. Preview
UI smoke and the 600x768 route handoff pass; this is not full open-world
acceptance or C1 score credit.

The D13 preflight lane now closes the Joey-preserving standard reward boundary:
Realm of Space retains its two-room atmosphere, named Corruption of Space boss,
authored phases/death sequence, 2.0x guardian soul reward, boss XP/mastery,
named defeat statistic, death effects, and completion handoff. D13 remains
outside the release region order and save guard; progression to a future region,
save/return acceptance, and fresh play evidence are still intentionally gated;
the complete authored D13 story beats are now regression-protected.
Three focused future-content contracts pass; the full local gate remains
**139/139**. No D13 route or C1 score credit is claimed.

The local transfer matrix now loads checked-in `.txt` fixtures for legacy v1,
current v2 Mage data with backup and active-run checkpoint, invalid optional
checkpoint data, future v3, and unsupported Ranger content. It adds parser
coverage only; cross-device/native-storage and baseline-to-release runtime
evidence remain open, so the **93%** / **19%** score is unchanged.

A fresh-origin browser smoke then imported the current v2 fixture through the
real file chooser and recovered Dungeon 1 room `d1_room_a` at Level 7 / 42
Souls. A second origin imported the legacy v1 fixture as Level 5 / 17 Souls
with highest room 4. The temporary profiles were deleted through Manage Data;
this is alternate-origin browser evidence, not physical-device or true
cross-device acceptance, so the score remains unchanged.

A bounded fourth no-aid 600x768 Mage audit reached `Dark Corridor`; the visible
Attack joystick defeated one enemy, while an attack-only follow-up without
movement ended in death. The attempt is recorded as input evidence rather than
a balance failure, and the disposable profile was removed without touching the
retained save. The deterministic fast-QA harness now covers the fresh Mage
Stone Guardian onboarding loop without developer aids: one authored summon
phase, real incoming damage, and victory in **9.15 simulated seconds**. The
focused tests, `qa:fast`, and full local release gate pass **128/128** before
the D13 guard contracts were added. This
does not advance the **93%** / **19%** evidence score or claim a clean route.

The Town and dungeon-entrance guide now follows the character in world space.
It stays beside the player, rotates toward the real portal/gate, and hides near
the destination; no pulsing or gate-mounted arrow remains. The exact source
mirror passes **127/127**, `qa:fast`, package audit, and Capacitor
synchronization. A live `1280x720` desktop smoke displayed `TO DEPTHS` and
reached the first combat room. A live `600x768` tablet smoke showed the touch
joystick and its first tap defeated one enemy; both live checks had empty
browser warning/error diagnostics. Commit `4580631` is pushed to
`origin/main` and deployed on 2026-08-12 to preview
`https://932a4fb6.code-quest-lab.pages.dev/` and the configured hostname
`https://code-quest-lab.gov8661682.com/`; source hash:
`6E6998C32F899B48BC68C06439D213AE8D866B8068F84A29EBF7D5F10B79685A`.
The score remains **93%** / **19%**.

The fine-pointer input-surface gap found by a fresh no-aid route audit is now
addressed by a visible, keyboard-accessible `Attack nearest target` button.
The button uses the existing shared nearest-target queue; touch surfaces keep
the Attack joystick and target assist unchanged. A canonical `1280x720` smoke
displayed the button with the joystick hidden, clicked it in the first D1
combat room, and recorded no browser warnings/errors. This resolves the
managed-browser control dead end, but the clean-player D1-D12 lane and the
**93%** / **19%** score remain unchanged.

The first Normal Dungeon 1 Stone Guardian now uses a finite web onboarding
budget (`0.60/0.55/0.90/1.40/0.60` for HP, damage, speed, attack cadence, and
authored ability damage, plus `4.0s` entry grace). Joey's boss identity,
phases, summons, slam, cleave, meteors, rewards, and higher-difficulty
pressure remain intact. A production-shaped diagnostic now wins under the
bounded first-boss budget, and a fresh 600x768 loopback smoke showed `450/450`,
ordinary attack clearing, and the exit unlocking under the documented
session-only QA aid. The steady player-following guide also remains in place;
the gate itself has no directional marker. This is QA-assisted evidence, not
clean-player D1-D12 or physical/native-device acceptance.

The ordered local gate is now **127/127**, with `qa:fast`, package checks, and
Capacitor synchronization passing. The grouped GitHub/domain checkpoint is
complete: commit `7f1ea4f` is pushed to `origin/main` and deployed on
2026-08-12 to preview `https://c3162cd3.code-quest-lab.pages.dev/` and the
configured hostname `https://code-quest-lab.gov8661682.com/`. The deployed
source hash is `EC14E3B24CFF952F5D38C57E733B8B7C55DF7225EC12B95C03DF25E073856C82`;
both production checks, the live first-room control smoke, and preview shell
load passed with empty browser diagnostics. A separate 600x768 live smoke
kept the 94x94 Attack joystick visible and the fine-pointer fallback hidden;
its browser diagnostics were also empty. The score remains **93%** / **19%**.

The bounded release-route contract generates and walks the released D1-D12
chain, checks Joey's named finales and forward links, verifies the shared portal
handoff, and confirms the D12 session ending. Commit `471cf96` was pushed to
`origin/main` and deployed on 2026-08-12 to preview
`https://f55bf568.code-quest-lab.pages.dev/` and the configured hostname
`https://code-quest-lab.gov8661682.com/`. The deployed source hash is
`BE1349634B3F97983A19FBE2C192056B48778D2916A66CADE4DB6D906F21B34C`, PWA shell
v11, and production/desktop/tablet live checks passed. Clean-player D1-D12 and
physical/native-device evidence remain open.

## Latest 2026-08-11 progress delta

The room-entry motion report and the next early-route pressure findings are
resolved and checkpointed in runtime commit `ae91268`, pushed to `origin/main`,
and deployed to Cloudflare Pages at
`https://dfb05e32.code-quest-lab.pages.dev/` and
`https://code-quest-lab.gov8661682.com/`. The tested build has source hash
`ECA92EA8A0B4D3CECE61AA107C533425B88B3F485CCDC7F5926F6063023F0094` and PWA
shell v11. The first Normal D1 melee roster retains its bounded approach lane
(`132/28/18/84/36`), while mobile enemies now use a brief `1.35s` arrival
window whose visible drift is independent of the opening prompt. Normal D1
ordinary rooms through depth 5 and the first elite receive finite, Normal-only
onboarding budgets and grace windows; Joey's authored roster and mechanics
remain intact. The **121/121** gate, `qa:fast`, build/package audit,
Capacitor sync, both production checks, and live 600x768/1024x768 main-flow
smokes pass with no browser diagnostics. A clean local route cleared the first
room and reached the first mini-boss before ending. The score remains **93%** /
**19%** because clean-player D1-12 and physical/device acceptance are still
open.

## Latest 2026-08-10 progress delta

The Level 1 web balance report produced a deployed follow-up to the earlier
`7113366` pass. The production opening-room cadence was stricter than the
earlier QA model, and the opening prompt made stationary enemies look frozen.
The first Normal D1 combat room now uses `0.50` health, `0.45` damage, `0.55`
movement speed, `1.80` attack-cooldown scaling, and a bounded 10-second
read-and-respond grace window. Enemies reposition during the prompt, while
the intro state directly suppresses shared melee, projectile, debuff, and
opening special-attack damage. Joey's authored roster, later scaling, and
optional modifiers remain unchanged. Ordinary-player fast QA clears the room
in **6.1 simulated seconds**; the full local gate is **116/116**. Runtime
commits `1987310`, `a169c11`, and `fc7f738` are pushed to `origin/main` and
deployed at preview `https://bad086fb.code-quest-lab.pages.dev/` and the
configured hostname `https://code-quest-lab.gov8661682.com/`; both production
checks passed. Cache-busted live smoke showed two enemies changing position
with HP stable at 100% across 1.8 seconds and no browser warnings/errors. The
evidence score remains **93%** / **19%** until clean-player/device lanes
advance.

The preceding Level 1 onboarding balance checkpoint was deployed from runtime
commit `7113366` at preview `https://caacd1f4.code-quest-lab.pages.dev/` and the
configured hostname `https://code-quest-lab.gov8661682.com/`; both production
checks passed. It established the finite onboarding-only budget and close
starter placement. The production-cadence, enemy-motion, and deterministic
intro-guard follow-ups are separately deployed and recorded above as commits
`1987310`, `a169c11`, and `fc7f738`; the evidence score remains **93%** /
**19%**.

A fresh loopback Mage route extended live route coverage through D4-D6. It
verified D4's Fallen Hero event, off-screen target guidance, elite Crystal
Hollow, and Void Monarch; D5's Fallen Hero event and Chieftain phase-3
transition; and D6's Archmage arena plus custom phase/defeat handoff. The
route used the session invincibility aid and bounded developer damage/room/
phase aids after the D4 elite pair became impractical at normal Mage damage,
so this remains QA-assisted evidence and does not change the **93%** /
**19%** score. Browser diagnostics were empty. The tested milestone was then
checkpointed as commit `095aa30`, pushed to `origin/main`, and deployed to
Cloudflare Pages at `https://050a6395.code-quest-lab.pages.dev/` and
`https://code-quest-lab.gov8661682.com/`; both production checks and the live
desktop/tablet smoke passed.

A loopback Mage route now reaches the D1-D12 final session summary: the
developer phase helper exercised the authored D5-D12 boss transformations,
dialogue, rewards, Veteran unlocks, portal exits, and final flow, with the
source mirror and full **113/113** local release gate green. This remains
QA-assisted evidence and does not change the **93%** / **19%** score; the
tested milestone checkpoint is recorded above.

A disposable Mage also completed a managed **13-minute** 600x768 tablet
session with visible Move/Attack joysticks, target lock, step movement,
rewards, shrine/treasure choices, the Prison Warden, all Fallen King phases,
pause, and dashboard return. Its temporary profile was deleted after review;
retained profiles were preserved. Physical/native-device and clean-player
acceptance remain open.

A fresh managed normal-control route used the local session invincibility aid
and ordinary combat controls to complete D1 and D2 Normal end to end at
1024x768/600x768, including D2's Prison Warden, Fallen King phases, rewards,
Veteran unlock, and portal into D4, The Shadow Realm. A D4 attempt reached Broken Crossing and
recorded a truthful saved death after the aid was toggled off; a protected
restart verified the visible enable banner, combat, pause, and deliberate
finish. Browser diagnostics were empty. This materially improves the managed
route evidence, but it is not full D1-D12, clean-player, or physical-device
acceptance, so the scored checkpoint remains **93%** / **19%**.

A retained Level 3 Mage then started a new D1 Normal run with only session
invincibility. Normal mouse-target attacks and reward/exit controls cleared
Shadow Hall, the Elder Stone shrine, Bone Chamber, Treasure Chamber, Ruined
Archway, and Ashen Pit; Death Chamber was reached, one elite was defeated, and
the run was safely paused with two elites remaining at 36 kills. Diagnostics
were empty. This adds partial route evidence but not the full-route or device
acceptance required to change the score.

The D4 test-aid workflow is now idempotent: repeating `CQLI` cannot turn the
page-session invincibility aid off accidentally. Two consecutive activations
showed the enabled banner, and protected D4 combat stayed alive through
touch-sized input, pause, and deliberate finish. This is local QA hardening,
not a player-facing milestone or deployment checkpoint.

Necromancer's Stolen Graveyard is now part of the playable release surface
after D11. A loopback QA-assisted route reached the corrupted horde rooms,
Soul Collector content, The Ritual Altar, the Corrupted Necromancer's authored
transformation and custom Phase 2, soul-release defeat sequence, standard boss
rewards, Veteran unlock, and `THE SESSION IS COMPLETE`. A saved defeated-boss
reload also recreated the portal and verified the managed exit fallback. The
full **112/112** local release gate remains green. This completes the
functional route lane at **30/30**. The current build also now restores a
combat checkpoint into the pause menu before damage resumes; a managed-browser
run verified pause, reload, `SESSION RECOVERED`, safe Resume, Finish and Return
to Dashboard, and zero error/warning diagnostics. The **113/113** gate remains
green. Commit `e7871b0` was pushed to GitHub and deployed to Cloudflare Pages;
preview `a89328df.code-quest-lab.pages.dev` and the configured hostname passed
production checks, while live desktop and 1024x768 tablet smoke reached D1
combat and safe pause with no browser warnings or errors. This keeps the
active checkpoint at **93%** and the rounded overall project display at
**19%**; clean-player and physical-device lanes remain open.

Ranger Watchtowers remains part of the playable release surface after D10. A
loopback QA-assisted route reached the randomized environment-first
watchtower rooms, the Corrupted Ranger Captain's authored transformation and
custom Phase 2, peaceful defeat sequence, guaranteed Tier 8 salvage, Veteran
unlock, managed portal fallback, and `THE SESSION IS COMPLETE`. The full
**111/111** local release gate passed at that milestone; clean-player and
device lanes remain open.

Vow Breaker's Castle is now part of the playable release surface after D8.
A local QA-assisted route reached its Castle Gate, combat rooms, Royal
Commander mini-boss, Oathbreaker King phase transition and final defeat,
reward vault, Veteran unlock, and `THE SESSION IS COMPLETE` summary. The
mini-boss exit race found during this route is fixed: an unspawned delayed
mini-boss cannot be bypassed by a room-complete helper or exit prompt. The
source mirror, `qa:fast`, production build/package audit, Capacitor sync, and
full **109/109** release gate pass. This raises the functional route lane to
**22/30**, making the active checkpoint **82%**; the ten-checkpoint formula
still rounds overall progress to **18%** because clean-player and device lanes
remain open.

`PROJECT_MEMORY.md` now serves as one bounded rolling learning record. Every
autonomous cycle reads it first and updates existing facts in place instead of
stacking session logs. The executable control contract enforces the policy and
line limit; the full release gate passes **108/108**. This improves execution
discipline without changing the manual evidence score.

The encounter architecture now composes dungeon scaling, difficulty tiers, and
temporary Blood Moon/Titanic Foes modifiers through one
`getEncounterTuning(dungeonId)` contract. Shared enemies, minibosses, and all
named boss spawners use it while retaining Joey's bespoke mechanics. The
source mirror, build/package audit, native sync, fast QA, and full **108/108**
test suite pass. This improves future content safety but does not replace the
manual route/device evidence, so progress remains **79%** / **18%**.

Mini-boss selection now routes through `MINIBOSS_TYPES_BY_DUNGEON`, preserving
Joey's named rosters and providing one explicit extension seam for future
open-world regions. The focused architecture contract and full **108/108**
release gate pass; the evidence score remains **79%** / **18%**.

The composite `release:verify` command now refreshes the static package and
Capacitor web assets before running static-package tests. The new ordering
contract and full **108/108** release gate pass, eliminating the stale-build
failure loop after source edits; this changes workflow reliability, not the
manual route/device evidence score.

The first-session surfaces now explain the short fantasy-adventure premise,
describe modifiers as temporary run rules, and show unlocked routes as
`Available from Town gate` with a single reward line. The source mirror,
**108/108** release gate, deterministic fast QA, production build/package
audit, and native sync pass; the evidence score remains **79%** / **18%**.

Town now has a physical `North Road` signpost and a matching `ROAD` minimap
landmark pointing toward the existing Forgotten Depths portal. This is a
world-facing breadcrumb rather than a menu shortcut or teleport. The source
mirror, **108/108** release gate, deterministic fast QA, production
build/package audit, and native sync pass; the evidence score remains **79%**
and **18%** because manual clean-route and touch-session lanes are unchanged.

Skill, potion, optional Bob beam, and Auto Rush buttons now share a
duplicate-safe DOM-click fallback for managed tablet/browser surfaces that
lose pointer-up delivery. The full release gate is **108/108**; deterministic
fast QA, production build/package audit, and native sync also pass. This is
local usability hardening, so no deployment checkpoint or score change was
made.

A fresh normal-control Mage probe at 540x720, using only invincibility,
ordinary attacks, and Step movement, cleared D1/Stone Guardian, D2/Fallen
King, and early D4 before the browser session ended at the Corrupted Champion.
It is incomplete and unscored. The next browser attempt was denied localhost
permission; B-009 records the exact owner action needed to resume the clean
route evidence.

The transfer path also gained explicit legacy/current-schema fixtures: raw
legacy saves remain importable, future save versions and unsupported future
classes are rejected, and invalid optional checkpoints are not carried into a
new profile. This protects the existing `.txt` progress-preservation promise
without changing the local-only, non-overwrite behavior.

## Latest hardening evidence

On 2026-08-09, the new Step movement pad was verified in a fresh loopback Mage
run at 540x720. The four directional actions feed the shared movement and
collision loop, and the run used them for Town travel plus D1/D2/D4-D8 portal
handoffs. The route reached every V1 end boss and `THE SESSION IS COMPLETE`,
then completed Finish For Now and Pause -> Finish and Return to Dashboard. A
bounded normal attack attempt was exercised in D4; the accelerated remainder
used the documented developer encounter aid, so this is managed-surface
functional evidence rather than clean-player, physical-device, or 10-30-minute
touch acceptance. The disposable profile was deleted and browser diagnostics
were empty. The source mirror, `qa:fast`, production build, native sync, and
the **97-test** release gate pass. The score remains **79%** / **18%** and no
deployment checkpoint was created.

On 2026-08-09, a fresh protected Mage route on the uncached local shell at
540x720 reached a cleared D1 room, then reproduced a managed-browser
navigation failure: normal directional input did not reach the forward door.
Keyboard, arrow, joystick-drag, refocus, and pause/resume paths were bounded
under the five-attempt loop policy and the route was stopped. The disposable
profile was deleted; no clean-player or touch-only score was claimed.

The targeted response adds an optional touch fallback for constrained browser
surfaces. Town exposes `Follow Northern Road`, an entrance hub exposes its
existing gate flow, and a dungeon `START` room exposes `Enter Dungeon`; normal
walking remains available. `Proceed Through Exit` is hidden in Town, entrance
hubs, and unclaimed static rooms, appears after a real forward combat clear or
a claimed shrine/treasure reward, and preserves the existing save and
transition handoff. Fresh 540x720 runtime checks used the fallback to advance
Town -> D1 Entrance -> gate selection -> D1 `room_m0`, then `room_m0` ->
`room_m1` and a claimed shrine -> treasure. An unclaimed treasure also exposed
`Open Treasure`, delivered the existing loot overlay, and then exposed the
ordinary forward exit. The source mirror, **97-test** release gate, `qa:fast`,
production build, and native sync pass. The score
remains **79%** / **18%** and no deployment checkpoint was created.

On 2026-08-08, a local 540x720 touch-surface probe used a disposable Mage to
exercise D1 combat, shrine, treasure, level-up, the Stone Guardian Phase 2
fight, and the portal into the Fallen Kingdom entrance. D2 pause/reload showed
`SESSION RECOVERED` in the same combat room; a separate protected probe then
survived a bounded idle interval, cleared a D2 room, paused, and used `Finish
and Return to Dashboard`. The managed browser did not deliver joystick drags
reliably, so movement used the bounded keyboard fallback after diagnosis. The
first resumed attempt also ended before the session-scoped invincibility aid
was re-enabled. This is not full touch-only, 10-30 minute, summary, ending, or
physical-device evidence; harness-inflated play time is not credited. The
temporary profile was deleted and retained profiles were unchanged. The score
remains **79%** / **18%**, and no deployment was made for this incomplete local
evidence slice.

The same cycle also ran a new disposable Mage through the full functional V1
route boundary: D1, D2, and D4-D8. All named bosses, shrine/treasure surfaces,
portal handoffs, `THE SESSION IS COMPLETE`, optional Pattern recognition
support, next-step copy, `Finish for Now`, and Pause -> `Finish and Return to
Dashboard` were observed. Because the managed-browser joystick/attack path
still failed to deliver normal attacks, enemy-free and current-encounter QA
controls completed combat rooms; this is fresh-profile functional evidence,
not clean-player or touch-only acceptance. The diagnostic log was empty and
the disposable Level 22/2527-Soul profile was deleted; retained profiles were
unchanged. The score remains **79%** / **18%**, and no deployment was made.

The follow-up input hardening is local and intentionally unscored. The shared
Attack joystick now accepts a guarded click fallback for managed surfaces that
emit a click but lose pointer-up delivery; duplicate pointer-up taps and
directional drags remain suppressed. The source mirror is synchronized, and
18 focused combat contracts, `release:verify` (93 tests), `qa:fast`, the
production build, and native sync pass. A fresh post-edit browser run on an
uncached `localhost:4173` origin at 540x720 confirmed one real center tap
reduced D1 `Enemies: 2` to `Enemies: 1` with empty browser diagnostics, and a
directional drag left a three-enemy room unchanged. The room clear used the
bounded high-damage QA aid, so this is managed-browser input evidence, not
physical-device, full-route, or clean-player acceptance; the score remains
**79%** / **18%** and no deployment was made.

The next route QA slice is locally verified and recorded as a GitHub/website
checkpoint.
On a disposable loopback Mage profile, the invincibility aid and 10x QA speed
completed the functional D1, D2, D4, D5, D6, D7, and D8 chain, including every
named boss, each portal handoff, the final session summary, and `Finish for
Now` back to Town. The shared fixes now clear QA-completed boss summons, keep
the exit objective truthful, and replace the stale `Back to Practice Modules`
copy with `Back to Dungeon Entrance`. The full suite passes 93 tests, while the
score remains **79%** / **18%** because this is not clean-player route or
touch-first acceptance evidence. Commit `20f85ba` (`Harden V1 route exit
handoffs`) was pushed to `origin/main` and deployed on 2026-08-08. Pages
preview: `https://d8829db6.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. Production checks and live
desktop/tablet profile-shell smoke passed. Deployed source SHA-256:
`553C51477907DDDA9CA67AF0D1C79581378A676EAE83741627645ED1D4682A19`.

The 2026-08-08 architecture slice is locally verified and recorded as a
GitHub/website checkpoint. `ARCHITECTURE_REVIEW.md` documents the 57,394-line
runtime audit and the bounded plan. `BOSS_IDENTITY_DEFS` now centralizes named
boss representation, while loopback-only developer QA provides accelerated
time, phase/room/boss stepping, enemy-free/high-damage modes, and structured
telemetry. The fixed-seed representative combat model passes its 11 focused
tests and `npm.cmd run qa:fast`; the full suite passes 92 tests, the build and
17-file package audit pass, and `npm.cmd run native:sync` passes. No creative
content was removed and no acceptance percentage is claimed from this work;
the active score remains **79%** / **18%** until route, ending, and tablet
session evidence changes the weighted table.

The checkpoint commit is `2c1d6ba` (`Add deterministic gameplay QA
architecture`), pushed to `origin/main` and deployed on 2026-08-08. Pages
preview: `https://7c154632.code-quest-lab.pages.dev/`; configured hostname:
`https://code-quest-lab.gov8661682.com/`. Preview and hostname production
checks passed, and the live browser smoke passed at 1024x768 and 1440x900 with
the playable profile/entrance surface and no horizontal overflow. Deployed
source SHA-256:
`00349B9312F68EE8402F143785AEEA28FB5FD5D0386E114D0501E5B2336448FC`.

Commit `9886f50` (`Bound Void Monarch summon pressure`) was pushed and deployed
on 2026-08-07. The Void Monarch now has four finite beast summon waves and
four phase-aware crystal summon waves, preserving encounter pressure while
ensuring target assist and player damage can converge on the boss. The earlier
loopback-only `F8 F7 F6 F4` aid still preserves live boss encounters while
clearing summons, and the D4 HUD identifies the Void Monarch correctly. All
84 tests, the 17-file build/package audit, native sync, production checks, and
live smoke passed. Preview: `https://c45c9c7c.code-quest-lab.pages.dev/`;
deployed shell SHA-256:
`C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
The evidence score remains **79%** / **18%** because D4-8, the ending, and
the full touch-first safe-stop acceptance lane are still open.

## Review basis

This report is based on the implementation, executable tests, generated package,
Git history, and current deployment—not only on comments or planning files.

- Repository: `C:\Users\vlsf\Desktop\Codex\Joey's Game`
- Git state: the current deployed runtime is `b5d701e` (`Add adaptive first-room
  control guidance`) on `main`, while the current local tested runtime is
  `3cce0e0` (`Harden mobile viewport reflow`). This checkpoint records the
  deployment from snapshot `cca39fb`; D13+ remains gated from the player-facing
  atlas and route order.
- Canonical game: `index.html`, SHA-256
  `659C4A9A8AC97D7B7F514B778B01686BAD641D7351D03C83D2E3D419939C33C3`
- Download mirror: `code-quest-lab-source.txt` is byte-identical to `index.html`
- Latest Joey reference audit: `CREATIVE_REFERENCE_AUDIT.md`, reference SHA-256
  `8E8E4B95D06AD7402714208F3EC4E463978D8C928D00E97A793FA34074859CDB`; the
  audit is complete and is not being repeated
- Current local verification: `npm.cmd run release:verify` passes **142/142**
  tests, the 17-file build, the static-package audit, and Capacitor sync;
  `npm.cmd run qa:fast` also passes.
- Current live verification: `npm.cmd run production:check -- https://code-quest-lab.gov8661682.com`
  and the matching preview check passed on 2026-08-12; the deployed shell
  hash is `530E64C00A4DCFEE59BD7B7F4AF2640AD8BB142E54C8B5909BF40A8195EF6EF6`.
- Last website checkpoint: runtime `b5d701e`, deployed and live-verified on
  2026-08-12 at `https://code-quest-lab.gov8661682.com/`; preview
  `https://ce226dfb.code-quest-lab.pages.dev/` also passed the production
  check and fresh first-combat/safe-stop smoke.
- Latest local route evidence: a disposable Mage profile completed the full
  observable Dungeon 1 touch-first slice through the Stone Guardian and exit
  portal, then completed the patched Dungeon 2 Normal route through shrine,
  treasure, a bounded two-elite room, the three-phase Fallen King, and the exit
  portal into The Shadow Realm Entrance with the loopback developer aid
  enabled. The disposable profile was deleted after the run and the retained
  Mage/Barbarian profiles were verified unchanged. This maintains the evidence
  score at 79% / 18%; D4-8, the ending, and the full safe-stop session remain
  open.
- The elite pacing follow-up caps the combined health consequence of depth,
  dungeon, elite, and Giant modifiers at 2.5x authored base health while
  leaving their size, damage, defense, and behavior identities intact. Touch
  and desktop attack taps also wait for cooldown readiness. The two focused
  contracts are included in the 83-test release gate and the verified deployed
  milestone.
- Latest isolated QA evidence: a temporary Mage profile completed Dungeon 1
  through the Stone Guardian and portal, then reached the D2 `Dark Inquisition
  Chamber` elite room. `Elite Invasion` plus a Corrupted elite reproduced an
  escalation to 15 live enemies and a locked door during bounded attacks;
  the run was finished safely and the temporary profile was deleted. Commit
  `6423ecb` bounds each Corrupted elite to two summoned minions and persists
  that budget through room checkpoints. This is a progression-hardening result,
  not a completed D1-8 route or ending.
- Follow-up D4 QA reached `ELITE The Long Fall` after clearing the preceding
  D4 combat, shrine, ambush/reward, and story rooms; three of five elites were
  defeated before the remaining fast/regenerating pair was safely stopped.
  The temporary Level 20/1199 Souls profile was deleted through Manage Data.
  The local fix now bounds D4 corruption to one surge per room and limits each
  Regenerating elite to a finite 25% maximum-health recovery budget. This does
  not change the C1 score until a fresh route rerun proves the room is playable.

A separate fresh temporary Mage profile verified the patched local shell
through Dungeon 1 Normal content including first combat, shrine, event,
treasure, elite, and a later cleared combat room. It reached Level 7, so the
Dungeon 4 route remained correctly locked; the temporary profile was safely
deleted and the retained Mage/Barbarian profiles were unchanged. This adds
clean-profile D1 progression evidence but does not close the D4 rerun or
D1-8 acceptance gates.

## Completed

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Baseline preservation and Git checkpoint | Complete | Baseline tag `code-quest-lab-baseline-2026-08-04`; backup recorded in `STATUS.md`; `main` is clean and synchronized with `origin/main` | Reuse the baseline; reopen only for a verified defect | GitHub access for future milestone pushes | Yes | Do not restart the baseline audit |
| Joey creative-reference audit | Complete as an audit and content ledger | `CREATIVE_REFERENCE_AUDIT.md` records the reference hash, preserved story/dialogue/endings, missing classes, later content, D16 Phase 4 gap, and Smelter contradiction | Implement only through isolated parity milestones; do not replace the current source wholesale | Product decision if any audited content is promoted into V1 | The audit is V1 governance; most parity content is deferred | Preserve the ledger and work from the active checkpoint |
| Product direction and V1 scope lock | Complete | `PRODUCT_VISION.md`, `V1_SCOPE.md`, `TARGET_AUDIENCE.md`, `MONETISATION.md`, and `DECISIONS.md` define teen-first, touch-first, offline, privacy-minimal, optional-learning, and fair-monetisation boundaries | Owner review and final release decisions remain | Owner approval of ratings, privacy, and commercial position | Yes | Keep new ideas in `BACKLOG.md` unless release-critical |
| Source mirror, release contracts, build and static package | Complete for the current checkpoint | `npm.cmd run release:verify` passed; `index.html` and the downloadable mirror match; `dist\` contains 17 expected files and matches native web bundles | Repeat after each major milestone and before RC | Node/npm environment | Yes | Keep the verification command green |
| Versioned plain-text profile transfer | Complete at local web/package boundary | Manage Data exports a `CODE QUEST LAB PROFILE EXPORT` `.txt` envelope containing durable data, a valid backup, and any valid active-run checkpoint; a real browser file-chooser upload imported a matching Level 4 Barbarian copy without changing the original; checked-in fixtures cover legacy v1, current v2 with backup/checkpoint, invalid optional checkpoints, future save versions, and unsupported classes | Cross-device and baseline-to-release runtime evidence; future-class migration remains gated until Joey's additional classes are promoted | Clean storage profiles and representative supported surfaces | No; supports save portability | Keep the format stable and use the fixtures as the migration guardrail |
| V1 navigation boundary and procedural route contracts | Complete as a release guard | `REGION_ORDER` exposes Dungeons 1, 2, and 4-12; automated contracts cover every shipped generator, route validation, boss endpoints, legacy checkpoint rejection, D12 recovery portal behavior, and the final session summary endpoint | Manually complete the bounded route before calling gameplay complete | Stable combat and manual QA | Yes | Validate the path in a clean profile; do not promote D13-16 yet |
| Core save parser/loader contracts | Complete at the tested code boundary | `parseCharacterSave`, `loadPermanentData`, backup promotion, defaults fallback, legacy mastery migration, checkpoint parsing, session lifecycle, and profile-transfer contracts are executable; 81 tests pass; a fresh local Mage survived page close/reopen, resumed the visible checkpoint, and finished safely | Native/device migration, corruption, suspension, and cross-version evidence | Clean profiles and representative devices | Yes | Continue the remaining native/device and migration evidence in Checkpoint 1/3 |
| Session recovery, pause/stop surfaces, and input hardening | Complete at the implemented browser contract boundary | Active-run checkpoint, Resume Session, Return to Town, Finish For Now, page-background save order, keyboard focus, touch/mouse attack paths, joystick release, and first-room onboarding are implemented and covered | Prove a complete 10-30 minute touch session and device behavior | Browser/device QA | Yes | Continue with clean-profile playthrough and lifecycle QA |
| Public review pages, safety boundaries, and local-first architecture | Complete as an implementation foundation | About, Educational Purpose, Privacy, Support, Contact, School Review, same-origin navigation, restrictive headers, no account/chat/analytics/ad runtime, and bounded educational claims are present and tested | Owner/legal review, hosting-log disclosure, school review, and final wording approval | Owner decisions and final hosting configuration | Yes | Keep the surfaces synchronized with the shipped build |
| Capacitor project scaffold and lifecycle seam | Complete as a scaffold | Android/iOS projects are generated and synced from `dist\`; landscape configuration, App lifecycle/back-button bridge, native entitlement discovery seam, and static native contracts pass | Native builds, hardware QA, Mac-side sync, permission review, and signing | Android JDK/SDK/Gradle; Mac/Xcode; owner accounts | Packaging is required for the stated product, but not complete | Resolve the owner/environment blockers without changing the web game |
| Entitlement boundary and development adapter | Complete as a non-purchasing core | Product identity validation, verified-source checks, parent gate, restore/revocation handling, fail-closed native discovery, and development adapter matrix pass; development adapter is excluded from `dist\` | Live StoreKit/Google Play adapters, sandbox transactions, pricing, refund flow, and owner approval | Store products, credentials, sandbox accounts, platform builds | Yes for a monetised release; not yet live | Keep the boundary; do not add a browser unlock shortcut |
| Current web deployment checkpoint | Complete for the 2026-08-12 guidance and release-readiness milestone | Cloudflare Pages project `code-quest-lab`; runtime `b5d701e` is pushed, preview `ce226dfb` and the configured hostname passed production checks, deployed source hash `530E64C00A4DCFEE59BD7B7F4AF2640AD8BB142E54C8B5909BF40A8195EF6EF6`, and fresh preview/primary release-shell and first-combat safe-stop smokes passed | Repeat the owner-approved publish after the next major tested runtime milestone; full D1-12 clean-player route and physical touch evidence remain separate | Owner-approved hosting access for future publishes | Yes | Finish fresh D1-D12 route and remaining touch/device evidence |
| Open-world product and architecture direction | Complete as the staged released-route foundation; full expansion remains post-C1 | `OPEN_WORLD_DIRECTION.md` defines the connected-world player experience, region/landmark/dungeon layers, `WorldState` target, save boundaries, Joey-content preservation, and acceptance bar; runtime commit `7b961b9` now ships the Town/released-route World Atlas with honest locks and existing route handoff; `DECISIONS.md` records the explicit owner direction | Add optional landmarks, persistent discovered connections, save migration, and future regions only through complete route/reward/device milestones | C1 route completion, save migration design, touch/PWA evidence, and a major milestone scope decision | Open-world compatibility is required; full open-world expansion is post-C1 | Preserve the design target while completing C1; do not add untested destinations |
| AI expert playtest and first usability fixes | Playtest complete; grouped copy, Town orientation, and readability follow-up are deployed; initial attack response is reproduced; full progression evidence remains open | `AI_EXPERT_PLAYTEST.md` records the fresh 1024x768 live journey, zero browser diagnostics, open-world observations, combat readability findings, modifier concern, and prioritized recommendations; onboarding/Town copy, minimap, lock banner, enemy silhouettes, and HP-bar treatment are live in the checkpoint shell; the D2 elite playthrough reproduced a Corrupted summon escalation and local commit `6423ecb` bounds it with a finite budget | Continue the clean-profile C1 route and complete the touch/tablet lifecycle evidence; keep the local hardening fix under regression coverage before the next deployment | Supported browser/device input, C1 combat evidence, and stable build | Yes for release usability; open-world suggestions are staged | Re-test the corrected D2 elite room, then continue D1-8 evidence |

## Partially completed

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Full V1 gameplay and progression | Dungeon 1 touch-first slice is now player-completed; the full V1 path remains incomplete | `index.html` contains Town, four classes, combat, equipment, crafting, achievements, dungeon definitions, boss dispatches, and the D1-12 release guard; a local QA-assisted Mage cleared the D1, D2, D4-8, D9, D10, D11, and D12 chain, including the Head Researcher, The Alchemist, Corrupted Ranger Captain, Corrupted Necromancer, and final session summaries | Continue the bounded D1-12 path from a fresh profile; complete the route without encounter aids, then record balance and safe-stop behavior | Clean browser profile, supported input surface, and stable combat | Yes | Continue with clean D1-12 evidence, then evaluate D13 promotion as the next content milestone |
| 10-30 minute session design | Safe-stop/reload sequence is verified in the current managed browser; duration and physical touch evidence remain open | Checkpoint/autosave, pause/resume, session summary, next-step copy, optional Learning Support, and Finish For Now are in the shell and contracts; a current-build run at port 4176 reached D1 combat, reloaded `SESSION RECOVERED`, resumed safely from the exact room, paused, and finished to Dashboard with no error/warning diagnostics | Observe a meaningful 10-30 minute session on a representative tablet-sized browser/device, including stopping and resuming without loss | Tablet/browser or device access and working combat input | Yes | Run the remaining touch/device session; do not repeat the completed managed-browser recovery check |
| Save migration, corruption recovery, and lifecycle | Strong automated boundary, incomplete real-storage evidence | Save version 2, primary/backup recovery, migration, active-run checkpoint, page-background order, and deletion tests pass | Test malformed primary with backup, interrupted writes, reload/background/forced-close, baseline-to-current compatibility, and deletion in real browser/native storage | Isolated storage profiles and native devices | Yes | Use the existing tests as the guardrail and add only evidence-driven coverage |
| Tablet, touch, accessibility, and audio experience | Browser layout/input hardening exists; physical and full usability review is open | Live 1024x768 and local 390x844/540x720 passes; keyboard-focus target, touch joysticks, release fallbacks, reduced-motion/audio settings and safe-stop surfaces are present | Touch-only hardware testing, safe areas, readability, muted/headphones, reduced motion, full accessibility review, and no P1 usability defects | iPad/Android tablet or equivalent managed-browser environments | Yes | Complete the browser/device slice after the clean route is playable |
| PWA and offline behavior | Local shell and deterministic service-worker contracts pass | Relative manifest, v6 service worker, same-origin GET isolation, navigation-only fallback, public-page cache, and stopped-server reload evidence are present | Clean install/Add to Home Screen, deployed cache update, forced-close/offline soak, and physical device offline launch | HTTPS browser/device access | Yes for the web release | Run the PWA/offline journey as a separate major checkpoint |
| Creative parity beyond the current four classes and D1-12 | Preserved and documented, not runtime-complete | Current selectable `CLASS_ORDER` has Barbarian, Mage, Rogue, Druid; source-resident later bosses/story remain gated; Joey's reference adds Ranger, Necromancer, Alchemist, Paladin, extra sets/materials, and seven D16 Phase 4 attack families | Decide promotion scope; implement each class/content family with save, HUD, skills, equipment, balance, browser play, and milestone evidence | Product decision and substantial engineering/QA time | No under the current release surface; preserve for post-release | Keep in backlog; do not mix with active C1 work |
| Website release readiness | Current deployment works, but RC publication evidence is not complete | Current production check passes and the 2026-08-04 deployment is recorded; public pages and headers are present | Re-run release/build/deploy/live verification for the final RC, reconcile owner-approved policy/support URLs and logs | Owner deployment approval and final build | Yes | Use the major-milestone protocol; no ad-hoc deploys |
| Native packaging | Project generation and sync are done; build/device path is open | `android\`, `ios\`, Capacitor config, generated assets, and lifecycle contracts exist; `native:doctor` reports Android configuration okay and Xcode absent | Build Android and iOS, regenerate the iOS package on Mac, test lifecycle/storage/audio/safe areas, and record artifacts | Environment blockers in `BLOCKERS.md` | Yes for iOS/Android release | Prepare exact commands and hand off owner-only environment actions |
| Monetisation and store integration | Core policy and fail-closed boundary exist; production transactions do not | `MONETISATION.md`, `platform\ENTITLEMENT_CONTRACT.md`, entitlement tests, parent gate, and development adapter are present | Integrate and test real platform adapters only after owner supplies products, accounts, sandbox data, pricing, and refund policy | Apple/Google accounts, product IDs, credentials, signed builds | Yes for a monetised release; not yet live | Keep production access fail-closed until verified |
| Compliance, licensing, and store materials | Drafts exist; owner approval is absent | `PRIVACY.md`, `LICENSES.md`, `ASSET_REGISTER.md`, `STORE_READINESS.md`, `SCHOOL_REVIEW.md`, and `OWNER_ACTIONS.md` identify the open decisions | Confirm code/asset rights, age/content rating, privacy/log treatment, school requirements, icon/screenshot/feature graphic, metadata, and support route | Owner/legal/platform decisions | Yes for public/store release | Resolve owner actions in dependency order |

## Not started

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Manual clean-profile completion of every shipped V1 dungeon and ending | Partial evidence only; not complete | The latest QA-assisted local route reached the D1-12 endpoint, but automated generators and developer room controls do not simulate a player | Produce a dated, reproducible D1-12 completion record with bosses, endpoint, rewards, ending, and no browser diagnostics; then validate touch/tablet lifecycle behavior | Stable gameplay, working supported input, and enough time/device access | Yes | Continue the clean route from the now-confirmed D12 endpoint |
| Cross-version save soak from baseline to RC | Not started as end-to-end evidence | Parser fixtures and mocked loader matrices exist, but no recorded baseline-save-to-RC browser/native run | Load a preserved baseline save, migrate it through the RC candidate, verify progression/equipment/dialogue and backup behavior | Baseline backup, RC build, isolated profiles | Yes | Add to the save checkpoint after C1 playability |
| Live StoreKit and Google Play transaction evidence | Not started | No platform adapter implementation or sandbox transaction record exists | Build adapters, purchase/restore/revoke tests, parent-gate review, and offline verified entitlement behavior | Owner products, store access, sandbox accounts, signed native builds | Yes for paid native release | Remain blocked; do not simulate completion |
| Signed/native build artifacts and physical-device release QA | Not started | No Android APK/AAB or iOS Xcode build/device evidence is present | Produce supported debug/release builds and test representative phone/tablet hardware | JDK/Android SDK; Mac/Xcode; signing | Yes for the stated iOS/Android goal | Complete environment setup first |
| Final store artwork, metadata, and submission packet | Not started | Only local icon/logo/loading assets and draft metadata exist | Capture approved screenshots, feature graphic, descriptions, ratings, privacy/data-safety answers, and review notes | Owner approvals and stable RC build | Yes for store submission; not needed for current web checkpoint | Prepare after native/UI stability |
| Two consecutive full release audits and RC report | Not started | `RELEASE_AUDIT.md` is a non-RC audit; no `RELEASE_CANDIDATE_REPORT.md` exists | Run the full test plan twice, resolve P0/P1 issues, freeze/version the build, and write the RC report | All prior checkpoints | Yes | Make this the final gate, not a documentation shortcut |

## Blocked

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies / exact owner action | Required for V1? | Recommended next action |
|---|---|---|---|---|---|---|
| Android build | Blocked by the current machine | `npm.cmd run native:doctor` reports Android configuration but no JDK; `JAVA_HOME` is empty and `java` is missing | Run `npm.cmd run native:android:build` and record the artifact | Owner provides a Windows/CI machine with supported JDK, Android SDK/platform tools, and Gradle access | Yes for Android release | Do not repeatedly retry locally; use the documented owner action |
| iOS build | Blocked by the current machine | `native:doctor` reports Xcode is not installed; Windows cannot run `xcodebuild` | On Mac, rerun native sync, open `ios\App\App.xcworkspace`, build and test | Owner provides Mac/Xcode, signing configuration, and regenerates the Mac-side Swift package path | Yes for iOS release | Hand off the exact Mac steps in `OWNER_ACTIONS.md` |
| Live monetisation | Blocked by owner/platform access | No StoreKit/Play products, IDs, sandbox accounts, or credentials are present; current adapter is intentionally fail-closed | Implement platform adapters and run sandbox purchase/restore/revocation tests | Owner creates products, supplies IDs/sandbox instructions, and approves price/refund policy; credentials must stay out of Git | Yes for monetised native release | Keep the development adapter test-only |
| Legal, commercial, age, privacy, and school decisions | Blocked by owner decisions | `LICENSES.md`, `PRIVACY.md`, `STORE_READINESS.md`, and `OWNER_ACTIONS.md` explicitly mark rights, ratings, log treatment, support/privacy wording, and school requirements as open | Obtain approvals and update the records | Owner confirms code/asset rights, final name/rating, hosting logs, privacy/support text, and school allowlisting requirements | Yes for public/store release | Resolve before calling the project RC |
| Future major-milestone publication | Gated, not currently blocking local work | The current deployment is already verified; the local copy/usability fixes are incomplete, and the user requires stable tested checkpoints | Publish only the next substantial tested milestone and verify its live package | Owner-approved Cloudflare/GitHub publication access for that milestone | Yes for each release checkpoint | Do not deploy this incomplete review alone |

## Deferred from Version 1

| Feature or workstream | Current status | Evidence from the repository | Remaining work | Dependencies | Required for Version 1? | Recommended next action |
|---|---|---|---|---|---|---|
| Ranger, Necromancer, Alchemist, and Paladin parity | Deferred, creative direction preserved | Names, skills, resources, passives, skill trees, class sets, and materials are recorded in `CREATIVE_REFERENCE_AUDIT.md`; current runtime exposes four classes | Implement in isolated post-V1 parity milestones if promoted | Product decision, design/engineering/QA capacity | No under current V1 lock | Preserve exact names and mechanics in backlog |
| Dungeons 13-16, later rewards/progression, and D16 Phase 4 | Deferred, source content retained and release-gated | Later dungeon definitions/boss dispatches and Bob/Pure Corruption/Last Light content remain in source; `REGION_ORDER` now exposes D9-12 but still excludes D13-16; Phase 4 IDs are absent | Finish route, rewards, progression, save, dialogue, balance, device play, and Phase 4 mechanics before exposure | Content QA and explicit scope promotion | No under the current release surface | Keep the D13-16 guard until evidence exists |
| Forge Smelter activation | Deferred, engine/data present but UI exposure is withheld | Current source contains recipe data/renderer and no active Forge navigation button, avoiding Joey's contradictory “no recipes” surface | Reconcile UI, recipes, costs, save behavior, and tests before exposure | Design decision and end-to-end QA | No unless promoted | Do not re-add a placeholder |
| Accounts, cloud saves, multiplayer, chat, UGC, analytics, ads, and live services | Deferred/excluded by safety decision | `DECISIONS.md`, safety contracts, privacy docs, and V1 scope prohibit them | No V1 implementation; reconsider only through a new privacy/product decision | New product and privacy review | No | Do not add them to solve current save or engagement gaps |
| Full modular rewrite, controller support, cloud backup, and extra accessibility presets | Deferred after the stable V1 path | `BACKLOG.md` records modularization and controller/cloud work; current monolith remains protected by contracts | Promote only if a concrete release or maintainability need is documented | Stable parity tests and a scoped architecture decision | No for the current V1 release bar | Record improvements in backlog; do not reopen C0 |

## Current conclusion

The project has a real, tested release foundation and a verified playable web
checkpoint. It is not yet a Release Candidate because the most important
remaining evidence is player-completed V1 progression and lifecycle/device QA,
followed by native, monetisation, owner, and final audit gates. The next task is
therefore the active Checkpoint 1 clean-profile playthrough, not another audit,
rewrite, or deployment.
