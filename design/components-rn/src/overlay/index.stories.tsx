import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../button';
import { Text } from '../text';
import { Overlay } from '.';

const meta = {
  title: 'Cloud-Design/Overlay',
  component: Overlay,
} satisfies Meta<typeof Overlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    renderContent: () => <Text value={'Overlay content'} />,
  },
  render: (args) => {
    return (
      <Overlay
        {...args}
        renderTrigger={(props) => <Button {...props} value={'Trigger'} />}
        getContentPosition={(triggerRect) => {
          return {
            left: triggerRect.pageX,
            top: triggerRect.pageY + triggerRect.height + window.scrollY + 4,
          };
        }}
      />
    );
  },
};
