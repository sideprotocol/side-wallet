//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
export enum AssetType {
  ASSET_TYPE_BITCOIN = 0,
  UNRECOGNIZED = -1,
}
export const AssetTypeSDKType = AssetType;
export const AssetTypeAmino = AssetType;
export function assetTypeFromJSON(object: any): AssetType {
  switch (object) {
    case 0:
    case "ASSET_TYPE_BITCOIN":
      return AssetType.ASSET_TYPE_BITCOIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AssetType.UNRECOGNIZED;
  }
}
export function assetTypeToJSON(object: AssetType): string {
  switch (object) {
    case AssetType.ASSET_TYPE_BITCOIN:
      return "ASSET_TYPE_BITCOIN";
    case AssetType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
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
export interface Liquidation {
  id: bigint;
  loanId: string;
  debtor: string;
  dcm: string;
  collateralAmount: Coin;
  debtAmount: Coin;
  liquidatedPrice: bigint;
  liquidatedTime: Date;
  liquidatedCollateralAmount: Coin;
  liquidatedDebtAmount: Coin;
  liquidationBonusAmount: Coin;
  protocolLiquidationFee: Coin;
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
  debt_amount?: CoinAmino;
  liquidated_price?: string;
  liquidated_time?: string;
  liquidated_collateral_amount?: CoinAmino;
  liquidated_debt_amount?: CoinAmino;
  liquidation_bonus_amount?: CoinAmino;
  protocol_liquidation_fee?: CoinAmino;
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
  debt_amount: CoinSDKType;
  liquidated_price: bigint;
  liquidated_time: Date;
  liquidated_collateral_amount: CoinSDKType;
  liquidated_debt_amount: CoinSDKType;
  liquidation_bonus_amount: CoinSDKType;
  protocol_liquidation_fee: CoinSDKType;
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
  time: Date;
}
function createBaseLiquidation(): Liquidation {
  return {
    id: BigInt(0),
    loanId: "",
    debtor: "",
    dcm: "",
    collateralAmount: Coin.fromPartial({}),
    debtAmount: Coin.fromPartial({}),
    liquidatedPrice: BigInt(0),
    liquidatedTime: new Date(),
    liquidatedCollateralAmount: Coin.fromPartial({}),
    liquidatedDebtAmount: Coin.fromPartial({}),
    liquidationBonusAmount: Coin.fromPartial({}),
    protocolLiquidationFee: Coin.fromPartial({}),
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
    if (message.debtAmount !== undefined) {
      Coin.encode(message.debtAmount, writer.uint32(50).fork()).ldelim();
    }
    if (message.liquidatedPrice !== BigInt(0)) {
      writer.uint32(56).int64(message.liquidatedPrice);
    }
    if (message.liquidatedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.liquidatedTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.liquidatedCollateralAmount !== undefined) {
      Coin.encode(message.liquidatedCollateralAmount, writer.uint32(74).fork()).ldelim();
    }
    if (message.liquidatedDebtAmount !== undefined) {
      Coin.encode(message.liquidatedDebtAmount, writer.uint32(82).fork()).ldelim();
    }
    if (message.liquidationBonusAmount !== undefined) {
      Coin.encode(message.liquidationBonusAmount, writer.uint32(90).fork()).ldelim();
    }
    if (message.protocolLiquidationFee !== undefined) {
      Coin.encode(message.protocolLiquidationFee, writer.uint32(98).fork()).ldelim();
    }
    if (message.liquidationCet !== "") {
      writer.uint32(106).string(message.liquidationCet);
    }
    if (message.settlementTx !== "") {
      writer.uint32(114).string(message.settlementTx);
    }
    if (message.settlementTxId !== "") {
      writer.uint32(122).string(message.settlementTxId);
    }
    if (message.status !== 0) {
      writer.uint32(128).int32(message.status);
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
          message.debtAmount = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.liquidatedPrice = reader.int64();
          break;
        case 8:
          message.liquidatedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.liquidatedCollateralAmount = Coin.decode(reader, reader.uint32());
          break;
        case 10:
          message.liquidatedDebtAmount = Coin.decode(reader, reader.uint32());
          break;
        case 11:
          message.liquidationBonusAmount = Coin.decode(reader, reader.uint32());
          break;
        case 12:
          message.protocolLiquidationFee = Coin.decode(reader, reader.uint32());
          break;
        case 13:
          message.liquidationCet = reader.string();
          break;
        case 14:
          message.settlementTx = reader.string();
          break;
        case 15:
          message.settlementTxId = reader.string();
          break;
        case 16:
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
    message.debtAmount = object.debtAmount !== undefined && object.debtAmount !== null ? Coin.fromPartial(object.debtAmount) : undefined;
    message.liquidatedPrice = object.liquidatedPrice !== undefined && object.liquidatedPrice !== null ? BigInt(object.liquidatedPrice.toString()) : BigInt(0);
    message.liquidatedTime = object.liquidatedTime ?? undefined;
    message.liquidatedCollateralAmount = object.liquidatedCollateralAmount !== undefined && object.liquidatedCollateralAmount !== null ? Coin.fromPartial(object.liquidatedCollateralAmount) : undefined;
    message.liquidatedDebtAmount = object.liquidatedDebtAmount !== undefined && object.liquidatedDebtAmount !== null ? Coin.fromPartial(object.liquidatedDebtAmount) : undefined;
    message.liquidationBonusAmount = object.liquidationBonusAmount !== undefined && object.liquidationBonusAmount !== null ? Coin.fromPartial(object.liquidationBonusAmount) : undefined;
    message.protocolLiquidationFee = object.protocolLiquidationFee !== undefined && object.protocolLiquidationFee !== null ? Coin.fromPartial(object.protocolLiquidationFee) : undefined;
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
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = Coin.fromAmino(object.debt_amount);
    }
    if (object.liquidated_price !== undefined && object.liquidated_price !== null) {
      message.liquidatedPrice = BigInt(object.liquidated_price);
    }
    if (object.liquidated_time !== undefined && object.liquidated_time !== null) {
      message.liquidatedTime = fromTimestamp(Timestamp.fromAmino(object.liquidated_time));
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
    obj.debt_amount = message.debtAmount ? Coin.toAmino(message.debtAmount) : undefined;
    obj.liquidated_price = message.liquidatedPrice !== BigInt(0) ? message.liquidatedPrice.toString() : undefined;
    obj.liquidated_time = message.liquidatedTime ? Timestamp.toAmino(toTimestamp(message.liquidatedTime)) : undefined;
    obj.liquidated_collateral_amount = message.liquidatedCollateralAmount ? Coin.toAmino(message.liquidatedCollateralAmount) : undefined;
    obj.liquidated_debt_amount = message.liquidatedDebtAmount ? Coin.toAmino(message.liquidatedDebtAmount) : undefined;
    obj.liquidation_bonus_amount = message.liquidationBonusAmount ? Coin.toAmino(message.liquidationBonusAmount) : undefined;
    obj.protocol_liquidation_fee = message.protocolLiquidationFee ? Coin.toAmino(message.protocolLiquidationFee) : undefined;
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
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
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