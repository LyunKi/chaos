import { KV, NestedString } from '@cloud-dragon/common-types';
import { VariableManager } from '@cloud-dragon/common-utils';

export type ThemePack = KV<NestedString>;

export type ThemePacks = KV<ThemePack>;

export const DEFAULT_THEME = 'light';

export class ThemeManager extends VariableManager {
  public theme = DEFAULT_THEME;

  public themePack: ThemePacks = {};
}
