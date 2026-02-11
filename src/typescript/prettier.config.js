module.exports = {
  /* Semicolons - Required */
  semi: true,

  /* Quotes - Single quotes */
  singleQuote: true,

  /* Trailing commas - All (multiline) */
  trailingComma: 'all',

  /* Arrow function parentheses - Always */
  arrowParens: 'always',

  /* Indentation - 2 spaces */
  tabWidth: 2,
  useTabs: false,

  /* Line length - 100 characters (project-wide standard) */
  printWidth: 100,

  /* Spacing */
  bracketSpacing: true /* { foo } not {foo} */,

  /* Line endings */
  endOfLine: 'lf',

  /* JSX specific (if using React) */
  jsxSingleQuote: false /* Use double quotes in JSX */,
  bracketSameLine: false,

  /* Other formatting */
  quoteProps: 'as-needed',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',

  /* Overrides for specific file types */
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
        /* 4-space indent for nested lists (matches markdownlint MD007) */
        tabWidth: 4,
      },
    },
    {
      files: '*.js',
      options: {
        /* Match JavaScript config for JS files in TypeScript directory */
        trailingComma: 'es5',
      },
    },
  ],
};
