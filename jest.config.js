const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.*.ts', `!src/**/*.(module).ts`],
  coveragePathIgnorePatterns: [
    'application/configs/*.*.config.ts',
    'application/helpers/*.*.helper.ts',
    'application/constants/*.*.constants.ts',
    'application/middlewares/*.*.middleware.ts',
  ],
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['<rootDir>/test/env.setup.js'],
  testEnvironment: 'node',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  // Helps to use aliases in tsconfig (@module/*)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
    prefix: '<rootDir>',
  }),
};
