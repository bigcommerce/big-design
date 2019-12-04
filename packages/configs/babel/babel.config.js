const BABEL_ENV = process.env.BABEL_ENV;

const defaultPlugins = [
  ['babel-plugin-styled-components', { pure: true }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-optional-chaining',
  // IE 11 support
  '@babel/plugin-transform-object-assign'
];

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: ['cjs', 'test'].includes(BABEL_ENV) ? 'commonjs' : false,
        targets:
          BABEL_ENV === 'test' ? { node: 'current' } : { browsers: 'defaults' }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  env: {
    cjs: {
      plugins: defaultPlugins,
      ignore: ['**/spec.ts', '**/spec.tsx', '**/*.spec.ts', '**/*.spec.tsx']
    },
    es: {
      plugins: [
        ...defaultPlugins,
        ['@babel/plugin-transform-runtime', { useESModules: true }]
      ],
      ignore: ['**/spec.ts', '**/spec.tsx', '**/*.spec.ts', '**/*.spec.tsx']
    },
    test: {
      plugins: defaultPlugins,
      ignore: []
    }
  }
};
