import React from 'react';
import { Pressable } from 'react-native';
import { KV } from '@cloud-dragon/common-types';
import isFunction from 'lodash-es/isFunction';
import isString from 'lodash-es/isString';
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
  active,
  hovered,
}: any): any {
  const fontColor = `$color.button.${status}.${variant}.font`;
  const activeFontColor = `$color.button.${status}.${variant}.font-active`;
  const bgOpacity =
    ThemeManager.themedValue(
      buildString(`$color.button.${status}.${variant}.bgOpacity`, {
        '-hover': !active && hovered,
        '-active': active,
      })
    ) ?? 1;
  const bg = opacityColor(
    buildString(`$color.button.${status}.${variant}.bg`, {
      '-hover': !active && hovered,
      '-active': active,
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
          variant === 'link' && (hovered || active),
          {
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: fontColor,
          },
        ],
        [
          active,
          {
            color: activeFontColor,
            textDecorationColor: activeFontColor,
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
  containerTs,
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
      style={ThemeManager.themed({
        ...containerTs,
      })}
    >
      {({ pressed, hovered }: any) => {
        const { computedViewStyle, computedTextStyle } = computeStyles({
          variant,
          status,
          active: isActive || pressed,
          disabled: disabled || loading,
          hovered,
        });
        const mergedTs: KV = {
          fontSize: '$fontSize.md',
          lineHeight: '$rem:1',
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
              height: '100%',
              paddingHorizontal: '$rem:0.75',
              paddingVertical: '$rem:0.75',
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
