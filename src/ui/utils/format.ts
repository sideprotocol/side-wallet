import { fromBech32, toBech32, fromHex, toHex } from '@cosmjs/encoding';

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
