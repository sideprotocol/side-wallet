//@ts-nocheck
import { BinaryReader } from '../../binary';
import { Rpc } from '../../helpers';
import {
  MsgSubmitBlockHeaderRequest,
  MsgSubmitBlockHeadersResponse,
  MsgSubmitDepositTransactionRequest,
  MsgSubmitDepositTransactionResponse,
  MsgSubmitWithdrawTransactionRequest,
  MsgSubmitWithdrawTransactionResponse,
  MsgUpdateQualifiedRelayersRequest,
  MsgUpdateQualifiedRelayersResponse,
  MsgWithdrawBitcoinRequest,
  MsgWithdrawBitcoinResponse,
  MsgSubmitWithdrawSignaturesRequest,
  MsgSubmitWithdrawSignaturesResponse,
  MsgSubmitWithdrawStatusRequest,
  MsgSubmitWithdrawStatusResponse
} from './tx';

/** Msg defines the Msg service. */
export interface Msg {
  /** SubmitBlockHeaders submits bitcoin block headers to the side chain. */
  submitBlockHeaders(request: MsgSubmitBlockHeaderRequest): Promise<MsgSubmitBlockHeadersResponse>;
  /** SubmitDepositTransaction submits bitcoin transaction to the side chain. */
  submitDepositTransaction(request: MsgSubmitDepositTransactionRequest): Promise<MsgSubmitDepositTransactionResponse>;
  /** SubmitWithdrawalTransaction submits bitcoin transaction to the side chain. */
  submitWithdrawTransaction(
    request: MsgSubmitWithdrawTransactionRequest
  ): Promise<MsgSubmitWithdrawTransactionResponse>;
  /** UpdateSenders updates the senders of the side chain. */
  updateQualifiedRelayers(request: MsgUpdateQualifiedRelayersRequest): Promise<MsgUpdateQualifiedRelayersResponse>;
  /** WithdrawBitcoin withdraws the bitcoin from the side chain. */
  withdrawBitcoin(request: MsgWithdrawBitcoinRequest): Promise<MsgWithdrawBitcoinResponse>;
  /** SubmitWithdrawSignatures submits the signatures of the withdraw transaction. */
  submitWithdrawSignatures(request: MsgSubmitWithdrawSignaturesRequest): Promise<MsgSubmitWithdrawSignaturesResponse>;
  /** SubmitWithdrawStatus submits the status of the withdraw transaction. */
  submitWithdrawStatus(request: MsgSubmitWithdrawStatusRequest): Promise<MsgSubmitWithdrawStatusResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.submitBlockHeaders = this.submitBlockHeaders.bind(this);
    this.submitDepositTransaction = this.submitDepositTransaction.bind(this);
    this.submitWithdrawTransaction = this.submitWithdrawTransaction.bind(this);
    this.updateQualifiedRelayers = this.updateQualifiedRelayers.bind(this);
    this.withdrawBitcoin = this.withdrawBitcoin.bind(this);
    this.submitWithdrawSignatures = this.submitWithdrawSignatures.bind(this);
    this.submitWithdrawStatus = this.submitWithdrawStatus.bind(this);
  }
  submitBlockHeaders(request: MsgSubmitBlockHeaderRequest): Promise<MsgSubmitBlockHeadersResponse> {
    const data = MsgSubmitBlockHeaderRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitBlockHeaders', data);
    return promise.then((data) => MsgSubmitBlockHeadersResponse.decode(new BinaryReader(data)));
  }
  submitDepositTransaction(request: MsgSubmitDepositTransactionRequest): Promise<MsgSubmitDepositTransactionResponse> {
    const data = MsgSubmitDepositTransactionRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitDepositTransaction', data);
    return promise.then((data) => MsgSubmitDepositTransactionResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawTransaction(
    request: MsgSubmitWithdrawTransactionRequest
  ): Promise<MsgSubmitWithdrawTransactionResponse> {
    const data = MsgSubmitWithdrawTransactionRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitWithdrawTransaction', data);
    return promise.then((data) => MsgSubmitWithdrawTransactionResponse.decode(new BinaryReader(data)));
  }
  updateQualifiedRelayers(request: MsgUpdateQualifiedRelayersRequest): Promise<MsgUpdateQualifiedRelayersResponse> {
    const data = MsgUpdateQualifiedRelayersRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'UpdateQualifiedRelayers', data);
    return promise.then((data) => MsgUpdateQualifiedRelayersResponse.decode(new BinaryReader(data)));
  }
  withdrawBitcoin(request: MsgWithdrawBitcoinRequest): Promise<MsgWithdrawBitcoinResponse> {
    const data = MsgWithdrawBitcoinRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'WithdrawBitcoin', data);
    return promise.then((data) => MsgWithdrawBitcoinResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawSignatures(request: MsgSubmitWithdrawSignaturesRequest): Promise<MsgSubmitWithdrawSignaturesResponse> {
    const data = MsgSubmitWithdrawSignaturesRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitWithdrawSignatures', data);
    return promise.then((data) => MsgSubmitWithdrawSignaturesResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawStatus(request: MsgSubmitWithdrawStatusRequest): Promise<MsgSubmitWithdrawStatusResponse> {
    const data = MsgSubmitWithdrawStatusRequest.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitWithdrawStatus', data);
    return promise.then((data) => MsgSubmitWithdrawStatusResponse.decode(new BinaryReader(data)));
  }
}
