/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');


workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const baseUrl = 'https://bc-calendar.herokuapp.com/api';
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

if (workbox) {
    console.log(`Workbox is loaded 🎉`);
} else {
    console.log(`Workbox didn't load `);
}

const cacheCacheFirst = [
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
];

registerRoute(
    ({ request, url }) => {
        if( cacheCacheFirst.includes( url.href ) ) return true;
        return false;
    },
    new CacheFirst()
);

// Offline Gets

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

registerRoute(
    ({ request, url }) => {
        if( cacheNetworkFirst.includes( url.pathname ) ) return true;
        return false;
    },
    new NetworkFirst()
);


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
);

registerRoute(
    new RegExp(`${baseUrl}/events/`),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
);

registerRoute(
    new RegExp(`${baseUrl}/events/`),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
);