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
    { ts, style, children, onPress, scrollable }: ViewProps,
    ref?: React.Ref<RnView>
  ) => {
    const ViewInstance = scrollable ? RnScrollView : RnView;
    const Inner = (
      <ViewInstance
        ref={ref}
        style={StyleSheet.flatten([
          { flexDirection: 'row', boxSizing: 'border-box' },
          styles([!!onPress, { cursor: 'pointer' }]),
          ThemeManager.themed(ts),
          style,
        ])}
      >
        {children}
      </ViewInstance>
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
