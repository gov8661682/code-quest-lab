// Bump the shell cache whenever a shipped gameplay shell changes. Keeping the
// same cache name would let an already-controlled browser keep an older
// index.html after a successful Pages deployment.
const CACHE_NAME = 'code-quest-lab-shell-v7';
const APP_SHELL = [
  './',
  './index.html',
  './site.css',
  './manifest.webmanifest',
  './about/',
  './education/',
  './privacy/',
  './support/',
  './contact/',
  './schools/',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/logo.svg',
  './assets/loading.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Keep the offline boundary first-party. A future external link or browser
  // integration must not be intercepted or cached by the game shell worker.
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        // Only document navigations should fall back to the cached app shell.
        // Returning index.html for a failed asset hides real asset failures.
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
