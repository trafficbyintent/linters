# @trafficbyintent/linters

> Traffic By Intent's comprehensive linter configurations for ESLint, Prettier, TypeScript, and more

![npm (scoped)](https://img.shields.io/npm/v/@trafficbyintent/linters)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This package provides ESLint, Prettier, TypeScript, and other linter configurations to enforce
consistent code style across all TXI projects.

## Installation

```bash
npm install --save-dev @trafficbyintent/linters
```

## Quick Start

### JavaScript Projects

```javascript
// eslint.config.js
module.exports = require('@trafficbyintent/linters/javascript/eslint');
```

```javascript
// prettier.config.js
module.exports = require('@trafficbyintent/linters/javascript/prettier');
```

### TypeScript Projects

```javascript
// eslint.config.js
module.exports = require('@trafficbyintent/linters/typescript/eslint');
```

```json
// tsconfig.json
{
    "extends": "@trafficbyintent/linters/typescript/tsconfig"
}
```

### React Projects

```javascript
// eslint.config.js
module.exports = require('@trafficbyintent/linters/react/eslint');
```

### Angular Projects

```javascript
// eslint.config.js
module.exports = require('@trafficbyintent/linters/angular/eslint');
```

## Available Configurations

### Language-Specific Linters

| Language/Framework | ESLint Config        | Prettier Config        | Other Configs            |
| ------------------ | -------------------- | ---------------------- | ------------------------ |
| JavaScript         | `/javascript/eslint` | `/javascript/prettier` | -                        |
| TypeScript         | `/typescript/eslint` | `/typescript/prettier` | `/typescript/tsconfig`   |
| React              | `/react/eslint`      | -                      | -                        |
| Angular            | `/angular/eslint`    | -                      | -                        |
| JSON               | `/json/eslint`       | -                      | `/json/schemas`          |
| Markdown           | -                    | -                      | `/markdown/markdownlint` |
| CSS/SCSS           | -                    | -                      | `/css/stylelint`         |
| HTML               | -                    | -                      | `/html/htmlhint`         |
| Terraform          | -                    | -                      | `/terraform/tflint`      |

### Custom ESLint Rules

This package includes custom TXI ESLint rules:

- **no-debug-artifacts**: Prevents debug code in production
- **no-dynamic-test-data**: Enforces static test data
- **require-descriptive-test-names**: Ensures clear test descriptions
- **require-error-context**: Requires context in error messages

Access these rules via:

```javascript
const { rules } = require('@trafficbyintent/linters');
```

## Auto-Detection

The main entry point automatically detects your project type:

```javascript
// Automatically returns appropriate config based on project
const config = require('@trafficbyintent/linters');
```

## Package Scripts

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix",
        "format": "prettier --write '**/*.{js,ts,tsx,json,md}'",
        "format:check": "prettier --check '**/*.{js,ts,tsx,json,md}'"
    }
}
```

## Language-Specific Usage

### JavaScript

```bash
npm install --save-dev @trafficbyintent/linters eslint prettier
```

### TypeScript

```bash
npm install --save-dev @trafficbyintent/linters eslint prettier typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### React

```bash
npm install --save-dev @trafficbyintent/linters eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Angular

```bash
npm install --save-dev @trafficbyintent/linters @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
```

### CSS/SCSS

```bash
npm install --save-dev @trafficbyintent/linters stylelint stylelint-config-standard stylelint-scss
```

### Markdown

```bash
npm install --save-dev @trafficbyintent/linters markdownlint-cli
```

Create `.markdownlint.yaml`:

```yaml
extends: node_modules/@trafficbyintent/linters/src/markdown/.markdownlint.yaml
```

### HTML

```bash
npm install --save-dev @trafficbyintent/linters htmlhint
```

Create `.htmlhintrc`:

```json
{
    "extends": ["@trafficbyintent/linters/html/htmlhint"]
}
```

## Configuration Examples

### Complete ESLint Setup (JavaScript)

```javascript
// eslint.config.js
const txi = require('@trafficbyintent/linters/javascript/eslint');

module.exports = [
    ...txi,
    {
        ignores: ['dist/', 'build/', 'coverage/'],
    },
];
```

### Complete ESLint Setup (TypeScript)

```javascript
// eslint.config.js
const txi = require('@trafficbyintent/linters/typescript/eslint');

module.exports = [
    ...txi,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
];
```

## CLI Commands

```bash
# JavaScript/TypeScript linting
npx eslint '**/*.{js,ts}' --config eslint.config.js

# Prettier formatting
npx prettier --write '**/*.{js,ts,json,md}'

# Markdown linting
npx markdownlint '**/*.md' --config .markdownlint.yaml

# CSS/SCSS linting
npx stylelint '**/*.{css,scss}' --config node_modules/@trafficbyintent/linters/src/css/stylelint.config.js

# HTML linting
npx htmlhint '**/*.html' --config .htmlhintrc
```

## IDE Integration

### VS Code

Install recommended extensions:

- ESLint
- Prettier - Code formatter
- markdownlint
- Stylelint
- HTMLHint

Add to `.vscode/settings.json`:

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## Requirements

- Node.js >= 20.9.0
- npm >= 10.0.0
- ESLint >= 8.0.0
- Prettier >= 3.0.0
- TypeScript >= 4.0.0 (for TypeScript projects)

## Development

### Running Tests

```bash
npm test                # Run all tests
npm run test:coverage   # Run with coverage
npm run lint            # Check all linting
```

### Available NPM Scripts

- `npm run lint` - Run all linters
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code with Prettier
- `npm test` - Run test suite
- `npm run test:coverage` - Generate coverage report

## Troubleshooting

### ESLint Not Finding Config

Ensure your `eslint.config.js` is in the project root:

```javascript
module.exports = require('@trafficbyintent/linters/javascript/eslint');
```

### TypeScript Errors

Verify `tsconfig.json` extends the base config:

```json
{
    "extends": "@trafficbyintent/linters/typescript/tsconfig",
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }
}
```

### Prettier Conflicts

The package includes `eslint-config-prettier` to disable conflicting rules. Ensure Prettier
runs after ESLint:

```bash
npm run lint:fix && npm run format
```

## Support

For issues or questions, please
[open an issue](https://github.com/trafficbyintent/linters/issues).

## License

MIT - see [LICENSE](LICENSE) for details.
