module.exports = wallaby => ({
  files: [
    'package.json',
    'src/**/*',
    'test/**/*',
    '!test/**/*.test.js',
  ],

  tests: [
    'test/**/*.test.js',
  ],

  env: {
    type: 'node',
    runner: 'node',
  },

  // testFramework: 'ava',

  setup: () => {
    require('babel-polyfill')
    require('./test/helper')
  },

  compilers: {
    '**/*.js': wallaby.compilers.babel(),
  },
})
