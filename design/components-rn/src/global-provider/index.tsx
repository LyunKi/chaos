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
} from '../common';

export interface ThemeConfig {
  /**
   *
   */
  themePack?: ThemePack;
  themeMode: string;
  themeContext?: Partial<Omit<ThemeContext, 'windowWidth' | 'windowHeight'>>;
}

export interface I18nConfig {
  locale?: SupportedLocale;
}

export interface GlobalProviderProps extends ThemeConfig, I18nConfig {}

export function GlobalProvider(props: PropsWithChildren<GlobalProviderProps>) {
  const {
    themePack,
    themeMode = 'light',
    themeContext,
    locale = 'en_US',
    children,
  } = props;
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
      <SafeAreaProvider>{ready && children}</SafeAreaProvider>
    </PortalProvider>
  );
}
