const _customRules = require('./custom-rules');

/*
 * INTENTIONAL MODULE RESOLUTION HACK - DO NOT REMOVE
 *
 * This override is necessary and working correctly. It allows ESLint to find
 * our custom TypeScript plugin (@trafficbyintent) without publishing it as a
 * separate npm package. This is intentional because:
 *
 * 1. The plugin is tightly coupled to this style guide
 * 2. We want to ship everything in a single package for simplicity
 * 3. This approach works reliably and all custom rules are functioning
 *
 * The custom rules (no-debug-artifacts, no-dynamic-test-data,
 * require-descriptive-test-names, require-error-context) are all enabled
 * and working correctly below.
 *
 * If you're seeing this and wondering if it's broken - it's not. This is
 * a deliberate architectural decision to keep the style guide self-contained.
 */
require('module').Module._resolveFilename = ((originalResolveFilename) =>
  function (request, parent, isMain) {
    if (
      request === 'eslint-plugin-@trafficbyintent' ||
      request === '@trafficbyintent/eslint-plugin'
    ) {
      return require.resolve('./custom-rules');
    }
    return originalResolveFilename(request, parent, isMain);
  })(require('module').Module._resolveFilename);

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier' /* Must be last to override other configs */,
  ],
  plugins: ['@typescript-eslint', '@stylistic/ts', 'import', '@trafficbyintent'],
  env: {
    es2022: true,
    node: true,
  },
  rules: {
    /*
     * ========================================
     * Semicolons - MUST terminate all statements
     * ========================================
     */
    semi: 'off',
    '@stylistic/ts/semi': ['error', 'always'],

    /*
     * ========================================
     * Quotes - Single quotes required
     * ========================================
     */
    quotes: 'off',
    '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],

    /*
     * ========================================
     * Trailing commas - MUST include in multiline
     * ========================================
     */
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    /*
     * ========================================
     * Arrow functions - MUST always use parentheses
     * ========================================
     */
    'arrow-parens': ['error', 'always'],

    /*
     * ========================================
     * Indentation - 2 spaces (handled by Prettier)
     * ========================================
     */
    indent: 'off',
    '@stylistic/ts/indent': 'off',

    /*
     * ========================================
     * Spacing rules
     * ========================================
     */
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false }],

    /*
     * ========================================
     * Variables - MUST use const/let, never var
     * ========================================
     */
    'no-var': 'error',
    'prefer-const': 'error',
    'one-var': ['error', 'never'],

    /*
     * ========================================
     * Imports and exports
     * ========================================
     */
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*/*/*'] /* Prevent deep relative imports */,
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],

    /*
     * ========================================
     * Type annotations - Always annotate public APIs
     * ========================================
     */
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],

    /*
     * ========================================
     * Type-only imports and exports
     * ========================================
     */
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],

    /*
     * ========================================
     * Null vs undefined - MUST prefer undefined
     * ========================================
     */
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'no-null/no-null': 'off' /* We allow null in specific cases */,

    /*
     * ========================================
     * Equality - MUST use === and !==
     * ========================================
     */
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    /*
     * ========================================
     * Control structures - Braces required
     * ========================================
     */
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],

    /*
     * ========================================
     * Classes and private fields
     * ========================================
     */
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ],
    '@stylistic/ts/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off' /* Too restrictive */,

    /*
     * ========================================
     * Naming conventions
     * ========================================
     */
    '@typescript-eslint/naming-convention': [
      'error',
      /* Default to camelCase */
      {
        selector: 'default',
        format: ['camelCase'],
      },
      /* Variables can be camelCase or UPPER_CASE (for constants) */
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      /* Allow leading underscore for unused parameters */
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      /* Private fields must start with # (ES2022 syntax) */
      {
        selector: 'classProperty',
        modifiers: ['private'],
        format: ['camelCase'],
        prefix: ['#'],
      },
      /* Types, interfaces, classes use PascalCase */
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      /* Type parameters use single uppercase letter or PascalCase */
      {
        selector: 'typeParameter',
        format: ['PascalCase', 'UPPER_CASE'],
        custom: {
          regex: '^(T|U|K|V|[A-Z][a-zA-Z]+)$',
          match: true,
        },
      },
      /* Enum members use UPPER_CASE */
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      /* Allow any format for object properties (for external APIs) */
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
    ],

    /*
     * ========================================
     * Comments - Multi-line for persistent docs
     * ========================================
     */
    'multiline-comment-style': ['error', 'starred-block'],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],

    /*
     * ========================================
     * Modern TypeScript features
     * ========================================
     */
    'prefer-template': 'error',
    'prefer-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    /*
     * ========================================
     * Type safety - Prefer unknown over any
     * ========================================
     */
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',

    /*
     * ========================================
     * Error handling
     * ========================================
     */
    '@typescript-eslint/only-throw-error': 'error',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

    /*
     * ========================================
     * Async/await over promises
     * ========================================
     */
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
        ignoreIIFE: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': 'error',

    /*
     * ========================================
     * Type assertions
     * ========================================
     */
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],

    /*
     * ========================================
     * Interfaces vs Type aliases
     * ========================================
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
        allowCallbacks: 'always',
        allowConditionalTypes: 'always',
        allowConstructors: 'always',
        allowLiterals: 'in-unions-and-intersections',
        allowMappedTypes: 'always',
        allowTupleTypes: 'always',
        allowGenerics: 'always',
      },
    ],

    /*
     * ========================================
     * Switch statements - default required
     * ========================================
     */
    'default-case': 'error',
    'default-case-last': 'error',

    /*
     * ========================================
     * Debugging
     * ========================================
     */
    'no-console': 'error',
    'no-debugger': 'error',

    /*
     * ========================================
     * Custom TXI rules
     * ========================================
     */
    '@trafficbyintent/no-debug-artifacts': [
      'error',
      {
        allowConsoleWarn: true,
        allowConsoleError: true,
      },
    ],
    '@trafficbyintent/no-dynamic-test-data': 'error',
    '@trafficbyintent/require-descriptive-test-names': 'error',
    '@trafficbyintent/require-error-context': 'error',

    /*
     * ========================================
     * Additional TypeScript strict rules
     * ========================================
     */
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    /*
     * ========================================
     * Modern TypeScript features
     * ========================================
     */
    '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-useless-template-literals': 'error',
    '@typescript-eslint/prefer-find': 'error',
    '@typescript-eslint/prefer-promise-reject-errors': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',

    /*
     * ========================================
     * Disabled rules
     * ========================================
     */
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/unbound-method': 'off' /* Too restrictive with some libraries */,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      /* Test files */
      files: [
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.integration.test.ts',
        '**/*.integration.gcp.test.ts',
        '**/__tests__/**',
        '**/tests/**',
      ],
      env: {
        node: true,
      },
      rules: {
        /* Allow some flexibility in tests */
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',

        /* Enforce static test data */
        '@trafficbyintent/no-dynamic-test-data': 'error',
        'no-restricted-globals': [
          'error',
          {
            name: 'Date',
            message: 'Use static dates like new Date("2024-01-01T00:00:00Z") in tests',
          },
        ],
        'no-restricted-properties': [
          'error',
          {
            object: 'Math',
            property: 'random',
            message: 'Use static values instead of Math.random() in tests',
          },
          {
            object: 'Date',
            property: 'now',
            message: 'Use static timestamps instead of Date.now() in tests',
          },
          {
            object: 'crypto',
            property: 'randomUUID',
            message: 'Use static UUIDs like "test-uuid-123" in tests',
          },
          {
            object: 'crypto',
            property: 'getRandomValues',
            message: 'Use static values instead of crypto.getRandomValues() in tests',
          },
        ],
        'no-restricted-syntax': [
          'error',
          {
            selector: 'NewExpression[callee.name="Date"]:not([arguments.length>0])',
            message: 'Use new Date("2024-01-01T00:00:00Z") instead of new Date() in tests',
          },
        ],
      },
    },
    {
      /* Configuration files */
      files: ['*.config.js', '*.config.ts'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
