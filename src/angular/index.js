/* TXI Angular Style Guide Exports */

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
   * @param {boolean} [options.allowConsoleLog=false] - Allow console.log statements
   * @returns {Object} Extended ESLint configuration for Angular projects
   * @example
   * const config = require('@trafficbyintent/linters/angular').getESLintConfig({
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
    if (options.allowConsoleLog) {
      allow.push('log');
    }

    return {
      ...eslintConfig,
      rules: {
        ...eslintConfig.rules,
        /* Allow console methods based on options */
        'no-console': options.allowConsole ? 'off' : ['error', { allow }],
        /* Angular-specific rule overrides */
        '@angular-eslint/no-input-rename': options.allowInputRename ? 'off' : 'error',
        '@angular-eslint/no-output-rename': options.allowOutputRename ? 'off' : 'error',
        '@angular-eslint/component-selector': options.disableComponentSelector
          ? 'off'
          : eslintConfig.rules['@angular-eslint/component-selector'],
      },
    };
  },
};
