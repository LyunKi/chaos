import { UserConfig, defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react-swc';
import merge from 'lodash/merge';
import pkg from './package.json';

const externals = [...Object.keys(pkg.peerDependencies)];

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
];

export default function customConfig(viteConfig: DeepPartial<UserConfig>) {
  return defineConfig(
    merge(
      {
        build: {
          lib: {
            entry: './src/index.ts',
            name: 'CloudDesignComponentsRn',
            fileName: 'index',
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: externals,
          },
        },
        plugins: [react()],
        optimizeDeps: {
          esbuildOptions: {
            resolveExtensions: extensions,
            loader: {
              '.js': 'jsx',
            },
          },
        },
        resolve: {
          extensions,
        },
      } as UserConfig,
      viteConfig
    )
  );
}
