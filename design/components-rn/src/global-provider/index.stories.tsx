import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useDarkMode } from 'storybook-dark-mode';
import { Text } from '../text';
import { View } from '../view';
import { GlobalProvider, GlobalProviderProps } from './index';

const meta = {
  title: 'Cloud-Design/GlobalProvider',
  component: GlobalProvider,
  parameters: {
    layout: 'fullscreen',
  },
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
      <View ts={{ backgroundColor: '$color.bg.layout' }}>
        <Text testID="text" value={'themed text'} />
      </View>
    </GlobalProvider>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByTestId('text');
    await expect(text).toBeInTheDocument();
  },
};
