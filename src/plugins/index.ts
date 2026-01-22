import type {App} from 'vue'
import ToastPlugin from './toast';

import PrimeVue from 'primevue/config'

import Aura from '@primevue/themes/aura'
// import i18n from '@plugins/i18n'

export function globalPlugins(app: App<Element>) {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark'
      }
    }
  })
  app.use(ToastPlugin,{
    autoClose: 3000,
    position: 'top-center',
    clearOnUrlChange:false
  })
  // app.use(i18n)
}
