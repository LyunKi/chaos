const baseConfig = require('../../jest.config.base.js');

const pack = require('./package.json');

module.exports = {
  ...baseConfig,
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './config/jest/jest-setup.js',
  ],
  displayName: pack.name,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
    '^.+\\.jsx$': 'babel-jest',
  },
};
