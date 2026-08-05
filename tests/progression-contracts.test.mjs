import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function extractBetween(startMarker, endMarker, label) {
  const start = SOURCE.indexOf(startMarker);
  const end = SOURCE.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `${label} start is present`);
  assert.notEqual(end, -1, `${label} end is present`);
  return SOURCE.slice(start, end);
}

function loadDungeonGenerator() {
  const start = SOURCE.indexOf('var RT={');
  const end = SOURCE.indexOf('// DUNGEON 2:', start);
  assert.notEqual(start, -1, 'production room-type declaration is present');
  assert.notEqual(end, -1, 'production dungeon generator boundary is present');

  const context = {
    activeModifier: { _blessedJourney: false, _ancientRiches: false, _eliteInvasion: false, _undeadHorde: false },
    DUNGEON_SCALING: { dungeon1: { spawnDensityMult: 1 } },
    SOUL_BONUS_SIDE_ROOM: 5,
    MXP_SIDE_ROOM_BONUS: 5,
    buildMinimapPositions() {}
  };
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__progressionApi={generateDungeon,validateDungeon};`,
    context,
    { filename: 'index.html#progression-contract' }
  );
  return context.__progressionApi;
}

function loadRegionOrder() {
  const start = SOURCE.indexOf('var REGION_ORDER=');
  const end = SOURCE.indexOf('function isEntranceZone', start);
  assert.notEqual(start, -1, 'production region-order declaration is present');
  assert.notEqual(end, -1, 'production region-order boundary is present');

  const context = {};
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__regionApi={REGION_ORDER,getNextDungeonId,isReleaseDungeon};`,
    context,
    { filename: 'index.html#region-order-contract' }
  );
  return context.__regionApi;
}

function loadShippedDungeonGenerators() {
  const generatorSnippets = [
    extractBetween('function validateDungeon(defs,mainPath){', 'function buildFallbackDungeon(){', 'dungeon validator'),
    extractBetween('function tryGenerateDungeon2(){', 'function buildFallbackDungeon2(){', 'Dungeon 2 generator'),
    extractBetween('function tryGenerateDungeon4(){', 'function buildFallbackDungeon4(){', 'Dungeon 4 generator'),
    extractBetween('function tryGenerateDungeon5(){', 'function buildFallbackDungeon5(){', 'Dungeon 5 generator'),
    extractBetween('function tryGenerateDungeon6(){', 'function buildFallbackDungeon6(){', 'Dungeon 6 generator'),
    extractBetween('function tryGenerateDungeon7(){', 'function buildFallbackDungeon7(){', 'Dungeon 7 generator'),
    extractBetween('function tryGenerateDungeon8(){', 'function buildFallbackDungeon8(){', 'Dungeon 8 generator')
  ];
  const context = {
    RT: {
      START: 'start', COMBAT: 'combat', TREASURE: 'treasure', BOSS: 'boss', SIDE: 'side',
      SHRINE: 'shrine', ELITE: 'elite', MINIBOSS: 'miniboss', EVENT: 'event'
    },
    DUNGEON2_SPAWN_MULTIPLIER: 1,
    D4_EVENT_IDS: ['d4_ambush', 'd4_corrupted_shrine', 'd4_void_rift', 'd4_prison_cell', 'd4_treasure_vault', 'd4_dark_merchant', 'd4_fallen_hero', 'd4_puzzle_room', 'd4_hidden_archive'],
    D4_ROOM_STYLES: ['standard'],
    D5_SIDE_STYLES: ['burnt_homes'],
    D6_SIDE_STYLES: ['crystal_alcove'],
    D7_SIDE_STYLES: ['dead_grove'],
    D8_SIDE_STYLES: ['smugglers_tunnel'],
    SOUL_BONUS_SIDE_ROOM: 5,
    MXP_SIDE_ROOM_BONUS: 5,
    buildMinimapPositions() {},
    shuffleArray(values) { return values; },
    getD2RoomName() { return 'Generated Room'; },
    getD4RoomName() { return 'Generated Room'; },
    getD5SideName() { return 'Generated Side Room'; },
    getD6SideName() { return 'Generated Side Room'; },
    getD7SideName() { return 'Generated Side Room'; },
    getD8SideName() { return 'Generated Side Room'; },
    buildD2CompositionForType() { return []; },
    d4BuildComposition() { return []; },
    d5BuildComposition() { return []; },
    d6BuildComposition() { return []; },
    d7BuildComposition() { return []; },
    d8BuildComposition() { return []; }
  };
  vm.runInNewContext(
    `${generatorSnippets.join('\n')}
this.__v1DungeonApi={validateDungeon,tryGenerateDungeon2,tryGenerateDungeon4,tryGenerateDungeon5,tryGenerateDungeon6,tryGenerateDungeon7,tryGenerateDungeon8};`,
    context,
    { filename: 'index.html#v1-generator-contract' }
  );
  return context.__v1DungeonApi;
}

