import merge from 'lodash-es/merge';
import { ThemeManager } from './theme';
import { CloudDesignTheme } from './types';

export function extendTheme(themePack: CloudDesignTheme) {
  return merge({}, ThemeManager.getThemePacks(), themePack);
}
