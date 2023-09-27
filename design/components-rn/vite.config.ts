import customConfig from './vite.config.common.js';

export default customConfig({
  resolve: {
    alias: {
      'react-native-svg': 'react-native-svg-web',
      'react-native/Libraries/Image/AssetRegistry':
        'react-native-web/dist/modules/AssetRegistry',
      'react-native': 'react-native-web',
    },
  },
  define: {
    __DEV__: true,
  },
});
