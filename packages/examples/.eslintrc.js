/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@bigcommerce/eslint-config'],
  ignorePatterns: ['node_modules/', 'dist/'],
};
