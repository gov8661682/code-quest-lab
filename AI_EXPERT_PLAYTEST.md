# Code Quest Lab - AI Expert Playtest

Date: 2026-08-05
Build tested: configured production hostname,
`https://code-quest-lab.gov8661682.com/`
Viewport: 1024x768 landscape
Profile: fresh Barbarian profile created for this playtest, then deleted
through the in-game Manage Data confirmation
Diagnostics: no browser error or warning entries

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
  The versioned transfer contracts preserve durable data, a valid backup, and
  a valid active-run checkpoint; upload round-trip and cross-version/device
  evidence remain open.
- The recommendation to reproduce attack response on a supported touch/mouse
  surface remains the highest gameplay QA priority. No combat calculation was
  changed merely because the managed-browser playtest did not establish a
  defeat.

## Recommended order

1. Keep the encoding-safe combat prompt, profile transfer, and grouped
   readability follow-up under live regression coverage.
2. Reproduce first-combat attack response on a supported touch/mouse surface;
   do not infer a combat-code defect from this harness alone.
3. Confirm the local enemy readability and door-lock placement changes on the
   live supported surface, then keep or adjust them only from evidence.
4. Keep the local Town minimap foundation aligned with `OPEN_WORLD_DIRECTION.md`,
   then add a tested first Town breadcrumb and World Atlas only after the C1
   route evidence is stable.
5. Replace route-only progression with a tested World Atlas/region graph in a
   later major milestone; keep D9-16 and other incomplete content honestly
   unavailable until complete.

This review is evidence for improvement planning, not a claim that the full
V1 route, open-world acceptance bar, or Release Candidate bar is complete.
