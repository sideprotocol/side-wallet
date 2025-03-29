//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryLiquidationRequest, QueryLiquidationResponse, QueryLiquidationsRequest, QueryLiquidationsResponse, QueryLiquidationRecordRequest, QueryLiquidationRecordResponse, QueryLiquidationRecordsRequest, QueryLiquidationRecordsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Liquidation queries the specified liquidation by id. */
  liquidation(request: QueryLiquidationRequest): Promise<QueryLiquidationResponse>;
  /** Liquidations queries the liquidations by the given status. */
  liquidations(request: QueryLiquidationsRequest): Promise<QueryLiquidationsResponse>;
  /** LiquidationRecord queries the specified liquidation record. */
  liquidationRecord(request: QueryLiquidationRecordRequest): Promise<QueryLiquidationRecordResponse>;
  /** LiquidationRecords queries the liquidation records of the given liquidation. */
  liquidationRecords(request: QueryLiquidationRecordsRequest): Promise<QueryLiquidationRecordsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.liquidation = this.liquidation.bind(this);
    this.liquidations = this.liquidations.bind(this);
    this.liquidationRecord = this.liquidationRecord.bind(this);
    this.liquidationRecords = this.liquidationRecords.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  liquidation(request: QueryLiquidationRequest): Promise<QueryLiquidationResponse> {
    const data = QueryLiquidationRequest.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Query", "Liquidation", data);
    return promise.then(data => QueryLiquidationResponse.decode(new BinaryReader(data)));
  }
  liquidations(request: QueryLiquidationsRequest): Promise<QueryLiquidationsResponse> {
    const data = QueryLiquidationsRequest.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Query", "Liquidations", data);
    return promise.then(data => QueryLiquidationsResponse.decode(new BinaryReader(data)));
  }
  liquidationRecord(request: QueryLiquidationRecordRequest): Promise<QueryLiquidationRecordResponse> {
    const data = QueryLiquidationRecordRequest.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Query", "LiquidationRecord", data);
    return promise.then(data => QueryLiquidationRecordResponse.decode(new BinaryReader(data)));
  }
  liquidationRecords(request: QueryLiquidationRecordsRequest): Promise<QueryLiquidationRecordsResponse> {
    const data = QueryLiquidationRecordsRequest.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Query", "LiquidationRecords", data);
    return promise.then(data => QueryLiquidationRecordsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    liquidation(request: QueryLiquidationRequest): Promise<QueryLiquidationResponse> {
      return queryService.liquidation(request);
    },
    liquidations(request: QueryLiquidationsRequest): Promise<QueryLiquidationsResponse> {
      return queryService.liquidations(request);
    },
    liquidationRecord(request: QueryLiquidationRecordRequest): Promise<QueryLiquidationRecordResponse> {
      return queryService.liquidationRecord(request);
    },
    liquidationRecords(request: QueryLiquidationRecordsRequest): Promise<QueryLiquidationRecordsResponse> {
      return queryService.liquidationRecords(request);
    }
  };
};