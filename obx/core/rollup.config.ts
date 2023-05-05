import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import jsx from 'acorn-jsx';

const commonConfigs = {
  acornInjectPlugins: [jsx()],
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
};

const options = [
  {
    ...commonConfigs,
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/index.umd.js',
        name: 'HObxCore',
        format: 'umd',
      },
    ],
  },
];

export default options;
