import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeManager } from '../common';
import { SafeAreaProps } from './api';
import { View } from '../view';

export const SafeArea = (props: SafeAreaProps) => {
  const { style, ...rest } = props;
  const { top, left, right, bottom } = useSafeAreaInsets();
  return (
    <View
      style={StyleSheet.flatten([
        style,
        {
          paddingTop: top,
          paddingRight: right,
          paddingBottom: bottom,
          paddingLeft: left,
        },
      ])}
      {...rest}
    />
  );
};
