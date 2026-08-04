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
  let end = SOURCE.indexOf(endMarker, start + startMarker.length);
  if (end === -1 && endMarker.includes('\n')) {
    end = SOURCE.indexOf(endMarker.replace(/\n/g, '\r\n'), start + startMarker.length);
  }
  assert.notEqual(start, -1, `${label} start is present`);
  assert.notEqual(end, -1, `${label} end is present`);
  return SOURCE.slice(start, end);
}

function loadBaseSkillData() {
  const source = extractBetween('var baseSkillData={', 'var MAGE_SKILL_COOLDOWNS=', 'base skill data');
  const context = {};
  vm.runInNewContext(`${source}\nthis.__baseSkillData=baseSkillData;`, context, {
    filename: 'index.html#combat-contract'
  });
  return context.__baseSkillData;
}

test('production starter attack data remains usable for a new hero', () => {
  const skills = loadBaseSkillData();
  for (const name of ['Cleave', 'Frenzy', 'Crushing Blow', 'Throwing Axe']) {
    assert.ok(skills[name], `${name} is defined`);
    assert.ok(skills[name].damage > 0, `${name} has positive damage`);
    assert.ok(skills[name].cooldown > 0, `${name} has a positive cooldown`);
    assert.ok(skills[name].range > 0, `${name} has a positive range`);
  }
  assert.ok(skills.Cleave.arc > 0, 'Cleave has a melee arc');
  assert.equal(skills['Throwing Axe'].ranged, true, 'Throwing Axe remains ranged');
});

