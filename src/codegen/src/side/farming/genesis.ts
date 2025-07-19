//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Staking, StakingAmino, StakingSDKType } from "./farming";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the farming module's genesis state. */
export interface GenesisState {
  params: Params;
  stakings: Staking[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.farming.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the farming module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  stakings?: StakingAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/side.farming.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the farming module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  stakings: StakingSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    stakings: []
  };
}
export const GenesisState = {
  typeUrl: "/side.farming.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.stakings) {
      Staking.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.stakings.push(Staking.decode(reader, reader.uint32()));
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
    message.stakings = object.stakings?.map(e => Staking.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.stakings = object.stakings?.map(e => Staking.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.stakings) {
      obj.stakings = message.stakings.map(e => e ? Staking.toAmino(e) : undefined);
    } else {
      obj.stakings = message.stakings;
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
      typeUrl: "/side.farming.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};