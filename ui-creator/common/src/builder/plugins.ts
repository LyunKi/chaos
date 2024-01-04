import { Navigation, Navigator } from '../models';
import { WidgetRegistry } from '../registries';
import { AppBuilder, BuilderPlugin, BuilderPluginParams } from './models';

export abstract class WidgetRegistryPlugin<
  AppInstance,
  ViewInstance,
  WidgetInstance
> extends BuilderPlugin<AppInstance, ViewInstance, WidgetInstance> {
  protected abstract loadWidgets(widgetRegistry: WidgetRegistry): any;

  protected abstract configureDefaultNamespace?: () => string;

  public load(
    params: BuilderPluginParams<AppInstance, ViewInstance, WidgetInstance>
  ) {
    const { builder } = params;
    this.loadWidgets(builder.context.widgetRegistry);
    if (this.configureDefaultNamespace) {
      builder.context.configManager.config.defaultWidgetNamespace =
        this.configureDefaultNamespace();
    }
  }
}

export abstract class NavigationPlugin<
  AppInstance,
  ViewInstance,
  WidgetInstance
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
