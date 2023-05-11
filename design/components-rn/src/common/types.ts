import { KV, Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import { StyleProp } from 'react-native';
import { COUNTRIES } from './constants';

export type CloudDesignTheme = KV<any>;

export type ThemeMode = 'light' | 'dark';

export type ThemePack = {
  light: CloudDesignTheme;
  dark: CloudDesignTheme;
};

export type ThemeStyle = KV;

export type Themed<Props = any, Component = any> = Props & {
  ts?: ThemeStyle;
  style?: StyleProp<Component>;
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
