/**
 * TXI Terraform Style Guide Exports
 *
 * Provides TFLint configuration for Terraform linting
 */

const tflintConfig = require('./tflint.config');

module.exports = {
  tflint: tflintConfig,
  tflintHcl: './.tflint.hcl',
};
