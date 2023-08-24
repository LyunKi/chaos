// import { setProjectAnnotations } from '@storybook/react';
// import * as projectAnnotations from '../../.storybook/preview';

// setProjectAnnotations(projectAnnotations);
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
