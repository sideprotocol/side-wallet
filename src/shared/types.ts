import { EncodeObject } from '@cosmjs/proto-signing';
import { Coin, SignerData, StdFee } from '@cosmjs/stargate';

import { CHAINS_ENUM } from './constant';

export enum AddressType {
  P2PKH,
  P2WPKH,
  P2TR,
  P2SH_P2WPKH,
  M44_P2WPKH,
  M44_P2TR
}

export enum NetworkType {
  MAINNET,
  TESTNET
}

export enum RestoreWalletType {
  UNISAT,
  SPARROW,
  XVERSE,
  OW,
  OTHERS
}

export interface Chain {
  name: string;
  logo: string;
  enum: CHAINS_ENUM;
  network: string;
}

export interface BitcoinBalance {
  confirm_amount: string;
  pending_amount: string;
  amount: string;
  confirm_btc_amount: string;
  pending_btc_amount: string;
  btc_amount: string;
  confirm_inscription_amount: string;
  pending_inscription_amount: string;
  inscription_amount: string;
  usd_value: string;
}

export interface AddressAssets {
  total_btc: string;
  satoshis?: number;
  total_inscription: number;
}

export interface TxHistoryItem {
  txid: string;
  time: number;
  date: string;
  amount: string;
  symbol: string;
  address: string;
}

export interface Inscription {
  inscriptionId: string;
  inscriptionNumber: number;
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentType: string;
  contentLength: number;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
  contentBody: string;
  utxoHeight: number;
  utxoConfirmation: number;
  brc20?: {
    op: string;
    tick: string;
    lim: string;
    amt: string;
    decimal: string;
  };
}

export interface Atomical {
  atomicalId: string;
  atomicalNumber: number;
  type: 'FT' | 'NFT';
  ticker?: string;

  // mint info
  address: string;
  outputValue: number;
  preview: string;
  content: string;
  contentType: string;
  contentLength: number;
  timestamp: number;
  genesisTransaction: string;
  location: string;
  output: string;
  offset: number;
  contentBody: string;
  utxoHeight: number;
  utxoConfirmation: number;
}

export interface InscriptionMintedItem {
  title: string;
  desc: string;
  inscriptions: Inscription[];
}

export interface InscriptionSummary {
  mintedList: InscriptionMintedItem[];
}

export interface AppInfo {
  logo: string;
  title: string;
  desc: string;
  url: string;
  time: number;
  id: number;
  tag?: string;
  readtime?: number;
  new?: boolean;
  tagColor?: string;
}

export interface AppSummary {
  apps: AppInfo[];
  readTabTime?: number;
}

export interface FeeSummary {
  list: {
    title: string;
    desc: string;
    feeRate: number;
  }[];
}

export interface UTXO {
  txid: string;
  vout: number;
  satoshis: number;
  scriptPk: string;
  addressType: AddressType;
  inscriptions: {
    inscriptionId: string;
    inscriptionNumber?: number;
    offset: number;
  }[];
  atomicals: {
    atomicalId: string;
    atomicalNumber: number;
    type: 'NFT' | 'FT';
    ticker?: string;
  }[];

  runes: {
    runeid: string;
    rune: string;
    amount: string;
  }[];
}

export interface UTXO_Detail {
  txId: string;
  outputIndex: number;
  satoshis: number;
  scriptPk: string;
  addressType: AddressType;
  inscriptions: Inscription[];
}

export enum TxType {
  SIGN_TX,
  SEND_BITCOIN,
  SEND_ORDINALS_INSCRIPTION,
  SEND_ATOMICALS_INSCRIPTION,
  SEND_SIDE,
  SEND_RUNE_TEST,
  SEND_BTC_TEST,
  SWAP_SIDE
}

interface BaseUserToSignInput {
  index: number;
  sighashTypes: number[] | undefined;
  disableTweakSigner?: boolean;
}

export interface AddressUserToSignInput extends BaseUserToSignInput {
  address: string;
}

export interface PublicKeyUserToSignInput extends BaseUserToSignInput {
  publicKey: string;
}

export type UserToSignInput = AddressUserToSignInput | PublicKeyUserToSignInput;

