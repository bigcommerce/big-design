const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve('@bigcommerce/eslint-config')],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Babel's TS preset doesn't reliably elide cross-module type-only imports in this
        // codebase's config, so an unmarked type import compiles into a runtime import
        // specifier for a binding that doesn't exist, crashing under strict-ESM bundlers
        // (Vite/Rollup/Rolldown, webpack with strictExportPresence). See LTRAC-1370.
        // Scoped to ts/tsx only: the rule needs type info, which isn't set up for the
        // plain .js config files (e.g. .eslintrc.js) this config also lints.
        // fixStyle MUST be 'separate-type-imports', not 'inline-type-imports': when every
        // binding from a specifier is type-only, Babel only removes the whole import
        // statement's runtime footprint for the *whole-statement* `import type {...}` form.
        // The inline `import { type X }` form still leaves a bare `require(...)` for the
        // module (Babel can't prove it's side-effect-free), which reintroduces exactly the
        // kind of stray runtime import this rule exists to eliminate, and can create real
        // circular-require chains that a type-only import never should.
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
        ],
      },
    },
  ],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/unified-signatures': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'func-names': 'off',
    'import/no-dynamic-require': 'off',
    // styled-components 6 also exports `styled` by name, so the conventional
    // `import styled from 'styled-components'` now trips this rule repo-wide.
    'import/no-named-as-default': 'off',
    'import/no-named-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/dynamic-import-chunkname': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/no-conditional-in-test': 'off',
    'jest/no-restricted-matchers': 'off',
    'jest/no-identical-title': 'off',
    'jsdoc/require-param-type': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/aria-role': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'array-callback-return': 'off',
    complexity: 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-restricted-globals': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    radix: 'off',
  },
};
