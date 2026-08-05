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
