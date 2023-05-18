import React from 'react';
import { Pressable } from 'react-native';
import { KV } from '@cloud-dragon/common-types';
import { isFunction, isString } from 'lodash';
import { styles, buildString } from '@cloud-dragon/common-utils';
import { View } from '../view';
import { Text } from '../text';
import { ActivityIndicator } from '../activity-indicator';
import { ButtonProps } from './api';

function computeStyles({
  variant,
  disabled,
  status,
  actived,
  hovered,
}: any): any {
  const fontColor = `$color.button.${status}.font`;
  const bg = buildString(`$color.button.${status}.${variant}.bg`, {
    '-hover': !actived && hovered,
    '-active': actived,
  });
  console.log('bg', bg);
  return {
    computedViewStyle: {
      backgroundColor: bg,
      ...styles([
        disabled,
        {
          cursor: 'not-allowed',
          opacity: `$opacity.disabled`,
        },
      ]),
    },
    computedTextStyle: {
      color: fontColor,
    },
  };
}

export function Button({
  value,
  ts,
  style,
  variant = 'solid',
  status = 'normal',
  textTs,
  onPress,
  renderLeft,
  renderRight,
  viewRef,
  isActive,
  loading,
  loadingText,
  disabled,
  testID,
}: ButtonProps) {
  return (
    <Pressable
      testID={testID}
      pointerEvents="auto"
      disabled={disabled || loading}
      onPress={onPress}
    >
      {({ pressed, hovered }: any) => {
        const { computedViewStyle, computedTextStyle } = computeStyles({
          variant,
          status,
          actived: isActive || pressed,
          disabled: disabled || loading,
          hovered,
        });
        const mergedTs: KV = {
          fontSize: '$fontSize.md',
          fontWeight: '$fontWeight.semibold',
          ...computedTextStyle,
          ...textTs,
        };
        const accessoryProps = {
          color: mergedTs.color,
          size: mergedTs.fontSize,
        };
        return (
          <View
            ref={viewRef}
            ts={{
              borderRadius: '$radius.md',
              alignItems: 'center',
              justifyContent: 'center',
              height: '$size.10',
              paddingHorizontal: '$space.3',
              gap: '$rem:0.5',
              outline: 'none',
              ...computedViewStyle,
              ...ts,
            }}
            style={style}
          >
            {renderLeft && renderLeft(accessoryProps)}
            {loading && (
              <View ts={{ gap: '$rem:0.5', alignItems: 'center' }}>
                <ActivityIndicator {...accessoryProps} />
                {loadingText && <Text ts={mergedTs} value={loadingText} />}
              </View>
            )}
            {!loading && isString(value) && (
              <Text ts={mergedTs} value={value} />
            )}
            {!loading && isFunction(value) && value(accessoryProps)}
            {renderRight && renderRight(accessoryProps)}
          </View>
        );
      }}
    </Pressable>
  );
}
