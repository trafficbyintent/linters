import { describe, it, expect } from 'vitest';
import typescriptConfig from '../../../typescript/index.js';

describe('TypeScript Configuration Exports', () => {
  describe('getESLintConfig functionality', () => {
    it('should return extended config with custom rules', () => {
      const config = typescriptConfig.getESLintConfig();

      expect(config).toHaveProperty('rules');
      expect(config).toHaveProperty('plugins');

      /* Should have @trafficbyintent plugin */
      expect(config.plugins).toContain('@trafficbyintent');

      /* Should have custom rules */
      expect(config.rules).toHaveProperty('@trafficbyintent/no-dynamic-test-data');
      expect(config.rules).toHaveProperty('@trafficbyintent/require-error-context');
      expect(config.rules).toHaveProperty('@trafficbyintent/require-descriptive-test-names');
      expect(config.rules).toHaveProperty('@trafficbyintent/no-debug-artifacts');
    });

    it('should set custom rules to error by default', () => {
      const config = typescriptConfig.getESLintConfig();

      expect(config.rules['@trafficbyintent/no-dynamic-test-data']).toBe('error');
      expect(config.rules['@trafficbyintent/require-error-context']).toBe('error');
      expect(config.rules['@trafficbyintent/require-descriptive-test-names']).toBe('error');
      /* The base config has allowConsoleWarn and allowConsoleError set to true */
      expect(config.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
        'error',
        {
          allowConsoleWarn: true,
          allowConsoleError: true,
        },
      ]);
    });

    it('should allow console.warn when allowConsoleWarn is true', () => {
      const config = typescriptConfig.getESLintConfig({ allowConsoleWarn: true });

      /* Find test override to verify console rules were modified */
      const testOverride = config.overrides?.find((o) => o.files?.some((f) => f.includes('test')));

      expect(testOverride).toBeDefined();
      expect(testOverride.rules['no-console']).toEqual(['error', { allow: ['warn'] }]);

      /* The no-debug-artifacts rule remains unchanged from base config */
      expect(config.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
        'error',
        {
          allowConsoleWarn: true,
          allowConsoleError: true,
        },
      ]);
    });

    it('should allow console.error when allowConsoleError is true', () => {
      const config = typescriptConfig.getESLintConfig({ allowConsoleError: true });

      /* Find test override to verify console rules were modified */
      const testOverride = config.overrides?.find((o) => o.files?.some((f) => f.includes('test')));

      expect(testOverride).toBeDefined();
      expect(testOverride.rules['no-console']).toEqual(['error', { allow: ['error'] }]);

      /* The no-debug-artifacts rule remains unchanged from base config */
      expect(config.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
        'error',
        {
          allowConsoleWarn: true,
          allowConsoleError: true,
        },
      ]);
    });

    it('should allow both console methods when both options are true', () => {
      const config = typescriptConfig.getESLintConfig({
        allowConsoleWarn: true,
        allowConsoleError: true,
      });

      /* Find test override to verify console rules were modified */
      const testOverride = config.overrides?.find((o) => o.files?.some((f) => f.includes('test')));

      expect(testOverride).toBeDefined();
      expect(testOverride.rules['no-console']).toEqual(['error', { allow: ['warn', 'error'] }]);

      /* The no-debug-artifacts rule remains unchanged from base config */
      expect(config.rules['@trafficbyintent/no-debug-artifacts']).toEqual([
        'error',
        {
          allowConsoleWarn: true,
          allowConsoleError: true,
        },
      ]);
    });

    it('should preserve base config properties', () => {
      const config = typescriptConfig.getESLintConfig();
      const baseConfig = typescriptConfig.eslint;

      /* Check that base properties are preserved */
      if (baseConfig.env) expect(config.env).toEqual(baseConfig.env);
      if (baseConfig.parserOptions) expect(config.parserOptions).toEqual(baseConfig.parserOptions);
      if (baseConfig.extends) expect(config.extends).toEqual(baseConfig.extends);
    });

    it('should merge rules correctly', () => {
      const config = typescriptConfig.getESLintConfig();
      const baseConfig = typescriptConfig.eslint;

      /* All base rules should still exist */
      Object.keys(baseConfig.rules || {}).forEach((rule) => {
        expect(config.rules).toHaveProperty(rule);
      });
    });

    it('should extend plugins array', () => {
      const config = typescriptConfig.getESLintConfig();
      const baseConfig = typescriptConfig.eslint;

      /* Should include all base plugins plus @trafficbyintent */
      const basePlugins = baseConfig.plugins || [];
      basePlugins.forEach((plugin) => {
        expect(config.plugins).toContain(plugin);
      });
      expect(config.plugins).toContain('@trafficbyintent');
    });
  });
});
