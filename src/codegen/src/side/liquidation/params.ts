//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** minimum liquidation factor permille */
  minLiquidationFactor: number;
  /** liquidation bonus factor permille */
  liquidationBonusFactor: number;
  /** protocol liquidation fee factor permille */
  protocolLiquidationFeeFactor: number;
  /** protocol liquidation fee collector */
  protocolLiquidationFeeCollector: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.liquidation.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** minimum liquidation factor permille */
  min_liquidation_factor?: number;
  /** liquidation bonus factor permille */
  liquidation_bonus_factor?: number;
  /** protocol liquidation fee factor permille */
  protocol_liquidation_fee_factor?: number;
  /** protocol liquidation fee collector */
  protocol_liquidation_fee_collector?: string;
}
export interface ParamsAminoMsg {
  type: "/side.liquidation.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  min_liquidation_factor: number;
  liquidation_bonus_factor: number;
  protocol_liquidation_fee_factor: number;
  protocol_liquidation_fee_collector: string;
}
function createBaseParams(): Params {
  return {
    minLiquidationFactor: 0,
    liquidationBonusFactor: 0,
    protocolLiquidationFeeFactor: 0,
    protocolLiquidationFeeCollector: ""
  };
}
export const Params = {
  typeUrl: "/side.liquidation.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minLiquidationFactor !== 0) {
      writer.uint32(8).uint32(message.minLiquidationFactor);
    }
    if (message.liquidationBonusFactor !== 0) {
      writer.uint32(16).uint32(message.liquidationBonusFactor);
    }
    if (message.protocolLiquidationFeeFactor !== 0) {
      writer.uint32(24).uint32(message.protocolLiquidationFeeFactor);
    }
    if (message.protocolLiquidationFeeCollector !== "") {
      writer.uint32(34).string(message.protocolLiquidationFeeCollector);
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
          message.minLiquidationFactor = reader.uint32();
          break;
        case 2:
          message.liquidationBonusFactor = reader.uint32();
          break;
        case 3:
          message.protocolLiquidationFeeFactor = reader.uint32();
          break;
        case 4:
          message.protocolLiquidationFeeCollector = reader.string();
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
    message.minLiquidationFactor = object.minLiquidationFactor ?? 0;
    message.liquidationBonusFactor = object.liquidationBonusFactor ?? 0;
    message.protocolLiquidationFeeFactor = object.protocolLiquidationFeeFactor ?? 0;
    message.protocolLiquidationFeeCollector = object.protocolLiquidationFeeCollector ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.min_liquidation_factor !== undefined && object.min_liquidation_factor !== null) {
      message.minLiquidationFactor = object.min_liquidation_factor;
    }
    if (object.liquidation_bonus_factor !== undefined && object.liquidation_bonus_factor !== null) {
      message.liquidationBonusFactor = object.liquidation_bonus_factor;
    }
    if (object.protocol_liquidation_fee_factor !== undefined && object.protocol_liquidation_fee_factor !== null) {
      message.protocolLiquidationFeeFactor = object.protocol_liquidation_fee_factor;
    }
    if (object.protocol_liquidation_fee_collector !== undefined && object.protocol_liquidation_fee_collector !== null) {
      message.protocolLiquidationFeeCollector = object.protocol_liquidation_fee_collector;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.min_liquidation_factor = message.minLiquidationFactor === 0 ? undefined : message.minLiquidationFactor;
    obj.liquidation_bonus_factor = message.liquidationBonusFactor === 0 ? undefined : message.liquidationBonusFactor;
    obj.protocol_liquidation_fee_factor = message.protocolLiquidationFeeFactor === 0 ? undefined : message.protocolLiquidationFeeFactor;
    obj.protocol_liquidation_fee_collector = message.protocolLiquidationFeeCollector === "" ? undefined : message.protocolLiquidationFeeCollector;
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
      typeUrl: "/side.liquidation.Params",
      value: Params.encode(message).finish()
    };
  }
};