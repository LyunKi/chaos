import { Size, CloudDesignWrap } from '../common';

export interface BasicTextProps {
  value?: string;
  size?: Size;
  numberOfLines?: number;
}

export type TextProps = CloudDesignWrap<BasicTextProps>;
