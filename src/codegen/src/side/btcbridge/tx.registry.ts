//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSubmitBlockHeaders, MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgSubmitFeeRate, MsgUpdateTrustedNonBtcRelayers, MsgUpdateTrustedOracles, MsgWithdrawToBitcoin, MsgSubmitSignatures, MsgConsolidateVaults, MsgInitiateDKG, MsgCompleteDKG, MsgTransferVault, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.btcbridge.MsgSubmitBlockHeaders", MsgSubmitBlockHeaders], ["/side.btcbridge.MsgSubmitDepositTransaction", MsgSubmitDepositTransaction], ["/side.btcbridge.MsgSubmitWithdrawTransaction", MsgSubmitWithdrawTransaction], ["/side.btcbridge.MsgSubmitFeeRate", MsgSubmitFeeRate], ["/side.btcbridge.MsgUpdateTrustedNonBtcRelayers", MsgUpdateTrustedNonBtcRelayers], ["/side.btcbridge.MsgUpdateTrustedOracles", MsgUpdateTrustedOracles], ["/side.btcbridge.MsgWithdrawToBitcoin", MsgWithdrawToBitcoin], ["/side.btcbridge.MsgSubmitSignatures", MsgSubmitSignatures], ["/side.btcbridge.MsgConsolidateVaults", MsgConsolidateVaults], ["/side.btcbridge.MsgInitiateDKG", MsgInitiateDKG], ["/side.btcbridge.MsgCompleteDKG", MsgCompleteDKG], ["/side.btcbridge.MsgTransferVault", MsgTransferVault], ["/side.btcbridge.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    submitBlockHeaders(value: MsgSubmitBlockHeaders) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders",
        value: MsgSubmitBlockHeaders.encode(value).finish()
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.encode(value).finish()
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction",
        value: MsgSubmitWithdrawTransaction.encode(value).finish()
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitFeeRate",
        value: MsgSubmitFeeRate.encode(value).finish()
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value: MsgUpdateTrustedNonBtcRelayers.encode(value).finish()
      };
    },
    updateTrustedOracles(value: MsgUpdateTrustedOracles) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles",
        value: MsgUpdateTrustedOracles.encode(value).finish()
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.encode(value).finish()
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitSignatures",
        value: MsgSubmitSignatures.encode(value).finish()
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/side.btcbridge.MsgConsolidateVaults",
        value: MsgConsolidateVaults.encode(value).finish()
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgInitiateDKG",
        value: MsgInitiateDKG.encode(value).finish()
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgCompleteDKG",
        value: MsgCompleteDKG.encode(value).finish()
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/side.btcbridge.MsgTransferVault",
        value: MsgTransferVault.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    submitBlockHeaders(value: MsgSubmitBlockHeaders) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders",
        value
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction",
        value
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction",
        value
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitFeeRate",
        value
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value
      };
    },
    updateTrustedOracles(value: MsgUpdateTrustedOracles) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles",
        value
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitSignatures",
        value
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/side.btcbridge.MsgConsolidateVaults",
        value
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgInitiateDKG",
        value
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgCompleteDKG",
        value
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/side.btcbridge.MsgTransferVault",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    submitBlockHeaders(value: MsgSubmitBlockHeaders) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders",
        value: MsgSubmitBlockHeaders.fromPartial(value)
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.fromPartial(value)
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransaction) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction",
        value: MsgSubmitWithdrawTransaction.fromPartial(value)
      };
    },
    submitFeeRate(value: MsgSubmitFeeRate) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitFeeRate",
        value: MsgSubmitFeeRate.fromPartial(value)
      };
    },
    updateTrustedNonBtcRelayers(value: MsgUpdateTrustedNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
        value: MsgUpdateTrustedNonBtcRelayers.fromPartial(value)
      };
    },
    updateTrustedOracles(value: MsgUpdateTrustedOracles) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles",
        value: MsgUpdateTrustedOracles.fromPartial(value)
      };
    },
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.fromPartial(value)
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitSignatures",
        value: MsgSubmitSignatures.fromPartial(value)
      };
    },
    consolidateVaults(value: MsgConsolidateVaults) {
      return {
        typeUrl: "/side.btcbridge.MsgConsolidateVaults",
        value: MsgConsolidateVaults.fromPartial(value)
      };
    },
    initiateDKG(value: MsgInitiateDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgInitiateDKG",
        value: MsgInitiateDKG.fromPartial(value)
      };
    },
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.btcbridge.MsgCompleteDKG",
        value: MsgCompleteDKG.fromPartial(value)
      };
    },
    transferVault(value: MsgTransferVault) {
      return {
        typeUrl: "/side.btcbridge.MsgTransferVault",
        value: MsgTransferVault.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};