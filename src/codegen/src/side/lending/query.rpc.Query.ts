//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryPoolRequest, QueryPoolResponse, QueryPoolsRequest, QueryPoolsResponse, QueryPoolExchangeRateRequest, QueryPoolExchangeRateResponse, QueryCollateralAddressRequest, QueryCollateralAddressResponse, QueryLiquidationEventRequest, QueryLiquidationEventResponse, QueryLoanRequest, QueryLoanResponse, QueryLoansRequest, QueryLoansResponse, QueryLoansByAddressRequest, QueryLoansByAddressResponse, QueryLoanCetInfosRequest, QueryLoanCetInfosResponse, QueryLoanDlcMetaRequest, QueryLoanDlcMetaResponse, QueryLoanCancellationRequest, QueryLoanCancellationResponse, QueryRepaymentRequest, QueryRepaymentResponse, QueryCurrentInterestRequest, QueryCurrentInterestResponse, QueryPriceRequest, QueryPriceResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  pools(request?: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  poolExchangeRate(request: QueryPoolExchangeRateRequest): Promise<QueryPoolExchangeRateResponse>;
  collateralAddress(request: QueryCollateralAddressRequest): Promise<QueryCollateralAddressResponse>;
  liquidationEvent(request: QueryLiquidationEventRequest): Promise<QueryLiquidationEventResponse>;
  loan(request: QueryLoanRequest): Promise<QueryLoanResponse>;
  loans(request: QueryLoansRequest): Promise<QueryLoansResponse>;
  loansByAddress(request: QueryLoansByAddressRequest): Promise<QueryLoansByAddressResponse>;
  loanCetInfos(request: QueryLoanCetInfosRequest): Promise<QueryLoanCetInfosResponse>;
  loanDlcMeta(request: QueryLoanDlcMetaRequest): Promise<QueryLoanDlcMetaResponse>;
  loanCancellation(request: QueryLoanCancellationRequest): Promise<QueryLoanCancellationResponse>;
  repayment(request: QueryRepaymentRequest): Promise<QueryRepaymentResponse>;
  currentInterest(request: QueryCurrentInterestRequest): Promise<QueryCurrentInterestResponse>;
  /** Price queries the current price by the given pair. */
  price(request: QueryPriceRequest): Promise<QueryPriceResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.pool = this.pool.bind(this);
    this.pools = this.pools.bind(this);
    this.poolExchangeRate = this.poolExchangeRate.bind(this);
    this.collateralAddress = this.collateralAddress.bind(this);
    this.liquidationEvent = this.liquidationEvent.bind(this);
    this.loan = this.loan.bind(this);
    this.loans = this.loans.bind(this);
    this.loansByAddress = this.loansByAddress.bind(this);
    this.loanCetInfos = this.loanCetInfos.bind(this);
    this.loanDlcMeta = this.loanDlcMeta.bind(this);
    this.loanCancellation = this.loanCancellation.bind(this);
    this.repayment = this.repayment.bind(this);
    this.currentInterest = this.currentInterest.bind(this);
    this.price = this.price.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Pool", data);
    return promise.then(data => QueryPoolResponse.decode(new BinaryReader(data)));
  }
  pools(request: QueryPoolsRequest = {
    pagination: undefined
  }): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Pools", data);
    return promise.then(data => QueryPoolsResponse.decode(new BinaryReader(data)));
  }
  poolExchangeRate(request: QueryPoolExchangeRateRequest): Promise<QueryPoolExchangeRateResponse> {
    const data = QueryPoolExchangeRateRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "PoolExchangeRate", data);
    return promise.then(data => QueryPoolExchangeRateResponse.decode(new BinaryReader(data)));
  }
  collateralAddress(request: QueryCollateralAddressRequest): Promise<QueryCollateralAddressResponse> {
    const data = QueryCollateralAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "CollateralAddress", data);
    return promise.then(data => QueryCollateralAddressResponse.decode(new BinaryReader(data)));
  }
  liquidationEvent(request: QueryLiquidationEventRequest): Promise<QueryLiquidationEventResponse> {
    const data = QueryLiquidationEventRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LiquidationEvent", data);
    return promise.then(data => QueryLiquidationEventResponse.decode(new BinaryReader(data)));
  }
  loan(request: QueryLoanRequest): Promise<QueryLoanResponse> {
    const data = QueryLoanRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Loan", data);
    return promise.then(data => QueryLoanResponse.decode(new BinaryReader(data)));
  }
  loans(request: QueryLoansRequest): Promise<QueryLoansResponse> {
    const data = QueryLoansRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Loans", data);
    return promise.then(data => QueryLoansResponse.decode(new BinaryReader(data)));
  }
  loansByAddress(request: QueryLoansByAddressRequest): Promise<QueryLoansByAddressResponse> {
    const data = QueryLoansByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoansByAddress", data);
    return promise.then(data => QueryLoansByAddressResponse.decode(new BinaryReader(data)));
  }
  loanCetInfos(request: QueryLoanCetInfosRequest): Promise<QueryLoanCetInfosResponse> {
    const data = QueryLoanCetInfosRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoanCetInfos", data);
    return promise.then(data => QueryLoanCetInfosResponse.decode(new BinaryReader(data)));
  }
  loanDlcMeta(request: QueryLoanDlcMetaRequest): Promise<QueryLoanDlcMetaResponse> {
    const data = QueryLoanDlcMetaRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoanDlcMeta", data);
    return promise.then(data => QueryLoanDlcMetaResponse.decode(new BinaryReader(data)));
  }
  loanCancellation(request: QueryLoanCancellationRequest): Promise<QueryLoanCancellationResponse> {
    const data = QueryLoanCancellationRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoanCancellation", data);
    return promise.then(data => QueryLoanCancellationResponse.decode(new BinaryReader(data)));
  }
  repayment(request: QueryRepaymentRequest): Promise<QueryRepaymentResponse> {
    const data = QueryRepaymentRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Repayment", data);
    return promise.then(data => QueryRepaymentResponse.decode(new BinaryReader(data)));
  }
  currentInterest(request: QueryCurrentInterestRequest): Promise<QueryCurrentInterestResponse> {
    const data = QueryCurrentInterestRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "CurrentInterest", data);
    return promise.then(data => QueryCurrentInterestResponse.decode(new BinaryReader(data)));
  }
  price(request: QueryPriceRequest): Promise<QueryPriceResponse> {
    const data = QueryPriceRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Price", data);
    return promise.then(data => QueryPriceResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
      return queryService.pool(request);
    },
    pools(request?: QueryPoolsRequest): Promise<QueryPoolsResponse> {
      return queryService.pools(request);
    },
    poolExchangeRate(request: QueryPoolExchangeRateRequest): Promise<QueryPoolExchangeRateResponse> {
      return queryService.poolExchangeRate(request);
    },
    collateralAddress(request: QueryCollateralAddressRequest): Promise<QueryCollateralAddressResponse> {
      return queryService.collateralAddress(request);
    },
    liquidationEvent(request: QueryLiquidationEventRequest): Promise<QueryLiquidationEventResponse> {
      return queryService.liquidationEvent(request);
    },
    loan(request: QueryLoanRequest): Promise<QueryLoanResponse> {
      return queryService.loan(request);
    },
    loans(request: QueryLoansRequest): Promise<QueryLoansResponse> {
      return queryService.loans(request);
    },
    loansByAddress(request: QueryLoansByAddressRequest): Promise<QueryLoansByAddressResponse> {
      return queryService.loansByAddress(request);
    },
    loanCetInfos(request: QueryLoanCetInfosRequest): Promise<QueryLoanCetInfosResponse> {
      return queryService.loanCetInfos(request);
    },
    loanDlcMeta(request: QueryLoanDlcMetaRequest): Promise<QueryLoanDlcMetaResponse> {
      return queryService.loanDlcMeta(request);
    },
    loanCancellation(request: QueryLoanCancellationRequest): Promise<QueryLoanCancellationResponse> {
      return queryService.loanCancellation(request);
    },
    repayment(request: QueryRepaymentRequest): Promise<QueryRepaymentResponse> {
      return queryService.repayment(request);
    },
    currentInterest(request: QueryCurrentInterestRequest): Promise<QueryCurrentInterestResponse> {
      return queryService.currentInterest(request);
    },
    price(request: QueryPriceRequest): Promise<QueryPriceResponse> {
      return queryService.price(request);
    }
  };
};