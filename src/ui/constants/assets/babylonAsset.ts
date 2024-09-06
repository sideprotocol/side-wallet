import { IAsset } from '.';

export const BABYLON_DEV_ASSETLIST = {};
export const BABYLON_TEST_ASSETLIST: { [key: string]: IAsset } = {
  // native token
  Bbn: {
    base: 'ubbn',
    symbol: 'BBN',
    name: 'Babylon Chain',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/bbn-test/chain.png',
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
    base: 'ibc/4D92A4365275C77CD72D6B31C43884FAB071FA0FD40813175294DD233D69568C'
  }
};
export const BABYLON_MAIN_ASSETLIST = {};
