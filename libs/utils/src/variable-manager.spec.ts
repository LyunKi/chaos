import { KV } from '@cloud-dragon/common-types';
import { isString } from 'lodash-es';
import { interpolate } from './interpolate';
import { VariableManager, VariablePacks } from './variable-manager';

class I18nManagerClass extends VariableManager {
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
  public init(i18nPacks: VariablePacks, locale?: string) {
    this.packs = i18nPacks;
    this.packKey = locale ?? 'en';
    this.initManager();
  }
}

describe('VariableManager', () => {
  it('can derive other nested variable manager', () => {
    const I18nManager = new I18nManagerClass();
    I18nManager.init({
      en: {
        hello: 'hello, {name}',
        error: {
          internal: 'internal server error',
          ref: '$error.internal',
        },
      },
      zh: {
        hello: '你好，{name}',
        error: {
          internal: '服务器内部错误',
          ref: '$error.internal',
        },
      },
    });

    expect(I18nManager.t('error.internal')).toEqual('internal server error');
    expect(I18nManager.t('error.ref')).toEqual('internal server error');

    // update locale
    I18nManager.setLocale('zh');
    expect(I18nManager.t('hello', { name: '世界' })).toEqual('你好，世界');
  });
});
