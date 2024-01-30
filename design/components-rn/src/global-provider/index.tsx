import React, { Fragment, PropsWithChildren, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import {
  SupportedLocale,
  GlobalConfigs,
  ThemeManager,
  ThemePack,
  I18nManager,
  ThemeMode,
  ConfigManager,
} from '../common';

export interface ThemeConfig {
  /**
   * Theme packs: This option includes a dark theme and a light theme by default, and it can be customized by users.
   */
  themePacks?: ThemePack;
  /**
   * Theme mode: This option allows you to choose which theme in the pack will be used. The default theme is light.
   */
  themeMode?: ThemeMode;
  /**
   * configs: This option controls some global settings, such as “fontSize”.
   */
  configs?: Partial<Omit<GlobalConfigs, 'windowWidth' | 'windowHeight'>>;

  themeMaxReferenceDepth?: number;
}

export interface I18nConfig {
  /**
   * Locale: This option controls the current language and regional settings of the library.
   */
  locale?: SupportedLocale;
}

export interface GlobalProviderProps extends ThemeConfig, I18nConfig {}

export const GlobalProvider = ({
  themePacks,
  themeMode = 'light',
  configs,
  locale = 'en_US',
  themeMaxReferenceDepth = 10,
  children,
}: PropsWithChildren<GlobalProviderProps>) => {
  const [ready, setReady] = React.useState<boolean>(false);
  const [key, setKey] = React.useState(0);
  useEffect(() => {
    // local
    I18nManager.setLocale(locale);
    I18nManager.initManager();
    // config
    const window = Dimensions.get('window');
    ConfigManager.updateVariables({
      ...configs,
      windowWidth: window.width,
      windowHeight: window.height,
    });
    ConfigManager.initManager();
    // theme
    ThemeManager.setMode(themeMode);
    ThemeManager.setMaxReferenceDepth(themeMaxReferenceDepth);
    if (themePacks) {
      ThemeManager.setThemePacks(themePacks);
    }
    ThemeManager.initManager();
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      ConfigManager.updateVariables({
        windowWidth: window.width,
        windowHeight: window.height,
      });
      ThemeManager.initManager();
      setKey((previous) => previous + 1);
    });
    setKey((previous) => previous + 1);
    setReady(true);
    return () => {
      setReady(false);
      subscription?.remove();
    };
  }, [locale, themeMode, themePacks, configs, setKey, themeMaxReferenceDepth]);
  return (
    <PortalProvider>
      <SafeAreaProvider>
        {ready && <Fragment key={key}>{children}</Fragment>}
      </SafeAreaProvider>
    </PortalProvider>
  );
};
