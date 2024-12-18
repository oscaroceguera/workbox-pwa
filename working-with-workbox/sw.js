importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { clientsClaim, skipWaiting } = workbox.core;
const { StaleWhileRevalidate, CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

clientsClaim();
skipWaiting();

registerRoute(
  // Cache CSS files
  /\.css$/,
  //Use cache but update in the background
  new StaleWhileRevalidate({
    //Use a custom cache name.
    cacheName: "css-cache",
  })
);

registerRoute(
  // Cache js files
  /\.js$/,
  new StaleWhileRevalidate({
    //Use a custom cache name for it
    cacheName: "js-cache",
  })
);

registerRoute(
  //Cache image giles.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  //USe the cache if it's available
  new CacheFirst({
    name: "image-cache",
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);
