import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon } from '../icon';
import { View } from '../view';
import { Button, ButtonProps } from '.';

const meta = {
  title: 'Cloud-Design/Button',
  component: Button,
  args: {},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: ButtonProps) => {
  return (
    <View
      ts={{
        padding: '$rem:1',
        flexDirection: 'column',
        gap: '$rem:1',
        flexWrap: 'wrap',
      }}
    >
      {['solid', 'outline', 'ghost', 'link'].map((variant) => (
        <View key={variant} ts={{ gap: '$rem:1', flexWrap: 'wrap' }}>
          {[
            'primary',
            'normal',
            'secondary',
            'success',
            'error',
            'warning',
            'info',
          ].map((status) => (
            <Button
              key={status}
              value={'Button'}
              {...args}
              status={status as any}
              variant={variant as any}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export const Default: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {},
};

export const LoadingButtons: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    loading: true,
    loadingText: 'L...',
  },
};

export const DisabledButtons: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    disabled: true,
  },
};

export const IconButtons: Story = {
  render: (args) => {
    return (
      <View
        ts={{
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
          padding: '$rem:1',
        }}
      >
        <Button
          {...args}
          value={'Button'}
          renderLeft={(props) => <Icon {...props} name="star" />}
        />
        <Button {...args} value={(props) => <Icon {...props} name="star" />} />
        <Button
          {...args}
          value={'Button'}
          renderRight={(props) => <Icon {...props} name="star" />}
        />
      </View>
    );
  },
  args: {},
};
