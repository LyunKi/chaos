import { buildString } from './string';

describe('string utils', () => {
  test('buildString can connect strings by conditions', () => {
    expect(buildString('Hello', { ', world!': true, not_use: false })).toBe(
      'Hello, world!'
    );
  });
});
