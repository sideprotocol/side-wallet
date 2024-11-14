//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryChainTipRequest, QueryChainTipResponse, QueryBlockHeaderByHeightRequest, QueryBlockHeaderByHeightResponse, QueryBlockHeaderByHashRequest, QueryBlockHeaderByHashResponse, QueryFeeRateRequest, QueryFeeRateResponse, QueryWithdrawalNetworkFeeRequest, QueryWithdrawalNetworkFeeResponse, QueryWithdrawRequestsByAddressRequest, QueryWithdrawRequestsByAddressResponse, QueryWithdrawRequestsByTxHashRequest, QueryWithdrawRequestsByTxHashResponse, QueryPendingBtcWithdrawRequestsRequest, QueryPendingBtcWithdrawRequestsResponse, QuerySigningRequestsRequest, QuerySigningRequestsResponse, QuerySigningRequestsByAddressRequest, QuerySigningRequestsByAddressResponse, QuerySigningRequestByTxHashRequest, QuerySigningRequestByTxHashResponse, QueryUTXOsRequest, QueryUTXOsResponse, QueryUTXOsByAddressRequest, QueryUTXOsByAddressResponse, QueryUTXOCountAndBalancesByAddressRequest, QueryUTXOCountAndBalancesByAddressResponse, QueryDKGRequestRequest, QueryDKGRequestResponse, QueryDKGRequestsRequest, QueryDKGRequestsResponse, QueryAllDKGRequestsRequest, QueryAllDKGRequestsResponse, QueryDKGCompletionRequestsRequest, QueryDKGCompletionRequestsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  queryParams(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** ChainTip queries the chain tip of the module. */
  queryChainTip(request?: QueryChainTipRequest): Promise<QueryChainTipResponse>;
  /** BlockHeaderByHeight queries the block header by height. */
  queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse>;
  /** BlockHeaderByHash queries the block header by hash. */
  queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse>;
  /** QueryFeeRate queries the current bitcoin network fee rate on the side chain. */
  queryFeeRate(request?: QueryFeeRateRequest): Promise<QueryFeeRateResponse>;
  /** QueryWithdrawalNetworkFee queries the estimated btc network fee for the given withdrawal. */
  queryWithdrawalNetworkFee(request: QueryWithdrawalNetworkFeeRequest): Promise<QueryWithdrawalNetworkFeeResponse>;
  /** QueryWithdrawRequestsByAddress queries the withdrawal requests by the given address. */
  queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse>;
  /** QueryWithdrawRequestsByTxHash queries the withdrawal requests by the given tx hash. */
  queryWithdrawRequestsByTxHash(request: QueryWithdrawRequestsByTxHashRequest): Promise<QueryWithdrawRequestsByTxHashResponse>;
  /** QueryPendingBtcWithdrawRequests queries the pending btc withdrawal requests. */
  queryPendingBtcWithdrawRequests(request?: QueryPendingBtcWithdrawRequestsRequest): Promise<QueryPendingBtcWithdrawRequestsResponse>;
  /** QuerySigningRequests queries the signing requests by the given status. */
  querySigningRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse>;
  /** QuerySigningRequestsByAddress queries the signing requests by the given address. */
  querySigningRequestsByAddress(request: QuerySigningRequestsByAddressRequest): Promise<QuerySigningRequestsByAddressResponse>;
  /** QuerySigningRequestByTxHash queries the signing request by the given tx hash. */
  querySigningRequestByTxHash(request: QuerySigningRequestByTxHashRequest): Promise<QuerySigningRequestByTxHashResponse>;
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
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.queryParams = this.queryParams.bind(this);
    this.queryChainTip = this.queryChainTip.bind(this);
    this.queryBlockHeaderByHeight = this.queryBlockHeaderByHeight.bind(this);
    this.queryBlockHeaderByHash = this.queryBlockHeaderByHash.bind(this);
    this.queryFeeRate = this.queryFeeRate.bind(this);
    this.queryWithdrawalNetworkFee = this.queryWithdrawalNetworkFee.bind(this);
    this.queryWithdrawRequestsByAddress = this.queryWithdrawRequestsByAddress.bind(this);
    this.queryWithdrawRequestsByTxHash = this.queryWithdrawRequestsByTxHash.bind(this);
    this.queryPendingBtcWithdrawRequests = this.queryPendingBtcWithdrawRequests.bind(this);
    this.querySigningRequests = this.querySigningRequests.bind(this);
    this.querySigningRequestsByAddress = this.querySigningRequestsByAddress.bind(this);
    this.querySigningRequestByTxHash = this.querySigningRequestByTxHash.bind(this);
    this.queryUTXOs = this.queryUTXOs.bind(this);
    this.queryUTXOsByAddress = this.queryUTXOsByAddress.bind(this);
    this.queryUTXOCountAndBalancesByAddress = this.queryUTXOCountAndBalancesByAddress.bind(this);
    this.queryDKGRequest = this.queryDKGRequest.bind(this);
    this.queryDKGRequests = this.queryDKGRequests.bind(this);
    this.queryAllDKGRequests = this.queryAllDKGRequests.bind(this);
    this.queryDKGCompletionRequests = this.queryDKGCompletionRequests.bind(this);
  }
  queryParams(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryParams", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  queryChainTip(request: QueryChainTipRequest = {}): Promise<QueryChainTipResponse> {
    const data = QueryChainTipRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryChainTip", data);
    return promise.then(data => QueryChainTipResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse> {
    const data = QueryBlockHeaderByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryBlockHeaderByHeight", data);
    return promise.then(data => QueryBlockHeaderByHeightResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse> {
    const data = QueryBlockHeaderByHashRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QueryBlockHeaderByHash", data);
    return promise.then(data => QueryBlockHeaderByHashResponse.decode(new BinaryReader(data)));
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
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    queryParams(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.queryParams(request);
    },
    queryChainTip(request?: QueryChainTipRequest): Promise<QueryChainTipResponse> {
      return queryService.queryChainTip(request);
    },
    queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse> {
      return queryService.queryBlockHeaderByHeight(request);
    },
    queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse> {
      return queryService.queryBlockHeaderByHash(request);
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
    querySigningRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse> {
      return queryService.querySigningRequests(request);
    },
    querySigningRequestsByAddress(request: QuerySigningRequestsByAddressRequest): Promise<QuerySigningRequestsByAddressResponse> {
      return queryService.querySigningRequestsByAddress(request);
    },
    querySigningRequestByTxHash(request: QuerySigningRequestByTxHashRequest): Promise<QuerySigningRequestByTxHashResponse> {
      return queryService.querySigningRequestByTxHash(request);
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
    }
  };
};