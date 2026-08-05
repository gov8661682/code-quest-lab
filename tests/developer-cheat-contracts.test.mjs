import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

test('developer invincibility is local-only and session-scoped', async () => {
  assert.match(SOURCE, /var developerInvincibilityEnabled=false;/);
  assert.match(SOURCE, /var developerCheatSequence=\['F8','F7','F6','F3'\];/);
  assert.match(SOURCE, /var developerClearSummonsSequence=\['F8','F7','F6','F4'\];/);
  assert.match(SOURCE, /host==='localhost'\|\|host==='127\.0\.0\.1'\|\|host==='\[::1\]'/);
  assert.match(SOURCE, /location\.protocol==='http:'\|\|location\.protocol==='https:'/);
  assert.match(SOURCE, /new URLSearchParams\(location\.search\)\.get\('cql-dev'\)==='1'/);
  assert.match(SOURCE, /developerInvincibilityEnabled=!developerInvincibilityEnabled;/);
  assert.match(SOURCE, /developerInvincibilityEnabled=false/);
  assert.doesNotMatch(SOURCE, /permanentData\.[^;\n]*developerInvincibilityEnabled/);
});

test('developer invincibility is wired before normal keyboard actions and blocks death', () => {
  assert.match(SOURCE, /if\(handleDeveloperCheatKey\(event\)\)\{event\.preventDefault\(\);return;\}/);
  assert.match(SOURCE, /function playerDied\(\)\{\s*if\(developerInvincibilityEnabled\)\{[\s\S]*?return;\s*\}/);
  assert.match(SOURCE, /if\(developerInvincibilityEnabled\)\{player\.dead=false;player\.hp=player\.hpMax;\}/);
});

test('developer summon clearing stays gated and opens the boss exit only for local QA', () => {
  assert.match(SOURCE, /function clearDeveloperBossSummons\(\)\{\s*if\(!developerInvincibilityEnabled\)return false;/);
  assert.match(SOURCE, /clearDeveloperBossSummons\(\)[\s\S]*?enemies=\[\];[\s\S]*?openForwardDoor\(geo\);/);
  assert.match(SOURCE, /if\(developerClearSummonsProgress===developerClearSummonsSequence\.length\)\{[\s\S]*?return clearDeveloperBossSummons\(\);/);
});
