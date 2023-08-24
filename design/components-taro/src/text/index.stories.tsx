import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Size } from '../common';
import { View } from '../view';
import { Text } from './index';

const meta = {
  title: 'Cloud-Design/Text',
  component: Text,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <Text
        numberOfLines={2}
        ts={{ width: '375' }}
        value={
          '这是多行文字，会自动在超过 2 行时折断，这是多行文字，会自动在超过 2 行时折断，这是多行文字，会自动在超过 2 行时折断'
        }
        {...args}
      />
    );
  },
};

export const SizedText: Story = {
  render: () => {
    return (
      <View ts={{ flexDirection: 'column' }}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as Size[]).map((size) => (
          <Text key={size} value={'Text'} size={size} />
        ))}
      </View>
    );
  },
};
