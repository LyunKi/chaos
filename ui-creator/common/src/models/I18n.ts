import { KV, NestedString } from '@cloud-dragon/common-types';
import { VariableManager, interpolate } from '@cloud-dragon/common-utils';
import isString from 'lodash-es/isString';

export type I18nPack = KV<NestedString>;

export type SupportedLocale = 'en_US' | 'zh_CN';

export type I18nPacks = Record<SupportedLocale, I18nPack>;

export const DEFAULT_LOCALE = 'en_US';

export class I18nManager extends VariableManager {
  public get locale() {
    return this.packKey;
  }

  public init(i18nPacks: I18nPacks, locale?: SupportedLocale) {
    this.packs = i18nPacks;
    this.packKey = locale ?? DEFAULT_LOCALE;
    this.initManager();
  }

  public setLocale(locale: string) {
    this.setPackKey(locale);
    this.initManager();
  }

  public t(key: string, context?: KV<any>) {
    const template = this.processedValue(`$${key}`);
    if (!isString(template)) {
      return key;
    }
    return interpolate({ template, context }) ?? key;
  }
}

