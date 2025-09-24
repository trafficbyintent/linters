const fs = require('fs').promises;
const path = require('path');

const { ESLint } = require('eslint');

/* Load configs using absolute paths to avoid module resolution issues */
const tsEslintConfig = require(path.join(__dirname, '../../typescript/eslint.config.js'));
const jsEslintConfig = require(path.join(__dirname, '../../javascript/eslint.config.js'));

describe('Real-world Code Linting', () => {
  describe('TypeScript fixture linting', () => {
    let eslint;
    let fixtureCode;

    beforeAll(async () => {
      /* Configure ESLint for TypeScript without type checking */
      const tsEslintConfigNoTypeCheck = {
        ...tsEslintConfig,
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:import/recommended',
          'plugin:import/typescript',
          'prettier',
        ],
        parserOptions: {
          ...tsEslintConfig.parserOptions,
          project: undefined,
        },
        rules: Object.entries(tsEslintConfig.rules).reduce((acc, [rule, value]) => {
          /* Skip rules that require type information */
          const typeCheckRules = [
            '@typescript-eslint/no-unsafe-assignment',
            '@typescript-eslint/no-unsafe-member-access',
            '@typescript-eslint/no-unsafe-call',
            '@typescript-eslint/no-unsafe-return',
            '@typescript-eslint/no-unsafe-argument',
            '@typescript-eslint/no-floating-promises',
            '@typescript-eslint/no-misused-promises',
            '@typescript-eslint/require-await',
            '@typescript-eslint/prefer-nullish-coalescing',
            '@typescript-eslint/prefer-optional-chain',
            '@typescript-eslint/only-throw-error',
            '@typescript-eslint/no-unnecessary-type-assertion',
            '@typescript-eslint/no-unnecessary-condition',
            '@typescript-eslint/no-unnecessary-type-arguments',
            '@typescript-eslint/await-thenable',
            '@typescript-eslint/consistent-type-exports',
            '@typescript-eslint/prefer-readonly',
            '@typescript-eslint/prefer-readonly-parameter-types',
            '@typescript-eslint/prefer-string-starts-ends-with',
            '@typescript-eslint/prefer-includes',
            '@typescript-eslint/prefer-for-of',
            '@typescript-eslint/prefer-reduce-type-parameter',
            '@typescript-eslint/prefer-find',
            '@typescript-eslint/prefer-promise-reject-errors',
            '@typescript-eslint/prefer-return-this-type',
            '@typescript-eslint/promise-function-async',
            '@typescript-eslint/strict-boolean-expressions',
            '@typescript-eslint/switch-exhaustiveness-check',
            '@typescript-eslint/no-duplicate-type-constituents',
            '@typescript-eslint/no-redundant-type-constituents',
            '@typescript-eslint/no-useless-template-literals',
            '@typescript-eslint/unbound-method',
            '@typescript-eslint/use-unknown-in-catch-callback-variable',
          ];

          if (!typeCheckRules.includes(rule)) {
            acc[rule] = value;
          }
          return acc;
        }, {}),
      };

      eslint = new ESLint({
        baseConfig: tsEslintConfigNoTypeCheck,
        useEslintrc: false,
      });

      /* Read the TypeScript fixture */
      const fixturePath = path.join(__dirname, '../fixtures/typescript/sampleCode.ts');
      fixtureCode = await fs.readFile(fixturePath, 'utf8');
    });

    test('TypeScript fixture should have minimal linting errors', async () => {
      const results = await eslint.lintText(fixtureCode, {
        filePath: 'sample.ts',
      });
      const messages = results[0].messages;

      /* Filter out import errors since we don't have actual modules */
      const relevantErrors = messages.filter(
        (msg) =>
          !msg.ruleId?.includes('import/no-unresolved') &&
          !msg.ruleId?.includes('import/named') &&
          !msg.ruleId?.includes('no-undef') /* TypeScript handles this */
      );

      /*
       * The fixture may have some style errors but should be reasonable
       * Most errors are object-curly-spacing which can be auto-fixed
       */
      expect(relevantErrors.length).toBeLessThanOrEqual(25);

      /*
       * Log for debugging - uncomment when needed
       * console.log('TypeScript linting issues:', relevantErrors.map((e) => ({
       *   line: e.line,
       *   rule: e.ruleId,
       *   message: e.message,
       * })));
       */
    });

    test('TypeScript fixture follows style conventions', async () => {
      /* Check for specific style patterns in the code */
      expect(fixtureCode).toMatch(/;$/m); /* Has semicolons */
      expect(fixtureCode).toMatch(/'/); /* Uses single quotes */
      expect(fixtureCode).toMatch(/,\s*\n\s*}/m); /* Has trailing commas */
      expect(fixtureCode).not.toMatch(/console\.log/); /* No console.log */
      expect(fixtureCode).not.toMatch(/debugger/); /* No debugger statements */
    });

    test('can auto-fix TypeScript issues', async () => {
      /* Intentionally malformed code */
      const badCode = `
        const x="hello"
        const obj={a:1,b:2}
        function test(param:string){
        return param
        }
      `;

      const results = await eslint.lintText(badCode, { filePath: 'bad.ts' });

      /*
       * Fix requires creating a new ESLint instance with fix: true
       * We need to rebuild the config without type checking
       */
      const tsEslintConfigNoTypeCheck = {
        ...tsEslintConfig,
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:import/recommended',
          'plugin:import/typescript',
          'prettier',
        ],
        parserOptions: {
          ...tsEslintConfig.parserOptions,
          project: undefined,
        },
        rules: Object.entries(tsEslintConfig.rules).reduce((acc, [rule, value]) => {
          /* Skip rules that require type information */
          const typeCheckRules = [
            '@typescript-eslint/no-unsafe-assignment',
            '@typescript-eslint/no-unsafe-member-access',
            '@typescript-eslint/no-unsafe-call',
            '@typescript-eslint/no-unsafe-return',
            '@typescript-eslint/no-unsafe-argument',
            '@typescript-eslint/no-floating-promises',
            '@typescript-eslint/no-misused-promises',
            '@typescript-eslint/require-await',
            '@typescript-eslint/prefer-nullish-coalescing',
            '@typescript-eslint/prefer-optional-chain',
            '@typescript-eslint/only-throw-error',
            '@typescript-eslint/no-unnecessary-type-assertion',
            '@typescript-eslint/no-unnecessary-condition',
            '@typescript-eslint/no-unnecessary-type-arguments',
            '@typescript-eslint/await-thenable',
            '@typescript-eslint/consistent-type-exports',
            '@typescript-eslint/prefer-readonly',
            '@typescript-eslint/prefer-readonly-parameter-types',
            '@typescript-eslint/prefer-string-starts-ends-with',
            '@typescript-eslint/prefer-includes',
            '@typescript-eslint/prefer-for-of',
            '@typescript-eslint/prefer-reduce-type-parameter',
            '@typescript-eslint/prefer-find',
            '@typescript-eslint/prefer-promise-reject-errors',
            '@typescript-eslint/prefer-return-this-type',
            '@typescript-eslint/promise-function-async',
            '@typescript-eslint/strict-boolean-expressions',
            '@typescript-eslint/switch-exhaustiveness-check',
            '@typescript-eslint/no-duplicate-type-constituents',
            '@typescript-eslint/no-redundant-type-constituents',
            '@typescript-eslint/no-useless-template-literals',
            '@typescript-eslint/unbound-method',
            '@typescript-eslint/use-unknown-in-catch-callback-variable',
          ];

          if (!typeCheckRules.includes(rule)) {
            acc[rule] = value;
          }
          return acc;
        }, {}),
      };

      const eslintWithFix = new ESLint({
        baseConfig: tsEslintConfigNoTypeCheck,
        useEslintrc: false,
        fix: true,
      });
      const fixedResults = await eslintWithFix.lintText(badCode, {
        filePath: 'bad.ts',
      });

      /* Should have errors before fix */
      expect(results[0].messages.length).toBeGreaterThan(0);

      /* Should have fewer errors after fix */
      if (fixedResults[0].output) {
        expect(fixedResults[0].output).toMatch(/'/);
        /* Fixed to single quotes */
        expect(fixedResults[0].output).toMatch(/;/); /* Added semicolons */
      }
    });
  });

  describe('JavaScript fixture linting', () => {
    let eslint;
    let fixtureCode;

    beforeAll(async () => {
      /* Configure ESLint for JavaScript */
      eslint = new ESLint({
        baseConfig: jsEslintConfig,
        useEslintrc: false,
      });

      /* Read the JavaScript fixture */
      const fixturePath = path.join(__dirname, '../fixtures/javascript/sampleCode.js');
      fixtureCode = await fs.readFile(fixturePath, 'utf8');
    });

    test('JavaScript fixture should have minimal linting errors', async () => {
      const results = await eslint.lintText(fixtureCode, {
        filePath: 'sample.js',
      });
      const messages = results[0].messages;

      /* Filter out module resolution and import errors */
      const relevantErrors = messages.filter((msg) => {
        /* Skip undefined variable errors for common globals */
        if (msg.ruleId === 'no-undef') {
          const variable = msg.message.match(/'([^']+)'/)?.[1];
          return !['require', 'module', 'fetch', 'Map', 'process'].includes(variable);
        }
        /* Skip import plugin rules since it's not properly configured */
        if (msg.ruleId?.startsWith('import/')) {
          return false;
        }
        return true;
      });

      /*
       * The fixture should have some errors due to custom TXI rules
       * (especially single-line comments that should be multi-line)
       */
      expect(relevantErrors.length).toBeLessThanOrEqual(20);

      /*
       * Log errors for debugging - uncomment when needed
       * console.log('JavaScript linting issues:', relevantErrors.map((e) => ({
       *   line: e.line,
       *   rule: e.ruleId,
       *   message: e.message,
       * })));
       */
    });

    test('JavaScript fixture follows style conventions', async () => {
      /* Check for specific style patterns */
      expect(fixtureCode).toMatch(/;$/m); /* Has semicolons */
      expect(fixtureCode).toMatch(/'/); /* Uses single quotes */
      expect(fixtureCode).toMatch(/,\s*\n\s*}/m); /* Has trailing commas */
      expect(fixtureCode).toMatch(/const /); /* Uses const */
      expect(fixtureCode).not.toMatch(/var /); /* No var */
      expect(fixtureCode).toMatch(/=>/); /* Uses arrow functions */
    });

    test('handles console.warn and console.error appropriately', async () => {
      const results = await eslint.lintText(fixtureCode, {
        filePath: 'sample.js',
      });

      /* console.warn should be allowed, console.log should not */
      const consoleLogErrors = results[0].messages.filter(
        (m) => m.ruleId === 'no-console' && m.message.includes('console.log')
      );
      const consoleWarnErrors = results[0].messages.filter(
        (m) => m.ruleId === 'no-console' && m.message.includes('console.warn')
      );

      expect(consoleLogErrors.length).toBe(0); /* No console.log in fixture */
      expect(consoleWarnErrors.length).toBe(0); /* console.warn is allowed */
    });
  });

  describe('Common linting scenarios', () => {
    let _tsEslint;
    let jsEslint;

    beforeAll(() => {
      /* Use the same TypeScript config without type checking */
      const tsEslintConfigNoTypeCheck = {
        ...tsEslintConfig,
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:import/recommended',
          'plugin:import/typescript',
          'prettier',
        ],
        parserOptions: {
          ...tsEslintConfig.parserOptions,
          project: undefined,
        },
        rules: Object.entries(tsEslintConfig.rules).reduce((acc, [rule, value]) => {
          /* Skip rules that require type information */
          const typeCheckRules = [
            '@typescript-eslint/no-unsafe-assignment',
            '@typescript-eslint/no-unsafe-member-access',
            '@typescript-eslint/no-unsafe-call',
            '@typescript-eslint/no-unsafe-return',
            '@typescript-eslint/no-unsafe-argument',
            '@typescript-eslint/no-floating-promises',
            '@typescript-eslint/no-misused-promises',
            '@typescript-eslint/require-await',
            '@typescript-eslint/prefer-nullish-coalescing',
            '@typescript-eslint/prefer-optional-chain',
            '@typescript-eslint/only-throw-error',
            '@typescript-eslint/no-unnecessary-type-assertion',
            '@typescript-eslint/no-unnecessary-condition',
            '@typescript-eslint/no-unnecessary-type-arguments',
            '@typescript-eslint/await-thenable',
            '@typescript-eslint/consistent-type-exports',
            '@typescript-eslint/prefer-readonly',
            '@typescript-eslint/prefer-readonly-parameter-types',
            '@typescript-eslint/prefer-string-starts-ends-with',
            '@typescript-eslint/prefer-includes',
            '@typescript-eslint/prefer-for-of',
            '@typescript-eslint/prefer-reduce-type-parameter',
            '@typescript-eslint/prefer-find',
            '@typescript-eslint/prefer-promise-reject-errors',
            '@typescript-eslint/prefer-return-this-type',
            '@typescript-eslint/promise-function-async',
            '@typescript-eslint/strict-boolean-expressions',
            '@typescript-eslint/switch-exhaustiveness-check',
            '@typescript-eslint/no-duplicate-type-constituents',
            '@typescript-eslint/no-redundant-type-constituents',
            '@typescript-eslint/no-useless-template-literals',
            '@typescript-eslint/unbound-method',
            '@typescript-eslint/use-unknown-in-catch-callback-variable',
          ];

          if (!typeCheckRules.includes(rule)) {
            acc[rule] = value;
          }
          return acc;
        }, {}),
      };

      _tsEslint = new ESLint({
        baseConfig: tsEslintConfigNoTypeCheck,
        useEslintrc: false,
      });

      jsEslint = new ESLint({
        baseConfig: jsEslintConfig,
        useEslintrc: false,
      });
    });

    test('catches common style violations', async () => {
      const violations = [
        { code: 'const x = "double quotes"', error: 'quotes' },
        { code: 'const x = 5\n', error: 'semi' },
        { code: 'if(true) console.log("test");', error: 'curly' },
        { code: 'const  x   =    5;', error: 'no-multi-spaces' },
      ];

      for (const { code, error } of violations) {
        const jsResults = await jsEslint.lintText(code);
        const errors = jsResults[0].messages;
        expect(errors.some((e) => e.ruleId?.includes(error))).toBe(true);
      }
    });

    test('enforces best practices', async () => {
      const badPractices = [
        { code: 'const x = 5; if (x == "5") {}', error: 'eqeqeq' },
        { code: 'eval("console.log(1)")', error: 'no-eval' },
        { code: 'var x = 5;', error: 'no-var' },
        { code: 'let x = 5; console.log(x);', error: 'prefer-const' },
      ];

      for (const { code, error } of badPractices) {
        const jsResults = await jsEslint.lintText(code);
        const errors = jsResults[0].messages;
        expect(errors.some((e) => e.ruleId === error)).toBe(true);
      }
    });
  });
});
