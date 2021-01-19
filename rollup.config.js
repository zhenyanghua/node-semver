import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

function onwarn (warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }
  warn(warning);
}

const iife = {
  input: 'index.js',
  output: {
    name: 'SemVer',
    file: pkg.browser,
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
    terser()
  ],
  onwarn
};

const esm = {
  input: 'index.js',
  external: ['SemVer'],
  output: {
    file: pkg.module,
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
  ],
  onwarn
};

export default [iife, esm];
