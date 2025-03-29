//@ts-nocheck
import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgSubmitNonce, MsgSubmitNonceResponse, MsgSubmitAttestation, MsgSubmitAttestationResponse, MsgSubmitOraclePubKey, MsgSubmitOraclePubKeyResponse, MsgSubmitDCMPubKey, MsgSubmitDCMPubKeyResponse, MsgCreateOracle, MsgCreateOracleResponse, MsgCreateDCM, MsgCreateDCMResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  submitNonce(request: MsgSubmitNonce): Promise<MsgSubmitNonceResponse>;
  submitAttestation(request: MsgSubmitAttestation): Promise<MsgSubmitAttestationResponse>;
  submitOraclePubKey(request: MsgSubmitOraclePubKey): Promise<MsgSubmitOraclePubKeyResponse>;
  submitDCMPubKey(request: MsgSubmitDCMPubKey): Promise<MsgSubmitDCMPubKeyResponse>;
  createOracle(request: MsgCreateOracle): Promise<MsgCreateOracleResponse>;
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
    this.submitNonce = this.submitNonce.bind(this);
    this.submitAttestation = this.submitAttestation.bind(this);
    this.submitOraclePubKey = this.submitOraclePubKey.bind(this);
    this.submitDCMPubKey = this.submitDCMPubKey.bind(this);
    this.createOracle = this.createOracle.bind(this);
    this.createDCM = this.createDCM.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  submitNonce(request: MsgSubmitNonce): Promise<MsgSubmitNonceResponse> {
    const data = MsgSubmitNonce.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "SubmitNonce", data);
    return promise.then(data => MsgSubmitNonceResponse.decode(new BinaryReader(data)));
  }
  submitAttestation(request: MsgSubmitAttestation): Promise<MsgSubmitAttestationResponse> {
    const data = MsgSubmitAttestation.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "SubmitAttestation", data);
    return promise.then(data => MsgSubmitAttestationResponse.decode(new BinaryReader(data)));
  }
  submitOraclePubKey(request: MsgSubmitOraclePubKey): Promise<MsgSubmitOraclePubKeyResponse> {
    const data = MsgSubmitOraclePubKey.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "SubmitOraclePubKey", data);
    return promise.then(data => MsgSubmitOraclePubKeyResponse.decode(new BinaryReader(data)));
  }
  submitDCMPubKey(request: MsgSubmitDCMPubKey): Promise<MsgSubmitDCMPubKeyResponse> {
    const data = MsgSubmitDCMPubKey.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "SubmitDCMPubKey", data);
    return promise.then(data => MsgSubmitDCMPubKeyResponse.decode(new BinaryReader(data)));
  }
  createOracle(request: MsgCreateOracle): Promise<MsgCreateOracleResponse> {
    const data = MsgCreateOracle.encode(request).finish();
    const promise = this.rpc.request("side.dlc.Msg", "CreateOracle", data);
    return promise.then(data => MsgCreateOracleResponse.decode(new BinaryReader(data)));
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