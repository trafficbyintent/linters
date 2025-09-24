/**
 * TXI Markdown Style Guide Exports
 *
 * Provides markdownlint configuration for Markdown linting
 */

const path = require('path');

module.exports = {
  /* The YAML config is the canonical source - export its path */
  markdownlintYamlPath: path.join(__dirname, '.markdownlint.yaml'),
  /* For compatibility, provide a simple object with the yaml path */
  markdownlint: {
    config: path.join(__dirname, '.markdownlint.yaml'),
  },
};
