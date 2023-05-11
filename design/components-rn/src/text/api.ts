import { Size, Themed } from '../common';

export interface BasicTextProps {
  value?: string;
  size?: Size;
  numberOfLines?: number;
}

export type TextProps = Themed<BasicTextProps>;
