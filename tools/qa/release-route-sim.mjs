import {
  LEVEL1_STONE_GUARDIAN_ONBOARDING,
  simulateEncounter
} from './fast-combat-sim.mjs';

// This is a bounded mechanics-confidence harness, not a second renderer or a
// balance oracle. Each profile normalizes the player/boss budget so the
// released finale families can be exercised in seconds with ordinary attack
// cadence, real incoming damage, authored phase thresholds, and finite adds.
// It deliberately excludes invincibility, high damage, enemy-free mode,
// encounter completion, and route shortcuts. Browser/device acceptance still
// owns movement, room interactions, touch feel, and the true player route.
const profile = (data) => Object.freeze({
  ...data,
  phases: Object.freeze(data.phases.map((phase) => Object.freeze({ ...phase })))
});

export const RELEASED_BOSS_MECHANICS = Object.freeze([
  profile({
    ...LEVEL1_STONE_GUARDIAN_ONBOARDING,
    id: 'release-dungeon1-stone-guardian',
    roomCount: 6,
    contentMode: 'combat',
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.5, summons: 1 }]
  }),
  profile({
    id: 'release-dungeon2-fallen-king', dungeonId: 'dungeon2', bossName: 'Fallen King',
    roomCount: 7, contentMode: 'combat', bossHp: 3675, bossDamage: 24,
    bossAttackEvery: 1.6, playerHp: 720, playerDamage: 150, playerAttackEvery: 0.55,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.7, summons: 1 }, { threshold: 0.3, summons: 1 }]
  }),
  profile({
    id: 'release-dungeon4-void-monarch', dungeonId: 'dungeon4', bossName: 'Void Monarch',
    roomCount: 8, contentMode: 'combat', bossHp: 4800, bossDamage: 38,
    bossAttackEvery: 1.5, playerHp: 760, playerDamage: 180, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.65, summons: 2 }, { threshold: 0.3, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon5-high-chieftain', dungeonId: 'dungeon5', bossName: 'Corrupted High Chieftain',
    roomCount: 8, contentMode: 'combat', bossHp: 7000, bossDamage: 32,
    bossAttackEvery: 1.5, playerHp: 1000, playerDamage: 230, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.6, summons: 2 }, { threshold: 0.25, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon6-archmage-valen', dungeonId: 'dungeon6', bossName: 'Archmage Valen',
    roomCount: 8, contentMode: 'combat', bossHp: 9600, bossDamage: 28,
    bossAttackEvery: 1.45, playerHp: 1250, playerDamage: 300, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.65, summons: 1 }, { threshold: 0.3, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon7-hollow-world-tree', dungeonId: 'dungeon7', bossName: 'Hollow World Tree',
    roomCount: 8, contentMode: 'combat', bossHp: 11500, bossDamage: 26,
    bossAttackEvery: 1.5, playerHp: 1500, playerDamage: 340, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.65, summons: 2 }, { threshold: 0.3, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon8-broker', dungeonId: 'dungeon8', bossName: 'The Broker',
    roomCount: 8, contentMode: 'combat', bossHp: 12800, bossDamage: 30,
    bossAttackEvery: 1.35, playerHp: 1700, playerDamage: 380, playerAttackEvery: 0.45,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.6, summons: 2 }, { threshold: 0.25, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon9-oathbreaker-king', dungeonId: 'dungeon9', bossName: 'Oathbreaker King',
    roomCount: 9, contentMode: 'combat', bossHp: 14200, bossDamage: 26,
    bossAttackEvery: 1.3, playerHp: 1900, playerDamage: 430, playerAttackEvery: 0.45,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.65, summons: 2 }, { threshold: 0.25, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon10-alchemist', dungeonId: 'dungeon10', bossName: 'The Alchemist',
    roomCount: 9, contentMode: 'combat', bossHp: 16500, bossDamage: 28,
    bossAttackEvery: 1.3, playerHp: 2200, playerDamage: 500, playerAttackEvery: 0.45,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.5, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon11-ranger-captain', dungeonId: 'dungeon11', bossName: 'Corrupted Ranger Captain',
    roomCount: 7, contentMode: 'environment-first', bossHp: 3400, bossDamage: 22,
    bossAttackEvery: 1.6, playerHp: 2500, playerDamage: 150, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.4, summons: 2 }]
  }),
  profile({
    id: 'release-dungeon12-corrupted-necromancer', dungeonId: 'dungeon12', bossName: 'Corrupted Necromancer',
    roomCount: 7, contentMode: 'horde-and-explore', bossHp: 19000, bossDamage: 35,
    bossAttackEvery: 1.6, playerHp: 2600, playerDamage: 550, playerAttackEvery: 0.5,
    phases: [{ threshold: null, summons: 0 }, { threshold: 0.5, summons: 3 }]
  })
]);

export function simulateReleasedBossRoute(options = {}) {
  const seed = Number(options.seed) || 1200;
  const maxWallSeconds = Number(options.maxWallSeconds) > 0 ? Number(options.maxWallSeconds) : 120;
  const entries = RELEASED_BOSS_MECHANICS.map((mechanics, index) => {
    const result = simulateEncounter({
      ...mechanics,
      seed: seed + index,
      maxWallSeconds,
      timeScale: 1,
      invincible: false,
      highDamage: false,
      enemyFree: false
    });
    return {
      dungeonId: mechanics.dungeonId,
      bossName: mechanics.bossName,
      roomCount: mechanics.roomCount,
      contentMode: mechanics.contentMode,
      result
    };
  });
  return {
    status: entries.every((entry) => entry.result.status === 'victory') ? 'victory' : 'failure',
    usesDeveloperAids: false,
    entries
  };
}
