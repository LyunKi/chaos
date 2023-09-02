/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  resetMocks: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/*.(spec|test).[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!<rootDir>/src/**/*.stories.{ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './config/jest/mocks/fileMock.js',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  passWithNoTests: true,
  transform: {
    '^.+\\.(jsx?|tsx?)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        diagnostics: false,
      },
    ],
  },
};
