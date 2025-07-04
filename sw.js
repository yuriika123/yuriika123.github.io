{\rtf1\ansi\ansicpg932\cocoartf2859
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = 'music-info-getter-v1';\
const urlsToCache = [\
    '/',\
    '/index.html',\
    '/style.css',\
    '/script.js'\
];\
\
// \uc0\u12452 \u12531 \u12473 \u12488 \u12540 \u12523 \u26178 \u12395 \u12461 \u12515 \u12483 \u12471 \u12517 \u12377 \u12427 \
self.addEventListener('install', event => \{\
    event.waitUntil(\
        caches.open(CACHE_NAME)\
            .then(cache => \{\
                return cache.addAll(urlsToCache);\
            \})\
    );\
\});\
\
// fetch\uc0\u12452 \u12505 \u12531 \u12488 \u12391 \u12461 \u12515 \u12483 \u12471 \u12517 \u12434 \u36820 \u12377 \
self.addEventListener('fetch', event => \{\
    event.respondWith(\
        caches.match(event.request)\
            .then(response => \{\
                return response || fetch(event.request);\
            \})\
    );\
\});}