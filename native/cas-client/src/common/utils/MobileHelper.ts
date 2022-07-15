import * as MobileLib from 'libphonenumber-js'
import { COUNTRIES, CountryCode } from '../../i18n/countries'

export interface Mobile {
  countryCode: CountryCode
  number: String
}
export default class MobileHelper {
  static formatMobile(mobile: Mobile): string {
    return `${COUNTRIES[mobile.countryCode]?.callingCode}${mobile.number}`
  }
  static isValid(mobile: Mobile): boolean {
    return MobileLib.isValidPhoneNumber(MobileHelper.formatMobile(mobile))
  }
}
