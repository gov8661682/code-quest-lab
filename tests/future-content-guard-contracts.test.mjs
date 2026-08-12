import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadRouteMetadata() {
  const defsStart = SOURCE.indexOf('var DUNGEON_DEFS={');
  const defsEnd = SOURCE.indexOf('// ============================================================\n// BOSS IDENTITY REGISTRY', defsStart);
  const bossStart = SOURCE.indexOf('var BOSS_IDENTITY_DEFS=');
  const bossEnd = SOURCE.indexOf('// ============================================================\n// PER-DUNGEON DIFFICULTY SCALING', bossStart);
  const regionStart = SOURCE.indexOf('var REGION_ORDER=');
  const regionEnd = SOURCE.indexOf('function isEntranceZone', regionStart);
  assert.notEqual(defsStart, -1, 'dungeon definitions are present');
  assert.notEqual(defsEnd, -1, 'dungeon definitions have a stable boundary');
  assert.notEqual(bossStart, -1, 'boss identity registry is present');
  assert.notEqual(bossEnd, -1, 'boss identity registry has a stable boundary');
  assert.notEqual(regionStart, -1, 'release region order is present');
  assert.notEqual(regionEnd, -1, 'release region order has a stable boundary');

  const context = {
    permanentData: { mastery: { level: 0 }, stats: {} }
  };
  vm.runInNewContext(
    `${SOURCE.slice(defsStart, defsEnd)}\n${SOURCE.slice(bossStart, bossEnd)}\n${SOURCE.slice(regionStart, regionEnd)}\nthis.__metadata={DUNGEON_DEFS,BOSS_IDENTITY_DEFS,REGION_ORDER,getNextDungeonId,isReleaseDungeon};`,
    context,
    { filename: 'index.html#future-content-guard-contract' }
  );
  return context.__metadata;
}

function sliceBetween(startMarker, endMarker) {
  const start = SOURCE.indexOf(startMarker);
  const end = SOURCE.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `${startMarker} is present`);
  assert.notEqual(end, -1, `${endMarker} is present after ${startMarker}`);
  return SOURCE.slice(start, end);
}

test('D13 remains source-resident but outside the V1 release and save route', () => {
  const metadata = loadRouteMetadata();
  assert.equal(metadata.DUNGEON_DEFS.dungeon13.name, 'Realm of Space');
  assert.equal(metadata.BOSS_IDENTITY_DEFS.find((entry) => entry.id === 'corruption_of_space').displayName, 'Corruption of Space');
  assert.equal(metadata.REGION_ORDER.at(-1), 'dungeon12');
  assert.equal(metadata.getNextDungeonId('dungeon12'), null);
  assert.equal(metadata.isReleaseDungeon('dungeon13'), false);
  assert.equal(metadata.REGION_ORDER.includes('dungeon13'), false);
  assert.match(SOURCE, /!isReleaseDungeon\(dungeonId\)/, 'normal dungeon entry keeps the release guard');
  assert.match(SOURCE, /!isReleaseDungeon\(cp\.activeDungeonId\)/, 'active-run recovery keeps the release guard');
});

test('D13 keeps its authored two-room atmosphere and named boss wiring', () => {
  const generator = sliceBetween('function tryGenerateDungeon13(){', 'function validateDungeon13Layout');
  assert.match(generator, /var mainPath=\['room_start','room_boss'\]/, 'D13 stays a bounded entrance-to-arena route');
  assert.match(generator, /name:'Threshold of the Void'/, 'D13 keeps the authored threshold');
  assert.match(generator, /name:'The Collapsing Arena'/, 'D13 keeps the authored final arena');
  assert.match(generator, /_isSpaceRiftArena:true/, 'D13 keeps the Corruption of Space arena marker');

  const bossSpawner = sliceBetween('function spawnCorruptionOfSpace(geo){', 'function updateCorruptionOfSpace(dt,geo)');
  assert.match(bossSpawner, /isSpaceCorruption:true/, 'D13 keeps the named boss runtime identity');
  assert.match(bossSpawner, /csVoidSlashTimer|csPortalShotTimer|csDashTimer|csGravityTimer/, 'D13 keeps its Phase 1 attack families');

  const bossUpdater = sliceBetween('function updateCorruptionOfSpace(dt,geo){', 'function updateCorruptionOfSpaceMovement');
  assert.match(bossUpdater, /beginCorruptionOfSpacePhase2\(\)/, 'D13 keeps its Phase 2 transition');
  assert.match(bossUpdater, /beginCorruptionOfSpacePhase3\(\)/, 'D13 keeps its Phase 3 transition');
});

test('D13 defeat closes the Joey reward boundary while remaining gated from release', () => {
  const finalizer = sliceBetween('function finalizeCorruptionOfSpaceDefeat(){', '// ---- Rendering ----');
  assert.match(finalizer, /var bx=boss\.x,by=boss\.y;/, 'the defeat sequence captures the authored boss position');
  assert.match(finalizer, /SOUL_REWARD_GUARDIAN\*2\.0/, 'D13 keeps Joey\'s large guardian soul reward');
  assert.match(finalizer, /spaceCorruptionsDefeated/, 'D13 records its named boss statistic');
  assert.match(finalizer, /gainXP\(XP_PER_BOSS\)/, 'D13 awards boss experience');
  assert.match(finalizer, /gainMasteryXP\(MXP_GUARDIAN\+30\)/, 'D13 awards guardian mastery');
  assert.match(finalizer, /gainMasteryXP\(MXP_DUNGEON_COMPLETE\)/, 'D13 awards completion mastery');
  assert.match(finalizer, /spawnDeathParticles\(bx,by/, 'D13 keeps the authored defeat spectacle');
  assert.match(finalizer, /checkAchievements\(\);refreshDungeonUnlocks\(\);recordDungeonDifficultyCompletion\(\);/, 'D13 uses the standard completion handoff');
  assert.match(finalizer, /applyBossPurification\('dungeon13'/, 'the authored purification hook remains');
  assert.match(finalizer, /unlockBossExit\(2\.2\)/, 'the existing exit system remains reusable');
  assert.equal(finalizer.includes('grantDungeon13'), false, 'D13 does not invent a special loot helper absent from Joey\'s reference');
  assert.match(SOURCE, /var REGION_ORDER=\['dungeon1'.*'dungeon12'\]/s, 'D13 remains outside the release route until the full promotion seam is ready');
});
