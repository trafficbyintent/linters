/* TXI JSON Style Guide Exports */

/* Load configs once to avoid redundant requires */
const eslintConfig = require('./eslint.config');
const schemas = require('./schemas');

module.exports = {
  /* ESLint configuration */
  eslint: eslintConfig,

  /* JSON schemas for validation */
  schemas: schemas,

  /**
   * Helper to extend ESLint config with custom options
   * @param {Object} options - Configuration options
   * @param {number} [options.indentSize] - Override indentation size (default: 2)
   * @param {boolean} [options.relaxedSpacing=false] - Disable key-spacing rules
   * @param {boolean} [options.trailingCommas=false] - Allow trailing commas in JSON
   * @param {boolean} [options.sortKeys=false] - Enforce sorted keys
   * @returns {Object} Extended ESLint configuration for JSON files
   * @example
   * const config = require('@trafficbyintent/style-guide/json').getESLintConfig({
   *   indentSize: 4,
   *   trailingCommas: true
   * });
   */
  getESLintConfig: function (options = {}) {
    return {
      ...eslintConfig,
      rules: {
        ...eslintConfig.rules,
        /* JSON-specific rule overrides */
        'jsonc/indent': options.indentSize
          ? ['error', options.indentSize]
          : eslintConfig.rules['jsonc/indent'],
        'jsonc/key-spacing': options.relaxedSpacing
          ? 'off'
          : eslintConfig.rules['jsonc/key-spacing'],
        'jsonc/comma-dangle': options.trailingCommas
          ? ['error', 'always-multiline']
          : eslintConfig.rules['jsonc/comma-dangle'],
        'jsonc/sort-keys': options.sortKeys
          ? ['error', 'asc', { natural: true, minKeys: 2 }]
          : 'off',
      },
    };
  },
};
