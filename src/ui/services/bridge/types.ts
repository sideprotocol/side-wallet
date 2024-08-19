export interface BridgeModalProps {}

export interface UTXOAddress {
  txid: string;
  vout: number;
  status: Status;
  value: number;
}
interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface UTXO {
  txid: string;
  version: number;
  locktime: number;
  vin: Vin[];
  vout: Prevout[];
  size: number;
  weight: number;
  fee: number;
  status: Status;
}

interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

interface Vin {
  txid: string;
  vout: number;
  prevout: Prevout;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

interface Prevout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

export interface BridgeTxItem {
  time: number;
  txid: string;
  amount: string;
  status: "pending" | "confirmed";
  url: string;
}

export interface WithdrawRequest {
  requests: Request[];
  pagination: null;
}

interface Request {
  address: string;
  txid: string;
  psbt: string;
  status: string;
  sequence: string;
  vault_address: string;
}

export interface Runes {
  entries: (Entry | string)[][];
  more: boolean;
  prev: null;
  next: null;
}

export interface Entry {
  block: number;
  burned: number;
  divisibility: number;
  etching: string;
  mints: number;
  number: number;
  premine: number;
  spaced_rune: string;
  symbol: string;
  terms: null;
  timestamp: number;
  turbo: boolean;
}

export interface RuneOutput {
  address: string;
  indexed: boolean;
  inscriptions: any[];
  runes: Record<string, RuneITem>;
  sat_ranges: number[][];
  script_pubkey: string;
  spent: boolean;
  transaction: string;
  value: number;
}

export interface RuneITem {
  amount: number;
  divisibility: number;
  symbol: string;
}

export interface AddressInfo {
  address: string;
  chain_stats: Chainstats;
  mempool_stats: Chainstats;
}

interface Chainstats {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
}
