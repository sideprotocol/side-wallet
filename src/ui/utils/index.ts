import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

export * from './hooks';
export * from './WalletContext';
const UI_TYPE = {
  Tab: 'index',
  Pop: 'popup',
  Notification: 'notification'
};

type UiTypeCheck = {
  isTab: boolean;
  isNotification: boolean;
  isPop: boolean;
};

export const getUiType = (): UiTypeCheck => {
  const { pathname } = window.location;
  return Object.entries(UI_TYPE).reduce((m, [key, value]) => {
    m[`is${key}`] = pathname === `/${value}.html`;

    return m;
  }, {} as UiTypeCheck);
};

export const hex2Text = (hex: string) => {
  try {
    return hex.startsWith('0x') ? decodeURIComponent(hex.replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&')) : hex;
  } catch {
    return hex;
  }
};

export const getUITypeName = (): string => {
  // need to refact
  const UIType = getUiType();

  if (UIType.isPop) return 'popup';
  if (UIType.isNotification) return 'notification';
  if (UIType.isTab) return 'tab';

  return '';
};

/**
 *
 * @param origin (exchange.pancakeswap.finance)
 * @returns (pancakeswap)
 */
export const getOriginName = (origin: string) => {
  const matches = origin.replace(/https?:\/\//, '').match(/^([^.]+\.)?(\S+)\./);

  return matches ? matches[2] || origin : origin;
};

export const hashCode = (str: string) => {
  if (!str) return 0;
  let hash = 0,
    i,
    chr,
    len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const ellipsisOverflowedText = (str: string, length = 5, removeLastComma = false) => {
  if (str.length <= length) return str;
  let cut = str.substring(0, length);
  if (removeLastComma) {
    if (cut.endsWith(',')) {
      cut = cut.substring(0, length - 1);
    }
  }
  return `${cut}...`;
};

export const satoshisToBTC = (amount: number) => {
  return amount / 100000000;
};

export const btcTosatoshis = (amount: number) => {
  return Math.floor(amount * 100000000);
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return '';
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + '...' + address.slice(address.length - len);
}

export function shortDesc(desc?: string, len = 50) {
  if (!desc) return '';
  if (desc.length <= len) return desc;
  return desc.slice(0, len) + '...';
}

export function shortUtxo(txid: string, vout: number) {
  return txid.slice(0, 8) + '...:' + vout;
}

export async function sleep(timeSec: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeSec * 1000);
  });
}

export function isValidAddress(address: string) {
  if (!address) return false;
  return true;
}

export const copyToClipboard = (textToCopy: string | number) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy.toString());
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy.toString();
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};

export function formatDate(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  return fmt;
}

export function satoshisToAmount(val: number) {
  const num = new BigNumber(val);
  return num.dividedBy(100000000).toFixed(8);
}

export function amountToSatoshis(val: any) {
  const num = new BigNumber(val);
  return num.multipliedBy(100000000).toNumber();
}

export function useLocationState<T>() {
  const { state } = useLocation();
  return state as T;
}

export function formatUnitAmount(tokenAmount: string | number, exponent: string | number) {
  tokenAmount = tokenAmount || '0';
  exponent = exponent || 6;
  const exp = BigNumber(10).exponentiatedBy(exponent);

  const amount = BigNumber(tokenAmount).div(exp).toFixed(Number(exponent));
  return amount.replace(/\.?0+$/, '') || '0';
}

export function parseUnitAmount(tokenAmount: string, exponent: string | number) {
  const exp = BigNumber(10).exponentiatedBy(exponent);

  const amount = BigNumber(tokenAmount).multipliedBy(exp);

  return amount.toString();
}

/**
 * 返回有效位数
 * @param value value be format
 * @param precision decimal places
 * @param roundMode number
 * @returns formatted value
 */
export const formatWithDP = (
  value: string,
  precision: number,
  roundMode: BigNumber.RoundingMode = BigNumber.ROUND_FLOOR
): string => {
  const data = new BigNumber(value).dp(precision, roundMode);
  if (!data.isFinite() || data.eq(0) || value === 'NaN') {
    return new BigNumber(0).toFormat(precision, roundMode);
  }
  return data.dp(precision, roundMode).toString();
};

function removeTrailingZeroes(str: string): string {
  const dotIndex = str.indexOf('.');
  if (dotIndex === -1) {
    return str;
  }
  let temp = str.slice(0, dotIndex + 1) + str.slice(dotIndex + 1).replace(/0+$/, '');

  if (temp.endsWith('.')) {
    temp = temp.replace('.', '.00');
  }
  return temp;
}

export function getTruncate(num: string, demicals = 2) {
  if (!+num) {
    num = '0.00';
  }
  const fmt = {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 3
  };

  const formatNum = BigNumber(num).toFormat(demicals, BigNumber.ROUND_DOWN, fmt);

  return removeTrailingZeroes(formatNum);
}

export function showFromTime(timestamp: number | string) {
  timestamp = dayjs(timestamp).valueOf();
  const curTime = dayjs().valueOf();
  const distance = new BigNumber(new BigNumber(curTime).minus(timestamp)).div(1000).toNumber();
  const monthTotalTimeStamp = 2592000; // 30* 24* 60* 60
  const weekTotalTimeStamp = 604800; // 7* 24* 60* 60
  const dayTotalTimeStamp = 86400; // 24* 60* 60
  const hourTotalTimeStamp = 3600; // 1* 60* 60
  const minuteTotalTimeStamp = 60; // 1* 60
  if (distance >= monthTotalTimeStamp) {
    return `${formatWithDP(`${distance / monthTotalTimeStamp}`, 0)}M ago`;
  } else if (distance >= weekTotalTimeStamp) {
    return `${formatWithDP(`${distance / weekTotalTimeStamp}`, 0)}W ago`;
  } else if (distance >= dayTotalTimeStamp) {
    return `${formatWithDP(`${distance / dayTotalTimeStamp}`, 0)}D ago`;
  } else if (distance >= hourTotalTimeStamp) {
    return `${formatWithDP(`${distance / hourTotalTimeStamp}`, 0)}h ago`;
  } else if (distance >= minuteTotalTimeStamp) {
    return `${formatWithDP(`${distance / minuteTotalTimeStamp}`, 0)}m ago`;
  } else {
    return `${formatWithDP(`${distance < 0 ? 0 : distance}`, 0)}s ago`;
  }
}

BigNumber.config({ EXPONENTIAL_AT: 1e9, DECIMAL_PLACES: 38 });
