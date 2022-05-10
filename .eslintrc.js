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
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          './packages/big-design/tsconfig.json',
          './packages/big-design-icons/tsconfig.json',
          './packages/big-design-theme/tsconfig.json',
          './packages/docs/tsconfig.json',
          './packages/examples/tsconfig.json',
        ],
      },
    },
  },
};
