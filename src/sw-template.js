/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const baseUrl = 'https://bc-calendar.herokuapp.com/api';

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
    new CacheFirst()
);

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'),
    new CacheFirst()
)

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/webfonts/fa-regular-400.woff2'),
    new CacheFirst()
)

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/webfonts/fa-regular-400.ttf'),
    new CacheFirst()
)

// Offline Gets

registerRoute(
    new RegExp(`${baseUrl}/auth/renew` ),
    new NetworkFirst()
)

registerRoute(
    new RegExp(`${baseUrl}/events` ),
    new NetworkFirst()
)

// Offline Posts

const bgSyncPlugin = new BackgroundSyncPlugin('offlinePosts', {
    maxRetentionTime: 24 * 60,
});

registerRoute(
    new RegExp(`${baseUrl}/events`),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)