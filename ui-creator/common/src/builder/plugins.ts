import { ReactElement } from 'react';
import { Navigation } from '../models';
import { WidgetRegistry } from '../registries';
import { AppBuilder, BuilderPlugin, BuilderPluginParams } from './models';

export abstract class WidgetRegistryPlugin<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> extends BuilderPlugin<AppInstance, ViewInstance, WidgetInstance> {
  protected abstract loadWidgets(widgetRegistry: WidgetRegistry): any;

  protected abstract configureDefaultNamespace?: () => string;

  public load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ) {
    const { builder } = params;
    this.loadWidgets(builder.context.widgetRegistry);
    if (this.configureDefaultNamespace) {
      builder.context.configManager.setVariables({
        defaultWidgetNamespace: this.configureDefaultNamespace(),
      });
    }
  }
}

export abstract class NavigationPlugin<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> extends BuilderPlugin<AppInstance, ViewInstance, WidgetInstance> {
  protected abstract buildNavigation(navigation: Navigation): AppInstance;

  protected abstract createNavigator(): any;

  protected builder!: AppBuilder<AppInstance, ViewInstance, WidgetInstance>;

  public load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ) {
    const { builder } = params;
    this.builder = builder;
    this.createNavigator();
    builder.buildNavigation = this.buildNavigation.bind(this);
  }
}

export abstract class DecoratorPlugin<
  AppInstance = ReactElement,
  ViewInstance = ReactElement,
  WidgetInstance = ReactElement
> extends BuilderPlugin<AppInstance, ViewInstance, WidgetInstance> {
  protected abstract buildDecorator(children: AppInstance): AppInstance;

  protected builder!: AppBuilder<AppInstance, ViewInstance, WidgetInstance>;

  public load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ) {
    const { builder } = params;
    this.builder = builder;
    builder.buildDecorator = this.buildDecorator.bind(this);
  }
}
