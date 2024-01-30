import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { View } from '../view';
import { Button } from '../button';
import { Icon } from '../icon';
import { Input } from '.';

const meta = {
  title: 'Cloud-Design/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const IconInput: Story = {
  render: (args) => {
    return (
      <View
        ts={{
          flexDirection: 'column',
          gap: '$rem:1',
        }}
      >
        <Input
          renderLeft={(props) => (
            <Button
              containerTs={props.containerTs}
              variant="ghost"
              renderLeft={() => {
                return <Icon {...props} icon="phone" />;
              }}
            />
          )}
          {...args}
        />
        <Input
          renderRight={(props) => (
            <Button
              containerTs={props.containerTs}
              variant="ghost"
              renderLeft={() => {
                return <Icon {...props} icon="lock-outline" />;
              }}
            />
          )}
          {...args}
        />
      </View>
    );
  },
  args: {
    placeholder: 'Input with icons',
  },
};

export const PresetInput: Story = {
  render: (args) => {
    return (
      <View ts={{ flexDirection: 'column', gap: '$rem:1' }}>
        <Input
          placeholder="Search input"
          format={{
            type: 'search',
            onSearch: action('Search input'),
          }}
          {...args}
        />
        <Input
          placeholder="Password input"
          format={{
            type: 'password',
          }}
          {...args}
        />
      </View>
    );
  },
  args: {},
};
