//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgLiquidate, MsgLiquidateResponse, MsgSubmitSettlementSignatures, MsgSubmitSettlementSignaturesResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  /** Liquidate the specified debt amount by liquidators. */
  liquidate(request: MsgLiquidate): Promise<MsgLiquidateResponse>;
  /** Submit settlement transaction signatures for the specified liquidation. */
  submitSettlementSignatures(request: MsgSubmitSettlementSignatures): Promise<MsgSubmitSettlementSignaturesResponse>;
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
    this.liquidate = this.liquidate.bind(this);
    this.submitSettlementSignatures = this.submitSettlementSignatures.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  liquidate(request: MsgLiquidate): Promise<MsgLiquidateResponse> {
    const data = MsgLiquidate.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Msg", "Liquidate", data);
    return promise.then(data => MsgLiquidateResponse.decode(new BinaryReader(data)));
  }
  submitSettlementSignatures(request: MsgSubmitSettlementSignatures): Promise<MsgSubmitSettlementSignaturesResponse> {
    const data = MsgSubmitSettlementSignatures.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Msg", "SubmitSettlementSignatures", data);
    return promise.then(data => MsgSubmitSettlementSignaturesResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.liquidation.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}