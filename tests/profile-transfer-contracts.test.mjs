import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadProfileExportParser() {
  const start = SOURCE.indexOf('var PROFILE_EXPORT_FORMAT=');
  const end = SOURCE.indexOf('function renderCharacterSelectGrid', start);
  assert.notEqual(start, -1, 'profile export format declaration is present');
  assert.notEqual(end, -1, 'profile transfer function boundary is present');

  const context = {
    CLASS_DATA: { barbarian: {}, mage: {} },
    parseCharacterSave(raw) {
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
        if (parsed.saveVersion !== undefined && parsed.saveVersion > 2) return null;
        const recognized = ['souls', 'stats', 'mastery', 'dungeons', 'selectedClass', 'inventory', 'equipped']
          .filter((key) => Object.prototype.hasOwnProperty.call(parsed, key));
        if (recognized.length < 2) return null;
        if (parsed.selectedClass !== undefined && typeof parsed.selectedClass !== 'string') return null;
        return parsed;
      } catch {
        return null;
      }
    },
    parseRunCheckpoint(value) {
      return value && value.version === 1 ? value : null;
    }
  };

  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__parseProfileExportText = parseProfileExportText;`,
    context,
    { filename: 'index.html#profile-transfer-contract' }
  );
  return context.__parseProfileExportText;
}

const parseProfileExport = loadProfileExportParser();

test('plain-text profile transfer preserves durable data, backup, and run checkpoint', () => {
  const data = {
    saveVersion: 2,
    souls: 42,
    stats: { totalRuns: 3 },
    mastery: { level: 7 },
    dungeons: { unlocked: { dungeon1: true } },
    selectedClass: 'mage',
    inventory: [{ id: 'starter-wand' }],
    equipped: { weapon: 'starter-wand' },
    worldLocation: { type: 'town' }
  };
  const backup = { ...data, souls: 40 };
  const checkpoint = { version: 1, activeDungeonId: 'dungeon1', currentRoomId: 'room_start' };
  const envelope = {
    format: 'code-quest-lab-profile',
    formatVersion: 1,
    exportedAt: 1760000000000,
    character: { sourceId: 'char_original', className: 'mage', data },
    backup,
    runCheckpoint: checkpoint
  };

  const result = parseProfileExport(`CODE QUEST LAB PROFILE EXPORT\n${JSON.stringify(envelope)}\n`);
  assert.deepEqual(JSON.parse(JSON.stringify(result.data)), data);
  assert.deepEqual(JSON.parse(JSON.stringify(result.backup)), backup);
  assert.deepEqual(JSON.parse(JSON.stringify(result.checkpoint)), checkpoint);
  assert.equal(result.className, 'mage');
  assert.equal(parseProfileExport(JSON.stringify({ ...envelope, formatVersion: 2 })), null);
  assert.equal(parseProfileExport('not a profile'), null);
});
