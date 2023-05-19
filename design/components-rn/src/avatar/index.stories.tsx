import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '.';

const meta = {
  title: 'Cloud-Design/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: { uri: 'https://reactnative.dev/img/tiny_logo.png' },
  },
};

export const Empty: Story = {
  args: {},
};
