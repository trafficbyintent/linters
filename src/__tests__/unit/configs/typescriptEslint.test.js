const _fs = require('fs');
const _path = require('path');

const { ESLint } = require('eslint');

describe('TypeScript ESLint Configuration', () => {
  let eslintConfig;
  let eslint;

  beforeAll(() => {
    /* Load the TypeScript ESLint config */
    eslintConfig = require('../../../typescript/eslint.config.js');
  });

  test('uses correct TypeScript parser', () => {
    expect(eslintConfig.parser).toBe('@typescript-eslint/parser');
  });

  test('has required extends', () => {
    expect(eslintConfig.extends).toContain('eslint:recommended');
    expect(eslintConfig.extends).toContain('plugin:@typescript-eslint/recommended');
    expect(eslintConfig.extends).toContain(
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    );
    expect(eslintConfig.extends).toContain('prettier');
  });

  test('has required plugins', () => {
    expect(eslintConfig.plugins).toContain('@typescript-eslint');
    expect(eslintConfig.plugins).toContain('import');
  });

  test('has correct parser options', () => {
    expect(eslintConfig.parserOptions.ecmaVersion).toBe(2022);
    expect(eslintConfig.parserOptions.sourceType).toBe('module');
    expect(eslintConfig.parserOptions.project).toBe('./tsconfig.json');
  });

  test('enforces semicolons', () => {
    expect(eslintConfig.rules['@stylistic/ts/semi']).toEqual(['error', 'always']);
  });

  test('enforces single quotes', () => {
    expect(eslintConfig.rules['@stylistic/ts/quotes']).toEqual([
      'error',
      'single',
      { avoidEscape: true },
    ]);
  });

  test('enforces trailing commas', () => {
    expect(eslintConfig.rules['comma-dangle']).toEqual([
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ]);
  });

  test('has TXI custom rules configured', () => {
    expect(eslintConfig.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
      'error',
      {
        allowConsoleWarn: true,
        allowConsoleError: true,
      },
    ]);
    expect(eslintConfig.rules['@trafficbyintent/no-dynamic-test-data']).toBe('error');
    expect(eslintConfig.rules['@trafficbyintent/require-descriptive-test-names']).toBe('error');
    expect(eslintConfig.rules['@trafficbyintent/require-error-context']).toBe('error');
  });

  describe('linting behavior', () => {
    beforeAll(async () => {
      /* Create a minimal ESLint instance for testing */
      /* Use simplified config without type checking */
      const configWithoutTypeChecking = {
        ...eslintConfig,
        parserOptions: {
          ...eslintConfig.parserOptions,
          project: undefined,
        },
        extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
        plugins: ['@typescript-eslint', '@stylistic/ts'],
        rules: {
          /* Only include the rules we're testing */
          semi: 'off',
          quotes: 'off',
          '@stylistic/ts/semi': eslintConfig.rules['@stylistic/ts/semi'],
          '@stylistic/ts/quotes': eslintConfig.rules['@stylistic/ts/quotes'],
          'comma-dangle': eslintConfig.rules['comma-dangle'],
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': 'off',
        },
      };

      eslint = new ESLint({
        baseConfig: configWithoutTypeChecking,
        useEslintrc: false,
      });
    });

    test('catches missing semicolons', async () => {
      const results = await eslint.lintText('const x = 5\n', {
        filePath: 'test.ts',
      });
      const errors = results[0].messages;
      expect(errors).toHaveLength(1);
      expect(errors[0].ruleId).toBe('@stylistic/ts/semi');
    });

    test('catches double quotes', async () => {
      const results = await eslint.lintText('const x = "hello";\n', {
        filePath: 'test.ts',
      });
      const errors = results[0].messages;
      expect(errors).toHaveLength(1);
      expect(errors[0].ruleId).toBe('@stylistic/ts/quotes');
    });

    test('allows single quotes', async () => {
      const results = await eslint.lintText("const x = 'hello';\n", {
        filePath: 'test.ts',
      });
      expect(results[0].messages).toHaveLength(0);
    });

    test('catches missing trailing commas in multiline objects', async () => {
      const code = `const obj = {
  a: 1,
  b: 2
};`;
      const results = await eslint.lintText(code, { filePath: 'test.ts' });
      const errors = results[0].messages;
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.ruleId === 'comma-dangle')).toBe(true);
    });

    test('allows trailing commas in multiline objects', async () => {
      const code = `const obj = {
  a: 1,
  b: 2,
};`;
      const results = await eslint.lintText(code, { filePath: 'test.ts' });
      expect(results[0].messages).toHaveLength(0);
    });
  });

  test('import rules are configured', () => {
    expect(eslintConfig.rules['import/order']).toBeDefined();
    expect(eslintConfig.rules['import/no-duplicates']).toBe('error');
    expect(eslintConfig.rules['import/no-default-export']).toBe('error');
  });

  test('naming convention rules are configured', () => {
    expect(eslintConfig.rules['@typescript-eslint/naming-convention']).toBeDefined();
    const namingRules = eslintConfig.rules['@typescript-eslint/naming-convention'];
    expect(Array.isArray(namingRules)).toBe(true);
    expect(namingRules[0]).toBe('error');
  });

  test('type safety rules are configured', () => {
    expect(eslintConfig.rules['@typescript-eslint/no-explicit-any']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/explicit-function-return-type']).toBeDefined();
    expect(eslintConfig.rules['@typescript-eslint/no-unsafe-assignment']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/no-unsafe-member-access']).toBe('error');
  });

  test('type-only import/export rules are configured', () => {
    expect(eslintConfig.rules['@typescript-eslint/consistent-type-imports']).toEqual([
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ]);
    expect(eslintConfig.rules['@typescript-eslint/consistent-type-exports']).toEqual([
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ]);
  });

  test('modern TypeScript feature rules are configured', () => {
    expect(eslintConfig.rules['@typescript-eslint/consistent-generic-constructors']).toEqual([
      'error',
      'constructor',
    ]);
    expect(eslintConfig.rules['@typescript-eslint/no-duplicate-type-constituents']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/no-redundant-type-constituents']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/no-useless-template-literals']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/prefer-find']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/prefer-promise-reject-errors']).toBe('error');
    expect(eslintConfig.rules['@typescript-eslint/prefer-return-this-type']).toBe('error');
  });

  test('switch exhaustiveness checking is enabled', () => {
    expect(eslintConfig.rules['@typescript-eslint/switch-exhaustiveness-check']).toBe('error');
  });

  test('private field naming convention enforces # prefix', () => {
    const namingRules = eslintConfig.rules['@typescript-eslint/naming-convention'];
    const privateFieldRule = namingRules.find(
      (rule) =>
        rule.selector === 'classProperty' && rule.modifiers && rule.modifiers.includes('private')
    );
    expect(privateFieldRule).toBeDefined();
    expect(privateFieldRule.prefix).toEqual(['#']);
  });

  test('test file overrides have enhanced static data enforcement', () => {
    const testOverride = eslintConfig.overrides.find(
      (o) => o.files.includes('**/*.test.ts') || o.files.includes('**/*.spec.ts')
    );
    expect(testOverride).toBeDefined();

    /* Check for crypto restrictions */
    const restrictedProps = testOverride.rules['no-restricted-properties'];
    expect(restrictedProps).toBeDefined();
    expect(Array.isArray(restrictedProps)).toBe(true);
    expect(restrictedProps[0]).toBe('error');

    /* The restrictions are in a flat array starting from index 1 */
    const restrictions = restrictedProps.slice(1);
    expect(restrictions.some((r) => r.object === 'crypto' && r.property === 'randomUUID')).toBe(
      true
    );
    expect(
      restrictions.some((r) => r.object === 'crypto' && r.property === 'getRandomValues')
    ).toBe(true);
    expect(restrictions.some((r) => r.object === 'Math' && r.property === 'random')).toBe(true);
    expect(restrictions.some((r) => r.object === 'Date' && r.property === 'now')).toBe(true);

    /* Check for new Date() restriction */
    expect(testOverride.rules['no-restricted-syntax']).toBeDefined();
    const syntaxRules = testOverride.rules['no-restricted-syntax'];
    expect(syntaxRules[0]).toBe('error');
    expect(syntaxRules[1].selector).toContain('NewExpression[callee.name="Date"]');
  });

  test('type parameter naming allows single letters and PascalCase', () => {
    const namingRules = eslintConfig.rules['@typescript-eslint/naming-convention'];
    const typeParamRule = namingRules.find((rule) => rule.selector === 'typeParameter');
    expect(typeParamRule).toBeDefined();
    expect(typeParamRule.format).toEqual(['PascalCase', 'UPPER_CASE']);
    expect(typeParamRule.custom.regex).toBe('^(T|U|K|V|[A-Z][a-zA-Z]+)$');
  });
});
