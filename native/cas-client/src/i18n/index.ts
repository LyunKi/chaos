import en from './en'
import zh from './zh'
import Storage from '../utils/Storage'
import * as Localization from 'expo-localization'
import { memoize } from 'lodash'
import i18n, { Scope, TranslateOptions } from 'i18n-js'
import * as Updates from 'expo-updates'
import { I18nManager } from 'react-native'

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

class I18n {
  static async init() {
    const { isRTL, locale } = await Localization.getLocalizationAsync()
    const storedLocale = await Storage.getOrInsert(
      I18N_STORAGE_KEY,
      locale.split(/(_|-|[A-Z])/)[0]
    )
    i18n.translations = LanguagePacks
    i18n.defaultLocale = DEFAULT_LOCALE
    i18n.locale = storedLocale
    I18nManager.forceRTL(isRTL)
    i18n.fallbacks = true
  }
  static async updateLocale(locale: string) {
    if (translate.cache.clear) {
      translate.cache.clear()
    }
    await Storage.setItem(I18N_STORAGE_KEY, locale)
    await Updates.reloadAsync()
  }
  static t(key: Scope, config?: TranslateOptions) {
    return translate(key, config)
  }
}

export default I18n
