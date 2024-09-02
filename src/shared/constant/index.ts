/* eslint-disable quotes */

/* constants pool */
import GrimoriaRune from '@/ui/assets/icons/grimoria-rune.png';
import USDT from '@/ui/assets/icons/usdt.svg';

import { AddressType, BitcoinToken, Chain, NetworkType, RestoreWalletType, SideToken } from '../types';

export enum CHAINS_ENUM {
  BTC = 'BTC',
  SIDE = 'SIDE',
  SIDE_SIGNET = 'SIDE_SIGNET'
}


export const KEYRING_TYPE = {
  HdKeyring: 'HD Key Tree',
  SimpleKeyring: 'Simple Key Pair',
  WatchAddressKeyring: 'Watch Address',
  WalletConnectKeyring: 'WalletConnect',
  Empty: 'Empty',
  KeystoneKeyring: 'Keystone'
};

export const KEYRING_CLASS = {
  PRIVATE_KEY: 'Simple Key Pair',
  MNEMONIC: 'HD Key Tree',
  KEYSTONE: 'Keystone'
};

export const KEYRING_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Created by Mnemonic',
  [KEYRING_TYPE.SimpleKeyring]: 'Imported by Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch Mode',
  [KEYRING_TYPE.KeystoneKeyring]: 'Import from Keystone'
};
export const BRAND_ALIAN_TYPE_TEXT = {
  [KEYRING_TYPE.HdKeyring]: 'Account',
  [KEYRING_TYPE.SimpleKeyring]: 'Private Key',
  [KEYRING_TYPE.WatchAddressKeyring]: 'Watch',
  [KEYRING_TYPE.KeystoneKeyring]: 'Account'
};

export const KEYRING_TYPES: {
  [key: string]: {
    name: string;
    tag: string;
    alianName: string;
  };
} = {
  'HD Key Tree': {
    name: 'HD Key Tree',
    tag: 'HD',
    alianName: 'HD Wallet'
  },
  'Simple Key Pair': {
    name: 'Simple Key Pair',
    tag: 'IMPORT',
    alianName: 'Single Wallet'
  },
  Keystone: {
    name: 'Keystone',
    tag: 'KEYSTONE',
    alianName: 'Keystone'
  }
};

export const IS_CHROME = /Chrome\//i.test(navigator.userAgent);

export const IS_FIREFOX = /Firefox\//i.test(navigator.userAgent);

export const IS_LINUX = /linux/i.test(navigator.userAgent);

let chromeVersion: number | null = null;

if (IS_CHROME) {
  const matches = navigator.userAgent.match(/Chrome\/(\d+[^.\s])/);
  if (matches && matches.length >= 2) {
    chromeVersion = Number(matches[1]);
  }
}

export const IS_AFTER_CHROME91 = IS_CHROME ? chromeVersion && chromeVersion >= 91 : false;

export const GAS_LEVEL_TEXT = {
  slow: 'Standard',
  normal: 'Fast',
  fast: 'Instant',
  custom: 'Custom'
};

export const IS_WINDOWS = /windows/i.test(navigator.userAgent);

export const LANGS = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'zh_CN',
    label: 'Chinese'
  },
  {
    value: 'ja',
    label: 'Japanese'
  },
  {
    value: 'es',
    label: 'Spanish'
  }
];

export const ADDRESS_TYPES: {
  value: AddressType;
  label: string;
  name: string;
  hdPath: string;
  displayIndex: number;
  isUnisatLegacy?: boolean;
}[] = [
  // {
  //   value: AddressType.P2PKH,
  //   label: 'P2PKH',
  //   name: 'Legacy (P2PKH)',
  //   hdPath: "m/44'/0'/0'/0",
  //   displayIndex: 3,
  //   isUnisatLegacy: false
  // },
  {
    value: AddressType.P2WPKH,
    label: 'P2WPKH',
    name: 'Native Segwit (P2WPKH)',
    hdPath: "m/84'/0'/0'/0",
    displayIndex: 0,
    isUnisatLegacy: false
  },
  {
    value: AddressType.P2TR,
    label: 'P2TR',
    name: 'Taproot (P2TR)',
    hdPath: "m/86'/0'/0'/0",
    displayIndex: 2,
    isUnisatLegacy: false
  },
  // {
  //   value: AddressType.P2SH_P2WPKH,
  //   label: 'P2SH-P2WPKH',
  //   name: 'Nested Segwit (P2SH-P2WPKH)',
  //   hdPath: "m/49'/0'/0'/0",
  //   displayIndex: 1,
  //   isUnisatLegacy: false
  // },
  {
    value: AddressType.M44_P2WPKH,
    label: 'P2WPKH',
    name: 'Native SegWit (P2WPKH)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 4,
    isUnisatLegacy: true
  },
  {
    value: AddressType.M44_P2TR,
    label: 'P2TR',
    name: 'Taproot (P2TR)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 5,
    isUnisatLegacy: true
  }
];

