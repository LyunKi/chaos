import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../index';
import { Layout } from './index';

const meta = {
  title: 'Cloud-Design/Layout',
  component: Layout,
  args: {
    ts: {
      width: 375,
      height: '$rem:3',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text value="Hello, world!" />,
  },
};
