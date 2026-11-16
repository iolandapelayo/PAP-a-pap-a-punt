// Service worker: permet fer servir l'app sense connexió
const CACHE = "papapunt-v2";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./manifest.webmanifest",
  "./js/app.js", "./js/store.js", "./js/i18n.js", "./js/cloud.js", "./js/config.js",
  "./js/content/lang-ca.js", "./js/content/lang-es.js", "./js/content/reading.js",
  "./js/content/writing.js", "./js/content/math.js", "./js/content/general.js",
  "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png",
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
// Xarxa primer (per rebre actualitzacions), memòria cau si no hi ha connexió
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      const u = new URL(e.request.url); if (u.origin === location.origin || u.hostname === "cdn.jsdelivr.net") caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
