import test from 'node:test';
import assert from 'node:assert/strict';
import {
  REPRESENTATIVE_ENCOUNTERS,
  createSeededRng,
  runRepresentativeSuite,
  simulateEncounter
} from '../tools/qa/fast-combat-sim.mjs';

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
