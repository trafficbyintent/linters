import { describe, it, expect } from 'vitest';
import rootEslintConfig from '../../../.eslintrc.js';

describe('Root .eslintrc.js Configuration', () => {
  it('should have root set to true', () => {
    expect(rootEslintConfig.root).toBe(true);
  });

  it('should have overrides array', () => {
    expect(rootEslintConfig).toHaveProperty('overrides');
    expect(Array.isArray(rootEslintConfig.overrides)).toBe(true);
    expect(rootEslintConfig.overrides.length).toBeGreaterThan(0);
  });

  it('should configure test files override', () => {
    const testOverride = rootEslintConfig.overrides[0];

    expect(testOverride).toHaveProperty('files');
    expect(testOverride.files).toContain('__tests__/**/*.js');

    expect(testOverride).toHaveProperty('env');
    expect(testOverride.env).toHaveProperty('jest', true);
    expect(testOverride.env).toHaveProperty('node', true);

    expect(testOverride).toHaveProperty('globals');
  });

  it('should define test globals', () => {
    const testOverride = rootEslintConfig.overrides[0];
    const globals = testOverride.globals;

    expect(globals).toHaveProperty('describe', 'readonly');
    expect(globals).toHaveProperty('it', 'readonly');
    expect(globals).toHaveProperty('test', 'readonly');
    expect(globals).toHaveProperty('expect', 'readonly');
    expect(globals).toHaveProperty('beforeAll', 'readonly');
    expect(globals).toHaveProperty('beforeEach', 'readonly');
    expect(globals).toHaveProperty('afterAll', 'readonly');
    expect(globals).toHaveProperty('afterEach', 'readonly');
  });

  it('should have all expected properties', () => {
    /* Verify the complete structure */
    expect(rootEslintConfig).toEqual({
      root: true,
      overrides: [
        {
          files: ['__tests__/**/*.js'],
          env: {
            jest: true,
            node: true,
          },
          globals: {
            describe: 'readonly',
            it: 'readonly',
            test: 'readonly',
            expect: 'readonly',
            beforeAll: 'readonly',
            beforeEach: 'readonly',
            afterAll: 'readonly',
            afterEach: 'readonly',
          },
        },
      ],
    });
  });
});
