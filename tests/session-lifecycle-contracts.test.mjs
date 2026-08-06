import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function overlayElements() {
  const elements = new Map();
  return {
    elements,
    document: {
      getElementById(id) {
        if (!elements.has(id)) {
          elements.set(id, {
            classList: { removed: [], remove(...names) { this.removed.push(...names); } },
            style: { display: 'flex' }
          });
        }
        return elements.get(id);
      }
    }
  };
}

test('returning to the main menu banks run rewards, clears the checkpoint, and despawns run-only state', () => {
  const overlays = overlayElements();
  const calls = [];
  const context = {
    gameRunning: true,
    gamePaused: true,
    runSoulsEarned: 12,
    permanentData: { souls: 5 },
    enemies: [1],
    projectiles: [1],
    enemyProjectiles: [1],
    floaties: [1],
    skillEffects: [1],
    deathParticles: [1],
    cursedLibrarians: [1],
    boss: {},
    miniBoss: {},
    levelUpPending: true,
    levelUpQueue: [1],
    whirlwindActive: true,
    druidSummons: [{ type: 'spirit_guardian' }, { type: 'wolf' }],
    saveTownWorldPosition() { calls.push('saveTownWorldPosition'); },
    gainMasteryXP(value) { calls.push(`gainMasteryXP:${value}`); },
    savePermanentData() { calls.push('savePermanentData'); },
    clearRunCheckpoint() { calls.push('clearRunCheckpoint'); },
    openMainMenu() { calls.push('openMainMenu'); },
    document: overlays.document
  };
  const start = SOURCE.indexOf('function returnToMainMenuFromGame()');
  const end = SOURCE.indexOf('// SKILL SELECTION', start);
  assert.notEqual(start, -1, 'return-to-menu function is present');
  assert.notEqual(end, -1, 'return-to-menu function boundary is present');

  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__returnToMainMenuFromGame = returnToMainMenuFromGame;`, context, { filename: 'index.html#session-lifecycle-contract' });
  context.__returnToMainMenuFromGame();

  assert.equal(context.gameRunning, false);
  assert.equal(context.gamePaused, false);
  assert.equal(context.runSoulsEarned, 0);
  assert.equal(context.permanentData.souls, 17);
  assert.deepEqual(JSON.parse(JSON.stringify(context.enemies)), []);
  assert.equal(context.boss, null);
  assert.equal(context.miniBoss, null);
  assert.equal(context.levelUpPending, false);
  assert.deepEqual(JSON.parse(JSON.stringify(context.levelUpQueue)), []);
  assert.deepEqual(JSON.parse(JSON.stringify(context.druidSummons)), [{ type: 'wolf' }]);
  assert.deepEqual(calls, ['saveTownWorldPosition', 'gainMasteryXP:2', 'savePermanentData', 'clearRunCheckpoint', 'openMainMenu']);
  for (const id of ['pauseOverlay', 'levelUpOverlay', 'treasureOverlay', 'shrineOverlay', 'eventOverlay']) {
    assert.equal(overlays.elements.get(id).style.display, 'none', `${id} is hidden`);
  }
});

test('finish-for-now clears the run checkpoint and persists a Town resume location', () => {
  const calls = [];
  const storedData = { worldLocation: { type: 'entrance', dungeonId: 'dungeon1' } };
  const context = {
    gameRunning: true,
    gamePaused: true,
    dungeonRunEnded: false,
    permanentData: storedData,
    clearRunCheckpoint() { calls.push('clearRunCheckpoint'); },
    loadPermanentData() {
      calls.push('loadPermanentData');
      return storedData;
    },
    savePermanentData() { calls.push('savePermanentData'); },
    enterTown() { calls.push('enterTown'); }
  };
  const start = SOURCE.indexOf('function finishSessionForNow()');
  const end = SOURCE.indexOf('function showGameOverScreen', start);
  assert.notEqual(start, -1, 'finish-for-now function is present');
  assert.notEqual(end, -1, 'finish-for-now function boundary is present');

  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__finishSessionForNow = finishSessionForNow;`, context, { filename: 'index.html#finish-session-contract' });
  context.__finishSessionForNow();

  assert.equal(context.gameRunning, false);
  assert.equal(context.gamePaused, false);
  assert.equal(context.dungeonRunEnded, true);
  assert.deepEqual(JSON.parse(JSON.stringify(storedData.worldLocation)), { type: 'town' });
  assert.deepEqual(calls, ['clearRunCheckpoint', 'loadPermanentData', 'savePermanentData', 'enterTown']);
});

