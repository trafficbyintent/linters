/*
 * Custom ESLint rules for TXI-specific patterns - TypeScript Version
 *
 * DUAL RULE SYSTEM EXPLANATION:
 *
 * We maintain separate custom rule implementations for TypeScript and JavaScript
 * because of different integration requirements:
 *
 * 1. TypeScript rules are loaded directly via the @trafficbyintent namespace
 * 2. JavaScript rules require the module resolution hack to work as a plugin
 * 3. Some rules may need TypeScript-specific AST handling in the future
 *
 * While this creates some duplication, it ensures both configurations work
 * reliably. Future consolidation is planned once we standardize the plugin
 * architecture across both language configs.
 *
 * These rules focus on TypeScript-specific patterns and integrate with
 * @typescript-eslint parser for enhanced type-aware linting.
 */

module.exports = {
  rules: {
    'no-dynamic-test-data': require('./noDynamicTestData'),
    'require-error-context': require('./requireErrorContext'),
    'require-descriptive-test-names': require('./requireDescriptiveTestNames'),
    'no-debug-artifacts': require('./noDebugArtifacts'),
  },
};
