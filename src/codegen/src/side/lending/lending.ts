//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { UTXO, UTXOAmino, UTXOSDKType } from "../btcbridge/btcbridge";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../helpers";
/** Status options for a lending pool */
export enum PoolStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PAUSED = 2,
  UNRECOGNIZED = -1,
}
export const PoolStatusSDKType = PoolStatus;
export const PoolStatusAmino = PoolStatus;
export function poolStatusFromJSON(object: any): PoolStatus {
  switch (object) {
    case 0:
    case "INACTIVE":
      return PoolStatus.INACTIVE;
    case 1:
    case "ACTIVE":
      return PoolStatus.ACTIVE;
    case 2:
    case "PAUSED":
      return PoolStatus.PAUSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PoolStatus.UNRECOGNIZED;
  }
}
export function poolStatusToJSON(object: PoolStatus): string {
  switch (object) {
    case PoolStatus.INACTIVE:
      return "INACTIVE";
    case PoolStatus.ACTIVE:
      return "ACTIVE";
    case PoolStatus.PAUSED:
      return "PAUSED";
    case PoolStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Loan Status */
export enum LoanStatus {
  /** Unspecified - Unspecified */
  Unspecified = 0,
  /** Requested - Loan Requested */
  Requested = 1,
  /** Cancelled - Loan Cancelled */
  Cancelled = 2,
  /** Authorized - Loan Authorized */
  Authorized = 3,
  /** Rejected - Loan Rejected */
  Rejected = 4,
  /** Open - Loan Open */
  Open = 5,
  /** Repaid - Loan Repaid */
  Repaid = 6,
  /** Defaulted - Loan Defaulted */
  Defaulted = 7,
  /** Liquidated - Loan Liquidated */
  Liquidated = 8,
  /** Closed - Loan Closed */
  Closed = 9,
  UNRECOGNIZED = -1,
}
export const LoanStatusSDKType = LoanStatus;
export const LoanStatusAmino = LoanStatus;
export function loanStatusFromJSON(object: any): LoanStatus {
  switch (object) {
    case 0:
    case "Unspecified":
      return LoanStatus.Unspecified;
    case 1:
    case "Requested":
      return LoanStatus.Requested;
    case 2:
    case "Cancelled":
      return LoanStatus.Cancelled;
    case 3:
    case "Authorized":
      return LoanStatus.Authorized;
    case 4:
    case "Rejected":
      return LoanStatus.Rejected;
    case 5:
    case "Open":
      return LoanStatus.Open;
    case 6:
    case "Repaid":
      return LoanStatus.Repaid;
    case 7:
    case "Defaulted":
      return LoanStatus.Defaulted;
    case 8:
    case "Liquidated":
      return LoanStatus.Liquidated;
    case 9:
    case "Closed":
      return LoanStatus.Closed;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LoanStatus.UNRECOGNIZED;
  }
}
export function loanStatusToJSON(object: LoanStatus): string {
  switch (object) {
    case LoanStatus.Unspecified:
      return "Unspecified";
    case LoanStatus.Requested:
      return "Requested";
    case LoanStatus.Cancelled:
      return "Cancelled";
    case LoanStatus.Authorized:
      return "Authorized";
    case LoanStatus.Rejected:
      return "Rejected";
    case LoanStatus.Open:
      return "Open";
    case LoanStatus.Repaid:
      return "Repaid";
    case LoanStatus.Defaulted:
      return "Defaulted";
    case LoanStatus.Liquidated:
      return "Liquidated";
    case LoanStatus.Closed:
      return "Closed";
    case LoanStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Authorization Status */
export enum AuthorizationStatus {
  /** AUTHORIZATION_STATUS_PENDING - Pending */
  AUTHORIZATION_STATUS_PENDING = 0,
  /** AUTHORIZATION_STATUS_AUTHORIZED - Authorized */
  AUTHORIZATION_STATUS_AUTHORIZED = 1,
  /** AUTHORIZATION_STATUS_REJECTED - Rejected */
  AUTHORIZATION_STATUS_REJECTED = 2,
  UNRECOGNIZED = -1,
}
export const AuthorizationStatusSDKType = AuthorizationStatus;
export const AuthorizationStatusAmino = AuthorizationStatus;
export function authorizationStatusFromJSON(object: any): AuthorizationStatus {
  switch (object) {
    case 0:
    case "AUTHORIZATION_STATUS_PENDING":
      return AuthorizationStatus.AUTHORIZATION_STATUS_PENDING;
    case 1:
    case "AUTHORIZATION_STATUS_AUTHORIZED":
      return AuthorizationStatus.AUTHORIZATION_STATUS_AUTHORIZED;
    case 2:
    case "AUTHORIZATION_STATUS_REJECTED":
      return AuthorizationStatus.AUTHORIZATION_STATUS_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthorizationStatus.UNRECOGNIZED;
  }
}
export function authorizationStatusToJSON(object: AuthorizationStatus): string {
  switch (object) {
    case AuthorizationStatus.AUTHORIZATION_STATUS_PENDING:
      return "AUTHORIZATION_STATUS_PENDING";
    case AuthorizationStatus.AUTHORIZATION_STATUS_AUTHORIZED:
      return "AUTHORIZATION_STATUS_AUTHORIZED";
    case AuthorizationStatus.AUTHORIZATION_STATUS_REJECTED:
      return "AUTHORIZATION_STATUS_REJECTED";
    case AuthorizationStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum CetType {
  LIQUIDATION = 0,
  DEFAULT_LIQUIDATION = 1,
  REPAYMENT = 2,
  UNRECOGNIZED = -1,
}
export const CetTypeSDKType = CetType;
export const CetTypeAmino = CetType;
export function cetTypeFromJSON(object: any): CetType {
  switch (object) {
    case 0:
    case "LIQUIDATION":
      return CetType.LIQUIDATION;
    case 1:
    case "DEFAULT_LIQUIDATION":
      return CetType.DEFAULT_LIQUIDATION;
    case 2:
    case "REPAYMENT":
      return CetType.REPAYMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CetType.UNRECOGNIZED;
  }
}
export function cetTypeToJSON(object: CetType): string {
  switch (object) {
    case CetType.LIQUIDATION:
      return "LIQUIDATION";
    case CetType.DEFAULT_LIQUIDATION:
      return "DEFAULT_LIQUIDATION";
    case CetType.REPAYMENT:
      return "REPAYMENT";
    case CetType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum DepositStatus {
  DEPOSIT_STATUS_PENDING = 0,
  DEPOSIT_STATUS_VERIFIED = 1,
  DEPOSIT_STATUS_REDEEMING = 2,
  DEPOSIT_STATUS_REDEEMED = 3,
  UNRECOGNIZED = -1,
}
export const DepositStatusSDKType = DepositStatus;
export const DepositStatusAmino = DepositStatus;
export function depositStatusFromJSON(object: any): DepositStatus {
  switch (object) {
    case 0:
    case "DEPOSIT_STATUS_PENDING":
      return DepositStatus.DEPOSIT_STATUS_PENDING;
    case 1:
    case "DEPOSIT_STATUS_VERIFIED":
      return DepositStatus.DEPOSIT_STATUS_VERIFIED;
    case 2:
    case "DEPOSIT_STATUS_REDEEMING":
      return DepositStatus.DEPOSIT_STATUS_REDEEMING;
    case 3:
    case "DEPOSIT_STATUS_REDEEMED":
      return DepositStatus.DEPOSIT_STATUS_REDEEMED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DepositStatus.UNRECOGNIZED;
  }
}
export function depositStatusToJSON(object: DepositStatus): string {
  switch (object) {
    case DepositStatus.DEPOSIT_STATUS_PENDING:
      return "DEPOSIT_STATUS_PENDING";
    case DepositStatus.DEPOSIT_STATUS_VERIFIED:
      return "DEPOSIT_STATUS_VERIFIED";
    case DepositStatus.DEPOSIT_STATUS_REDEEMING:
      return "DEPOSIT_STATUS_REDEEMING";
    case DepositStatus.DEPOSIT_STATUS_REDEEMED:
      return "DEPOSIT_STATUS_REDEEMED";
    case DepositStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Signing intent */
export enum SigningIntent {
  SIGNING_INTENT_REPAYMENT = 0,
  SIGNING_INTENT_LIQUIDATION = 1,
  SIGNING_INTENT_DEFAULT_LIQUIDATION = 2,
  SIGNING_INTENT_REDEMPTION = 3,
  UNRECOGNIZED = -1,
}
export const SigningIntentSDKType = SigningIntent;
export const SigningIntentAmino = SigningIntent;
export function signingIntentFromJSON(object: any): SigningIntent {
  switch (object) {
    case 0:
    case "SIGNING_INTENT_REPAYMENT":
      return SigningIntent.SIGNING_INTENT_REPAYMENT;
    case 1:
    case "SIGNING_INTENT_LIQUIDATION":
      return SigningIntent.SIGNING_INTENT_LIQUIDATION;
    case 2:
    case "SIGNING_INTENT_DEFAULT_LIQUIDATION":
      return SigningIntent.SIGNING_INTENT_DEFAULT_LIQUIDATION;
    case 3:
    case "SIGNING_INTENT_REDEMPTION":
      return SigningIntent.SIGNING_INTENT_REDEMPTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SigningIntent.UNRECOGNIZED;
  }
}
export function signingIntentToJSON(object: SigningIntent): string {
  switch (object) {
    case SigningIntent.SIGNING_INTENT_REPAYMENT:
      return "SIGNING_INTENT_REPAYMENT";
    case SigningIntent.SIGNING_INTENT_LIQUIDATION:
      return "SIGNING_INTENT_LIQUIDATION";
    case SigningIntent.SIGNING_INTENT_DEFAULT_LIQUIDATION:
      return "SIGNING_INTENT_DEFAULT_LIQUIDATION";
    case SigningIntent.SIGNING_INTENT_REDEMPTION:
      return "SIGNING_INTENT_REDEMPTION";
    case SigningIntent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Asset metadata */
export interface AssetMetadata {
  denom: string;
  symbol: string;
  decimals: number;
  priceSymbol: string;
  isBasePriceAsset: boolean;
}
export interface AssetMetadataProtoMsg {
  typeUrl: "/side.lending.AssetMetadata";
  value: Uint8Array;
}
/** Asset metadata */
export interface AssetMetadataAmino {
  denom?: string;
  symbol?: string;
  decimals?: number;
  price_symbol?: string;
  is_base_price_asset?: boolean;
}
export interface AssetMetadataAminoMsg {
  type: "/side.lending.AssetMetadata";
  value: AssetMetadataAmino;
}
/** Asset metadata */
export interface AssetMetadataSDKType {
  denom: string;
  symbol: string;
  decimals: number;
  price_symbol: string;
  is_base_price_asset: boolean;
}
/** Pool tranche config */
export interface PoolTrancheConfig {
  /** maturity duration in seconds */
  maturity: bigint;
  /** borrow apr permille */
  borrowApr: number;
}
export interface PoolTrancheConfigProtoMsg {
  typeUrl: "/side.lending.PoolTrancheConfig";
  value: Uint8Array;
}
/** Pool tranche config */
export interface PoolTrancheConfigAmino {
  /** maturity duration in seconds */
  maturity?: string;
  /** borrow apr permille */
  borrow_apr?: number;
}
export interface PoolTrancheConfigAminoMsg {
  type: "/side.lending.PoolTrancheConfig";
  value: PoolTrancheConfigAmino;
}
/** Pool tranche config */
export interface PoolTrancheConfigSDKType {
  maturity: bigint;
  borrow_apr: number;
}
/** Pool config */
export interface PoolConfig {
  /** collateral asset metadata */
  collateralAsset: AssetMetadata;
  /** lending asset metadata */
  lendingAsset: AssetMetadata;
  /** supply cap */
  supplyCap: string;
  /** borrow cap */
  borrowCap: string;
  /** minimum amount to be borrowed */
  minBorrowAmount: string;
  /** maximum amount to be borrowed */
  maxBorrowAmount: string;
  /** tranches */
  tranches: PoolTrancheConfig[];
  /** request fee */
  requestFee: Coin;
  /** origination fee factor permille */
  originationFeeFactor: number;
  /** reserve factor permille */
  reserveFactor: number;
  /** maximum ltv percent */
  maxLtv: number;
  /** liquidation ltv percent */
  liquidationThreshold: number;
  /** indicates if the pool is paused */
  paused: boolean;
}
export interface PoolConfigProtoMsg {
  typeUrl: "/side.lending.PoolConfig";
  value: Uint8Array;
}
/** Pool config */
export interface PoolConfigAmino {
  /** collateral asset metadata */
  collateral_asset?: AssetMetadataAmino;
  /** lending asset metadata */
  lending_asset?: AssetMetadataAmino;
  /** supply cap */
  supply_cap?: string;
  /** borrow cap */
  borrow_cap?: string;
  /** minimum amount to be borrowed */
  min_borrow_amount?: string;
  /** maximum amount to be borrowed */
  max_borrow_amount?: string;
  /** tranches */
  tranches?: PoolTrancheConfigAmino[];
  /** request fee */
  request_fee?: CoinAmino;
  /** origination fee factor permille */
  origination_fee_factor?: number;
  /** reserve factor permille */
  reserve_factor?: number;
  /** maximum ltv percent */
  max_ltv?: number;
  /** liquidation ltv percent */
  liquidation_threshold?: number;
  /** indicates if the pool is paused */
  paused?: boolean;
}
export interface PoolConfigAminoMsg {
  type: "/side.lending.PoolConfig";
  value: PoolConfigAmino;
}
/** Pool config */
export interface PoolConfigSDKType {
  collateral_asset: AssetMetadataSDKType;
  lending_asset: AssetMetadataSDKType;
  supply_cap: string;
  borrow_cap: string;
  min_borrow_amount: string;
  max_borrow_amount: string;
  tranches: PoolTrancheConfigSDKType[];
  request_fee: CoinSDKType;
  origination_fee_factor: number;
  reserve_factor: number;
  max_ltv: number;
  liquidation_threshold: number;
  paused: boolean;
}
/** Pool tranche */
export interface PoolTranche {
  /** maturity duration */
  maturity: bigint;
  /** borrow index */
  borrowIndex: string;
  /** total borrowed */
  totalBorrowed: string;
  /** total reserve */
  totalReserve: string;
}
export interface PoolTrancheProtoMsg {
  typeUrl: "/side.lending.PoolTranche";
  value: Uint8Array;
}
/** Pool tranche */
export interface PoolTrancheAmino {
  /** maturity duration */
  maturity?: string;
  /** borrow index */
  borrow_index?: string;
  /** total borrowed */
  total_borrowed?: string;
  /** total reserve */
  total_reserve?: string;
}
export interface PoolTrancheAminoMsg {
  type: "/side.lending.PoolTranche";
  value: PoolTrancheAmino;
}
/** Pool tranche */
export interface PoolTrancheSDKType {
  maturity: bigint;
  borrow_index: string;
  total_borrowed: string;
  total_reserve: string;
}
export interface LendingPool {
  id: string;
  supply: Coin;
  availableAmount: string;
  borrowedAmount: string;
  totalBorrowed: string;
  reserveAmount: string;
  totalReserve: string;
  totalYtokens: Coin;
  tranches: PoolTranche[];
  config: PoolConfig;
  status: PoolStatus;
}
export interface LendingPoolProtoMsg {
  typeUrl: "/side.lending.LendingPool";
  value: Uint8Array;
}
export interface LendingPoolAmino {
  id?: string;
  supply?: CoinAmino;
  available_amount?: string;
  borrowed_amount?: string;
  total_borrowed?: string;
  reserve_amount?: string;
  total_reserve?: string;
  total_ytokens?: CoinAmino;
  tranches?: PoolTrancheAmino[];
  config?: PoolConfigAmino;
  status?: PoolStatus;
}
export interface LendingPoolAminoMsg {
  type: "/side.lending.LendingPool";
  value: LendingPoolAmino;
}
export interface LendingPoolSDKType {
  id: string;
  supply: CoinSDKType;
  available_amount: string;
  borrowed_amount: string;
  total_borrowed: string;
  reserve_amount: string;
  total_reserve: string;
  total_ytokens: CoinSDKType;
  tranches: PoolTrancheSDKType[];
  config: PoolConfigSDKType;
  status: PoolStatus;
}
/** Authorization with deposit txs for cets */
export interface Authorization {
  id: bigint;
  depositTxs: string[];
  status: AuthorizationStatus;
}
export interface AuthorizationProtoMsg {
  typeUrl: "/side.lending.Authorization";
  value: Uint8Array;
}
/** Authorization with deposit txs for cets */
export interface AuthorizationAmino {
  id?: string;
  deposit_txs?: string[];
  status?: AuthorizationStatus;
}
export interface AuthorizationAminoMsg {
  type: "/side.lending.Authorization";
  value: AuthorizationAmino;
}
/** Authorization with deposit txs for cets */
export interface AuthorizationSDKType {
  id: bigint;
  deposit_txs: string[];
  status: AuthorizationStatus;
}
export interface Loan {
  /** id */
  vaultAddress: string;
  borrower: string;
  borrowerPubKey: string;
  borrowerAuthPubKey: string;
  dcm: string;
  maturityTime: bigint;
  finalTimeout: bigint;
  poolId: string;
  borrowAmount: Coin;
  requestFee: Coin;
  originationFee: string;
  interest: string;
  protocolFee: string;
  maturity: bigint;
  borrowApr: number;
  startBorrowIndex: string;
  liquidationPrice: string;
  dlcEventId: bigint;
  authorizations: Authorization[];
  collateralAmount: string;
  liquidationId: bigint;
  referrer?: Referrer;
  createAt: Date;
  disburseAt: Date;
  status: LoanStatus;
}
export interface LoanProtoMsg {
  typeUrl: "/side.lending.Loan";
  value: Uint8Array;
}
export interface LoanAmino {
  /** id */
  vault_address?: string;
  borrower?: string;
  borrowerPubKey?: string;
  borrowerAuthPubKey?: string;
  dcm?: string;
  maturity_time?: string;
  final_timeout?: string;
  pool_id?: string;
  borrow_amount?: CoinAmino;
  request_fee?: CoinAmino;
  origination_fee?: string;
  interest?: string;
  protocol_fee?: string;
  maturity?: string;
  borrow_apr?: number;
  start_borrow_index?: string;
  liquidation_price?: string;
  dlc_event_id?: string;
  authorizations?: AuthorizationAmino[];
  collateral_amount?: string;
  liquidation_id?: string;
  referrer?: ReferrerAmino;
  create_at?: string;
  disburse_at?: string;
  status?: LoanStatus;
}
export interface LoanAminoMsg {
  type: "/side.lending.Loan";
  value: LoanAmino;
}
export interface LoanSDKType {
  vault_address: string;
  borrower: string;
  borrowerPubKey: string;
  borrowerAuthPubKey: string;
  dcm: string;
  maturity_time: bigint;
  final_timeout: bigint;
  pool_id: string;
  borrow_amount: CoinSDKType;
  request_fee: CoinSDKType;
  origination_fee: string;
  interest: string;
  protocol_fee: string;
  maturity: bigint;
  borrow_apr: number;
  start_borrow_index: string;
  liquidation_price: string;
  dlc_event_id: bigint;
  authorizations: AuthorizationSDKType[];
  collateral_amount: string;
  liquidation_id: bigint;
  referrer?: ReferrerSDKType;
  create_at: Date;
  disburse_at: Date;
  status: LoanStatus;
}
/** Referrer defines the referrer */
export interface Referrer {
  /** Optional name */
  name: string;
  /** Unique referral code with 8 alphanumeric characters */
  referralCode: string;
  /** Referrer address */
  address: string;
  /** Referral fee factor */
  referralFeeFactor: string;
}
export interface ReferrerProtoMsg {
  typeUrl: "/side.lending.Referrer";
  value: Uint8Array;
}
/** Referrer defines the referrer */
export interface ReferrerAmino {
  /** Optional name */
  name?: string;
  /** Unique referral code with 8 alphanumeric characters */
  referral_code?: string;
  /** Referrer address */
  address?: string;
  /** Referral fee factor */
  referral_fee_factor?: string;
}
export interface ReferrerAminoMsg {
  type: "/side.lending.Referrer";
  value: ReferrerAmino;
}
/** Referrer defines the referrer */
export interface ReferrerSDKType {
  name: string;
  referral_code: string;
  address: string;
  referral_fee_factor: string;
}
/** LeafScript defines the tap leaf script */
export interface LeafScript {
  script: string;
  controlBlock: string;
}
export interface LeafScriptProtoMsg {
  typeUrl: "/side.lending.LeafScript";
  value: Uint8Array;
}
/** LeafScript defines the tap leaf script */
export interface LeafScriptAmino {
  script?: string;
  control_block?: string;
}
export interface LeafScriptAminoMsg {
  type: "/side.lending.LeafScript";
  value: LeafScriptAmino;
}
/** LeafScript defines the tap leaf script */
export interface LeafScriptSDKType {
  script: string;
  control_block: string;
}
export interface CetInfo {
  eventId: bigint;
  outcomeIndex: number;
  signaturePoint: string;
  script: LeafScript;
}
export interface CetInfoProtoMsg {
  typeUrl: "/side.lending.CetInfo";
  value: Uint8Array;
}
export interface CetInfoAmino {
  event_id?: string;
  outcome_index?: number;
  signature_point?: string;
  script?: LeafScriptAmino;
}
export interface CetInfoAminoMsg {
  type: "/side.lending.CetInfo";
  value: CetInfoAmino;
}
export interface CetInfoSDKType {
  event_id: bigint;
  outcome_index: number;
  signature_point: string;
  script: LeafScriptSDKType;
}
export interface LiquidationCet {
  tx: string;
  borrowerAdaptorSignatures: string[];
  borrowerAdaptedSignatures: string[];
  dcmSignatures: string[];
  signedTxHex: string;
}
export interface LiquidationCetProtoMsg {
  typeUrl: "/side.lending.LiquidationCet";
  value: Uint8Array;
}
export interface LiquidationCetAmino {
  tx?: string;
  borrower_adaptor_signatures?: string[];
  borrower_adapted_signatures?: string[];
  dcm_signatures?: string[];
  signed_tx_hex?: string;
}
export interface LiquidationCetAminoMsg {
  type: "/side.lending.LiquidationCet";
  value: LiquidationCetAmino;
}
export interface LiquidationCetSDKType {
  tx: string;
  borrower_adaptor_signatures: string[];
  borrower_adapted_signatures: string[];
  dcm_signatures: string[];
  signed_tx_hex: string;
}
export interface RepaymentCet {
  tx: string;
  dcmAdaptorSignatures: string[];
  dcmAdaptedSignatures: string[];
  borrowerSignatures: string[];
  signedTxHex: string;
}
export interface RepaymentCetProtoMsg {
  typeUrl: "/side.lending.RepaymentCet";
  value: Uint8Array;
}
export interface RepaymentCetAmino {
  tx?: string;
  dcm_adaptor_signatures?: string[];
  dcm_adapted_signatures?: string[];
  borrower_signatures?: string[];
  signed_tx_hex?: string;
}
export interface RepaymentCetAminoMsg {
  type: "/side.lending.RepaymentCet";
  value: RepaymentCetAmino;
}
export interface RepaymentCetSDKType {
  tx: string;
  dcm_adaptor_signatures: string[];
  dcm_adapted_signatures: string[];
  borrower_signatures: string[];
  signed_tx_hex: string;
}
export interface DLCMeta {
  liquidationCet: LiquidationCet;
  defaultLiquidationCet: LiquidationCet;
  repaymentCet: RepaymentCet;
  timeoutRefundTx: string;
  vaultUtxos: UTXO[];
  internalKey: string;
  liquidationScript: LeafScript;
  repaymentScript: LeafScript;
  timeoutRefundScript: LeafScript;
}
export interface DLCMetaProtoMsg {
  typeUrl: "/side.lending.DLCMeta";
  value: Uint8Array;
}
export interface DLCMetaAmino {
  liquidation_cet?: LiquidationCetAmino;
  default_liquidation_cet?: LiquidationCetAmino;
  repayment_cet?: RepaymentCetAmino;
  timeout_refund_tx?: string;
  vault_utxos?: UTXOAmino[];
  internal_key?: string;
  liquidation_script?: LeafScriptAmino;
  repayment_script?: LeafScriptAmino;
  timeout_refund_script?: LeafScriptAmino;
}
export interface DLCMetaAminoMsg {
  type: "/side.lending.DLCMeta";
  value: DLCMetaAmino;
}
export interface DLCMetaSDKType {
  liquidation_cet: LiquidationCetSDKType;
  default_liquidation_cet: LiquidationCetSDKType;
  repayment_cet: RepaymentCetSDKType;
  timeout_refund_tx: string;
  vault_utxos: UTXOSDKType[];
  internal_key: string;
  liquidation_script: LeafScriptSDKType;
  repayment_script: LeafScriptSDKType;
  timeout_refund_script: LeafScriptSDKType;
}
export interface DepositLog {
  txid: string;
  vaultAddress: string;
  authorizationId: bigint;
  depositTx: string;
  status: DepositStatus;
}
export interface DepositLogProtoMsg {
  typeUrl: "/side.lending.DepositLog";
  value: Uint8Array;
}
export interface DepositLogAmino {
  txid?: string;
  vault_address?: string;
  authorization_id?: string;
  deposit_tx?: string;
  status?: DepositStatus;
}
export interface DepositLogAminoMsg {
  type: "/side.lending.DepositLog";
  value: DepositLogAmino;
}
export interface DepositLogSDKType {
  txid: string;
  vault_address: string;
  authorization_id: bigint;
  deposit_tx: string;
  status: DepositStatus;
}
export interface Repayment {
  loanId: string;
  amount: Coin;
  createAt: Date;
}
export interface RepaymentProtoMsg {
  typeUrl: "/side.lending.Repayment";
  value: Uint8Array;
}
export interface RepaymentAmino {
  loan_id?: string;
  amount?: CoinAmino;
  create_at?: string;
}
export interface RepaymentAminoMsg {
  type: "/side.lending.Repayment";
  value: RepaymentAmino;
}
export interface RepaymentSDKType {
  loan_id: string;
  amount: CoinSDKType;
  create_at: Date;
}
export interface Redemption {
  id: bigint;
  loanId: string;
  txid: string;
  tx: string;
  signatures: string[];
  dcmSignatures: string[];
  createAt: Date;
}
export interface RedemptionProtoMsg {
  typeUrl: "/side.lending.Redemption";
  value: Uint8Array;
}
export interface RedemptionAmino {
  id?: string;
  loan_id?: string;
  txid?: string;
  tx?: string;
  signatures?: string[];
  dcm_signatures?: string[];
  create_at?: string;
}
export interface RedemptionAminoMsg {
  type: "/side.lending.Redemption";
  value: RedemptionAmino;
}
export interface RedemptionSDKType {
  id: bigint;
  loan_id: string;
  txid: string;
  tx: string;
  signatures: string[];
  dcm_signatures: string[];
  create_at: Date;
}
function createBaseAssetMetadata(): AssetMetadata {
  return {
    denom: "",
    symbol: "",
    decimals: 0,
    priceSymbol: "",
    isBasePriceAsset: false
  };
}
export const AssetMetadata = {
  typeUrl: "/side.lending.AssetMetadata",
  encode(message: AssetMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.decimals !== 0) {
      writer.uint32(24).int32(message.decimals);
    }
    if (message.priceSymbol !== "") {
      writer.uint32(34).string(message.priceSymbol);
    }
    if (message.isBasePriceAsset === true) {
      writer.uint32(40).bool(message.isBasePriceAsset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AssetMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.decimals = reader.int32();
          break;
        case 4:
          message.priceSymbol = reader.string();
          break;
        case 5:
          message.isBasePriceAsset = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetMetadata>): AssetMetadata {
    const message = createBaseAssetMetadata();
    message.denom = object.denom ?? "";
    message.symbol = object.symbol ?? "";
    message.decimals = object.decimals ?? 0;
    message.priceSymbol = object.priceSymbol ?? "";
    message.isBasePriceAsset = object.isBasePriceAsset ?? false;
    return message;
  },
  fromAmino(object: AssetMetadataAmino): AssetMetadata {
    const message = createBaseAssetMetadata();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = object.decimals;
    }
    if (object.price_symbol !== undefined && object.price_symbol !== null) {
      message.priceSymbol = object.price_symbol;
    }
    if (object.is_base_price_asset !== undefined && object.is_base_price_asset !== null) {
      message.isBasePriceAsset = object.is_base_price_asset;
    }
    return message;
  },
  toAmino(message: AssetMetadata): AssetMetadataAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    obj.decimals = message.decimals === 0 ? undefined : message.decimals;
    obj.price_symbol = message.priceSymbol === "" ? undefined : message.priceSymbol;
    obj.is_base_price_asset = message.isBasePriceAsset === false ? undefined : message.isBasePriceAsset;
    return obj;
  },
  fromAminoMsg(object: AssetMetadataAminoMsg): AssetMetadata {
    return AssetMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetMetadataProtoMsg): AssetMetadata {
    return AssetMetadata.decode(message.value);
  },
  toProto(message: AssetMetadata): Uint8Array {
    return AssetMetadata.encode(message).finish();
  },
  toProtoMsg(message: AssetMetadata): AssetMetadataProtoMsg {
    return {
      typeUrl: "/side.lending.AssetMetadata",
      value: AssetMetadata.encode(message).finish()
    };
  }
};
function createBasePoolTrancheConfig(): PoolTrancheConfig {
  return {
    maturity: BigInt(0),
    borrowApr: 0
  };
}
export const PoolTrancheConfig = {
  typeUrl: "/side.lending.PoolTrancheConfig",
  encode(message: PoolTrancheConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturity !== BigInt(0)) {
      writer.uint32(8).int64(message.maturity);
    }
    if (message.borrowApr !== 0) {
      writer.uint32(16).uint32(message.borrowApr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PoolTrancheConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolTrancheConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maturity = reader.int64();
          break;
        case 2:
          message.borrowApr = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolTrancheConfig>): PoolTrancheConfig {
    const message = createBasePoolTrancheConfig();
    message.maturity = object.maturity !== undefined && object.maturity !== null ? BigInt(object.maturity.toString()) : BigInt(0);
    message.borrowApr = object.borrowApr ?? 0;
    return message;
  },
  fromAmino(object: PoolTrancheConfigAmino): PoolTrancheConfig {
    const message = createBasePoolTrancheConfig();
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = BigInt(object.maturity);
    }
    if (object.borrow_apr !== undefined && object.borrow_apr !== null) {
      message.borrowApr = object.borrow_apr;
    }
    return message;
  },
  toAmino(message: PoolTrancheConfig): PoolTrancheConfigAmino {
    const obj: any = {};
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.borrow_apr = message.borrowApr === 0 ? undefined : message.borrowApr;
    return obj;
  },
  fromAminoMsg(object: PoolTrancheConfigAminoMsg): PoolTrancheConfig {
    return PoolTrancheConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolTrancheConfigProtoMsg): PoolTrancheConfig {
    return PoolTrancheConfig.decode(message.value);
  },
  toProto(message: PoolTrancheConfig): Uint8Array {
    return PoolTrancheConfig.encode(message).finish();
  },
  toProtoMsg(message: PoolTrancheConfig): PoolTrancheConfigProtoMsg {
    return {
      typeUrl: "/side.lending.PoolTrancheConfig",
      value: PoolTrancheConfig.encode(message).finish()
    };
  }
};
function createBasePoolConfig(): PoolConfig {
  return {
    collateralAsset: AssetMetadata.fromPartial({}),
    lendingAsset: AssetMetadata.fromPartial({}),
    supplyCap: "",
    borrowCap: "",
    minBorrowAmount: "",
    maxBorrowAmount: "",
    tranches: [],
    requestFee: Coin.fromPartial({}),
    originationFeeFactor: 0,
    reserveFactor: 0,
    maxLtv: 0,
    liquidationThreshold: 0,
    paused: false
  };
}
export const PoolConfig = {
  typeUrl: "/side.lending.PoolConfig",
  encode(message: PoolConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.collateralAsset !== undefined) {
      AssetMetadata.encode(message.collateralAsset, writer.uint32(10).fork()).ldelim();
    }
    if (message.lendingAsset !== undefined) {
      AssetMetadata.encode(message.lendingAsset, writer.uint32(18).fork()).ldelim();
    }
    if (message.supplyCap !== "") {
      writer.uint32(26).string(message.supplyCap);
    }
    if (message.borrowCap !== "") {
      writer.uint32(34).string(message.borrowCap);
    }
    if (message.minBorrowAmount !== "") {
      writer.uint32(42).string(message.minBorrowAmount);
    }
    if (message.maxBorrowAmount !== "") {
      writer.uint32(50).string(message.maxBorrowAmount);
    }
    for (const v of message.tranches) {
      PoolTrancheConfig.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.requestFee !== undefined) {
      Coin.encode(message.requestFee, writer.uint32(66).fork()).ldelim();
    }
    if (message.originationFeeFactor !== 0) {
      writer.uint32(72).uint32(message.originationFeeFactor);
    }
    if (message.reserveFactor !== 0) {
      writer.uint32(80).uint32(message.reserveFactor);
    }
    if (message.maxLtv !== 0) {
      writer.uint32(88).uint32(message.maxLtv);
    }
    if (message.liquidationThreshold !== 0) {
      writer.uint32(96).uint32(message.liquidationThreshold);
    }
    if (message.paused === true) {
      writer.uint32(104).bool(message.paused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PoolConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralAsset = AssetMetadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.lendingAsset = AssetMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.supplyCap = reader.string();
          break;
        case 4:
          message.borrowCap = reader.string();
          break;
        case 5:
          message.minBorrowAmount = reader.string();
          break;
        case 6:
          message.maxBorrowAmount = reader.string();
          break;
        case 7:
          message.tranches.push(PoolTrancheConfig.decode(reader, reader.uint32()));
          break;
        case 8:
          message.requestFee = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.originationFeeFactor = reader.uint32();
          break;
        case 10:
          message.reserveFactor = reader.uint32();
          break;
        case 11:
          message.maxLtv = reader.uint32();
          break;
        case 12:
          message.liquidationThreshold = reader.uint32();
          break;
        case 13:
          message.paused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolConfig>): PoolConfig {
    const message = createBasePoolConfig();
    message.collateralAsset = object.collateralAsset !== undefined && object.collateralAsset !== null ? AssetMetadata.fromPartial(object.collateralAsset) : undefined;
    message.lendingAsset = object.lendingAsset !== undefined && object.lendingAsset !== null ? AssetMetadata.fromPartial(object.lendingAsset) : undefined;
    message.supplyCap = object.supplyCap ?? "";
    message.borrowCap = object.borrowCap ?? "";
    message.minBorrowAmount = object.minBorrowAmount ?? "";
    message.maxBorrowAmount = object.maxBorrowAmount ?? "";
    message.tranches = object.tranches?.map(e => PoolTrancheConfig.fromPartial(e)) || [];
    message.requestFee = object.requestFee !== undefined && object.requestFee !== null ? Coin.fromPartial(object.requestFee) : undefined;
    message.originationFeeFactor = object.originationFeeFactor ?? 0;
    message.reserveFactor = object.reserveFactor ?? 0;
    message.maxLtv = object.maxLtv ?? 0;
    message.liquidationThreshold = object.liquidationThreshold ?? 0;
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: PoolConfigAmino): PoolConfig {
    const message = createBasePoolConfig();
    if (object.collateral_asset !== undefined && object.collateral_asset !== null) {
      message.collateralAsset = AssetMetadata.fromAmino(object.collateral_asset);
    }
    if (object.lending_asset !== undefined && object.lending_asset !== null) {
      message.lendingAsset = AssetMetadata.fromAmino(object.lending_asset);
    }
    if (object.supply_cap !== undefined && object.supply_cap !== null) {
      message.supplyCap = object.supply_cap;
    }
    if (object.borrow_cap !== undefined && object.borrow_cap !== null) {
      message.borrowCap = object.borrow_cap;
    }
    if (object.min_borrow_amount !== undefined && object.min_borrow_amount !== null) {
      message.minBorrowAmount = object.min_borrow_amount;
    }
    if (object.max_borrow_amount !== undefined && object.max_borrow_amount !== null) {
      message.maxBorrowAmount = object.max_borrow_amount;
    }
    message.tranches = object.tranches?.map(e => PoolTrancheConfig.fromAmino(e)) || [];
    if (object.request_fee !== undefined && object.request_fee !== null) {
      message.requestFee = Coin.fromAmino(object.request_fee);
    }
    if (object.origination_fee_factor !== undefined && object.origination_fee_factor !== null) {
      message.originationFeeFactor = object.origination_fee_factor;
    }
    if (object.reserve_factor !== undefined && object.reserve_factor !== null) {
      message.reserveFactor = object.reserve_factor;
    }
    if (object.max_ltv !== undefined && object.max_ltv !== null) {
      message.maxLtv = object.max_ltv;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    return message;
  },
  toAmino(message: PoolConfig): PoolConfigAmino {
    const obj: any = {};
    obj.collateral_asset = message.collateralAsset ? AssetMetadata.toAmino(message.collateralAsset) : undefined;
    obj.lending_asset = message.lendingAsset ? AssetMetadata.toAmino(message.lendingAsset) : undefined;
    obj.supply_cap = message.supplyCap === "" ? undefined : message.supplyCap;
    obj.borrow_cap = message.borrowCap === "" ? undefined : message.borrowCap;
    obj.min_borrow_amount = message.minBorrowAmount === "" ? undefined : message.minBorrowAmount;
    obj.max_borrow_amount = message.maxBorrowAmount === "" ? undefined : message.maxBorrowAmount;
    if (message.tranches) {
      obj.tranches = message.tranches.map(e => e ? PoolTrancheConfig.toAmino(e) : undefined);
    } else {
      obj.tranches = message.tranches;
    }
    obj.request_fee = message.requestFee ? Coin.toAmino(message.requestFee) : undefined;
    obj.origination_fee_factor = message.originationFeeFactor === 0 ? undefined : message.originationFeeFactor;
    obj.reserve_factor = message.reserveFactor === 0 ? undefined : message.reserveFactor;
    obj.max_ltv = message.maxLtv === 0 ? undefined : message.maxLtv;
    obj.liquidation_threshold = message.liquidationThreshold === 0 ? undefined : message.liquidationThreshold;
    obj.paused = message.paused === false ? undefined : message.paused;
    return obj;
  },
  fromAminoMsg(object: PoolConfigAminoMsg): PoolConfig {
    return PoolConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolConfigProtoMsg): PoolConfig {
    return PoolConfig.decode(message.value);
  },
  toProto(message: PoolConfig): Uint8Array {
    return PoolConfig.encode(message).finish();
  },
  toProtoMsg(message: PoolConfig): PoolConfigProtoMsg {
    return {
      typeUrl: "/side.lending.PoolConfig",
      value: PoolConfig.encode(message).finish()
    };
  }
};
function createBasePoolTranche(): PoolTranche {
  return {
    maturity: BigInt(0),
    borrowIndex: "",
    totalBorrowed: "",
    totalReserve: ""
  };
}
export const PoolTranche = {
  typeUrl: "/side.lending.PoolTranche",
  encode(message: PoolTranche, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maturity !== BigInt(0)) {
      writer.uint32(8).int64(message.maturity);
    }
    if (message.borrowIndex !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.borrowIndex, 18).atomics);
    }
    if (message.totalBorrowed !== "") {
      writer.uint32(26).string(message.totalBorrowed);
    }
    if (message.totalReserve !== "") {
      writer.uint32(34).string(message.totalReserve);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PoolTranche {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolTranche();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maturity = reader.int64();
          break;
        case 2:
          message.borrowIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.totalBorrowed = reader.string();
          break;
        case 4:
          message.totalReserve = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolTranche>): PoolTranche {
    const message = createBasePoolTranche();
    message.maturity = object.maturity !== undefined && object.maturity !== null ? BigInt(object.maturity.toString()) : BigInt(0);
    message.borrowIndex = object.borrowIndex ?? "";
    message.totalBorrowed = object.totalBorrowed ?? "";
    message.totalReserve = object.totalReserve ?? "";
    return message;
  },
  fromAmino(object: PoolTrancheAmino): PoolTranche {
    const message = createBasePoolTranche();
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = BigInt(object.maturity);
    }
    if (object.borrow_index !== undefined && object.borrow_index !== null) {
      message.borrowIndex = object.borrow_index;
    }
    if (object.total_borrowed !== undefined && object.total_borrowed !== null) {
      message.totalBorrowed = object.total_borrowed;
    }
    if (object.total_reserve !== undefined && object.total_reserve !== null) {
      message.totalReserve = object.total_reserve;
    }
    return message;
  },
  toAmino(message: PoolTranche): PoolTrancheAmino {
    const obj: any = {};
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.borrow_index = message.borrowIndex === "" ? undefined : message.borrowIndex;
    obj.total_borrowed = message.totalBorrowed === "" ? undefined : message.totalBorrowed;
    obj.total_reserve = message.totalReserve === "" ? undefined : message.totalReserve;
    return obj;
  },
  fromAminoMsg(object: PoolTrancheAminoMsg): PoolTranche {
    return PoolTranche.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolTrancheProtoMsg): PoolTranche {
    return PoolTranche.decode(message.value);
  },
  toProto(message: PoolTranche): Uint8Array {
    return PoolTranche.encode(message).finish();
  },
  toProtoMsg(message: PoolTranche): PoolTrancheProtoMsg {
    return {
      typeUrl: "/side.lending.PoolTranche",
      value: PoolTranche.encode(message).finish()
    };
  }
};
function createBaseLendingPool(): LendingPool {
  return {
    id: "",
    supply: Coin.fromPartial({}),
    availableAmount: "",
    borrowedAmount: "",
    totalBorrowed: "",
    reserveAmount: "",
    totalReserve: "",
    totalYtokens: Coin.fromPartial({}),
    tranches: [],
    config: PoolConfig.fromPartial({}),
    status: 0
  };
}
export const LendingPool = {
  typeUrl: "/side.lending.LendingPool",
  encode(message: LendingPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.supply !== undefined) {
      Coin.encode(message.supply, writer.uint32(18).fork()).ldelim();
    }
    if (message.availableAmount !== "") {
      writer.uint32(26).string(message.availableAmount);
    }
    if (message.borrowedAmount !== "") {
      writer.uint32(34).string(message.borrowedAmount);
    }
    if (message.totalBorrowed !== "") {
      writer.uint32(42).string(message.totalBorrowed);
    }
    if (message.reserveAmount !== "") {
      writer.uint32(50).string(message.reserveAmount);
    }
    if (message.totalReserve !== "") {
      writer.uint32(58).string(message.totalReserve);
    }
    if (message.totalYtokens !== undefined) {
      Coin.encode(message.totalYtokens, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.tranches) {
      PoolTranche.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.config !== undefined) {
      PoolConfig.encode(message.config, writer.uint32(82).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LendingPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLendingPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.supply = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.availableAmount = reader.string();
          break;
        case 4:
          message.borrowedAmount = reader.string();
          break;
        case 5:
          message.totalBorrowed = reader.string();
          break;
        case 6:
          message.reserveAmount = reader.string();
          break;
        case 7:
          message.totalReserve = reader.string();
          break;
        case 8:
          message.totalYtokens = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.tranches.push(PoolTranche.decode(reader, reader.uint32()));
          break;
        case 10:
          message.config = PoolConfig.decode(reader, reader.uint32());
          break;
        case 11:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LendingPool>): LendingPool {
    const message = createBaseLendingPool();
    message.id = object.id ?? "";
    message.supply = object.supply !== undefined && object.supply !== null ? Coin.fromPartial(object.supply) : undefined;
    message.availableAmount = object.availableAmount ?? "";
    message.borrowedAmount = object.borrowedAmount ?? "";
    message.totalBorrowed = object.totalBorrowed ?? "";
    message.reserveAmount = object.reserveAmount ?? "";
    message.totalReserve = object.totalReserve ?? "";
    message.totalYtokens = object.totalYtokens !== undefined && object.totalYtokens !== null ? Coin.fromPartial(object.totalYtokens) : undefined;
    message.tranches = object.tranches?.map(e => PoolTranche.fromPartial(e)) || [];
    message.config = object.config !== undefined && object.config !== null ? PoolConfig.fromPartial(object.config) : undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: LendingPoolAmino): LendingPool {
    const message = createBaseLendingPool();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.supply !== undefined && object.supply !== null) {
      message.supply = Coin.fromAmino(object.supply);
    }
    if (object.available_amount !== undefined && object.available_amount !== null) {
      message.availableAmount = object.available_amount;
    }
    if (object.borrowed_amount !== undefined && object.borrowed_amount !== null) {
      message.borrowedAmount = object.borrowed_amount;
    }
    if (object.total_borrowed !== undefined && object.total_borrowed !== null) {
      message.totalBorrowed = object.total_borrowed;
    }
    if (object.reserve_amount !== undefined && object.reserve_amount !== null) {
      message.reserveAmount = object.reserve_amount;
    }
    if (object.total_reserve !== undefined && object.total_reserve !== null) {
      message.totalReserve = object.total_reserve;
    }
    if (object.total_ytokens !== undefined && object.total_ytokens !== null) {
      message.totalYtokens = Coin.fromAmino(object.total_ytokens);
    }
    message.tranches = object.tranches?.map(e => PoolTranche.fromAmino(e)) || [];
    if (object.config !== undefined && object.config !== null) {
      message.config = PoolConfig.fromAmino(object.config);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: LendingPool): LendingPoolAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.supply = message.supply ? Coin.toAmino(message.supply) : undefined;
    obj.available_amount = message.availableAmount === "" ? undefined : message.availableAmount;
    obj.borrowed_amount = message.borrowedAmount === "" ? undefined : message.borrowedAmount;
    obj.total_borrowed = message.totalBorrowed === "" ? undefined : message.totalBorrowed;
    obj.reserve_amount = message.reserveAmount === "" ? undefined : message.reserveAmount;
    obj.total_reserve = message.totalReserve === "" ? undefined : message.totalReserve;
    obj.total_ytokens = message.totalYtokens ? Coin.toAmino(message.totalYtokens) : undefined;
    if (message.tranches) {
      obj.tranches = message.tranches.map(e => e ? PoolTranche.toAmino(e) : undefined);
    } else {
      obj.tranches = message.tranches;
    }
    obj.config = message.config ? PoolConfig.toAmino(message.config) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: LendingPoolAminoMsg): LendingPool {
    return LendingPool.fromAmino(object.value);
  },
  fromProtoMsg(message: LendingPoolProtoMsg): LendingPool {
    return LendingPool.decode(message.value);
  },
  toProto(message: LendingPool): Uint8Array {
    return LendingPool.encode(message).finish();
  },
  toProtoMsg(message: LendingPool): LendingPoolProtoMsg {
    return {
      typeUrl: "/side.lending.LendingPool",
      value: LendingPool.encode(message).finish()
    };
  }
};
function createBaseAuthorization(): Authorization {
  return {
    id: BigInt(0),
    depositTxs: [],
    status: 0
  };
}
export const Authorization = {
  typeUrl: "/side.lending.Authorization",
  encode(message: Authorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.depositTxs) {
      writer.uint32(18).string(v!);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Authorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.depositTxs.push(reader.string());
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Authorization>): Authorization {
    const message = createBaseAuthorization();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.depositTxs = object.depositTxs?.map(e => e) || [];
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: AuthorizationAmino): Authorization {
    const message = createBaseAuthorization();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    message.depositTxs = object.deposit_txs?.map(e => e) || [];
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Authorization): AuthorizationAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.depositTxs) {
      obj.deposit_txs = message.depositTxs.map(e => e);
    } else {
      obj.deposit_txs = message.depositTxs;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: AuthorizationAminoMsg): Authorization {
    return Authorization.fromAmino(object.value);
  },
  fromProtoMsg(message: AuthorizationProtoMsg): Authorization {
    return Authorization.decode(message.value);
  },
  toProto(message: Authorization): Uint8Array {
    return Authorization.encode(message).finish();
  },
  toProtoMsg(message: Authorization): AuthorizationProtoMsg {
    return {
      typeUrl: "/side.lending.Authorization",
      value: Authorization.encode(message).finish()
    };
  }
};
function createBaseLoan(): Loan {
  return {
    vaultAddress: "",
    borrower: "",
    borrowerPubKey: "",
    borrowerAuthPubKey: "",
    dcm: "",
    maturityTime: BigInt(0),
    finalTimeout: BigInt(0),
    poolId: "",
    borrowAmount: Coin.fromPartial({}),
    requestFee: Coin.fromPartial({}),
    originationFee: "",
    interest: "",
    protocolFee: "",
    maturity: BigInt(0),
    borrowApr: 0,
    startBorrowIndex: "",
    liquidationPrice: "",
    dlcEventId: BigInt(0),
    authorizations: [],
    collateralAmount: "",
    liquidationId: BigInt(0),
    referrer: undefined,
    createAt: new Date(),
    disburseAt: new Date(),
    status: 0
  };
}
export const Loan = {
  typeUrl: "/side.lending.Loan",
  encode(message: Loan, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vaultAddress !== "") {
      writer.uint32(10).string(message.vaultAddress);
    }
    if (message.borrower !== "") {
      writer.uint32(18).string(message.borrower);
    }
    if (message.borrowerPubKey !== "") {
      writer.uint32(26).string(message.borrowerPubKey);
    }
    if (message.borrowerAuthPubKey !== "") {
      writer.uint32(34).string(message.borrowerAuthPubKey);
    }
    if (message.dcm !== "") {
      writer.uint32(42).string(message.dcm);
    }
    if (message.maturityTime !== BigInt(0)) {
      writer.uint32(48).int64(message.maturityTime);
    }
    if (message.finalTimeout !== BigInt(0)) {
      writer.uint32(56).int64(message.finalTimeout);
    }
    if (message.poolId !== "") {
      writer.uint32(66).string(message.poolId);
    }
    if (message.borrowAmount !== undefined) {
      Coin.encode(message.borrowAmount, writer.uint32(74).fork()).ldelim();
    }
    if (message.requestFee !== undefined) {
      Coin.encode(message.requestFee, writer.uint32(82).fork()).ldelim();
    }
    if (message.originationFee !== "") {
      writer.uint32(90).string(message.originationFee);
    }
    if (message.interest !== "") {
      writer.uint32(98).string(message.interest);
    }
    if (message.protocolFee !== "") {
      writer.uint32(106).string(message.protocolFee);
    }
    if (message.maturity !== BigInt(0)) {
      writer.uint32(112).int64(message.maturity);
    }
    if (message.borrowApr !== 0) {
      writer.uint32(120).uint32(message.borrowApr);
    }
    if (message.startBorrowIndex !== "") {
      writer.uint32(130).string(Decimal.fromUserInput(message.startBorrowIndex, 18).atomics);
    }
    if (message.liquidationPrice !== "") {
      writer.uint32(138).string(Decimal.fromUserInput(message.liquidationPrice, 18).atomics);
    }
    if (message.dlcEventId !== BigInt(0)) {
      writer.uint32(144).uint64(message.dlcEventId);
    }
    for (const v of message.authorizations) {
      Authorization.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    if (message.collateralAmount !== "") {
      writer.uint32(162).string(message.collateralAmount);
    }
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(168).uint64(message.liquidationId);
    }
    if (message.referrer !== undefined) {
      Referrer.encode(message.referrer, writer.uint32(178).fork()).ldelim();
    }
    if (message.createAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createAt), writer.uint32(186).fork()).ldelim();
    }
    if (message.disburseAt !== undefined) {
      Timestamp.encode(toTimestamp(message.disburseAt), writer.uint32(194).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(200).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Loan {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoan();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vaultAddress = reader.string();
          break;
        case 2:
          message.borrower = reader.string();
          break;
        case 3:
          message.borrowerPubKey = reader.string();
          break;
        case 4:
          message.borrowerAuthPubKey = reader.string();
          break;
        case 5:
          message.dcm = reader.string();
          break;
        case 6:
          message.maturityTime = reader.int64();
          break;
        case 7:
          message.finalTimeout = reader.int64();
          break;
        case 8:
          message.poolId = reader.string();
          break;
        case 9:
          message.borrowAmount = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.requestFee = Coin.decode(reader, reader.uint32());
          break;
        case 11:
          message.originationFee = reader.string();
          break;
        case 12:
          message.interest = reader.string();
          break;
        case 13:
          message.protocolFee = reader.string();
          break;
        case 14:
          message.maturity = reader.int64();
          break;
        case 15:
          message.borrowApr = reader.uint32();
          break;
        case 16:
          message.startBorrowIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 17:
          message.liquidationPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 18:
          message.dlcEventId = reader.uint64();
          break;
        case 19:
          message.authorizations.push(Authorization.decode(reader, reader.uint32()));
          break;
        case 20:
          message.collateralAmount = reader.string();
          break;
        case 21:
          message.liquidationId = reader.uint64();
          break;
        case 22:
          message.referrer = Referrer.decode(reader, reader.uint32());
          break;
        case 23:
          message.createAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 24:
          message.disburseAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 25:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Loan>): Loan {
    const message = createBaseLoan();
    message.vaultAddress = object.vaultAddress ?? "";
    message.borrower = object.borrower ?? "";
    message.borrowerPubKey = object.borrowerPubKey ?? "";
    message.borrowerAuthPubKey = object.borrowerAuthPubKey ?? "";
    message.dcm = object.dcm ?? "";
    message.maturityTime = object.maturityTime !== undefined && object.maturityTime !== null ? BigInt(object.maturityTime.toString()) : BigInt(0);
    message.finalTimeout = object.finalTimeout !== undefined && object.finalTimeout !== null ? BigInt(object.finalTimeout.toString()) : BigInt(0);
    message.poolId = object.poolId ?? "";
    message.borrowAmount = object.borrowAmount !== undefined && object.borrowAmount !== null ? Coin.fromPartial(object.borrowAmount) : undefined;
    message.requestFee = object.requestFee !== undefined && object.requestFee !== null ? Coin.fromPartial(object.requestFee) : undefined;
    message.originationFee = object.originationFee ?? "";
    message.interest = object.interest ?? "";
    message.protocolFee = object.protocolFee ?? "";
    message.maturity = object.maturity !== undefined && object.maturity !== null ? BigInt(object.maturity.toString()) : BigInt(0);
    message.borrowApr = object.borrowApr ?? 0;
    message.startBorrowIndex = object.startBorrowIndex ?? "";
    message.liquidationPrice = object.liquidationPrice ?? "";
    message.dlcEventId = object.dlcEventId !== undefined && object.dlcEventId !== null ? BigInt(object.dlcEventId.toString()) : BigInt(0);
    message.authorizations = object.authorizations?.map(e => Authorization.fromPartial(e)) || [];
    message.collateralAmount = object.collateralAmount ?? "";
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.referrer = object.referrer !== undefined && object.referrer !== null ? Referrer.fromPartial(object.referrer) : undefined;
    message.createAt = object.createAt ?? undefined;
    message.disburseAt = object.disburseAt ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: LoanAmino): Loan {
    const message = createBaseLoan();
    if (object.vault_address !== undefined && object.vault_address !== null) {
      message.vaultAddress = object.vault_address;
    }
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.borrowerPubKey !== undefined && object.borrowerPubKey !== null) {
      message.borrowerPubKey = object.borrowerPubKey;
    }
    if (object.borrowerAuthPubKey !== undefined && object.borrowerAuthPubKey !== null) {
      message.borrowerAuthPubKey = object.borrowerAuthPubKey;
    }
    if (object.dcm !== undefined && object.dcm !== null) {
      message.dcm = object.dcm;
    }
    if (object.maturity_time !== undefined && object.maturity_time !== null) {
      message.maturityTime = BigInt(object.maturity_time);
    }
    if (object.final_timeout !== undefined && object.final_timeout !== null) {
      message.finalTimeout = BigInt(object.final_timeout);
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = Coin.fromAmino(object.borrow_amount);
    }
    if (object.request_fee !== undefined && object.request_fee !== null) {
      message.requestFee = Coin.fromAmino(object.request_fee);
    }
    if (object.origination_fee !== undefined && object.origination_fee !== null) {
      message.originationFee = object.origination_fee;
    }
    if (object.interest !== undefined && object.interest !== null) {
      message.interest = object.interest;
    }
    if (object.protocol_fee !== undefined && object.protocol_fee !== null) {
      message.protocolFee = object.protocol_fee;
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = BigInt(object.maturity);
    }
    if (object.borrow_apr !== undefined && object.borrow_apr !== null) {
      message.borrowApr = object.borrow_apr;
    }
    if (object.start_borrow_index !== undefined && object.start_borrow_index !== null) {
      message.startBorrowIndex = object.start_borrow_index;
    }
    if (object.liquidation_price !== undefined && object.liquidation_price !== null) {
      message.liquidationPrice = object.liquidation_price;
    }
    if (object.dlc_event_id !== undefined && object.dlc_event_id !== null) {
      message.dlcEventId = BigInt(object.dlc_event_id);
    }
    message.authorizations = object.authorizations?.map(e => Authorization.fromAmino(e)) || [];
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    if (object.referrer !== undefined && object.referrer !== null) {
      message.referrer = Referrer.fromAmino(object.referrer);
    }
    if (object.create_at !== undefined && object.create_at !== null) {
      message.createAt = fromTimestamp(Timestamp.fromAmino(object.create_at));
    }
    if (object.disburse_at !== undefined && object.disburse_at !== null) {
      message.disburseAt = fromTimestamp(Timestamp.fromAmino(object.disburse_at));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Loan): LoanAmino {
    const obj: any = {};
    obj.vault_address = message.vaultAddress === "" ? undefined : message.vaultAddress;
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.borrowerPubKey = message.borrowerPubKey === "" ? undefined : message.borrowerPubKey;
    obj.borrowerAuthPubKey = message.borrowerAuthPubKey === "" ? undefined : message.borrowerAuthPubKey;
    obj.dcm = message.dcm === "" ? undefined : message.dcm;
    obj.maturity_time = message.maturityTime !== BigInt(0) ? message.maturityTime.toString() : undefined;
    obj.final_timeout = message.finalTimeout !== BigInt(0) ? message.finalTimeout.toString() : undefined;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.borrow_amount = message.borrowAmount ? Coin.toAmino(message.borrowAmount) : undefined;
    obj.request_fee = message.requestFee ? Coin.toAmino(message.requestFee) : undefined;
    obj.origination_fee = message.originationFee === "" ? undefined : message.originationFee;
    obj.interest = message.interest === "" ? undefined : message.interest;
    obj.protocol_fee = message.protocolFee === "" ? undefined : message.protocolFee;
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.borrow_apr = message.borrowApr === 0 ? undefined : message.borrowApr;
    obj.start_borrow_index = message.startBorrowIndex === "" ? undefined : message.startBorrowIndex;
    obj.liquidation_price = message.liquidationPrice === "" ? undefined : message.liquidationPrice;
    obj.dlc_event_id = message.dlcEventId !== BigInt(0) ? message.dlcEventId.toString() : undefined;
    if (message.authorizations) {
      obj.authorizations = message.authorizations.map(e => e ? Authorization.toAmino(e) : undefined);
    } else {
      obj.authorizations = message.authorizations;
    }
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    obj.referrer = message.referrer ? Referrer.toAmino(message.referrer) : undefined;
    obj.create_at = message.createAt ? Timestamp.toAmino(toTimestamp(message.createAt)) : undefined;
    obj.disburse_at = message.disburseAt ? Timestamp.toAmino(toTimestamp(message.disburseAt)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: LoanAminoMsg): Loan {
    return Loan.fromAmino(object.value);
  },
  fromProtoMsg(message: LoanProtoMsg): Loan {
    return Loan.decode(message.value);
  },
  toProto(message: Loan): Uint8Array {
    return Loan.encode(message).finish();
  },
  toProtoMsg(message: Loan): LoanProtoMsg {
    return {
      typeUrl: "/side.lending.Loan",
      value: Loan.encode(message).finish()
    };
  }
};
function createBaseReferrer(): Referrer {
  return {
    name: "",
    referralCode: "",
    address: "",
    referralFeeFactor: ""
  };
}
export const Referrer = {
  typeUrl: "/side.lending.Referrer",
  encode(message: Referrer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.referralCode !== "") {
      writer.uint32(18).string(message.referralCode);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.referralFeeFactor !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.referralFeeFactor, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Referrer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReferrer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.referralCode = reader.string();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.referralFeeFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Referrer>): Referrer {
    const message = createBaseReferrer();
    message.name = object.name ?? "";
    message.referralCode = object.referralCode ?? "";
    message.address = object.address ?? "";
    message.referralFeeFactor = object.referralFeeFactor ?? "";
    return message;
  },
  fromAmino(object: ReferrerAmino): Referrer {
    const message = createBaseReferrer();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.referral_code !== undefined && object.referral_code !== null) {
      message.referralCode = object.referral_code;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.referral_fee_factor !== undefined && object.referral_fee_factor !== null) {
      message.referralFeeFactor = object.referral_fee_factor;
    }
    return message;
  },
  toAmino(message: Referrer): ReferrerAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.referral_code = message.referralCode === "" ? undefined : message.referralCode;
    obj.address = message.address === "" ? undefined : message.address;
    obj.referral_fee_factor = message.referralFeeFactor === "" ? undefined : message.referralFeeFactor;
    return obj;
  },
  fromAminoMsg(object: ReferrerAminoMsg): Referrer {
    return Referrer.fromAmino(object.value);
  },
  fromProtoMsg(message: ReferrerProtoMsg): Referrer {
    return Referrer.decode(message.value);
  },
  toProto(message: Referrer): Uint8Array {
    return Referrer.encode(message).finish();
  },
  toProtoMsg(message: Referrer): ReferrerProtoMsg {
    return {
      typeUrl: "/side.lending.Referrer",
      value: Referrer.encode(message).finish()
    };
  }
};
function createBaseLeafScript(): LeafScript {
  return {
    script: "",
    controlBlock: ""
  };
}
export const LeafScript = {
  typeUrl: "/side.lending.LeafScript",
  encode(message: LeafScript, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.script !== "") {
      writer.uint32(10).string(message.script);
    }
    if (message.controlBlock !== "") {
      writer.uint32(18).string(message.controlBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LeafScript {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeafScript();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.script = reader.string();
          break;
        case 2:
          message.controlBlock = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LeafScript>): LeafScript {
    const message = createBaseLeafScript();
    message.script = object.script ?? "";
    message.controlBlock = object.controlBlock ?? "";
    return message;
  },
  fromAmino(object: LeafScriptAmino): LeafScript {
    const message = createBaseLeafScript();
    if (object.script !== undefined && object.script !== null) {
      message.script = object.script;
    }
    if (object.control_block !== undefined && object.control_block !== null) {
      message.controlBlock = object.control_block;
    }
    return message;
  },
  toAmino(message: LeafScript): LeafScriptAmino {
    const obj: any = {};
    obj.script = message.script === "" ? undefined : message.script;
    obj.control_block = message.controlBlock === "" ? undefined : message.controlBlock;
    return obj;
  },
  fromAminoMsg(object: LeafScriptAminoMsg): LeafScript {
    return LeafScript.fromAmino(object.value);
  },
  fromProtoMsg(message: LeafScriptProtoMsg): LeafScript {
    return LeafScript.decode(message.value);
  },
  toProto(message: LeafScript): Uint8Array {
    return LeafScript.encode(message).finish();
  },
  toProtoMsg(message: LeafScript): LeafScriptProtoMsg {
    return {
      typeUrl: "/side.lending.LeafScript",
      value: LeafScript.encode(message).finish()
    };
  }
};
function createBaseCetInfo(): CetInfo {
  return {
    eventId: BigInt(0),
    outcomeIndex: 0,
    signaturePoint: "",
    script: LeafScript.fromPartial({})
  };
}
export const CetInfo = {
  typeUrl: "/side.lending.CetInfo",
  encode(message: CetInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eventId !== BigInt(0)) {
      writer.uint32(8).uint64(message.eventId);
    }
    if (message.outcomeIndex !== 0) {
      writer.uint32(16).uint32(message.outcomeIndex);
    }
    if (message.signaturePoint !== "") {
      writer.uint32(26).string(message.signaturePoint);
    }
    if (message.script !== undefined) {
      LeafScript.encode(message.script, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CetInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCetInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.uint64();
          break;
        case 2:
          message.outcomeIndex = reader.uint32();
          break;
        case 3:
          message.signaturePoint = reader.string();
          break;
        case 4:
          message.script = LeafScript.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CetInfo>): CetInfo {
    const message = createBaseCetInfo();
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    message.outcomeIndex = object.outcomeIndex ?? 0;
    message.signaturePoint = object.signaturePoint ?? "";
    message.script = object.script !== undefined && object.script !== null ? LeafScript.fromPartial(object.script) : undefined;
    return message;
  },
  fromAmino(object: CetInfoAmino): CetInfo {
    const message = createBaseCetInfo();
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    if (object.outcome_index !== undefined && object.outcome_index !== null) {
      message.outcomeIndex = object.outcome_index;
    }
    if (object.signature_point !== undefined && object.signature_point !== null) {
      message.signaturePoint = object.signature_point;
    }
    if (object.script !== undefined && object.script !== null) {
      message.script = LeafScript.fromAmino(object.script);
    }
    return message;
  },
  toAmino(message: CetInfo): CetInfoAmino {
    const obj: any = {};
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    obj.outcome_index = message.outcomeIndex === 0 ? undefined : message.outcomeIndex;
    obj.signature_point = message.signaturePoint === "" ? undefined : message.signaturePoint;
    obj.script = message.script ? LeafScript.toAmino(message.script) : undefined;
    return obj;
  },
  fromAminoMsg(object: CetInfoAminoMsg): CetInfo {
    return CetInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: CetInfoProtoMsg): CetInfo {
    return CetInfo.decode(message.value);
  },
  toProto(message: CetInfo): Uint8Array {
    return CetInfo.encode(message).finish();
  },
  toProtoMsg(message: CetInfo): CetInfoProtoMsg {
    return {
      typeUrl: "/side.lending.CetInfo",
      value: CetInfo.encode(message).finish()
    };
  }
};
function createBaseLiquidationCet(): LiquidationCet {
  return {
    tx: "",
    borrowerAdaptorSignatures: [],
    borrowerAdaptedSignatures: [],
    dcmSignatures: [],
    signedTxHex: ""
  };
}
export const LiquidationCet = {
  typeUrl: "/side.lending.LiquidationCet",
  encode(message: LiquidationCet, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tx !== "") {
      writer.uint32(10).string(message.tx);
    }
    for (const v of message.borrowerAdaptorSignatures) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.borrowerAdaptedSignatures) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.dcmSignatures) {
      writer.uint32(34).string(v!);
    }
    if (message.signedTxHex !== "") {
      writer.uint32(42).string(message.signedTxHex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LiquidationCet {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidationCet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.string();
          break;
        case 2:
          message.borrowerAdaptorSignatures.push(reader.string());
          break;
        case 3:
          message.borrowerAdaptedSignatures.push(reader.string());
          break;
        case 4:
          message.dcmSignatures.push(reader.string());
          break;
        case 5:
          message.signedTxHex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidationCet>): LiquidationCet {
    const message = createBaseLiquidationCet();
    message.tx = object.tx ?? "";
    message.borrowerAdaptorSignatures = object.borrowerAdaptorSignatures?.map(e => e) || [];
    message.borrowerAdaptedSignatures = object.borrowerAdaptedSignatures?.map(e => e) || [];
    message.dcmSignatures = object.dcmSignatures?.map(e => e) || [];
    message.signedTxHex = object.signedTxHex ?? "";
    return message;
  },
  fromAmino(object: LiquidationCetAmino): LiquidationCet {
    const message = createBaseLiquidationCet();
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = object.tx;
    }
    message.borrowerAdaptorSignatures = object.borrower_adaptor_signatures?.map(e => e) || [];
    message.borrowerAdaptedSignatures = object.borrower_adapted_signatures?.map(e => e) || [];
    message.dcmSignatures = object.dcm_signatures?.map(e => e) || [];
    if (object.signed_tx_hex !== undefined && object.signed_tx_hex !== null) {
      message.signedTxHex = object.signed_tx_hex;
    }
    return message;
  },
  toAmino(message: LiquidationCet): LiquidationCetAmino {
    const obj: any = {};
    obj.tx = message.tx === "" ? undefined : message.tx;
    if (message.borrowerAdaptorSignatures) {
      obj.borrower_adaptor_signatures = message.borrowerAdaptorSignatures.map(e => e);
    } else {
      obj.borrower_adaptor_signatures = message.borrowerAdaptorSignatures;
    }
    if (message.borrowerAdaptedSignatures) {
      obj.borrower_adapted_signatures = message.borrowerAdaptedSignatures.map(e => e);
    } else {
      obj.borrower_adapted_signatures = message.borrowerAdaptedSignatures;
    }
    if (message.dcmSignatures) {
      obj.dcm_signatures = message.dcmSignatures.map(e => e);
    } else {
      obj.dcm_signatures = message.dcmSignatures;
    }
    obj.signed_tx_hex = message.signedTxHex === "" ? undefined : message.signedTxHex;
    return obj;
  },
  fromAminoMsg(object: LiquidationCetAminoMsg): LiquidationCet {
    return LiquidationCet.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidationCetProtoMsg): LiquidationCet {
    return LiquidationCet.decode(message.value);
  },
  toProto(message: LiquidationCet): Uint8Array {
    return LiquidationCet.encode(message).finish();
  },
  toProtoMsg(message: LiquidationCet): LiquidationCetProtoMsg {
    return {
      typeUrl: "/side.lending.LiquidationCet",
      value: LiquidationCet.encode(message).finish()
    };
  }
};
function createBaseRepaymentCet(): RepaymentCet {
  return {
    tx: "",
    dcmAdaptorSignatures: [],
    dcmAdaptedSignatures: [],
    borrowerSignatures: [],
    signedTxHex: ""
  };
}
export const RepaymentCet = {
  typeUrl: "/side.lending.RepaymentCet",
  encode(message: RepaymentCet, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tx !== "") {
      writer.uint32(10).string(message.tx);
    }
    for (const v of message.dcmAdaptorSignatures) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.dcmAdaptedSignatures) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.borrowerSignatures) {
      writer.uint32(34).string(v!);
    }
    if (message.signedTxHex !== "") {
      writer.uint32(42).string(message.signedTxHex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RepaymentCet {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepaymentCet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.string();
          break;
        case 2:
          message.dcmAdaptorSignatures.push(reader.string());
          break;
        case 3:
          message.dcmAdaptedSignatures.push(reader.string());
          break;
        case 4:
          message.borrowerSignatures.push(reader.string());
          break;
        case 5:
          message.signedTxHex = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RepaymentCet>): RepaymentCet {
    const message = createBaseRepaymentCet();
    message.tx = object.tx ?? "";
    message.dcmAdaptorSignatures = object.dcmAdaptorSignatures?.map(e => e) || [];
    message.dcmAdaptedSignatures = object.dcmAdaptedSignatures?.map(e => e) || [];
    message.borrowerSignatures = object.borrowerSignatures?.map(e => e) || [];
    message.signedTxHex = object.signedTxHex ?? "";
    return message;
  },
  fromAmino(object: RepaymentCetAmino): RepaymentCet {
    const message = createBaseRepaymentCet();
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = object.tx;
    }
    message.dcmAdaptorSignatures = object.dcm_adaptor_signatures?.map(e => e) || [];
    message.dcmAdaptedSignatures = object.dcm_adapted_signatures?.map(e => e) || [];
    message.borrowerSignatures = object.borrower_signatures?.map(e => e) || [];
    if (object.signed_tx_hex !== undefined && object.signed_tx_hex !== null) {
      message.signedTxHex = object.signed_tx_hex;
    }
    return message;
  },
  toAmino(message: RepaymentCet): RepaymentCetAmino {
    const obj: any = {};
    obj.tx = message.tx === "" ? undefined : message.tx;
    if (message.dcmAdaptorSignatures) {
      obj.dcm_adaptor_signatures = message.dcmAdaptorSignatures.map(e => e);
    } else {
      obj.dcm_adaptor_signatures = message.dcmAdaptorSignatures;
    }
    if (message.dcmAdaptedSignatures) {
      obj.dcm_adapted_signatures = message.dcmAdaptedSignatures.map(e => e);
    } else {
      obj.dcm_adapted_signatures = message.dcmAdaptedSignatures;
    }
    if (message.borrowerSignatures) {
      obj.borrower_signatures = message.borrowerSignatures.map(e => e);
    } else {
      obj.borrower_signatures = message.borrowerSignatures;
    }
    obj.signed_tx_hex = message.signedTxHex === "" ? undefined : message.signedTxHex;
    return obj;
  },
  fromAminoMsg(object: RepaymentCetAminoMsg): RepaymentCet {
    return RepaymentCet.fromAmino(object.value);
  },
  fromProtoMsg(message: RepaymentCetProtoMsg): RepaymentCet {
    return RepaymentCet.decode(message.value);
  },
  toProto(message: RepaymentCet): Uint8Array {
    return RepaymentCet.encode(message).finish();
  },
  toProtoMsg(message: RepaymentCet): RepaymentCetProtoMsg {
    return {
      typeUrl: "/side.lending.RepaymentCet",
      value: RepaymentCet.encode(message).finish()
    };
  }
};
function createBaseDLCMeta(): DLCMeta {
  return {
    liquidationCet: LiquidationCet.fromPartial({}),
    defaultLiquidationCet: LiquidationCet.fromPartial({}),
    repaymentCet: RepaymentCet.fromPartial({}),
    timeoutRefundTx: "",
    vaultUtxos: [],
    internalKey: "",
    liquidationScript: LeafScript.fromPartial({}),
    repaymentScript: LeafScript.fromPartial({}),
    timeoutRefundScript: LeafScript.fromPartial({})
  };
}
export const DLCMeta = {
  typeUrl: "/side.lending.DLCMeta",
  encode(message: DLCMeta, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationCet !== undefined) {
      LiquidationCet.encode(message.liquidationCet, writer.uint32(10).fork()).ldelim();
    }
    if (message.defaultLiquidationCet !== undefined) {
      LiquidationCet.encode(message.defaultLiquidationCet, writer.uint32(18).fork()).ldelim();
    }
    if (message.repaymentCet !== undefined) {
      RepaymentCet.encode(message.repaymentCet, writer.uint32(26).fork()).ldelim();
    }
    if (message.timeoutRefundTx !== "") {
      writer.uint32(34).string(message.timeoutRefundTx);
    }
    for (const v of message.vaultUtxos) {
      UTXO.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.internalKey !== "") {
      writer.uint32(50).string(message.internalKey);
    }
    if (message.liquidationScript !== undefined) {
      LeafScript.encode(message.liquidationScript, writer.uint32(58).fork()).ldelim();
    }
    if (message.repaymentScript !== undefined) {
      LeafScript.encode(message.repaymentScript, writer.uint32(66).fork()).ldelim();
    }
    if (message.timeoutRefundScript !== undefined) {
      LeafScript.encode(message.timeoutRefundScript, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DLCMeta {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDLCMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationCet = LiquidationCet.decode(reader, reader.uint32());
          break;
        case 2:
          message.defaultLiquidationCet = LiquidationCet.decode(reader, reader.uint32());
          break;
        case 3:
          message.repaymentCet = RepaymentCet.decode(reader, reader.uint32());
          break;
        case 4:
          message.timeoutRefundTx = reader.string();
          break;
        case 5:
          message.vaultUtxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        case 6:
          message.internalKey = reader.string();
          break;
        case 7:
          message.liquidationScript = LeafScript.decode(reader, reader.uint32());
          break;
        case 8:
          message.repaymentScript = LeafScript.decode(reader, reader.uint32());
          break;
        case 9:
          message.timeoutRefundScript = LeafScript.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DLCMeta>): DLCMeta {
    const message = createBaseDLCMeta();
    message.liquidationCet = object.liquidationCet !== undefined && object.liquidationCet !== null ? LiquidationCet.fromPartial(object.liquidationCet) : undefined;
    message.defaultLiquidationCet = object.defaultLiquidationCet !== undefined && object.defaultLiquidationCet !== null ? LiquidationCet.fromPartial(object.defaultLiquidationCet) : undefined;
    message.repaymentCet = object.repaymentCet !== undefined && object.repaymentCet !== null ? RepaymentCet.fromPartial(object.repaymentCet) : undefined;
    message.timeoutRefundTx = object.timeoutRefundTx ?? "";
    message.vaultUtxos = object.vaultUtxos?.map(e => UTXO.fromPartial(e)) || [];
    message.internalKey = object.internalKey ?? "";
    message.liquidationScript = object.liquidationScript !== undefined && object.liquidationScript !== null ? LeafScript.fromPartial(object.liquidationScript) : undefined;
    message.repaymentScript = object.repaymentScript !== undefined && object.repaymentScript !== null ? LeafScript.fromPartial(object.repaymentScript) : undefined;
    message.timeoutRefundScript = object.timeoutRefundScript !== undefined && object.timeoutRefundScript !== null ? LeafScript.fromPartial(object.timeoutRefundScript) : undefined;
    return message;
  },
  fromAmino(object: DLCMetaAmino): DLCMeta {
    const message = createBaseDLCMeta();
    if (object.liquidation_cet !== undefined && object.liquidation_cet !== null) {
      message.liquidationCet = LiquidationCet.fromAmino(object.liquidation_cet);
    }
    if (object.default_liquidation_cet !== undefined && object.default_liquidation_cet !== null) {
      message.defaultLiquidationCet = LiquidationCet.fromAmino(object.default_liquidation_cet);
    }
    if (object.repayment_cet !== undefined && object.repayment_cet !== null) {
      message.repaymentCet = RepaymentCet.fromAmino(object.repayment_cet);
    }
    if (object.timeout_refund_tx !== undefined && object.timeout_refund_tx !== null) {
      message.timeoutRefundTx = object.timeout_refund_tx;
    }
    message.vaultUtxos = object.vault_utxos?.map(e => UTXO.fromAmino(e)) || [];
    if (object.internal_key !== undefined && object.internal_key !== null) {
      message.internalKey = object.internal_key;
    }
    if (object.liquidation_script !== undefined && object.liquidation_script !== null) {
      message.liquidationScript = LeafScript.fromAmino(object.liquidation_script);
    }
    if (object.repayment_script !== undefined && object.repayment_script !== null) {
      message.repaymentScript = LeafScript.fromAmino(object.repayment_script);
    }
    if (object.timeout_refund_script !== undefined && object.timeout_refund_script !== null) {
      message.timeoutRefundScript = LeafScript.fromAmino(object.timeout_refund_script);
    }
    return message;
  },
  toAmino(message: DLCMeta): DLCMetaAmino {
    const obj: any = {};
    obj.liquidation_cet = message.liquidationCet ? LiquidationCet.toAmino(message.liquidationCet) : undefined;
    obj.default_liquidation_cet = message.defaultLiquidationCet ? LiquidationCet.toAmino(message.defaultLiquidationCet) : undefined;
    obj.repayment_cet = message.repaymentCet ? RepaymentCet.toAmino(message.repaymentCet) : undefined;
    obj.timeout_refund_tx = message.timeoutRefundTx === "" ? undefined : message.timeoutRefundTx;
    if (message.vaultUtxos) {
      obj.vault_utxos = message.vaultUtxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.vault_utxos = message.vaultUtxos;
    }
    obj.internal_key = message.internalKey === "" ? undefined : message.internalKey;
    obj.liquidation_script = message.liquidationScript ? LeafScript.toAmino(message.liquidationScript) : undefined;
    obj.repayment_script = message.repaymentScript ? LeafScript.toAmino(message.repaymentScript) : undefined;
    obj.timeout_refund_script = message.timeoutRefundScript ? LeafScript.toAmino(message.timeoutRefundScript) : undefined;
    return obj;
  },
  fromAminoMsg(object: DLCMetaAminoMsg): DLCMeta {
    return DLCMeta.fromAmino(object.value);
  },
  fromProtoMsg(message: DLCMetaProtoMsg): DLCMeta {
    return DLCMeta.decode(message.value);
  },
  toProto(message: DLCMeta): Uint8Array {
    return DLCMeta.encode(message).finish();
  },
  toProtoMsg(message: DLCMeta): DLCMetaProtoMsg {
    return {
      typeUrl: "/side.lending.DLCMeta",
      value: DLCMeta.encode(message).finish()
    };
  }
};
function createBaseDepositLog(): DepositLog {
  return {
    txid: "",
    vaultAddress: "",
    authorizationId: BigInt(0),
    depositTx: "",
    status: 0
  };
}
export const DepositLog = {
  typeUrl: "/side.lending.DepositLog",
  encode(message: DepositLog, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txid !== "") {
      writer.uint32(10).string(message.txid);
    }
    if (message.vaultAddress !== "") {
      writer.uint32(18).string(message.vaultAddress);
    }
    if (message.authorizationId !== BigInt(0)) {
      writer.uint32(24).uint64(message.authorizationId);
    }
    if (message.depositTx !== "") {
      writer.uint32(34).string(message.depositTx);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DepositLog {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositLog();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txid = reader.string();
          break;
        case 2:
          message.vaultAddress = reader.string();
          break;
        case 3:
          message.authorizationId = reader.uint64();
          break;
        case 4:
          message.depositTx = reader.string();
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DepositLog>): DepositLog {
    const message = createBaseDepositLog();
    message.txid = object.txid ?? "";
    message.vaultAddress = object.vaultAddress ?? "";
    message.authorizationId = object.authorizationId !== undefined && object.authorizationId !== null ? BigInt(object.authorizationId.toString()) : BigInt(0);
    message.depositTx = object.depositTx ?? "";
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: DepositLogAmino): DepositLog {
    const message = createBaseDepositLog();
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.vault_address !== undefined && object.vault_address !== null) {
      message.vaultAddress = object.vault_address;
    }
    if (object.authorization_id !== undefined && object.authorization_id !== null) {
      message.authorizationId = BigInt(object.authorization_id);
    }
    if (object.deposit_tx !== undefined && object.deposit_tx !== null) {
      message.depositTx = object.deposit_tx;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: DepositLog): DepositLogAmino {
    const obj: any = {};
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.vault_address = message.vaultAddress === "" ? undefined : message.vaultAddress;
    obj.authorization_id = message.authorizationId !== BigInt(0) ? message.authorizationId.toString() : undefined;
    obj.deposit_tx = message.depositTx === "" ? undefined : message.depositTx;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: DepositLogAminoMsg): DepositLog {
    return DepositLog.fromAmino(object.value);
  },
  fromProtoMsg(message: DepositLogProtoMsg): DepositLog {
    return DepositLog.decode(message.value);
  },
  toProto(message: DepositLog): Uint8Array {
    return DepositLog.encode(message).finish();
  },
  toProtoMsg(message: DepositLog): DepositLogProtoMsg {
    return {
      typeUrl: "/side.lending.DepositLog",
      value: DepositLog.encode(message).finish()
    };
  }
};
function createBaseRepayment(): Repayment {
  return {
    loanId: "",
    amount: Coin.fromPartial({}),
    createAt: new Date()
  };
}
export const Repayment = {
  typeUrl: "/side.lending.Repayment",
  encode(message: Repayment, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.createAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createAt), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Repayment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.createAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Repayment>): Repayment {
    const message = createBaseRepayment();
    message.loanId = object.loanId ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.createAt = object.createAt ?? undefined;
    return message;
  },
  fromAmino(object: RepaymentAmino): Repayment {
    const message = createBaseRepayment();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.create_at !== undefined && object.create_at !== null) {
      message.createAt = fromTimestamp(Timestamp.fromAmino(object.create_at));
    }
    return message;
  },
  toAmino(message: Repayment): RepaymentAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : undefined;
    obj.create_at = message.createAt ? Timestamp.toAmino(toTimestamp(message.createAt)) : undefined;
    return obj;
  },
  fromAminoMsg(object: RepaymentAminoMsg): Repayment {
    return Repayment.fromAmino(object.value);
  },
  fromProtoMsg(message: RepaymentProtoMsg): Repayment {
    return Repayment.decode(message.value);
  },
  toProto(message: Repayment): Uint8Array {
    return Repayment.encode(message).finish();
  },
  toProtoMsg(message: Repayment): RepaymentProtoMsg {
    return {
      typeUrl: "/side.lending.Repayment",
      value: Repayment.encode(message).finish()
    };
  }
};
function createBaseRedemption(): Redemption {
  return {
    id: BigInt(0),
    loanId: "",
    txid: "",
    tx: "",
    signatures: [],
    dcmSignatures: [],
    createAt: new Date()
  };
}
export const Redemption = {
  typeUrl: "/side.lending.Redemption",
  encode(message: Redemption, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    if (message.txid !== "") {
      writer.uint32(26).string(message.txid);
    }
    if (message.tx !== "") {
      writer.uint32(34).string(message.tx);
    }
    for (const v of message.signatures) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.dcmSignatures) {
      writer.uint32(50).string(v!);
    }
    if (message.createAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createAt), writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Redemption {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedemption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.txid = reader.string();
          break;
        case 4:
          message.tx = reader.string();
          break;
        case 5:
          message.signatures.push(reader.string());
          break;
        case 6:
          message.dcmSignatures.push(reader.string());
          break;
        case 7:
          message.createAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Redemption>): Redemption {
    const message = createBaseRedemption();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.loanId = object.loanId ?? "";
    message.txid = object.txid ?? "";
    message.tx = object.tx ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    message.dcmSignatures = object.dcmSignatures?.map(e => e) || [];
    message.createAt = object.createAt ?? undefined;
    return message;
  },
  fromAmino(object: RedemptionAmino): Redemption {
    const message = createBaseRedemption();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = object.tx;
    }
    message.signatures = object.signatures?.map(e => e) || [];
    message.dcmSignatures = object.dcm_signatures?.map(e => e) || [];
    if (object.create_at !== undefined && object.create_at !== null) {
      message.createAt = fromTimestamp(Timestamp.fromAmino(object.create_at));
    }
    return message;
  },
  toAmino(message: Redemption): RedemptionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.tx = message.tx === "" ? undefined : message.tx;
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => e);
    } else {
      obj.signatures = message.signatures;
    }
    if (message.dcmSignatures) {
      obj.dcm_signatures = message.dcmSignatures.map(e => e);
    } else {
      obj.dcm_signatures = message.dcmSignatures;
    }
    obj.create_at = message.createAt ? Timestamp.toAmino(toTimestamp(message.createAt)) : undefined;
    return obj;
  },
  fromAminoMsg(object: RedemptionAminoMsg): Redemption {
    return Redemption.fromAmino(object.value);
  },
  fromProtoMsg(message: RedemptionProtoMsg): Redemption {
    return Redemption.decode(message.value);
  },
  toProto(message: Redemption): Uint8Array {
    return Redemption.encode(message).finish();
  },
  toProtoMsg(message: Redemption): RedemptionProtoMsg {
    return {
      typeUrl: "/side.lending.Redemption",
      value: Redemption.encode(message).finish()
    };
  }
};