module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'not ie < 11', 'not Baidu > 0', 'not QQAndroid > 0', 'not Android < 62'],
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-styled-components', { pure: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
