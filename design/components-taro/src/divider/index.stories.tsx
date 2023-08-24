import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from '../view';
import { Text } from '../text';
import { Divider } from '.';

const meta = {
  title: 'Cloud-Design/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    const flexDirection = args?.direction === 'vertical' ? 'row' : 'column';
    return (
      <View
        ts={{
          flexDirection,
          height: 100,
          gap: '$rem:1',
          alignItems: 'center',
        }}
      >
        <Text value={'left'} />
        <Divider {...args} />
        <Text value={'right'} />
      </View>
    );
  },
  args: {},
};
