/* TXI React Style Guide Exports */

/* Load config once to avoid redundant requires */
const eslintConfig = require('./eslint.config');

module.exports = {
  /* ESLint configuration */
  eslint: eslintConfig,

  /**
   * Helper to extend ESLint config with custom options
   * @param {Object} options - Configuration options
   * @param {boolean} [options.allowConsole=false] - Disable all console restrictions
   * @param {boolean} [options.allowConsoleWarn=false] - Allow console.warn statements
   * @param {boolean} [options.allowConsoleError=false] - Allow console.error statements
   * @param {boolean} [options.allowConsoleInfo=false] - Allow console.info statements
   * @returns {Object} Extended ESLint configuration for React projects
   * @example
   * const config = require('@trafficbyintent/linters/react').getESLintConfig({
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
    if (options.allowConsoleInfo) {
      allow.push('info');
    }

    return {
      ...eslintConfig,
      rules: {
        ...eslintConfig.rules,
        /* Allow console methods based on options */
        'no-console': options.allowConsole ? 'off' : ['error', { allow }],
        /* React-specific rule overrides */
        'react/prop-types': options.allowPropTypes ? 'off' : 'error',
        'react/display-name': options.allowDisplayName ? 'off' : 'error',
      },
    };
  },
};
