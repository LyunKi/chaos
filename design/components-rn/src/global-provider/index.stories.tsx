import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlobalProvider } from './index';

const meta = {
  title: 'Cloud-Design/GlobalProvider',
  component: GlobalProvider,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlobalProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <GlobalProvider>123</GlobalProvider>;
  },
};
