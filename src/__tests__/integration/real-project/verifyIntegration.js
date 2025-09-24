/* eslint-disable no-console */
/* Simple verification that the style guide module can be loaded and used */

const { RuleTester } = require('eslint');

const { eslint, prettier, customRules } = require('../../../typescript');

console.log('✅ TypeScript module loaded successfully');

/* Verify ESLint config */
console.log('\n📋 ESLint Configuration:');
console.log(`  - Parser: ${eslint.parser}`);
console.log(`  - Extends: ${eslint.extends.length} configurations`);
console.log(`  - Rules: ${Object.keys(eslint.rules).length} rules configured`);

/* Verify Prettier config */
console.log('\n🎨 Prettier Configuration:');
console.log(`  - Semi: ${prettier.semi}`);
console.log(`  - Single Quote: ${prettier.singleQuote}`);
console.log(`  - Tab Width: ${prettier.tabWidth}`);

/* Verify custom rules */
console.log('\n🔧 Custom ESLint Rules:');
Object.keys(customRules.rules).forEach((rule) => {
  console.log(`  - ${rule}: ${customRules.rules[rule].meta.docs.description}`);
});

/* Test that rules can be created */
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

/* Quick test of a custom rule */
const noDynamicTestDataRule = customRules.rules['no-dynamic-test-data'];
console.log('\n🧪 Testing no-dynamic-test-data rule...');
try {
  ruleTester.run('no-dynamic-test-data', noDynamicTestDataRule, {
    valid: [
      {
        code: `const x = 5;`,
      },
    ],
    invalid: [],
  });
  console.log('  ✅ Rule works correctly');
} catch (e) {
  console.log('  ❌ Rule test failed:', e.message);
}

console.log('\n✨ Integration verification complete!');
