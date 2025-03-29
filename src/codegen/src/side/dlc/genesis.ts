//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { DLCEvent, DLCEventAmino, DLCEventSDKType, DLCAttestation, DLCAttestationAmino, DLCAttestationSDKType } from "./dlc";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the dlc module's genesis state. */
export interface GenesisState {
  params: Params;
  events: DLCEvent[];
  attestations: DLCAttestation[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.dlc.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the dlc module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  events?: DLCEventAmino[];
  attestations?: DLCAttestationAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/side.dlc.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the dlc module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  events: DLCEventSDKType[];
  attestations: DLCAttestationSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    events: [],
    attestations: []
  };
}
export const GenesisState = {
  typeUrl: "/side.dlc.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.events) {
      DLCEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.attestations) {
      DLCAttestation.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.events.push(DLCEvent.decode(reader, reader.uint32()));
          break;
        case 3:
          message.attestations.push(DLCAttestation.decode(reader, reader.uint32()));
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
    message.events = object.events?.map(e => DLCEvent.fromPartial(e)) || [];
    message.attestations = object.attestations?.map(e => DLCAttestation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.events = object.events?.map(e => DLCEvent.fromAmino(e)) || [];
    message.attestations = object.attestations?.map(e => DLCAttestation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.events) {
      obj.events = message.events.map(e => e ? DLCEvent.toAmino(e) : undefined);
    } else {
      obj.events = message.events;
    }
    if (message.attestations) {
      obj.attestations = message.attestations.map(e => e ? DLCAttestation.toAmino(e) : undefined);
    } else {
      obj.attestations = message.attestations;
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
      typeUrl: "/side.dlc.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};