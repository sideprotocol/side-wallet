import { Coin } from '@cosmjs/amino';

import { BaseRequestOffChainApi, BaseRequestPage, BaseResponse } from '../types';

interface LendingBaseResponse {
  pagination: {
    next_key: string;
    total: string;
  };
}

export interface Dcm {
  desc: string;
  id: string;
  participants: [string];
  pubkey: string;
  status: string;
  threshold: number;
  time: string;
}

export interface Attestation {
  event_id: string;
  id: string;
  outcome: string;
  pubkey: string;
  signature: string;
  time: string;
}

export interface DlcEvent {
  id: string;
  type: string;
  nonce: string;
  pubkey: string;
  description: string;
  outcomes: string[];
  has_triggered: boolean;
  outcome_index: number;
  publish_at: string;
}
export interface DlcNonce {
  index: string;
  nonce: string;
  oracle_pubkey: string;
  time: string;
}

export type DlcOracleStatus =
  | 'Oracle_Status_Pending'
  | 'Oracle_Status_Failed'
  | 'Oracle_Status_Timedout'
  | 'Oracle_status_Enable'
  | 'Oracle_status_Disable';

export interface DlcOracle {
  desc: string;
  id: string;
  nonce_index: string;
  participants: [string];
  pubkey: string;
  status: DlcOracleStatus;
  threshold: number;
  time: string;
}

export interface LiquidationEvent {
  event_id: string;
  nonce: string;
  oracle_pubkey: string;
  price: string;
  signature_point: string;
}

export enum LoanStatusEnum {
  Unspecified,
  Requested,
  Open,
  Rejected,
  Cancelled,
  Repaid,
  Defaulted,
  Liquidated,
  Closed
}

export enum LiquidationStatusEnum {
  LIQUIDATION_STATUS_UNSPECIFIED,
  LIQUIDATION_STATUS_LIQUIDATING,
  LIQUIDATION_STATUS_LIQUIDATED,
  LIQUIDATION_STATUS_SETTLING,
  LIQUIDATION_STATUS_SETTLED
}

export type LoanStatus = keyof typeof LoanStatusEnum;
export type LiquidationStatus = keyof typeof LiquidationStatusEnum;

export interface Loan {
  dcm: string;
  borrow_amount: Coin;
  borrower: string;
  borrowerPubKey: string;
  collateral_amount: string;
  create_at: string;
  default_liquidation_event_id: string;
  deposit_txs: string[];
  final_timeout: string;
  interest: string;
  liquidation_event_id: string;
  liquidation_id: string;
  liquidation_price: string;
  maturity_time: string;
  origination_fee: string;
  pool_id: string;
  protocol_fee: string;
  repayment_event_id: string;
  status: LoanStatus;
  term: string;
  vault_address: string;
}

export interface LoanBaseData {
  poolId: string;
  auctionId: string;
  createAt: string;
  statusText: string;
  maturityTime: string;
  finalTimeout: string;
  disbursementTime: string;
  vaultAddress: string;
  borrower: string;
  borrowerPubKey: string;
  agency: string;
  collateralAmount: number;
  borrowDenom: string;
  borrowAmount: number;
  originationFee: number;
  interest: number;
  protocolFee: number;
  term: string;
  eventId: string;
  attestationId: string;
  depositTxs: string[];
  borrowToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  collateralToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  interestToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
}

export interface LeadingPool {
  total_borrowed: string;
  id: string;
  status: string;
  supply: {
    amount: string;
    denom: string;
  };
  available_amount: string;

  total_stokens: {
    denom: string;
    amount: string;
  };

  config: {
    borrow_apr: number;
    reserve_factor: number;
    supply_cap: string;
    borrow_cap: string;
    debt_ceiling: string;
    origination_fee: string;
    max_ltv: number;
    liquidation_threshold: number;
    paused: boolean;
  };
  total_reserves: string;
}

export type LendingPool = {
  poolId: string;
  tokenDenom: string;
  tokenSymbol: string;
  tokenName: string;
  tokenExponent: string;
  tokenPrecision: number;
  tokenLogo: string;
  totalSupply: number;
  totalSupplyInDollar: string;
  totalBorrow: number;
  totalBorrowInDollar: string;
  availableAmount: number;
  availableAmountInDollar: string;
  utilization: string;
  maxLTV: string;
  ofContracts: number;
  supplyAPY: string;
  borrowAPY: string;
  totalStokensDenom: string;
  totalStokensAmount: number;
  config: {
    empty: boolean;
    additionalProp1: Record<string, unknown>;
    additionalProp2: Record<string, unknown>;
    additionalProp3: Record<string, unknown>;
  };
  statusText: string;
  ofSuppliers: number;
  ofBorrowers: number;
};

