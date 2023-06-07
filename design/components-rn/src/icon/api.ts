import { ComponentType } from 'react';
import { Testable, AnimationConfig, SupportedAnimation } from '../common';
import { IconRegistry } from './generated';

export type IconAnimationProp = {
  type: SupportedAnimation;
  config?: AnimationConfig;
};

export type PresetIcons = keyof typeof IconRegistry;

export type IconComponentProps = {
  size: number;
  width: number;
  height: number;
  color: string;
  style: {
    width: number;
    height: number;
    color: string;
  };
};

export type IconComponent = PresetIcons | ComponentType<IconComponentProps>;

export type IconProps = Testable<{
  icon: IconComponent;
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
