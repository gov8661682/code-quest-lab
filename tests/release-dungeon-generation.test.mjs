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
  const end = SOURCE.indexOf('function validateDungeon9Layout', start);
  assert.notEqual(start, -1, 'shared room-type declaration is present');
  assert.notEqual(end, -1, 'release dungeon generator boundary is present');

  const scaling = {};
  for (const dungeonId of ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8']) {
    scaling[dungeonId] = { spawnDensityMult: 1 };
  }
  const context = {
    activeModifier: { _blessedJourney: false, _ancientRiches: false, _eliteInvasion: false, _undeadHorde: false, _titanicFoes: false },
    DUNGEON_SCALING: scaling,
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
    LOOT_TABLES: {}
  };
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__releaseGenerators={generateDungeon,generateDungeon2,generateDungeon4,generateDungeon5,generateDungeon6,generateDungeon7,generateDungeon8,validateDungeon};`,
    context,
    { filename: 'index.html#release-dungeon-generation-contract' }
  );
  return context.__releaseGenerators;
}

test('every shipped V1 dungeon generator produces a connected start-to-boss route', () => {
  const api = loadReleaseGenerators();
  const generators = [
    ['dungeon1', api.generateDungeon],
    ['dungeon2', api.generateDungeon2],
    ['dungeon4', api.generateDungeon4],
    ['dungeon5', api.generateDungeon5],
    ['dungeon6', api.generateDungeon6],
    ['dungeon7', api.generateDungeon7],
    ['dungeon8', api.generateDungeon8]
  ];

  for (const [dungeonId, generate] of generators) {
    assert.equal(typeof generate, 'function', `${dungeonId} generator is present`);
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const generated = generate();
      assert.ok(generated?.defs && generated?.mainPath, `${dungeonId} generated route ${attempt}`);
      assert.ok(api.validateDungeon(generated.defs, generated.mainPath), `${dungeonId} route ${attempt} validates`);
      assert.equal(generated.defs[generated.mainPath[0]].type, 'start', `${dungeonId} starts at a start room`);
      assert.equal(generated.defs[generated.mainPath.at(-1)].type, 'boss', `${dungeonId} ends at a boss room`);
      for (const roomId of generated.mainPath) {
        assert.equal(generated.defs[roomId].id, roomId, `${dungeonId} room ids stay aligned`);
      }
    }
  }
});
