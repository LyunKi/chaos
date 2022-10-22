import { isString } from 'lodash'
export interface LanguagePack {
  code: string
  quality: number
  region?: string
}

export const AcceptLanguageParser = {
  parse: (acceptLanguages: string | string[] = []): LanguagePack[] => {
    const languageArray = isString(acceptLanguages)
      ? acceptLanguages.split(',')
      : acceptLanguages
    return (
      languageArray
        .map((languageStr) => {
          const [locale, quality] = languageStr.split(';q=')
          const [code, region] = locale.split('-')
          return {
            code,
            region,
            quality: quality ? parseFloat(quality) : 1,
          }
        })
        .sort((a, b) => {
          return b.quality - a.quality
        }) ?? []
    )
  },

  pick: (acceptLanguageStr: string, supportedLanguages: string[]) => {
    const languagePacks = AcceptLanguageParser.parse(acceptLanguageStr)
    return languagePacks
      .map((pack) => {
        const { code, region } = pack
        let langauge = code
        if (region) {
          langauge += `-${region}`
        }
        return langauge
      })
      .find((langauge) => {
        return supportedLanguages.includes(langauge)
      })
  },
}
