export interface getAvailableBtcBalanceData {
  address: string;
}

export enum AddressType {
  P2PKH,
  P2WPKH,
  P2TR,
  P2SH_P2WPKH,
  M44_P2WPKH,
  M44_P2TR
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

export interface getAvailableBtcBalanceResponse {
  code: number;
  msg: string;
  data: Data;
}

interface Data {
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

export interface getRunesListData {
  address: string;
  currentPage: number;
  pageSize: number;
}

export interface RuneBalance {
  amount: string;
  runeid: string;
  rune: string;
  spacedRune: string;
  symbol: string;
  divisibility: number;
}

export type TickPriceItem = {
  curPrice: number;
  changePercent: number;
};

export interface RuneDetail {
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
  terms: Term;
  mints: string;
  burned: string;
  holders: number;
  transactions: number;
  supply: string;
  start: null;
  end: null | number;
  mintable: boolean;
  remaining: string;
}

interface Term {
  amount: string;
  cap: string;
  heightStart: number | null;
  heightEnd: number | null;
  offsetStart: number | null;
  offsetEnd: number | null;
}

export interface getRunesInfoListResponse {
  code: number;
  data: {
    detail: RuneDetail[];
    total: number;
    start: number;
  };
}

export interface FeeSummary {
  list: Array<{
    title: string;
    desc: string;
    feeRate: number;
  }>;
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
