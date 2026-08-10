# Code Quest Lab - AI Expert Playtest

Original expert playtest: 2026-08-05
Follow-up QA: 2026-08-07
Build tested: configured production hostname,
`https://code-quest-lab.gov8661682.com/`
Viewport: 1024x768 landscape
Profile: fresh Barbarian profile created for this playtest, then deleted
through the in-game Manage Data confirmation
Diagnostics: no browser error or warning entries

## Level 1 balance regression, enemy motion, and release fix - 2026-08-10

A fresh live Barbarian run on the pre-fix deployed shell exposed the user
reported onboarding problem: Titanic Foes was active, the first target could
remain too far from the starter position, and repeated stationary web taps
ended with zero enemy defeats. This records the observed interaction failure;
it did not claim a calculation-only cause.

The final fix keeps the authored enemy roster and combat identity while
narrowing the relief to onboarding: fresh Barbarian damage is `0.75`; the first
Normal Dungeon 1 combat room alone uses `0.50` health, `0.45` damage, and `0.55`
movement speed with `1.80` attack-cooldown scaling; the starter targets use a
close readable lane; and Standard Expedition is the recommended/default
first-run choice while Joey's modifiers remain optional. Enemies now
reposition immediately during the read-and-respond prompt instead of appearing
frozen. The intro state directly suppresses opening damage across the shared
melee, projectile, debuff, and special-attack guards. The loopback-only
developer invincibility aid remains available for bounded local QA and is
unavailable on the production hostname.

The rebuilt local smoke cleared the two-enemy opening room with ordinary
targeting and the regression model cleared it in 6.1 simulated seconds. The
final live hostname smoke reached the first Normal D1 room, showed two enemies
repositioning during the visible prompt, and held at 100% HP across a 1.8-second
interval. Runtime commits `1987310`, `a169c11`, and `fc7f738`, shell v10,
source/mirror hash
`FF72502DB480DF89225A7335E68574DD983C75C08DC4077E2F223A1CC35AEDC4`, preview
`https://bad086fb.code-quest-lab.pages.dev/`, configured hostname
`https://code-quest-lab.gov8661682.com/`, and the **116/116** release gate are
recorded for the deployed checkpoint. No browser warning/error diagnostics
were observed.

## Fresh D1-D4 normal-control route - 2026-08-10

The current local build was tested at
`http://127.0.0.1:4176/?cql-dev=1` with a new Mage. D1 started at 1024x768;
D2 and D4 were continued at a 600x768 touch-sized viewport. The only
developer aid was the documented local,
session-only invincibility sequence. Attacks used the ordinary canvas/target
assist controls, with normal step movement and semantic reward/exit buttons;
no room, phase, boss, damage, enemy-free, or summon-clearing QA aids were used.

The route completed D1 and D2 Normal through their rewards and portals. D2's
observable path included the Broken Throne Shrine, Vault of the Fallen King,
Prison Warden mini-boss, queued level-up choices, three-phase Fallen King,
Veteran unlock, and entry to D4, The Shadow Realm. A D4 run reached Broken
Crossing. The aid was then accidentally toggled off; the character died and
the game saved a truthful summary at that mini-boss (47 enemies defeated,
level 8, 444 souls earned). A second D4 run enabled invincibility before the
first combat room, verified protected combat, and was deliberately paused and
finished to the dashboard.

No browser warning or error entries were recorded. This closes a useful
managed route slice but does not replace a full D1-D12 route, physical-device
touch evidence, or clean-player evidence. The accidental toggle also confirms
that playthroughs should verify the visible `Invincibility enabled` banner
once at the start of each fresh page session.

## Developer invincibility activation hardening - 2026-08-10

The D4 probe exposed a QA workflow defect: repeating `CQLI` could toggle an
already-enabled session aid off without an obvious intent to disable it. The
local developer sequence is now idempotent: every valid activation sequence
sets invincibility on and shows `Invincibility enabled`; a page reload resets
the aid. On the current build, two consecutive sequences while paused both
showed `Invincibility enabled`; a protected D4 combat room then remained alive
through ordinary touch-sized controls, pause, and deliberate finish, with no
browser warnings or errors. The focused developer-cheat contracts and the full
**113/113** local release gate pass. This is developer QA workflow hardening,
not player-facing functionality or additional route acceptance evidence.

