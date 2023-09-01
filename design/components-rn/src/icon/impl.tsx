import React, { Ref } from 'react';
import { Animated } from 'react-native';
import isString from 'lodash-es/isString';
import { getIconAnimation, ThemeManager } from '../common';
import { IconRegistry } from './generated';
import { IconComponentProps, IconProps, IconRef } from './api';

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
    const props = ThemeManager.themed({
      width: width ?? size,
      height: height ?? size,
      size,
      fill: color,
      color: color,
    });
    props.style = {
      width: props.width,
      height: props.height,
      color: props.color,
    };
    return Icon ? (
      <Animated.View {...animationInstance?.toProps()} testID={testID}>
        {React.createElement(Icon, props as IconComponentProps)}
      </Animated.View>
    ) : null;
  }
);
