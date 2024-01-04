import { AppBuilder } from '@cloud-creator/common';
import { ReactElement } from 'react';
import 'react-native-gesture-handler';
import {
  RnNavigationPlugin,
  CloudDesignRnWidgetRegistryPlugin,
} from './plugins';

export function loadCloudCreatorPreludeRn(
  builder: AppBuilder<ReactElement, ReactElement, ReactElement>
) {
  builder.loadPlugin(new RnNavigationPlugin());
  builder.loadPlugin(new CloudDesignRnWidgetRegistryPlugin());
}
