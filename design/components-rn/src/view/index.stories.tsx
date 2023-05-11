import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../index';
import { View } from './index';

const meta = {
  title: 'Cloud-Design/View',
  component: View,
  args: {
    ts: {
      width: '100%',
      height: '$rem:3',
      justifyContent: 'center',
      alignItems: 'center',
      background: '$color.brand.500',
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text value="Hello, world!" />,
  },
};

export const PressAble: Story = {
  args: {
    children: <Text value="Press me!" />,
  },
};
