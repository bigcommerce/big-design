const { tmpdir } = require('os');
const { DEFAULT_EXTENSIONS } = require('@babel/core');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const sourceMaps = require('rollup-plugin-sourcemaps');
const typescript = require('rollup-plugin-typescript2');

const nodeEnv = process.env.NODE_ENV || 'production';
const isDev = nodeEnv === 'dev';

function generateConfig(pkg) {
  const externals = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ];

  return {
    input: 'src/index.ts',
    output: [
      !isDev && { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ].filter(Boolean),
    external: makeExternalPredicate(externals),
    watch: {
      include: 'src/**'
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      }),
      resolve(),
      commonjs(),
      typescript({
        cacheRoot: tmpdir(),
        check: nodeEnv === 'production',
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true
      }),
      babel({
        extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
        exclude: 'node_modules/**'
      }),
      sourceMaps(),
      filesize()
    ]
  };
}

function makeExternalPredicate(externalsArr) {
  if (externalsArr.length === 0) {
    return () => false;
  }

  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);

  return id => externalPattern.test(id);
}

module.exports = {
  generateConfig
};
