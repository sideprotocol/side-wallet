export interface AddDepositBitcoinTransactionRequest {
  txid: string;
}

export interface GetBridgeHistoryRequest {
  address: string;
  direction: 'IN' | 'OUT';
  pageNumber: number;
  pageSize: number;
}

export interface GetBridgeHistoryResponse {
  content: GetBridgeHistoryResponseContent[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface GetBridgeHistoryResponseContent {
  id: string;
  direction: string;
  type: string;
  user: string;
  txhash: string;
  btcTxhash: string;
  time: number;
  tokenDenom: string;
  tokenAmount: string;
  tokenSymbol: string;
  tokenName: string;
  tokenExponent: string;
  tokenPrecision: number;
  tokenLogo: string;
  runeData: null;
  status: 'Pending' | 'Complete' | 'Failure';
  rune: boolean;
}
