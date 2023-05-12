import { PropsWithChildren } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { CloudDesignWrap } from '../common';

export interface BasicViewProps {
  onPress?: (event: GestureResponderEvent) => any;
}

export type ViewProps = PropsWithChildren<
  CloudDesignWrap<BasicViewProps, View>
>;
