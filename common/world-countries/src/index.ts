import worldCountries, { Country } from 'world-countries';

const COUNTRIES = worldCountries as unknown as Country[];

const SUPPORTED_COUNTRY_CCA2_CODES = COUNTRIES.map((country) => country.cca2);

class CountriesManager {
  public static getCountryByCca2(cca2: string): Country | undefined {
    return COUNTRIES.find((country) => country.cca2 === cca2);
  }
}

export { COUNTRIES, SUPPORTED_COUNTRY_CCA2_CODES, Country, CountriesManager };
