import test from 'node:test';
import assert from 'node:assert/strict';
import { checkReleaseContracts } from '../scripts/check-release-contracts.mjs';

test('release shell contracts are valid', () => {
  assert.deepEqual(checkReleaseContracts(), []);
});
