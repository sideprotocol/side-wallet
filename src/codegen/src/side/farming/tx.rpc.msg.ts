//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgStake, MsgStakeResponse, MsgUnstake, MsgUnstakeResponse, MsgClaim, MsgClaimResponse, MsgClaimAll, MsgClaimAllResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  stake(request: MsgStake): Promise<MsgStakeResponse>;
  unstake(request: MsgUnstake): Promise<MsgUnstakeResponse>;
  claim(request: MsgClaim): Promise<MsgClaimResponse>;
  claimAll(request: MsgClaimAll): Promise<MsgClaimAllResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/farming module
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
    this.stake = this.stake.bind(this);
    this.unstake = this.unstake.bind(this);
    this.claim = this.claim.bind(this);
    this.claimAll = this.claimAll.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  stake(request: MsgStake): Promise<MsgStakeResponse> {
    const data = MsgStake.encode(request).finish();
    const promise = this.rpc.request("side.farming.Msg", "Stake", data);
    return promise.then(data => MsgStakeResponse.decode(new BinaryReader(data)));
  }
  unstake(request: MsgUnstake): Promise<MsgUnstakeResponse> {
    const data = MsgUnstake.encode(request).finish();
    const promise = this.rpc.request("side.farming.Msg", "Unstake", data);
    return promise.then(data => MsgUnstakeResponse.decode(new BinaryReader(data)));
  }
  claim(request: MsgClaim): Promise<MsgClaimResponse> {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("side.farming.Msg", "Claim", data);
    return promise.then(data => MsgClaimResponse.decode(new BinaryReader(data)));
  }
  claimAll(request: MsgClaimAll): Promise<MsgClaimAllResponse> {
    const data = MsgClaimAll.encode(request).finish();
    const promise = this.rpc.request("side.farming.Msg", "ClaimAll", data);
    return promise.then(data => MsgClaimAllResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.farming.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}