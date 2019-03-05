// @see https://jestjs.io/docs/en/configuration.html

module.exports = {
  roots: [
    '<rootDir>',
  ],
  testEnvironment: 'jsdom',
  testRegex: [
    '\\.test\\.js$',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