## Fresh D1 normal-control continuation - 2026-08-10

The retained Level 3 Mage started a new D1 Normal run at the default desktop
viewport with only the loopback session invincibility aid. Ordinary mouse-target
attacks and the normal reward/exit controls completed Shadow Hall, the Elder
Stone shrine, Bone Chamber, Treasure Chamber, Ruined Archway, and Ashen Pit.
The run reached Death Chamber, defeated one elite, and was paused safely with
two elites remaining (36 enemies defeated; no browser warnings or errors).
This is useful fresh-run route evidence, but it is not a fresh-profile,
full-D1-D12, clean-player, or device acceptance result, so it does not change
the score.

## Recovery-safe pause handoff - 2026-08-10

The current build was tested at
`http://127.0.0.1:4176/?cql-dev=1&fresh=20260810-recovery-paused-v2` with a
fresh Mage. The route reached D1 combat, was paused, reloaded, showed
`SESSION RECOVERED`, and resumed the exact `Warden's Gate` checkpoint into the
pause menu before live updates. The QA invincibility sequence was armed while
paused, the run resumed without dying, paused again, and used `Finish and
Return to Dashboard`. The tab recorded no error or warning diagnostics.

This exposed and fixed a real player-safety issue: a recovered combat room
could previously become live immediately, allowing damage before the player
could read the room or choose Resume. The focused lifecycle contract and full
local release gate now pass **113/113**. This is managed-browser QA evidence,
not physical-device or 10-30-minute touch acceptance. The next recommendation
is one representative touch/device session, then clean D1-12 route feel before
any D13 promotion.

## D12 release-surface playtest - 2026-08-10

The local QA route at
`http://127.0.0.1:4174/?cql-dev=1&fresh=20260810-d12-recovery-fix` extended the
release surface through Necromancer's Stolen Graveyard. It verified the
Cemetery Gate objective, corrupted horde rooms, authored Soul Collector
surface, Ritual Altar, the Corrupted Necromancer's Phase 1 to Phase 2
transformation, soul-release defeat, standard rewards, Veteran unlock, and
the final session summary. A second reload resumed a saved defeated-boss
checkpoint and restored its portal, proving that `Proceed through exit` does
not strand a recovered run.

The full local release gate now passes **112/112**, including the source mirror,
build/package audit, deterministic QA, and Capacitor synchronization. This is
QA-assisted loopback evidence; it does not replace clean-player route evidence,
physical-device acceptance, GitHub, or website deployment evidence. The next
expert recommendation is a clean D1-12 route with the invincibility aid off,
followed by a touch-first safe-stop/reload session and only then a bounded D13
promotion.

The main usability finding from this pass was a real recovery edge: a defeated
D12 boss checkpoint could show the completed objective without recreating the
portal, and managed surfaces could lack the legacy exit-door object. Both are
fixed and contract-tested; the managed exit now follows the actual active
portal state.

## Published live-flow smoke - 2026-08-10

The tested commit `e7871b0` was deployed to Cloudflare Pages at preview
`https://a89328df.code-quest-lab.pages.dev/` and the configured hostname
`https://code-quest-lab.gov8661682.com/`. Both production checks passed.
The published hostname reached the profile dashboard, Town, the Forgotten
Depths gate, Normal trial, Session Modifier, Ancient Entrance, and D1 `Burial
Hall` combat. At 1024x768 it paused into the Character Menu; the browser
recorded no warning or error diagnostics. This verifies the deployed shell and
main handoff, not a clean full-route or physical-device session.

## Release-surface route follow-up - 2026-08-10

