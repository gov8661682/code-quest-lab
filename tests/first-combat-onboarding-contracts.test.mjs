import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

test('first combat keeps initial enemies inside a readable onboarding band', () => {
  assert.match(SOURCE, /var _firstRoomDef=ROOM_DEFS&&ROOM_DEFS\[currentRoomId\];/);
  assert.match(SOURCE, /var _isFirstCombatRoom=activeDungeonId==='dungeon1'&&MAIN_PATH\.length>1&&currentRoomId===MAIN_PATH\[1\]&&_firstRoomDef&&_firstRoomDef\.type===RT\.COMBAT;/);
  assert.match(SOURCE, /var _firstCombatSlot=enemies\.length\+cursedLibrarians\.length;/);
  assert.match(SOURCE, /ex=clamp\(player\.x\+_firstCombatSide\*\(90\+Math\.random\(\)\*70\),minX,maxX\);/);
  assert.match(SOURCE, /ey=clamp\(player\.y\+250\+_firstCombatSlot\*70,minY,maxY\);/);
  assert.match(SOURCE, /preserving the normal procedural placement everywhere else/);
});

test('larger combat rooms point toward a live enemy outside the viewport', () => {
  assert.match(SOURCE, /function drawOffscreenEnemyIndicators\(\)/);
  assert.match(SOURCE, /var cx=canvas\.width\/2,cy=canvas\.height\/2,pad=44,best=null,bestDist=Infinity,bestHidden=false;/);
  assert.match(SOURCE, /if\(!oe\|\|oe\.hp<=0\|\|oe\.destroyed\|\|oe\.bkaInvisible\|\|oe\.buried\)continue;/);
  assert.match(SOURCE, /var _isHiddenThreat=!!\(oe\.wraithing&&!oe\.wraith_visible\);/);
  assert.match(SOURCE, /var _indicatorLabel=bestHidden\?'THREAT':'TARGET';/);
  assert.match(SOURCE, /ctx\.restore\(\); \/\/ end camera transform\s+drawOffscreenEnemyIndicators\(\);/);
});

test('last enemy defeat refreshes progress before a level-up pause can leave a stale lock', () => {
  assert.match(SOURCE, /if\(enemies\.length===0\)\{\s*updateRoomProgress\(getRoomGeometry\(\)\);\s*updateHUD\(\);\s*\}/);
});
