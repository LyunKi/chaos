import customConfig from './vite.config.common.js';

export default customConfig({
  optimizeDeps: {
    include: ['@expo/vector-icons'],
  },
});
