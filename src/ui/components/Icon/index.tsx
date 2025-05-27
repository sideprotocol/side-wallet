import React, { CSSProperties } from 'react';

import BridgeDynamic from '@/ui/assets/lottie/bridge.json';
import EarnDynamic from '@/ui/assets/lottie/earn.json';
import HomeDynamic from '@/ui/assets/lottie/home.json';
import LoansDynamic from '@/ui/assets/lottie/loans.json';
import { ColorTypes, colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';

export const lottieRegistry = {
  'main-home-dynamic': HomeDynamic,
  'main-earn-dynamic': EarnDynamic,
  'main-loans-dynamic': LoansDynamic,
  'main-bridge-dynamic': BridgeDynamic
};

export const svgRegistry = {
  history: './images/icons/clock-solid.svg',
  send: './images/icons/arrow-left-right.svg',
  receive: './images/icons/qrcode.svg',
  general: './images/icons/settings/general.svg',
  advance: './images/icons/settings/advance.svg',
  about: './images/icons/settings/about.svg',
  expand: '/images/icons/settings/expand-view.svg',
  security: './images/icons/settings/security.svg',
  lock: '/images/icons/settings/lock.svg',
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
  side: './images/icons/side.png',
  qrcode: './images/icons/qrcode.svg',

  user: '/images/icons/user-solid.svg',
  wallet: '/images/icons/wallet-solid.svg',
  compass: './images/icons/compass-solid.svg',
  settings: './images/icons/gear-solid.svg',
  'setting-address': './images/icons/setting-address-type.svg',
  'setting-network': './images/icons/setting-network.svg',
  grid: './images/icons/grid-solid.svg',

  delete: '/images/icons/delete.svg',
  success: '/images/icons/success.svg',
  check: '/images/icons/check.svg',
  eye: '/images/icons/eye.svg',
  'eye-slash': '/images/icons/eye-slash.svg',
  'eye-slash-hover': '/images/icons/eye-off.svg',
  'eye-white': '/images/icons/eye-white.svg',
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
  warning2: '/images/icons/alert-triangle.svg',
  alert: '/images/icons/alert.svg',
  burn: ' /images/icons/burn.svg',
  risk: '/images/icons/risk.svg',
  'alert-circle': '/images/icons/alert-circle.svg',
  'check-box': '/images/icons/check-box.svg',
  'auto-lock': '/images/icons/settings/auto-lock.svg',
  'btc-selected': '/images/icons/wallet/btc-selected.svg',
  'btc-select-dark': '/images/icons/wallet/btc-select-dark.svg',
  'side-selected': '/images/icons/wallet/side-selected.svg',
  'side-select-dark': '/images/icons/wallet/side-selected.svg',
  search: '/images/icons/wallet/search.svg',
  'main-home': '/images/icons/main/home-icon.svg',
  'main-home-ac': '/images/icons/main/home-ac-icon.svg',
  'main-swap': '/images/icons/main/swap-icon.svg',
  'main-earn': '/images/icons/main/earn-icon.svg',

  'main-swap-ac': '/images/icons/main/swap-ac-icon.svg',
  'main-activity': '/images/icons/main/activity-icon.svg',
  'main-activity-ac': '/images/icons/main/activity-ac-icon.svg',
  'main-setting': '/images/icons/main/settings-icon.svg',
  'main-setting-ac': '/images/icons/main/settings-ac-icon.svg',
  'main-bridge': '/images/icons/main/bridge-icon.svg',
  'main-bridge-ac': '/images/icons/main/bridge-ac-icon.svg',
  'main-summon': '/images/icons/main/summon-ac-icon.svg',
  'main-loans': '/images/icons/main/loans-icon.svg',

  'main-summon-ac': '/images/icons/main/summon-ac-icon.svg',
  'swap-down-icon': '/images/icons/swap/bottom-icon.svg',
  'swap-down-hover': '/images/icons/swap/bottom-hover.svg',
  'check-circle': '/images/icons/check-circle.svg',

  'check-circle-broken': '/images/icons/check-circle-broken.svg',
  clear: '/images/icons/main/clear.svg',
  'wallet-icon': '/images/icons/wallet-icon.svg',
  loading: '/images/icons/loading.svg',
  plus: './images/icons/plus.svg',
  'arrow-right': './images/icons/wallet/arrow-right.svg',
  'arrow-right-hover': './images/icons/wallet/arrow-right-hover.svg',
  'icon-empty': './images/icons/main/no-data.svg',
  copy3: './images/icons/copy3.svg',
  'check-square': '/images/icons/check-square.svg'
};

const iconImgList: Array<IconTypes> = ['success', 'delete', 'btc'];

export type IconTypes = keyof typeof svgRegistry | keyof typeof lottieRegistry;
export interface IconProps {
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
  contain?: number | string;
  className?: string;

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
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;

  height?: number | string;

  width?: number | string;
}

export function Icon(props: IconProps) {
  const {
    className,
    contain,
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    onClick,
    children,
    onMouseOver,
    onMouseLeave,
    height,
    width
  } = props;

  if (!icon) {
    return (
      <div
        className={className}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
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
        className={className}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        src={iconPath}
        alt=""
        style={Object.assign({}, $containerStyleOverride, {
          width: height || size || fontSizes.icon,
          height: width || size || fontSizes.icon
        })}
      />
    );
  }
  if (iconPath) {
    return (
      <div className={className} style={$containerStyleOverride}>
        <div
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={Object.assign(
            {},
            {
              color: color ? colors[color] : '#FFF',
              width: height || size || fontSizes.icon,
              height: width || size || fontSizes.icon,
              backgroundColor: color ? colors[color] : '#FFF',
              maskImage: `url(${iconPath})`,
              maskSize: contain ? 'contain' : 'cover',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${iconPath})`,
              WebkitMaskSize: contain ? 'contain' : 'cover',
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
