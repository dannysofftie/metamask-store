module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './.jest.babelrc' }],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
};
