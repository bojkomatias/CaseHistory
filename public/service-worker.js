importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'script',
    new workbox.strategies.NetworkFirst()
)