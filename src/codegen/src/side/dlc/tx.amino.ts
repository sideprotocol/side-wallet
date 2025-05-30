//@ts-nocheck
import { MsgCreateDCM, MsgUpdateParams } from "./tx";
export const AminoConverter = {
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