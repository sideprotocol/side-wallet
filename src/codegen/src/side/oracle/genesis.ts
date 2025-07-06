//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { OraclePrice, OraclePriceAmino, OraclePriceSDKType, BlockHeader, BlockHeaderAmino, BlockHeaderSDKType } from "./oracle";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisState {
  params: Params;
  prices: OraclePrice[];
  blocks: BlockHeader[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.oracle.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  prices?: OraclePriceAmino[];
  blocks?: BlockHeaderAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/side.oracle.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  prices: OraclePriceSDKType[];
  blocks: BlockHeaderSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    prices: [],
    blocks: []
  };
}
export const GenesisState = {
  typeUrl: "/side.oracle.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.prices) {
      OraclePrice.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.blocks) {
      BlockHeader.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.prices.push(OraclePrice.decode(reader, reader.uint32()));
          break;
        case 3:
          message.blocks.push(BlockHeader.decode(reader, reader.uint32()));
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
    message.prices = object.prices?.map(e => OraclePrice.fromPartial(e)) || [];
    message.blocks = object.blocks?.map(e => BlockHeader.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.prices = object.prices?.map(e => OraclePrice.fromAmino(e)) || [];
    message.blocks = object.blocks?.map(e => BlockHeader.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? OraclePrice.toAmino(e) : undefined);
    } else {
      obj.prices = message.prices;
    }
    if (message.blocks) {
      obj.blocks = message.blocks.map(e => e ? BlockHeader.toAmino(e) : undefined);
    } else {
      obj.blocks = message.blocks;
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
      typeUrl: "/side.oracle.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};