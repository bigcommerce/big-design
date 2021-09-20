const BABEL_ENV = process.env.BABEL_ENV;

const defaultPlugins = [['babel-plugin-styled-components', { pure: true }]];

const browsers = [
  'last 2 Chrome major versions',
  'last 2 Firefox major versions',
  'last 2 Safari major versions',
  'last 2 Edge major versions',
  'last 2 Android major versions',
  'last 2 ChromeAndroid major versions',
  'last 2 iOS major versions',
];

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: ['cjs', 'test'].includes(BABEL_ENV) ? 'commonjs' : false,
          targets: BABEL_ENV === 'test' ? { node: 'current' } : { browsers },
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    env: {
      cjs: {
        plugins: [...defaultPlugins, ['@babel/plugin-transform-runtime', { useESModules: false }]],
        ignore: [/node_modules/, '**/spec.ts', '**/spec.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      },
      es: {
        plugins: [...defaultPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
        ignore: [/node_modules/, '**/spec.ts', '**/spec.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      },
      test: {
        plugins: defaultPlugins,
        ignore: [/node_modules/],
      },
    },
  };
};
