import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n('zh')
export function setupI18n() {
  setI18nLanguage()
  return i18n
}

export function setI18nLanguage(locale = 'zh') {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}


export async function loadLocaleMessages(locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./assets/langs/${locale}.json`
  )
  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)
  setI18nLanguage(locale)

  return nextTick()
}
