import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tabs, TabItemProps } from '.';
import { Icon } from '../icon';
import { Button } from '../button';

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
        icon: 'home',
        ts: {
          height: '$rem:3',
        },
        onPress,
      },
      {
        key: 'action',
        onPress,
        renderItem: () => {
          return (
            <Button
              ts={{
                height: '$rem:3',
                backgroundColor: 'unset',
                width: '$rem:8',
              }}
              value={() => {
                return (
                  <Icon
                    color="$color.brand.default"
                    size={'$rem:3'}
                    icon={'plus-circle'}
                  />
                );
              }}
            ></Button>
          );
        },
      },
      {
        label: 'tab2',
        icon: 'user',
        onPress,
        ts: {
          height: '$rem:3',
        },
      },
    ] as TabItemProps[];
    return (
      <Tabs
        ts={{
          width: 375,
          borderColor: '$color.border.default',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
        value={index}
        {...args}
        items={items}
      />
    );
  },
};
