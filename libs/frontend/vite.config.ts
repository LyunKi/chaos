import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

const globals = {
  'react-dom': 'ReactDom',
  react: 'React',
};

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        globals,
      },
    },
      },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: '/demo/index.html',
  },
});
