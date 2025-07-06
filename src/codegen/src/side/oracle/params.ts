//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** define how many block headers keep on side chain */
  keepBitcoinBlocks: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.oracle.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** define how many block headers keep on side chain */
  keep_bitcoin_blocks?: number;
}
export interface ParamsAminoMsg {
  type: "/side.oracle.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  keep_bitcoin_blocks: number;
}
function createBaseParams(): Params {
  return {
    keepBitcoinBlocks: 0
  };
}
export const Params = {
  typeUrl: "/side.oracle.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keepBitcoinBlocks !== 0) {
      writer.uint32(8).uint32(message.keepBitcoinBlocks);
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
          message.keepBitcoinBlocks = reader.uint32();
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
    message.keepBitcoinBlocks = object.keepBitcoinBlocks ?? 0;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.keep_bitcoin_blocks !== undefined && object.keep_bitcoin_blocks !== null) {
      message.keepBitcoinBlocks = object.keep_bitcoin_blocks;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.keep_bitcoin_blocks = message.keepBitcoinBlocks === 0 ? undefined : message.keepBitcoinBlocks;
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
      typeUrl: "/side.oracle.Params",
      value: Params.encode(message).finish()
    };
  }
};