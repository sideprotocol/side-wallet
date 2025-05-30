//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCreatePool, MsgCreatePoolResponse, MsgAddLiquidity, MsgAddLiquidityResponse, MsgRemoveLiquidity, MsgRemoveLiquidityResponse, MsgUpdatePoolConfig, MsgUpdatePoolConfigResponse, MsgApply, MsgApplyResponse, MsgSubmitCets, MsgSubmitCetsResponse, MsgApprove, MsgApproveResponse, MsgRedeem, MsgRedeemResponse, MsgRepay, MsgRepayResponse, MsgSubmitPrice, MsgSubmitPriceResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  createPool(request: MsgCreatePool): Promise<MsgCreatePoolResponse>;
  addLiquidity(request: MsgAddLiquidity): Promise<MsgAddLiquidityResponse>;
  removeLiquidity(request: MsgRemoveLiquidity): Promise<MsgRemoveLiquidityResponse>;
  updatePoolConfig(request: MsgUpdatePoolConfig): Promise<MsgUpdatePoolConfigResponse>;
  apply(request: MsgApply): Promise<MsgApplyResponse>;
  submitCets(request: MsgSubmitCets): Promise<MsgSubmitCetsResponse>;
  approve(request: MsgApprove): Promise<MsgApproveResponse>;
  redeem(request: MsgRedeem): Promise<MsgRedeemResponse>;
  repay(request: MsgRepay): Promise<MsgRepayResponse>;
  /** SubmitPrice submits the price for testing */
  submitPrice(request: MsgSubmitPrice): Promise<MsgSubmitPriceResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/lending module
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
    this.createPool = this.createPool.bind(this);
    this.addLiquidity = this.addLiquidity.bind(this);
    this.removeLiquidity = this.removeLiquidity.bind(this);
    this.updatePoolConfig = this.updatePoolConfig.bind(this);
    this.apply = this.apply.bind(this);
    this.submitCets = this.submitCets.bind(this);
    this.approve = this.approve.bind(this);
    this.redeem = this.redeem.bind(this);
    this.repay = this.repay.bind(this);
    this.submitPrice = this.submitPrice.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  createPool(request: MsgCreatePool): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePool.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "CreatePool", data);
    return promise.then(data => MsgCreatePoolResponse.decode(new BinaryReader(data)));
  }
  addLiquidity(request: MsgAddLiquidity): Promise<MsgAddLiquidityResponse> {
    const data = MsgAddLiquidity.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "AddLiquidity", data);
    return promise.then(data => MsgAddLiquidityResponse.decode(new BinaryReader(data)));
  }
  removeLiquidity(request: MsgRemoveLiquidity): Promise<MsgRemoveLiquidityResponse> {
    const data = MsgRemoveLiquidity.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "RemoveLiquidity", data);
    return promise.then(data => MsgRemoveLiquidityResponse.decode(new BinaryReader(data)));
  }
  updatePoolConfig(request: MsgUpdatePoolConfig): Promise<MsgUpdatePoolConfigResponse> {
    const data = MsgUpdatePoolConfig.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "UpdatePoolConfig", data);
    return promise.then(data => MsgUpdatePoolConfigResponse.decode(new BinaryReader(data)));
  }
  apply(request: MsgApply): Promise<MsgApplyResponse> {
    const data = MsgApply.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Apply", data);
    return promise.then(data => MsgApplyResponse.decode(new BinaryReader(data)));
  }
  submitCets(request: MsgSubmitCets): Promise<MsgSubmitCetsResponse> {
    const data = MsgSubmitCets.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "SubmitCets", data);
    return promise.then(data => MsgSubmitCetsResponse.decode(new BinaryReader(data)));
  }
  approve(request: MsgApprove): Promise<MsgApproveResponse> {
    const data = MsgApprove.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Approve", data);
    return promise.then(data => MsgApproveResponse.decode(new BinaryReader(data)));
  }
  redeem(request: MsgRedeem): Promise<MsgRedeemResponse> {
    const data = MsgRedeem.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Redeem", data);
    return promise.then(data => MsgRedeemResponse.decode(new BinaryReader(data)));
  }
  repay(request: MsgRepay): Promise<MsgRepayResponse> {
    const data = MsgRepay.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Repay", data);
    return promise.then(data => MsgRepayResponse.decode(new BinaryReader(data)));
  }
  submitPrice(request: MsgSubmitPrice): Promise<MsgSubmitPriceResponse> {
    const data = MsgSubmitPrice.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "SubmitPrice", data);
    return promise.then(data => MsgSubmitPriceResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}