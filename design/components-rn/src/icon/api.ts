import { SvgProps } from 'react-native-svg';
import { ComponentType } from 'react';
import { Testable, AnimationConfig, SupportedAnimation } from '../common';
import { IconRegistry } from './registry';

export type IconAnimationProp = {
  type: SupportedAnimation;
  config?: AnimationConfig;
};

export type PresetIcons = keyof typeof IconRegistry;

export type IconProps = Testable<{
  icon: PresetIcons | ComponentType<SvgProps>;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  animation?: IconAnimationProp;
}>;

export interface IconRef {
  startAnimation?: Function;
  stopAnimation?: Function;
}
