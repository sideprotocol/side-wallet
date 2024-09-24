//@ts-nocheck
import { Rpc } from '../../helpers';
import { BinaryReader } from '../../binary';
import { QueryClient, createProtobufRpcClient } from '@cosmjs/stargate';
import { QueryParamsRequest, QueryParamsResponse, QueryChainTipRequest, QueryChainTipResponse, QueryBlockHeaderByHeightRequest, QueryBlockHeaderByHeightResponse, QueryBlockHeaderByHashRequest, QueryBlockHeaderByHashResponse, QueryWithdrawRequestsRequest, QueryWithdrawRequestsResponse, QueryWithdrawRequestsByAddressRequest, QueryWithdrawRequestsByAddressResponse, QueryWithdrawRequestByTxHashRequest, QueryWithdrawRequestByTxHashResponse, QueryWithdrawNetworkFeeRequest, QueryWithdrawNetworkFeeResponse, QueryUTXOsRequest, QueryUTXOsResponse, QueryUTXOsByAddressRequest, QueryUTXOsByAddressResponse, QueryDKGRequestRequest, QueryDKGRequestResponse, QueryDKGRequestsRequest, QueryDKGRequestsResponse, QueryAllDKGRequestsRequest, QueryAllDKGRequestsResponse, QueryDKGCompletionRequestsRequest, QueryDKGCompletionRequestsResponse } from './query';
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
  /** QueryWithdrawRequests queries the withdrawal requests by the given status. */
  queryWithdrawRequests(request: QueryWithdrawRequestsRequest): Promise<QueryWithdrawRequestsResponse>;
  /** QueryWithdrawRequestsByAddress queries the withdrawal requests by the given address. */
  queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse>;
  /** QueryWithdrawRequestByTxHash queries the withdrawal request by the given tx hash. */
  queryWithdrawRequestByTxHash(request: QueryWithdrawRequestByTxHashRequest): Promise<QueryWithdrawRequestByTxHashResponse>;
  /** QueryWithdrawNetworkFee queries the bitcoin network fee for withdrawal. */
  queryWithdrawNetworkFee(request: QueryWithdrawNetworkFeeRequest): Promise<QueryWithdrawNetworkFeeResponse>;
  /** QueryUTXOs queries all utxos. */
  queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse>;
  /** QueryUTXOsByAddress queries the utxos of the given address. */
  queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse>;
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
    this.queryWithdrawRequests = this.queryWithdrawRequests.bind(this);
    this.queryWithdrawRequestsByAddress = this.queryWithdrawRequestsByAddress.bind(this);
    this.queryWithdrawRequestByTxHash = this.queryWithdrawRequestByTxHash.bind(this);
    this.queryWithdrawNetworkFee = this.queryWithdrawNetworkFee.bind(this);
    this.queryUTXOs = this.queryUTXOs.bind(this);
    this.queryUTXOsByAddress = this.queryUTXOsByAddress.bind(this);
    this.queryDKGRequest = this.queryDKGRequest.bind(this);
    this.queryDKGRequests = this.queryDKGRequests.bind(this);
    this.queryAllDKGRequests = this.queryAllDKGRequests.bind(this);
    this.queryDKGCompletionRequests = this.queryDKGCompletionRequests.bind(this);
  }
  queryParams(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryParams', data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  queryChainTip(request: QueryChainTipRequest = {}): Promise<QueryChainTipResponse> {
    const data = QueryChainTipRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryChainTip', data);
    return promise.then(data => QueryChainTipResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse> {
    const data = QueryBlockHeaderByHeightRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryBlockHeaderByHeight', data);
    return promise.then(data => QueryBlockHeaderByHeightResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse> {
    const data = QueryBlockHeaderByHashRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryBlockHeaderByHash', data);
    return promise.then(data => QueryBlockHeaderByHashResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawRequests(request: QueryWithdrawRequestsRequest): Promise<QueryWithdrawRequestsResponse> {
    const data = QueryWithdrawRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryWithdrawRequests', data);
    return promise.then(data => QueryWithdrawRequestsResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse> {
    const data = QueryWithdrawRequestsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryWithdrawRequestsByAddress', data);
    return promise.then(data => QueryWithdrawRequestsByAddressResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawRequestByTxHash(request: QueryWithdrawRequestByTxHashRequest): Promise<QueryWithdrawRequestByTxHashResponse> {
    const data = QueryWithdrawRequestByTxHashRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryWithdrawRequestByTxHash', data);
    return promise.then(data => QueryWithdrawRequestByTxHashResponse.decode(new BinaryReader(data)));
  }
  queryWithdrawNetworkFee(request: QueryWithdrawNetworkFeeRequest): Promise<QueryWithdrawNetworkFeeResponse> {
    const data = QueryWithdrawNetworkFeeRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryWithdrawNetworkFee', data);
    return promise.then(data => QueryWithdrawNetworkFeeResponse.decode(new BinaryReader(data)));
  }
  queryUTXOs(request: QueryUTXOsRequest = {}): Promise<QueryUTXOsResponse> {
    const data = QueryUTXOsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryUTXOs', data);
    return promise.then(data => QueryUTXOsResponse.decode(new BinaryReader(data)));
  }
  queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse> {
    const data = QueryUTXOsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryUTXOsByAddress', data);
    return promise.then(data => QueryUTXOsByAddressResponse.decode(new BinaryReader(data)));
  }
  queryDKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse> {
    const data = QueryDKGRequestRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryDKGRequest', data);
    return promise.then(data => QueryDKGRequestResponse.decode(new BinaryReader(data)));
  }
  queryDKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse> {
    const data = QueryDKGRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryDKGRequests', data);
    return promise.then(data => QueryDKGRequestsResponse.decode(new BinaryReader(data)));
  }
  queryAllDKGRequests(request: QueryAllDKGRequestsRequest = {}): Promise<QueryAllDKGRequestsResponse> {
    const data = QueryAllDKGRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryAllDKGRequests', data);
    return promise.then(data => QueryAllDKGRequestsResponse.decode(new BinaryReader(data)));
  }
  queryDKGCompletionRequests(request: QueryDKGCompletionRequestsRequest): Promise<QueryDKGCompletionRequestsResponse> {
    const data = QueryDKGCompletionRequestsRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Query', 'QueryDKGCompletionRequests', data);
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
    queryWithdrawRequests(request: QueryWithdrawRequestsRequest): Promise<QueryWithdrawRequestsResponse> {
      return queryService.queryWithdrawRequests(request);
    },
    queryWithdrawRequestsByAddress(request: QueryWithdrawRequestsByAddressRequest): Promise<QueryWithdrawRequestsByAddressResponse> {
      return queryService.queryWithdrawRequestsByAddress(request);
    },
    queryWithdrawRequestByTxHash(request: QueryWithdrawRequestByTxHashRequest): Promise<QueryWithdrawRequestByTxHashResponse> {
      return queryService.queryWithdrawRequestByTxHash(request);
    },
    queryWithdrawNetworkFee(request: QueryWithdrawNetworkFeeRequest): Promise<QueryWithdrawNetworkFeeResponse> {
      return queryService.queryWithdrawNetworkFee(request);
    },
    queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse> {
      return queryService.queryUTXOs(request);
    },
    queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse> {
      return queryService.queryUTXOsByAddress(request);
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