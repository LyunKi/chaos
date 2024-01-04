import set from 'lodash-es/set';
import {
  App,
  DEFAULT_APP_CONFIG,
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  Navigation,
  View,
  Widget,
  Navigator,
} from '../models';
import { BuilderContext } from './context';
import merge from 'lodash-es/merge';

export interface BuildAppOptions {
  theme?: string;
  locale?: string;
}

export abstract class WidgetBuilder<WidgetInstance> {
  public abstract context: BuilderContext;
  public abstract build(config: Widget): WidgetInstance;
}

export abstract class ViewBuilder<ViewInstance, WidgetInstance> {
  public abstract context: BuilderContext;

  public abstract widgetBuilder: WidgetBuilder<WidgetInstance>;

  public abstract build(config: View): ViewInstance;
}

export abstract class AppBuilder<AppInstance, ViewInstance, WidgetInstance> {
  public abstract context: BuilderContext;

  public abstract viewBuilder: ViewBuilder<ViewInstance, WidgetInstance>;

  public buildNavigation!: (navigation: Navigation) => AppInstance;

  public loadPlugin(
    plugin: BuilderPlugin<AppInstance, ViewInstance, WidgetInstance>
  ) {
    plugin.load({ builder: this });
  }

  public build(app: App, options: BuildAppOptions = {}): AppInstance {
    if (!this.buildNavigation || !this.context.navigator) {
      throw new Error('You should load navigation plugin first.');
    }
    const { config, i18nPacks = {}, themePacks = {}, navigation } = app;
    const { theme = DEFAULT_THEME, locale = DEFAULT_LOCALE } = options;

    this.context.i18nManager.locale = locale;
    this.context.i18nManager.i18nPacks = i18nPacks;
    this.context.themeManager.theme = theme;
    this.context.themeManager.themePacks = themePacks;
    this.context.configManager.config = merge({}, DEFAULT_APP_CONFIG, config);

    return this.buildNavigation(navigation);
  }
}

export abstract class BuilderPlugin<AppInstance, ViewInstance, WidgetInstance> {
  public abstract load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ): any;
}

export interface BuilderPluginParams<
  AppInstance,
  ViewInstance,
  WidgetInstance
> {
  builder: AppBuilder<AppInstance, ViewInstance, WidgetInstance>;
}
