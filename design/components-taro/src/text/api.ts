import { TextStyle } from 'react-native';
import { Size, CloudDesignWrap } from '../common';

export interface BasicTextProps {
  value?: string;
  size?: Size;
  numberOfLines?: number;
}

export type TextProps = CloudDesignWrap<BasicTextProps, TextStyle>;
