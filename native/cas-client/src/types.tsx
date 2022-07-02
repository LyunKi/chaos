/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CountryCode, CountryCurrentPropKey } from './i18n/countries'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined
  SignUp: undefined
  CountryPicker: {
    keyProp?: CountryCurrentPropKey
    countryCode?: CountryCode
  }
}
