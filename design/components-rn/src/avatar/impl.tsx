import React from 'react';
import { Image, ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { ThemeManager, ThemeStyle } from '../common';
import { Icon } from '../icon';
import { View } from '../view';
import { AvatarProps } from './api';

export const Avatar: React.FC<AvatarProps> = ({
  ts,
  style,
  size = '$size.6',
  src,
}) => {
  const themeStyle: ThemeStyle<ViewStyle & ImageStyle> = {
    borderRadius: '$radius.full',
    width: size,
    height: size,
    ...ts,
  };
  const computedStyle = StyleSheet.flatten([themeStyle, style]);
  if (!src) {
    return (
      <View
        ts={{
          backgroundColor: '$color.gray.400',
          ...computedStyle,
        }}
      >
        <Icon color="white" icon="perm-identity" size={size} />
      </View>
    );
  }
  return <Image style={ThemeManager.themed(computedStyle)} source={src} />;
};
