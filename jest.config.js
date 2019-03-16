module.exports = {
  roots: [
    '<rootDir>/lib',
  ],
  testEnvironment: 'jsdom',
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
  automock: false,
};
