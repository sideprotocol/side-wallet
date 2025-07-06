//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryDKGRequestRequest, QueryDKGRequestResponse, QueryDKGRequestsRequest, QueryDKGRequestsResponse, QueryDKGCompletionsRequest, QueryDKGCompletionsResponse, QuerySigningRequestRequest, QuerySigningRequestResponse, QuerySigningRequestsRequest, QuerySigningRequestsResponse, QueryRefreshingRequestRequest, QueryRefreshingRequestResponse, QueryRefreshingRequestsRequest, QueryRefreshingRequestsResponse, QueryRefreshingCompletionsRequest, QueryRefreshingCompletionsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DKGRequest queries the dkg request by the given id. */
  dKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse>;
  /** DKGRequests queries dkg requests by the given params. */
  dKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse>;
  /** DKGCompletions queries dkg completions by the given dkg request id. */
  dKGCompletions(request: QueryDKGCompletionsRequest): Promise<QueryDKGCompletionsResponse>;
  /** SigningRequest queries the signing request by the given id. */
  signingRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse>;
  /** SigningRequests queries the signing requests by the given params. */
  signingRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse>;
  /** RefreshingRequest queries the refreshing request by the given id. */
  refreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse>;
  /** RefreshingRequests queries the refreshing requests by the given status. */
  refreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse>;
  /** RefreshingCompletions queries refreshing completions by the given request id. */
  refreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.dKGRequest = this.dKGRequest.bind(this);
    this.dKGRequests = this.dKGRequests.bind(this);
    this.dKGCompletions = this.dKGCompletions.bind(this);
    this.signingRequest = this.signingRequest.bind(this);
    this.signingRequests = this.signingRequests.bind(this);
    this.refreshingRequest = this.refreshingRequest.bind(this);
    this.refreshingRequests = this.refreshingRequests.bind(this);
    this.refreshingCompletions = this.refreshingCompletions.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  dKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse> {
    const data = QueryDKGRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "DKGRequest", data);
    return promise.then(data => QueryDKGRequestResponse.decode(new BinaryReader(data)));
  }
  dKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse> {
    const data = QueryDKGRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "DKGRequests", data);
    return promise.then(data => QueryDKGRequestsResponse.decode(new BinaryReader(data)));
  }
  dKGCompletions(request: QueryDKGCompletionsRequest): Promise<QueryDKGCompletionsResponse> {
    const data = QueryDKGCompletionsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "DKGCompletions", data);
    return promise.then(data => QueryDKGCompletionsResponse.decode(new BinaryReader(data)));
  }
  signingRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
    const data = QuerySigningRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "SigningRequest", data);
    return promise.then(data => QuerySigningRequestResponse.decode(new BinaryReader(data)));
  }
  signingRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse> {
    const data = QuerySigningRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "SigningRequests", data);
    return promise.then(data => QuerySigningRequestsResponse.decode(new BinaryReader(data)));
  }
  refreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse> {
    const data = QueryRefreshingRequestRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "RefreshingRequest", data);
    return promise.then(data => QueryRefreshingRequestResponse.decode(new BinaryReader(data)));
  }
  refreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse> {
    const data = QueryRefreshingRequestsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "RefreshingRequests", data);
    return promise.then(data => QueryRefreshingRequestsResponse.decode(new BinaryReader(data)));
  }
  refreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse> {
    const data = QueryRefreshingCompletionsRequest.encode(request).finish();
    const promise = this.rpc.request("side.tss.Query", "RefreshingCompletions", data);
    return promise.then(data => QueryRefreshingCompletionsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    dKGRequest(request: QueryDKGRequestRequest): Promise<QueryDKGRequestResponse> {
      return queryService.dKGRequest(request);
    },
    dKGRequests(request: QueryDKGRequestsRequest): Promise<QueryDKGRequestsResponse> {
      return queryService.dKGRequests(request);
    },
    dKGCompletions(request: QueryDKGCompletionsRequest): Promise<QueryDKGCompletionsResponse> {
      return queryService.dKGCompletions(request);
    },
    signingRequest(request: QuerySigningRequestRequest): Promise<QuerySigningRequestResponse> {
      return queryService.signingRequest(request);
    },
    signingRequests(request: QuerySigningRequestsRequest): Promise<QuerySigningRequestsResponse> {
      return queryService.signingRequests(request);
    },
    refreshingRequest(request: QueryRefreshingRequestRequest): Promise<QueryRefreshingRequestResponse> {
      return queryService.refreshingRequest(request);
    },
    refreshingRequests(request: QueryRefreshingRequestsRequest): Promise<QueryRefreshingRequestsResponse> {
      return queryService.refreshingRequests(request);
    },
    refreshingCompletions(request: QueryRefreshingCompletionsRequest): Promise<QueryRefreshingCompletionsResponse> {
      return queryService.refreshingCompletions(request);
    }
  };
};