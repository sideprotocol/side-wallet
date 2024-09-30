/* eslint-disable quotes */

/* constants pool */
import { AddressType, CosmosChain, NetworkType, RestoreWalletType } from '../types';

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
  {
    value: AddressType.P2PKH,
    label: 'P2PKH',
    name: 'Legacy (P2PKH)',
    hdPath: "m/44'/0'/0'/0",
    displayIndex: 3,
    isUnisatLegacy: false
  },
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
  {
    value: AddressType.P2SH_P2WPKH,
    label: 'P2SH-P2WPKH',
    name: 'Nested Segwit (P2SH-P2WPKH)',
    hdPath: "m/49'/0'/0'/0",
    displayIndex: 1,
    isUnisatLegacy: false
  },
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
    isUnisatLegacy: false
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
  { value: NetworkType.TESTNET, label: 'DEVNET', name: 'testnet', validNames: ['testnet'] }
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

export const BITCOIN_CHAINS_MAP: { [key: string]: TypeChain } = {
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
};

export const BITCOIN_CHAINS = Object.values(BITCOIN_CHAINS_MAP);

export const DEFAULT_LOCKTIME = 5;

export const SIDE_CHAINID_MAINNET = 'devnet';
export const SIDE_CHAINID_TESTNET = 'devnet';
export const SIDERPC_URL_MAINNET = 'https://devnet-rpc.side.one';
export const SIDERPC_URL_TESTNET = 'https://devnet-rpc.side.one';
export const SIDEREST_URL_MAINNET = 'https://devnet-rest.side.one';
export const SIDEREST_URL_TESTNET = 'https://devnet-rest.side.one';
export const SIDE_BTC_INDEXER = 'https://index.side.one';
export const SIDE_RUNE_INDEXER = 'https://signet-rune.side.one';
export const SIDE_BTC_VAULT_ADDRESS_TESTNET = 'tb1q3q776wlrg6wljqyv4e52ls84zcw38yat2ym55t';
export const SIDE_BTC_VAULT_ADDRESS_MAINNET = '';
export const SIDE_RUNE_VAULT_ADDRESS_TESTNET = 'tb1qmu8nt6wye4vd644dm4tluurewa3yjdj76jnypw';
export const SIDE_RUNE_VAULT_ADDRESS_MAINNET = '';

export const SIDE_CHAINS: CosmosChain[] = [
  {
    chainID: SIDE_CHAINID_MAINNET,
    name: 'Side Chain',
    prefix: 'tb',
    rpcUrl: 'https://devnet-rpc.side.one',
    restUrl: 'https://devnet-rest.side.one',
    denom: 'uside',
    hdPath: "m/44'/118/0'/0/0",
    logo: '',
    faucetUrl: 'https://faucet.side.exchange',
    explorerUrl: 'https://station-dev.side.one/explorer'
  },
  {
    chainID: SIDE_CHAINID_TESTNET,
    name: 'Side Chain',
    prefix: 'tb',
    rpcUrl: 'https://devnet-rpc.side.one',
    restUrl: 'https://devnet-rest.side.one',
    denom: 'uside',
    hdPath: "m/44'/118/0'/0/0",
    logo: '',
    faucetUrl: 'https://faucet.side.exchange',
    explorerUrl: 'https://station-dev.side.one/explorer'
  }
];
