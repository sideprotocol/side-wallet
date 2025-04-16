//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgLiquidate, MsgSubmitSettlementSignatures, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.liquidation.MsgLiquidate", MsgLiquidate], ["/side.liquidation.MsgSubmitSettlementSignatures", MsgSubmitSettlementSignatures], ["/side.liquidation.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/side.liquidation.MsgLiquidate",
        value: MsgLiquidate.encode(value).finish()
      };
    },
    submitSettlementSignatures(value: MsgSubmitSettlementSignatures) {
      return {
        typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures",
        value: MsgSubmitSettlementSignatures.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.liquidation.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/side.liquidation.MsgLiquidate",
        value
      };
    },
    submitSettlementSignatures(value: MsgSubmitSettlementSignatures) {
      return {
        typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.liquidation.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/side.liquidation.MsgLiquidate",
        value: MsgLiquidate.fromPartial(value)
      };
    },
    submitSettlementSignatures(value: MsgSubmitSettlementSignatures) {
      return {
        typeUrl: "/side.liquidation.MsgSubmitSettlementSignatures",
        value: MsgSubmitSettlementSignatures.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.liquidation.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};