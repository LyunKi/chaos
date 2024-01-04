export interface Config {
  baseFontSize: number;
  defaultWidgetNamespace?: string;
}

export const DEFAULT_APP_CONFIG: Config = {
  baseFontSize: 16,
};

export class ConfigManager {
  public config = DEFAULT_APP_CONFIG;
}
