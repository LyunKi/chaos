const baseConfig = require('../../jest.config.base.js');

const pack = require('./package.json');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './config/jest/jest-setup.js',
  ],
  displayName: pack.name,
  moduleNameMapper: {
    '@tarojs/taro': '@tarojs/taro-h5',
  },
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
