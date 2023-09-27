import { ComponentType } from 'react';
import { Testable, AnimationConfig, SupportedAnimation } from '../common';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type IconAnimationProp = {
  type: SupportedAnimation;
  config?: AnimationConfig;
};

export type PresetIcons = React.ComponentProps<typeof FontAwesome>['name'];

export type IconComponentProps = {
  name?: PresetIcons;
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
