import { merge } from 'lodash';
import { ThemeManager } from './theme';
import { CloudDesignTheme } from './types';

export function extendTheme(themePack: CloudDesignTheme) {
  return merge({}, ThemeManager.getThemePack(), themePack);
}
