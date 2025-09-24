/**
 * Custom ESLint Rules Integration Test
 *
 * This test ensures that our custom TXI rules integrate properly with
 * the ESLint configurations and work as expected in real scenarios.
 */

const _path = require('path');

const { ESLint } = require('eslint');

/* Import our custom rules */
const customRules = require('../../typescript/custom-rules');

describe('Custom ESLint Rules Integration', () => {
  describe('TypeScript with Custom Rules', () => {
    let eslint;

    beforeAll(() => {
      /* Create ESLint instance with custom plugin */
      eslint = new ESLint({
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@trafficbyintent'],
          rules: {
            '@trafficbyintent/no-debug-artifacts': [
              'error',
              {
                allowConsoleWarn: true,
                allowConsoleError: true,
              },
            ],
            '@trafficbyintent/no-dynamic-test-data': 'error',
            '@trafficbyintent/require-descriptive-test-names': 'error',
            '@trafficbyintent/require-error-context': 'error',
          },
        },
        useEslintrc: false,
        plugins: {
          '@trafficbyintent': customRules,
        },
      });
    });

    describe('no-debug-artifacts rule', () => {
      test('catches console.log but allows warn and error', async () => {
        const code = `
          console.log('debug');
          console.warn('warning');
          console.error('error');
        `;

        const results = await eslint.lintText(code, { filePath: 'test.ts' });
        const messages = results[0].messages;

        /* Should have exactly one error for console.log */
        expect(messages).toHaveLength(1);
        expect(messages[0].ruleId).toBe('@trafficbyintent/no-debug-artifacts');
        expect(messages[0].message).toContain('console.log');
      });

      test('catches debugger statements', async () => {
        const code = `
          function test() {
            debugger;
            return true;
          }
        `;

        const results = await eslint.lintText(code, { filePath: 'test.ts' });
        const messages = results[0].messages;

        expect(messages).toHaveLength(1);
        expect(messages[0].ruleId).toBe('@trafficbyintent/no-debug-artifacts');
        expect(messages[0].message).toContain('debugger');
      });
    });

    describe('no-dynamic-test-data rule', () => {
      test('catches Date.now() in test files', async () => {
        const code = `
          describe('User Service', () => {
            it('should create user', () => {
              const user = {
                id: Date.now(),
                name: 'Test User'
              };
            });
          });
        `;

        const results = await eslint.lintText(code, {
          filePath: 'user.test.ts',
        });
        const messages = results[0].messages;

        expect(
          messages.some(
            (m) =>
              m.ruleId === '@trafficbyintent/no-dynamic-test-data' &&
              m.message.includes('Date.now()')
          )
        ).toBe(true);
      });

      test('catches Math.random() in test files', async () => {
        const code = `
          test('random test', () => {
            const randomValue = Math.random();
            expect(randomValue).toBeLessThan(1);
          });
        `;

        const results = await eslint.lintText(code, {
          filePath: 'random.test.ts',
        });
        const messages = results[0].messages;

        expect(
          messages.some(
            (m) =>
              m.ruleId === '@trafficbyintent/no-dynamic-test-data' &&
              m.message.includes('Math.random()')
          )
        ).toBe(true);
      });

      test('allows Date.now() in non-test files', async () => {
        const code = `
          export function getCurrentTimestamp() {
            return Date.now();
          }
        `;

        const results = await eslint.lintText(code, { filePath: 'utils.ts' });
        const messages = results[0].messages;

        expect(messages).toHaveLength(0);
      });
    });

    describe('require-descriptive-test-names rule', () => {
      test('catches non-descriptive test names', async () => {
        const code = `
          describe('Service', () => {
            it('test', () => {
              expect(true).toBe(true);
            });
            
            test('works', () => {
              expect(1 + 1).toBe(2);
            });
          });
        `;

        const results = await eslint.lintText(code, {
          filePath: 'service.test.ts',
        });
        const messages = results[0].messages.filter(
          (m) => m.ruleId === '@trafficbyintent/require-descriptive-test-names'
        );

        /* 2 tests, each with 2 errors (shouldStart + tooShort) */
        expect(messages).toHaveLength(4);
        expect(messages[0].message).toContain('Test names should be descriptive');
      });

      test('allows descriptive test names', async () => {
        const code = `
          describe('UserService', () => {
            it('should create a new user with valid data', () => {
              expect(true).toBe(true);
            });
            
            test('should return null when user is not found', () => {
              expect(null).toBeNull();
            });
          });
        `;

        const results = await eslint.lintText(code, {
          filePath: 'user.test.ts',
        });
        const messages = results[0].messages.filter(
          (m) => m.ruleId === '@trafficbyintent/require-descriptive-test-names'
        );

        expect(messages).toHaveLength(0);
      });
    });

    describe('require-error-context rule', () => {
      test('catches errors thrown without context', async () => {
        const code = `
          function processData(data: unknown) {
            if (!data) {
              throw new Error('Invalid data');
            }
          }
        `;

        const results = await eslint.lintText(code, {
          filePath: 'processor.ts',
        });
        const messages = results[0].messages.filter(
          (m) => m.ruleId === '@trafficbyintent/require-error-context'
        );

        expect(messages).toHaveLength(1);
        expect(messages[0].message).toContain('Include context');
      });

      test('allows errors with context', async () => {
        const code = `
          function processData(data: unknown, userId: string) {
            if (!data) {
              throw new Error(\`Invalid data for user \${userId}: data is \${typeof data}\`);
            }
          }
        `;

        const results = await eslint.lintText(code, {
          filePath: 'processor.ts',
        });
        const messages = results[0].messages.filter(
          (m) => m.ruleId === '@trafficbyintent/require-error-context'
        );

        expect(messages).toHaveLength(0);
      });
    });
  });

  describe('JavaScript with Custom Rules', () => {
    test('custom rules work with JavaScript files when configured', async () => {
      const eslint = new ESLint({
        baseConfig: {
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@trafficbyintent'],
          rules: {
            '@trafficbyintent/no-debug-artifacts': 'error',
          },
        },
        useEslintrc: false,
        plugins: {
          '@trafficbyintent': customRules,
        },
      });

      const code = `
        console.log('debug info');
        console.error('error info');
      `;

      const results = await eslint.lintText(code, { filePath: 'app.js' });
      const messages = results[0].messages;

      /* Should catch console.log even without TypeScript */
      expect(
        messages.some(
          (m) =>
            m.ruleId === '@trafficbyintent/no-debug-artifacts' && m.message.includes('console.log')
        )
      ).toBe(true);
    });
  });

  describe('Full Configuration Integration', () => {
    test('TypeScript config with custom rules catches all issues', async () => {
      /* Simulate a more complete configuration */
      const eslint = new ESLint({
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint', '@trafficbyintent'],
          rules: {
            /* Standard rules */
            '@typescript-eslint/semi': ['error', 'always'],
            '@typescript-eslint/quotes': ['error', 'single'],
            'no-var': 'error',
            'prefer-const': 'error',

            /* Custom rules */
            '@trafficbyintent/no-debug-artifacts': [
              'error',
              {
                allowConsoleWarn: true,
                allowConsoleError: true,
              },
            ],
            '@trafficbyintent/no-dynamic-test-data': 'error',
            '@trafficbyintent/require-descriptive-test-names': 'error',
            '@trafficbyintent/require-error-context': 'error',
          },
        },
        useEslintrc: false,
        plugins: {
          '@trafficbyintent': customRules,
        },
      });

      /* Code with multiple violations */
      const code = `
        var message = "Hello"
        console.log(message)
        
        describe('Test', () => {
          it('test', () => {
            const id = Date.now();
            if (!id) {
              throw new Error('Failed');
            }
          });
        });
      `;

      const results = await eslint.lintText(code, { filePath: 'bad.test.ts' });
      const messages = results[0].messages;

      /* Should catch multiple types of errors */
      const ruleIds = messages.map((m) => m.ruleId);

      expect(ruleIds).toContain('no-var');
      expect(ruleIds).toContain('@typescript-eslint/quotes');
      expect(ruleIds).toContain('@typescript-eslint/semi');
      expect(ruleIds).toContain('@trafficbyintent/no-debug-artifacts');
      expect(ruleIds).toContain('@trafficbyintent/no-dynamic-test-data');
      expect(ruleIds).toContain('@trafficbyintent/require-descriptive-test-names');
      expect(ruleIds).toContain('@trafficbyintent/require-error-context');
    });
  });

  describe('Auto-fix Capability', () => {
    test('custom rules provide auto-fix where appropriate', async () => {
      const eslint = new ESLint({
        baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
          },
          plugins: ['@trafficbyintent'],
          rules: {
            '@trafficbyintent/no-debug-artifacts': 'error',
          },
        },
        useEslintrc: false,
        plugins: {
          '@trafficbyintent': customRules,
        },
        fix: true,
      });

      const code = `
        function test() {
          console.log('debug');
          debugger;
          return true;
        }
      `;

      const results = await eslint.lintText(code, { filePath: 'fixable.ts' });

      /* Should have fixes */
      expect(results[0].output).toBeDefined();
      expect(results[0].output).not.toContain('console.log');
      expect(results[0].output).not.toContain('debugger');
    });
  });
});
