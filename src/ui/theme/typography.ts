const fonts = {
  // ProtoMono: {
  //   bold: 'ProtoMono-Bold',
  //   regular: 'ProtoMono-Regular',
  //   light: 'ProtoMono-Light'
  // },
  // Inter: {
  //   bold: 'Inter-Bold',
  //   regular: 'Inter-Regular',
  //   light: 'Inter-Light'
  // }
  ProtoMono: {
    bold: 'Saira-Italic',
    regular: 'Saira-Italic',
    light: 'Saira-Variable'
  },
  Inter: {
    bold: 'Saira',
    regular: 'Saira',
    light: 'Saira'
  }
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.Inter
};
