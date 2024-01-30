import { ComponentType } from 'react';
import {
  AnimationConfig,
  SupportedAnimation,
  CloudDesignWrap,
} from '../common';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextStyle } from 'react-native';

export type IconAnimationProp = {
  type: SupportedAnimation;
  config?: AnimationConfig;
};

export type PresetIcons = React.ComponentProps<typeof MaterialIcons>['name'];

export type IconComponentProps = {
  name?: PresetIcons;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  fill?: string;
  style: {
    width?: number;
    height?: number;
    color?: string;
    fill?: string;
  };
};

export type IconComponent = PresetIcons | ComponentType<IconComponentProps>;

export type IconProps = CloudDesignWrap<
  {
    icon: IconComponent;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    color?: string;
    animation?: IconAnimationProp;
  },
  TextStyle
>;

export interface IconRef {
  startAnimation?: Function;
  stopAnimation?: Function;
}
