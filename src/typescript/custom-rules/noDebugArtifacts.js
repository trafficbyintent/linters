/*
 * Rule: no-debug-artifacts
 * Prevents console.log and debugger statements
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow console.log and debugger statements',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allowConsoleWarn: {
            type: 'boolean',
            default: false,
          },
          allowConsoleError: {
            type: 'boolean',
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noConsoleLog: 'Remove console.log statement',
      noDebugger: 'Remove debugger statement',
      noConsole: 'Remove console.{{method}} statement',
    },
  },
  create(context) {
    const options = context.options[0] || {};
    const allowConsoleWarn = options.allowConsoleWarn || false;
    const allowConsoleError = options.allowConsoleError || false;

    return {
      /* Check for debugger statements */
      DebuggerStatement(node) {
        context.report({
          node,
          messageId: 'noDebugger',
          fix(fixer) {
            return fixer.remove(node);
          },
        });
      },

      /* Check for console statements */
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression' && node.callee.object.name === 'console') {
          const method = node.callee.property.name;

          /* Always disallow console.log */
          if (method === 'log') {
            const parent = node.parent;
            const reportOptions = {
              node,
              messageId: 'noConsoleLog',
            };

            /* Only provide fix if it's safe to remove */
            if (parent && parent.type === 'ExpressionStatement') {
              reportOptions.fix = function (fixer) {
                return fixer.remove(parent);
              };
            }

            context.report(reportOptions);
          }

          /* Check other console methods based on options */
          if (
            (!allowConsoleWarn && method === 'warn') ||
            (!allowConsoleError && method === 'error') ||
            ['debug', 'info', 'trace'].includes(method)
          ) {
            const parent = node.parent;
            const reportOptions = {
              node,
              messageId: 'noConsole',
              data: { method },
            };

            /* Only provide fix if it's safe to remove */
            if (parent && parent.type === 'ExpressionStatement') {
              reportOptions.fix = function (fixer) {
                return fixer.remove(parent);
              };
            }

            context.report(reportOptions);
          }
        }
      },
    };
  },
};
