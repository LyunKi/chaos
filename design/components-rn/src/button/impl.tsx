import React from 'react';
import { Pressable } from 'react-native';
import { KV } from '@cloud-dragon/common-types';
import { isFunction, isString } from 'lodash';
import { styles, buildString, opacityColor } from '@cloud-dragon/common-utils';
import { View } from '../view';
import { Text } from '../text';
import { ActivityIndicator } from '../activity-indicator';
import { ThemeManager } from '../common';
import { ButtonProps } from './api';

function computeStyles({
  variant,
  disabled,
  status,
  actived,
  hovered,
}: any): any {
  const fontColor = `$color.button.${status}.${variant}.font`;
  const activedFontColor = `$color.button.${status}.${variant}.font-active`;
  const bgOpacity =
    ThemeManager.themedValue(
      buildString(`$color.button.${status}.${variant}.bgOpacity`, {
        '-hover': !actived && hovered,
        '-active': actived,
      })
    ) ?? 1;
  const bg = opacityColor(
    buildString(`$color.button.${status}.${variant}.bg`, {
      '-hover': !actived && hovered,
      '-active': actived,
    }),
    bgOpacity
  );
  const outlineColor = buildString(`$color.button.${status}.outlineColor`);
  return {
    computedViewStyle: {
      backgroundColor: bg,
      ...styles(
        [
          disabled,
          {
            cursor: 'not-allowed',
            opacity: `$opacity.disabled`,
          },
        ],
        [
          variant === 'outline',
          {
            outlineColor: outlineColor,
            outlineWidth: 1,
            outlineStyle: 'solid',
          },
        ]
      ),
    },
    computedTextStyle: {
      color: fontColor,
      ...styles(
        [
          variant === 'link' && (hovered || actived),
          {
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: fontColor,
          },
        ],
        [
          actived,
          {
            color: activedFontColor,
            textDecorationColor: activedFontColor,
          },
        ]
      ),
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
  onBlur,
  onFocus,
  onLongPress,
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
      onLongPress={onLongPress}
      onBlur={onBlur}
      onFocus={onFocus}
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
              outline: 'unset',
              boxSizing: 'border-box',
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
