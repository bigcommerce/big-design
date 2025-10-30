/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@bigcommerce/configs/eslint/base.js')],
  rules: {
    // Disable testing-library rules that conflict with styled-components testing
    // The big-design library extensively tests styled-components which requires
    // direct DOM access to verify styles, making these rules impractical to follow
    'testing-library/no-node-access': 'off',
    'testing-library/no-container': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/no-unnecessary-act': 'off',
    'testing-library/no-await-sync-events': 'off',
    'testing-library/no-manual-cleanup': 'off',
    'testing-library/render-result-naming-convention': 'off',
    // Disable specific rules that are too strict for this codebase
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'jest-dom/prefer-to-have-attribute': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.tsx', '**/*.spec.ts', '**/*.test.tsx', '**/*.test.ts'],
      rules: {
        // Allow unused variables in test files (often kept for debugging)
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
