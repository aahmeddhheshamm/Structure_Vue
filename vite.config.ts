import { fileURLToPath, URL } from 'node:url'
// import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    // VueI18nPlugin({
    //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    //   runtimeOnly: false,
    //   compositionOnly: true,
    //   fullInstall: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
