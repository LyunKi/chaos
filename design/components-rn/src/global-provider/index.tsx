import React, { PropsWithChildren, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { useForceUpdate } from '@cloud-dragon/react-utils';
import {
  SupportedLocale,
  ThemeContext,
  ThemeManager,
  ThemePack,
  I18nManager,
  ThemeMode,
} from '../common';

export interface ThemeConfig {
  /**
   * Theme pack: This option includes a dark theme and a light theme by default, and it can be customized by users.
   */
  themePack?: ThemePack;
  /**
   * Theme mode: This option allows you to choose which theme in the pack will be used. The default theme is light.
   */
  themeMode?: ThemeMode;
  /**
   * Theme context: This option controls some global theme settings, such as “fontSize”.
   */
  themeContext?: Partial<Omit<ThemeContext, 'windowWidth' | 'windowHeight'>>;
}

export interface I18nConfig {
  /**
   * Locale: This option controls the current language and regional settings of the library.
   */
  locale?: SupportedLocale;
}

export interface GlobalProviderProps extends ThemeConfig, I18nConfig {}

export const GlobalProvider = ({
  themePack,
  themeMode = 'light',
  themeContext,
  locale = 'en_US',
  children,
}: PropsWithChildren<GlobalProviderProps>) => {
  const [ready, setReady] = React.useState<boolean>(false);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    // local
    I18nManager.setLocale(locale);
    // theme
    const window = Dimensions.get('window');
    ThemeManager.setThemeContext({
      ...themeContext,
      windowWidth: window.width,
      windowHeight: window.height,
    });
    ThemeManager.setMode(themeMode);
    if (themePack) {
      ThemeManager.setThemePack(themePack);
    }
    ThemeManager.computeTheme();

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      ThemeManager.updateThemeContext({
        windowWidth: window.width,
        windowHeight: window.height,
      });
      ThemeManager.computeTheme();
      forceUpdate();
    });
    setReady(true);
    return () => {
      setReady(false);
      subscription?.remove();
    };
  }, [locale, themeMode, themePack, themeContext, forceUpdate]);

  return (
    <PortalProvider>
      <SafeAreaProvider style={{}}>{ready && children}</SafeAreaProvider>
    </PortalProvider>
  );
};
