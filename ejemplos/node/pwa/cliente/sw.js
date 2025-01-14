const CACHE_NAME = 'V1';
const STATIC_CACHE_URLS = ['/', 'styles.css', 'phone.png','main.js, index.html'];
const FILES_TO_CACHE = ['/offline.html'];    

  self.addEventListener('push', event => {
      const data = event.data.json();

      self.registration.showNotification(data.title, {
        body: 'Funciona la notificacion!',
      });
    });

  self.addEventListener('install', event => {
    const preCache = async () => {
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
    };
    event.waitUntil(preCache());
  });

  self.addEventListener('activate', event => {
    console.log("se ejecuta activate");
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
  });

  self.addEventListener('fetch', event => {
    console.log("se ejecuta fetch");

    if (event.request.mode !== 'navigate') {
      // Not a page navigation, bail.
      return;
    }
    event.respondWith(
        fetch(event.request)
            .catch(() => {
              return caches.open(CACHE_NAME)
                  .then((cache) => {
                    return cache.match('offline.html');
                  });
            })
    );
  });

  /*self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_CACHE_URLS))  
    )
  });    */