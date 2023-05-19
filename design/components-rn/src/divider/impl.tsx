import React from 'react';
import { styles } from '@cloud-dragon/common-utils';
import { View } from '../view';
import { DividerProps } from './api';

export const Divider = ({
  direction = 'horizontal',
  padding = 0,
  color = '$color.border.default',
  size = 1,
  ts,
  style,
}: DividerProps) => {
  return (
    <View
      ts={{
        ...styles(
          [
            direction === 'horizontal',
            {
              width: '100%',
              paddingHorizontal: padding,
              flexDirection: 'column',
            },
          ],
          [
            direction === 'vertical',
            {
              height: '100%',
              paddingVertical: padding,
            },
          ]
        ),
        ...ts,
      }}
      style={style}
    >
      <View
        ts={{
          backgroundColor: color,
          ...styles(
            [
              direction === 'horizontal',
              {
                height: size,
              },
            ],
            [
              direction === 'vertical',
              {
                width: size,
              },
            ]
          ),
        }}
      />
    </View>
  );
};
