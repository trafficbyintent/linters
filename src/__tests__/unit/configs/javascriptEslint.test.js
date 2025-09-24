const { ESLint } = require('eslint');

describe('JavaScript ESLint Configuration', () => {
  let eslintConfig;
  let eslint;

  beforeAll(() => {
    /* Load the JavaScript ESLint config */
    eslintConfig = require('../../../javascript/eslint.config.js');
  });

  test('has correct parser options', () => {
    expect(eslintConfig.parserOptions.ecmaVersion).toBe(2023);
    expect(eslintConfig.parserOptions.sourceType).toBe('module');
  });

  test('has required extends', () => {
    expect(eslintConfig.extends).toContain('eslint:recommended');
  });

  test('has correct environments', () => {
    expect(eslintConfig.env.es2023).toBe(true);
    expect(eslintConfig.env.node).toBe(true);
    expect(eslintConfig.env.browser).toBe(true);
  });

  test('enforces semicolons', () => {
    expect(eslintConfig.rules.semi).toEqual(['error', 'always']);
  });

  test('enforces single quotes', () => {
    expect(eslintConfig.rules.quotes).toEqual([
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ]);
  });

  test('has correct indentation rules', () => {
    expect(eslintConfig.rules.indent[0]).toBe('error');
    expect(eslintConfig.rules.indent[1]).toBe(2);
    expect(eslintConfig.rules.indent[2].SwitchCase).toBe(1);
  });

  test('enforces trailing commas', () => {
    expect(eslintConfig.rules['comma-dangle']).toEqual([
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never' /* ES5 compatibility - matches Prettier config */,
      },
    ]);
  });

  test('has variable rules configured', () => {
    expect(eslintConfig.rules['no-unused-vars']).toEqual([
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ]);
    expect(eslintConfig.rules['no-use-before-define']).toEqual([
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ]);
  });

  test('has function rules configured', () => {
    expect(eslintConfig.rules['prefer-arrow-callback']).toBe('error');
    expect(eslintConfig.rules['arrow-body-style']).toEqual(['error', 'as-needed']);
    expect(eslintConfig.rules['arrow-parens']).toEqual(['error', 'always']);
  });

  describe('linting behavior', () => {
    beforeAll(async () => {
      /* Create a config without the custom plugin for testing */
      const testConfig = {
        ...eslintConfig,
        plugins: eslintConfig.plugins.filter((p) => p !== 'txi'),
        rules: Object.entries(eslintConfig.rules).reduce((acc, [key, value]) => {
          if (!key.startsWith('txi/')) {
            acc[key] = value;
          }
          return acc;
        }, {}),
      };

      eslint = new ESLint({
        baseConfig: {
          ...testConfig,
          rules: {
            ...testConfig.rules,
            /* Disable no-unused-vars for these tests */
            'no-unused-vars': 'off',
          },
        },
        useEslintrc: false,
      });
    });

    test('catches missing semicolons', async () => {
      const results = await eslint.lintText('const x = 5\n');
      const errors = results[0].messages;
      expect(errors).toHaveLength(1);
      expect(errors[0].ruleId).toBe('semi');
    });

    test('catches double quotes', async () => {
      const results = await eslint.lintText('const x = "hello";\n');
      const errors = results[0].messages;
      expect(errors).toHaveLength(1);
      expect(errors[0].ruleId).toBe('quotes');
    });

    test('allows single quotes', async () => {
      const results = await eslint.lintText("const x = 'hello';\n");
      expect(results[0].messages).toHaveLength(0);
    });

    test('allows template literals', async () => {
      const results = await eslint.lintText('const x = `hello`;\n');
      expect(results[0].messages).toHaveLength(0);
    });

    test('catches incorrect indentation', async () => {
      const code = `function test() {
    const x = 1;
}`;
      const results = await eslint.lintText(code);
      const errors = results[0].messages;
      expect(errors.some((e) => e.ruleId === 'indent')).toBe(true);
    });

    test('allows correct indentation', async () => {
      const code = `function test() {
  const x = 1;
}`;
      const results = await eslint.lintText(code);
      const indentErrors = results[0].messages.filter((e) => e.ruleId === 'indent');
      expect(indentErrors).toHaveLength(0);
    });

    test('catches missing trailing commas in multiline objects', async () => {
      const code = `const obj = {
  a: 1,
  b: 2
};`;
      const results = await eslint.lintText(code);
      const errors = results[0].messages;
      expect(errors.some((e) => e.ruleId === 'comma-dangle')).toBe(true);
    });

    test('catches var usage', async () => {
      const results = await eslint.lintText('var x = 5;\n');
      const errors = results[0].messages;
      expect(errors.some((e) => e.ruleId === 'no-var')).toBe(true);
    });

    test('enforces const for unchanged variables', async () => {
      const code = `let x = 5;
console.log(x);`;
      const results = await eslint.lintText(code);
      const errors = results[0].messages;
      expect(errors.some((e) => e.ruleId === 'prefer-const')).toBe(true);
    });

    test('catches unused variables', async () => {
      /* Create ESLint instance with no-unused-vars enabled for this test */
      const testConfig = {
        ...eslintConfig,
        plugins: eslintConfig.plugins.filter((p) => p !== 'txi'),
        rules: Object.entries(eslintConfig.rules).reduce((acc, [key, value]) => {
          if (!key.startsWith('txi/')) {
            acc[key] = value;
          }
          return acc;
        }, {}),
      };

      const eslintWithUnused = new ESLint({
        baseConfig: testConfig,
        useEslintrc: false,
      });
      const results = await eslintWithUnused.lintText('const unused = 5;\n');
      const errors = results[0].messages;
      expect(errors.some((e) => e.ruleId === 'no-unused-vars')).toBe(true);
    });

    test('allows arrow functions', async () => {
      const code = `const fn = () => {
  return 42;
};`;
      const results = await eslint.lintText(code);
      const arrowErrors = results[0].messages.filter(
        (e) => e.ruleId === 'prefer-arrow-callback' || e.ruleId === 'arrow-parens'
      );
      expect(arrowErrors).toHaveLength(0);
    });
  });

  test('has best practice rules enabled', () => {
    expect(eslintConfig.rules.eqeqeq).toEqual(['error', 'always', { null: 'ignore' }]);
    expect(eslintConfig.rules.curly).toEqual(['error', 'all']);
    expect(eslintConfig.rules['no-eval']).toBe('error');
    expect(eslintConfig.rules['no-implied-eval']).toBe('error');
  });

  test('has ES6+ rules configured', () => {
    expect(eslintConfig.rules['no-var']).toBe('error');
    expect(eslintConfig.rules['prefer-const']).toBe('error');
    expect(eslintConfig.rules['prefer-template']).toBe('error');
    expect(eslintConfig.rules['prefer-spread']).toBe('error');
  });
});
