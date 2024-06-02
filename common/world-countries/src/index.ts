import { includesIgnoreCase } from '@cloud-dragon/common-utils';
import { filter, first, isEmpty, map } from 'lodash-es';
import lowerCase from 'lodash-es/lowerCase';
import { type Country } from 'world-countries';
import worldCountries from './assets/world-countries.json';

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

  public getNativeNames(country: Country) {
    return map(country.name.native, (value) => value.common);
  }

  public getCalledNames(country: Country) {
    return map(country.translations, (e) => e.common);
  }

  public getShowName(country: Country, subjectCountry?: Country): string {
    // 优先显示目标国家称呼
    const languages = Object.keys(subjectCountry?.languages ?? {});
    let name;
    if (!isEmpty(languages)) {
      name = first(
        filter(country.translations, (_translation, key) =>
          languages.includes(key)
        ).map((translation) => translation.common)
      );
    }
    // 随后现实该国家的自称
    name ??= first(this.getNativeNames(country));
    // 最后显示国家的通用名
    name ??= this.getCommonName(country);
    return name;
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
    if (
      this.getNativeNames(country).some((element) =>
        includesIgnoreCase(element, searchValue)
      )
    ) {
      return true;
    }
    if (
      this.getCalledNames(country).some((element) =>
        includesIgnoreCase(element, searchValue)
      )
    ) {
      return true;
    }
    const keyPropValue = this.getKeyPropValue(country, keyProp);
    return keyPropValue?.includes(searchValue) ?? false;
  }
}

const CountriesManager = new CountriesManagerClass();

export {
  COUNTRIES,
  CountriesManager,
  Country,
  SUPPORTED_COUNTRY_CCA2_CODES,
  SupportedCountryKeyProp,
};
