import en from './en'
import zh from './zh'
import Storage from '../utils/Storage'
import * as Localization from 'expo-localization'
import { memoize } from 'lodash'
import i18n, { Scope, TranslateOptions } from 'i18n-js'
import * as Updates from 'expo-updates'
import { I18nManager } from 'react-native'
import { COUNTRIES, CountryCode } from './countries'

const LanguagePacks = {
  zh,
  en,
}

const translate = memoize(
  (key: Scope, config?: TranslateOptions) => i18n.t(key, config),
  (key: Scope, config?: TranslateOptions) =>
    config ? key + JSON.stringify(config) : key
)

export type SupportedLocale = 'zh' | 'en'

const DEFAULT_LOCALE: SupportedLocale = 'zh'

const ENGLISH_LOCALE: SupportedLocale = 'en'

const DEFAULT_COUNTRY: CountryCode = 'CN'

const I18N_STORAGE_KEY = 'user_languages'

function formatLocale(locale: string): SupportedLocale {
  return locale.startsWith(DEFAULT_LOCALE) ? DEFAULT_LOCALE : ENGLISH_LOCALE
}

class I18n {
  static localization: Localization.Localization

  static get country() {
    const { region } = I18n.localization ?? {}
    const countryCode = I18n.isValidCountryCode(region)
      ? region
      : DEFAULT_COUNTRY
    return I18n.getCountryByCode(countryCode)
  }

  static get currentLocale(): SupportedLocale {
    return formatLocale(I18n.localization?.locale)
  }

  static async init() {
    const userLocalization = (await Localization.getLocalizationAsync()) ?? {}
    userLocalization.locale = formatLocale(userLocalization?.locale)
    const storedLocalization = await Storage.getOrInsert(
      I18N_STORAGE_KEY,
      userLocalization
    )
    I18n.localization = storedLocalization

    const { isRTL, locale } = I18n.localization
    i18n.translations = LanguagePacks
    i18n.defaultLocale = DEFAULT_LOCALE
    i18n.locale = locale
    i18n.fallbacks = true
    I18nManager.forceRTL(isRTL)
  }

  static async updateLocale(locale: SupportedLocale) {
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
      ...COUNTRIES[code],
      countryCode: code,
    }
  }

  static isValidCountryCode(code?: string | null): code is CountryCode {
    return !!(code && COUNTRIES[code as CountryCode] !== undefined)
  }
}

export default I18n
export { COUNTRIES } from './countries'
