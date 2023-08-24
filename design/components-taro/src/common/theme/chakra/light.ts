import merge from 'lodash/merge';
import variables from './variables';

function genButtonStyle(colorScheme: string) {
  return {
    outlineColor: `$color.${colorScheme}.500`,
    solid: {
      font: '$color.font.reverse',
      'font-active': '$color.font.reverse',
      bg: `$color.${colorScheme}.500`,
      'bg-hover': `$color.${colorScheme}.600`,
      'bg-active': `$color.${colorScheme}.700`,
    },
    outline: {
      font: `$color.${colorScheme}.500`,
      'font-active': `$color.${colorScheme}.500`,
      bg: 'transparent',
      'bgOpacity-hover': 0.12,
      'bgOpacity-active': 0.24,
      'bg-hover': `$color.${colorScheme}.50`,
      'bg-active': `$color.${colorScheme}.100`,
    },
    ghost: {
      font: `$color.${colorScheme}.500`,
      'font-active': `$color.${colorScheme}.500`,
      bg: 'transparent',
      'bgOpacity-hover': 0.12,
      'bgOpacity-active': 0.24,
      'bg-hover': `$color.${colorScheme}.50`,
      'bg-active': `$color.${colorScheme}.100`,
    },
    link: {
      'font-active': `$color.${colorScheme}.700`,
      font: `$color.${colorScheme}.500`,
    },
  };
}

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
        outlineColor: '$color.border.default',
        solid: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: '$color.gray.100',
          'bg-hover': '$color.gray.200',
          'bg-active': '$color.gray.300',
        },
        outline: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: 'transparent',
          'bg-hover': '$color.gray.100',
          'bg-active': '$color.gray.200',
        },
        ghost: {
          font: '$color.font.default',
          'font-active': '$color.font.default',
          bg: 'transparent',
          'bg-hover': '$color.gray.100',
          'bg-active': '$color.gray.200',
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

export default LIGHT_THEME;
