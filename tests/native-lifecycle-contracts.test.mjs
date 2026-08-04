import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function createHarness() {
  const listeners = new Map();
  const calls = [];
  let activeScreen = true;
  const gameScreen = { classList: { contains: (name) => activeScreen && name === 'active' } };
  const context = {
    window: {
      Capacitor: {
        Plugins: {
          App: {
            addListener(name, handler) {
              listeners.set(name, handler);
              return Promise.resolve({ remove: () => listeners.delete(name) });
            }
          }
        }
      }
    },
    document: { getElementById: (id) => id === 'gameScreen' ? gameScreen : null },
    gameRunning: true,
    gamePaused: false,
    saveForPageBackgrounding() { calls.push('saveForPageBackgrounding'); },
    openPauseMenu() { calls.push('openPauseMenu'); context.gameRunning = false; context.gamePaused = true; },
    closePauseMenu() { calls.push('closePauseMenu'); context.gamePaused = false; },
    openMainMenu() { calls.push('openMainMenu'); },
    refreshEntitlementFromPlatform() { calls.push('refreshEntitlementFromPlatform'); }
  };
  const start = SOURCE.indexOf('function initNativeLifecycleBridge()');
  const end = SOURCE.indexOf('// ---- PLATFORM ENTITLEMENT BRIDGE', start);
  assert.notEqual(start, -1, 'native lifecycle bridge is present');
  assert.notEqual(end, -1, 'native lifecycle bridge boundary is present');
  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__initNativeLifecycleBridge = initNativeLifecycleBridge;`, context, { filename: 'index.html#native-lifecycle-contract' });
  return { context, listeners, calls, setActive: (value) => { activeScreen = value; } };
}

test('native lifecycle bridge saves and pauses for pause and inactive app-state events', () => {
  const harness = createHarness();
  harness.context.__initNativeLifecycleBridge();

  assert.deepEqual(Array.from(harness.listeners.keys()).sort(), ['appStateChange', 'backButton', 'pause', 'resume']);
  harness.listeners.get('appStateChange')({ isActive: false });
  assert.deepEqual(harness.calls, ['saveForPageBackgrounding', 'openPauseMenu']);

  harness.calls.length = 0;
  harness.listeners.get('pause')();
  assert.deepEqual(harness.calls, ['saveForPageBackgrounding']);
});

test('native lifecycle bridge refreshes entitlement on resume and routes back actions safely', () => {
  const harness = createHarness();
  harness.context.__initNativeLifecycleBridge();

  harness.listeners.get('resume')();
  assert.deepEqual(harness.calls, ['refreshEntitlementFromPlatform']);

  harness.calls.length = 0;
  harness.context.gamePaused = true;
  harness.context.gameRunning = false;
  harness.listeners.get('backButton')();
  assert.deepEqual(harness.calls, ['closePauseMenu']);

  harness.calls.length = 0;
  harness.context.gamePaused = false;
  harness.context.gameRunning = true;
  harness.listeners.get('backButton')();
  assert.deepEqual(harness.calls, ['openPauseMenu']);

  harness.calls.length = 0;
  harness.setActive(false);
  harness.listeners.get('backButton')();
  assert.deepEqual(harness.calls, ['openMainMenu']);
});
