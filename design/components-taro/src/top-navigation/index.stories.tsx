import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TopNavigation } from '.';

const meta = {
  title: 'Cloud-Design/TopNavigation',
  component: TopNavigation,
} satisfies Meta<typeof TopNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: 375,
    },
    goBack: action('goBack'),
    title: 'Title',
  },
};
