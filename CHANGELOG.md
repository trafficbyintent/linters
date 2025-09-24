# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.11] - 2025-08-11

### Fixed

- **Bootstrap Regression**: Fixed agents skipping preflight while following Response Directive:
  - Created "MANDATORY BOOTSTRAP SEQUENCE" with two numbered requirements
  - Preflight now REQUIREMENT 1 (must be first) with explicit output verification
  - Response Directive now REQUIREMENT 2 (after preflight)
  - Added preflight verification to all checkpoints
  - Clear sequence: Preflight → Output confirmation → Response Directive

- **Task-Focused Override**: Prevented agents from bypassing bootstrap when eager to help:
  - Added cognitive interrupt at document start: "STOP - DO NOT READ THE USER'S QUESTION YET"
  - Explicitly addresses the "eager to help" failure mode
  - Lists forbidden actions (checking git, reading files, etc.) until bootstrap complete
  - Added warnings about common bypass attempts like "just quickly check upstream"

### Changed

- **Response Directive Enforcement**: Restructured agent docs to prevent Response Directive bypass:
  - Replaced theatrical "SYSTEM ERROR" language with clear, direct requirements
  - Added mandatory Write Operation Gates with specific output format
  - Introduced session persistence checks every 3 responses
  - Strategic use of theatrical language only for git security (where it works)
  - Multiple checkpoints throughout documentation without causing alert fatigue

## [1.1.10] - 2025-08-10

### Added

- Lazy validation for all module configurations (JavaScript, TypeScript, Angular, React, JSON, CSS)
- Environment variable support for skipping validation (`NODE_ENV=production` or `SKIP_CONFIG_VALIDATION=true`)
- Stylelint configuration validation with schema and warnings
- Comprehensive test coverage for lazy validation behavior

### Changed

- All module exports now use getter properties for lazy evaluation
- Validation only occurs on first access to configuration objects
- Validation functions now create shallow copies to avoid mutating original configs
- Performance improvement: configs no longer validated at module require time

### Removed

- eslint-plugin-jest dependency (TXI uses Vitest, not Jest)

### Fixed

- P0 issue: Removed console.warn/error from validation utilities
- P0 issue: Tests no longer check console output (test behavior instead)
- Validation no longer mutates raw configuration objects
- Fixed test expectations for TypeScript ESLint rule configurations

### Updated Dependencies

- @typescript-eslint/eslint-plugin: 7.18.0 → 8.39.0
- @typescript-eslint/parser: 7.18.0 → 8.39.0
- @angular-eslint/eslint-plugin: 18.4.3 → 20.1.1
- @angular-eslint/eslint-plugin-template: 18.4.3 → 20.1.1
- @angular-eslint/template-parser: 18.4.3 → 20.1.1
- Added @stylistic/eslint-plugin-ts@2.13.0 for TypeScript stylistic rules

### Security

- Removed executable example files - examples must now be in markdown documentation only
- Added clear headers to test fixture files to distinguish them from examples

### Changed (v1.1.10)

- Reorganized agent documentation into dedicated `/docs/standards/agent/` folder for better navigation:
  - Renamed "Planning and Self-Review Protocol" to "Agent Development Protocol"
  - Transformed CODING_AGENT_QUICK_REFERENCE.md into agent/README.md as single entry point
  - Split CODING_AGENT_STANDARDS.md into focused files: STANDARDS.md, PROTOCOLS.md, and TOOLS.md
  - Updated all references throughout codebase to point to new agent/README.md location

- Moved JavaScript test examples from executable file to `docs/examples/JAVASCRIPT_TEST_EXAMPLES.md`
- Updated Development Guide to prohibit executable example files for security
- Enhanced Terraform Version Upgrade Strategy to include checking HashiCorp upgrade
  guides for breaking changes
- Updated Terraform state recovery to use bucket versioning instead of manual backups

### Fixed (v1.1.10)

- Enabled custom TXI ESLint rules that were previously commented out:
  - `txi/prefer-multiline-comments` - Enforces multi-line comments for documentation
  - `txi/no-dynamic-test-data` - Prevents Date.now() and Math.random() in tests
  - `txi/prefer-async-await` - Encourages async/await over promise chains
