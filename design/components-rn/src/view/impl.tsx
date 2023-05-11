import React, { forwardRef } from 'react';
import {
  View as RnView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '@cloud-dragon/common-utils';
import { ThemeManager } from '../common';
import { ViewProps } from './api';

export const View = forwardRef(
  ({ ts, style, children, onPress }: ViewProps, ref?: React.Ref<RnView>) => {
    const Inner = (
      <RnView
        ref={ref}
        style={StyleSheet.flatten([
          { flexDirection: 'row' },
          styles([!!onPress, { cursor: 'pointer' }]),
          ThemeManager.themed(ts),
          style,
        ])}
      >
        {children}
      </RnView>
    );
    return onPress ? (
      <TouchableWithoutFeedback onPress={onPress}>
        {Inner}
      </TouchableWithoutFeedback>
    ) : (
      Inner
    );
  }
);
