import { runRepresentativeSuite } from './fast-combat-sim.mjs';
import { simulateReleasedBossRoute } from './release-route-sim.mjs';

const suite = runRepresentativeSuite();
for (const [name, result] of Object.entries(suite)) {
  const wallSeconds = result.wallSeconds === undefined ? 'n/a' : result.wallSeconds;
  const phases = result.phaseTransitions === undefined ? 0 : result.phaseTransitions.length;
  const summonsSpawned = result.summonsSpawned === undefined ? 0 : result.summonsSpawned;
  const summonBudget = result.summonBudget === undefined ? 0 : result.summonBudget;
  console.log(`${name}: ${result.status} in ${wallSeconds}s wall / ${result.simulatedSeconds}s simulated; phases=${phases}; summons=${summonsSpawned}/${summonBudget}`);
}
if (suite.opening.status !== 'victory' || suite.firstBoss.status !== 'victory' || suite.early.status !== 'victory' || suite.mid.status !== 'victory' || suite.late.status !== 'victory' || suite.loss.status !== 'loss') {
  process.exitCode = 1;
}
const releasedRoute = simulateReleasedBossRoute();
console.log(`releasedRoute: ${releasedRoute.status} bosses=${releasedRoute.entries.length} aids=${releasedRoute.usesDeveloperAids}`);
for (const entry of releasedRoute.entries) {
  console.log(`  ${entry.dungeonId}: ${entry.bossName} ${entry.result.status} / ${entry.result.simulatedSeconds}s simulated; phases=${entry.result.phaseTransitions.length}; summons=${entry.result.summonsSpawned}/${entry.result.summonBudget}`);
}
if (releasedRoute.status !== 'victory' || releasedRoute.usesDeveloperAids) process.exitCode = 1;
