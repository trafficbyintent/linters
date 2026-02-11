/**
 * TXI React ESLint Configuration
 * Based on the TXI React Style Guide
 *
 * This configuration enforces the React coding standards defined in
 * docs/standards/style-guides/REACT_STYLE_GUIDE.md
 */

module.exports = {
  /* Extend from base configs */
  extends: [
    '../javascript/eslint.config',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2023: true,
    node: true,
  },
  rules: {
    /*
     * ========================================
     * React-specific Rules
     * ========================================
     */

    /* Component naming - PascalCase */
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],

    /*
     * File naming - Components in PascalCase files
     * (This is enforced at project level, not by ESLint)
     */

    /* JSX formatting */
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],

    /* Props */
    'react/prop-types': 'off' /* Using TypeScript for type checking */,
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        multiline: 'last',
        ignoreCase: true,
      },
    ],

    /* Hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /* Component structure */
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      },
    ],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: false,
      },
    ],

    /* Best practices */
    'react/no-array-index-key': 'warn',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
      },
    ],
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/prefer-stateless-function': [
      'error',
      {
        ignorePureComponents: true,
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/void-dom-elements-no-children': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'off' /* Not needed with React 17+ */,
    'react/react-in-jsx-scope': 'off' /* Not needed with React 17+ */,

    /* Fragment usage */
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-useless-fragment': 'error',

    /* Security */
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': [
      'error',
      {
        enforceDynamicLinks: 'always',
      },
    ],

    /* Accessibility (via jsx-a11y) */
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-onchange': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',

    /* Import/Export */
    'import/no-default-export': 'off' /* Allow default exports for pages in Next.js */,
    'react/display-name': 'off' /* Not always necessary with arrow functions */,

    /* Modern React patterns */
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/no-unstable-nested-components': [
      'error',
      {
        allowAsProps: true,
      },
    ],

    /*
     * ========================================
     * TypeScript + React Rules
     * ========================================
     */
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
  },
  overrides: [
    {
      /* TypeScript files */
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        '../typescript/eslint.config',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      rules: {
        /* TypeScript handles prop types */
        'react/prop-types': 'off',
        'react/require-default-props': 'off',

        /* Prefer type imports */
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports',
          },
        ],
      },
    },
    {
      /* Test files */
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/__tests__/**'],
      env: {
        node: true,
      },
      rules: {
        /* Allow more flexibility in tests */
        'react/jsx-no-bind': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    {
      /* Storybook files */
      files: ['**/*.stories.{js,jsx,ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/function-component-definition': 'off',
      },
    },
    {
      /* Next.js pages */
      files: ['pages/**/*.{js,jsx,ts,tsx}', 'app/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
