import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GlobalProvider, Text, View } from '../';
import { ThemeMode, ThemeManager } from '../common';

const Case = (props: any) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  return (
    <GlobalProvider {...props} themeMode={theme}>
      <View ts={{ background: '$color.bg.layout' }}>
        <Text
          testID="text"
          value={ThemeManager.themedValue('$color.font.default')}
        />
      </View>
      <button
        onClick={() => {
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        }}
      >
        change theme
      </button>
    </GlobalProvider>
  );
};

describe('GlobalProvider', () => {
  test('controls theme', async () => {
    const canvas = render(<Case />);
    const text = await canvas.findByTestId('text');
    const beforeContent = text.textContent;
    const button = await canvas.findByText('change theme');
    await fireEvent.press(button);
    expect(text.textContent !== beforeContent).toBeTruthy();
  });
});
