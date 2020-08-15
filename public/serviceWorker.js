// cache stands for storage of the browser
const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];
const self = this;
self.addEventListener('install', (event) => {
    console.log('open cache');
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
    }))
});
self.addEventListener('fetch', (event) => {
    console.log('respond with cache');
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'));
            })
    )
});
self.addEventListener('activate', (event) => {
    console.log('activate cache');
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});
