const babel = require('rollup-plugin-babel');
const filesize = require('rollup-plugin-filesize');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');

const extensions = ['.ts', '.tsx', '.js', '.jsx'];
const nodeEnv = process.env.NODE_ENV || 'production';

function generateConfig(pkg) {
  const externals = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ];

  return {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    external: makeExternalPredicate(externals),
    watch: {
      include: 'src/**'
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(nodeEnv)
      }),
      resolve({
        extensions,
        preferBuiltins: false
      }),
      babel({
        extensions,
        exclude: 'node_modules/**'
      }),
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
