import { fromBech32, fromHex, toBech32, toHex } from '@cosmjs/encoding';

export const ethToEthermint = (ethAddress: string, prefix: string) => {
  const data = fromHex(ethAddress.replace('0x', ''));
  return toBech32(prefix, data);
};

export const ethermintToEth = (ethermintAddress: string) => {
  const { data } = fromBech32(ethermintAddress);
  return `0x${toHex(data)}`;
};

export function decimal2percent(v?: string) {
  return v ? parseFloat((Number(v) * 100).toFixed(2)) : '';
}

export function removeStartZero(value: string) {
  if (!value || value === '0') {
    return '0';
  }
  return value.replace(/^0+(?=\d)/, '');
}

export const formatAddress = (address: string, len: number) => {
  if (!address) return '-';
  return address?.slice(0, 6) + '...' + address?.slice(-len);
};
