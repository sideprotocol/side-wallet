// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  white: '#ffffff',
  white_muted: 'rgb(130 130 130 / 50%)',
  black: '#000000',
  black_muted: 'rgba(0, 0, 0, 0.5)',
  black_muted2: 'rgba(0, 0, 0, 0.)',

  dark: '#1E283C',
  grey: '#495361',
  light: '#A2A4AA',

  black_dark: '#1E1E1F',

  green_dark2: '#2D7E24',
  green_dark: '#379a29',
  green: '#41B530',
  green_light: '#5ec04f',

  yellow_dark: '#d5ac00',
  yellow: '#e3bb5f',
  yellow_light: '#fcd226',

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
  blue_dark: '#0DD4C3',
  blue_dark2: '#01BEAE',

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
  primary: '#0DD4C3',

  bg2: '#2a2a2a',
  bg3: '#434242',
  bg4: '#383535',

  green_light: 'rgba(34,171,56,0.1)',
  border: 'rgba(255,255,255,0.1)',
  icon_yellow: '#FFBA33',
  brc20_deploy: '#233933',
  brc20_transfer: '#375e4d',
  brc20_transfer_selected: '#41B530',
  brc20_other: '#3e3e3e',

  search_icon: '#828282',

  search_box_bg: '#1E1E1F',

  orange: '#FCCD94',

  light_gray: '#F5F5F5',

  // side theme color
  background: '#09090A'
});

export type ColorTypes = keyof typeof colors;
