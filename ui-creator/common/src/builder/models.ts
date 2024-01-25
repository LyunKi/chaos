import {
  App,
  DEFAULT_APP_CONFIG,
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  Navigation,
  View,
  Widget,
} from '../models';
import { BuilderContext } from './context';
import merge from 'lodash-es/merge';
import { ReactElement } from 'react';

export interface BuildAppOptions {
  theme?: string;
  locale?: string;
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
    const { config, i18nPacks = {}, themePacks = {}, navigation } = app;
    const { theme = DEFAULT_THEME, locale = DEFAULT_LOCALE } = options;

    this.context.i18nManager.locale = locale;
    this.context.i18nManager.i18nPack = i18nPacks;
    this.context.themeManager.theme = theme;
    this.context.themeManager.themePack = themePacks;
    this.context.configManager.config = merge({}, DEFAULT_APP_CONFIG, config);

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
