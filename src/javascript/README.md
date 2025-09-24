# TXI JavaScript ESLint Configuration

This directory contains the official TXI JavaScript linting configuration, which enforces our
style guide rules.

## Key Features

### Modern JavaScript Support

- ES2023 syntax support
- Optional chaining and nullish coalescing enforcement
- BigInt and private class fields support
- Modern array methods (flatMap, at, etc.)

### Comment Rules

- **Multi-line comments (`/* */`)** required for all permanent documentation
- **Single-line comments (`//`)** only allowed for:
  - TODO/FIXME comments
  - Temporarily commenting out code
  - ESLint directives

### Import Organization

- Automatic import sorting and grouping
- Enforces newlines between import groups
- Prefers named exports over default exports

### Security Rules

- Prevents use of `eval()` and similar constructs
- Blocks dangerous property access patterns
- Prevents prototype pollution vulnerabilities

### Test Data Rules

- Enforces static test data in test files
- Prevents use of `Math.random()`, `Date.now()`, and `new Date()` without arguments in tests
- Ensures predictable test results

## Usage

### In `.eslintrc.js`

```javascript
module.exports = {
  extends: ['@trafficbyintent/style-guide/javascript/eslint'],
};
```

### For ES modules projects

```javascript
/* .eslintrc.cjs */
module.exports = {
  extends: ['@trafficbyintent/style-guide/javascript/eslint'],
  parserOptions: {
    sourceType: 'module',
  },
};
```

### With additional rules

```javascript
module.exports = {
  extends: ['@trafficbyintent/style-guide/javascript/eslint'],
  rules: {
    /* Additional overrides */
  },
};
```

## Module Resolution Approach

**Important**: The JavaScript ESLint configuration uses an intentional module resolution override
to load the custom TXI plugin without publishing it as a separate npm package. This is working
correctly and is a deliberate architectural decision. The override at the top of `eslint.config.js`
allows ESLint to find `eslint-plugin-txi` from within this package.

This approach:

- Keeps all style guide rules in a single package
- Simplifies installation for consumers
- Ensures plugin and config versions stay synchronized
- Works reliably across all environments

If you see the module resolution code and wonder if it's a hack that needs fixing - it doesn't.
It's an intentional, working solution.

## Custom TXI Rules

### `txi/prefer-multiline-comments`

Enforces the use of multi-line comments for permanent documentation.

❌ **Bad:**

```javascript
// This function calculates the total
function calculateTotal() {}
```

✅ **Good:**

```javascript
/* This function calculates the total */
function calculateTotal() {}
```

### `txi/no-dynamic-test-data`

Prevents dynamic data in test files.

❌ **Bad:**

```javascript
const testUser = {
  id: Math.random(),
  createdAt: new Date(),
};
```

✅ **Good:**

```javascript
const testUser = {
  id: 'test-123',
  createdAt: new Date('2024-01-15T10:00:00Z'),
};
```

### `txi/prefer-async-await`

Encourages async/await over promise chains.

❌ **Bad:**

```javascript
getData()
  .then((data) => processData(data))
  .then((result) => saveResult(result))
  .catch(handleError);
```

✅ **Good:**

```javascript
try {
  const data = await getData();
  const result = await processData(data);
  await saveResult(result);
} catch (error) {
  handleError(error);
}
```

## File Structure

```text
javascript/
├── eslint.config.js        # Main ESLint configuration
├── eslint-plugin-txi/      # Custom TXI rules
│   └── index.js
├── prettier.config.js      # Prettier configuration
└── README.md              # This file
```
