import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '.';
import React from 'react';

const meta = {
  title: 'Cloud-Design/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args){
    return <FormField {...args} />
  }
  args: {},
};
