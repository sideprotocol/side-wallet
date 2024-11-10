// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  white: '#ffffff',
  white_4: 'rgb(255 255 255 / 50%)',
  white_muted: 'rgb(130 130 130 / 50%)',
  black: '#000000',
  black_muted: 'rgba(0, 0, 0, 0.5)',
  black_muted2: 'rgba(0, 0, 0, 0.1)',

  dark: '#1E283C',
  grey: '#495361',
  light: '#A2A4AA',

  black_dark: '#1E1E1F',

  green_dark2: '#2D7E24',
  green_dark: '#379a29',
  green: '#41B530',
  green_light: '#5ec04f',
  green_check: '#22AB38',

  yellow_dark: '#d5ac00',
  yellow: '#e3bb5f',
  yellow_light: '#fcd226',

  warning_yellow: '#F0B622',

  red_dark: '#c92b40',
  red: '#ED334B',
  red_light: '#f05266',
  red_disconnect: '#FF4545',

  blue: '#1872F6',
  blue_light: '#c6dcfd',

  orange_dark: '#d9691c',
  orange: '#FF7B21',
  orange_light: '#ff8f42',

  gold: '#eac249',

  // side theme color
  blue_dark: '#F7771A',
  blue_dark2: '#F7931A',

  grey_dark: '#404045',
  search_icon: '#828282'
};

export const colors = Object.assign({}, palette, {
  transparent: 'rgba(0, 0, 0, 0)',

  text: palette.white,

  textDim: palette.white_muted,

  error: '#e52937',

  danger: palette.red,

  card: 'rgb(217 217 217 / 10%)',
  warning: palette.orange,
  primary: '#F7771A',

  bg2: '#09090A',
  bg3: '#434242',
  bg4: '#F7771A33',

  green_light: '#0dd4c31a',
  border: 'rgba(255,255,255,0.1)',
  icon_yellow: '#FFBA33',
  brc20_deploy: '#233933',
  brc20_transfer: '#375e4d',
  brc20_transfer_selected: '#41B530',
  brc20_other: '#3e3e3e',

  search_icon: '#828282',

  search_box_bg: '#1E1E1F',

  grey: '#7D7D7D',

  orange: '#FCCD94',

  light_gray: '#F5F5F5',

  // side theme color
  background: '#09090A',
  swapBg: '#1D1D1F',

  // choose color
  backgroundChoose: '#F7771A33',
  // copyColor: 'rgba(13, 212, 195, 0.10)'
  // border: '#1E1E1F',
});

export type ColorTypes = keyof typeof colors;
