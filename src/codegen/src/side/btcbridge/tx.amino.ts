//@ts-nocheck
import { MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgSubmitFeeRate, MsgUpdateTrustedNonBtcRelayers, MsgUpdateTrustedFeeProviders, MsgWithdrawToBitcoin, MsgSubmitSignatures, MsgConsolidateVaults, MsgInitiateDKG, MsgCompleteDKG, MsgRefresh, MsgCompleteRefreshing, MsgTransferVault, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/side.btcbridge.MsgSubmitDepositTransaction": {
    aminoType: "/side.btcbridge.MsgSubmitDepositTransaction",
    toAmino: MsgSubmitDepositTransaction.toAmino,
    fromAmino: MsgSubmitDepositTransaction.fromAmino
  },
  "/side.btcbridge.MsgSubmitWithdrawTransaction": {
    aminoType: "/side.btcbridge.MsgSubmitWithdrawTransaction",
    toAmino: MsgSubmitWithdrawTransaction.toAmino,
    fromAmino: MsgSubmitWithdrawTransaction.fromAmino
  },
  "/side.btcbridge.MsgSubmitFeeRate": {
    aminoType: "/side.btcbridge.MsgSubmitFeeRate",
    toAmino: MsgSubmitFeeRate.toAmino,
    fromAmino: MsgSubmitFeeRate.fromAmino
  },
  "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers": {
    aminoType: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
    toAmino: MsgUpdateTrustedNonBtcRelayers.toAmino,
    fromAmino: MsgUpdateTrustedNonBtcRelayers.fromAmino
  },
  "/side.btcbridge.MsgUpdateTrustedFeeProviders": {
    aminoType: "/side.btcbridge.MsgUpdateTrustedFeeProviders",
    toAmino: MsgUpdateTrustedFeeProviders.toAmino,
    fromAmino: MsgUpdateTrustedFeeProviders.fromAmino
  },
  "/side.btcbridge.MsgWithdrawToBitcoin": {
    aminoType: "/side.btcbridge.MsgWithdrawToBitcoin",
    toAmino: MsgWithdrawToBitcoin.toAmino,
    fromAmino: MsgWithdrawToBitcoin.fromAmino
  },
  "/side.btcbridge.MsgSubmitSignatures": {
    aminoType: "/side.btcbridge.MsgSubmitSignatures",
    toAmino: MsgSubmitSignatures.toAmino,
    fromAmino: MsgSubmitSignatures.fromAmino
  },
  "/side.btcbridge.MsgConsolidateVaults": {
    aminoType: "/side.btcbridge.MsgConsolidateVaults",
    toAmino: MsgConsolidateVaults.toAmino,
    fromAmino: MsgConsolidateVaults.fromAmino
  },
  "/side.btcbridge.MsgInitiateDKG": {
    aminoType: "/side.btcbridge.MsgInitiateDKG",
    toAmino: MsgInitiateDKG.toAmino,
    fromAmino: MsgInitiateDKG.fromAmino
  },
  "/side.btcbridge.MsgCompleteDKG": {
    aminoType: "/side.btcbridge.MsgCompleteDKG",
    toAmino: MsgCompleteDKG.toAmino,
    fromAmino: MsgCompleteDKG.fromAmino
  },
  "/side.btcbridge.MsgRefresh": {
    aminoType: "/side.btcbridge.MsgRefresh",
    toAmino: MsgRefresh.toAmino,
    fromAmino: MsgRefresh.fromAmino
  },
  "/side.btcbridge.MsgCompleteRefreshing": {
    aminoType: "/side.btcbridge.MsgCompleteRefreshing",
    toAmino: MsgCompleteRefreshing.toAmino,
    fromAmino: MsgCompleteRefreshing.fromAmino
  },
  "/side.btcbridge.MsgTransferVault": {
    aminoType: "/side.btcbridge.MsgTransferVault",
    toAmino: MsgTransferVault.toAmino,
    fromAmino: MsgTransferVault.fromAmino
  },
  "/side.btcbridge.MsgUpdateParams": {
    aminoType: "/side.btcbridge.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};