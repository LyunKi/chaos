import React from 'react';
import { Platform, Text as RnText, StyleSheet } from 'react-native';
import { ThemeManager } from '../common';
import { TextProps } from './api';

export function Text({
  value,
  ts,
  style,
  numberOfLines,
  size = 'md',
  testID,
}: TextProps) {
  const fontSize = `$fontSize.${size}`;
  const computedStyle = ThemeManager.themed({
    color: '$color.font.default',
    fontSize,
    ...ts,
  });
  computedStyle.lineHeight = 1.5 * computedStyle.fontSize;
  return (
    <RnText
      testID={testID}
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([
        computedStyle,
        numberOfLines &&
          Platform.OS === 'web' && {
            overflow: 'hidden',
            whiteSpace: 'normal',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: numberOfLines,
          },
        style,
      ])}
    >
      {value}
    </RnText>
  );
}
