import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

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
