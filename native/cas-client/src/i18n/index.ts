import en from './en'
import zh from './zh'
import Storage from '../utils/Storage'
import * as Localization from 'expo-localization'
import { memoize } from 'lodash'
import i18n, { Scope, TranslateOptions } from 'i18n-js'
import * as Updates from 'expo-updates'
import { I18nManager } from 'react-native'
import { Countries } from '../constants'

const LanguagePacks = {
  zh,
  en,
}

const translate = memoize(
  (key: Scope, config?: TranslateOptions) => i18n.t(key, config),
  (key: Scope, config?: TranslateOptions) =>
    config ? key + JSON.stringify(config) : key
)

export type Country = {
  countryCode: CountryCode
  name: {
    common: string
  }
}

export type CountryCode = keyof typeof Countries

const DEFAULT_LOCALE = 'zh'

const DEFAULT_COUNTRY: CountryCode = 'CN'

const I18N_STORAGE_KEY = 'user_languages'

class I18n {
  static localization: Localization.Localization
  static get country() {
    const { region } = I18n.localization ?? {}
    const countryCode = I18n.isValidCountryCode(region)
      ? region
      : DEFAULT_COUNTRY
    return I18n.getCountryByCode(countryCode)
  }
  static async init() {
    const userLocalization = (await Localization.getLocalizationAsync()) ?? {}
    const storedLocalization = await Storage.getOrInsert(
      I18N_STORAGE_KEY,
      userLocalization
    )
    I18n.localization = storedLocalization
    const { isRTL, locale } = storedLocalization
    i18n.translations = LanguagePacks
    i18n.defaultLocale = DEFAULT_LOCALE
    i18n.locale = locale
    I18nManager.forceRTL(isRTL)
    i18n.fallbacks = true
  }
  static async updateLocale(locale: string) {
    if (translate.cache.clear) {
      translate.cache.clear()
    }
    I18n.localization.locale = locale
    await Storage.setItem(I18N_STORAGE_KEY, I18n.localization)
    await Updates.reloadAsync()
  }
  static t(key: Scope, config?: TranslateOptions) {
    return translate(key, config)
  }
  static getCountryByCode(code: CountryCode) {
    return {
      ...Countries[code],
      countryCode: code,
    }
  }
  static isValidCountryCode(code?: string | null): code is CountryCode {
    return !!(code && Countries[code as CountryCode] !== undefined)
  }
}

export default I18n
