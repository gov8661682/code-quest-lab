import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');

function createServiceWorkerHarness() {
  const handlers = {};
  const cacheRecords = new Map();
  const deletedCaches = [];
  const networkRequests = [];
  const cache = {
    added: [],
    puts: [],
    addAll(paths) {
      this.added.push(...paths);
      return Promise.resolve();
    },
    put(request, response) {
      this.puts.push({ request, response });
      return Promise.resolve();
    }
  };
  const caches = {
    open(name) {
      cacheRecords.set(name, cache);
      return Promise.resolve(cache);
    },
    match(request) {
      if (request === './index.html') return Promise.resolve({ name: 'offline-shell' });
      return Promise.resolve(null);
    },
    keys() { return Promise.resolve(['code-quest-lab-shell-old', 'code-quest-lab-shell-v6']); },
    delete(name) {
      deletedCaches.push(name);
      return Promise.resolve(true);
    }
  };
  const context = {
    self: {
      location: { origin: 'https://example.test' },
      addEventListener(name, handler) { handlers[name] = handler; },
      clients: { claim: () => Promise.resolve() },
      skipWaiting: () => Promise.resolve()
    },
    caches,
    URL,
    Response: { error: () => ({ name: 'network-error' }) },
    fetch(request) {
      networkRequests.push(request);
      return Promise.resolve({ status: 200, type: 'basic', clone: () => ({ name: 'network-copy' }) });
    }
  };

  vm.runInNewContext(`${SOURCE}\nthis.__appShell = APP_SHELL;`, context, { filename: 'service-worker.js' });

  async function dispatch(name, request) {
    let responsePromise;
    let waitPromise;
    handlers[name]({
      request,
      respondWith(value) { responsePromise = Promise.resolve(value); },
      waitUntil(value) { waitPromise = Promise.resolve(value); }
    });
    if (waitPromise) await waitPromise;
    return responsePromise ? responsePromise : undefined;
  }

  return { context, cache, cacheRecords, deletedCaches, networkRequests, dispatch };
}

test('service-worker shell paths are first-party files and lifecycle updates remove stale caches', async () => {
  const harness = createServiceWorkerHarness();
  const shellPaths = harness.context.__appShell;

  assert.ok(shellPaths.includes('./index.html'));
  assert.ok(shellPaths.includes('./privacy/'));
  for (const shellPath of shellPaths) {
    const relative = shellPath === './' ? '.' : shellPath.slice(2);
    assert.ok(fs.existsSync(path.join(ROOT, relative)), `missing app-shell path: ${shellPath}`);
    assert.ok(!/^https?:\/\//i.test(shellPath), `external app-shell path: ${shellPath}`);
  }

  await harness.dispatch('install');
  assert.deepEqual(harness.cache.added, Array.from(shellPaths));

  await harness.dispatch('activate');
  assert.deepEqual(harness.deletedCaches, ['code-quest-lab-shell-old']);
});

test('service worker ignores non-GET and cross-origin requests', async () => {
  const harness = createServiceWorkerHarness();

  await harness.dispatch('fetch', {
    method: 'POST',
    url: 'https://example.test/save',
    mode: 'same-origin'
  });
  await harness.dispatch('fetch', {
    method: 'GET',
    url: 'https://cdn.example.test/library.js',
    mode: 'cors'
  });

  assert.deepEqual(harness.networkRequests, []);
});

test('service worker falls back to index only for failed document navigation', async () => {
  const harness = createServiceWorkerHarness();
  harness.context.fetch = () => Promise.reject(new Error('offline'));

  const navigationResponse = await harness.dispatch('fetch', {
    method: 'GET',
    url: 'https://example.test/education/',
    mode: 'navigate'
  });
  assert.deepEqual(navigationResponse, { name: 'offline-shell' });

  const assetResponse = await harness.dispatch('fetch', {
    method: 'GET',
    url: 'https://example.test/site.css',
    mode: 'same-origin'
  });
  assert.deepEqual(assetResponse, { name: 'network-error' });
});
