/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@bigcommerce/configs/eslint/base.js')],
  overrides: [
    {
      // Native ESM requires relative import specifiers to include the file extension.
      files: ['*.mjs'],
      rules: {
        'import/extensions': ['error', 'always', { ignorePackages: true }],
      },
    },
  ],
};
