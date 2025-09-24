const { RuleTester } = require('eslint');

const rule = require('../../../typescript/custom-rules/noDynamicTestData');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

describe('no-dynamic-test-data', () => {
  ruleTester.run('no-dynamic-test-data', rule, {
    valid: [
      // Valid: static test data
      {
        code: `
          describe('user tests', () => {
            it('should create user', () => {
              const user = { id: 123, name: 'Test User' };
              expect(createUser(user)).toBeDefined();
            });
          });
        `,
      },
      // Valid: Date.now() outside test blocks
      {
        code: `
          const timestamp = Date.now();
          describe('tests', () => {
            it('should work', () => {
              expect(true).toBe(true);
            });
          });
        `,
      },
      // Valid: Math.random() outside test blocks
      {
        code: `
          const random = Math.random();
          function helper() {
            return Math.random();
          }
        `,
      },
    ],
    invalid: [
      // Invalid: Date.now() in test
      {
        code: `
          it('should test something', () => {
            const timestamp = Date.now();
            expect(timestamp).toBeDefined();
          });
        `,
        errors: [{ messageId: 'noDynamicTestData' }],
      },
      // Invalid: Math.random() in test
      {
        code: `
          test('random test', () => {
            const value = Math.random() * 100;
            expect(value).toBeLessThan(100);
          });
        `,
        errors: [{ messageId: 'noDynamicTestData' }],
      },
      // Invalid: crypto.randomUUID in test
      {
        code: `
          describe('uuid tests', () => {
            it('should generate uuid', () => {
              const id = crypto.randomUUID();
              expect(id).toBeTruthy();
            });
          });
        `,
        errors: [{ messageId: 'noDynamicTestData' }],
      },
      // Invalid: new Date() in test
      {
        code: `
          it('date test', () => {
            const date = new Date();
            expect(date).toBeInstanceOf(Date);
          });
        `,
        errors: [{ messageId: 'noDynamicTestData' }],
      },
      // Invalid: nested in describe block
      {
        code: `
          describe('suite', () => {
            const timestamp = Date.now();
            it('test', () => {
              expect(timestamp).toBeDefined();
            });
          });
        `,
        errors: [{ messageId: 'noDynamicTestData' }],
      },
    ],
  });
});
