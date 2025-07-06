//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryRewardsRequest, QueryRewardsResponse, QueryRewardStatsRequest, QueryRewardStatsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Rewards queries the rewards of the given address. */
  rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse>;
  /** RewardStats queries total reward statistics. */
  rewardStats(request?: QueryRewardStatsRequest): Promise<QueryRewardStatsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.rewards = this.rewards.bind(this);
    this.rewardStats = this.rewardStats.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.incentive.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse> {
    const data = QueryRewardsRequest.encode(request).finish();
    const promise = this.rpc.request("side.incentive.Query", "Rewards", data);
    return promise.then(data => QueryRewardsResponse.decode(new BinaryReader(data)));
  }
  rewardStats(request: QueryRewardStatsRequest = {}): Promise<QueryRewardStatsResponse> {
    const data = QueryRewardStatsRequest.encode(request).finish();
    const promise = this.rpc.request("side.incentive.Query", "RewardStats", data);
    return promise.then(data => QueryRewardStatsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    rewards(request: QueryRewardsRequest): Promise<QueryRewardsResponse> {
      return queryService.rewards(request);
    },
    rewardStats(request?: QueryRewardStatsRequest): Promise<QueryRewardStatsResponse> {
      return queryService.rewardStats(request);
    }
  };
};