//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSubmitBlockHeaders, MsgUpdateNonBtcRelayers, MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgWithdrawToBitcoin, MsgSubmitWithdrawSignatures, MsgInitiateDKG, MsgCompleteDKG, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.btcbridge.MsgSubmitBlockHeaders", MsgSubmitBlockHeaders], ["/side.btcbridge.MsgUpdateNonBtcRelayers", MsgUpdateNonBtcRelayers], ["/side.btcbridge.MsgSubmitDepositTransaction", MsgSubmitDepositTransaction], ["/side.btcbridge.MsgSubmitWithdrawTransaction", MsgSubmitWithdrawTransaction], ["/side.btcbridge.MsgWithdrawToBitcoin", MsgWithdrawToBitcoin], ["/side.btcbridge.MsgSubmitWithdrawSignatures", MsgSubmitWithdrawSignatures], ["/side.btcbridge.MsgInitiateDKG", MsgInitiateDKG], ["/side.btcbridge.MsgCompleteDKG", MsgCompleteDKG], ["/side.btcbridge.MsgUpdateParams", MsgUpdateParams]];
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
    updateNonBtcRelayers(value: MsgUpdateNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers",
        value: MsgUpdateNonBtcRelayers.encode(value).finish()
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
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.encode(value).finish()
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures",
        value: MsgSubmitWithdrawSignatures.encode(value).finish()
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
    updateNonBtcRelayers(value: MsgUpdateNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers",
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
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures",
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
    updateNonBtcRelayers(value: MsgUpdateNonBtcRelayers) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers",
        value: MsgUpdateNonBtcRelayers.fromPartial(value)
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
    withdrawToBitcoin(value: MsgWithdrawToBitcoin) {
      return {
        typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
        value: MsgWithdrawToBitcoin.fromPartial(value)
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignatures) {
      return {
        typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures",
        value: MsgSubmitWithdrawSignatures.fromPartial(value)
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
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.btcbridge.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};