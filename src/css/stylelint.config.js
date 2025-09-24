/**
 * TXI Stylelint Configuration
 * Based on the TXI CSS Style Guide
 *
 * This configuration enforces the CSS coding standards defined in
 * docs/standards/style-guides/CSS_STYLE_GUIDE.md
 */

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    /*
     * ========================================
     * General Rules
     * ========================================
     */

    /* Indentation - 2 spaces */
    indentation: 2,

    /* Quotes - Single quotes for CSS */
    'string-quotes': 'single',

    /* No empty rules */
    'block-no-empty': true,

    /* Comments */
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'comment-whitespace-inside': 'always',

    /*
     * ========================================
     * Naming Conventions
     * ========================================
     */

    /* Class naming - hyphenated lowercase (BEM pattern) */
    'selector-class-pattern': [
      '^[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
      {
        message: 'Class names should follow BEM pattern or be hyphenated lowercase',
      },
    ],

    /* ID selectors - Not recommended */
    'selector-max-id': 0,
    'selector-id-pattern': [
      '^[a-z][a-z0-9-]*$',
      {
        message: 'ID selectors should be avoided. If necessary, use lowercase with hyphens',
      },
    ],

    /* Type selectors - Avoid qualifying */
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class'],
      },
    ],

    /*
     * ========================================
     * Property Order - Alphabetical
     * ========================================
     */
    'order/properties-alphabetical-order': true,

    /*
     * ========================================
     * Values and Units
     * ========================================
     */

    /* 0 values - no units */
    'length-zero-no-unit': true,

    /* Leading zeros - required */
    'number-leading-zero': 'always',

    /* Hexadecimal notation - lowercase, short where possible */
    'color-hex-case': 'lower',
    'color-hex-length': 'short',

    /* No invalid hex colors */
    'color-no-invalid-hex': true,

    /* Function names - lowercase */
    'function-name-case': 'lower',

    /*
     * ========================================
     * Formatting Rules
     * ========================================
     */

    /* Declaration blocks */
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',

    /* Property names */
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',

    /* Blocks */
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',

    /* Selectors */
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',

    /* Rules */
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],

    /* Media queries */
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    /* At-rules */
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['import', 'layer'],
      },
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-semicolon-newline-after': 'always',

    /*
     * ========================================
     * Modern CSS Features
     * ========================================
     */

    /* CSS Custom Properties */
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'custom-property-pattern': '^[a-z][a-z0-9-]*$',

    /* Grid and Flexbox */
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],

    /*
     * ========================================
     * Performance & Best Practices
     * ========================================
     */

    /* Specificity */
    'selector-max-specificity': '0,3,0' /* Max 3 classes, no IDs */,
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 4,

    /* Vendor prefixes - handled by autoprefixer */
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,

    /* !important - avoid */
    'declaration-no-important': true,

    /* Duplicates */
    'no-duplicate-selectors': true,

    /*
     * ========================================
     * SCSS/Sass Rules (if using preprocessors)
     * ========================================
     */
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/at-extend-no-missing-placeholder': true,

    /*
     * ========================================
     * Accessibility
     * ========================================
     */

    /* Font families */
    'font-family-no-missing-generic-family-keyword': true,
    'font-family-name-quotes': 'always-where-recommended',

    /*
     * ========================================
     * BEM Pattern Enforcement
     * ========================================
     */
    'plugin/selector-bem-pattern': {
      componentName: '[A-Z]+',
      componentSelectors: {
        initial: '^\\.{componentName}(?:-[a-z]+)?$',
        combined: '^\\.combined-{componentName}-[a-z]+$',
      },
      utilitySelectors: '^\\.u-[a-z]+$',
    },

    /*
     * ========================================
     * Line Length - 80 characters
     * ========================================
     */
    'max-line-length': [
      80,
      {
        ignore: ['comments', 'non-comments'],
        ignorePattern: ['/https?://[0-9,a-z]*.*/i', '/^@import\\s+/'],
      },
    ],
  },
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    'node_modules/**',
    'dist/**',
    'build/**',
    'coverage/**',
  ],
};
