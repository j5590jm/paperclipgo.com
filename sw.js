/* ============================================================
   PaperclipGo v3.0 Super — Offline-First PWA Service Worker
   ============================================================ */
const CACHE_NAME = 'paperclipgo-v3-super-cache-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/monetization.js',
  '/app.js',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/manifest.webmanifest',
  '/offline.html',
  '/about.html',
  '/faq.html',
  '/privacy.html',
  '/terms.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Network-first for market API calls
  if (url.pathname.includes('/api/market.php')) {
    event.respondWith(
      fetch(event.request).catch(() => new Response(JSON.stringify({ offline: true }), {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  const isAppAsset = event.request.mode === 'navigate' ||
    ['script', 'style', 'image', 'font', 'manifest'].includes(event.request.destination);
  if (!isAppAsset || url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    let response;
    try {
      response = await fetch(event.request);
    } catch {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') {
        return (await cache.match('/offline.html')) || Response.error();
      }
      return new Response(null, { status: 503, statusText: 'Offline' });
    }

    if (response.ok) {
      event.waitUntil(cache.put(event.request, response.clone()).catch(error => {
        console.warn('Unable to update the offline cache:', error);
      }));
    }
    return response;
  })());
});
