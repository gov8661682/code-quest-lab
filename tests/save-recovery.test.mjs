import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function defaultCharacterData(className) {
  return {
    souls: 0,
    stats: { totalRuns: 0 },
    mastery: {
      level: 1,
      statPoints: 0,
      allocatedStats: { strength: 0, vitality: 0, defense: 0, fury: 0, intelligence: 0 }
    },
    skillTree: { unlockedNodes: { root: true } },
    build: {},
    dungeons: { unlocked: { dungeon1: true }, difficulty: {} },
    selectedClass: className,
    equipped: {},
    inventory: []
  };
}

function createRecoveryHarness({ primary, backup, activeId = 'char_test' } = {}) {
  const values = new Map();
  const primaryKey = `idg_char_${activeId}`;
  const backupKey = `${primaryKey}_backup`;
  if (primary !== undefined) values.set(primaryKey, primary);
  if (backup !== undefined) values.set(backupKey, backup);

  const storage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };

  const context = {
    activeCharacterId: activeId,
    localStorage: storage,
    window: {},
    MAX_MANA: 100,
    MANA_REGEN_PER_SECOND: 1,
    defaultCharacterData,
    defaultEquipped: () => ({ weapon: null, helmet: null, chestplate: null, leggings: null, boots: null }),
    defaultCraftingMaterials: () => ({}),
    defaultForgeMaterials: () => ({}),
    sanitizeStoredItem: (item) => item && typeof item === 'object' && !Array.isArray(item) ? item : null,
    sanitizeStoredItems: (items) => Array.isArray(items) ? items.filter(Boolean) : []
  };

  const parserStart = SOURCE.indexOf('var CHARACTER_SAVE_VERSION=');
  const parserEnd = SOURCE.indexOf('function sanitizeStoredText', parserStart);
  const loaderStart = SOURCE.indexOf('function loadPermanentData()');
  const loaderEnd = SOURCE.indexOf('function savePermanentData()', loaderStart);
  assert.notEqual(parserStart, -1, 'production save parser start is present');
  assert.notEqual(parserEnd, -1, 'production save parser end is present');
  assert.notEqual(loaderStart, -1, 'production save loader start is present');
  assert.notEqual(loaderEnd, -1, 'production save loader end is present');

  vm.runInNewContext(
    `${SOURCE.slice(parserStart, parserEnd)}\n${SOURCE.slice(loaderStart, loaderEnd)}\nthis.__loadPermanentData = loadPermanentData;`,
    context,
    { filename: 'index.html#save-recovery-contract' }
  );

  return {
    load: () => context.__loadPermanentData(),
    storage,
    context,
    primaryKey,
    backupKey
  };
}

test('production loader promotes a valid backup after a malformed primary save', () => {
  const backup = JSON.stringify({
    saveVersion: 1,
    souls: 9,
    stats: { totalRuns: 4 },
    mastery: { level: 2 },
    dungeons: { unlocked: { dungeon1: true } },
    selectedClass: 'mage'
  });
  const harness = createRecoveryHarness({ primary: '{not-json', backup });

  const loaded = harness.load();

  assert.equal(loaded.selectedClass, 'mage');
  assert.equal(loaded.souls, 9);
  assert.equal(harness.storage.getItem(harness.primaryKey), backup);
  assert.equal(harness.context.window.__lastSaveRecovery.source, 'backup');
});

test('production loader keeps a valid current save without reporting recovery', () => {
  const primary = JSON.stringify({
    saveVersion: 2,
    souls: 3,
    stats: { totalRuns: 2 },
    selectedClass: 'barbarian'
  });
  const harness = createRecoveryHarness({ primary });

  const loaded = harness.load();

  assert.equal(loaded.selectedClass, 'barbarian');
  assert.equal(loaded.souls, 3);
  assert.equal(harness.context.window.__lastSaveRecovery, null);
  assert.equal(harness.storage.getItem(harness.primaryKey), primary);
});

test('production loader uses defaults when both primary and backup data are unsafe', () => {
  const harness = createRecoveryHarness({
    primary: JSON.stringify({ saveVersion: 3, souls: 99, stats: {} }),
    backup: '{also-not-json'
  });

  const loaded = harness.load();

  assert.equal(loaded.selectedClass, 'barbarian');
  assert.equal(loaded.souls, 0);
  assert.equal(harness.context.window.__lastSaveRecovery.source, 'defaults');
  assert.equal(harness.storage.getItem(harness.primaryKey), JSON.stringify({ saveVersion: 3, souls: 99, stats: {} }));
});

test('production loader migrates retired legacy mastery stats into available points', () => {
  const primary = JSON.stringify({
    saveVersion: 1,
    souls: 1,
    stats: {},
    mastery: { level: 2, statPoints: 0, allocatedStats: { agility: 2, endurance: 3 } },
    selectedClass: 'rogue'
  });
  const harness = createRecoveryHarness({ primary });

  const loaded = harness.load();

  assert.equal(loaded.selectedClass, 'rogue');
  assert.equal(loaded.mastery.statPoints, 5);
  assert.equal('agility' in loaded.mastery.allocatedStats, false);
  assert.equal('endurance' in loaded.mastery.allocatedStats, false);
  assert.equal(harness.context.window.__lastSaveRecovery, null);
});
