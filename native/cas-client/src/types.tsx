/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Fn } from './common/types'
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
    countryCode: CountryCode
    keyProp?: CountryCurrentPropKey
    onChange?: Fn
  }
}
