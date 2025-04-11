//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgLiquidate, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.liquidation.MsgLiquidate", MsgLiquidate], ["/side.liquidation.MsgUpdateParams", MsgUpdateParams]];
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
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.liquidation.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};