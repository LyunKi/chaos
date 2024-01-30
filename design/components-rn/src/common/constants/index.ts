import { VariableManager, VariablePacks } from '@cloud-dragon/common-utils';
import { Dimensions } from 'react-native';

export const FONT_BASE = 16;
export const DEFAULT_I18N_KEY = 'en_US';
export const DEFAULT_CONFIG_KEY = 'default';
export const DEFAULT_THEME_MODE = 'light';

const window = Dimensions.get('window');

export interface GlobalConfigs {
  baseFontSize: number;
  windowWidth: number;
  windowHeight: number;
}

export const DEFAULT_CONFIGS: GlobalConfigs = {
  baseFontSize: FONT_BASE,
  windowWidth: window?.width ?? 375,
  windowHeight: window?.height ?? 667,
};

class ConfigManagerClass extends VariableManager {
  public get scenario(): string {
    return this.packKey as any;
  }

  public setScenario(scenario: string) {
    this.setPackKey(scenario);
  }

  protected staticVariables = DEFAULT_CONFIGS;

  public get configs(): GlobalConfigs {
    return this.variables as GlobalConfigs;
  }
}

const ConfigManager = new ConfigManagerClass();

export { ConfigManager };
