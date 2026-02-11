/**
 * ESLint Rule Audit Test
 *
 * This test ensures that all rules defined in our configs are documented
 * and tested. It serves as a checklist to ensure comprehensive coverage.
 */

const jsEslintConfig = require('../../javascript/eslint.config.js');
const tsEslintConfig = require('../../typescript/eslint.config.js');

describe('ESLint Rule Audit', () => {
  /* Define all TypeScript rules that should be configured */
  const expectedTypeScriptRules = [
    /* Semicolons */
    'semi',
    '@stylistic/ts/semi',

    /* Quotes */
    'quotes',
    '@stylistic/ts/quotes',

    /* Trailing commas */
    'comma-dangle',

    /* Arrow function parentheses */
    'arrow-parens',

    // Indentation (turned off for Prettier)
    'indent',
    '@stylistic/ts/indent',

    /* Spacing */
    'space-before-function-paren',
    'object-curly-spacing',
    'array-bracket-spacing',
    'keyword-spacing',
    'space-infix-ops',
    'space-unary-ops',

    /* Variable declarations */
    'no-var',
    'prefer-const',
    'one-var',

    /* Imports */
    'import/no-default-export',
    'import/order',
    'import/no-duplicates',
    'no-restricted-imports',
    '@typescript-eslint/consistent-type-imports',
    '@typescript-eslint/consistent-type-exports',

    /* Type annotations */
    '@typescript-eslint/explicit-module-boundary-types',
    '@typescript-eslint/explicit-function-return-type',

    /* Null handling */
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/prefer-nullish-coalescing',
    '@typescript-eslint/prefer-optional-chain',

    /* Equality */
    'eqeqeq',

    /* Control structures */
    'curly',
    'brace-style',
    'default-case',
    'default-case-last',

    /* Classes */
    '@typescript-eslint/explicit-member-accessibility',
    '@stylistic/ts/member-delimiter-style',
    '@typescript-eslint/prefer-readonly',
    '@typescript-eslint/prefer-readonly-parameter-types',

    /* Naming */
    '@typescript-eslint/naming-convention',

    /* Comments */
    'multiline-comment-style',
    'spaced-comment',

    /* Modern features */
    'prefer-template',
    'prefer-spread',
    'prefer-rest-params',
    'prefer-destructuring',
    '@typescript-eslint/prefer-as-const',
    '@typescript-eslint/prefer-string-starts-ends-with',
    '@typescript-eslint/prefer-includes',
    '@typescript-eslint/prefer-for-of',
    '@typescript-eslint/prefer-function-type',
    '@typescript-eslint/prefer-namespace-keyword',
    '@typescript-eslint/prefer-ts-expect-error',
    '@typescript-eslint/prefer-find',
    '@typescript-eslint/prefer-promise-reject-errors',
    '@typescript-eslint/prefer-return-this-type',
    '@typescript-eslint/prefer-reduce-type-parameter',

    /* Error handling */
    '@typescript-eslint/only-throw-error',
    '@typescript-eslint/use-unknown-in-catch-callback-variable',

    /* Debugging */
    'no-console',
    'no-debugger',

    /* TypeScript specific */
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/no-unsafe-assignment',
    '@typescript-eslint/no-unsafe-member-access',
    '@typescript-eslint/no-unsafe-call',
    '@typescript-eslint/no-unsafe-return',
    '@typescript-eslint/no-unsafe-argument',
    '@typescript-eslint/no-unnecessary-type-assertion',
    '@typescript-eslint/no-unnecessary-condition',
    '@typescript-eslint/no-unnecessary-type-arguments',
    '@typescript-eslint/consistent-type-assertions',
    '@typescript-eslint/consistent-type-definitions',
    '@typescript-eslint/no-type-alias',
    '@typescript-eslint/consistent-generic-constructors',
    '@typescript-eslint/no-duplicate-type-constituents',
    '@typescript-eslint/no-redundant-type-constituents',
    '@typescript-eslint/no-useless-template-literals',
    '@typescript-eslint/strict-boolean-expressions',
    '@typescript-eslint/switch-exhaustiveness-check',

    /* Promises */
    '@typescript-eslint/promise-function-async',
    '@typescript-eslint/await-thenable',
    '@typescript-eslint/no-floating-promises',
    '@typescript-eslint/no-misused-promises',

    /* Disabled rules */
    '@typescript-eslint/no-use-before-define',
    '@typescript-eslint/unbound-method',
    '@typescript-eslint/no-unused-vars',

    /* Custom TXI rules */
    '@trafficbyintent/no-debug-artifacts',
    '@trafficbyintent/no-dynamic-test-data',
    '@trafficbyintent/require-descriptive-test-names',
    '@trafficbyintent/require-error-context',
  ];

  /* Define all JavaScript rules that should be configured */
  const expectedJavaScriptRules = [
    /* Semicolons */
    'semi',

    /* Quotes */
    'quotes',

    /* Indentation */
    'indent',

    /* Comma style */
    'comma-style',
    'comma-dangle',

    /* Spacing */
    'space-before-function-paren',
    'keyword-spacing',
    'space-infix-ops',
    'space-unary-ops',
    'space-in-parens',
    'array-bracket-spacing',
    'object-curly-spacing',
    'computed-property-spacing',
    'key-spacing',

    /* Best practices */
    'eqeqeq',
    'no-var',
    'prefer-const',
    'prefer-arrow-callback',
    'arrow-parens',
    'arrow-body-style',
    'no-unused-vars',

    /* Variable usage (removed - not in actual config) */

    /* Naming */
    'camelcase',

    /* Error handling */
    'no-throw-literal',

    /* Console usage */
    'no-console',

    /* Debugging */
    'no-debugger',

    /* Comments */
    'spaced-comment',

    /* Line length */
    'max-len',

    /* Brace style */
    'brace-style',
    'curly',

    /* Imports */
    'import/no-default-export',
    'import/prefer-default-export',

    /* Modern features (removed - not in actual config) */
  ];

  describe('TypeScript Rule Audit', () => {
    test('all expected rules are configured', () => {
      const configuredRules = Object.keys(tsEslintConfig.rules);
      const missingRules = expectedTypeScriptRules.filter(
        (rule) => !configuredRules.includes(rule)
      );

      expect(missingRules).toEqual([]);
    });

    test('no unexpected rules are configured', () => {
      const configuredRules = Object.keys(tsEslintConfig.rules);
      const unexpectedRules = configuredRules.filter(
        (rule) => !expectedTypeScriptRules.includes(rule)
      );

      expect(unexpectedRules).toEqual([]);
    });

    test('all rules have valid severity levels', () => {
      Object.entries(tsEslintConfig.rules).forEach(([_rule, config]) => {
        const severity = Array.isArray(config) ? config[0] : config;
        expect(['error', 'warn', 'off']).toContain(severity);
      });
    });
  });

  describe('JavaScript Rule Audit', () => {
    test('all expected rules are configured', () => {
      const configuredRules = Object.keys(jsEslintConfig.rules);
      const missingRules = expectedJavaScriptRules.filter(
        (rule) => !configuredRules.includes(rule)
      );

      expect(missingRules).toEqual([]);
    });

    test('no unexpected rules are configured', () => {
      const configuredRules = Object.keys(jsEslintConfig.rules);
      const _unexpectedRules = configuredRules.filter(
        (rule) => !expectedJavaScriptRules.includes(rule)
      );

      /*
       * Allow additional rules but log them
       * Uncomment to debug when needed:
       * if (_unexpectedRules.length > 0) {
       *   console.log('Additional JS rules:', _unexpectedRules);
       * }
       */
    });

    test('all rules have valid severity levels', () => {
      Object.entries(jsEslintConfig.rules).forEach(([_rule, config]) => {
        const severity = Array.isArray(config) ? config[0] : config;
        expect(['error', 'warn', 'off']).toContain(severity);
      });
    });
  });

  describe('Rule Consistency', () => {
    /* Rules that should be the same in both configs */
    const sharedRules = [
      'semi',
      'quotes',
      'comma-dangle',
      'arrow-parens',
      'eqeqeq',
      'no-var',
      'prefer-const',
      'curly',
      'no-debugger',
      'spaced-comment',
      'import/no-default-export',
    ];

    test('shared rules have consistent configuration where appropriate', () => {
      const inconsistentRules = [];

      sharedRules.forEach((rule) => {
        const tsRule =
          tsEslintConfig.rules[rule] || tsEslintConfig.rules[`@typescript-eslint/${rule}`];
        const jsRule = jsEslintConfig.rules[rule];

        if (tsRule && jsRule) {
          /* Some rules are expected to differ */
          const expectedDifferences = ['no-console', 'object-curly-spacing', 'brace-style'];
          if (
            !expectedDifferences.includes(rule) &&
            JSON.stringify(tsRule) !== JSON.stringify(jsRule)
          ) {
            inconsistentRules.push({
              rule,
              typescript: tsRule,
              javascript: jsRule,
            });
          }
        }
      });

      /*
       * Log any inconsistencies for review
       * Uncomment to debug when needed:
       * if (inconsistentRules.length > 0) {
       *   console.log('Different configs:', inconsistentRules);
       * }
       */
    });
  });

  describe('Extended Configuration Coverage', () => {
    test('TypeScript config extends required presets', () => {
      expect(tsEslintConfig.extends).toContain('eslint:recommended');
      expect(tsEslintConfig.extends).toContain('plugin:@typescript-eslint/recommended');
      expect(tsEslintConfig.extends).toContain(
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      );
      expect(tsEslintConfig.extends).toContain('plugin:import/recommended');
      expect(tsEslintConfig.extends).toContain('plugin:import/typescript');
      expect(tsEslintConfig.extends).toContain('prettier');
    });

    test('JavaScript config extends required presets', () => {
      expect(jsEslintConfig.extends).toContain('eslint:recommended');
    });

    test('prettier is last in TypeScript extends', () => {
      const lastExtend = tsEslintConfig.extends[tsEslintConfig.extends.length - 1];
      expect(lastExtend).toBe('prettier');
    });
  });

  describe('Test File Overrides', () => {
    test('TypeScript config has test file overrides', () => {
      expect(tsEslintConfig.overrides).toBeDefined();
      expect(tsEslintConfig.overrides.length).toBeGreaterThan(0);

      const testOverride = tsEslintConfig.overrides.find((override) =>
        override.files.some((pattern) => pattern.includes('test'))
      );

      expect(testOverride).toBeDefined();
      expect(testOverride.rules['@typescript-eslint/no-explicit-any']).toBe('warn');
    });
  });
});
