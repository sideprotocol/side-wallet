//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgSubmitDepositTransaction, MsgRedeem, MsgRepay, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.lending.MsgCreatePool", MsgCreatePool], ["/side.lending.MsgAddLiquidity", MsgAddLiquidity], ["/side.lending.MsgRemoveLiquidity", MsgRemoveLiquidity], ["/side.lending.MsgUpdatePoolConfig", MsgUpdatePoolConfig], ["/side.lending.MsgApply", MsgApply], ["/side.lending.MsgSubmitCets", MsgSubmitCets], ["/side.lending.MsgSubmitDepositTransaction", MsgSubmitDepositTransaction], ["/side.lending.MsgRedeem", MsgRedeem], ["/side.lending.MsgRepay", MsgRepay], ["/side.lending.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/side.lending.MsgCreatePool",
        value: MsgCreatePool.encode(value).finish()
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/side.lending.MsgAddLiquidity",
        value: MsgAddLiquidity.encode(value).finish()
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/side.lending.MsgRemoveLiquidity",
        value: MsgRemoveLiquidity.encode(value).finish()
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/side.lending.MsgUpdatePoolConfig",
        value: MsgUpdatePoolConfig.encode(value).finish()
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/side.lending.MsgApply",
        value: MsgApply.encode(value).finish()
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/side.lending.MsgSubmitCets",
        value: MsgSubmitCets.encode(value).finish()
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.lending.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.encode(value).finish()
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/side.lending.MsgRedeem",
        value: MsgRedeem.encode(value).finish()
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value: MsgRepay.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.lending.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/side.lending.MsgCreatePool",
        value
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/side.lending.MsgAddLiquidity",
        value
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/side.lending.MsgRemoveLiquidity",
        value
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/side.lending.MsgUpdatePoolConfig",
        value
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/side.lending.MsgApply",
        value
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/side.lending.MsgSubmitCets",
        value
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.lending.MsgSubmitDepositTransaction",
        value
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/side.lending.MsgRedeem",
        value
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.lending.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    createPool(value: MsgCreatePool) {
      return {
        typeUrl: "/side.lending.MsgCreatePool",
        value: MsgCreatePool.fromPartial(value)
      };
    },
    addLiquidity(value: MsgAddLiquidity) {
      return {
        typeUrl: "/side.lending.MsgAddLiquidity",
        value: MsgAddLiquidity.fromPartial(value)
      };
    },
    removeLiquidity(value: MsgRemoveLiquidity) {
      return {
        typeUrl: "/side.lending.MsgRemoveLiquidity",
        value: MsgRemoveLiquidity.fromPartial(value)
      };
    },
    updatePoolConfig(value: MsgUpdatePoolConfig) {
      return {
        typeUrl: "/side.lending.MsgUpdatePoolConfig",
        value: MsgUpdatePoolConfig.fromPartial(value)
      };
    },
    apply(value: MsgApply) {
      return {
        typeUrl: "/side.lending.MsgApply",
        value: MsgApply.fromPartial(value)
      };
    },
    submitCets(value: MsgSubmitCets) {
      return {
        typeUrl: "/side.lending.MsgSubmitCets",
        value: MsgSubmitCets.fromPartial(value)
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransaction) {
      return {
        typeUrl: "/side.lending.MsgSubmitDepositTransaction",
        value: MsgSubmitDepositTransaction.fromPartial(value)
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/side.lending.MsgRedeem",
        value: MsgRedeem.fromPartial(value)
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value: MsgRepay.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.lending.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};