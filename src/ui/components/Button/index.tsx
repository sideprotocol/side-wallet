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
  loading?: boolean;
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
  fontWeight: 600,
  paddingLeft: spacing.small,
  paddingRight: spacing.small,
  fontSize: '14px',
  position: 'relative'
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

  reset: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.green_light,
    border: '1px solid #22AB38',
    maxWidth: 'max-content',
    padding: '0px 12px',
    margin: 'auto'
  } as CSSProperties),

  bar: Object.assign({}, $baseViewStyle, {
    backgroundColor: colors.black_dark,
    justifyContent: 'space-between',
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium
  } as CSSProperties),

  ghost: Object.assign({}, $baseViewStyle, {
    border: `1px solid ${colors.blue_dark}`,
    justifyContent: 'center',
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium
  } as CSSProperties),

  ghostDanger: Object.assign({}, $baseViewStyle, {
    border: '1px solid rgb(255 255 255 / 40%)',
    justifyContent: 'center',
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium
  } as CSSProperties)
};

// button hover theme
const $hoverViewPresets: Record<Presets, CSSProperties> = {
  default: {
    backgroundColor: colors.grey_dark,
    boxShadow: ''
    // boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
  },
  primary: {
    // 移除 &::before 相关代码，改用 className
  },
  approval: {
    backgroundColor: colors.orange_dark
  },
  danger: {
    backgroundColor: colors.red_dark
  },
  bar: {
    backgroundColor: '#383535'
  },
  ghost: {},
  ghostDanger: {},
  reset: {}
};

const $baseTextStyle: CSSProperties = {
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  // zIndex: 2,
  color: colors.white,
  paddingLeft: spacing.tiny,
  paddingRight: spacing.tiny
};

const $textPresets: Record<Presets, CSSProperties> = {
  default: Object.assign({}, $baseTextStyle, { color: colors.white }),
  primary: Object.assign({}, $baseTextStyle, { color: colors.black }),
  approval: Object.assign({}, $baseTextStyle, { color: colors.white }),
  danger: Object.assign({}, $baseTextStyle, { color: colors.white }),
  bar: Object.assign({}, $baseTextStyle, { textAlign: 'left', fontWeight: 'bold' } as CSSProperties),

  reset: Object.assign({}, $baseTextStyle, { fontWeight: 400 } as CSSProperties),
  ghost: Object.assign({}, $baseTextStyle, { fontWeight: 400, color: colors.blue_dark } as CSSProperties),
  ghostDanger: Object.assign({}, $baseTextStyle, { fontWeight: 400, color: colors.red } as CSSProperties)
};

const $rightAccessoryStyle: CSSProperties = { marginLeft: spacing.extraSmall, zIndex: 1 };
const $leftAccessoryStyle: CSSProperties = { marginRight: spacing.extraSmall, zIndex: 1 };
const $baseDisabledViewStyle: CSSProperties = {
  cursor: 'not-allowed',
  opacity: 0.5,
  backgroundColor: colors.grey_dark
};

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
    loading,
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
  const $textStyle = Object.assign(
    {},
    $textPresets[preset],
    $textStyleOverride,
    disabled ? { color: colors.text } : {}
  );

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
        <Row
          style={{
            gap: spacing.tiny
          }}>
          {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
          {icon}
          <Column justifyCenter gap="zero">
            {(text || typeof children === 'string') && <Text text={text || children} style={$textStyle} />}
            {subText && <Text text={subText} style={$subTextStyle} />}
          </Column>
          {typeof children === 'string' ? null : children}
        </Row>

        {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
      </div>
    );
  }

  return (
    <div
      style={$viewStyle}
      className={`${
        preset === 'ghostDanger'
          ? 'hover:bg-[#ed334b]/10 !border-[#ed334b]'
          : preset === 'ghost'
          ? 'hover:bg-[#F7931A] group'
          : ''
      } ${
        preset === 'primary' && !disabled
          ? 'before:content-[""] before:absolute before:left-[-100%] before:w-[20%] before:h-full before:bg-white/30 before:blur-[10px] before:transition-all before:duration-[2s] hover:before:left-[100%] hover:before:opacity-100 before:opacity-0'
          : ''
      }`}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {LeftAccessory && <div style={$leftAccessoryStyle}>{LeftAccessory}</div>}
      <Icon icon={icon} color={icon === 'expand' ? 'black' : icon === 'plus' ? 'primary' : 'white'} />
      {loading ? (
        <svg
          className="animate-[spin_3s_linear_infinite] inline-block "
          width="21"
          height="21"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5 2V3.66667M8.5 12.5V15.1667M4.33333 8.5H2M14.6667 8.5H13.6667M12.8047 12.8047L12.3333 12.3333M12.9428 4.11052L12 5.05333M3.78105 13.219L5.66667 11.3333M3.91912 3.97245L5.33333 5.38667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <>
          {(text || typeof children === 'string') && (
            <Text
              style={$textStyle}
              text={text || children}
              preset="regular-bold"
              classname={preset === 'ghost' ? 'group-hover:!text-[#000]' : ''}
            />
          )}
        </>
      )}
      {typeof children === 'string' ? null : children}
      {RightAccessory && <div style={$rightAccessoryStyle}>{RightAccessory}</div>}
    </div>
  );
}
