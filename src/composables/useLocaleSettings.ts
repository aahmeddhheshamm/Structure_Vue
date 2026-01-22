import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
export const useLocaleSettings = () => {
  const { getLocaleMessage, locale, t } = useI18n({ useScope: 'global' })

  const direction = computed(() => {
    return locale.value === 'EN' ? 'ltr' : 'rtl'
  })

  const isRtl = computed(() => {
    return direction.value == 'rtl' ? true : false
  })

  const changeLocale = () => {
    if (locale.value === 'EN') {
      locale.value = 'AR'
      document.body.style.fontFamily = 'Cairo'
      document.body.setAttribute('dir', direction.value)
      localStorage.setItem('locale', locale.value)
    } else {
      locale.value = 'EN'
      document.body.style.fontFamily = 'Lexend'
      document.body.setAttribute('dir', direction.value)
      localStorage.setItem('locale', locale.value)
    }
  }

  return { getLocaleMessage, t, changeLocale, direction, locale, isRtl }
}
