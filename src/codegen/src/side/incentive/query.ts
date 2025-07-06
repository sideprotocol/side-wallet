//@ts-nocheck
import { Rewards, RewardsAmino, RewardsSDKType, RewardStats, RewardStatsAmino, RewardStatsSDKType } from "./incentive";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequest {
  address: string;
}
export interface QueryRewardsRequestProtoMsg {
  typeUrl: "/side.incentive.QueryRewardsRequest";
  value: Uint8Array;
}
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequestAmino {
  address?: string;
}
export interface QueryRewardsRequestAminoMsg {
  type: "/side.incentive.QueryRewardsRequest";
  value: QueryRewardsRequestAmino;
}
/** QueryRewardsRequest is request type for the Query/Rewards RPC method. */
export interface QueryRewardsRequestSDKType {
  address: string;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponse {
  rewards?: Rewards;
}
export interface QueryRewardsResponseProtoMsg {
  typeUrl: "/side.incentive.QueryRewardsResponse";
  value: Uint8Array;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponseAmino {
  rewards?: RewardsAmino;
}
export interface QueryRewardsResponseAminoMsg {
  type: "/side.incentive.QueryRewardsResponse";
  value: QueryRewardsResponseAmino;
}
/** QueryRewardsResponse is response type for the Query/Rewards RPC method. */
export interface QueryRewardsResponseSDKType {
  rewards?: RewardsSDKType;
}
/** QueryRewardStatsRequest is request type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsRequest {}
export interface QueryRewardStatsRequestProtoMsg {
  typeUrl: "/side.incentive.QueryRewardStatsRequest";
  value: Uint8Array;
}
/** QueryRewardStatsRequest is request type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsRequestAmino {}
export interface QueryRewardStatsRequestAminoMsg {
  type: "/side.incentive.QueryRewardStatsRequest";
  value: QueryRewardStatsRequestAmino;
}
/** QueryRewardStatsRequest is request type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsRequestSDKType {}
/** QueryRewardStatsResponse is response type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsResponse {
  rewardStats?: RewardStats;
}
export interface QueryRewardStatsResponseProtoMsg {
  typeUrl: "/side.incentive.QueryRewardStatsResponse";
  value: Uint8Array;
}
/** QueryRewardStatsResponse is response type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsResponseAmino {
  reward_stats?: RewardStatsAmino;
}
export interface QueryRewardStatsResponseAminoMsg {
  type: "/side.incentive.QueryRewardStatsResponse";
  value: QueryRewardStatsResponseAmino;
}
/** QueryRewardStatsResponse is response type for the Query/RewardStats RPC method. */
export interface QueryRewardStatsResponseSDKType {
  reward_stats?: RewardStatsSDKType;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.incentive.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.incentive.QueryParamsRequest";
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
  typeUrl: "/side.incentive.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.incentive.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
function createBaseQueryRewardsRequest(): QueryRewardsRequest {
  return {
    address: ""
  };
}
export const QueryRewardsRequest = {
  typeUrl: "/side.incentive.QueryRewardsRequest",
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
      typeUrl: "/side.incentive.QueryRewardsRequest",
      value: QueryRewardsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRewardsResponse(): QueryRewardsResponse {
  return {
    rewards: undefined
  };
}
export const QueryRewardsResponse = {
  typeUrl: "/side.incentive.QueryRewardsResponse",
  encode(message: QueryRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewards !== undefined) {
      Rewards.encode(message.rewards, writer.uint32(10).fork()).ldelim();
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
          message.rewards = Rewards.decode(reader, reader.uint32());
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
    message.rewards = object.rewards !== undefined && object.rewards !== null ? Rewards.fromPartial(object.rewards) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardsResponseAmino): QueryRewardsResponse {
    const message = createBaseQueryRewardsResponse();
    if (object.rewards !== undefined && object.rewards !== null) {
      message.rewards = Rewards.fromAmino(object.rewards);
    }
    return message;
  },
  toAmino(message: QueryRewardsResponse): QueryRewardsResponseAmino {
    const obj: any = {};
    obj.rewards = message.rewards ? Rewards.toAmino(message.rewards) : undefined;
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
      typeUrl: "/side.incentive.QueryRewardsResponse",
      value: QueryRewardsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRewardStatsRequest(): QueryRewardStatsRequest {
  return {};
}
export const QueryRewardStatsRequest = {
  typeUrl: "/side.incentive.QueryRewardStatsRequest",
  encode(_: QueryRewardStatsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRewardStatsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardStatsRequest();
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
  fromPartial(_: Partial<QueryRewardStatsRequest>): QueryRewardStatsRequest {
    const message = createBaseQueryRewardStatsRequest();
    return message;
  },
  fromAmino(_: QueryRewardStatsRequestAmino): QueryRewardStatsRequest {
    const message = createBaseQueryRewardStatsRequest();
    return message;
  },
  toAmino(_: QueryRewardStatsRequest): QueryRewardStatsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryRewardStatsRequestAminoMsg): QueryRewardStatsRequest {
    return QueryRewardStatsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardStatsRequestProtoMsg): QueryRewardStatsRequest {
    return QueryRewardStatsRequest.decode(message.value);
  },
  toProto(message: QueryRewardStatsRequest): Uint8Array {
    return QueryRewardStatsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardStatsRequest): QueryRewardStatsRequestProtoMsg {
    return {
      typeUrl: "/side.incentive.QueryRewardStatsRequest",
      value: QueryRewardStatsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRewardStatsResponse(): QueryRewardStatsResponse {
  return {
    rewardStats: undefined
  };
}
export const QueryRewardStatsResponse = {
  typeUrl: "/side.incentive.QueryRewardStatsResponse",
  encode(message: QueryRewardStatsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardStats !== undefined) {
      RewardStats.encode(message.rewardStats, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRewardStatsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardStats = RewardStats.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRewardStatsResponse>): QueryRewardStatsResponse {
    const message = createBaseQueryRewardStatsResponse();
    message.rewardStats = object.rewardStats !== undefined && object.rewardStats !== null ? RewardStats.fromPartial(object.rewardStats) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardStatsResponseAmino): QueryRewardStatsResponse {
    const message = createBaseQueryRewardStatsResponse();
    if (object.reward_stats !== undefined && object.reward_stats !== null) {
      message.rewardStats = RewardStats.fromAmino(object.reward_stats);
    }
    return message;
  },
  toAmino(message: QueryRewardStatsResponse): QueryRewardStatsResponseAmino {
    const obj: any = {};
    obj.reward_stats = message.rewardStats ? RewardStats.toAmino(message.rewardStats) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardStatsResponseAminoMsg): QueryRewardStatsResponse {
    return QueryRewardStatsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardStatsResponseProtoMsg): QueryRewardStatsResponse {
    return QueryRewardStatsResponse.decode(message.value);
  },
  toProto(message: QueryRewardStatsResponse): Uint8Array {
    return QueryRewardStatsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardStatsResponse): QueryRewardStatsResponseProtoMsg {
    return {
      typeUrl: "/side.incentive.QueryRewardStatsResponse",
      value: QueryRewardStatsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.incentive.QueryParamsRequest",
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
      typeUrl: "/side.incentive.QueryParamsRequest",
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
  typeUrl: "/side.incentive.QueryParamsResponse",
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
      typeUrl: "/side.incentive.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};