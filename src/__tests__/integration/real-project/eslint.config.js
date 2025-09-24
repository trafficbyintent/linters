const { getESLintConfig } = require('../../../typescript');

module.exports = getESLintConfig({
  projectRoot: __dirname,
  customRules: {
    '@txi/no-debug-artifacts': [
      'error',
      {
        allowConsoleWarn: true,
        allowConsoleError: true,
      },
    ],
  },
});
