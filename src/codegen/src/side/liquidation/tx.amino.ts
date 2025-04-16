//@ts-nocheck
import { MsgLiquidate, MsgSubmitSettlementSignatures, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.liquidation.MsgLiquidate": {
    aminoType: "/side.liquidation.MsgLiquidate",
    toAmino: MsgLiquidate.toAmino,
    fromAmino: MsgLiquidate.fromAmino
  },
  "/side.liquidation.MsgSubmitSettlementSignatures": {
    aminoType: "/side.liquidation.MsgSubmitSettlementSignatures",
    toAmino: MsgSubmitSettlementSignatures.toAmino,
    fromAmino: MsgSubmitSettlementSignatures.fromAmino
  },
  "/side.liquidation.MsgUpdateParams": {
    aminoType: "/side.liquidation.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};