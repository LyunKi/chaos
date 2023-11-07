import React from 'react';
import { StyleSheet } from 'react-native';
import { TabsProps } from './api';
import { View } from '../view';
import { Icon } from '../icon';
import { Text } from '../text';

export const Tabs = (props: TabsProps) => {
  const { style, ts, items, value, ...rest } = props;
  return (
    <View
      style={style}
      ts={StyleSheet.flatten([{ width: '100%', height: '$rem:3' }, ts])}
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
          activeColor,
          activeIcon,
          label,
        } = item;
        if (renderItem) {
          return renderItem(item);
        }
        const itemColor = isActive
          ? activeColor ?? '$color.brand.default'
          : '$color.placeholder.default';
        const itemIcon = isActive && activeIcon ? activeIcon : icon;
        return (
          <View
            ts={StyleSheet.flatten([
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                alignSelf: 'center',
              },
              itemTs,
            ])}
            style={itemStyle}
            key={key ?? label}
            onPress={() => onPress?.(index)}
            onLongPress={() => onLongPress?.(index)}
          >
            {itemIcon && (
              <Icon size={'$rem:1.25'} icon={itemIcon} color={itemColor} />
            )}
            {label && (
              <Text size={'xs'} ts={{ color: itemColor }} value={label} />
            )}
          </View>
        );
      })}
    </View>
  );
};
