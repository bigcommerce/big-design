module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['all', 'ci', 'component', 'configs', 'example', 'icons', 'release', 'theme', 'docs']
    ]
  }
};
