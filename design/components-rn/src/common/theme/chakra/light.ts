import merge from 'lodash/merge';
import variables from './variables';

const LIGHT_THEME = merge({}, variables, {
  color: {
    status: {
      info: '$color.blue.500',
      warning: '$color.orange.500',
      primary: '$color.brand.500',
      error: '$color.red.500',
      success: '$color.green.500',
    },
    border: {
      default: '$color.gray.200',
      input: '$color.gray.300',
    },
    placeholder: {
      default: '$color.gray.500',
    },
    bg: {
      disabled: '$color.gray.100',
      layout: '$color.white',
      mask: '$color.blackAlpha.600',
      normal: {
        pressed: '$color.gray.200',
        hovered: '$color.gray.100',
      },
    },
    font: {
      default: '$color.gray.800',
      reverse: '$color.whiteAlpha.900',
    },
    brand: {
      ...variables.color.teal,
    },
    button: {
      normal: {
        font: '$color.font.default',
        solid: {
          bg: '$color.gray.100',
          hoveredBg: '$color.gray.200',
          pressedBg: '$color.gray.300',
        },
        outline: {},
        ghost: {},
        link: {},
      },
      primary: {
        font: '$color.font.reverse',
      },
      secondary: {
        font: '$color.font.reverse',
      },
      info: {
        font: '$color.font.reverse',
      },
      success: {
        font: '$color.font.reverse',
      },
      warning: {
        font: '$color.font.reverse',
      },
      error: {
        font: '$color.font.reverse',
      },
    },
  },
});

export default LIGHT_THEME;
