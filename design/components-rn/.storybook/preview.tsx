import React, { useEffect } from 'react';
import { GlobalProvider } from '../src/';
import { themes } from '@storybook/theming';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer } from '@storybook/blocks';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview & { darkMode: any } = {
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal },
    stylePreview: true,
    classTarget: 'html',
    current: 'light',
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    controls: {
      sort: 'requiredFirst',
      extends: true,
      exclude: ['children', 'testID'],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: ({ children, context, ...props }: any) => {
        const theme = useDarkMode() ? 'dark' : 'light';
        // useEffect(() => {
        //   const backgroundColor =
        //     theme === 'dark' ? themes.dark.appBg : themes.light.appBg;
        //   document.body.style.backgroundColor = backgroundColor || 'inherit';
        // }, [theme]);
        return (
          <DocsContainer context={context} theme={themes[theme]} {...props}>
            {children}
          </DocsContainer>
        );
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = useDarkMode() ? 'dark' : 'light';
      return (
        <GlobalProvider themeMode={theme}>
          <Story {...context} />
        </GlobalProvider>
      );
    },
  ],
};

export default preview;
