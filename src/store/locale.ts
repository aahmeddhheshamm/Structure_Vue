import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export type Locale = {
  lang: 'AR' | 'EN'
  direction: 'rtl' | 'ltr'
  font: 'Cairo' | 'Lexend'
}

export const useLocaleStore = defineStore('locale', () => {
  const { locale: i18nLanguage } = useI18n({ useScope: 'global' })

  const currentLocale = ref<Locale>(getLocale() || { lang: 'EN', direction: 'ltr', font: 'Lexend' })

  const direction = computed(() => {
    return i18nLanguage.value === 'EN' ? 'ltr' : 'rtl'
  })

  const setLocale = (locale: Locale) => {
    localStorage.setItem('locale', JSON.stringify(locale))
    currentLocale.value = locale
    i18nLanguage.value = locale.lang
    document.body.style.fontFamily = locale.font
    document.body.setAttribute('dir', direction.value)
  }

  function getLocale() {
    return JSON.parse(localStorage.getItem('locale')!) as Locale
  }

  const toggleLocale = async () => {
    const activeLocale = JSON.parse(localStorage.getItem('locale')!)
    if (activeLocale.lang === 'EN') {
      const locale = { lang: 'AR', direction: 'rtl', font: 'Cairo' }
      setLocale(locale as Locale)
    } else {
      const locale = { lang: 'EN', direction: 'ltr', font: 'Lexend' }
      setLocale(locale as Locale)
    }
  }

  return { toggleLocale, currentLocale, setLocale }
})
