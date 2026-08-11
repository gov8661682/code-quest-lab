import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const RELEASE_ROUTE_EXPECTATIONS = Object.freeze([
  Object.freeze({ id: 'dungeon1', bossId: 'stone_guardian', bossName: 'Stone Guardian', bossMarker: null, generator: 'generateDungeon' }),
  Object.freeze({ id: 'dungeon2', bossId: 'fallen_king', bossName: 'Fallen King', bossMarker: '_isDungeon2', generator: 'generateDungeon2' }),
  Object.freeze({ id: 'dungeon4', bossId: 'void_monarch', bossName: 'Void Monarch', bossMarker: '_isVoidMonarchBoss', generator: 'generateDungeon4' }),
  Object.freeze({ id: 'dungeon5', bossId: 'high_chieftain', bossName: 'Corrupted High Chieftain', bossMarker: '_isChieftainBoss', generator: 'generateDungeon5' }),
  Object.freeze({ id: 'dungeon6', bossId: 'archmage_valen', bossName: 'Archmage Valen', bossMarker: '_isArchmageBoss', generator: 'generateDungeon6' }),
  Object.freeze({ id: 'dungeon7', bossId: 'hollow_world_tree', bossName: 'Hollow World Tree', bossMarker: '_isHollowTreeBoss', generator: 'generateDungeon7' }),
  Object.freeze({ id: 'dungeon8', bossId: 'broker', bossName: 'The Broker', bossMarker: '_isBrokerBoss', generator: 'generateDungeon8' }),
  Object.freeze({ id: 'dungeon9', bossId: 'oathbreaker_king', bossName: 'Oathbreaker King', bossMarker: '_isOathbreakerKingBoss', generator: 'generateDungeon9' }),
  Object.freeze({ id: 'dungeon10', bossId: 'alchemist', bossName: 'The Alchemist', bossMarker: '_isAlchemistBoss', generator: 'generateDungeon10' }),
  Object.freeze({ id: 'dungeon11', bossId: 'ranger_captain', bossName: 'Corrupted Ranger Captain', bossMarker: '_isRangerCaptainBoss', generator: 'generateDungeon11' }),
  Object.freeze({ id: 'dungeon12', bossId: 'corrupted_necromancer', bossName: 'Corrupted Necromancer', bossMarker: '_isNecromancerAltar', generator: 'generateDungeon12' })
]);

