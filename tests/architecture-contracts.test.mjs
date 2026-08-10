import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function readDataRegistry(name) {
  const match = SOURCE.match(new RegExp(`var ${name}=({[\\s\\S]*?\\n});`));
  assert.ok(match, `${name} registry is present`);
  return vm.runInNewContext(`(${match[1]})`, Object.create(null));
}

test('boss identity is centralized without removing named creative content', () => {
  assert.match(SOURCE, /var BOSS_IDENTITY_DEFS=\[/);
  for (const name of [
    'Stone Guardian',
    'Fallen King',
    'Void Monarch',
    'Corrupted High Chieftain',
    'Archmage Valen',
    'Hollow World Tree',
    'The Broker',
    'Oathbreaker King',
    'The Alchemist',
    'Corrupted Ranger Captain',
    'Corrupted Necromancer',
    'Corruption of Space',
    'Corruption of Time',
    'Corruption of Life',
    'Pure Corruption'
  ]) assert.match(SOURCE, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${name} remains in the registry`);
  assert.match(SOURCE, /function getBossIdentity\(roomDef,bossObj\)/);
  assert.match(SOURCE, /function getBossDisplayName\(roomDef,bossObj\)/);
  assert.match(SOURCE, /var _bossSlainMsg=getBossDefeatMessage\(def,null\);/);
  assert.match(SOURCE, /enemyStr=_bossIdentity\.displayName/);
  assert.match(SOURCE, /getBossDisplayName\(def,boss\)/);
});
test('fast browser QA controls are gated, accelerated, and not profile state', () => {
  assert.match(SOURCE, /var developerQATimeScale=1;/);
  assert.match(SOURCE, /var developerQAHighDamageEnabled=false;/);
  assert.match(SOURCE, /var developerQAEnemyFreeEnabled=false;/);
  assert.match(SOURCE, /developerCheatAllowed\(\)\?developerQATimeScale:1/);
  assert.match(SOURCE, /developerCheatAllowed\(\)&&developerQAHighDamageEnabled/);
  assert.match(SOURCE, /function developerQaJumpToBoss\(\)/);
  assert.match(SOURCE, /function developerQaAdvanceBossPhase\(\)/);
  assert.match(SOURCE, /var isOathbreaker=!!boss\.isOathbreakerKing;/);
  assert.match(SOURCE, /var isAlchemist=!!boss\.isAlchemist;/);
  assert.match(SOURCE, /var isRangerCaptain=!!boss\.isRangerCaptain;/);
  assert.match(SOURCE, /var isNecromancer=!!boss\.isNecromancer;/);
  assert.match(SOURCE, /if\(isOathbreaker\|\|isAlchemist\|\|isRangerCaptain\|\|isNecromancer\)dealDamageToBoss\(0,false\);/);
  assert.match(SOURCE, /function developerQaCompleteCurrentRoom\(\)/);
  assert.match(SOURCE, /function developerQaClearEncounterAdds\(\)/);
  assert.match(SOURCE, /var bossName=getBossDisplayName\(def,boss\);[\s\S]*?dealDamageToBoss\(1000000000,false\);[\s\S]*?developerQaClearEncounterAdds\(\);[\s\S]*?developerQaLog\('boss-skip',\{boss:bossName\}\)/);
  assert.match(SOURCE, /var bossExitReady=!!\(def&&def\.type===RT\.BOSS&&!boss&&roomCleared&&!enemies\.some\(/);
  assert.match(SOURCE, /window\.__cqlDevTelemetry/);
  assert.match(SOURCE, /var developerQASequences=\[/);
  assert.match(SOURCE, /\['C','Q','L','S'\]/);
  assert.match(SOURCE, /\['C','Q','L','B'\]/);
  assert.doesNotMatch(SOURCE, /permanentData\.[^;\n]*(?:developerQA|developerQATimeScale)/);
});

test('developer QA enemy-free mode stays outside normal player and boss state', () => {
  assert.match(SOURCE, /function developerQaClearEncounterAdds\(\)[\s\S]*?enemies=\[\];enemyProjectiles=\[\];cursedLibrarians=\[\];/);
  assert.match(SOURCE, /function developerQaApplyEnemyFreeMode\(\)[\s\S]*?developerQaClearEncounterAdds\(\);/);
  assert.match(SOURCE, /developerQaApplyEnemyFreeMode\(\);\s*var _combatIntroActive/);
  assert.match(SOURCE, /developerQaApplyEnemyFreeMode\(\);\s*updateDoorInteraction/);
  assert.match(SOURCE, /developerQATelemetry\.push\(event\)/);
});

test('mini-boss QA completion cannot unlock an exit before the encounter spawns', () => {
  assert.match(SOURCE, /def\.type===RT\.MINIBOSS&&!\(roomStates\[currentRoomId\]&&roomStates\[currentRoomId\]\.cleared\)/);
  assert.match(SOURCE, /developerQaLog\('miniboss-not-ready'\)/);
  assert.match(SOURCE, /var miniBossReady=roomType!==RT\.MINIBOSS\|\|/);
  assert.match(SOURCE, /exitControlReady&&roomCleared&&!roomTransitioning&&miniBossReady/);
});

test('encounter tuning centralizes difficulty and modifier composition', () => {
  assert.match(SOURCE, /function getEncounterTuning\(dungeonId\)/);
  for (const field of [
    'enemyHpMult',
    'enemyDmgMult',
    'enemySpeedMult',
    'enemyAttackSpeedMult',
    'miniBossHpMult',
    'miniBossDmgMult',
    'bossHpMult',
    'bossDmgMult',
    'bossAttackSpeedMult'
  ]) assert.match(SOURCE, new RegExp(`${field}:`), `${field} remains in the shared tuning contract`);

  for (const [functionName, dungeonId] of [
    ['spawnBoss', 'dungeon1'],
    ['spawnFallenKingPlaceholder', 'dungeon2'],
    ['spawnVoidMonarch', 'dungeon4'],
    ['spawnChieftain', 'dungeon5'],
    ['spawnArchmageValen', 'dungeon6'],
    ['spawnHollowWorldTree', 'dungeon7'],
    ['spawnBroker', 'dungeon8'],
    ['spawnOathbreakerKing', 'dungeon9'],
    ['spawnAlchemist', 'dungeon10'],
    ['spawnRangerCaptain', 'dungeon11'],
    ['spawnNecromancer', 'dungeon12'],
    ['spawnCorruptionOfSpace', 'dungeon13'],
    ['spawnCorruptionOfTime', 'dungeon14'],
    ['spawnCorruptionOfLife', 'dungeon15'],
    ['spawnPureCorruption', 'dungeon16'],
    ['spawnPureCorruptionRematch', 'dungeon16']
  ]) {
    const escaped = functionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const body = SOURCE.match(new RegExp(`function ${escaped}\\([^]*?\\n\\}`))?.[0] || '';
    assert.match(body, new RegExp(`getEncounterTuning\\(['"]${dungeonId}['"]\\)`), `${functionName} uses shared tuning`);
    assert.match(body, /\.bossHpMult/);
    assert.match(body, /\.bossDmgMult/);
  }

  assert.match(SOURCE, /var _encounterTuning=getEncounterTuning\(\);/);
  assert.match(SOURCE, /var _mbHp=_mbTuning\.miniBossHpMult;/);
  assert.match(SOURCE, /var _mbDmg=_mbTuning\.miniBossDmgMult;/);
});

test('mini-boss rosters use explicit dungeon routing with a safe creative fallback', () => {
  assert.match(SOURCE, /var MINIBOSS_TYPES_BY_DUNGEON=\{/);
  for (const [dungeonId, roster] of [
    ['dungeon1', 'MINIBOSS_TYPES_D1'],
    ['dungeon2', 'MINIBOSS_TYPES_D2'],
    ['dungeon4', 'MINIBOSS_TYPES_D4'],
    ['dungeon5', 'MINIBOSS_TYPES_D5'],
    ['dungeon6', 'MINIBOSS_TYPES_D6'],
    ['dungeon10', 'MINIBOSS_TYPES_D10']
  ]) {
    assert.match(SOURCE, new RegExp(`${dungeonId}:${roster}`), `${dungeonId} keeps its Joey-authored roster`);
  }
  assert.match(SOURCE, /var pool=MINIBOSS_TYPES_BY_DUNGEON\[activeDungeonId\]\|\|MINIBOSS_TYPES_D1;/);
  const pickerBody = SOURCE.match(/function pickMiniBossType\(\)\{([\s\S]*?)\n\}/)?.[1] || '';
  assert.ok(pickerBody, 'mini-boss picker body is present');
  assert.doesNotMatch(pickerBody, /if\(activeDungeonId===/);
});

test('Dungeon 11 keeps its environment-first identity and pays its authored salvage', () => {
  assert.match(SOURCE, /objective:'Defeat the Corrupted Ranger Captain'/);
  assert.match(SOURCE, /function grantDungeon11ExplorationMaterials\(style\)\{/);
  assert.match(SOURCE, /function grantDungeon11BossMaterials\(\)\{/);
  assert.match(SOURCE, /if\(_isFirstVisit&&!rs\.d11MaterialsGranted\)\{/);
  assert.match(SOURCE, /grantDungeon11BossMaterials\(\);/);
  assert.match(SOURCE, /if\(def\._isDungeon11&&!def\._isRangerCaptainBoss\)\{/);
  assert.match(SOURCE, /if\(def\._isRangerCaptainBoss\)\{/);
  assert.match(SOURCE, /fm\.beaconCore=\(fm\.beaconCore\|\|0\)\+1;/);
});

test('Dungeon 12 keeps the graveyard route and pays the standard boss reward contract', () => {
  assert.match(SOURCE, /objective:'Defeat the Corrupted Necromancer'/);
  assert.match(SOURCE, /function spawnNecromancer\(geo\)\{/);
  assert.match(SOURCE, /function finalizeNecromancerDefeat\(\)\{[\s\S]*?necromancersDefeated=/);
  assert.match(SOURCE, /function finalizeNecromancerDefeat\(\)\{[\s\S]*?gainXP\(XP_PER_BOSS\);gainMasteryXP\(MXP_GUARDIAN\+30\);gainMasteryXP\(MXP_DUNGEON_COMPLETE\);/);
  assert.match(SOURCE, /function finalizeNecromancerDefeat\(\)\{[\s\S]*?recordDungeonDifficultyCompletion\(\);[\s\S]*?unlockBossExit\(2\.2\);/);
  assert.match(SOURCE, /stats:\{[^\n]*necromancersDefeated:0/);
  assert.match(SOURCE, /if\(rs\.bossDefeated\)\{[\s\S]*?The Corrupted Necromancer has fallen\.[\s\S]*?unlockBossExit\(0\.2\);/);
});

test('difficulty registries stay complete, finite, and monotonic', () => {
  const dungeonScaling = readDataRegistry('DUNGEON_SCALING');
  const dungeonOrder = [
    'dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7',
    'dungeon8', 'dungeon9', 'dungeon10', 'dungeon11', 'dungeon12',
    'dungeon13', 'dungeon14', 'dungeon15', 'dungeon16'
  ];
  const requiredFields = [
    'targetPct', 'hpMult', 'dmgMult', 'speedMult', 'atkSpeedMult',
    'spawnDensityMult', 'bossHpMult', 'bossDmgMult', 'bossAtkSpeedMult'
  ];

  let previousHp = 0;
  let previousDamage = 0;
  for (const dungeonId of dungeonOrder) {
    const profile = dungeonScaling[dungeonId];
    assert.ok(profile, `${dungeonId} has a scaling profile`);
    for (const field of requiredFields) {
      assert.ok(Number.isFinite(profile[field]) && profile[field] > 0, `${dungeonId}.${field} is finite and positive`);
    }
    assert.equal(profile.hpMult, profile.bossHpMult, `${dungeonId} keeps shared HP progression`);
    assert.equal(profile.dmgMult, profile.bossDmgMult, `${dungeonId} keeps shared damage progression`);
    assert.ok(profile.hpMult >= previousHp, `${dungeonId} HP does not regress`);
    assert.ok(profile.dmgMult >= previousDamage, `${dungeonId} damage does not regress`);
    previousHp = profile.hpMult;
    previousDamage = profile.dmgMult;
  }

  const difficulties = readDataRegistry('DIFFICULTY_DEFS');
  const difficultyOrder = ['normal', 'veteran', 'nightmare', 'infernal'];
  let previousDifficultyHp = 0;
  let previousDifficultyDamage = 0;
  for (const [expectedOrder, difficultyId] of difficultyOrder.entries()) {
    const profile = difficulties[difficultyId];
    assert.ok(profile, `${difficultyId} difficulty exists`);
    assert.equal(profile.order, expectedOrder);
    assert.ok(profile.enemyHpMult >= previousDifficultyHp, `${difficultyId} HP scaling does not regress`);
    assert.ok(profile.enemyDmgMult >= previousDifficultyDamage, `${difficultyId} damage scaling does not regress`);
    previousDifficultyHp = profile.enemyHpMult;
    previousDifficultyDamage = profile.enemyDmgMult;
  }
});
