import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadProductionCheckpointParser() {
  const start = SOURCE.indexOf('var RUN_CHECKPOINT_VERSION=');
  const end = SOURCE.indexOf('function formatCheckpointTime', start);
  assert.notEqual(start, -1, 'production checkpoint version declaration is present');
  assert.notEqual(end, -1, 'production checkpoint parser boundary is present');

  const context = {
    isEntranceZone(zoneId) { return typeof zoneId === 'string' && zoneId.startsWith('entrance_'); },
    isReleaseDungeon(zoneId) { return ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8'].includes(zoneId); }
  };
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__parseRunCheckpoint = parseRunCheckpoint;`,
    context,
    { filename: 'index.html#checkpoint-contract' }
  );
  return context.__parseRunCheckpoint;
}

const parseRunCheckpoint = loadProductionCheckpointParser();

function validCheckpoint() {
  return {
    version: 1,
    activeDungeonId: 'dungeon1',
    currentRoomId: 'room_a',
    mainPath: ['room_a', 'room_b'],
    roomDefs: {
      room_a: { name: 'Burial Hall' },
      room_b: { name: 'Dark Corridor' }
    },
    roomStates: {
      room_a: { cleared: true },
      room_b: { cleared: false }
    }
  };
}

function normalize(value) {
  return JSON.parse(JSON.stringify(value));
}

test('production checkpoint parser accepts a complete current route', () => {
  const checkpoint = validCheckpoint();

  assert.deepEqual(normalize(parseRunCheckpoint(checkpoint)), checkpoint);
  assert.deepEqual(normalize(parseRunCheckpoint(JSON.stringify(checkpoint))), checkpoint);
});

test('production checkpoint parser rejects malformed, static-zone, and incomplete routes', () => {
  const invalidCheckpoints = [
    null,
    '{not-json',
    { ...validCheckpoint(), version: 2 },
    { ...validCheckpoint(), activeDungeonId: 'town' },
    { ...validCheckpoint(), activeDungeonId: 'entrance_dungeon1' },
    { ...validCheckpoint(), activeDungeonId: 'dungeon9' },
    { ...validCheckpoint(), roomStates: [] },
    { ...validCheckpoint(), roomDefs: [] },
    { ...validCheckpoint(), mainPath: [] },
    { ...validCheckpoint(), mainPath: ['room_a', 7] },
    { ...validCheckpoint(), currentRoomId: 'room_missing' },
    { ...validCheckpoint(), mainPath: ['room_b'], currentRoomId: 'room_a' },
    { ...validCheckpoint(), roomDefs: { room_a: { name: 'Burial Hall' } } },
    { ...validCheckpoint(), roomStates: { room_a: [] } },
    { ...validCheckpoint(), roomDefs: { room_a: null, room_b: { name: 'Dark Corridor' } } }
  ];

  for (const checkpoint of invalidCheckpoints) assert.equal(parseRunCheckpoint(checkpoint), null);
});