test('production dungeon generator produces connected start-to-boss routes', () => {
  const api = loadDungeonGenerator();

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const generated = api.generateDungeon();
    assert.ok(generated && generated.defs && generated.mainPath, `generated route ${attempt}`);
    assert.ok(api.validateDungeon(generated.defs, generated.mainPath), `valid route ${attempt}`);
    assert.equal(generated.defs[generated.mainPath[0]].type, 'start');
    assert.equal(generated.defs[generated.mainPath.at(-1)].type, 'boss');
    assert.ok(generated.mainPath.length >= 6, `route length ${attempt}`);
  }
});

test('production dungeon validator rejects broken route contracts', () => {
  const api = loadDungeonGenerator();
  const validDefs = {
    start: { type: 'start', forward: 'combat' },
    combat: { type: 'combat', forward: 'boss', back: 'start' },
    boss: { type: 'boss', back: 'combat' }
  };
  const validPath = ['start', 'combat', 'boss'];

  assert.equal(api.validateDungeon(validDefs, validPath), true);
  assert.equal(api.validateDungeon(validDefs, ['start', 'boss']), false);
  assert.equal(api.validateDungeon({ ...validDefs, start: { type: 'combat', forward: 'combat' } }, validPath), false);
  assert.equal(api.validateDungeon({ ...validDefs, boss: { type: 'combat', back: 'combat' } }, validPath), false);
  assert.equal(api.validateDungeon({ ...validDefs, combat: { type: 'combat', forward: 'missing', back: 'start' } }, validPath), false);
});

test('production region order advances through an entrance and ends safely', () => {
  const api = loadRegionOrder();
  const expectedReleaseOrder = ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8'];

  assert.deepEqual(Array.from(api.REGION_ORDER), expectedReleaseOrder);
  for (let index = 0; index < api.REGION_ORDER.length - 1; index += 1) {
    assert.equal(api.getNextDungeonId(api.REGION_ORDER[index]), api.REGION_ORDER[index + 1]);
  }
  assert.equal(api.getNextDungeonId(api.REGION_ORDER.at(-1)), null);
  assert.equal(api.getNextDungeonId('unknown_dungeon'), null);
  assert.equal(api.isReleaseDungeon('dungeon1'), true);
  assert.equal(api.isReleaseDungeon('dungeon8'), true);
  for (const postReleaseId of ['dungeon9', 'dungeon10', 'dungeon11', 'dungeon12', 'dungeon13', 'dungeon14', 'dungeon15', 'dungeon16']) {
    assert.equal(api.isReleaseDungeon(postReleaseId), false, `${postReleaseId} is post-release`);
    assert.equal(api.getNextDungeonId(postReleaseId), null, `${postReleaseId} cannot enter the V1 chain`);
  }
});

