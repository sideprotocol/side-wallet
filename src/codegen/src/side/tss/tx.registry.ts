//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCompleteDKG, MsgSubmitSignatures, MsgRefresh, MsgCompleteRefreshing, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.tss.MsgCompleteDKG", MsgCompleteDKG], ["/side.tss.MsgSubmitSignatures", MsgSubmitSignatures], ["/side.tss.MsgRefresh", MsgRefresh], ["/side.tss.MsgCompleteRefreshing", MsgCompleteRefreshing], ["/side.tss.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.tss.MsgCompleteDKG",
        value: MsgCompleteDKG.encode(value).finish()
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.tss.MsgSubmitSignatures",
        value: MsgSubmitSignatures.encode(value).finish()
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/side.tss.MsgRefresh",
        value: MsgRefresh.encode(value).finish()
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/side.tss.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.tss.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.tss.MsgCompleteDKG",
        value
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.tss.MsgSubmitSignatures",
        value
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/side.tss.MsgRefresh",
        value
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/side.tss.MsgCompleteRefreshing",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.tss.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    completeDKG(value: MsgCompleteDKG) {
      return {
        typeUrl: "/side.tss.MsgCompleteDKG",
        value: MsgCompleteDKG.fromPartial(value)
      };
    },
    submitSignatures(value: MsgSubmitSignatures) {
      return {
        typeUrl: "/side.tss.MsgSubmitSignatures",
        value: MsgSubmitSignatures.fromPartial(value)
      };
    },
    refresh(value: MsgRefresh) {
      return {
        typeUrl: "/side.tss.MsgRefresh",
        value: MsgRefresh.fromPartial(value)
      };
    },
    completeRefreshing(value: MsgCompleteRefreshing) {
      return {
        typeUrl: "/side.tss.MsgCompleteRefreshing",
        value: MsgCompleteRefreshing.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.tss.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};