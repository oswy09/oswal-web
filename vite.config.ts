import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'public_html',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor':  ['vue', 'vue-router'],
          'gsap':    ['gsap'],
          'lottie':  ['@lottiefiles/dotlottie-vue', 'lottie-web'],
          'icons':   ['lucide-vue-next'],
        },
      },
    },
  },
})