import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/plugin.js'),
      name: 'vue-input-facade',
      fileName: 'vue-input-facade',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [peerDepsExternal()]
    }
  }
})
