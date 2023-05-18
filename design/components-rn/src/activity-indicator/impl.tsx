import React from 'react';
import {
  ActivityIndicator as RnActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ThemeManager } from '../common';
import { ActivityIndicatorProps } from './api';

export const ActivityIndicator = ({
  size = 'md',
  color = '$color.font.default',
  style,
  ts,
  ...rest
}: ActivityIndicatorProps) => {
  const fontSize = `$fontSize.${size}`;
  const {
    size: computedFontSize,
    color: computedColor,
    ...computedStyle
  } = ThemeManager.themed({
    color,
    fontSize,
    ...ts,
  });
  return (
    <RnActivityIndicator
      {...rest}
      aria-label="Activity Indicator"
      style={StyleSheet.flatten([computedStyle, style])}
      size={computedFontSize}
      color={computedColor}
    />
  );
};
