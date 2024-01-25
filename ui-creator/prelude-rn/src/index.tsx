import { AppBuilder } from '@cloud-creator/common';
import { ReactElement } from 'react';
import 'react-native-gesture-handler';
import {
  RnNavigationPlugin,
  CloudDesignRnWidgetRegistryPlugin,
  RnDecoratorPlugin,
} from './plugins';

export function loadCloudCreatorPreludeRn(
  builder: AppBuilder<ReactElement, ReactElement, ReactElement>
) {
  builder.loadPlugin(new RnDecoratorPlugin());
  builder.loadPlugin(new CloudDesignRnWidgetRegistryPlugin());
  builder.loadPlugin(new RnNavigationPlugin());
}
