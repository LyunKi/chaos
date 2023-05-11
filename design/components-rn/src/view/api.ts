import { PropsWithChildren } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Themed } from '../common';

export interface BasicViewProps {
  onPress?: (event: GestureResponderEvent) => any;
}

export type ViewProps = PropsWithChildren<Themed<BasicViewProps, View>>;
