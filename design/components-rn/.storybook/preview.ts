export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    extends: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
