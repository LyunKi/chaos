import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'Demo',
      fileName: 'demo',
    },
  },
  plugins: [react()],
});
