import { AnimationConfig, SupportedAnimation } from '../common/animation';
import { IconRegistry } from './registry';

export type IconAnimationProp = {
  type: SupportedAnimation;
  config?: AnimationConfig;
};

export interface IconProps {
  name: keyof typeof IconRegistry;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  animation?: IconAnimationProp;
}

export interface IconRef {
  startAnimation?: Function;
  stopAnimation?: Function;
}
