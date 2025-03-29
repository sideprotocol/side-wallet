//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { LoanStatus, LendingPool, LendingPoolAmino, LendingPoolSDKType, CetInfo, CetInfoAmino, CetInfoSDKType, Loan, LoanAmino, LoanSDKType, DLCMeta, DLCMetaAmino, DLCMetaSDKType, Cancellation, CancellationAmino, CancellationSDKType, Repayment, RepaymentAmino, RepaymentSDKType } from "./lending";
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
export interface QueryLiquidationEventRequest {
  poolId: string;
  collateralAmount: string;
  borrowAmount: string;
  term: bigint;
}
export interface QueryLiquidationEventRequestProtoMsg {
  typeUrl: "/side.lending.QueryLiquidationEventRequest";
  value: Uint8Array;
}
export interface QueryLiquidationEventRequestAmino {
  pool_id?: string;
  collateral_amount?: string;
  borrow_amount?: string;
  term?: string;
}
export interface QueryLiquidationEventRequestAminoMsg {
  type: "/side.lending.QueryLiquidationEventRequest";
  value: QueryLiquidationEventRequestAmino;
}
export interface QueryLiquidationEventRequestSDKType {
  pool_id: string;
  collateral_amount: string;
  borrow_amount: string;
  term: bigint;
}
export interface QueryLiquidationEventResponse {
  eventId: bigint;
  oraclePubkey: string;
  nonce: string;
  price: string;
  signaturePoint: string;
}
export interface QueryLiquidationEventResponseProtoMsg {
  typeUrl: "/side.lending.QueryLiquidationEventResponse";
  value: Uint8Array;
}
export interface QueryLiquidationEventResponseAmino {
  event_id?: string;
  oracle_pubkey?: string;
  nonce?: string;
  price?: string;
  signature_point?: string;
}
export interface QueryLiquidationEventResponseAminoMsg {
  type: "/side.lending.QueryLiquidationEventResponse";
  value: QueryLiquidationEventResponseAmino;
}
export interface QueryLiquidationEventResponseSDKType {
  event_id: bigint;
  oracle_pubkey: string;
  nonce: string;
  price: string;
  signature_point: string;
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
  dcmPubkey: string;
  maturityTime: bigint;
}
export interface QueryCollateralAddressRequestProtoMsg {
  typeUrl: "/side.lending.QueryCollateralAddressRequest";
  value: Uint8Array;
}
export interface QueryCollateralAddressRequestAmino {
  borrower_pubkey?: string;
  dcm_pubkey?: string;
  maturity_time?: string;
}
export interface QueryCollateralAddressRequestAminoMsg {
  type: "/side.lending.QueryCollateralAddressRequest";
  value: QueryCollateralAddressRequestAmino;
}
export interface QueryCollateralAddressRequestSDKType {
  borrower_pubkey: string;
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
/** QueryLoanCancellationRequest is request type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationRequest {
  loanId: string;
}
export interface QueryLoanCancellationRequestProtoMsg {
  typeUrl: "/side.lending.QueryLoanCancellationRequest";
  value: Uint8Array;
}
/** QueryLoanCancellationRequest is request type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationRequestAmino {
  loan_id?: string;
}
export interface QueryLoanCancellationRequestAminoMsg {
  type: "/side.lending.QueryLoanCancellationRequest";
  value: QueryLoanCancellationRequestAmino;
}
/** QueryLoanCancellationRequest is request type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationRequestSDKType {
  loan_id: string;
}
/** QueryLoanCancellationResponse is response type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationResponse {
  cancellation?: Cancellation;
}
export interface QueryLoanCancellationResponseProtoMsg {
  typeUrl: "/side.lending.QueryLoanCancellationResponse";
  value: Uint8Array;
}
/** QueryLoanCancellationResponse is response type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationResponseAmino {
  cancellation?: CancellationAmino;
}
export interface QueryLoanCancellationResponseAminoMsg {
  type: "/side.lending.QueryLoanCancellationResponse";
  value: QueryLoanCancellationResponseAmino;
}
/** QueryLoanCancellationResponse is response type for the Query/LoanCancellation RPC method. */
export interface QueryLoanCancellationResponseSDKType {
  cancellation?: CancellationSDKType;
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
function createBaseQueryLiquidationEventRequest(): QueryLiquidationEventRequest {
  return {
    poolId: "",
    collateralAmount: "",
    borrowAmount: "",
    term: BigInt(0)
  };
}
export const QueryLiquidationEventRequest = {
  typeUrl: "/side.lending.QueryLiquidationEventRequest",
  encode(message: QueryLiquidationEventRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== "") {
      writer.uint32(10).string(message.poolId);
    }
    if (message.collateralAmount !== "") {
      writer.uint32(18).string(message.collateralAmount);
    }
    if (message.borrowAmount !== "") {
      writer.uint32(26).string(message.borrowAmount);
    }
    if (message.term !== BigInt(0)) {
      writer.uint32(32).int64(message.term);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationEventRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationEventRequest();
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
          message.term = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationEventRequest>): QueryLiquidationEventRequest {
    const message = createBaseQueryLiquidationEventRequest();
    message.poolId = object.poolId ?? "";
    message.collateralAmount = object.collateralAmount ?? "";
    message.borrowAmount = object.borrowAmount ?? "";
    message.term = object.term !== undefined && object.term !== null ? BigInt(object.term.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryLiquidationEventRequestAmino): QueryLiquidationEventRequest {
    const message = createBaseQueryLiquidationEventRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = object.borrow_amount;
    }
    if (object.term !== undefined && object.term !== null) {
      message.term = BigInt(object.term);
    }
    return message;
  },
  toAmino(message: QueryLiquidationEventRequest): QueryLiquidationEventRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    obj.borrow_amount = message.borrowAmount === "" ? undefined : message.borrowAmount;
    obj.term = message.term !== BigInt(0) ? message.term.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationEventRequestAminoMsg): QueryLiquidationEventRequest {
    return QueryLiquidationEventRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationEventRequestProtoMsg): QueryLiquidationEventRequest {
    return QueryLiquidationEventRequest.decode(message.value);
  },
  toProto(message: QueryLiquidationEventRequest): Uint8Array {
    return QueryLiquidationEventRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationEventRequest): QueryLiquidationEventRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLiquidationEventRequest",
      value: QueryLiquidationEventRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLiquidationEventResponse(): QueryLiquidationEventResponse {
  return {
    eventId: BigInt(0),
    oraclePubkey: "",
    nonce: "",
    price: "",
    signaturePoint: ""
  };
}
export const QueryLiquidationEventResponse = {
  typeUrl: "/side.lending.QueryLiquidationEventResponse",
  encode(message: QueryLiquidationEventResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eventId !== BigInt(0)) {
      writer.uint32(8).uint64(message.eventId);
    }
    if (message.oraclePubkey !== "") {
      writer.uint32(18).string(message.oraclePubkey);
    }
    if (message.nonce !== "") {
      writer.uint32(26).string(message.nonce);
    }
    if (message.price !== "") {
      writer.uint32(34).string(message.price);
    }
    if (message.signaturePoint !== "") {
      writer.uint32(42).string(message.signaturePoint);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLiquidationEventResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLiquidationEventResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.uint64();
          break;
        case 2:
          message.oraclePubkey = reader.string();
          break;
        case 3:
          message.nonce = reader.string();
          break;
        case 4:
          message.price = reader.string();
          break;
        case 5:
          message.signaturePoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLiquidationEventResponse>): QueryLiquidationEventResponse {
    const message = createBaseQueryLiquidationEventResponse();
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    message.oraclePubkey = object.oraclePubkey ?? "";
    message.nonce = object.nonce ?? "";
    message.price = object.price ?? "";
    message.signaturePoint = object.signaturePoint ?? "";
    return message;
  },
  fromAmino(object: QueryLiquidationEventResponseAmino): QueryLiquidationEventResponse {
    const message = createBaseQueryLiquidationEventResponse();
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    if (object.oracle_pubkey !== undefined && object.oracle_pubkey !== null) {
      message.oraclePubkey = object.oracle_pubkey;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    if (object.signature_point !== undefined && object.signature_point !== null) {
      message.signaturePoint = object.signature_point;
    }
    return message;
  },
  toAmino(message: QueryLiquidationEventResponse): QueryLiquidationEventResponseAmino {
    const obj: any = {};
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    obj.oracle_pubkey = message.oraclePubkey === "" ? undefined : message.oraclePubkey;
    obj.nonce = message.nonce === "" ? undefined : message.nonce;
    obj.price = message.price === "" ? undefined : message.price;
    obj.signature_point = message.signaturePoint === "" ? undefined : message.signaturePoint;
    return obj;
  },
  fromAminoMsg(object: QueryLiquidationEventResponseAminoMsg): QueryLiquidationEventResponse {
    return QueryLiquidationEventResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLiquidationEventResponseProtoMsg): QueryLiquidationEventResponse {
    return QueryLiquidationEventResponse.decode(message.value);
  },
  toProto(message: QueryLiquidationEventResponse): Uint8Array {
    return QueryLiquidationEventResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLiquidationEventResponse): QueryLiquidationEventResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLiquidationEventResponse",
      value: QueryLiquidationEventResponse.encode(message).finish()
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
    if (message.dcmPubkey !== "") {
      writer.uint32(18).string(message.dcmPubkey);
    }
    if (message.maturityTime !== BigInt(0)) {
      writer.uint32(24).uint64(message.maturityTime);
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
          message.dcmPubkey = reader.string();
          break;
        case 3:
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
    message.dcmPubkey = object.dcmPubkey ?? "";
    message.maturityTime = object.maturityTime !== undefined && object.maturityTime !== null ? BigInt(object.maturityTime.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryCollateralAddressRequestAmino): QueryCollateralAddressRequest {
    const message = createBaseQueryCollateralAddressRequest();
    if (object.borrower_pubkey !== undefined && object.borrower_pubkey !== null) {
      message.borrowerPubkey = object.borrower_pubkey;
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
function createBaseQueryLoanCancellationRequest(): QueryLoanCancellationRequest {
  return {
    loanId: ""
  };
}
export const QueryLoanCancellationRequest = {
  typeUrl: "/side.lending.QueryLoanCancellationRequest",
  encode(message: QueryLoanCancellationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.loanId !== "") {
      writer.uint32(10).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanCancellationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanCancellationRequest();
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
  fromPartial(object: Partial<QueryLoanCancellationRequest>): QueryLoanCancellationRequest {
    const message = createBaseQueryLoanCancellationRequest();
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: QueryLoanCancellationRequestAmino): QueryLoanCancellationRequest {
    const message = createBaseQueryLoanCancellationRequest();
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: QueryLoanCancellationRequest): QueryLoanCancellationRequestAmino {
    const obj: any = {};
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: QueryLoanCancellationRequestAminoMsg): QueryLoanCancellationRequest {
    return QueryLoanCancellationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanCancellationRequestProtoMsg): QueryLoanCancellationRequest {
    return QueryLoanCancellationRequest.decode(message.value);
  },
  toProto(message: QueryLoanCancellationRequest): Uint8Array {
    return QueryLoanCancellationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanCancellationRequest): QueryLoanCancellationRequestProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanCancellationRequest",
      value: QueryLoanCancellationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLoanCancellationResponse(): QueryLoanCancellationResponse {
  return {
    cancellation: undefined
  };
}
export const QueryLoanCancellationResponse = {
  typeUrl: "/side.lending.QueryLoanCancellationResponse",
  encode(message: QueryLoanCancellationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cancellation !== undefined) {
      Cancellation.encode(message.cancellation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryLoanCancellationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLoanCancellationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cancellation = Cancellation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLoanCancellationResponse>): QueryLoanCancellationResponse {
    const message = createBaseQueryLoanCancellationResponse();
    message.cancellation = object.cancellation !== undefined && object.cancellation !== null ? Cancellation.fromPartial(object.cancellation) : undefined;
    return message;
  },
  fromAmino(object: QueryLoanCancellationResponseAmino): QueryLoanCancellationResponse {
    const message = createBaseQueryLoanCancellationResponse();
    if (object.cancellation !== undefined && object.cancellation !== null) {
      message.cancellation = Cancellation.fromAmino(object.cancellation);
    }
    return message;
  },
  toAmino(message: QueryLoanCancellationResponse): QueryLoanCancellationResponseAmino {
    const obj: any = {};
    obj.cancellation = message.cancellation ? Cancellation.toAmino(message.cancellation) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryLoanCancellationResponseAminoMsg): QueryLoanCancellationResponse {
    return QueryLoanCancellationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryLoanCancellationResponseProtoMsg): QueryLoanCancellationResponse {
    return QueryLoanCancellationResponse.decode(message.value);
  },
  toProto(message: QueryLoanCancellationResponse): Uint8Array {
    return QueryLoanCancellationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLoanCancellationResponse): QueryLoanCancellationResponseProtoMsg {
    return {
      typeUrl: "/side.lending.QueryLoanCancellationResponse",
      value: QueryLoanCancellationResponse.encode(message).finish()
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