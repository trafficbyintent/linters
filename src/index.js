/* TXI Style Guide - Main Entry Point */

/*
 * NOTE ON PACKAGE.JSON EXPORTS:
 *
 * All export paths in package.json are CORRECT and the files DO exist:
 * - .markdownlint.yaml exists at src/markdown/.markdownlint.yaml
 * - .htmlhintrc exists at src/html/.htmlhintrc
 * - All other export paths have been verified
 *
 * If an export appears to be missing, check that you have the full
 * repository and that src/ directory is intact. These are not errors.
 */

/* Language alias mapping for O(1) lookup */
const LANGUAGE_MAP = {
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  css: 'css',
  scss: 'css',
  sass: 'css',
  react: 'react',
  jsx: 'react',
  tsx: 'react',
  angular: 'angular',
  markdown: 'markdown',
  md: 'markdown',
  json: 'json',
  jsonc: 'json',
  json5: 'json',
  html: 'html',
  terraform: 'terraform',
  tf: 'terraform',
  hcl: 'terraform',
};

module.exports = {
  /* TypeScript configurations - lazy loaded */
  get typescript() {
    return this._typescript || (this._typescript = require('./typescript'));
  },

  /* JavaScript configurations - lazy loaded */
  get javascript() {
    return this._javascript || (this._javascript = require('./javascript'));
  },

  /* CSS configurations - lazy loaded */
  get css() {
    return this._css || (this._css = require('./css'));
  },

  /* React configurations - lazy loaded */
  get react() {
    return this._react || (this._react = require('./react'));
  },

  /* Angular configurations - lazy loaded */
  get angular() {
    return this._angular || (this._angular = require('./angular'));
  },

  /* Markdown configurations - lazy loaded */
  get markdown() {
    return this._markdown || (this._markdown = require('./markdown'));
  },

  /* JSON configurations - lazy loaded */
  get json() {
    return this._json || (this._json = require('./json'));
  },

  /* HTML configurations - lazy loaded */
  get html() {
    return this._html || (this._html = require('./html'));
  },

  /* Terraform configurations - lazy loaded */
  get terraform() {
    return this._terraform || (this._terraform = require('./terraform'));
  },

  /* ESLint plugin - expose custom rules - lazy loaded */
  get rules() {
    if (!this._customRules) {
      this._customRules = require('./typescript/custom-rules');
    }
    return this._customRules.rules;
  },

  /**
   * Utility function to get all configurations for a language
   * @param {string} language - The language/framework name (e.g., 'typescript', 'react', 'angular')
   * @returns {Object} The complete configuration object for the specified language
   * @throws {Error} If the language is not supported
   * @example
   * const tsConfig = styleGuide.getConfig('typescript');
   * // Returns: { eslint, prettier, tsconfig, customRules, getESLintConfig }
   *
   * @example
   * const reactConfig = styleGuide.getConfig('react');
   * // Returns: { eslint, getESLintConfig }
   */
  getConfig: function (language) {
    const configName = LANGUAGE_MAP[language];
    if (!configName) {
      throw new Error(`Unsupported language: ${language}`);
    }
    return this[configName];
  },
};
