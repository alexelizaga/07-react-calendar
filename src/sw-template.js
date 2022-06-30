importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// eslint-disable-next-line no-undef
const baseUrl = 'https://bc-calendar.herokuapp.com/api';

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst } = workbox.strategies;


registerRoute(
    new RegExp(`${baseUrl}/auth/renew` ),
    new NetworkFirst()
)

registerRoute(
    new RegExp(`${baseUrl}/events` ),
    new NetworkFirst()
)

registerRoute(
    new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css'),
    new CacheFirst()
);

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'),
    new CacheFirst()
)
