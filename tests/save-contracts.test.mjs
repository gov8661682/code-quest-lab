import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadProductionParser() {
  const start = SOURCE.indexOf('var CHARACTER_SAVE_VERSION=');
  const end = SOURCE.indexOf('function sanitizeStoredText', start);
  assert.notEqual(start, -1, 'production save-version declaration is present');
  assert.notEqual(end, -1, 'production save parser boundary is present');

  const context = {};
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__productionParser = parseCharacterSave;`,
    context,
    { filename: 'index.html#save-contract' }
  );
  return context.__productionParser;
}

const parseProductionSave = loadProductionParser();

function raw(value) {
  return JSON.stringify(value);
}

function safeParseProductionSave(value) {
  try {
    return parseProductionSave(value);
  } catch {
    return null;
  }
}

function normalize(value) {
  return value === null ? null : JSON.parse(JSON.stringify(value));
}

test('production parser accepts current and legacy-compatible save shapes', () => {
  const current = {
    saveVersion: 2,
    souls: 18,
    stats: { totalRuns: 2 },
    mastery: { level: 3 },
    dungeons: { unlocked: { dungeon1: true } },
    selectedClass: 'barbarian',
    inventory: [],
    equipped: {}
  };
  const legacy = {
    souls: 4,
    stats: { totalRuns: 1 },
    selectedClass: 'rogue'
  };

  assert.deepEqual(normalize(safeParseProductionSave(raw(current))), current);
  assert.deepEqual(normalize(safeParseProductionSave(raw(legacy))), legacy);
  assert.equal(safeParseProductionSave(raw({ saveVersion: 1, souls: 0, stats: {} })).saveVersion, 1);
});

test('production parser rejects malformed, future, and structurally unsafe saves', () => {
  const invalidValues = [
    '',
    '{not-json',
    'null',
    '[]',
    raw({ souls: 1 }),
    raw({ saveVersion: 3, souls: 1, stats: {} }),
    raw({ saveVersion: 1.5, souls: 1, stats: {} }),
    raw({ souls: 1, stats: null }),
    raw({ souls: 1, mastery: [] }),
    raw({ souls: 1, dungeons: [] }),
    raw({ souls: 1, selectedClass: 7 })
  ];

  for (const value of invalidValues) assert.equal(safeParseProductionSave(value), null, value);
});
