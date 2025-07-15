//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryPoolRequest, QueryPoolResponse, QueryPoolsRequest, QueryPoolsResponse, QueryPoolExchangeRateRequest, QueryPoolExchangeRateResponse, QueryCollateralAddressRequest, QueryCollateralAddressResponse, QueryLiquidationPriceRequest, QueryLiquidationPriceResponse, QueryDlcEventCountRequest, QueryDlcEventCountResponse, QueryLoanRequest, QueryLoanResponse, QueryLoansRequest, QueryLoansResponse, QueryLoansByAddressRequest, QueryLoansByAddressResponse, QueryLoanCetInfosRequest, QueryLoanCetInfosResponse, QueryLoanDlcMetaRequest, QueryLoanDlcMetaResponse, QueryLoanAuthorizationRequest, QueryLoanAuthorizationResponse, QueryLoanDepositsRequest, QueryLoanDepositsResponse, QueryRedemptionRequest, QueryRedemptionResponse, QueryRepaymentRequest, QueryRepaymentResponse, QueryCurrentInterestRequest, QueryCurrentInterestResponse, QueryReferrersRequest, QueryReferrersResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  pools(request?: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  poolExchangeRate(request: QueryPoolExchangeRateRequest): Promise<QueryPoolExchangeRateResponse>;
  collateralAddress(request: QueryCollateralAddressRequest): Promise<QueryCollateralAddressResponse>;
  liquidationPrice(request: QueryLiquidationPriceRequest): Promise<QueryLiquidationPriceResponse>;
  dlcEventCount(request?: QueryDlcEventCountRequest): Promise<QueryDlcEventCountResponse>;
  loan(request: QueryLoanRequest): Promise<QueryLoanResponse>;
  loans(request: QueryLoansRequest): Promise<QueryLoansResponse>;
  loansByAddress(request: QueryLoansByAddressRequest): Promise<QueryLoansByAddressResponse>;
  loanCetInfos(request: QueryLoanCetInfosRequest): Promise<QueryLoanCetInfosResponse>;
  loanDlcMeta(request: QueryLoanDlcMetaRequest): Promise<QueryLoanDlcMetaResponse>;
  loanAuthorization(request: QueryLoanAuthorizationRequest): Promise<QueryLoanAuthorizationResponse>;
  loanDeposits(request: QueryLoanDepositsRequest): Promise<QueryLoanDepositsResponse>;
  redemption(request: QueryRedemptionRequest): Promise<QueryRedemptionResponse>;
  repayment(request: QueryRepaymentRequest): Promise<QueryRepaymentResponse>;
  currentInterest(request: QueryCurrentInterestRequest): Promise<QueryCurrentInterestResponse>;
  referrers(request?: QueryReferrersRequest): Promise<QueryReferrersResponse>;
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
    this.liquidationPrice = this.liquidationPrice.bind(this);
    this.dlcEventCount = this.dlcEventCount.bind(this);
    this.loan = this.loan.bind(this);
    this.loans = this.loans.bind(this);
    this.loansByAddress = this.loansByAddress.bind(this);
    this.loanCetInfos = this.loanCetInfos.bind(this);
    this.loanDlcMeta = this.loanDlcMeta.bind(this);
    this.loanAuthorization = this.loanAuthorization.bind(this);
    this.loanDeposits = this.loanDeposits.bind(this);
    this.redemption = this.redemption.bind(this);
    this.repayment = this.repayment.bind(this);
    this.currentInterest = this.currentInterest.bind(this);
    this.referrers = this.referrers.bind(this);
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
  liquidationPrice(request: QueryLiquidationPriceRequest): Promise<QueryLiquidationPriceResponse> {
    const data = QueryLiquidationPriceRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LiquidationPrice", data);
    return promise.then(data => QueryLiquidationPriceResponse.decode(new BinaryReader(data)));
  }
  dlcEventCount(request: QueryDlcEventCountRequest = {}): Promise<QueryDlcEventCountResponse> {
    const data = QueryDlcEventCountRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "DlcEventCount", data);
    return promise.then(data => QueryDlcEventCountResponse.decode(new BinaryReader(data)));
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
  loanAuthorization(request: QueryLoanAuthorizationRequest): Promise<QueryLoanAuthorizationResponse> {
    const data = QueryLoanAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoanAuthorization", data);
    return promise.then(data => QueryLoanAuthorizationResponse.decode(new BinaryReader(data)));
  }
  loanDeposits(request: QueryLoanDepositsRequest): Promise<QueryLoanDepositsResponse> {
    const data = QueryLoanDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "LoanDeposits", data);
    return promise.then(data => QueryLoanDepositsResponse.decode(new BinaryReader(data)));
  }
  redemption(request: QueryRedemptionRequest): Promise<QueryRedemptionResponse> {
    const data = QueryRedemptionRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Redemption", data);
    return promise.then(data => QueryRedemptionResponse.decode(new BinaryReader(data)));
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
  referrers(request: QueryReferrersRequest = {
    pagination: undefined
  }): Promise<QueryReferrersResponse> {
    const data = QueryReferrersRequest.encode(request).finish();
    const promise = this.rpc.request("side.lending.Query", "Referrers", data);
    return promise.then(data => QueryReferrersResponse.decode(new BinaryReader(data)));
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
    liquidationPrice(request: QueryLiquidationPriceRequest): Promise<QueryLiquidationPriceResponse> {
      return queryService.liquidationPrice(request);
    },
    dlcEventCount(request?: QueryDlcEventCountRequest): Promise<QueryDlcEventCountResponse> {
      return queryService.dlcEventCount(request);
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
    loanAuthorization(request: QueryLoanAuthorizationRequest): Promise<QueryLoanAuthorizationResponse> {
      return queryService.loanAuthorization(request);
    },
    loanDeposits(request: QueryLoanDepositsRequest): Promise<QueryLoanDepositsResponse> {
      return queryService.loanDeposits(request);
    },
    redemption(request: QueryRedemptionRequest): Promise<QueryRedemptionResponse> {
      return queryService.redemption(request);
    },
    repayment(request: QueryRepaymentRequest): Promise<QueryRepaymentResponse> {
      return queryService.repayment(request);
    },
    currentInterest(request: QueryCurrentInterestRequest): Promise<QueryCurrentInterestResponse> {
      return queryService.currentInterest(request);
    },
    referrers(request?: QueryReferrersRequest): Promise<QueryReferrersResponse> {
      return queryService.referrers(request);
    }
  };
};