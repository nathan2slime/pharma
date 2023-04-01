import { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'],
};

export default config;