test('production attack update accepts touch, mouse, and attack-joystick input', () => {
  const source = extractBetween('function updatePlayerAttack(dt){', 'function updateRogueCooldowns', 'attack update');
  assert.match(source, /touchAttackState\.queued/, 'touch tap attack path is retained');
  assert.match(source, /desktopAttackTapState\.queued/, 'desktop click attack fallback is retained');
  assert.match(source, /desktopInput\.mouseDown/, 'desktop mouse attack path is retained');
  assert.match(source, /rightStick\.magnitude\(\)/, 'touch attack joystick path is retained');
  assert.match(source, /performAttack\(/, 'all input paths route to the shared attack function');
  assert.match(SOURCE, /canvas\.addEventListener\('click',function\(event\)\{[\s\S]*?desktopAttackTapState\.queued=true;/, 'managed-browser DOM clicks queue the shared attack path');
  assert.match(SOURCE, /typeof event\.button==='number'&&event\.button!==0/, 'non-left DOM clicks remain ignored while omitted button values are accepted');
  assert.match(SOURCE, /function nearestAttackAngle\(\)/, 'tap fallback can select the nearest live target');
  assert.match(source, /touchAngle===null\)touchAngle=nearestAttackAngle\(\)/, 'touch taps keep a usable target when coordinates are unavailable');
  assert.match(source, /desktopTapAngle===null\)desktopTapAngle=nearestAttackAngle\(\)/, 'desktop taps keep a usable target when coordinates are unavailable');
});

test('desktop click attack fallback queues a bounded first shot', () => {
  assert.match(SOURCE, /var desktopAttackTapState=\{pointerId:null,startX:0,startY:0,startTime:0,moved:false,queued:false\};/);
  assert.match(SOURCE, /desktopHeldMs<320/);
  assert.match(SOURCE, /desktopAttackTapState\.moved=true/);
  assert.match(SOURCE, /desktopAttackTapState\.queued=true/);
});

test('desktop play surface exposes a focusable keyboard target', () => {
  assert.match(SOURCE, /<canvas id="gameCanvas"[^>]*tabindex="0"[^>]*role="application"/, 'game canvas is keyboard-focusable');
  assert.match(SOURCE, /canvas\.addEventListener\('pointerdown',[\s\S]*?canvas\.focus\(\)/, 'pointer input focuses the play surface');
});

test('desktop movement preserves short key pulses in managed browser surfaces', () => {
  assert.match(SOURCE, /var desktopInput=\{keys:\{\},tapUntil:\{\}/, 'desktop input stores bounded tap state');
  assert.match(SOURCE, /var DESKTOP_TAP_NUDGE_MS=120;/, 'tap nudge duration is bounded');
  assert.match(SOURCE, /function desktopKeyActive\(key,now\)/, 'tap and held-key state share one active check');
  assert.match(SOURCE, /desktopInput\.tapUntil\[key\]=performance\.now\(\)\+DESKTOP_TAP_NUDGE_MS/, 'key release creates a short movement nudge');
  assert.match(SOURCE, /function desktopMoveVector\(\)[\s\S]*?desktopKeyActive\('arrowup',now\)/, 'movement vector consumes the shared key state');
});

test('new sessions clear cross-run movement and ending locks', () => {
  const resetStart = SOURCE.indexOf('totalKills=0;timeSurvived=0;lastFightTimer=0;gameRunning=false;gamePaused=false;');
  const resetEnd = SOURCE.indexOf('runSoulsEarned=0;runMasteryXpEarned=0;', resetStart);
  assert.notEqual(resetStart, -1, 'startGame transient reset anchor is present');
  assert.notEqual(resetEnd, -1, 'startGame reward reset follows transient reset');
  const block = SOURCE.slice(resetStart, resetEnd);
  for (const field of [
    'playerRootTimer=0',
    'playerKnockbackTime=0',
    'druidBurrowActive=false',
    'druidSpiritWalkActive=false',
    'rogueRollActive=false',
    'rogueUltActive=false',
    'pcChoiceLocked=false',
    'pcRematchBurstActive=false',
    'pcEndingLineTimeout=null'
  ]) {
    assert.match(block, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${field} is reset at session start`);
  }
});

test('production joystick release fallback neutralizes movement and attack input', () => {
  const source = extractBetween('function releaseJoysticksFromGlobal(event){', '// ============================================================\n// BASE SKILL DATA', 'joystick release fallback');
  assert.match(source, /leftStick\.onEnd/, 'movement joystick is released');
  assert.match(source, /rightStick\.onEnd/, 'attack joystick is released');
  assert.match(SOURCE, /window\.addEventListener\('pointerup',releaseJoysticksFromGlobal\)/, 'global pointer-up fallback is wired');
  assert.match(SOURCE, /document\.addEventListener\('touchend',function\(event\)\{releaseJoysticksFromGlobal\(event\);\},true\)/, 'touch-end fallback is wired');
});

test('touch attack joystick supports a bounded nearest-target tap', () => {
  assert.match(SOURCE, /function Joystick\(baseEl,knobEl,onTap\)/, 'joystick accepts an optional tap action');
  assert.match(SOURCE, /e\.pointerId!=null&&e\.pointerId!==this\.pointerId/, 'global releases can neutralize a captured joystick');
  assert.match(SOURCE, /e\.type==='pointerup'\|\|e\.type==='touchend'/, 'tap action only fires on a release event');
  assert.match(SOURCE, /function queueNearestAttack\(\)/, 'nearest-target attack queue helper is present');
  assert.match(SOURCE, /function queueNearestAttack\(\)[\s\S]*desktopInput\.mouseSeen=false[\s\S]*desktopAttackTapState\.queued=true/, 'tap action clears stale aim and queues one shared attack');
  assert.match(SOURCE, /rightStick=new Joystick\(document\.getElementById\('joyRight'\),document\.getElementById\('knobRight'\),queueNearestAttack\)/, 'the production Attack joystick uses the tap action');
});

test('first combat room gives a bounded read-and-respond window', () => {
  assert.match(SOURCE, /var combatIntroTimer=0;/, 'combat introduction timer is declared');
  assert.match(SOURCE, /var COMBAT_INTRO_DURATION=10\.0;/, 'combat introduction duration is bounded');
  assert.match(SOURCE, /function updateCombatIntro\(dt\)/, 'combat introduction timer updates');
  assert.match(SOURCE, /activeDungeonId==='dungeon1'&&def\.type===RT\.COMBAT&&roomId===MAIN_PATH\[1\]/, 'only the first Dungeon 1 combat room receives onboarding');
  assert.match(SOURCE, /Read the room .* move or attack/, 'the onboarding prompt explains the available response');
  assert.match(SOURCE, /if\(_combatIntroActive\)\{[\s\S]*enemyProjectiles=\[\];[\s\S]*\}else\{[\s\S]*updateEnemies\(dt,geo\);/, 'hostile simulation is paused while player input remains active');
});
