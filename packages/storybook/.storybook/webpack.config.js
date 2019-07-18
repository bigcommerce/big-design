module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
      },
      require.resolve('jsx-to-string-loader'),
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx', '.json');

  return config;
};
