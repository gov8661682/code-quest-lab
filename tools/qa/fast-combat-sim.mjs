// Dependency-free, deterministic combat contract model.
//
// This is intentionally a logic-level harness rather than a second renderer.
// It validates the shared invariants that do not need a browser: attack
// cadence, collision, damage, phase transitions, finite summons, victory,
// loss, and accelerated time. Browser smoke tests remain responsible for
// canvas drawing, pointer delivery, audio, and tablet feel.

export const REPRESENTATIVE_ENCOUNTERS = Object.freeze({
  early: Object.freeze({
    id: 'early-stone-guardian',
    dungeonId: 'dungeon1',
    bossName: 'Stone Guardian',
    bossHp: 1600,
    bossDamage: 18,
    bossAttackEvery: 1.5,
    playerHp: 420,
    playerDamage: 110,
    playerAttackEvery: 0.55,
    phases: Object.freeze([
      Object.freeze({ threshold: null, summons: 0 }),
      Object.freeze({ threshold: 0.5, summons: 1 })
    ])
  }),
  mid: Object.freeze({
    id: 'mid-void-monarch',
    dungeonId: 'dungeon4',
    bossName: 'Void Monarch',
    bossHp: 4800,
    bossDamage: 38,
    bossAttackEvery: 1.5,
    playerHp: 760,
    playerDamage: 180,
    playerAttackEvery: 0.5,
    phases: Object.freeze([
      Object.freeze({ threshold: null, summons: 0 }),
      Object.freeze({ threshold: 0.65, summons: 2 }),
      Object.freeze({ threshold: 0.3, summons: 2 })
    ])
  }),
  late: Object.freeze({
    id: 'late-broker',
    dungeonId: 'dungeon8',
    bossName: 'The Broker',
    bossHp: 9600,
    bossDamage: 56,
    bossAttackEvery: 1.2,
    playerHp: 1200,
    playerDamage: 260,
    playerAttackEvery: 0.45,
    phases: Object.freeze([
      Object.freeze({ threshold: null, summons: 0 }),
      Object.freeze({ threshold: 0.6, summons: 2 }),
      Object.freeze({ threshold: 0.25, summons: 2 })
    ])
  })
});

