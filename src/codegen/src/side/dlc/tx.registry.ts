//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSubmitNonce, MsgSubmitAttestation, MsgSubmitOraclePubKey, MsgSubmitDCMPubKey, MsgCreateOracle, MsgCreateDCM, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/side.dlc.MsgSubmitNonce", MsgSubmitNonce], ["/side.dlc.MsgSubmitAttestation", MsgSubmitAttestation], ["/side.dlc.MsgSubmitOraclePubKey", MsgSubmitOraclePubKey], ["/side.dlc.MsgSubmitDCMPubKey", MsgSubmitDCMPubKey], ["/side.dlc.MsgCreateOracle", MsgCreateOracle], ["/side.dlc.MsgCreateDCM", MsgCreateDCM], ["/side.dlc.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    submitNonce(value: MsgSubmitNonce) {
      return {
        typeUrl: "/side.dlc.MsgSubmitNonce",
        value: MsgSubmitNonce.encode(value).finish()
      };
    },
    submitAttestation(value: MsgSubmitAttestation) {
      return {
        typeUrl: "/side.dlc.MsgSubmitAttestation",
        value: MsgSubmitAttestation.encode(value).finish()
      };
    },
    submitOraclePubKey(value: MsgSubmitOraclePubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitOraclePubKey",
        value: MsgSubmitOraclePubKey.encode(value).finish()
      };
    },
    submitDCMPubKey(value: MsgSubmitDCMPubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitDCMPubKey",
        value: MsgSubmitDCMPubKey.encode(value).finish()
      };
    },
    createOracle(value: MsgCreateOracle) {
      return {
        typeUrl: "/side.dlc.MsgCreateOracle",
        value: MsgCreateOracle.encode(value).finish()
      };
    },
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/side.dlc.MsgCreateDCM",
        value: MsgCreateDCM.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.dlc.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    submitNonce(value: MsgSubmitNonce) {
      return {
        typeUrl: "/side.dlc.MsgSubmitNonce",
        value
      };
    },
    submitAttestation(value: MsgSubmitAttestation) {
      return {
        typeUrl: "/side.dlc.MsgSubmitAttestation",
        value
      };
    },
    submitOraclePubKey(value: MsgSubmitOraclePubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitOraclePubKey",
        value
      };
    },
    submitDCMPubKey(value: MsgSubmitDCMPubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitDCMPubKey",
        value
      };
    },
    createOracle(value: MsgCreateOracle) {
      return {
        typeUrl: "/side.dlc.MsgCreateOracle",
        value
      };
    },
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/side.dlc.MsgCreateDCM",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.dlc.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    submitNonce(value: MsgSubmitNonce) {
      return {
        typeUrl: "/side.dlc.MsgSubmitNonce",
        value: MsgSubmitNonce.fromPartial(value)
      };
    },
    submitAttestation(value: MsgSubmitAttestation) {
      return {
        typeUrl: "/side.dlc.MsgSubmitAttestation",
        value: MsgSubmitAttestation.fromPartial(value)
      };
    },
    submitOraclePubKey(value: MsgSubmitOraclePubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitOraclePubKey",
        value: MsgSubmitOraclePubKey.fromPartial(value)
      };
    },
    submitDCMPubKey(value: MsgSubmitDCMPubKey) {
      return {
        typeUrl: "/side.dlc.MsgSubmitDCMPubKey",
        value: MsgSubmitDCMPubKey.fromPartial(value)
      };
    },
    createOracle(value: MsgCreateOracle) {
      return {
        typeUrl: "/side.dlc.MsgCreateOracle",
        value: MsgCreateOracle.fromPartial(value)
      };
    },
    createDCM(value: MsgCreateDCM) {
      return {
        typeUrl: "/side.dlc.MsgCreateDCM",
        value: MsgCreateDCM.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/side.dlc.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};