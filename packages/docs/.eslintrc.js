/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@bigcommerce/configs/eslint/base.js')],
  ignorePatterns: ['.next', 'out', 'node_modules', 'next-env.d.ts'],
};
