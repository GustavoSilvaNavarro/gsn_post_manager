import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/tests'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/tests/integration'],
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: 'test.ts',
  setupFiles: ['./jest.setup.ts'],
  setupFilesAfterEnv: ['./tests/unit/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
export default config;
