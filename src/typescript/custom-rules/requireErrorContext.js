/*
 * Rule: require-error-context
 * Ensures error messages include contextual information
 */

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require error messages to include contextual information',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingContext:
        'Error message should include contextual information (e.g., IDs, values). Include context.',
      genericError: 'Avoid generic error messages. Include context about what failed and why.',
    },
  },
  create(context) {
    const genericMessages = [
      'not found',
      'error occurred',
      'failed',
      'invalid',
      'error',
      'unknown error',
      'something went wrong',
    ];

    return {
      ThrowStatement(node) {
        if (node.argument && node.argument.type === 'NewExpression') {
          const errorConstructor = node.argument;

          /* Check if it's an Error constructor */
          if (errorConstructor.callee.name === 'Error' && errorConstructor.arguments.length > 0) {
            const messageArg = errorConstructor.arguments[0];

            /* Check for string literal with generic message */
            if (messageArg.type === 'Literal' && typeof messageArg.value === 'string') {
              const message = messageArg.value.toLowerCase();

              /* Check for generic messages first */
              const isGeneric = genericMessages.some((generic) => message === generic);

              if (isGeneric) {
                context.report({
                  node: messageArg,
                  messageId: 'genericError',
                });
              } else if (
                !message.includes(':') &&
                !message.includes('with') &&
                !message.includes('for')
              ) {
                /* Only check for missing context if it's not already generic */
                context.report({
                  node: messageArg,
                  messageId: 'missingContext',
                });
              }
            }

            /*
             * Template literals are good (likely includes variables)
             * So we don't report an error for template literals
             */
          }
        }
      },
    };
  },
};