The same local route was extended through D11, Ranger Watchtowers, after D10,
The Abandoned Laboratory. It
verified the randomized laboratory room names, Head Researcher mini-boss,
The Alchemist's multi-line introduction, Perfect Serum phase transition,
reward chest, Veteran unlock, portal-only touch exit, and final session
summary. The managed-surface exit button appeared only after the physical
portal was active, so it remains a truthful fallback rather than a progression
shortcut.

One additional QA finding was fixed during this pass: the developer phase-step
helper used only the generic boss phase counter and could miss later bosses'
custom phase fields. It now explicitly drives the Oathbreaker King and
Alchemist transitions, preserving their authored dialogue/visual checks.

The full local release gate now passes **111/111**. The route is QA-assisted
and does not replace a clean normal-player D1-11 run, device evidence, or a new
deployment checkpoint. D12 is now promoted; the next expert recommendation is
clean D1-12 feel and balance validation, then a bounded D13 promotion.

The local build was re-tested at `http://127.0.0.1:4174/?cql-dev=1` after
promoting Joey's existing Vow Breaker's Castle content into the route chain.
The QA-assisted route moved from D8 into D9 and reached Castle Gate, the
Royal Commander mini-boss, the Oathbreaker King, the throne-room vault, the
Veteran unlock, and `THE SESSION IS COMPLETE`.

The playthrough preserved the authored details that matter for creative parity:
the delayed mini-boss spawn/death sequence, the boss's phase-two identity and
dialogue beat, the reward chest, and the post-boss rest/ending language. It
also found a genuine usability/QA defect: a room-complete helper could expose
an exit while a delayed mini-boss had not spawned. The exit and helper now
wait for the mini-boss, and the full local release gate passes **109/109**.

This is functional route evidence using loopback developer invincibility and
QA controls, not a clean normal-player route, physical-tablet evidence, or a
new GitHub/website checkpoint. The next expert recommendation is to run a
fresh clean D1-9 route for feel/balance, then promote D10 only after its own
route, save, reward, and return behavior is tested.

## Architecture follow-up - 2026-08-10

The repeated difficulty/modifier formulas found across enemies, minibosses, and
named bosses are now centralized in `getEncounterTuning(dungeonId)`. The
change preserves Joey's bespoke boss mechanics and makes miniboss difficulty
consistent with the rest of the combat roster. Mini-boss roster selection now
uses one explicit dungeon registry without changing Joey's named pools. The
source mirror, static build/package audit, Capacitor sync, deterministic fast
QA, and full **108/108**
test suite pass. This is a local architecture improvement; the manual clean
route, physical/tablet validation, and owner-controlled deployment checkpoint
remain open.

## Follow-up against the recommendations

The local first-session follow-up now explains the short fantasy-adventure
premise, describes modifiers as temporary profile-safe run rules, and removes
the duplicate reward label from unlocked route cards. It also adds a physical
`North Road` signpost beside the
existing road and a matching `ROAD` minimap landmark. It gives the player a
world-facing first breadcrumb toward the Forgotten Depths while preserving
free walking, the existing portal, and the current route boundaries. The
static contract, **108/108** release gate, deterministic QA, build/package
audit, and Capacitor native sync pass. This is local readability evidence, not
yet a permitted live-browser or physical-device visual acceptance result.

The latest D4 follow-up identified a genuine gameplay-loop risk: the Void
Monarch could keep generating summon waves for the entire encounter, allowing
target assist to spend the fight on adds instead of the boss. Summon pressure
is now finite and phase-aware: four beast waves and four crystal waves per
encounter. This preserves the dramatic three-phase design while guaranteeing
that the fight converges. The 84-test release gate, static/package/native
checks, GitHub push, Cloudflare deployment, production checks, and live smoke
all passed. Source commit `9886f50` is deployed at
`https://code-quest-lab.gov8661682.com/` with preview
`https://c45c9c7c.code-quest-lab.pages.dev/` and shell hash
`C30547C010609B3B05CF3C09BD437092F5BE8496BD48E947791872C86B18CBEC`.
This is a balance/playability milestone; the score remains 79% / 18% until
the full D4-8 route, ending, and touch-first safe-stop session are evidenced.

