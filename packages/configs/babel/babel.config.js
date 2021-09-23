const BABEL_ENV = process.env.BABEL_ENV;

const defaultPlugins = [['babel-plugin-styled-components', { pure: true }]];

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: ['cjs', 'test'].includes(BABEL_ENV) ? 'commonjs' : false,
          targets: BABEL_ENV === 'test' ? { node: 'current' } : { browsers: 'defaults' },
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
