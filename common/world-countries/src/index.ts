import worldCountries, { Country } from 'world-countries';
import filter from 'lodash-es/filter';
import lowerCase from 'lodash-es/lowerCase';
import { includesIgnoreCase } from '@cloud-dragon/common-utils';

const COUNTRIES = worldCountries as unknown as Country[];

const SUPPORTED_COUNTRY_CCA2_CODES = COUNTRIES.map((country) => country.cca2);

type SupportedCountryKeyProp = 'callingCode';

interface SearchCountryParams {
  keyProp?: SupportedCountryKeyProp;
  searchValue?: string;
  country: Country;
}

class CountriesManagerClass {
  public getCountryByCca2(cca2: string): Country | undefined {
    return COUNTRIES.find((country) => country.cca2 === cca2);
  }

  public getCommonName(country: Country): string {
    return country.name.common;
  }

  public getCallingCode(country: Country): string {
    const {
      idd: { root, suffixes },
    } = country;
    const suffix = suffixes.length === 1 ? suffixes[0] : '';
    return `${root}${suffix}`;
  }

  public getLocalNames(country: Country, languages: string[]): string[] {
    return filter(
      {
        ...country.translations,
        ...country.name.native,
      },
      (_value, key) => languages.includes(key)
    ).map((translation) => translation.common);
  }

  public getShowName(country: Country, subjectCountry?: Country): string {
    const languages = subjectCountry?.languages;
    if (!languages) {
      return this.getCommonName(country);
    }
    return (
      this.getLocalNames(country, Object.keys(languages))[0] ??
      this.getCommonName(country)
    );
  }

  public getFlagCdnUrl(country: Country): string {
    return `https://flagcdn.com/${lowerCase(country.cca2)}.svg`;
  }

  public getFlagEmoji(country: Country): string {
    return country.flag;
  }

  public getKeyPropValue(
    country: Country,
    keyProp?: SupportedCountryKeyProp
  ): string | null {
    switch (keyProp) {
      case 'callingCode': {
        return this.getCallingCode(country);
      }
      default: {
        return null;
      }
    }
  }

  public matchSearch(params: SearchCountryParams): boolean {
    const { keyProp, searchValue = '', country } = params;
    // try to match common name and local names
    const commonName = this.getCommonName(country);
    if (includesIgnoreCase(commonName, searchValue)) {
      return true;
    }
    const { languages } = country;
    const localNames = this.getLocalNames(country, Object.keys(languages));
    if (
      localNames.some((localName) => includesIgnoreCase(localName, searchValue))
    ) {
      return true;
    }
    // try to match key prop
    switch (keyProp) {
      case 'callingCode': {
        // match callingCode
        const callingCode = this.getCallingCode(country);
        return callingCode.includes(searchValue);
      }
      default: {
        return false;
      }
    }
  }
}

const CountriesManager = new CountriesManagerClass();

export {
  COUNTRIES,
  SUPPORTED_COUNTRY_CCA2_CODES,
  Country,
  SupportedCountryKeyProp,
  CountriesManager,
};
