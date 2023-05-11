import React from 'react';
import { GlobalProvider } from '../src/';
import { themes, ensure } from '@storybook/theming';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer } from '@storybook/blocks';

const preview = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal },
    stylePreview: true,
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
      extends: true,
      exclude: ['children'],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: ({ children, context, ...props }) => {
        const theme = useDarkMode() ? 'dark' : 'light';
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
} as Preview;

export default preview;
