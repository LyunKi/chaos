import { Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import {
  Country,
  SupportedCountryKeyProp,
} from '@cloud-dragon/world-countries';

export interface CountryPickerProps {
  value?: string;
  keyProp?: SupportedCountryKeyProp;
  onChange?: Fn;
  hideFilter?: boolean;
  title?: ReactNode;
}

export interface CountryItemProps {
  country: Country;
  selectedCountry?: Country;
  keyProp?: SupportedCountryKeyProp;
  onChange?: Fn;
}
