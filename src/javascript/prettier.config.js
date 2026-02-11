module.exports = {
  /* Line length - 100 characters (project-wide standard) */
  printWidth: 100,

  /* Indentation */
  tabWidth: 2,
  useTabs: false,

  /* Semicolons - Required */
  semi: true,

  /* Quotes - Single */
  singleQuote: true,

  /* Trailing commas - ES5 compatible */
  trailingComma: 'es5',

  /* Brackets */
  bracketSpacing: true,
  bracketSameLine: false,

  /* Arrow functions - Always use parentheses */
  arrowParens: 'always',

  /* Line endings */
  endOfLine: 'lf',

  /* Formatting */
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',

  /* Embedded language formatting */
  embeddedLanguageFormatting: 'auto',

  /* Quote props - Only as needed */
  quoteProps: 'as-needed',

  /* JSX specific (if using React) */
  jsxSingleQuote: false,

  /* Overrides for specific file types */
  overrides: [
    {
      files: '*.md',
      options: {
        /* 4-space indent for nested lists (matches markdownlint MD007) */
        tabWidth: 4,
      },
    },
  ],
};
