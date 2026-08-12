import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LEVEL1_STONE_GUARDIAN_ONBOARDING,
  REPRESENTATIVE_ENCOUNTERS,
  createSeededRng,
  runRepresentativeSuite,
  simulateEncounter,
  simulateOpeningRoom
} from '../tools/qa/fast-combat-sim.mjs';
import {
  RELEASED_BOSS_MECHANICS,
  simulateReleasedBossRoute
} from '../tools/qa/release-route-sim.mjs';

test('deterministic RNG and representative encounter results are repeatable', () => {
  const rngA = createSeededRng(77);
  const rngB = createSeededRng(77);
  assert.deepEqual(Array.from({ length: 8 }, () => rngA()), Array.from({ length: 8 }, () => rngB()));
  assert.deepEqual(
    simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.mid, seed: 88 }),
    simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.mid, seed: 88 })
  );
});

test('representative early, mid, and late encounters converge with finite summon pressure', () => {
  const suite = runRepresentativeSuite();
  for (const name of ['early', 'mid', 'late']) {
    const result = suite[name];
    assert.equal(result.status, 'victory', name);
    assert.ok(result.attackCount > 0, `${name} should run attack cycles`);
    assert.equal(result.collisionChecks, result.attackCount, `${name} collision checks should cover attacks`);
    assert.equal(result.successfulHits, result.attackCount, `${name} attacks should collide in the representative arena`);
    assert.ok(result.summonsSpawned <= result.summonBudget, `${name} summons exceed finite budget`);
    assert.equal(result.summonsRemaining, 0, `${name} should not leave live summons after victory`);
  }
  assert.deepEqual(suite.mid.phaseTransitions, [2, 3]);
  assert.deepEqual(suite.late.phaseTransitions, [2, 3]);
});

test('fresh Normal D1 opening room clears inside the ordinary attack budget', () => {
  const result = simulateOpeningRoom();
  assert.equal(result.status, 'victory');
  assert.equal(result.enemiesDefeated, result.enemyCount);
  assert.ok(result.successfulHits > 0, 'opening room should accept ordinary attack hits');
  assert.ok(result.simulatedSeconds < result.readWindowSeconds, 'opening room should clear before the read window expires');
  assert.ok(result.playerHp > 0, 'starter player should survive the opening room budget');
  assert.deepEqual(result.targetDistances, [64, 86]);
  assert.ok(result.targetDistances.every((distance) => distance <= result.attackRange), 'starter targets should begin within attack range');
});

test('fresh Normal Mage can learn the Stone Guardian pattern without QA aids', () => {
  const result = runRepresentativeSuite().firstBoss;
  assert.equal(result.status, 'victory');
  assert.equal(result.dungeonId, LEVEL1_STONE_GUARDIAN_ONBOARDING.dungeonId);
  assert.equal(result.bossName, LEVEL1_STONE_GUARDIAN_ONBOARDING.bossName);
  assert.deepEqual(result.phaseTransitions, [2]);
  assert.equal(result.summonsSpawned, 1, 'the authored first phase summon remains exercised');
  assert.equal(result.summonsRemaining, 0);
  assert.ok(result.playerHp > 0, 'the fresh Mage survives the intended first-boss lesson');
  assert.ok(result.damageTaken > 0, 'the scenario is not accidentally invincible');
  assert.equal(result.events.some((event) => event.type === 'damage-blocked'), false, 'the scenario does not use developer invincibility');
  assert.ok(result.simulatedSeconds < 10, 'the first-boss budget remains readable and finite');
});

test('accelerated invincible QA completes the mid encounter in bounded wall time', () => {
  const normal = simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.mid, seed: 202, invincible: true });
  const accelerated = simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.mid, seed: 202, timeScale: 10, invincible: true });
  assert.equal(normal.status, 'victory');
  assert.equal(accelerated.status, 'victory');
  assert.ok(accelerated.wallSeconds < normal.wallSeconds / 5, 'time scale should materially reduce wall-time simulation');
  assert.equal(accelerated.damageTaken, 0, 'invincibility should block incoming damage');
});

test('high-damage and enemy-free modes exercise a late boss without waiting for adds', () => {
  const result = simulateEncounter({
    profile: REPRESENTATIVE_ENCOUNTERS.late,
    seed: 303,
    timeScale: 25,
    invincible: true,
    highDamage: true,
    highDamageMultiplier: 2,
    enemyFree: true
  });
  assert.equal(result.status, 'victory');
  assert.equal(result.summonsSpawned, 0);
  assert.ok(result.phaseTransitions.length >= 2);
  assert.equal(result.damageTaken, 0);
});

test('loss, collision miss, and timeout boundaries remain distinguishable', () => {
  const suite = runRepresentativeSuite();
  assert.equal(suite.loss.status, 'loss');
  assert.ok(suite.loss.damageTaken > 0);
  const miss = simulateEncounter({
    scenario: 'collision-miss',
    bossHp: 100,
    bossDamage: 1,
    playerHp: 1000,
    playerDamage: 100,
    targetDistance: 300,
    attackRange: 100,
    phases: [{ threshold: null, summons: 0 }],
    maxWallSeconds: 1
  });
  assert.equal(miss.status, 'timeout');
  assert.ok(miss.collisionChecks > 0);
  assert.equal(miss.successfulHits, 0);
});

test('released D1-D12 boss families survive an ordinary no-aid mechanics route', () => {
  const route = simulateReleasedBossRoute({ seed: 1200 });
  assert.equal(route.status, 'victory');
  assert.equal(route.usesDeveloperAids, false);
  assert.deepEqual(
    route.entries.map((entry) => entry.dungeonId),
    RELEASED_BOSS_MECHANICS.map((entry) => entry.dungeonId)
  );
  for (const entry of route.entries) {
    assert.equal(entry.result.status, 'victory', `${entry.dungeonId} should defeat its named finale`);
    assert.ok(entry.result.damageTaken > 0, `${entry.dungeonId} must receive real incoming damage`);
    assert.equal(entry.result.events.some((event) => event.type === 'damage-blocked'), false, `${entry.dungeonId} must not use invincibility`);
    assert.equal(entry.result.summonsRemaining, 0, `${entry.dungeonId} must clear its finite adds`);
    assert.ok(entry.result.summonsSpawned <= entry.result.summonBudget, `${entry.dungeonId} must stay within its summon budget`);
  }
  assert.equal(route.entries.find((entry) => entry.dungeonId === 'dungeon11').contentMode, 'environment-first');
  assert.equal(route.entries.find((entry) => entry.dungeonId === 'dungeon12').contentMode, 'horde-and-explore');
});
