import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadSupportHelper() {
  const startMarker = 'function getSessionLearningSupport';
  const endMarker = 'function renderSessionLearningSupport';
  const start = SOURCE.indexOf(startMarker);
  const end = SOURCE.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, 'learning-support helper is present');
  assert.notEqual(end, -1, 'learning-support renderer follows helper');
  const context = {};
  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__support=getSessionLearningSupport;`, context, {
    filename: 'index.html#learning-support-contract'
  });
  return context.__support;
}

test('optional learning support is contextual and remains non-blocking', () => {
  const getSupport = loadSupportHelper();
  const victory = getSupport(true, { roomType: 'boss', roomName: "Guardian's Sanctum" });
  assert.equal(victory.concept, 'Pattern recognition');
  assert.match(victory.note, /final challenge/);

  const freshDefeat = getSupport(false, { roomType: 'combat', roomName: 'First Watch', totalKills: 0 });
  assert.equal(freshDefeat.concept, 'Debugging');
  assert.match(freshDefeat.note, /No enemies were defeated/);
  assert.match(freshDefeat.note, /when you want/);
});

test('learning support reflects the room context and run evidence', () => {
  const getSupport = loadSupportHelper();
  const bossDefeat = getSupport(false, { roomType: 'boss', roomName: "Guardian's Sanctum", totalKills: 8 });
  assert.equal(bossDefeat.concept, 'Pattern recognition');
  assert.match(bossDefeat.note, /Guardian's Sanctum/);

  const shrineDefeat = getSupport(false, { roomType: 'shrine', roomName: 'Quiet Shrine', totalKills: 3 });
  assert.equal(shrineDefeat.concept, 'Planning');
  assert.match(shrineDefeat.note, /health, abilities, and route/);

  const eliteDefeat = getSupport(false, { roomType: 'combat', roomName: 'Ash Hall', totalKills: 6, eliteKills: 2 });
  assert.equal(eliteDefeat.concept, 'Decomposition');
  assert.match(eliteDefeat.note, /2 tougher threats/);
});

test('game-over screen exposes the optional concept label', () => {
  assert.match(SOURCE, /class="goSupportConcept" id="goSupportConcept"/);
  assert.match(SOURCE, /renderSessionLearningSupport\(isVictory,\{/);
});
