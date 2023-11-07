import React from 'react';
import { CloudDesignWrap, ThemeStyle } from '../common';
import { IconComponent } from '../icon';
import { ViewStyle } from 'react-native/types';
import { Fn } from '@cloud-dragon/common-types';

export interface TabItemProps {
  key?: string;
  renderItem?: (props: Omit<TabItemProps, 'renderItem'>) => React.ReactNode;
  icon?: IconComponent;
  activeColor?: string;
  activeIcon?: IconComponent;
  label?: string;
  ts?: ThemeStyle<ViewStyle>;
  style?: ViewStyle;
  onPress?: Fn<[number]>;
  onLongPress?: Fn<[number]>;
}

export type TabsProps = CloudDesignWrap<
  {
    items: TabItemProps[];
    value?: number;
  },
  ViewStyle
>;
