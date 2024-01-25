import { KV, NestedString } from '@cloud-dragon/common-types';
import { interpolate } from '@cloud-dragon/common-utils';
import get from 'lodash-es/get';
import isString from 'lodash-es/isString';

export type I18nPack = KV<NestedString>;

export type I18nPacks = KV<I18nPack>;

export const DEFAULT_LOCALE = 'en_US';

export class I18nManager {
  public locale = DEFAULT_LOCALE;

  public i18nPack: I18nPacks = {};

  public t(key: string, context?: KV<any>) {
    const template = get(this.i18nPack[this.locale], key);
    if (!isString(template)) {
      return key;
    }
    return interpolate({ template, context }) ?? key;
  }
}
