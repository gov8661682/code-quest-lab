import { runRepresentativeSuite } from './fast-combat-sim.mjs';

const suite = runRepresentativeSuite();
for (const [name, result] of Object.entries(suite)) {
  console.log(`${name}: ${result.status} in ${result.wallSeconds}s wall / ${result.simulatedSeconds}s simulated; phases=${result.phaseTransitions.length}; summons=${result.summonsSpawned}/${result.summonBudget}`);
}
if (suite.early.status !== 'victory' || suite.mid.status !== 'victory' || suite.late.status !== 'victory' || suite.loss.status !== 'loss') {
  process.exitCode = 1;
}
