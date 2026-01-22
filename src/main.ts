import { createApp, markRaw } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import './assets/styles/main.scss'
import AR from './locales/ar.json'
import EN from './locales/en.json'
import App from './App.vue'
import {globalPlugins} from "./plugins";

const i18n = createI18n({
    legacy: false,
    // locale: 'EN',
    messages: {
        EN,
        AR
    }
})

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})
globalPlugins(app)
app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')