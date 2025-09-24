/*
 * Rule: no-dynamic-test-data
 * Prevents use of Date.now(), Math.random(), etc. in test files
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow dynamic data generation in test files',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noDynamicTestData: 'Do not use {{method}} in test blocks. Use static test data instead.',
    },
  },
  create(context) {
    /* Track if we're inside a test block */
    let inTestBlock = 0;

    const testFunctions = [
      'it',
      'test',
      'describe',
      'beforeEach',
      'afterEach',
      'beforeAll',
      'afterAll',
    ];

    return {
      CallExpression(node) {
        /* Track entering test blocks */
        if (node.callee.type === 'Identifier' && testFunctions.includes(node.callee.name)) {
          inTestBlock++;
        }

        /* Only check for violations inside test blocks */
        if (inTestBlock === 0) {
          return;
        }

        /* Check for Date.now() */
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'Date' &&
          node.callee.property.name === 'now'
        ) {
          context.report({
            node,
            messageId: 'noDynamicTestData',
            data: { method: 'Date.now()' },
          });
        }

        /* Check for Math.random() */
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'Math' &&
          node.callee.property.name === 'random'
        ) {
          context.report({
            node,
            messageId: 'noDynamicTestData',
            data: { method: 'Math.random()' },
          });
        }

        /* Check for crypto.randomUUID() */
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'crypto' &&
          node.callee.property.name === 'randomUUID'
        ) {
          context.report({
            node,
            messageId: 'noDynamicTestData',
            data: { method: 'crypto.randomUUID()' },
          });
        }
      },
      'CallExpression:exit'(node) {
        /* Track exiting test blocks */
        if (node.callee.type === 'Identifier' && testFunctions.includes(node.callee.name)) {
          inTestBlock--;
        }
      },
      NewExpression(node) {
        /* Only check inside test blocks */
        if (inTestBlock === 0) {
          return;
        }

        /* Check for new Date() without arguments */
        if (node.callee.name === 'Date' && node.arguments.length === 0) {
          context.report({
            node,
            messageId: 'noDynamicTestData',
            data: { method: 'new Date()' },
          });
        }
      },
    };
  },
};
