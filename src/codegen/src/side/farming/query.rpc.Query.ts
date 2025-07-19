//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryStakingRequest, QueryStakingResponse, QueryStakingsRequest, QueryStakingsResponse, QueryStakingsByAddressRequest, QueryStakingsByAddressResponse, QueryTotalStakingRequest, QueryTotalStakingResponse, QueryCurrentEpochRequest, QueryCurrentEpochResponse, QueryRewardsRequest, QueryRewardsResponse, QueryPendingRewardRequest, QueryPendingRewardResponse, QueryPendingRewardByAddressRequest, QueryPendingRewardByAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  staking(request: QueryStakingRequest): Promise<QueryStakingResponse>;
  stakings(request: QueryStakingsRequest): Promise<QueryStakingsResponse>;
  stakingsByAddress(request: QueryStakingsByAddressRequest): Promise<QueryStakingsByAddressResponse>;
  totalStaking(request: QueryTotalStakingRequest): Promise<QueryTotalStakingResponse>;
  currentEpoch(request?: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse>;
  rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse>;
  pendingReward(request: QueryPendingRewardRequest): Promise<QueryPendingRewardResponse>;
  pendingRewardByAddress(request: QueryPendingRewardByAddressRequest): Promise<QueryPendingRewardByAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.staking = this.staking.bind(this);
    this.stakings = this.stakings.bind(this);
    this.stakingsByAddress = this.stakingsByAddress.bind(this);
    this.totalStaking = this.totalStaking.bind(this);
    this.currentEpoch = this.currentEpoch.bind(this);
    this.rewards = this.rewards.bind(this);
    this.pendingReward = this.pendingReward.bind(this);
    this.pendingRewardByAddress = this.pendingRewardByAddress.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  staking(request: QueryStakingRequest): Promise<QueryStakingResponse> {
    const data = QueryStakingRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "Staking", data);
    return promise.then(data => QueryStakingResponse.decode(new BinaryReader(data)));
  }
  stakings(request: QueryStakingsRequest): Promise<QueryStakingsResponse> {
    const data = QueryStakingsRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "Stakings", data);
    return promise.then(data => QueryStakingsResponse.decode(new BinaryReader(data)));
  }
  stakingsByAddress(request: QueryStakingsByAddressRequest): Promise<QueryStakingsByAddressResponse> {
    const data = QueryStakingsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "StakingsByAddress", data);
    return promise.then(data => QueryStakingsByAddressResponse.decode(new BinaryReader(data)));
  }
  totalStaking(request: QueryTotalStakingRequest): Promise<QueryTotalStakingResponse> {
    const data = QueryTotalStakingRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "TotalStaking", data);
    return promise.then(data => QueryTotalStakingResponse.decode(new BinaryReader(data)));
  }
  currentEpoch(request: QueryCurrentEpochRequest = {}): Promise<QueryCurrentEpochResponse> {
    const data = QueryCurrentEpochRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "CurrentEpoch", data);
    return promise.then(data => QueryCurrentEpochResponse.decode(new BinaryReader(data)));
  }
  rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse> {
    const data = QueryRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "Rewards", data);
    return promise.then(data => QueryRewardsResponse.decode(new BinaryReader(data)));
  }
  pendingReward(request: QueryPendingRewardRequest): Promise<QueryPendingRewardResponse> {
    const data = QueryPendingRewardRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "PendingReward", data);
    return promise.then(data => QueryPendingRewardResponse.decode(new BinaryReader(data)));
  }
  pendingRewardByAddress(request: QueryPendingRewardByAddressRequest): Promise<QueryPendingRewardByAddressResponse> {
    const data = QueryPendingRewardByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.farming.Query", "PendingRewardByAddress", data);
    return promise.then(data => QueryPendingRewardByAddressResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    staking(request: QueryStakingRequest): Promise<QueryStakingResponse> {
      return queryService.staking(request);
    },
    stakings(request: QueryStakingsRequest): Promise<QueryStakingsResponse> {
      return queryService.stakings(request);
    },
    stakingsByAddress(request: QueryStakingsByAddressRequest): Promise<QueryStakingsByAddressResponse> {
      return queryService.stakingsByAddress(request);
    },
    totalStaking(request: QueryTotalStakingRequest): Promise<QueryTotalStakingResponse> {
      return queryService.totalStaking(request);
    },
    currentEpoch(request?: QueryCurrentEpochRequest): Promise<QueryCurrentEpochResponse> {
      return queryService.currentEpoch(request);
    },
    rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse> {
      return queryService.rewards(request);
    },
    pendingReward(request: QueryPendingRewardRequest): Promise<QueryPendingRewardResponse> {
      return queryService.pendingReward(request);
    },
    pendingRewardByAddress(request: QueryPendingRewardByAddressRequest): Promise<QueryPendingRewardByAddressResponse> {
      return queryService.pendingRewardByAddress(request);
    }
  };
};