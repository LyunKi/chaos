import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import React from 'react';
// import { expect } from '@storybook/jest';
import { useDarkMode } from 'storybook-dark-mode';
import { Text } from '../text';
import { GlobalProvider, GlobalProviderProps } from './index';

const meta = {
  title: 'Cloud-Design/GlobalProvider',
  component: GlobalProvider,
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof GlobalProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: GlobalProviderProps) => {
  const isDarkMode = useDarkMode();
  let themeMode = args.themeMode;
  if (!themeMode) {
    themeMode = isDarkMode ? 'dark' : 'light';
  }
  return (
    <GlobalProvider {...args} themeMode={themeMode}>
      <Text testID="text" value={'themed text'} />
    </GlobalProvider>
  );
};

export const Default: Story = {
  render: (args: GlobalProviderProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByTestId('text');
    // await expect(text).toBeInTheDocument();
  },
};
