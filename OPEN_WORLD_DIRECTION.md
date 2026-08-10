# Code Quest Lab - Open-World Direction

Status: explicit product direction and architecture target, 2026-08-05

## Direction

Code Quest Lab should grow into a compact, connected, discovery-led open world
that preserves Joey's fantasy adventure, named regions, characters, bosses,
dialogue, and endings. The target is not an infinite procedural map or a
massive always-online service. It is a hand-authored world with meaningful
choices, persistent places, optional discoveries, and dungeons that feel like
landmarks within that world.

Version 1 is therefore an open-world-compatible prologue. It may keep the
release boundary at Dungeons 1-8 while the player-facing structure evolves from
a route menu into a home region, connected entrances, discovered waypoints,
and a readable world atlas. Dungeons 9-16 and other incomplete content remain
hidden until their routes, rewards, saves, balance, and device evidence are
complete.

## Player experience

1. Town is a real home region, not only a dashboard. The player can move,
   meet characters, prepare, discover points of interest, and choose where to
   go next.
2. Roads, gates, portals, and waypoints connect regions. A player should
   understand why a place is reachable and what it offers before committing to
   a run.
3. Dungeons are dangerous landmarks and authored adventures inside the world.
   The world provides context and choice; the dungeon provides focused combat,
   progression, bosses, dialogue, and rewards.
4. Exploration can reveal optional rooms, NPC conversations, crafting
   materials, lore, safe routes, and challenge opportunities without making
   completion depend on exhaustive searching.
5. World state persists locally: discovered places, opened shortcuts, cleared
   landmarks, story flags, Bob's chain, equipment, and safe return locations.
6. A player can complete a useful 10-30 minute objective and stop safely. The
   open world must never rely on daily streaks, energy timers, FOMO, forced
   travel, or an endless grind.

## World layers

The game should use four understandable layers rather than one overloaded
scene:

- **World atlas:** a touch-friendly overview of discovered regions, routes,
  objectives, and safe travel points.
- **Region hubs:** explorable spaces such as Town and later biome settlements;
  they contain NPCs, landmarks, gathering, preparation, and entrances.
- **Landmarks and side areas:** short optional activities that add discovery,
  story, materials, or tactical practice without becoming required chores.
- **Dungeon instances:** room-based authored runs with their own combat,
  bosses, rewards, and session checkpoints.

## Technical architecture target

The current Canvas engine already has useful foundations: `worldLocation`,
Town and entrance hub zones, waypoints, `REGION_ORDER`, dungeon definitions,
room graphs, local save migration, and active-run checkpoints. Future work
should extend those seams rather than replace the game wholesale.

The target data model is:

```text
WorldRegion
  id, name, biome, description
  entryZone, exits[], landmarkIds[], waypointId
  unlockCondition, recommendedLevel, primaryDungeonId?

WorldConnection
  fromRegion, toRegion, travelPoint, travelMode
  unlockCondition, discoveryText

WorldState
  discoveredRegions[], discoveredLandmarks[], clearedLandmarks[]
  openedConnections[], storyFlags{}, activeObjectives[]
  worldLocation { type, regionId, landmarkId?, dungeonId?, x, y, facing }
  waypoints { unlocked{} }
```

Implementation rules:

- Keep world content in registries/data tables where practical; do not add a
  second parallel game engine for hubs.
- Reuse the current room/camera/input engine for bounded region hubs, while
  keeping scene boundaries explicit so a future world is not one enormous
  Canvas or one untestable function.
- Use deterministic region/landmark seeds and local activation budgets. Do not
  simulate every NPC or enemy in every undiscovered region.
- Version and migrate `worldLocation` and `WorldState` before adding fields to
  live saves. Preserve unknown future fields safely and keep recovery fail
  closed.
- Keep dungeon save state separate from world-state saves, exactly as active
  run checkpoints are separate from permanent character progression today.
- Let the atlas and region graph explain availability; do not expose a
  destination that has no tested travel, save, reward, and return path.

## Joey direction preserved

The open-world layer is a container for Joey's content, not a reason to flatten
it. The world plan preserves the existing Town, Adventure Routes, classes,
skills, equipment, dungeons, bosses, Bob's dialogue and recognition chain,
Pure Corruption choices, purification journey, endings, and the future
Ranger/Necromancer/Alchemist/Paladin and D9-16 material recorded in
`CREATIVE_REFERENCE_AUDIT.md`.

Future regions should make those ideas feel geographically and narratively
connected: settlements can lead to class stories, corrupted zones can react to
purification, and Bob's chain can become a discovered thread through the
world. Those are design targets, not claims that the current runtime already
implements them.

## Staged delivery

### Now: direction and compatibility

- Keep Checkpoint 1 active and finish the evidenced D1-12 path.
- Treat Town, entrances, waypoints, and `worldLocation` as the first world
  slice, not as disposable menus.
- Keep the local Town minimap aligned with the existing layout registry so the
  first world slice communicates roads, landmarks, the player, and the next
  reachable dungeon without implying that future regions are playable.
- Avoid promoting D13-16 or adding broad exploration code before the current
  combat, save, and session evidence is stable.
- Add tests and migrations before changing the save or route model.

### After the current V1 path is playable

- Add a world-region registry and a World Atlas view with only discovered or
  honestly previewed destinations.
- Connect Town to a small number of tested region hubs and optional landmarks.
- Add persistent discovery/return state and short exploration objectives.
- Re-test touch navigation, pause/background recovery, offline use, and
  10-30-minute session shape.

### Post-release expansion

- Promote Joey's additional classes, D9-16, Pure Corruption Phase 4, Smelter,
  and later regions through isolated content milestones.
- Add branching routes, regional stories, shortcuts, and optional activities
  only when each has complete saves, rewards, balance, accessibility, and
  device evidence.

## Open-world acceptance bar

The future open-world milestone is complete only when a fresh player can leave
Town, understand at least two meaningful destinations, discover and use a
return point, complete one optional activity or landmark, enter a dungeon,
return without losing world state, and stop safely. The world must remain
playable offline, privacy-minimal, teen-appropriate, and truthful about what is
available.

The current project does not claim this bar is met. This document is the
canonical design target for staged implementation.
