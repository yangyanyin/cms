import { createApp } from 'vue'
import { router } from './router'
import store from './store'
import { setupI18n, loadLocaleMessages, setI18nLanguage } from './i18n'
import App from './App.vue'

const i18n = setupI18n()
const app = createApp(App)


router.beforeEach(async (to, from, next) => {
  
  const paramsLang = sessionStorage.getItem('lang') || 'zh'

  if (!['zh', 'en'].includes(paramsLang)) {
    return next(`/${paramsLang}`)
  }
  if (!i18n.global.availableLocales.includes(paramsLang)) {
    await loadLocaleMessages(paramsLang)
  }
  setI18nLanguage(paramsLang)
  return next()
})

app.use(router)
app.use(i18n)
app.use(store)
app.mount('#app')
