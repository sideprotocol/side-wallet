//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCreateDCM, MsgCreateDCMResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  createDCM(request: MsgCreateDCM): Promise<MsgCreateDCMResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/dlc module
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
    this.createDCM = this.createDCM.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  createDCM(request: MsgCreateDCM): Promise<MsgCreateDCMResponse> {
    const data = MsgCreateDCM.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "CreateDCM", data);
    return promise.then(data => MsgCreateDCMResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}