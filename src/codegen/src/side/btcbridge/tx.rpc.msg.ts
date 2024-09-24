//@ts-nocheck
import { Rpc } from '../../helpers';
import { BinaryReader } from '../../binary';
import { MsgSubmitBlockHeaders, MsgSubmitBlockHeadersResponse, MsgUpdateNonBtcRelayers, MsgUpdateNonBtcRelayersResponse, MsgSubmitDepositTransaction, MsgSubmitDepositTransactionResponse, MsgSubmitWithdrawTransaction, MsgSubmitWithdrawTransactionResponse, MsgWithdrawToBitcoin, MsgWithdrawToBitcoinResponse, MsgSubmitWithdrawSignatures, MsgSubmitWithdrawSignaturesResponse, MsgInitiateDKG, MsgInitiateDKGResponse, MsgCompleteDKG, MsgCompleteDKGResponse, MsgUpdateParams, MsgUpdateParamsResponse } from './tx';
/** Msg defines the Msg service. */
export interface Msg {
  /** SubmitBlockHeaders submits bitcoin block headers to the side chain. */
  submitBlockHeaders(request: MsgSubmitBlockHeaders): Promise<MsgSubmitBlockHeadersResponse>;
  /** UpdateNonBtcRelayers updates the authorized non-btc asset relayers. */
  updateNonBtcRelayers(request: MsgUpdateNonBtcRelayers): Promise<MsgUpdateNonBtcRelayersResponse>;
  /** SubmitDepositTransaction submits bitcoin transaction to the side chain. */
  submitDepositTransaction(request: MsgSubmitDepositTransaction): Promise<MsgSubmitDepositTransactionResponse>;
  /** SubmitWithdrawalTransaction submits bitcoin transaction to the side chain. */
  submitWithdrawTransaction(request: MsgSubmitWithdrawTransaction): Promise<MsgSubmitWithdrawTransactionResponse>;
  /** WithdrawToBitcoin withdraws the asset to bitcoin. */
  withdrawToBitcoin(request: MsgWithdrawToBitcoin): Promise<MsgWithdrawToBitcoinResponse>;
  /** SubmitWithdrawSignatures submits the signatures of the withdraw transaction. */
  submitWithdrawSignatures(request: MsgSubmitWithdrawSignatures): Promise<MsgSubmitWithdrawSignaturesResponse>;
  /** InitiateDKG initiates the DKG request. */
  initiateDKG(request: MsgInitiateDKG): Promise<MsgInitiateDKGResponse>;
  /** CompleteDKG completes the given DKG request. */
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/btcbridge module
   * parameters. The authority defaults to the x/gov module account.
   *
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.submitBlockHeaders = this.submitBlockHeaders.bind(this);
    this.updateNonBtcRelayers = this.updateNonBtcRelayers.bind(this);
    this.submitDepositTransaction = this.submitDepositTransaction.bind(this);
    this.submitWithdrawTransaction = this.submitWithdrawTransaction.bind(this);
    this.withdrawToBitcoin = this.withdrawToBitcoin.bind(this);
    this.submitWithdrawSignatures = this.submitWithdrawSignatures.bind(this);
    this.initiateDKG = this.initiateDKG.bind(this);
    this.completeDKG = this.completeDKG.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  submitBlockHeaders(request: MsgSubmitBlockHeaders): Promise<MsgSubmitBlockHeadersResponse> {
    const data = MsgSubmitBlockHeaders.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitBlockHeaders', data);
    return promise.then(data => MsgSubmitBlockHeadersResponse.decode(new BinaryReader(data)));
  }
  updateNonBtcRelayers(request: MsgUpdateNonBtcRelayers): Promise<MsgUpdateNonBtcRelayersResponse> {
    const data = MsgUpdateNonBtcRelayers.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'UpdateNonBtcRelayers', data);
    return promise.then(data => MsgUpdateNonBtcRelayersResponse.decode(new BinaryReader(data)));
  }
  submitDepositTransaction(request: MsgSubmitDepositTransaction): Promise<MsgSubmitDepositTransactionResponse> {
    const data = MsgSubmitDepositTransaction.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitDepositTransaction', data);
    return promise.then(data => MsgSubmitDepositTransactionResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawTransaction(request: MsgSubmitWithdrawTransaction): Promise<MsgSubmitWithdrawTransactionResponse> {
    const data = MsgSubmitWithdrawTransaction.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitWithdrawTransaction', data);
    return promise.then(data => MsgSubmitWithdrawTransactionResponse.decode(new BinaryReader(data)));
  }
  withdrawToBitcoin(request: MsgWithdrawToBitcoin): Promise<MsgWithdrawToBitcoinResponse> {
    const data = MsgWithdrawToBitcoin.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'WithdrawToBitcoin', data);
    return promise.then(data => MsgWithdrawToBitcoinResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawSignatures(request: MsgSubmitWithdrawSignatures): Promise<MsgSubmitWithdrawSignaturesResponse> {
    const data = MsgSubmitWithdrawSignatures.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'SubmitWithdrawSignatures', data);
    return promise.then(data => MsgSubmitWithdrawSignaturesResponse.decode(new BinaryReader(data)));
  }
  initiateDKG(request: MsgInitiateDKG): Promise<MsgInitiateDKGResponse> {
    const data = MsgInitiateDKG.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'InitiateDKG', data);
    return promise.then(data => MsgInitiateDKGResponse.decode(new BinaryReader(data)));
  }
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse> {
    const data = MsgCompleteDKG.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'CompleteDKG', data);
    return promise.then(data => MsgCompleteDKGResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request('side.btcbridge.Msg', 'UpdateParams', data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}