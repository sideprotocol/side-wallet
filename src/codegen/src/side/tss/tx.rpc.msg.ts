//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCompleteDKG, MsgCompleteDKGResponse, MsgSubmitSignatures, MsgSubmitSignaturesResponse, MsgRefresh, MsgRefreshResponse, MsgCompleteRefreshing, MsgCompleteRefreshingResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** CompleteDKG completes the given DKG request by the participant. */
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse>;
  /** SubmitSignatures submits signatures. */
  submitSignatures(request: MsgSubmitSignatures): Promise<MsgSubmitSignaturesResponse>;
  /** Refresh refreshes key shares. */
  refresh(request: MsgRefresh): Promise<MsgRefreshResponse>;
  /** CompleteRefreshing completes the given refreshing request by the participant. */
  completeRefreshing(request: MsgCompleteRefreshing): Promise<MsgCompleteRefreshingResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/tss module
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
    this.completeDKG = this.completeDKG.bind(this);
    this.submitSignatures = this.submitSignatures.bind(this);
    this.refresh = this.refresh.bind(this);
    this.completeRefreshing = this.completeRefreshing.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  completeDKG(request: MsgCompleteDKG): Promise<MsgCompleteDKGResponse> {
    const data = MsgCompleteDKG.encode(request).finish();
    const promise = this.rpc.request("side.tss.Msg", "CompleteDKG", data);
    return promise.then(data => MsgCompleteDKGResponse.decode(new BinaryReader(data)));
  }
  submitSignatures(request: MsgSubmitSignatures): Promise<MsgSubmitSignaturesResponse> {
    const data = MsgSubmitSignatures.encode(request).finish();
    const promise = this.rpc.request("side.tss.Msg", "SubmitSignatures", data);
    return promise.then(data => MsgSubmitSignaturesResponse.decode(new BinaryReader(data)));
  }
  refresh(request: MsgRefresh): Promise<MsgRefreshResponse> {
    const data = MsgRefresh.encode(request).finish();
    const promise = this.rpc.request("side.tss.Msg", "Refresh", data);
    return promise.then(data => MsgRefreshResponse.decode(new BinaryReader(data)));
  }
  completeRefreshing(request: MsgCompleteRefreshing): Promise<MsgCompleteRefreshingResponse> {
    const data = MsgCompleteRefreshing.encode(request).finish();
    const promise = this.rpc.request("side.tss.Msg", "CompleteRefreshing", data);
    return promise.then(data => MsgCompleteRefreshingResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.tss.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}