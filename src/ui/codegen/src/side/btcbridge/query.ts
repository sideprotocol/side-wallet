//@ts-nocheck
import { SigningStatus, BitcoinSigningRequest, BitcoinSigningRequestAmino, BitcoinSigningRequestSDKType, BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, UTXO, UTXOAmino, UTXOSDKType } from './bitcoin';
import { PageResponse, PageResponseAmino, PageResponseSDKType } from '../../cosmos/base/query/v1beta1/pagination';
import { Params, ParamsAmino, ParamsSDKType } from './params';
import { BinaryReader, BinaryWriter } from '../../binary';
/** QuerySigningRequestRequest is request type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestRequest {
  status: SigningStatus;
  pagination?: PageResponse;
}
export interface QuerySigningRequestRequestProtoMsg {
  typeUrl: '/side.btcbridge.QuerySigningRequestRequest';
  value: Uint8Array;
}
/** QuerySigningRequestRequest is request type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestRequestAmino {
  status?: SigningStatus;
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestRequestAminoMsg {
  type: '/side.btcbridge.QuerySigningRequestRequest';
  value: QuerySigningRequestRequestAmino;
}
/** QuerySigningRequestRequest is request type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestRequestSDKType {
  status: SigningStatus;
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestResponse is response type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestResponse {
  requests: BitcoinSigningRequest[];
  pagination?: PageResponse;
}
export interface QuerySigningRequestResponseProtoMsg {
  typeUrl: '/side.btcbridge.QuerySigningRequestResponse';
  value: Uint8Array;
}
/** QuerySigningRequestResponse is response type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestResponseAmino {
  requests?: BitcoinSigningRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestResponseAminoMsg {
  type: '/side.btcbridge.QuerySigningRequestResponse';
  value: QuerySigningRequestResponseAmino;
}
/** QuerySigningRequestResponse is response type for the Query/SigningRequest RPC method. */
export interface QuerySigningRequestResponseSDKType {
  requests: BitcoinSigningRequestSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryParamsRequest';
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: '/side.btcbridge.QueryParamsRequest';
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryParamsResponse';
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: '/side.btcbridge.QueryParamsResponse';
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequest {}
export interface QueryChainTipRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryChainTipRequest';
  value: Uint8Array;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequestAmino {}
export interface QueryChainTipRequestAminoMsg {
  type: '/side.btcbridge.QueryChainTipRequest';
  value: QueryChainTipRequestAmino;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequestSDKType {}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponse {
  hash: string;
  height: bigint;
}
export interface QueryChainTipResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryChainTipResponse';
  value: Uint8Array;
}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponseAmino {
  hash?: string;
  height?: string;
}
export interface QueryChainTipResponseAminoMsg {
  type: '/side.btcbridge.QueryChainTipResponse';
  value: QueryChainTipResponseAmino;
}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponseSDKType {
  hash: string;
  height: bigint;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequest {
  height: bigint;
}
export interface QueryBlockHeaderByHeightRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightRequest';
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequestAmino {
  height?: string;
}
export interface QueryBlockHeaderByHeightRequestAminoMsg {
  type: '/side.btcbridge.QueryBlockHeaderByHeightRequest';
  value: QueryBlockHeaderByHeightRequestAmino;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequestSDKType {
  height: bigint;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponse {
  blockHeader?: BlockHeader;
}
export interface QueryBlockHeaderByHeightResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightResponse';
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHeightResponseAminoMsg {
  type: '/side.btcbridge.QueryBlockHeaderByHeightResponse';
  value: QueryBlockHeaderByHeightResponseAmino;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequest {
  hash: string;
}
export interface QueryBlockHeaderByHashRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHashRequest';
  value: Uint8Array;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequestAmino {
  hash?: string;
}
export interface QueryBlockHeaderByHashRequestAminoMsg {
  type: '/side.btcbridge.QueryBlockHeaderByHashRequest';
  value: QueryBlockHeaderByHashRequestAmino;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequestSDKType {
  hash: string;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponse {
  blockHeader?: BlockHeader;
}
export interface QueryBlockHeaderByHashResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHashResponse';
  value: Uint8Array;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHashResponseAminoMsg {
  type: '/side.btcbridge.QueryBlockHeaderByHashResponse';
  value: QueryBlockHeaderByHashResponseAmino;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequest {}
export interface QueryUTXOsRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryUTXOsRequest';
  value: Uint8Array;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequestAmino {}
export interface QueryUTXOsRequestAminoMsg {
  type: '/side.btcbridge.QueryUTXOsRequest';
  value: QueryUTXOsRequestAmino;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequestSDKType {}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponse {
  utxos: UTXO[];
}
export interface QueryUTXOsResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryUTXOsResponse';
  value: Uint8Array;
}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponseAmino {
  utxos?: UTXOAmino[];
}
export interface QueryUTXOsResponseAminoMsg {
  type: '/side.btcbridge.QueryUTXOsResponse';
  value: QueryUTXOsResponseAmino;
}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponseSDKType {
  utxos: UTXOSDKType[];
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequest {
  address: string;
}
export interface QueryUTXOsByAddressRequestProtoMsg {
  typeUrl: '/side.btcbridge.QueryUTXOsByAddressRequest';
  value: Uint8Array;
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequestAmino {
  address?: string;
}
export interface QueryUTXOsByAddressRequestAminoMsg {
  type: '/side.btcbridge.QueryUTXOsByAddressRequest';
  value: QueryUTXOsByAddressRequestAmino;
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequestSDKType {
  address: string;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponse {
  utxos: UTXO[];
}
export interface QueryUTXOsByAddressResponseProtoMsg {
  typeUrl: '/side.btcbridge.QueryUTXOsByAddressResponse';
  value: Uint8Array;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponseAmino {
  utxos?: UTXOAmino[];
}
export interface QueryUTXOsByAddressResponseAminoMsg {
  type: '/side.btcbridge.QueryUTXOsByAddressResponse';
  value: QueryUTXOsByAddressResponseAmino;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponseSDKType {
  utxos: UTXOSDKType[];
}
function createBaseQuerySigningRequestRequest(): QuerySigningRequestRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QuerySigningRequestRequest = {
  typeUrl: '/side.btcbridge.QuerySigningRequestRequest',
  encode(message: QuerySigningRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
          message.status = (reader.int32() as any);
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
  fromPartial(object: Partial<QuerySigningRequestRequest>): QuerySigningRequestRequest {
    const message = createBaseQuerySigningRequestRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestRequestAmino): QuerySigningRequestRequest {
    const message = createBaseQuerySigningRequestRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestRequest): QuerySigningRequestRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
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
      typeUrl: '/side.btcbridge.QuerySigningRequestRequest',
      value: QuerySigningRequestRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestResponse(): QuerySigningRequestResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QuerySigningRequestResponse = {
  typeUrl: '/side.btcbridge.QuerySigningRequestResponse',
  encode(message: QuerySigningRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      BitcoinSigningRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
          message.requests.push(BitcoinSigningRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QuerySigningRequestResponse>): QuerySigningRequestResponse {
    const message = createBaseQuerySigningRequestResponse();
    message.requests = object.requests?.map(e => BitcoinSigningRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestResponseAmino): QuerySigningRequestResponse {
    const message = createBaseQuerySigningRequestResponse();
    message.requests = object.requests?.map(e => BitcoinSigningRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestResponse): QuerySigningRequestResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? BitcoinSigningRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
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
      typeUrl: '/side.btcbridge.QuerySigningRequestResponse',
      value: QuerySigningRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: '/side.btcbridge.QueryParamsRequest',
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
      typeUrl: '/side.btcbridge.QueryParamsRequest',
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
  typeUrl: '/side.btcbridge.QueryParamsResponse',
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
      typeUrl: '/side.btcbridge.QueryParamsResponse',
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipRequest(): QueryChainTipRequest {
  return {};
}
export const QueryChainTipRequest = {
  typeUrl: '/side.btcbridge.QueryChainTipRequest',
  encode(_: QueryChainTipRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryChainTipRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainTipRequest();
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
  fromPartial(_: Partial<QueryChainTipRequest>): QueryChainTipRequest {
    const message = createBaseQueryChainTipRequest();
    return message;
  },
  fromAmino(_: QueryChainTipRequestAmino): QueryChainTipRequest {
    const message = createBaseQueryChainTipRequest();
    return message;
  },
  toAmino(_: QueryChainTipRequest): QueryChainTipRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryChainTipRequestAminoMsg): QueryChainTipRequest {
    return QueryChainTipRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryChainTipRequestProtoMsg): QueryChainTipRequest {
    return QueryChainTipRequest.decode(message.value);
  },
  toProto(message: QueryChainTipRequest): Uint8Array {
    return QueryChainTipRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryChainTipRequest): QueryChainTipRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryChainTipRequest',
      value: QueryChainTipRequest.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipResponse(): QueryChainTipResponse {
  return {
    hash: '',
    height: BigInt(0)
  };
}
export const QueryChainTipResponse = {
  typeUrl: '/side.btcbridge.QueryChainTipResponse',
  encode(message: QueryChainTipResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== '') {
      writer.uint32(10).string(message.hash);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryChainTipResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainTipResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryChainTipResponse>): QueryChainTipResponse {
    const message = createBaseQueryChainTipResponse();
    message.hash = object.hash ?? '';
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryChainTipResponseAmino): QueryChainTipResponse {
    const message = createBaseQueryChainTipResponse();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: QueryChainTipResponse): QueryChainTipResponseAmino {
    const obj: any = {};
    obj.hash = message.hash === '' ? undefined : message.hash;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryChainTipResponseAminoMsg): QueryChainTipResponse {
    return QueryChainTipResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryChainTipResponseProtoMsg): QueryChainTipResponse {
    return QueryChainTipResponse.decode(message.value);
  },
  toProto(message: QueryChainTipResponse): Uint8Array {
    return QueryChainTipResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryChainTipResponse): QueryChainTipResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryChainTipResponse',
      value: QueryChainTipResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHeightRequest(): QueryBlockHeaderByHeightRequest {
  return {
    height: BigInt(0)
  };
}
export const QueryBlockHeaderByHeightRequest = {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightRequest',
  encode(message: QueryBlockHeaderByHeightRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHeightRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHeightRequest>): QueryBlockHeaderByHeightRequest {
    const message = createBaseQueryBlockHeaderByHeightRequest();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHeightRequestAmino): QueryBlockHeaderByHeightRequest {
    const message = createBaseQueryBlockHeaderByHeightRequest();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHeightRequest): QueryBlockHeaderByHeightRequestAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHeightRequestAminoMsg): QueryBlockHeaderByHeightRequest {
    return QueryBlockHeaderByHeightRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHeightRequestProtoMsg): QueryBlockHeaderByHeightRequest {
    return QueryBlockHeaderByHeightRequest.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHeightRequest): Uint8Array {
    return QueryBlockHeaderByHeightRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHeightRequest): QueryBlockHeaderByHeightRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightRequest',
      value: QueryBlockHeaderByHeightRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHeightResponse(): QueryBlockHeaderByHeightResponse {
  return {
    blockHeader: undefined
  };
}
export const QueryBlockHeaderByHeightResponse = {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightResponse',
  encode(message: QueryBlockHeaderByHeightResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeader !== undefined) {
      BlockHeader.encode(message.blockHeader, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHeightResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeader = BlockHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHeightResponse>): QueryBlockHeaderByHeightResponse {
    const message = createBaseQueryBlockHeaderByHeightResponse();
    message.blockHeader = object.blockHeader !== undefined && object.blockHeader !== null ? BlockHeader.fromPartial(object.blockHeader) : undefined;
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHeightResponseAmino): QueryBlockHeaderByHeightResponse {
    const message = createBaseQueryBlockHeaderByHeightResponse();
    if (object.block_header !== undefined && object.block_header !== null) {
      message.blockHeader = BlockHeader.fromAmino(object.block_header);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHeightResponse): QueryBlockHeaderByHeightResponseAmino {
    const obj: any = {};
    obj.block_header = message.blockHeader ? BlockHeader.toAmino(message.blockHeader) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHeightResponseAminoMsg): QueryBlockHeaderByHeightResponse {
    return QueryBlockHeaderByHeightResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHeightResponseProtoMsg): QueryBlockHeaderByHeightResponse {
    return QueryBlockHeaderByHeightResponse.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHeightResponse): Uint8Array {
    return QueryBlockHeaderByHeightResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHeightResponse): QueryBlockHeaderByHeightResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryBlockHeaderByHeightResponse',
      value: QueryBlockHeaderByHeightResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHashRequest(): QueryBlockHeaderByHashRequest {
  return {
    hash: ''
  };
}
export const QueryBlockHeaderByHashRequest = {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHashRequest',
  encode(message: QueryBlockHeaderByHashRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== '') {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHashRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHashRequest>): QueryBlockHeaderByHashRequest {
    const message = createBaseQueryBlockHeaderByHashRequest();
    message.hash = object.hash ?? '';
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHashRequestAmino): QueryBlockHeaderByHashRequest {
    const message = createBaseQueryBlockHeaderByHashRequest();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHashRequest): QueryBlockHeaderByHashRequestAmino {
    const obj: any = {};
    obj.hash = message.hash === '' ? undefined : message.hash;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHashRequestAminoMsg): QueryBlockHeaderByHashRequest {
    return QueryBlockHeaderByHashRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHashRequestProtoMsg): QueryBlockHeaderByHashRequest {
    return QueryBlockHeaderByHashRequest.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHashRequest): Uint8Array {
    return QueryBlockHeaderByHashRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHashRequest): QueryBlockHeaderByHashRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryBlockHeaderByHashRequest',
      value: QueryBlockHeaderByHashRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHashResponse(): QueryBlockHeaderByHashResponse {
  return {
    blockHeader: undefined
  };
}
export const QueryBlockHeaderByHashResponse = {
  typeUrl: '/side.btcbridge.QueryBlockHeaderByHashResponse',
  encode(message: QueryBlockHeaderByHashResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeader !== undefined) {
      BlockHeader.encode(message.blockHeader, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHashResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeader = BlockHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHashResponse>): QueryBlockHeaderByHashResponse {
    const message = createBaseQueryBlockHeaderByHashResponse();
    message.blockHeader = object.blockHeader !== undefined && object.blockHeader !== null ? BlockHeader.fromPartial(object.blockHeader) : undefined;
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHashResponseAmino): QueryBlockHeaderByHashResponse {
    const message = createBaseQueryBlockHeaderByHashResponse();
    if (object.block_header !== undefined && object.block_header !== null) {
      message.blockHeader = BlockHeader.fromAmino(object.block_header);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHashResponse): QueryBlockHeaderByHashResponseAmino {
    const obj: any = {};
    obj.block_header = message.blockHeader ? BlockHeader.toAmino(message.blockHeader) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHashResponseAminoMsg): QueryBlockHeaderByHashResponse {
    return QueryBlockHeaderByHashResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHashResponseProtoMsg): QueryBlockHeaderByHashResponse {
    return QueryBlockHeaderByHashResponse.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHashResponse): Uint8Array {
    return QueryBlockHeaderByHashResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHashResponse): QueryBlockHeaderByHashResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryBlockHeaderByHashResponse',
      value: QueryBlockHeaderByHashResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsRequest(): QueryUTXOsRequest {
  return {};
}
export const QueryUTXOsRequest = {
  typeUrl: '/side.btcbridge.QueryUTXOsRequest',
  encode(_: QueryUTXOsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsRequest();
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
  fromPartial(_: Partial<QueryUTXOsRequest>): QueryUTXOsRequest {
    const message = createBaseQueryUTXOsRequest();
    return message;
  },
  fromAmino(_: QueryUTXOsRequestAmino): QueryUTXOsRequest {
    const message = createBaseQueryUTXOsRequest();
    return message;
  },
  toAmino(_: QueryUTXOsRequest): QueryUTXOsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsRequestAminoMsg): QueryUTXOsRequest {
    return QueryUTXOsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsRequestProtoMsg): QueryUTXOsRequest {
    return QueryUTXOsRequest.decode(message.value);
  },
  toProto(message: QueryUTXOsRequest): Uint8Array {
    return QueryUTXOsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsRequest): QueryUTXOsRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryUTXOsRequest',
      value: QueryUTXOsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsResponse(): QueryUTXOsResponse {
  return {
    utxos: []
  };
}
export const QueryUTXOsResponse = {
  typeUrl: '/side.btcbridge.QueryUTXOsResponse',
  encode(message: QueryUTXOsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOsResponse>): QueryUTXOsResponse {
    const message = createBaseQueryUTXOsResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUTXOsResponseAmino): QueryUTXOsResponse {
    const message = createBaseQueryUTXOsResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUTXOsResponse): QueryUTXOsResponseAmino {
    const obj: any = {};
    if (message.utxos) {
      obj.utxos = message.utxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.utxos = message.utxos;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsResponseAminoMsg): QueryUTXOsResponse {
    return QueryUTXOsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsResponseProtoMsg): QueryUTXOsResponse {
    return QueryUTXOsResponse.decode(message.value);
  },
  toProto(message: QueryUTXOsResponse): Uint8Array {
    return QueryUTXOsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsResponse): QueryUTXOsResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryUTXOsResponse',
      value: QueryUTXOsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsByAddressRequest(): QueryUTXOsByAddressRequest {
  return {
    address: ''
  };
}
export const QueryUTXOsByAddressRequest = {
  typeUrl: '/side.btcbridge.QueryUTXOsByAddressRequest',
  encode(message: QueryUTXOsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== '') {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOsByAddressRequest>): QueryUTXOsByAddressRequest {
    const message = createBaseQueryUTXOsByAddressRequest();
    message.address = object.address ?? '';
    return message;
  },
  fromAmino(object: QueryUTXOsByAddressRequestAmino): QueryUTXOsByAddressRequest {
    const message = createBaseQueryUTXOsByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryUTXOsByAddressRequest): QueryUTXOsByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === '' ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsByAddressRequestAminoMsg): QueryUTXOsByAddressRequest {
    return QueryUTXOsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsByAddressRequestProtoMsg): QueryUTXOsByAddressRequest {
    return QueryUTXOsByAddressRequest.decode(message.value);
  },
  toProto(message: QueryUTXOsByAddressRequest): Uint8Array {
    return QueryUTXOsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsByAddressRequest): QueryUTXOsByAddressRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryUTXOsByAddressRequest',
      value: QueryUTXOsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsByAddressResponse(): QueryUTXOsByAddressResponse {
  return {
    utxos: []
  };
}
export const QueryUTXOsByAddressResponse = {
  typeUrl: '/side.btcbridge.QueryUTXOsByAddressResponse',
  encode(message: QueryUTXOsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOsByAddressResponse>): QueryUTXOsByAddressResponse {
    const message = createBaseQueryUTXOsByAddressResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUTXOsByAddressResponseAmino): QueryUTXOsByAddressResponse {
    const message = createBaseQueryUTXOsByAddressResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUTXOsByAddressResponse): QueryUTXOsByAddressResponseAmino {
    const obj: any = {};
    if (message.utxos) {
      obj.utxos = message.utxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.utxos = message.utxos;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsByAddressResponseAminoMsg): QueryUTXOsByAddressResponse {
    return QueryUTXOsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsByAddressResponseProtoMsg): QueryUTXOsByAddressResponse {
    return QueryUTXOsByAddressResponse.decode(message.value);
  },
  toProto(message: QueryUTXOsByAddressResponse): Uint8Array {
    return QueryUTXOsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsByAddressResponse): QueryUTXOsByAddressResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.QueryUTXOsByAddressResponse',
      value: QueryUTXOsByAddressResponse.encode(message).finish()
    };
  }
};