export interface SignPsbtOptions {
  autoFinalized: boolean;
  toSignInputs?: UserToSignInput[];
}

export interface ToSignInput {
  index: number;
  publicKey: string;
  sighashTypes?: number[];
}
export type WalletKeyring = {
  key: string;
  index: number;
  type: string;
  addressType: AddressType;
  accounts: Account[];
  alianName: string;
  hdPath: string;
};

export interface Account {
  type: string;
  pubkey: string;
  address: string;
  brandName?: string;
  alianName?: string;
  displayBrandName?: string;
  index?: number;
  balance?: number;
  key: string;
  flag: number;
}

export interface InscribeOrder {
  orderId: string;
  payAddress: string;
  totalFee: number;
  minerFee: number;
  originServiceFee: number;
  serviceFee: number;
  outputValue: number;
}

export interface TokenBalance {
  availableBalance: string;
  overallBalance: string;
  ticker: string;
  transferableBalance: string;
  availableBalanceSafe: string;
  availableBalanceUnSafe: string;
}

export interface Arc20Balance {
  ticker: string;
  balance: number;
  confirmedBalance: number;
  unconfirmedBalance: number;
}

export interface TokenInfo {
  totalSupply: string;
  totalMinted: string;
  decimal: number;
  holder: string;
  inscriptionId: string;
}

export enum TokenInscriptionType {
  INSCRIBE_TRANSFER,
  INSCRIBE_MINT
}
export interface TokenTransfer {
  ticker: string;
  amount: string;
  inscriptionId: string;
  inscriptionNumber: number;
  timestamp: number;
}

export interface AddressTokenSummary {
  tokenInfo: TokenInfo;
  tokenBalance: TokenBalance;
  historyList: TokenTransfer[];
  transferableList: TokenTransfer[];
}

export enum RiskType {
  SIGHASH_NONE,
  SCAMMER_ADDRESS,
  UNCONFIRMED_UTXO,
  INSCRIPTION_BURNING,
  ATOMICALS_DISABLE,
  ATOMICALS_NFT_BURNING,
  ATOMICALS_FT_BURNING,
  MULTIPLE_ASSETS,
  LOW_FEE_RATE,
  HIGH_FEE_RATE,
  SPLITTING_INSCRIPTIONS,
  MERGING_INSCRIPTIONS,
  CHANGING_INSCRIPTION,
  RUNES_BURNING
}

export interface Risk {
  type: RiskType;
  level: 'danger' | 'warning';
  title: string;
  desc: string;
}

export interface DecodedPsbt {
  inputInfos: {
    txid: string;
    vout: number;
    address: string;
    value: number;
    inscriptions: Inscription[];
    atomicals: Atomical[];
    sighashType: number;
    runes: RuneBalance[];
  }[];
  outputInfos: {
    address: string;
    value: number;
    inscriptions: Inscription[];
    atomicals: Atomical[];
    runes: RuneBalance[];
  }[];
  inscriptions: { [key: string]: Inscription };
  feeRate: number;
  fee: number;
  features: {
    rbf: boolean;
  };
  risks: Risk[];
  isScammer: boolean;
  recommendedFeeRate: number;
  shouldWarnFeeRate: boolean;
}

export interface ToAddressInfo {
  address: string;
  domain?: string;
  inscription?: Inscription;
}

export interface RawTxInfo {
  psbtHex: string;
  rawtx: string;
  toAddressInfo?: ToAddressInfo;
  fee?: number;
}

export interface WalletConfig {
  version: string;
  moonPayEnabled: boolean;
  statusMessage: string;
  endpoint: string;
  chainTip: string;
}

export enum WebsiteState {
  CHECKING,
  SCAMMER,
  SAFE
}

export interface AddressSummary {
  address: string;
  totalSatoshis: number;
  btcSatoshis: number;
  assetSatoshis: number;
  inscriptionCount: number;
  atomicalsCount: number;
  brc20Count: number;
  brc20Count5Byte: number;
  arc20Count: number;
  runesCount: number;
  loading?: boolean;
}

export interface VersionDetail {
  version: string;
  title: string;
  changelogs: string[];
}

export interface RuneBalance {
  amount: string;
  runeid: string;
  rune: string;
  spacedRune: string;
  symbol: string;
  divisibility: number;
}

