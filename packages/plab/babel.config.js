const env = process.env.NODE_ENV || 'production';
const isTestEnv = env === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'not ie < 11', 'not Baidu > 0', 'not QQAndroid > 0', 'not Android < 62'],
        },
        modules: isTestEnv ? 'auto' : false,
      },
    ],
    '@babel/preset-react',
    isTestEnv && '@babel/preset-typescript',
  ].filter(Boolean),
  plugins: [
    ['babel-plugin-styled-components', { pure: true }],
    isTestEnv && ['@babel/plugin-proposal-class-properties', { loose: false }],
  ].filter(Boolean),
};
