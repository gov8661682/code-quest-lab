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

test('a fresh Barbarian and the first Normal room stay inside the opening damage budget', () => {
  assert.match(
    SOURCE,
    /upgrades=\{damageMult:_isMageDmg\?2\.0:\(_isRogueDmg\?0\.80:\(_isDruidDmg\?1\.5:0\.75\)\)/,
    'fresh Barbarian damage is not left at the old damage-sponge value'
  );
  assert.match(
    SOURCE,
    /var LEVEL1_OPENING_TUNING=Object\.freeze\(\{[\s\S]{0,260}attackCooldownMult:1\.80,[\s\S]{0,520}graceSeconds:COMBAT_INTRO_DURATION[\s\S]{0,520}\}\);/,
    'the Normal Dungeon 1 opening room has one bounded onboarding tuning table'
  );
  assert.match(
    SOURCE,
    /var _isOpeningCombatRoom=_isFirstCombatRoom&&getActiveDifficulty\(\)\.id==='normal';[\s\S]{0,300}if\(_isOpeningCombatRoom\)\{_hpScale\*=LEVEL1_OPENING_TUNING\.hpMult;_eDmgMult\*=LEVEL1_OPENING_TUNING\.damageMult;\}/,
    'only the Normal Dungeon 1 opening room receives the onboarding budget'
  );
  assert.match(
    SOURCE,
    /var _openingEnemySpeedMult=_isOpeningCombatRoom\?LEVEL1_OPENING_TUNING\.speedMult:\(_isEarlyNormalCombatRoom\?LEVEL1_EARLY_ROUTE_TUNING\.speedMult:1\.0\);[\s\S]{0,1800}speed:def\.speed\*scale\*_dgSpeedMult\*_openingEnemySpeedMult[\s\S]{0,320}attackCooldown:\(\(def\.attackCooldown\/_d2Atk\)\/_dgAtkSpeedMult\)\*_openingEnemyAttackCooldownMult/,
    'the opening and early rooms use a slower read-and-respond pace'
  );
  assert.match(
    SOURCE,
    /var _isNormalOpeningIntro=_isFirstCombatIntro&&getActiveDifficulty\(\)\.id==='normal';[\s\S]{0,180}playerInvulnTimer=Math\.max\(playerInvulnTimer,LEVEL1_OPENING_TUNING\.graceSeconds\)/,
    'the opening room protects the read-and-respond window without changing later rooms'
  );
  assert.match(
    SOURCE,
    /function isPlayerDamageSuppressed\(\)\{return isDeveloperInvincibilityActive\(\)\|\|isPlayerInvulnerable\(\)\|\|combatIntroTimer>0;\}/,
    'the bounded intro state and local QA aid directly suppress player damage'
  );
  assert.match(
    SOURCE,
    /if\(!_aggro\.isCompanion&&isPlayerDamageSuppressed\(\)\)\{[\s\S]{0,220}e\.attackTimer=e\.attackCooldown\*0\.55\*getEnemyAtkSpeedMult\(e\);[\s\S]{0,120}\}else if\(!_aggro\.isCompanion&&rollRogueSmokeDodge\(\)\)/,
    'the opening grace also covers the shared melee damage branch'
  );
  assert.doesNotMatch(
    SOURCE,
    /if\(_isOpeningCombatRoom\)[\s\S]{0,180}DUNGEON_SCALING/,
    'opening-room softening does not replace the shared dungeon scaling table'
  );
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

test('skill action buttons recover a managed click without double activation', () => {
  assert.match(SOURCE, /var ACTION_BUTTON_CLICK_FALLBACK_WINDOW=450;/, 'the fallback window is bounded');
  assert.match(SOURCE, /function wireActionButtonPress\(el,onRelease,onDown,onCancel\)/, 'skill actions share one guarded press helper');
  assert.match(SOURCE, /wireActionButtonPress\(el,function\(e\)\{[\s\S]*?activateSkill\(tier\);[\s\S]*?\},function\(e\)\{/, 'core, movement, and ultimate skills use the helper');
  assert.match(SOURCE, /el\.addEventListener\('pointerup',[\s\S]*?lastPointerReleaseAt=now;[\s\S]*?onRelease\(e\);/, 'normal pointer-up activation remains available');
  assert.match(SOURCE, /el\.addEventListener\('click',[\s\S]*?now-lastPointerReleaseAt<ACTION_BUTTON_CLICK_FALLBACK_WINDOW[\s\S]*?fallbackClickAt=now[\s\S]*?onRelease\(e\);/, 'a lost pointer-up can recover through one DOM click');
  assert.match(SOURCE, /potEl\)[\s\S]*?wireActionButtonPress\(potEl/, 'potion activation receives the same fallback');
  assert.match(SOURCE, /bobBeamEl\)[\s\S]*?wireActionButtonPress\(bobBeamEl/, 'the optional Bob beam action receives the same fallback');
});

test('skill action click fallback activates once per physical press', () => {
  const helper = extractBetween('function wireActionButtonPress(el,onRelease,onDown,onCancel){', 'function wireSkillButtons(){', 'action button helper');
  const clock = { now: 0 };
  const context = {
    performance: { now: () => clock.now }
  };
  vm.runInNewContext(`var ACTION_BUTTON_CLICK_FALLBACK_WINDOW=450;\n${helper}\nthis.__wireActionButtonPress=wireActionButtonPress;`, context, {
    filename: 'index.html#action-button-contract'
  });
  const handlers = {};
  const element = { addEventListener(type, handler) { handlers[type] = handler; } };
  let activations = 0;
  context.__wireActionButtonPress(element, () => { activations += 1; });
  const event = (pointerId) => ({ pointerId, preventDefault() {}, stopPropagation() {} });

  handlers.pointerdown(event(1));
  clock.now = 50;
  handlers.pointerup(event(1));
  clock.now = 60;
  handlers.click(event(1));
  assert.equal(activations, 1, 'normal pointer-up plus its click activates once');

  clock.now = 1001;
  handlers.pointerdown(event(2));
  handlers.click(event(2));
  clock.now = 1050;
  handlers.pointerup(event(2));
  assert.equal(activations, 2, 'lost pointer-up recovers through one click');

  clock.now = 1600;
  handlers.pointerdown(event(3));
  handlers.pointerup(event(3));
  assert.equal(activations, 3, 'a later physical press remains available');

  clock.now = 2000;
  handlers.pointerdown(event(4));
  handlers.pointercancel(event(4));
  handlers.click(event(4));
  assert.equal(activations, 3, 'a cancelled gesture cannot become a click activation');
});

test('regenerating elites reset their recovery timer when hit', () => {
  assert.match(
    SOURCE,
    /e\.hp-=amount;e\.hitFlash=e\.isElite\?0\.28:0\.18;[\s\S]*?if\(e\.isElite&&e\.eliteRegenerating\)e\.eliteRegenTimer=0;/,
    'successful enemy damage interrupts regenerating-elite recovery'
  );
  assert.match(SOURCE, /var _regenAmount=Math\.min\(e\.eliteRegenRemaining\|\|0,e\.hpMax\*0\.015\*dt\*3,e\.hpMax-e\.hp\);/, 'regeneration remains a recoverable pressure mechanic');
  assert.match(SOURCE, /if\(_regenAmount>0\)\{e\.hp\+=_regenAmount;e\.eliteRegenRemaining-=_regenAmount;\}/, 'regeneration consumes its finite recovery budget');
  assert.match(SOURCE, /spawned\.eliteRegenRemaining=Math\.round\(spawned\.hpMax\*0\.25\);/, 'new regenerating elites receive a bounded recovery budget');
  assert.doesNotMatch(SOURCE, /e\.hp=Math\.min\(e\.hpMax,e\.hp\+e\.hpMax\*0\.015\*dt\*10\);/, 'regeneration cannot erase normal sustained damage');
});

test('corrupted elites have a finite summon budget', () => {
  assert.match(SOURCE, /spawned\.eliteCorruptedSummonCount=0;/, 'new elites start with a summon budget counter');
  assert.match(SOURCE, /spawned\.eliteCorruptedSummonMax=2;/, 'the summon budget is bounded per elite');
  assert.match(
    SOURCE,
    /var _ecUsed=e\.eliteCorruptedSummonCount\|\|0;[\s\S]*?if\(e\.eliteCorruptedTimer<=0&&_ecUsed<_ecMax&&enemies\.length<12\)[\s\S]*?e\.eliteCorruptedSummonCount=_ecUsed\+_ecCount;/,
    'corrupted summons stop after the finite budget and room safety cap'
  );
  assert.match(SOURCE, /eliteCorruptedSummonCount:e\.eliteCorruptedSummonCount\|\|0/, 'the budget survives room save and restore');
});

test('Dungeon 4 corruption surges are bounded per room', () => {
  assert.match(SOURCE, /var d4CorruptionRoomId=null;/, 'the corruption meter tracks its current room');
  assert.match(SOURCE, /var d4CorruptionWraithRooms=\{\};/, 'spent-room surge state is retained for the run');
  assert.match(SOURCE, /var _d4RoomWraithSpent=!!d4CorruptionWraithRooms\[_d4RoomKey\];/, 'the current room checks whether its surge was spent');
  assert.match(SOURCE, /if\(d4Corruption>=d4CorruptionMax&&!d4CorruptionWraithSpawned&&!_d4RoomWraithSpent\)/, 'a room can trigger at most one corruption wraith surge');
  assert.match(SOURCE, /d4CorruptionWraithRooms\[_d4RoomKey\]=true;/, 'the surge is marked spent before the wraith is spawned');
  assert.match(SOURCE, /else if\(_d4RoomWraithSpent\)\{\s*d4Corruption=0;\s*\}/, 'spent rooms do not keep refilling their corruption meter');
});

test('Dungeon 4 ambush preserves its three-wave identity inside a Normal touch budget', () => {
  assert.match(
    SOURCE,
    /var D4_AMBUSH_TUNING=Object\.freeze\(\{[\s\S]*normal:Object\.freeze\(\{waveCountDelta:-1,hpMult:0\.78,damageMult:0\.85,finalEliteHpMult:0\.82,waveDelay:1\.0\}/,
    'Normal ambush relief is explicit and finite'
  );
  assert.match(SOURCE, /function getD4AmbushTuning\(\)\{[\s\S]*getEncounterTuning\('dungeon4'\)/, 'the event consumes the shared encounter difficulty contract');
  const ambush = extractBetween('function d4AmbushSpawnWave(geo){', 'function d4AmbushComplete', 'D4 ambush wave spawning');
  assert.match(ambush, /if\(ev\.wave<ev\.maxWaves\)/, 'the first two waves remain distinct from the finale');
  assert.match(ambush, /var count=Math\.max\(2,2\+ev\.wave\+\(tuning\.waveCountDelta\|\|0\)\);/, 'Normal waves use a bounded target count');
  assert.match(ambush, /tuneD4AmbushEnemy\(waveEnemy,tuning,false\);/, 'regular ambush enemies use the event budget');
  assert.match(ambush, /tuneD4AmbushEnemy\(finalKnight,tuning,true\);[\s\S]*tuneD4AmbushEnemy\(finalBeast,tuning,true\);[\s\S]*tuneD4AmbushEnemy\(finalMage,tuning,false\);/, 'the authored final elite wave remains intact and bounded');
  assert.match(SOURCE, /amb\.waveDelay=getD4AmbushTuning\(\)\.waveDelay;/, 'the event handoff delay is bounded by the same tuning');
});

test('developer invincibility suppresses D4 hazard damage instead of falsifying QA state', () => {
  assert.match(SOURCE, /function isDeveloperInvincibilityActive\(\)\{[\s\S]*developerInvincibilityEnabled&&developerCheatAllowed\(\)/, 'the aid is still loopback-gated');
  assert.match(SOURCE, /function isPlayerDamageSuppressed\(\)\{return isDeveloperInvincibilityActive\(\)\|\|isPlayerInvulnerable\(\)\|\|combatIntroTimer>0;\}/, 'shared damage suppression includes the developer aid');
  const circles = extractBetween('function d4UpdateCursedCircles(dt){', 'function d4DrawCursedCircles', 'D4 cursed circle damage');
  assert.match(circles, /if\(ccd>0&&!isPlayerDamageSuppressed\(\)\)/, 'cursed circles respect the invincibility aid before changing HP');
  assert.match(SOURCE, /if\(isDeveloperInvincibilityActive\(\)\)\{player\.dead=false;player\.hp=player\.hpMax;\}/, 'the frame-end safety restore remains active');
});

test('Void Monarch summon pressure is finite and phase-aware', () => {
  assert.match(SOURCE, /vmBeastSummonsRemaining:4/);
  assert.match(SOURCE, /vmCrystalSummonsRemaining:4/);
  assert.match(SOURCE, /vm\.vmBeastSummonTimer<=0&&vm\.vmPhase<3&&vm\.vmBeastSummonsRemaining>0/);
  assert.match(SOURCE, /vm\.vmBeastSummonsRemaining--/);
  assert.match(SOURCE, /vm\.vmPhase>=2&&vm\.vmCrystalSummonsRemaining>0/);
  assert.match(SOURCE, /vm\.vmCrystalSummonsRemaining--/);
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

test('joystick-owned touch releases cannot trigger overlapping skill buttons', () => {
  assert.match(SOURCE, /function releaseJoystickBeforeSkillAction\(event\)\{[\s\S]*?stick\.active&&stick\.pointerId===event\.pointerId[\s\S]*?stick\.onEnd\(event\);/);
  assert.match(SOURCE, /wireActionButtonPress\(el,function\(e\)\{\s*if\(releaseJoystickBeforeSkillAction\(e\)\)\{e\.preventDefault\(\);e\.stopPropagation\(\);return;\}/, 'skill actions release a joystick-owned pointer before activation');
  assert.match(SOURCE, /wireActionButtonPress\(potEl,function\(e\)\{if\(releaseJoystickBeforeSkillAction\(e\)\)/, 'potion activation uses the same joystick handoff guard');
});

test('touch attack joystick supports a bounded nearest-target tap', () => {
  assert.match(SOURCE, /function Joystick\(baseEl,knobEl,onTap\)/, 'joystick accepts an optional tap action');
  assert.match(SOURCE, /e\.pointerId!=null&&e\.pointerId!==this\.pointerId/, 'global releases can neutralize a captured joystick');
  assert.match(SOURCE, /e\.type==='pointerup'\|\|e\.type==='touchend'/, 'tap action only fires on a release event');
  assert.match(SOURCE, /this\.base\.addEventListener\('click',\s+function\(e\)\{self\.onClick\(e\);\}\)/, 'managed-browser click fallback is wired');
  assert.match(SOURCE, /Joystick\.prototype\.onClick=function\(e\)\{[\s\S]*var activeTap=this\.active&&!this\.moved&&now-this\.startTime<320/, 'active managed clicks can recover a lost pointer-up tap');
  assert.match(SOURCE, /Joystick\.prototype\.onClick=function\(e\)\{[\s\S]*this\.clickFallbackEligible[\s\S]*this\.lastTapAt[\s\S]*this\.reset\(\)/, 'click fallback is guarded against duplicate taps and drags');
  assert.match(SOURCE, /Joystick\.prototype\.onStart=function\(e\)\{this\.active=true/, 'joystick pointerdown preserves the browser click fallback');
  assert.match(SOURCE, /function queueNearestAttack\(\)/, 'nearest-target attack queue helper is present');
  assert.match(SOURCE, /function queueNearestAttack\(\)[\s\S]*desktopInput\.mouseSeen=false[\s\S]*desktopAttackTapState\.queued=true/, 'tap action clears stale aim and queues one shared attack');
  assert.match(SOURCE, /rightStick=new Joystick\(document\.getElementById\('joyRight'\),document\.getElementById\('knobRight'\),queueNearestAttack\)/, 'the production Attack joystick uses the tap action');
});

test('cleared rooms expose a contextual touch exit fallback', () => {
  assert.match(SOURCE, /<button id="roomExitBtn"[^>]*aria-label="Proceed through exit"/, 'the exit fallback is an accessible button');
  assert.match(SOURCE, /function roomExitPromptAvailable\(def\)\{[\s\S]*def\.forward[\s\S]*roomCleared[\s\S]*!roomTransitioning/, 'the prompt requires a real cleared forward route');
  assert.match(SOURCE, /var roomType=def&&\(def\._sideRoomType\|\|def\.type\);[\s\S]*var combatLike=roomType===RT\.COMBAT[\s\S]*roomType===RT\.MINIBOSS[\s\S]*var dungeonStart=roomType===RT\.START/, 'static shrine and treasure rooms stay hidden while dungeon starts get a clear forward action');
  assert.match(SOURCE, /function handleRoomExitPrompt\(\)\{[\s\S]*saveRoomState\(currentRoomId\);[\s\S]*window\._lastRoomTransitDir='forward';[\s\S]*fadeToRoom\(def\.forward\)/, 'the fallback preserves the normal save and room-transition handoff');
  assert.match(SOURCE, /safeClick\('roomExitBtn','Room Exit',function\(\)\{handleRoomExitPrompt\(\);\}\)/, 'the fallback is wired through the guarded click layer');
  const roomProgress = extractBetween('function updateRoomProgress(geo){', 'function playerDied(){', 'room progress');
  assert.match(roomProgress, /updateRoomExitPrompt\(def\);/, 'room progress refreshes the contextual exit state');
});

test('cleared rooms show a floating guide toward the next room', () => {
  assert.match(SOURCE, /function forwardExitGuideAvailable\(def\)\{[\s\S]*def\.forward[\s\S]*exitDoor[\s\S]*roomCleared[\s\S]*!roomTransitioning[\s\S]*def\.type!==RT\.SIDE[\s\S]*def\.type!==RT\.BOSS/, 'the guide is limited to a cleared forward route');
  assert.match(SOURCE, /function drawForwardExitGuide\(geo,def\)\{[\s\S]*var dx=fd\.cx-player\.x,dy=fd\.cy-player\.y;[\s\S]*var angle=Math\.atan2\(dy,dx\)[\s\S]*ctx\.translate\(ax,ay\);ctx\.rotate\(angle\)/, 'the guide follows the player and points toward the forward door');
  assert.match(SOURCE, /drawPlayer\(\);drawForwardExitGuide\(geo,ROOM_DEFS\[currentRoomId\]\);/, 'the guide is rendered with the player so it follows each frame');
  assert.doesNotMatch(SOURCE, /function drawOffscreenForwardExitIndicator\(/, 'the gate does not receive a separate pulsing edge arrow');
});

test('static world hubs expose an optional touch travel fallback', () => {
  assert.match(SOURCE, /<button id="worldRouteBtn"[^>]*aria-label="Use world route"/, 'the hub travel fallback is an accessible button');
  assert.match(SOURCE, /function updateWorldRoutePrompt\(\)\{[\s\S]*activeDungeonId==='town'[\s\S]*isEntranceZone\(activeDungeonId\)[\s\S]*el\.style\.display='block'/, 'Town and dungeon entrances expose the fallback without changing normal movement');
  assert.match(SOURCE, /function handleWorldRoutePrompt\(\)\{[\s\S]*enterEntrance\('dungeon1'\)[\s\S]*openDungeonGate\(dungeonId\)/, 'the fallback follows the existing Town portal and dungeon gate flow');
  assert.match(SOURCE, /safeClick\('worldRouteBtn','World Route',function\(\)\{handleWorldRoutePrompt\(\);\}\)/, 'hub travel uses the guarded click layer');
  const roomProgress = extractBetween('function updateRoomProgress(geo){', 'function playerDied(){', 'room progress');
  assert.match(roomProgress, /updateWorldRoutePrompt\(\);/, 'hub travel state refreshes with the shared room progress update');
});

test('unclaimed treasure rooms expose an optional touch reward action', () => {
  assert.match(SOURCE, /<button id="roomRewardBtn"[^>]*aria-label="Open treasure"/, 'the treasure fallback is an accessible button');
  assert.match(SOURCE, /function roomRewardPromptAvailable\(def\)\{[\s\S]*roomType===RT\.TREASURE[\s\S]*treasureChest&&!treasureChest\.opened[\s\S]*roomCleared/, 'the reward action requires an unclaimed cleared treasure room');
  assert.match(SOURCE, /function handleRoomRewardPrompt\(\)\{[\s\S]*hideRoomRewardPrompt\(\);[\s\S]*openTreasure\(\);/, 'the fallback reuses the existing reward overlay and loot flow');
  assert.match(SOURCE, /safeClick\('roomRewardBtn','Room Reward',function\(\)\{handleRoomRewardPrompt\(\);\}\)/, 'treasure interaction uses the guarded click layer');
  const roomProgress = extractBetween('function updateRoomProgress(geo){', 'function playerDied(){', 'room progress');
  assert.match(roomProgress, /updateRoomRewardPrompt\(def\);/, 'treasure reward state refreshes with room progress');
});

test('managed touch surfaces expose step movement without bypassing the movement loop', () => {
  assert.match(SOURCE, /<div id="moveNudgePad"[^>]*aria-label="Step movement controls"/, 'the fallback movement pad is grouped and labelled');
  assert.match(SOURCE, /function queueTouchMoveStep\(dx,dy\)\{[\s\S]*desktopGameIsActive\(\)[\s\S]*gameRunning[\s\S]*TOUCH_NUDGE_DURATION/, 'step input is session gameplay input with a bounded duration');
  assert.match(SOURCE, /var joystickMove=leftStick&&leftStick\.magnitude\(\)>0\.1[\s\S]*var mx=desktopMove\.mag\?desktopMove\.x:\(joystickMove\.mag\?joystickMove\.x:touchNudge\.x\)/, 'step input is a fallback behind keyboard and joystick input');
  assert.match(SOURCE, /player\.x\+=_d16mvx;player\.y\+=_d16mvy;[\s\S]*clampPlayerToRoom\(geo\)/, 'step input reaches the shared movement and room-clamp path');
  assert.match(SOURCE, /safeClick\('moveNudgeUp','Move North',function\(\)\{queueTouchMoveStep\(0,-1\);\}\)/, 'direction buttons use the guarded click layer');
  assert.match(SOURCE, /safeClick\('moveNudgeDown','Move South',function\(\)\{queueTouchMoveStep\(0,1\);\}\)/, 'all step actions remain ordinary player controls');
});

test('touch-first combat offers a visible, session-only target lock', () => {
  assert.match(SOURCE, /var touchAimAssistEnabled=true;/, 'touch aim assist starts enabled for a fresh session');
  assert.match(SOURCE, /function findNearestCombatTarget\(aimAngle\)/, 'combat target selection covers live room targets');
  assert.match(SOURCE, /function selectTouchCombatTarget\(aimAngle,forceNew\)/, 'target selection supports a short lock window');
  assert.match(SOURCE, /rightStick\.active\)\{[\s\S]*Center-hold is the tablet-friendly lock-and-fire gesture/, 'center-hold attack input is supported');
  assert.match(SOURCE, /<button id="touchAimAssistBadge"[^>]*aria-pressed="true"/, 'the assist state is visible and accessible');
  assert.match(SOURCE, /function drawTouchCombatTarget\(\)/, 'the locked target receives a world-space reticle');
  assert.match(SOURCE, /touchAimAssistEnabled=true;touchCombatTarget=null;touchCombatTargetTimer=0;/, 'the assist resets per session instead of entering profile data');
});

test('elite modifier stacks stay within a playable health budget', () => {
  assert.match(SOURCE, /var ELITE_HEALTH_BUDGET_MULTIPLIER = 2\.5;/, 'elite pacing budget is explicit');
  assert.match(
    SOURCE,
    /var _eliteHealthBudget=Math\.max\(1,Math\.round\(def\.hp\*ELITE_HEALTH_BUDGET_MULTIPLIER\)\);[\s\S]*?if\(spawned\.hpMax>_eliteHealthBudget\)\{[\s\S]*?spawned\.hpMax=_eliteHealthBudget;/,
    'combined depth, dungeon, and modifier scaling is capped after modifiers apply'
  );
  assert.match(SOURCE, /desc:'Larger size, up to \+100% HP, \+20% Damage'/, 'Giant remains readable when the shared budget applies');
});

test('queued attack taps survive an active cooldown', () => {
  const source = extractBetween('function updatePlayerAttack(dt){', 'function updateRogueCooldowns', 'attack update');
  assert.match(source, /if\(touchAttackState\.queued\)\{[\s\S]*?if\(player\.attackTimer>0\)return;[\s\S]*?touchAttackState\.queued=false;/, 'touch taps wait for readiness');
  assert.match(source, /if\(desktopAttackTapState\.queued\)\{[\s\S]*?if\(player\.attackTimer>0\)return;[\s\S]*?desktopAttackTapState\.queued=false;/, 'desktop taps wait for readiness');
});

test('boss rooms clear dead summon state before the exit handoff', () => {
  const source = extractBetween('function updateRoomProgress(geo){', 'function playerDied(){', 'boss room progress');
  assert.match(source, /var liveBossSummons=enemies\.filter\(function\(e\)\{return !!\(e&&e\.hp>0&&!e\.dead\);\}\)\.length;/, 'boss lock counts only live summons');
  assert.match(source, /if\(enemies\.length\)enemies=\[\];/, 'dead summon objects are discarded after the boss is defeated');
  assert.match(source, /if\(!roomCleared\)\{[\s\S]*?openForwardDoor\(geo\);/, 'a summon-free boss room reopens its forward exit');
  assert.match(source, /document\.getElementById\('doorStatus'\)\.textContent='';[\s\S]*?classList\.remove\('visible'\)/, 'stale summon text is cleared');
});

test('first combat room keeps moving enemies inside a bounded read-and-respond window', () => {
  assert.match(SOURCE, /var combatIntroTimer=0;/, 'combat introduction timer is declared');
  assert.match(SOURCE, /var COMBAT_INTRO_DURATION=10\.0;/, 'combat introduction duration is bounded');
  assert.match(SOURCE, /function updateCombatIntro\(dt\)/, 'combat introduction timer updates');
  assert.match(SOURCE, /activeDungeonId==='dungeon1'&&def\.type===RT\.COMBAT&&roomId===MAIN_PATH\[1\]/, 'only the first Dungeon 1 combat room receives onboarding');
  assert.match(SOURCE, /Read the room .* move or attack/, 'the onboarding prompt explains the available response');
  assert.match(SOURCE, /if\(_combatIntroActive\)\{[\s\S]*updateEnemies\(dt,geo\);updateCursedLibrarians\(dt,geo\);[\s\S]*enemyProjectiles=\[\];[\s\S]*\}else\{[\s\S]*updateEnemyProjectiles\(dt,geo\);[\s\S]*updateEnemies\(dt,geo\);/, 'enemies reposition during the prompt while hostile projectiles remain suppressed');
});

test('new mobile enemies get a bounded arrival step instead of appearing frozen at melee range', () => {
  assert.match(SOURCE, /entryMotionTimer:def\.speed>0\?1\.35:0,entryMotionSign:/,
    'spawned mobile enemies receive a brief arrival-motion budget');
  assert.match(SOURCE, /var _entryMotionActive=e\.speed>0&&!e\.ranged&&!_druidRooted&&dist>0&&[\s\S]{0,120}e\.entryMotionTimer>0;/,
    'arrival motion ends promptly instead of being held by the opening prompt');
  assert.match(SOURCE, /var _entryDrift=clamp\(Math\.max\(42,e\.speed\*0\.70\),42,105\)\*_entrySign;/,
    'arrival motion has a bounded, visible tangential speed');
});

test('the first combat room gives melee enemies a readable approach lane', () => {
  assert.match(SOURCE, /spawnSideOffset:132,[\s\S]*spawnSideStep:28,[\s\S]*spawnJitter:18,[\s\S]*spawnForwardOffset:84,[\s\S]*spawnForwardStep:36/,
    'opening placement is explicit and data-driven');
  assert.match(SOURCE, /var _firstCombatOffset=LEVEL1_OPENING_TUNING\.spawnSideOffset\+[\s\S]*_firstCombatSlot\*LEVEL1_OPENING_TUNING\.spawnSideStep;/,
    'each opening enemy receives a separate readable side offset');
  assert.match(SOURCE, /player\.x\+_firstCombatSide\*\(_firstCombatOffset\+[\s\S]*Math\.random\(\)\*LEVEL1_OPENING_TUNING\.spawnJitter\)/,
    'opening enemies do not spawn directly in melee range');
  assert.match(SOURCE, /player\.y\+LEVEL1_OPENING_TUNING\.spawnForwardOffset\+[\s\S]*_firstCombatSlot\*LEVEL1_OPENING_TUNING\.spawnForwardStep/,
    'opening enemies approach from a visible forward lane');
});

test('the first real D1 rooms use a bounded onboarding combat budget', () => {
  assert.match(SOURCE, /var LEVEL1_EARLY_ROUTE_TUNING=Object\.freeze\(\{[\s\S]*maxDepth:5,[\s\S]*hpMult:0\.75,[\s\S]*damageMult:0\.35,[\s\S]*speedMult:0\.85,[\s\S]*attackCooldownMult:1\.60,[\s\S]*graceSeconds:3\.5/,
    'the early route tuning is explicit and finite');
  assert.match(SOURCE, /_isEarlyNormalCombatRoom=activeDungeonId==='dungeon1'&&[\s\S]*depth>=2&&depth<=LEVEL1_EARLY_ROUTE_TUNING\.maxDepth[\s\S]*_entryRoomDef\.type===RT\.COMBAT&&!isElite;/,
    'the relief is limited to ordinary early D1 combat rooms');
  assert.match(SOURCE, /if\(_isEarlyNormalCombatRoom\)\{_hpScale\*=LEVEL1_EARLY_ROUTE_TUNING\.hpMult;_eDmgMult\*=LEVEL1_EARLY_ROUTE_TUNING\.damageMult;\}/,
    'early-room health and damage use the shared spawn path');
  assert.match(SOURCE, /var _isNormalEarlyRouteRoom=activeDungeonId==='dungeon1'&&[\s\S]*depth>=2&&depth<=LEVEL1_EARLY_ROUTE_TUNING\.maxDepth[\s\S]*def\.type===RT\.COMBAT;[\s\S]*if\(_isNormalEarlyRouteRoom\)playerInvulnTimer=Math\.max\(playerInvulnTimer,LEVEL1_EARLY_ROUTE_TUNING\.graceSeconds\);/,
    'later early rooms receive only a finite read-and-respond grace window');
});

test('the first D1 mini-boss has a separate bounded onboarding budget', () => {
  assert.match(SOURCE, /var LEVEL1_EARLY_MINIBOSS_TUNING=Object\.freeze\(\{[\s\S]*maxDepth:6,[\s\S]*hpMult:0\.75,[\s\S]*damageMult:0\.60,[\s\S]*speedMult:0\.90,[\s\S]*attackCooldownMult:1\.25/,
    'the early mini-boss relief is explicit and finite');
  assert.match(SOURCE, /var _isEarlyD1MiniBoss=activeDungeonId==='dungeon1'&&[\s\S]*getRoomDepth\(currentRoomId\)<=LEVEL1_EARLY_MINIBOSS_TUNING\.maxDepth;/,
    'the relief is limited to the first Normal D1 mini-boss depth');
  assert.match(SOURCE, /if\(_isEarlyD1MiniBoss\)\{_mbHp\*=LEVEL1_EARLY_MINIBOSS_TUNING\.hpMult;_mbDmg\*=LEVEL1_EARLY_MINIBOSS_TUNING\.damageMult;\}/,
    'mini-boss health and damage use the shared spawn tuning');
  assert.match(SOURCE, /if\(_isEarlyD1MiniBoss\)\{mb\.speed\*=LEVEL1_EARLY_MINIBOSS_TUNING\.speedMult;mb\.attackCooldown\*=LEVEL1_EARLY_MINIBOSS_TUNING\.attackCooldownMult;\}/,
    'mini-boss movement and cadence are bounded without replacing its mechanics');
});

test('the first Normal D1 elite has a bounded onboarding budget', () => {
  assert.match(SOURCE, /var LEVEL1_EARLY_ELITE_TUNING=Object\.freeze\(\{[\s\S]*maxDepth:5,[\s\S]*hpMult:0\.60,[\s\S]*damageMult:0\.35,[\s\S]*speedMult:0\.85,[\s\S]*attackCooldownMult:1\.55,[\s\S]*graceSeconds:3\.5/,
    'the early elite tuning is explicit and finite');
  assert.match(SOURCE, /var _isEarlyNormalD1EliteRoom=activeDungeonId==='dungeon1'&&[\s\S]*_entryRoomDef\.type===RT\.ELITE&&isElite;[\s\S]*if\(_isEarlyNormalD1EliteRoom\)\{_hpScale\*=LEVEL1_EARLY_ELITE_TUNING\.hpMult;_eDmgMult\*=LEVEL1_EARLY_ELITE_TUNING\.damageMult;\}/,
    'the relief is limited to early Normal D1 elite spawns');
  assert.match(SOURCE, /var _isNormalEarlyEliteRoom=activeDungeonId==='dungeon1'&&[\s\S]*def\.type===RT\.ELITE;[\s\S]*if\(_isNormalEarlyEliteRoom\)playerInvulnTimer=Math\.max\(playerInvulnTimer,LEVEL1_EARLY_ELITE_TUNING\.graceSeconds\);/,
    'the early elite gives a finite read-and-respond grace window');
});

test('the modifier screen offers a calm standard expedition without removing authored modifiers', () => {
  assert.match(SOURCE, /id="modifierStandardBtn"[^>]*>🧭 Start Standard Expedition/, 'the calm route is an accessible choice');
  assert.match(SOURCE, /var STANDARD_EXPEDITION_MODIFIER=\{id:'standard_expedition'/, 'the calm route is data-defined');
  assert.match(SOURCE, /function startPendingModifierRun\(\)\{[\s\S]*showScreen\('gameScreen'\)[\s\S]*startGame/, 'both modifier choices share the normal run start');
  assert.match(SOURCE, /_pendingModifierId==='standard_expedition'\?STANDARD_EXPEDITION_MODIFIER:DUNGEON_MODIFIERS\.filter/, 'standard runs use the neutral modifier without changing authored modifier data');
  assert.match(SOURCE, /safeClick\('modifierStandardBtn','Standard Expedition',function\(\)\{[\s\S]*_pendingModifierId='standard_expedition';[\s\S]*startPendingModifierRun\(\);/, 'the standard choice is wired through the guarded click layer');
});
