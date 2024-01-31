import React, { forwardRef } from 'react';
import {
  View as RnView,
  ScrollView as RnScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  GestureResponderEvent,
} from 'react-native';
import { styles } from '@cloud-dragon/common-utils';
import { ThemeManager } from '../common';
import { ViewProps } from './api';

export const View = forwardRef(
  (
    {
      ts,
      style,
      children,
      onPress,
      onLongPress,
      scrollable,
      stopPropagation,
    }: ViewProps,
    ref?: React.Ref<RnView>
  ) => {
    const ViewInstance = scrollable ? RnScrollView : RnView;
    const isInteractive = onPress || onLongPress;
    const Inner = (
      <ViewInstance
        ref={ref}
        style={StyleSheet.flatten([
          { flexDirection: 'row', boxSizing: 'border-box' },
          styles(
            [!!isInteractive, { cursor: 'pointer' }],
            [stopPropagation, { cursor: 'default' }]
          ),
          ThemeManager.themed(ts),
          style,
        ])}
      >
        {children}
      </ViewInstance>
    );
    const realOnPress = (e: GestureResponderEvent) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      onPress?.(e);
    };
    return isInteractive || stopPropagation ? (
      <TouchableWithoutFeedback onLongPress={onLongPress} onPress={realOnPress}>
        {Inner}
      </TouchableWithoutFeedback>
    ) : (
      Inner
    );
  }
);
