const { ESLint } = require('eslint');

describe('Angular ESLint Configuration', () => {
  let eslintConfig;

  beforeAll(() => {
    /* Load the Angular ESLint config */
    eslintConfig = require('../../../angular/eslint.config.js');
  });

  test('configuration loads without error', () => {
    expect(eslintConfig).toBeDefined();
    expect(typeof eslintConfig).toBe('object');
  });

  test('has overrides for TypeScript files', () => {
    expect(eslintConfig.overrides).toBeDefined();
    expect(Array.isArray(eslintConfig.overrides)).toBe(true);

    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );
    expect(tsOverride).toBeDefined();
  });

  test('has Angular ESLint plugin configured', () => {
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    expect(tsOverride.extends).toContain('plugin:@angular-eslint/recommended');
    expect(tsOverride.extends).toContain(
      'plugin:@angular-eslint/template/process-inline-templates'
    );
  });

  test('uses TypeScript parser for TS files', () => {
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    /* Parser is inherited from TypeScript base config */
    expect(tsOverride.extends).toContain('../typescript/eslint.config');
  });

  test('has Angular-specific rules configured', () => {
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    /* Check for Angular-specific rules */
    expect(tsOverride.rules['@angular-eslint/directive-selector']).toBeDefined();
    expect(tsOverride.rules['@angular-eslint/component-selector']).toBeDefined();
  });

  test('has HTML template override', () => {
    const htmlOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.html'))
    );

    expect(htmlOverride).toBeDefined();
    expect(htmlOverride.extends).toContain('plugin:@angular-eslint/template/recommended');
  });

  test('includes RxJS plugin for observables', () => {
    /* RxJS plugin is configured at the root level */
    expect(eslintConfig.plugins).toContain('rxjs');

    /* And RxJS rules are configured in TypeScript override */
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    expect(tsOverride.rules['rxjs/no-unsafe-takeuntil']).toBeDefined();
  });

  test('extends TypeScript base config', () => {
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    /* Angular config extends the TypeScript config which has parser options */
    expect(tsOverride.extends).toContain('../typescript/eslint.config');
  });

  test('enforces component and directive naming', () => {
    const tsOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.ts'))
    );

    const componentRule = tsOverride.rules['@angular-eslint/component-selector'];
    expect(componentRule).toBeDefined();
    expect(componentRule[0]).toBe('error');
    expect(componentRule[1].type).toBe('element');
    expect(componentRule[1].style).toBe('kebab-case');

    const directiveRule = tsOverride.rules['@angular-eslint/directive-selector'];
    expect(directiveRule).toBeDefined();
    expect(directiveRule[0]).toBe('error');
    expect(directiveRule[1].type).toBe('attribute');
    expect(directiveRule[1].style).toBe('camelCase');
  });

  test('has accessibility rules for templates', () => {
    const htmlOverride = eslintConfig.overrides.find(
      (o) => o.files && o.files.some((f) => f.includes('*.html'))
    );

    expect(htmlOverride.extends).toContain('plugin:@angular-eslint/template/accessibility');
  });
});
