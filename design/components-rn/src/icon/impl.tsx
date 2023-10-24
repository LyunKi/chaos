import React, { Ref } from 'react';
import { Animated } from 'react-native';
import isString from 'lodash-es/isString';
import { getIconAnimation, ThemeManager } from '../common';
import { IconComponentProps, IconProps, IconRef } from './api';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
    let Icon: any = icon;
    const props = ThemeManager.themed({
      width: width ?? size,
      height: height ?? size,
      size,
      color,
    });
    if (isString(icon)) {
      Icon = FontAwesome;
      props.name = icon;
    }
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
    props.iconStyle = props.style = {
      width: props.width,
      height: props.height,
      fontSize: props.height,
      lineHeight: props.height,
      color: props.color,
      marginRight: 0,
      textAlign: 'center',
    };
    return Icon ? (
      <Animated.View {...animationInstance?.toProps()} testID={testID}>
        {React.createElement(Icon, props as IconComponentProps)}
      </Animated.View>
    ) : null;
  }
);
