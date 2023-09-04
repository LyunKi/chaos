import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pkg from './package.json';

const externals = [...Object.keys(pkg.peerDependencies)];
const globals = {
  globals: {
    'react-dom': 'ReactDom',
    react: 'React',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'CdReactUtils',
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
