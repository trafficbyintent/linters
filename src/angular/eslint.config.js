/**
 * TXI Angular ESLint Configuration
 * Based on the TXI Angular Style Guide
 *
 * This configuration enforces the Angular coding standards defined in
 * docs/standards/style-guides/ANGULAR_STYLE_GUIDE.md
 */

const _baseTypeScriptConfig = require('../typescript/eslint.config');

module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*', 'dist/**/*', 'node_modules/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        '../typescript/eslint.config',
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        /*
         * ========================================
         * Angular-specific TypeScript Rules
         * ========================================
         */

        /* Component/Directive naming */
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Component'],
          },
        ],
        '@angular-eslint/directive-class-suffix': [
          'error',
          {
            suffixes: ['Directive'],
          },
        ],
        '@angular-eslint/pipe-prefix': [
          'error',
          {
            prefixes: ['txi'],
          },
        ],

        /* Component selectors */
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'txi',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'txi',
            style: 'camelCase',
          },
        ],

        /* Lifecycle methods */
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-lifecycle-call': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',

        /* Dependency injection */
        '@angular-eslint/use-injectable-provided-in': 'error',

        /* Component structure */
        '@angular-eslint/no-empty-lifecycle-method': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-output-native': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/no-queries-metadata-property': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',

        /* Best practices */
        '@angular-eslint/no-forward-ref': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@angular-eslint/contextual-lifecycle': 'error',
        '@angular-eslint/contextual-decorator': 'error',
        '@angular-eslint/prefer-on-push-component-change-detection': 'warn',

        /* RxJS rules */
        'rxjs/no-unsafe-takeuntil': [
          'error',
          {
            alias: ['untilDestroyed'],
          },
        ],
        'rxjs/no-create': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-ignored-subscription': 'error',
        'rxjs/no-ignored-takewhile-value': 'error',
        'rxjs/no-implicit-any-catch': 'error',
        'rxjs/no-index': 'error',
        'rxjs/no-internal': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-redundant-notify': 'error',
        'rxjs/no-sharereplay': [
          'error',
          {
            allowConfig: true,
          },
        ],
        'rxjs/no-subclass': 'error',
        'rxjs/no-subject-unsubscribe': 'error',
        'rxjs/no-subject-value': 'error',
        'rxjs/no-topromise': 'error',
        'rxjs/no-unsafe-catch': 'error',
        'rxjs/no-unsafe-first': 'error',
        'rxjs/no-unsafe-subject-next': 'error',
        'rxjs/no-unsafe-switchmap': 'error',
        'rxjs/prefer-observer': 'error',
        'rxjs/suffix-subjects': [
          'error',
          {
            suffix: 'Subject',
          },
        ],

        /*
         * File naming (enforced at project level)
         * Components: *.component.ts
         * Services: *.service.ts
         * Pipes: *.pipe.ts
         * Directives: *.directive.ts
         * Modules: *.module.ts
         */

        /* Modern Angular patterns (v14+) */
        '@angular-eslint/prefer-standalone-component': 'warn',
        '@angular-eslint/sort-ngmodule-metadata-arrays': 'error',

        /* Accessibility */
        '@angular-eslint/accessibility-alt-text': 'error',
        '@angular-eslint/accessibility-elements-content': 'error',
        '@angular-eslint/accessibility-label-has-associated-control': 'error',
        '@angular-eslint/accessibility-table-scope': 'error',
        '@angular-eslint/accessibility-valid-aria': 'error',

        /* Override TypeScript rules for Angular specifics */
        '@typescript-eslint/naming-convention': [
          'error',
          /* Default to camelCase */
          {
            selector: 'default',
            format: ['camelCase'],
          },
          /* Variables can be camelCase or UPPER_CASE */
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          /* Allow leading underscore for private */
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          /* Private properties with underscore */
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          /* Protected properties */
          {
            selector: 'memberLike',
            modifiers: ['protected'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          /* Types, interfaces, classes use PascalCase */
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          /* Enum members use UPPER_CASE */
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          /* Allow any format for object properties */
          {
            selector: 'objectLiteralProperty',
            format: null,
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {
        /*
         * ========================================
         * Angular Template Rules
         * ========================================
         */

        /* Best practices */
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/no-interpolation-in-attributes': 'error',
        '@angular-eslint/template/no-call-expression': 'error',
        '@angular-eslint/template/no-any': 'error',
        '@angular-eslint/template/use-track-by-function': 'error',
        '@angular-eslint/template/conditional-complexity': [
          'error',
          {
            maxComplexity: 3,
          },
        ],
        '@angular-eslint/template/cyclomatic-complexity': [
          'error',
          {
            maxComplexity: 5,
          },
        ],

        /* Modern Angular features */
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/prefer-control-flow': 'warn',
        '@angular-eslint/template/prefer-ngsrc': 'error',

        /* Accessibility */
        '@angular-eslint/template/accessibility-alt-text': 'error',
        '@angular-eslint/template/accessibility-elements-content': 'error',
        '@angular-eslint/template/accessibility-label-has-associated-control': 'error',
        '@angular-eslint/template/accessibility-table-scope': 'error',
        '@angular-eslint/template/accessibility-valid-aria': 'error',
        '@angular-eslint/template/click-events-have-key-events': 'error',
        '@angular-eslint/template/mouse-events-have-key-events': 'error',
        '@angular-eslint/template/no-autofocus': 'error',
        '@angular-eslint/template/no-distracting-elements': 'error',
        '@angular-eslint/template/no-positive-tabindex': 'error',
        '@angular-eslint/template/role-has-required-aria': 'error',

        /* Security */
        '@angular-eslint/template/no-inline-styles': [
          'error',
          {
            allowNgStyle: true,
          },
        ],
      },
    },
    {
      /* Component tests */
      files: ['*.spec.ts', '*.test.ts'],
      env: {
        jasmine: true,
        node: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@angular-eslint/no-lifecycle-call': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  plugins: ['@angular-eslint', 'rxjs'],
};
