import { SafeAreaViewProps } from 'react-native-safe-area-context';
import { ThemeStyle } from '../common';
import { ViewStyle } from 'react-native/types';

export interface SafeAreaProps extends SafeAreaViewProps {
  ts?: ThemeStyle<ViewStyle>;
}
