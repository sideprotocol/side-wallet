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
  /** Open - Loan Open */
  Open = 2,
  /** Rejected - Loan Rejected */
  Rejected = 3,
  /** Cancelled - Loan Cancelled */
  Cancelled = 4,
  /** Repaid - Loan Repaid */
  Repaid = 5,
  /** Defaulted - Loan Defaulted */
  Defaulted = 6,
  /** Liquidated - Loan Liquidated */
  Liquidated = 7,
  /** Closed - Loan Closed */
  Closed = 8,
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
    case "Open":
      return LoanStatus.Open;
    case 3:
    case "Rejected":
      return LoanStatus.Rejected;
    case 4:
    case "Cancelled":
      return LoanStatus.Cancelled;
    case 5:
    case "Repaid":
      return LoanStatus.Repaid;
    case 6:
    case "Defaulted":
      return LoanStatus.Defaulted;
    case 7:
    case "Liquidated":
      return LoanStatus.Liquidated;
    case 8:
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
    case LoanStatus.Open:
      return "Open";
    case LoanStatus.Rejected:
      return "Rejected";
    case LoanStatus.Cancelled:
      return "Cancelled";
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
/** Pool tranche config */
export interface PoolTrancheConfig {
  /** maturity duration in seconds */
  maturity: bigint;
  /** borrow apr permille */
  borrowApr: number;
  /** minimum maturity factor permille */
  minMaturityFactor: number;
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
  /** minimum maturity factor permille */
  min_maturity_factor?: number;
}
export interface PoolTrancheConfigAminoMsg {
  type: "/side.lending.PoolTrancheConfig";
  value: PoolTrancheConfigAmino;
}
/** Pool tranche config */
export interface PoolTrancheConfigSDKType {
  maturity: bigint;
  borrow_apr: number;
  min_maturity_factor: number;
}
/** Pool config */
export interface PoolConfig {
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
  /** origination fee */
  originationFee: string;
  /** reserve factor permille */
  reserveFactor: number;
  /** referral fee factor permille */
  referralFeeFactor: number;
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
  /** origination fee */
  origination_fee?: string;
  /** reserve factor permille */
  reserve_factor?: number;
  /** referral fee factor permille */
  referral_fee_factor?: number;
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
  supply_cap: string;
  borrow_cap: string;
  min_borrow_amount: string;
  max_borrow_amount: string;
  tranches: PoolTrancheConfigSDKType[];
  request_fee: CoinSDKType;
  origination_fee: string;
  reserve_factor: number;
  referral_fee_factor: number;
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
}
export interface LendingPool {
  id: string;
  supply: Coin;
  availableAmount: string;
  borrowedAmount: string;
  totalBorrowed: string;
  reserveAmount: string;
  totalStokens: Coin;
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
  total_stokens?: CoinAmino;
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
  total_stokens: CoinSDKType;
  tranches: PoolTrancheSDKType[];
  config: PoolConfigSDKType;
  status: PoolStatus;
}
/** Deposits used for CET authorization */
export interface AuthorizationDeposits {
  depositTxs: string[];
}
export interface AuthorizationDepositsProtoMsg {
  typeUrl: "/side.lending.AuthorizationDeposits";
  value: Uint8Array;
}
/** Deposits used for CET authorization */
export interface AuthorizationDepositsAmino {
  deposit_txs?: string[];
}
export interface AuthorizationDepositsAminoMsg {
  type: "/side.lending.AuthorizationDeposits";
  value: AuthorizationDepositsAmino;
}
/** Deposits used for CET authorization */
export interface AuthorizationDepositsSDKType {
  deposit_txs: string[];
}
export interface Loan {
  /** id */
  vaultAddress: string;
  borrower: string;
  borrowerPubKey: string;
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
  minMaturity: bigint;
  startBorrowIndex: string;
  liquidationPrice: string;
  liquidationEventId: bigint;
  defaultLiquidationEventId: bigint;
  repaymentEventId: bigint;
  authorizationDeposits: AuthorizationDeposits[];
  collateralAmount: string;
  liquidationId: bigint;
  referrer: string;
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
  min_maturity?: string;
  start_borrow_index?: string;
  liquidation_price?: string;
  liquidation_event_id?: string;
  default_liquidation_event_id?: string;
  repayment_event_id?: string;
  authorization_deposits?: AuthorizationDepositsAmino[];
  collateral_amount?: string;
  liquidation_id?: string;
  referrer?: string;
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
  min_maturity: bigint;
  start_borrow_index: string;
  liquidation_price: string;
  liquidation_event_id: bigint;
  default_liquidation_event_id: bigint;
  repayment_event_id: bigint;
  authorization_deposits: AuthorizationDepositsSDKType[];
  collateral_amount: string;
  liquidation_id: bigint;
  referrer: string;
  create_at: Date;
  disburse_at: Date;
  status: LoanStatus;
}
export interface CetInfo {
  eventId: bigint;
  outcomeIndex: number;
  signaturePoint: string;
  script: string;
}
export interface CetInfoProtoMsg {
  typeUrl: "/side.lending.CetInfo";
  value: Uint8Array;
}
export interface CetInfoAmino {
  event_id?: string;
  outcome_index?: number;
  signature_point?: string;
  script?: string;
}
export interface CetInfoAminoMsg {
  type: "/side.lending.CetInfo";
  value: CetInfoAmino;
}
export interface CetInfoSDKType {
  event_id: bigint;
  outcome_index: number;
  signature_point: string;
  script: string;
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
  multisigScript: string;
  timeoutRefundScript: string;
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
  multisig_script?: string;
  timeout_refund_script?: string;
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
  multisig_script: string;
  timeout_refund_script: string;
}
export interface DepositLog {
  txid: string;
  vaultAddress: string;
  depositTx: string;
  verified: boolean;
}
export interface DepositLogProtoMsg {
  typeUrl: "/side.lending.DepositLog";
  value: Uint8Array;
}
export interface DepositLogAmino {
  txid?: string;
  vault_address?: string;
  deposit_tx?: string;
  verified?: boolean;
}
export interface DepositLogAminoMsg {
  type: "/side.lending.DepositLog";
  value: DepositLogAmino;
}
export interface DepositLogSDKType {
  txid: string;
  vault_address: string;
  deposit_tx: string;
  verified: boolean;
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
export interface Cancellation {
  loanId: string;
  txid: string;
  tx: string;
  signatures: string[];
  dcmSignatures: string[];
  createAt: Date;
}
export interface CancellationProtoMsg {
  typeUrl: "/side.lending.Cancellation";
  value: Uint8Array;
}
export interface CancellationAmino {
  loan_id?: string;
  txid?: string;
  tx?: string;
  signatures?: string[];
  dcm_signatures?: string[];
  create_at?: string;
}
export interface CancellationAminoMsg {
  type: "/side.lending.Cancellation";
  value: CancellationAmino;
}
export interface CancellationSDKType {
  loan_id: string;
  txid: string;
  tx: string;
  signatures: string[];
  dcm_signatures: string[];
  create_at: Date;
}
function createBasePoolTrancheConfig(): PoolTrancheConfig {
  return {
    maturity: BigInt(0),
    borrowApr: 0,
    minMaturityFactor: 0
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
    if (message.minMaturityFactor !== 0) {
      writer.uint32(24).uint32(message.minMaturityFactor);
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
        case 3:
          message.minMaturityFactor = reader.uint32();
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
    message.minMaturityFactor = object.minMaturityFactor ?? 0;
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
    if (object.min_maturity_factor !== undefined && object.min_maturity_factor !== null) {
      message.minMaturityFactor = object.min_maturity_factor;
    }
    return message;
  },
  toAmino(message: PoolTrancheConfig): PoolTrancheConfigAmino {
    const obj: any = {};
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.borrow_apr = message.borrowApr === 0 ? undefined : message.borrowApr;
    obj.min_maturity_factor = message.minMaturityFactor === 0 ? undefined : message.minMaturityFactor;
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
    supplyCap: "",
    borrowCap: "",
    minBorrowAmount: "",
    maxBorrowAmount: "",
    tranches: [],
    requestFee: Coin.fromPartial({}),
    originationFee: "",
    reserveFactor: 0,
    referralFeeFactor: 0,
    maxLtv: 0,
    liquidationThreshold: 0,
    paused: false
  };
}
export const PoolConfig = {
  typeUrl: "/side.lending.PoolConfig",
  encode(message: PoolConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplyCap !== "") {
      writer.uint32(10).string(message.supplyCap);
    }
    if (message.borrowCap !== "") {
      writer.uint32(18).string(message.borrowCap);
    }
    if (message.minBorrowAmount !== "") {
      writer.uint32(26).string(message.minBorrowAmount);
    }
    if (message.maxBorrowAmount !== "") {
      writer.uint32(34).string(message.maxBorrowAmount);
    }
    for (const v of message.tranches) {
      PoolTrancheConfig.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.requestFee !== undefined) {
      Coin.encode(message.requestFee, writer.uint32(50).fork()).ldelim();
    }
    if (message.originationFee !== "") {
      writer.uint32(58).string(message.originationFee);
    }
    if (message.reserveFactor !== 0) {
      writer.uint32(64).uint32(message.reserveFactor);
    }
    if (message.referralFeeFactor !== 0) {
      writer.uint32(72).uint32(message.referralFeeFactor);
    }
    if (message.maxLtv !== 0) {
      writer.uint32(80).uint32(message.maxLtv);
    }
    if (message.liquidationThreshold !== 0) {
      writer.uint32(88).uint32(message.liquidationThreshold);
    }
    if (message.paused === true) {
      writer.uint32(96).bool(message.paused);
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
          message.supplyCap = reader.string();
          break;
        case 2:
          message.borrowCap = reader.string();
          break;
        case 3:
          message.minBorrowAmount = reader.string();
          break;
        case 4:
          message.maxBorrowAmount = reader.string();
          break;
        case 5:
          message.tranches.push(PoolTrancheConfig.decode(reader, reader.uint32()));
          break;
        case 6:
          message.requestFee = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.originationFee = reader.string();
          break;
        case 8:
          message.reserveFactor = reader.uint32();
          break;
        case 9:
          message.referralFeeFactor = reader.uint32();
          break;
        case 10:
          message.maxLtv = reader.uint32();
          break;
        case 11:
          message.liquidationThreshold = reader.uint32();
          break;
        case 12:
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
    message.supplyCap = object.supplyCap ?? "";
    message.borrowCap = object.borrowCap ?? "";
    message.minBorrowAmount = object.minBorrowAmount ?? "";
    message.maxBorrowAmount = object.maxBorrowAmount ?? "";
    message.tranches = object.tranches?.map(e => PoolTrancheConfig.fromPartial(e)) || [];
    message.requestFee = object.requestFee !== undefined && object.requestFee !== null ? Coin.fromPartial(object.requestFee) : undefined;
    message.originationFee = object.originationFee ?? "";
    message.reserveFactor = object.reserveFactor ?? 0;
    message.referralFeeFactor = object.referralFeeFactor ?? 0;
    message.maxLtv = object.maxLtv ?? 0;
    message.liquidationThreshold = object.liquidationThreshold ?? 0;
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: PoolConfigAmino): PoolConfig {
    const message = createBasePoolConfig();
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
    if (object.origination_fee !== undefined && object.origination_fee !== null) {
      message.originationFee = object.origination_fee;
    }
    if (object.reserve_factor !== undefined && object.reserve_factor !== null) {
      message.reserveFactor = object.reserve_factor;
    }
    if (object.referral_fee_factor !== undefined && object.referral_fee_factor !== null) {
      message.referralFeeFactor = object.referral_fee_factor;
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
    obj.origination_fee = message.originationFee === "" ? undefined : message.originationFee;
    obj.reserve_factor = message.reserveFactor === 0 ? undefined : message.reserveFactor;
    obj.referral_fee_factor = message.referralFeeFactor === 0 ? undefined : message.referralFeeFactor;
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
    totalBorrowed: ""
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
    return message;
  },
  toAmino(message: PoolTranche): PoolTrancheAmino {
    const obj: any = {};
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.borrow_index = message.borrowIndex === "" ? undefined : message.borrowIndex;
    obj.total_borrowed = message.totalBorrowed === "" ? undefined : message.totalBorrowed;
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
    totalStokens: Coin.fromPartial({}),
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
    if (message.totalStokens !== undefined) {
      Coin.encode(message.totalStokens, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.tranches) {
      PoolTranche.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.config !== undefined) {
      PoolConfig.encode(message.config, writer.uint32(74).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(80).int32(message.status);
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
          message.totalStokens = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.tranches.push(PoolTranche.decode(reader, reader.uint32()));
          break;
        case 9:
          message.config = PoolConfig.decode(reader, reader.uint32());
          break;
        case 10:
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
    message.totalStokens = object.totalStokens !== undefined && object.totalStokens !== null ? Coin.fromPartial(object.totalStokens) : undefined;
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
    if (object.total_stokens !== undefined && object.total_stokens !== null) {
      message.totalStokens = Coin.fromAmino(object.total_stokens);
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
    obj.total_stokens = message.totalStokens ? Coin.toAmino(message.totalStokens) : undefined;
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
function createBaseAuthorizationDeposits(): AuthorizationDeposits {
  return {
    depositTxs: []
  };
}
export const AuthorizationDeposits = {
  typeUrl: "/side.lending.AuthorizationDeposits",
  encode(message: AuthorizationDeposits, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.depositTxs) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AuthorizationDeposits {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthorizationDeposits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositTxs.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AuthorizationDeposits>): AuthorizationDeposits {
    const message = createBaseAuthorizationDeposits();
    message.depositTxs = object.depositTxs?.map(e => e) || [];
    return message;
  },
  fromAmino(object: AuthorizationDepositsAmino): AuthorizationDeposits {
    const message = createBaseAuthorizationDeposits();
    message.depositTxs = object.deposit_txs?.map(e => e) || [];
    return message;
  },
  toAmino(message: AuthorizationDeposits): AuthorizationDepositsAmino {
    const obj: any = {};
    if (message.depositTxs) {
      obj.deposit_txs = message.depositTxs.map(e => e);
    } else {
      obj.deposit_txs = message.depositTxs;
    }
    return obj;
  },
  fromAminoMsg(object: AuthorizationDepositsAminoMsg): AuthorizationDeposits {
    return AuthorizationDeposits.fromAmino(object.value);
  },
  fromProtoMsg(message: AuthorizationDepositsProtoMsg): AuthorizationDeposits {
    return AuthorizationDeposits.decode(message.value);
  },
  toProto(message: AuthorizationDeposits): Uint8Array {
    return AuthorizationDeposits.encode(message).finish();
  },
  toProtoMsg(message: AuthorizationDeposits): AuthorizationDepositsProtoMsg {
    return {
      typeUrl: "/side.lending.AuthorizationDeposits",
      value: AuthorizationDeposits.encode(message).finish()
    };
  }
};
function createBaseLoan(): Loan {
  return {
    vaultAddress: "",
    borrower: "",
    borrowerPubKey: "",
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
    minMaturity: BigInt(0),
    startBorrowIndex: "",
    liquidationPrice: "",
    liquidationEventId: BigInt(0),
    defaultLiquidationEventId: BigInt(0),
    repaymentEventId: BigInt(0),
    authorizationDeposits: [],
    collateralAmount: "",
    liquidationId: BigInt(0),
    referrer: "",
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
    if (message.dcm !== "") {
      writer.uint32(34).string(message.dcm);
    }
    if (message.maturityTime !== BigInt(0)) {
      writer.uint32(40).int64(message.maturityTime);
    }
    if (message.finalTimeout !== BigInt(0)) {
      writer.uint32(48).int64(message.finalTimeout);
    }
    if (message.poolId !== "") {
      writer.uint32(58).string(message.poolId);
    }
    if (message.borrowAmount !== undefined) {
      Coin.encode(message.borrowAmount, writer.uint32(66).fork()).ldelim();
    }
    if (message.requestFee !== undefined) {
      Coin.encode(message.requestFee, writer.uint32(74).fork()).ldelim();
    }
    if (message.originationFee !== "") {
      writer.uint32(82).string(message.originationFee);
    }
    if (message.interest !== "") {
      writer.uint32(90).string(message.interest);
    }
    if (message.protocolFee !== "") {
      writer.uint32(98).string(message.protocolFee);
    }
    if (message.maturity !== BigInt(0)) {
      writer.uint32(104).int64(message.maturity);
    }
    if (message.borrowApr !== 0) {
      writer.uint32(112).uint32(message.borrowApr);
    }
    if (message.minMaturity !== BigInt(0)) {
      writer.uint32(120).int64(message.minMaturity);
    }
    if (message.startBorrowIndex !== "") {
      writer.uint32(130).string(Decimal.fromUserInput(message.startBorrowIndex, 18).atomics);
    }
    if (message.liquidationPrice !== "") {
      writer.uint32(138).string(message.liquidationPrice);
    }
    if (message.liquidationEventId !== BigInt(0)) {
      writer.uint32(144).uint64(message.liquidationEventId);
    }
    if (message.defaultLiquidationEventId !== BigInt(0)) {
      writer.uint32(152).uint64(message.defaultLiquidationEventId);
    }
    if (message.repaymentEventId !== BigInt(0)) {
      writer.uint32(160).uint64(message.repaymentEventId);
    }
    for (const v of message.authorizationDeposits) {
      AuthorizationDeposits.encode(v!, writer.uint32(170).fork()).ldelim();
    }
    if (message.collateralAmount !== "") {
      writer.uint32(178).string(message.collateralAmount);
    }
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(184).uint64(message.liquidationId);
    }
    if (message.referrer !== "") {
      writer.uint32(194).string(message.referrer);
    }
    if (message.createAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createAt), writer.uint32(202).fork()).ldelim();
    }
    if (message.disburseAt !== undefined) {
      Timestamp.encode(toTimestamp(message.disburseAt), writer.uint32(210).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(216).int32(message.status);
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
          message.dcm = reader.string();
          break;
        case 5:
          message.maturityTime = reader.int64();
          break;
        case 6:
          message.finalTimeout = reader.int64();
          break;
        case 7:
          message.poolId = reader.string();
          break;
        case 8:
          message.borrowAmount = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.requestFee = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.originationFee = reader.string();
          break;
        case 11:
          message.interest = reader.string();
          break;
        case 12:
          message.protocolFee = reader.string();
          break;
        case 13:
          message.maturity = reader.int64();
          break;
        case 14:
          message.borrowApr = reader.uint32();
          break;
        case 15:
          message.minMaturity = reader.int64();
          break;
        case 16:
          message.startBorrowIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 17:
          message.liquidationPrice = reader.string();
          break;
        case 18:
          message.liquidationEventId = reader.uint64();
          break;
        case 19:
          message.defaultLiquidationEventId = reader.uint64();
          break;
        case 20:
          message.repaymentEventId = reader.uint64();
          break;
        case 21:
          message.authorizationDeposits.push(AuthorizationDeposits.decode(reader, reader.uint32()));
          break;
        case 22:
          message.collateralAmount = reader.string();
          break;
        case 23:
          message.liquidationId = reader.uint64();
          break;
        case 24:
          message.referrer = reader.string();
          break;
        case 25:
          message.createAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 26:
          message.disburseAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 27:
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
    message.minMaturity = object.minMaturity !== undefined && object.minMaturity !== null ? BigInt(object.minMaturity.toString()) : BigInt(0);
    message.startBorrowIndex = object.startBorrowIndex ?? "";
    message.liquidationPrice = object.liquidationPrice ?? "";
    message.liquidationEventId = object.liquidationEventId !== undefined && object.liquidationEventId !== null ? BigInt(object.liquidationEventId.toString()) : BigInt(0);
    message.defaultLiquidationEventId = object.defaultLiquidationEventId !== undefined && object.defaultLiquidationEventId !== null ? BigInt(object.defaultLiquidationEventId.toString()) : BigInt(0);
    message.repaymentEventId = object.repaymentEventId !== undefined && object.repaymentEventId !== null ? BigInt(object.repaymentEventId.toString()) : BigInt(0);
    message.authorizationDeposits = object.authorizationDeposits?.map(e => AuthorizationDeposits.fromPartial(e)) || [];
    message.collateralAmount = object.collateralAmount ?? "";
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.referrer = object.referrer ?? "";
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
    if (object.min_maturity !== undefined && object.min_maturity !== null) {
      message.minMaturity = BigInt(object.min_maturity);
    }
    if (object.start_borrow_index !== undefined && object.start_borrow_index !== null) {
      message.startBorrowIndex = object.start_borrow_index;
    }
    if (object.liquidation_price !== undefined && object.liquidation_price !== null) {
      message.liquidationPrice = object.liquidation_price;
    }
    if (object.liquidation_event_id !== undefined && object.liquidation_event_id !== null) {
      message.liquidationEventId = BigInt(object.liquidation_event_id);
    }
    if (object.default_liquidation_event_id !== undefined && object.default_liquidation_event_id !== null) {
      message.defaultLiquidationEventId = BigInt(object.default_liquidation_event_id);
    }
    if (object.repayment_event_id !== undefined && object.repayment_event_id !== null) {
      message.repaymentEventId = BigInt(object.repayment_event_id);
    }
    message.authorizationDeposits = object.authorization_deposits?.map(e => AuthorizationDeposits.fromAmino(e)) || [];
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    if (object.referrer !== undefined && object.referrer !== null) {
      message.referrer = object.referrer;
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
    obj.min_maturity = message.minMaturity !== BigInt(0) ? message.minMaturity.toString() : undefined;
    obj.start_borrow_index = message.startBorrowIndex === "" ? undefined : message.startBorrowIndex;
    obj.liquidation_price = message.liquidationPrice === "" ? undefined : message.liquidationPrice;
    obj.liquidation_event_id = message.liquidationEventId !== BigInt(0) ? message.liquidationEventId.toString() : undefined;
    obj.default_liquidation_event_id = message.defaultLiquidationEventId !== BigInt(0) ? message.defaultLiquidationEventId.toString() : undefined;
    obj.repayment_event_id = message.repaymentEventId !== BigInt(0) ? message.repaymentEventId.toString() : undefined;
    if (message.authorizationDeposits) {
      obj.authorization_deposits = message.authorizationDeposits.map(e => e ? AuthorizationDeposits.toAmino(e) : undefined);
    } else {
      obj.authorization_deposits = message.authorizationDeposits;
    }
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    obj.referrer = message.referrer === "" ? undefined : message.referrer;
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
function createBaseCetInfo(): CetInfo {
  return {
    eventId: BigInt(0),
    outcomeIndex: 0,
    signaturePoint: "",
    script: ""
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
    if (message.script !== "") {
      writer.uint32(34).string(message.script);
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
          message.script = reader.string();
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
    message.script = object.script ?? "";
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
      message.script = object.script;
    }
    return message;
  },
  toAmino(message: CetInfo): CetInfoAmino {
    const obj: any = {};
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    obj.outcome_index = message.outcomeIndex === 0 ? undefined : message.outcomeIndex;
    obj.signature_point = message.signaturePoint === "" ? undefined : message.signaturePoint;
    obj.script = message.script === "" ? undefined : message.script;
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
    multisigScript: "",
    timeoutRefundScript: ""
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
    if (message.multisigScript !== "") {
      writer.uint32(58).string(message.multisigScript);
    }
    if (message.timeoutRefundScript !== "") {
      writer.uint32(66).string(message.timeoutRefundScript);
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
          message.multisigScript = reader.string();
          break;
        case 8:
          message.timeoutRefundScript = reader.string();
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
    message.multisigScript = object.multisigScript ?? "";
    message.timeoutRefundScript = object.timeoutRefundScript ?? "";
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
    if (object.multisig_script !== undefined && object.multisig_script !== null) {
      message.multisigScript = object.multisig_script;
    }
    if (object.timeout_refund_script !== undefined && object.timeout_refund_script !== null) {
      message.timeoutRefundScript = object.timeout_refund_script;
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
    obj.multisig_script = message.multisigScript === "" ? undefined : message.multisigScript;
    obj.timeout_refund_script = message.timeoutRefundScript === "" ? undefined : message.timeoutRefundScript;
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
    depositTx: "",
    verified: false
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
    if (message.depositTx !== "") {
      writer.uint32(26).string(message.depositTx);
    }
    if (message.verified === true) {
      writer.uint32(32).bool(message.verified);
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
          message.depositTx = reader.string();
          break;
        case 4:
          message.verified = reader.bool();
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
    message.depositTx = object.depositTx ?? "";
    message.verified = object.verified ?? false;
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
    if (object.deposit_tx !== undefined && object.deposit_tx !== null) {
      message.depositTx = object.deposit_tx;
    }
    if (object.verified !== undefined && object.verified !== null) {
      message.verified = object.verified;
    }
    return message;
  },
  toAmino(message: DepositLog): DepositLogAmino {
    const obj: any = {};
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.vault_address = message.vaultAddress === "" ? undefined : message.vaultAddress;
    obj.deposit_tx = message.depositTx === "" ? undefined : message.depositTx;
    obj.verified = message.verified === false ? undefined : message.verified;
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
function createBaseCancellation(): Cancellation {
  return {
    loanId: "",
    txid: "",
    tx: "",
    signatures: [],
    dcmSignatures: [],
    createAt: new Date()
  };
}
export const Cancellation = {
  typeUrl: "/side.lending.Cancellation",
  encode(message: Cancellation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    if (message.txid !== "") {
      writer.uint32(18).string(message.txid);
    }
    if (message.tx !== "") {
      writer.uint32(26).string(message.tx);
    }
    for (const v of message.signatures) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.dcmSignatures) {
      writer.uint32(42).string(v!);
    }
    if (message.createAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createAt), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Cancellation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancellation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        case 2:
          message.txid = reader.string();
          break;
        case 3:
          message.tx = reader.string();
          break;
        case 4:
          message.signatures.push(reader.string());
          break;
        case 5:
          message.dcmSignatures.push(reader.string());
          break;
        case 6:
          message.createAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Cancellation>): Cancellation {
    const message = createBaseCancellation();
    message.loanId = object.loanId ?? "";
    message.txid = object.txid ?? "";
    message.tx = object.tx ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    message.dcmSignatures = object.dcmSignatures?.map(e => e) || [];
    message.createAt = object.createAt ?? undefined;
    return message;
  },
  fromAmino(object: CancellationAmino): Cancellation {
    const message = createBaseCancellation();
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
  toAmino(message: Cancellation): CancellationAmino {
    const obj: any = {};
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
  fromAminoMsg(object: CancellationAminoMsg): Cancellation {
    return Cancellation.fromAmino(object.value);
  },
  fromProtoMsg(message: CancellationProtoMsg): Cancellation {
    return Cancellation.decode(message.value);
  },
  toProto(message: Cancellation): Uint8Array {
    return Cancellation.encode(message).finish();
  },
  toProtoMsg(message: Cancellation): CancellationProtoMsg {
    return {
      typeUrl: "/side.lending.Cancellation",
      value: Cancellation.encode(message).finish()
    };
  }
};