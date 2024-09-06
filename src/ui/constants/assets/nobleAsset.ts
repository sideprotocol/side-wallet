import { IAsset } from '.';

export const NOBLE_DEV_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Usdc: {
    base: 'uusdc',
    symbol: 'USDC',
    name: 'USD Coin',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-USDC',
    precision: 6
  },
  // ibc token
  Side_ibc_side: {
    symbol: 'SIDE',
    name: 'Side protocol',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-SIDE',
    precision: 6,
    base: 'ibc/EFF59754A3B40C8CA35A22A730EC9ABFD4ACC21FFED08F54F99225EC13BCA065'
  }
};

export const NOBLE_TEST_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Usdc: {
    base: 'uusdc',
    symbol: 'USDC',
    name: 'USD Coin',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-USDC',
    precision: 6
  },
  // ibc token
  Side_ibc_side: {
    symbol: 'SIDE',
    name: 'Side protocol',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-SIDE',
    precision: 6,
    base: 'ibc/9A0B288603FDB03854201725F6E09B45BE5FB7867FFF7D2DFA6BEE6A38004D38'
  }
};

export const NOBLE_MAIN_ASSETLIST = {};
