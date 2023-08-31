import { Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import { Country } from '@cloud-dragon/world-countries';

export type CountryCurrentPropKey = keyof Country;

export interface CountryPickerProps {
  value?: string;
  keyProp?: CountryCurrentPropKey;
  onChange?: Fn;
  hideFilter?: boolean;
  title?: ReactNode;
}

export interface CountryItemProps {
  country: Country;
  selectedCountry?: Country;
  keyProp?: CountryCurrentPropKey;
}
