//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../helpers";
export enum LiquidationStatus {
  LIQUIDATION_STATUS_UNSPECIFIED = 0,
  LIQUIDATION_STATUS_LIQUIDATING = 1,
  LIQUIDATION_STATUS_LIQUIDATED = 2,
  LIQUIDATION_STATUS_SETTLING = 3,
  LIQUIDATION_STATUS_SETTLED = 4,
  UNRECOGNIZED = -1,
}
export const LiquidationStatusSDKType = LiquidationStatus;
export const LiquidationStatusAmino = LiquidationStatus;
export function liquidationStatusFromJSON(object: any): LiquidationStatus {
  switch (object) {
    case 0:
    case "LIQUIDATION_STATUS_UNSPECIFIED":
      return LiquidationStatus.LIQUIDATION_STATUS_UNSPECIFIED;
    case 1:
    case "LIQUIDATION_STATUS_LIQUIDATING":
      return LiquidationStatus.LIQUIDATION_STATUS_LIQUIDATING;
    case 2:
    case "LIQUIDATION_STATUS_LIQUIDATED":
      return LiquidationStatus.LIQUIDATION_STATUS_LIQUIDATED;
    case 3:
    case "LIQUIDATION_STATUS_SETTLING":
      return LiquidationStatus.LIQUIDATION_STATUS_SETTLING;
    case 4:
    case "LIQUIDATION_STATUS_SETTLED":
      return LiquidationStatus.LIQUIDATION_STATUS_SETTLED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LiquidationStatus.UNRECOGNIZED;
  }
}
export function liquidationStatusToJSON(object: LiquidationStatus): string {
  switch (object) {
    case LiquidationStatus.LIQUIDATION_STATUS_UNSPECIFIED:
      return "LIQUIDATION_STATUS_UNSPECIFIED";
    case LiquidationStatus.LIQUIDATION_STATUS_LIQUIDATING:
      return "LIQUIDATION_STATUS_LIQUIDATING";
    case LiquidationStatus.LIQUIDATION_STATUS_LIQUIDATED:
      return "LIQUIDATION_STATUS_LIQUIDATED";
    case LiquidationStatus.LIQUIDATION_STATUS_SETTLING:
      return "LIQUIDATION_STATUS_SETTLING";
    case LiquidationStatus.LIQUIDATION_STATUS_SETTLED:
      return "LIQUIDATION_STATUS_SETTLED";
    case LiquidationStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Signing intent */
export enum SigningIntent {
  SIGNING_INTENT_DEFAULT = 0,
  UNRECOGNIZED = -1,
}
export const SigningIntentSDKType = SigningIntent;
export const SigningIntentAmino = SigningIntent;
export function signingIntentFromJSON(object: any): SigningIntent {
  switch (object) {
    case 0:
    case "SIGNING_INTENT_DEFAULT":
      return SigningIntent.SIGNING_INTENT_DEFAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SigningIntent.UNRECOGNIZED;
  }
}
export function signingIntentToJSON(object: SigningIntent): string {
  switch (object) {
    case SigningIntent.SIGNING_INTENT_DEFAULT:
      return "SIGNING_INTENT_DEFAULT";
    case SigningIntent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface AssetMetadata {
  denom: string;
  symbol: string;
  decimals: number;
  priceSymbol: string;
  isBasePriceAsset: boolean;
}
export interface AssetMetadataProtoMsg {
  typeUrl: "/side.liquidation.AssetMetadata";
  value: Uint8Array;
}
export interface AssetMetadataAmino {
  denom?: string;
  symbol?: string;
  decimals?: number;
  price_symbol?: string;
  is_base_price_asset?: boolean;
}
export interface AssetMetadataAminoMsg {
  type: "/side.liquidation.AssetMetadata";
  value: AssetMetadataAmino;
}
export interface AssetMetadataSDKType {
  denom: string;
  symbol: string;
  decimals: number;
  price_symbol: string;
  is_base_price_asset: boolean;
}
export interface Liquidation {
  id: bigint;
  loanId: string;
  debtor: string;
  dcm: string;
  collateralAmount: Coin;
  actualCollateralAmount: Coin;
  debtAmount: Coin;
  collateralAsset: AssetMetadata;
  debtAsset: AssetMetadata;
  liquidationPrice: string;
  liquidationTime: Date;
  liquidatedCollateralAmount: Coin;
  liquidatedDebtAmount: Coin;
  liquidationBonusAmount: Coin;
  protocolLiquidationFee: Coin;
  unliquidatedCollateralAmount: Coin;
  liquidationCet: string;
  settlementTx: string;
  settlementTxId: string;
  status: LiquidationStatus;
}
export interface LiquidationProtoMsg {
  typeUrl: "/side.liquidation.Liquidation";
  value: Uint8Array;
}
export interface LiquidationAmino {
  id?: string;
  loan_id?: string;
  debtor?: string;
  dcm?: string;
  collateral_amount?: CoinAmino;
  actual_collateral_amount?: CoinAmino;
  debt_amount?: CoinAmino;
  collateral_asset?: AssetMetadataAmino;
  debt_asset?: AssetMetadataAmino;
  liquidation_price?: string;
  liquidation_time?: string;
  liquidated_collateral_amount?: CoinAmino;
  liquidated_debt_amount?: CoinAmino;
  liquidation_bonus_amount?: CoinAmino;
  protocol_liquidation_fee?: CoinAmino;
  unliquidated_collateral_amount?: CoinAmino;
  liquidation_cet?: string;
  settlement_tx?: string;
  settlement_tx_id?: string;
  status?: LiquidationStatus;
}
export interface LiquidationAminoMsg {
  type: "/side.liquidation.Liquidation";
  value: LiquidationAmino;
}
export interface LiquidationSDKType {
  id: bigint;
  loan_id: string;
  debtor: string;
  dcm: string;
  collateral_amount: CoinSDKType;
  actual_collateral_amount: CoinSDKType;
  debt_amount: CoinSDKType;
  collateral_asset: AssetMetadataSDKType;
  debt_asset: AssetMetadataSDKType;
  liquidation_price: string;
  liquidation_time: Date;
  liquidated_collateral_amount: CoinSDKType;
  liquidated_debt_amount: CoinSDKType;
  liquidation_bonus_amount: CoinSDKType;
  protocol_liquidation_fee: CoinSDKType;
  unliquidated_collateral_amount: CoinSDKType;
  liquidation_cet: string;
  settlement_tx: string;
  settlement_tx_id: string;
  status: LiquidationStatus;
}
export interface LiquidationRecord {
  id: bigint;
  liquidationId: bigint;
  liquidator: string;
  debtAmount: Coin;
  collateralAmount: Coin;
  bonusAmount: Coin;
  time: Date;
}
export interface LiquidationRecordProtoMsg {
  typeUrl: "/side.liquidation.LiquidationRecord";
  value: Uint8Array;
}
export interface LiquidationRecordAmino {
  id?: string;
  liquidation_id?: string;
  liquidator?: string;
  debt_amount?: CoinAmino;
  collateral_amount?: CoinAmino;
  bonus_amount?: CoinAmino;
  time?: string;
}
export interface LiquidationRecordAminoMsg {
  type: "/side.liquidation.LiquidationRecord";
  value: LiquidationRecordAmino;
}
export interface LiquidationRecordSDKType {
  id: bigint;
  liquidation_id: bigint;
  liquidator: string;
  debt_amount: CoinSDKType;
  collateral_amount: CoinSDKType;
  bonus_amount: CoinSDKType;
  time: Date;
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
  typeUrl: "/side.liquidation.AssetMetadata",
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
      typeUrl: "/side.liquidation.AssetMetadata",
      value: AssetMetadata.encode(message).finish()
    };
  }
};
function createBaseLiquidation(): Liquidation {
  return {
    id: BigInt(0),
    loanId: "",
    debtor: "",
    dcm: "",
    collateralAmount: Coin.fromPartial({}),
    actualCollateralAmount: Coin.fromPartial({}),
    debtAmount: Coin.fromPartial({}),
    collateralAsset: AssetMetadata.fromPartial({}),
    debtAsset: AssetMetadata.fromPartial({}),
    liquidationPrice: "",
    liquidationTime: new Date(),
    liquidatedCollateralAmount: Coin.fromPartial({}),
    liquidatedDebtAmount: Coin.fromPartial({}),
    liquidationBonusAmount: Coin.fromPartial({}),
    protocolLiquidationFee: Coin.fromPartial({}),
    unliquidatedCollateralAmount: Coin.fromPartial({}),
    liquidationCet: "",
    settlementTx: "",
    settlementTxId: "",
    status: 0
  };
}
export const Liquidation = {
  typeUrl: "/side.liquidation.Liquidation",
  encode(message: Liquidation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    if (message.debtor !== "") {
      writer.uint32(26).string(message.debtor);
    }
    if (message.dcm !== "") {
      writer.uint32(34).string(message.dcm);
    }
    if (message.collateralAmount !== undefined) {
      Coin.encode(message.collateralAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.actualCollateralAmount !== undefined) {
      Coin.encode(message.actualCollateralAmount, writer.uint32(50).fork()).ldelim();
    }
    if (message.debtAmount !== undefined) {
      Coin.encode(message.debtAmount, writer.uint32(58).fork()).ldelim();
    }
    if (message.collateralAsset !== undefined) {
      AssetMetadata.encode(message.collateralAsset, writer.uint32(66).fork()).ldelim();
    }
    if (message.debtAsset !== undefined) {
      AssetMetadata.encode(message.debtAsset, writer.uint32(74).fork()).ldelim();
    }
    if (message.liquidationPrice !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.liquidationPrice, 18).atomics);
    }
    if (message.liquidationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.liquidationTime), writer.uint32(90).fork()).ldelim();
    }
    if (message.liquidatedCollateralAmount !== undefined) {
      Coin.encode(message.liquidatedCollateralAmount, writer.uint32(98).fork()).ldelim();
    }
    if (message.liquidatedDebtAmount !== undefined) {
      Coin.encode(message.liquidatedDebtAmount, writer.uint32(106).fork()).ldelim();
    }
    if (message.liquidationBonusAmount !== undefined) {
      Coin.encode(message.liquidationBonusAmount, writer.uint32(114).fork()).ldelim();
    }
    if (message.protocolLiquidationFee !== undefined) {
      Coin.encode(message.protocolLiquidationFee, writer.uint32(122).fork()).ldelim();
    }
    if (message.unliquidatedCollateralAmount !== undefined) {
      Coin.encode(message.unliquidatedCollateralAmount, writer.uint32(130).fork()).ldelim();
    }
    if (message.liquidationCet !== "") {
      writer.uint32(138).string(message.liquidationCet);
    }
    if (message.settlementTx !== "") {
      writer.uint32(146).string(message.settlementTx);
    }
    if (message.settlementTxId !== "") {
      writer.uint32(154).string(message.settlementTxId);
    }
    if (message.status !== 0) {
      writer.uint32(160).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Liquidation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidation();
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
          message.debtor = reader.string();
          break;
        case 4:
          message.dcm = reader.string();
          break;
        case 5:
          message.collateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.actualCollateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.debtAmount = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.collateralAsset = AssetMetadata.decode(reader, reader.uint32());
          break;
        case 9:
          message.debtAsset = AssetMetadata.decode(reader, reader.uint32());
          break;
        case 10:
          message.liquidationPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.liquidationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 12:
          message.liquidatedCollateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 13:
          message.liquidatedDebtAmount = Coin.decode(reader, reader.uint32());
          break;
        case 14:
          message.liquidationBonusAmount = Coin.decode(reader, reader.uint32());
          break;
        case 15:
          message.protocolLiquidationFee = Coin.decode(reader, reader.uint32());
          break;
        case 16:
          message.unliquidatedCollateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 17:
          message.liquidationCet = reader.string();
          break;
        case 18:
          message.settlementTx = reader.string();
          break;
        case 19:
          message.settlementTxId = reader.string();
          break;
        case 20:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Liquidation>): Liquidation {
    const message = createBaseLiquidation();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.loanId = object.loanId ?? "";
    message.debtor = object.debtor ?? "";
    message.dcm = object.dcm ?? "";
    message.collateralAmount = object.collateralAmount !== undefined && object.collateralAmount !== null ? Coin.fromPartial(object.collateralAmount) : undefined;
    message.actualCollateralAmount = object.actualCollateralAmount !== undefined && object.actualCollateralAmount !== null ? Coin.fromPartial(object.actualCollateralAmount) : undefined;
    message.debtAmount = object.debtAmount !== undefined && object.debtAmount !== null ? Coin.fromPartial(object.debtAmount) : undefined;
    message.collateralAsset = object.collateralAsset !== undefined && object.collateralAsset !== null ? AssetMetadata.fromPartial(object.collateralAsset) : undefined;
    message.debtAsset = object.debtAsset !== undefined && object.debtAsset !== null ? AssetMetadata.fromPartial(object.debtAsset) : undefined;
    message.liquidationPrice = object.liquidationPrice ?? "";
    message.liquidationTime = object.liquidationTime ?? undefined;
    message.liquidatedCollateralAmount = object.liquidatedCollateralAmount !== undefined && object.liquidatedCollateralAmount !== null ? Coin.fromPartial(object.liquidatedCollateralAmount) : undefined;
    message.liquidatedDebtAmount = object.liquidatedDebtAmount !== undefined && object.liquidatedDebtAmount !== null ? Coin.fromPartial(object.liquidatedDebtAmount) : undefined;
    message.liquidationBonusAmount = object.liquidationBonusAmount !== undefined && object.liquidationBonusAmount !== null ? Coin.fromPartial(object.liquidationBonusAmount) : undefined;
    message.protocolLiquidationFee = object.protocolLiquidationFee !== undefined && object.protocolLiquidationFee !== null ? Coin.fromPartial(object.protocolLiquidationFee) : undefined;
    message.unliquidatedCollateralAmount = object.unliquidatedCollateralAmount !== undefined && object.unliquidatedCollateralAmount !== null ? Coin.fromPartial(object.unliquidatedCollateralAmount) : undefined;
    message.liquidationCet = object.liquidationCet ?? "";
    message.settlementTx = object.settlementTx ?? "";
    message.settlementTxId = object.settlementTxId ?? "";
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: LiquidationAmino): Liquidation {
    const message = createBaseLiquidation();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.dcm !== undefined && object.dcm !== null) {
      message.dcm = object.dcm;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = Coin.fromAmino(object.collateral_amount);
    }
    if (object.actual_collateral_amount !== undefined && object.actual_collateral_amount !== null) {
      message.actualCollateralAmount = Coin.fromAmino(object.actual_collateral_amount);
    }
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = Coin.fromAmino(object.debt_amount);
    }
    if (object.collateral_asset !== undefined && object.collateral_asset !== null) {
      message.collateralAsset = AssetMetadata.fromAmino(object.collateral_asset);
    }
    if (object.debt_asset !== undefined && object.debt_asset !== null) {
      message.debtAsset = AssetMetadata.fromAmino(object.debt_asset);
    }
    if (object.liquidation_price !== undefined && object.liquidation_price !== null) {
      message.liquidationPrice = object.liquidation_price;
    }
    if (object.liquidation_time !== undefined && object.liquidation_time !== null) {
      message.liquidationTime = fromTimestamp(Timestamp.fromAmino(object.liquidation_time));
    }
    if (object.liquidated_collateral_amount !== undefined && object.liquidated_collateral_amount !== null) {
      message.liquidatedCollateralAmount = Coin.fromAmino(object.liquidated_collateral_amount);
    }
    if (object.liquidated_debt_amount !== undefined && object.liquidated_debt_amount !== null) {
      message.liquidatedDebtAmount = Coin.fromAmino(object.liquidated_debt_amount);
    }
    if (object.liquidation_bonus_amount !== undefined && object.liquidation_bonus_amount !== null) {
      message.liquidationBonusAmount = Coin.fromAmino(object.liquidation_bonus_amount);
    }
    if (object.protocol_liquidation_fee !== undefined && object.protocol_liquidation_fee !== null) {
      message.protocolLiquidationFee = Coin.fromAmino(object.protocol_liquidation_fee);
    }
    if (object.unliquidated_collateral_amount !== undefined && object.unliquidated_collateral_amount !== null) {
      message.unliquidatedCollateralAmount = Coin.fromAmino(object.unliquidated_collateral_amount);
    }
    if (object.liquidation_cet !== undefined && object.liquidation_cet !== null) {
      message.liquidationCet = object.liquidation_cet;
    }
    if (object.settlement_tx !== undefined && object.settlement_tx !== null) {
      message.settlementTx = object.settlement_tx;
    }
    if (object.settlement_tx_id !== undefined && object.settlement_tx_id !== null) {
      message.settlementTxId = object.settlement_tx_id;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Liquidation): LiquidationAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.dcm = message.dcm === "" ? undefined : message.dcm;
    obj.collateral_amount = message.collateralAmount ? Coin.toAmino(message.collateralAmount) : undefined;
    obj.actual_collateral_amount = message.actualCollateralAmount ? Coin.toAmino(message.actualCollateralAmount) : undefined;
    obj.debt_amount = message.debtAmount ? Coin.toAmino(message.debtAmount) : undefined;
    obj.collateral_asset = message.collateralAsset ? AssetMetadata.toAmino(message.collateralAsset) : undefined;
    obj.debt_asset = message.debtAsset ? AssetMetadata.toAmino(message.debtAsset) : undefined;
    obj.liquidation_price = message.liquidationPrice === "" ? undefined : message.liquidationPrice;
    obj.liquidation_time = message.liquidationTime ? Timestamp.toAmino(toTimestamp(message.liquidationTime)) : undefined;
    obj.liquidated_collateral_amount = message.liquidatedCollateralAmount ? Coin.toAmino(message.liquidatedCollateralAmount) : undefined;
    obj.liquidated_debt_amount = message.liquidatedDebtAmount ? Coin.toAmino(message.liquidatedDebtAmount) : undefined;
    obj.liquidation_bonus_amount = message.liquidationBonusAmount ? Coin.toAmino(message.liquidationBonusAmount) : undefined;
    obj.protocol_liquidation_fee = message.protocolLiquidationFee ? Coin.toAmino(message.protocolLiquidationFee) : undefined;
    obj.unliquidated_collateral_amount = message.unliquidatedCollateralAmount ? Coin.toAmino(message.unliquidatedCollateralAmount) : undefined;
    obj.liquidation_cet = message.liquidationCet === "" ? undefined : message.liquidationCet;
    obj.settlement_tx = message.settlementTx === "" ? undefined : message.settlementTx;
    obj.settlement_tx_id = message.settlementTxId === "" ? undefined : message.settlementTxId;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: LiquidationAminoMsg): Liquidation {
    return Liquidation.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidationProtoMsg): Liquidation {
    return Liquidation.decode(message.value);
  },
  toProto(message: Liquidation): Uint8Array {
    return Liquidation.encode(message).finish();
  },
  toProtoMsg(message: Liquidation): LiquidationProtoMsg {
    return {
      typeUrl: "/side.liquidation.Liquidation",
      value: Liquidation.encode(message).finish()
    };
  }
};
function createBaseLiquidationRecord(): LiquidationRecord {
  return {
    id: BigInt(0),
    liquidationId: BigInt(0),
    liquidator: "",
    debtAmount: Coin.fromPartial({}),
    collateralAmount: Coin.fromPartial({}),
    bonusAmount: Coin.fromPartial({}),
    time: new Date()
  };
}
export const LiquidationRecord = {
  typeUrl: "/side.liquidation.LiquidationRecord",
  encode(message: LiquidationRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(16).uint64(message.liquidationId);
    }
    if (message.liquidator !== "") {
      writer.uint32(26).string(message.liquidator);
    }
    if (message.debtAmount !== undefined) {
      Coin.encode(message.debtAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.collateralAmount !== undefined) {
      Coin.encode(message.collateralAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.bonusAmount !== undefined) {
      Coin.encode(message.bonusAmount, writer.uint32(50).fork()).ldelim();
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): LiquidationRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidationRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.liquidationId = reader.uint64();
          break;
        case 3:
          message.liquidator = reader.string();
          break;
        case 4:
          message.debtAmount = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.collateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.bonusAmount = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidationRecord>): LiquidationRecord {
    const message = createBaseLiquidationRecord();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.liquidator = object.liquidator ?? "";
    message.debtAmount = object.debtAmount !== undefined && object.debtAmount !== null ? Coin.fromPartial(object.debtAmount) : undefined;
    message.collateralAmount = object.collateralAmount !== undefined && object.collateralAmount !== null ? Coin.fromPartial(object.collateralAmount) : undefined;
    message.bonusAmount = object.bonusAmount !== undefined && object.bonusAmount !== null ? Coin.fromPartial(object.bonusAmount) : undefined;
    message.time = object.time ?? undefined;
    return message;
  },
  fromAmino(object: LiquidationRecordAmino): LiquidationRecord {
    const message = createBaseLiquidationRecord();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = Coin.fromAmino(object.debt_amount);
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = Coin.fromAmino(object.collateral_amount);
    }
    if (object.bonus_amount !== undefined && object.bonus_amount !== null) {
      message.bonusAmount = Coin.fromAmino(object.bonus_amount);
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = fromTimestamp(Timestamp.fromAmino(object.time));
    }
    return message;
  },
  toAmino(message: LiquidationRecord): LiquidationRecordAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.debt_amount = message.debtAmount ? Coin.toAmino(message.debtAmount) : undefined;
    obj.collateral_amount = message.collateralAmount ? Coin.toAmino(message.collateralAmount) : undefined;
    obj.bonus_amount = message.bonusAmount ? Coin.toAmino(message.bonusAmount) : undefined;
    obj.time = message.time ? Timestamp.toAmino(toTimestamp(message.time)) : undefined;
    return obj;
  },
  fromAminoMsg(object: LiquidationRecordAminoMsg): LiquidationRecord {
    return LiquidationRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidationRecordProtoMsg): LiquidationRecord {
    return LiquidationRecord.decode(message.value);
  },
  toProto(message: LiquidationRecord): Uint8Array {
    return LiquidationRecord.encode(message).finish();
  },
  toProtoMsg(message: LiquidationRecord): LiquidationRecordProtoMsg {
    return {
      typeUrl: "/side.liquidation.LiquidationRecord",
      value: LiquidationRecord.encode(message).finish()
    };
  }
};