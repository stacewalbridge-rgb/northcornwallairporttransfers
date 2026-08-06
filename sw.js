const CACHE='ncat-v17-correct-cards-20260806';
const CORE=['/','/index.html','/airports.html','/stations.html','/ports.html','/styles.css?v=17','/app.js?v=17','/site-config.js?v=17','/assets/generic-train-station.svg','/assets/generic-seaport.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
  self.clients.claim()
]))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy));
    return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('/index.html'))));
});