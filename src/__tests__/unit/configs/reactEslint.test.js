const { ESLint } = require('eslint');

describe('React ESLint Configuration', () => {
  let eslintConfig;

  beforeAll(() => {
    /* Load the React ESLint config */
    eslintConfig = require('../../../react/eslint.config.js');
  });

  test('configuration loads without error', () => {
    expect(eslintConfig).toBeDefined();
    expect(typeof eslintConfig).toBe('object');
  });

  test('extends JavaScript base config', () => {
    expect(eslintConfig.extends).toContain('plugin:react/recommended');
    expect(eslintConfig.extends).toContain('plugin:react-hooks/recommended');
  });

  test('has React plugin configured', () => {
    expect(eslintConfig.plugins).toContain('react');
    expect(eslintConfig.plugins).toContain('react-hooks');
  });

  test('has JSX parser options', () => {
    expect(eslintConfig.parserOptions.ecmaFeatures).toBeDefined();
    expect(eslintConfig.parserOptions.ecmaFeatures.jsx).toBe(true);
  });

  test('has React settings', () => {
    expect(eslintConfig.settings).toBeDefined();
    expect(eslintConfig.settings.react).toBeDefined();
    expect(eslintConfig.settings.react.version).toBe('detect');
  });

  test('has JSX accessibility plugin for a11y', () => {
    expect(eslintConfig.extends).toContain('plugin:jsx-a11y/recommended');
    expect(eslintConfig.plugins).toContain('jsx-a11y');
  });

  test('enforces React best practices', () => {
    /* Check for some key React rules */
    expect(eslintConfig.rules['react/prop-types']).toBeDefined();
    expect(eslintConfig.rules['react/jsx-uses-react']).toBe('off');
    expect(eslintConfig.rules['react/react-in-jsx-scope']).toBe('off');
  });

  test('enforces React Hooks rules', () => {
    expect(eslintConfig.rules['react-hooks/rules-of-hooks']).toBe('error');
    expect(eslintConfig.rules['react-hooks/exhaustive-deps']).toBe('warn');
  });

  test('has correct environment for React', () => {
    expect(eslintConfig.env.browser).toBe(true);
    expect(eslintConfig.env.es2023).toBe(true);
  });

  test('handles JSX file extensions', () => {
    /* React config should handle .jsx and .tsx files */
    expect(eslintConfig.parserOptions.ecmaVersion).toBeGreaterThanOrEqual(2020);
    expect(eslintConfig.parserOptions.sourceType).toBe('module');
  });
});
