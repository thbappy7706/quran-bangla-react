import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Replace 'quran-bangla-react' with your actual GitHub repository name if it differs.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-512.svg'],

      // Web App Manifest
      manifest: {
        name: ' আল-কুরআন| Al-Quran Bangla',
        short_name: 'Al-Quran',
        description: 'পবিত্র কুরআন - বাংলা অনুবাদ সহ সম্পূর্ণ আল-কুরআন',
        theme_color: '#0c0a09',
        background_color: '#0c0a09',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/quran-bangla-react/',
        start_url: '/quran-bangla-react/',
        lang: 'bn',
        icons: [
          {
            src: 'pwa-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'favicon.svg',
            sizes: '48x48',
            type: 'image/svg+xml',
          },
        ],
        shortcuts: [
          {
            name: 'সূরার তালিকা',
            short_name: 'কুরআন',
            description: 'সম্পূর্ণ সূরার তালিকা',
            url: '/quran-bangla-react/quran',
            icons: [{ src: 'pwa-512.svg', sizes: '512x512' }],
          },
          {
            name: 'অনুসন্ধান',
            short_name: 'খুঁজুন',
            description: 'সূরা খুঁজুন',
            url: '/quran-bangla-react/search',
            icons: [{ src: 'pwa-512.svg', sizes: '512x512' }],
          },
        ],
        categories: ['education', 'books', 'religion'],
      },

      // Workbox service worker configuration
      workbox: {
        // Cache the Quran API responses for offline use
        runtimeCaching: [
          {
            // API data — network first, fallback to cache
            urlPattern: /^https:\/\/quranapi\.pages\.dev\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'quran-api-cache',
              expiration: {
                maxEntries: 130,        // 114 surahs + extras
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Audio files — cache first (large, rarely change)
            urlPattern: /^https:\/\/the-quran-project\.github\.io\/Quran-Audio\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quran-audio-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Google Fonts — stale-while-revalidate
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      devOptions: {
        enabled: false, // set true to test SW in dev mode
      },
    }),
  ],
  base: '/quran-bangla-react/',
})
