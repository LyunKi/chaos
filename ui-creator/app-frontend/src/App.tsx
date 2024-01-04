import { CloudAppBuilder } from '@cloud-creator/builder';
import { WidgetRegistry, WidgetRegistryPlugin } from '@cloud-creator/common';
import AppLoading from 'expo-app-loading';
import React, { ReactElement, useEffect, useState } from 'react';
import { loadCloudCreatorPreludeRn } from '@cloud-creator/prelude-rn';
import { AppConfig } from './config/app';
import Logo from './assets/icons/Logo';

const builder = new CloudAppBuilder(AppConfig.name);

loadCloudCreatorPreludeRn(builder);

const DEFAULT_NAMESPACE = '@cloud-creator/components';

class CreatorWidgetRegistryPlugin extends WidgetRegistryPlugin<
  ReactElement,
  ReactElement,
  ReactElement
> {
  protected configureDefaultNamespace = undefined;

  protected loadWidgets(widgetRegistry: WidgetRegistry) {
    widgetRegistry.registerInstances({
      namespace: DEFAULT_NAMESPACE,
      instances: {
        Logo,
      },
    });
  }
}

function useLoadResources() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function loadApplication() {
      try {
        builder.loadPlugin(new CreatorWidgetRegistryPlugin());
      } catch (e) {
        console.error('Failed to load widget deps:', e);
      } finally {
        setLoaded(true);
      }
    }
    loadApplication();
  }, []);
  return loaded;
}

export default function App() {
  const loaded = useLoadResources();
  if (!loaded) {
    return <AppLoading />;
  }
  return builder.build(AppConfig);
}
