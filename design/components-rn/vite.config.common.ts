import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { merge } from 'lodash-es';

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
          },
        },
        plugins: [react()],
        optimizeDeps: {
          esbuildOptions: {
            resolveExtensions: extensions,
          },
        },
        resolve: {
          extensions,
        },
      },
      viteConfig
    )
  );
}
