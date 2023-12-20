const withTM = require('next-transpile-modules')([
  '@bigcommerce/big-design',
  '@bigcommerce/big-design-theme',
]);

const bdPkg = require('../big-design/package.json');

const pkg = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const URL_PREFIX = '/big-design';
const examplesVersion = pkg.devDependencies['@bigcommerce/examples'].replace('^', '');

module.exports = withTM({
  basePath: isProduction ? URL_PREFIX : '',
  env: {
    CODE_SANDBOX_URL: `https://codesandbox.io/s/github/bigcommerce/big-design/tree/%40bigcommerce/examples%40${examplesVersion}/packages/examples`,
    URL_PREFIX: isProduction ? URL_PREFIX : '',
    BD_VERSION: bdPkg.version,
  },
  webpack: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(ts|tsx)$/,
            use: [require.resolve('jsx-to-string-loader')],
          },
        ],
        noParse: /@babel\/standalone/,
      },
    };
  },
  exportPathMap: (defaultPathMap) => {
    if (isDev) {
      return defaultPathMap;
    }

    // Ensures the dev page doesn't get built to production
    const { '/dev': dev, ...rest } = defaultPathMap;

    return rest;
  },
});
