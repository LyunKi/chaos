import I18n, { CountryCode } from '../i18n'
import * as MobileLib from 'libphonenumber-js'

export default class Mobile {
  countryCode: CountryCode
  number: String
  get mobile() {
    return `+${I18n.getCountryByCode(this.countryCode).callingCode[0]}${
      this.number
    }`
  }
  constructor(countryCode: CountryCode, number: String) {
    this.countryCode = countryCode
    this.number = number
  }
  isValid() {
    return MobileLib.isValidPhoneNumber(this.mobile)
  }
}
