import React, { forwardRef } from 'react';
import {
  View as RnView,
  ScrollView as RnScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '@cloud-dragon/common-utils';
import { ThemeManager } from '../common';
import { ViewProps } from './api';

export const View = forwardRef(
  (
    { ts, style, children, onPress, onLongPress, scrollable }: ViewProps,
    ref?: React.Ref<RnView>
  ) => {
    const ViewInstance = scrollable ? RnScrollView : RnView;
    const isInteractive = onPress || onLongPress;
    const Inner = (
      <ViewInstance
        ref={ref}
        style={StyleSheet.flatten([
          { flexDirection: 'row', boxSizing: 'border-box' },
          styles([!!isInteractive, { cursor: 'pointer' }]),
          ThemeManager.themed(ts),
          style,
        ])}
      >
        {children}
      </ViewInstance>
    );
    return isInteractive ? (
      <TouchableWithoutFeedback onLongPress={onLongPress} onPress={onPress}>
        {Inner}
      </TouchableWithoutFeedback>
    ) : (
      Inner
    );
  }
);
