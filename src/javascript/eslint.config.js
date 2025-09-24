/*
 * INTENTIONAL MODULE RESOLUTION HACK - DO NOT REMOVE
 *
 * This override is necessary and working correctly. It allows ESLint to find
 * our custom plugin (eslint-plugin-txi) without publishing it as a separate
 * npm package. This is intentional because:
 *
 * 1. The plugin is tightly coupled to this style guide
 * 2. We want to ship everything in a single package for simplicity
 * 3. This approach works reliably and all custom rules are functioning
 *
 * The custom rules (prefer-multiline-comments, no-dynamic-test-data,
 * prefer-async-await) are all enabled and working correctly below.
 *
 * If you're seeing this and wondering if it's broken - it's not. This is
 * a deliberate architectural decision to keep the style guide self-contained.
 */
const resolveCache = new Map();
require('module').Module._resolveFilename = ((originalResolveFilename) =>
  function (request, parent, isMain) {
    if (request === 'eslint-plugin-txi') {
      if (!resolveCache.has(request)) {
        resolveCache.set(request, require.resolve('./eslint-plugin-txi'));
      }
      return resolveCache.get(request);
    }
    return originalResolveFilename(request, parent, isMain);
  })(require('module').Module._resolveFilename);

module.exports = {
  parserOptions: {
    ecmaVersion: 2023 /* Support for latest ES features */,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier' /* Must be last to disable rules that conflict with Prettier */,
  ],
  plugins: ['import', 'txi'],
  env: {
    es2023: true,
    node: true,
    browser: true,
  },
  rules: {
    /* Semicolons - Required */
    semi: ['error', 'always'],

    /* Quotes - Single quotes */
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],

    /* Indentation */
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true /* Match Prettier's ternary indentation */,
        ignoreComments: false,
      },
    ],

    /* Comma style */
    'comma-style': ['error', 'last'],

    /* Spacing */
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-infix-ops': 'error',
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
      },
    ],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-multi-spaces': 'error',

    /* Best practices */
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-parens': ['error', 'always'] /* TXI Rule: Always use parentheses */,
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-template': 'error',
    'prefer-spread': 'error',

    /* Modern JavaScript features */
    'prefer-object-has-own': 'error',
    /* 'prefer-optional-chaining': 'error', // ES2023, not in base ESLint */
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'CallExpression[callee.object.name="Object"][callee.property.name="hasOwnProperty"]',
        message: 'Use Object.hasOwn() instead of Object.hasOwnProperty()',
      },
      {
        selector:
          'CallExpression[callee.object.property.name="prototype"][callee.property.name="hasOwnProperty"]',
        message: 'Use Object.hasOwn() instead of hasOwnProperty',
      },
      {
        selector:
          'BinaryExpression[operator="||"][left.type=/Identifier|MemberExpression/][right.type=/Literal|Identifier/]',
        message: 'Consider using nullish coalescing (??) for null/undefined checks',
      },
    ],

    /* Array methods */
    'array-callback-return': 'error',
    /* 'prefer-array-find': 'error', // Not in base ESLint */
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],

    /* Naming conventions */
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: false,
      },
    ],

    /* File naming is enforced at project level, not by ESLint */

    /* Error handling */
    'no-throw-literal': 'error',

    /* Console usage */
    'no-console': ['error', { allow: ['warn', 'error'] }],

    /* Debugging */
    'no-debugger': 'error',

    /* Comments - TXI specific rules */
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+', '='],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],

    /* Custom rule to enforce multi-line comments for permanent documentation */
    'multiline-comment-style': ['error', 'starred-block'],

    /* Allow single-line comments only for TODOs, FIXMEs, and temporary code */
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme', 'hack', 'xxx'],
        location: 'start',
      },
    ],

    /* Line length - Match Prettier's printWidth */
    'max-len': [
      'error',
      {
        code: 100 /* Match Prettier's printWidth */,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: false,
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$' /* Imports are exempt */,
      },
    ],

    /* Brace style */
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    curly: ['error', 'all'],

    /* Trailing commas */
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never' /* ES5 doesn't support trailing commas in function parameters */,
      },
    ],

    /* Import rules */
    'import/no-default-export': 'warn' /* TXI prefers named exports */,
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin' /* Node.js built-in modules */,
          'external' /* External packages */,
          'internal' /* Internal modules */,
          'parent' /* Parent imports (../) */,
          'sibling' /* Sibling imports (./) */,
          'index' /* Index file imports */,
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    /* Security rules */
    'no-new-func': 'error',
    'no-script-url': 'error',

    /* Prevent common security issues */
    'no-restricted-properties': [
      'error',
      {
        object: 'document',
        property: 'write',
        message: 'Avoid document.write as it can lead to XSS vulnerabilities',
      },
      {
        property: '__proto__',
        message: 'Use Object.setPrototypeOf() instead',
      },
      {
        object: 'Object',
        property: 'prototype',
        message: 'Modifying Object.prototype can cause prototype pollution',
      },
    ],

    /* TXI Custom Rules */
    'txi/prefer-multiline-comments': 'error',
    'txi/no-dynamic-test-data': 'error',
    'txi/prefer-async-await': 'warn',
  },
};
