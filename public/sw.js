// AceCoach Tennis PWA Service Worker v1.4.0
// Network-First for Navigation (HTML) & Cache-First for Offline Fallback
const CACHE_NAME = 'acecoach-v1-4-0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.svg',
  './manifest.webmanifest',
  './illustrations/b_w1_grip.jpg',
  './illustrations/b_w1_contact_point.jpg',
  './illustrations/b_w2_split_step.jpg',
  './illustrations/b_w2_unit_turn.jpg',
  './illustrations/b_w3_forehand_drop.jpg',
  './illustrations/b_w3_backhand_foundation.jpg',
  './illustrations/b_w4_serve_trophy.jpg',
  './illustrations/b_w4_punch_volley.jpg',
  './illustrations/i_w1_open_stance_forehand.jpg',
  './illustrations/i_w2_racket_lag_snap.jpg',
  './illustrations/i_w4_serve_pronation.jpg',
  './illustrations/i_w6_matchplay_tactics.jpg',
  './illustrations/index_finger_grip.jpg'
];

self.addEventListener('install', (event) => {
  // Activate immediately without waiting for old clients to close
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Purge all old caches (v1-2 etc.) immediately
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Purging old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // 1. Navigation requests (HTML pages): Network-First so users always get the latest code when online
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 2. Static assets (JS/CSS/images): Stale-While-Revalidate or Cache-First with update
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            event.request.method === 'GET' &&
            !event.request.url.startsWith('chrome-extension')
          ) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
