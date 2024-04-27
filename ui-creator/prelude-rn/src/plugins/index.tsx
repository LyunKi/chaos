import {
  DecoratorPlugin,
  Navigation,
  NavigationPlugin,
  RouteGroup,
  RouteItem,
  WidgetRegistry,
  WidgetRegistryPlugin,
  isNavigation,
} from '@cloud-creator/common';
import * as CloudDesignComponentsRn from '@cloud-design/components-rn';
import { NestedString } from '@cloud-dragon/common-types';
import {
  LinkingOptions,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import forEach from 'lodash-es/forEach';
import snakeCase from 'lodash-es/snakeCase';
import React, { ReactElement } from 'react';
import * as ReactIs from 'react-is';
import { Appearance } from 'react-native';

export class CloudDesignRnWidgetRegistryPlugin extends WidgetRegistryPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {
  protected loadWidgets(widgetRegistry: WidgetRegistry) {
    const rnComponents = {} as any;
    forEach(CloudDesignComponentsRn, (value, key) => {
      if (ReactIs.isValidElementType(value)) {
        rnComponents[key] = value;
      }
    });
    widgetRegistry.registerInstances({
      namespace: this.configureDefaultNamespace(),
      instances: rnComponents,
    });
  }
  protected configureDefaultNamespace = () => '@cloud-design/components-rn';
}

export class RnNavigationPlugin extends NavigationPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {
  private buildRouteItem = (item: RouteItem, Navigator: any): ReactElement => {
    const { name, child } = item;
    if (isNavigation(child)) {
      const { initialRouteName, type, groups } = child;
      return this.buildRouteGroups(groups, type, initialRouteName);
    }
    return React.createElement(Navigator.Screen, {
      name,
      key: name,
      component: () => this.builder.viewBuilder.build(child),
    } as any);
  };

  private buildRouteGroup = (group: RouteGroup, Navigator: any) => {
    const { items, name } = group;
    return React.createElement(
      Navigator.Group,
      {
        key: name,
        screenOptions: { headerShown: false },
      } as any,
      items.map((item) => this.buildRouteItem(item, Navigator))
    );
  };

  private genNavigatorByType(type: string) {
    switch (type) {
      case 'Stack': {
        return createStackNavigator();
      }
      default: {
        throw new Error('Not implement yet!');
      }
    }
  }

  private buildRouteGroups = (
    groups: RouteGroup[],
    type: string,
    initialRouteName?: string
  ): ReactElement => {
    const Navigator = this.genNavigatorByType(type);
    return React.createElement(
      Navigator.Navigator,
      { initialRouteName } as any,
      groups.map((group) => this.buildRouteGroup(group, Navigator))
    );
  };

  private buildNavigationGroupScreens(groups: RouteGroup[]) {
    const screens: NestedString = {};
    groups.forEach((group) => {
      const { items } = group;
      items.forEach((item) => {
        const { name, route, child } = item;
        const isNested = isNavigation(child);
        if (isNested) {
          screens[name] = {
            screens: this.buildNavigationGroupScreens(child.groups),
          };
        } else {
          screens[name] = route ?? snakeCase(name);
        }
      });
    });
    return screens;
  }

  protected buildNavigation = (navigation: Navigation) => {
    const { initialRouteName, groups, type } = navigation;
    const screens = this.buildNavigationGroupScreens(groups);
    const linking: LinkingOptions<any> = {
      prefixes: [Linking.createURL('/')],
      config: {
        screens,
      },
    };
    return React.createElement(
      NavigationContainer,
      {
        linking,
        ref: this.builder.context.navigator,
      } as any,
      this.buildRouteGroups(groups, type, initialRouteName)
    );
  };

  protected createNavigator() {
    this.builder.context.navigator = createNavigationContainerRef();
  }
}

export class RnDecoratorPlugin extends DecoratorPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {
  protected buildDecorator(children: ReactElement): ReactElement {
    const { i18nManager, themeManager, configManager } = this.builder.context;
    const { theme, themePack } = themeManager as any;
    const { locale } = i18nManager as any;
    const { config } = configManager;
    const themeMode = Appearance.getColorScheme() ?? theme ?? 'light';
    return (
      <CloudDesignComponentsRn.GlobalProvider
        themeMode={themeMode}
        themePack={CloudDesignComponentsRn.extendTheme(themePack)}
        themeContext={{
          baseFontSize: config.baseFontSize,
        }}
        locale={locale}
      >
        {children}
      </CloudDesignComponentsRn.GlobalProvider>
    );
  }
}
