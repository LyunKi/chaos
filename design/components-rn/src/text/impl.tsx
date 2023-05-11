import React from 'react';
import { Text as RnText, StyleSheet } from 'react-native';
import { ThemeManager } from '../common';
import { TextProps } from './api';

export function Text({
  value,
  ts,
  style,
  numberOfLines,
  size = 'md',
}: TextProps) {
  const fontSize = `$fontSize.${size}`;
  const computedStyle = ThemeManager.themed({
    color: '$color.font.default',
    fontSize,
    ...ts,
  });
  return (
    <RnText
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([
        computedStyle,
        numberOfLines && {
          overflow: 'hidden',
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
