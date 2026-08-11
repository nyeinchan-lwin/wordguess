// Offline support for WordGuess.
//
// The first version of this file cached five files under a fixed name and
// answered every request cache-first, with no revalidation. That combination
// is a trap: once a visitor installed the worker they kept the files they
// first received for good, because the cache name never changed and nothing
// ever went back to the network. Sixty-four commits shipped behind it.
//
// So: the version below is bumped whenever the cached files change, and the
// strategies are chosen so that being wrong about the version is survivable
// rather than permanent.
const CACHE_NAME = 'wordguess-v2';

// Every local file index.html pulls in. `test/offline.mjs` compares this list
// against the page's own references, so a new script or stylesheet cannot be
// added without being cached — that is how i18n.js came to be missing, and
// missing it broke the app offline rather than merely dropping translations.
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './i18n.js',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Put a response in the cache without letting a cache failure fail the request.
function store(request, response) {
  if (response && response.ok && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(c => c.put(request, copy)).catch(() => {});
  }
  return response;
}

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;   // analytics and the like

  // The document decides which assets the page asks for, so it must never be
  // answered from a stale cache while the network is available. Offline, the
  // cached copy is what makes the app work at all.
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(r => store(request, r))
        .catch(() => caches.match(request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Everything else: serve the cache for speed, but always refresh behind it,
  // so a stale asset survives exactly one load instead of forever.
  e.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(r => store(request, r))
        .catch(() => cached);
      return cached || network;
    })
  );
});
