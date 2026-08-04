import test from 'node:test';
import assert from 'node:assert/strict';
import { createDevelopmentEntitlementAdapter, DEVELOPMENT_PRODUCT_ID } from '../platform/dev-entitlement-adapter.mjs';

test('development adapter models a verified non-purchasing unlock and restore flow', async () => {
  const adapter = createDevelopmentEntitlementAdapter({
    initialStatus: 'not_owned',
    purchaseStatus: 'owned',
    restoreStatus: 'owned'
  });
  assert.equal(adapter.developmentOnly, true);
  assert.equal(adapter.source, 'web');
  assert.equal(adapter.enforceProductionEntitlement, true);
  assert.deepEqual(await adapter.getEntitlementState({ productId: DEVELOPMENT_PRODUCT_ID }), {
    productId: DEVELOPMENT_PRODUCT_ID,
    status: 'not_owned',
    verified: true,
    source: 'web'
  });
  assert.equal((await adapter.purchase({ productId: DEVELOPMENT_PRODUCT_ID })).status, 'owned');
  assert.equal((await adapter.restore({ productId: DEVELOPMENT_PRODUCT_ID })).status, 'owned');
});

test('development adapter preserves pending, revocation, unavailable, and wrong-product states', async () => {
  const adapter = createDevelopmentEntitlementAdapter({
    initialStatus: 'pending',
    purchaseStatus: 'pending',
    restoreStatus: 'revoked'
  });
  assert.equal((await adapter.getEntitlementState({ productId: DEVELOPMENT_PRODUCT_ID })).verified, true);
  assert.equal((await adapter.purchase({ productId: DEVELOPMENT_PRODUCT_ID })).status, 'pending');
  assert.equal((await adapter.restore({ productId: DEVELOPMENT_PRODUCT_ID })).status, 'revoked');

  adapter.setState('unavailable');
  const unavailable = await adapter.getEntitlementState({ productId: DEVELOPMENT_PRODUCT_ID });
  assert.equal(unavailable.status, 'unavailable');
  assert.equal(unavailable.verified, false);

  const wrongProduct = await adapter.getEntitlementState({ productId: 'other.product' });
  assert.equal(wrongProduct.status, 'unavailable');
  assert.equal(wrongProduct.verified, false);
});

test('development adapter rejects a non-canonical product identifier', () => {
  assert.throws(() => createDevelopmentEntitlementAdapter({ productId: 'test.unlock' }), /codequestlab\.full_unlock/);
});
