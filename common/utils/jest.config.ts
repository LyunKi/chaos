import type { Config } from 'jest'

export default {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@cloud-dragon/common-utils/(.*)$': '<rootDir>/src/$1',
  },
} as Config
