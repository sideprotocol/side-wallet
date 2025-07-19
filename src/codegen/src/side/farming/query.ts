//@ts-nocheck
import { StakingStatus, Staking, StakingAmino, StakingSDKType, TotalStaking, TotalStakingAmino, TotalStakingSDKType, Epoch, EpochAmino, EpochSDKType, AccountRewardPerEpoch, AccountRewardPerEpochAmino, AccountRewardPerEpochSDKType } from "./farming";
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryStakingRequest is request type for the Query/Staking RPC method. */
export interface QueryStakingRequest {
  id: bigint;
}
export interface QueryStakingRequestProtoMsg {
  typeUrl: "/side.farming.QueryStakingRequest";
  value: Uint8Array;
}
/** QueryStakingRequest is request type for the Query/Staking RPC method. */
export interface QueryStakingRequestAmino {
  id?: string;
}
export interface QueryStakingRequestAminoMsg {
  type: "/side.farming.QueryStakingRequest";
  value: QueryStakingRequestAmino;
}
/** QueryStakingRequest is request type for the Query/Staking RPC method. */
export interface QueryStakingRequestSDKType {
  id: bigint;
}
/** QueryStakingResponse is response type for the Query/Staking RPC method. */
export interface QueryStakingResponse {
  staking?: Staking;
}
export interface QueryStakingResponseProtoMsg {
  typeUrl: "/side.farming.QueryStakingResponse";
  value: Uint8Array;
}
/** QueryStakingResponse is response type for the Query/Staking RPC method. */
export interface QueryStakingResponseAmino {
  staking?: StakingAmino;
}
export interface QueryStakingResponseAminoMsg {
  type: "/side.farming.QueryStakingResponse";
  value: QueryStakingResponseAmino;
}
/** QueryStakingResponse is response type for the Query/Staking RPC method. */
export interface QueryStakingResponseSDKType {
  staking?: StakingSDKType;
}
/** QueryStakingsRequest is request type for the Query/Stakings RPC method. */
export interface QueryStakingsRequest {
  status: StakingStatus;
  pagination?: PageRequest;
}
export interface QueryStakingsRequestProtoMsg {
  typeUrl: "/side.farming.QueryStakingsRequest";
  value: Uint8Array;
}
/** QueryStakingsRequest is request type for the Query/Stakings RPC method. */
export interface QueryStakingsRequestAmino {
  status?: StakingStatus;
  pagination?: PageRequestAmino;
}
export interface QueryStakingsRequestAminoMsg {
  type: "/side.farming.QueryStakingsRequest";
  value: QueryStakingsRequestAmino;
}
/** QueryStakingsRequest is request type for the Query/Stakings RPC method. */
export interface QueryStakingsRequestSDKType {
  status: StakingStatus;
  pagination?: PageRequestSDKType;
}
/** QueryStakingsResponse is response type for the Query/Stakings RPC method. */
export interface QueryStakingsResponse {
  stakings: Staking[];
  pagination?: PageResponse;
}
export interface QueryStakingsResponseProtoMsg {
  typeUrl: "/side.farming.QueryStakingsResponse";
  value: Uint8Array;
}
/** QueryStakingsResponse is response type for the Query/Stakings RPC method. */
export interface QueryStakingsResponseAmino {
  stakings?: StakingAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryStakingsResponseAminoMsg {
  type: "/side.farming.QueryStakingsResponse";
  value: QueryStakingsResponseAmino;
}
/** QueryStakingsResponse is response type for the Query/Stakings RPC method. */
export interface QueryStakingsResponseSDKType {
  stakings: StakingSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryStakingsByAddressRequest is request type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressRequest {
  address: string;
  status: StakingStatus;
  pagination?: PageRequest;
}
export interface QueryStakingsByAddressRequestProtoMsg {
  typeUrl: "/side.farming.QueryStakingsByAddressRequest";
  value: Uint8Array;
}
/** QueryStakingsByAddressRequest is request type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressRequestAmino {
  address?: string;
  status?: StakingStatus;
  pagination?: PageRequestAmino;
}
export interface QueryStakingsByAddressRequestAminoMsg {
  type: "/side.farming.QueryStakingsByAddressRequest";
  value: QueryStakingsByAddressRequestAmino;
}
/** QueryStakingsByAddressRequest is request type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressRequestSDKType {
  address: string;
  status: StakingStatus;
  pagination?: PageRequestSDKType;
}
/** QueryStakingsByAddressResponse is response type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressResponse {
  stakings: Staking[];
  pagination?: PageResponse;
}
export interface QueryStakingsByAddressResponseProtoMsg {
  typeUrl: "/side.farming.QueryStakingsByAddressResponse";
  value: Uint8Array;
}
/** QueryStakingsByAddressResponse is response type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressResponseAmino {
  stakings?: StakingAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryStakingsByAddressResponseAminoMsg {
  type: "/side.farming.QueryStakingsByAddressResponse";
  value: QueryStakingsByAddressResponseAmino;
}
/** QueryStakingsByAddressResponse is response type for the Query/StakingsByAddress RPC method. */
export interface QueryStakingsByAddressResponseSDKType {
  stakings: StakingSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryTotalStakingRequest is request type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingRequest {
  denom: string;
}
export interface QueryTotalStakingRequestProtoMsg {
  typeUrl: "/side.farming.QueryTotalStakingRequest";
  value: Uint8Array;
}
/** QueryTotalStakingRequest is request type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingRequestAmino {
  denom?: string;
}
export interface QueryTotalStakingRequestAminoMsg {
  type: "/side.farming.QueryTotalStakingRequest";
  value: QueryTotalStakingRequestAmino;
}
/** QueryTotalStakingRequest is request type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingRequestSDKType {
  denom: string;
}
/** QueryTotalStakingResponse is response type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingResponse {
  totalStaking?: TotalStaking;
}
export interface QueryTotalStakingResponseProtoMsg {
  typeUrl: "/side.farming.QueryTotalStakingResponse";
  value: Uint8Array;
}
/** QueryTotalStakingResponse is response type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingResponseAmino {
  total_staking?: TotalStakingAmino;
}
export interface QueryTotalStakingResponseAminoMsg {
  type: "/side.farming.QueryTotalStakingResponse";
  value: QueryTotalStakingResponseAmino;
}
/** QueryTotalStakingResponse is response type for the Query/TotalStaking RPC method. */
export interface QueryTotalStakingResponseSDKType {
  total_staking?: TotalStakingSDKType;
}
/** QueryCurrentEpochRequest is request type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochRequest {}
export interface QueryCurrentEpochRequestProtoMsg {
  typeUrl: "/side.farming.QueryCurrentEpochRequest";
  value: Uint8Array;
}
/** QueryCurrentEpochRequest is request type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochRequestAmino {}
export interface QueryCurrentEpochRequestAminoMsg {
  type: "/side.farming.QueryCurrentEpochRequest";
  value: QueryCurrentEpochRequestAmino;
}
/** QueryCurrentEpochRequest is request type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochRequestSDKType {}
/** QueryCurrentEpochResponse is response type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochResponse {
  currentEpoch?: Epoch;
}
export interface QueryCurrentEpochResponseProtoMsg {
  typeUrl: "/side.farming.QueryCurrentEpochResponse";
  value: Uint8Array;
}
/** QueryCurrentEpochResponse is response type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochResponseAmino {
  current_epoch?: EpochAmino;
}
export interface QueryCurrentEpochResponseAminoMsg {
  type: "/side.farming.QueryCurrentEpochResponse";
  value: QueryCurrentEpochResponseAmino;
}
/** QueryCurrentEpochResponse is response type for the Query/CurrentEpoch RPC method. */
export interface QueryCurrentEpochResponseSDKType {
  current_epoch?: EpochSDKType;
}
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequest {
  address: string;
}
export interface QueryRewardsRequestProtoMsg {
  typeUrl: "/side.farming.QueryRewardsRequest";
  value: Uint8Array;
}
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequestAmino {
  address?: string;
}
export interface QueryRewardsRequestAminoMsg {
  type: "/side.farming.QueryRewardsRequest";
  value: QueryRewardsRequestAmino;
}
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequestSDKType {
  address: string;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponse {
  pendingRewards: string;
  totalRewards: string;
}
export interface QueryRewardsResponseProtoMsg {
  typeUrl: "/side.farming.QueryRewardsResponse";
  value: Uint8Array;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponseAmino {
  pending_rewards?: string;
  total_rewards?: string;
}
export interface QueryRewardsResponseAminoMsg {
  type: "/side.farming.QueryRewardsResponse";
  value: QueryRewardsResponseAmino;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponseSDKType {
  pending_rewards: string;
  total_rewards: string;
}
/** QueryPendingRewardRequest is request type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardRequest {
  id: bigint;
}
export interface QueryPendingRewardRequestProtoMsg {
  typeUrl: "/side.farming.QueryPendingRewardRequest";
  value: Uint8Array;
}
/** QueryPendingRewardRequest is request type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardRequestAmino {
  id?: string;
}
export interface QueryPendingRewardRequestAminoMsg {
  type: "/side.farming.QueryPendingRewardRequest";
  value: QueryPendingRewardRequestAmino;
}
/** QueryPendingRewardRequest is request type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardRequestSDKType {
  id: bigint;
}
/** QueryPendingRewardResponse is response type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardResponse {
  pendingReward: string;
}
export interface QueryPendingRewardResponseProtoMsg {
  typeUrl: "/side.farming.QueryPendingRewardResponse";
  value: Uint8Array;
}
/** QueryPendingRewardResponse is response type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardResponseAmino {
  pending_reward?: string;
}
export interface QueryPendingRewardResponseAminoMsg {
  type: "/side.farming.QueryPendingRewardResponse";
  value: QueryPendingRewardResponseAmino;
}
/** QueryPendingRewardResponse is response type for the Query/PendingReward RPC method. */
export interface QueryPendingRewardResponseSDKType {
  pending_reward: string;
}
/** QueryPendingRewardByAddressRequest is request type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressRequest {
  address: string;
}
export interface QueryPendingRewardByAddressRequestProtoMsg {
  typeUrl: "/side.farming.QueryPendingRewardByAddressRequest";
  value: Uint8Array;
}
/** QueryPendingRewardByAddressRequest is request type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressRequestAmino {
  address?: string;
}
export interface QueryPendingRewardByAddressRequestAminoMsg {
  type: "/side.farming.QueryPendingRewardByAddressRequest";
  value: QueryPendingRewardByAddressRequestAmino;
}
/** QueryPendingRewardByAddressRequest is request type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressRequestSDKType {
  address: string;
}
/** QueryPendingRewardByAddressResponse is response type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressResponse {
  pendingReward?: AccountRewardPerEpoch;
}
export interface QueryPendingRewardByAddressResponseProtoMsg {
  typeUrl: "/side.farming.QueryPendingRewardByAddressResponse";
  value: Uint8Array;
}
/** QueryPendingRewardByAddressResponse is response type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressResponseAmino {
  pending_reward?: AccountRewardPerEpochAmino;
}
export interface QueryPendingRewardByAddressResponseAminoMsg {
  type: "/side.farming.QueryPendingRewardByAddressResponse";
  value: QueryPendingRewardByAddressResponseAmino;
}
/** QueryPendingRewardByAddressResponse is response type for the Query/PendingRewardByAddress RPC method. */
export interface QueryPendingRewardByAddressResponseSDKType {
  pending_reward?: AccountRewardPerEpochSDKType;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.farming.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.farming.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.farming.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.farming.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryStakingRequest(): QueryStakingRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryStakingRequest = {
  typeUrl: "/side.farming.QueryStakingRequest",
  encode(message: QueryStakingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingRequest();
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
  fromPartial(object: Partial<QueryStakingRequest>): QueryStakingRequest {
    const message = createBaseQueryStakingRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryStakingRequestAmino): QueryStakingRequest {
    const message = createBaseQueryStakingRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryStakingRequest): QueryStakingRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingRequestAminoMsg): QueryStakingRequest {
    return QueryStakingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingRequestProtoMsg): QueryStakingRequest {
    return QueryStakingRequest.decode(message.value);
  },
  toProto(message: QueryStakingRequest): Uint8Array {
    return QueryStakingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingRequest): QueryStakingRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingRequest",
      value: QueryStakingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStakingResponse(): QueryStakingResponse {
  return {
    staking: undefined
  };
}
export const QueryStakingResponse = {
  typeUrl: "/side.farming.QueryStakingResponse",
  encode(message: QueryStakingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.staking !== undefined) {
      Staking.encode(message.staking, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staking = Staking.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryStakingResponse>): QueryStakingResponse {
    const message = createBaseQueryStakingResponse();
    message.staking = object.staking !== undefined && object.staking !== null ? Staking.fromPartial(object.staking) : undefined;
    return message;
  },
  fromAmino(object: QueryStakingResponseAmino): QueryStakingResponse {
    const message = createBaseQueryStakingResponse();
    if (object.staking !== undefined && object.staking !== null) {
      message.staking = Staking.fromAmino(object.staking);
    }
    return message;
  },
  toAmino(message: QueryStakingResponse): QueryStakingResponseAmino {
    const obj: any = {};
    obj.staking = message.staking ? Staking.toAmino(message.staking) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingResponseAminoMsg): QueryStakingResponse {
    return QueryStakingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingResponseProtoMsg): QueryStakingResponse {
    return QueryStakingResponse.decode(message.value);
  },
  toProto(message: QueryStakingResponse): Uint8Array {
    return QueryStakingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingResponse): QueryStakingResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingResponse",
      value: QueryStakingResponse.encode(message).finish()
    };
  }
};
function createBaseQueryStakingsRequest(): QueryStakingsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryStakingsRequest = {
  typeUrl: "/side.farming.QueryStakingsRequest",
  encode(message: QueryStakingsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingsRequest();
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
  fromPartial(object: Partial<QueryStakingsRequest>): QueryStakingsRequest {
    const message = createBaseQueryStakingsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryStakingsRequestAmino): QueryStakingsRequest {
    const message = createBaseQueryStakingsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryStakingsRequest): QueryStakingsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingsRequestAminoMsg): QueryStakingsRequest {
    return QueryStakingsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingsRequestProtoMsg): QueryStakingsRequest {
    return QueryStakingsRequest.decode(message.value);
  },
  toProto(message: QueryStakingsRequest): Uint8Array {
    return QueryStakingsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingsRequest): QueryStakingsRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingsRequest",
      value: QueryStakingsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStakingsResponse(): QueryStakingsResponse {
  return {
    stakings: [],
    pagination: undefined
  };
}
export const QueryStakingsResponse = {
  typeUrl: "/side.farming.QueryStakingsResponse",
  encode(message: QueryStakingsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.stakings) {
      Staking.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakings.push(Staking.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryStakingsResponse>): QueryStakingsResponse {
    const message = createBaseQueryStakingsResponse();
    message.stakings = object.stakings?.map(e => Staking.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryStakingsResponseAmino): QueryStakingsResponse {
    const message = createBaseQueryStakingsResponse();
    message.stakings = object.stakings?.map(e => Staking.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryStakingsResponse): QueryStakingsResponseAmino {
    const obj: any = {};
    if (message.stakings) {
      obj.stakings = message.stakings.map(e => e ? Staking.toAmino(e) : undefined);
    } else {
      obj.stakings = message.stakings;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingsResponseAminoMsg): QueryStakingsResponse {
    return QueryStakingsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingsResponseProtoMsg): QueryStakingsResponse {
    return QueryStakingsResponse.decode(message.value);
  },
  toProto(message: QueryStakingsResponse): Uint8Array {
    return QueryStakingsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingsResponse): QueryStakingsResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingsResponse",
      value: QueryStakingsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryStakingsByAddressRequest(): QueryStakingsByAddressRequest {
  return {
    address: "",
    status: 0,
    pagination: undefined
  };
}
export const QueryStakingsByAddressRequest = {
  typeUrl: "/side.farming.QueryStakingsByAddressRequest",
  encode(message: QueryStakingsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingsByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QueryStakingsByAddressRequest>): QueryStakingsByAddressRequest {
    const message = createBaseQueryStakingsByAddressRequest();
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryStakingsByAddressRequestAmino): QueryStakingsByAddressRequest {
    const message = createBaseQueryStakingsByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryStakingsByAddressRequest): QueryStakingsByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingsByAddressRequestAminoMsg): QueryStakingsByAddressRequest {
    return QueryStakingsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingsByAddressRequestProtoMsg): QueryStakingsByAddressRequest {
    return QueryStakingsByAddressRequest.decode(message.value);
  },
  toProto(message: QueryStakingsByAddressRequest): Uint8Array {
    return QueryStakingsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingsByAddressRequest): QueryStakingsByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingsByAddressRequest",
      value: QueryStakingsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStakingsByAddressResponse(): QueryStakingsByAddressResponse {
  return {
    stakings: [],
    pagination: undefined
  };
}
export const QueryStakingsByAddressResponse = {
  typeUrl: "/side.farming.QueryStakingsByAddressResponse",
  encode(message: QueryStakingsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.stakings) {
      Staking.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryStakingsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakingsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakings.push(Staking.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryStakingsByAddressResponse>): QueryStakingsByAddressResponse {
    const message = createBaseQueryStakingsByAddressResponse();
    message.stakings = object.stakings?.map(e => Staking.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryStakingsByAddressResponseAmino): QueryStakingsByAddressResponse {
    const message = createBaseQueryStakingsByAddressResponse();
    message.stakings = object.stakings?.map(e => Staking.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryStakingsByAddressResponse): QueryStakingsByAddressResponseAmino {
    const obj: any = {};
    if (message.stakings) {
      obj.stakings = message.stakings.map(e => e ? Staking.toAmino(e) : undefined);
    } else {
      obj.stakings = message.stakings;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStakingsByAddressResponseAminoMsg): QueryStakingsByAddressResponse {
    return QueryStakingsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStakingsByAddressResponseProtoMsg): QueryStakingsByAddressResponse {
    return QueryStakingsByAddressResponse.decode(message.value);
  },
  toProto(message: QueryStakingsByAddressResponse): Uint8Array {
    return QueryStakingsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStakingsByAddressResponse): QueryStakingsByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryStakingsByAddressResponse",
      value: QueryStakingsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTotalStakingRequest(): QueryTotalStakingRequest {
  return {
    denom: ""
  };
}
export const QueryTotalStakingRequest = {
  typeUrl: "/side.farming.QueryTotalStakingRequest",
  encode(message: QueryTotalStakingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTotalStakingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalStakingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalStakingRequest>): QueryTotalStakingRequest {
    const message = createBaseQueryTotalStakingRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryTotalStakingRequestAmino): QueryTotalStakingRequest {
    const message = createBaseQueryTotalStakingRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryTotalStakingRequest): QueryTotalStakingRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryTotalStakingRequestAminoMsg): QueryTotalStakingRequest {
    return QueryTotalStakingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTotalStakingRequestProtoMsg): QueryTotalStakingRequest {
    return QueryTotalStakingRequest.decode(message.value);
  },
  toProto(message: QueryTotalStakingRequest): Uint8Array {
    return QueryTotalStakingRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalStakingRequest): QueryTotalStakingRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryTotalStakingRequest",
      value: QueryTotalStakingRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTotalStakingResponse(): QueryTotalStakingResponse {
  return {
    totalStaking: undefined
  };
}
export const QueryTotalStakingResponse = {
  typeUrl: "/side.farming.QueryTotalStakingResponse",
  encode(message: QueryTotalStakingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalStaking !== undefined) {
      TotalStaking.encode(message.totalStaking, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryTotalStakingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalStakingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalStaking = TotalStaking.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalStakingResponse>): QueryTotalStakingResponse {
    const message = createBaseQueryTotalStakingResponse();
    message.totalStaking = object.totalStaking !== undefined && object.totalStaking !== null ? TotalStaking.fromPartial(object.totalStaking) : undefined;
    return message;
  },
  fromAmino(object: QueryTotalStakingResponseAmino): QueryTotalStakingResponse {
    const message = createBaseQueryTotalStakingResponse();
    if (object.total_staking !== undefined && object.total_staking !== null) {
      message.totalStaking = TotalStaking.fromAmino(object.total_staking);
    }
    return message;
  },
  toAmino(message: QueryTotalStakingResponse): QueryTotalStakingResponseAmino {
    const obj: any = {};
    obj.total_staking = message.totalStaking ? TotalStaking.toAmino(message.totalStaking) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTotalStakingResponseAminoMsg): QueryTotalStakingResponse {
    return QueryTotalStakingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTotalStakingResponseProtoMsg): QueryTotalStakingResponse {
    return QueryTotalStakingResponse.decode(message.value);
  },
  toProto(message: QueryTotalStakingResponse): Uint8Array {
    return QueryTotalStakingResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalStakingResponse): QueryTotalStakingResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryTotalStakingResponse",
      value: QueryTotalStakingResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCurrentEpochRequest(): QueryCurrentEpochRequest {
  return {};
}
export const QueryCurrentEpochRequest = {
  typeUrl: "/side.farming.QueryCurrentEpochRequest",
  encode(_: QueryCurrentEpochRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentEpochRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochRequest();
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
  fromPartial(_: Partial<QueryCurrentEpochRequest>): QueryCurrentEpochRequest {
    const message = createBaseQueryCurrentEpochRequest();
    return message;
  },
  fromAmino(_: QueryCurrentEpochRequestAmino): QueryCurrentEpochRequest {
    const message = createBaseQueryCurrentEpochRequest();
    return message;
  },
  toAmino(_: QueryCurrentEpochRequest): QueryCurrentEpochRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryCurrentEpochRequestAminoMsg): QueryCurrentEpochRequest {
    return QueryCurrentEpochRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCurrentEpochRequestProtoMsg): QueryCurrentEpochRequest {
    return QueryCurrentEpochRequest.decode(message.value);
  },
  toProto(message: QueryCurrentEpochRequest): Uint8Array {
    return QueryCurrentEpochRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCurrentEpochRequest): QueryCurrentEpochRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryCurrentEpochRequest",
      value: QueryCurrentEpochRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCurrentEpochResponse(): QueryCurrentEpochResponse {
  return {
    currentEpoch: undefined
  };
}
export const QueryCurrentEpochResponse = {
  typeUrl: "/side.farming.QueryCurrentEpochResponse",
  encode(message: QueryCurrentEpochResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currentEpoch !== undefined) {
      Epoch.encode(message.currentEpoch, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentEpochResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentEpochResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentEpoch = Epoch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCurrentEpochResponse>): QueryCurrentEpochResponse {
    const message = createBaseQueryCurrentEpochResponse();
    message.currentEpoch = object.currentEpoch !== undefined && object.currentEpoch !== null ? Epoch.fromPartial(object.currentEpoch) : undefined;
    return message;
  },
  fromAmino(object: QueryCurrentEpochResponseAmino): QueryCurrentEpochResponse {
    const message = createBaseQueryCurrentEpochResponse();
    if (object.current_epoch !== undefined && object.current_epoch !== null) {
      message.currentEpoch = Epoch.fromAmino(object.current_epoch);
    }
    return message;
  },
  toAmino(message: QueryCurrentEpochResponse): QueryCurrentEpochResponseAmino {
    const obj: any = {};
    obj.current_epoch = message.currentEpoch ? Epoch.toAmino(message.currentEpoch) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCurrentEpochResponseAminoMsg): QueryCurrentEpochResponse {
    return QueryCurrentEpochResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCurrentEpochResponseProtoMsg): QueryCurrentEpochResponse {
    return QueryCurrentEpochResponse.decode(message.value);
  },
  toProto(message: QueryCurrentEpochResponse): Uint8Array {
    return QueryCurrentEpochResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCurrentEpochResponse): QueryCurrentEpochResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryCurrentEpochResponse",
      value: QueryCurrentEpochResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRewardsRequest(): QueryRewardsRequest {
  return {
    address: ""
  };
}
export const QueryRewardsRequest = {
  typeUrl: "/side.farming.QueryRewardsRequest",
  encode(message: QueryRewardsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRewardsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardsRequest();
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
  fromPartial(object: Partial<QueryRewardsRequest>): QueryRewardsRequest {
    const message = createBaseQueryRewardsRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryRewardsRequestAmino): QueryRewardsRequest {
    const message = createBaseQueryRewardsRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryRewardsRequest): QueryRewardsRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryRewardsRequestAminoMsg): QueryRewardsRequest {
    return QueryRewardsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardsRequestProtoMsg): QueryRewardsRequest {
    return QueryRewardsRequest.decode(message.value);
  },
  toProto(message: QueryRewardsRequest): Uint8Array {
    return QueryRewardsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardsRequest): QueryRewardsRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryRewardsRequest",
      value: QueryRewardsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRewardsResponse(): QueryRewardsResponse {
  return {
    pendingRewards: "",
    totalRewards: ""
  };
}
export const QueryRewardsResponse = {
  typeUrl: "/side.farming.QueryRewardsResponse",
  encode(message: QueryRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pendingRewards !== "") {
      writer.uint32(10).string(message.pendingRewards);
    }
    if (message.totalRewards !== "") {
      writer.uint32(18).string(message.totalRewards);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRewardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingRewards = reader.string();
          break;
        case 2:
          message.totalRewards = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRewardsResponse>): QueryRewardsResponse {
    const message = createBaseQueryRewardsResponse();
    message.pendingRewards = object.pendingRewards ?? "";
    message.totalRewards = object.totalRewards ?? "";
    return message;
  },
  fromAmino(object: QueryRewardsResponseAmino): QueryRewardsResponse {
    const message = createBaseQueryRewardsResponse();
    if (object.pending_rewards !== undefined && object.pending_rewards !== null) {
      message.pendingRewards = object.pending_rewards;
    }
    if (object.total_rewards !== undefined && object.total_rewards !== null) {
      message.totalRewards = object.total_rewards;
    }
    return message;
  },
  toAmino(message: QueryRewardsResponse): QueryRewardsResponseAmino {
    const obj: any = {};
    obj.pending_rewards = message.pendingRewards === "" ? undefined : message.pendingRewards;
    obj.total_rewards = message.totalRewards === "" ? undefined : message.totalRewards;
    return obj;
  },
  fromAminoMsg(object: QueryRewardsResponseAminoMsg): QueryRewardsResponse {
    return QueryRewardsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardsResponseProtoMsg): QueryRewardsResponse {
    return QueryRewardsResponse.decode(message.value);
  },
  toProto(message: QueryRewardsResponse): Uint8Array {
    return QueryRewardsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardsResponse): QueryRewardsResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryRewardsResponse",
      value: QueryRewardsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingRewardRequest(): QueryPendingRewardRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryPendingRewardRequest = {
  typeUrl: "/side.farming.QueryPendingRewardRequest",
  encode(message: QueryPendingRewardRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingRewardRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingRewardRequest();
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
  fromPartial(object: Partial<QueryPendingRewardRequest>): QueryPendingRewardRequest {
    const message = createBaseQueryPendingRewardRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryPendingRewardRequestAmino): QueryPendingRewardRequest {
    const message = createBaseQueryPendingRewardRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryPendingRewardRequest): QueryPendingRewardRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingRewardRequestAminoMsg): QueryPendingRewardRequest {
    return QueryPendingRewardRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingRewardRequestProtoMsg): QueryPendingRewardRequest {
    return QueryPendingRewardRequest.decode(message.value);
  },
  toProto(message: QueryPendingRewardRequest): Uint8Array {
    return QueryPendingRewardRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingRewardRequest): QueryPendingRewardRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryPendingRewardRequest",
      value: QueryPendingRewardRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingRewardResponse(): QueryPendingRewardResponse {
  return {
    pendingReward: ""
  };
}
export const QueryPendingRewardResponse = {
  typeUrl: "/side.farming.QueryPendingRewardResponse",
  encode(message: QueryPendingRewardResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pendingReward !== "") {
      writer.uint32(10).string(message.pendingReward);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingRewardResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingReward = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPendingRewardResponse>): QueryPendingRewardResponse {
    const message = createBaseQueryPendingRewardResponse();
    message.pendingReward = object.pendingReward ?? "";
    return message;
  },
  fromAmino(object: QueryPendingRewardResponseAmino): QueryPendingRewardResponse {
    const message = createBaseQueryPendingRewardResponse();
    if (object.pending_reward !== undefined && object.pending_reward !== null) {
      message.pendingReward = object.pending_reward;
    }
    return message;
  },
  toAmino(message: QueryPendingRewardResponse): QueryPendingRewardResponseAmino {
    const obj: any = {};
    obj.pending_reward = message.pendingReward === "" ? undefined : message.pendingReward;
    return obj;
  },
  fromAminoMsg(object: QueryPendingRewardResponseAminoMsg): QueryPendingRewardResponse {
    return QueryPendingRewardResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingRewardResponseProtoMsg): QueryPendingRewardResponse {
    return QueryPendingRewardResponse.decode(message.value);
  },
  toProto(message: QueryPendingRewardResponse): Uint8Array {
    return QueryPendingRewardResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingRewardResponse): QueryPendingRewardResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryPendingRewardResponse",
      value: QueryPendingRewardResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingRewardByAddressRequest(): QueryPendingRewardByAddressRequest {
  return {
    address: ""
  };
}
export const QueryPendingRewardByAddressRequest = {
  typeUrl: "/side.farming.QueryPendingRewardByAddressRequest",
  encode(message: QueryPendingRewardByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingRewardByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingRewardByAddressRequest();
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
  fromPartial(object: Partial<QueryPendingRewardByAddressRequest>): QueryPendingRewardByAddressRequest {
    const message = createBaseQueryPendingRewardByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryPendingRewardByAddressRequestAmino): QueryPendingRewardByAddressRequest {
    const message = createBaseQueryPendingRewardByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryPendingRewardByAddressRequest): QueryPendingRewardByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryPendingRewardByAddressRequestAminoMsg): QueryPendingRewardByAddressRequest {
    return QueryPendingRewardByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingRewardByAddressRequestProtoMsg): QueryPendingRewardByAddressRequest {
    return QueryPendingRewardByAddressRequest.decode(message.value);
  },
  toProto(message: QueryPendingRewardByAddressRequest): Uint8Array {
    return QueryPendingRewardByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingRewardByAddressRequest): QueryPendingRewardByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.farming.QueryPendingRewardByAddressRequest",
      value: QueryPendingRewardByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingRewardByAddressResponse(): QueryPendingRewardByAddressResponse {
  return {
    pendingReward: undefined
  };
}
export const QueryPendingRewardByAddressResponse = {
  typeUrl: "/side.farming.QueryPendingRewardByAddressResponse",
  encode(message: QueryPendingRewardByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pendingReward !== undefined) {
      AccountRewardPerEpoch.encode(message.pendingReward, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingRewardByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingRewardByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingReward = AccountRewardPerEpoch.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPendingRewardByAddressResponse>): QueryPendingRewardByAddressResponse {
    const message = createBaseQueryPendingRewardByAddressResponse();
    message.pendingReward = object.pendingReward !== undefined && object.pendingReward !== null ? AccountRewardPerEpoch.fromPartial(object.pendingReward) : undefined;
    return message;
  },
  fromAmino(object: QueryPendingRewardByAddressResponseAmino): QueryPendingRewardByAddressResponse {
    const message = createBaseQueryPendingRewardByAddressResponse();
    if (object.pending_reward !== undefined && object.pending_reward !== null) {
      message.pendingReward = AccountRewardPerEpoch.fromAmino(object.pending_reward);
    }
    return message;
  },
  toAmino(message: QueryPendingRewardByAddressResponse): QueryPendingRewardByAddressResponseAmino {
    const obj: any = {};
    obj.pending_reward = message.pendingReward ? AccountRewardPerEpoch.toAmino(message.pendingReward) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingRewardByAddressResponseAminoMsg): QueryPendingRewardByAddressResponse {
    return QueryPendingRewardByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingRewardByAddressResponseProtoMsg): QueryPendingRewardByAddressResponse {
    return QueryPendingRewardByAddressResponse.decode(message.value);
  },
  toProto(message: QueryPendingRewardByAddressResponse): Uint8Array {
    return QueryPendingRewardByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingRewardByAddressResponse): QueryPendingRewardByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.farming.QueryPendingRewardByAddressResponse",
      value: QueryPendingRewardByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.farming.QueryParamsRequest",
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
      typeUrl: "/side.farming.QueryParamsRequest",
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
  typeUrl: "/side.farming.QueryParamsResponse",
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
      typeUrl: "/side.farming.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};