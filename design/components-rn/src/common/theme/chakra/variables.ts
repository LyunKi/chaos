const COLOR = {
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',

  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },

  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },

  red: {
    50: '#FFF5F5',
    100: '#FED7D7',
    200: '#FEB2B2',
    300: '#FC8181',
    400: '#F56565',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#822727',
    900: '#63171B',
  },

  orange: {
    50: '#FFFAF0',
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19',
  },

  yellow: {
    50: '#FFFFF0',
    100: '#FEFCBF',
    200: '#FAF089',
    300: '#F6E05E',
    400: '#ECC94B',
    500: '#D69E2E',
    600: '#B7791F',
    700: '#975A16',
    800: '#744210',
    900: '#5F370E',
  },

  green: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532',
  },

  teal: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },

  blue: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1A365D',
  },

  cyan: {
    50: '#EDFDFD',
    100: '#C4F1F9',
    200: '#9DECF9',
    300: '#76E4F7',
    400: '#0BC5EA',
    500: '#00B5D8',
    600: '#00A3C4',
    700: '#0987A0',
    800: '#086F83',
    900: '#065666',
  },

  purple: {
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659',
  },

  pink: {
    50: '#FFF5F7',
    100: '#FED7E2',
    200: '#FBB6CE',
    300: '#F687B3',
    400: '#ED64A6',
    500: '#D53F8C',
    600: '#B83280',
    700: '#97266D',
    800: '#702459',
    900: '#521B41',
  },
};

const FONT_SIZE = {
  xs: '$rem:0.75',
  sm: '$rem:0.875',
  md: '$rem:1',
  default: '$rem:1',
  lg: '$rem:1.125',
  xl: '$rem:1.25',
};

const FONT_WEIGHT = {
  light: 100,
  regular: 400,
  default: 400,
  semibold: 600,
  bold: 700,
};

const SPACE = {
  1: '$rem:0.25',
  2: '$rem:0.5',
  3: '$rem:0.75',
  4: '$rem:1',
  5: '$rem:1.25',
  6: '$rem:1.5',
  7: '$rem:1.75',
  8: '$rem:2',
  9: '$rem:2.25',
  10: '$rem:2.5',
  12: '$rem:3',
  14: '$rem:3.5',
  16: '$rem:4',
  20: '$rem:5',
  24: '$rem:6',
  28: '$rem:7',
  32: '$rem:8',
  36: '$rem:9',
  40: '$rem:10',
  44: '$rem:11',
  48: '$rem:12',
  52: '$rem:13',
  56: '$rem:14',
  60: '$rem:15',
  64: '$rem:16',
  72: '$rem:18',
  80: '$rem:20',
  96: '$rem:24',
};

const RADIUS = {
  xs: '$rem:0.125',
  sm: '$rem:0.25',
  md: '$rem:0.375',
  lg: '$rem:0.5',
  xl: '$rem:0.75',
  '2xl': '$rem:1',
  '3xl': '$rem:1.5',
  full: '9999px',
};

const _LARGE_SIZE = {
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  '8xl': '90rem',
};

const SIZE = {
  ...SPACE,
  ..._LARGE_SIZE,
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const OPACITY = {
  disabled: 0.4,
};

const VARIABLES = {
  fontSize: FONT_SIZE,
  color: COLOR,
  fontWeight: FONT_WEIGHT,
  space: SPACE,
  radius: RADIUS,
  size: SIZE,
  opacity: OPACITY,
  zIndex: Z_INDEX,
};

export default VARIABLES;