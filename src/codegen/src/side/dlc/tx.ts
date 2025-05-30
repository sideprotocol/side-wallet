//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MsgCreateDCM {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  participants: string[];
  threshold: number;
}
export interface MsgCreateDCMProtoMsg {
  typeUrl: "/side.dlc.MsgCreateDCM";
  value: Uint8Array;
}
export interface MsgCreateDCMAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  participants?: string[];
  threshold?: number;
}
export interface MsgCreateDCMAminoMsg {
  type: "/side.dlc.MsgCreateDCM";
  value: MsgCreateDCMAmino;
}
export interface MsgCreateDCMSDKType {
  authority: string;
  participants: string[];
  threshold: number;
}
export interface MsgCreateDCMResponse {}
export interface MsgCreateDCMResponseProtoMsg {
  typeUrl: "/side.dlc.MsgCreateDCMResponse";
  value: Uint8Array;
}
export interface MsgCreateDCMResponseAmino {}
export interface MsgCreateDCMResponseAminoMsg {
  type: "/side.dlc.MsgCreateDCMResponse";
  value: MsgCreateDCMResponseAmino;
}
export interface MsgCreateDCMResponseSDKType {}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/dlc parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/side.dlc.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /**
   * params defines the x/dlc parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/side.dlc.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/side.dlc.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/side.dlc.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreateDCM(): MsgCreateDCM {
  return {
    authority: "",
    participants: [],
    threshold: 0
  };
}
export const MsgCreateDCM = {
  typeUrl: "/side.dlc.MsgCreateDCM",
  encode(message: MsgCreateDCM, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.participants) {
      writer.uint32(18).string(v!);
    }
    if (message.threshold !== 0) {
      writer.uint32(24).uint32(message.threshold);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateDCM {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDCM();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.participants.push(reader.string());
          break;
        case 3:
          message.threshold = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateDCM>): MsgCreateDCM {
    const message = createBaseMsgCreateDCM();
    message.authority = object.authority ?? "";
    message.participants = object.participants?.map(e => e) || [];
    message.threshold = object.threshold ?? 0;
    return message;
  },
  fromAmino(object: MsgCreateDCMAmino): MsgCreateDCM {
    const message = createBaseMsgCreateDCM();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.participants = object.participants?.map(e => e) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    return message;
  },
  toAmino(message: MsgCreateDCM): MsgCreateDCMAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.participants) {
      obj.participants = message.participants.map(e => e);
    } else {
      obj.participants = message.participants;
    }
    obj.threshold = message.threshold === 0 ? undefined : message.threshold;
    return obj;
  },
  fromAminoMsg(object: MsgCreateDCMAminoMsg): MsgCreateDCM {
    return MsgCreateDCM.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDCMProtoMsg): MsgCreateDCM {
    return MsgCreateDCM.decode(message.value);
  },
  toProto(message: MsgCreateDCM): Uint8Array {
    return MsgCreateDCM.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDCM): MsgCreateDCMProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgCreateDCM",
      value: MsgCreateDCM.encode(message).finish()
    };
  }
};
function createBaseMsgCreateDCMResponse(): MsgCreateDCMResponse {
  return {};
}
export const MsgCreateDCMResponse = {
  typeUrl: "/side.dlc.MsgCreateDCMResponse",
  encode(_: MsgCreateDCMResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateDCMResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDCMResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCreateDCMResponse>): MsgCreateDCMResponse {
    const message = createBaseMsgCreateDCMResponse();
    return message;
  },
  fromAmino(_: MsgCreateDCMResponseAmino): MsgCreateDCMResponse {
    const message = createBaseMsgCreateDCMResponse();
    return message;
  },
  toAmino(_: MsgCreateDCMResponse): MsgCreateDCMResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateDCMResponseAminoMsg): MsgCreateDCMResponse {
    return MsgCreateDCMResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDCMResponseProtoMsg): MsgCreateDCMResponse {
    return MsgCreateDCMResponse.decode(message.value);
  },
  toProto(message: MsgCreateDCMResponse): Uint8Array {
    return MsgCreateDCMResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDCMResponse): MsgCreateDCMResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgCreateDCMResponse",
      value: MsgCreateDCMResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/side.dlc.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/side.dlc.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};