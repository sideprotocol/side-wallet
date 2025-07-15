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

export interface UTXOBridge {
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
  status: 'pending' | 'confirmed' | 'failed';
  url: string;
  denom?: string;
}

export interface WithdrawRequest {
  requests: Request[];
  pagination: null;
}

export interface GetBridgeWithdrawFeeReponse {
  fee_rate: string;
  fee: string;
  code?: number;
  message?: string;
  details?: any;
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

interface Entry {
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

export interface FeeEstimateResponse {
  [block: string]: number;
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

export interface SideBridgeParams {
  params: Params;
}

export interface Params {
  deposit_confirmation_depth: number;
  withdraw_confirmation_depth: number;
  max_acceptable_block_depth: string;
  confirmations: number;
  btc_voucher_denom: string;
  deposit_enabled: boolean;
  withdraw_enabled: boolean;
  non_btc_relayers: string[];
  vaults: Vault[];
  protocol_limits: Protocollimits;
  protocol_fees: Protocolfees;
  tss_params: Tssparams;
}

interface Tssparams {
  dkg_timeout_period: string;
  participant_update_transition_period: string;
}

export interface Protocolfees {
  deposit_fee: string;
  withdraw_fee: string;
  collector: string;
}

export interface Protocollimits {
  btc_min_deposit: string;
  btc_min_withdraw: string;
  btc_max_withdraw: string;
}

interface Vault {
  address: string;
  pub_key: string;
  asset_type: 'ASSET_TYPE_RUNES' | 'ASSET_TYPE_BTC';
  version: string;
}

export interface GetIncentiveParamsResponse {
  params: {
    enabled: boolean;
    reward_per_deposit: {
      amount: string;
      denom: string;
    };
    reward_per_withdraw: {
      amount: string;
      denom: string;
    };
  };
}

export interface GetIncentiveRewardsStatsResponse {
  reward_stats: {
    address_count: string;
    total_reward_amount: {
      amount: string;
      denom: string;
    };
    tx_count: string;
  };
}

export interface GetIncentiveRewardsByAddressResponse {
  rewards: {
    address: string;
    deposit_count: string;
    deposit_reward: {
      amount: string;
      denom: string;
    };
    total_amount: {
      amount: string;
      denom: string;
    };
    withdraw_count: string;
    withdraw_reward: {
      amount: string;
      denom: string;
    };
  };
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

export interface IGetBtcBridgeDepositIbcScriptRequest {
  channel_id: string;
  recipient_address: string;
}

export interface IGetBtcBridgeDepositIbcScriptResponse {
  script: string;
}

export interface IGetRateLimitResponse {
  rate_limit: {
    address_rate_limit: {
      end_time: string;
      quota: string;
      start_time: string;
    };
    global_rate_limit: {
      end_time: string;
      quota: string;
      start_time: string;
      used: string;
    };
  };
}

export interface IGetRateLimitByAddressResponse {
  address: string;
  end_time: string;
  quota: string;
  start_time: string;
  used: string;
}
