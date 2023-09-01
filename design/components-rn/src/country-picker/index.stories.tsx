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
      <View style={{ width: 375 }}>
        <CountryPicker
          {...args}
          title={<TopNavigation title="Country Picker" />}
          value={code}
          onChange={(countryCode) => setCountryCode(countryCode)}
          keyProp="callingCode"
        />
      </View>
    );
  },
};
