module.exports = {
  root: true,
  overrides: [
    {
      files: ['__tests__/**/*.js'],
      env: {
        jest: true,
        node: true,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
      },
    },
  ],
};
