/*
 * Rule: require-descriptive-test-names
 * Ensures test descriptions start with "should" and are descriptive
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require test descriptions to start with "should" and be descriptive',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      shouldStart: 'Test names should be descriptive. Test description should start with "should"',
      tooShort: 'Test names should be descriptive. Test description is too short.',
    },
  },
  create(context) {
    const testFunctions = ['it', 'test', 'specify'];

    return {
      CallExpression(node) {
        /* Check if it's a test function */
        if (
          testFunctions.includes(node.callee.name) &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string'
        ) {
          const description = node.arguments[0].value;

          /* Check if it starts with "should" */
          if (!description.toLowerCase().startsWith('should')) {
            context.report({
              node: node.arguments[0],
              messageId: 'shouldStart',
            });
          }

          /* Check if description is too short (less than 10 characters) */
          if (description.length < 10) {
            context.report({
              node: node.arguments[0],
              messageId: 'tooShort',
            });
          }
        }
      },
    };
  },
};
