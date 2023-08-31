import { SupportedLocale } from '../types';

class I18nManagerClass {
  public locale: SupportedLocale = 'en_US';

  public setLocale(locale: SupportedLocale) {
    this.locale = locale;
  }
}

export const I18nManager = new I18nManagerClass();
