import { createApp, markRaw } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import router from './router'
import './assets/styles/main.scss'
import App from './App.vue'
import {globalPlugins} from "./plugins";

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
})

globalPlugins(app)
app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')