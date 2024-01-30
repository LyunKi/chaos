import { VariableManager, VariablePacks } from '@cloud-dragon/common-utils';
import { SupportedLocale } from '../types';
import { DEFAULT_I18N_KEY } from '../constants';

class I18nManagerClass extends VariableManager {
  public get locale(): SupportedLocale {
    return (this.packKey as any) ?? DEFAULT_I18N_KEY;
  }

  public get i18n() {
    return this.variables;
  }

  public setLocale(locale: SupportedLocale) {
    this.setPackKey(locale);
  }

  public setI18nPacks(i18nPacks: VariablePacks) {
    this.setPacks(i18nPacks);
  }
}

export const I18nManager = new I18nManagerClass({}, DEFAULT_I18N_KEY);
