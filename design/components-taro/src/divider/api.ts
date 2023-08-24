import { ViewStyle } from 'react-native';
import { CloudDesignWrap } from '../common';

export interface BasicDividerProps {
  direction?: 'horizontal' | 'vertical';
  padding?: number | string;
  size?: number | string;
  color?: string;
}

export type DividerProps = CloudDesignWrap<BasicDividerProps, ViewStyle>;
