import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const MIRROR = fs.readFileSync(path.join(ROOT, 'code-quest-lab-source.txt'), 'utf8');

test('gameplay audio is present as an optional, procedural feedback layer', () => {
  assert.match(SOURCE, /var GAME_AUDIO_SETTING_KEY='cql_audio_enabled';/);
  assert.match(SOURCE, /var GAME_AUDIO_PATTERNS=\{/);
  assert.match(SOURCE, /function getGameAudioContext\(\)/);
  assert.match(SOURCE, /function primeGameAudio\(\)/);
  assert.match(SOURCE, /function playGameSound\(kind\)/);
  assert.match(SOURCE, /window\.AudioContext\|\|window\.webkitAudioContext/);
  assert.match(SOURCE, /if\(!gameAudioIsEnabled\(\)\|\|!gameAudio\.unlocked\)return;/);
  assert.match(SOURCE, /window\.addEventListener\('pointerdown',primeGameAudio/);
  assert.match(SOURCE, /window\.addEventListener\('keydown',primeGameAudio/);
  assert.match(SOURCE, /settingsAudioToggle/);
  assert.match(SOURCE, /setGameAudioEnabled\(!gameAudioIsEnabled\(\)\)/);
});

test('feedback cues cover the core player-visible progression moments', () => {
  for (const cue of ['attack', 'hit', 'critical', 'enemyDefeat', 'playerHurt', 'door', 'roomClear', 'bossHit', 'bossDefeat', 'levelUp']) {
    assert.match(SOURCE, new RegExp(`${cue}:\\{`), `audio cue ${cue} is defined`);
  }
  for (const hook of [
    "playGameSound('attack')",
    "playGameSound(isCrit?'critical':'hit')",
    "playGameSound('enemyDefeat')",
    "playGameSound(isCrit?'critical':'bossHit')",
    "playGameSound('bossDefeat')",
    "playGameSound('playerHurt')",
    "playGameSound('roomClear')",
    "playGameSound('levelUp')"
  ]) {
    assert.ok(SOURCE.includes(hook), `gameplay hook ${hook} is wired`);
  }
});

test('audio remains local and does not add a remote media dependency', () => {
  const start = SOURCE.indexOf('// GAMEPLAY AUDIO FEEDBACK');
  const end = SOURCE.indexOf('// SAVE / LOAD', start);
  assert.notEqual(start, -1);
  assert.notEqual(end, -1);
  const audioLayer = SOURCE.slice(start, end);
  assert.doesNotMatch(audioLayer, /fetch\(|new Audio\(|\.mp3|\.wav|\.ogg|https?:\/\//i);
  assert.ok(SOURCE.includes("localStorage.setItem(GAME_AUDIO_SETTING_KEY"), 'preference is stored locally');
});

test('runtime source mirror stays exact after the audio change', () => {
  assert.equal(MIRROR, SOURCE, 'code-quest-lab-source.txt mirrors index.html exactly');
});
