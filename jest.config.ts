import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: 'unit',
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: '.',
      testRegex: '.*\\.spec\\.ts$',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      collectCoverageFrom: ['**/*.(t|j)s'],
      coverageDirectory: '../coverage',
      testEnvironment: 'node',
      setupFiles: ['./jest.setup.ts'],
      testPathIgnorePatterns: ['/node_modules/', '/test/'],
    },
    {
      displayName: 'e2e',
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: '.',
      testRegex: '.e2e-spec.ts$',
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      collectCoverageFrom: ['**/*.(t|j)s'],
      coverageDirectory: '../coverage/e2e',
      testEnvironment: 'node',
      setupFiles: ['./jest.setup.ts'],
      testPathIgnorePatterns: ['/node_modules/'],
      roots: ['<rootDir>/test/'],
      moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@test-utils/(.*)$': '<rootDir>/test/utils/$1',
      },
    },
  ],
};

export default config;
