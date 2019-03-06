// @see https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: [
    '<rootDir>',
  ],
  testEnvironment: 'jsdom',
  testRegex: [
    '\\.(test|spec)\\.ts$',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
  },
};