export interface Liquidation {
  borrower: string;
  dcm: string;
  debt_amount: Coin;
  id: string;
  liquidated_collateral: Coin;
  liquidated_debt_amount: Coin;
  liquidated_price: string;
  liquidated_time: string;
  liquidation_bonus: number;
  liquidation_bonus_amount: Coin;
  liquidation_cet: string;
  loan_id: string;
  protocol_liquidation_fee: Coin;
  settlement_tx: string;
  settlement_tx_id: string;
  status: LiquidationStatus;
}

export interface LiquidationRecord {
  liquidationId: string;
  liquidationRecordId: string;
  liquidator: string;
  debtDenom: string;
  debtAmount: number;
  collateralDenom: string;
  collateralAmount: number;
  totalDebtAmount: number;
  debtAmountPercent: string;
  liquidationTime: string;
  txhash: string;
  debtToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  collateralToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
}

export interface GetDlcDcmsRequest extends BaseRequestPage {
  status?: number;
}

export interface GetDlcDcmsResponse extends LendingBaseResponse {
  dcms: Array<Dcm>;
}

export interface GetDlcAttestationsResponse extends LendingBaseResponse {
  attestations: Array<Attestation>;
}

export interface GetDlcAttestationByIdRequest {
  attestation: Attestation;
}

export interface GetDlcEventsRequest extends BaseRequestPage {
  triggered?: boolean;
}

export interface GetDlcEventsResponse extends LendingBaseResponse {
  events: Array<DlcEvent>;
}

export interface GetDlcEventByIdResponse {
  event: DlcEvent;
}

export interface GetDlcNoncesCountResponse {
  counts: Array<number>;
}

export interface GetDlcNoncesByOracleIdRequest extends BaseRequestPage {
  oracle_id: string;
}

export interface GetDlcNoncesByOracleIdResponse extends LendingBaseResponse {
  nonces: Array<DlcNonce>;
}

export interface GetDlcNoncesByOracleIdIndexRequest {
  oracle_id: string;
  index: string;
}

export interface GetDlcNoncesByOracleIdIndexResponse {
  nonce: DlcNonce;
}

export interface GetDlcOraclesRequest extends BaseRequestPage {
  status?: DlcOracleStatus;
}

export interface GetDlcOraclesResponse extends LendingBaseResponse {
  oracles: Array<DlcOracle>;
}

export interface GetDlcParamsResponse {
  params: {
    dkg_timeout_period: string;
    nonce_queue_size: number;
    price_intervals: Array<{
      interval: number;
      price_pair: string;
    }>;
  };
}

export interface GetDlcPriceResponse {
  price: string;
}

export interface GetCollateralAddressRequest {
  borrower_pubkey: string;
  dcm_pubkey: string;
  maturity_time: string;
}

export interface GetCollateralAddressResponse {
  address: string;
}

export interface GetLiquidationCetRequest {
  loan_id: string;
  borrower_pubkey: string;
  dcm_pubkey: string;
}

export interface GetLiquidationCetResponse {
  script: string;
  sig_hashes: string[];
}

export interface GetLiquidationEventRequest {
  borrow_amount: string;
  collateral_amount: string;
  pool_id: string;
}

export interface GetLiquidationDlcMetaResponse {
  dlc_meta: {
    default_liquidation_cet: {
      borrower_adapted_signatures: string[];
      borrower_adaptor_signatures: string[];
      dcm_signatures: string[];
      signed_tx_hex: string;
      tx: string;
    };
    internal_key: string;
    liquidation_cet: {
      borrower_adapted_signatures: string[];
      borrower_adaptor_signatures: string[];
      dcm_signatures: string[];
      signed_tx_hex: string;
      tx: string;
    };
    multisig_script: string;
    repayment_cet: {
      borrower_signatures: string[];
      dcm_adapted_signatures: string[];
      dcm_adaptor_signatures: string[];
      signed_tx_hex: string;
      tx: string;
    };
    timeout_refund_script: string;
    vault_utxos: [
      {
        address: string;
        amount: string;
        height: string;
        is_locked: boolean;
        pub_key_script: string;
        runes: [
          {
            amount: string;
            id: string;
          }
        ];
        txid: string;
        vout: string;
      }
    ];
  };
}

export interface GetLoanRepaymentResponse {
  repayment: {
    borrower_signature: string;
    create_at: string;
    dca_adaptor_signatures: [string];
    loan_id: string;
    repay_adaptor_point: string;
    tx: string;
    txid: string;
  };
}

export interface GetLoansRequest extends BaseRequestPage {
  status?: number;
}

export interface GetLoansResponse extends LendingBaseResponse {
  loans: Array<Loan>;
}

