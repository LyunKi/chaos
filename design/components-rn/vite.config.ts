import customConfig from './vite.config.common';

export default customConfig({
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    },
  },
});
