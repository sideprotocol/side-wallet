//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { DLCOracleStatus, DCMStatus, DLCAttestation, DLCAttestationAmino, DLCAttestationSDKType, DCM, DCMAmino, DCMSDKType, DLCOracle, DLCOracleAmino, DLCOracleSDKType, DLCNonce, DLCNonceAmino, DLCNonceSDKType, DLCEvent, DLCEventAmino, DLCEventSDKType } from "./dlc";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface QueryAttestationRequest {
  id: bigint;
}
export interface QueryAttestationRequestProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationRequest";
  value: Uint8Array;
}
export interface QueryAttestationRequestAmino {
  id?: string;
}
export interface QueryAttestationRequestAminoMsg {
  type: "/side.dlc.QueryAttestationRequest";
  value: QueryAttestationRequestAmino;
}
export interface QueryAttestationRequestSDKType {
  id: bigint;
}
export interface QueryAttestationResponse {
  attestation?: DLCAttestation;
}
export interface QueryAttestationResponseProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationResponse";
  value: Uint8Array;
}
export interface QueryAttestationResponseAmino {
  attestation?: DLCAttestationAmino;
}
export interface QueryAttestationResponseAminoMsg {
  type: "/side.dlc.QueryAttestationResponse";
  value: QueryAttestationResponseAmino;
}
export interface QueryAttestationResponseSDKType {
  attestation?: DLCAttestationSDKType;
}
export interface QueryAttestationByEventRequest {
  eventId: bigint;
}
export interface QueryAttestationByEventRequestProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationByEventRequest";
  value: Uint8Array;
}
export interface QueryAttestationByEventRequestAmino {
  event_id?: string;
}
export interface QueryAttestationByEventRequestAminoMsg {
  type: "/side.dlc.QueryAttestationByEventRequest";
  value: QueryAttestationByEventRequestAmino;
}
export interface QueryAttestationByEventRequestSDKType {
  event_id: bigint;
}
export interface QueryAttestationByEventResponse {
  attestation?: DLCAttestation;
}
export interface QueryAttestationByEventResponseProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationByEventResponse";
  value: Uint8Array;
}
export interface QueryAttestationByEventResponseAmino {
  attestation?: DLCAttestationAmino;
}
export interface QueryAttestationByEventResponseAminoMsg {
  type: "/side.dlc.QueryAttestationByEventResponse";
  value: QueryAttestationByEventResponseAmino;
}
export interface QueryAttestationByEventResponseSDKType {
  attestation?: DLCAttestationSDKType;
}
export interface QueryAttestationsRequest {
  pagination?: PageRequest;
}
export interface QueryAttestationsRequestProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationsRequest";
  value: Uint8Array;
}
export interface QueryAttestationsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryAttestationsRequestAminoMsg {
  type: "/side.dlc.QueryAttestationsRequest";
  value: QueryAttestationsRequestAmino;
}
export interface QueryAttestationsRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryAttestationsResponse {
  attestations: DLCAttestation[];
  pagination?: PageResponse;
}
export interface QueryAttestationsResponseProtoMsg {
  typeUrl: "/side.dlc.QueryAttestationsResponse";
  value: Uint8Array;
}
export interface QueryAttestationsResponseAmino {
  attestations?: DLCAttestationAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryAttestationsResponseAminoMsg {
  type: "/side.dlc.QueryAttestationsResponse";
  value: QueryAttestationsResponseAmino;
}
export interface QueryAttestationsResponseSDKType {
  attestations: DLCAttestationSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryDCMsRequest {
  status: DCMStatus;
  pagination?: PageRequest;
}
export interface QueryDCMsRequestProtoMsg {
  typeUrl: "/side.dlc.QueryDCMsRequest";
  value: Uint8Array;
}
export interface QueryDCMsRequestAmino {
  status?: DCMStatus;
  pagination?: PageRequestAmino;
}
export interface QueryDCMsRequestAminoMsg {
  type: "/side.dlc.QueryDCMsRequest";
  value: QueryDCMsRequestAmino;
}
export interface QueryDCMsRequestSDKType {
  status: DCMStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryDCMsResponse {
  dcms: DCM[];
  pagination?: PageResponse;
}
export interface QueryDCMsResponseProtoMsg {
  typeUrl: "/side.dlc.QueryDCMsResponse";
  value: Uint8Array;
}
export interface QueryDCMsResponseAmino {
  dcms?: DCMAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryDCMsResponseAminoMsg {
  type: "/side.dlc.QueryDCMsResponse";
  value: QueryDCMsResponseAmino;
}
export interface QueryDCMsResponseSDKType {
  dcms: DCMSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryOraclesRequest {
  status: DLCOracleStatus;
  pagination?: PageRequest;
}
export interface QueryOraclesRequestProtoMsg {
  typeUrl: "/side.dlc.QueryOraclesRequest";
  value: Uint8Array;
}
export interface QueryOraclesRequestAmino {
  status?: DLCOracleStatus;
  pagination?: PageRequestAmino;
}
export interface QueryOraclesRequestAminoMsg {
  type: "/side.dlc.QueryOraclesRequest";
  value: QueryOraclesRequestAmino;
}
export interface QueryOraclesRequestSDKType {
  status: DLCOracleStatus;
  pagination?: PageRequestSDKType;
}
export interface QueryOraclesResponse {
  oracles: DLCOracle[];
  pagination?: PageResponse;
}
export interface QueryOraclesResponseProtoMsg {
  typeUrl: "/side.dlc.QueryOraclesResponse";
  value: Uint8Array;
}
export interface QueryOraclesResponseAmino {
  oracles?: DLCOracleAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryOraclesResponseAminoMsg {
  type: "/side.dlc.QueryOraclesResponse";
  value: QueryOraclesResponseAmino;
}
export interface QueryOraclesResponseSDKType {
  oracles: DLCOracleSDKType[];
  pagination?: PageResponseSDKType;
}
export interface QueryCountNoncesRequest {}
export interface QueryCountNoncesRequestProtoMsg {
  typeUrl: "/side.dlc.QueryCountNoncesRequest";
  value: Uint8Array;
}
export interface QueryCountNoncesRequestAmino {}
export interface QueryCountNoncesRequestAminoMsg {
  type: "/side.dlc.QueryCountNoncesRequest";
  value: QueryCountNoncesRequestAmino;
}
export interface QueryCountNoncesRequestSDKType {}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponse {
  /** qty of nonce in the cache queue */
  counts: number[];
}
export interface QueryCountNoncesResponseProtoMsg {
  typeUrl: "/side.dlc.QueryCountNoncesResponse";
  value: Uint8Array;
}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponseAmino {
  /** qty of nonce in the cache queue */
  counts?: number[];
}
export interface QueryCountNoncesResponseAminoMsg {
  type: "/side.dlc.QueryCountNoncesResponse";
  value: QueryCountNoncesResponseAmino;
}
/**
 * QueryCountNoncesResponse is response type for the Query/CountNonces RPC method.
 * counts should use the same order as recommended oracles in Params
 */
export interface QueryCountNoncesResponseSDKType {
  counts: number[];
}
export interface QueryNonceRequest {
  oracleId: bigint;
  index: bigint;
}
export interface QueryNonceRequestProtoMsg {
  typeUrl: "/side.dlc.QueryNonceRequest";
  value: Uint8Array;
}
export interface QueryNonceRequestAmino {
  oracle_id?: string;
  index?: string;
}
export interface QueryNonceRequestAminoMsg {
  type: "/side.dlc.QueryNonceRequest";
  value: QueryNonceRequestAmino;
}
export interface QueryNonceRequestSDKType {
  oracle_id: bigint;
  index: bigint;
}
export interface QueryNonceResponse {
  nonce?: DLCNonce;
}
export interface QueryNonceResponseProtoMsg {
  typeUrl: "/side.dlc.QueryNonceResponse";
  value: Uint8Array;
}
export interface QueryNonceResponseAmino {
  nonce?: DLCNonceAmino;
}
export interface QueryNonceResponseAminoMsg {
  type: "/side.dlc.QueryNonceResponse";
  value: QueryNonceResponseAmino;
}
export interface QueryNonceResponseSDKType {
  nonce?: DLCNonceSDKType;
}
export interface QueryNoncesRequest {
  oracleId: bigint;
  pagination?: PageRequest;
}
export interface QueryNoncesRequestProtoMsg {
  typeUrl: "/side.dlc.QueryNoncesRequest";
  value: Uint8Array;
}
export interface QueryNoncesRequestAmino {
  oracle_id?: string;
  pagination?: PageRequestAmino;
}
export interface QueryNoncesRequestAminoMsg {
  type: "/side.dlc.QueryNoncesRequest";
  value: QueryNoncesRequestAmino;
}
export interface QueryNoncesRequestSDKType {
  oracle_id: bigint;
  pagination?: PageRequestSDKType;
}
export interface QueryNoncesResponse {
  nonces: DLCNonce[];
  pagination?: PageResponse;
}
export interface QueryNoncesResponseProtoMsg {
  typeUrl: "/side.dlc.QueryNoncesResponse";
  value: Uint8Array;
}
export interface QueryNoncesResponseAmino {
  nonces?: DLCNonceAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryNoncesResponseAminoMsg {
  type: "/side.dlc.QueryNoncesResponse";
  value: QueryNoncesResponseAmino;
}
export interface QueryNoncesResponseSDKType {
  nonces: DLCNonceSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequest {
  id: bigint;
}
export interface QueryEventRequestProtoMsg {
  typeUrl: "/side.dlc.QueryEventRequest";
  value: Uint8Array;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequestAmino {
  id?: string;
}
export interface QueryEventRequestAminoMsg {
  type: "/side.dlc.QueryEventRequest";
  value: QueryEventRequestAmino;
}
/** QueryEventRequest is request type for the Query/Event RPC method. */
export interface QueryEventRequestSDKType {
  id: bigint;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponse {
  event?: DLCEvent;
}
export interface QueryEventResponseProtoMsg {
  typeUrl: "/side.dlc.QueryEventResponse";
  value: Uint8Array;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponseAmino {
  event?: DLCEventAmino;
}
export interface QueryEventResponseAminoMsg {
  type: "/side.dlc.QueryEventResponse";
  value: QueryEventResponseAmino;
}
/** QueryEventResponse is response type for the Query/Event RPC method. */
export interface QueryEventResponseSDKType {
  event?: DLCEventSDKType;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequest {
  triggered: boolean;
  pagination?: PageRequest;
}
export interface QueryEventsRequestProtoMsg {
  typeUrl: "/side.dlc.QueryEventsRequest";
  value: Uint8Array;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequestAmino {
  triggered?: boolean;
  pagination?: PageRequestAmino;
}
export interface QueryEventsRequestAminoMsg {
  type: "/side.dlc.QueryEventsRequest";
  value: QueryEventsRequestAmino;
}
/** QueryEventsRequest is request type for the Query/Events RPC method. */
export interface QueryEventsRequestSDKType {
  triggered: boolean;
  pagination?: PageRequestSDKType;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponse {
  events: DLCEvent[];
  pagination?: PageResponse;
}
export interface QueryEventsResponseProtoMsg {
  typeUrl: "/side.dlc.QueryEventsResponse";
  value: Uint8Array;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponseAmino {
  events?: DLCEventAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryEventsResponseAminoMsg {
  type: "/side.dlc.QueryEventsResponse";
  value: QueryEventsResponseAmino;
}
/** QueryEventsResponse is response type for the Query/Events RPC method. */
export interface QueryEventsResponseSDKType {
  events: DLCEventSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryPriceRequest is request type for the Query/Price RPC method. */
export interface QueryPriceRequest {
  symbol: string;
}
export interface QueryPriceRequestProtoMsg {
  typeUrl: "/side.dlc.QueryPriceRequest";
  value: Uint8Array;
}
/** QueryPriceRequest is request type for the Query/Price RPC method. */
export interface QueryPriceRequestAmino {
  symbol?: string;
}
export interface QueryPriceRequestAminoMsg {
  type: "/side.dlc.QueryPriceRequest";
  value: QueryPriceRequestAmino;
}
/** QueryPriceRequest is request type for the Query/Price RPC method. */
export interface QueryPriceRequestSDKType {
  symbol: string;
}
/** QueryPriceResponse is response type for the Query/Price RPC method. */
export interface QueryPriceResponse {
  price: bigint;
}
export interface QueryPriceResponseProtoMsg {
  typeUrl: "/side.dlc.QueryPriceResponse";
  value: Uint8Array;
}
/** QueryPriceResponse is response type for the Query/Price RPC method. */
export interface QueryPriceResponseAmino {
  price?: string;
}
export interface QueryPriceResponseAminoMsg {
  type: "/side.dlc.QueryPriceResponse";
  value: QueryPriceResponseAmino;
}
/** QueryPriceResponse is response type for the Query/Price RPC method. */
export interface QueryPriceResponseSDKType {
  price: bigint;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.dlc.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.dlc.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.dlc.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.dlc.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryAttestationRequest(): QueryAttestationRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryAttestationRequest = {
  typeUrl: "/side.dlc.QueryAttestationRequest",
  encode(message: QueryAttestationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationRequest();
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
  fromPartial(object: Partial<QueryAttestationRequest>): QueryAttestationRequest {
    const message = createBaseQueryAttestationRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAttestationRequestAmino): QueryAttestationRequest {
    const message = createBaseQueryAttestationRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryAttestationRequest): QueryAttestationRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationRequestAminoMsg): QueryAttestationRequest {
    return QueryAttestationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationRequestProtoMsg): QueryAttestationRequest {
    return QueryAttestationRequest.decode(message.value);
  },
  toProto(message: QueryAttestationRequest): Uint8Array {
    return QueryAttestationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationRequest): QueryAttestationRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationRequest",
      value: QueryAttestationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationResponse(): QueryAttestationResponse {
  return {
    attestation: undefined
  };
}
export const QueryAttestationResponse = {
  typeUrl: "/side.dlc.QueryAttestationResponse",
  encode(message: QueryAttestationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attestation !== undefined) {
      DLCAttestation.encode(message.attestation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestation = DLCAttestation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationResponse>): QueryAttestationResponse {
    const message = createBaseQueryAttestationResponse();
    message.attestation = object.attestation !== undefined && object.attestation !== null ? DLCAttestation.fromPartial(object.attestation) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationResponseAmino): QueryAttestationResponse {
    const message = createBaseQueryAttestationResponse();
    if (object.attestation !== undefined && object.attestation !== null) {
      message.attestation = DLCAttestation.fromAmino(object.attestation);
    }
    return message;
  },
  toAmino(message: QueryAttestationResponse): QueryAttestationResponseAmino {
    const obj: any = {};
    obj.attestation = message.attestation ? DLCAttestation.toAmino(message.attestation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationResponseAminoMsg): QueryAttestationResponse {
    return QueryAttestationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationResponseProtoMsg): QueryAttestationResponse {
    return QueryAttestationResponse.decode(message.value);
  },
  toProto(message: QueryAttestationResponse): Uint8Array {
    return QueryAttestationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationResponse): QueryAttestationResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationResponse",
      value: QueryAttestationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationByEventRequest(): QueryAttestationByEventRequest {
  return {
    eventId: BigInt(0)
  };
}
export const QueryAttestationByEventRequest = {
  typeUrl: "/side.dlc.QueryAttestationByEventRequest",
  encode(message: QueryAttestationByEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eventId !== BigInt(0)) {
      writer.uint32(8).uint64(message.eventId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationByEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationByEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationByEventRequest>): QueryAttestationByEventRequest {
    const message = createBaseQueryAttestationByEventRequest();
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryAttestationByEventRequestAmino): QueryAttestationByEventRequest {
    const message = createBaseQueryAttestationByEventRequest();
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    return message;
  },
  toAmino(message: QueryAttestationByEventRequest): QueryAttestationByEventRequestAmino {
    const obj: any = {};
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationByEventRequestAminoMsg): QueryAttestationByEventRequest {
    return QueryAttestationByEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationByEventRequestProtoMsg): QueryAttestationByEventRequest {
    return QueryAttestationByEventRequest.decode(message.value);
  },
  toProto(message: QueryAttestationByEventRequest): Uint8Array {
    return QueryAttestationByEventRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationByEventRequest): QueryAttestationByEventRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationByEventRequest",
      value: QueryAttestationByEventRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationByEventResponse(): QueryAttestationByEventResponse {
  return {
    attestation: undefined
  };
}
export const QueryAttestationByEventResponse = {
  typeUrl: "/side.dlc.QueryAttestationByEventResponse",
  encode(message: QueryAttestationByEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attestation !== undefined) {
      DLCAttestation.encode(message.attestation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationByEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationByEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestation = DLCAttestation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationByEventResponse>): QueryAttestationByEventResponse {
    const message = createBaseQueryAttestationByEventResponse();
    message.attestation = object.attestation !== undefined && object.attestation !== null ? DLCAttestation.fromPartial(object.attestation) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationByEventResponseAmino): QueryAttestationByEventResponse {
    const message = createBaseQueryAttestationByEventResponse();
    if (object.attestation !== undefined && object.attestation !== null) {
      message.attestation = DLCAttestation.fromAmino(object.attestation);
    }
    return message;
  },
  toAmino(message: QueryAttestationByEventResponse): QueryAttestationByEventResponseAmino {
    const obj: any = {};
    obj.attestation = message.attestation ? DLCAttestation.toAmino(message.attestation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationByEventResponseAminoMsg): QueryAttestationByEventResponse {
    return QueryAttestationByEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationByEventResponseProtoMsg): QueryAttestationByEventResponse {
    return QueryAttestationByEventResponse.decode(message.value);
  },
  toProto(message: QueryAttestationByEventResponse): Uint8Array {
    return QueryAttestationByEventResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationByEventResponse): QueryAttestationByEventResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationByEventResponse",
      value: QueryAttestationByEventResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationsRequest(): QueryAttestationsRequest {
  return {
    pagination: undefined
  };
}
export const QueryAttestationsRequest = {
  typeUrl: "/side.dlc.QueryAttestationsRequest",
  encode(message: QueryAttestationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAttestationsRequest>): QueryAttestationsRequest {
    const message = createBaseQueryAttestationsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationsRequestAmino): QueryAttestationsRequest {
    const message = createBaseQueryAttestationsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAttestationsRequest): QueryAttestationsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationsRequestAminoMsg): QueryAttestationsRequest {
    return QueryAttestationsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationsRequestProtoMsg): QueryAttestationsRequest {
    return QueryAttestationsRequest.decode(message.value);
  },
  toProto(message: QueryAttestationsRequest): Uint8Array {
    return QueryAttestationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationsRequest): QueryAttestationsRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationsRequest",
      value: QueryAttestationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAttestationsResponse(): QueryAttestationsResponse {
  return {
    attestations: [],
    pagination: undefined
  };
}
export const QueryAttestationsResponse = {
  typeUrl: "/side.dlc.QueryAttestationsResponse",
  encode(message: QueryAttestationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.attestations) {
      DLCAttestation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAttestationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAttestationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestations.push(DLCAttestation.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryAttestationsResponse>): QueryAttestationsResponse {
    const message = createBaseQueryAttestationsResponse();
    message.attestations = object.attestations?.map(e => DLCAttestation.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAttestationsResponseAmino): QueryAttestationsResponse {
    const message = createBaseQueryAttestationsResponse();
    message.attestations = object.attestations?.map(e => DLCAttestation.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAttestationsResponse): QueryAttestationsResponseAmino {
    const obj: any = {};
    if (message.attestations) {
      obj.attestations = message.attestations.map(e => e ? DLCAttestation.toAmino(e) : undefined);
    } else {
      obj.attestations = message.attestations;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAttestationsResponseAminoMsg): QueryAttestationsResponse {
    return QueryAttestationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAttestationsResponseProtoMsg): QueryAttestationsResponse {
    return QueryAttestationsResponse.decode(message.value);
  },
  toProto(message: QueryAttestationsResponse): Uint8Array {
    return QueryAttestationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAttestationsResponse): QueryAttestationsResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryAttestationsResponse",
      value: QueryAttestationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDCMsRequest(): QueryDCMsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryDCMsRequest = {
  typeUrl: "/side.dlc.QueryDCMsRequest",
  encode(message: QueryDCMsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMsRequest();
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
  fromPartial(object: Partial<QueryDCMsRequest>): QueryDCMsRequest {
    const message = createBaseQueryDCMsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDCMsRequestAmino): QueryDCMsRequest {
    const message = createBaseQueryDCMsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDCMsRequest): QueryDCMsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDCMsRequestAminoMsg): QueryDCMsRequest {
    return QueryDCMsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMsRequestProtoMsg): QueryDCMsRequest {
    return QueryDCMsRequest.decode(message.value);
  },
  toProto(message: QueryDCMsRequest): Uint8Array {
    return QueryDCMsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMsRequest): QueryDCMsRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryDCMsRequest",
      value: QueryDCMsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDCMsResponse(): QueryDCMsResponse {
  return {
    dcms: [],
    pagination: undefined
  };
}
export const QueryDCMsResponse = {
  typeUrl: "/side.dlc.QueryDCMsResponse",
  encode(message: QueryDCMsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.dcms) {
      DCM.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDCMsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDCMsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dcms.push(DCM.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryDCMsResponse>): QueryDCMsResponse {
    const message = createBaseQueryDCMsResponse();
    message.dcms = object.dcms?.map(e => DCM.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryDCMsResponseAmino): QueryDCMsResponse {
    const message = createBaseQueryDCMsResponse();
    message.dcms = object.dcms?.map(e => DCM.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryDCMsResponse): QueryDCMsResponseAmino {
    const obj: any = {};
    if (message.dcms) {
      obj.dcms = message.dcms.map(e => e ? DCM.toAmino(e) : undefined);
    } else {
      obj.dcms = message.dcms;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDCMsResponseAminoMsg): QueryDCMsResponse {
    return QueryDCMsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDCMsResponseProtoMsg): QueryDCMsResponse {
    return QueryDCMsResponse.decode(message.value);
  },
  toProto(message: QueryDCMsResponse): Uint8Array {
    return QueryDCMsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDCMsResponse): QueryDCMsResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryDCMsResponse",
      value: QueryDCMsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryOraclesRequest(): QueryOraclesRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryOraclesRequest = {
  typeUrl: "/side.dlc.QueryOraclesRequest",
  encode(message: QueryOraclesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOraclesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOraclesRequest();
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
  fromPartial(object: Partial<QueryOraclesRequest>): QueryOraclesRequest {
    const message = createBaseQueryOraclesRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOraclesRequestAmino): QueryOraclesRequest {
    const message = createBaseQueryOraclesRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOraclesRequest): QueryOraclesRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOraclesRequestAminoMsg): QueryOraclesRequest {
    return QueryOraclesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOraclesRequestProtoMsg): QueryOraclesRequest {
    return QueryOraclesRequest.decode(message.value);
  },
  toProto(message: QueryOraclesRequest): Uint8Array {
    return QueryOraclesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryOraclesRequest): QueryOraclesRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryOraclesRequest",
      value: QueryOraclesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryOraclesResponse(): QueryOraclesResponse {
  return {
    oracles: [],
    pagination: undefined
  };
}
export const QueryOraclesResponse = {
  typeUrl: "/side.dlc.QueryOraclesResponse",
  encode(message: QueryOraclesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.oracles) {
      DLCOracle.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryOraclesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOraclesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracles.push(DLCOracle.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryOraclesResponse>): QueryOraclesResponse {
    const message = createBaseQueryOraclesResponse();
    message.oracles = object.oracles?.map(e => DLCOracle.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryOraclesResponseAmino): QueryOraclesResponse {
    const message = createBaseQueryOraclesResponse();
    message.oracles = object.oracles?.map(e => DLCOracle.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryOraclesResponse): QueryOraclesResponseAmino {
    const obj: any = {};
    if (message.oracles) {
      obj.oracles = message.oracles.map(e => e ? DLCOracle.toAmino(e) : undefined);
    } else {
      obj.oracles = message.oracles;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryOraclesResponseAminoMsg): QueryOraclesResponse {
    return QueryOraclesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryOraclesResponseProtoMsg): QueryOraclesResponse {
    return QueryOraclesResponse.decode(message.value);
  },
  toProto(message: QueryOraclesResponse): Uint8Array {
    return QueryOraclesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryOraclesResponse): QueryOraclesResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryOraclesResponse",
      value: QueryOraclesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCountNoncesRequest(): QueryCountNoncesRequest {
  return {};
}
export const QueryCountNoncesRequest = {
  typeUrl: "/side.dlc.QueryCountNoncesRequest",
  encode(_: QueryCountNoncesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCountNoncesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCountNoncesRequest();
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
  fromPartial(_: Partial<QueryCountNoncesRequest>): QueryCountNoncesRequest {
    const message = createBaseQueryCountNoncesRequest();
    return message;
  },
  fromAmino(_: QueryCountNoncesRequestAmino): QueryCountNoncesRequest {
    const message = createBaseQueryCountNoncesRequest();
    return message;
  },
  toAmino(_: QueryCountNoncesRequest): QueryCountNoncesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryCountNoncesRequestAminoMsg): QueryCountNoncesRequest {
    return QueryCountNoncesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCountNoncesRequestProtoMsg): QueryCountNoncesRequest {
    return QueryCountNoncesRequest.decode(message.value);
  },
  toProto(message: QueryCountNoncesRequest): Uint8Array {
    return QueryCountNoncesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCountNoncesRequest): QueryCountNoncesRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryCountNoncesRequest",
      value: QueryCountNoncesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCountNoncesResponse(): QueryCountNoncesResponse {
  return {
    counts: []
  };
}
export const QueryCountNoncesResponse = {
  typeUrl: "/side.dlc.QueryCountNoncesResponse",
  encode(message: QueryCountNoncesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.counts) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCountNoncesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCountNoncesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.counts.push(reader.uint32());
            }
          } else {
            message.counts.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCountNoncesResponse>): QueryCountNoncesResponse {
    const message = createBaseQueryCountNoncesResponse();
    message.counts = object.counts?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryCountNoncesResponseAmino): QueryCountNoncesResponse {
    const message = createBaseQueryCountNoncesResponse();
    message.counts = object.counts?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryCountNoncesResponse): QueryCountNoncesResponseAmino {
    const obj: any = {};
    if (message.counts) {
      obj.counts = message.counts.map(e => e);
    } else {
      obj.counts = message.counts;
    }
    return obj;
  },
  fromAminoMsg(object: QueryCountNoncesResponseAminoMsg): QueryCountNoncesResponse {
    return QueryCountNoncesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCountNoncesResponseProtoMsg): QueryCountNoncesResponse {
    return QueryCountNoncesResponse.decode(message.value);
  },
  toProto(message: QueryCountNoncesResponse): Uint8Array {
    return QueryCountNoncesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCountNoncesResponse): QueryCountNoncesResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryCountNoncesResponse",
      value: QueryCountNoncesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryNonceRequest(): QueryNonceRequest {
  return {
    oracleId: BigInt(0),
    index: BigInt(0)
  };
}
export const QueryNonceRequest = {
  typeUrl: "/side.dlc.QueryNonceRequest",
  encode(message: QueryNonceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oracleId !== BigInt(0)) {
      writer.uint32(8).uint64(message.oracleId);
    }
    if (message.index !== BigInt(0)) {
      writer.uint32(16).uint64(message.index);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNonceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNonceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleId = reader.uint64();
          break;
        case 2:
          message.index = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNonceRequest>): QueryNonceRequest {
    const message = createBaseQueryNonceRequest();
    message.oracleId = object.oracleId !== undefined && object.oracleId !== null ? BigInt(object.oracleId.toString()) : BigInt(0);
    message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryNonceRequestAmino): QueryNonceRequest {
    const message = createBaseQueryNonceRequest();
    if (object.oracle_id !== undefined && object.oracle_id !== null) {
      message.oracleId = BigInt(object.oracle_id);
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = BigInt(object.index);
    }
    return message;
  },
  toAmino(message: QueryNonceRequest): QueryNonceRequestAmino {
    const obj: any = {};
    obj.oracle_id = message.oracleId !== BigInt(0) ? message.oracleId.toString() : undefined;
    obj.index = message.index !== BigInt(0) ? message.index.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNonceRequestAminoMsg): QueryNonceRequest {
    return QueryNonceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNonceRequestProtoMsg): QueryNonceRequest {
    return QueryNonceRequest.decode(message.value);
  },
  toProto(message: QueryNonceRequest): Uint8Array {
    return QueryNonceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNonceRequest): QueryNonceRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryNonceRequest",
      value: QueryNonceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNonceResponse(): QueryNonceResponse {
  return {
    nonce: undefined
  };
}
export const QueryNonceResponse = {
  typeUrl: "/side.dlc.QueryNonceResponse",
  encode(message: QueryNonceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonce !== undefined) {
      DLCNonce.encode(message.nonce, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNonceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNonceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonce = DLCNonce.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryNonceResponse>): QueryNonceResponse {
    const message = createBaseQueryNonceResponse();
    message.nonce = object.nonce !== undefined && object.nonce !== null ? DLCNonce.fromPartial(object.nonce) : undefined;
    return message;
  },
  fromAmino(object: QueryNonceResponseAmino): QueryNonceResponse {
    const message = createBaseQueryNonceResponse();
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = DLCNonce.fromAmino(object.nonce);
    }
    return message;
  },
  toAmino(message: QueryNonceResponse): QueryNonceResponseAmino {
    const obj: any = {};
    obj.nonce = message.nonce ? DLCNonce.toAmino(message.nonce) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNonceResponseAminoMsg): QueryNonceResponse {
    return QueryNonceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNonceResponseProtoMsg): QueryNonceResponse {
    return QueryNonceResponse.decode(message.value);
  },
  toProto(message: QueryNonceResponse): Uint8Array {
    return QueryNonceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNonceResponse): QueryNonceResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryNonceResponse",
      value: QueryNonceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryNoncesRequest(): QueryNoncesRequest {
  return {
    oracleId: BigInt(0),
    pagination: undefined
  };
}
export const QueryNoncesRequest = {
  typeUrl: "/side.dlc.QueryNoncesRequest",
  encode(message: QueryNoncesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.oracleId !== BigInt(0)) {
      writer.uint32(8).uint64(message.oracleId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNoncesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNoncesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.oracleId = reader.uint64();
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
  fromPartial(object: Partial<QueryNoncesRequest>): QueryNoncesRequest {
    const message = createBaseQueryNoncesRequest();
    message.oracleId = object.oracleId !== undefined && object.oracleId !== null ? BigInt(object.oracleId.toString()) : BigInt(0);
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryNoncesRequestAmino): QueryNoncesRequest {
    const message = createBaseQueryNoncesRequest();
    if (object.oracle_id !== undefined && object.oracle_id !== null) {
      message.oracleId = BigInt(object.oracle_id);
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryNoncesRequest): QueryNoncesRequestAmino {
    const obj: any = {};
    obj.oracle_id = message.oracleId !== BigInt(0) ? message.oracleId.toString() : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNoncesRequestAminoMsg): QueryNoncesRequest {
    return QueryNoncesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNoncesRequestProtoMsg): QueryNoncesRequest {
    return QueryNoncesRequest.decode(message.value);
  },
  toProto(message: QueryNoncesRequest): Uint8Array {
    return QueryNoncesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryNoncesRequest): QueryNoncesRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryNoncesRequest",
      value: QueryNoncesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryNoncesResponse(): QueryNoncesResponse {
  return {
    nonces: [],
    pagination: undefined
  };
}
export const QueryNoncesResponse = {
  typeUrl: "/side.dlc.QueryNoncesResponse",
  encode(message: QueryNoncesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.nonces) {
      DLCNonce.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryNoncesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNoncesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nonces.push(DLCNonce.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryNoncesResponse>): QueryNoncesResponse {
    const message = createBaseQueryNoncesResponse();
    message.nonces = object.nonces?.map(e => DLCNonce.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryNoncesResponseAmino): QueryNoncesResponse {
    const message = createBaseQueryNoncesResponse();
    message.nonces = object.nonces?.map(e => DLCNonce.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryNoncesResponse): QueryNoncesResponseAmino {
    const obj: any = {};
    if (message.nonces) {
      obj.nonces = message.nonces.map(e => e ? DLCNonce.toAmino(e) : undefined);
    } else {
      obj.nonces = message.nonces;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryNoncesResponseAminoMsg): QueryNoncesResponse {
    return QueryNoncesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryNoncesResponseProtoMsg): QueryNoncesResponse {
    return QueryNoncesResponse.decode(message.value);
  },
  toProto(message: QueryNoncesResponse): Uint8Array {
    return QueryNoncesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryNoncesResponse): QueryNoncesResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryNoncesResponse",
      value: QueryNoncesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEventRequest(): QueryEventRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryEventRequest = {
  typeUrl: "/side.dlc.QueryEventRequest",
  encode(message: QueryEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventRequest();
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
  fromPartial(object: Partial<QueryEventRequest>): QueryEventRequest {
    const message = createBaseQueryEventRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryEventRequestAmino): QueryEventRequest {
    const message = createBaseQueryEventRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryEventRequest): QueryEventRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventRequestAminoMsg): QueryEventRequest {
    return QueryEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventRequestProtoMsg): QueryEventRequest {
    return QueryEventRequest.decode(message.value);
  },
  toProto(message: QueryEventRequest): Uint8Array {
    return QueryEventRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEventRequest): QueryEventRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryEventRequest",
      value: QueryEventRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEventResponse(): QueryEventResponse {
  return {
    event: undefined
  };
}
export const QueryEventResponse = {
  typeUrl: "/side.dlc.QueryEventResponse",
  encode(message: QueryEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.event !== undefined) {
      DLCEvent.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = DLCEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEventResponse>): QueryEventResponse {
    const message = createBaseQueryEventResponse();
    message.event = object.event !== undefined && object.event !== null ? DLCEvent.fromPartial(object.event) : undefined;
    return message;
  },
  fromAmino(object: QueryEventResponseAmino): QueryEventResponse {
    const message = createBaseQueryEventResponse();
    if (object.event !== undefined && object.event !== null) {
      message.event = DLCEvent.fromAmino(object.event);
    }
    return message;
  },
  toAmino(message: QueryEventResponse): QueryEventResponseAmino {
    const obj: any = {};
    obj.event = message.event ? DLCEvent.toAmino(message.event) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventResponseAminoMsg): QueryEventResponse {
    return QueryEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventResponseProtoMsg): QueryEventResponse {
    return QueryEventResponse.decode(message.value);
  },
  toProto(message: QueryEventResponse): Uint8Array {
    return QueryEventResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEventResponse): QueryEventResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryEventResponse",
      value: QueryEventResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEventsRequest(): QueryEventsRequest {
  return {
    triggered: false,
    pagination: undefined
  };
}
export const QueryEventsRequest = {
  typeUrl: "/side.dlc.QueryEventsRequest",
  encode(message: QueryEventsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.triggered === true) {
      writer.uint32(8).bool(message.triggered);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.triggered = reader.bool();
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
  fromPartial(object: Partial<QueryEventsRequest>): QueryEventsRequest {
    const message = createBaseQueryEventsRequest();
    message.triggered = object.triggered ?? false;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEventsRequestAmino): QueryEventsRequest {
    const message = createBaseQueryEventsRequest();
    if (object.triggered !== undefined && object.triggered !== null) {
      message.triggered = object.triggered;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEventsRequest): QueryEventsRequestAmino {
    const obj: any = {};
    obj.triggered = message.triggered === false ? undefined : message.triggered;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventsRequestAminoMsg): QueryEventsRequest {
    return QueryEventsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventsRequestProtoMsg): QueryEventsRequest {
    return QueryEventsRequest.decode(message.value);
  },
  toProto(message: QueryEventsRequest): Uint8Array {
    return QueryEventsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEventsRequest): QueryEventsRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryEventsRequest",
      value: QueryEventsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEventsResponse(): QueryEventsResponse {
  return {
    events: [],
    pagination: undefined
  };
}
export const QueryEventsResponse = {
  typeUrl: "/side.dlc.QueryEventsResponse",
  encode(message: QueryEventsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.events) {
      DLCEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryEventsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(DLCEvent.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryEventsResponse>): QueryEventsResponse {
    const message = createBaseQueryEventsResponse();
    message.events = object.events?.map(e => DLCEvent.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEventsResponseAmino): QueryEventsResponse {
    const message = createBaseQueryEventsResponse();
    message.events = object.events?.map(e => DLCEvent.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEventsResponse): QueryEventsResponseAmino {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map(e => e ? DLCEvent.toAmino(e) : undefined);
    } else {
      obj.events = message.events;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEventsResponseAminoMsg): QueryEventsResponse {
    return QueryEventsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEventsResponseProtoMsg): QueryEventsResponse {
    return QueryEventsResponse.decode(message.value);
  },
  toProto(message: QueryEventsResponse): Uint8Array {
    return QueryEventsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEventsResponse): QueryEventsResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryEventsResponse",
      value: QueryEventsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPriceRequest(): QueryPriceRequest {
  return {
    symbol: ""
  };
}
export const QueryPriceRequest = {
  typeUrl: "/side.dlc.QueryPriceRequest",
  encode(message: QueryPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.symbol !== "") {
      writer.uint32(10).string(message.symbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPriceRequest();
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
  fromPartial(object: Partial<QueryPriceRequest>): QueryPriceRequest {
    const message = createBaseQueryPriceRequest();
    message.symbol = object.symbol ?? "";
    return message;
  },
  fromAmino(object: QueryPriceRequestAmino): QueryPriceRequest {
    const message = createBaseQueryPriceRequest();
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    return message;
  },
  toAmino(message: QueryPriceRequest): QueryPriceRequestAmino {
    const obj: any = {};
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    return obj;
  },
  fromAminoMsg(object: QueryPriceRequestAminoMsg): QueryPriceRequest {
    return QueryPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPriceRequestProtoMsg): QueryPriceRequest {
    return QueryPriceRequest.decode(message.value);
  },
  toProto(message: QueryPriceRequest): Uint8Array {
    return QueryPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPriceRequest): QueryPriceRequestProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryPriceRequest",
      value: QueryPriceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPriceResponse(): QueryPriceResponse {
  return {
    price: BigInt(0)
  };
}
export const QueryPriceResponse = {
  typeUrl: "/side.dlc.QueryPriceResponse",
  encode(message: QueryPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== BigInt(0)) {
      writer.uint32(8).uint64(message.price);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPriceResponse>): QueryPriceResponse {
    const message = createBaseQueryPriceResponse();
    message.price = object.price !== undefined && object.price !== null ? BigInt(object.price.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryPriceResponseAmino): QueryPriceResponse {
    const message = createBaseQueryPriceResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = BigInt(object.price);
    }
    return message;
  },
  toAmino(message: QueryPriceResponse): QueryPriceResponseAmino {
    const obj: any = {};
    obj.price = message.price !== BigInt(0) ? message.price.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPriceResponseAminoMsg): QueryPriceResponse {
    return QueryPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPriceResponseProtoMsg): QueryPriceResponse {
    return QueryPriceResponse.decode(message.value);
  },
  toProto(message: QueryPriceResponse): Uint8Array {
    return QueryPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPriceResponse): QueryPriceResponseProtoMsg {
    return {
      typeUrl: "/side.dlc.QueryPriceResponse",
      value: QueryPriceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.dlc.QueryParamsRequest",
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
      typeUrl: "/side.dlc.QueryParamsRequest",
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
  typeUrl: "/side.dlc.QueryParamsResponse",
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
      typeUrl: "/side.dlc.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};