import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const START_MARKER = 'var FULL_UNLOCK_PRODUCT_ID=';
const END_MARKER = 'function openDungeonSelectScreen';

function createHarness(adapter) {
  const start = SOURCE.indexOf(START_MARKER);
  const end = SOURCE.indexOf(END_MARKER, start);
  assert.notEqual(start, -1, 'production entitlement boundary is present');
  assert.notEqual(end, -1, 'production entitlement boundary has a stable end');

  const values = new Map();
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
  const elements = {
    parentGateCheck: { checked: false },
    entitlementPurchaseBtn: { disabled: false },
    entitlementRestoreBtn: { disabled: false },
    entitlementStatus: { textContent: '' },
    mainUnlockBtn: { textContent: '' }
  };
  const context = {
    console,
    localStorage,
    document: { getElementById(id) { return elements[id] || null; } },
    window: { CodeQuestPlatform: adapter ? { entitlements: adapter } : null }
  };

  const api = [
    'FULL_UNLOCK_PRODUCT_ID',
    'getEntitlementAdapter',
    'loadVerifiedEntitlement',
    'hasVerifiedPremiumEntitlement',
    'applyVerifiedEntitlementResult',
    'clearVerifiedEntitlement',
    'premiumDungeonAccessAllowed',
    'renderEntitlementStatus',
    'runEntitlementAction'
  ];
  vm.runInNewContext(
    `${SOURCE.slice(start, end)}\nthis.__entitlementApi={${api.map((name) => `${name}:${name}`).join(',')}};`,
    context,
    { filename: 'index.html#entitlement-contract' }
  );
  return { api: context.__entitlementApi, elements, localStorage, values };
}

function ownedResult(productId, source = 'web') {
  return { productId, status: 'owned', verified: true, source };
}

test('free users keep the free dungeon and cannot enter premium content', () => {
  const harness = createHarness({
    enforceProductionEntitlement: true,
    getEntitlementState() { return null; }
  });

  assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon1'), true);
  assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon2'), false);
  assert.equal(harness.api.applyVerifiedEntitlementResult(ownedResult('wrong.product')), false);
  assert.equal(harness.api.hasVerifiedPremiumEntitlement(), false);
  assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon2'), false);
});

test('verified ownership is accepted only for the full-unlock product and approved sources', () => {
  for (const source of ['storekit', 'googleplay', 'web']) {
    const harness = createHarness({
      enforceProductionEntitlement: true,
      getEntitlementState() { return null; }
    });
    const result = ownedResult(harness.api.FULL_UNLOCK_PRODUCT_ID, source);

    assert.equal(harness.api.applyVerifiedEntitlementResult(result), true, source);
    assert.equal(harness.api.hasVerifiedPremiumEntitlement(), true, source);
    assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon2'), true, source);
    assert.equal(harness.api.applyVerifiedEntitlementResult(result), true, `duplicate ${source}`);
    assert.equal(harness.api.hasVerifiedPremiumEntitlement(), true, `duplicate ${source}`);
  }
});

test('declined, pending, unverified, unknown-source, and wrong-product results never grant access', () => {
  const harness = createHarness({
    enforceProductionEntitlement: true,
    getEntitlementState() { return null; }
  });
  const productId = harness.api.FULL_UNLOCK_PRODUCT_ID;
  const invalidResults = [
    ownedResult('different.product'),
    { ...ownedResult(productId), verified: false },
    { ...ownedResult(productId), source: 'unknown-store' },
    { ...ownedResult(productId), status: 'pending' },
    { ...ownedResult(productId), status: 'declined' },
    null
  ];

  for (const result of invalidResults) assert.equal(harness.api.applyVerifiedEntitlementResult(result), false);
  assert.equal(harness.api.hasVerifiedPremiumEntitlement(), false);
  assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon2'), false);
});

test('revocation and not-owned results clear previously verified access', () => {
  for (const status of ['revoked', 'not_owned', 'none']) {
    const harness = createHarness({
      enforceProductionEntitlement: true,
      getEntitlementState() { return null; }
    });
    const productId = harness.api.FULL_UNLOCK_PRODUCT_ID;

    assert.equal(harness.api.applyVerifiedEntitlementResult(ownedResult(productId)), true);
    assert.equal(harness.api.hasVerifiedPremiumEntitlement(), true);
    assert.equal(harness.api.applyVerifiedEntitlementResult({ productId, status, verified: true, source: 'web' }), true, status);
    assert.equal(harness.api.hasVerifiedPremiumEntitlement(), false, status);
    assert.equal(harness.api.premiumDungeonAccessAllowed('dungeon2'), false, status);
  }
});

test('parent or guardian gate blocks store actions before the adapter is called', async () => {
  const calls = [];
  const harness = createHarness({
    enforceProductionEntitlement: true,
    purchase(request) {
      calls.push(['purchase', request.productId]);
      return Promise.resolve({ productId: request.productId, status: 'owned', verified: true, source: 'web' });
    },
    restore(request) {
      calls.push(['restore', request.productId]);
      return Promise.resolve({ productId: request.productId, status: 'not_owned', verified: true, source: 'web' });
    }
  });

  await harness.api.runEntitlementAction('purchase');
  assert.deepEqual(calls, []);
  assert.match(harness.elements.entitlementStatus.textContent, /parent or guardian/i);

  harness.elements.parentGateCheck.checked = true;
  await harness.api.runEntitlementAction('purchase');
  assert.deepEqual(calls, [['purchase', harness.api.FULL_UNLOCK_PRODUCT_ID]]);
  assert.equal(harness.api.hasVerifiedPremiumEntitlement(), true);

  await harness.api.runEntitlementAction('restore');
  assert.deepEqual(calls, [
    ['purchase', harness.api.FULL_UNLOCK_PRODUCT_ID],
    ['restore', harness.api.FULL_UNLOCK_PRODUCT_ID]
  ]);
  assert.equal(harness.api.hasVerifiedPremiumEntitlement(), false);
});

test('store decline and adapter errors leave existing access unchanged', async () => {
  const harness = createHarness({
    enforceProductionEntitlement: true,
    purchase() { return Promise.resolve({ productId: harness.api.FULL_UNLOCK_PRODUCT_ID, status: 'pending', verified: true, source: 'web' }); }
  });
  harness.elements.parentGateCheck.checked = true;

  await harness.api.runEntitlementAction('purchase');
  assert.equal(harness.api.hasVerifiedPremiumEntitlement(), false);
  assert.match(harness.elements.entitlementStatus.textContent, /no access/i);

  const failing = createHarness({
    enforceProductionEntitlement: true,
    purchase() { return Promise.reject(new Error('store unavailable')); }
  });
  failing.elements.parentGateCheck.checked = true;
  await failing.api.runEntitlementAction('purchase');
  assert.equal(failing.api.hasVerifiedPremiumEntitlement(), false);
  assert.match(failing.elements.entitlementStatus.textContent, /not completed/i);
});
