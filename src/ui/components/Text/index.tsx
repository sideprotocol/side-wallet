import { CSSProperties, ReactNode, useState } from 'react';

import { colors, ColorTypes } from '@/ui/theme/colors';
import { typography } from '@/ui/theme/typography';

import { BaseView, BaseViewProps } from '../BaseView';

type Sizes = keyof typeof $sizeStyles;
type Presets = keyof typeof $presets;

export const $sizeStyles = {
  xxxl: { fontSize: 32, lineHeight: 'normal' } as CSSProperties,
  xxl: { fontSize: 24, lineHeight: 'normal' } as CSSProperties,
  xl: { fontSize: 20, lineHeight: 'normal' } as CSSProperties,
  lg: { fontSize: 18, lineHeight: 'normal' } as CSSProperties,
  md: { fontSize: 16, lineHeight: 'normal' } as CSSProperties,
  sm: { fontSize: 14, lineHeight: 'none' } as CSSProperties,
  xs: { fontSize: 12, lineHeight: 'normal' } as CSSProperties,
  xxs: { fontSize: 10, lineHeight: 'normal' } as CSSProperties,
  xxxs: { fontSize: 8, lineHeight: 'normal' } as CSSProperties
};

const $baseStyle: CSSProperties = Object.assign({}, $sizeStyles.sm, {
  fontFamily: typography.primary.regular,
  color: colors.white,
  textAlign: 'left',
  userSelect: 'none'
} as CSSProperties);

const $presets = {
  large: Object.assign({}, $baseStyle, $sizeStyles.xl),

  title: Object.assign({}, $baseStyle, $sizeStyles.lg),
  'title-bold': Object.assign({}, $baseStyle, $sizeStyles.lg, {
    fontFamily: typography.primary.bold
  }),

  regular: Object.assign({}, $baseStyle, $sizeStyles.sm),
  'regular-bold': Object.assign({}, $baseStyle, $sizeStyles.sm, {
    fontFamily: typography.primary.bold
  }),

  bold: Object.assign({}, $baseStyle, $sizeStyles.sm, {
    fontFamily: typography.primary.bold
  }),

  sub: Object.assign({}, $baseStyle, $sizeStyles.xs, {
    color: colors.white_muted
  }),

  disconnect: Object.assign({}, $baseStyle, $sizeStyles.sm, {
    color: colors.red_disconnect
  }),

  'sub-bold': Object.assign({}, $baseStyle, $sizeStyles.xs, {
    fontFamily: typography.primary.bold,
    color: colors.white_muted
  }),

  link: Object.assign({}, $baseStyle, $sizeStyles.xs, {
    color: colors.blue,
    textDecorationLine: 'underline'
  } as CSSProperties),
  default: $baseStyle
};
export interface TextProps extends BaseViewProps {
  text?: string | number | ReactNode;
  preset?: Presets;
  size?: Sizes;
  color?: ColorTypes;
  textCenter?: boolean;
  textEnd?: boolean;
  wrap?: boolean;
  selectText?: boolean;
  disableTranslate?: boolean;
  hoverStyle?: CSSProperties;
}

export const $textPresets = $presets;

export function Text(props: TextProps) {
  const {
    size,
    text,
    textCenter,
    textEnd,
    wrap,
    selectText,
    disableTranslate,
    style: $styleOverride,
    hoverStyle,
    children,
    classname,
    ...rest
  } = props;

  const [hover, setHover] = useState(false);

  const preset: Presets = props.preset || 'regular';
  const $textStyle = Object.assign(
    {},
    $presets[preset],
    size ? $sizeStyles[size] : {},
    textCenter ? { textAlign: 'center' } : {},
    textEnd ? { textAlign: 'end' } : {},
    wrap ? { overflowWrap: 'anywhere' } : {},
    selectText ? { userSelect: 'text' } : {}
  );

  const $style = Object.assign({}, $textStyle, $styleOverride, hover && hoverStyle ? hoverStyle : {});

  return (
    <BaseView style={$style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {disableTranslate ? (
        <span className={classname} translate="no">
          {text}
        </span>
      ) : (
        text
      )}
      {children}
    </BaseView>
  );
}
