import { Fn } from '@cloud-dragon/common-types';
import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { AccessoryRenderProp, CloudDesignWrap, ThemeStyle } from '../common';

interface TitleProps {
  textTs: ThemeStyle<TextStyle>;
}

export interface BasicTopNavigationProps {
  title?: string | Fn<[TitleProps], ReactNode>;
  goBack?: Fn;
  renderLeft?: AccessoryRenderProp;
  renderRight?: AccessoryRenderProp;
}

export type TopNavigationProps = CloudDesignWrap<
  BasicTopNavigationProps,
  ViewStyle
>;
