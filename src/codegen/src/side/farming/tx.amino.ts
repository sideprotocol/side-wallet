//@ts-nocheck
import { MsgStake, MsgUnstake, MsgClaim, MsgClaimAll, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.farming.MsgStake": {
    aminoType: "/side.farming.MsgStake",
    toAmino: MsgStake.toAmino,
    fromAmino: MsgStake.fromAmino
  },
  "/side.farming.MsgUnstake": {
    aminoType: "/side.farming.MsgUnstake",
    toAmino: MsgUnstake.toAmino,
    fromAmino: MsgUnstake.fromAmino
  },
  "/side.farming.MsgClaim": {
    aminoType: "/side.farming.MsgClaim",
    toAmino: MsgClaim.toAmino,
    fromAmino: MsgClaim.fromAmino
  },
  "/side.farming.MsgClaimAll": {
    aminoType: "/side.farming.MsgClaimAll",
    toAmino: MsgClaimAll.toAmino,
    fromAmino: MsgClaimAll.fromAmino
  },
  "/side.farming.MsgUpdateParams": {
    aminoType: "/side.farming.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};