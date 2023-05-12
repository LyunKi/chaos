import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Text } from '../text';
import { View } from '../view';
import { GlobalProvider } from './index';

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

const Template = (args) => {
  return (
    <GlobalProvider {...args}>
      <View ts={{ background: '$color.bg.layout' }}>
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
    expect(text).toBeInTheDocument();
  },
};
