//@ts-nocheck
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgApprove, MsgSubmitRepaymentAdaptorSignatures, MsgCancel, MsgSubmitCancellationSignatures, MsgRepay, MsgSubmitLiquidationSignatures, MsgSubmitPrice, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.lending.MsgCreatePool": {
    aminoType: "/side.lending.MsgCreatePool",
    toAmino: MsgCreatePool.toAmino,
    fromAmino: MsgCreatePool.fromAmino
  },
  "/side.lending.MsgAddLiquidity": {
    aminoType: "/side.lending.MsgAddLiquidity",
    toAmino: MsgAddLiquidity.toAmino,
    fromAmino: MsgAddLiquidity.fromAmino
  },
  "/side.lending.MsgRemoveLiquidity": {
    aminoType: "/side.lending.MsgRemoveLiquidity",
    toAmino: MsgRemoveLiquidity.toAmino,
    fromAmino: MsgRemoveLiquidity.fromAmino
  },
  "/side.lending.MsgUpdatePoolConfig": {
    aminoType: "/side.lending.MsgUpdatePoolConfig",
    toAmino: MsgUpdatePoolConfig.toAmino,
    fromAmino: MsgUpdatePoolConfig.fromAmino
  },
  "/side.lending.MsgApply": {
    aminoType: "/side.lending.MsgApply",
    toAmino: MsgApply.toAmino,
    fromAmino: MsgApply.fromAmino
  },
  "/side.lending.MsgSubmitCets": {
    aminoType: "/side.lending.MsgSubmitCets",
    toAmino: MsgSubmitCets.toAmino,
    fromAmino: MsgSubmitCets.fromAmino
  },
  "/side.lending.MsgApprove": {
    aminoType: "/side.lending.MsgApprove",
    toAmino: MsgApprove.toAmino,
    fromAmino: MsgApprove.fromAmino
  },
  "/side.lending.MsgSubmitRepaymentAdaptorSignatures": {
    aminoType: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
    toAmino: MsgSubmitRepaymentAdaptorSignatures.toAmino,
    fromAmino: MsgSubmitRepaymentAdaptorSignatures.fromAmino
  },
  "/side.lending.MsgCancel": {
    aminoType: "/side.lending.MsgCancel",
    toAmino: MsgCancel.toAmino,
    fromAmino: MsgCancel.fromAmino
  },
  "/side.lending.MsgSubmitCancellationSignatures": {
    aminoType: "/side.lending.MsgSubmitCancellationSignatures",
    toAmino: MsgSubmitCancellationSignatures.toAmino,
    fromAmino: MsgSubmitCancellationSignatures.fromAmino
  },
  "/side.lending.MsgRepay": {
    aminoType: "/side.lending.MsgRepay",
    toAmino: MsgRepay.toAmino,
    fromAmino: MsgRepay.fromAmino
  },
  "/side.lending.MsgSubmitLiquidationSignatures": {
    aminoType: "/side.lending.MsgSubmitLiquidationSignatures",
    toAmino: MsgSubmitLiquidationSignatures.toAmino,
    fromAmino: MsgSubmitLiquidationSignatures.fromAmino
  },
  "/side.lending.MsgSubmitPrice": {
    aminoType: "/side.lending.MsgSubmitPrice",
    toAmino: MsgSubmitPrice.toAmino,
    fromAmino: MsgSubmitPrice.fromAmino
  },
  "/side.lending.MsgUpdateParams": {
    aminoType: "/side.lending.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};