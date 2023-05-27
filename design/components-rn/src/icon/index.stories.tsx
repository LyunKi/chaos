import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View } from '../view';
import { Button } from '../button';
import { Text } from '../text';
import { IconRegistry } from './generated';
import { IconRef, Icon, PresetIcons, IconProps } from './';

const meta = {
  title: 'Cloud-Design/Icon',
  component: Icon,
  parameters: {
    controls: { exclude: ['icon'] },
  },
  args: {
    width: '$rem:1',
    height: '$rem:1',
    color: '$color.brand.500',
    icon: 'activity',
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

const DefaultTemplate = (args: IconProps) => {
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

const GalleryTemplate = (args: IconProps) => {
  return (
    <View ts={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        ts={{ flexDirection: 'column', alignItems: 'center', gap: '$rem:1' }}
      >
        <Text value="Outline icons" />
        <View ts={{ flexWrap: 'wrap', width: '$vw:30' }}>
          {Object.keys(IconRegistry)
            .filter((iconName) => iconName.includes('outline'))
            .map((iconName) => {
              return (
                <Button
                  variant="ghost"
                  ts={{
                    width: '$rem:2',
                    height: '$rem:2',
                    marginHorizontal: '$rem:0.25',
                  }}
                  onPress={async () => {
                    try {
                      await navigator.clipboard.writeText(iconName);
                      alert(`Icon copied: ${iconName}`);
                    } catch (err) {
                      console.error('Failed to copy: ', err);
                    }
                  }}
                  renderLeft={() => {
                    return (
                      <Icon
                        key={iconName}
                        {...args}
                        icon={iconName as PresetIcons}
                      />
                    );
                  }}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

export const Default: Story = {
  render: (args) => {
    return <DefaultTemplate {...args} />;
  },
  args: {},
};

export const IconGallery: Story = {
  render: (args) => {
    return <GalleryTemplate {...args} />;
  },
  args: {},
};
