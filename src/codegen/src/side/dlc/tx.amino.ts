//@ts-nocheck
import { MsgSubmitNonce, MsgSubmitAttestation, MsgSubmitOraclePubKey, MsgSubmitDCMPubKey, MsgCreateOracle, MsgCreateDCM, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.dlc.MsgSubmitNonce": {
    aminoType: "/side.dlc.MsgSubmitNonce",
    toAmino: MsgSubmitNonce.toAmino,
    fromAmino: MsgSubmitNonce.fromAmino
  },
  "/side.dlc.MsgSubmitAttestation": {
    aminoType: "/side.dlc.MsgSubmitAttestation",
    toAmino: MsgSubmitAttestation.toAmino,
    fromAmino: MsgSubmitAttestation.fromAmino
  },
  "/side.dlc.MsgSubmitOraclePubKey": {
    aminoType: "/side.dlc.MsgSubmitOraclePubKey",
    toAmino: MsgSubmitOraclePubKey.toAmino,
    fromAmino: MsgSubmitOraclePubKey.fromAmino
  },
  "/side.dlc.MsgSubmitDCMPubKey": {
    aminoType: "/side.dlc.MsgSubmitDCMPubKey",
    toAmino: MsgSubmitDCMPubKey.toAmino,
    fromAmino: MsgSubmitDCMPubKey.fromAmino
  },
  "/side.dlc.MsgCreateOracle": {
    aminoType: "/side.dlc.MsgCreateOracle",
    toAmino: MsgCreateOracle.toAmino,
    fromAmino: MsgCreateOracle.fromAmino
  },
  "/side.dlc.MsgCreateDCM": {
    aminoType: "/side.dlc.MsgCreateDCM",
    toAmino: MsgCreateDCM.toAmino,
    fromAmino: MsgCreateDCM.fromAmino
  },
  "/side.dlc.MsgUpdateParams": {
    aminoType: "/side.dlc.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};