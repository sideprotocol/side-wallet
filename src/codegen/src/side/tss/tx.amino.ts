//@ts-nocheck
import { MsgCompleteDKG, MsgSubmitSignatures, MsgRefresh, MsgCompleteRefreshing, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.tss.MsgCompleteDKG": {
    aminoType: "/side.tss.MsgCompleteDKG",
    toAmino: MsgCompleteDKG.toAmino,
    fromAmino: MsgCompleteDKG.fromAmino
  },
  "/side.tss.MsgSubmitSignatures": {
    aminoType: "/side.tss.MsgSubmitSignatures",
    toAmino: MsgSubmitSignatures.toAmino,
    fromAmino: MsgSubmitSignatures.fromAmino
  },
  "/side.tss.MsgRefresh": {
    aminoType: "/side.tss.MsgRefresh",
    toAmino: MsgRefresh.toAmino,
    fromAmino: MsgRefresh.fromAmino
  },
  "/side.tss.MsgCompleteRefreshing": {
    aminoType: "/side.tss.MsgCompleteRefreshing",
    toAmino: MsgCompleteRefreshing.toAmino,
    fromAmino: MsgCompleteRefreshing.fromAmino
  },
  "/side.tss.MsgUpdateParams": {
    aminoType: "/side.tss.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};