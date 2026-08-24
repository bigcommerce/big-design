const shared = require('@bigcommerce/configs/babel');

// @babel/preset-env's `modules: 'commonjs'` unconditionally injects `"use strict"` ahead of any
// existing directive, which would push a source-level `'use client'` out of first position in the
// CJS build. Route the entry point's module transform through an explicit
// `plugin-transform-modules-commonjs` with `strictMode: false` instead, so `'use client'` stays first.
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
  const config = shared(api);

  if (process.env.BABEL_ENV === 'cjs') {
    config.overrides = [
      ...(config.overrides ?? []),
      {
        test: /src\/index\.ts$/,
        presets: [['@babel/preset-env', { modules: false, targets: { browsers } }]],
        plugins: [['@babel/plugin-transform-modules-commonjs', { strictMode: false }]],
      },
    ];
  }

  return config;
};
