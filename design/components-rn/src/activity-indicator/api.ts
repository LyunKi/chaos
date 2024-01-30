import {
  ActivityIndicatorProps as RnActivityIndicatorProps,
  ViewStyle,
} from 'react-native';
import { CloudDesignWrap, Size } from '../common';

export type ActivityIndicatorProps = CloudDesignWrap<
  Omit<RnActivityIndicatorProps, 'color' | 'size'> & {
    color?: string;
    /**
     * A preset sizes for the activity indicator, users can override it by passing ts.size
     *
     * @type {Size}
     */
    size?: string;
  },
  ViewStyle
>;
