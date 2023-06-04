import React, { forwardRef } from 'react';
import { View as RnView } from 'react-native';
import { View, ViewProps } from '../view';

export const Layout = forwardRef((props: ViewProps, ref: React.Ref<RnView>) => {
  const { ts, ...rest } = props;
  return (
    <View
      ref={ref}
      ts={{ backgroundColor: '$color.bg.layout', ...ts }}
      {...rest}
    />
  );
});
