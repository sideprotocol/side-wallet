//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** AssetType defines the type of asset */
export enum AssetType {
  /** ASSET_TYPE_UNSPECIFIED - Unspecified asset type */
  ASSET_TYPE_UNSPECIFIED = 0,
  /** ASSET_TYPE_BTC - BTC */
  ASSET_TYPE_BTC = 1,
  /** ASSET_TYPE_BRC20 - BRC20: ordi, sats */
  ASSET_TYPE_BRC20 = 2,
  /** ASSET_TYPE_RUNES - RUNE: dog•go•to•the•moon */
  ASSET_TYPE_RUNES = 3,
  UNRECOGNIZED = -1,
}
export const AssetTypeSDKType = AssetType;
export const AssetTypeAmino = AssetType;
export function assetTypeFromJSON(object: any): AssetType {
  switch (object) {
    case 0:
    case "ASSET_TYPE_UNSPECIFIED":
      return AssetType.ASSET_TYPE_UNSPECIFIED;
    case 1:
    case "ASSET_TYPE_BTC":
      return AssetType.ASSET_TYPE_BTC;
    case 2:
    case "ASSET_TYPE_BRC20":
      return AssetType.ASSET_TYPE_BRC20;
    case 3:
    case "ASSET_TYPE_RUNES":
      return AssetType.ASSET_TYPE_RUNES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AssetType.UNRECOGNIZED;
  }
}
export function assetTypeToJSON(object: AssetType): string {
  switch (object) {
    case AssetType.ASSET_TYPE_UNSPECIFIED:
      return "ASSET_TYPE_UNSPECIFIED";
    case AssetType.ASSET_TYPE_BTC:
      return "ASSET_TYPE_BTC";
    case AssetType.ASSET_TYPE_BRC20:
      return "ASSET_TYPE_BRC20";
    case AssetType.ASSET_TYPE_RUNES:
      return "ASSET_TYPE_RUNES";
    case AssetType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the parameters for the module. */
export interface Params {
  /** The minimum number of confirmations required for the deposit transactions */
  depositConfirmationDepth: number;
  /** The minimum number of confirmations required for the withdrawal transactions */
  withdrawConfirmationDepth: number;
  /** The allowed maximum depth for bitcoin block reorganization */
  maxReorgDepth: number;
  /** Indicates the maximum depth or distance from the latest block up to which transactions are considered for acceptance. */
  maxAcceptableBlockDepth: bigint;
  /** The denomination of the voucher */
  btcVoucherDenom: string;
  /** Indicates if deposit is enabled */
  depositEnabled: boolean;
  /** Indicates if withdrawal is enabled */
  withdrawEnabled: boolean;
  /** Trusted relayers for non-btc asset deposit */
  trustedNonBtcRelayers: string[];
  /** Trusted fee providers to submit bitcoin fee rate */
  trustedFeeProviders: string[];
  /** Period of validity for the fee rate */
  feeRateValidityPeriod: bigint;
  /** Asset vaults */
  vaults: Vault[];
  /** Withdrawal params */
  withdrawParams: WithdrawParams;
  /** Protocol limitations */
  protocolLimits: ProtocolLimits;
  /** Protocol fees */
  protocolFees: ProtocolFees;
  /** TSS params */
  tssParams: TSSParams;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.btcbridge.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** The minimum number of confirmations required for the deposit transactions */
  deposit_confirmation_depth?: number;
  /** The minimum number of confirmations required for the withdrawal transactions */
  withdraw_confirmation_depth?: number;
  /** The allowed maximum depth for bitcoin block reorganization */
  max_reorg_depth?: number;
  /** Indicates the maximum depth or distance from the latest block up to which transactions are considered for acceptance. */
  max_acceptable_block_depth?: string;
  /** The denomination of the voucher */
  btc_voucher_denom?: string;
  /** Indicates if deposit is enabled */
  deposit_enabled?: boolean;
  /** Indicates if withdrawal is enabled */
  withdraw_enabled?: boolean;
  /** Trusted relayers for non-btc asset deposit */
  trusted_non_btc_relayers?: string[];
  /** Trusted fee providers to submit bitcoin fee rate */
  trusted_fee_providers?: string[];
  /** Period of validity for the fee rate */
  fee_rate_validity_period?: string;
  /** Asset vaults */
  vaults?: VaultAmino[];
  /** Withdrawal params */
  withdraw_params?: WithdrawParamsAmino;
  /** Protocol limitations */
  protocol_limits?: ProtocolLimitsAmino;
  /** Protocol fees */
  protocol_fees?: ProtocolFeesAmino;
  /** TSS params */
  tss_params?: TSSParamsAmino;
}
export interface ParamsAminoMsg {
  type: "/side.btcbridge.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  deposit_confirmation_depth: number;
  withdraw_confirmation_depth: number;
  max_reorg_depth: number;
  max_acceptable_block_depth: bigint;
  btc_voucher_denom: string;
  deposit_enabled: boolean;
  withdraw_enabled: boolean;
  trusted_non_btc_relayers: string[];
  trusted_fee_providers: string[];
  fee_rate_validity_period: bigint;
  vaults: VaultSDKType[];
  withdraw_params: WithdrawParamsSDKType;
  protocol_limits: ProtocolLimitsSDKType;
  protocol_fees: ProtocolFeesSDKType;
  tss_params: TSSParamsSDKType;
}
/** Vault defines the asset vault */
export interface Vault {
  /** the vault address for deposit */
  address: string;
  /** public key of the vault */
  pubKey: string;
  /** the asset type supported by the vault */
  assetType: AssetType;
  /** version */
  version: bigint;
}
export interface VaultProtoMsg {
  typeUrl: "/side.btcbridge.Vault";
  value: Uint8Array;
}
/** Vault defines the asset vault */
export interface VaultAmino {
  /** the vault address for deposit */
  address?: string;
  /** public key of the vault */
  pub_key?: string;
  /** the asset type supported by the vault */
  asset_type?: AssetType;
  /** version */
  version?: string;
}
export interface VaultAminoMsg {
  type: "/side.btcbridge.Vault";
  value: VaultAmino;
}
/** Vault defines the asset vault */
export interface VaultSDKType {
  address: string;
  pub_key: string;
  asset_type: AssetType;
  version: bigint;
}
export interface WithdrawParams {
  /** Maximum number of utxos used to build the signing request; O means unlimited */
  maxUtxoNum: number;
  /** Period for handling btc withdrawal requests */
  btcBatchWithdrawPeriod: bigint;
  /** Maximum number of btc withdrawal requests to be handled per batch */
  maxBtcBatchWithdrawNum: number;
}
export interface WithdrawParamsProtoMsg {
  typeUrl: "/side.btcbridge.WithdrawParams";
  value: Uint8Array;
}
export interface WithdrawParamsAmino {
  /** Maximum number of utxos used to build the signing request; O means unlimited */
  max_utxo_num?: number;
  /** Period for handling btc withdrawal requests */
  btc_batch_withdraw_period?: string;
  /** Maximum number of btc withdrawal requests to be handled per batch */
  max_btc_batch_withdraw_num?: number;
}
export interface WithdrawParamsAminoMsg {
  type: "/side.btcbridge.WithdrawParams";
  value: WithdrawParamsAmino;
}
export interface WithdrawParamsSDKType {
  max_utxo_num: number;
  btc_batch_withdraw_period: bigint;
  max_btc_batch_withdraw_num: number;
}
/** ProtocolLimits defines the params related to the the protocol limitations */
export interface ProtocolLimits {
  /** The minimum deposit amount for btc in sat */
  btcMinDeposit: bigint;
  /** The minimum withdrawal amount for btc in sat */
  btcMinWithdraw: bigint;
  /** The maximum withdrawal amount for btc in sat */
  btcMaxWithdraw: bigint;
}
export interface ProtocolLimitsProtoMsg {
  typeUrl: "/side.btcbridge.ProtocolLimits";
  value: Uint8Array;
}
/** ProtocolLimits defines the params related to the the protocol limitations */
export interface ProtocolLimitsAmino {
  /** The minimum deposit amount for btc in sat */
  btc_min_deposit?: string;
  /** The minimum withdrawal amount for btc in sat */
  btc_min_withdraw?: string;
  /** The maximum withdrawal amount for btc in sat */
  btc_max_withdraw?: string;
}
export interface ProtocolLimitsAminoMsg {
  type: "/side.btcbridge.ProtocolLimits";
  value: ProtocolLimitsAmino;
}
/** ProtocolLimits defines the params related to the the protocol limitations */
export interface ProtocolLimitsSDKType {
  btc_min_deposit: bigint;
  btc_min_withdraw: bigint;
  btc_max_withdraw: bigint;
}
/** ProtocolFees defines the params related to the protocol fees */
export interface ProtocolFees {
  /** Protocol fee amount for deposit in sat */
  depositFee: bigint;
  /** Protocol fee amount for withdrawal in sat */
  withdrawFee: bigint;
  /** Protocol fee collector */
  collector: string;
}
export interface ProtocolFeesProtoMsg {
  typeUrl: "/side.btcbridge.ProtocolFees";
  value: Uint8Array;
}
/** ProtocolFees defines the params related to the protocol fees */
export interface ProtocolFeesAmino {
  /** Protocol fee amount for deposit in sat */
  deposit_fee?: string;
  /** Protocol fee amount for withdrawal in sat */
  withdraw_fee?: string;
  /** Protocol fee collector */
  collector?: string;
}
export interface ProtocolFeesAminoMsg {
  type: "/side.btcbridge.ProtocolFees";
  value: ProtocolFeesAmino;
}
/** ProtocolFees defines the params related to the protocol fees */
export interface ProtocolFeesSDKType {
  deposit_fee: bigint;
  withdraw_fee: bigint;
  collector: string;
}
/** TSSParams defines the params related to TSS */
export interface TSSParams {
  /** Timeout duration for DKG request */
  dkgTimeoutPeriod: Duration;
  /** Transition period after which TSS participants update process is completed */
  participantUpdateTransitionPeriod: Duration;
}
export interface TSSParamsProtoMsg {
  typeUrl: "/side.btcbridge.TSSParams";
  value: Uint8Array;
}
/** TSSParams defines the params related to TSS */
export interface TSSParamsAmino {
  /** Timeout duration for DKG request */
  dkg_timeout_period?: DurationAmino;
  /** Transition period after which TSS participants update process is completed */
  participant_update_transition_period?: DurationAmino;
}
export interface TSSParamsAminoMsg {
  type: "/side.btcbridge.TSSParams";
  value: TSSParamsAmino;
}
/** TSSParams defines the params related to TSS */
export interface TSSParamsSDKType {
  dkg_timeout_period: DurationSDKType;
  participant_update_transition_period: DurationSDKType;
}
function createBaseParams(): Params {
  return {
    depositConfirmationDepth: 0,
    withdrawConfirmationDepth: 0,
    maxReorgDepth: 0,
    maxAcceptableBlockDepth: BigInt(0),
    btcVoucherDenom: "",
    depositEnabled: false,
    withdrawEnabled: false,
    trustedNonBtcRelayers: [],
    trustedFeeProviders: [],
    feeRateValidityPeriod: BigInt(0),
    vaults: [],
    withdrawParams: WithdrawParams.fromPartial({}),
    protocolLimits: ProtocolLimits.fromPartial({}),
    protocolFees: ProtocolFees.fromPartial({}),
    tssParams: TSSParams.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/side.btcbridge.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.depositConfirmationDepth !== 0) {
      writer.uint32(8).int32(message.depositConfirmationDepth);
    }
    if (message.withdrawConfirmationDepth !== 0) {
      writer.uint32(16).int32(message.withdrawConfirmationDepth);
    }
    if (message.maxReorgDepth !== 0) {
      writer.uint32(24).int32(message.maxReorgDepth);
    }
    if (message.maxAcceptableBlockDepth !== BigInt(0)) {
      writer.uint32(32).uint64(message.maxAcceptableBlockDepth);
    }
    if (message.btcVoucherDenom !== "") {
      writer.uint32(42).string(message.btcVoucherDenom);
    }
    if (message.depositEnabled === true) {
      writer.uint32(48).bool(message.depositEnabled);
    }
    if (message.withdrawEnabled === true) {
      writer.uint32(56).bool(message.withdrawEnabled);
    }
    for (const v of message.trustedNonBtcRelayers) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.trustedFeeProviders) {
      writer.uint32(74).string(v!);
    }
    if (message.feeRateValidityPeriod !== BigInt(0)) {
      writer.uint32(80).int64(message.feeRateValidityPeriod);
    }
    for (const v of message.vaults) {
      Vault.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.withdrawParams !== undefined) {
      WithdrawParams.encode(message.withdrawParams, writer.uint32(98).fork()).ldelim();
    }
    if (message.protocolLimits !== undefined) {
      ProtocolLimits.encode(message.protocolLimits, writer.uint32(106).fork()).ldelim();
    }
    if (message.protocolFees !== undefined) {
      ProtocolFees.encode(message.protocolFees, writer.uint32(114).fork()).ldelim();
    }
    if (message.tssParams !== undefined) {
      TSSParams.encode(message.tssParams, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositConfirmationDepth = reader.int32();
          break;
        case 2:
          message.withdrawConfirmationDepth = reader.int32();
          break;
        case 3:
          message.maxReorgDepth = reader.int32();
          break;
        case 4:
          message.maxAcceptableBlockDepth = reader.uint64();
          break;
        case 5:
          message.btcVoucherDenom = reader.string();
          break;
        case 6:
          message.depositEnabled = reader.bool();
          break;
        case 7:
          message.withdrawEnabled = reader.bool();
          break;
        case 8:
          message.trustedNonBtcRelayers.push(reader.string());
          break;
        case 9:
          message.trustedFeeProviders.push(reader.string());
          break;
        case 10:
          message.feeRateValidityPeriod = reader.int64();
          break;
        case 11:
          message.vaults.push(Vault.decode(reader, reader.uint32()));
          break;
        case 12:
          message.withdrawParams = WithdrawParams.decode(reader, reader.uint32());
          break;
        case 13:
          message.protocolLimits = ProtocolLimits.decode(reader, reader.uint32());
          break;
        case 14:
          message.protocolFees = ProtocolFees.decode(reader, reader.uint32());
          break;
        case 15:
          message.tssParams = TSSParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.depositConfirmationDepth = object.depositConfirmationDepth ?? 0;
    message.withdrawConfirmationDepth = object.withdrawConfirmationDepth ?? 0;
    message.maxReorgDepth = object.maxReorgDepth ?? 0;
    message.maxAcceptableBlockDepth = object.maxAcceptableBlockDepth !== undefined && object.maxAcceptableBlockDepth !== null ? BigInt(object.maxAcceptableBlockDepth.toString()) : BigInt(0);
    message.btcVoucherDenom = object.btcVoucherDenom ?? "";
    message.depositEnabled = object.depositEnabled ?? false;
    message.withdrawEnabled = object.withdrawEnabled ?? false;
    message.trustedNonBtcRelayers = object.trustedNonBtcRelayers?.map(e => e) || [];
    message.trustedFeeProviders = object.trustedFeeProviders?.map(e => e) || [];
    message.feeRateValidityPeriod = object.feeRateValidityPeriod !== undefined && object.feeRateValidityPeriod !== null ? BigInt(object.feeRateValidityPeriod.toString()) : BigInt(0);
    message.vaults = object.vaults?.map(e => Vault.fromPartial(e)) || [];
    message.withdrawParams = object.withdrawParams !== undefined && object.withdrawParams !== null ? WithdrawParams.fromPartial(object.withdrawParams) : undefined;
    message.protocolLimits = object.protocolLimits !== undefined && object.protocolLimits !== null ? ProtocolLimits.fromPartial(object.protocolLimits) : undefined;
    message.protocolFees = object.protocolFees !== undefined && object.protocolFees !== null ? ProtocolFees.fromPartial(object.protocolFees) : undefined;
    message.tssParams = object.tssParams !== undefined && object.tssParams !== null ? TSSParams.fromPartial(object.tssParams) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.deposit_confirmation_depth !== undefined && object.deposit_confirmation_depth !== null) {
      message.depositConfirmationDepth = object.deposit_confirmation_depth;
    }
    if (object.withdraw_confirmation_depth !== undefined && object.withdraw_confirmation_depth !== null) {
      message.withdrawConfirmationDepth = object.withdraw_confirmation_depth;
    }
    if (object.max_reorg_depth !== undefined && object.max_reorg_depth !== null) {
      message.maxReorgDepth = object.max_reorg_depth;
    }
    if (object.max_acceptable_block_depth !== undefined && object.max_acceptable_block_depth !== null) {
      message.maxAcceptableBlockDepth = BigInt(object.max_acceptable_block_depth);
    }
    if (object.btc_voucher_denom !== undefined && object.btc_voucher_denom !== null) {
      message.btcVoucherDenom = object.btc_voucher_denom;
    }
    if (object.deposit_enabled !== undefined && object.deposit_enabled !== null) {
      message.depositEnabled = object.deposit_enabled;
    }
    if (object.withdraw_enabled !== undefined && object.withdraw_enabled !== null) {
      message.withdrawEnabled = object.withdraw_enabled;
    }
    message.trustedNonBtcRelayers = object.trusted_non_btc_relayers?.map(e => e) || [];
    message.trustedFeeProviders = object.trusted_fee_providers?.map(e => e) || [];
    if (object.fee_rate_validity_period !== undefined && object.fee_rate_validity_period !== null) {
      message.feeRateValidityPeriod = BigInt(object.fee_rate_validity_period);
    }
    message.vaults = object.vaults?.map(e => Vault.fromAmino(e)) || [];
    if (object.withdraw_params !== undefined && object.withdraw_params !== null) {
      message.withdrawParams = WithdrawParams.fromAmino(object.withdraw_params);
    }
    if (object.protocol_limits !== undefined && object.protocol_limits !== null) {
      message.protocolLimits = ProtocolLimits.fromAmino(object.protocol_limits);
    }
    if (object.protocol_fees !== undefined && object.protocol_fees !== null) {
      message.protocolFees = ProtocolFees.fromAmino(object.protocol_fees);
    }
    if (object.tss_params !== undefined && object.tss_params !== null) {
      message.tssParams = TSSParams.fromAmino(object.tss_params);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.deposit_confirmation_depth = message.depositConfirmationDepth === 0 ? undefined : message.depositConfirmationDepth;
    obj.withdraw_confirmation_depth = message.withdrawConfirmationDepth === 0 ? undefined : message.withdrawConfirmationDepth;
    obj.max_reorg_depth = message.maxReorgDepth === 0 ? undefined : message.maxReorgDepth;
    obj.max_acceptable_block_depth = message.maxAcceptableBlockDepth !== BigInt(0) ? message.maxAcceptableBlockDepth.toString() : undefined;
    obj.btc_voucher_denom = message.btcVoucherDenom === "" ? undefined : message.btcVoucherDenom;
    obj.deposit_enabled = message.depositEnabled === false ? undefined : message.depositEnabled;
    obj.withdraw_enabled = message.withdrawEnabled === false ? undefined : message.withdrawEnabled;
    if (message.trustedNonBtcRelayers) {
      obj.trusted_non_btc_relayers = message.trustedNonBtcRelayers.map(e => e);
    } else {
      obj.trusted_non_btc_relayers = message.trustedNonBtcRelayers;
    }
    if (message.trustedFeeProviders) {
      obj.trusted_fee_providers = message.trustedFeeProviders.map(e => e);
    } else {
      obj.trusted_fee_providers = message.trustedFeeProviders;
    }
    obj.fee_rate_validity_period = message.feeRateValidityPeriod !== BigInt(0) ? message.feeRateValidityPeriod.toString() : undefined;
    if (message.vaults) {
      obj.vaults = message.vaults.map(e => e ? Vault.toAmino(e) : undefined);
    } else {
      obj.vaults = message.vaults;
    }
    obj.withdraw_params = message.withdrawParams ? WithdrawParams.toAmino(message.withdrawParams) : undefined;
    obj.protocol_limits = message.protocolLimits ? ProtocolLimits.toAmino(message.protocolLimits) : undefined;
    obj.protocol_fees = message.protocolFees ? ProtocolFees.toAmino(message.protocolFees) : undefined;
    obj.tss_params = message.tssParams ? TSSParams.toAmino(message.tssParams) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseVault(): Vault {
  return {
    address: "",
    pubKey: "",
    assetType: 0,
    version: BigInt(0)
  };
}
export const Vault = {
  typeUrl: "/side.btcbridge.Vault",
  encode(message: Vault, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    if (message.assetType !== 0) {
      writer.uint32(24).int32(message.assetType);
    }
    if (message.version !== BigInt(0)) {
      writer.uint32(32).uint64(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Vault {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        case 3:
          message.assetType = reader.int32() as any;
          break;
        case 4:
          message.version = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Vault>): Vault {
    const message = createBaseVault();
    message.address = object.address ?? "";
    message.pubKey = object.pubKey ?? "";
    message.assetType = object.assetType ?? 0;
    message.version = object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: VaultAmino): Vault {
    const message = createBaseVault();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    if (object.asset_type !== undefined && object.asset_type !== null) {
      message.assetType = object.asset_type;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = BigInt(object.version);
    }
    return message;
  },
  toAmino(message: Vault): VaultAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    obj.asset_type = message.assetType === 0 ? undefined : message.assetType;
    obj.version = message.version !== BigInt(0) ? message.version.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: VaultAminoMsg): Vault {
    return Vault.fromAmino(object.value);
  },
  fromProtoMsg(message: VaultProtoMsg): Vault {
    return Vault.decode(message.value);
  },
  toProto(message: Vault): Uint8Array {
    return Vault.encode(message).finish();
  },
  toProtoMsg(message: Vault): VaultProtoMsg {
    return {
      typeUrl: "/side.btcbridge.Vault",
      value: Vault.encode(message).finish()
    };
  }
};
function createBaseWithdrawParams(): WithdrawParams {
  return {
    maxUtxoNum: 0,
    btcBatchWithdrawPeriod: BigInt(0),
    maxBtcBatchWithdrawNum: 0
  };
}
export const WithdrawParams = {
  typeUrl: "/side.btcbridge.WithdrawParams",
  encode(message: WithdrawParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxUtxoNum !== 0) {
      writer.uint32(8).uint32(message.maxUtxoNum);
    }
    if (message.btcBatchWithdrawPeriod !== BigInt(0)) {
      writer.uint32(16).int64(message.btcBatchWithdrawPeriod);
    }
    if (message.maxBtcBatchWithdrawNum !== 0) {
      writer.uint32(24).uint32(message.maxBtcBatchWithdrawNum);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): WithdrawParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxUtxoNum = reader.uint32();
          break;
        case 2:
          message.btcBatchWithdrawPeriod = reader.int64();
          break;
        case 3:
          message.maxBtcBatchWithdrawNum = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WithdrawParams>): WithdrawParams {
    const message = createBaseWithdrawParams();
    message.maxUtxoNum = object.maxUtxoNum ?? 0;
    message.btcBatchWithdrawPeriod = object.btcBatchWithdrawPeriod !== undefined && object.btcBatchWithdrawPeriod !== null ? BigInt(object.btcBatchWithdrawPeriod.toString()) : BigInt(0);
    message.maxBtcBatchWithdrawNum = object.maxBtcBatchWithdrawNum ?? 0;
    return message;
  },
  fromAmino(object: WithdrawParamsAmino): WithdrawParams {
    const message = createBaseWithdrawParams();
    if (object.max_utxo_num !== undefined && object.max_utxo_num !== null) {
      message.maxUtxoNum = object.max_utxo_num;
    }
    if (object.btc_batch_withdraw_period !== undefined && object.btc_batch_withdraw_period !== null) {
      message.btcBatchWithdrawPeriod = BigInt(object.btc_batch_withdraw_period);
    }
    if (object.max_btc_batch_withdraw_num !== undefined && object.max_btc_batch_withdraw_num !== null) {
      message.maxBtcBatchWithdrawNum = object.max_btc_batch_withdraw_num;
    }
    return message;
  },
  toAmino(message: WithdrawParams): WithdrawParamsAmino {
    const obj: any = {};
    obj.max_utxo_num = message.maxUtxoNum === 0 ? undefined : message.maxUtxoNum;
    obj.btc_batch_withdraw_period = message.btcBatchWithdrawPeriod !== BigInt(0) ? message.btcBatchWithdrawPeriod.toString() : undefined;
    obj.max_btc_batch_withdraw_num = message.maxBtcBatchWithdrawNum === 0 ? undefined : message.maxBtcBatchWithdrawNum;
    return obj;
  },
  fromAminoMsg(object: WithdrawParamsAminoMsg): WithdrawParams {
    return WithdrawParams.fromAmino(object.value);
  },
  fromProtoMsg(message: WithdrawParamsProtoMsg): WithdrawParams {
    return WithdrawParams.decode(message.value);
  },
  toProto(message: WithdrawParams): Uint8Array {
    return WithdrawParams.encode(message).finish();
  },
  toProtoMsg(message: WithdrawParams): WithdrawParamsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.WithdrawParams",
      value: WithdrawParams.encode(message).finish()
    };
  }
};
function createBaseProtocolLimits(): ProtocolLimits {
  return {
    btcMinDeposit: BigInt(0),
    btcMinWithdraw: BigInt(0),
    btcMaxWithdraw: BigInt(0)
  };
}
export const ProtocolLimits = {
  typeUrl: "/side.btcbridge.ProtocolLimits",
  encode(message: ProtocolLimits, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.btcMinDeposit !== BigInt(0)) {
      writer.uint32(8).int64(message.btcMinDeposit);
    }
    if (message.btcMinWithdraw !== BigInt(0)) {
      writer.uint32(16).int64(message.btcMinWithdraw);
    }
    if (message.btcMaxWithdraw !== BigInt(0)) {
      writer.uint32(24).int64(message.btcMaxWithdraw);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProtocolLimits {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolLimits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.btcMinDeposit = reader.int64();
          break;
        case 2:
          message.btcMinWithdraw = reader.int64();
          break;
        case 3:
          message.btcMaxWithdraw = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ProtocolLimits>): ProtocolLimits {
    const message = createBaseProtocolLimits();
    message.btcMinDeposit = object.btcMinDeposit !== undefined && object.btcMinDeposit !== null ? BigInt(object.btcMinDeposit.toString()) : BigInt(0);
    message.btcMinWithdraw = object.btcMinWithdraw !== undefined && object.btcMinWithdraw !== null ? BigInt(object.btcMinWithdraw.toString()) : BigInt(0);
    message.btcMaxWithdraw = object.btcMaxWithdraw !== undefined && object.btcMaxWithdraw !== null ? BigInt(object.btcMaxWithdraw.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ProtocolLimitsAmino): ProtocolLimits {
    const message = createBaseProtocolLimits();
    if (object.btc_min_deposit !== undefined && object.btc_min_deposit !== null) {
      message.btcMinDeposit = BigInt(object.btc_min_deposit);
    }
    if (object.btc_min_withdraw !== undefined && object.btc_min_withdraw !== null) {
      message.btcMinWithdraw = BigInt(object.btc_min_withdraw);
    }
    if (object.btc_max_withdraw !== undefined && object.btc_max_withdraw !== null) {
      message.btcMaxWithdraw = BigInt(object.btc_max_withdraw);
    }
    return message;
  },
  toAmino(message: ProtocolLimits): ProtocolLimitsAmino {
    const obj: any = {};
    obj.btc_min_deposit = message.btcMinDeposit !== BigInt(0) ? message.btcMinDeposit.toString() : undefined;
    obj.btc_min_withdraw = message.btcMinWithdraw !== BigInt(0) ? message.btcMinWithdraw.toString() : undefined;
    obj.btc_max_withdraw = message.btcMaxWithdraw !== BigInt(0) ? message.btcMaxWithdraw.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ProtocolLimitsAminoMsg): ProtocolLimits {
    return ProtocolLimits.fromAmino(object.value);
  },
  fromProtoMsg(message: ProtocolLimitsProtoMsg): ProtocolLimits {
    return ProtocolLimits.decode(message.value);
  },
  toProto(message: ProtocolLimits): Uint8Array {
    return ProtocolLimits.encode(message).finish();
  },
  toProtoMsg(message: ProtocolLimits): ProtocolLimitsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.ProtocolLimits",
      value: ProtocolLimits.encode(message).finish()
    };
  }
};
function createBaseProtocolFees(): ProtocolFees {
  return {
    depositFee: BigInt(0),
    withdrawFee: BigInt(0),
    collector: ""
  };
}
export const ProtocolFees = {
  typeUrl: "/side.btcbridge.ProtocolFees",
  encode(message: ProtocolFees, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.depositFee !== BigInt(0)) {
      writer.uint32(8).int64(message.depositFee);
    }
    if (message.withdrawFee !== BigInt(0)) {
      writer.uint32(16).int64(message.withdrawFee);
    }
    if (message.collector !== "") {
      writer.uint32(26).string(message.collector);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProtocolFees {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositFee = reader.int64();
          break;
        case 2:
          message.withdrawFee = reader.int64();
          break;
        case 3:
          message.collector = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ProtocolFees>): ProtocolFees {
    const message = createBaseProtocolFees();
    message.depositFee = object.depositFee !== undefined && object.depositFee !== null ? BigInt(object.depositFee.toString()) : BigInt(0);
    message.withdrawFee = object.withdrawFee !== undefined && object.withdrawFee !== null ? BigInt(object.withdrawFee.toString()) : BigInt(0);
    message.collector = object.collector ?? "";
    return message;
  },
  fromAmino(object: ProtocolFeesAmino): ProtocolFees {
    const message = createBaseProtocolFees();
    if (object.deposit_fee !== undefined && object.deposit_fee !== null) {
      message.depositFee = BigInt(object.deposit_fee);
    }
    if (object.withdraw_fee !== undefined && object.withdraw_fee !== null) {
      message.withdrawFee = BigInt(object.withdraw_fee);
    }
    if (object.collector !== undefined && object.collector !== null) {
      message.collector = object.collector;
    }
    return message;
  },
  toAmino(message: ProtocolFees): ProtocolFeesAmino {
    const obj: any = {};
    obj.deposit_fee = message.depositFee !== BigInt(0) ? message.depositFee.toString() : undefined;
    obj.withdraw_fee = message.withdrawFee !== BigInt(0) ? message.withdrawFee.toString() : undefined;
    obj.collector = message.collector === "" ? undefined : message.collector;
    return obj;
  },
  fromAminoMsg(object: ProtocolFeesAminoMsg): ProtocolFees {
    return ProtocolFees.fromAmino(object.value);
  },
  fromProtoMsg(message: ProtocolFeesProtoMsg): ProtocolFees {
    return ProtocolFees.decode(message.value);
  },
  toProto(message: ProtocolFees): Uint8Array {
    return ProtocolFees.encode(message).finish();
  },
  toProtoMsg(message: ProtocolFees): ProtocolFeesProtoMsg {
    return {
      typeUrl: "/side.btcbridge.ProtocolFees",
      value: ProtocolFees.encode(message).finish()
    };
  }
};
function createBaseTSSParams(): TSSParams {
  return {
    dkgTimeoutPeriod: Duration.fromPartial({}),
    participantUpdateTransitionPeriod: Duration.fromPartial({})
  };
}
export const TSSParams = {
  typeUrl: "/side.btcbridge.TSSParams",
  encode(message: TSSParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dkgTimeoutPeriod !== undefined) {
      Duration.encode(message.dkgTimeoutPeriod, writer.uint32(10).fork()).ldelim();
    }
    if (message.participantUpdateTransitionPeriod !== undefined) {
      Duration.encode(message.participantUpdateTransitionPeriod, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TSSParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTSSParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dkgTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 2:
          message.participantUpdateTransitionPeriod = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TSSParams>): TSSParams {
    const message = createBaseTSSParams();
    message.dkgTimeoutPeriod = object.dkgTimeoutPeriod !== undefined && object.dkgTimeoutPeriod !== null ? Duration.fromPartial(object.dkgTimeoutPeriod) : undefined;
    message.participantUpdateTransitionPeriod = object.participantUpdateTransitionPeriod !== undefined && object.participantUpdateTransitionPeriod !== null ? Duration.fromPartial(object.participantUpdateTransitionPeriod) : undefined;
    return message;
  },
  fromAmino(object: TSSParamsAmino): TSSParams {
    const message = createBaseTSSParams();
    if (object.dkg_timeout_period !== undefined && object.dkg_timeout_period !== null) {
      message.dkgTimeoutPeriod = Duration.fromAmino(object.dkg_timeout_period);
    }
    if (object.participant_update_transition_period !== undefined && object.participant_update_transition_period !== null) {
      message.participantUpdateTransitionPeriod = Duration.fromAmino(object.participant_update_transition_period);
    }
    return message;
  },
  toAmino(message: TSSParams): TSSParamsAmino {
    const obj: any = {};
    obj.dkg_timeout_period = message.dkgTimeoutPeriod ? Duration.toAmino(message.dkgTimeoutPeriod) : undefined;
    obj.participant_update_transition_period = message.participantUpdateTransitionPeriod ? Duration.toAmino(message.participantUpdateTransitionPeriod) : undefined;
    return obj;
  },
  fromAminoMsg(object: TSSParamsAminoMsg): TSSParams {
    return TSSParams.fromAmino(object.value);
  },
  fromProtoMsg(message: TSSParamsProtoMsg): TSSParams {
    return TSSParams.decode(message.value);
  },
  toProto(message: TSSParams): Uint8Array {
    return TSSParams.encode(message).finish();
  },
  toProtoMsg(message: TSSParams): TSSParamsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.TSSParams",
      value: TSSParams.encode(message).finish()
    };
  }
};