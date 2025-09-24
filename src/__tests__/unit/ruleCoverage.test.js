/**
 * Comprehensive ESLint Rule Coverage Tests
 *
 * This test file ensures that all ESLint rules configured in our style guide
 * are properly tested and behave as expected.
 */

const { ESLint } = require('eslint');

const jsEslintConfig = require('../../javascript/eslint.config.js');
const tsEslintConfig = require('../../typescript/eslint.config.js');

describe('ESLint Rule Coverage', () => {
  describe('TypeScript Rules', () => {
    let _eslint;

    beforeAll(() => {
      /* Create ESLint instance with minimal config to test individual rules */
      _eslint = new ESLint({
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint'],
        },
        useEslintrc: false,
      });
    });

    describe('Semicolons', () => {
      test('@stylistic/ts/semi enforces semicolons', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            plugins: ['@stylistic/ts'],
            rules: {
              '@stylistic/ts/semi': tsEslintConfig.rules['@stylistic/ts/semi'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('const x = 5\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages).toHaveLength(1);
        expect(results[0].messages[0].ruleId).toBe('@stylistic/ts/semi');
      });
    });

    describe('Quotes', () => {
      test('@stylistic/ts/quotes enforces single quotes', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            plugins: ['@stylistic/ts'],
            rules: {
              '@stylistic/ts/quotes': tsEslintConfig.rules['@stylistic/ts/quotes'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('const x = "test";\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages).toHaveLength(1);
        expect(results[0].messages[0].ruleId).toBe('@stylistic/ts/quotes');
      });
    });

    describe('Spacing Rules', () => {
      test('object-curly-spacing requires spaces in TypeScript', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'object-curly-spacing': tsEslintConfig.rules['object-curly-spacing'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('const obj = {a: 1};\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'object-curly-spacing')).toBe(true);
      });

      test('array-bracket-spacing disallows spaces', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'array-bracket-spacing': tsEslintConfig.rules['array-bracket-spacing'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('const arr = [ 1, 2 ];\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'array-bracket-spacing')).toBe(true);
      });
    });

    describe('Import/Export Rules', () => {
      test('import/no-default-export prevents default exports', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            plugins: ['import'],
            rules: {
              'import/no-default-export': tsEslintConfig.rules['import/no-default-export'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('export default class Foo {}\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'import/no-default-export')).toBe(true);
      });
    });

    describe('Control Structures', () => {
      test('curly enforces braces for all control structures', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              curly: tsEslintConfig.rules.curly,
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('if (true) console.log("test");\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'curly')).toBe(true);
      });
    });

    describe('Modern JavaScript Features', () => {
      test('prefer-const enforces const for unchanged variables', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'prefer-const': tsEslintConfig.rules['prefer-const'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('let x = 5;\nconsole.log(x);\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'prefer-const')).toBe(true);
      });

      test('no-var prevents var usage', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parser: '@typescript-eslint/parser',
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'no-var': tsEslintConfig.rules['no-var'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('var x = 5;\n', {
          filePath: 'test.ts',
        });
        expect(results[0].messages.some((m) => m.ruleId === 'no-var')).toBe(true);
      });
    });
  });

  describe('JavaScript Rules', () => {
    let _eslint;

    beforeAll(() => {
      _eslint = new ESLint({
        baseConfig: {
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
        },
        useEslintrc: false,
      });
    });

    describe('Semicolons', () => {
      test('semi enforces semicolons', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              semi: jsEslintConfig.rules.semi,
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText('const x = 5\n');
        expect(results[0].messages).toHaveLength(1);
        expect(results[0].messages[0].ruleId).toBe('semi');
      });
    });

    describe('Quotes', () => {
      test('quotes enforces single quotes but allows template literals', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              quotes: jsEslintConfig.rules.quotes,
            },
          },
          useEslintrc: false,
        });

        /* Should error on double quotes */
        const doubleQuoteResults = await eslintWithRule.lintText('const x = "test";\n');
        expect(doubleQuoteResults[0].messages.some((m) => m.ruleId === 'quotes')).toBe(true);

        /* Should allow template literals */
        const templateResults = await eslintWithRule.lintText('const x = `test`;\n');
        expect(templateResults[0].messages).toHaveLength(0);
      });
    });

    describe('Spacing Rules', () => {
      test('object-curly-spacing requires spaces in JavaScript', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'object-curly-spacing': jsEslintConfig.rules['object-curly-spacing'],
            },
          },
          useEslintrc: false,
        });

        /* Should error on missing spaces */
        const results = await eslintWithRule.lintText('const obj = {a: 1};\n');
        expect(results[0].messages.some((m) => m.ruleId === 'object-curly-spacing')).toBe(true);

        /* Should allow spaces */
        const correctResults = await eslintWithRule.lintText('const obj = { a: 1 };\n');
        expect(correctResults[0].messages).toHaveLength(0);
      });
    });

    describe('Console Usage', () => {
      test('no-console allows warn and error in JavaScript', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'no-console': jsEslintConfig.rules['no-console'],
            },
          },
          useEslintrc: false,
        });

        /* Should error on console.log */
        const logResults = await eslintWithRule.lintText('console.log("test");\n');
        expect(logResults[0].messages.some((m) => m.ruleId === 'no-console')).toBe(true);

        /* Should allow console.warn */
        const warnResults = await eslintWithRule.lintText('console.warn("test");\n');
        expect(warnResults[0].messages).toHaveLength(0);

        /* Should allow console.error */
        const errorResults = await eslintWithRule.lintText('console.error("test");\n');
        expect(errorResults[0].messages).toHaveLength(0);
      });
    });

    describe('Function Style', () => {
      test('prefer-arrow-callback enforces arrow functions', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'prefer-arrow-callback': jsEslintConfig.rules['prefer-arrow-callback'],
            },
          },
          useEslintrc: false,
        });

        const results = await eslintWithRule.lintText(
          '[1, 2].map(function(x) { return x * 2; });\n'
        );
        expect(results[0].messages.some((m) => m.ruleId === 'prefer-arrow-callback')).toBe(true);
      });
    });

    describe('Best Practices', () => {
      test('eqeqeq enforces strict equality except for null', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              eqeqeq: jsEslintConfig.rules.eqeqeq,
            },
          },
          useEslintrc: false,
        });

        /* Should error on loose equality */
        const looseResults = await eslintWithRule.lintText('if (x == 5) {}\n');
        expect(looseResults[0].messages.some((m) => m.ruleId === 'eqeqeq')).toBe(true);

        /* Should allow null comparison */
        const nullResults = await eslintWithRule.lintText('if (x == null) {}\n');
        expect(nullResults[0].messages).toHaveLength(0);
      });

      test('no-unused-vars ignores underscore-prefixed variables', async () => {
        const eslintWithRule = new ESLint({
          baseConfig: {
            parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
            rules: {
              'no-unused-vars': jsEslintConfig.rules['no-unused-vars'],
            },
          },
          useEslintrc: false,
        });

        /* Should error on unused variable */
        const unusedResults = await eslintWithRule.lintText('const unused = 5;\n');
        expect(unusedResults[0].messages.some((m) => m.ruleId === 'no-unused-vars')).toBe(true);

        /* Should ignore underscore-prefixed */
        const underscoreResults = await eslintWithRule.lintText('const _ignored = 5;\n');
        expect(underscoreResults[0].messages).toHaveLength(0);
      });
    });
  });

  describe('Rule Differences Between TypeScript and JavaScript', () => {
    test('object-curly-spacing is consistent between configs', () => {
      /* Both TS and JS require spaces (aligned with Prettier) */
      expect(tsEslintConfig.rules['object-curly-spacing']).toEqual(['error', 'always']);
      expect(jsEslintConfig.rules['object-curly-spacing']).toEqual(['error', 'always']);
    });

    test('no-console differs between configs', () => {
      /* TypeScript errors on all console */
      expect(tsEslintConfig.rules['no-console']).toBe('error');
      /* JavaScript allows warn and error */
      expect(jsEslintConfig.rules['no-console']).toEqual(['error', { allow: ['warn', 'error'] }]);
    });

    test('brace-style differs between configs', () => {
      /* TypeScript doesn't allow single line */
      expect(tsEslintConfig.rules['brace-style']).toEqual([
        'error',
        '1tbs',
        { allowSingleLine: false },
      ]);
      /* JavaScript allows single line */
      expect(jsEslintConfig.rules['brace-style']).toEqual([
        'error',
        '1tbs',
        { allowSingleLine: true },
      ]);
    });
  });

  describe('Custom TXI Rules', () => {
    test('all custom rules are present in TypeScript config', () => {
      expect(tsEslintConfig.rules['@trafficbyintent/no-debug-artifacts']).toBeDefined();
      expect(tsEslintConfig.rules['@trafficbyintent/no-dynamic-test-data']).toBeDefined();
      expect(tsEslintConfig.rules['@trafficbyintent/require-descriptive-test-names']).toBeDefined();
      expect(tsEslintConfig.rules['@trafficbyintent/require-error-context']).toBeDefined();
    });

    test('custom debug artifacts rule allows console.warn and error', () => {
      expect(tsEslintConfig.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
        'error',
        {
          allowConsoleWarn: true,
          allowConsoleError: true,
        },
      ]);
    });
  });

  describe('Rule Configuration Validation', () => {
    test('all TypeScript rules have valid configurations', () => {
      Object.entries(tsEslintConfig.rules).forEach(([_ruleName, ruleConfig]) => {
        /* Rule should be either a string or array */
        expect(typeof ruleConfig === 'string' || Array.isArray(ruleConfig)).toBe(true);

        /* If array, first element should be severity */
        if (Array.isArray(ruleConfig)) {
          expect(['error', 'warn', 'off']).toContain(ruleConfig[0]);
        }
      });
    });

    test('all JavaScript rules have valid configurations', () => {
      Object.entries(jsEslintConfig.rules).forEach(([_ruleName, ruleConfig]) => {
        /* Rule should be either a string or array */
        expect(typeof ruleConfig === 'string' || Array.isArray(ruleConfig)).toBe(true);

        /* If array, first element should be severity */
        if (Array.isArray(ruleConfig)) {
          expect(['error', 'warn', 'off']).toContain(ruleConfig[0]);
        }
      });
    });

    test('TypeScript config has all expected properties', () => {
      expect(tsEslintConfig.parser).toBe('@typescript-eslint/parser');
      expect(tsEslintConfig.parserOptions).toBeDefined();
      expect(tsEslintConfig.extends).toBeDefined();
      expect(tsEslintConfig.plugins).toBeDefined();
      expect(tsEslintConfig.rules).toBeDefined();
      expect(tsEslintConfig.overrides).toBeDefined();
    });

    test('JavaScript config has all expected properties', () => {
      expect(jsEslintConfig.parserOptions).toBeDefined();
      expect(jsEslintConfig.extends).toBeDefined();
      expect(jsEslintConfig.env).toBeDefined();
      expect(jsEslintConfig.rules).toBeDefined();
    });
  });
});
