/* Euskal Liga Manager — service worker: app shell en caché para funcionar offline */
const CACHE='euskalliga-v3';
const ASSETS=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',ev=>{ev.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',ev=>{ev.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',ev=>{
  if(ev.request.method!=='GET')return;
  ev.respondWith(fetch(ev.request,{cache:'no-cache'}).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(ev.request,copy));return res;}).catch(()=>caches.match(ev.request,{ignoreSearch:true})));
});
