import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const basePath = process.env.VERDUN_BASE_PATH ?? process.env.WORKBENCH_BASE_PATH ?? '/'

export default defineConfig({
  base: basePath,
  build: {
    outDir: process.env.FIRSTPAIR_BUILD_OUT_DIR ?? 'site-dist',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lucide/vue': fileURLToPath(new URL('./node_modules/@lucide/vue/dist/esm/lucide-vue.mjs', import.meta.url)),
      vue: fileURLToPath(new URL('./node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url)),
    },
    dedupe: ['@lucide/vue', 'vue'],
  },
  plugins: [vue()],
})
