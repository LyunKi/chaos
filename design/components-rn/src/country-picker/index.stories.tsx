import type { Meta, StoryObj } from '@storybook/react';
import { CountryPicker } from '.';
import React from 'react';
import { View } from '../view';
import { TopNavigation } from '../top-navigation';

const meta = {
  title: 'Cloud-Design/CountryPicker',
  component: CountryPicker,
} satisfies Meta<typeof CountryPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(args) {
    const [code, setCountryCode] = React.useState('CN');
    return (
      <View ts={{ width: 375, height: 667 }}>
        <CountryPicker
          title={<TopNavigation title="Country Picker" />}
          keyProp="callingCode"
          {...args}
          value={code}
          onChange={(countryCode) => setCountryCode(countryCode)}
        />
      </View>
    );
  },
};