export interface GetLoanByIdRequest {
  loan_id: string;
}

export interface GetLoanBaseDataRequest extends BaseRequestOffChainApi {
  vaultAddress?: string;
  statusText?: string;
}

export interface GetLoanBaseDataResponse extends BaseResponse {
  content: Array<LoanBaseData>;
}

export interface GetLoanByIdResponse {
  loan: Loan;
}

export interface GetLoanByIdCexResponse {
  poolId: string;
  createAt: string;
  statusText: string;
  maturityTime: string;
  finalTimeout: string;
  disbursementTime: string;
  disbursementTxhash: string;
  vaultAddress: string;
  borrower: string;
  borrowerPubKey: string;
  dcm: string;
  borrowDenom: string;
  borrowAmount: number;
  borrowAmountInDollar: string;
  originationFee: number;
  originationFeeInDollar: string;
  interest: number;
  interestInDollar: string;
  protocolFee: number;
  protocolFeeInDollar: string;
  collateralAmount: number;
  collateralAmountInDollar: string;
  term: string;
  liquidationPrice: string;
  liquidationEventId: string;
  defaultLiquidationEventId: string;
  repaymentEventId: string;
  liquidationId: string;
  deposit_txs: string[];
  borrowToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  collateralToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  originationFeeToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  interestToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
  protocolFeeToken: {
    denom: string;
    symbol: string;
    name: string;
    exponent: string;
    logo: string;
    amount: string;
    showAmount: string;
    price: string;
    volume: string;
  };
}

export interface GetLeadingParamsResponse {
  params: {
    final_timeout_duration: string;
    origination_fee_collector: string;
    protocol_fee_collector: string;
  };
}

export interface GetLiquidationParamsResponse {
  params: {
    liquidation_bonus: number;
    protocol_liquidation_fee: number;
    protocol_liquidation_fee_collector: string;
  };
}

export interface GetLeadingPoolsResponse extends LendingBaseResponse {
  pools: Array<LeadingPool>;
}

export interface GetLendingPoolsResponse extends BaseResponse {
  content: Array<LendingPool>;
}

export interface GetLeadingPoolByIdResponse {
  pool: LeadingPool;
}

export interface GetOverviewDataResponse {
  id: string;
  creatorId: string;
  creatorName: string;
  createTime: string;
  updaterId: string;
  updaterName: string;
  updateTime: string;
  status: null;
  sort: null;
  totalSupplied: string;
  totalBorrowed: string;
  feesIn24Hours: string;
  feesIn30Days: string;
  statusName: null;
}

export interface GetLendingLiquidityProvidersRequest extends BaseRequestOffChainApi {
  poolId: string;
  user?: string;
}

export interface GetLendingLiquidityProvidersResponse extends BaseResponse {
  content: Array<{
    user: string;
    totalSupply: string;
    userSupply: string;
    sharePercent: string;
  }>;
}

export interface GetLendingUserActivityRequest extends BaseRequestOffChainApi {
  poolId: string;
  user?: string;
  type?: string;
}

export interface GetLendingUserActivityResponse extends BaseResponse {
  content: Array<{
    user: string;
    type: string;
    timestamp: string;
    txhash: string;
    tokenDenom: string;
    tokenAmount: number;
    tokenSymbol: string;
    tokenName: string;
    tokenExponent: string;
    tokenPrecision: number;
    tokenLogo: string;
  }>;
}

export interface GetLiquidationsRequest extends BaseRequestPage {
  status?: LiquidationStatus;
}

export interface GetLiquidationsResponse extends LendingBaseResponse {
  liquidations: Array<Liquidation>;
}

export interface GetLiquidationByIdResponse {
  liquidation: Liquidation;
}

export interface GetCetInfoRequest {
  loan_id: string;
  collateral_amount: string;
}

export interface GetCetInfoResponse {
  default_liquidation_cet_info: {
    event_id: string;
    outcome_index: number;
    script: string;
    signature_point: string;
  };
  liquidation_cet_info: {
    event_id: string;
    outcome_index: number;
    script: string;
    signature_point: string;
  };
  repayment_cet_info: {
    event_id: string;
    outcome_index: number;
    script: string;
    signature_point: string;
  };
}

export interface GetLiquidationRecordsRequest extends BaseRequestPage {
  liquidationId: string;
}

export interface GetLiquidationRecordsResponse extends BaseResponse {
  content: Array<LiquidationRecord>;
}

export interface GetLoanInterestResponse {
  interest: {
    amount: string;
    denom: string;
  };
}

export interface PostLoanExpectedCollateralAmountData {
  vaultAddress: string;
  expectedCollateralAmount: number;
}
