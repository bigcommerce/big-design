require('@bigcommerce/eslint-config/patch');

module.exports = {
  root: true,
  extends: ['@bigcommerce/eslint-config'],
  parserOptions: {
    project: [
      './packages/big-design/tsconfig.json',
      './packages/big-design-icons/tsconfig.json',
      './packages/big-design-theme/tsconfig.json',
      './packages/docs/tsconfig.json',
      './packages/examples/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'packages/*/tsconfig.json',
      },
    },
  },
};
