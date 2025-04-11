//@ts-nocheck
import { MsgLiquidate, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.liquidation.MsgLiquidate": {
    aminoType: "/side.liquidation.MsgLiquidate",
    toAmino: MsgLiquidate.toAmino,
    fromAmino: MsgLiquidate.fromAmino
  },
  "/side.liquidation.MsgUpdateParams": {
    aminoType: "/side.liquidation.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};