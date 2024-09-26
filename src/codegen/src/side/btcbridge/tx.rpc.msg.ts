//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgSubmitBlockHeaders, MsgSubmitBlockHeadersResponse, MsgSubmitDepositTransaction, MsgSubmitDepositTransactionResponse, MsgSubmitWithdrawTransaction, MsgSubmitWithdrawTransactionResponse, MsgSubmitFeeRate, MsgSubmitFeeRateResponse, MsgUpdateTrustedNonBtcRelayers, MsgUpdateTrustedNonBtcRelayersResponse, MsgUpdateTrustedOracles, MsgUpdateTrustedOraclesResponse, MsgWithdrawToBitcoin, MsgWithdrawToBitcoinResponse, MsgSubmitSignatures, MsgSubmitSignaturesResponse, MsgConsolidateVaults, MsgConsolidateVaultsResponse, MsgInitiateDKG, MsgInitiateDKGResponse, MsgCompleteDKG, MsgCompleteDKGResponse, MsgTransferVault, MsgTransferVaultResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** SubmitBlockHeaders submits bitcoin block headers to the side chain. */
  submitBlockHeaders(request: MsgSubmitBlockHeaders): Promise<MsgSubmitBlockHeadersResponse>;
  /** SubmitDepositTransaction submits the bitcoin deposit transaction to the side chain. */
  submitDepositTransaction(request: MsgSubmitDepositTransaction): Promise<MsgSubmitDepositTransactionResponse>;
  /** SubmitWithdrawalTransaction submits the bitcoin withdrawal transaction to the side chain. */
  submitWithdrawTransaction(request: MsgSubmitWithdrawTransaction): Promise<MsgSubmitWithdrawTransactionResponse>;
  /** SubmitFeeRate submits the bitcoin network fee rate to the side chain. */
  submitFeeRate(request: MsgSubmitFeeRate): Promise<MsgSubmitFeeRateResponse>;
  /** UpdateTrustedNonBtcRelayers updates the trusted non-btc asset relayers. */
  updateTrustedNonBtcRelayers(request: MsgUpdateTrustedNonBtcRelayers): Promise<MsgUpdateTrustedNonBtcRelayersResponse>;
  /** UpdateTrustedOracles updates the trusted oracles. */
  updateTrustedOracles(request: MsgUpdateTrustedOracles): Promise<MsgUpdateTrustedOraclesResponse>;
  /** WithdrawToBitcoin withdraws the asset to bitcoin. */
  withdrawToBitcoin(request: MsgWithdrawToBitcoin): Promise<MsgWithdrawToBitcoinResponse>;
  /** SubmitSignatures submits the signatures of the signing request to the side chain. */
  submitSignatures(request: MsgSubmitSignatures): Promise<MsgSubmitSignaturesResponse>;
  /** ConsolidateVaults performs the utxo consolidation for the given vaults. */
  consolidateVaults(request: MsgConsolidateVaults): Promise<MsgConsolidateVaultsResponse>;
  /** InitiateDKG initiates the DKG request. */
  initiateDKG(request: MsgInitiateDKG): Promise<MsgInitiateDKGResponse>;
  /** CompleteDKG completes the given DKG request. */
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse>;
  /** TransferVault transfers the vault asset from the source version to the destination version. */
  transferVault(request: MsgTransferVault): Promise<MsgTransferVaultResponse>;
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
    this.submitDepositTransaction = this.submitDepositTransaction.bind(this);
    this.submitWithdrawTransaction = this.submitWithdrawTransaction.bind(this);
    this.submitFeeRate = this.submitFeeRate.bind(this);
    this.updateTrustedNonBtcRelayers = this.updateTrustedNonBtcRelayers.bind(this);
    this.updateTrustedOracles = this.updateTrustedOracles.bind(this);
    this.withdrawToBitcoin = this.withdrawToBitcoin.bind(this);
    this.submitSignatures = this.submitSignatures.bind(this);
    this.consolidateVaults = this.consolidateVaults.bind(this);
    this.initiateDKG = this.initiateDKG.bind(this);
    this.completeDKG = this.completeDKG.bind(this);
    this.transferVault = this.transferVault.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  submitBlockHeaders(request: MsgSubmitBlockHeaders): Promise<MsgSubmitBlockHeadersResponse> {
    const data = MsgSubmitBlockHeaders.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "SubmitBlockHeaders", data);
    return promise.then(data => MsgSubmitBlockHeadersResponse.decode(new BinaryReader(data)));
  }
  submitDepositTransaction(request: MsgSubmitDepositTransaction): Promise<MsgSubmitDepositTransactionResponse> {
    const data = MsgSubmitDepositTransaction.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "SubmitDepositTransaction", data);
    return promise.then(data => MsgSubmitDepositTransactionResponse.decode(new BinaryReader(data)));
  }
  submitWithdrawTransaction(request: MsgSubmitWithdrawTransaction): Promise<MsgSubmitWithdrawTransactionResponse> {
    const data = MsgSubmitWithdrawTransaction.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "SubmitWithdrawTransaction", data);
    return promise.then(data => MsgSubmitWithdrawTransactionResponse.decode(new BinaryReader(data)));
  }
  submitFeeRate(request: MsgSubmitFeeRate): Promise<MsgSubmitFeeRateResponse> {
    const data = MsgSubmitFeeRate.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "SubmitFeeRate", data);
    return promise.then(data => MsgSubmitFeeRateResponse.decode(new BinaryReader(data)));
  }
  updateTrustedNonBtcRelayers(request: MsgUpdateTrustedNonBtcRelayers): Promise<MsgUpdateTrustedNonBtcRelayersResponse> {
    const data = MsgUpdateTrustedNonBtcRelayers.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "UpdateTrustedNonBtcRelayers", data);
    return promise.then(data => MsgUpdateTrustedNonBtcRelayersResponse.decode(new BinaryReader(data)));
  }
  updateTrustedOracles(request: MsgUpdateTrustedOracles): Promise<MsgUpdateTrustedOraclesResponse> {
    const data = MsgUpdateTrustedOracles.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "UpdateTrustedOracles", data);
    return promise.then(data => MsgUpdateTrustedOraclesResponse.decode(new BinaryReader(data)));
  }
  withdrawToBitcoin(request: MsgWithdrawToBitcoin): Promise<MsgWithdrawToBitcoinResponse> {
    const data = MsgWithdrawToBitcoin.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "WithdrawToBitcoin", data);
    return promise.then(data => MsgWithdrawToBitcoinResponse.decode(new BinaryReader(data)));
  }
  submitSignatures(request: MsgSubmitSignatures): Promise<MsgSubmitSignaturesResponse> {
    const data = MsgSubmitSignatures.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "SubmitSignatures", data);
    return promise.then(data => MsgSubmitSignaturesResponse.decode(new BinaryReader(data)));
  }
  consolidateVaults(request: MsgConsolidateVaults): Promise<MsgConsolidateVaultsResponse> {
    const data = MsgConsolidateVaults.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "ConsolidateVaults", data);
    return promise.then(data => MsgConsolidateVaultsResponse.decode(new BinaryReader(data)));
  }
  initiateDKG(request: MsgInitiateDKG): Promise<MsgInitiateDKGResponse> {
    const data = MsgInitiateDKG.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "InitiateDKG", data);
    return promise.then(data => MsgInitiateDKGResponse.decode(new BinaryReader(data)));
  }
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse> {
    const data = MsgCompleteDKG.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "CompleteDKG", data);
    return promise.then(data => MsgCompleteDKGResponse.decode(new BinaryReader(data)));
  }
  transferVault(request: MsgTransferVault): Promise<MsgTransferVaultResponse> {
    const data = MsgTransferVault.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "TransferVault", data);
    return promise.then(data => MsgTransferVaultResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.btcbridge.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}