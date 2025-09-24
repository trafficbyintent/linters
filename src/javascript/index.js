/* JavaScript style guide exports */

/* Load configs once to avoid redundant requires */
const eslintConfig = require('./eslint.config');
const prettierConfig = require('./prettier.config');

module.exports = {
  /* ESLint configuration */
  eslint: eslintConfig,

  /* Prettier configuration */
  prettier: prettierConfig,

  /**
   * Helper to extend ESLint config with custom options
   * @param {Object} options - Configuration options
   * @param {boolean} [options.allowConsole=false] - Disable all console restrictions
   * @param {boolean} [options.allowConsoleWarn=false] - Allow console.warn statements
   * @param {boolean} [options.allowConsoleError=false] - Allow console.error statements
   * @returns {Object} Extended ESLint configuration
   * @example
   * const config = require('@trafficbyintent/style-guide/javascript').getESLintConfig({
   *   allowConsoleWarn: true,
   *   allowConsoleError: true
   * });
   */
  getESLintConfig: function (options = {}) {
    /* Build console allow list efficiently */
    const allow = [];
    if (options.allowConsoleWarn) {
      allow.push('warn');
    }
    if (options.allowConsoleError) {
      allow.push('error');
    }

    return {
      ...eslintConfig,
      rules: {
        ...eslintConfig.rules,
        /* Allow console methods based on options */
        'no-console': options.allowConsole ? 'off' : ['error', { allow }],
      },
    };
  },
};
