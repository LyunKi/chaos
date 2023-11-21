import { find, isString, kebabCase, upperCase } from 'lodash-es';

export interface LanguagePack {
  code: string;
  quality: number;
  region?: string;
  origin: string;
  formatted: string;
}

export const AcceptLanguageParser = {
  formatLanguageStr(languageStr: string) {
    const [locale, quality] = languageStr.split(';q=');
    const tmp = kebabCase(locale);
    const [code, region] = tmp.split(/[_-]/);
    let formattedRegion = region;
    let formatted = code;
    if (formattedRegion) {
      formattedRegion = upperCase(region);
      formatted = `${formatted}-${formattedRegion}`;
    }
    return {
      code,
      region: formattedRegion,
      quality: quality ? parseFloat(quality) : 1,
      origin: languageStr,
      formatted,
    };
  },
  parse(acceptLanguages: string | string[] = []): LanguagePack[] {
    const languageArray = isString(acceptLanguages)
      ? acceptLanguages.split(',')
      : acceptLanguages;
    return (
      languageArray
        .map((languageStr) => {
          return AcceptLanguageParser.formatLanguageStr(languageStr);
        })
        .sort((a, b) => {
          return b.quality - a.quality;
        }) ?? []
    );
  },

  pick(acceptLanguageStr: string, supportedLanguages: string[]) {
    const formattedLanguagePacks = AcceptLanguageParser.parse(
      acceptLanguageStr
    ).map((languagePack) => languagePack.formatted);
    return find(supportedLanguages, (supportedLanguage) => {
      const formattedSupportLanguage =
        AcceptLanguageParser.formatLanguageStr(supportedLanguage);
      return formattedLanguagePacks.includes(
        formattedSupportLanguage.formatted
      );
    });
  },
};
