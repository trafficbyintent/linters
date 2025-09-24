const prettier = require('prettier');

const jsPrettierConfig = require('../../../javascript/prettier.config.js');
const tsPrettierConfig = require('../../../typescript/prettier.config.js');

describe('Prettier Configurations', () => {
  describe('TypeScript Prettier Config', () => {
    test('has correct basic settings', () => {
      expect(tsPrettierConfig.semi).toBe(true);
      expect(tsPrettierConfig.singleQuote).toBe(true);
      expect(tsPrettierConfig.tabWidth).toBe(2);
      expect(tsPrettierConfig.useTabs).toBe(false);
      expect(tsPrettierConfig.printWidth).toBe(100);
    });

    test('has correct trailing comma setting', () => {
      expect(tsPrettierConfig.trailingComma).toBe('all');
    });

    test('has correct arrow parens setting', () => {
      expect(tsPrettierConfig.arrowParens).toBe('always');
    });

    test('has correct bracket settings', () => {
      expect(tsPrettierConfig.bracketSpacing).toBe(true);
      expect(tsPrettierConfig.bracketSameLine).toBe(false);
    });

    test('has correct quote props setting', () => {
      expect(tsPrettierConfig.quoteProps).toBe('as-needed');
    });

    test('formats TypeScript code correctly', async () => {
      const input = `const obj={a:1,b:2,c:3}`;
      const expected = `const obj = { a: 1, b: 2, c: 3 };\n`;

      const formatted = await prettier.format(input, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBe(expected);
    });

    test('adds trailing commas in TypeScript', async () => {
      const input = `const obj = {
  a: 1,
  b: 2
}`;
      const expected = `const obj = {
  a: 1,
  b: 2,
};\n`;

      const formatted = await prettier.format(input, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBe(expected);
    });

    test('formats function with arrow parens', async () => {
      const input = `const fn = x => x + 1`;
      const expected = `const fn = (x) => x + 1;\n`;

      const formatted = await prettier.format(input, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBe(expected);
    });

    test('uses single quotes', async () => {
      const input = `const str = "hello world"`;
      const expected = `const str = 'hello world';\n`;

      const formatted = await prettier.format(input, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBe(expected);
    });

    test('respects print width', async () => {
      const input = `const veryLongVariableName = { propertyOne: 'value1', propertyTwo: 'value2', propertyThree: 'value3', propertyFour: 'value4' }`;

      const formatted = await prettier.format(input, {
        ...tsPrettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toContain('\n');
    });
  });

  describe('JavaScript Prettier Config', () => {
    test('has correct basic settings', () => {
      expect(jsPrettierConfig.semi).toBe(true);
      expect(jsPrettierConfig.singleQuote).toBe(true);
      expect(jsPrettierConfig.tabWidth).toBe(2);
      expect(jsPrettierConfig.useTabs).toBe(false);
      expect(jsPrettierConfig.printWidth).toBe(100);
    });

    test('has different trailing comma setting for JavaScript', () => {
      expect(jsPrettierConfig.trailingComma).toBe('es5');
    });

    test('formats JavaScript code correctly', async () => {
      const input = `const obj={a:1,b:2,c:3}`;
      const expected = `const obj = { a: 1, b: 2, c: 3 };\n`;

      const formatted = await prettier.format(input, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBe(expected);
    });

    test('adds ES5 trailing commas only', async () => {
      const input = `const obj = {
  a: 1,
  b: 2
}`;
      const expected = `const obj = {
  a: 1,
  b: 2,
};\n`;

      const formatted = await prettier.format(input, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBe(expected);
    });

    test('does not add trailing commas to function parameters', async () => {
      const input = `function test(
  param1,
  param2
) {}`;
      const expected = `function test(param1, param2) {}\n`;

      const formatted = await prettier.format(input, {
        ...jsPrettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBe(expected);
    });

    test('handles JSX if present', () => {
      expect(jsPrettierConfig.jsxSingleQuote).toBe(false);
      expect(jsPrettierConfig.jsxBracketSameLine).not.toBeDefined();
    });
  });

  describe('Config Compatibility', () => {
    test('both configs have compatible base settings', () => {
      expect(tsPrettierConfig.semi).toBe(jsPrettierConfig.semi);
      expect(tsPrettierConfig.singleQuote).toBe(jsPrettierConfig.singleQuote);
      expect(tsPrettierConfig.tabWidth).toBe(jsPrettierConfig.tabWidth);
      expect(tsPrettierConfig.useTabs).toBe(jsPrettierConfig.useTabs);
      expect(tsPrettierConfig.printWidth).toBe(jsPrettierConfig.printWidth);
      expect(tsPrettierConfig.arrowParens).toBe(jsPrettierConfig.arrowParens);
    });

    test('configs have expected differences', () => {
      /* TypeScript uses 'all' for maximum trailing commas */
      expect(tsPrettierConfig.trailingComma).toBe('all');
      /* JavaScript uses 'es5' for compatibility */
      expect(jsPrettierConfig.trailingComma).toBe('es5');
    });
  });
});