export interface RuneInfo {
  runeid: string;
  rune: string;
  spacedRune: string;
  number: number;
  height: number;
  txidx: number;
  timestamp: number;
  divisibility: number;
  symbol: string;
  etching: string;
  premine: string;
  terms: {
    amount: string;
    cap: string;
    heightStart: number;
    heightEnd: number;
    offsetStart: number;
    offsetEnd: number;
  };
  mints: string;
  burned: string;
  holders: number;
  transactions: number;
  mintable: boolean;
  remaining: string;
  start: number;
  end: number;
  supply: string;
  parent?: string;
}

export interface AddressRunesTokenSummary {
  runeInfo: RuneInfo;
  runeBalance: RuneBalance;
  runeLogo?: Inscription;
}

export interface SideSendTxInfo {
  toAddress: string;
  amount: string;
  fee?: number;
  memo?: string;
}

export interface CosmosTransaction {
  chainId: string;
  signerAddress: string;
  messages: readonly EncodeObject[];
  fee: StdFee;
  memo: string;
  signerData: SignerData;
}

export interface Attributes {
  index?: boolean;
  key: string;
  value: string;
}

export interface Tx {
  '@type'?: string;
  body: {
    messages: { '@type': string; amount?: string }[];
    memo: string;
    timeout_height: string;
    extension_options: any[];
    non_critical_extension_options: any[];
  };
  auth_info: {
    signer_infos: [
      {
        public_key: {
          '@type': string;
          key: string;
        };
        mode_info: {
          single?: {
            mode: string;
          };
        };
        sequence: string;
      }
    ];
    fee: {
      amount: Coin[];
      gas_limit: string;
      payer: string;
      granter: string;
    };
  };
  signatures: string[];
}

export interface CosmosTxResponse {
  height: string;
  txhash: string;
  codespace: string;
  code: number;
  data: string;
  raw_log: string;
  logs: [
    {
      msg_index: number;
      log: string;
      events: Attributes[];
    }
  ];
  info: '';
  gas_wanted: '204431';
  gas_used: '202682';
  tx: Tx;
  timestamp: '2022-08-13T23:24:54Z';
  events: {
    type: string;
    attributes: Attributes[];
  }[];
  transactionHash: string;
}

export type TickPriceItem = {
  curPrice: number;
  changePercent: number;
};

export interface BtcPrice {
  price: number;
  updateTime: number;
}

export interface IAsset {
  denom: string;
  exponent: string;
  logo: string;
  name: string;
  precision: number;
  rune: boolean;
  symbol: string;
  runeData?: {
    runeid: string;
    rune: string;
    spacedRune: string;
    number: number;
    height: number;
    txidx: number;
    timestamp: number;
    divisibility: number;
    symbol: string;
    etching: string;
    premine: string;
    terms: {
      amount: string;
      cap: string;
    };
    mints: string;
    burned: string;
    holders: number;
    transactions: number;
    supply: string;
    mintable: boolean;
    remaining: string;
  } | null;
  ibcData?: Array<{
    oppositeChainId: string;
    oppositeChainDenom: string;
    oppositeChainChannelId: string;
    sideChainChannelId: string;
    portId: string;
  }> | null;
}

export interface IAssetItem extends IAsset {
  sidePrice: string;
  bitcoinPrice: string;
  holdersCount: number;
  totalSupplyOnSideChain: number;
}

export interface BalanceItem {
  denom: string; // denom,
  amount: string; // user balance: unit amount
  denomPrice: string; // denom single price
  formatAmount: string; // user balance: format amount
  totalValue: string; // user balance: USD
  asset: IAsset; // asset info
}

export interface IChain {
  chainID: string;
  name: string;
  prefix: string;
  rpcUrl: string;
  restUrl: string;
  denom: string;
  hdPath: string;
  logo: string;
  faucetUrl: string;
  explorerUrl: string;
  isEvm?: boolean;
  isBitcoin?: boolean;
  isCosmos?: boolean;
}

export interface CacheUTXO {
  txid: string;
  vout: number;
  satoshis: number;
  scriptPk: string;
  pubkey: string;
  inscriptions: any[];
  atomicals: any[];
  addressType: number;
}
