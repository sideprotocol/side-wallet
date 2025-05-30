//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { UTXO, UTXOAmino, UTXOSDKType, DKGRequest, DKGRequestAmino, DKGRequestSDKType } from "./btcbridge";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the btc bridge module's genesis state. */
export interface GenesisState {
  params: Params;
  utxos: UTXO[];
  dkgRequest?: DKGRequest;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.btcbridge.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the btc bridge module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  utxos?: UTXOAmino[];
  dkg_request?: DKGRequestAmino;
}
export interface GenesisStateAminoMsg {
  type: "/side.btcbridge.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the btc bridge module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  utxos: UTXOSDKType[];
  dkg_request?: DKGRequestSDKType;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    utxos: [],
    dkgRequest: undefined
  };
}
export const GenesisState = {
  typeUrl: "/side.btcbridge.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.dkgRequest !== undefined) {
      DKGRequest.encode(message.dkgRequest, writer.uint32(26).fork()).ldelim();
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
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        case 3:
          message.dkgRequest = DKGRequest.decode(reader, reader.uint32());
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
    message.utxos = object.utxos?.map(e => UTXO.fromPartial(e)) || [];
    message.dkgRequest = object.dkgRequest !== undefined && object.dkgRequest !== null ? DKGRequest.fromPartial(object.dkgRequest) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.utxos = object.utxos?.map(e => UTXO.fromAmino(e)) || [];
    if (object.dkg_request !== undefined && object.dkg_request !== null) {
      message.dkgRequest = DKGRequest.fromAmino(object.dkg_request);
    }
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.utxos) {
      obj.utxos = message.utxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.utxos = message.utxos;
    }
    obj.dkg_request = message.dkgRequest ? DKGRequest.toAmino(message.dkgRequest) : undefined;
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
      typeUrl: "/side.btcbridge.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};