The 2026-08-07 D4 boss QA follow-up found two concrete usability/tooling
defects during the invincible playthrough. The developer summon-clear sequence
was incorrectly refusing to operate while a boss was alive, and the HUD used
the generic Stone Guardian label for the Void Monarch. The local-only
`F8 F7 F6 F4` aid now clears summons while leaving the live boss and locked
exit intact; the HUD identifies `Void Monarch` correctly. The focused
developer contracts and full 83-test release gate pass.

The patched local run reached D4 room 11, verified pause/resume and deliberate
Finish and Return to Dashboard, and deleted only its disposable Mage profile.
The retained Mage level 12 and Barbarian level 4 profiles were unchanged.
The fix is deployed as `cd90db4` with preview
`https://0db3ee6b.code-quest-lab.pages.dev/` and configured hostname
`https://code-quest-lab.gov8661682.com/`; both production checks and the live
profile-to-entrance smoke passed. It is a QA/readability milestone, not a new
D4-8 or ending result.

The latest bounded follow-up found and fixed a second elite-pacing edge case.
Dungeon 2 applies a 2x health multiplier before elite and Giant modifiers, so
the previous 4x post-modifier budget could still leave a fully stacked Royal
Guard elite at roughly the same health as the unbounded calculation. The
shared budget is now 2.5x authored base health, after all scaling, while the
elite's size, damage, defense, and behavior identity remain unchanged.

The 83-test release gate, 17-file static build/package audit, native sync, and
the GitHub/Cloudflare checkpoint `944675b` all passed. The configured hostname
and Pages preview `https://52fc1d32.code-quest-lab.pages.dev/` both report shell
SHA-256 `408F0CE6E60D3D0A8D526FE337730FFB9A78667E1B5A4D67653349B24AF6F00B`.
A fresh disposable Mage re-entered Dungeon 2 Normal after the change and
cleared early combat, shrine, treasure, later combat, and the Prison Warden
route segment before a deliberate safe stop. This did not use the `Elite
Invasion` modifier, so it is a post-fix regression signal rather than a new
full Elite Invasion acceptance run.

The follow-up used the loopback developer invincibility aid and stopped after
the autonomous gameplay-attempt limit rather than repeating an unchanged
combat loop. It reached Dungeon 4's `ELITE The Long Fall`: five elites were
present, three were defeated, and two remained after bounded targeted and
nearest-target attacks. The run was safely finished and the temporary QA
profile was deleted without changing the retained profiles.

The resulting hardening bounds corruption to one wraith surge per room and
gives a Regenerating elite a finite recovery budget of 25% of maximum health,
while preserving its readable recovery identity. The local 78-test release
verification, static build/package audit, and native asset sync pass. A fresh
post-fix D4 rerun remains required before the C1 acceptance score or website
deployment changes.

A separate fresh temporary Mage profile was also run through the patched local
shell. It completed Dungeon 1's first combat, shrine, sealed-chest event,
treasure vault, elite lair, and a later cleared combat room before reaching
Level 7; Dungeon 4 remained correctly locked by progression. The run was
finished safely and the temporary profile was deleted, leaving the retained
profiles unchanged. This strengthens clean-profile D1 evidence but does not
replace the required post-fix D4 rerun or full D1-8 route.

## What was tested

The playtest followed a first-time player journey:

1. Empty profile screen and class creation.
2. Town movement, waypoint plaza, roads, north portal, and first destination.
3. The Forgotten Depths trial selection and Normal difficulty.
4. The automatically presented `Titanic Foes` session modifier.
5. Dungeon 1 entry, first procedural route room, combat onboarding, movement,
   attack attempt, defeat summary, Finish For Now, pause, dashboard, route
   menu, and profile deletion.

## What worked

- The game loaded reliably and the first-run profile/class flow was easy to
  operate.
- Town is already a useful open-world foundation: it has a large explorable
  space, roads, a central Waypoint Plaza, a north destination, and persistent
  position/waypoint concepts.
- The route, trial, modifier, dungeon, defeat summary, safe-stop, and profile
  management surfaces are coherent enough to complete a full first-session
  traversal.
