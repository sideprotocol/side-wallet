//@ts-nocheck
import { DKGStatus, SigningStatus, RefreshingStatus, DKGRequest, DKGRequestAmino, DKGRequestSDKType, DKGCompletion, DKGCompletionAmino, DKGCompletionSDKType, SigningRequest, SigningRequestAmino, SigningRequestSDKType, RefreshingRequest, RefreshingRequestAmino, RefreshingRequestSDKType, RefreshingCompletion, RefreshingCompletionAmino, RefreshingCompletionSDKType } from "./tss";
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface QueryDKGRequestRequest {
  id: bigint;
}
export interface QueryDKGRequestRequestProtoMsg {
  typeUrl: "/side.tss.QueryDKGRequestRequest";
  value: Uint8Array;
}
export interface QueryDKGRequestRequestAmino {
  id?: string;
}
export interface QueryDKGRequestRequestAminoMsg {
  type: "/side.tss.QueryDKGRequestRequest";
  value: QueryDKGRequestRequestAmino;
}
export interface QueryDKGRequestRequestSDKType {
  id: bigint;
}
export interface QueryDKGRequestResponse {
  request?: DKGRequest;
}
export interface QueryDKGRequestResponseProtoMsg {
  typeUrl: "/side.tss.QueryDKGRequestResponse";
  value: Uint8Array;
}
export interface QueryDKGRequestResponseAmino {
  request?: DKGRequestAmino;
}
export interface QueryDKGRequestResponseAminoMsg {
  type: "/side.tss.QueryDKGRequestResponse";
  value: QueryDKGRequestResponseAmino;
}
export interface QueryDKGRequestResponseSDKType {
  request?: DKGRequestSDKType;
}
export interface QueryDKGRequestsRequest {
  module: string;
  status: DKGStatus;
  pagination?: PageRequest;
}
export interface QueryDKGRequestsRequestProtoMsg {
  typeUrl: "/side.tss.QueryDKGRequestsRequest";
  value: Uint8Array;
}
export interface QueryDKGRequestsRequestAmino {
  module?: string;
  status?: DKGStatus;
  pagination?: PageRequestAmino;
}
export interface QueryDKGRequestsRequestAminoMsg {
  type: "/side.tss.QueryDKGRequestsRequest";
  value: QueryDKGRequestsRequestAmino;
}
export interface QueryDKGRequestsRequestSDKType {
  module: string;
  status: DKGStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryDKGRequestsResponse {
  requests: DKGRequest[];
  pagination?: PageResponse;
}
export interface QueryDKGRequestsResponseProtoMsg {
  typeUrl: "/side.tss.QueryDKGRequestsResponse";
  value: Uint8Array;
}
export interface QueryDKGRequestsResponseAmino {
  requests?: DKGRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryDKGRequestsResponseAminoMsg {
  type: "/side.tss.QueryDKGRequestsResponse";
  value: QueryDKGRequestsResponseAmino;
}
export interface QueryDKGRequestsResponseSDKType {
  requests: DKGRequestSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryDKGCompletionsRequest {
  id: bigint;
  pagination?: PageRequest;
}
export interface QueryDKGCompletionsRequestProtoMsg {
  typeUrl: "/side.tss.QueryDKGCompletionsRequest";
  value: Uint8Array;
}
export interface QueryDKGCompletionsRequestAmino {
  id?: string;
  pagination?: PageRequestAmino;
}
export interface QueryDKGCompletionsRequestAminoMsg {
  type: "/side.tss.QueryDKGCompletionsRequest";
  value: QueryDKGCompletionsRequestAmino;
}
export interface QueryDKGCompletionsRequestSDKType {
  id: bigint;
  pagination?: PageRequestSDKType;
}
export interface QueryDKGCompletionsResponse {
  completions: DKGCompletion[];
  pagination?: PageResponse;
}
export interface QueryDKGCompletionsResponseProtoMsg {
  typeUrl: "/side.tss.QueryDKGCompletionsResponse";
  value: Uint8Array;
}
export interface QueryDKGCompletionsResponseAmino {
  completions?: DKGCompletionAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryDKGCompletionsResponseAminoMsg {
  type: "/side.tss.QueryDKGCompletionsResponse";
  value: QueryDKGCompletionsResponseAmino;
}
export interface QueryDKGCompletionsResponseSDKType {
  completions: DKGCompletionSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QuerySigningRequestRequest {
  id: bigint;
}
export interface QuerySigningRequestRequestProtoMsg {
  typeUrl: "/side.tss.QuerySigningRequestRequest";
  value: Uint8Array;
}
export interface QuerySigningRequestRequestAmino {
  id?: string;
}
export interface QuerySigningRequestRequestAminoMsg {
  type: "/side.tss.QuerySigningRequestRequest";
  value: QuerySigningRequestRequestAmino;
}
export interface QuerySigningRequestRequestSDKType {
  id: bigint;
}
export interface QuerySigningRequestResponse {
  request?: SigningRequest;
}
export interface QuerySigningRequestResponseProtoMsg {
  typeUrl: "/side.tss.QuerySigningRequestResponse";
  value: Uint8Array;
}
export interface QuerySigningRequestResponseAmino {
  request?: SigningRequestAmino;
}
export interface QuerySigningRequestResponseAminoMsg {
  type: "/side.tss.QuerySigningRequestResponse";
  value: QuerySigningRequestResponseAmino;
}
export interface QuerySigningRequestResponseSDKType {
  request?: SigningRequestSDKType;
}
export interface QuerySigningRequestsRequest {
  module: string;
  status: SigningStatus;
  pagination?: PageRequest;
}
export interface QuerySigningRequestsRequestProtoMsg {
  typeUrl: "/side.tss.QuerySigningRequestsRequest";
  value: Uint8Array;
}
export interface QuerySigningRequestsRequestAmino {
  module?: string;
  status?: SigningStatus;
  pagination?: PageRequestAmino;
}
export interface QuerySigningRequestsRequestAminoMsg {
  type: "/side.tss.QuerySigningRequestsRequest";
  value: QuerySigningRequestsRequestAmino;
}
export interface QuerySigningRequestsRequestSDKType {
  module: string;
  status: SigningStatus;
  pagination?: PageRequestSDKType;
}
export interface QuerySigningRequestsResponse {
  requests: SigningRequest[];
  pagination?: PageResponse;
}
export interface QuerySigningRequestsResponseProtoMsg {
  typeUrl: "/side.tss.QuerySigningRequestsResponse";
  value: Uint8Array;
}
export interface QuerySigningRequestsResponseAmino {
  requests?: SigningRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestsResponseAminoMsg {
  type: "/side.tss.QuerySigningRequestsResponse";
  value: QuerySigningRequestsResponseAmino;
}
export interface QuerySigningRequestsResponseSDKType {
  requests: SigningRequestSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryRefreshingRequestRequest {
  id: bigint;
}
export interface QueryRefreshingRequestRequestProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingRequestRequest";
  value: Uint8Array;
}
export interface QueryRefreshingRequestRequestAmino {
  id?: string;
}
export interface QueryRefreshingRequestRequestAminoMsg {
  type: "/side.tss.QueryRefreshingRequestRequest";
  value: QueryRefreshingRequestRequestAmino;
}
export interface QueryRefreshingRequestRequestSDKType {
  id: bigint;
}
export interface QueryRefreshingRequestResponse {
  request?: RefreshingRequest;
}
export interface QueryRefreshingRequestResponseProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingRequestResponse";
  value: Uint8Array;
}
export interface QueryRefreshingRequestResponseAmino {
  request?: RefreshingRequestAmino;
}
export interface QueryRefreshingRequestResponseAminoMsg {
  type: "/side.tss.QueryRefreshingRequestResponse";
  value: QueryRefreshingRequestResponseAmino;
}
export interface QueryRefreshingRequestResponseSDKType {
  request?: RefreshingRequestSDKType;
}
export interface QueryRefreshingRequestsRequest {
  status: RefreshingStatus;
  pagination?: PageRequest;
}
export interface QueryRefreshingRequestsRequestProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingRequestsRequest";
  value: Uint8Array;
}
export interface QueryRefreshingRequestsRequestAmino {
  status?: RefreshingStatus;
  pagination?: PageRequestAmino;
}
export interface QueryRefreshingRequestsRequestAminoMsg {
  type: "/side.tss.QueryRefreshingRequestsRequest";
  value: QueryRefreshingRequestsRequestAmino;
}
export interface QueryRefreshingRequestsRequestSDKType {
  status: RefreshingStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryRefreshingRequestsResponse {
  requests: RefreshingRequest[];
  pagination?: PageResponse;
}
export interface QueryRefreshingRequestsResponseProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingRequestsResponse";
  value: Uint8Array;
}
export interface QueryRefreshingRequestsResponseAmino {
  requests?: RefreshingRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryRefreshingRequestsResponseAminoMsg {
  type: "/side.tss.QueryRefreshingRequestsResponse";
  value: QueryRefreshingRequestsResponseAmino;
}
export interface QueryRefreshingRequestsResponseSDKType {
  requests: RefreshingRequestSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryRefreshingCompletionsRequest {
  id: bigint;
  pagination?: PageRequest;
}
export interface QueryRefreshingCompletionsRequestProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingCompletionsRequest";
  value: Uint8Array;
}
export interface QueryRefreshingCompletionsRequestAmino {
  id?: string;
  pagination?: PageRequestAmino;
}
export interface QueryRefreshingCompletionsRequestAminoMsg {
  type: "/side.tss.QueryRefreshingCompletionsRequest";
  value: QueryRefreshingCompletionsRequestAmino;
}
export interface QueryRefreshingCompletionsRequestSDKType {
  id: bigint;
  pagination?: PageRequestSDKType;
}
export interface QueryRefreshingCompletionsResponse {
  completions: RefreshingCompletion[];
  pagination?: PageResponse;
}
export interface QueryRefreshingCompletionsResponseProtoMsg {
  typeUrl: "/side.tss.QueryRefreshingCompletionsResponse";
  value: Uint8Array;
}
export interface QueryRefreshingCompletionsResponseAmino {
  completions?: RefreshingCompletionAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryRefreshingCompletionsResponseAminoMsg {
  type: "/side.tss.QueryRefreshingCompletionsResponse";
  value: QueryRefreshingCompletionsResponseAmino;
}
export interface QueryRefreshingCompletionsResponseSDKType {
  completions: RefreshingCompletionSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.tss.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.tss.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.tss.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.tss.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryDKGRequestRequest(): QueryDKGRequestRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryDKGRequestRequest = {
  typeUrl: "/side.tss.QueryDKGRequestRequest",
  encode(message: QueryDKGRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestRequest();
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
  fromPartial(object: Partial<QueryDKGRequestRequest>): QueryDKGRequestRequest {
    const message = createBaseQueryDKGRequestRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryDKGRequestRequestAmino): QueryDKGRequestRequest {
    const message = createBaseQueryDKGRequestRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestRequest): QueryDKGRequestRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestRequestAminoMsg): QueryDKGRequestRequest {
    return QueryDKGRequestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestRequestProtoMsg): QueryDKGRequestRequest {
    return QueryDKGRequestRequest.decode(message.value);
  },
  toProto(message: QueryDKGRequestRequest): Uint8Array {
    return QueryDKGRequestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestRequest): QueryDKGRequestRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGRequestRequest",
      value: QueryDKGRequestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestResponse(): QueryDKGRequestResponse {
  return {
    request: undefined
  };
}
export const QueryDKGRequestResponse = {
  typeUrl: "/side.tss.QueryDKGRequestResponse",
  encode(message: QueryDKGRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.request !== undefined) {
      DKGRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = DKGRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGRequestResponse>): QueryDKGRequestResponse {
    const message = createBaseQueryDKGRequestResponse();
    message.request = object.request !== undefined && object.request !== null ? DKGRequest.fromPartial(object.request) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGRequestResponseAmino): QueryDKGRequestResponse {
    const message = createBaseQueryDKGRequestResponse();
    if (object.request !== undefined && object.request !== null) {
      message.request = DKGRequest.fromAmino(object.request);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestResponse): QueryDKGRequestResponseAmino {
    const obj: any = {};
    obj.request = message.request ? DKGRequest.toAmino(message.request) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestResponseAminoMsg): QueryDKGRequestResponse {
    return QueryDKGRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestResponseProtoMsg): QueryDKGRequestResponse {
    return QueryDKGRequestResponse.decode(message.value);
  },
  toProto(message: QueryDKGRequestResponse): Uint8Array {
    return QueryDKGRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestResponse): QueryDKGRequestResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGRequestResponse",
      value: QueryDKGRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestsRequest(): QueryDKGRequestsRequest {
  return {
    module: "",
    status: 0,
    pagination: undefined
  };
}
export const QueryDKGRequestsRequest = {
  typeUrl: "/side.tss.QueryDKGRequestsRequest",
  encode(message: QueryDKGRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGRequestsRequest>): QueryDKGRequestsRequest {
    const message = createBaseQueryDKGRequestsRequest();
    message.module = object.module ?? "";
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGRequestsRequestAmino): QueryDKGRequestsRequest {
    const message = createBaseQueryDKGRequestsRequest();
    if (object.module !== undefined && object.module !== null) {
      message.module = object.module;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestsRequest): QueryDKGRequestsRequestAmino {
    const obj: any = {};
    obj.module = message.module === "" ? undefined : message.module;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestsRequestAminoMsg): QueryDKGRequestsRequest {
    return QueryDKGRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestsRequestProtoMsg): QueryDKGRequestsRequest {
    return QueryDKGRequestsRequest.decode(message.value);
  },
  toProto(message: QueryDKGRequestsRequest): Uint8Array {
    return QueryDKGRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestsRequest): QueryDKGRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGRequestsRequest",
      value: QueryDKGRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestsResponse(): QueryDKGRequestsResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QueryDKGRequestsResponse = {
  typeUrl: "/side.tss.QueryDKGRequestsResponse",
  encode(message: QueryDKGRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      DKGRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(DKGRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryDKGRequestsResponse>): QueryDKGRequestsResponse {
    const message = createBaseQueryDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGRequestsResponseAmino): QueryDKGRequestsResponse {
    const message = createBaseQueryDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestsResponse): QueryDKGRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? DKGRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestsResponseAminoMsg): QueryDKGRequestsResponse {
    return QueryDKGRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestsResponseProtoMsg): QueryDKGRequestsResponse {
    return QueryDKGRequestsResponse.decode(message.value);
  },
  toProto(message: QueryDKGRequestsResponse): Uint8Array {
    return QueryDKGRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestsResponse): QueryDKGRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGRequestsResponse",
      value: QueryDKGRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDKGCompletionsRequest(): QueryDKGCompletionsRequest {
  return {
    id: BigInt(0),
    pagination: undefined
  };
}
export const QueryDKGCompletionsRequest = {
  typeUrl: "/side.tss.QueryDKGCompletionsRequest",
  encode(message: QueryDKGCompletionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGCompletionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGCompletionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
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
  fromPartial(object: Partial<QueryDKGCompletionsRequest>): QueryDKGCompletionsRequest {
    const message = createBaseQueryDKGCompletionsRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGCompletionsRequestAmino): QueryDKGCompletionsRequest {
    const message = createBaseQueryDKGCompletionsRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDKGCompletionsRequest): QueryDKGCompletionsRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGCompletionsRequestAminoMsg): QueryDKGCompletionsRequest {
    return QueryDKGCompletionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGCompletionsRequestProtoMsg): QueryDKGCompletionsRequest {
    return QueryDKGCompletionsRequest.decode(message.value);
  },
  toProto(message: QueryDKGCompletionsRequest): Uint8Array {
    return QueryDKGCompletionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGCompletionsRequest): QueryDKGCompletionsRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGCompletionsRequest",
      value: QueryDKGCompletionsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGCompletionsResponse(): QueryDKGCompletionsResponse {
  return {
    completions: [],
    pagination: undefined
  };
}
export const QueryDKGCompletionsResponse = {
  typeUrl: "/side.tss.QueryDKGCompletionsResponse",
  encode(message: QueryDKGCompletionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.completions) {
      DKGCompletion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGCompletionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGCompletionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completions.push(DKGCompletion.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryDKGCompletionsResponse>): QueryDKGCompletionsResponse {
    const message = createBaseQueryDKGCompletionsResponse();
    message.completions = object.completions?.map(e => DKGCompletion.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGCompletionsResponseAmino): QueryDKGCompletionsResponse {
    const message = createBaseQueryDKGCompletionsResponse();
    message.completions = object.completions?.map(e => DKGCompletion.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDKGCompletionsResponse): QueryDKGCompletionsResponseAmino {
    const obj: any = {};
    if (message.completions) {
      obj.completions = message.completions.map(e => e ? DKGCompletion.toAmino(e) : undefined);
    } else {
      obj.completions = message.completions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGCompletionsResponseAminoMsg): QueryDKGCompletionsResponse {
    return QueryDKGCompletionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGCompletionsResponseProtoMsg): QueryDKGCompletionsResponse {
    return QueryDKGCompletionsResponse.decode(message.value);
  },
  toProto(message: QueryDKGCompletionsResponse): Uint8Array {
    return QueryDKGCompletionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGCompletionsResponse): QueryDKGCompletionsResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryDKGCompletionsResponse",
      value: QueryDKGCompletionsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestRequest(): QuerySigningRequestRequest {
  return {
    id: BigInt(0)
  };
}
export const QuerySigningRequestRequest = {
  typeUrl: "/side.tss.QuerySigningRequestRequest",
  encode(message: QuerySigningRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestRequest();
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
  fromPartial(object: Partial<QuerySigningRequestRequest>): QuerySigningRequestRequest {
    const message = createBaseQuerySigningRequestRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QuerySigningRequestRequestAmino): QuerySigningRequestRequest {
    const message = createBaseQuerySigningRequestRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestRequest): QuerySigningRequestRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestRequestAminoMsg): QuerySigningRequestRequest {
    return QuerySigningRequestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestRequestProtoMsg): QuerySigningRequestRequest {
    return QuerySigningRequestRequest.decode(message.value);
  },
  toProto(message: QuerySigningRequestRequest): Uint8Array {
    return QuerySigningRequestRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestRequest): QuerySigningRequestRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QuerySigningRequestRequest",
      value: QuerySigningRequestRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestResponse(): QuerySigningRequestResponse {
  return {
    request: undefined
  };
}
export const QuerySigningRequestResponse = {
  typeUrl: "/side.tss.QuerySigningRequestResponse",
  encode(message: QuerySigningRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.request !== undefined) {
      SigningRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = SigningRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySigningRequestResponse>): QuerySigningRequestResponse {
    const message = createBaseQuerySigningRequestResponse();
    message.request = object.request !== undefined && object.request !== null ? SigningRequest.fromPartial(object.request) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestResponseAmino): QuerySigningRequestResponse {
    const message = createBaseQuerySigningRequestResponse();
    if (object.request !== undefined && object.request !== null) {
      message.request = SigningRequest.fromAmino(object.request);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestResponse): QuerySigningRequestResponseAmino {
    const obj: any = {};
    obj.request = message.request ? SigningRequest.toAmino(message.request) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestResponseAminoMsg): QuerySigningRequestResponse {
    return QuerySigningRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestResponseProtoMsg): QuerySigningRequestResponse {
    return QuerySigningRequestResponse.decode(message.value);
  },
  toProto(message: QuerySigningRequestResponse): Uint8Array {
    return QuerySigningRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestResponse): QuerySigningRequestResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QuerySigningRequestResponse",
      value: QuerySigningRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsRequest(): QuerySigningRequestsRequest {
  return {
    module: "",
    status: 0,
    pagination: undefined
  };
}
export const QuerySigningRequestsRequest = {
  typeUrl: "/side.tss.QuerySigningRequestsRequest",
  encode(message: QuerySigningRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.module !== "") {
      writer.uint32(10).string(message.module);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.module = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySigningRequestsRequest>): QuerySigningRequestsRequest {
    const message = createBaseQuerySigningRequestsRequest();
    message.module = object.module ?? "";
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsRequestAmino): QuerySigningRequestsRequest {
    const message = createBaseQuerySigningRequestsRequest();
    if (object.module !== undefined && object.module !== null) {
      message.module = object.module;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsRequest): QuerySigningRequestsRequestAmino {
    const obj: any = {};
    obj.module = message.module === "" ? undefined : message.module;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsRequestAminoMsg): QuerySigningRequestsRequest {
    return QuerySigningRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsRequestProtoMsg): QuerySigningRequestsRequest {
    return QuerySigningRequestsRequest.decode(message.value);
  },
  toProto(message: QuerySigningRequestsRequest): Uint8Array {
    return QuerySigningRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsRequest): QuerySigningRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QuerySigningRequestsRequest",
      value: QuerySigningRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsResponse(): QuerySigningRequestsResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QuerySigningRequestsResponse = {
  typeUrl: "/side.tss.QuerySigningRequestsResponse",
  encode(message: QuerySigningRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      SigningRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(SigningRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QuerySigningRequestsResponse>): QuerySigningRequestsResponse {
    const message = createBaseQuerySigningRequestsResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsResponseAmino): QuerySigningRequestsResponse {
    const message = createBaseQuerySigningRequestsResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsResponse): QuerySigningRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? SigningRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsResponseAminoMsg): QuerySigningRequestsResponse {
    return QuerySigningRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsResponseProtoMsg): QuerySigningRequestsResponse {
    return QuerySigningRequestsResponse.decode(message.value);
  },
  toProto(message: QuerySigningRequestsResponse): Uint8Array {
    return QuerySigningRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsResponse): QuerySigningRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QuerySigningRequestsResponse",
      value: QuerySigningRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingRequestRequest(): QueryRefreshingRequestRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryRefreshingRequestRequest = {
  typeUrl: "/side.tss.QueryRefreshingRequestRequest",
  encode(message: QueryRefreshingRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingRequestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingRequestRequest();
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
  fromPartial(object: Partial<QueryRefreshingRequestRequest>): QueryRefreshingRequestRequest {
    const message = createBaseQueryRefreshingRequestRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryRefreshingRequestRequestAmino): QueryRefreshingRequestRequest {
    const message = createBaseQueryRefreshingRequestRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryRefreshingRequestRequest): QueryRefreshingRequestRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingRequestRequestAminoMsg): QueryRefreshingRequestRequest {
    return QueryRefreshingRequestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingRequestRequestProtoMsg): QueryRefreshingRequestRequest {
    return QueryRefreshingRequestRequest.decode(message.value);
  },
  toProto(message: QueryRefreshingRequestRequest): Uint8Array {
    return QueryRefreshingRequestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingRequestRequest): QueryRefreshingRequestRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingRequestRequest",
      value: QueryRefreshingRequestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingRequestResponse(): QueryRefreshingRequestResponse {
  return {
    request: undefined
  };
}
export const QueryRefreshingRequestResponse = {
  typeUrl: "/side.tss.QueryRefreshingRequestResponse",
  encode(message: QueryRefreshingRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.request !== undefined) {
      RefreshingRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = RefreshingRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRefreshingRequestResponse>): QueryRefreshingRequestResponse {
    const message = createBaseQueryRefreshingRequestResponse();
    message.request = object.request !== undefined && object.request !== null ? RefreshingRequest.fromPartial(object.request) : undefined;
    return message;
  },
  fromAmino(object: QueryRefreshingRequestResponseAmino): QueryRefreshingRequestResponse {
    const message = createBaseQueryRefreshingRequestResponse();
    if (object.request !== undefined && object.request !== null) {
      message.request = RefreshingRequest.fromAmino(object.request);
    }
    return message;
  },
  toAmino(message: QueryRefreshingRequestResponse): QueryRefreshingRequestResponseAmino {
    const obj: any = {};
    obj.request = message.request ? RefreshingRequest.toAmino(message.request) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingRequestResponseAminoMsg): QueryRefreshingRequestResponse {
    return QueryRefreshingRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingRequestResponseProtoMsg): QueryRefreshingRequestResponse {
    return QueryRefreshingRequestResponse.decode(message.value);
  },
  toProto(message: QueryRefreshingRequestResponse): Uint8Array {
    return QueryRefreshingRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingRequestResponse): QueryRefreshingRequestResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingRequestResponse",
      value: QueryRefreshingRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingRequestsRequest(): QueryRefreshingRequestsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryRefreshingRequestsRequest = {
  typeUrl: "/side.tss.QueryRefreshingRequestsRequest",
  encode(message: QueryRefreshingRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingRequestsRequest();
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
  fromPartial(object: Partial<QueryRefreshingRequestsRequest>): QueryRefreshingRequestsRequest {
    const message = createBaseQueryRefreshingRequestsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRefreshingRequestsRequestAmino): QueryRefreshingRequestsRequest {
    const message = createBaseQueryRefreshingRequestsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRefreshingRequestsRequest): QueryRefreshingRequestsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingRequestsRequestAminoMsg): QueryRefreshingRequestsRequest {
    return QueryRefreshingRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingRequestsRequestProtoMsg): QueryRefreshingRequestsRequest {
    return QueryRefreshingRequestsRequest.decode(message.value);
  },
  toProto(message: QueryRefreshingRequestsRequest): Uint8Array {
    return QueryRefreshingRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingRequestsRequest): QueryRefreshingRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingRequestsRequest",
      value: QueryRefreshingRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingRequestsResponse(): QueryRefreshingRequestsResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QueryRefreshingRequestsResponse = {
  typeUrl: "/side.tss.QueryRefreshingRequestsResponse",
  encode(message: QueryRefreshingRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      RefreshingRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(RefreshingRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryRefreshingRequestsResponse>): QueryRefreshingRequestsResponse {
    const message = createBaseQueryRefreshingRequestsResponse();
    message.requests = object.requests?.map(e => RefreshingRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRefreshingRequestsResponseAmino): QueryRefreshingRequestsResponse {
    const message = createBaseQueryRefreshingRequestsResponse();
    message.requests = object.requests?.map(e => RefreshingRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRefreshingRequestsResponse): QueryRefreshingRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? RefreshingRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingRequestsResponseAminoMsg): QueryRefreshingRequestsResponse {
    return QueryRefreshingRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingRequestsResponseProtoMsg): QueryRefreshingRequestsResponse {
    return QueryRefreshingRequestsResponse.decode(message.value);
  },
  toProto(message: QueryRefreshingRequestsResponse): Uint8Array {
    return QueryRefreshingRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingRequestsResponse): QueryRefreshingRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingRequestsResponse",
      value: QueryRefreshingRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingCompletionsRequest(): QueryRefreshingCompletionsRequest {
  return {
    id: BigInt(0),
    pagination: undefined
  };
}
export const QueryRefreshingCompletionsRequest = {
  typeUrl: "/side.tss.QueryRefreshingCompletionsRequest",
  encode(message: QueryRefreshingCompletionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingCompletionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingCompletionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
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
  fromPartial(object: Partial<QueryRefreshingCompletionsRequest>): QueryRefreshingCompletionsRequest {
    const message = createBaseQueryRefreshingCompletionsRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRefreshingCompletionsRequestAmino): QueryRefreshingCompletionsRequest {
    const message = createBaseQueryRefreshingCompletionsRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRefreshingCompletionsRequest): QueryRefreshingCompletionsRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingCompletionsRequestAminoMsg): QueryRefreshingCompletionsRequest {
    return QueryRefreshingCompletionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingCompletionsRequestProtoMsg): QueryRefreshingCompletionsRequest {
    return QueryRefreshingCompletionsRequest.decode(message.value);
  },
  toProto(message: QueryRefreshingCompletionsRequest): Uint8Array {
    return QueryRefreshingCompletionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingCompletionsRequest): QueryRefreshingCompletionsRequestProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingCompletionsRequest",
      value: QueryRefreshingCompletionsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRefreshingCompletionsResponse(): QueryRefreshingCompletionsResponse {
  return {
    completions: [],
    pagination: undefined
  };
}
export const QueryRefreshingCompletionsResponse = {
  typeUrl: "/side.tss.QueryRefreshingCompletionsResponse",
  encode(message: QueryRefreshingCompletionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.completions) {
      RefreshingCompletion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRefreshingCompletionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRefreshingCompletionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completions.push(RefreshingCompletion.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryRefreshingCompletionsResponse>): QueryRefreshingCompletionsResponse {
    const message = createBaseQueryRefreshingCompletionsResponse();
    message.completions = object.completions?.map(e => RefreshingCompletion.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRefreshingCompletionsResponseAmino): QueryRefreshingCompletionsResponse {
    const message = createBaseQueryRefreshingCompletionsResponse();
    message.completions = object.completions?.map(e => RefreshingCompletion.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRefreshingCompletionsResponse): QueryRefreshingCompletionsResponseAmino {
    const obj: any = {};
    if (message.completions) {
      obj.completions = message.completions.map(e => e ? RefreshingCompletion.toAmino(e) : undefined);
    } else {
      obj.completions = message.completions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRefreshingCompletionsResponseAminoMsg): QueryRefreshingCompletionsResponse {
    return QueryRefreshingCompletionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRefreshingCompletionsResponseProtoMsg): QueryRefreshingCompletionsResponse {
    return QueryRefreshingCompletionsResponse.decode(message.value);
  },
  toProto(message: QueryRefreshingCompletionsResponse): Uint8Array {
    return QueryRefreshingCompletionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRefreshingCompletionsResponse): QueryRefreshingCompletionsResponseProtoMsg {
    return {
      typeUrl: "/side.tss.QueryRefreshingCompletionsResponse",
      value: QueryRefreshingCompletionsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.tss.QueryParamsRequest",
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
      typeUrl: "/side.tss.QueryParamsRequest",
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
  typeUrl: "/side.tss.QueryParamsResponse",
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
      typeUrl: "/side.tss.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};