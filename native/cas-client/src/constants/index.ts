import countries from './countries.json'

export * from './urls'
export * from './regex'

const CountryList = Object.entries(countries).map(([countryCode, country]) => {
  const { name } = country
  const commonName = name.common
  return {
    ...country,
    countryCode,
    callingCode: country.callingCode[0],
    name: {
      common: name.common,
      zh: name.zho ?? commonName,
      en: commonName,
    },
  }
})

export { countries as Countries, CountryList }
