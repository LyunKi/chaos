import { KV } from '@cloud-dragon/common-types';
import { VariableManager } from '@cloud-dragon/common-utils';

export interface ConfigPack {
  baseFontSize: number;
  defaultWidgetNamespace?: string;
}

const DEFAULT_CONFIG_PACK: ConfigPack = {
  baseFontSize: 16,
};

export type SupportedConfigEnv = 'default' | 'prod' | 'dev';

export type ConfigPacks = Record<SupportedConfigEnv, ConfigPack>;

export const DEFAULT_CONFIG_ENV = 'default';

export class ConfigManager extends VariableManager {
  public get mode() {
    return this.packKey;
  }
  public init(configPacks: ConfigPacks, env?: SupportedConfigEnv) {
    this.setVariables(DEFAULT_CONFIG_PACK);
    this.setPacks(configPacks);
    this.packKey = env ?? DEFAULT_CONFIG_ENV;
    this.initManager();
  }

  public setEnv(env: string) {
    this.setPackKey(env);
    this.initManager();
  }

  public getConfig(key: string) {
    return this.processedValue(key);
  }

  public getConfigs(references: KV<any>) {
    return this.processed(references);
  }

  protected processedValue(key: any) {
    return super.processedValue(`$${key}`);
  }
}
