/**
 * TXI JSON ESLint Configuration
 * Based on the TXI JSON Style Guide
 *
 * This configuration enforces the JSON coding standards defined in
 * docs/standards/style-guides/JSON_STYLE_GUIDE.md
 */

module.exports = {
  overrides: [
    {
      files: ['*.json', '*.jsonc', '*.json5'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json'],
      rules: {
        /*
         * ========================================
         * JSON Formatting Rules
         * ========================================
         */

        /* Indentation - 2 spaces */
        'jsonc/indent': ['error', 2],

        /* Quotes - Double quotes only */
        'jsonc/quotes': ['error', 'double'],
        'jsonc/quote-props': ['error', 'always'],

        /* Commas */
        'jsonc/comma-dangle': ['error', 'never'],
        'jsonc/comma-style': ['error', 'last'],

        /* Spacing */
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/object-curly-spacing': ['error', 'always'],
        'jsonc/key-spacing': [
          'error',
          {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
          },
        ],

        /* Property ordering */
        'jsonc/sort-keys': [
          'error',
          'asc',
          {
            caseSensitive: true,
            natural: true,
            minKeys: 2,
          },
        ],

        /* Array formatting */
        'jsonc/array-bracket-newline': ['error', 'consistent'],
        'jsonc/array-element-newline': ['error', 'consistent'],
        'jsonc/object-curly-newline': [
          'error',
          {
            multiline: true,
            consistent: true,
          },
        ],
        'jsonc/object-property-newline': [
          'error',
          {
            allowAllPropertiesOnSameLine: true,
          },
        ],

        /* Comments - Not allowed in JSON */
        'jsonc/no-comments': 'error',

        /* Best practices */
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/valid-json-number': 'error',

        /*
         * ========================================
         * Naming Conventions
         * ========================================
         */

        /* camelCase for property names */
        'jsonc/no-irregular-whitespace': 'error',
      },
    },
    {
      /* JSON with comments (JSONC) */
      files: ['*.jsonc', 'tsconfig.json', 'jsconfig.json'],
      rules: {
        'jsonc/no-comments': 'off',
      },
    },
    {
      /* Package.json specific rules */
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'version',
              'description',
              'keywords',
              'license',
              'author',
              'contributors',
              'repository',
              'homepage',
              'bugs',
              'main',
              'module',
              'types',
              'exports',
              'files',
              'bin',
              'scripts',
              'dependencies',
              'devDependencies',
              'peerDependencies',
              'optionalDependencies',
              'engines',
              'publishConfig',
            ],
          },
          {
            pathPattern: '^scripts$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^(?:dev|peer|optional)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      /* JSON5 files */
      files: ['*.json5'],
      parser: 'jsonc-eslint-parser',
      extends: ['plugin:jsonc/recommended-with-json5'],
      rules: {
        'jsonc/quotes': ['error', 'double'],
        'jsonc/quote-props': ['error', 'always'],
      },
    },
  ],
};
