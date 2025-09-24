import { defineConfig } from 'vitest/config';

/* eslint-disable import/no-default-export -- Required by Vitest configuration */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__tests__/**/*.test.js', 'src/__tests__/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.config.*',
        '*.config.*',
        '**/*.d.ts',
        '.claude/',              // Operational hooks, not package source
        'src/index.js',          // Pure export bundling file
        'src/*/index.js',        // Language-specific export bundlers
        'src/javascript/eslint-plugin-txi/index.js', // Covered 100% individually, v8 instrumentation issue
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
