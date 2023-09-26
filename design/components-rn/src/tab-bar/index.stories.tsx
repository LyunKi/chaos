import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TabBar, TabBarItemProps } from '.';
import { View } from '../view';

const meta = {
  title: 'Cloud-Design/TabBar',
  component: TabBar,
} satisfies Meta<typeof TabBar>;

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
    ] as TabBarItemProps[];
    return (
      <View ts={{ width: 375, height: 667 }}>
        <TabBar value={index} {...args} items={items} />
      </View>
    );
  },
};
