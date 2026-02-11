const { RuleTester } = require('eslint');

const rule = require('../../../typescript/custom-rules/requireErrorContext');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

describe('require-error-context', () => {
  ruleTester.run('require-error-context', rule, {
    valid: [
      // Valid: Error with context
      {
        code: `throw new Error('User not found: ' + userId);`,
      },
      {
        code: `throw new Error(\`Failed to process order: \${orderId}\`);`,
      },
      {
        code: `throw new Error(\`Database connection failed: \${error.message}\`);`,
      },
      // Valid: Custom error classes
      {
        code: `throw new CustomError('Something went wrong');`,
      },
      // Valid: Contextualized messages that previously false-positived via endsWith
      {
        code: `throw new Error('Record with id not found');`,
      },
      {
        code: `throw new Error('Validation for input failed');`,
      },
      // Valid: Re-throwing errors
      {
        code: `throw error;`,
      },
      // Valid: Error with complex message
      {
        code: `throw new Error('Failed to save user ' + user.name + ' with id ' + user.id);`,
      },
    ],
    invalid: [
      // Invalid: Generic error messages
      {
        code: `throw new Error('Error');`,
        errors: [{ messageId: 'genericError' }],
      },
      {
        code: `throw new Error('Failed');`,
        errors: [{ messageId: 'genericError' }],
      },
      {
        code: `throw new Error('Something went wrong');`,
        errors: [{ messageId: 'genericError' }],
      },
      {
        code: `throw new Error('Invalid input');`,
        errors: [{ messageId: 'missingContext' }],
      },
      {
        code: `throw new Error('Not found');`,
        errors: [{ messageId: 'genericError' }],
      },
      // Invalid: Short messages
      {
        code: `throw new Error('Bad');`,
        errors: [{ messageId: 'missingContext' }],
      },
      {
        code: `throw new Error('No');`,
        errors: [{ messageId: 'missingContext' }],
      },
    ],
  });
});
