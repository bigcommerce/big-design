import { tmpdir } from 'os';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const nodeEnv = process.env.NODE_ENV || 'production';
const externals = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  external: makeExternalPredicate(externals),
  watch: {
    include: 'src/**',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    typescript({
      cacheRoot: tmpdir(),
      check: nodeEnv === 'production',
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve(),
    sourceMaps(),
    filesize(),
  ],
};

function makeExternalPredicate(externalsArr) {
  if (externalsArr.length === 0) {
    return () => false;
  }

  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);

  return id => externalPattern.test(id);
}
