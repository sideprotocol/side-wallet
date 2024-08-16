import { IAsset } from '.';

export const AXELAR_DEV_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Axl: {
    base: 'uaxl',
    symbol: 'AXL',
    name: 'AXL',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.svg',
    precision: 6,
  },
  Ausdc: {
    base: 'uausdc',
    symbol: 'aUSDC',
    name: 'aUSDC.axl',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'https://testnet.satellite.money/assets/tokens/uausdc.logo.svg',
    precision: 6,
  },
  // ibc token
  Side_ibc_side: {
    symbol: 'SIDE',
    name: 'Side protocol',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-SIDE',
    precision: 6,
    base: 'ibc/110BFA28D36A425775151F0F377575EB5CC88E32C8BBF641645782AA4E873F36',
  },
};

export const AXELAR_TEST_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Axl: {
    base: 'uaxl',
    symbol: 'AXL',
    name: 'AXL',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/axl.svg',
    precision: 6,
  },
  Ausdc: {
    base: 'uausdc',
    symbol: 'aUSDC',
    name: 'aUSDC.axl',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'https://testnet.satellite.money/assets/tokens/uausdc.logo.svg',
    precision: 6,
  },
  // ibc token
  Side_ibc_side: {
    symbol: 'SIDE',
    name: 'Side protocol',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-SIDE',
    precision: 6,
    base: 'ibc/655EC49713611B007D3EA3F5C041F9167612A3DF8C68945CB3DCDE7111988BCF',
  },
};

export const AXELAR_MAIN_ASSETLIST = {};
