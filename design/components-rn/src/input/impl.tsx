import React, { forwardRef, Ref, useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  Platform,
} from 'react-native';
import { combineRefs } from '@cloud-dragon/react-utils';
import { styles } from '@cloud-dragon/common-utils';
import { AccessoryProps, FONT_BASE, ThemeManager } from '../common';
import { Icon } from '../icon';
import { Button } from '../button';
import { View } from '../view';
import { SearchFormat, InputProps } from './api';

function renderSearch({ onSearch }: SearchFormat, value?: string) {
  return (props: AccessoryProps) => {
    return (
      <Button
        variant="ghost"
        containerTs={props.containerTs}
        onPress={() => onSearch?.(value)}
        value={() => {
          return <Icon {...props} icon="search" />;
        }}
      />
    );
  };
}

function renderPassword(
  secureTextEntry: boolean,
  setSecureTextEntry: Function
) {
  return (props: AccessoryProps) => {
    const icon = secureTextEntry ? 'visibility' : 'visibility-off';
    return (
      <Button
        variant="ghost"
        containerTs={props.containerTs}
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        value={() => {
          return <Icon {...props} icon={icon} />;
        }}
      />
    );
  };
}

export const Input = forwardRef(
  (
    {
      ts,
      style,
      placeholder,
      value,
      onBlur,
      onFocus,
      autoFocus,
      inputTs,
      renderLeft,
      renderRight,
      format,
      onChange,
      error,
      ...rest
    }: InputProps,
    ref: Ref<TextInput>
  ) => {
    const [secureTextEntry, setSecureTextEntry] = useState(
      format?.type === 'password'
    );
    const innerRef = useRef<TextInput>();
    let computedRenderRight = renderRight;
    if (!computedRenderRight) {
      if (format?.type === 'search') {
        computedRenderRight = renderSearch(
          format,
          (innerRef.current as any)?.value
        );
      }
      if (format?.type === 'password') {
        computedRenderRight = renderPassword(
          secureTextEntry,
          setSecureTextEntry
        );
      }
    }
    const [focused, setFocused] = useState(autoFocus);
    const containerTs = StyleSheet.flatten([
      ThemeManager.themed({
        borderColor: '$color.border.input',
        borderWidth: 1,
        height: '$rem:2.5',
        borderRadius: '$radius.md',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        ...styles(
          [
            focused,
            {
              borderColor: '$color.status.info',
              borderWidth: 2,
            },
          ],
          [
            error,
            {
              borderColor: '$color.status.error',
              borderWidth: 2,
            },
          ]
        ),
        ...ts,
      }),
      style,
    ]);
    const computedInputTs: StyleProp<TextStyle> = ThemeManager.themed({
      paddingLeft: renderLeft ? undefined : '$rem:1',
      paddingRight: renderRight ? undefined : '$rem:1',
      lineHeight: '$rem:1.5',
      fontSize: '$fontSize.default',
      color: '$color.font.default',
      flex: 1,
      minWidth: 0,
      ...Platform.select({
        web: {
          outline: 'none',
        },
      }),
      ...inputTs,
    });
    const accessoryProps = {
      color: containerTs.borderColor,
      size: computedInputTs.fontSize ?? FONT_BASE,
      containerTs: {
        width: 0.8 * containerTs.height,
        height: 0.8 * containerTs.height,
        marginHorizontal: '$rem:0.25',
      },
    };
    const computedRenderLeft = renderLeft ?? renderLeft;
    return (
      <View ts={containerTs}>
        {computedRenderLeft && computedRenderLeft(accessoryProps)}
        <TextInput
          autoFocus={autoFocus}
          ref={combineRefs(innerRef, ref)}
          secureTextEntry={secureTextEntry}
          onFocus={(e) => {
            e.stopPropagation();
            setFocused(true);
            onFocus?.(e);
          }}
          onChangeText={onChange}
          value={value}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          placeholderTextColor={ThemeManager.themedValue(
            '$color.placeholder.default'
          )}
          style={computedInputTs}
          {...rest}
        />
        {computedRenderRight && computedRenderRight(accessoryProps)}
      </View>
    );
  }
);

Input.defaultProps = {};
