import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import jsx from 'acorn-jsx';
import pkg from './package.json' assert { type: 'json' };

const externals = [...Object.keys(pkg.peerDependencies)];
const globals = {
  globals: {
    'react-dom': 'ReactDom',
    react: 'React',
  },
};

const commonConfigs = {
  external: (id) => {
    return externals.some((peer) => id === peer);
  },
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
        ...globals,
        file: 'dist/index.mjs',
        format: 'esm',
      },
      {
        ...globals,
        file: 'dist/index.umd.js',
        name: 'CdComponents',
        format: 'umd',
      },
    ],
  },
];

export default options;
