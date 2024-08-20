/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 180],
    'scope-enum': [
      2,
      'always',
      [
        'all',
        'ci',
        'component',
        'configs',
        'deps',
        'deps-dev',
        'docs',
        'examples',
        'icons',
        'pack',
        'patterns',
        'release',
        'theme',
      ],
    ],
  },
};
