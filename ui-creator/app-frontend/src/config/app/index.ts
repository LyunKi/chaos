import { App } from '@cloud-creator/common';
import { HomeRoute } from '../views/Home';

export const AppConfig: App = {
  name: 'cloud-creator',
  navigation: {
    initialRouteName: 'Home',
    groups: [
      {
        items: [HomeRoute],
        name: 'Main',
      },
    ],
    type: 'Stack',
  },
};
