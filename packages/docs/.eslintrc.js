/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@bigcommerce/configs/eslint/base.js')],
  ignorePatterns: ['.next', 'out', 'node_modules'],
  overrides: [
    {
      files: ['design-docs/**/*.mdx'],
      extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        // These ignored files are resolved when they are consumed by the BigCommerce developer-center repo.
        'import/no-unresolved': ['error', { ignore: ['^@components/.+'] }],
      },
    },
  ],
};
