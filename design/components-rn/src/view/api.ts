import { PropsWithChildren } from 'react';
import { GestureResponderEvent, ViewStyle } from 'react-native';
import { CloudDesignWrap } from '../common';

export interface BasicViewProps {
  onLongPress?: (event: GestureResponderEvent) => any;
  onPress?: (event: GestureResponderEvent) => any;
  stopPropagation?: boolean;
  scrollable?: boolean;
}

export type ViewProps = PropsWithChildren<
  CloudDesignWrap<BasicViewProps, ViewStyle>
>;
