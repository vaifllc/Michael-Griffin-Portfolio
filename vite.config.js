import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssnano from 'cssnano'
import imagemin from 'vite-plugin-imagemin'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 20 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Michael Griffin Portfolio',
        short_name: 'MG Portfolio',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globDirectory: 'dist',
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  assetsInclude: ['**/*.PNG', '**/*.png'], // Add both uppercase and lowercase extensions
  css: {
    postcss: {
      plugins: [
        cssnano({
          preset: 'default',
        }),
      ],
    },
  },
  build: {
    outDir: 'dist', // Ensure this matches the globDirectory in the VitePWA config
  },
})
