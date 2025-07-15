//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { LoanStatus, LendingPool, LendingPoolAmino, LendingPoolSDKType, CetInfo, CetInfoAmino, CetInfoSDKType, Loan, LoanAmino, LoanSDKType, DLCMeta, DLCMetaAmino, DLCMetaSDKType, DepositLog, DepositLogAmino, DepositLogSDKType, AuthorizationStatus, Redemption, RedemptionAmino, RedemptionSDKType, Repayment, RepaymentAmino, RepaymentSDKType, Referrer, ReferrerAmino, ReferrerSDKType } from "./lending";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {
  id: string;
}
export interface QueryPoolRequestProtoMsg {
  typeUrl: "/side.lending.QueryPoolRequest";
  value: Uint8Array;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequestAmino {
  id?: string;
}
export interface QueryPoolRequestAminoMsg {
  type: "/side.lending.QueryPoolRequest";
  value: QueryPoolRequestAmino;
}
/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequestSDKType {
  id: string;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  pool?: LendingPool;
}
export interface QueryPoolResponseProtoMsg {
  typeUrl: "/side.lending.QueryPoolResponse";
  value: Uint8Array;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponseAmino {
  pool?: LendingPoolAmino;
}
export interface QueryPoolResponseAminoMsg {
  type: "/side.lending.QueryPoolResponse";
  value: QueryPoolResponseAmino;
}
/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponseSDKType {
  pool?: LendingPoolSDKType;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryPoolsRequest {
  pagination?: PageRequest;
}
export interface QueryPoolsRequestProtoMsg {
  typeUrl: "/side.lending.QueryPoolsRequest";
  value: Uint8Array;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryPoolsRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryPoolsRequestAminoMsg {
  type: "/side.lending.QueryPoolsRequest";
  value: QueryPoolsRequestAmino;
}
/** QueryPoolsRequest is request type for the Query/Pools RPC method. */
export interface QueryPoolsRequestSDKType {
  pagination?: PageRequestSDKType;
}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryPoolsResponse {
  pools: LendingPool[];
  pagination?: PageResponse;
}
export interface QueryPoolsResponseProtoMsg {
  typeUrl: "/side.lending.QueryPoolsResponse";
  value: Uint8Array;
}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryPoolsResponseAmino {
  pools?: LendingPoolAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryPoolsResponseAminoMsg {
  type: "/side.lending.QueryPoolsResponse";
  value: QueryPoolsResponseAmino;
}
/** QueryPoolsResponse is response type for the Query/Pools RPC method. */
export interface QueryPoolsResponseSDKType {
  pools: LendingPoolSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryPoolExchangeRateRequest is request type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateRequest {
  poolId: string;
}
export interface QueryPoolExchangeRateRequestProtoMsg {
  typeUrl: "/side.lending.QueryPoolExchangeRateRequest";
  value: Uint8Array;
}
/** QueryPoolExchangeRateRequest is request type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateRequestAmino {
  pool_id?: string;
}
export interface QueryPoolExchangeRateRequestAminoMsg {
  type: "/side.lending.QueryPoolExchangeRateRequest";
  value: QueryPoolExchangeRateRequestAmino;
}
/** QueryPoolExchangeRateRequest is request type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateRequestSDKType {
  pool_id: string;
}
/** QueryPoolExchangeRateResponse is response type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateResponse {
  exchangeRate: string;
}
export interface QueryPoolExchangeRateResponseProtoMsg {
  typeUrl: "/side.lending.QueryPoolExchangeRateResponse";
  value: Uint8Array;
}
/** QueryPoolExchangeRateResponse is response type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateResponseAmino {
  exchange_rate?: string;
}
export interface QueryPoolExchangeRateResponseAminoMsg {
  type: "/side.lending.QueryPoolExchangeRateResponse";
  value: QueryPoolExchangeRateResponseAmino;
}
/** QueryPoolExchangeRateResponse is response type for the Query/PoolExchangeRate RPC method. */
export interface QueryPoolExchangeRateResponseSDKType {
  exchange_rate: string;
}
export interface QueryLiquidationPriceRequest {
  poolId: string;
  collateralAmount: string;
  borrowAmount: string;
  maturity: bigint;
}
export interface QueryLiquidationPriceRequestProtoMsg {
  typeUrl: "/side.lending.QueryLiquidationPriceRequest";
  value: Uint8Array;
}
export interface QueryLiquidationPriceRequestAmino {
  pool_id?: string;
  collateral_amount?: string;
  borrow_amount?: string;
  maturity?: string;
}
export interface QueryLiquidationPriceRequestAminoMsg {
  type: "/side.lending.QueryLiquidationPriceRequest";
  value: QueryLiquidationPriceRequestAmino;
}
export interface QueryLiquidationPriceRequestSDKType {
  pool_id: string;
  collateral_amount: string;
  borrow_amount: string;
  maturity: bigint;
}
export interface QueryLiquidationPriceResponse {
  price: string;
  pair: string;
}
export interface QueryLiquidationPriceResponseProtoMsg {
  typeUrl: "/side.lending.QueryLiquidationPriceResponse";
  value: Uint8Array;
}
export interface QueryLiquidationPriceResponseAmino {
  price?: string;
  pair?: string;
}
export interface QueryLiquidationPriceResponseAminoMsg {
  type: "/side.lending.QueryLiquidationPriceResponse";
  value: QueryLiquidationPriceResponseAmino;
}
export interface QueryLiquidationPriceResponseSDKType {
  price: string;
  pair: string;
}
export interface QueryDlcEventCountRequest {}
export interface QueryDlcEventCountRequestProtoMsg {
  typeUrl: "/side.lending.QueryDlcEventCountRequest";
  value: Uint8Array;
}
export interface QueryDlcEventCountRequestAmino {}
export interface QueryDlcEventCountRequestAminoMsg {
  type: "/side.lending.QueryDlcEventCountRequest";
  value: QueryDlcEventCountRequestAmino;
}
export interface QueryDlcEventCountRequestSDKType {}
export interface QueryDlcEventCountResponse {
  count: bigint;
}
export interface QueryDlcEventCountResponseProtoMsg {
  typeUrl: "/side.lending.QueryDlcEventCountResponse";
  value: Uint8Array;
}
export interface QueryDlcEventCountResponseAmino {
  count?: string;
}
export interface QueryDlcEventCountResponseAminoMsg {
  type: "/side.lending.QueryDlcEventCountResponse";
  value: QueryDlcEventCountResponseAmino;
}
export interface QueryDlcEventCountResponseSDKType {
  count: bigint;
}
export interface QueryLoanCetInfosRequest {
  loanId: string;
  collateralAmount: string;
}
export interface QueryLoanCetInfosRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanCetInfosRequest";
  value: Uint8Array;
}
export interface QueryLoanCetInfosRequestAmino {
  loan_id?: string;
  collateral_amount?: string;
}
export interface QueryLoanCetInfosRequestAminoMsg {
  type: "/side.lending.QueryLoanCetInfosRequest";
  value: QueryLoanCetInfosRequestAmino;
}
export interface QueryLoanCetInfosRequestSDKType {
  loan_id: string;
  collateral_amount: string;
}
export interface QueryLoanCetInfosResponse {
  liquidationCetInfo?: CetInfo;
  defaultLiquidationCetInfo?: CetInfo;
  repaymentCetInfo?: CetInfo;
}
export interface QueryLoanCetInfosResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanCetInfosResponse";
  value: Uint8Array;
}
export interface QueryLoanCetInfosResponseAmino {
  liquidation_cet_info?: CetInfoAmino;
  default_liquidation_cet_info?: CetInfoAmino;
  repayment_cet_info?: CetInfoAmino;
}
export interface QueryLoanCetInfosResponseAminoMsg {
  type: "/side.lending.QueryLoanCetInfosResponse";
  value: QueryLoanCetInfosResponseAmino;
}
export interface QueryLoanCetInfosResponseSDKType {
  liquidation_cet_info?: CetInfoSDKType;
  default_liquidation_cet_info?: CetInfoSDKType;
  repayment_cet_info?: CetInfoSDKType;
}
export interface QueryCollateralAddressRequest {
  borrowerPubkey: string;
  borrowerAuthPubkey: string;
  dcmPubkey: string;
  maturityTime: bigint;
}
export interface QueryCollateralAddressRequestProtoMsg {
  typeUrl: "/side.lending.QueryCollateralAddressRequest";
  value: Uint8Array;
}
export interface QueryCollateralAddressRequestAmino {
  borrower_pubkey?: string;
  borrower_auth_pubkey?: string;
  dcm_pubkey?: string;
  maturity_time?: string;
}
export interface QueryCollateralAddressRequestAminoMsg {
  type: "/side.lending.QueryCollateralAddressRequest";
  value: QueryCollateralAddressRequestAmino;
}
export interface QueryCollateralAddressRequestSDKType {
  borrower_pubkey: string;
  borrower_auth_pubkey: string;
  dcm_pubkey: string;
  maturity_time: bigint;
}
export interface QueryCollateralAddressResponse {
  address: string;
}
export interface QueryCollateralAddressResponseProtoMsg {
  typeUrl: "/side.lending.QueryCollateralAddressResponse";
  value: Uint8Array;
}
export interface QueryCollateralAddressResponseAmino {
  address?: string;
}
export interface QueryCollateralAddressResponseAminoMsg {
  type: "/side.lending.QueryCollateralAddressResponse";
  value: QueryCollateralAddressResponseAmino;
}
export interface QueryCollateralAddressResponseSDKType {
  address: string;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.lending.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.lending.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.lending.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.lending.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryLoanRequest is request type for the Query/Loan RPC method. */
export interface QueryLoanRequest {
  id: string;
}
export interface QueryLoanRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanRequest";
  value: Uint8Array;
}
/** QueryLoanRequest is request type for the Query/Loan RPC method. */
export interface QueryLoanRequestAmino {
  id?: string;
}
export interface QueryLoanRequestAminoMsg {
  type: "/side.lending.QueryLoanRequest";
  value: QueryLoanRequestAmino;
}
/** QueryLoanRequest is request type for the Query/Loan RPC method. */
export interface QueryLoanRequestSDKType {
  id: string;
}
/** QueryLoanResponse is response type for the Query/Loan RPC method. */
export interface QueryLoanResponse {
  loan?: Loan;
}
export interface QueryLoanResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanResponse";
  value: Uint8Array;
}
/** QueryLoanResponse is response type for the Query/Loan RPC method. */
export interface QueryLoanResponseAmino {
  loan?: LoanAmino;
}
export interface QueryLoanResponseAminoMsg {
  type: "/side.lending.QueryLoanResponse";
  value: QueryLoanResponseAmino;
}
/** QueryLoanResponse is response type for the Query/Loan RPC method. */
export interface QueryLoanResponseSDKType {
  loan?: LoanSDKType;
}
/** QueryLoansRequest is request type for the Query/Loans RPC method. */
export interface QueryLoansRequest {
  status: LoanStatus;
  pagination?: PageRequest;
}
export interface QueryLoansRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoansRequest";
  value: Uint8Array;
}
/** QueryLoansRequest is request type for the Query/Loans RPC method. */
export interface QueryLoansRequestAmino {
  status?: LoanStatus;
  pagination?: PageRequestAmino;
}
export interface QueryLoansRequestAminoMsg {
  type: "/side.lending.QueryLoansRequest";
  value: QueryLoansRequestAmino;
}
/** QueryLoansRequest is request type for the Query/Loans RPC method. */
export interface QueryLoansRequestSDKType {
  status: LoanStatus;
  pagination?: PageRequestSDKType;
}
/** QueryLoansResponse is response type for the Query/Loans RPC method. */
export interface QueryLoansResponse {
  loans: Loan[];
  pagination?: PageResponse;
}
export interface QueryLoansResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoansResponse";
  value: Uint8Array;
}
/** QueryLoansResponse is response type for the Query/Loans RPC method. */
export interface QueryLoansResponseAmino {
  loans?: LoanAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryLoansResponseAminoMsg {
  type: "/side.lending.QueryLoansResponse";
  value: QueryLoansResponseAmino;
}
/** QueryLoansResponse is response type for the Query/Loans RPC method. */
export interface QueryLoansResponseSDKType {
  loans: LoanSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryLoansByAddressRequest is request type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressRequest {
  address: string;
  status: LoanStatus;
  pagination?: PageRequest;
}
export interface QueryLoansByAddressRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoansByAddressRequest";
  value: Uint8Array;
}
/** QueryLoansByAddressRequest is request type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressRequestAmino {
  address?: string;
  status?: LoanStatus;
  pagination?: PageRequestAmino;
}
export interface QueryLoansByAddressRequestAminoMsg {
  type: "/side.lending.QueryLoansByAddressRequest";
  value: QueryLoansByAddressRequestAmino;
}
/** QueryLoansByAddressRequest is request type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressRequestSDKType {
  address: string;
  status: LoanStatus;
  pagination?: PageRequestSDKType;
}
/** QueryLoansByAddressResponse is response type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressResponse {
  loans: Loan[];
  pagination?: PageResponse;
}
export interface QueryLoansByAddressResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoansByAddressResponse";
  value: Uint8Array;
}
/** QueryLoansByAddressResponse is response type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressResponseAmino {
  loans?: LoanAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryLoansByAddressResponseAminoMsg {
  type: "/side.lending.QueryLoansByAddressResponse";
  value: QueryLoansByAddressResponseAmino;
}
/** QueryLoansByAddressResponse is response type for the Query/LoansByAddress RPC method. */
export interface QueryLoansByAddressResponseSDKType {
  loans: LoanSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryLoanDlcMetaRequest is request type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaRequest {
  loanId: string;
}
export interface QueryLoanDlcMetaRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanDlcMetaRequest";
  value: Uint8Array;
}
/** QueryLoanDlcMetaRequest is request type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaRequestAmino {
  loan_id?: string;
}
export interface QueryLoanDlcMetaRequestAminoMsg {
  type: "/side.lending.QueryLoanDlcMetaRequest";
  value: QueryLoanDlcMetaRequestAmino;
}
/** QueryLoanDlcMetaRequest is request type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaRequestSDKType {
  loan_id: string;
}
/** QueryLoanDlcMetaResponse is response type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaResponse {
  dlcMeta?: DLCMeta;
}
export interface QueryLoanDlcMetaResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanDlcMetaResponse";
  value: Uint8Array;
}
/** QueryLoanDlcMetaResponse is response type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaResponseAmino {
  dlc_meta?: DLCMetaAmino;
}
export interface QueryLoanDlcMetaResponseAminoMsg {
  type: "/side.lending.QueryLoanDlcMetaResponse";
  value: QueryLoanDlcMetaResponseAmino;
}
/** QueryLoanDlcMetaResponse is response type for the Query/LoanDlcMeta RPC method. */
export interface QueryLoanDlcMetaResponseSDKType {
  dlc_meta?: DLCMetaSDKType;
}
/** QueryLoanAuthorizationRequest is request type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationRequest {
  loanId: string;
  id: bigint;
}
export interface QueryLoanAuthorizationRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanAuthorizationRequest";
  value: Uint8Array;
}
/** QueryLoanAuthorizationRequest is request type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationRequestAmino {
  loan_id?: string;
  id?: string;
}
export interface QueryLoanAuthorizationRequestAminoMsg {
  type: "/side.lending.QueryLoanAuthorizationRequest";
  value: QueryLoanAuthorizationRequestAmino;
}
/** QueryLoanAuthorizationRequest is request type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationRequestSDKType {
  loan_id: string;
  id: bigint;
}
/** QueryLoanAuthorizationResponse is response type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationResponse {
  deposits: DepositLog[];
  status: AuthorizationStatus;
}
export interface QueryLoanAuthorizationResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanAuthorizationResponse";
  value: Uint8Array;
}
/** QueryLoanAuthorizationResponse is response type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationResponseAmino {
  deposits?: DepositLogAmino[];
  status?: AuthorizationStatus;
}
export interface QueryLoanAuthorizationResponseAminoMsg {
  type: "/side.lending.QueryLoanAuthorizationResponse";
  value: QueryLoanAuthorizationResponseAmino;
}
/** QueryLoanAuthorizationResponse is response type for the Query/LoanAuthorization RPC method. */
export interface QueryLoanAuthorizationResponseSDKType {
  deposits: DepositLogSDKType[];
  status: AuthorizationStatus;
}
export interface QueryLoanDepositsRequest {
  loanId: string;
}
export interface QueryLoanDepositsRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanDepositsRequest";
  value: Uint8Array;
}
export interface QueryLoanDepositsRequestAmino {
  loan_id?: string;
}
export interface QueryLoanDepositsRequestAminoMsg {
  type: "/side.lending.QueryLoanDepositsRequest";
  value: QueryLoanDepositsRequestAmino;
}
export interface QueryLoanDepositsRequestSDKType {
  loan_id: string;
}
export interface QueryLoanDepositsResponse {
  deposits: DepositLog[];
}
export interface QueryLoanDepositsResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanDepositsResponse";
  value: Uint8Array;
}
export interface QueryLoanDepositsResponseAmino {
  deposits?: DepositLogAmino[];
}
export interface QueryLoanDepositsResponseAminoMsg {
  type: "/side.lending.QueryLoanDepositsResponse";
  value: QueryLoanDepositsResponseAmino;
}
export interface QueryLoanDepositsResponseSDKType {
  deposits: DepositLogSDKType[];
}
/** QueryRedemptionRequest is request type for the Query/Redemption RPC method. */
export interface QueryRedemptionRequest {
  id: bigint;
}
export interface QueryRedemptionRequestProtoMsg {
  typeUrl: "/side.lending.QueryRedemptionRequest";
  value: Uint8Array;
}
/** QueryRedemptionRequest is request type for the Query/Redemption RPC method. */
export interface QueryRedemptionRequestAmino {
  id?: string;
}
export interface QueryRedemptionRequestAminoMsg {
  type: "/side.lending.QueryRedemptionRequest";
  value: QueryRedemptionRequestAmino;
}
/** QueryRedemptionRequest is request type for the Query/Redemption RPC method. */
export interface QueryRedemptionRequestSDKType {
  id: bigint;
}
/** QueryRedemptionResponse is response type for the Query/Redemption RPC method. */
export interface QueryRedemptionResponse {
  redemption?: Redemption;
}
export interface QueryRedemptionResponseProtoMsg {
  typeUrl: "/side.lending.QueryRedemptionResponse";
  value: Uint8Array;
}
/** QueryRedemptionResponse is response type for the Query/Redemption RPC method. */
export interface QueryRedemptionResponseAmino {
  redemption?: RedemptionAmino;
}
export interface QueryRedemptionResponseAminoMsg {
  type: "/side.lending.QueryRedemptionResponse";
  value: QueryRedemptionResponseAmino;
}
/** QueryRedemptionResponse is response type for the Query/Redemption RPC method. */
export interface QueryRedemptionResponseSDKType {
  redemption?: RedemptionSDKType;
}
export interface QueryRepaymentRequest {
  loanId: string;
}
export interface QueryRepaymentRequestProtoMsg {
  typeUrl: "/side.lending.QueryRepaymentRequest";
  value: Uint8Array;
}
export interface QueryRepaymentRequestAmino {
  loan_id?: string;
}
export interface QueryRepaymentRequestAminoMsg {
  type: "/side.lending.QueryRepaymentRequest";
  value: QueryRepaymentRequestAmino;
}
export interface QueryRepaymentRequestSDKType {
  loan_id: string;
}
export interface QueryRepaymentResponse {
  repayment?: Repayment;
}
export interface QueryRepaymentResponseProtoMsg {
  typeUrl: "/side.lending.QueryRepaymentResponse";
  value: Uint8Array;
}
export interface QueryRepaymentResponseAmino {
  repayment?: RepaymentAmino;
}
export interface QueryRepaymentResponseAminoMsg {
  type: "/side.lending.QueryRepaymentResponse";
  value: QueryRepaymentResponseAmino;
}
export interface QueryRepaymentResponseSDKType {
  repayment?: RepaymentSDKType;
}
export interface QueryCurrentInterestRequest {
  loanId: string;
}
export interface QueryCurrentInterestRequestProtoMsg {
  typeUrl: "/side.lending.QueryCurrentInterestRequest";
  value: Uint8Array;
}
export interface QueryCurrentInterestRequestAmino {
  loan_id?: string;
}
export interface QueryCurrentInterestRequestAminoMsg {
  type: "/side.lending.QueryCurrentInterestRequest";
  value: QueryCurrentInterestRequestAmino;
}
export interface QueryCurrentInterestRequestSDKType {
  loan_id: string;
}
export interface QueryCurrentInterestResponse {
  interest: Coin;
}
export interface QueryCurrentInterestResponseProtoMsg {
  typeUrl: "/side.lending.QueryCurrentInterestResponse";
  value: Uint8Array;
}
export interface QueryCurrentInterestResponseAmino {
  interest?: CoinAmino;
}
export interface QueryCurrentInterestResponseAminoMsg {
  type: "/side.lending.QueryCurrentInterestResponse";
  value: QueryCurrentInterestResponseAmino;
}
export interface QueryCurrentInterestResponseSDKType {
  interest: CoinSDKType;
}
export interface QueryReferrersRequest {
  pagination?: PageRequest;
}
export interface QueryReferrersRequestProtoMsg {
  typeUrl: "/side.lending.QueryReferrersRequest";
  value: Uint8Array;
}
export interface QueryReferrersRequestAmino {
  pagination?: PageRequestAmino;
}
export interface QueryReferrersRequestAminoMsg {
  type: "/side.lending.QueryReferrersRequest";
  value: QueryReferrersRequestAmino;
}
export interface QueryReferrersRequestSDKType {
  pagination?: PageRequestSDKType;
}
export interface QueryReferrersResponse {
  referrers: Referrer[];
  pagination?: PageResponse;
}
export interface QueryReferrersResponseProtoMsg {
  typeUrl: "/side.lending.QueryReferrersResponse";
  value: Uint8Array;
}
export interface QueryReferrersResponseAmino {
  referrers?: ReferrerAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryReferrersResponseAminoMsg {
  type: "/side.lending.QueryReferrersResponse";
  value: QueryReferrersResponseAmino;
}
export interface QueryReferrersResponseSDKType {
  referrers: ReferrerSDKType[];
  pagination?: PageResponseSDKType;
}
function createBaseQueryPoolRequest(): QueryPoolRequest {
  return {
    id: ""
  };
}
export const QueryPoolRequest = {
  typeUrl: "/side.lending.QueryPoolRequest",
  encode(message: QueryPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolRequest>): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    message.id = object.id ?? "";
    return message;
  },
  fromAmino(object: QueryPoolRequestAmino): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    return message;
  },
  toAmino(message: QueryPoolRequest): QueryPoolRequestAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    return obj;
  },
  fromAminoMsg(object: QueryPoolRequestAminoMsg): QueryPoolRequest {
    return QueryPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolRequestProtoMsg): QueryPoolRequest {
    return QueryPoolRequest.decode(message.value);
  },
  toProto(message: QueryPoolRequest): Uint8Array {
    return QueryPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolRequest): QueryPoolRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolRequest",
      value: QueryPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPoolResponse(): QueryPoolResponse {
  return {
    pool: undefined
  };
}
export const QueryPoolResponse = {
  typeUrl: "/side.lending.QueryPoolResponse",
  encode(message: QueryPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      LendingPool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = LendingPool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolResponse>): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool = object.pool !== undefined && object.pool !== null ? LendingPool.fromPartial(object.pool) : undefined;
    return message;
  },
  fromAmino(object: QueryPoolResponseAmino): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = LendingPool.fromAmino(object.pool);
    }
    return message;
  },
  toAmino(message: QueryPoolResponse): QueryPoolResponseAmino {
    const obj: any = {};
    obj.pool = message.pool ? LendingPool.toAmino(message.pool) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPoolResponseAminoMsg): QueryPoolResponse {
    return QueryPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolResponseProtoMsg): QueryPoolResponse {
    return QueryPoolResponse.decode(message.value);
  },
  toProto(message: QueryPoolResponse): Uint8Array {
    return QueryPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolResponse): QueryPoolResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolResponse",
      value: QueryPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPoolsRequest(): QueryPoolsRequest {
  return {
    pagination: undefined
  };
}
export const QueryPoolsRequest = {
  typeUrl: "/side.lending.QueryPoolsRequest",
  encode(message: QueryPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolsRequest>): QueryPoolsRequest {
    const message = createBaseQueryPoolsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPoolsRequestAmino): QueryPoolsRequest {
    const message = createBaseQueryPoolsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPoolsRequest): QueryPoolsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPoolsRequestAminoMsg): QueryPoolsRequest {
    return QueryPoolsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolsRequestProtoMsg): QueryPoolsRequest {
    return QueryPoolsRequest.decode(message.value);
  },
  toProto(message: QueryPoolsRequest): Uint8Array {
    return QueryPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolsRequest): QueryPoolsRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolsRequest",
      value: QueryPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPoolsResponse(): QueryPoolsResponse {
  return {
    pools: [],
    pagination: undefined
  };
}
export const QueryPoolsResponse = {
  typeUrl: "/side.lending.QueryPoolsResponse",
  encode(message: QueryPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pools) {
      LendingPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(LendingPool.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolsResponse>): QueryPoolsResponse {
    const message = createBaseQueryPoolsResponse();
    message.pools = object.pools?.map(e => LendingPool.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPoolsResponseAmino): QueryPoolsResponse {
    const message = createBaseQueryPoolsResponse();
    message.pools = object.pools?.map(e => LendingPool.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPoolsResponse): QueryPoolsResponseAmino {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? LendingPool.toAmino(e) : undefined);
    } else {
      obj.pools = message.pools;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPoolsResponseAminoMsg): QueryPoolsResponse {
    return QueryPoolsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolsResponseProtoMsg): QueryPoolsResponse {
    return QueryPoolsResponse.decode(message.value);
  },
  toProto(message: QueryPoolsResponse): Uint8Array {
    return QueryPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolsResponse): QueryPoolsResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolsResponse",
      value: QueryPoolsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPoolExchangeRateRequest(): QueryPoolExchangeRateRequest {
  return {
    poolId: ""
  };
}
export const QueryPoolExchangeRateRequest = {
  typeUrl: "/side.lending.QueryPoolExchangeRateRequest",
  encode(message: QueryPoolExchangeRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolExchangeRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolExchangeRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolExchangeRateRequest>): QueryPoolExchangeRateRequest {
    const message = createBaseQueryPoolExchangeRateRequest();
    message.poolId = object.poolId ?? "";
    return message;
  },
  fromAmino(object: QueryPoolExchangeRateRequestAmino): QueryPoolExchangeRateRequest {
    const message = createBaseQueryPoolExchangeRateRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    return message;
  },
  toAmino(message: QueryPoolExchangeRateRequest): QueryPoolExchangeRateRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    return obj;
  },
  fromAminoMsg(object: QueryPoolExchangeRateRequestAminoMsg): QueryPoolExchangeRateRequest {
    return QueryPoolExchangeRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolExchangeRateRequestProtoMsg): QueryPoolExchangeRateRequest {
    return QueryPoolExchangeRateRequest.decode(message.value);
  },
  toProto(message: QueryPoolExchangeRateRequest): Uint8Array {
    return QueryPoolExchangeRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolExchangeRateRequest): QueryPoolExchangeRateRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolExchangeRateRequest",
      value: QueryPoolExchangeRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPoolExchangeRateResponse(): QueryPoolExchangeRateResponse {
  return {
    exchangeRate: ""
  };
}
export const QueryPoolExchangeRateResponse = {
  typeUrl: "/side.lending.QueryPoolExchangeRateResponse",
  encode(message: QueryPoolExchangeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.exchangeRate !== "") {
      writer.uint32(10).string(message.exchangeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPoolExchangeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolExchangeRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPoolExchangeRateResponse>): QueryPoolExchangeRateResponse {
    const message = createBaseQueryPoolExchangeRateResponse();
    message.exchangeRate = object.exchangeRate ?? "";
    return message;
  },
  fromAmino(object: QueryPoolExchangeRateResponseAmino): QueryPoolExchangeRateResponse {
    const message = createBaseQueryPoolExchangeRateResponse();
    if (object.exchange_rate !== undefined && object.exchange_rate !== null) {
      message.exchangeRate = object.exchange_rate;
    }
    return message;
  },
  toAmino(message: QueryPoolExchangeRateResponse): QueryPoolExchangeRateResponseAmino {
    const obj: any = {};
    obj.exchange_rate = message.exchangeRate === "" ? undefined : message.exchangeRate;
    return obj;
  },
  fromAminoMsg(object: QueryPoolExchangeRateResponseAminoMsg): QueryPoolExchangeRateResponse {
    return QueryPoolExchangeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPoolExchangeRateResponseProtoMsg): QueryPoolExchangeRateResponse {
    return QueryPoolExchangeRateResponse.decode(message.value);
  },
  toProto(message: QueryPoolExchangeRateResponse): Uint8Array {
    return QueryPoolExchangeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPoolExchangeRateResponse): QueryPoolExchangeRateResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryPoolExchangeRateResponse",
      value: QueryPoolExchangeRateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationPriceRequest(): QueryLiquidationPriceRequest {
  return {
    poolId: "",
    collateralAmount: "",
    borrowAmount: "",
    maturity: BigInt(0)
  };
}
export const QueryLiquidationPriceRequest = {
  typeUrl: "/side.lending.QueryLiquidationPriceRequest",
  encode(message: QueryLiquidationPriceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.collateralAmount !== "") {
      writer.uint32(18).string(message.collateralAmount);
    }
    if (message.borrowAmount !== "") {
      writer.uint32(26).string(message.borrowAmount);
    }
    if (message.maturity !== BigInt(0)) {
      writer.uint32(32).int64(message.maturity);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationPriceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationPriceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.string();
          break;
        case 2:
          message.collateralAmount = reader.string();
          break;
        case 3:
          message.borrowAmount = reader.string();
          break;
        case 4:
          message.maturity = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationPriceRequest>): QueryLiquidationPriceRequest {
    const message = createBaseQueryLiquidationPriceRequest();
    message.poolId = object.poolId ?? "";
    message.collateralAmount = object.collateralAmount ?? "";
    message.borrowAmount = object.borrowAmount ?? "";
    message.maturity = object.maturity !== undefined && object.maturity !== null ? BigInt(object.maturity.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLiquidationPriceRequestAmino): QueryLiquidationPriceRequest {
    const message = createBaseQueryLiquidationPriceRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = object.borrow_amount;
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = BigInt(object.maturity);
    }
    return message;
  },
  toAmino(message: QueryLiquidationPriceRequest): QueryLiquidationPriceRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    obj.borrow_amount = message.borrowAmount === "" ? undefined : message.borrowAmount;
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationPriceRequestAminoMsg): QueryLiquidationPriceRequest {
    return QueryLiquidationPriceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationPriceRequestProtoMsg): QueryLiquidationPriceRequest {
    return QueryLiquidationPriceRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationPriceRequest): Uint8Array {
    return QueryLiquidationPriceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationPriceRequest): QueryLiquidationPriceRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLiquidationPriceRequest",
      value: QueryLiquidationPriceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationPriceResponse(): QueryLiquidationPriceResponse {
  return {
    price: "",
    pair: ""
  };
}
export const QueryLiquidationPriceResponse = {
  typeUrl: "/side.lending.QueryLiquidationPriceResponse",
  encode(message: QueryLiquidationPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.price !== "") {
      writer.uint32(10).string(message.price);
    }
    if (message.pair !== "") {
      writer.uint32(18).string(message.pair);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationPriceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.price = reader.string();
          break;
        case 2:
          message.pair = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationPriceResponse>): QueryLiquidationPriceResponse {
    const message = createBaseQueryLiquidationPriceResponse();
    message.price = object.price ?? "";
    message.pair = object.pair ?? "";
    return message;
  },
  fromAmino(object: QueryLiquidationPriceResponseAmino): QueryLiquidationPriceResponse {
    const message = createBaseQueryLiquidationPriceResponse();
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.pair !== undefined && object.pair !== null) {
      message.pair = object.pair;
    }
    return message;
  },
  toAmino(message: QueryLiquidationPriceResponse): QueryLiquidationPriceResponseAmino {
    const obj: any = {};
    obj.price = message.price === "" ? undefined : message.price;
    obj.pair = message.pair === "" ? undefined : message.pair;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationPriceResponseAminoMsg): QueryLiquidationPriceResponse {
    return QueryLiquidationPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationPriceResponseProtoMsg): QueryLiquidationPriceResponse {
    return QueryLiquidationPriceResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationPriceResponse): Uint8Array {
    return QueryLiquidationPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationPriceResponse): QueryLiquidationPriceResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLiquidationPriceResponse",
      value: QueryLiquidationPriceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDlcEventCountRequest(): QueryDlcEventCountRequest {
  return {};
}
export const QueryDlcEventCountRequest = {
  typeUrl: "/side.lending.QueryDlcEventCountRequest",
  encode(_: QueryDlcEventCountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDlcEventCountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDlcEventCountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryDlcEventCountRequest>): QueryDlcEventCountRequest {
    const message = createBaseQueryDlcEventCountRequest();
    return message;
  },
  fromAmino(_: QueryDlcEventCountRequestAmino): QueryDlcEventCountRequest {
    const message = createBaseQueryDlcEventCountRequest();
    return message;
  },
  toAmino(_: QueryDlcEventCountRequest): QueryDlcEventCountRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDlcEventCountRequestAminoMsg): QueryDlcEventCountRequest {
    return QueryDlcEventCountRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDlcEventCountRequestProtoMsg): QueryDlcEventCountRequest {
    return QueryDlcEventCountRequest.decode(message.value);
  },
  toProto(message: QueryDlcEventCountRequest): Uint8Array {
    return QueryDlcEventCountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDlcEventCountRequest): QueryDlcEventCountRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryDlcEventCountRequest",
      value: QueryDlcEventCountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDlcEventCountResponse(): QueryDlcEventCountResponse {
  return {
    count: BigInt(0)
  };
}
export const QueryDlcEventCountResponse = {
  typeUrl: "/side.lending.QueryDlcEventCountResponse",
  encode(message: QueryDlcEventCountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.count !== BigInt(0)) {
      writer.uint32(8).uint64(message.count);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDlcEventCountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDlcEventCountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.count = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDlcEventCountResponse>): QueryDlcEventCountResponse {
    const message = createBaseQueryDlcEventCountResponse();
    message.count = object.count !== undefined && object.count !== null ? BigInt(object.count.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryDlcEventCountResponseAmino): QueryDlcEventCountResponse {
    const message = createBaseQueryDlcEventCountResponse();
    if (object.count !== undefined && object.count !== null) {
      message.count = BigInt(object.count);
    }
    return message;
  },
  toAmino(message: QueryDlcEventCountResponse): QueryDlcEventCountResponseAmino {
    const obj: any = {};
    obj.count = message.count !== BigInt(0) ? message.count.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDlcEventCountResponseAminoMsg): QueryDlcEventCountResponse {
    return QueryDlcEventCountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDlcEventCountResponseProtoMsg): QueryDlcEventCountResponse {
    return QueryDlcEventCountResponse.decode(message.value);
  },
  toProto(message: QueryDlcEventCountResponse): Uint8Array {
    return QueryDlcEventCountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDlcEventCountResponse): QueryDlcEventCountResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryDlcEventCountResponse",
      value: QueryDlcEventCountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoanCetInfosRequest(): QueryLoanCetInfosRequest {
  return {
    loanId: "",
    collateralAmount: ""
  };
}
export const QueryLoanCetInfosRequest = {
  typeUrl: "/side.lending.QueryLoanCetInfosRequest",
  encode(message: QueryLoanCetInfosRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    if (message.collateralAmount !== "") {
      writer.uint32(18).string(message.collateralAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanCetInfosRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanCetInfosRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        case 2:
          message.collateralAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanCetInfosRequest>): QueryLoanCetInfosRequest {
    const message = createBaseQueryLoanCetInfosRequest();
    message.loanId = object.loanId ?? "";
    message.collateralAmount = object.collateralAmount ?? "";
    return message;
  },
  fromAmino(object: QueryLoanCetInfosRequestAmino): QueryLoanCetInfosRequest {
    const message = createBaseQueryLoanCetInfosRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    return message;
  },
  toAmino(message: QueryLoanCetInfosRequest): QueryLoanCetInfosRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    return obj;
  },
  fromAminoMsg(object: QueryLoanCetInfosRequestAminoMsg): QueryLoanCetInfosRequest {
    return QueryLoanCetInfosRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanCetInfosRequestProtoMsg): QueryLoanCetInfosRequest {
    return QueryLoanCetInfosRequest.decode(message.value);
  },
  toProto(message: QueryLoanCetInfosRequest): Uint8Array {
    return QueryLoanCetInfosRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanCetInfosRequest): QueryLoanCetInfosRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanCetInfosRequest",
      value: QueryLoanCetInfosRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanCetInfosResponse(): QueryLoanCetInfosResponse {
  return {
    liquidationCetInfo: undefined,
    defaultLiquidationCetInfo: undefined,
    repaymentCetInfo: undefined
  };
}
export const QueryLoanCetInfosResponse = {
  typeUrl: "/side.lending.QueryLoanCetInfosResponse",
  encode(message: QueryLoanCetInfosResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationCetInfo !== undefined) {
      CetInfo.encode(message.liquidationCetInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.defaultLiquidationCetInfo !== undefined) {
      CetInfo.encode(message.defaultLiquidationCetInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.repaymentCetInfo !== undefined) {
      CetInfo.encode(message.repaymentCetInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanCetInfosResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanCetInfosResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationCetInfo = CetInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.defaultLiquidationCetInfo = CetInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.repaymentCetInfo = CetInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanCetInfosResponse>): QueryLoanCetInfosResponse {
    const message = createBaseQueryLoanCetInfosResponse();
    message.liquidationCetInfo = object.liquidationCetInfo !== undefined && object.liquidationCetInfo !== null ? CetInfo.fromPartial(object.liquidationCetInfo) : undefined;
    message.defaultLiquidationCetInfo = object.defaultLiquidationCetInfo !== undefined && object.defaultLiquidationCetInfo !== null ? CetInfo.fromPartial(object.defaultLiquidationCetInfo) : undefined;
    message.repaymentCetInfo = object.repaymentCetInfo !== undefined && object.repaymentCetInfo !== null ? CetInfo.fromPartial(object.repaymentCetInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryLoanCetInfosResponseAmino): QueryLoanCetInfosResponse {
    const message = createBaseQueryLoanCetInfosResponse();
    if (object.liquidation_cet_info !== undefined && object.liquidation_cet_info !== null) {
      message.liquidationCetInfo = CetInfo.fromAmino(object.liquidation_cet_info);
    }
    if (object.default_liquidation_cet_info !== undefined && object.default_liquidation_cet_info !== null) {
      message.defaultLiquidationCetInfo = CetInfo.fromAmino(object.default_liquidation_cet_info);
    }
    if (object.repayment_cet_info !== undefined && object.repayment_cet_info !== null) {
      message.repaymentCetInfo = CetInfo.fromAmino(object.repayment_cet_info);
    }
    return message;
  },
  toAmino(message: QueryLoanCetInfosResponse): QueryLoanCetInfosResponseAmino {
    const obj: any = {};
    obj.liquidation_cet_info = message.liquidationCetInfo ? CetInfo.toAmino(message.liquidationCetInfo) : undefined;
    obj.default_liquidation_cet_info = message.defaultLiquidationCetInfo ? CetInfo.toAmino(message.defaultLiquidationCetInfo) : undefined;
    obj.repayment_cet_info = message.repaymentCetInfo ? CetInfo.toAmino(message.repaymentCetInfo) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoanCetInfosResponseAminoMsg): QueryLoanCetInfosResponse {
    return QueryLoanCetInfosResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanCetInfosResponseProtoMsg): QueryLoanCetInfosResponse {
    return QueryLoanCetInfosResponse.decode(message.value);
  },
  toProto(message: QueryLoanCetInfosResponse): Uint8Array {
    return QueryLoanCetInfosResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanCetInfosResponse): QueryLoanCetInfosResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanCetInfosResponse",
      value: QueryLoanCetInfosResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCollateralAddressRequest(): QueryCollateralAddressRequest {
  return {
    borrowerPubkey: "",
    borrowerAuthPubkey: "",
    dcmPubkey: "",
    maturityTime: BigInt(0)
  };
}
export const QueryCollateralAddressRequest = {
  typeUrl: "/side.lending.QueryCollateralAddressRequest",
  encode(message: QueryCollateralAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrowerPubkey !== "") {
      writer.uint32(10).string(message.borrowerPubkey);
    }
    if (message.borrowerAuthPubkey !== "") {
      writer.uint32(18).string(message.borrowerAuthPubkey);
    }
    if (message.dcmPubkey !== "") {
      writer.uint32(26).string(message.dcmPubkey);
    }
    if (message.maturityTime !== BigInt(0)) {
      writer.uint32(32).uint64(message.maturityTime);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollateralAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrowerPubkey = reader.string();
          break;
        case 2:
          message.borrowerAuthPubkey = reader.string();
          break;
        case 3:
          message.dcmPubkey = reader.string();
          break;
        case 4:
          message.maturityTime = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCollateralAddressRequest>): QueryCollateralAddressRequest {
    const message = createBaseQueryCollateralAddressRequest();
    message.borrowerPubkey = object.borrowerPubkey ?? "";
    message.borrowerAuthPubkey = object.borrowerAuthPubkey ?? "";
    message.dcmPubkey = object.dcmPubkey ?? "";
    message.maturityTime = object.maturityTime !== undefined && object.maturityTime !== null ? BigInt(object.maturityTime.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryCollateralAddressRequestAmino): QueryCollateralAddressRequest {
    const message = createBaseQueryCollateralAddressRequest();
    if (object.borrower_pubkey !== undefined && object.borrower_pubkey !== null) {
      message.borrowerPubkey = object.borrower_pubkey;
    }
    if (object.borrower_auth_pubkey !== undefined && object.borrower_auth_pubkey !== null) {
      message.borrowerAuthPubkey = object.borrower_auth_pubkey;
    }
    if (object.dcm_pubkey !== undefined && object.dcm_pubkey !== null) {
      message.dcmPubkey = object.dcm_pubkey;
    }
    if (object.maturity_time !== undefined && object.maturity_time !== null) {
      message.maturityTime = BigInt(object.maturity_time);
    }
    return message;
  },
  toAmino(message: QueryCollateralAddressRequest): QueryCollateralAddressRequestAmino {
    const obj: any = {};
    obj.borrower_pubkey = message.borrowerPubkey === "" ? undefined : message.borrowerPubkey;
    obj.borrower_auth_pubkey = message.borrowerAuthPubkey === "" ? undefined : message.borrowerAuthPubkey;
    obj.dcm_pubkey = message.dcmPubkey === "" ? undefined : message.dcmPubkey;
    obj.maturity_time = message.maturityTime !== BigInt(0) ? message.maturityTime.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCollateralAddressRequestAminoMsg): QueryCollateralAddressRequest {
    return QueryCollateralAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCollateralAddressRequestProtoMsg): QueryCollateralAddressRequest {
    return QueryCollateralAddressRequest.decode(message.value);
  },
  toProto(message: QueryCollateralAddressRequest): Uint8Array {
    return QueryCollateralAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCollateralAddressRequest): QueryCollateralAddressRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryCollateralAddressRequest",
      value: QueryCollateralAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCollateralAddressResponse(): QueryCollateralAddressResponse {
  return {
    address: ""
  };
}
export const QueryCollateralAddressResponse = {
  typeUrl: "/side.lending.QueryCollateralAddressResponse",
  encode(message: QueryCollateralAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCollateralAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollateralAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCollateralAddressResponse>): QueryCollateralAddressResponse {
    const message = createBaseQueryCollateralAddressResponse();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryCollateralAddressResponseAmino): QueryCollateralAddressResponse {
    const message = createBaseQueryCollateralAddressResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryCollateralAddressResponse): QueryCollateralAddressResponseAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryCollateralAddressResponseAminoMsg): QueryCollateralAddressResponse {
    return QueryCollateralAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCollateralAddressResponseProtoMsg): QueryCollateralAddressResponse {
    return QueryCollateralAddressResponse.decode(message.value);
  },
  toProto(message: QueryCollateralAddressResponse): Uint8Array {
    return QueryCollateralAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCollateralAddressResponse): QueryCollateralAddressResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryCollateralAddressResponse",
      value: QueryCollateralAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.lending.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/side.lending.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoanRequest(): QueryLoanRequest {
  return {
    id: ""
  };
}
export const QueryLoanRequest = {
  typeUrl: "/side.lending.QueryLoanRequest",
  encode(message: QueryLoanRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanRequest>): QueryLoanRequest {
    const message = createBaseQueryLoanRequest();
    message.id = object.id ?? "";
    return message;
  },
  fromAmino(object: QueryLoanRequestAmino): QueryLoanRequest {
    const message = createBaseQueryLoanRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    return message;
  },
  toAmino(message: QueryLoanRequest): QueryLoanRequestAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    return obj;
  },
  fromAminoMsg(object: QueryLoanRequestAminoMsg): QueryLoanRequest {
    return QueryLoanRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanRequestProtoMsg): QueryLoanRequest {
    return QueryLoanRequest.decode(message.value);
  },
  toProto(message: QueryLoanRequest): Uint8Array {
    return QueryLoanRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanRequest): QueryLoanRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanRequest",
      value: QueryLoanRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanResponse(): QueryLoanResponse {
  return {
    loan: undefined
  };
}
export const QueryLoanResponse = {
  typeUrl: "/side.lending.QueryLoanResponse",
  encode(message: QueryLoanResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loan !== undefined) {
      Loan.encode(message.loan, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loan = Loan.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanResponse>): QueryLoanResponse {
    const message = createBaseQueryLoanResponse();
    message.loan = object.loan !== undefined && object.loan !== null ? Loan.fromPartial(object.loan) : undefined;
    return message;
  },
  fromAmino(object: QueryLoanResponseAmino): QueryLoanResponse {
    const message = createBaseQueryLoanResponse();
    if (object.loan !== undefined && object.loan !== null) {
      message.loan = Loan.fromAmino(object.loan);
    }
    return message;
  },
  toAmino(message: QueryLoanResponse): QueryLoanResponseAmino {
    const obj: any = {};
    obj.loan = message.loan ? Loan.toAmino(message.loan) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoanResponseAminoMsg): QueryLoanResponse {
    return QueryLoanResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanResponseProtoMsg): QueryLoanResponse {
    return QueryLoanResponse.decode(message.value);
  },
  toProto(message: QueryLoanResponse): Uint8Array {
    return QueryLoanResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanResponse): QueryLoanResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanResponse",
      value: QueryLoanResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoansRequest(): QueryLoansRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QueryLoansRequest = {
  typeUrl: "/side.lending.QueryLoansRequest",
  encode(message: QueryLoansRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoansRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoansRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoansRequest>): QueryLoansRequest {
    const message = createBaseQueryLoansRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLoansRequestAmino): QueryLoansRequest {
    const message = createBaseQueryLoansRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLoansRequest): QueryLoansRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoansRequestAminoMsg): QueryLoansRequest {
    return QueryLoansRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoansRequestProtoMsg): QueryLoansRequest {
    return QueryLoansRequest.decode(message.value);
  },
  toProto(message: QueryLoansRequest): Uint8Array {
    return QueryLoansRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoansRequest): QueryLoansRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoansRequest",
      value: QueryLoansRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoansResponse(): QueryLoansResponse {
  return {
    loans: [],
    pagination: undefined
  };
}
export const QueryLoansResponse = {
  typeUrl: "/side.lending.QueryLoansResponse",
  encode(message: QueryLoansResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.loans) {
      Loan.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoansResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoansResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loans.push(Loan.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoansResponse>): QueryLoansResponse {
    const message = createBaseQueryLoansResponse();
    message.loans = object.loans?.map(e => Loan.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLoansResponseAmino): QueryLoansResponse {
    const message = createBaseQueryLoansResponse();
    message.loans = object.loans?.map(e => Loan.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLoansResponse): QueryLoansResponseAmino {
    const obj: any = {};
    if (message.loans) {
      obj.loans = message.loans.map(e => e ? Loan.toAmino(e) : undefined);
    } else {
      obj.loans = message.loans;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoansResponseAminoMsg): QueryLoansResponse {
    return QueryLoansResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoansResponseProtoMsg): QueryLoansResponse {
    return QueryLoansResponse.decode(message.value);
  },
  toProto(message: QueryLoansResponse): Uint8Array {
    return QueryLoansResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoansResponse): QueryLoansResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoansResponse",
      value: QueryLoansResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoansByAddressRequest(): QueryLoansByAddressRequest {
  return {
    address: "",
    status: 0,
    pagination: undefined
  };
}
export const QueryLoansByAddressRequest = {
  typeUrl: "/side.lending.QueryLoansByAddressRequest",
  encode(message: QueryLoansByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoansByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoansByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoansByAddressRequest>): QueryLoansByAddressRequest {
    const message = createBaseQueryLoansByAddressRequest();
    message.address = object.address ?? "";
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLoansByAddressRequestAmino): QueryLoansByAddressRequest {
    const message = createBaseQueryLoansByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLoansByAddressRequest): QueryLoansByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoansByAddressRequestAminoMsg): QueryLoansByAddressRequest {
    return QueryLoansByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoansByAddressRequestProtoMsg): QueryLoansByAddressRequest {
    return QueryLoansByAddressRequest.decode(message.value);
  },
  toProto(message: QueryLoansByAddressRequest): Uint8Array {
    return QueryLoansByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoansByAddressRequest): QueryLoansByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoansByAddressRequest",
      value: QueryLoansByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoansByAddressResponse(): QueryLoansByAddressResponse {
  return {
    loans: [],
    pagination: undefined
  };
}
export const QueryLoansByAddressResponse = {
  typeUrl: "/side.lending.QueryLoansByAddressResponse",
  encode(message: QueryLoansByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.loans) {
      Loan.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoansByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoansByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loans.push(Loan.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoansByAddressResponse>): QueryLoansByAddressResponse {
    const message = createBaseQueryLoansByAddressResponse();
    message.loans = object.loans?.map(e => Loan.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryLoansByAddressResponseAmino): QueryLoansByAddressResponse {
    const message = createBaseQueryLoansByAddressResponse();
    message.loans = object.loans?.map(e => Loan.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryLoansByAddressResponse): QueryLoansByAddressResponseAmino {
    const obj: any = {};
    if (message.loans) {
      obj.loans = message.loans.map(e => e ? Loan.toAmino(e) : undefined);
    } else {
      obj.loans = message.loans;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoansByAddressResponseAminoMsg): QueryLoansByAddressResponse {
    return QueryLoansByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoansByAddressResponseProtoMsg): QueryLoansByAddressResponse {
    return QueryLoansByAddressResponse.decode(message.value);
  },
  toProto(message: QueryLoansByAddressResponse): Uint8Array {
    return QueryLoansByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoansByAddressResponse): QueryLoansByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoansByAddressResponse",
      value: QueryLoansByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoanDlcMetaRequest(): QueryLoanDlcMetaRequest {
  return {
    loanId: ""
  };
}
export const QueryLoanDlcMetaRequest = {
  typeUrl: "/side.lending.QueryLoanDlcMetaRequest",
  encode(message: QueryLoanDlcMetaRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanDlcMetaRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanDlcMetaRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanDlcMetaRequest>): QueryLoanDlcMetaRequest {
    const message = createBaseQueryLoanDlcMetaRequest();
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: QueryLoanDlcMetaRequestAmino): QueryLoanDlcMetaRequest {
    const message = createBaseQueryLoanDlcMetaRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: QueryLoanDlcMetaRequest): QueryLoanDlcMetaRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: QueryLoanDlcMetaRequestAminoMsg): QueryLoanDlcMetaRequest {
    return QueryLoanDlcMetaRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanDlcMetaRequestProtoMsg): QueryLoanDlcMetaRequest {
    return QueryLoanDlcMetaRequest.decode(message.value);
  },
  toProto(message: QueryLoanDlcMetaRequest): Uint8Array {
    return QueryLoanDlcMetaRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanDlcMetaRequest): QueryLoanDlcMetaRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanDlcMetaRequest",
      value: QueryLoanDlcMetaRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanDlcMetaResponse(): QueryLoanDlcMetaResponse {
  return {
    dlcMeta: undefined
  };
}
export const QueryLoanDlcMetaResponse = {
  typeUrl: "/side.lending.QueryLoanDlcMetaResponse",
  encode(message: QueryLoanDlcMetaResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dlcMeta !== undefined) {
      DLCMeta.encode(message.dlcMeta, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanDlcMetaResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanDlcMetaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dlcMeta = DLCMeta.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanDlcMetaResponse>): QueryLoanDlcMetaResponse {
    const message = createBaseQueryLoanDlcMetaResponse();
    message.dlcMeta = object.dlcMeta !== undefined && object.dlcMeta !== null ? DLCMeta.fromPartial(object.dlcMeta) : undefined;
    return message;
  },
  fromAmino(object: QueryLoanDlcMetaResponseAmino): QueryLoanDlcMetaResponse {
    const message = createBaseQueryLoanDlcMetaResponse();
    if (object.dlc_meta !== undefined && object.dlc_meta !== null) {
      message.dlcMeta = DLCMeta.fromAmino(object.dlc_meta);
    }
    return message;
  },
  toAmino(message: QueryLoanDlcMetaResponse): QueryLoanDlcMetaResponseAmino {
    const obj: any = {};
    obj.dlc_meta = message.dlcMeta ? DLCMeta.toAmino(message.dlcMeta) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoanDlcMetaResponseAminoMsg): QueryLoanDlcMetaResponse {
    return QueryLoanDlcMetaResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanDlcMetaResponseProtoMsg): QueryLoanDlcMetaResponse {
    return QueryLoanDlcMetaResponse.decode(message.value);
  },
  toProto(message: QueryLoanDlcMetaResponse): Uint8Array {
    return QueryLoanDlcMetaResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanDlcMetaResponse): QueryLoanDlcMetaResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanDlcMetaResponse",
      value: QueryLoanDlcMetaResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoanAuthorizationRequest(): QueryLoanAuthorizationRequest {
  return {
    loanId: "",
    id: BigInt(0)
  };
}
export const QueryLoanAuthorizationRequest = {
  typeUrl: "/side.lending.QueryLoanAuthorizationRequest",
  encode(message: QueryLoanAuthorizationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanAuthorizationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanAuthorizationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        case 2:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanAuthorizationRequest>): QueryLoanAuthorizationRequest {
    const message = createBaseQueryLoanAuthorizationRequest();
    message.loanId = object.loanId ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLoanAuthorizationRequestAmino): QueryLoanAuthorizationRequest {
    const message = createBaseQueryLoanAuthorizationRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryLoanAuthorizationRequest): QueryLoanAuthorizationRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoanAuthorizationRequestAminoMsg): QueryLoanAuthorizationRequest {
    return QueryLoanAuthorizationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanAuthorizationRequestProtoMsg): QueryLoanAuthorizationRequest {
    return QueryLoanAuthorizationRequest.decode(message.value);
  },
  toProto(message: QueryLoanAuthorizationRequest): Uint8Array {
    return QueryLoanAuthorizationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanAuthorizationRequest): QueryLoanAuthorizationRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanAuthorizationRequest",
      value: QueryLoanAuthorizationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanAuthorizationResponse(): QueryLoanAuthorizationResponse {
  return {
    deposits: [],
    status: 0
  };
}
export const QueryLoanAuthorizationResponse = {
  typeUrl: "/side.lending.QueryLoanAuthorizationResponse",
  encode(message: QueryLoanAuthorizationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.deposits) {
      DepositLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanAuthorizationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanAuthorizationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(DepositLog.decode(reader, reader.uint32()));
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanAuthorizationResponse>): QueryLoanAuthorizationResponse {
    const message = createBaseQueryLoanAuthorizationResponse();
    message.deposits = object.deposits?.map(e => DepositLog.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QueryLoanAuthorizationResponseAmino): QueryLoanAuthorizationResponse {
    const message = createBaseQueryLoanAuthorizationResponse();
    message.deposits = object.deposits?.map(e => DepositLog.fromAmino(e)) || [];
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QueryLoanAuthorizationResponse): QueryLoanAuthorizationResponseAmino {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map(e => e ? DepositLog.toAmino(e) : undefined);
    } else {
      obj.deposits = message.deposits;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QueryLoanAuthorizationResponseAminoMsg): QueryLoanAuthorizationResponse {
    return QueryLoanAuthorizationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanAuthorizationResponseProtoMsg): QueryLoanAuthorizationResponse {
    return QueryLoanAuthorizationResponse.decode(message.value);
  },
  toProto(message: QueryLoanAuthorizationResponse): Uint8Array {
    return QueryLoanAuthorizationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanAuthorizationResponse): QueryLoanAuthorizationResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanAuthorizationResponse",
      value: QueryLoanAuthorizationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLoanDepositsRequest(): QueryLoanDepositsRequest {
  return {
    loanId: ""
  };
}
export const QueryLoanDepositsRequest = {
  typeUrl: "/side.lending.QueryLoanDepositsRequest",
  encode(message: QueryLoanDepositsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanDepositsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanDepositsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanDepositsRequest>): QueryLoanDepositsRequest {
    const message = createBaseQueryLoanDepositsRequest();
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: QueryLoanDepositsRequestAmino): QueryLoanDepositsRequest {
    const message = createBaseQueryLoanDepositsRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: QueryLoanDepositsRequest): QueryLoanDepositsRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: QueryLoanDepositsRequestAminoMsg): QueryLoanDepositsRequest {
    return QueryLoanDepositsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanDepositsRequestProtoMsg): QueryLoanDepositsRequest {
    return QueryLoanDepositsRequest.decode(message.value);
  },
  toProto(message: QueryLoanDepositsRequest): Uint8Array {
    return QueryLoanDepositsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanDepositsRequest): QueryLoanDepositsRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanDepositsRequest",
      value: QueryLoanDepositsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanDepositsResponse(): QueryLoanDepositsResponse {
  return {
    deposits: []
  };
}
export const QueryLoanDepositsResponse = {
  typeUrl: "/side.lending.QueryLoanDepositsResponse",
  encode(message: QueryLoanDepositsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.deposits) {
      DepositLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanDepositsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanDepositsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposits.push(DepositLog.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanDepositsResponse>): QueryLoanDepositsResponse {
    const message = createBaseQueryLoanDepositsResponse();
    message.deposits = object.deposits?.map(e => DepositLog.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryLoanDepositsResponseAmino): QueryLoanDepositsResponse {
    const message = createBaseQueryLoanDepositsResponse();
    message.deposits = object.deposits?.map(e => DepositLog.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryLoanDepositsResponse): QueryLoanDepositsResponseAmino {
    const obj: any = {};
    if (message.deposits) {
      obj.deposits = message.deposits.map(e => e ? DepositLog.toAmino(e) : undefined);
    } else {
      obj.deposits = message.deposits;
    }
    return obj;
  },
  fromAminoMsg(object: QueryLoanDepositsResponseAminoMsg): QueryLoanDepositsResponse {
    return QueryLoanDepositsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanDepositsResponseProtoMsg): QueryLoanDepositsResponse {
    return QueryLoanDepositsResponse.decode(message.value);
  },
  toProto(message: QueryLoanDepositsResponse): Uint8Array {
    return QueryLoanDepositsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanDepositsResponse): QueryLoanDepositsResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanDepositsResponse",
      value: QueryLoanDepositsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRedemptionRequest(): QueryRedemptionRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryRedemptionRequest = {
  typeUrl: "/side.lending.QueryRedemptionRequest",
  encode(message: QueryRedemptionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRedemptionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedemptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedemptionRequest>): QueryRedemptionRequest {
    const message = createBaseQueryRedemptionRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryRedemptionRequestAmino): QueryRedemptionRequest {
    const message = createBaseQueryRedemptionRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryRedemptionRequest): QueryRedemptionRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRedemptionRequestAminoMsg): QueryRedemptionRequest {
    return QueryRedemptionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedemptionRequestProtoMsg): QueryRedemptionRequest {
    return QueryRedemptionRequest.decode(message.value);
  },
  toProto(message: QueryRedemptionRequest): Uint8Array {
    return QueryRedemptionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRedemptionRequest): QueryRedemptionRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryRedemptionRequest",
      value: QueryRedemptionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRedemptionResponse(): QueryRedemptionResponse {
  return {
    redemption: undefined
  };
}
export const QueryRedemptionResponse = {
  typeUrl: "/side.lending.QueryRedemptionResponse",
  encode(message: QueryRedemptionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.redemption !== undefined) {
      Redemption.encode(message.redemption, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRedemptionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRedemptionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redemption = Redemption.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRedemptionResponse>): QueryRedemptionResponse {
    const message = createBaseQueryRedemptionResponse();
    message.redemption = object.redemption !== undefined && object.redemption !== null ? Redemption.fromPartial(object.redemption) : undefined;
    return message;
  },
  fromAmino(object: QueryRedemptionResponseAmino): QueryRedemptionResponse {
    const message = createBaseQueryRedemptionResponse();
    if (object.redemption !== undefined && object.redemption !== null) {
      message.redemption = Redemption.fromAmino(object.redemption);
    }
    return message;
  },
  toAmino(message: QueryRedemptionResponse): QueryRedemptionResponseAmino {
    const obj: any = {};
    obj.redemption = message.redemption ? Redemption.toAmino(message.redemption) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRedemptionResponseAminoMsg): QueryRedemptionResponse {
    return QueryRedemptionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRedemptionResponseProtoMsg): QueryRedemptionResponse {
    return QueryRedemptionResponse.decode(message.value);
  },
  toProto(message: QueryRedemptionResponse): Uint8Array {
    return QueryRedemptionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRedemptionResponse): QueryRedemptionResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryRedemptionResponse",
      value: QueryRedemptionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRepaymentRequest(): QueryRepaymentRequest {
  return {
    loanId: ""
  };
}
export const QueryRepaymentRequest = {
  typeUrl: "/side.lending.QueryRepaymentRequest",
  encode(message: QueryRepaymentRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRepaymentRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRepaymentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRepaymentRequest>): QueryRepaymentRequest {
    const message = createBaseQueryRepaymentRequest();
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: QueryRepaymentRequestAmino): QueryRepaymentRequest {
    const message = createBaseQueryRepaymentRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: QueryRepaymentRequest): QueryRepaymentRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: QueryRepaymentRequestAminoMsg): QueryRepaymentRequest {
    return QueryRepaymentRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRepaymentRequestProtoMsg): QueryRepaymentRequest {
    return QueryRepaymentRequest.decode(message.value);
  },
  toProto(message: QueryRepaymentRequest): Uint8Array {
    return QueryRepaymentRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRepaymentRequest): QueryRepaymentRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryRepaymentRequest",
      value: QueryRepaymentRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRepaymentResponse(): QueryRepaymentResponse {
  return {
    repayment: undefined
  };
}
export const QueryRepaymentResponse = {
  typeUrl: "/side.lending.QueryRepaymentResponse",
  encode(message: QueryRepaymentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.repayment !== undefined) {
      Repayment.encode(message.repayment, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryRepaymentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRepaymentResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repayment = Repayment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRepaymentResponse>): QueryRepaymentResponse {
    const message = createBaseQueryRepaymentResponse();
    message.repayment = object.repayment !== undefined && object.repayment !== null ? Repayment.fromPartial(object.repayment) : undefined;
    return message;
  },
  fromAmino(object: QueryRepaymentResponseAmino): QueryRepaymentResponse {
    const message = createBaseQueryRepaymentResponse();
    if (object.repayment !== undefined && object.repayment !== null) {
      message.repayment = Repayment.fromAmino(object.repayment);
    }
    return message;
  },
  toAmino(message: QueryRepaymentResponse): QueryRepaymentResponseAmino {
    const obj: any = {};
    obj.repayment = message.repayment ? Repayment.toAmino(message.repayment) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRepaymentResponseAminoMsg): QueryRepaymentResponse {
    return QueryRepaymentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRepaymentResponseProtoMsg): QueryRepaymentResponse {
    return QueryRepaymentResponse.decode(message.value);
  },
  toProto(message: QueryRepaymentResponse): Uint8Array {
    return QueryRepaymentResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRepaymentResponse): QueryRepaymentResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryRepaymentResponse",
      value: QueryRepaymentResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCurrentInterestRequest(): QueryCurrentInterestRequest {
  return {
    loanId: ""
  };
}
export const QueryCurrentInterestRequest = {
  typeUrl: "/side.lending.QueryCurrentInterestRequest",
  encode(message: QueryCurrentInterestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentInterestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentInterestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loanId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCurrentInterestRequest>): QueryCurrentInterestRequest {
    const message = createBaseQueryCurrentInterestRequest();
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: QueryCurrentInterestRequestAmino): QueryCurrentInterestRequest {
    const message = createBaseQueryCurrentInterestRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: QueryCurrentInterestRequest): QueryCurrentInterestRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: QueryCurrentInterestRequestAminoMsg): QueryCurrentInterestRequest {
    return QueryCurrentInterestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCurrentInterestRequestProtoMsg): QueryCurrentInterestRequest {
    return QueryCurrentInterestRequest.decode(message.value);
  },
  toProto(message: QueryCurrentInterestRequest): Uint8Array {
    return QueryCurrentInterestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCurrentInterestRequest): QueryCurrentInterestRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryCurrentInterestRequest",
      value: QueryCurrentInterestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCurrentInterestResponse(): QueryCurrentInterestResponse {
  return {
    interest: Coin.fromPartial({})
  };
}
export const QueryCurrentInterestResponse = {
  typeUrl: "/side.lending.QueryCurrentInterestResponse",
  encode(message: QueryCurrentInterestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interest !== undefined) {
      Coin.encode(message.interest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCurrentInterestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCurrentInterestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interest = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCurrentInterestResponse>): QueryCurrentInterestResponse {
    const message = createBaseQueryCurrentInterestResponse();
    message.interest = object.interest !== undefined && object.interest !== null ? Coin.fromPartial(object.interest) : undefined;
    return message;
  },
  fromAmino(object: QueryCurrentInterestResponseAmino): QueryCurrentInterestResponse {
    const message = createBaseQueryCurrentInterestResponse();
    if (object.interest !== undefined && object.interest !== null) {
      message.interest = Coin.fromAmino(object.interest);
    }
    return message;
  },
  toAmino(message: QueryCurrentInterestResponse): QueryCurrentInterestResponseAmino {
    const obj: any = {};
    obj.interest = message.interest ? Coin.toAmino(message.interest) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCurrentInterestResponseAminoMsg): QueryCurrentInterestResponse {
    return QueryCurrentInterestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCurrentInterestResponseProtoMsg): QueryCurrentInterestResponse {
    return QueryCurrentInterestResponse.decode(message.value);
  },
  toProto(message: QueryCurrentInterestResponse): Uint8Array {
    return QueryCurrentInterestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCurrentInterestResponse): QueryCurrentInterestResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryCurrentInterestResponse",
      value: QueryCurrentInterestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryReferrersRequest(): QueryReferrersRequest {
  return {
    pagination: undefined
  };
}
export const QueryReferrersRequest = {
  typeUrl: "/side.lending.QueryReferrersRequest",
  encode(message: QueryReferrersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryReferrersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferrersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryReferrersRequest>): QueryReferrersRequest {
    const message = createBaseQueryReferrersRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryReferrersRequestAmino): QueryReferrersRequest {
    const message = createBaseQueryReferrersRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryReferrersRequest): QueryReferrersRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryReferrersRequestAminoMsg): QueryReferrersRequest {
    return QueryReferrersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryReferrersRequestProtoMsg): QueryReferrersRequest {
    return QueryReferrersRequest.decode(message.value);
  },
  toProto(message: QueryReferrersRequest): Uint8Array {
    return QueryReferrersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryReferrersRequest): QueryReferrersRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryReferrersRequest",
      value: QueryReferrersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryReferrersResponse(): QueryReferrersResponse {
  return {
    referrers: [],
    pagination: undefined
  };
}
export const QueryReferrersResponse = {
  typeUrl: "/side.lending.QueryReferrersResponse",
  encode(message: QueryReferrersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.referrers) {
      Referrer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryReferrersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryReferrersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referrers.push(Referrer.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryReferrersResponse>): QueryReferrersResponse {
    const message = createBaseQueryReferrersResponse();
    message.referrers = object.referrers?.map(e => Referrer.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryReferrersResponseAmino): QueryReferrersResponse {
    const message = createBaseQueryReferrersResponse();
    message.referrers = object.referrers?.map(e => Referrer.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryReferrersResponse): QueryReferrersResponseAmino {
    const obj: any = {};
    if (message.referrers) {
      obj.referrers = message.referrers.map(e => e ? Referrer.toAmino(e) : undefined);
    } else {
      obj.referrers = message.referrers;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryReferrersResponseAminoMsg): QueryReferrersResponse {
    return QueryReferrersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryReferrersResponseProtoMsg): QueryReferrersResponse {
    return QueryReferrersResponse.decode(message.value);
  },
  toProto(message: QueryReferrersResponse): Uint8Array {
    return QueryReferrersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryReferrersResponse): QueryReferrersResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryReferrersResponse",
      value: QueryReferrersResponse.encode(message).finish()
    };
  }
};