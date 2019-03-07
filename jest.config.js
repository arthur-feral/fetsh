module.exports = {
  roots: [
    '<rootDir>/lib',
  ],
  testEnvironment: 'node',
  testRegex: [
    '\\.(test|spec)\\.[jt]s$',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist',
  ],
};
