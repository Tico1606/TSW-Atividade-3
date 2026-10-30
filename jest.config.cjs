/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  cacheDirectory: '<rootDir>/.cache/jest',
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['text', 'text-summary', 'json-summary', 'lcov', 'html'],
};
