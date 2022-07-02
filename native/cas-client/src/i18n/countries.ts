import countries from '../constants/countries.json'
import mapValues from 'lodash/mapValues'

export type CountryCode = keyof typeof countries

export type Country = {
  countryCode: CountryCode
  callingCode: string
  flag: string
  name: {
    common: string
    zh: string
    en: string
  }
}
export const COUNTRIES = mapValues(countries, (country, countryCode) => {
  const { name } = country
  const commonName = name.common
  return {
    ...country,
    countryCode,
    callingCode: `+${country.callingCode[0]}`,
    name: {
      common: name.common,
      zh: (name as any).zho ?? commonName,
      en: commonName,
    },
  } as Country
})

export type CountryCurrentPropKey = Exclude<keyof Country, 'name'>
