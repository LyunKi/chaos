import { KV, Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import { COUNTRIES } from './constants';

export type CloudDesignTheme = KV<any>;

export type ThemePack = KV<CloudDesignTheme>;

export type ThemeStyle = KV;

export type RnStyle = KV;

export type Themeable<Props = any> = Props & {
  ts?: ThemeStyle;
  style?: RnStyle;
};

export type RenderProp<T extends any[] = any[]> = Fn<T, ReactNode>;

export type Id = string | number;

export interface AccessoryProps {
  color: string;
  size: number;
}

export type AccessoryRenderProp = (props?: AccessoryProps) => ReactNode;

export interface FormError {
  type: 'warning' | 'error';
  msg: string;
}

export type CountryCode = keyof typeof COUNTRIES;

export type SupportedLocale = 'zh_CN' | 'en_US';

export type Country = (typeof COUNTRIES)['CN'];

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Status = 'success' | 'error' | 'warning' | 'info';

export interface MaskProps {
  ts?: KV;
  disableCloseOnPress?: boolean;
}
