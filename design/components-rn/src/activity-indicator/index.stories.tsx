import type { Meta, StoryObj } from '@storybook/react';
import { ActivityIndicator } from '.';

const meta = {
  title: 'Cloud-Design/ActivityIndicator',
  component: ActivityIndicator,
} satisfies Meta<typeof ActivityIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
