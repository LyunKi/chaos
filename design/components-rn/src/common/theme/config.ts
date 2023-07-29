import { Dimensions } from 'react-native';
import { FONT_BASE } from '../constants';

const window = Dimensions.get('window');

export interface ThemeContext {
  baseFontSize: number;
  windowWidth: number;
  windowHeight: number;
}

export const DEFAULT_THEME_CONTEXT: ThemeContext = {
  baseFontSize: FONT_BASE,
  windowWidth: window?.width ?? 375,
  windowHeight: window?.height ?? 667,
};