function loadReleaseGenerators() {
  const start = SOURCE.indexOf('var RT={');
  const end = SOURCE.indexOf('var d9Hazards=', start);
  const d10Start = SOURCE.indexOf('var D10_MAIN_STYLES=', end);
  const d10End = SOURCE.indexOf('// DUNGEON 10 ROOM VISUALS', d10Start);
  const d11Start = SOURCE.indexOf('var D11_MAIN_STYLES=', d10End);
  const d11End = SOURCE.indexOf('// DUNGEON 11 ROOM VISUALS', d11Start);
  const d12Start = SOURCE.indexOf('var D12_MAIN_STYLES=', d11End);
  const d12End = SOURCE.indexOf('// DUNGEON 12 ROOM VISUALS', d12Start);
  assert.notEqual(start, -1, 'shared room-type declaration is present');
  assert.notEqual(end, -1, 'release dungeon generator boundary is present');
  assert.notEqual(d10Start, -1, 'Dungeon 10 generator start is present');
  assert.notEqual(d10End, -1, 'Dungeon 10 generator boundary is present');
  assert.notEqual(d11Start, -1, 'Dungeon 11 generator start is present');
  assert.notEqual(d11End, -1, 'Dungeon 11 generator boundary is present');
  assert.notEqual(d12Start, -1, 'Dungeon 12 generator start is present');
  assert.notEqual(d12End, -1, 'Dungeon 12 generator boundary is present');

  const scaling = {};
  for (const dungeonId of ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8', 'dungeon9', 'dungeon10', 'dungeon11', 'dungeon12']) {
    scaling[dungeonId] = { spawnDensityMult: 1 };
  }
  const context = {
    activeModifier: { _blessedJourney: false, _ancientRiches: false, _eliteInvasion: false, _undeadHorde: false, _titanicFoes: false },
    DUNGEON_SCALING: scaling,
    ENEMY_KINDS: {},
    SOUL_BONUS_SIDE_ROOM: 5,
    MXP_SIDE_ROOM_BONUS: 8,
    SOUL_REWARD_WARRIOR: 1,
    SOUL_REWARD_ZOMBIE: 2,
    SOUL_REWARD_GHOST: 1,
    SOUL_REWARD_ARCHER: 2,
    SOUL_REWARD_GUARDIAN: 30,
    MXP_WARRIOR: 2,
    MXP_ZOMBIE: 4,
    MXP_GHOST: 2,
    MXP_ARCHER: 3,
    MXP_GUARDIAN: 35,
    MXP_DUNGEON_COMPLETE: 15,
    MXP_NEW_HIGHEST_ROOM: 10,
    LOOT_TABLES: {},
    shuffleArray(values) { return values.slice(); },
    buildMinimapPositions() {}
  };
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\n${SOURCE.slice(d10Start, d10End)}\n${SOURCE.slice(d11Start, d11End)}\n${SOURCE.slice(d12Start, d12End)}\nthis.__releaseGenerators={generateDungeon,generateDungeon2,generateDungeon4,generateDungeon5,generateDungeon6,generateDungeon7,generateDungeon8,generateDungeon9,generateDungeon10,generateDungeon11,generateDungeon12,validateDungeon,validateDungeon12Layout};`,
    context,
    { filename: 'index.html#release-dungeon-generation-contract' }
  );
  return context.__releaseGenerators;
}

function loadReleaseRouteMetadata() {
  const defsStart = SOURCE.indexOf('var DUNGEON_DEFS={');
  const defsEnd = SOURCE.indexOf('// ============================================================\n// BOSS IDENTITY REGISTRY', defsStart);
  const bossStart = SOURCE.indexOf('var BOSS_IDENTITY_DEFS=');
  const bossEnd = SOURCE.indexOf('// ============================================================\n// PER-DUNGEON DIFFICULTY SCALING', bossStart);
  const regionStart = SOURCE.indexOf('var REGION_ORDER=');
  const regionEnd = SOURCE.indexOf('function isEntranceZone', regionStart);
  assert.notEqual(defsStart, -1, 'dungeon definition registry is present');
  assert.notEqual(defsEnd, -1, 'dungeon definition registry boundary is present');
  assert.notEqual(bossStart, -1, 'boss identity registry is present');
  assert.notEqual(bossEnd, -1, 'boss identity registry boundary is present');
  assert.notEqual(regionStart, -1, 'release region order is present');
  assert.notEqual(regionEnd, -1, 'release region order boundary is present');

  const context = {
    permanentData: { mastery: { level: 0 }, stats: {} }
  };
  vm.runInNewContext(
    `${SOURCE.slice(defsStart, defsEnd)}\n${SOURCE.slice(bossStart, bossEnd)}\n${SOURCE.slice(regionStart, regionEnd)}\nthis.__releaseRouteMetadata={DUNGEON_DEFS,BOSS_IDENTITY_DEFS,REGION_ORDER,getNextDungeonId,isReleaseDungeon};`,
    context,
    { filename: 'index.html#release-route-contract' }
  );
  return context.__releaseRouteMetadata;
}

test('every shipped release dungeon generator produces a connected start-to-boss route', () => {
  const api = loadReleaseGenerators();
  const generators = [
    ['dungeon1', api.generateDungeon],
    ['dungeon2', api.generateDungeon2],
    ['dungeon4', api.generateDungeon4],
    ['dungeon5', api.generateDungeon5],
    ['dungeon6', api.generateDungeon6],
    ['dungeon7', api.generateDungeon7],
    ['dungeon8', api.generateDungeon8],
    ['dungeon9', api.generateDungeon9],
    ['dungeon10', api.generateDungeon10],
    ['dungeon11', api.generateDungeon11],
    ['dungeon12', api.generateDungeon12]
  ];

  for (const [dungeonId, generate] of generators) {
    assert.equal(typeof generate, 'function', `${dungeonId} generator is present`);
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const generated = generate();
      assert.ok(generated?.defs && generated?.mainPath, `${dungeonId} generated route ${attempt}`);
      assert.ok(api.validateDungeon(generated.defs, generated.mainPath), `${dungeonId} route ${attempt} validates`);
      assert.equal(generated.defs[generated.mainPath[0]].type, 'start', `${dungeonId} starts at a start room`);
      assert.equal(generated.defs[generated.mainPath.at(-1)].type, 'boss', `${dungeonId} ends at a boss room`);
      if (dungeonId === 'dungeon9') {
        assert.ok(generated.mainPath.some((roomId) => generated.defs[roomId].type === 'miniboss'), 'dungeon9 keeps its Royal Commander gate');
        assert.equal(generated.defs[generated.mainPath.at(-1)]._isOathbreakerKingBoss, true, 'dungeon9 keeps the Oathbreaker King finale');
      }
      if (dungeonId === 'dungeon10') {
        assert.ok(generated.mainPath.some((roomId) => generated.defs[roomId].type === 'miniboss'), 'dungeon10 keeps its Head Researcher gate');
        assert.equal(generated.defs[generated.mainPath.at(-1)]._isAlchemistBoss, true, 'dungeon10 keeps The Alchemist finale');
      }
      if (dungeonId === 'dungeon11') {
        assert.equal(generated.mainPath.some((roomId) => generated.defs[roomId].type === 'combat'), false, 'dungeon11 stays environment-first');
        assert.equal(generated.mainPath.at(-1), 'room_boss', 'dungeon11 ends at the Shattered Signal Tower');
        assert.equal(generated.defs[generated.mainPath.at(-1)]._isRangerCaptainBoss, true, 'dungeon11 keeps the Corrupted Ranger Captain finale');
      }
      if (dungeonId === 'dungeon12') {
        assert.equal(generated.mainPath.some((roomId) => generated.defs[roomId].type === 'combat'), false, 'dungeon12 keeps its authored horde rooms as explore spaces');
        assert.ok(generated.mainPath.length >= 6, 'dungeon12 keeps a substantial graveyard route');
        assert.equal(generated.defs[generated.mainPath.at(-1)]._isNecromancerAltar, true, 'dungeon12 keeps the Corrupted Necromancer finale');
        assert.equal(api.validateDungeon12Layout(generated.defs, generated.mainPath), true, 'dungeon12 route validates with its dedicated layout contract');
      }
      for (const roomId of generated.mainPath) {
        assert.equal(generated.defs[roomId].id, roomId, `${dungeonId} room ids stay aligned`);
      }
    }
  }
});

test('release route simulation preserves authored finales and the D1-D12 handoff', () => {
  const generators = loadReleaseGenerators();
  const metadata = loadReleaseRouteMetadata();
  const expectedIds = RELEASE_ROUTE_EXPECTATIONS.map((entry) => entry.id);

  assert.deepEqual(Array.from(metadata.REGION_ORDER), expectedIds, 'release order is the bounded D1-D12 chain');
  assert.equal(metadata.getNextDungeonId(expectedIds.at(-1)), null, 'D12 is the safe terminal region');

  const simulatedRun = [];
  let currentDungeonId = expectedIds[0];
  for (const expected of RELEASE_ROUTE_EXPECTATIONS) {
    assert.equal(currentDungeonId, expected.id, `${expected.id} is entered in release order`);
    assert.equal(metadata.isReleaseDungeon(expected.id), true, `${expected.id} is exposed by the release guard`);

    const dungeon = metadata.DUNGEON_DEFS[expected.id];
    assert.ok(dungeon, `${expected.id} has a player-facing dungeon definition`);
    assert.match(dungeon.objective, new RegExp(expected.bossName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `${expected.id} objective names ${expected.bossName}`);

    const identity = metadata.BOSS_IDENTITY_DEFS.find((entry) => entry.id === expected.bossId);
    assert.ok(identity, `${expected.id} has a shared boss identity for ${expected.bossName}`);
    assert.equal(identity.displayName, expected.bossName, `${expected.id} keeps the authored boss display name`);

    const generated = generators[expected.generator]();
    assert.ok(generated?.defs && generated?.mainPath, `${expected.id} produces a playable route`);
    assert.equal(generated.defs[generated.mainPath[0]].type, 'start', `${expected.id} begins at a start room`);
    for (let index = 0; index < generated.mainPath.length - 1; index += 1) {
      const roomId = generated.mainPath[index];
      const nextRoomId = generated.mainPath[index + 1];
      assert.equal(generated.defs[roomId].id, roomId, `${expected.id} room ${roomId} keeps its id`);
      assert.equal(generated.defs[roomId].forward, nextRoomId, `${expected.id} connects ${roomId} to its next room`);
    }

    const finalRoomId = generated.mainPath.at(-1);
    const finalRoom = generated.defs[finalRoomId];
    assert.equal(finalRoom.type, 'boss', `${expected.id} ends at a boss room`);
    if (expected.bossMarker) assert.equal(finalRoom[expected.bossMarker], true, `${expected.id} keeps ${expected.bossName} as its finale`);

    // This remains a bounded route-state contract, not a second renderer:
    // prove that production defeat/portal code supplies the handoff the
    // simulated route needs before the region chain can advance.
    assert.match(SOURCE, /roomStates\[bossRoomId\]\.bossDefeated=true;roomStates\[bossRoomId\]\.cleared=true;/, `${expected.id} uses the shared cleared-boss state`);
    assert.match(SOURCE, /function unlockBossExit\(delaySeconds\)\{[\s\S]*?spawnExitPortal\(\);/, `${expected.id} has a delayed exit portal handoff`);
    assert.match(SOURCE, /function spawnExitPortal\(\)\{[\s\S]*?exitPortalActive=true;/, `${expected.id} exposes a live boss portal state`);
    assert.match(SOURCE, /function completeExitPortalTravel\(\)\{[\s\S]*?var nextId=getNextDungeonId\(finishedDungeonId\);/, `${expected.id} advances through the shared region handoff`);

    const nextDungeonId = metadata.getNextDungeonId(expected.id);
    simulatedRun.push({ id: expected.id, rooms: generated.mainPath.length, next: nextDungeonId });
    if (nextDungeonId) {
      assert.equal(metadata.isReleaseDungeon(nextDungeonId), true, `${expected.id} hands off to another released region`);
      currentDungeonId = nextDungeonId;
    } else {
      assert.equal(expected.id, 'dungeon12', 'only D12 ends the bounded release route');
      currentDungeonId = null;
    }
  }

  assert.equal(currentDungeonId, null, 'the simulated D1-D12 run reaches the safe endpoint');
  assert.deepEqual(simulatedRun.map((entry) => entry.id), expectedIds, 'every released region is visited exactly once');
  assert.equal(simulatedRun.at(-1).next, null, 'the terminal route does not expose an accidental next dungeon');
  assert.match(SOURCE, /var nextId=getNextDungeonId\(finishedDungeonId\);[\s\S]*?dungeonRunEnded=true;[\s\S]*?showGameOverScreen\(true\);/, 'the terminal portal enters the existing session ending');
});
