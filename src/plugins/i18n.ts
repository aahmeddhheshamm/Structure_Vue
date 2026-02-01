// plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import AR from '@/locales/ar.json'
import EN from '@/locales/en.json'

const savedLocale = localStorage.getItem('locale') || 'EN'

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'EN',
  globalInjection: true,
  messages: {
    EN,
    AR,
  },
})

export default i18n
