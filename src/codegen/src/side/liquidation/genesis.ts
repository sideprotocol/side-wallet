//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Liquidation, LiquidationAmino, LiquidationSDKType, LiquidationRecord, LiquidationRecordAmino, LiquidationRecordSDKType } from "./liquidation";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the liquidation module's genesis state. */
export interface GenesisState {
  params: Params;
  liquidations: Liquidation[];
  liquidationRecords: LiquidationRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.liquidation.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the liquidation module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  liquidations?: LiquidationAmino[];
  liquidationRecords?: LiquidationRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/side.liquidation.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the liquidation module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  liquidations: LiquidationSDKType[];
  liquidationRecords: LiquidationRecordSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    liquidations: [],
    liquidationRecords: []
  };
}
export const GenesisState = {
  typeUrl: "/side.liquidation.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.liquidations) {
      Liquidation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.liquidationRecords) {
      LiquidationRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.liquidations.push(Liquidation.decode(reader, reader.uint32()));
          break;
        case 3:
          message.liquidationRecords.push(LiquidationRecord.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.liquidations = object.liquidations?.map(e => Liquidation.fromPartial(e)) || [];
    message.liquidationRecords = object.liquidationRecords?.map(e => LiquidationRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.liquidations = object.liquidations?.map(e => Liquidation.fromAmino(e)) || [];
    message.liquidationRecords = object.liquidationRecords?.map(e => LiquidationRecord.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.liquidations) {
      obj.liquidations = message.liquidations.map(e => e ? Liquidation.toAmino(e) : undefined);
    } else {
      obj.liquidations = message.liquidations;
    }
    if (message.liquidationRecords) {
      obj.liquidationRecords = message.liquidationRecords.map(e => e ? LiquidationRecord.toAmino(e) : undefined);
    } else {
      obj.liquidationRecords = message.liquidationRecords;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/side.liquidation.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};