export const OW_HD_PATH = "m/86'/0'/0'";

export const RESTORE_WALLETS: { value: RestoreWalletType; name: string; addressTypes: AddressType[] }[] = [
  {
    value: RestoreWalletType.UNISAT,
    name: 'UNISAT Wallet',
    addressTypes: [
      AddressType.P2WPKH,
      AddressType.P2SH_P2WPKH,
      AddressType.P2TR,
      AddressType.P2PKH,
      AddressType.M44_P2WPKH,
      AddressType.M44_P2TR
    ]
  },
  {
    value: RestoreWalletType.SPARROW,
    name: 'Sparrow Wallet',
    addressTypes: [AddressType.P2PKH, AddressType.P2WPKH, AddressType.P2SH_P2WPKH, AddressType.P2TR]
  },
  {
    value: RestoreWalletType.XVERSE,
    name: 'Xverse Wallet',
    addressTypes: [AddressType.P2SH_P2WPKH, AddressType.P2TR]
  },
  {
    value: RestoreWalletType.OW,
    name: 'Ordinals Wallet',
    addressTypes: [AddressType.P2TR]
  },
  {
    value: RestoreWalletType.OTHERS,
    name: 'Other Wallet',
    addressTypes: [
      AddressType.P2PKH,
      AddressType.P2WPKH,
      AddressType.P2SH_P2WPKH,
      AddressType.P2TR,
      AddressType.M44_P2WPKH,
      AddressType.M44_P2TR
    ]
  }
];

export const NETWORK_TYPES = [
  { value: NetworkType.MAINNET, label: 'MAINNET', name: 'livenet', validNames: [0, 'livenet', 'mainnet'] },
  { value: NetworkType.TESTNET, label: 'DEVNET', name: 'testnet', validNames: ['testnet'] },
  // { value: NetworkType.MAINNET, label: 'DEVNET', name: 'livenet', validNames: [0, 'livenet', 'mainnet'] },
];

export const MINIMUM_GAS_LIMIT = 21000;

export enum WATCH_ADDRESS_CONNECT_TYPE {
  WalletConnect = 'WalletConnect'
}

export const WALLETCONNECT_STATUS_MAP = {
  PENDING: 1,
  CONNECTED: 2,
  WAITING: 3,
  SIBMITTED: 4,
  REJECTED: 5,
  FAILD: 6
};

export const INTERNAL_REQUEST_ORIGIN = 'https://side.one';

export const INTERNAL_REQUEST_SESSION = {
  name: 'Side Wallet',
  origin: INTERNAL_REQUEST_ORIGIN,
  icon: './images/logo/logo@128x.png'
};

export const OPENAPI_URL_MAINNET = 'https://wallet-api.unisat.io/v5';
export const OPENAPI_URL_TESTNET = 'https://wallet-api-testnet.unisat.io/v5';
export const SIDEREST_URL_MAINNET = 'https://testnet-rest.side.one';
// export const SIDEREST_URL_TESTNET = 'https://devnet-rest.side.one';
export const SIDEREST_URL_TESTNET = 'https://testnet-rest.side.one';
export const SIDERPC_URL_MAINNET = 'https://devnet-rpc.side.one';
// export const SIDERPC_URL_TESTNET = 'https://devnet-rpc.side.one';
export const SIDERPC_URL_TESTNET = 'https://testnet-rpc.side.one';
// export const SIDE_CHAINID_MAINNET = 'grimoria-testnet-1';
export const SIDE_CHAINID_MAINNET = 'devnet';
// export const SIDE_CHAINID_TESTNET = 'grimoria-testnet-1';
export const SIDE_CHAINID_TESTNET = 'devnet';

