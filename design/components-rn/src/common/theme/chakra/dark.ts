import merge from 'lodash-es/merge';
import variables from './variables';

function genButtonStyle(colorScheme: string) {
  return {
    outlineColor: `$color.${colorScheme}.200`,
    solid: {
      font: '$color.font.reverse',
      'font-active': '$color.font.reverse',
      bg: `$color.${colorScheme}.200`,
      'bg-hover': `$color.${colorScheme}.300`,
      'bg-active': `$color.${colorScheme}.400`,
    },
    outline: {
      font: `$color.${colorScheme}.200`,
      'font-active': `$color.${colorScheme}.200`,
      bg: 'transparent',
      'bgOpacity-hover': 0.12,
      'bgOpacity-active': 0.24,
      'bg-hover': `$color.${colorScheme}.50`,
      'bg-active': `$color.${colorScheme}.100`,
    },
    ghost: {
      font: `$color.${colorScheme}.200`,
      'font-active': `$color.${colorScheme}.200`,
      bg: 'transparent',
      'bgOpacity-hover': 0.12,
      'bgOpacity-active': 0.24,
      'bg-hover': `$color.${colorScheme}.50`,
      'bg-active': `$color.${colorScheme}.100`,
    },
    link: {
      'font-active': `$color.${colorScheme}.400`,
      font: `$color.${colorScheme}.200`,
    },
  };
}

const DARK_THEME = merge({}, variables, {
  color: {
    status: {
      info: '$color.blue.200',
      warning: '$color.orange.200',
      primary: '$color.brand.200',
      error: '$color.red.200',
      success: '$color.green.200',
    },
    border: {
      default: '$color.whiteAlpha.300',
      input: '$color.whiteAlpha.400',
    },
    placeholder: {
      default: '$color.whiteAlpha.400',
    },
    bg: {
      disabled: '$color.whiteAlpha.200',
      layout: '$color.gray.800',
      mask: '$color.blackAlpha.600',
    },
    font: {
      default: '$color.gray.100',
      reverse: '$color.gray.800',
    },
    brand: {
      ...variables.color.teal,
      default: variables.color.teal[200],
    },
    button: {
      normal: {
        outlineColor: '$color.border.default',
        solid: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: '$color.whiteAlpha.200',
          'bg-hover': '$color.whiteAlpha.300',
          'bg-active': '$color.whiteAlpha.400',
        },
        outline: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: 'transparent',
          'bg-hover': '$color.whiteAlpha.200',
          'bg-active': '$color.whiteAlpha.300',
        },
        ghost: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: 'transparent',
          'bg-hover': '$color.whiteAlpha.200',
          'bg-active': '$color.whiteAlpha.300',
        },
        link: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
        },
      },
      primary: genButtonStyle('brand'),
      info: genButtonStyle('blue'),
      success: genButtonStyle('green'),
      warning: genButtonStyle('orange'),
      error: genButtonStyle('red'),
    },
  },
});

export default DARK_THEME;
