const path = require('path');

describe('Module Exports', () => {
  describe('Main entry point', () => {
    test('main module exports all language configurations', () => {
      const main = require('../../../index.js');

      /* Verify all expected language configurations are exported */
      expect(main).toHaveProperty('typescript');
      expect(main).toHaveProperty('javascript');
      expect(main).toHaveProperty('css');
      expect(main).toHaveProperty('react');
      expect(main).toHaveProperty('angular');
      expect(main).toHaveProperty('markdown');
      expect(main).toHaveProperty('json');
      expect(main).toHaveProperty('html');
      expect(main).toHaveProperty('terraform');
      expect(main).toHaveProperty('getConfig');
      expect(main).toHaveProperty('rules');
    });
  });

  describe('TypeScript exports', () => {
    test('typescript module exports correct configuration structure', () => {
      const ts = require('../../../typescript/index.js');

      /* Verify structure and that getESLintConfig is a function */
      expect(ts).toHaveProperty('eslint');
      expect(ts).toHaveProperty('prettier');
      expect(ts).toHaveProperty('tsconfig');
      expect(ts).toHaveProperty('customRules');
      expect(ts).toHaveProperty('getESLintConfig');
      expect(typeof ts.getESLintConfig).toBe('function');
    });

    test('typescript/eslint config has correct settings', () => {
      const eslintConfig = require('../../../typescript/eslint.config.js');

      expect(eslintConfig.parser).toBe('@typescript-eslint/parser');
      expect(eslintConfig.extends).toBeInstanceOf(Array);
      expect(eslintConfig.rules).toBeInstanceOf(Object);
    });

    test('typescript/prettier config has correct settings', () => {
      const prettierConfig = require('../../../typescript/prettier.config.js');

      expect(prettierConfig.semi).toBe(true);
      expect(prettierConfig.singleQuote).toBe(true);
    });

    test('typescript/tsconfig has proper compiler options', () => {
      const tsconfig = require('../../../typescript/tsconfig.base.json');

      expect(tsconfig).toHaveProperty('compilerOptions');
      expect(tsconfig.compilerOptions.strict).toBe(true);
      expect(tsconfig.compilerOptions.esModuleInterop).toBe(true);
    });

    test('custom rules export contains all expected rules', () => {
      const customRules = require('../../../typescript/custom-rules/index.js');
      const expectedRules = [
        'no-debug-artifacts',
        'no-dynamic-test-data',
        'require-descriptive-test-names',
        'require-error-context',
      ];

      /* Verify all expected rules are present */
      expectedRules.forEach((ruleName) => {
        expect(customRules.rules).toHaveProperty(ruleName);
        /* Verify each rule has the required ESLint structure */
        expect(customRules.rules[ruleName]).toHaveProperty('meta');
        expect(customRules.rules[ruleName]).toHaveProperty('create');
        expect(typeof customRules.rules[ruleName].create).toBe('function');
      });
    });
  });

  describe('JavaScript exports', () => {
    test('javascript module exports correct structure', () => {
      const js = require('../../../javascript/index.js');

      /* Verify structure and that getESLintConfig is a function */
      expect(js).toHaveProperty('eslint');
      expect(js).toHaveProperty('prettier');
      expect(js).toHaveProperty('getESLintConfig');
      expect(typeof js.getESLintConfig).toBe('function');
    });

    test('javascript/eslint config has correct settings', () => {
      const eslintConfig = require('../../../javascript/eslint.config.js');

      expect(eslintConfig.extends).toContain('eslint:recommended');
      expect(eslintConfig.rules).toBeInstanceOf(Object);
      expect(eslintConfig.env.node).toBe(true);
      expect(eslintConfig.env.es2023).toBe(true);
    });

    test('javascript/prettier config has correct settings', () => {
      const prettierConfig = require('../../../javascript/prettier.config.js');

      expect(prettierConfig.semi).toBe(true);
      expect(prettierConfig.singleQuote).toBe(true);
      expect(prettierConfig.printWidth).toBe(100);
    });
  });

  describe('Package.json exports field', () => {
    test('all exported paths match package.json and exist', () => {
      const packageJson = require('../../../../package.json');
      const exports = packageJson.exports;

      /* Test each export path - these should match package.json exactly */
      const exportPaths = {
        '.': './src/index.js',
        './typescript': './src/typescript/index.js',
        './typescript/eslint': './src/typescript/eslint.config.js',
        './typescript/prettier': './src/typescript/prettier.config.js',
        './typescript/tsconfig': './src/typescript/tsconfig.base.json',
        './javascript': './src/javascript/index.js',
        './javascript/eslint': './src/javascript/eslint.config.js',
        './javascript/prettier': './src/javascript/prettier.config.js',
      };

      Object.entries(exportPaths).forEach(([exportKey, exportPath]) => {
        expect(exports[exportKey]).toBe(exportPath);

        /* Verify the file actually exists */
        /* Remove './src/' prefix since we're already in src/__tests__/unit/exports/ */
        const adjustedPath = exportPath.replace('./src/', './');
        const fullPath = path.join(__dirname, '../../..', adjustedPath);
        expect(() => require(fullPath)).not.toThrow();
      });
    });
  });

  describe('Import usage examples', () => {
    test('can import specific configs directly', () => {
      /* These should all work when the package is installed */
      const _imports = [
        () => require('@trafficbyintent/style-guide'),
        () => require('@trafficbyintent/style-guide/typescript'),
        () => require('@trafficbyintent/style-guide/typescript/eslint'),
        () => require('@trafficbyintent/style-guide/typescript/prettier'),
        () => require('@trafficbyintent/style-guide/javascript'),
        () => require('@trafficbyintent/style-guide/javascript/eslint'),
        () => require('@trafficbyintent/style-guide/javascript/prettier'),
      ];

      /* Since we're testing locally, we'll just verify the paths resolve */
      const localPaths = [
        '../../../index.js',
        '../../../typescript/index.js',
        '../../../typescript/eslint.config.js',
        '../../../typescript/prettier.config.js',
        '../../../javascript/index.js',
        '../../../javascript/eslint.config.js',
        '../../../javascript/prettier.config.js',
      ];

      localPaths.forEach((localPath) => {
        expect(() => require(localPath)).not.toThrow();
      });
    });
  });

  describe('ESLint plugin integration', () => {
    test('custom rules follow ESLint plugin structure', () => {
      const customRules = require('../../../typescript/custom-rules/index.js');

      /* Verify it has the correct ESLint plugin structure */
      expect(typeof customRules.rules).toBe('object');
      expect(Object.keys(customRules.rules).length).toBeGreaterThan(0);

      /* Each rule should have the correct ESLint rule structure */
      Object.entries(customRules.rules).forEach(([ruleName, rule]) => {
        /* Verify meta structure */
        expect(rule).toHaveProperty('meta');
        expect(rule).toHaveProperty('create');
        expect(typeof rule.create).toBe('function');

        /* Verify meta contains required fields */
        expect(rule.meta).toHaveProperty('type');
        expect(['problem', 'suggestion', 'layout']).toContain(rule.meta.type);
        expect(rule.meta).toHaveProperty('docs');
        expect(rule.meta.docs).toHaveProperty('description');
        expect(rule.meta).toHaveProperty('fixable');
        expect(rule.meta).toHaveProperty('messages');
        expect(typeof rule.meta.messages).toBe('object');
      });
    });
  });
});
