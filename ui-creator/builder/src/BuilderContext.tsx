import {
  BuilderContext,
  ConfigManager,
  I18nManager,
  ThemeManager,
  Navigator,
  WidgetRegistry,
} from '@cloud-design/creator-common';
import { createNavigationContainerRef } from '@react-navigation/native';

class CloudBuilderContext extends BuilderContext {
  public widgetRegistry: WidgetRegistry;
  public i18nManager: I18nManager;
  public themeManager: ThemeManager;
  public configManager: ConfigManager;
  public navigator: Navigator;

  public constructor() {
    super();
    this.widgetRegistry = new WidgetRegistry();
    this.i18nManager = new I18nManager();
    this.themeManager = new ThemeManager();
    this.configManager = new ConfigManager();
    this.navigator = createNavigationContainerRef();
  }
}

export const CloudBuilderContextInstance = new CloudBuilderContext();
