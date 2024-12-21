import { KV, NestedString } from '@cloud-dragon/common-types';
import { VariableManager } from '@cloud-dragon/common-utils';

export type ThemePack = KV<NestedString>;

export type SupportedThemeMode = 'light' | 'dark';

export type ThemePacks = Record<SupportedThemeMode, ThemePack>;

export const DEFAULT_THEME_MODE = 'light';

export class ThemeManager extends VariableManager {
  public get mode() {
    return this.packKey;
  }
  public init(i18nPacks: ThemePacks, mode?: SupportedThemeMode) {
    this.packs = i18nPacks;
    this.packKey = mode ?? DEFAULT_THEME_MODE;
    this.initManager();
  }

  public setMode(locale: string) {
    this.setPackKey(locale);
    this.initManager();
  }

  public themedValue(value: any) {
    return this.processedValue(value);
  }

  public themed(references: KV<any>) {
    return this.processed(references);
  }
}
