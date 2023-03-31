import { Config } from 'jest';

export default {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/e2e/**/*.test.ts'],

  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  preset: '@shelf/jest-mongodb',
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/jest.setup.ts',
    '<rootDir>/__tests__/mocks/index.ts',
  ],
} as Config;
