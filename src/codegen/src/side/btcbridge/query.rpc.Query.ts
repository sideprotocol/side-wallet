//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryFeeRateRequest, QueryFeeRateResponse, QueryWithdrawalNetworkFeeRequest, QueryWithdrawalNetworkFeeResponse, QueryWithdrawRequestsByAddressRequest, QueryWithdrawRequestsByAddressResponse, QueryWithdrawRequestsByTxHashRequest, QueryWithdrawRequestsByTxHashResponse, QueryPendingBtcWithdrawRequestsRequest, QueryPendingBtcWithdrawRequestsResponse, QuerySigningRequestRequest, QuerySigningRequestResponse, QuerySigningRequestsRequest, QuerySigningRequestsResponse, QuerySigningRequestsByAddressRequest, QuerySigningRequestsByAddressResponse, QuerySigningRequestByTxHashRequest, QuerySigningRequestByTxHashResponse, QueryPendingSigningRequestsRequest, QueryPendingSigningRequestsResponse, QueryUTXOsRequest, QueryUTXOsResponse, QueryUTXOsByAddressRequest, QueryUTXOsByAddressResponse, QueryUTXOCountAndBalancesByAddressRequest, QueryUTXOCountAndBalancesByAddressResponse, QueryDKGRequestRequest, QueryDKGRequestResponse, QueryDKGRequestsRequest, QueryDKGRequestsResponse, QueryAllDKGRequestsRequest, QueryAllDKGRequestsResponse, QueryDKGCompletionRequestsRequest, QueryDKGCompletionRequestsResponse, QueryRefreshingRequestRequest, QueryRefreshingRequestResponse, QueryRefreshingRequestsRequest, QueryRefreshingRequestsResponse, QueryRefreshingCompletionsRequest, QueryRefreshingCompletionsResponse, QueryIBCDepositScriptRequest, QueryIBCDepositScriptResponse, QueryRateLimitRequest, QueryRateLimitResponse, QueryRateLimitByAddressRequest, QueryRateLimitByAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  queryParams(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** QueryFeeRate queries the bitcoin network fee rate on the side chain. */
  queryFeeRate(request?: QueryFeeRateRequest): Promise<QueryFeeRateResponse>;
  /** QueryWithdrawalNetworkFee queries the estimated btc network fee for the given withdrawal. */
  queryWithdrawalNetworkFee(request: QueryWithdrawalNetworkFeeRequest): Promise<QueryWithdrawalNetworkFeeResponse>;
  /** QueryWithdrawRequestsByAddress queries the withdrawal requests by the given address. */
  queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse>;
  /** QueryWithdrawRequestsByTxHash queries the withdrawal requests by the given tx hash. */
  queryWithdrawRequestsByTxHash(request: QueryWithdrawRequestsByTxHashRequest): Promise<QueryWithdrawRequestsByTxHashResponse>;
  /** QueryPendingBtcWithdrawRequests queries the pending btc withdrawal requests. */
  queryPendingBtcWithdrawRequests(request?: QueryPendingBtcWithdrawRequestsRequest): Promise<QueryPendingBtcWithdrawRequestsResponse>;
  /** QuerySigningRequest queries the signing requests by sequence. */
  querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse>;
  /** QuerySigningRequests queries the signing requests by the given status. */
  querySigningRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse>;
  /** QuerySigningRequestsByAddress queries the signing requests by the given address. */
  querySigningRequestsByAddress(request: QuerySigningRequestsByAddressRequest): Promise<QuerySigningRequestsByAddressResponse>;
  /** QuerySigningRequestByTxHash queries the signing request by the given tx hash. */
  querySigningRequestByTxHash(request: QuerySigningRequestByTxHashRequest): Promise<QuerySigningRequestByTxHashResponse>;
  /** QueryPendingSigningRequests queries the pending signing requests. */
  queryPendingSigningRequests(request?: QueryPendingSigningRequestsRequest): Promise<QueryPendingSigningRequestsResponse>;
  /** QueryUTXOs queries all utxos. */
  queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse>;
  /** QueryUTXOsByAddress queries the utxos of the given address. */
  queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse>;
  /** QueryUTXOCountAndBalancesByAddress queries the total count and balances of the unlocked utxos by the given address. */
  queryUTXOCountAndBalancesByAddress(request: QueryUTXOCountAndBalancesByAddressRequest): Promise<QueryUTXOCountAndBalancesByAddressResponse>;
  /** QueryDKGRequest queries the DKG request by the given id. */
  queryDKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse>;
  /** QueryDKGRequests queries the DKG requests by the given status */
  queryDKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse>;
  /** QueryAllDKGRequests queries all DKG requests. */
  queryAllDKGRequests(request?: QueryAllDKGRequestsRequest): Promise<QueryAllDKGRequestsResponse>;
  /** QueryDKGCompletionRequests queries DKG completion requests by the given id. */
  queryDKGCompletionRequests(request: QueryDKGCompletionRequestsRequest): Promise<QueryDKGCompletionRequestsResponse>;
  /** QueryRefreshingRequest queries the refreshing request by the given id. */
  queryRefreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse>;
  /** QueryRefreshingRequests queries the refreshing requests by the given status. */
  queryRefreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse>;
  /** QueryRefreshingCompletions queries refreshing completions by the given request id. */
  queryRefreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse>;
  /** QueryIBCDepositScript queries the deposit OP_RETURN script for cross-chain via IBC. */
  queryIBCDepositScript(request: QueryIBCDepositScriptRequest): Promise<QueryIBCDepositScriptResponse>;
  /** QueryRateLimit queries the current rate limit */
  queryRateLimit(request?: QueryRateLimitRequest): Promise<QueryRateLimitResponse>;
  /** QueryRateLimitByAddress queries the current rate limit by the given address */
  queryRateLimitByAddress(request: QueryRateLimitByAddressRequest): Promise<QueryRateLimitByAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.queryParams = this.queryParams.bind(this);
    this.queryFeeRate = this.queryFeeRate.bind(this);
    this.queryWithdrawalNetworkFee = this.queryWithdrawalNetworkFee.bind(this);
    this.queryWithdrawRequestsByAddress = this.queryWithdrawRequestsByAddress.bind(this);
    this.queryWithdrawRequestsByTxHash = this.queryWithdrawRequestsByTxHash.bind(this);
    this.queryPendingBtcWithdrawRequests = this.queryPendingBtcWithdrawRequests.bind(this);
    this.querySigningRequest = this.querySigningRequest.bind(this);
    this.querySigningRequests = this.querySigningRequests.bind(this);
    this.querySigningRequestsByAddress = this.querySigningRequestsByAddress.bind(this);
    this.querySigningRequestByTxHash = this.querySigningRequestByTxHash.bind(this);
    this.queryPendingSigningRequests = this.queryPendingSigningRequests.bind(this);
    this.queryUTXOs = this.queryUTXOs.bind(this);
    this.queryUTXOsByAddress = this.queryUTXOsByAddress.bind(this);
    this.queryUTXOCountAndBalancesByAddress = this.queryUTXOCountAndBalancesByAddress.bind(this);
    this.queryDKGRequest = this.queryDKGRequest.bind(this);
    this.queryDKGRequests = this.queryDKGRequests.bind(this);
    this.queryAllDKGRequests = this.queryAllDKGRequests.bind(this);
    this.queryDKGCompletionRequests = this.queryDKGCompletionRequests.bind(this);
    this.queryRefreshingRequest = this.queryRefreshingRequest.bind(this);
    this.queryRefreshingRequests = this.queryRefreshingRequests.bind(this);
    this.queryRefreshingCompletions = this.queryRefreshingCompletions.bind(this);
    this.queryIBCDepositScript = this.queryIBCDepositScript.bind(this);
    this.queryRateLimit = this.queryRateLimit.bind(this);
    this.queryRateLimitByAddress = this.queryRateLimitByAddress.bind(this);
  }
  queryParams(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryParams", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  queryFeeRate(request: QueryFeeRateRequest = {}): Promise<QueryFeeRateResponse> {
    const data = QueryFeeRateRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryFeeRate", data);
    return promise.then(data => QueryFeeRateResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawalNetworkFee(request: QueryWithdrawalNetworkFeeRequest): Promise<QueryWithdrawalNetworkFeeResponse> {
    const data = QueryWithdrawalNetworkFeeRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryWithdrawalNetworkFee", data);
    return promise.then(data => QueryWithdrawalNetworkFeeResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse> {
    const data = QueryWithdrawRequestsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryWithdrawRequestsByAddress", data);
    return promise.then(data => QueryWithdrawRequestsByAddressResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawRequestsByTxHash(request: QueryWithdrawRequestsByTxHashRequest): Promise<QueryWithdrawRequestsByTxHashResponse> {
    const data = QueryWithdrawRequestsByTxHashRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryWithdrawRequestsByTxHash", data);
    return promise.then(data => QueryWithdrawRequestsByTxHashResponse.decode(new BinaryReader(data)));
  }
  queryPendingBtcWithdrawRequests(request: QueryPendingBtcWithdrawRequestsRequest = {
    pagination: undefined
  }): Promise<QueryPendingBtcWithdrawRequestsResponse> {
    const data = QueryPendingBtcWithdrawRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryPendingBtcWithdrawRequests", data);
    return promise.then(data => QueryPendingBtcWithdrawRequestsResponse.decode(new BinaryReader(data)));
  }
  querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
    const data = QuerySigningRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QuerySigningRequest", data);
    return promise.then(data => QuerySigningRequestResponse.decode(new BinaryReader(data)));
  }
  querySigningRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse> {
    const data = QuerySigningRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QuerySigningRequests", data);
    return promise.then(data => QuerySigningRequestsResponse.decode(new BinaryReader(data)));
  }
  querySigningRequestsByAddress(request: QuerySigningRequestsByAddressRequest): Promise<QuerySigningRequestsByAddressResponse> {
    const data = QuerySigningRequestsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QuerySigningRequestsByAddress", data);
    return promise.then(data => QuerySigningRequestsByAddressResponse.decode(new BinaryReader(data)));
  }
  querySigningRequestByTxHash(request: QuerySigningRequestByTxHashRequest): Promise<QuerySigningRequestByTxHashResponse> {
    const data = QuerySigningRequestByTxHashRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QuerySigningRequestByTxHash", data);
    return promise.then(data => QuerySigningRequestByTxHashResponse.decode(new BinaryReader(data)));
  }
  queryPendingSigningRequests(request: QueryPendingSigningRequestsRequest = {
    pagination: undefined
  }): Promise<QueryPendingSigningRequestsResponse> {
    const data = QueryPendingSigningRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryPendingSigningRequests", data);
    return promise.then(data => QueryPendingSigningRequestsResponse.decode(new BinaryReader(data)));
  }
  queryUTXOs(request: QueryUTXOsRequest = {}): Promise<QueryUTXOsResponse> {
    const data = QueryUTXOsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryUTXOs", data);
    return promise.then(data => QueryUTXOsResponse.decode(new BinaryReader(data)));
  }
  queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse> {
    const data = QueryUTXOsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryUTXOsByAddress", data);
    return promise.then(data => QueryUTXOsByAddressResponse.decode(new BinaryReader(data)));
  }
  queryUTXOCountAndBalancesByAddress(request: QueryUTXOCountAndBalancesByAddressRequest): Promise<QueryUTXOCountAndBalancesByAddressResponse> {
    const data = QueryUTXOCountAndBalancesByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryUTXOCountAndBalancesByAddress", data);
    return promise.then(data => QueryUTXOCountAndBalancesByAddressResponse.decode(new BinaryReader(data)));
  }
  queryDKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse> {
    const data = QueryDKGRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryDKGRequest", data);
    return promise.then(data => QueryDKGRequestResponse.decode(new BinaryReader(data)));
  }
  queryDKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse> {
    const data = QueryDKGRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryDKGRequests", data);
    return promise.then(data => QueryDKGRequestsResponse.decode(new BinaryReader(data)));
  }
  queryAllDKGRequests(request: QueryAllDKGRequestsRequest = {}): Promise<QueryAllDKGRequestsResponse> {
    const data = QueryAllDKGRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryAllDKGRequests", data);
    return promise.then(data => QueryAllDKGRequestsResponse.decode(new BinaryReader(data)));
  }
  queryDKGCompletionRequests(request: QueryDKGCompletionRequestsRequest): Promise<QueryDKGCompletionRequestsResponse> {
    const data = QueryDKGCompletionRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryDKGCompletionRequests", data);
    return promise.then(data => QueryDKGCompletionRequestsResponse.decode(new BinaryReader(data)));
  }
  queryRefreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse> {
    const data = QueryRefreshingRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryRefreshingRequest", data);
    return promise.then(data => QueryRefreshingRequestResponse.decode(new BinaryReader(data)));
  }
  queryRefreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse> {
    const data = QueryRefreshingRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryRefreshingRequests", data);
    return promise.then(data => QueryRefreshingRequestsResponse.decode(new BinaryReader(data)));
  }
  queryRefreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse> {
    const data = QueryRefreshingCompletionsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryRefreshingCompletions", data);
    return promise.then(data => QueryRefreshingCompletionsResponse.decode(new BinaryReader(data)));
  }
  queryIBCDepositScript(request: QueryIBCDepositScriptRequest): Promise<QueryIBCDepositScriptResponse> {
    const data = QueryIBCDepositScriptRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryIBCDepositScript", data);
    return promise.then(data => QueryIBCDepositScriptResponse.decode(new BinaryReader(data)));
  }
  queryRateLimit(request: QueryRateLimitRequest = {}): Promise<QueryRateLimitResponse> {
    const data = QueryRateLimitRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryRateLimit", data);
    return promise.then(data => QueryRateLimitResponse.decode(new BinaryReader(data)));
  }
  queryRateLimitByAddress(request: QueryRateLimitByAddressRequest): Promise<QueryRateLimitByAddressResponse> {
    const data = QueryRateLimitByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryRateLimitByAddress", data);
    return promise.then(data => QueryRateLimitByAddressResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    queryParams(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.queryParams(request);
    },
    queryFeeRate(request?: QueryFeeRateRequest): Promise<QueryFeeRateResponse> {
      return queryService.queryFeeRate(request);
    },
    queryWithdrawalNetworkFee(request: QueryWithdrawalNetworkFeeRequest): Promise<QueryWithdrawalNetworkFeeResponse> {
      return queryService.queryWithdrawalNetworkFee(request);
    },
    queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse> {
      return queryService.queryWithdrawRequestsByAddress(request);
    },
    queryWithdrawRequestsByTxHash(request: QueryWithdrawRequestsByTxHashRequest): Promise<QueryWithdrawRequestsByTxHashResponse> {
      return queryService.queryWithdrawRequestsByTxHash(request);
    },
    queryPendingBtcWithdrawRequests(request?: QueryPendingBtcWithdrawRequestsRequest): Promise<QueryPendingBtcWithdrawRequestsResponse> {
      return queryService.queryPendingBtcWithdrawRequests(request);
    },
    querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
      return queryService.querySigningRequest(request);
    },
    querySigningRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse> {
      return queryService.querySigningRequests(request);
    },
    querySigningRequestsByAddress(request: QuerySigningRequestsByAddressRequest): Promise<QuerySigningRequestsByAddressResponse> {
      return queryService.querySigningRequestsByAddress(request);
    },
    querySigningRequestByTxHash(request: QuerySigningRequestByTxHashRequest): Promise<QuerySigningRequestByTxHashResponse> {
      return queryService.querySigningRequestByTxHash(request);
    },
    queryPendingSigningRequests(request?: QueryPendingSigningRequestsRequest): Promise<QueryPendingSigningRequestsResponse> {
      return queryService.queryPendingSigningRequests(request);
    },
    queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse> {
      return queryService.queryUTXOs(request);
    },
    queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse> {
      return queryService.queryUTXOsByAddress(request);
    },
    queryUTXOCountAndBalancesByAddress(request: QueryUTXOCountAndBalancesByAddressRequest): Promise<QueryUTXOCountAndBalancesByAddressResponse> {
      return queryService.queryUTXOCountAndBalancesByAddress(request);
    },
    queryDKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse> {
      return queryService.queryDKGRequest(request);
    },
    queryDKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse> {
      return queryService.queryDKGRequests(request);
    },
    queryAllDKGRequests(request?: QueryAllDKGRequestsRequest): Promise<QueryAllDKGRequestsResponse> {
      return queryService.queryAllDKGRequests(request);
    },
    queryDKGCompletionRequests(request: QueryDKGCompletionRequestsRequest): Promise<QueryDKGCompletionRequestsResponse> {
      return queryService.queryDKGCompletionRequests(request);
    },
    queryRefreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse> {
      return queryService.queryRefreshingRequest(request);
    },
    queryRefreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse> {
      return queryService.queryRefreshingRequests(request);
    },
    queryRefreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse> {
      return queryService.queryRefreshingCompletions(request);
    },
    queryIBCDepositScript(request: QueryIBCDepositScriptRequest): Promise<QueryIBCDepositScriptResponse> {
      return queryService.queryIBCDepositScript(request);
    },
    queryRateLimit(request?: QueryRateLimitRequest): Promise<QueryRateLimitResponse> {
      return queryService.queryRateLimit(request);
    },
    queryRateLimitByAddress(request: QueryRateLimitByAddressRequest): Promise<QueryRateLimitByAddressResponse> {
      return queryService.queryRateLimitByAddress(request);
    }
  };
};