import { AcceptLanguageParser } from '.';

describe('AcceptLanguageParser', () => {
  it('should parse language string', () => {
    const languages = AcceptLanguageParser.parse('en-GB,en;q=0.8');
    expect(languages).toStrictEqual([
      {
        code: 'en',
        region: 'GB',
        quality: 1.0,
        origin: 'en-GB',
        formatted: 'en-GB',
      },
      {
        code: 'en',
        region: undefined,
        quality: 0.8,
        origin: 'en;q=0.8',
        formatted: 'en',
      },
    ]);
  });

  it('should be able to pick the optimal language', () => {
    const language = AcceptLanguageParser.pick(
      'en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8',
      ['fr-CA', 'fr-FR', 'fr']
    );
    expect(language).toBe('fr-CA');
  });
  it('should be able to figure different language format', () => {
    const language = AcceptLanguageParser.pick(
      'en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8',
      ['fr_CA', 'fr-FR', 'fr']
    );
    expect(language).toBe('fr_CA');
  });
});
