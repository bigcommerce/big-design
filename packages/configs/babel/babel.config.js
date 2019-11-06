const env = process.env.NODE_ENV || 'production';
const isTestEnv = env === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: isTestEnv ? { node: 'current' } : { browsers: 'defaults' },
        modules: isTestEnv ? 'auto' : false
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    ['babel-plugin-styled-components', { pure: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};