- The game explains keyboard/mouse controls, provides a visible objective,
  offers a clear Finish For Now path, and returned to the dashboard without
  browser diagnostics.
- The optional post-run note was concise, age-appropriate, and connected the
  defeat to a useful debugging idea without forcing a lesson.

## Improvements identified

### P1 - first-combat clarity and evidence

- The live onboarding prompt rendered as `Read the room â€” move or attack`.
  The source prompt is now changed to the encoding-safe
  `Read the room - move or attack`; it needs to be included in the next
  tested deployment before the live fix can be claimed.
- At 1024x768 the enemies were small and low-contrast against the dark room.
  Add a stronger enemy silhouette/outline, health-bar or target affordance,
  and a short damage-confirmation effect so a new player can tell whether an
  attack connected.
- `DOOR LOCKED (2 REMAINING)` appeared over or very close to the player. Move
  door state to a stable edge/banner location and keep the player silhouette
  unobstructed.
- This Barbarian run ended in `Ashen Pit` with zero kills after movement and
  attack attempts. The result confirms that combat completion is still not
  evidenced, but does not isolate a runtime attack defect because the test
  used a melee class and the controlled browser input may not reproduce a
  physical touch/mouse surface. Re-test attack response on a supported browser
  or device before changing combat calculations.

### P1 - open-world feel

- Town looks like an open hub, but the first objective says “choose a practice
  module,” which makes the fantasy world feel like a lesson launcher. Replace
  this with a world-facing objective such as “Prepare in Town, then follow the
  northern road to the Forgotten Depths.” The local source now uses that
  world-facing wording; it is awaiting the next tested deployment.
- The dashboard immediately funnels the player into `Adventure Routes`. A
  future World Atlas should make Town, discovered regions, objectives, safe
  travel, and dungeon landmarks the primary structure, with route selection as
  one option inside the world.
- The upper-right minimap was visually blank or nearly blank during Town play.
  It should show roads, the player, the Waypoint Plaza, the north destination,
  and discovered landmarks with a simple legend/compass.
- The follow-up now renders those existing Town landmarks, roads, the player
  marker, and the northern `DEPTHS` destination in the Town minimap. It is
  included in the 2026-08-05 tested deployment, but is not claimed as a full
  World Atlas.
- The starting Town view showed very little NPC/landmark storytelling. Add one
  clear first breadcrumb: an NPC, signpost, shrine, road marker, or visible
  landmark that explains what the northern destination is and why it matters.

### P2 - onboarding and progression

- `Titanic Foes` appeared as the first session modifier at level 1. Explain
  why it is present, let a new player choose a calm Standard adventure, or
  delay modifiers until the first successful room so the opening teaches the
  core loop before adding difficulty variation.
- The route screen presents seven destinations as locked cards with level
  thresholds. This is useful as a roadmap, but it should distinguish
  discovered, reachable, story-locked, and post-release regions instead of
  presenting every future place as an opaque lock.
- The route card showed `Standard Rewards` twice for the first dungeon. Remove
  the duplicate label if it is not intentional.
- The profile screen is visually sparse for a first launch. Add one sentence
  explaining the fantasy premise and the first objective without turning it
  into a long tutorial.

### P3 - polish and accessibility

- Keep the strong high-contrast heading style, but increase small gameplay text
  and enemy/UI contrast where it competes with the dark background.
- Preserve the concise session summary and safe stop; it is one of the best
  current retention choices because it supports stopping without pressure.
- Review all visible punctuation and symbols for encoding corruption in a
  clean browser, especially banners and contextual prompts.

## Follow-up status (2026-08-05)

- The deployed source and package retain the recommended world-facing Town
  copy and the schematic minimap with existing roads, landmarks, the player
  marker, and the northern `DEPTHS` destination.
- The grouped low-risk readability follow-up is deployed: normal locked-door
  feedback uses a stable top banner, enemies have stronger dark contrast rings,
  and enemy HP bars are thicker and outlined. Combat formulas, damage,
  targeting, and room progression were not changed.
