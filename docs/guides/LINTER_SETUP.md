# TXI Linter Setup

This guide explains how to use the linters provided by the `@trafficbyintent/linters` package.

## Available Linters

| Language/Framework | Linter Tool  | Configuration File                               |
| ------------------ | ------------ | ------------------------------------------------ |
| JavaScript         | ESLint       | `@trafficbyintent/linters/javascript/eslint`     |
| TypeScript         | ESLint       | `@trafficbyintent/linters/typescript/eslint`     |
| CSS/SCSS           | Stylelint    | `@trafficbyintent/linters/css/stylelint`         |
| React              | ESLint       | `@trafficbyintent/linters/react/eslint`          |
| Angular            | ESLint       | `@trafficbyintent/linters/angular/eslint`        |
| Markdown           | markdownlint | `@trafficbyintent/linters/markdown/markdownlint` |
| JSON               | ESLint       | `@trafficbyintent/linters/json/eslint`           |
| HTML               | HTMLHint     | `@trafficbyintent/linters/html/htmlhint`         |
| Terraform          | TFLint       | `@trafficbyintent/linters/terraform/tflint`      |

## Installation

First, install the TXI linters package:

```bash
npm install --save-dev @trafficbyintent/linters
```

Then install the required peer dependencies for the linters you need:

### JavaScript/TypeScript Installation

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import
```

### CSS Installation

```bash
npm install --save-dev stylelint stylelint-config-standard stylelint-order stylelint-selector-bem-pattern
```

### React Installation

```bash
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

### Angular Installation

```bash
npm install --save-dev @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser eslint-plugin-rxjs
```

### Markdown Installation

```bash
npm install --save-dev markdownlint-cli
```

### JSON Installation

```bash
npm install --save-dev jsonc-eslint-parser eslint-plugin-jsonc
```

### HTML Installation

```bash
npm install --save-dev htmlhint
```

### Terraform Installation

```bash
# TFLint must be installed separately
brew install tflint
# or
curl -s https://raw.githubusercontent.com/terraform-linters/tflint/master/install_linux.sh | bash
```

## Configuration

### JavaScript

Create `.eslintrc.js`:

```javascript
module.exports = require('@trafficbyintent/linters/javascript/eslint');
```

### TypeScript

Create `.eslintrc.js`:

```javascript
module.exports = require('@trafficbyintent/linters/typescript/eslint');
```

### CSS

Create `.stylelintrc.js`:

```javascript
module.exports = require('@trafficbyintent/linters/css/stylelint');
```

### React

Create `.eslintrc.js`:

```javascript
module.exports = require('@trafficbyintent/linters/react/eslint');
```

### Angular

Create `.eslintrc.js`:

```javascript
module.exports = require('@trafficbyintent/linters/angular/eslint');
```

### Markdown

Create `.markdownlint.json`:

```json
{
    "extends": "@trafficbyintent/linters/markdown/markdownlint"
}
```

Or copy the configuration:

```bash
cp node_modules/@trafficbyintent/linters/src/markdown/.markdownlint.json .markdownlint.json
```

### JSON Configuration

Add to your `.eslintrc.js`:

```javascript
module.exports = {
    extends: ['@trafficbyintent/linters/javascript/eslint'],
    overrides: [...require('@trafficbyintent/linters/json/eslint').overrides],
};
```

### HTML Configuration

Create `.htmlhintrc`:

```bash
cp node_modules/@trafficbyintent/linters/src/html/.htmlhintrc .htmlhintrc
```

### Terraform Configuration

Create `.tflint.hcl`:

```bash
cp node_modules/@trafficbyintent/linters/src/terraform/.tflint.hcl .tflint.hcl
```

## NPM Scripts

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "lint": "npm run lint:js && npm run lint:css && npm run lint:md && npm run lint:json && npm run lint:html",
        "lint:js": "eslint '**/*.{js,jsx,ts,tsx}'",
        "lint:css": "stylelint '**/*.{css,scss}'",
        "lint:md": "markdownlint '**/*.md'",
        "lint:json": "eslint '**/*.json'",
        "lint:html": "htmlhint '**/*.html'",
        "lint:tf": "tflint",
        "lint:fix": "npm run lint:js -- --fix && npm run lint:css -- --fix && npm run lint:json -- --fix",
        "format": "prettier --write '**/*.{js,jsx,ts,tsx,css,scss,json,md,html}'"
    }
}
```

## IDE Integration

### VS Code

Install these extensions:

- ESLint
- Stylelint
- markdownlint
- HTMLHint
- Terraform

Add to `.vscode/settings.json`:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true,
        "source.fixAll.markdownlint": true
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "json",
        "jsonc"
    ],
    "css.validate": false,
    "scss.validate": false,
    "stylelint.validate": ["css", "scss"],
    "[terraform]": {
        "editor.formatOnSave": true
    }
}
```

### WebStorm/IntelliJ

1. Go to Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
1. Enable "Automatic ESLint configuration"
1. Go to Settings → Languages & Frameworks → Style Sheets → Stylelint
1. Enable and point to stylelint config

## Pre-commit Hooks

Use `husky` and `lint-staged` to run linters before commits:

```bash
npm install --save-dev husky lint-staged
npx husky install
```

Add to `package.json`:

```json
{
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": "eslint --fix",
        "*.{css,scss}": "stylelint --fix",
        "*.md": "markdownlint --fix",
        "*.json": "eslint --fix",
        "*.html": "htmlhint",
        "*.tf": "terraform fmt"
    }
}
```

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Lint

on: [push, pull_request]

jobs:
    lint:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3

            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: '18'
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Run linters
              run: |
                  npm run lint:js
                  npm run lint:css
                  npm run lint:md
                  npm run lint:json
                  npm run lint:html

            - name: Setup Terraform
              uses: hashicorp/setup-terraform@v2

            - name: Terraform Format Check
              run: terraform fmt -check -recursive

            - name: Setup TFLint
              uses: terraform-linters/setup-tflint@v3

            - name: Run TFLint
              run: tflint --recursive
```

## Customization

You can extend any configuration:

### JavaScript/TypeScript Customization

```javascript
module.exports = {
    extends: ['@trafficbyintent/linters/javascript/eslint'],
    rules: {
        // Your custom rules
        'no-console': 'off',
    },
};
```

### CSS Customization

```javascript
module.exports = {
    extends: ['@trafficbyintent/linters/css/stylelint'],
    rules: {
        // Your custom rules
        'selector-class-pattern': null,
    },
};
```

## Troubleshooting

### ESLint not finding the configuration

Make sure you have the required peer dependencies installed and your `.eslintrc.js` file is in
the project root.

### Stylelint not working with SCSS

Install the SCSS syntax:

```bash
npm install --save-dev postcss-scss
```

### TFLint not finding providers

Run `tflint --init` in your Terraform directory to download provider plugins.

## Support

For issues or questions about the linters:

1. Check the style guide documentation in the `docs/standards/` folder
1. Open an issue in the repository
1. Contact the TXI development team
