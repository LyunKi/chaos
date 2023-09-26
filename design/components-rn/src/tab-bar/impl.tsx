import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBarProps } from './api';
import { View } from '../view';
import { Icon } from '../icon';
import { Text } from '../text';

export const TabBar = (props: TabBarProps) => {
  const { style, ts, items, value, ...rest } = props;
  return (
    <View
      style={style}
      ts={StyleSheet.flatten([
        { width: '100%', height: '$size.10', alignItems: 'center' },
        ts,
      ])}
      {...rest}
    >
      {items.map((item, index) => {
        const isActive = index === value;
        const {
          key,
          icon,
          onPress,
          onLongPress,
          renderItem,
          style: itemStyle,
          ts: itemTs,
          label,
        } = item;
        if (renderItem) {
          return renderItem(item);
        }
        return (
          <View
            ts={StyleSheet.flatten([
              {
                flex: 1,
                alignItems: 'center',
                gap: '$rem:0.25',
                flexDirection: 'column',
              },
              itemTs,
            ])}
            style={itemStyle}
            key={key ?? label}
            onPress={() => onPress?.(index)}
            onLongPress={() => onPress?.(index)}
          >
            {icon ? <Icon icon={icon} /> : null}
            {<Text size={'sm'} value={label} />}
          </View>
        );
      })}
    </View>
  );
};