export const SIDE_BTC_INDEXER = 'https://index.side.one';

export const SIDE_RUNE_INDEXER = 'https://signet-rune.side.one';

export const SIDE_BTC_VAULT_ADDRESS_TESTNET = 'tb1q3q776wlrg6wljqyv4e52ls84zcw38yat2ym55t';

export const SIDE_BTC_VAULT_ADDRESS_MAINNET = '';

export const SIDE_RUNE_VAULT_ADDRESS_TESTNET = 'tb1qmu8nt6wye4vd644dm4tluurewa3yjdj76jnypw';

export const SIDE_RUNE_VAULT_ADDRESS_MAINNET = '';

export const EVENTS = {
  broadcastToUI: 'broadcastToUI',
  broadcastToBackground: 'broadcastToBackground',
  SIGN_FINISHED: 'SIGN_FINISHED',
  WALLETCONNECT: {
    STATUS_CHANGED: 'WALLETCONNECT_STATUS_CHANGED',
    INIT: 'WALLETCONNECT_INIT',
    INITED: 'WALLETCONNECT_INITED'
  }
};

export const SORT_WEIGHT = {
  [KEYRING_TYPE.HdKeyring]: 1,
  [KEYRING_TYPE.SimpleKeyring]: 2,
  [KEYRING_TYPE.WalletConnectKeyring]: 4,
  [KEYRING_TYPE.WatchAddressKeyring]: 5
};

export const GASPRICE_RANGE = {
  [CHAINS_ENUM.BTC]: [0, 10000]
};

export const COIN_NAME = 'BTC';
export const COIN_SYMBOL = 'BTC';

export const COIN_DUST = 1000;

export const TO_LOCALE_STRING_CONFIG = {
  minimumFractionDigits: 8
};

export const SUPPORTED_DOMAINS = ['sats', 'unisat', 'x', 'btc'];
export const SAFE_DOMAIN_CONFIRMATION = 3;

export const GITHUB_URL = 'https://github.com/sideprotocol';
export const TELEGRAM_URL = 'https://t.me/SideProtocolOfficial';

export const DISCORD_URL = 'https://discord.com/invite/sideprotocol';
export const TWITTER_URL = 'https://x.com/SideProtocol';

export const CHANNEL = process.env.channel!;
export const VERSION = process.env.release!;
export const MANIFEST_VERSION = process.env.manifest!;

export enum AddressFlagType {
  Is_Enable_Atomicals = 0b1,
  CONFIRMED_UTXO_MODE = 0b10,
  DISABLE_AUTO_SWITCH_CONFIRMED = 0b100
}

export const UNCONFIRMED_HEIGHT = 4194303;

export enum PaymentChannelType {
  MoonPay = 'moonpay',
  AlchemyPay = 'alchemypay',
  Transak = 'transak'
}

export const PAYMENT_CHANNELS = {
  moonpay: {
    name: 'MoonPay',
    img: './images/artifacts/moonpay.png'
  },
  alchemypay: {
    name: 'Alchemy Pay',
    img: './images/artifacts/alchemypay.png'
  },

  transak: {
    name: 'Transak',
    img: './images/artifacts/transak.png'
  }
};

export enum HardwareWalletType {
  Keystone = 'keystone',
  Ledger = 'ledger',
  Trezor = 'trezor'
}

export const HARDWARE_WALLETS = {
  [HardwareWalletType.Keystone]: {
    name: 'Keystone',
    img: './images/artifacts/keystone.png'
  },
  [HardwareWalletType.Ledger]: {
    name: 'Ledger',
    img: './images/artifacts/ledger.png'
  },
  [HardwareWalletType.Trezor]: {
    name: 'Trezor',
    img: './images/artifacts/trezor.png'
  }
};

