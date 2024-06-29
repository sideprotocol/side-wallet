//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryChainTipRequest, QueryChainTipResponse, QueryBlockHeaderByHeightRequest, QueryBlockHeaderByHeightResponse, QueryBlockHeaderByHashRequest, QueryBlockHeaderByHashResponse, QuerySigningRequestRequest, QuerySigningRequestResponse, QueryUTXOsRequest, QueryUTXOsResponse, QueryUTXOsByAddressRequest, QueryUTXOsByAddressResponse } from "./query";
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
  /** QuerySigningRequest queries the request to sign. */
  querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse>;
  /** UTXOs queries all utxos. */
  queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse>;
  /** UTXOsByAddress queries the utxos of the given address. */
  queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.queryParams = this.queryParams.bind(this);
    this.queryChainTip = this.queryChainTip.bind(this);
    this.queryBlockHeaderByHeight = this.queryBlockHeaderByHeight.bind(this);
    this.queryBlockHeaderByHash = this.queryBlockHeaderByHash.bind(this);
    this.querySigningRequest = this.querySigningRequest.bind(this);
    this.queryUTXOs = this.queryUTXOs.bind(this);
    this.queryUTXOsByAddress = this.queryUTXOsByAddress.bind(this);
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
  querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
    const data = QuerySigningRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Query", "QuerySigningRequest", data);
    return promise.then(data => QuerySigningRequestResponse.decode(new BinaryReader(data)));
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
    querySigningRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
      return queryService.querySigningRequest(request);
    },
    queryUTXOs(request?: QueryUTXOsRequest): Promise<QueryUTXOsResponse> {
      return queryService.queryUTXOs(request);
    },
    queryUTXOsByAddress(request: QueryUTXOsByAddressRequest): Promise<QueryUTXOsByAddressResponse> {
      return queryService.queryUTXOsByAddress(request);
    }
  };
};