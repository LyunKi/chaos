import { ReactElement } from 'react';
import {
  App,
  ConfigPacks,
  DEFAULT_LOCALE,
  DEFAULT_THEME_MODE,
  I18nPacks,
  Navigation,
  SupportedLocale,
  SupportedThemeMode,
  ThemePacks,
  View,
  Widget,
} from '../models';
import { BuilderContext } from './context';

export interface BuildAppOptions {
  theme?: SupportedThemeMode;
  locale?: SupportedLocale;
}

export abstract class WidgetBuilder<WidgetInstance = ReactElement> {
  public abstract context: BuilderContext;
  public abstract build(config: Widget): WidgetInstance;
}

export abstract class ViewBuilder<
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> {
  public abstract context: BuilderContext;

  public abstract widgetBuilder: WidgetBuilder<WidgetInstance>;

  public abstract build(config: View): ViewInstance;
}

export abstract class AppBuilder<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> {
  public abstract context: BuilderContext;

  public abstract viewBuilder: ViewBuilder<ViewInstance, WidgetInstance>;

  public buildNavigation!: (navigation: Navigation) => AppInstance;

  public buildDecorator(children: AppInstance) {
    return children;
  }

  public loadPlugin(
    plugin: BuilderPlugin<AppInstance, ViewInstance, WidgetInstance>
  ) {
    plugin.load({ builder: this });
  }

  public build(app: App, options: BuildAppOptions = {}): AppInstance {
    if (!this.buildNavigation || !this.context.navigator) {
      throw new Error('You should load navigation plugin first.');
    }
    const {
      configPacks = {},
      i18nPacks = {},
      themePacks = {},
      navigation,
    } = app;
    const { theme = DEFAULT_THEME_MODE, locale = DEFAULT_LOCALE } = options;

    this.context.i18nManager.init(i18nPacks as I18nPacks, locale);
    this.context.themeManager.init(themePacks as ThemePacks, theme);
    this.context.configManager.init(configPacks as ConfigPacks);

    return this.buildDecorator(this.buildNavigation(navigation));
  }
}

export abstract class BuilderPlugin<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> {
  public abstract load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ): any;
}

export interface BuilderPluginParams<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> {
  builder: AppBuilder<AppInstance, ViewInstance, WidgetInstance>;
}
