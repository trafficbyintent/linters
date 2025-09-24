import { describe, it, expect } from 'vitest';
import { RuleTester } from 'eslint';
import plugin from '../../../javascript/eslint-plugin-txi/index.js';

/* Configure RuleTester */
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

describe('ESLint Plugin TXI', () => {
  describe('prefer-multiline-comments rule', () => {
    const rule = plugin.rules['prefer-multiline-comments'];

    it('should have correct meta information', () => {
      expect(rule.meta.type).toBe('suggestion');
      expect(rule.meta.docs.description).toBe(
        'Enforce multi-line comments for permanent documentation'
      );
      expect(rule.meta.fixable).toBe('code');
    });

    /* Use RuleTester for rule testing */
    ruleTester.run('prefer-multiline-comments', rule, {
      valid: [
        '/* This is a valid multi-line comment */',
        '// TODO: This is allowed',
        '// FIXME: This needs fixing',
        '// eslint-disable-next-line',
        '// const oldCode = "commented out";',
        {
          code: '/* Multi-line comment */ const x = 1;',
        },
      ],
      invalid: [
        {
          code: '// This is permanent documentation',
          errors: [
            {
              message:
                'Use multi-line comments (/* */) for permanent documentation. Single-line comments (//) should only be used for TODOs or temporarily commenting out code.',
            },
          ],
          output: '/* This is permanent documentation */',
        },
        {
          code: '// Helper function to process data',
          errors: [
            {
              message:
                'Use multi-line comments (/* */) for permanent documentation. Single-line comments (//) should only be used for TODOs or temporarily commenting out code.',
            },
          ],
          output: '/* Helper function to process data */',
        },
      ],
    });
  });

  describe('no-dynamic-test-data rule', () => {
    const rule = plugin.rules['no-dynamic-test-data'];

    it('should have correct meta information', () => {
      expect(rule.meta.type).toBe('problem');
      expect(rule.meta.docs.description).toBe('Disallow dynamic test data in test files');
    });

    /* Test with test file context */
    const testRuleTester = new RuleTester({
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    });

    testRuleTester.run('no-dynamic-test-data', rule, {
      valid: [
        {
          code: 'const value = Math.random();',
          filename: 'src/utils.js' /* Non-test file */,
        },
        {
          code: 'const date = new Date("2024-01-15");',
          filename: 'src/utils.test.js',
        },
        {
          code: 'const timestamp = 1234567890;',
          filename: 'src/__tests__/utils.js',
        },
      ],
      invalid: [
        {
          code: 'const value = Math.random();',
          filename: 'src/utils.test.js',
          errors: [
            {
              message:
                'Avoid Math.random() in tests. Use static test data for predictable results.',
            },
          ],
        },
        {
          code: 'const now = Date.now();',
          filename: 'src/utils.spec.js',
          errors: [
            {
              message:
                'Avoid Date.now() in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
        {
          code: 'const obj = { time: Date.now() };',
          filename: 'src/utils.test.js',
          errors: [
            {
              message:
                'Avoid Date.now() in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
        {
          code: 'function test() { return Date.now(); }',
          filename: '__tests__/timing.js',
          errors: [
            {
              message:
                'Avoid Date.now() in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
        {
          code: 'const date = new Date();',
          filename: 'src/__tests__/utils.js',
          errors: [
            {
              message:
                'Avoid new Date() without arguments in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
        {
          code: 'const dates = [new Date(), new Date()];',
          filename: 'test/dates.spec.js',
          errors: [
            {
              message:
                'Avoid new Date() without arguments in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
            {
              message:
                'Avoid new Date() without arguments in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
        {
          code: 'const id = `test-${Date.now()}`;',
          filename: 'test.spec.js',
          errors: [
            {
              message: 'Avoid Date.now() in template literals in tests. Use static values.',
            },
            {
              message:
                'Avoid Date.now() in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
            },
          ],
        },
      ],
    });
  });

  describe('prefer-async-await rule', () => {
    const rule = plugin.rules['prefer-async-await'];

    it('should have correct meta information', () => {
      expect(rule.meta.type).toBe('suggestion');
      expect(rule.meta.docs.description).toBe('Prefer async/await over promise chains');
    });

    ruleTester.run('prefer-async-await', rule, {
      valid: [
        'promise.then(result => console.log(result));',
        'async function test() { const result = await promise; }',
        'promise.then(handleSuccess).catch(handleError);',
      ],
      invalid: [
        {
          code: 'promise.then(a => a).then(b => b);',
          errors: [
            {
              message: 'Prefer async/await over chained .then() calls for better readability.',
            },
          ],
        },
        {
          code: 'fetch(url).then(res => res.json()).then(data => console.log(data));',
          errors: [
            {
              message: 'Prefer async/await over chained .then() calls for better readability.',
            },
          ],
        },
      ],
    });
  });

  describe('plugin structure', () => {
    it('should export rules object', () => {
      expect(plugin).toHaveProperty('rules');
      expect(typeof plugin.rules).toBe('object');
    });

    it('should export all three rules', () => {
      expect(plugin.rules).toHaveProperty('prefer-multiline-comments');
      expect(plugin.rules).toHaveProperty('no-dynamic-test-data');
      expect(plugin.rules).toHaveProperty('prefer-async-await');
    });
  });
});
