//@ts-nocheck
import { PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { SigningStatus, DKGRequestStatus, WithdrawRequest, WithdrawRequestAmino, WithdrawRequestSDKType, SigningRequest, SigningRequestAmino, SigningRequestSDKType, BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, UTXO, UTXOAmino, UTXOSDKType, RuneBalance, RuneBalanceAmino, RuneBalanceSDKType, DKGRequest, DKGRequestAmino, DKGRequestSDKType, DKGCompletionRequest, DKGCompletionRequestAmino, DKGCompletionRequestSDKType } from "./btcbridge";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** QueryWithdrawRequestsByAddressRequest is request type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressRequest {
  address: string;
  pagination?: PageResponse;
}
export interface QueryWithdrawRequestsByAddressRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressRequest";
  value: Uint8Array;
}
/** QueryWithdrawRequestsByAddressRequest is request type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressRequestAmino {
  address?: string;
  pagination?: PageResponseAmino;
}
export interface QueryWithdrawRequestsByAddressRequestAminoMsg {
  type: "/side.btcbridge.QueryWithdrawRequestsByAddressRequest";
  value: QueryWithdrawRequestsByAddressRequestAmino;
}
/** QueryWithdrawRequestsByAddressRequest is request type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressRequestSDKType {
  address: string;
  pagination?: PageResponseSDKType;
}
/** QueryWithdrawRequestsByAddressResponse is response type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressResponse {
  requests: WithdrawRequest[];
  pagination?: PageResponse;
}
export interface QueryWithdrawRequestsByAddressResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressResponse";
  value: Uint8Array;
}
/** QueryWithdrawRequestsByAddressResponse is response type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressResponseAmino {
  requests?: WithdrawRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryWithdrawRequestsByAddressResponseAminoMsg {
  type: "/side.btcbridge.QueryWithdrawRequestsByAddressResponse";
  value: QueryWithdrawRequestsByAddressResponseAmino;
}
/** QueryWithdrawRequestsByAddressResponse is response type for the Query/WithdrawRequestsByAddress RPC method. */
export interface QueryWithdrawRequestsByAddressResponseSDKType {
  requests: WithdrawRequestSDKType[];
  pagination?: PageResponseSDKType;
}
/** QueryWithdrawRequestsByTxHashRequest is request type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashRequest {
  txid: string;
}
export interface QueryWithdrawRequestsByTxHashRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashRequest";
  value: Uint8Array;
}
/** QueryWithdrawRequestsByTxHashRequest is request type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashRequestAmino {
  txid?: string;
}
export interface QueryWithdrawRequestsByTxHashRequestAminoMsg {
  type: "/side.btcbridge.QueryWithdrawRequestsByTxHashRequest";
  value: QueryWithdrawRequestsByTxHashRequestAmino;
}
/** QueryWithdrawRequestsByTxHashRequest is request type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashRequestSDKType {
  txid: string;
}
/** QueryWithdrawRequestsByTxHashResponse is response type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashResponse {
  requests: WithdrawRequest[];
}
export interface QueryWithdrawRequestsByTxHashResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashResponse";
  value: Uint8Array;
}
/** QueryWithdrawRequestsByTxHashResponse is response type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashResponseAmino {
  requests?: WithdrawRequestAmino[];
}
export interface QueryWithdrawRequestsByTxHashResponseAminoMsg {
  type: "/side.btcbridge.QueryWithdrawRequestsByTxHashResponse";
  value: QueryWithdrawRequestsByTxHashResponseAmino;
}
/** QueryWithdrawRequestsByTxHashResponse is response type for the Query/WithdrawRequestsByTxHash RPC method. */
export interface QueryWithdrawRequestsByTxHashResponseSDKType {
  requests: WithdrawRequestSDKType[];
}
/** QueryPendingBtcWithdrawRequestsRequest is request type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsRequest {
  pagination?: PageResponse;
}
export interface QueryPendingBtcWithdrawRequestsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsRequest";
  value: Uint8Array;
}
/** QueryPendingBtcWithdrawRequestsRequest is request type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsRequestAmino {
  pagination?: PageResponseAmino;
}
export interface QueryPendingBtcWithdrawRequestsRequestAminoMsg {
  type: "/side.btcbridge.QueryPendingBtcWithdrawRequestsRequest";
  value: QueryPendingBtcWithdrawRequestsRequestAmino;
}
/** QueryPendingBtcWithdrawRequestsRequest is request type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsRequestSDKType {
  pagination?: PageResponseSDKType;
}
/** QueryPendingBtcWithdrawRequestsResponse is response type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsResponse {
  requests: WithdrawRequest[];
  pagination?: PageResponse;
}
export interface QueryPendingBtcWithdrawRequestsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsResponse";
  value: Uint8Array;
}
/** QueryPendingBtcWithdrawRequestsResponse is response type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsResponseAmino {
  requests?: WithdrawRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QueryPendingBtcWithdrawRequestsResponseAminoMsg {
  type: "/side.btcbridge.QueryPendingBtcWithdrawRequestsResponse";
  value: QueryPendingBtcWithdrawRequestsResponseAmino;
}
/** QueryPendingBtcWithdrawRequestsResponse is response type for the Query/PendingBtcWithdrawRequests RPC method. */
export interface QueryPendingBtcWithdrawRequestsResponseSDKType {
  requests: WithdrawRequestSDKType[];
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestsRequest is request type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsRequest {
  status: SigningStatus;
  pagination?: PageResponse;
}
export interface QuerySigningRequestsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestsRequest";
  value: Uint8Array;
}
/** QuerySigningRequestsRequest is request type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsRequestAmino {
  status?: SigningStatus;
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestsRequestAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestsRequest";
  value: QuerySigningRequestsRequestAmino;
}
/** QuerySigningRequestsRequest is request type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsRequestSDKType {
  status: SigningStatus;
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestsResponse is response type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsResponse {
  requests: SigningRequest[];
  pagination?: PageResponse;
}
export interface QuerySigningRequestsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestsResponse";
  value: Uint8Array;
}
/** QuerySigningRequestsResponse is response type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsResponseAmino {
  requests?: SigningRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestsResponseAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestsResponse";
  value: QuerySigningRequestsResponseAmino;
}
/** QuerySigningRequestsResponse is response type for the Query/SigningRequests RPC method. */
export interface QuerySigningRequestsResponseSDKType {
  requests: SigningRequestSDKType[];
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestsByAddressRequest is request type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressRequest {
  address: string;
  pagination?: PageResponse;
}
export interface QuerySigningRequestsByAddressRequestProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressRequest";
  value: Uint8Array;
}
/** QuerySigningRequestsByAddressRequest is request type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressRequestAmino {
  address?: string;
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestsByAddressRequestAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestsByAddressRequest";
  value: QuerySigningRequestsByAddressRequestAmino;
}
/** QuerySigningRequestsByAddressRequest is request type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressRequestSDKType {
  address: string;
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestsByAddressResponse is response type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressResponse {
  requests: SigningRequest[];
  pagination?: PageResponse;
}
export interface QuerySigningRequestsByAddressResponseProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressResponse";
  value: Uint8Array;
}
/** QuerySigningRequestsByAddressResponse is response type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressResponseAmino {
  requests?: SigningRequestAmino[];
  pagination?: PageResponseAmino;
}
export interface QuerySigningRequestsByAddressResponseAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestsByAddressResponse";
  value: QuerySigningRequestsByAddressResponseAmino;
}
/** QuerySigningRequestsByAddressResponse is response type for the Query/SigningRequestsByAddress RPC method. */
export interface QuerySigningRequestsByAddressResponseSDKType {
  requests: SigningRequestSDKType[];
  pagination?: PageResponseSDKType;
}
/** QuerySigningRequestByTxHashRequest is request type for the Query/SigningRequestByTxHash RPC method. */
export interface QuerySigningRequestByTxHashRequest {
  txid: string;
}
export interface QuerySigningRequestByTxHashRequestProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashRequest";
  value: Uint8Array;
}
/** QuerySigningRequestByTxHashRequest is request type for the Query/SigningRequestByTxHash RPC method. */
export interface QuerySigningRequestByTxHashRequestAmino {
  txid?: string;
}
export interface QuerySigningRequestByTxHashRequestAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestByTxHashRequest";
  value: QuerySigningRequestByTxHashRequestAmino;
}
/** QuerySigningRequestByTxHashRequest is request type for the Query/SigningRequestByTxHash RPC method. */
export interface QuerySigningRequestByTxHashRequestSDKType {
  txid: string;
}
/** QuerySigningRequestByTxHashResponse is response type for the Query/SigningRequestByTxHashResponse RPC method. */
export interface QuerySigningRequestByTxHashResponse {
  request?: SigningRequest;
}
export interface QuerySigningRequestByTxHashResponseProtoMsg {
  typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashResponse";
  value: Uint8Array;
}
/** QuerySigningRequestByTxHashResponse is response type for the Query/SigningRequestByTxHashResponse RPC method. */
export interface QuerySigningRequestByTxHashResponseAmino {
  request?: SigningRequestAmino;
}
export interface QuerySigningRequestByTxHashResponseAminoMsg {
  type: "/side.btcbridge.QuerySigningRequestByTxHashResponse";
  value: QuerySigningRequestByTxHashResponseAmino;
}
/** QuerySigningRequestByTxHashResponse is response type for the Query/SigningRequestByTxHashResponse RPC method. */
export interface QuerySigningRequestByTxHashResponseSDKType {
  request?: SigningRequestSDKType;
}
/** QueryFeeRateRequest is request type for the Query/FeeRate RPC method. */
export interface QueryFeeRateRequest {}
export interface QueryFeeRateRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryFeeRateRequest";
  value: Uint8Array;
}
/** QueryFeeRateRequest is request type for the Query/FeeRate RPC method. */
export interface QueryFeeRateRequestAmino {}
export interface QueryFeeRateRequestAminoMsg {
  type: "/side.btcbridge.QueryFeeRateRequest";
  value: QueryFeeRateRequestAmino;
}
/** QueryFeeRateRequest is request type for the Query/FeeRate RPC method. */
export interface QueryFeeRateRequestSDKType {}
/** QueryFeeRateResponse is response type for the Query/FeeRate RPC method. */
export interface QueryFeeRateResponse {
  feeRate: bigint;
}
export interface QueryFeeRateResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryFeeRateResponse";
  value: Uint8Array;
}
/** QueryFeeRateResponse is response type for the Query/FeeRate RPC method. */
export interface QueryFeeRateResponseAmino {
  fee_rate?: string;
}
export interface QueryFeeRateResponseAminoMsg {
  type: "/side.btcbridge.QueryFeeRateResponse";
  value: QueryFeeRateResponseAmino;
}
/** QueryFeeRateResponse is response type for the Query/FeeRate RPC method. */
export interface QueryFeeRateResponseSDKType {
  fee_rate: bigint;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/side.btcbridge.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino;
}
export interface QueryParamsResponseAminoMsg {
  type: "/side.btcbridge.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequest {}
export interface QueryChainTipRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryChainTipRequest";
  value: Uint8Array;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequestAmino {}
export interface QueryChainTipRequestAminoMsg {
  type: "/side.btcbridge.QueryChainTipRequest";
  value: QueryChainTipRequestAmino;
}
/** QueryChainTipRequest is request type for the Query/ChainTip RPC method. */
export interface QueryChainTipRequestSDKType {}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponse {
  hash: string;
  height: bigint;
}
export interface QueryChainTipResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryChainTipResponse";
  value: Uint8Array;
}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponseAmino {
  hash?: string;
  height?: string;
}
export interface QueryChainTipResponseAminoMsg {
  type: "/side.btcbridge.QueryChainTipResponse";
  value: QueryChainTipResponseAmino;
}
/** QueryChainTipResponse is response type for the Query/ChainTip RPC method. */
export interface QueryChainTipResponseSDKType {
  hash: string;
  height: bigint;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequest {
  height: bigint;
}
export interface QueryBlockHeaderByHeightRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightRequest";
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequestAmino {
  height?: string;
}
export interface QueryBlockHeaderByHeightRequestAminoMsg {
  type: "/side.btcbridge.QueryBlockHeaderByHeightRequest";
  value: QueryBlockHeaderByHeightRequestAmino;
}
/** QueryBlockHeaderByHeightRequest is the request type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightRequestSDKType {
  height: bigint;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponse {
  blockHeader?: BlockHeader;
}
export interface QueryBlockHeaderByHeightResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightResponse";
  value: Uint8Array;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHeightResponseAminoMsg {
  type: "/side.btcbridge.QueryBlockHeaderByHeightResponse";
  value: QueryBlockHeaderByHeightResponseAmino;
}
/** QueryBlockHeaderByHeightResponse is the response type for the Query/BlockHeaderByHeight RPC method. */
export interface QueryBlockHeaderByHeightResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequest {
  hash: string;
}
export interface QueryBlockHeaderByHashRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHashRequest";
  value: Uint8Array;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequestAmino {
  hash?: string;
}
export interface QueryBlockHeaderByHashRequestAminoMsg {
  type: "/side.btcbridge.QueryBlockHeaderByHashRequest";
  value: QueryBlockHeaderByHashRequestAmino;
}
/** QueryBlockHeaderByHashRequest is the request type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashRequestSDKType {
  hash: string;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponse {
  blockHeader?: BlockHeader;
}
export interface QueryBlockHeaderByHashResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHashResponse";
  value: Uint8Array;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseAmino {
  block_header?: BlockHeaderAmino;
}
export interface QueryBlockHeaderByHashResponseAminoMsg {
  type: "/side.btcbridge.QueryBlockHeaderByHashResponse";
  value: QueryBlockHeaderByHashResponseAmino;
}
/** QueryBlockHeaderByHashResponse is the response type for the Query/BlockHeaderByHash RPC method. */
export interface QueryBlockHeaderByHashResponseSDKType {
  block_header?: BlockHeaderSDKType;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequest {}
export interface QueryUTXOsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOsRequest";
  value: Uint8Array;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequestAmino {}
export interface QueryUTXOsRequestAminoMsg {
  type: "/side.btcbridge.QueryUTXOsRequest";
  value: QueryUTXOsRequestAmino;
}
/** QueryUTXOsRequest is the request type for the Query/UTXOs RPC method. */
export interface QueryUTXOsRequestSDKType {}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponse {
  utxos: UTXO[];
}
export interface QueryUTXOsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOsResponse";
  value: Uint8Array;
}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponseAmino {
  utxos?: UTXOAmino[];
}
export interface QueryUTXOsResponseAminoMsg {
  type: "/side.btcbridge.QueryUTXOsResponse";
  value: QueryUTXOsResponseAmino;
}
/** QueryUTXOsResponse is the response type for the Query/UTXOs RPC method. */
export interface QueryUTXOsResponseSDKType {
  utxos: UTXOSDKType[];
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequest {
  address: string;
}
export interface QueryUTXOsByAddressRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOsByAddressRequest";
  value: Uint8Array;
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequestAmino {
  address?: string;
}
export interface QueryUTXOsByAddressRequestAminoMsg {
  type: "/side.btcbridge.QueryUTXOsByAddressRequest";
  value: QueryUTXOsByAddressRequestAmino;
}
/** QueryUTXOsByAddressRequest is the request type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressRequestSDKType {
  address: string;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponse {
  utxos: UTXO[];
}
export interface QueryUTXOsByAddressResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOsByAddressResponse";
  value: Uint8Array;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponseAmino {
  utxos?: UTXOAmino[];
}
export interface QueryUTXOsByAddressResponseAminoMsg {
  type: "/side.btcbridge.QueryUTXOsByAddressResponse";
  value: QueryUTXOsByAddressResponseAmino;
}
/** QueryUTXOsByAddressResponse is the response type for the Query/UTXOsByAddress RPC method. */
export interface QueryUTXOsByAddressResponseSDKType {
  utxos: UTXOSDKType[];
}
/** QueryUTXOCountAndBalancesByAddressRequest is the request type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressRequest {
  address: string;
}
export interface QueryUTXOCountAndBalancesByAddressRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressRequest";
  value: Uint8Array;
}
/** QueryUTXOCountAndBalancesByAddressRequest is the request type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressRequestAmino {
  address?: string;
}
export interface QueryUTXOCountAndBalancesByAddressRequestAminoMsg {
  type: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressRequest";
  value: QueryUTXOCountAndBalancesByAddressRequestAmino;
}
/** QueryUTXOCountAndBalancesByAddressRequest is the request type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressRequestSDKType {
  address: string;
}
/** QueryUTXOCountAndBalancesByAddressResponse is the response type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressResponse {
  count: number;
  value: bigint;
  runeBalances: RuneBalance[];
}
export interface QueryUTXOCountAndBalancesByAddressResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressResponse";
  value: Uint8Array;
}
/** QueryUTXOCountAndBalancesByAddressResponse is the response type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressResponseAmino {
  count?: number;
  value?: string;
  runeBalances?: RuneBalanceAmino[];
}
export interface QueryUTXOCountAndBalancesByAddressResponseAminoMsg {
  type: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressResponse";
  value: QueryUTXOCountAndBalancesByAddressResponseAmino;
}
/** QueryUTXOCountAndBalancesByAddressResponse is the response type for the Query/UTXOCountAndBalancesByAddress RPC method. */
export interface QueryUTXOCountAndBalancesByAddressResponseSDKType {
  count: number;
  value: bigint;
  runeBalances: RuneBalanceSDKType[];
}
/** QueryDKGRequestRequest is the request type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestRequest {
  id: bigint;
}
export interface QueryDKGRequestRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGRequestRequest";
  value: Uint8Array;
}
/** QueryDKGRequestRequest is the request type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestRequestAmino {
  id?: string;
}
export interface QueryDKGRequestRequestAminoMsg {
  type: "/side.btcbridge.QueryDKGRequestRequest";
  value: QueryDKGRequestRequestAmino;
}
/** QueryDKGRequestRequest is the request type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestRequestSDKType {
  id: bigint;
}
/** QueryDKGRequestResponse is the response type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestResponse {
  request?: DKGRequest;
}
export interface QueryDKGRequestResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGRequestResponse";
  value: Uint8Array;
}
/** QueryDKGRequestResponse is the response type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestResponseAmino {
  request?: DKGRequestAmino;
}
export interface QueryDKGRequestResponseAminoMsg {
  type: "/side.btcbridge.QueryDKGRequestResponse";
  value: QueryDKGRequestResponseAmino;
}
/** QueryDKGRequestResponse is the response type for the Query/DKGRequest RPC method. */
export interface QueryDKGRequestResponseSDKType {
  request?: DKGRequestSDKType;
}
/** QueryDKGRequestsRequest is the request type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsRequest {
  status: DKGRequestStatus;
}
export interface QueryDKGRequestsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGRequestsRequest";
  value: Uint8Array;
}
/** QueryDKGRequestsRequest is the request type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsRequestAmino {
  status?: DKGRequestStatus;
}
export interface QueryDKGRequestsRequestAminoMsg {
  type: "/side.btcbridge.QueryDKGRequestsRequest";
  value: QueryDKGRequestsRequestAmino;
}
/** QueryDKGRequestsRequest is the request type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsRequestSDKType {
  status: DKGRequestStatus;
}
/** QueryDKGRequestsResponse is the response type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsResponse {
  requests: DKGRequest[];
}
export interface QueryDKGRequestsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGRequestsResponse";
  value: Uint8Array;
}
/** QueryDKGRequestsResponse is the response type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsResponseAmino {
  requests?: DKGRequestAmino[];
}
export interface QueryDKGRequestsResponseAminoMsg {
  type: "/side.btcbridge.QueryDKGRequestsResponse";
  value: QueryDKGRequestsResponseAmino;
}
/** QueryDKGRequestsResponse is the response type for the Query/DKGRequests RPC method. */
export interface QueryDKGRequestsResponseSDKType {
  requests: DKGRequestSDKType[];
}
/** QueryAllDKGRequestsRequest is the request type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsRequest {}
export interface QueryAllDKGRequestsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryAllDKGRequestsRequest";
  value: Uint8Array;
}
/** QueryAllDKGRequestsRequest is the request type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsRequestAmino {}
export interface QueryAllDKGRequestsRequestAminoMsg {
  type: "/side.btcbridge.QueryAllDKGRequestsRequest";
  value: QueryAllDKGRequestsRequestAmino;
}
/** QueryAllDKGRequestsRequest is the request type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsRequestSDKType {}
/** QueryAllDKGRequestsResponse is the response type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsResponse {
  requests: DKGRequest[];
}
export interface QueryAllDKGRequestsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryAllDKGRequestsResponse";
  value: Uint8Array;
}
/** QueryAllDKGRequestsResponse is the response type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsResponseAmino {
  requests?: DKGRequestAmino[];
}
export interface QueryAllDKGRequestsResponseAminoMsg {
  type: "/side.btcbridge.QueryAllDKGRequestsResponse";
  value: QueryAllDKGRequestsResponseAmino;
}
/** QueryAllDKGRequestsResponse is the response type for the Query/AllDKGRequests RPC method. */
export interface QueryAllDKGRequestsResponseSDKType {
  requests: DKGRequestSDKType[];
}
/** QueryDKGCompletionRequestsRequest is the request type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsRequest {
  id: bigint;
}
export interface QueryDKGCompletionRequestsRequestProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsRequest";
  value: Uint8Array;
}
/** QueryDKGCompletionRequestsRequest is the request type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsRequestAmino {
  id?: string;
}
export interface QueryDKGCompletionRequestsRequestAminoMsg {
  type: "/side.btcbridge.QueryDKGCompletionRequestsRequest";
  value: QueryDKGCompletionRequestsRequestAmino;
}
/** QueryDKGCompletionRequestsRequest is the request type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsRequestSDKType {
  id: bigint;
}
/** QueryDKGCompletionRequestsResponse is the response type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsResponse {
  requests: DKGCompletionRequest[];
}
export interface QueryDKGCompletionRequestsResponseProtoMsg {
  typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsResponse";
  value: Uint8Array;
}
/** QueryDKGCompletionRequestsResponse is the response type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsResponseAmino {
  requests?: DKGCompletionRequestAmino[];
}
export interface QueryDKGCompletionRequestsResponseAminoMsg {
  type: "/side.btcbridge.QueryDKGCompletionRequestsResponse";
  value: QueryDKGCompletionRequestsResponseAmino;
}
/** QueryDKGCompletionRequestsResponse is the response type for the Query/DKGCompletionRequests RPC method. */
export interface QueryDKGCompletionRequestsResponseSDKType {
  requests: DKGCompletionRequestSDKType[];
}
function createBaseQueryWithdrawRequestsByAddressRequest(): QueryWithdrawRequestsByAddressRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryWithdrawRequestsByAddressRequest = {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressRequest",
  encode(message: QueryWithdrawRequestsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawRequestsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawRequestsByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QueryWithdrawRequestsByAddressRequest>): QueryWithdrawRequestsByAddressRequest {
    const message = createBaseQueryWithdrawRequestsByAddressRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryWithdrawRequestsByAddressRequestAmino): QueryWithdrawRequestsByAddressRequest {
    const message = createBaseQueryWithdrawRequestsByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryWithdrawRequestsByAddressRequest): QueryWithdrawRequestsByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawRequestsByAddressRequestAminoMsg): QueryWithdrawRequestsByAddressRequest {
    return QueryWithdrawRequestsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawRequestsByAddressRequestProtoMsg): QueryWithdrawRequestsByAddressRequest {
    return QueryWithdrawRequestsByAddressRequest.decode(message.value);
  },
  toProto(message: QueryWithdrawRequestsByAddressRequest): Uint8Array {
    return QueryWithdrawRequestsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawRequestsByAddressRequest): QueryWithdrawRequestsByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressRequest",
      value: QueryWithdrawRequestsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryWithdrawRequestsByAddressResponse(): QueryWithdrawRequestsByAddressResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QueryWithdrawRequestsByAddressResponse = {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressResponse",
  encode(message: QueryWithdrawRequestsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      WithdrawRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawRequestsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawRequestsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(WithdrawRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryWithdrawRequestsByAddressResponse>): QueryWithdrawRequestsByAddressResponse {
    const message = createBaseQueryWithdrawRequestsByAddressResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryWithdrawRequestsByAddressResponseAmino): QueryWithdrawRequestsByAddressResponse {
    const message = createBaseQueryWithdrawRequestsByAddressResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryWithdrawRequestsByAddressResponse): QueryWithdrawRequestsByAddressResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? WithdrawRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawRequestsByAddressResponseAminoMsg): QueryWithdrawRequestsByAddressResponse {
    return QueryWithdrawRequestsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawRequestsByAddressResponseProtoMsg): QueryWithdrawRequestsByAddressResponse {
    return QueryWithdrawRequestsByAddressResponse.decode(message.value);
  },
  toProto(message: QueryWithdrawRequestsByAddressResponse): Uint8Array {
    return QueryWithdrawRequestsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawRequestsByAddressResponse): QueryWithdrawRequestsByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryWithdrawRequestsByAddressResponse",
      value: QueryWithdrawRequestsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryWithdrawRequestsByTxHashRequest(): QueryWithdrawRequestsByTxHashRequest {
  return {
    txid: ""
  };
}
export const QueryWithdrawRequestsByTxHashRequest = {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashRequest",
  encode(message: QueryWithdrawRequestsByTxHashRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txid !== "") {
      writer.uint32(10).string(message.txid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawRequestsByTxHashRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawRequestsByTxHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryWithdrawRequestsByTxHashRequest>): QueryWithdrawRequestsByTxHashRequest {
    const message = createBaseQueryWithdrawRequestsByTxHashRequest();
    message.txid = object.txid ?? "";
    return message;
  },
  fromAmino(object: QueryWithdrawRequestsByTxHashRequestAmino): QueryWithdrawRequestsByTxHashRequest {
    const message = createBaseQueryWithdrawRequestsByTxHashRequest();
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    return message;
  },
  toAmino(message: QueryWithdrawRequestsByTxHashRequest): QueryWithdrawRequestsByTxHashRequestAmino {
    const obj: any = {};
    obj.txid = message.txid === "" ? undefined : message.txid;
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawRequestsByTxHashRequestAminoMsg): QueryWithdrawRequestsByTxHashRequest {
    return QueryWithdrawRequestsByTxHashRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawRequestsByTxHashRequestProtoMsg): QueryWithdrawRequestsByTxHashRequest {
    return QueryWithdrawRequestsByTxHashRequest.decode(message.value);
  },
  toProto(message: QueryWithdrawRequestsByTxHashRequest): Uint8Array {
    return QueryWithdrawRequestsByTxHashRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawRequestsByTxHashRequest): QueryWithdrawRequestsByTxHashRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashRequest",
      value: QueryWithdrawRequestsByTxHashRequest.encode(message).finish()
    };
  }
};
function createBaseQueryWithdrawRequestsByTxHashResponse(): QueryWithdrawRequestsByTxHashResponse {
  return {
    requests: []
  };
}
export const QueryWithdrawRequestsByTxHashResponse = {
  typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashResponse",
  encode(message: QueryWithdrawRequestsByTxHashResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      WithdrawRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryWithdrawRequestsByTxHashResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWithdrawRequestsByTxHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(WithdrawRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryWithdrawRequestsByTxHashResponse>): QueryWithdrawRequestsByTxHashResponse {
    const message = createBaseQueryWithdrawRequestsByTxHashResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryWithdrawRequestsByTxHashResponseAmino): QueryWithdrawRequestsByTxHashResponse {
    const message = createBaseQueryWithdrawRequestsByTxHashResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryWithdrawRequestsByTxHashResponse): QueryWithdrawRequestsByTxHashResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? WithdrawRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    return obj;
  },
  fromAminoMsg(object: QueryWithdrawRequestsByTxHashResponseAminoMsg): QueryWithdrawRequestsByTxHashResponse {
    return QueryWithdrawRequestsByTxHashResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryWithdrawRequestsByTxHashResponseProtoMsg): QueryWithdrawRequestsByTxHashResponse {
    return QueryWithdrawRequestsByTxHashResponse.decode(message.value);
  },
  toProto(message: QueryWithdrawRequestsByTxHashResponse): Uint8Array {
    return QueryWithdrawRequestsByTxHashResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryWithdrawRequestsByTxHashResponse): QueryWithdrawRequestsByTxHashResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryWithdrawRequestsByTxHashResponse",
      value: QueryWithdrawRequestsByTxHashResponse.encode(message).finish()
    };
  }
};
function createBaseQueryPendingBtcWithdrawRequestsRequest(): QueryPendingBtcWithdrawRequestsRequest {
  return {
    pagination: undefined
  };
}
export const QueryPendingBtcWithdrawRequestsRequest = {
  typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsRequest",
  encode(message: QueryPendingBtcWithdrawRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingBtcWithdrawRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingBtcWithdrawRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryPendingBtcWithdrawRequestsRequest>): QueryPendingBtcWithdrawRequestsRequest {
    const message = createBaseQueryPendingBtcWithdrawRequestsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPendingBtcWithdrawRequestsRequestAmino): QueryPendingBtcWithdrawRequestsRequest {
    const message = createBaseQueryPendingBtcWithdrawRequestsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPendingBtcWithdrawRequestsRequest): QueryPendingBtcWithdrawRequestsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingBtcWithdrawRequestsRequestAminoMsg): QueryPendingBtcWithdrawRequestsRequest {
    return QueryPendingBtcWithdrawRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingBtcWithdrawRequestsRequestProtoMsg): QueryPendingBtcWithdrawRequestsRequest {
    return QueryPendingBtcWithdrawRequestsRequest.decode(message.value);
  },
  toProto(message: QueryPendingBtcWithdrawRequestsRequest): Uint8Array {
    return QueryPendingBtcWithdrawRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingBtcWithdrawRequestsRequest): QueryPendingBtcWithdrawRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsRequest",
      value: QueryPendingBtcWithdrawRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryPendingBtcWithdrawRequestsResponse(): QueryPendingBtcWithdrawRequestsResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QueryPendingBtcWithdrawRequestsResponse = {
  typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsResponse",
  encode(message: QueryPendingBtcWithdrawRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      WithdrawRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryPendingBtcWithdrawRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPendingBtcWithdrawRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(WithdrawRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryPendingBtcWithdrawRequestsResponse>): QueryPendingBtcWithdrawRequestsResponse {
    const message = createBaseQueryPendingBtcWithdrawRequestsResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryPendingBtcWithdrawRequestsResponseAmino): QueryPendingBtcWithdrawRequestsResponse {
    const message = createBaseQueryPendingBtcWithdrawRequestsResponse();
    message.requests = object.requests?.map(e => WithdrawRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryPendingBtcWithdrawRequestsResponse): QueryPendingBtcWithdrawRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? WithdrawRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryPendingBtcWithdrawRequestsResponseAminoMsg): QueryPendingBtcWithdrawRequestsResponse {
    return QueryPendingBtcWithdrawRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryPendingBtcWithdrawRequestsResponseProtoMsg): QueryPendingBtcWithdrawRequestsResponse {
    return QueryPendingBtcWithdrawRequestsResponse.decode(message.value);
  },
  toProto(message: QueryPendingBtcWithdrawRequestsResponse): Uint8Array {
    return QueryPendingBtcWithdrawRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryPendingBtcWithdrawRequestsResponse): QueryPendingBtcWithdrawRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryPendingBtcWithdrawRequestsResponse",
      value: QueryPendingBtcWithdrawRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsRequest(): QuerySigningRequestsRequest {
  return {
    status: 0,
    pagination: undefined
  };
}
export const QuerySigningRequestsRequest = {
  typeUrl: "/side.btcbridge.QuerySigningRequestsRequest",
  encode(message: QuerySigningRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
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
  fromPartial(object: Partial<QuerySigningRequestsRequest>): QuerySigningRequestsRequest {
    const message = createBaseQuerySigningRequestsRequest();
    message.status = object.status ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsRequestAmino): QuerySigningRequestsRequest {
    const message = createBaseQuerySigningRequestsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsRequest): QuerySigningRequestsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsRequestAminoMsg): QuerySigningRequestsRequest {
    return QuerySigningRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsRequestProtoMsg): QuerySigningRequestsRequest {
    return QuerySigningRequestsRequest.decode(message.value);
  },
  toProto(message: QuerySigningRequestsRequest): Uint8Array {
    return QuerySigningRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsRequest): QuerySigningRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestsRequest",
      value: QuerySigningRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsResponse(): QuerySigningRequestsResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QuerySigningRequestsResponse = {
  typeUrl: "/side.btcbridge.QuerySigningRequestsResponse",
  encode(message: QuerySigningRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      SigningRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(SigningRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QuerySigningRequestsResponse>): QuerySigningRequestsResponse {
    const message = createBaseQuerySigningRequestsResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsResponseAmino): QuerySigningRequestsResponse {
    const message = createBaseQuerySigningRequestsResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsResponse): QuerySigningRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? SigningRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsResponseAminoMsg): QuerySigningRequestsResponse {
    return QuerySigningRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsResponseProtoMsg): QuerySigningRequestsResponse {
    return QuerySigningRequestsResponse.decode(message.value);
  },
  toProto(message: QuerySigningRequestsResponse): Uint8Array {
    return QuerySigningRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsResponse): QuerySigningRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestsResponse",
      value: QuerySigningRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsByAddressRequest(): QuerySigningRequestsByAddressRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QuerySigningRequestsByAddressRequest = {
  typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressRequest",
  encode(message: QuerySigningRequestsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsByAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QuerySigningRequestsByAddressRequest>): QuerySigningRequestsByAddressRequest {
    const message = createBaseQuerySigningRequestsByAddressRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsByAddressRequestAmino): QuerySigningRequestsByAddressRequest {
    const message = createBaseQuerySigningRequestsByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsByAddressRequest): QuerySigningRequestsByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsByAddressRequestAminoMsg): QuerySigningRequestsByAddressRequest {
    return QuerySigningRequestsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsByAddressRequestProtoMsg): QuerySigningRequestsByAddressRequest {
    return QuerySigningRequestsByAddressRequest.decode(message.value);
  },
  toProto(message: QuerySigningRequestsByAddressRequest): Uint8Array {
    return QuerySigningRequestsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsByAddressRequest): QuerySigningRequestsByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressRequest",
      value: QuerySigningRequestsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestsByAddressResponse(): QuerySigningRequestsByAddressResponse {
  return {
    requests: [],
    pagination: undefined
  };
}
export const QuerySigningRequestsByAddressResponse = {
  typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressResponse",
  encode(message: QuerySigningRequestsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      SigningRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(SigningRequest.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QuerySigningRequestsByAddressResponse>): QuerySigningRequestsByAddressResponse {
    const message = createBaseQuerySigningRequestsByAddressResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestsByAddressResponseAmino): QuerySigningRequestsByAddressResponse {
    const message = createBaseQuerySigningRequestsByAddressResponse();
    message.requests = object.requests?.map(e => SigningRequest.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestsByAddressResponse): QuerySigningRequestsByAddressResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? SigningRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestsByAddressResponseAminoMsg): QuerySigningRequestsByAddressResponse {
    return QuerySigningRequestsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestsByAddressResponseProtoMsg): QuerySigningRequestsByAddressResponse {
    return QuerySigningRequestsByAddressResponse.decode(message.value);
  },
  toProto(message: QuerySigningRequestsByAddressResponse): Uint8Array {
    return QuerySigningRequestsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestsByAddressResponse): QuerySigningRequestsByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestsByAddressResponse",
      value: QuerySigningRequestsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestByTxHashRequest(): QuerySigningRequestByTxHashRequest {
  return {
    txid: ""
  };
}
export const QuerySigningRequestByTxHashRequest = {
  typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashRequest",
  encode(message: QuerySigningRequestByTxHashRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txid !== "") {
      writer.uint32(10).string(message.txid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestByTxHashRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestByTxHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySigningRequestByTxHashRequest>): QuerySigningRequestByTxHashRequest {
    const message = createBaseQuerySigningRequestByTxHashRequest();
    message.txid = object.txid ?? "";
    return message;
  },
  fromAmino(object: QuerySigningRequestByTxHashRequestAmino): QuerySigningRequestByTxHashRequest {
    const message = createBaseQuerySigningRequestByTxHashRequest();
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    return message;
  },
  toAmino(message: QuerySigningRequestByTxHashRequest): QuerySigningRequestByTxHashRequestAmino {
    const obj: any = {};
    obj.txid = message.txid === "" ? undefined : message.txid;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestByTxHashRequestAminoMsg): QuerySigningRequestByTxHashRequest {
    return QuerySigningRequestByTxHashRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestByTxHashRequestProtoMsg): QuerySigningRequestByTxHashRequest {
    return QuerySigningRequestByTxHashRequest.decode(message.value);
  },
  toProto(message: QuerySigningRequestByTxHashRequest): Uint8Array {
    return QuerySigningRequestByTxHashRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestByTxHashRequest): QuerySigningRequestByTxHashRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashRequest",
      value: QuerySigningRequestByTxHashRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySigningRequestByTxHashResponse(): QuerySigningRequestByTxHashResponse {
  return {
    request: undefined
  };
}
export const QuerySigningRequestByTxHashResponse = {
  typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashResponse",
  encode(message: QuerySigningRequestByTxHashResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.request !== undefined) {
      SigningRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySigningRequestByTxHashResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySigningRequestByTxHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = SigningRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySigningRequestByTxHashResponse>): QuerySigningRequestByTxHashResponse {
    const message = createBaseQuerySigningRequestByTxHashResponse();
    message.request = object.request !== undefined && object.request !== null ? SigningRequest.fromPartial(object.request) : undefined;
    return message;
  },
  fromAmino(object: QuerySigningRequestByTxHashResponseAmino): QuerySigningRequestByTxHashResponse {
    const message = createBaseQuerySigningRequestByTxHashResponse();
    if (object.request !== undefined && object.request !== null) {
      message.request = SigningRequest.fromAmino(object.request);
    }
    return message;
  },
  toAmino(message: QuerySigningRequestByTxHashResponse): QuerySigningRequestByTxHashResponseAmino {
    const obj: any = {};
    obj.request = message.request ? SigningRequest.toAmino(message.request) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySigningRequestByTxHashResponseAminoMsg): QuerySigningRequestByTxHashResponse {
    return QuerySigningRequestByTxHashResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySigningRequestByTxHashResponseProtoMsg): QuerySigningRequestByTxHashResponse {
    return QuerySigningRequestByTxHashResponse.decode(message.value);
  },
  toProto(message: QuerySigningRequestByTxHashResponse): Uint8Array {
    return QuerySigningRequestByTxHashResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySigningRequestByTxHashResponse): QuerySigningRequestByTxHashResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QuerySigningRequestByTxHashResponse",
      value: QuerySigningRequestByTxHashResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFeeRateRequest(): QueryFeeRateRequest {
  return {};
}
export const QueryFeeRateRequest = {
  typeUrl: "/side.btcbridge.QueryFeeRateRequest",
  encode(_: QueryFeeRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFeeRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeRateRequest();
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
  fromPartial(_: Partial<QueryFeeRateRequest>): QueryFeeRateRequest {
    const message = createBaseQueryFeeRateRequest();
    return message;
  },
  fromAmino(_: QueryFeeRateRequestAmino): QueryFeeRateRequest {
    const message = createBaseQueryFeeRateRequest();
    return message;
  },
  toAmino(_: QueryFeeRateRequest): QueryFeeRateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryFeeRateRequestAminoMsg): QueryFeeRateRequest {
    return QueryFeeRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFeeRateRequestProtoMsg): QueryFeeRateRequest {
    return QueryFeeRateRequest.decode(message.value);
  },
  toProto(message: QueryFeeRateRequest): Uint8Array {
    return QueryFeeRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFeeRateRequest): QueryFeeRateRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryFeeRateRequest",
      value: QueryFeeRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFeeRateResponse(): QueryFeeRateResponse {
  return {
    feeRate: BigInt(0)
  };
}
export const QueryFeeRateResponse = {
  typeUrl: "/side.btcbridge.QueryFeeRateResponse",
  encode(message: QueryFeeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.feeRate !== BigInt(0)) {
      writer.uint32(8).int64(message.feeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryFeeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeeRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feeRate = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFeeRateResponse>): QueryFeeRateResponse {
    const message = createBaseQueryFeeRateResponse();
    message.feeRate = object.feeRate !== undefined && object.feeRate !== null ? BigInt(object.feeRate.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryFeeRateResponseAmino): QueryFeeRateResponse {
    const message = createBaseQueryFeeRateResponse();
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = BigInt(object.fee_rate);
    }
    return message;
  },
  toAmino(message: QueryFeeRateResponse): QueryFeeRateResponseAmino {
    const obj: any = {};
    obj.fee_rate = message.feeRate !== BigInt(0) ? message.feeRate.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryFeeRateResponseAminoMsg): QueryFeeRateResponse {
    return QueryFeeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFeeRateResponseProtoMsg): QueryFeeRateResponse {
    return QueryFeeRateResponse.decode(message.value);
  },
  toProto(message: QueryFeeRateResponse): Uint8Array {
    return QueryFeeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFeeRateResponse): QueryFeeRateResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryFeeRateResponse",
      value: QueryFeeRateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/side.btcbridge.QueryParamsRequest",
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
      typeUrl: "/side.btcbridge.QueryParamsRequest",
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
  typeUrl: "/side.btcbridge.QueryParamsResponse",
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
      typeUrl: "/side.btcbridge.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipRequest(): QueryChainTipRequest {
  return {};
}
export const QueryChainTipRequest = {
  typeUrl: "/side.btcbridge.QueryChainTipRequest",
  encode(_: QueryChainTipRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryChainTipRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainTipRequest();
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
  fromPartial(_: Partial<QueryChainTipRequest>): QueryChainTipRequest {
    const message = createBaseQueryChainTipRequest();
    return message;
  },
  fromAmino(_: QueryChainTipRequestAmino): QueryChainTipRequest {
    const message = createBaseQueryChainTipRequest();
    return message;
  },
  toAmino(_: QueryChainTipRequest): QueryChainTipRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryChainTipRequestAminoMsg): QueryChainTipRequest {
    return QueryChainTipRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryChainTipRequestProtoMsg): QueryChainTipRequest {
    return QueryChainTipRequest.decode(message.value);
  },
  toProto(message: QueryChainTipRequest): Uint8Array {
    return QueryChainTipRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryChainTipRequest): QueryChainTipRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryChainTipRequest",
      value: QueryChainTipRequest.encode(message).finish()
    };
  }
};
function createBaseQueryChainTipResponse(): QueryChainTipResponse {
  return {
    hash: "",
    height: BigInt(0)
  };
}
export const QueryChainTipResponse = {
  typeUrl: "/side.btcbridge.QueryChainTipResponse",
  encode(message: QueryChainTipResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryChainTipResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryChainTipResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryChainTipResponse>): QueryChainTipResponse {
    const message = createBaseQueryChainTipResponse();
    message.hash = object.hash ?? "";
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryChainTipResponseAmino): QueryChainTipResponse {
    const message = createBaseQueryChainTipResponse();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: QueryChainTipResponse): QueryChainTipResponseAmino {
    const obj: any = {};
    obj.hash = message.hash === "" ? undefined : message.hash;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryChainTipResponseAminoMsg): QueryChainTipResponse {
    return QueryChainTipResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryChainTipResponseProtoMsg): QueryChainTipResponse {
    return QueryChainTipResponse.decode(message.value);
  },
  toProto(message: QueryChainTipResponse): Uint8Array {
    return QueryChainTipResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryChainTipResponse): QueryChainTipResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryChainTipResponse",
      value: QueryChainTipResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHeightRequest(): QueryBlockHeaderByHeightRequest {
  return {
    height: BigInt(0)
  };
}
export const QueryBlockHeaderByHeightRequest = {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightRequest",
  encode(message: QueryBlockHeaderByHeightRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHeightRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHeightRequest>): QueryBlockHeaderByHeightRequest {
    const message = createBaseQueryBlockHeaderByHeightRequest();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHeightRequestAmino): QueryBlockHeaderByHeightRequest {
    const message = createBaseQueryBlockHeaderByHeightRequest();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHeightRequest): QueryBlockHeaderByHeightRequestAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHeightRequestAminoMsg): QueryBlockHeaderByHeightRequest {
    return QueryBlockHeaderByHeightRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHeightRequestProtoMsg): QueryBlockHeaderByHeightRequest {
    return QueryBlockHeaderByHeightRequest.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHeightRequest): Uint8Array {
    return QueryBlockHeaderByHeightRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHeightRequest): QueryBlockHeaderByHeightRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightRequest",
      value: QueryBlockHeaderByHeightRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHeightResponse(): QueryBlockHeaderByHeightResponse {
  return {
    blockHeader: undefined
  };
}
export const QueryBlockHeaderByHeightResponse = {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightResponse",
  encode(message: QueryBlockHeaderByHeightResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeader !== undefined) {
      BlockHeader.encode(message.blockHeader, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHeightResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeader = BlockHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHeightResponse>): QueryBlockHeaderByHeightResponse {
    const message = createBaseQueryBlockHeaderByHeightResponse();
    message.blockHeader = object.blockHeader !== undefined && object.blockHeader !== null ? BlockHeader.fromPartial(object.blockHeader) : undefined;
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHeightResponseAmino): QueryBlockHeaderByHeightResponse {
    const message = createBaseQueryBlockHeaderByHeightResponse();
    if (object.block_header !== undefined && object.block_header !== null) {
      message.blockHeader = BlockHeader.fromAmino(object.block_header);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHeightResponse): QueryBlockHeaderByHeightResponseAmino {
    const obj: any = {};
    obj.block_header = message.blockHeader ? BlockHeader.toAmino(message.blockHeader) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHeightResponseAminoMsg): QueryBlockHeaderByHeightResponse {
    return QueryBlockHeaderByHeightResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHeightResponseProtoMsg): QueryBlockHeaderByHeightResponse {
    return QueryBlockHeaderByHeightResponse.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHeightResponse): Uint8Array {
    return QueryBlockHeaderByHeightResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHeightResponse): QueryBlockHeaderByHeightResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryBlockHeaderByHeightResponse",
      value: QueryBlockHeaderByHeightResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHashRequest(): QueryBlockHeaderByHashRequest {
  return {
    hash: ""
  };
}
export const QueryBlockHeaderByHashRequest = {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHashRequest",
  encode(message: QueryBlockHeaderByHashRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHashRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHashRequest>): QueryBlockHeaderByHashRequest {
    const message = createBaseQueryBlockHeaderByHashRequest();
    message.hash = object.hash ?? "";
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHashRequestAmino): QueryBlockHeaderByHashRequest {
    const message = createBaseQueryBlockHeaderByHashRequest();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHashRequest): QueryBlockHeaderByHashRequestAmino {
    const obj: any = {};
    obj.hash = message.hash === "" ? undefined : message.hash;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHashRequestAminoMsg): QueryBlockHeaderByHashRequest {
    return QueryBlockHeaderByHashRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHashRequestProtoMsg): QueryBlockHeaderByHashRequest {
    return QueryBlockHeaderByHashRequest.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHashRequest): Uint8Array {
    return QueryBlockHeaderByHashRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHashRequest): QueryBlockHeaderByHashRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryBlockHeaderByHashRequest",
      value: QueryBlockHeaderByHashRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBlockHeaderByHashResponse(): QueryBlockHeaderByHashResponse {
  return {
    blockHeader: undefined
  };
}
export const QueryBlockHeaderByHashResponse = {
  typeUrl: "/side.btcbridge.QueryBlockHeaderByHashResponse",
  encode(message: QueryBlockHeaderByHashResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeader !== undefined) {
      BlockHeader.encode(message.blockHeader, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBlockHeaderByHashResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlockHeaderByHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeader = BlockHeader.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlockHeaderByHashResponse>): QueryBlockHeaderByHashResponse {
    const message = createBaseQueryBlockHeaderByHashResponse();
    message.blockHeader = object.blockHeader !== undefined && object.blockHeader !== null ? BlockHeader.fromPartial(object.blockHeader) : undefined;
    return message;
  },
  fromAmino(object: QueryBlockHeaderByHashResponseAmino): QueryBlockHeaderByHashResponse {
    const message = createBaseQueryBlockHeaderByHashResponse();
    if (object.block_header !== undefined && object.block_header !== null) {
      message.blockHeader = BlockHeader.fromAmino(object.block_header);
    }
    return message;
  },
  toAmino(message: QueryBlockHeaderByHashResponse): QueryBlockHeaderByHashResponseAmino {
    const obj: any = {};
    obj.block_header = message.blockHeader ? BlockHeader.toAmino(message.blockHeader) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlockHeaderByHashResponseAminoMsg): QueryBlockHeaderByHashResponse {
    return QueryBlockHeaderByHashResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlockHeaderByHashResponseProtoMsg): QueryBlockHeaderByHashResponse {
    return QueryBlockHeaderByHashResponse.decode(message.value);
  },
  toProto(message: QueryBlockHeaderByHashResponse): Uint8Array {
    return QueryBlockHeaderByHashResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlockHeaderByHashResponse): QueryBlockHeaderByHashResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryBlockHeaderByHashResponse",
      value: QueryBlockHeaderByHashResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsRequest(): QueryUTXOsRequest {
  return {};
}
export const QueryUTXOsRequest = {
  typeUrl: "/side.btcbridge.QueryUTXOsRequest",
  encode(_: QueryUTXOsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsRequest();
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
  fromPartial(_: Partial<QueryUTXOsRequest>): QueryUTXOsRequest {
    const message = createBaseQueryUTXOsRequest();
    return message;
  },
  fromAmino(_: QueryUTXOsRequestAmino): QueryUTXOsRequest {
    const message = createBaseQueryUTXOsRequest();
    return message;
  },
  toAmino(_: QueryUTXOsRequest): QueryUTXOsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsRequestAminoMsg): QueryUTXOsRequest {
    return QueryUTXOsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsRequestProtoMsg): QueryUTXOsRequest {
    return QueryUTXOsRequest.decode(message.value);
  },
  toProto(message: QueryUTXOsRequest): Uint8Array {
    return QueryUTXOsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsRequest): QueryUTXOsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOsRequest",
      value: QueryUTXOsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsResponse(): QueryUTXOsResponse {
  return {
    utxos: []
  };
}
export const QueryUTXOsResponse = {
  typeUrl: "/side.btcbridge.QueryUTXOsResponse",
  encode(message: QueryUTXOsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOsResponse>): QueryUTXOsResponse {
    const message = createBaseQueryUTXOsResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUTXOsResponseAmino): QueryUTXOsResponse {
    const message = createBaseQueryUTXOsResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUTXOsResponse): QueryUTXOsResponseAmino {
    const obj: any = {};
    if (message.utxos) {
      obj.utxos = message.utxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.utxos = message.utxos;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsResponseAminoMsg): QueryUTXOsResponse {
    return QueryUTXOsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsResponseProtoMsg): QueryUTXOsResponse {
    return QueryUTXOsResponse.decode(message.value);
  },
  toProto(message: QueryUTXOsResponse): Uint8Array {
    return QueryUTXOsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsResponse): QueryUTXOsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOsResponse",
      value: QueryUTXOsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsByAddressRequest(): QueryUTXOsByAddressRequest {
  return {
    address: ""
  };
}
export const QueryUTXOsByAddressRequest = {
  typeUrl: "/side.btcbridge.QueryUTXOsByAddressRequest",
  encode(message: QueryUTXOsByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsByAddressRequest();
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
  fromPartial(object: Partial<QueryUTXOsByAddressRequest>): QueryUTXOsByAddressRequest {
    const message = createBaseQueryUTXOsByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryUTXOsByAddressRequestAmino): QueryUTXOsByAddressRequest {
    const message = createBaseQueryUTXOsByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryUTXOsByAddressRequest): QueryUTXOsByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsByAddressRequestAminoMsg): QueryUTXOsByAddressRequest {
    return QueryUTXOsByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsByAddressRequestProtoMsg): QueryUTXOsByAddressRequest {
    return QueryUTXOsByAddressRequest.decode(message.value);
  },
  toProto(message: QueryUTXOsByAddressRequest): Uint8Array {
    return QueryUTXOsByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsByAddressRequest): QueryUTXOsByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOsByAddressRequest",
      value: QueryUTXOsByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOsByAddressResponse(): QueryUTXOsByAddressResponse {
  return {
    utxos: []
  };
}
export const QueryUTXOsByAddressResponse = {
  typeUrl: "/side.btcbridge.QueryUTXOsByAddressResponse",
  encode(message: QueryUTXOsByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOsByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOsByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOsByAddressResponse>): QueryUTXOsByAddressResponse {
    const message = createBaseQueryUTXOsByAddressResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUTXOsByAddressResponseAmino): QueryUTXOsByAddressResponse {
    const message = createBaseQueryUTXOsByAddressResponse();
    message.utxos = object.utxos?.map(e => UTXO.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUTXOsByAddressResponse): QueryUTXOsByAddressResponseAmino {
    const obj: any = {};
    if (message.utxos) {
      obj.utxos = message.utxos.map(e => e ? UTXO.toAmino(e) : undefined);
    } else {
      obj.utxos = message.utxos;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUTXOsByAddressResponseAminoMsg): QueryUTXOsByAddressResponse {
    return QueryUTXOsByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOsByAddressResponseProtoMsg): QueryUTXOsByAddressResponse {
    return QueryUTXOsByAddressResponse.decode(message.value);
  },
  toProto(message: QueryUTXOsByAddressResponse): Uint8Array {
    return QueryUTXOsByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOsByAddressResponse): QueryUTXOsByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOsByAddressResponse",
      value: QueryUTXOsByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOCountAndBalancesByAddressRequest(): QueryUTXOCountAndBalancesByAddressRequest {
  return {
    address: ""
  };
}
export const QueryUTXOCountAndBalancesByAddressRequest = {
  typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressRequest",
  encode(message: QueryUTXOCountAndBalancesByAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOCountAndBalancesByAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOCountAndBalancesByAddressRequest();
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
  fromPartial(object: Partial<QueryUTXOCountAndBalancesByAddressRequest>): QueryUTXOCountAndBalancesByAddressRequest {
    const message = createBaseQueryUTXOCountAndBalancesByAddressRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryUTXOCountAndBalancesByAddressRequestAmino): QueryUTXOCountAndBalancesByAddressRequest {
    const message = createBaseQueryUTXOCountAndBalancesByAddressRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryUTXOCountAndBalancesByAddressRequest): QueryUTXOCountAndBalancesByAddressRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryUTXOCountAndBalancesByAddressRequestAminoMsg): QueryUTXOCountAndBalancesByAddressRequest {
    return QueryUTXOCountAndBalancesByAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOCountAndBalancesByAddressRequestProtoMsg): QueryUTXOCountAndBalancesByAddressRequest {
    return QueryUTXOCountAndBalancesByAddressRequest.decode(message.value);
  },
  toProto(message: QueryUTXOCountAndBalancesByAddressRequest): Uint8Array {
    return QueryUTXOCountAndBalancesByAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOCountAndBalancesByAddressRequest): QueryUTXOCountAndBalancesByAddressRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressRequest",
      value: QueryUTXOCountAndBalancesByAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUTXOCountAndBalancesByAddressResponse(): QueryUTXOCountAndBalancesByAddressResponse {
  return {
    count: 0,
    value: BigInt(0),
    runeBalances: []
  };
}
export const QueryUTXOCountAndBalancesByAddressResponse = {
  typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressResponse",
  encode(message: QueryUTXOCountAndBalancesByAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.count !== 0) {
      writer.uint32(8).uint32(message.count);
    }
    if (message.value !== BigInt(0)) {
      writer.uint32(16).int64(message.value);
    }
    for (const v of message.runeBalances) {
      RuneBalance.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUTXOCountAndBalancesByAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUTXOCountAndBalancesByAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.count = reader.uint32();
          break;
        case 2:
          message.value = reader.int64();
          break;
        case 3:
          message.runeBalances.push(RuneBalance.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUTXOCountAndBalancesByAddressResponse>): QueryUTXOCountAndBalancesByAddressResponse {
    const message = createBaseQueryUTXOCountAndBalancesByAddressResponse();
    message.count = object.count ?? 0;
    message.value = object.value !== undefined && object.value !== null ? BigInt(object.value.toString()) : BigInt(0);
    message.runeBalances = object.runeBalances?.map(e => RuneBalance.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryUTXOCountAndBalancesByAddressResponseAmino): QueryUTXOCountAndBalancesByAddressResponse {
    const message = createBaseQueryUTXOCountAndBalancesByAddressResponse();
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = BigInt(object.value);
    }
    message.runeBalances = object.runeBalances?.map(e => RuneBalance.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryUTXOCountAndBalancesByAddressResponse): QueryUTXOCountAndBalancesByAddressResponseAmino {
    const obj: any = {};
    obj.count = message.count === 0 ? undefined : message.count;
    obj.value = message.value !== BigInt(0) ? message.value.toString() : undefined;
    if (message.runeBalances) {
      obj.runeBalances = message.runeBalances.map(e => e ? RuneBalance.toAmino(e) : undefined);
    } else {
      obj.runeBalances = message.runeBalances;
    }
    return obj;
  },
  fromAminoMsg(object: QueryUTXOCountAndBalancesByAddressResponseAminoMsg): QueryUTXOCountAndBalancesByAddressResponse {
    return QueryUTXOCountAndBalancesByAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryUTXOCountAndBalancesByAddressResponseProtoMsg): QueryUTXOCountAndBalancesByAddressResponse {
    return QueryUTXOCountAndBalancesByAddressResponse.decode(message.value);
  },
  toProto(message: QueryUTXOCountAndBalancesByAddressResponse): Uint8Array {
    return QueryUTXOCountAndBalancesByAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUTXOCountAndBalancesByAddressResponse): QueryUTXOCountAndBalancesByAddressResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryUTXOCountAndBalancesByAddressResponse",
      value: QueryUTXOCountAndBalancesByAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestRequest(): QueryDKGRequestRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryDKGRequestRequest = {
  typeUrl: "/side.btcbridge.QueryDKGRequestRequest",
  encode(message: QueryDKGRequestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestRequest();
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
  fromPartial(object: Partial<QueryDKGRequestRequest>): QueryDKGRequestRequest {
    const message = createBaseQueryDKGRequestRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryDKGRequestRequestAmino): QueryDKGRequestRequest {
    const message = createBaseQueryDKGRequestRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestRequest): QueryDKGRequestRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestRequestAminoMsg): QueryDKGRequestRequest {
    return QueryDKGRequestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestRequestProtoMsg): QueryDKGRequestRequest {
    return QueryDKGRequestRequest.decode(message.value);
  },
  toProto(message: QueryDKGRequestRequest): Uint8Array {
    return QueryDKGRequestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestRequest): QueryDKGRequestRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGRequestRequest",
      value: QueryDKGRequestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestResponse(): QueryDKGRequestResponse {
  return {
    request: undefined
  };
}
export const QueryDKGRequestResponse = {
  typeUrl: "/side.btcbridge.QueryDKGRequestResponse",
  encode(message: QueryDKGRequestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.request !== undefined) {
      DKGRequest.encode(message.request, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = DKGRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGRequestResponse>): QueryDKGRequestResponse {
    const message = createBaseQueryDKGRequestResponse();
    message.request = object.request !== undefined && object.request !== null ? DKGRequest.fromPartial(object.request) : undefined;
    return message;
  },
  fromAmino(object: QueryDKGRequestResponseAmino): QueryDKGRequestResponse {
    const message = createBaseQueryDKGRequestResponse();
    if (object.request !== undefined && object.request !== null) {
      message.request = DKGRequest.fromAmino(object.request);
    }
    return message;
  },
  toAmino(message: QueryDKGRequestResponse): QueryDKGRequestResponseAmino {
    const obj: any = {};
    obj.request = message.request ? DKGRequest.toAmino(message.request) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestResponseAminoMsg): QueryDKGRequestResponse {
    return QueryDKGRequestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestResponseProtoMsg): QueryDKGRequestResponse {
    return QueryDKGRequestResponse.decode(message.value);
  },
  toProto(message: QueryDKGRequestResponse): Uint8Array {
    return QueryDKGRequestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestResponse): QueryDKGRequestResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGRequestResponse",
      value: QueryDKGRequestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestsRequest(): QueryDKGRequestsRequest {
  return {
    status: 0
  };
}
export const QueryDKGRequestsRequest = {
  typeUrl: "/side.btcbridge.QueryDKGRequestsRequest",
  encode(message: QueryDKGRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGRequestsRequest>): QueryDKGRequestsRequest {
    const message = createBaseQueryDKGRequestsRequest();
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: QueryDKGRequestsRequestAmino): QueryDKGRequestsRequest {
    const message = createBaseQueryDKGRequestsRequest();
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: QueryDKGRequestsRequest): QueryDKGRequestsRequestAmino {
    const obj: any = {};
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestsRequestAminoMsg): QueryDKGRequestsRequest {
    return QueryDKGRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestsRequestProtoMsg): QueryDKGRequestsRequest {
    return QueryDKGRequestsRequest.decode(message.value);
  },
  toProto(message: QueryDKGRequestsRequest): Uint8Array {
    return QueryDKGRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestsRequest): QueryDKGRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGRequestsRequest",
      value: QueryDKGRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGRequestsResponse(): QueryDKGRequestsResponse {
  return {
    requests: []
  };
}
export const QueryDKGRequestsResponse = {
  typeUrl: "/side.btcbridge.QueryDKGRequestsResponse",
  encode(message: QueryDKGRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      DKGRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(DKGRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGRequestsResponse>): QueryDKGRequestsResponse {
    const message = createBaseQueryDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryDKGRequestsResponseAmino): QueryDKGRequestsResponse {
    const message = createBaseQueryDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryDKGRequestsResponse): QueryDKGRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? DKGRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    return obj;
  },
  fromAminoMsg(object: QueryDKGRequestsResponseAminoMsg): QueryDKGRequestsResponse {
    return QueryDKGRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGRequestsResponseProtoMsg): QueryDKGRequestsResponse {
    return QueryDKGRequestsResponse.decode(message.value);
  },
  toProto(message: QueryDKGRequestsResponse): Uint8Array {
    return QueryDKGRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGRequestsResponse): QueryDKGRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGRequestsResponse",
      value: QueryDKGRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllDKGRequestsRequest(): QueryAllDKGRequestsRequest {
  return {};
}
export const QueryAllDKGRequestsRequest = {
  typeUrl: "/side.btcbridge.QueryAllDKGRequestsRequest",
  encode(_: QueryAllDKGRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDKGRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDKGRequestsRequest();
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
  fromPartial(_: Partial<QueryAllDKGRequestsRequest>): QueryAllDKGRequestsRequest {
    const message = createBaseQueryAllDKGRequestsRequest();
    return message;
  },
  fromAmino(_: QueryAllDKGRequestsRequestAmino): QueryAllDKGRequestsRequest {
    const message = createBaseQueryAllDKGRequestsRequest();
    return message;
  },
  toAmino(_: QueryAllDKGRequestsRequest): QueryAllDKGRequestsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAllDKGRequestsRequestAminoMsg): QueryAllDKGRequestsRequest {
    return QueryAllDKGRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDKGRequestsRequestProtoMsg): QueryAllDKGRequestsRequest {
    return QueryAllDKGRequestsRequest.decode(message.value);
  },
  toProto(message: QueryAllDKGRequestsRequest): Uint8Array {
    return QueryAllDKGRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDKGRequestsRequest): QueryAllDKGRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryAllDKGRequestsRequest",
      value: QueryAllDKGRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllDKGRequestsResponse(): QueryAllDKGRequestsResponse {
  return {
    requests: []
  };
}
export const QueryAllDKGRequestsResponse = {
  typeUrl: "/side.btcbridge.QueryAllDKGRequestsResponse",
  encode(message: QueryAllDKGRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      DKGRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAllDKGRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDKGRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(DKGRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllDKGRequestsResponse>): QueryAllDKGRequestsResponse {
    const message = createBaseQueryAllDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllDKGRequestsResponseAmino): QueryAllDKGRequestsResponse {
    const message = createBaseQueryAllDKGRequestsResponse();
    message.requests = object.requests?.map(e => DKGRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllDKGRequestsResponse): QueryAllDKGRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? DKGRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllDKGRequestsResponseAminoMsg): QueryAllDKGRequestsResponse {
    return QueryAllDKGRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllDKGRequestsResponseProtoMsg): QueryAllDKGRequestsResponse {
    return QueryAllDKGRequestsResponse.decode(message.value);
  },
  toProto(message: QueryAllDKGRequestsResponse): Uint8Array {
    return QueryAllDKGRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllDKGRequestsResponse): QueryAllDKGRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryAllDKGRequestsResponse",
      value: QueryAllDKGRequestsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryDKGCompletionRequestsRequest(): QueryDKGCompletionRequestsRequest {
  return {
    id: BigInt(0)
  };
}
export const QueryDKGCompletionRequestsRequest = {
  typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsRequest",
  encode(message: QueryDKGCompletionRequestsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGCompletionRequestsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGCompletionRequestsRequest();
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
  fromPartial(object: Partial<QueryDKGCompletionRequestsRequest>): QueryDKGCompletionRequestsRequest {
    const message = createBaseQueryDKGCompletionRequestsRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryDKGCompletionRequestsRequestAmino): QueryDKGCompletionRequestsRequest {
    const message = createBaseQueryDKGCompletionRequestsRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: QueryDKGCompletionRequestsRequest): QueryDKGCompletionRequestsRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDKGCompletionRequestsRequestAminoMsg): QueryDKGCompletionRequestsRequest {
    return QueryDKGCompletionRequestsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGCompletionRequestsRequestProtoMsg): QueryDKGCompletionRequestsRequest {
    return QueryDKGCompletionRequestsRequest.decode(message.value);
  },
  toProto(message: QueryDKGCompletionRequestsRequest): Uint8Array {
    return QueryDKGCompletionRequestsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGCompletionRequestsRequest): QueryDKGCompletionRequestsRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsRequest",
      value: QueryDKGCompletionRequestsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDKGCompletionRequestsResponse(): QueryDKGCompletionRequestsResponse {
  return {
    requests: []
  };
}
export const QueryDKGCompletionRequestsResponse = {
  typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsResponse",
  encode(message: QueryDKGCompletionRequestsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.requests) {
      DKGCompletionRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryDKGCompletionRequestsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDKGCompletionRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(DKGCompletionRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDKGCompletionRequestsResponse>): QueryDKGCompletionRequestsResponse {
    const message = createBaseQueryDKGCompletionRequestsResponse();
    message.requests = object.requests?.map(e => DKGCompletionRequest.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryDKGCompletionRequestsResponseAmino): QueryDKGCompletionRequestsResponse {
    const message = createBaseQueryDKGCompletionRequestsResponse();
    message.requests = object.requests?.map(e => DKGCompletionRequest.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryDKGCompletionRequestsResponse): QueryDKGCompletionRequestsResponseAmino {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map(e => e ? DKGCompletionRequest.toAmino(e) : undefined);
    } else {
      obj.requests = message.requests;
    }
    return obj;
  },
  fromAminoMsg(object: QueryDKGCompletionRequestsResponseAminoMsg): QueryDKGCompletionRequestsResponse {
    return QueryDKGCompletionRequestsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryDKGCompletionRequestsResponseProtoMsg): QueryDKGCompletionRequestsResponse {
    return QueryDKGCompletionRequestsResponse.decode(message.value);
  },
  toProto(message: QueryDKGCompletionRequestsResponse): Uint8Array {
    return QueryDKGCompletionRequestsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDKGCompletionRequestsResponse): QueryDKGCompletionRequestsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.QueryDKGCompletionRequestsResponse",
      value: QueryDKGCompletionRequestsResponse.encode(message).finish()
    };
  }
};