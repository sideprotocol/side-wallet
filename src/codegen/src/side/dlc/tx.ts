//@ts-nocheck
import { DlcEventType } from "./dlc";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MsgSubmitDCMPubKey {
  sender: string;
  pubKey: string;
  dcmId: bigint;
  dcmPubkey: string;
  signature: string;
}
export interface MsgSubmitDCMPubKeyProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitDCMPubKey";
  value: Uint8Array;
}
export interface MsgSubmitDCMPubKeyAmino {
  sender?: string;
  pub_key?: string;
  dcm_id?: string;
  dcm_pubkey?: string;
  signature?: string;
}
export interface MsgSubmitDCMPubKeyAminoMsg {
  type: "/side.dlc.MsgSubmitDCMPubKey";
  value: MsgSubmitDCMPubKeyAmino;
}
export interface MsgSubmitDCMPubKeySDKType {
  sender: string;
  pub_key: string;
  dcm_id: bigint;
  dcm_pubkey: string;
  signature: string;
}
export interface MsgSubmitDCMPubKeyResponse {}
export interface MsgSubmitDCMPubKeyResponseProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitDCMPubKeyResponse";
  value: Uint8Array;
}
export interface MsgSubmitDCMPubKeyResponseAmino {}
export interface MsgSubmitDCMPubKeyResponseAminoMsg {
  type: "/side.dlc.MsgSubmitDCMPubKeyResponse";
  value: MsgSubmitDCMPubKeyResponseAmino;
}
export interface MsgSubmitDCMPubKeyResponseSDKType {}
export interface MsgSubmitOraclePubKey {
  sender: string;
  pubKey: string;
  oracleId: bigint;
  oraclePubkey: string;
  signature: string;
}
export interface MsgSubmitOraclePubKeyProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitOraclePubKey";
  value: Uint8Array;
}
export interface MsgSubmitOraclePubKeyAmino {
  sender?: string;
  pub_key?: string;
  oracle_id?: string;
  oracle_pubkey?: string;
  signature?: string;
}
export interface MsgSubmitOraclePubKeyAminoMsg {
  type: "/side.dlc.MsgSubmitOraclePubKey";
  value: MsgSubmitOraclePubKeyAmino;
}
export interface MsgSubmitOraclePubKeySDKType {
  sender: string;
  pub_key: string;
  oracle_id: bigint;
  oracle_pubkey: string;
  signature: string;
}
export interface MsgSubmitOraclePubKeyResponse {}
export interface MsgSubmitOraclePubKeyResponseProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitOraclePubKeyResponse";
  value: Uint8Array;
}
export interface MsgSubmitOraclePubKeyResponseAmino {}
export interface MsgSubmitOraclePubKeyResponseAminoMsg {
  type: "/side.dlc.MsgSubmitOraclePubKeyResponse";
  value: MsgSubmitOraclePubKeyResponseAmino;
}
export interface MsgSubmitOraclePubKeyResponseSDKType {}
export interface MsgSubmitNonce {
  sender: string;
  eventType: DlcEventType;
  nonce: string;
  oraclePubkey: string;
  signature: string;
}
export interface MsgSubmitNonceProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitNonce";
  value: Uint8Array;
}
export interface MsgSubmitNonceAmino {
  sender?: string;
  event_type?: DlcEventType;
  nonce?: string;
  oracle_pubkey?: string;
  signature?: string;
}
export interface MsgSubmitNonceAminoMsg {
  type: "/side.dlc.MsgSubmitNonce";
  value: MsgSubmitNonceAmino;
}
export interface MsgSubmitNonceSDKType {
  sender: string;
  event_type: DlcEventType;
  nonce: string;
  oracle_pubkey: string;
  signature: string;
}
export interface MsgSubmitNonceResponse {}
export interface MsgSubmitNonceResponseProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitNonceResponse";
  value: Uint8Array;
}
export interface MsgSubmitNonceResponseAmino {}
export interface MsgSubmitNonceResponseAminoMsg {
  type: "/side.dlc.MsgSubmitNonceResponse";
  value: MsgSubmitNonceResponseAmino;
}
export interface MsgSubmitNonceResponseSDKType {}
export interface MsgSubmitAttestation {
  sender: string;
  eventId: bigint;
  signature: string;
}
export interface MsgSubmitAttestationProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitAttestation";
  value: Uint8Array;
}
export interface MsgSubmitAttestationAmino {
  sender?: string;
  event_id?: string;
  signature?: string;
}
export interface MsgSubmitAttestationAminoMsg {
  type: "/side.dlc.MsgSubmitAttestation";
  value: MsgSubmitAttestationAmino;
}
export interface MsgSubmitAttestationSDKType {
  sender: string;
  event_id: bigint;
  signature: string;
}
export interface MsgSubmitAttestationResponse {}
export interface MsgSubmitAttestationResponseProtoMsg {
  typeUrl: "/side.dlc.MsgSubmitAttestationResponse";
  value: Uint8Array;
}
export interface MsgSubmitAttestationResponseAmino {}
export interface MsgSubmitAttestationResponseAminoMsg {
  type: "/side.dlc.MsgSubmitAttestationResponse";
  value: MsgSubmitAttestationResponseAmino;
}
export interface MsgSubmitAttestationResponseSDKType {}
export interface MsgCreateOracle {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  participants: string[];
  threshold: number;
}
export interface MsgCreateOracleProtoMsg {
  typeUrl: "/side.dlc.MsgCreateOracle";
  value: Uint8Array;
}
export interface MsgCreateOracleAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  participants?: string[];
  threshold?: number;
}
export interface MsgCreateOracleAminoMsg {
  type: "/side.dlc.MsgCreateOracle";
  value: MsgCreateOracleAmino;
}
export interface MsgCreateOracleSDKType {
  authority: string;
  participants: string[];
  threshold: number;
}
export interface MsgCreateOracleResponse {}
export interface MsgCreateOracleResponseProtoMsg {
  typeUrl: "/side.dlc.MsgCreateOracleResponse";
  value: Uint8Array;
}
export interface MsgCreateOracleResponseAmino {}
export interface MsgCreateOracleResponseAminoMsg {
  type: "/side.dlc.MsgCreateOracleResponse";
  value: MsgCreateOracleResponseAmino;
}
export interface MsgCreateOracleResponseSDKType {}
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
function createBaseMsgSubmitDCMPubKey(): MsgSubmitDCMPubKey {
  return {
    sender: "",
    pubKey: "",
    dcmId: BigInt(0),
    dcmPubkey: "",
    signature: ""
  };
}
export const MsgSubmitDCMPubKey = {
  typeUrl: "/side.dlc.MsgSubmitDCMPubKey",
  encode(message: MsgSubmitDCMPubKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    if (message.dcmId !== BigInt(0)) {
      writer.uint32(24).uint64(message.dcmId);
    }
    if (message.dcmPubkey !== "") {
      writer.uint32(34).string(message.dcmPubkey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitDCMPubKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitDCMPubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        case 3:
          message.dcmId = reader.uint64();
          break;
        case 4:
          message.dcmPubkey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitDCMPubKey>): MsgSubmitDCMPubKey {
    const message = createBaseMsgSubmitDCMPubKey();
    message.sender = object.sender ?? "";
    message.pubKey = object.pubKey ?? "";
    message.dcmId = object.dcmId !== undefined && object.dcmId !== null ? BigInt(object.dcmId.toString()) : BigInt(0);
    message.dcmPubkey = object.dcmPubkey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitDCMPubKeyAmino): MsgSubmitDCMPubKey {
    const message = createBaseMsgSubmitDCMPubKey();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    if (object.dcm_id !== undefined && object.dcm_id !== null) {
      message.dcmId = BigInt(object.dcm_id);
    }
    if (object.dcm_pubkey !== undefined && object.dcm_pubkey !== null) {
      message.dcmPubkey = object.dcm_pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgSubmitDCMPubKey): MsgSubmitDCMPubKeyAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    obj.dcm_id = message.dcmId !== BigInt(0) ? message.dcmId.toString() : undefined;
    obj.dcm_pubkey = message.dcmPubkey === "" ? undefined : message.dcmPubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitDCMPubKeyAminoMsg): MsgSubmitDCMPubKey {
    return MsgSubmitDCMPubKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitDCMPubKeyProtoMsg): MsgSubmitDCMPubKey {
    return MsgSubmitDCMPubKey.decode(message.value);
  },
  toProto(message: MsgSubmitDCMPubKey): Uint8Array {
    return MsgSubmitDCMPubKey.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitDCMPubKey): MsgSubmitDCMPubKeyProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitDCMPubKey",
      value: MsgSubmitDCMPubKey.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDCMPubKeyResponse(): MsgSubmitDCMPubKeyResponse {
  return {};
}
export const MsgSubmitDCMPubKeyResponse = {
  typeUrl: "/side.dlc.MsgSubmitDCMPubKeyResponse",
  encode(_: MsgSubmitDCMPubKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitDCMPubKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitDCMPubKeyResponse();
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
  fromPartial(_: Partial<MsgSubmitDCMPubKeyResponse>): MsgSubmitDCMPubKeyResponse {
    const message = createBaseMsgSubmitDCMPubKeyResponse();
    return message;
  },
  fromAmino(_: MsgSubmitDCMPubKeyResponseAmino): MsgSubmitDCMPubKeyResponse {
    const message = createBaseMsgSubmitDCMPubKeyResponse();
    return message;
  },
  toAmino(_: MsgSubmitDCMPubKeyResponse): MsgSubmitDCMPubKeyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitDCMPubKeyResponseAminoMsg): MsgSubmitDCMPubKeyResponse {
    return MsgSubmitDCMPubKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitDCMPubKeyResponseProtoMsg): MsgSubmitDCMPubKeyResponse {
    return MsgSubmitDCMPubKeyResponse.decode(message.value);
  },
  toProto(message: MsgSubmitDCMPubKeyResponse): Uint8Array {
    return MsgSubmitDCMPubKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitDCMPubKeyResponse): MsgSubmitDCMPubKeyResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitDCMPubKeyResponse",
      value: MsgSubmitDCMPubKeyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitOraclePubKey(): MsgSubmitOraclePubKey {
  return {
    sender: "",
    pubKey: "",
    oracleId: BigInt(0),
    oraclePubkey: "",
    signature: ""
  };
}
export const MsgSubmitOraclePubKey = {
  typeUrl: "/side.dlc.MsgSubmitOraclePubKey",
  encode(message: MsgSubmitOraclePubKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pubKey !== "") {
      writer.uint32(18).string(message.pubKey);
    }
    if (message.oracleId !== BigInt(0)) {
      writer.uint32(24).uint64(message.oracleId);
    }
    if (message.oraclePubkey !== "") {
      writer.uint32(34).string(message.oraclePubkey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitOraclePubKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitOraclePubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        case 3:
          message.oracleId = reader.uint64();
          break;
        case 4:
          message.oraclePubkey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitOraclePubKey>): MsgSubmitOraclePubKey {
    const message = createBaseMsgSubmitOraclePubKey();
    message.sender = object.sender ?? "";
    message.pubKey = object.pubKey ?? "";
    message.oracleId = object.oracleId !== undefined && object.oracleId !== null ? BigInt(object.oracleId.toString()) : BigInt(0);
    message.oraclePubkey = object.oraclePubkey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitOraclePubKeyAmino): MsgSubmitOraclePubKey {
    const message = createBaseMsgSubmitOraclePubKey();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    if (object.oracle_id !== undefined && object.oracle_id !== null) {
      message.oracleId = BigInt(object.oracle_id);
    }
    if (object.oracle_pubkey !== undefined && object.oracle_pubkey !== null) {
      message.oraclePubkey = object.oracle_pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgSubmitOraclePubKey): MsgSubmitOraclePubKeyAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    obj.oracle_id = message.oracleId !== BigInt(0) ? message.oracleId.toString() : undefined;
    obj.oracle_pubkey = message.oraclePubkey === "" ? undefined : message.oraclePubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitOraclePubKeyAminoMsg): MsgSubmitOraclePubKey {
    return MsgSubmitOraclePubKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitOraclePubKeyProtoMsg): MsgSubmitOraclePubKey {
    return MsgSubmitOraclePubKey.decode(message.value);
  },
  toProto(message: MsgSubmitOraclePubKey): Uint8Array {
    return MsgSubmitOraclePubKey.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitOraclePubKey): MsgSubmitOraclePubKeyProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitOraclePubKey",
      value: MsgSubmitOraclePubKey.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitOraclePubKeyResponse(): MsgSubmitOraclePubKeyResponse {
  return {};
}
export const MsgSubmitOraclePubKeyResponse = {
  typeUrl: "/side.dlc.MsgSubmitOraclePubKeyResponse",
  encode(_: MsgSubmitOraclePubKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitOraclePubKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitOraclePubKeyResponse();
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
  fromPartial(_: Partial<MsgSubmitOraclePubKeyResponse>): MsgSubmitOraclePubKeyResponse {
    const message = createBaseMsgSubmitOraclePubKeyResponse();
    return message;
  },
  fromAmino(_: MsgSubmitOraclePubKeyResponseAmino): MsgSubmitOraclePubKeyResponse {
    const message = createBaseMsgSubmitOraclePubKeyResponse();
    return message;
  },
  toAmino(_: MsgSubmitOraclePubKeyResponse): MsgSubmitOraclePubKeyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitOraclePubKeyResponseAminoMsg): MsgSubmitOraclePubKeyResponse {
    return MsgSubmitOraclePubKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitOraclePubKeyResponseProtoMsg): MsgSubmitOraclePubKeyResponse {
    return MsgSubmitOraclePubKeyResponse.decode(message.value);
  },
  toProto(message: MsgSubmitOraclePubKeyResponse): Uint8Array {
    return MsgSubmitOraclePubKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitOraclePubKeyResponse): MsgSubmitOraclePubKeyResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitOraclePubKeyResponse",
      value: MsgSubmitOraclePubKeyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitNonce(): MsgSubmitNonce {
  return {
    sender: "",
    eventType: 0,
    nonce: "",
    oraclePubkey: "",
    signature: ""
  };
}
export const MsgSubmitNonce = {
  typeUrl: "/side.dlc.MsgSubmitNonce",
  encode(message: MsgSubmitNonce, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.eventType !== 0) {
      writer.uint32(16).int32(message.eventType);
    }
    if (message.nonce !== "") {
      writer.uint32(26).string(message.nonce);
    }
    if (message.oraclePubkey !== "") {
      writer.uint32(34).string(message.oraclePubkey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitNonce {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitNonce();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.eventType = reader.int32() as any;
          break;
        case 3:
          message.nonce = reader.string();
          break;
        case 4:
          message.oraclePubkey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitNonce>): MsgSubmitNonce {
    const message = createBaseMsgSubmitNonce();
    message.sender = object.sender ?? "";
    message.eventType = object.eventType ?? 0;
    message.nonce = object.nonce ?? "";
    message.oraclePubkey = object.oraclePubkey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitNonceAmino): MsgSubmitNonce {
    const message = createBaseMsgSubmitNonce();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.event_type !== undefined && object.event_type !== null) {
      message.eventType = object.event_type;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    if (object.oracle_pubkey !== undefined && object.oracle_pubkey !== null) {
      message.oraclePubkey = object.oracle_pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgSubmitNonce): MsgSubmitNonceAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.event_type = message.eventType === 0 ? undefined : message.eventType;
    obj.nonce = message.nonce === "" ? undefined : message.nonce;
    obj.oracle_pubkey = message.oraclePubkey === "" ? undefined : message.oraclePubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitNonceAminoMsg): MsgSubmitNonce {
    return MsgSubmitNonce.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitNonceProtoMsg): MsgSubmitNonce {
    return MsgSubmitNonce.decode(message.value);
  },
  toProto(message: MsgSubmitNonce): Uint8Array {
    return MsgSubmitNonce.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitNonce): MsgSubmitNonceProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitNonce",
      value: MsgSubmitNonce.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitNonceResponse(): MsgSubmitNonceResponse {
  return {};
}
export const MsgSubmitNonceResponse = {
  typeUrl: "/side.dlc.MsgSubmitNonceResponse",
  encode(_: MsgSubmitNonceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitNonceResponse();
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
  fromPartial(_: Partial<MsgSubmitNonceResponse>): MsgSubmitNonceResponse {
    const message = createBaseMsgSubmitNonceResponse();
    return message;
  },
  fromAmino(_: MsgSubmitNonceResponseAmino): MsgSubmitNonceResponse {
    const message = createBaseMsgSubmitNonceResponse();
    return message;
  },
  toAmino(_: MsgSubmitNonceResponse): MsgSubmitNonceResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitNonceResponseAminoMsg): MsgSubmitNonceResponse {
    return MsgSubmitNonceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitNonceResponseProtoMsg): MsgSubmitNonceResponse {
    return MsgSubmitNonceResponse.decode(message.value);
  },
  toProto(message: MsgSubmitNonceResponse): Uint8Array {
    return MsgSubmitNonceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitNonceResponse): MsgSubmitNonceResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitNonceResponse",
      value: MsgSubmitNonceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitAttestation(): MsgSubmitAttestation {
  return {
    sender: "",
    eventId: BigInt(0),
    signature: ""
  };
}
export const MsgSubmitAttestation = {
  typeUrl: "/side.dlc.MsgSubmitAttestation",
  encode(message: MsgSubmitAttestation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.eventId !== BigInt(0)) {
      writer.uint32(16).uint64(message.eventId);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitAttestation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitAttestation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.eventId = reader.uint64();
          break;
        case 3:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitAttestation>): MsgSubmitAttestation {
    const message = createBaseMsgSubmitAttestation();
    message.sender = object.sender ?? "";
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitAttestationAmino): MsgSubmitAttestation {
    const message = createBaseMsgSubmitAttestation();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgSubmitAttestation): MsgSubmitAttestationAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitAttestationAminoMsg): MsgSubmitAttestation {
    return MsgSubmitAttestation.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitAttestationProtoMsg): MsgSubmitAttestation {
    return MsgSubmitAttestation.decode(message.value);
  },
  toProto(message: MsgSubmitAttestation): Uint8Array {
    return MsgSubmitAttestation.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitAttestation): MsgSubmitAttestationProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitAttestation",
      value: MsgSubmitAttestation.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitAttestationResponse(): MsgSubmitAttestationResponse {
  return {};
}
export const MsgSubmitAttestationResponse = {
  typeUrl: "/side.dlc.MsgSubmitAttestationResponse",
  encode(_: MsgSubmitAttestationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitAttestationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitAttestationResponse();
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
  fromPartial(_: Partial<MsgSubmitAttestationResponse>): MsgSubmitAttestationResponse {
    const message = createBaseMsgSubmitAttestationResponse();
    return message;
  },
  fromAmino(_: MsgSubmitAttestationResponseAmino): MsgSubmitAttestationResponse {
    const message = createBaseMsgSubmitAttestationResponse();
    return message;
  },
  toAmino(_: MsgSubmitAttestationResponse): MsgSubmitAttestationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitAttestationResponseAminoMsg): MsgSubmitAttestationResponse {
    return MsgSubmitAttestationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitAttestationResponseProtoMsg): MsgSubmitAttestationResponse {
    return MsgSubmitAttestationResponse.decode(message.value);
  },
  toProto(message: MsgSubmitAttestationResponse): Uint8Array {
    return MsgSubmitAttestationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitAttestationResponse): MsgSubmitAttestationResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgSubmitAttestationResponse",
      value: MsgSubmitAttestationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateOracle(): MsgCreateOracle {
  return {
    authority: "",
    participants: [],
    threshold: 0
  };
}
export const MsgCreateOracle = {
  typeUrl: "/side.dlc.MsgCreateOracle",
  encode(message: MsgCreateOracle, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracle {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateOracle();
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
  fromPartial(object: Partial<MsgCreateOracle>): MsgCreateOracle {
    const message = createBaseMsgCreateOracle();
    message.authority = object.authority ?? "";
    message.participants = object.participants?.map(e => e) || [];
    message.threshold = object.threshold ?? 0;
    return message;
  },
  fromAmino(object: MsgCreateOracleAmino): MsgCreateOracle {
    const message = createBaseMsgCreateOracle();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.participants = object.participants?.map(e => e) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    return message;
  },
  toAmino(message: MsgCreateOracle): MsgCreateOracleAmino {
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
  fromAminoMsg(object: MsgCreateOracleAminoMsg): MsgCreateOracle {
    return MsgCreateOracle.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateOracleProtoMsg): MsgCreateOracle {
    return MsgCreateOracle.decode(message.value);
  },
  toProto(message: MsgCreateOracle): Uint8Array {
    return MsgCreateOracle.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateOracle): MsgCreateOracleProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgCreateOracle",
      value: MsgCreateOracle.encode(message).finish()
    };
  }
};
function createBaseMsgCreateOracleResponse(): MsgCreateOracleResponse {
  return {};
}
export const MsgCreateOracleResponse = {
  typeUrl: "/side.dlc.MsgCreateOracleResponse",
  encode(_: MsgCreateOracleResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateOracleResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateOracleResponse();
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
  fromPartial(_: Partial<MsgCreateOracleResponse>): MsgCreateOracleResponse {
    const message = createBaseMsgCreateOracleResponse();
    return message;
  },
  fromAmino(_: MsgCreateOracleResponseAmino): MsgCreateOracleResponse {
    const message = createBaseMsgCreateOracleResponse();
    return message;
  },
  toAmino(_: MsgCreateOracleResponse): MsgCreateOracleResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateOracleResponseAminoMsg): MsgCreateOracleResponse {
    return MsgCreateOracleResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateOracleResponseProtoMsg): MsgCreateOracleResponse {
    return MsgCreateOracleResponse.decode(message.value);
  },
  toProto(message: MsgCreateOracleResponse): Uint8Array {
    return MsgCreateOracleResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateOracleResponse): MsgCreateOracleResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.MsgCreateOracleResponse",
      value: MsgCreateOracleResponse.encode(message).finish()
    };
  }
};
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