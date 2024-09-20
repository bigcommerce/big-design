const bdPkg = require('../big-design/package.json');
const examplesPkg = require('../examples/package.json');

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;
const URL_PREFIX = '/big-design';
const EXAMPLES_VERSION = examplesPkg.version;

/** @type {import('next').NextConfig} */
module.exports = {
  basePath: isProduction ? URL_PREFIX : '',
  output: 'export',
  env: {
    CODE_SANDBOX_URL: `https://codesandbox.io/p/devbox/github/bigcommerce/big-design/tree/%40bigcommerce/examples%40${EXAMPLES_VERSION}/packages/examples`,
    URL_PREFIX: isProduction ? URL_PREFIX : '',
    BD_VERSION: bdPkg.version,
  },
  transpilePackages: [
    '@bigcommerce/big-design',
    '@bigcommerce/big-design-theme',
    '@bigcommerce/big-design-icons',
  ],
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
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
};
