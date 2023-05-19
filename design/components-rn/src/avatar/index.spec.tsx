import { render } from '@testing-library/react-native';
import React from 'react';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';

const { Default } = composeStories(stories);

describe('Avatar', () => {
  it('should match snapshot', () => {
    const rendered = render(<Default />);
    expect(rendered).toMatchSnapshot();
  });
});