test('entrance objectives resolve from the underlying dungeon definition', () => {
  assert.match(SOURCE, /function getActiveDungeon\(\)\{[\s\S]*?isEntranceZone\(activeDungeonId\)\?getEntranceDungeonId\(activeDungeonId\):activeDungeonId[\s\S]*?return DUNGEON_DEFS\[dungeonId\]\|\|DUNGEON_DEFS\.dungeon1;/);
});

test('Town keeps the open-world portal discoverable off-screen', () => {
  assert.match(SOURCE, /function drawTownPortalIndicator\(\)[\s\S]*?activeDungeonId!==\'town\'[\s\S]*?portalArea/);
  assert.match(SOURCE, /drawOffscreenEnemyIndicators\(\);\s*drawTownPortalIndicator\(\);/);
});

test('production navigation hides post-release dungeon entries and blocks legacy resume bypasses', () => {
  assert.match(SOURCE, /REGION_ORDER\.forEach\(function\(did\)\{/);
  assert.match(SOURCE, /function isReleaseDungeon\(dungeonId\)\{return REGION_ORDER\.indexOf\(dungeonId\)>=0;\}/);
  assert.match(SOURCE, /function openDungeonGate\(dungeonId\)\{[\s\S]*?if\(!isReleaseDungeon\(dungeonId\)\)\{/);
  assert.match(SOURCE, /_spawnWl\.type==='entrance'&&_spawnWl\.dungeonId&&isReleaseDungeon\(_spawnWl\.dungeonId\)/);
  assert.match(SOURCE, /function enterEntrance\(dungeonId\)\{\s*if\(!isReleaseDungeon\(dungeonId\)\)\{/);
  assert.match(SOURCE, /if\(isReleaseDungeon\('dungeon9'\)\)\{/);
  assert.match(SOURCE, /if\(isReleaseDungeon\('dungeon10'\)\)\{/);
  assert.doesNotMatch(SOURCE, />Practice Modules</);
});

test('waypoint menu close requires leaving before it can reopen', () => {
  const waypointFlow = extractBetween('var WAYPOINT_HOLD_TIME=', '// All zones that currently define waypoints', 'waypoint hold flow');
  assert.match(waypointFlow, /justClosedId:null/);
  assert.match(waypointFlow, /menuWaypointId:null/);
  assert.match(waypointFlow, /menuClosedNeedsExit:false/);
  assert.match(waypointFlow, /justClosedId===found\.id/);
  assert.match(waypointFlow, /waypointState\.menuClosedNeedsExit/);
  assert.match(waypointFlow, /waypointState\.menuWaypointId=found\.id;openWaypointMenu\(\)/);
  assert.match(waypointFlow, /waypointState\.justClosedId=waypointState\.menuWaypointId/);
  assert.match(waypointFlow, /waypointState\.menuClosedNeedsExit=true/);
  assert.match(waypointFlow, /waypointState\.justClosedId=null/);
});

test('last V1 dungeon shows the existing session summary at the safe endpoint', () => {
  assert.match(SOURCE, /var nextId=getNextDungeonId\(finishedDungeonId\);/);
  assert.match(SOURCE, /if\(nextId\)\{[\s\S]*?enterEntrance\(nextId\);[\s\S]*?\}else\{[\s\S]*?dungeonRunEnded=true;[\s\S]*?showGameOverScreen\(true\);/);
  assert.match(SOURCE, /document\.getElementById\('goRoom'\)\.textContent=roomName;/);
});

test('every shipped V1 generator preserves a connected boss-ended route', () => {
  const api = loadShippedDungeonGenerators();
  const expected = [
    ['dungeon2', 'tryGenerateDungeon2', '_isDungeon2'],
    ['dungeon4', 'tryGenerateDungeon4', '_isVoidMonarchBoss'],
    ['dungeon5', 'tryGenerateDungeon5', '_isChieftainBoss'],
    ['dungeon6', 'tryGenerateDungeon6', '_isArchmageBoss'],
    ['dungeon7', 'tryGenerateDungeon7', '_isHollowTreeBoss'],
    ['dungeon8', 'tryGenerateDungeon8', '_isBrokerBoss']
  ];

  for (const [dungeonId, generatorName, bossMarker] of expected) {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const generated = api[generatorName]();
      assert.ok(generated && generated.defs && generated.mainPath, `${dungeonId} route ${attempt} exists`);
      assert.equal(api.validateDungeon(generated.defs, generated.mainPath), true, `${dungeonId} route ${attempt} validates`);
      assert.equal(generated.defs[generated.mainPath[0]].type, 'start', `${dungeonId} starts at an entrance`);
      const boss = generated.defs[generated.mainPath.at(-1)];
      assert.equal(boss.type, 'boss', `${dungeonId} ends in a boss room`);
      assert.equal(boss[bossMarker], true, `${dungeonId} keeps its intended boss marker`);
    }
  }
});

test('every shipped V1 boss uses the shared room-clear and exit handoff', () => {
  const bossRoomFlow = extractBetween('}else if(def.type===RT.BOSS){', '// ---- MINI BOSS ROOM ----', 'boss-room load flow');
  const shippedBossSpawns = [
    ['dungeon1', 'spawnBoss'],
    ['dungeon2', 'spawnFallenKingPlaceholder'],
    ['dungeon4', 'spawnVoidMonarch'],
    ['dungeon5', 'spawnChieftain'],
    ['dungeon6', 'spawnArchmageValen'],
    ['dungeon7', 'spawnHollowWorldTree'],
    ['dungeon8', 'spawnBroker']
  ];
  for (const [dungeonId, spawnFunction] of shippedBossSpawns) {
    assert.match(bossRoomFlow, new RegExp(`${spawnFunction}\\(geo\\)`), `${dungeonId} has a production boss spawn`);
  }

  const genericBossDefeat = extractBetween('function dealDamageToBoss(amount,isCrit){', 'function formatRunTime', 'generic boss defeat flow');
  for (const marker of ['_isFK', '_isChief', '_isValen', '_isHollowTree', '_isBroker']) {
    assert.match(genericBossDefeat, new RegExp(`var ${marker}=!!boss\\.`), `${marker} is dispatched by the shared defeat handler`);
  }
  assert.match(genericBossDefeat, /roomStates\[bossRoomId\]\.bossDefeated=true;roomStates\[bossRoomId\]\.cleared=true;/, 'generic boss defeat clears the final room');
  assert.match(genericBossDefeat, /unlockBossExit\(1\.6\);/, 'generic boss defeat unlocks the shared exit portal');
  const recoveredBossRoom = extractBetween("}else if(def.type===RT.BOSS){", '// ---- MINI BOSS ROOM ----', 'recovered boss-room load flow');
  assert.match(recoveredBossRoom, /if\(rs\.bossDefeated\)\{[\s\S]*?openForwardDoor\(geo\);sideDoorOpen=\(def\.side!==null\);[\s\S]*?spawnExitPortal\(\);/, 'reloaded boss victories restore the exit portal');
  assert.match(SOURCE, /function voidMonarchDefeated\(\)[\s\S]*?roomStates\[bossRoomId\]\.bossDefeated=true;roomStates\[bossRoomId\]\.cleared=true;[\s\S]*?unlockBossExit\(2\.2\);/, 'Dungeon 4 special defeat also clears the room and unlocks the exit');
});
