import { ViewStyle } from 'react-native';
import { Animation, AnimationConfig } from './animation';
import { ZoomAnimation } from './zoomAnimation';
import { PulseAnimation } from './pulseAnimation';
import { ShakeAnimation } from './shakeAnimation';

export type { AnimationConfig };

export type IconAnimation = Animation<AnimationConfig, ViewStyle>;

export interface IconAnimationRegistry {
  zoom: IconAnimation;
  pulse: IconAnimation;
  shake: IconAnimation;
}

export type SupportedAnimation = keyof IconAnimationRegistry;

export function getIconAnimation(
  animation?: SupportedAnimation,
  config?: AnimationConfig
): IconAnimation | undefined {
  switch (animation) {
    case 'zoom':
      return new ZoomAnimation(config) as IconAnimation;
    case 'pulse':
      return new PulseAnimation(config) as IconAnimation;
    case 'shake':
      return new ShakeAnimation(config) as IconAnimation;
  }
}
