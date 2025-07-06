//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  allowedDkgParticipants: DKGParticipant[];
  dkgTimeoutDuration: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.tss.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  allowed_dkg_participants?: DKGParticipantAmino[];
  dkg_timeout_duration?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/side.tss.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  allowed_dkg_participants: DKGParticipantSDKType[];
  dkg_timeout_duration: DurationSDKType;
}
/** DKG Participant */
export interface DKGParticipant {
  /** the optional moniker */
  moniker: string;
  /** participant consensus pub key */
  consensusPubkey: string;
}
export interface DKGParticipantProtoMsg {
  typeUrl: "/side.tss.DKGParticipant";
  value: Uint8Array;
}
/** DKG Participant */
export interface DKGParticipantAmino {
  /** the optional moniker */
  moniker?: string;
  /** participant consensus pub key */
  consensus_pubkey?: string;
}
export interface DKGParticipantAminoMsg {
  type: "/side.tss.DKGParticipant";
  value: DKGParticipantAmino;
}
/** DKG Participant */
export interface DKGParticipantSDKType {
  moniker: string;
  consensus_pubkey: string;
}
function createBaseParams(): Params {
  return {
    allowedDkgParticipants: [],
    dkgTimeoutDuration: Duration.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/side.tss.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.allowedDkgParticipants) {
      DKGParticipant.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.dkgTimeoutDuration !== undefined) {
      Duration.encode(message.dkgTimeoutDuration, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowedDkgParticipants.push(DKGParticipant.decode(reader, reader.uint32()));
          break;
        case 2:
          message.dkgTimeoutDuration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.allowedDkgParticipants = object.allowedDkgParticipants?.map(e => DKGParticipant.fromPartial(e)) || [];
    message.dkgTimeoutDuration = object.dkgTimeoutDuration !== undefined && object.dkgTimeoutDuration !== null ? Duration.fromPartial(object.dkgTimeoutDuration) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.allowedDkgParticipants = object.allowed_dkg_participants?.map(e => DKGParticipant.fromAmino(e)) || [];
    if (object.dkg_timeout_duration !== undefined && object.dkg_timeout_duration !== null) {
      message.dkgTimeoutDuration = Duration.fromAmino(object.dkg_timeout_duration);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.allowedDkgParticipants) {
      obj.allowed_dkg_participants = message.allowedDkgParticipants.map(e => e ? DKGParticipant.toAmino(e) : undefined);
    } else {
      obj.allowed_dkg_participants = message.allowedDkgParticipants;
    }
    obj.dkg_timeout_duration = message.dkgTimeoutDuration ? Duration.toAmino(message.dkgTimeoutDuration) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/side.tss.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseDKGParticipant(): DKGParticipant {
  return {
    moniker: "",
    consensusPubkey: ""
  };
}
export const DKGParticipant = {
  typeUrl: "/side.tss.DKGParticipant",
  encode(message: DKGParticipant, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.consensusPubkey !== "") {
      writer.uint32(18).string(message.consensusPubkey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DKGParticipant {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDKGParticipant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moniker = reader.string();
          break;
        case 2:
          message.consensusPubkey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DKGParticipant>): DKGParticipant {
    const message = createBaseDKGParticipant();
    message.moniker = object.moniker ?? "";
    message.consensusPubkey = object.consensusPubkey ?? "";
    return message;
  },
  fromAmino(object: DKGParticipantAmino): DKGParticipant {
    const message = createBaseDKGParticipant();
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    }
    if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
      message.consensusPubkey = object.consensus_pubkey;
    }
    return message;
  },
  toAmino(message: DKGParticipant): DKGParticipantAmino {
    const obj: any = {};
    obj.moniker = message.moniker === "" ? undefined : message.moniker;
    obj.consensus_pubkey = message.consensusPubkey === "" ? undefined : message.consensusPubkey;
    return obj;
  },
  fromAminoMsg(object: DKGParticipantAminoMsg): DKGParticipant {
    return DKGParticipant.fromAmino(object.value);
  },
  fromProtoMsg(message: DKGParticipantProtoMsg): DKGParticipant {
    return DKGParticipant.decode(message.value);
  },
  toProto(message: DKGParticipant): Uint8Array {
    return DKGParticipant.encode(message).finish();
  },
  toProtoMsg(message: DKGParticipant): DKGParticipantProtoMsg {
    return {
      typeUrl: "/side.tss.DKGParticipant",
      value: DKGParticipant.encode(message).finish()
    };
  }
};