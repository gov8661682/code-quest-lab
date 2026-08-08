import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

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
