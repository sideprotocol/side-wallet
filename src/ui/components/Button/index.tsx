import React, { CSSProperties, useState } from 'react';

import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';

import { Column } from '../Column';
import { Icon, IconTypes } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

type Presets = keyof typeof $viewPresets;
export interface ButtonProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  subText?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: CSSProperties;
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: CSSProperties;
  /**
   * An optional style override for the button text.
   */
  textStyle?: CSSProperties;
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: CSSProperties;
  /**
   * One of the different types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: React.ReactNode;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: React.ReactNode;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon?: IconTypes;
  disabled?: boolean;
  full?: boolean;
}

// button common theme
const $baseViewStyle: CSSProperties = {
  display: 'flex',
  height: '48px',
  borderRadius: 14,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  overflow: 'hidden',
  cursor: 'pointer',
  alignSelf: 'stretch',
  paddingLeft: spacing.small,
  paddingRight: spacing.small
};

// button view theme
const $viewPresets = {
  default: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.grey_dark
  }) as CSSProperties,

  primary: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.blue_dark
  } as CSSProperties),

  danger: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.red
  } as CSSProperties),

  approval: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.orange
  } as CSSProperties),

  bar: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.black_dark,
    justifyContent: 'space-between',
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium
  } as CSSProperties)
};

// button hover theme
const $hoverViewPresets: Record<Presets, CSSProperties> = {
  default: {
    backgroundColor: colors.grey_dark,
    boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
  },
  primary: {
    backgroundColor: colors.blue_dark2,
    boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
  },
  approval: {
    backgroundColor: colors.orange_dark
  },
  danger: {
    backgroundColor: colors.red_dark
  },
  bar: {
    backgroundColor: '#383535'
  }
};

const $baseTextStyle: CSSProperties = {
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
  color: colors.white,
  paddingLeft: spacing.tiny,
  paddingRight: spacing.tiny
};

const $textPresets: Record<Presets, CSSProperties> = {
  default: $baseTextStyle,
  primary: Object.assign({}, $baseTextStyle, { color: colors.black }),
  approval: Object.assign({}, $baseTextStyle, { color: colors.black }),
  danger: Object.assign({}, $baseTextStyle, { color: colors.white }),
  bar: Object.assign({}, $baseTextStyle, { textAlign: 'left', fontWeight: 'bold' } as CSSProperties)
};

const $rightAccessoryStyle: CSSProperties = { marginLeft: spacing.extraSmall, zIndex: 1 };
const $leftAccessoryStyle: CSSProperties = { marginRight: spacing.extraSmall, zIndex: 1 };
const $baseDisabledViewStyle: CSSProperties = { cursor: 'not-allowed', opacity: 0.5 };
export function Button(props: ButtonProps) {
  const {
    text,
    subText,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    onClick,
    icon,
    disabled,
    full,
    ...rest
  } = props;

  const preset: Presets = props.preset || 'default';
  const [hover, setHover] = useState(false);
  const $viewStyle = Object.assign(
    {},
    $viewPresets[preset],
    $viewStyleOverride,
    hover && !disabled ? $hoverViewPresets[preset] : {},
    disabled ? $baseDisabledViewStyle : {},
    full ? { flex: 1 } : {}
  );
  const $textStyle = Object.assign({}, $textPresets[preset], $textStyleOverride);

  const $subTextStyle = Object.assign({}, $textPresets[preset], {
    color: colors.white_muted,
    marginTop: 5,
    fontWeight: 'normal'
  } as CSSProperties);
  if (preset === 'bar') {
    return (
      <div
        style={$viewStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={disabled ? undefined : onClick}>
        <Row>
          {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
          {icon && <Icon icon={icon} color={'white'} style={{ marginRight: spacing.tiny }} />}
          <Column justifyCenter gap="zero">
            {text && <Text text={text} style={$textStyle} />}
            {subText && <Text text={subText} style={$subTextStyle} />}
          </Column>

          {children}
        </Row>

        {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
      </div>
    );
  }

  return (
    <div
      style={$viewStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
      {icon && <Icon icon={icon} style={{ marginRight: spacing.tiny, backgroundColor: $textStyle.color }} />}
      {text && <Text style={$textStyle} text={text} preset="regular-bold" />}
      {children}
      {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
    </div>
  );
}
