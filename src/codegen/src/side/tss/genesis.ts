//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { DKGRequest, DKGRequestAmino, DKGRequestSDKType, SigningRequest, SigningRequestAmino, SigningRequestSDKType } from "./tss";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  params: Params;
  dkgRequests: DKGRequest[];
  signingRequests: SigningRequest[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/side.tss.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  dkg_requests?: DKGRequestAmino[];
  signing_requests?: SigningRequestAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/side.tss.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  dkg_requests: DKGRequestSDKType[];
  signing_requests: SigningRequestSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    dkgRequests: [],
    signingRequests: []
  };
}
export const GenesisState = {
  typeUrl: "/side.tss.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.dkgRequests) {
      DKGRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signingRequests) {
      SigningRequest.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.dkgRequests.push(DKGRequest.decode(reader, reader.uint32()));
          break;
        case 3:
          message.signingRequests.push(SigningRequest.decode(reader, reader.uint32()));
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
    message.dkgRequests = object.dkgRequests?.map(e => DKGRequest.fromPartial(e)) || [];
    message.signingRequests = object.signingRequests?.map(e => SigningRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.dkgRequests = object.dkg_requests?.map(e => DKGRequest.fromAmino(e)) || [];
    message.signingRequests = object.signing_requests?.map(e => SigningRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.dkgRequests) {
      obj.dkg_requests = message.dkgRequests.map(e => e ? DKGRequest.toAmino(e) : undefined);
    } else {
      obj.dkg_requests = message.dkgRequests;
    }
    if (message.signingRequests) {
      obj.signing_requests = message.signingRequests.map(e => e ? SigningRequest.toAmino(e) : undefined);
    } else {
      obj.signing_requests = message.signingRequests;
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
      typeUrl: "/side.tss.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};