test('new sessions clear stale dungeon door and waypoint status messages', () => {
  const elements = new Map([
    ['doorStatus', {
      textContent: '🔒 DOOR LOCKED (4 remaining)',
      classList: {
        removed: [],
        remove(...names) { this.removed.push(...names); }
      }
    }],
    ['waypointStatus', {
      classList: {
        removed: [],
        remove(...names) { this.removed.push(...names); }
      }
    }]
  ]);
  const context = {
    waypointState: {
      insideId: 'town_waypoint',
      timer: 1.2,
      mode: 'activate',
      ringWaypoint: { id: 'town_waypoint' },
      ringPct: 0.5
    },
    document: {
      getElementById(id) { return elements.get(id) || null; }
    }
  };
  const start = SOURCE.indexOf('function showWaypointStatus(text)');
  const end = SOURCE.indexOf('function updateWaypoints', start);
  assert.notEqual(start, -1, 'session transient UI reset is present');
  assert.notEqual(end, -1, 'session transient UI reset boundary is present');

  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__resetSessionTransientUi = resetSessionTransientUi;`, context, {
    filename: 'index.html#session-transient-ui-contract'
  });
  context.__resetSessionTransientUi();

  assert.equal(elements.get('doorStatus').textContent, '');
  assert.deepEqual(elements.get('doorStatus').classList.removed, ['visible', 'doorStatusLocked']);
  assert.deepEqual(elements.get('waypointStatus').classList.removed, ['visible']);
  assert.deepEqual(context.waypointState, {
    insideId: null,
    timer: 0,
    mode: null,
    ringWaypoint: null,
    ringPct: 0
  });
});

test('static rooms clear stale door text as well as hiding the status element', () => {
  const start = SOURCE.indexOf('function updateRoomProgress(geo)');
  const end = SOURCE.indexOf('function playerDied()', start);
  assert.notEqual(start, -1, 'room progress function is present');
  assert.notEqual(end, -1, 'room progress function boundary is present');
  const progress = SOURCE.slice(start, end);
  assert.match(
    progress,
    /if\(def\.type===RT\.START\|\|def\.type===RT\.TREASURE\|\|def\.type===RT\.SHRINE\)\{\s*doorStatus\.textContent='';\s*doorStatus\.classList\.remove\('visible'\);/
  );
});

test('zones without waypoints hide an old activation message', () => {
  const elements = new Map([
    ['waypointStatus', {
      classList: {
        removed: [],
        remove(...names) { this.removed.push(...names); }
      }
    }]
  ]);
  const context = {
    activeDungeonId: 'dungeon1',
    waypointMenuOpen: false,
    waypointTeleportFade: { active: false },
    waypointState: {
      insideId: null,
      timer: 0,
      mode: null,
      justActivatedId: 'depths_waypoint',
      ringWaypoint: null,
      ringPct: 0
    },
    getWaypointsForZone() { return []; },
    document: {
      getElementById(id) { return elements.get(id) || null; }
    }
  };
  const start = SOURCE.indexOf('function showWaypointStatus(text)');
  const end = SOURCE.indexOf('function completeWaypointActivation', start);
  assert.notEqual(start, -1, 'waypoint helpers are present');
  assert.notEqual(end, -1, 'waypoint update boundary is present');

  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__updateWaypoints = updateWaypoints;`, context, {
    filename: 'index.html#waypoint-zone-contract'
  });
  context.__updateWaypoints(0.2, {});

  assert.deepEqual(elements.get('waypointStatus').classList.removed, ['visible']);
  assert.equal(context.waypointState.insideId, null);
});

test('deleting the active profile removes its primary, backup, checkpoint, index entry, and active pointer', () => {
  const values = new Map([
    ['idg_char_char_a', '{primary}'],
    ['idg_char_char_a_backup', '{backup}'],
    ['idg_char_char_a_run_checkpoint', '{checkpoint}'],
    ['active-character', 'char_a']
  ]);
  let savedIndex = null;
  const context = {
    activeCharacterId: 'char_a',
    SAVE_KEY_ACTIVE_CHAR: 'active-character',
    localStorage: {
      getItem(key) { return values.has(key) ? values.get(key) : null; },
      removeItem(key) { values.delete(key); },
      setItem(key, value) { values.set(key, String(value)); }
    },
    charDataKey(id) { return `idg_char_${id}`; },
    charBackupKey(id) { return `idg_char_${id}_backup`; },
    runCheckpointKey(id) { return `idg_char_${id}_run_checkpoint`; },
    loadCharacterIndex() { return [{ id: 'char_a' }, { id: 'char_b' }]; },
    saveCharacterIndex(index) { savedIndex = index; },
    console
  };
  const start = SOURCE.indexOf('function deleteCharacter(charId)');
  const end = SOURCE.indexOf('function openSaveDeleteConfirm', start);
  assert.notEqual(start, -1, 'delete-character function is present');
  assert.notEqual(end, -1, 'delete-character function boundary is present');

  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__deleteCharacter = deleteCharacter;`, context, { filename: 'index.html#delete-character-contract' });
  context.__deleteCharacter('char_a');

  assert.equal(values.has('idg_char_char_a'), false);
  assert.equal(values.has('idg_char_char_a_backup'), false);
  assert.equal(values.has('idg_char_char_a_run_checkpoint'), false);
  assert.equal(values.has('active-character'), false);
  assert.equal(context.activeCharacterId, null);
  assert.deepEqual(JSON.parse(JSON.stringify(savedIndex)), [{ id: 'char_b' }]);
});

test('page backgrounding saves static-world position or active-run checkpoint before permanent data', () => {
  const start = SOURCE.indexOf('function saveForPageBackgrounding(){');
  const end = SOURCE.indexOf("document.addEventListener('visibilitychange'", start);
  assert.notEqual(start, -1, 'page-background save function is present');
  assert.notEqual(end, -1, 'page-background save function boundary is present');

  for (const [zone, expected] of [
    ['town', ['saveTownWorldPosition', 'savePermanentData']],
    ['entrance_dungeon1', ['saveTownWorldPosition', 'savePermanentData']],
    ['dungeon1', ['saveRunCheckpoint:background', 'savePermanentData']]
  ]) {
    const calls = [];
    const context = {
      activeDungeonId: zone,
      isEntranceZone(value) { return value === 'entrance_dungeon1'; },
      saveTownWorldPosition() { calls.push('saveTownWorldPosition'); },
      saveRunCheckpoint(reason) { calls.push(`saveRunCheckpoint:${reason}`); },
      savePermanentData() { calls.push('savePermanentData'); },
      console
    };
    vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__saveForPageBackgrounding = saveForPageBackgrounding;`, context, {
      filename: `index.html#background-save-${zone}`
    });
    context.__saveForPageBackgrounding();
    assert.deepEqual(calls, expected, `${zone} uses the correct background-save path`);
  }
});
