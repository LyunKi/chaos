import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs, TabItemProps } from '.';
import { View } from '../view';

const meta = {
  title: 'Cloud-Design/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [],
  },
  render: (args) => {
    const [index, setIndex] = useState(0);
    const onPress = (index: number) => setIndex(index);
    const items = [
      {
        label: 'tab1',
        icon: 'home-outline',
        onPress,
      },
      {
        label: 'tab2',
        icon: 'person-outline',
        onPress,
      },
    ] as TabItemProps[];
    return (
      <View
        ts={{
          width: 375,
          borderColor: '$color.border.default',
          borderStyle: 'solid',
          borderWidth: 1,
          padding: '$rem:0.5',
        }}
      >
        <Tabs value={index} {...args} items={items} />
      </View>
    );
  },
};