- Fixed TypeScript ESLint configuration to properly load custom rules
- Added proper plugin exports in package.json for custom ESLint rules
- Fixed all 394 single-line comment violations across the codebase by converting them to multi-line format
- Resolved line length issues in test files to comply with 80-character limit
- Fixed TypeScript ESLint rule name from `no-null-assertion` to `no-non-null-assertion`
- Removed legacy `clean:test` script that referenced non-existent directories
- Fixed duplicate `@typescript-eslint/no-non-null-assertion` rule in TypeScript config
- Installed missing dependencies: `eslint-plugin-jsx-a11y`, `eslint-plugin-rxjs`, `stylelint-scss`
- Fixed duplicate MD013 rule in .markdownlint.yaml configuration
- Added language specifiers to code blocks in multiple documentation files
- Addressed many Markdown linting violations including line length and formatting issues

### Added (v1.1.10)

- Enhanced Git workflow documentation with clear fork-based workflow
- Added missing npm scripts for better developer experience:
  - `format` - Format all code using Prettier
  - `format:check` - Check code formatting without changes
  - `lint:fix` - Auto-fix linting issues for JS, TS, and JSON
  - `typecheck` - Run TypeScript type checking
- Updated `lint:ts` script to check all TypeScript files, not just integration tests
- Added changelog management requirements for agents
- Enhanced AI agent standards awareness:
  - Added comprehensive CLAUDE.md template in agent standards documentation
  - Updated README.md with mandatory reading checklist for AI agents
  - Created pull request template with standards compliance checklist
- Updated dependencies to latest compatible versions within major versions
- Fixed CSS and HTML linter scripts to handle missing files gracefully
- Improved documentation tone guidelines for different audiences
- Token-efficient approach for agent standards compliance
- Comprehensive test coverage and TDD requirements
- Linting-first approach for code reviews to save tokens
- Instructions to run linters before manual style checking
- Cloud provider organization guidance for Terraform modules with two architectural options
- Added lint scripts for all supported linters (JSON, Markdown, CSS, HTML, React, Angular)
- Bundled all linter dependencies as regular dependencies for easier installation:
  - ESLint, Prettier, TypeScript, and all plugins moved to dependencies
  - Stylelint and plugins (stylelint-config-standard, stylelint-order, stylelint-selector-bem-pattern)
  - markdownlint-cli for Markdown linting
  - htmlhint for HTML linting
  - jsonc-eslint-parser and eslint-plugin-jsonc for JSON linting
  - eslint-plugin-react and eslint-plugin-react-hooks for React linting
  - @angular-eslint plugins for Angular linting
- Removed peerDependencies to simplify installation - consumers now only need to install @trafficbyintent/style-guide

### Known Issues

- Vitest shows CJS deprecation warning - this is cosmetic and doesn't affect test functionality

## [1.0.0] - 2025-01-16

### Added (v1.0.0)

- Initial release of @trafficbyintent/style-guide
- ESLint configurations for JavaScript, TypeScript, React, Angular, and JSON
- Prettier configurations for JavaScript and TypeScript
- Stylelint configuration for CSS/SCSS
- HTMLHint configuration for HTML
- TFLint configuration for Terraform
- Markdownlint configuration for Markdown
- Custom ESLint rules:
  - `@trafficbyintent/no-debug-artifacts` - Prevents console.log and debugger statements
  - `@trafficbyintent/no-dynamic-test-data` - Enforces static test data
  - `@trafficbyintent/require-descriptive-test-names` - Ensures descriptive test names
  - `@trafficbyintent/require-error-context` - Requires context in error messages
- TypeScript base configuration with ES2022 support
- JSON schemas for common configuration files
- Comprehensive documentation:
  - Style guides for all supported languages
  - Development guide with best practices
  - API standards guide
  - Terraform standards guide
  - npm release guide
- Full test suite with unit and integration tests
- Support for ES2023+ JavaScript features
- GitHub Package Registry configuration

### Security (v1.0.0)

- Enforced security best practices in all configurations
- No hardcoded secrets allowed
- SQL injection prevention through query builder requirements

[1.0.0]: https://github.com/trafficbyintent/style-guide/releases/tag/v1.0.0
