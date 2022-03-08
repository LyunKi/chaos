import en from './en'
import zh from './zh'
import { memoize } from 'lodash'
import i18n, { Scope, TranslateOptions } from 'i18n-js'
import Storage from '../utils/storage'

const LanguagePacks = {
  zh,
  en,
}

const translate = memoize(
  (key: Scope, config?: TranslateOptions) => i18n.t(key, config),
  (key: Scope, config?: TranslateOptions) =>
    config ? key + JSON.stringify(config) : key
)

const DEFAULT_LOCALE = 'zh'

const I18N_STORAGE_KEY = 'user_languages'

function detectLocale() {
  const languages = navigator.languages ?? [navigator.language]
  const avaliableLocales = Object.keys(LanguagePacks)
  for (const language of languages) {
    if (avaliableLocales.includes(language)) {
      return language
    }
  }
  return DEFAULT_LOCALE
}

class I18n {
  static async init() {
    const locale = await Storage.getOrInsert(I18N_STORAGE_KEY, detectLocale())
    i18n.translations = LanguagePacks
    i18n.defaultLocale = DEFAULT_LOCALE
    i18n.locale = locale
    i18n.fallbacks = true
  }
  static async updateLocale(locale: string) {
    if (translate.cache.clear) {
      translate.cache.clear()
    }
    await Storage.setItem(I18N_STORAGE_KEY, locale)
  }
  static t(key: Scope, config?: TranslateOptions) {
    return translate(key, config)
  }
}

export default I18n