export function createSeededRng(seed = 1) {
  let state = (Number(seed) >>> 0) || 1;
  return function nextRandom() {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function positiveNumber(value, fallback) {
  return Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clonePhases(phases) {
  return phases.map((phase) => ({
    threshold: phase.threshold === null ? null : clamp(Number(phase.threshold), 0, 1),
    summons: Math.max(0, Math.floor(Number(phase.summons) || 0))
  }));
}

function normalizedOptions(options = {}) {
  const profile = options.profile || REPRESENTATIVE_ENCOUNTERS.mid;
  const phases = clonePhases(options.phases || profile.phases);
  if (!phases.length || phases[phases.length - 1].threshold !== null) phases.push({ threshold: null, summons: 0 });
  return {
    scenario: String(options.scenario || profile.id),
    dungeonId: String(options.dungeonId || profile.dungeonId),
    bossName: String(options.bossName || profile.bossName),
    bossHp: positiveNumber(options.bossHp, profile.bossHp),
    bossDamage: positiveNumber(options.bossDamage, profile.bossDamage),
    bossAttackEvery: positiveNumber(options.bossAttackEvery, profile.bossAttackEvery),
    playerHp: positiveNumber(options.playerHp, profile.playerHp),
    playerDamage: positiveNumber(options.playerDamage, profile.playerDamage),
    playerAttackEvery: positiveNumber(options.playerAttackEvery, profile.playerAttackEvery),
    phases,
    seed: Number(options.seed) || 1,
    timeScale: positiveNumber(options.timeScale, 1),
    stepSeconds: positiveNumber(options.stepSeconds, 0.05),
    maxWallSeconds: positiveNumber(options.maxWallSeconds, 120),
    invincible: options.invincible === true,
    highDamage: options.highDamage === true,
    enemyFree: options.enemyFree === true,
    highDamageMultiplier: positiveNumber(options.highDamageMultiplier, 50),
    attackRange: positiveNumber(options.attackRange, 120),
    targetDistance: positiveNumber(options.targetDistance, 90)
  };
}

function record(state, type, details = {}) {
  state.events.push({
    at: Number(state.simulatedSeconds.toFixed(3)),
    type,
    ...details
  });
}

/**
 * Run one deterministic encounter.
 *
 * `timeScale` accelerates simulation time while keeping a separate wall-time
 * counter, so a ten-minute logical encounter can be checked in seconds. The
 * result is structured for CI assertions and useful failure diagnostics.
 */
export function simulateEncounter(options = {}) {
  const config = normalizedOptions(options);
  const random = createSeededRng(config.seed);
  const state = {
    bossHp: config.bossHp,
    bossHpMax: config.bossHp,
    playerHp: config.playerHp,
    playerHpMax: config.playerHp,
    phaseIndex: 0,
    summonsAlive: [],
    summonsSpawned: 0,
    summonBudget: config.phases.reduce((total, phase) => total + phase.summons, 0),
    attackTimer: 0,
    bossAttackTimer: config.bossAttackEvery,
    wallSeconds: 0,
    simulatedSeconds: 0,
    attackCount: 0,
    collisionChecks: 0,
    successfulHits: 0,
    damageDealt: 0,
    damageTaken: 0,
    phaseTransitions: [],
    events: []
  };

  record(state, 'encounter-start', {
    scenario: config.scenario,
    dungeonId: config.dungeonId,
    boss: config.bossName,
    seed: config.seed,
    timeScale: config.timeScale
  });

  const damagePerAttack = config.playerDamage * (config.highDamage ? config.highDamageMultiplier : 1);
  const applyDamageToPlayer = (amount) => {
    if (config.invincible) {
      record(state, 'damage-blocked', { amount: Math.round(amount), reason: 'invincibility' });
      return;
    }
    const dealt = Math.min(state.playerHp, Math.max(0, Math.round(amount)));
    state.playerHp -= dealt;
    state.damageTaken += dealt;
    record(state, 'player-damage', { amount: dealt, hp: state.playerHp });
  };

  const spawnPhaseSummons = (phaseIndex) => {
    const phase = config.phases[phaseIndex];
    if (!phase || phase.summons <= 0) return;
    if (config.enemyFree) {
      record(state, 'summons-suppressed', { phase: phaseIndex + 1, count: phase.summons });
      return;
    }
    for (let index = 0; index < phase.summons; index += 1) {
      const hp = 80 + Math.floor(random() * 41);
      state.summonsAlive.push({ hp, hpMax: hp, damage: 9 + Math.floor(random() * 8) });
      state.summonsSpawned += 1;
    }
    record(state, 'summons-spawned', { phase: phaseIndex + 1, count: phase.summons, remainingBudget: state.summonBudget });
  };

  const checkPhaseTransition = () => {
    const nextPhase = config.phases[state.phaseIndex + 1];
    if (!nextPhase || nextPhase.threshold === null) return;
    const hpRatio = state.bossHp / state.bossHpMax;
    if (hpRatio <= nextPhase.threshold) {
      state.phaseIndex += 1;
      state.phaseTransitions.push(state.phaseIndex + 1);
      record(state, 'phase-transition', { phase: state.phaseIndex + 1, hpRatio: Number(hpRatio.toFixed(4)) });
      spawnPhaseSummons(state.phaseIndex);
    }
  };

  const playerAttack = () => {
    state.attackCount += 1;
    state.collisionChecks += 1;
    const collides = config.targetDistance <= config.attackRange;
    record(state, 'attack-cycle', { index: state.attackCount, target: state.summonsAlive.length ? 'summon' : 'boss', collides });
    if (!collides) return;
    state.successfulHits += 1;
    if (state.summonsAlive.length) {
      const target = state.summonsAlive[0];
      const dealt = Math.min(target.hp, Math.max(1, Math.round(damagePerAttack)));
      target.hp -= dealt;
      state.damageDealt += dealt;
      record(state, 'summon-damage', { amount: dealt, remainingHp: target.hp });
      if (target.hp <= 0) {
        state.summonsAlive.shift();
        record(state, 'summon-defeated', { remaining: state.summonsAlive.length });
      }
      return;
    }
    const dealt = Math.min(state.bossHp, Math.max(1, Math.round(damagePerAttack)));
    state.bossHp -= dealt;
    state.damageDealt += dealt;
    record(state, 'boss-damage', { amount: dealt, hp: state.bossHp, phase: state.phaseIndex + 1 });
    checkPhaseTransition();
  };

  while (state.wallSeconds < config.maxWallSeconds && state.playerHp > 0 && state.bossHp > 0) {
    const wallDt = Math.min(config.stepSeconds, config.maxWallSeconds - state.wallSeconds);
    const simDt = wallDt * config.timeScale;
    state.wallSeconds += wallDt;
    state.simulatedSeconds += simDt;
    state.attackTimer -= simDt;
    state.bossAttackTimer -= simDt;

    if (state.bossAttackTimer <= 0) {
      state.bossAttackTimer += config.bossAttackEvery;
      const incoming = config.bossDamage * (0.9 + random() * 0.2);
      if (state.summonsAlive.length && !config.enemyFree) {
        const summon = state.summonsAlive[0];
        applyDamageToPlayer(summon.damage);
      } else {
        applyDamageToPlayer(incoming);
      }
    }
    if (state.attackTimer <= 0) {
      state.attackTimer += config.playerAttackEvery;
      playerAttack();
    }
  }

  let status = 'timeout';
  if (state.bossHp <= 0) status = 'victory';
  else if (state.playerHp <= 0) status = 'loss';
  record(state, status, {
    bossHp: Math.max(0, Math.round(state.bossHp)),
    playerHp: Math.max(0, Math.round(state.playerHp)),
    summonsRemaining: state.summonsAlive.length
  });

  return {
    status,
    scenario: config.scenario,
    dungeonId: config.dungeonId,
    bossName: config.bossName,
    seed: config.seed,
    timeScale: config.timeScale,
    wallSeconds: Number(state.wallSeconds.toFixed(3)),
    simulatedSeconds: Number(state.simulatedSeconds.toFixed(3)),
    playerHp: Math.max(0, Math.round(state.playerHp)),
    bossHp: Math.max(0, Math.round(state.bossHp)),
    phase: state.phaseIndex + 1,
    phaseTransitions: state.phaseTransitions,
    summonBudget: state.summonBudget,
    summonsSpawned: state.summonsSpawned,
    summonsRemaining: state.summonsAlive.length,
    attackCount: state.attackCount,
    collisionChecks: state.collisionChecks,
    successfulHits: state.successfulHits,
    damageDealt: state.damageDealt,
    damageTaken: state.damageTaken,
    events: state.events
  };
}

export function runRepresentativeSuite() {
  return {
    early: simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.early, seed: 101 }),
    mid: simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.mid, seed: 202, timeScale: 10, invincible: true }),
    late: simulateEncounter({ profile: REPRESENTATIVE_ENCOUNTERS.late, seed: 303, timeScale: 25, invincible: true, highDamage: true, highDamageMultiplier: 2, enemyFree: true }),
    loss: simulateEncounter({
      scenario: 'loss-boundary',
      bossName: 'Damage Boundary',
      bossHp: 5000,
      bossDamage: 150,
      bossAttackEvery: 0.4,
      playerHp: 120,
      playerDamage: 1,
      playerAttackEvery: 1,
      phases: [{ threshold: null, summons: 0 }],
      seed: 404,
      maxWallSeconds: 5
    })
  };
}
