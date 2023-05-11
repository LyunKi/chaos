import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../index';
import { View } from './index';

const meta = {
  title: 'Cloud-Design/View',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text value="Hello, world!" />,
    ts: {
      width: '$rem:20',
      justifyContent: 'center',
      background: '$color.brand.500',
    },
  },
};
