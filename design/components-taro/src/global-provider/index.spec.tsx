import React from 'react';
import { render } from '@testing-library/react-native';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';

const { Default } = composeStories(stories);

describe('GlobalProvider', () => {
  test('controls theme', async () => {
    const rendered = render(<Default />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
