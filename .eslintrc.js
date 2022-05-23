require('@bigcommerce/eslint-config/patch');

module.exports = {
  root: true,
  extends: ['@bigcommerce/eslint-config'],
  parserOptions: {
    project: 'packages/*/tsconfig.json',
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
  overrides: [
    {
      files: '**/*.js',
      env: {
        node: true,
        es6: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: 'packages/big-design-icons/**/*.tsx',
      rules: {
        'react/jsx-sort-props': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
};
