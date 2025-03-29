//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCreatePool, MsgCreatePoolResponse, MsgAddLiquidity, MsgAddLiquidityResponse, MsgRemoveLiquidity, MsgRemoveLiquidityResponse, MsgUpdatePoolConfig, MsgUpdatePoolConfigResponse, MsgApply, MsgApplyResponse, MsgSubmitCets, MsgSubmitCetsResponse, MsgApprove, MsgApproveResponse, MsgSubmitRepaymentAdaptorSignatures, MsgSubmitRepaymentAdaptorSignaturesResponse, MsgCancel, MsgCancelResponse, MsgSubmitCancellationSignatures, MsgSubmitCancellationSignaturesResponse, MsgRepay, MsgRepayResponse, MsgSubmitLiquidationSignatures, MsgSubmitLiquidationSignaturesResponse, MsgSubmitPrice, MsgSubmitPriceResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  createPool(request: MsgCreatePool): Promise<MsgCreatePoolResponse>;
  addLiquidity(request: MsgAddLiquidity): Promise<MsgAddLiquidityResponse>;
  removeLiquidity(request: MsgRemoveLiquidity): Promise<MsgRemoveLiquidityResponse>;
  updatePoolConfig(request: MsgUpdatePoolConfig): Promise<MsgUpdatePoolConfigResponse>;
  apply(request: MsgApply): Promise<MsgApplyResponse>;
  submitCets(request: MsgSubmitCets): Promise<MsgSubmitCetsResponse>;
  approve(request: MsgApprove): Promise<MsgApproveResponse>;
  submitRepaymentAdaptorSignatures(request: MsgSubmitRepaymentAdaptorSignatures): Promise<MsgSubmitRepaymentAdaptorSignaturesResponse>;
  cancel(request: MsgCancel): Promise<MsgCancelResponse>;
  submitCancellationSignatures(request: MsgSubmitCancellationSignatures): Promise<MsgSubmitCancellationSignaturesResponse>;
  repay(request: MsgRepay): Promise<MsgRepayResponse>;
  submitLiquidationSignatures(request: MsgSubmitLiquidationSignatures): Promise<MsgSubmitLiquidationSignaturesResponse>;
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
    this.submitRepaymentAdaptorSignatures = this.submitRepaymentAdaptorSignatures.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submitCancellationSignatures = this.submitCancellationSignatures.bind(this);
    this.repay = this.repay.bind(this);
    this.submitLiquidationSignatures = this.submitLiquidationSignatures.bind(this);
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
  submitRepaymentAdaptorSignatures(request: MsgSubmitRepaymentAdaptorSignatures): Promise<MsgSubmitRepaymentAdaptorSignaturesResponse> {
    const data = MsgSubmitRepaymentAdaptorSignatures.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "SubmitRepaymentAdaptorSignatures", data);
    return promise.then(data => MsgSubmitRepaymentAdaptorSignaturesResponse.decode(new BinaryReader(data)));
  }
  cancel(request: MsgCancel): Promise<MsgCancelResponse> {
    const data = MsgCancel.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Cancel", data);
    return promise.then(data => MsgCancelResponse.decode(new BinaryReader(data)));
  }
  submitCancellationSignatures(request: MsgSubmitCancellationSignatures): Promise<MsgSubmitCancellationSignaturesResponse> {
    const data = MsgSubmitCancellationSignatures.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "SubmitCancellationSignatures", data);
    return promise.then(data => MsgSubmitCancellationSignaturesResponse.decode(new BinaryReader(data)));
  }
  repay(request: MsgRepay): Promise<MsgRepayResponse> {
    const data = MsgRepay.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "Repay", data);
    return promise.then(data => MsgRepayResponse.decode(new BinaryReader(data)));
  }
  submitLiquidationSignatures(request: MsgSubmitLiquidationSignatures): Promise<MsgSubmitLiquidationSignaturesResponse> {
    const data = MsgSubmitLiquidationSignatures.encode(request).finish();
    const promise = this.rpc.request("side.lending.Msg", "SubmitLiquidationSignatures", data);
    return promise.then(data => MsgSubmitLiquidationSignaturesResponse.decode(new BinaryReader(data)));
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