# TXI Style Guide Test Suite

This directory contains all tests for the @trafficbyintent/style-guide package,
organized following JavaScript/TypeScript best practices.

## Test Structure

```text
__tests__/
├── unit/                 # Unit tests for individual components
│   ├── configs/          # Tests for linter configurations
│   ├── rules/            # Tests for custom ESLint rules
│   └── exports/          # Tests for module exports
├── integration/          # Integration tests
│   ├── real-project/     # Tests in a real project context
│   └── compatibility/    # Cross-tool compatibility tests
└── fixtures/             # Shared test fixtures and sample code
    ├── javascript/       # JavaScript test samples
    └── typescript/       # TypeScript test samples
```

## Why This Structure?

1. **Single Test Directory**: All tests live under `__tests__/` at the project root
   - Standard convention recognized by most test runners
   - Clear separation from source code
   - Easy to find and maintain

2. **No Separate package.json**: Test dependencies are in the root `package.json` as `devDependencies`
   - Simpler dependency management
   - Single node_modules folder
   - Faster installs and less disk space

3. **Clear Organization**: Unit vs integration tests are clearly separated
   - Unit tests run fast and test individual pieces
   - Integration tests verify everything works together
   - Fixtures are shared between both test types

## Test Categories

### Unit Tests (`unit/`)

Fast, isolated tests for individual components:

- **configs/** - Tests for each linter configuration
  - `javascriptEslint.test.js` - JavaScript ESLint config
  - `typescriptEslint.test.js` - TypeScript ESLint config
  - `prettier.test.js` - Prettier configurations
  - `stylelint.test.js` - CSS/SCSS linting
  - etc.

- **rules/** - Tests for custom ESLint rules
  - `noDebugArtifacts.test.js`
  - `noDynamicTestData.test.js`
  - `requireDescriptiveTestNames.test.js`
  - `requireErrorContext.test.js`
  - `preferMultilineComments.test.js`
  - `preferAsyncAwait.test.js`

- **exports/** - Verify all package exports work
  - `mainExports.test.js`
  - `subpathExports.test.js`

### Integration Tests (`integration/`)

Tests that verify the package works in real-world scenarios:

- **real-project/** - Simulates a real project using the style guide
  - Creates temporary project structure
  - Installs the package
  - Runs linters with our configs
  - Verifies expected behavior

- **compatibility/** - Cross-tool compatibility
  - ESLint + Prettier integration
  - TypeScript + ESLint integration
  - All tools working together

### Fixtures (`fixtures/`)

Shared test data and sample code:

- **javascript/** - Valid/invalid JavaScript samples
- **typescript/** - Valid/invalid TypeScript samples
- **react/** - React component samples
- **angular/** - Angular component samples

## Running Tests

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run specific test file
npm test __tests__/unit/configs/javascriptEslint.test.js

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run linting on test files
npm run test:lint
```

## Writing New Tests

### Unit Test Example

```javascript
// __tests__/unit/configs/newLinter.test.js
import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';
import newLinterConfig from '../../../newLinter/eslint.config.js';

describe('New Linter Configuration', () => {
  let eslint;

  beforeEach(() => {
    eslint = new ESLint({
      overrideConfigFile: false,
      baseConfig: newLinterConfig,
    });
  });

  it('should catch specific violations', async () => {
    const results = await eslint.lintText('bad code here');
    expect(results[0].messages).toHaveLength(1);
    expect(results[0].messages[0].ruleId).toBe('expected-rule');
  });
});
```

### Integration Test Example

```javascript
// __tests__/integration/real-project/newFeature.test.js
import { describe, it, expect } from 'vitest';
import { createTestProject, runLinter } from '../helpers';

describe('New Feature Integration', () => {
  it('should work in a real project', async () => {
    const projectDir = await createTestProject({
      dependencies: ['@trafficbyintent/style-guide'],
      files: {
        '.eslintrc.js':
          'module.exports = require("@trafficbyintent/style-guide/javascript/eslint");',
        'src/index.js': 'console.log("test");',
      },
    });

    const results = await runLinter(projectDir);
    expect(results.errorCount).toBe(0);
  });
});
```

## Test Guidelines

1. **Keep Tests Fast**: Unit tests should run in milliseconds
2. **Test One Thing**: Each test should verify a single behavior
3. **Use Descriptive Names**: Test names should explain what they're testing
4. **Avoid Duplication**: Use shared fixtures and helpers
5. **Clean Up**: Integration tests must clean up temporary files
6. **Mock Sparingly**: Prefer real implementations when possible

## Continuous Integration

Tests run automatically on:

- Every push to main branch
- Every pull request
- Can be run locally with `act` tool

See `.github/workflows/ci.yml` for CI configuration.

## Troubleshooting

### Common Issues

**Tests failing locally but not in CI**

- Check Node.js version matches CI
- Ensure clean install: `rm -rf node_modules && npm install`
- Verify no uncommitted changes affect tests

**Integration tests timing out**

- Increase timeout in test file
- Check for missing async/await
- Verify cleanup is working properly

**Cannot find module errors**

- Run `npm install` from root directory
- Check that paths in tests are correct
- Verify exports in package.json are valid

## Maintenance

When adding new features:

1. Add unit tests in `__tests__/unit/`
2. Add integration test in `__tests__/integration/`
3. Update relevant fixtures
4. Run full test suite before committing
5. Update this README if test structure changes
