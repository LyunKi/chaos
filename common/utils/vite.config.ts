import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pkg from './package.json';

const externals = [...Object.keys((pkg as any).peerDependencies ?? {})];
const globals = {
  globals: {},
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'ReactUtils',
      fileName: 'index',
    },
    rollupOptions: {
      external: externals,
      output: {
        ...globals,
      },
    },
  },
  plugins: [react()],
});
