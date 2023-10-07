import React from 'react';
import isFunction from 'lodash-es/isFunction';
import isString from 'lodash-es/isString';
import { TextStyle, ViewStyle } from 'react-native';
import { View } from '../view';
import { Text } from '../text';
import { Button } from '../button';
import { Icon } from '../icon';
import { ThemeStyle } from '../common';
import { TopNavigationProps } from './api';

function getRenderGoBack(props: any) {
  return () => {
    return (
      <Button
        variant="ghost"
        value={(accessoryProps) => (
          <Icon icon="arrow-left" {...accessoryProps} />
        )}
        {...props}
      />
    );
  };
}

export const TopNavigation = ({
  title,
  ts,
  style,
  goBack,
  renderLeft,
  renderRight,
}: TopNavigationProps) => {
  const textTs: ThemeStyle<TextStyle> = {
    fontSize: '$fontSize.xl',
    fontWeight: '$fontWeight.bold',
  };
  let computedRenderLeft = renderLeft;
  if (!computedRenderLeft && goBack) {
    computedRenderLeft = getRenderGoBack({ onPress: goBack });
  }
  const containerTs: ThemeStyle<ViewStyle> = {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '$color.bg.layout',
    height: '$size.10',
    ...ts,
  };
  return (
    <View style={style} ts={containerTs}>
      <View>{computedRenderLeft && computedRenderLeft()}</View>
      {isString(title) && <Text ts={textTs} value={title} />}
      {isFunction(title) && title({ textTs })}
      <View>{renderRight && renderRight()}</View>
    </View>
  );
};
