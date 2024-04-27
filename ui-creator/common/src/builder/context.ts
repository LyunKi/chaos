import { ConfigManager, I18nManager, Navigator, ThemeManager } from '../models';
import { WidgetRegistry } from '../registries';

export abstract class BuilderContext {
  public widgetRegistry = new WidgetRegistry();

  public i18nManager = new I18nManager();

  public themeManager = new ThemeManager();

  public configManager = new ConfigManager();

  public navigator!: Navigator;
}
