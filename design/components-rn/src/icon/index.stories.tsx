import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from '../view';
import { IconRef, Icon, IconProps } from './';

const meta = {
  title: 'Cloud-Design/Icon',
  component: Icon,
  args: {
    width: '$rem:4',
    height: '$rem:4',
    color: '$color.brand.500',
    animation: {
      type: 'pulse',
      config: {
        cycles: Infinity,
        useNativeDriver: false,
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: IconProps) => {
  const ref = React.useRef<IconRef>(null);
  React.useEffect(() => {
    ref.current?.startAnimation?.();
    return () => {
      ref.current?.stopAnimation?.();
    };
  }, []);
  return (
    <View ts={{ alignItems: 'center', justifyContent: 'center' }}>
      <Icon {...args} ref={ref} />
    </View>
  );
};

export const Default: Story = {
  render: (args) => {
    return <Template {...args} />;
  },
  args: {
    icon: 'activity',
  },
};
