import { Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import {
  Country,
  SupportedCountryKeyProp,
} from '@cloud-dragon/world-countries';
import { ViewStyle } from 'react-native';
import { CloudDesignWrap } from '../common';

export type CountryPickerProps = CloudDesignWrap<
  {
    value?: string;
    keyProp?: SupportedCountryKeyProp;
    onChange?: Fn;
    hideFilter?: boolean;
    title?: ReactNode;
  },
  ViewStyle
>;

export type CountryItemProps = {
  country: Country;
  selectedCountry?: Country;
  keyProp?: SupportedCountryKeyProp;
  onChange?: Fn;
};
