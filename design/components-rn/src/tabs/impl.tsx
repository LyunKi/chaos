import React from 'react';
import { StyleSheet } from 'react-native';
import { TabsProps } from './api';
import { View } from '../view';
import { Icon } from '../icon';
import { Text } from '../text';
import { styles } from '@cloud-dragon/common-utils';

export const Tabs = (props: TabsProps) => {
  const { style, ts, items, value, ...rest } = props;
  return (
    <View
      style={style}
      ts={StyleSheet.flatten([
        { width: '100%', height: '$rem:3', alignItems: 'center' },
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
        const activeColor = '$color.brand.default';
        return (
          <View
            ts={StyleSheet.flatten([
              {
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
              },
              itemTs,
            ])}
            style={itemStyle}
            key={key ?? label}
            onPress={() => onPress?.(index)}
            onLongPress={() => onLongPress?.(index)}
          >
            {icon && (
              <Icon
                size={'$rem:1.25'}
                icon={icon}
                color={isActive ? activeColor : undefined}
              />
            )}
            {label && (
              <Text
                size={'xs'}
                ts={styles([isActive, { color: activeColor }])}
                value={label}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
