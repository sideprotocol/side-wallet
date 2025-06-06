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

export type AuthorizationsStatus =
  | 'AUTHORIZATION_STATUS_PENDING'
  | 'AUTHORIZATION_STATUS_AUTHORIZED'
  | 'AUTHORIZATION_STATUS_REJECTED';

export type DepositStatus =
  | 'DEPOSIT_STATUS_PENDING'
  | 'DEPOSIT_STATUS_VERIFIED'
  | 'DEPOSIT_STATUS_REDEEMING'
  | 'DEPOSIT_STATUS_REDEEMED';

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
  Authorized,
  Rejected,
  Open,
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
  borrow_amount: {
    amount: string;
    denom: string;
  };
  borrow_apr: number;
  borrower: string;
  borrowerPubKey: string;
  collateral_amount: string;
  create_at: number;
  dcm: string;
  default_liquidation_event_id: string;
  authorizations: {
    deposit_txs: string[];
    id: string;
    status: AuthorizationsStatus;
  }[];
  disburse_at: number;
  final_timeout: string;
  interest: string;
  liquidation_event_id: string;
  liquidation_id: string;
  liquidation_price: string;
  maturity: string;
  maturity_time: string;
  min_maturity: string;
  origination_fee: string;
  pool_id: string;
  protocol_fee: string;
  referrer: string;
  repayment_event_id: string;
  request_fee: {
    amount: string;
    denom: string;
  };
  status: LoanStatus;
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
  expectedCollateralAmount: string;
  interest: number;
  protocolFee: number;
  maturity: string;
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
  available_amount: string;
  borrowed_amount: string;
  config: {
    borrow_cap: string;
    liquidation_threshold: number;
    max_borrow_amount: string;
    max_ltv: number;
    min_borrow_amount: string;
    origination_fee: string;
    paused: true;
    referral_fee_factor: number;
    request_fee: Coin;
    reserve_factor: number;
    supply_cap: string;
    tranches: Array<{
      borrow_apr: number;
      maturity: string;
      min_maturity_factor: number;
    }>;
    collateral_asset: {
      decimals: number;
      denom: string;
      is_base_price_asset: boolean;
      price_symbol: string;
      symbol: string;
    };
    lending_asset: {
      decimals: number;
      denom: string;
      is_base_price_asset: boolean;
      price_symbol: string;
      symbol: string;
    };
  };
  id: string;
  reserve_amount: string;
  status: 'INACTIVE' | 'ACTIVE';
  supply: Coin;
  total_borrowed: string;
  total_stokens: Coin;
  tranches: Array<{
    maturity: string;
    total_borrowed: string;
  }>;
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
  tranches: Array<{ maturity: string; total_borrowed: string }>;
  config: {
    borrow_cap: string;
    liquidation_threshold: number;
    max_borrow_amount: string;
    max_ltv: number;
    min_borrow_amount: string;
    origination_fee: string;
    paused: true;
    referral_fee_factor: number;
    request_fee: Coin;
    reserve_factor: number;
    supply_cap: string;
    tranches: Array<{
      borrow_apr: number;
      maturity: string;
      min_maturity_factor: number;
    }>;
  };
  statusText: string;
  ofSuppliers: number;
  ofBorrowers: number;
};

export type Liquidation = {
  status: LiquidationStatus;
  collateral_amount: Coin;
  dcm: string;
  debt_amount: Coin;
  debtor: string;
  id: string;
  liquidated_collateral_amount: Coin;
  liquidated_debt_amount: Coin;
  liquidated_price: string;
  liquidated_time: string;
  liquidation_bonus_amount: Coin;
  liquidation_cet: string;
  loan_id: string;
  protocol_liquidation_fee: Coin;
  settlement_tx: string;
  settlement_tx_id: string;
  unliquidated_collateral_amount: Coin;
};

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

export interface GetDlcAttestationByIdResponse {
  attestation: Attestation;
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
  maturity: string;
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
    timeout_refund_tx: string;
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

export interface PostLoanExpectedCollateralAmountData {
  vaultAddress: string;
  expectedCollateralAmount: number;
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
  maturity: string;
  borrowApr: string;
  minMaturity: string;
  referrer: string;
  disburseAt: string;
  disbursementTime: string;
  disbursementTxhash: string;
  repaymentTime: string;
  repaymentTxhash: string;
  actualInterest: number;
  vaultAddress: string;
  borrower: string;
  borrowerPubKey: string;
  dcm: string;
  borrowDenom: string;
  borrowAmount: number;
  borrowAmountInDollar: string;
  requestFeeDenom: string;
  requestFeeAmount: number;
  requestFeeInDollar: string;
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
  requestFeeToken: {
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
  expectedCollateralAmount: number;
  expectedCollateralToken: {
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
  returnBtcTxhash: string;
}

export interface GetLeadingParamsResponse {
  params: {
    final_timeout_duration: string;
    max_loan_duration: string;
    min_loan_duration: string;
    origination_fee_collector: string;
    protocol_fee_collector: string;
  };
}

export interface GetLiquidationParamsResponse {
  params: {
    liquidation_bonus_factor: number;
    protocol_liquidation_fee: number;
    protocol_liquidation_fee_collector: string;
    min_liquidation_factor: number;
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
  status?: number;
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

export interface GetLoanAuthorizationResponse {
  deposits: {
    txid: string;
    vault_address: string;
    authorization_id: string;
    deposit_tx: string;
    status: DepositStatus;
  }[];
  status: AuthorizationsStatus;
}