// logo_black: '/images/logo/wallet-logo.png',
export const SIDE_TOKENS: SideToken[] = [
  {
    base: 'uside',
    symbol: 'SIDE',
    name: 'SIDE',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-SIDE',
    precision: 6,
    logo_black: '/images/logo/wallet-logo.png'
  },
  {
    base: 'runes/9110:1',
    symbol: 'GRIMORIA•X•RUNE',
    name: 'Rune',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: GrimoriaRune,
    precision: 6,
    emoji: '🔮',
    isRune: true
  },
  {
    base: 'sat', // smallest unit -> uatom -> ATOM
    symbol: 'BTC', // currency name
    name: 'Bitcoin',
    exponent: '8', // The conversion ratio between the smallest unit and the display unit 10^18
    coingecko_id: 'bitcoin', // Get the ID of the currency market price from cg
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=',
    precision: 8
  },
  {
    base: 'uusdc',
    symbol: 'USDC',
    name: 'USD Coin',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: 'side-USDC',
    precision: 6
  },
  {
    base: 'uusdt',
    symbol: 'USDT',
    name: 'Tether USD',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: USDT,
    precision: 6
  }
];

export const BITCOIN_TOKENS: BitcoinToken[] = [
  {
    logo: '/images/img/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    coingecko_id: 'bitcoin',
    base: 'sat'
  },
  {
    base: 'runes/9110:1',
    symbol: 'GRIMORIA•X•RUNE',
    name: 'Rune',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: GrimoriaRune,
    precision: 6,
    emoji: '🔮',
    isRune: true
  }
];

export enum ChainType {
  BITCOIN_MAINNET = 'BITCOIN_MAINNET',
  BITCOIN_TESTNET = 'BITCOIN_TESTNET',
  BITCOIN_TESTNET4 = 'BITCOIN_TESTNET4',
  BITCOIN_SIGNET = 'BITCOIN_SIGNET',
  FRACTAL_BITCOIN_MAINNET = 'FRACTAL_BITCOIN_MAINNET',
  FRACTAL_BITCOIN_TESTNET = 'FRACTAL_BITCOIN_TESTNET'
}

type TypeChain = {
  enum: ChainType;
  label: string;
  icon: string;
  unit: string;
  networkType: NetworkType;
  endpoints: string[];
  mempoolSpaceUrl: string;
  unisatUrl: string;
  ordinalsUrl: string;
  unisatExplorerUrl: string;
  okxExplorerUrl: string;
  isViewTxHistoryInternally?: boolean;
  disable?: boolean;
  isFractal?: boolean;
  showPrice: boolean;
};

