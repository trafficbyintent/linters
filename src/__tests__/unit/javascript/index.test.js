import { describe, it, expect } from 'vitest';
import javascriptConfig from '../../../javascript/index.js';

describe('JavaScript Configuration Exports', () => {
  describe('getESLintConfig functionality', () => {
    it('should return base config with no options', () => {
      const config = javascriptConfig.getESLintConfig();

      expect(config).toHaveProperty('rules');
      expect(config.rules).toHaveProperty('no-console');
      /* Default should error on console with empty allow array */
      expect(config.rules['no-console']).toEqual(['error', { allow: [] }]);
    });

    it('should disable no-console when allowConsole is true', () => {
      const config = javascriptConfig.getESLintConfig({ allowConsole: true });

      expect(config.rules['no-console']).toBe('off');
    });

    it('should allow console.warn when allowConsoleWarn is true', () => {
      const config = javascriptConfig.getESLintConfig({ allowConsoleWarn: true });

      expect(config.rules['no-console']).toEqual(['error', { allow: ['warn'] }]);
    });

    it('should allow console.error when allowConsoleError is true', () => {
      const config = javascriptConfig.getESLintConfig({ allowConsoleError: true });

      expect(config.rules['no-console']).toEqual(['error', { allow: ['error'] }]);
    });

    it('should allow both warn and error when both options are true', () => {
      const config = javascriptConfig.getESLintConfig({
        allowConsoleWarn: true,
        allowConsoleError: true,
      });

      expect(config.rules['no-console']).toEqual(['error', { allow: ['warn', 'error'] }]);
    });

    it('should override with allowConsole even if other options are set', () => {
      const config = javascriptConfig.getESLintConfig({
        allowConsole: true,
        allowConsoleWarn: true,
        allowConsoleError: true,
      });

      expect(config.rules['no-console']).toBe('off');
    });

    it('should preserve other base config properties', () => {
      const config = javascriptConfig.getESLintConfig();
      const baseConfig = javascriptConfig.eslint;

      /* Check that other properties are preserved */
      if (baseConfig.env) expect(config.env).toEqual(baseConfig.env);
      if (baseConfig.parserOptions) expect(config.parserOptions).toEqual(baseConfig.parserOptions);
      if (baseConfig.extends) expect(config.extends).toEqual(baseConfig.extends);
    });

    it('should merge rules correctly', () => {
      const config = javascriptConfig.getESLintConfig({ allowConsoleError: true });
      const baseConfig = javascriptConfig.eslint;

      /* All base rules should still exist */
      Object.keys(baseConfig.rules || {}).forEach((rule) => {
        expect(config.rules).toHaveProperty(rule);
      });

      /* Only no-console should be modified */
      expect(config.rules['no-console']).not.toEqual(baseConfig.rules['no-console']);
    });
  });
});