- A local Manage Data smoke exported a synthetic Mage profile as `.txt`, showed
  that the current profile was unchanged, and then removed the test profile.
  On 2026-08-07, a real browser file-chooser upload imported the retained Level
  4 Barbarian as a matching second profile, after which only the temporary copy
  was removed. The remaining evidence is cross-version/device migration.
- A subsequent 1024x768 Pages-preview Mage run reproduced a visible click
  damage response, defeated enemies, and progressed through a shrine, treasure
  chamber, and Elite room before the session ended. The original production
  host harness result remains a separate incomplete input attempt; no combat
  calculation was changed.
- A local defeat-to-Town regression run found that dungeon lock and waypoint
  activation messages could remain in the DOM after a safe stop. The follow-up
  now clears the transient state and a screenshot check shows a clean Town;
  the fix is tested locally but waits for the next substantial deployment.
- The initial attack-response reproduction is therefore no longer the top
  blocker. The highest gameplay QA priority is now a complete clean D1-8 run,
  followed by touch/tablet lifecycle evidence and a 10-30 minute session.
- A subsequent local 1024x768 probe found that the first D1 combat could place
  both onboarding enemies outside the visible portion of the enlarged room.
  The local follow-up now places only that first encounter in a readable band;
  later rooms retain their normal procedural placement. The focused contract,
  native/web package sync, and 63-test release verification pass. This fix is
  unreleased pending a major stable checkpoint.
- A separate loopback-only developer playtest aid now prevents death without
  changing combat math or profile/export data. It is deliberately excluded
  from public-host/native activation and is not a player-facing feature.
- On 2026-08-07, an isolated Mage playthrough reached Dungeon 2 and reproduced
  a progression risk in `Dark Inquisition Chamber`: the `Elite Invasion`
  modifier combined with a Corrupted elite allowed shadow summons to grow the
  room to 15 enemies during a bounded attack test. The run was safely stopped
  rather than retried indefinitely. The follow-up now gives each Corrupted
  elite a finite two-minion summon budget and persists that budget across room
  checkpoints; 77 release tests pass. This directly applies the playtest
  recommendation to make difficulty variation bounded and readable.
- A second 2026-08-07 disposable Mage route re-tested the next D2 pressure
  point, `ELITE Executioner's Court`, after the additional hardening. Two
  modifier-stacked elites cleared in a bounded paced encounter rather than a
  multi-minute starter-attack wall. The three-phase Fallen King then completed
  and the exit portal advanced into The Shadow Realm Entrance. The shared
  elite health budget preserves each modifier's visual and behavior identity
  while preventing depth, dungeon, elite, and Giant scaling from compounding
  beyond the intended session shape.
- The same route exposed a small input-responsiveness risk: taps arriving
  during an attack cooldown could be discarded. Touch and desktop attack taps
  now remain queued until the normal cooldown is ready, with focused contracts
  covering both paths. The fix is included in the 83-test release gate and the
  verified 2026-08-07 deployment `944675b`. The next expert recommendation remains a
  complete clean D1-8 run and a deliberate 10-30 minute touch-first stop/resume
  session.

## Recommended order

1. Keep the encoding-safe combat prompt, profile transfer, and grouped
   readability follow-up under live regression coverage.
2. Continue the clean D1-8 route on the supported surface now that initial
   attack response and enemy defeat are evidenced; do not change combat math
   without a new reproducible defect.
3. Confirm the local enemy readability, door-lock placement, and session-status
   cleanup together on the next tested deployment.
4. Keep the local Town minimap foundation aligned with `OPEN_WORLD_DIRECTION.md`,
   then add a tested first Town breadcrumb and World Atlas only after the C1
   route evidence is stable.
5. Replace route-only progression with a tested World Atlas/region graph in a
   later major milestone; keep D9-16 and other incomplete content honestly
   unavailable until complete.

This review is evidence for improvement planning, not a claim that the full
V1 route, open-world acceptance bar, or Release Candidate bar is complete.
