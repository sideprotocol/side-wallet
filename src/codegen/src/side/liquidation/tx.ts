//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgLiquidate defines the Msg/Liquidate request type. */
export interface MsgLiquidate {
  liquidator: string;
  liquidationId: bigint;
  debtAmount: Coin;
}
export interface MsgLiquidateProtoMsg {
  typeUrl: "/side.liquidation.MsgLiquidate";
  value: Uint8Array;
}
/** MsgLiquidate defines the Msg/Liquidate request type. */
export interface MsgLiquidateAmino {
  liquidator?: string;
  liquidation_id?: string;
  debt_amount?: CoinAmino;
}
export interface MsgLiquidateAminoMsg {
  type: "/side.liquidation.MsgLiquidate";
  value: MsgLiquidateAmino;
}
/** MsgLiquidate defines the Msg/Liquidate request type. */
export interface MsgLiquidateSDKType {
  liquidator: string;
  liquidation_id: bigint;
  debt_amount: CoinSDKType;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponse {}
export interface MsgLiquidateResponseProtoMsg {
  typeUrl: "/side.liquidation.MsgLiquidateResponse";
  value: Uint8Array;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponseAmino {}
export interface MsgLiquidateResponseAminoMsg {
  type: "/side.liquidation.MsgLiquidateResponse";
  value: MsgLiquidateResponseAmino;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponseSDKType {}
/** MsgSubmitSettlementSignatures defines the Msg/SubmitSettlementSignatures request type. */
export interface MsgSubmitSettlementSignatures {
  sender: string;
  liquidationId: bigint;
  signatures: string[];
}
export interface MsgSubmitSettlementSignaturesProtoMsg {
  typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures";
  value: Uint8Array;
}
/** MsgSubmitSettlementSignatures defines the Msg/SubmitSettlementSignatures request type. */
export interface MsgSubmitSettlementSignaturesAmino {
  sender?: string;
  liquidation_id?: string;
  signatures?: string[];
}
export interface MsgSubmitSettlementSignaturesAminoMsg {
  type: "/side.liquidation.MsgSubmitSettlementSignatures";
  value: MsgSubmitSettlementSignaturesAmino;
}
/** MsgSubmitSettlementSignatures defines the Msg/SubmitSettlementSignatures request type. */
export interface MsgSubmitSettlementSignaturesSDKType {
  sender: string;
  liquidation_id: bigint;
  signatures: string[];
}
/** MsgSubmitSettlementSignaturesResponse defines the Msg/SubmitSettlementSignatures response type. */
export interface MsgSubmitSettlementSignaturesResponse {}
export interface MsgSubmitSettlementSignaturesResponseProtoMsg {
  typeUrl: "/side.liquidation.MsgSubmitSettlementSignaturesResponse";
  value: Uint8Array;
}
/** MsgSubmitSettlementSignaturesResponse defines the Msg/SubmitSettlementSignatures response type. */
export interface MsgSubmitSettlementSignaturesResponseAmino {}
export interface MsgSubmitSettlementSignaturesResponseAminoMsg {
  type: "/side.liquidation.MsgSubmitSettlementSignaturesResponse";
  value: MsgSubmitSettlementSignaturesResponseAmino;
}
/** MsgSubmitSettlementSignaturesResponse defines the Msg/SubmitSettlementSignatures response type. */
export interface MsgSubmitSettlementSignaturesResponseSDKType {}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/btcbridge parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/side.liquidation.MsgUpdateParams";
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
   * params defines the x/btcbridge parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/side.liquidation.MsgUpdateParams";
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
  typeUrl: "/side.liquidation.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/side.liquidation.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgLiquidate(): MsgLiquidate {
  return {
    liquidator: "",
    liquidationId: BigInt(0),
    debtAmount: Coin.fromPartial({})
  };
}
export const MsgLiquidate = {
  typeUrl: "/side.liquidation.MsgLiquidate",
  encode(message: MsgLiquidate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidator !== "") {
      writer.uint32(10).string(message.liquidator);
    }
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(16).uint64(message.liquidationId);
    }
    if (message.debtAmount !== undefined) {
      Coin.encode(message.debtAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgLiquidate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidator = reader.string();
          break;
        case 2:
          message.liquidationId = reader.uint64();
          break;
        case 3:
          message.debtAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidate>): MsgLiquidate {
    const message = createBaseMsgLiquidate();
    message.liquidator = object.liquidator ?? "";
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.debtAmount = object.debtAmount !== undefined && object.debtAmount !== null ? Coin.fromPartial(object.debtAmount) : undefined;
    return message;
  },
  fromAmino(object: MsgLiquidateAmino): MsgLiquidate {
    const message = createBaseMsgLiquidate();
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = Coin.fromAmino(object.debt_amount);
    }
    return message;
  },
  toAmino(message: MsgLiquidate): MsgLiquidateAmino {
    const obj: any = {};
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    obj.debt_amount = message.debtAmount ? Coin.toAmino(message.debtAmount) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateAminoMsg): MsgLiquidate {
    return MsgLiquidate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidateProtoMsg): MsgLiquidate {
    return MsgLiquidate.decode(message.value);
  },
  toProto(message: MsgLiquidate): Uint8Array {
    return MsgLiquidate.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidate): MsgLiquidateProtoMsg {
    return {
      typeUrl: "/side.liquidation.MsgLiquidate",
      value: MsgLiquidate.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidateResponse(): MsgLiquidateResponse {
  return {};
}
export const MsgLiquidateResponse = {
  typeUrl: "/side.liquidation.MsgLiquidateResponse",
  encode(_: MsgLiquidateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgLiquidateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidateResponse();
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
  fromPartial(_: Partial<MsgLiquidateResponse>): MsgLiquidateResponse {
    const message = createBaseMsgLiquidateResponse();
    return message;
  },
  fromAmino(_: MsgLiquidateResponseAmino): MsgLiquidateResponse {
    const message = createBaseMsgLiquidateResponse();
    return message;
  },
  toAmino(_: MsgLiquidateResponse): MsgLiquidateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateResponseAminoMsg): MsgLiquidateResponse {
    return MsgLiquidateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidateResponseProtoMsg): MsgLiquidateResponse {
    return MsgLiquidateResponse.decode(message.value);
  },
  toProto(message: MsgLiquidateResponse): Uint8Array {
    return MsgLiquidateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidateResponse): MsgLiquidateResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.MsgLiquidateResponse",
      value: MsgLiquidateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitSettlementSignatures(): MsgSubmitSettlementSignatures {
  return {
    sender: "",
    liquidationId: BigInt(0),
    signatures: []
  };
}
export const MsgSubmitSettlementSignatures = {
  typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures",
  encode(message: MsgSubmitSettlementSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(16).uint64(message.liquidationId);
    }
    for (const v of message.signatures) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitSettlementSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitSettlementSignatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.liquidationId = reader.uint64();
          break;
        case 3:
          message.signatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitSettlementSignatures>): MsgSubmitSettlementSignatures {
    const message = createBaseMsgSubmitSettlementSignatures();
    message.sender = object.sender ?? "";
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitSettlementSignaturesAmino): MsgSubmitSettlementSignatures {
    const message = createBaseMsgSubmitSettlementSignatures();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitSettlementSignatures): MsgSubmitSettlementSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => e);
    } else {
      obj.signatures = message.signatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitSettlementSignaturesAminoMsg): MsgSubmitSettlementSignatures {
    return MsgSubmitSettlementSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitSettlementSignaturesProtoMsg): MsgSubmitSettlementSignatures {
    return MsgSubmitSettlementSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitSettlementSignatures): Uint8Array {
    return MsgSubmitSettlementSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitSettlementSignatures): MsgSubmitSettlementSignaturesProtoMsg {
    return {
      typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures",
      value: MsgSubmitSettlementSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitSettlementSignaturesResponse(): MsgSubmitSettlementSignaturesResponse {
  return {};
}
export const MsgSubmitSettlementSignaturesResponse = {
  typeUrl: "/side.liquidation.MsgSubmitSettlementSignaturesResponse",
  encode(_: MsgSubmitSettlementSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitSettlementSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitSettlementSignaturesResponse();
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
  fromPartial(_: Partial<MsgSubmitSettlementSignaturesResponse>): MsgSubmitSettlementSignaturesResponse {
    const message = createBaseMsgSubmitSettlementSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitSettlementSignaturesResponseAmino): MsgSubmitSettlementSignaturesResponse {
    const message = createBaseMsgSubmitSettlementSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitSettlementSignaturesResponse): MsgSubmitSettlementSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitSettlementSignaturesResponseAminoMsg): MsgSubmitSettlementSignaturesResponse {
    return MsgSubmitSettlementSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitSettlementSignaturesResponseProtoMsg): MsgSubmitSettlementSignaturesResponse {
    return MsgSubmitSettlementSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitSettlementSignaturesResponse): Uint8Array {
    return MsgSubmitSettlementSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitSettlementSignaturesResponse): MsgSubmitSettlementSignaturesResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.MsgSubmitSettlementSignaturesResponse",
      value: MsgSubmitSettlementSignaturesResponse.encode(message).finish()
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
  typeUrl: "/side.liquidation.MsgUpdateParams",
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
      typeUrl: "/side.liquidation.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/side.liquidation.MsgUpdateParamsResponse",
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
      typeUrl: "/side.liquidation.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};