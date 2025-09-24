const { RuleTester } = require('eslint');

const rule = require('../../../typescript/custom-rules/requireDescriptiveTestNames');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

describe('require-descriptive-test-names', () => {
  ruleTester.run('require-descriptive-test-names', rule, {
    valid: [
      // Valid: Starts with "should" and is descriptive
      {
        code: `it('should create a new user with valid data', () => {});`,
      },
      {
        code: `test('should throw error when email is invalid', () => {});`,
      },
      {
        code: `specify('should return null when user not found', () => {});`,
      },
      // Valid: Case insensitive "should"
      {
        code: `it('Should handle uppercase correctly', () => {});`,
      },
      // Valid: Non-test functions
      {
        code: `describe('user service', () => {});`,
      },
      {
        code: `beforeEach(() => {});`,
      },
      // Valid: Test with non-string first argument
      {
        code: `it(testName, () => {});`,
      },
    ],
    invalid: [
      // Invalid: Doesn't start with "should"
      {
        code: `it('creates a user', () => {});`,
        errors: [{ messageId: 'shouldStart' }],
      },
      {
        code: `test('user creation works', () => {});`,
        errors: [{ messageId: 'shouldStart' }],
      },
      {
        code: `it('works correctly', () => {});`,
        errors: [{ messageId: 'shouldStart' }],
      },
      // Invalid: Too short
      {
        code: `it('should', () => {});`,
        errors: [{ messageId: 'tooShort' }],
      },
      {
        code: `test('works', () => {});`,
        errors: [{ messageId: 'shouldStart' }, { messageId: 'tooShort' }],
      },
      // Invalid: Generic descriptions
      {
        code: `it('test', () => {});`,
        errors: [{ messageId: 'shouldStart' }, { messageId: 'tooShort' }],
      },
      {
        code: `test('something', () => {});`,
        errors: [{ messageId: 'shouldStart' }, { messageId: 'tooShort' }],
      },
    ],
  });
});
