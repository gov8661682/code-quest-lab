import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function createHarness(platform, available = true, existing = null) {
  const calls = [];
  const plugin = {
    getEntitlementState(request) {
      calls.push(['getEntitlementState', request]);
      return Promise.resolve({ productId: request.productId, status: 'not_owned', verified: true, source: platform === 'ios' ? 'storekit' : 'googleplay' });
    },
    purchase(request) {
      calls.push(['purchase', request]);
      return Promise.resolve({ productId: request.productId, status: 'pending', verified: true, source: platform === 'ios' ? 'storekit' : 'googleplay' });
    },
    restore(request) {
      calls.push(['restore', request]);
      return Promise.resolve({ productId: request.productId, status: 'not_owned', verified: true, source: platform === 'ios' ? 'storekit' : 'googleplay' });
    }
  };
  const context = {
    window: {
      Capacitor: {
        getPlatform() { return platform; },
        isPluginAvailable(name) { return available && name === 'CodeQuestEntitlements'; },
        registerPlugin(name) {
          calls.push(['registerPlugin', name]);
          return plugin;
        }
      }
    }
  };
  if (existing) context.window.CodeQuestPlatform = { entitlements: existing };

  const start = SOURCE.indexOf('function initNativeEntitlementBridge()');
  const end = SOURCE.indexOf('function initNativeLifecycleBridge()', start + 1);
  assert.notEqual(start, -1, 'native entitlement bridge is present');
  assert.notEqual(end, -1, 'native entitlement bridge has a stable boundary');
  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__initNativeEntitlementBridge = initNativeEntitlementBridge;`, context, {
    filename: 'index.html#native-entitlement-bridge-contract'
  });
  return { context, calls };
}

test('iOS and Android native plugins are mapped to the approved core sources', async () => {
  for (const [platform, source] of [['ios', 'storekit'], ['android', 'googleplay']]) {
    const harness = createHarness(platform);
    harness.context.__initNativeEntitlementBridge();
    const adapter = harness.context.window.CodeQuestPlatform.entitlements;
    assert.equal(adapter.source, source);
    assert.equal(adapter.enforceProductionEntitlement, true);
    const productId = 'codequestlab.full_unlock';

    await adapter.getEntitlementState({ productId });
    await adapter.purchase({ productId });
    await adapter.restore({ productId });
    assert.deepEqual(harness.calls.map(([name]) => name), ['registerPlugin', 'getEntitlementState', 'purchase', 'restore']);
  }
});

test('web or unavailable native plugins do not create a payment adapter', () => {
  const web = createHarness('web');
  web.context.__initNativeEntitlementBridge();
  assert.equal(web.context.window.CodeQuestPlatform, undefined);

  const unavailable = createHarness('ios', false);
  unavailable.context.__initNativeEntitlementBridge();
  assert.equal(unavailable.context.window.CodeQuestPlatform, undefined);
  assert.deepEqual(unavailable.calls, []);
});

test('an explicitly supplied adapter is never overwritten by native discovery', () => {
  const existing = {
    source: 'web',
    getEntitlementState() { return Promise.resolve(null); }
  };
  const harness = createHarness('ios', true, existing);
  harness.context.__initNativeEntitlementBridge();
  assert.equal(harness.context.window.CodeQuestPlatform.entitlements, existing);
  assert.deepEqual(harness.calls, []);
});
