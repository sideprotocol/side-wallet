//@ts-nocheck
import { OraclePrice, OraclePriceAmino, OraclePriceSDKType, BlockHeader, BlockHeaderAmino, BlockHeaderSDKType } from "./oracle";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolRequest {
  symbol: string;
}
export interface QueryGetPriceBySymbolRequestProtoMsg {
  typeUrl: "/side.oracle.QueryGetPriceBySymbolRequest";
  value: Uint8Array;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolRequestAmino {
  symbol?: string;
}
export interface QueryGetPriceBySymbolRequestAminoMsg {
  type: "/side.oracle.QueryGetPriceBySymbolRequest";
  value: QueryGetPriceBySymbolRequestAmino;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolRequestSDKType {
  symbol: string;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolResponse {
  price: string;
}
export interface QueryGetPriceBySymbolResponseProtoMsg {
  typeUrl: "/side.oracle.QueryGetPriceBySymbolResponse";
  value: Uint8Array;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolResponseAmino {
  price?: string;
}
export interface QueryGetPriceBySymbolResponseAminoMsg {
  type: "/side.oracle.QueryGetPriceBySymbolResponse";
  value: QueryGetPriceBySymbolResponseAmino;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryGetPriceBySymbolResponseSDKType {
  price: string;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryListPricesRequest {}
export interface QueryListPricesRequestProtoMsg {
  typeUrl: "/side.oracle.QueryListPricesRequest";
  value: Uint8Array;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryListPricesRequestAmino {}
export interface QueryListPricesRequestAminoMsg {
  type: "/side.oracle.QueryListPricesRequest";
  value: QueryListPricesRequestAmino;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryListPricesRequestSDKType {}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryListPricesResponse {
  prices: OraclePrice[];
}
export interface QueryListPricesResponseProtoMsg {
  typeUrl: "/side.oracle.QueryListPricesResponse";
  value: Uint8Array;
}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryListPricesResponseAmino {
  prices?: OraclePriceAmino[];
}
export interface QueryListPricesResponseAminoMsg {
  type: "/side.oracle.QueryListPricesResponse";
  value: QueryListPricesResponseAmino;
}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryListPricesResponseSDKType {
  prices: OraclePriceSDKType[];
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.oracle.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.oracle.QueryParamsRequest";
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
  typeUrl: "/side.oracle.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.oracle.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequest {}
export interface QueryChainTipRequestProtoMsg {
  typeUrl: "/side.oracle.QueryChainTipRequest";
  value: Uint8Array;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequestAmino {}
export interface QueryChainTipRequestAminoMsg {
  type: "/side.oracle.QueryChainTipRequest";
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
  typeUrl: "/side.oracle.QueryChainTipResponse";
  value: Uint8Array;
}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponseAmino {
  hash?: string;
  height?: string;
}
export interface QueryChainTipResponseAminoMsg {
  type: "/side.oracle.QueryChainTipResponse";
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHeightRequest";
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequestAmino {
  height?: string;
}
export interface QueryBlockHeaderByHeightRequestAminoMsg {
  type: "/side.oracle.QueryBlockHeaderByHeightRequest";
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHeightResponse";
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHeightResponseAminoMsg {
  type: "/side.oracle.QueryBlockHeaderByHeightResponse";
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHashRequest";
  value: Uint8Array;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequestAmino {
  hash?: string;
}
export interface QueryBlockHeaderByHashRequestAminoMsg {
  type: "/side.oracle.QueryBlockHeaderByHashRequest";
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHashResponse";
  value: Uint8Array;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHashResponseAminoMsg {
  type: "/side.oracle.QueryBlockHeaderByHashResponse";
  value: QueryBlockHeaderByHashResponseAmino;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
/** QueryBestBlockHeaderRequest is the request type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderRequest {}
export interface QueryBestBlockHeaderRequestProtoMsg {
  typeUrl: "/side.oracle.QueryBestBlockHeaderRequest";
  value: Uint8Array;
}
/** QueryBestBlockHeaderRequest is the request type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderRequestAmino {}
export interface QueryBestBlockHeaderRequestAminoMsg {
  type: "/side.oracle.QueryBestBlockHeaderRequest";
  value: QueryBestBlockHeaderRequestAmino;
}
/** QueryBestBlockHeaderRequest is the request type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderRequestSDKType {}
/** QueryBestBlockHeaderResponse is the response type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderResponse {
  blockHeader?: BlockHeader;
}
export interface QueryBestBlockHeaderResponseProtoMsg {
  typeUrl: "/side.oracle.QueryBestBlockHeaderResponse";
  value: Uint8Array;
}
/** QueryBestBlockHeaderResponse is the response type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBestBlockHeaderResponseAminoMsg {
  type: "/side.oracle.QueryBestBlockHeaderResponse";
  value: QueryBestBlockHeaderResponseAmino;
}
/** QueryBestBlockHeaderResponse is the response type for the Query/BestBlockHeader RPC method. */
export interface QueryBestBlockHeaderResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
function createBaseQueryGetPriceBySymbolRequest(): QueryGetPriceBySymbolRequest {
  return {
    symbol: ""
  };
}
export const QueryGetPriceBySymbolRequest = {
  typeUrl: "/side.oracle.QueryGetPriceBySymbolRequest",
  encode(message: QueryGetPriceBySymbolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.symbol !== "") {
      writer.uint32(10).string(message.symbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetPriceBySymbolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPriceBySymbolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPriceBySymbolRequest>): QueryGetPriceBySymbolRequest {
    const message = createBaseQueryGetPriceBySymbolRequest();
    message.symbol = object.symbol ?? "";
    return message;
  },
  fromAmino(object: QueryGetPriceBySymbolRequestAmino): QueryGetPriceBySymbolRequest {
    const message = createBaseQueryGetPriceBySymbolRequest();
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    return message;
  },
  toAmino(message: QueryGetPriceBySymbolRequest): QueryGetPriceBySymbolRequestAmino {
    const obj: any = {};
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    return obj;
  },
  fromAminoMsg(object: QueryGetPriceBySymbolRequestAminoMsg): QueryGetPriceBySymbolRequest {
    return QueryGetPriceBySymbolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPriceBySymbolRequestProtoMsg): QueryGetPriceBySymbolRequest {
    return QueryGetPriceBySymbolRequest.decode(message.value);
  },
  toProto(message: QueryGetPriceBySymbolRequest): Uint8Array {
    return QueryGetPriceBySymbolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPriceBySymbolRequest): QueryGetPriceBySymbolRequestProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryGetPriceBySymbolRequest",
      value: QueryGetPriceBySymbolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetPriceBySymbolResponse(): QueryGetPriceBySymbolResponse {
  return {
    price: ""
  };
}
export const QueryGetPriceBySymbolResponse = {
  typeUrl: "/side.oracle.QueryGetPriceBySymbolResponse",
  encode(message: QueryGetPriceBySymbolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetPriceBySymbolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetPriceBySymbolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetPriceBySymbolResponse>): QueryGetPriceBySymbolResponse {
    const message = createBaseQueryGetPriceBySymbolResponse();
    message.price = object.price ?? "";
    return message;
  },
  fromAmino(object: QueryGetPriceBySymbolResponseAmino): QueryGetPriceBySymbolResponse {
    const message = createBaseQueryGetPriceBySymbolResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    return message;
  },
  toAmino(message: QueryGetPriceBySymbolResponse): QueryGetPriceBySymbolResponseAmino {
    const obj: any = {};
    obj.price = message.price === "" ? undefined : message.price;
    return obj;
  },
  fromAminoMsg(object: QueryGetPriceBySymbolResponseAminoMsg): QueryGetPriceBySymbolResponse {
    return QueryGetPriceBySymbolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryGetPriceBySymbolResponseProtoMsg): QueryGetPriceBySymbolResponse {
    return QueryGetPriceBySymbolResponse.decode(message.value);
  },
  toProto(message: QueryGetPriceBySymbolResponse): Uint8Array {
    return QueryGetPriceBySymbolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetPriceBySymbolResponse): QueryGetPriceBySymbolResponseProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryGetPriceBySymbolResponse",
      value: QueryGetPriceBySymbolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryListPricesRequest(): QueryListPricesRequest {
  return {};
}
export const QueryListPricesRequest = {
  typeUrl: "/side.oracle.QueryListPricesRequest",
  encode(_: QueryListPricesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListPricesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListPricesRequest();
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
  fromPartial(_: Partial<QueryListPricesRequest>): QueryListPricesRequest {
    const message = createBaseQueryListPricesRequest();
    return message;
  },
  fromAmino(_: QueryListPricesRequestAmino): QueryListPricesRequest {
    const message = createBaseQueryListPricesRequest();
    return message;
  },
  toAmino(_: QueryListPricesRequest): QueryListPricesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryListPricesRequestAminoMsg): QueryListPricesRequest {
    return QueryListPricesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListPricesRequestProtoMsg): QueryListPricesRequest {
    return QueryListPricesRequest.decode(message.value);
  },
  toProto(message: QueryListPricesRequest): Uint8Array {
    return QueryListPricesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryListPricesRequest): QueryListPricesRequestProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryListPricesRequest",
      value: QueryListPricesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryListPricesResponse(): QueryListPricesResponse {
  return {
    prices: []
  };
}
export const QueryListPricesResponse = {
  typeUrl: "/side.oracle.QueryListPricesResponse",
  encode(message: QueryListPricesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.prices) {
      OraclePrice.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryListPricesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListPricesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.prices.push(OraclePrice.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryListPricesResponse>): QueryListPricesResponse {
    const message = createBaseQueryListPricesResponse();
    message.prices = object.prices?.map(e => OraclePrice.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryListPricesResponseAmino): QueryListPricesResponse {
    const message = createBaseQueryListPricesResponse();
    message.prices = object.prices?.map(e => OraclePrice.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryListPricesResponse): QueryListPricesResponseAmino {
    const obj: any = {};
    if (message.prices) {
      obj.prices = message.prices.map(e => e ? OraclePrice.toAmino(e) : undefined);
    } else {
      obj.prices = message.prices;
    }
    return obj;
  },
  fromAminoMsg(object: QueryListPricesResponseAminoMsg): QueryListPricesResponse {
    return QueryListPricesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryListPricesResponseProtoMsg): QueryListPricesResponse {
    return QueryListPricesResponse.decode(message.value);
  },
  toProto(message: QueryListPricesResponse): Uint8Array {
    return QueryListPricesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryListPricesResponse): QueryListPricesResponseProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryListPricesResponse",
      value: QueryListPricesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.oracle.QueryParamsRequest",
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
      typeUrl: "/side.oracle.QueryParamsRequest",
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
  typeUrl: "/side.oracle.QueryParamsResponse",
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
      typeUrl: "/side.oracle.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipRequest(): QueryChainTipRequest {
  return {};
}
export const QueryChainTipRequest = {
  typeUrl: "/side.oracle.QueryChainTipRequest",
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
      typeUrl: "/side.oracle.QueryChainTipRequest",
      value: QueryChainTipRequest.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipResponse(): QueryChainTipResponse {
  return {
    hash: "",
    height: BigInt(0)
  };
}
export const QueryChainTipResponse = {
  typeUrl: "/side.oracle.QueryChainTipResponse",
  encode(message: QueryChainTipResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
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
    message.hash = object.hash ?? "";
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
    obj.hash = message.hash === "" ? undefined : message.hash;
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
      typeUrl: "/side.oracle.QueryChainTipResponse",
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHeightRequest",
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
      typeUrl: "/side.oracle.QueryBlockHeaderByHeightRequest",
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHeightResponse",
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
      typeUrl: "/side.oracle.QueryBlockHeaderByHeightResponse",
      value: QueryBlockHeaderByHeightResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHashRequest(): QueryBlockHeaderByHashRequest {
  return {
    hash: ""
  };
}
export const QueryBlockHeaderByHashRequest = {
  typeUrl: "/side.oracle.QueryBlockHeaderByHashRequest",
  encode(message: QueryBlockHeaderByHashRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
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
    message.hash = object.hash ?? "";
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
    obj.hash = message.hash === "" ? undefined : message.hash;
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
      typeUrl: "/side.oracle.QueryBlockHeaderByHashRequest",
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
  typeUrl: "/side.oracle.QueryBlockHeaderByHashResponse",
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
      typeUrl: "/side.oracle.QueryBlockHeaderByHashResponse",
      value: QueryBlockHeaderByHashResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBestBlockHeaderRequest(): QueryBestBlockHeaderRequest {
  return {};
}
export const QueryBestBlockHeaderRequest = {
  typeUrl: "/side.oracle.QueryBestBlockHeaderRequest",
  encode(_: QueryBestBlockHeaderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBestBlockHeaderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBestBlockHeaderRequest();
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
  fromPartial(_: Partial<QueryBestBlockHeaderRequest>): QueryBestBlockHeaderRequest {
    const message = createBaseQueryBestBlockHeaderRequest();
    return message;
  },
  fromAmino(_: QueryBestBlockHeaderRequestAmino): QueryBestBlockHeaderRequest {
    const message = createBaseQueryBestBlockHeaderRequest();
    return message;
  },
  toAmino(_: QueryBestBlockHeaderRequest): QueryBestBlockHeaderRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryBestBlockHeaderRequestAminoMsg): QueryBestBlockHeaderRequest {
    return QueryBestBlockHeaderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBestBlockHeaderRequestProtoMsg): QueryBestBlockHeaderRequest {
    return QueryBestBlockHeaderRequest.decode(message.value);
  },
  toProto(message: QueryBestBlockHeaderRequest): Uint8Array {
    return QueryBestBlockHeaderRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBestBlockHeaderRequest): QueryBestBlockHeaderRequestProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryBestBlockHeaderRequest",
      value: QueryBestBlockHeaderRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBestBlockHeaderResponse(): QueryBestBlockHeaderResponse {
  return {
    blockHeader: undefined
  };
}
export const QueryBestBlockHeaderResponse = {
  typeUrl: "/side.oracle.QueryBestBlockHeaderResponse",
  encode(message: QueryBestBlockHeaderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeader !== undefined) {
      BlockHeader.encode(message.blockHeader, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBestBlockHeaderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBestBlockHeaderResponse();
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
  fromPartial(object: Partial<QueryBestBlockHeaderResponse>): QueryBestBlockHeaderResponse {
    const message = createBaseQueryBestBlockHeaderResponse();
    message.blockHeader = object.blockHeader !== undefined && object.blockHeader !== null ? BlockHeader.fromPartial(object.blockHeader) : undefined;
    return message;
  },
  fromAmino(object: QueryBestBlockHeaderResponseAmino): QueryBestBlockHeaderResponse {
    const message = createBaseQueryBestBlockHeaderResponse();
    if (object.block_header !== undefined && object.block_header !== null) {
      message.blockHeader = BlockHeader.fromAmino(object.block_header);
    }
    return message;
  },
  toAmino(message: QueryBestBlockHeaderResponse): QueryBestBlockHeaderResponseAmino {
    const obj: any = {};
    obj.block_header = message.blockHeader ? BlockHeader.toAmino(message.blockHeader) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBestBlockHeaderResponseAminoMsg): QueryBestBlockHeaderResponse {
    return QueryBestBlockHeaderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBestBlockHeaderResponseProtoMsg): QueryBestBlockHeaderResponse {
    return QueryBestBlockHeaderResponse.decode(message.value);
  },
  toProto(message: QueryBestBlockHeaderResponse): Uint8Array {
    return QueryBestBlockHeaderResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBestBlockHeaderResponse): QueryBestBlockHeaderResponseProtoMsg {
    return {
      typeUrl: "/side.oracle.QueryBestBlockHeaderResponse",
      value: QueryBestBlockHeaderResponse.encode(message).finish()
    };
  }
};