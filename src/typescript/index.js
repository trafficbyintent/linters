/* TypeScript style guide exports */

/* Load configs once to avoid redundant requires */
const customRules = require('./custom-rules');
const eslintConfig = require('./eslint.config');
const prettierConfig = require('./prettier.config');
const tsconfigBase = require('./tsconfig.base.json');

module.exports = {
  /* ESLint configuration */
  eslint: eslintConfig,

  /* Prettier configuration */
  prettier: prettierConfig,

  /* TypeScript configuration */
  tsconfig: tsconfigBase,

  /* Custom ESLint rules */
  customRules: customRules,

  /**
   * Helper to extend ESLint config with custom options
   * @param {Object} options - Configuration options
   * @param {boolean} [options.allowConsoleWarn=false] - Allow console.warn statements
   * @param {boolean} [options.allowConsoleError=false] - Allow console.error statements
   * @returns {Object} Extended ESLint configuration with TXI custom rules
   * @example
   * const config = require('@trafficbyintent/style-guide/typescript').getESLintConfig({
   *   allowConsoleWarn: true,
   *   allowConsoleError: true
   * });
   */
  getESLintConfig: function (options = {}) {
    /* Check if plugin already exists before adding */
    const plugins =
      eslintConfig.plugins && eslintConfig.plugins.includes('@trafficbyintent')
        ? eslintConfig.plugins
        : [...(eslintConfig.plugins || []), '@trafficbyintent'];

    /* Build console allow list for test overrides */
    const allow = [];
    if (options.allowConsoleWarn) {
      allow.push('warn');
    }
    if (options.allowConsoleError) {
      allow.push('error');
    }

    /* Handle overrides for test files */
    const overrides = eslintConfig.overrides ? [...eslintConfig.overrides] : [];
    if (allow.length > 0) {
      /* Update test file override with console rules */
      const testOverrideIndex = overrides.findIndex((o) =>
        o.files?.some((f) => f.includes('test') || f.includes('spec'))
      );
      if (testOverrideIndex >= 0) {
        overrides[testOverrideIndex] = {
          ...overrides[testOverrideIndex],
          rules: {
            ...overrides[testOverrideIndex].rules,
            'no-console': ['error', { allow }],
          },
        };
      }
    }

    return {
      ...eslintConfig,
      plugins,
      rules: {
        ...eslintConfig.rules,
        /* Add custom rules with @trafficbyintent prefix */
        '@trafficbyintent/no-dynamic-test-data': 'error',
        '@trafficbyintent/require-error-context': 'error',
        '@trafficbyintent/require-descriptive-test-names': 'error',
        '@trafficbyintent/no-debug-artifacts': [
          'error',
          {
            /* Default to true as per base config expectations */
            allowConsoleWarn: true,
            allowConsoleError: true,
          },
        ],
      },
      overrides,
    };
  },
};
