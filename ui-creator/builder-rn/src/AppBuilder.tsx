import {
  App,
  BuildAppOptions,
  DEFAULT_LOCALE,
  DEFAULT_THEME,
  Navigation,
  RouteGroup,
  RouteItem,
  AppBuilder,
  ViewBuilder,
  WidgetBuilder,
  DEFAULT_APP_CONFIG,
  BuilderContext,
} from '@cloud-design/creator-common';
import React, { ReactElement } from 'react';
import { KV } from '@cloud-dragon/common-types';
import * as Linking from 'expo-linking';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import snakeCase from 'lodash/snakeCase';
import merge from 'lodash/merge';
import { CloudRnWidgetBuilderInstance } from './WidgetBuilder';
import { CloudRnViewBuilderInstance } from './ViewBuilder';
import { CloudRnBuilderContextInstance } from './BuilderContext';

const Stack = createNativeStackNavigator();

export class CloudRnAppBuilder extends AppBuilder<
  ReactElement,
  ReactElement,
  ReactElement
> {
  public builderName: string;

  public constructor(builderName: string) {
    super();
    this.builderName = builderName;
  }

  public context: BuilderContext = CloudRnBuilderContextInstance;

  public viewBuilder: ViewBuilder<ReactElement, ReactElement> =
    CloudRnViewBuilderInstance;

  public widgetBuilder: WidgetBuilder<ReactElement> =
    CloudRnWidgetBuilderInstance;

  private buildRouteItem = (item: RouteItem) => {
    const { name, view } = item;
    return React.createElement(Stack.Screen, {
      name,
      key: name,
      component: () => this.viewBuilder.build(view),
    } as any);
  };

  private buildRouteGroup = (group: RouteGroup) => {
    const { items, name } = group;
    return React.createElement(
      Stack.Group,
      {
        key: name,
        screenOptions: { headerShown: false },
      } as any,
      items.map(this.buildRouteItem)
    );
  };

  private buildRouteGroups = (groups: RouteGroup[]) => {
    return React.createElement(
      Stack.Navigator,
      null,
      groups.map(this.buildRouteGroup)
    );
  };

  private buildNavigation(navigation: Navigation) {
    const { initialRouteName, groups } = navigation;
    const screens: KV<string> = {};
    groups.forEach((group) => {
      const { items } = group;
      items.forEach((item) => {
        const { name } = item;
        screens[name] = snakeCase(name);
      });
    });
    const linking: LinkingOptions<any> = {
      prefixes: [Linking.createURL('/')],
      config: {
        initialRouteName,
        screens,
      },
    };
    return React.createElement(
      NavigationContainer,
      {
        linking,
        ref: this.context.navigator,
      } as any,
      this.buildRouteGroups(groups)
    );
  }

  public build(app: App, options: BuildAppOptions = {}): ReactElement {
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
