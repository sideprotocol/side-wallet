//@ts-nocheck
import { LiquidationStatus, Liquidation, LiquidationAmino, LiquidationSDKType, LiquidationRecord, LiquidationRecordAmino, LiquidationRecordSDKType } from "./liquidation";
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.liquidation.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.liquidation.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.liquidation.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.liquidation.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryLiquidationRequest is request type for the Query/Liquidation RPC method. */
export interface QueryLiquidationRequest {
  id: bigint;
}
export interface QueryLiquidationRequestProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationRequest";
  value: Uint8Array;
}
/** QueryLiquidationRequest is request type for the Query/Liquidation RPC method. */
export interface QueryLiquidationRequestAmino {
  id?: string;
}
export interface QueryLiquidationRequestAminoMsg {
  type: "/side.liquidation.QueryLiquidationRequest";
  value: QueryLiquidationRequestAmino;
}
/** QueryLiquidationRequest is request type for the Query/Liquidation RPC method. */
export interface QueryLiquidationRequestSDKType {
  id: bigint;
}
/** QueryLiquidationResponse is response type for the Query/Liquidation RPC method. */
export interface QueryLiquidationResponse {
  liquidation?: Liquidation;
}
export interface QueryLiquidationResponseProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationResponse";
  value: Uint8Array;
}
/** QueryLiquidationResponse is response type for the Query/Liquidation RPC method. */
export interface QueryLiquidationResponseAmino {
  liquidation?: LiquidationAmino;
}
export interface QueryLiquidationResponseAminoMsg {
  type: "/side.liquidation.QueryLiquidationResponse";
  value: QueryLiquidationResponseAmino;
}
/** QueryLiquidationResponse is response type for the Query/Liquidation RPC method. */
export interface QueryLiquidationResponseSDKType {
  liquidation?: LiquidationSDKType;
}
/** QueryLiquidationsRequest is request type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsRequest {
  status: LiquidationStatus;
  pagination?: PageRequest;
}
export interface QueryLiquidationsRequestProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationsRequest";
  value: Uint8Array;
}
/** QueryLiquidationsRequest is request type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsRequestAmino {
  status?: LiquidationStatus;
  pagination?: PageRequestAmino;
}
export interface QueryLiquidationsRequestAminoMsg {
  type: "/side.liquidation.QueryLiquidationsRequest";
  value: QueryLiquidationsRequestAmino;
}
/** QueryLiquidationsRequest is request type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsRequestSDKType {
  status: LiquidationStatus;
  pagination?: PageRequestSDKType;
}
/** QueryLiquidationsResponse is response type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsResponse {
  liquidations: Liquidation[];
  pagination?: PageResponse;
}
export interface QueryLiquidationsResponseProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationsResponse";
  value: Uint8Array;
}
/** QueryLiquidationsResponse is response type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsResponseAmino {
  liquidations?: LiquidationAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryLiquidationsResponseAminoMsg {
  type: "/side.liquidation.QueryLiquidationsResponse";
  value: QueryLiquidationsResponseAmino;
}
/** QueryLiquidationsResponse is response type for the Query/Liquidations RPC method. */
export interface QueryLiquidationsResponseSDKType {
  liquidations: LiquidationSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryLiquidationRecordRequest is request type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordRequest {
  id: bigint;
}
export interface QueryLiquidationRecordRequestProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationRecordRequest";
  value: Uint8Array;
}
/** QueryLiquidationRecordRequest is request type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordRequestAmino {
  id?: string;
}
export interface QueryLiquidationRecordRequestAminoMsg {
  type: "/side.liquidation.QueryLiquidationRecordRequest";
  value: QueryLiquidationRecordRequestAmino;
}
/** QueryLiquidationRecordRequest is request type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordRequestSDKType {
  id: bigint;
}
/** QueryLiquidationRecordResponse is response type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordResponse {
  liquidationRecord?: LiquidationRecord;
}
export interface QueryLiquidationRecordResponseProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationRecordResponse";
  value: Uint8Array;
}
/** QueryLiquidationRecordResponse is response type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordResponseAmino {
  liquidation_record?: LiquidationRecordAmino;
}
export interface QueryLiquidationRecordResponseAminoMsg {
  type: "/side.liquidation.QueryLiquidationRecordResponse";
  value: QueryLiquidationRecordResponseAmino;
}
/** QueryLiquidationRecordResponse is response type for the Query/LiquidationRecord RPC method. */
export interface QueryLiquidationRecordResponseSDKType {
  liquidation_record?: LiquidationRecordSDKType;
}
/** QueryLiquidationRecordsRequest is request type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsRequest {
  liquidationId: bigint;
  pagination?: PageRequest;
}
export interface QueryLiquidationRecordsRequestProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationRecordsRequest";
  value: Uint8Array;
}
/** QueryLiquidationRecordsRequest is request type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsRequestAmino {
  liquidation_id?: string;
  pagination?: PageRequestAmino;
}
export interface QueryLiquidationRecordsRequestAminoMsg {
  type: "/side.liquidation.QueryLiquidationRecordsRequest";
  value: QueryLiquidationRecordsRequestAmino;
}
/** QueryLiquidationRecordsRequest is request type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsRequestSDKType {
  liquidation_id: bigint;
  pagination?: PageRequestSDKType;
}
/** QueryLiquidationRecordsResponse is response type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsResponse {
  liquidationRecords: LiquidationRecord[];
  pagination?: PageResponse;
}
export interface QueryLiquidationRecordsResponseProtoMsg {
  typeUrl: "/side.liquidation.QueryLiquidationRecordsResponse";
  value: Uint8Array;
}
/** QueryLiquidationRecordsResponse is response type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsResponseAmino {
  liquidation_records?: LiquidationRecordAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryLiquidationRecordsResponseAminoMsg {
  type: "/side.liquidation.QueryLiquidationRecordsResponse";
  value: QueryLiquidationRecordsResponseAmino;
}
/** QueryLiquidationRecordsResponse is response type for the Query/LiquidationRecords RPC method. */
export interface QueryLiquidationRecordsResponseSDKType {
  liquidation_records: LiquidationRecordSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.liquidation.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/side.liquidation.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationRequest(): QueryLiquidationRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryLiquidationRequest = {
  typeUrl: "/side.liquidation.QueryLiquidationRequest",
  encode(message: QueryLiquidationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationRequest>): QueryLiquidationRequest {
    const message = createBaseQueryLiquidationRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLiquidationRequestAmino): QueryLiquidationRequest {
    const message = createBaseQueryLiquidationRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryLiquidationRequest): QueryLiquidationRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationRequestAminoMsg): QueryLiquidationRequest {
    return QueryLiquidationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationRequestProtoMsg): QueryLiquidationRequest {
    return QueryLiquidationRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationRequest): Uint8Array {
    return QueryLiquidationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationRequest): QueryLiquidationRequestProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationRequest",
      value: QueryLiquidationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationResponse(): QueryLiquidationResponse {
  return {
    liquidation: undefined
  };
}
export const QueryLiquidationResponse = {
  typeUrl: "/side.liquidation.QueryLiquidationResponse",
  encode(message: QueryLiquidationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidation !== undefined) {
      Liquidation.encode(message.liquidation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidation = Liquidation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationResponse>): QueryLiquidationResponse {
    const message = createBaseQueryLiquidationResponse();
    message.liquidation = object.liquidation !== undefined && object.liquidation !== null ? Liquidation.fromPartial(object.liquidation) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationResponseAmino): QueryLiquidationResponse {
    const message = createBaseQueryLiquidationResponse();
    if (object.liquidation !== undefined && object.liquidation !== null) {
      message.liquidation = Liquidation.fromAmino(object.liquidation);
    }
    return message;
  },
  toAmino(message: QueryLiquidationResponse): QueryLiquidationResponseAmino {
    const obj: any = {};
    obj.liquidation = message.liquidation ? Liquidation.toAmino(message.liquidation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationResponseAminoMsg): QueryLiquidationResponse {
    return QueryLiquidationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationResponseProtoMsg): QueryLiquidationResponse {
    return QueryLiquidationResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationResponse): Uint8Array {
    return QueryLiquidationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationResponse): QueryLiquidationResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationResponse",
      value: QueryLiquidationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationsRequest(): QueryLiquidationsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryLiquidationsRequest = {
  typeUrl: "/side.liquidation.QueryLiquidationsRequest",
  encode(message: QueryLiquidationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationsRequest>): QueryLiquidationsRequest {
    const message = createBaseQueryLiquidationsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationsRequestAmino): QueryLiquidationsRequest {
    const message = createBaseQueryLiquidationsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLiquidationsRequest): QueryLiquidationsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationsRequestAminoMsg): QueryLiquidationsRequest {
    return QueryLiquidationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationsRequestProtoMsg): QueryLiquidationsRequest {
    return QueryLiquidationsRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationsRequest): Uint8Array {
    return QueryLiquidationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationsRequest): QueryLiquidationsRequestProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationsRequest",
      value: QueryLiquidationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationsResponse(): QueryLiquidationsResponse {
  return {
    liquidations: [],
    pagination: undefined
  };
}
export const QueryLiquidationsResponse = {
  typeUrl: "/side.liquidation.QueryLiquidationsResponse",
  encode(message: QueryLiquidationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidations) {
      Liquidation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidations.push(Liquidation.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationsResponse>): QueryLiquidationsResponse {
    const message = createBaseQueryLiquidationsResponse();
    message.liquidations = object.liquidations?.map(e => Liquidation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationsResponseAmino): QueryLiquidationsResponse {
    const message = createBaseQueryLiquidationsResponse();
    message.liquidations = object.liquidations?.map(e => Liquidation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLiquidationsResponse): QueryLiquidationsResponseAmino {
    const obj: any = {};
    if (message.liquidations) {
      obj.liquidations = message.liquidations.map(e => e ? Liquidation.toAmino(e) : undefined);
    } else {
      obj.liquidations = message.liquidations;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationsResponseAminoMsg): QueryLiquidationsResponse {
    return QueryLiquidationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationsResponseProtoMsg): QueryLiquidationsResponse {
    return QueryLiquidationsResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationsResponse): Uint8Array {
    return QueryLiquidationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationsResponse): QueryLiquidationsResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationsResponse",
      value: QueryLiquidationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationRecordRequest(): QueryLiquidationRecordRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryLiquidationRecordRequest = {
  typeUrl: "/side.liquidation.QueryLiquidationRecordRequest",
  encode(message: QueryLiquidationRecordRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationRecordRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationRecordRequest>): QueryLiquidationRecordRequest {
    const message = createBaseQueryLiquidationRecordRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLiquidationRecordRequestAmino): QueryLiquidationRecordRequest {
    const message = createBaseQueryLiquidationRecordRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryLiquidationRecordRequest): QueryLiquidationRecordRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationRecordRequestAminoMsg): QueryLiquidationRecordRequest {
    return QueryLiquidationRecordRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationRecordRequestProtoMsg): QueryLiquidationRecordRequest {
    return QueryLiquidationRecordRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationRecordRequest): Uint8Array {
    return QueryLiquidationRecordRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationRecordRequest): QueryLiquidationRecordRequestProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationRecordRequest",
      value: QueryLiquidationRecordRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationRecordResponse(): QueryLiquidationRecordResponse {
  return {
    liquidationRecord: undefined
  };
}
export const QueryLiquidationRecordResponse = {
  typeUrl: "/side.liquidation.QueryLiquidationRecordResponse",
  encode(message: QueryLiquidationRecordResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationRecord !== undefined) {
      LiquidationRecord.encode(message.liquidationRecord, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationRecordResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationRecord = LiquidationRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationRecordResponse>): QueryLiquidationRecordResponse {
    const message = createBaseQueryLiquidationRecordResponse();
    message.liquidationRecord = object.liquidationRecord !== undefined && object.liquidationRecord !== null ? LiquidationRecord.fromPartial(object.liquidationRecord) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationRecordResponseAmino): QueryLiquidationRecordResponse {
    const message = createBaseQueryLiquidationRecordResponse();
    if (object.liquidation_record !== undefined && object.liquidation_record !== null) {
      message.liquidationRecord = LiquidationRecord.fromAmino(object.liquidation_record);
    }
    return message;
  },
  toAmino(message: QueryLiquidationRecordResponse): QueryLiquidationRecordResponseAmino {
    const obj: any = {};
    obj.liquidation_record = message.liquidationRecord ? LiquidationRecord.toAmino(message.liquidationRecord) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationRecordResponseAminoMsg): QueryLiquidationRecordResponse {
    return QueryLiquidationRecordResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationRecordResponseProtoMsg): QueryLiquidationRecordResponse {
    return QueryLiquidationRecordResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationRecordResponse): Uint8Array {
    return QueryLiquidationRecordResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationRecordResponse): QueryLiquidationRecordResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationRecordResponse",
      value: QueryLiquidationRecordResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationRecordsRequest(): QueryLiquidationRecordsRequest {
  return {
    liquidationId: BigInt(0),
    pagination: undefined
  };
}
export const QueryLiquidationRecordsRequest = {
  typeUrl: "/side.liquidation.QueryLiquidationRecordsRequest",
  encode(message: QueryLiquidationRecordsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationId !== BigInt(0)) {
      writer.uint32(8).uint64(message.liquidationId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationRecordsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationId = reader.uint64();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationRecordsRequest>): QueryLiquidationRecordsRequest {
    const message = createBaseQueryLiquidationRecordsRequest();
    message.liquidationId = object.liquidationId !== undefined && object.liquidationId !== null ? BigInt(object.liquidationId.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationRecordsRequestAmino): QueryLiquidationRecordsRequest {
    const message = createBaseQueryLiquidationRecordsRequest();
    if (object.liquidation_id !== undefined && object.liquidation_id !== null) {
      message.liquidationId = BigInt(object.liquidation_id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLiquidationRecordsRequest): QueryLiquidationRecordsRequestAmino {
    const obj: any = {};
    obj.liquidation_id = message.liquidationId !== BigInt(0) ? message.liquidationId.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationRecordsRequestAminoMsg): QueryLiquidationRecordsRequest {
    return QueryLiquidationRecordsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationRecordsRequestProtoMsg): QueryLiquidationRecordsRequest {
    return QueryLiquidationRecordsRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationRecordsRequest): Uint8Array {
    return QueryLiquidationRecordsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationRecordsRequest): QueryLiquidationRecordsRequestProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationRecordsRequest",
      value: QueryLiquidationRecordsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationRecordsResponse(): QueryLiquidationRecordsResponse {
  return {
    liquidationRecords: [],
    pagination: undefined
  };
}
export const QueryLiquidationRecordsResponse = {
  typeUrl: "/side.liquidation.QueryLiquidationRecordsResponse",
  encode(message: QueryLiquidationRecordsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.liquidationRecords) {
      LiquidationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationRecordsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationRecords.push(LiquidationRecord.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationRecordsResponse>): QueryLiquidationRecordsResponse {
    const message = createBaseQueryLiquidationRecordsResponse();
    message.liquidationRecords = object.liquidationRecords?.map(e => LiquidationRecord.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLiquidationRecordsResponseAmino): QueryLiquidationRecordsResponse {
    const message = createBaseQueryLiquidationRecordsResponse();
    message.liquidationRecords = object.liquidation_records?.map(e => LiquidationRecord.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLiquidationRecordsResponse): QueryLiquidationRecordsResponseAmino {
    const obj: any = {};
    if (message.liquidationRecords) {
      obj.liquidation_records = message.liquidationRecords.map(e => e ? LiquidationRecord.toAmino(e) : undefined);
    } else {
      obj.liquidation_records = message.liquidationRecords;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationRecordsResponseAminoMsg): QueryLiquidationRecordsResponse {
    return QueryLiquidationRecordsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationRecordsResponseProtoMsg): QueryLiquidationRecordsResponse {
    return QueryLiquidationRecordsResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationRecordsResponse): Uint8Array {
    return QueryLiquidationRecordsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationRecordsResponse): QueryLiquidationRecordsResponseProtoMsg {
    return {
      typeUrl: "/side.liquidation.QueryLiquidationRecordsResponse",
      value: QueryLiquidationRecordsResponse.encode(message).finish()
    };
  }
};