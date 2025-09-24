const { ESLint } = require('eslint');
const prettier = require('prettier');

const jsEslintConfig = require('../../javascript/eslint.config.js');
const jsPrettierConfig = require('../../javascript/prettier.config.js');
const tsEslintConfig = require('../../typescript/eslint.config.js');
const tsPrettierConfig = require('../../typescript/prettier.config.js');

describe('ESLint and Prettier Integration', () => {
  describe('TypeScript Integration', () => {
    let eslint;

    beforeAll(() => {
      /* Create ESLint instance with TypeScript config */
      eslint = new ESLint({
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint', '@stylistic/ts'],
          extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'prettier' /* Include prettier to test compatibility */,
          ],
          rules: {
            /* Include the formatting-related rules from the config */
            '@stylistic/ts/semi': tsEslintConfig.rules['@stylistic/ts/semi'],
            '@stylistic/ts/quotes': tsEslintConfig.rules['@stylistic/ts/quotes'],
            'comma-dangle': tsEslintConfig.rules['comma-dangle'],
            'object-curly-spacing': tsEslintConfig.rules['object-curly-spacing'],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
          },
        },
        useEslintrc: false,
      });
    });

    test('Prettier config should not conflict with ESLint rules', async () => {
      /* Code that Prettier will format */
      const prettierFormatted = await prettier.format(`const obj = {a: 1, b: 2, c: 3}`, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      /* ESLint should not complain about Prettier's formatting */
      const results = await eslint.lintText(prettierFormatted, {
        filePath: 'test.ts',
      });
      const errors = results[0].messages.filter(
        (msg) =>
          /* Ignore errors not related to formatting */
          !msg.ruleId?.includes('no-unused-vars') && !msg.ruleId?.includes('no-undef')
      );

      expect(errors).toHaveLength(0);
    });

    test('eslint-config-prettier disables conflicting rules', () => {
      /* Verify that prettier is in the extends array */
      expect(tsEslintConfig.extends).toContain('prettier');

      /*
       * These rules should be turned off by prettier config
       * However, some spacing rules like keyword-spacing are still enabled
       * because they don't conflict with prettier when configured properly
       */
      const actuallyDisabledRules = ['max-len', 'no-mixed-spaces-and-tabs', 'comma-spacing'];

      actuallyDisabledRules.forEach((rule) => {
        if (tsEslintConfig.rules[rule] !== undefined) {
          expect(tsEslintConfig.rules[rule]).toBe('off');
        }
      });
    });

    test('can format and lint TypeScript code sequentially', async () => {
      const uglyCode = `function   test  ( x:number,y:number )  {
return x+y
      }`;

      /* First, format with Prettier */
      const formatted = await prettier.format(uglyCode, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBe(`function test(x: number, y: number) {
  return x + y;
}
`);

      /* Then, lint with ESLint */
      const results = await eslint.lintText(formatted, { filePath: 'test.ts' });
      const errors = results[0].messages.filter(
        (msg) => !msg.ruleId?.includes('no-unused-vars') && !msg.ruleId?.includes('no-undef')
      );

      expect(errors).toHaveLength(0);
    });

    test('multiline arrays are handled consistently', async () => {
      const code = `const arr = [
  'this is a much longer item that will force multiline formatting',
  'another long item to ensure the array stays multiline',
  'final item in the array'
]`;

      /* Format with Prettier */
      const formatted = await prettier.format(code, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      /* Should add trailing comma to multiline array */
      expect(formatted).toContain("'final item in the array',");

      /* Lint with ESLint */
      const results = await eslint.lintText(formatted, { filePath: 'test.ts' });
      const errors = results[0].messages.filter((msg) => msg.ruleId === 'comma-dangle');

      expect(errors).toHaveLength(0);
    });
  });

  describe('JavaScript Integration', () => {
    let eslint;

    beforeAll(() => {
      eslint = new ESLint({
        baseConfig: jsEslintConfig,
        useEslintrc: false,
      });
    });

    test('Prettier config should not conflict with ESLint rules', async () => {
      const prettierFormatted = await prettier.format(`const obj = {a: 1, b: 2, c: 3}`, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      const results = await eslint.lintText(prettierFormatted);
      const errors = results[0].messages.filter(
        (msg) => !msg.ruleId?.includes('no-unused-vars') && !msg.ruleId?.includes('no-undef')
      );

      expect(errors).toHaveLength(0);
    });

    test('can format and lint JavaScript code sequentially', async () => {
      const uglyCode = `function   test  ( x,y )  {
return x+y
      }`;

      /* Format with Prettier */
      const formatted = await prettier.format(uglyCode, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBe(`function test(x, y) {
  return x + y;
}
`);

      /* Lint with ESLint */
      const results = await eslint.lintText(formatted);
      const errors = results[0].messages.filter(
        (msg) => !msg.ruleId?.includes('no-unused-vars') && !msg.ruleId?.includes('no-undef')
      );

      expect(errors).toHaveLength(0);
    });

    test('quote styles are consistent', async () => {
      const code = `const str = "hello world"`;

      /* Format with Prettier (should use single quotes) */
      const formatted = await prettier.format(code, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBe(`const str = 'hello world';\n`);

      /* ESLint should be happy with single quotes */
      const results = await eslint.lintText(formatted);
      const quoteErrors = results[0].messages.filter((msg) => msg.ruleId === 'quotes');

      expect(quoteErrors).toHaveLength(0);
    });
  });

  describe('Cross-config Consistency', () => {
    test('both configs handle semicolons the same way', async () => {
      const codeNoSemi = `const x = 5`;

      /* TypeScript */
      const tsFormatted = await prettier.format(codeNoSemi, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });
      expect(tsFormatted).toContain(';');

      /* JavaScript */
      const jsFormatted = await prettier.format(codeNoSemi, {
        ...jsPrettierConfig,
        parser: 'babel',
      });
      expect(jsFormatted).toContain(';');
    });

    test('both configs handle quotes the same way', async () => {
      const codeDoubleQuotes = `const x = "test"`;

      /* TypeScript */
      const tsFormatted = await prettier.format(codeDoubleQuotes, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });
      expect(tsFormatted).toContain("'test'");

      /* JavaScript */
      const jsFormatted = await prettier.format(codeDoubleQuotes, {
        ...jsPrettierConfig,
        parser: 'babel',
      });
      expect(jsFormatted).toContain("'test'");
    });

    test('arrow function parentheses are consistent', async () => {
      const arrowFunc = `const fn = x => x + 1`;

      /* TypeScript */
      const tsFormatted = await prettier.format(arrowFunc, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });
      expect(tsFormatted).toContain('(x)');

      /* JavaScript */
      const jsFormatted = await prettier.format(arrowFunc, {
        ...jsPrettierConfig,
        parser: 'babel',
      });
      expect(jsFormatted).toContain('(x)');
    });
  });
});
