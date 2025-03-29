//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreatePool, MsgAddLiquidity, MsgRemoveLiquidity, MsgUpdatePoolConfig, MsgApply, MsgSubmitCets, MsgApprove, MsgSubmitRepaymentAdaptorSignatures, MsgCancel, MsgSubmitCancellationSignatures, MsgRepay, MsgSubmitLiquidationSignatures, MsgSubmitPrice, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.lending.MsgCreatePool", MsgCreatePool], ["/side.lending.MsgAddLiquidity", MsgAddLiquidity], ["/side.lending.MsgRemoveLiquidity", MsgRemoveLiquidity], ["/side.lending.MsgUpdatePoolConfig", MsgUpdatePoolConfig], ["/side.lending.MsgApply", MsgApply], ["/side.lending.MsgSubmitCets", MsgSubmitCets], ["/side.lending.MsgApprove", MsgApprove], ["/side.lending.MsgSubmitRepaymentAdaptorSignatures", MsgSubmitRepaymentAdaptorSignatures], ["/side.lending.MsgCancel", MsgCancel], ["/side.lending.MsgSubmitCancellationSignatures", MsgSubmitCancellationSignatures], ["/side.lending.MsgRepay", MsgRepay], ["/side.lending.MsgSubmitLiquidationSignatures", MsgSubmitLiquidationSignatures], ["/side.lending.MsgSubmitPrice", MsgSubmitPrice], ["/side.lending.MsgUpdateParams", MsgUpdateParams]];
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
    approve(value: MsgApprove) {
      return {
        typeUrl: "/side.lending.MsgApprove",
        value: MsgApprove.encode(value).finish()
      };
    },
    submitRepaymentAdaptorSignatures(value: MsgSubmitRepaymentAdaptorSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
        value: MsgSubmitRepaymentAdaptorSignatures.encode(value).finish()
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/side.lending.MsgCancel",
        value: MsgCancel.encode(value).finish()
      };
    },
    submitCancellationSignatures(value: MsgSubmitCancellationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitCancellationSignatures",
        value: MsgSubmitCancellationSignatures.encode(value).finish()
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value: MsgRepay.encode(value).finish()
      };
    },
    submitLiquidationSignatures(value: MsgSubmitLiquidationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitLiquidationSignatures",
        value: MsgSubmitLiquidationSignatures.encode(value).finish()
      };
    },
    submitPrice(value: MsgSubmitPrice) {
      return {
        typeUrl: "/side.lending.MsgSubmitPrice",
        value: MsgSubmitPrice.encode(value).finish()
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
    approve(value: MsgApprove) {
      return {
        typeUrl: "/side.lending.MsgApprove",
        value
      };
    },
    submitRepaymentAdaptorSignatures(value: MsgSubmitRepaymentAdaptorSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
        value
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/side.lending.MsgCancel",
        value
      };
    },
    submitCancellationSignatures(value: MsgSubmitCancellationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitCancellationSignatures",
        value
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value
      };
    },
    submitLiquidationSignatures(value: MsgSubmitLiquidationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitLiquidationSignatures",
        value
      };
    },
    submitPrice(value: MsgSubmitPrice) {
      return {
        typeUrl: "/side.lending.MsgSubmitPrice",
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
    approve(value: MsgApprove) {
      return {
        typeUrl: "/side.lending.MsgApprove",
        value: MsgApprove.fromPartial(value)
      };
    },
    submitRepaymentAdaptorSignatures(value: MsgSubmitRepaymentAdaptorSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
        value: MsgSubmitRepaymentAdaptorSignatures.fromPartial(value)
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/side.lending.MsgCancel",
        value: MsgCancel.fromPartial(value)
      };
    },
    submitCancellationSignatures(value: MsgSubmitCancellationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitCancellationSignatures",
        value: MsgSubmitCancellationSignatures.fromPartial(value)
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/side.lending.MsgRepay",
        value: MsgRepay.fromPartial(value)
      };
    },
    submitLiquidationSignatures(value: MsgSubmitLiquidationSignatures) {
      return {
        typeUrl: "/side.lending.MsgSubmitLiquidationSignatures",
        value: MsgSubmitLiquidationSignatures.fromPartial(value)
      };
    },
    submitPrice(value: MsgSubmitPrice) {
      return {
        typeUrl: "/side.lending.MsgSubmitPrice",
        value: MsgSubmitPrice.fromPartial(value)
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