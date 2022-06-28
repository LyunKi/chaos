import map from 'lodash/map'
import countries from './countries.json'

export * from './urls'
export * from './regex'

const COUNTRIES = map(countries, (country, countryCode) => {
  const { name } = country
  const commonName = name.common
  return {
    ...country,
    countryCode,
    callingCode: `+${country.callingCode[0]}`,
    name: {
      common: name.common,
      zh: name.zho ?? commonName,
      en: commonName,
    },
  }
})

export { COUNTRIES }
