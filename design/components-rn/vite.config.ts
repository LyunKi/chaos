import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
    },
  },
  resolve: {
    extensions,
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
