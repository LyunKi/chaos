import React from 'react';
import { CloudDesignWrap, ThemeStyle } from '../common';
import { IconComponent } from '../icon';
import { ViewStyle } from 'react-native/types';
import { Fn } from '@cloud-dragon/common-types';

export interface TabBarItemProps {
  key?: string;
  renderItem?: (props: Omit<TabBarItemProps, 'renderItem'>) => React.ReactNode;
  icon?: IconComponent;
  label: string;
  ts?: ThemeStyle<ViewStyle>;
  style?: ViewStyle;
  onPress?: Fn<[number]>;
  onLongPress?: Fn<[number]>;
}

export type TabBarProps = CloudDesignWrap<
  {
    items: TabBarItemProps[];
    value?: number;
  },
  ViewStyle
>;
