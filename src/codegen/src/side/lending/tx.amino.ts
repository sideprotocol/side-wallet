//@ts-nocheck
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgSubmitDepositTransaction, MsgRedeem, MsgRepay, MsgUpdateParams } from "./tx";
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
  "/side.lending.MsgSubmitDepositTransaction": {
    aminoType: "/side.lending.MsgSubmitDepositTransaction",
    toAmino: MsgSubmitDepositTransaction.toAmino,
    fromAmino: MsgSubmitDepositTransaction.fromAmino
  },
  "/side.lending.MsgRedeem": {
    aminoType: "/side.lending.MsgRedeem",
    toAmino: MsgRedeem.toAmino,
    fromAmino: MsgRedeem.fromAmino
  },
  "/side.lending.MsgRepay": {
    aminoType: "/side.lending.MsgRepay",
    toAmino: MsgRepay.toAmino,
    fromAmino: MsgRepay.fromAmino
  },
  "/side.lending.MsgUpdateParams": {
    aminoType: "/side.lending.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};