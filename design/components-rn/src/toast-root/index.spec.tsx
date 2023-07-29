import { render } from '@testing-library/react-native';
import React from 'react';
import { composeStories } from '@storybook/react';
import { PortalProvider } from '@gorhom/portal';
import { View } from '../view';
import * as stories from './index.stories';

const { Default } = composeStories(stories);

describe('ToastRoot', () => {
  it('should match snapshot', () => {
    const rendered = render(
      <View>
        <PortalProvider>
          <Default />
        </PortalProvider>
      </View>
    );
    expect(rendered).toMatchSnapshot();
  });
});