export const CHAINS_MAP: { [key: string]: TypeChain } = {
  [ChainType.BITCOIN_TESTNET]: {
      enum: ChainType.BITCOIN_TESTNET,
      label: 'Bitcoin Testnet',
      icon: './images/artifacts/bitcoin-testnet.svg',
      unit: 'tBTC',
      networkType: NetworkType.TESTNET,
      endpoints: ['https://wallet-api-testnet.unisat.io'],
      mempoolSpaceUrl: 'https://mempool.space/testnet',
      unisatUrl: 'https://testnet.unisat.io',
      ordinalsUrl: 'https://testnet.ordinals.com',
      unisatExplorerUrl: '',
      okxExplorerUrl: '',
      showPrice: false
  },
  [ChainType.BITCOIN_MAINNET]: {
    enum: ChainType.BITCOIN_MAINNET,
    label: 'Bitcoin Mainnet',
    icon: './images/artifacts/bitcoin-mainnet.png',
    unit: 'BTC',
    networkType: NetworkType.MAINNET,
    endpoints: ['https://wallet-api.unisat.io'],
    mempoolSpaceUrl: 'https://mempool.space',
    unisatUrl: 'https://unisat.io',
    ordinalsUrl: 'https://ordinals.com',
    unisatExplorerUrl: '',
    okxExplorerUrl: '',
    showPrice: true
  }
  // [ChainType.BITCOIN_TESTNET]: {
  //   enum: ChainType.BITCOIN_TESTNET,
  //   label: 'Bitcoin Testnet',
  //   icon: './images/artifacts/bitcoin-testnet.svg',
  //   unit: 'tBTC',
  //   networkType: NetworkType.TESTNET,
  //   endpoints: ['https://wallet-api-testnet.unisat.io'],
  //   mempoolSpaceUrl: 'https://mempool.space/testnet',
  //   unisatUrl: 'https://testnet.unisat.io',
  //   ordinalsUrl: 'https://testnet.ordinals.com',
  //   unisatExplorerUrl: '',
  //   okxExplorerUrl: '',
  //   showPrice: false
  // },
  // [ChainType.BITCOIN_TESTNET4]: {
  //   enum: ChainType.BITCOIN_TESTNET4,
  //   label: 'Bitcoin Testnet4 (Beta)',
  //   icon: './images/artifacts/bitcoin-testnet.svg',
  //   unit: 'tBTC',
  //   networkType: NetworkType.TESTNET,
  //   endpoints: ['https://wallet-api-testnet4.unisat.io'],
  //   mempoolSpaceUrl: 'https://mempool.space/testnet4',
  //   unisatUrl: 'https://testnet4.unisat.io',
  //   ordinalsUrl: 'https://testnet4.ordinals.com',
  //   unisatExplorerUrl: '',
  //   okxExplorerUrl: '',
  //   showPrice: false
  // },
  // [ChainType.BITCOIN_SIGNET]: {
  //   enum: ChainType.BITCOIN_SIGNET,
  //   label: 'Bitcoin Signet',
  //   icon: './images/artifacts/bitcoin-signet.svg',
  //   unit: 'sBTC',
  //   networkType: NetworkType.TESTNET,
  //   endpoints: ['https://wallet-api-signet.unisat.io'],
  //   mempoolSpaceUrl: 'https://mempool.space/signet',
  //   unisatUrl: 'https://signet.unisat.io',
  //   ordinalsUrl: 'https://signet.ordinals.com',
  //   unisatExplorerUrl: '',
  //   okxExplorerUrl: '',
  //   showPrice: false
  // },
  // [ChainType.FRACTAL_BITCOIN_MAINNET]: {
  //   enum: ChainType.FRACTAL_BITCOIN_MAINNET,
  //   label: 'Fractal Bitcoin Mainnet (Not Ready)',
  //   icon: './images/artifacts/fractal-mainnet.svg',
  //   unit: 'FB',
  //   networkType: NetworkType.MAINNET,
  //   endpoints: ['https://wallet-api-fractal.unisat.io'],
  //   mempoolSpaceUrl: 'https://mempool.fractalbitcoin.io',
  //   unisatUrl: 'https://fractal.unisat.io',
  //   ordinalsUrl: 'https://ordinals.fractalbitcoin.io',
  //   unisatExplorerUrl: 'https://explorer.fractalbitcoin.io',
  //   okxExplorerUrl: '',
  //   isViewTxHistoryInternally: false,
  //   disable: true,
  //   isFractal: true,
  //   showPrice: true
  // },
  // [ChainType.FRACTAL_BITCOIN_TESTNET]: {
  //   enum: ChainType.FRACTAL_BITCOIN_TESTNET,
  //   label: 'Fractal Bitcoin Testnet',
  //   icon: './images/artifacts/fractal-testnet.svg',
  //   unit: 'tFB',
  //   networkType: NetworkType.MAINNET,
  //   endpoints: ['https://wallet-api-fractal-testnet.unisat.io'],
  //   mempoolSpaceUrl: 'https://mempool-testnet.fractalbitcoin.io',
  //   unisatUrl: 'https://fractal-testnet.unisat.io',
  //   ordinalsUrl: 'https://ordinals-testnet.fractalbitcoin.io',
  //   unisatExplorerUrl: 'https://explorer-testnet.fractalbitcoin.io',
  //   okxExplorerUrl: '',
  //   isViewTxHistoryInternally: false,
  //   isFractal: true,
  //   showPrice: false
  // }
};

// export const CHAINS: Record<string, Chain> = {
//   [CHAINS_ENUM.BTC]: {
//     name: 'BTC',
//     enum: CHAINS_ENUM.BTC,
//     logo: '',
//     network: 'testnet'
//   }
// };
export const CHAINS = Object.values(CHAINS_MAP);
