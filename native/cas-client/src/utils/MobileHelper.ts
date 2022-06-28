import I18n from '../i18n'
import * as MobileLib from 'libphonenumber-js'
import { CountryCode } from '../i18n/countries'

export interface Mobile {
  countryCode: CountryCode
  number: String
}
export default class MobileHelper {
  static formatMobile(mobile: Mobile): string {
    return `${I18n.getCountryByCode(mobile.countryCode).callingCode}${
      mobile.number
    }`
  }
  static isValid(mobile: Mobile): boolean {
    return MobileLib.isValidPhoneNumber(MobileHelper.formatMobile(mobile))
  }
}
