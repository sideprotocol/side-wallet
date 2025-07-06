//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryListPricesRequest, QueryListPricesResponse, QueryGetPriceBySymbolRequest, QueryGetPriceBySymbolResponse, QueryChainTipRequest, QueryChainTipResponse, QueryBlockHeaderByHeightRequest, QueryBlockHeaderByHeightResponse, QueryBlockHeaderByHashRequest, QueryBlockHeaderByHashResponse, QueryBestBlockHeaderRequest, QueryBestBlockHeaderResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** ListPrices queries all oracle prices. */
  listPrices(request?: QueryListPricesRequest): Promise<QueryListPricesResponse>;
  /** GetPrice queries the oracle price by symbol. */
  getPriceBySymbol(request: QueryGetPriceBySymbolRequest): Promise<QueryGetPriceBySymbolResponse>;
  /** ChainTip queries the chain tip of the module. */
  queryChainTip(request?: QueryChainTipRequest): Promise<QueryChainTipResponse>;
  /** BlockHeaderByHeight queries the block header by height. */
  queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse>;
  /** BlockHeaderByHash queries the block header by hash. */
  queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse>;
  /** BestBlockHeader queries the best block header. */
  queryBestBlockHeader(request?: QueryBestBlockHeaderRequest): Promise<QueryBestBlockHeaderResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.listPrices = this.listPrices.bind(this);
    this.getPriceBySymbol = this.getPriceBySymbol.bind(this);
    this.queryChainTip = this.queryChainTip.bind(this);
    this.queryBlockHeaderByHeight = this.queryBlockHeaderByHeight.bind(this);
    this.queryBlockHeaderByHash = this.queryBlockHeaderByHash.bind(this);
    this.queryBestBlockHeader = this.queryBestBlockHeader.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  listPrices(request: QueryListPricesRequest = {}): Promise<QueryListPricesResponse> {
    const data = QueryListPricesRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "ListPrices", data);
    return promise.then(data => QueryListPricesResponse.decode(new BinaryReader(data)));
  }
  getPriceBySymbol(request: QueryGetPriceBySymbolRequest): Promise<QueryGetPriceBySymbolResponse> {
    const data = QueryGetPriceBySymbolRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "GetPriceBySymbol", data);
    return promise.then(data => QueryGetPriceBySymbolResponse.decode(new BinaryReader(data)));
  }
  queryChainTip(request: QueryChainTipRequest = {}): Promise<QueryChainTipResponse> {
    const data = QueryChainTipRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "QueryChainTip", data);
    return promise.then(data => QueryChainTipResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHeight(request: QueryBlockHeaderByHeightRequest): Promise<QueryBlockHeaderByHeightResponse> {
    const data = QueryBlockHeaderByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "QueryBlockHeaderByHeight", data);
    return promise.then(data => QueryBlockHeaderByHeightResponse.decode(new BinaryReader(data)));
  }
  queryBlockHeaderByHash(request: QueryBlockHeaderByHashRequest): Promise<QueryBlockHeaderByHashResponse> {
    const data = QueryBlockHeaderByHashRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "QueryBlockHeaderByHash", data);
    return promise.then(data => QueryBlockHeaderByHashResponse.decode(new BinaryReader(data)));
  }
  queryBestBlockHeader(request: QueryBestBlockHeaderRequest = {}): Promise<QueryBestBlockHeaderResponse> {
    const data = QueryBestBlockHeaderRequest.encode(request).finish();
    const promise = this.rpc.request("side.oracle.Query", "QueryBestBlockHeader", data);
    return promise.then(data => QueryBestBlockHeaderResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    listPrices(request?: QueryListPricesRequest): Promise<QueryListPricesResponse> {
      return queryService.listPrices(request);
    },
    getPriceBySymbol(request: QueryGetPriceBySymbolRequest): Promise<QueryGetPriceBySymbolResponse> {
      return queryService.getPriceBySymbol(request);
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
    queryBestBlockHeader(request?: QueryBestBlockHeaderRequest): Promise<QueryBestBlockHeaderResponse> {
      return queryService.queryBestBlockHeader(request);
    }
  };
};