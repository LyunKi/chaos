import React, { Ref } from 'react';
import { Animated } from 'react-native';
import { isString } from 'lodash';
import { getIconAnimation, ThemeManager } from '../common';
import { IconRegistry } from './generated';
import { IconProps, IconRef } from './api';

export const Icon = React.forwardRef(
  (
    {
      icon,
      width,
      height,
      size = '$rem:1',
      color = '$color.font.default',
      animation,
      testID,
    }: IconProps,
    ref: Ref<IconRef>
  ) => {
    const Icon = isString(icon) ? IconRegistry[icon] : icon;
    const animationInstance = React.useMemo(() => {
      if (!animation) {
        return;
      }
      const { type, config } = animation;
      return getIconAnimation(type, config);
    }, [animation]);
    React.useImperativeHandle(ref, () => {
      return {
        startAnimation: animationInstance?.start,
        stopAnimation: animationInstance?.stop,
      };
    });
    return Icon ? (
      <Animated.View {...animationInstance?.toProps()} testID={testID}>
        {React.createElement(
          Icon,
          ThemeManager.themed({
            width: width ?? size,
            height: height ?? size,
            fill: color,
          })
        )}
      </Animated.View>
    ) : null;
  }
);
