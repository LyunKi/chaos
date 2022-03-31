import I18n, { CountryCode } from '../i18n'
import * as MobileLib from 'libphonenumber-js'

export interface Mobile {
  countryCode: CountryCode
  number: String
}
export default class MobileHelper {
  static formatMobile(mobile: Mobile): string{
    return `+${I18n.getCountryByCode(mobile.countryCode).callingCode[0]}${
      mobile.number
    }`
  }
  static isValid(mobile: Mobile):boolean{
    return MobileLib.isValidPhoneNumber(MobileHelper.formatMobile(mobile));
  }
}
