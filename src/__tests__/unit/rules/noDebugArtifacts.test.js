const { RuleTester } = require('eslint');

const rule = require('../../../typescript/custom-rules/noDebugArtifacts');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

describe('no-debug-artifacts', () => {
  ruleTester.run('no-debug-artifacts', rule, {
    valid: [
      // Valid: No console or debugger statements
      {
        code: `
          function calculate(a, b) {
            return a + b;
          }
        `,
      },
      // Valid: console.warn allowed with option
      {
        code: `console.warn('Deprecation warning');`,
        options: [{ allowConsoleWarn: true }],
      },
      // Valid: console.error allowed with option
      {
        code: `console.error('Error occurred:', error);`,
        options: [{ allowConsoleError: true }],
      },
      // Valid: Both allowed
      {
        code: `
          console.warn('Warning');
          console.error('Error');
        `,
        options: [{ allowConsoleWarn: true, allowConsoleError: true }],
      },
      // Valid: Non-console member expressions
      {
        code: `logger.log('info');`,
      },
    ],
    invalid: [
      // Invalid: console.log
      {
        code: `console.log('debug info');`,
        errors: [{ messageId: 'noConsoleLog' }],
        output: ``,
      },
      // Invalid: debugger statement
      {
        code: `
          function test() {
            debugger;
            return true;
          }
        `,
        errors: [{ messageId: 'noDebugger' }],
        output: `
          function test() {
            
            return true;
          }
        `,
      },
      // Invalid: console.warn without permission
      {
        code: `console.warn('warning');`,
        errors: [{ messageId: 'noConsole', data: { method: 'warn' } }],
        output: ``,
      },
      // Invalid: console.error without permission
      {
        code: `console.error('error');`,
        errors: [{ messageId: 'noConsole', data: { method: 'error' } }],
        output: ``,
      },
      // Invalid: Other console methods
      {
        code: `console.debug('debug');`,
        errors: [{ messageId: 'noConsole', data: { method: 'debug' } }],
        output: ``,
      },
      {
        code: `console.info('info');`,
        errors: [{ messageId: 'noConsole', data: { method: 'info' } }],
        output: ``,
      },
      {
        code: `console.trace('trace');`,
        errors: [{ messageId: 'noConsole', data: { method: 'trace' } }],
        output: ``,
      },
      // Invalid: console.log with options (still not allowed)
      {
        code: `console.log('test');`,
        options: [{ allowConsoleWarn: true, allowConsoleError: true }],
        errors: [{ messageId: 'noConsoleLog' }],
        output: ``,
      },
      // Invalid: Multiple violations
      {
        code: `
          console.log('one');
          debugger;
          console.info('two');
        `,
        errors: [
          { messageId: 'noConsoleLog' },
          { messageId: 'noDebugger' },
          { messageId: 'noConsole', data: { method: 'info' } },
        ],
        output: `
          
          
          
        `,
      },
      // Invalid: console.log in return statement (not ExpressionStatement)
      {
        code: `function test() { return console.log('test'); }`,
        errors: [{ messageId: 'noConsoleLog' }],
      },
      // Invalid: console.warn in variable declaration
      {
        code: `const x = console.warn('warning');`,
        errors: [{ messageId: 'noConsole', data: { method: 'warn' } }],
      },
      // Invalid: console.error in conditional expression
      {
        code: `const result = condition ? console.error('error') : null;`,
        errors: [{ messageId: 'noConsole', data: { method: 'error' } }],
      },
    ],
  });
});
