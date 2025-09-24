/**
 * TXI Custom ESLint Plugin - JavaScript Version
 * Enforces TXI-specific JavaScript style guide rules
 *
 * DUAL RULE SYSTEM EXPLANATION:
 *
 * This is the JavaScript-specific implementation of TXI custom rules, separate
 * from the TypeScript version for architectural reasons:
 *
 * 1. JavaScript requires a full ESLint plugin structure with meta definitions
 * 2. Uses the module resolution hack in eslint.config.js for loading
 * 3. Optimized for JavaScript AST without TypeScript type information
 *
 * The separation allows each implementation to be optimized for its target
 * language while maintaining consistent rule behavior. The JavaScript plugin
 * focuses on runtime patterns while TypeScript rules can leverage type info.
 *
 * TODO: Future consolidation planned to reduce maintenance burden while
 * preserving language-specific optimizations.
 */

module.exports = {
  rules: {
    /* Rule to enforce multi-line comments for permanent documentation */
    'prefer-multiline-comments': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce multi-line comments for permanent documentation',
          category: 'Stylistic Issues',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
      },
      create(context) {
        const sourceCode = context.getSourceCode();

        return {
          Program() {
            const comments = sourceCode.getAllComments();

            comments.forEach((comment) => {
              /* Skip if it's already a block comment */
              if (comment.type === 'Block') {
                return;
              }

              const commentText = comment.value.trim();

              /* Allow single-line comments only for specific cases */
              const allowedPatterns = [
                /^TODO:/i,
                /^FIXME:/i,
                /^HACK:/i,
                /^XXX:/i,
                /^NOTE:/i,
                /^eslint-disable/,
                /^eslint-enable/,
                /^istanbul/,
                /^c8/,
                /^\/\s*$/ /* Triple slash or more (commented out code) */,
              ];

              /* Check if this is commented out code */
              const looksLikeCode =
                /^[\s]*[a-zA-Z_$][\w$]*\s*[=:(]|^[\s]*(?:const|let|var|function|class|if|for|while|return|import|export)\b/.test(
                  commentText
                );

              if (!allowedPatterns.some((pattern) => pattern.test(commentText)) && !looksLikeCode) {
                context.report({
                  node: comment,
                  message:
                    'Use multi-line comments (/* */) for permanent documentation. Single-line comments (//) should only be used for TODOs or temporarily commenting out code.',
                  fix(fixer) {
                    const commentContent = comment.value;
                    return fixer.replaceText(comment, `/*${commentContent} */`);
                  },
                });
              }
            });
          },
        };
      },
    },

    /* Rule to enforce static test data */
    'no-dynamic-test-data': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow dynamic test data in test files',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [],
      },
      create(context) {
        const filename = context.getFilename();

        /* Only apply this rule to test files */
        if (
          !filename.includes('.test.') &&
          !filename.includes('.spec.') &&
          !filename.includes('__tests__')
        ) {
          return {};
        }

        return {
          CallExpression(node) {
            const callee = node.callee;

            /* Check for Math.random() */
            if (
              callee.type === 'MemberExpression' &&
              callee.object.name === 'Math' &&
              callee.property.name === 'random'
            ) {
              context.report({
                node,
                message:
                  'Avoid Math.random() in tests. Use static test data for predictable results.',
              });
            }

            /* Check for Date.now() */
            if (
              callee.type === 'MemberExpression' &&
              callee.object.name === 'Date' &&
              callee.property.name === 'now'
            ) {
              context.report({
                node,
                message:
                  'Avoid Date.now() in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
              });
            }
          },

          NewExpression(node) {
            /* Check for new Date() without arguments */
            if (node.callee.name === 'Date' && node.arguments.length === 0) {
              context.report({
                node,
                message:
                  'Avoid new Date() without arguments in tests. Use static dates like new Date("2024-01-15T10:00:00Z") for predictable results.',
              });
            }
          },

          TemplateLiteral(node) {
            /* Check for template literals that might use Date.now() */
            node.expressions.forEach((expression) => {
              if (
                expression.type === 'CallExpression' &&
                expression.callee.type === 'MemberExpression' &&
                expression.callee.object.name === 'Date' &&
                expression.callee.property.name === 'now'
              ) {
                context.report({
                  node: expression,
                  message: 'Avoid Date.now() in template literals in tests. Use static values.',
                });
              }
            });
          },
        };
      },
    },

    /* Rule to enforce proper async/await patterns */
    'prefer-async-await': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prefer async/await over promise chains',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [],
      },
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === 'MemberExpression' &&
              node.callee.property.name === 'then' &&
              node.parent.type === 'MemberExpression' &&
              node.parent.property.name === 'then'
            ) {
              context.report({
                node,
                message: 'Prefer async/await over chained .then() calls for better readability.',
              });
            }
          },
        };
      },
    },
  },
};
