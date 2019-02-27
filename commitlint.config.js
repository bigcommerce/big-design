module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['all', 'root', 'configs', 'storybook', 'plab']]
  }
};
