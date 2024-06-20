import React, { CSSProperties } from 'react';

import { ColorTypes, colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';

export const svgRegistry = {
  history: './images/icons/clock-solid.svg',
  send: './images/icons/arrow-left-right.svg',
  receive: './images/icons/qrcode.svg',
  general: './images/icons/settings/general.svg',
  advance: './images/icons/settings/advance.svg',
  about: './images/icons/settings/about.svg',
  expand: './images/icons/settings/expand-view.svg',
  security: './images/icons/settings/security.svg',
  lock: './images/icons/settings/lock.svg',
  telegram: './images/icons/telegram.svg',

  right: './images/icons/arrow-right.svg',
  left: './images/icons/arrow-left.svg',
  down: './images/icons/down.svg',
  up: './images/icons/up.svg',
  link: './images/icons/arrow-up-right.svg',

  discord: './images/icons/discord.svg',
  twitter: './images/icons/twitter.svg',
  github: './images/icons/github.svg',

  btc: './images/icons/btc.svg',
  qrcode: './images/icons/qrcode.svg',

  user: '/images/icons/user-solid.svg',
  wallet: '/images/icons/wallet-solid.svg',
  compass: './images/icons/compass-solid.svg',
  settings: './images/icons/gear-solid.svg',
  grid: './images/icons/grid-solid.svg',

  delete: '/images/icons/delete.svg',
  success: '/images/icons/success.svg',
  check: '/images/icons/check.svg',
  eye: '/images/icons/eye.svg',
  'eye-slash': '/images/icons/eye-slash.svg',
  copy: './images/icons/copy-solid.svg',
  copy2: './images/icons/settings/copy2.svg',

  close: './images/icons/xmark.svg',

  'circle-check': '/images/icons/circle-check.svg',
  pencil: '/images/icons/pencil.svg',
  'circle-info': '/images/icons/circle-info.svg',
  bitcoin: './images/icons/bitcoin.svg',
  'circle-question': '/images/icons/circle-question.svg',
  split: '/images/icons/scissors.svg',
  ordinals: '/images/icons/ordinals.svg',
  atomicals: '/images/icons/atomicals.svg',
  info: '/images/icons/info.svg',
  warning: '/images/icons/warning.svg',
  alert: '/images/icons/alert.svg',
  burn: ' /images/icons/burn.svg',
  risk: '/images/icons/risk.svg',
  'alert-circle': '/images/icons/alert-circle.svg',
  'check-box': '/images/icons/check-box.svg',
  'auto-lock': '/images/icons/settings/auto-lock.svg'
};

const iconImgList: Array<IconTypes> = ['success', 'delete', 'btc'];

export type IconTypes = keyof typeof svgRegistry;
interface IconProps {
  /**
   * The name of the icon
   */
  icon?: IconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: ColorTypes;

  /**
   * An optional size for the icon..
   */
  size?: number | string;

  /**
   * Style overrides for the icon image
   */
  style?: CSSProperties;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: CSSProperties;

  /**
   * An optional function to be called when the icon is clicked
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    onClick,
    children
  } = props;
  if (!icon) {
    return (
      <div
        onClick={onClick}
        style={Object.assign(
          {},
          {
            color: color ? colors[color] : '#FFF',
            fontSizes: size || fontSizes.icon,
            display: 'flex'
          } as CSSProperties,
          $containerStyleOverride,
          $imageStyleOverride || {},
          onClick ? { cursor: 'pointer' } : {}
        )}>
        {children}
      </div>
    );
  }
  const iconPath = svgRegistry[icon as IconTypes];
  if (iconImgList.includes(icon)) {
    return (
      <img
        src={iconPath}
        alt=""
        style={Object.assign({}, $containerStyleOverride, {
          width: size || fontSizes.icon,
          height: size || fontSizes.icon
        })}
      />
    );
  }
  if (iconPath) {
    return (
      <div style={$containerStyleOverride}>
        <div
          onClick={onClick}
          style={Object.assign(
            {},
            {
              color: color ? colors[color] : '#FFF',
              width: size || fontSizes.icon,
              height: size || fontSizes.icon,
              backgroundColor: color ? colors[color] : '#FFF',
              maskImage: `url(${iconPath})`,
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconPath})`,
              WebkitMaskSize: 'cover',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center'
            },
            $imageStyleOverride || {},
            onClick ? { cursor: 'pointer' } : {}
          )}
        />
      </div>
    );
  } else {
    return <div />;
  }
}
