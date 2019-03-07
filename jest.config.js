// @see https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: [
    '<rootDir>',
  ],
  testEnvironment: 'node',
  testRegex: [
    '\\.(test|spec)\\.[jt]sx?$',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
};
