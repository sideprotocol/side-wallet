//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  nonceQueueSize: number;
  nonceGenerationBatchSize: number;
  nonceGenerationInterval: bigint;
  allowedOracleParticipants: string[];
  oracleParticipantNum: number;
  oracleParticipantThreshold: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.dlc.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  nonce_queue_size?: number;
  nonce_generation_batch_size?: number;
  nonce_generation_interval?: string;
  allowed_oracle_participants?: string[];
  oracle_participant_num?: number;
  oracle_participant_threshold?: number;
}
export interface ParamsAminoMsg {
  type: "/side.dlc.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  nonce_queue_size: number;
  nonce_generation_batch_size: number;
  nonce_generation_interval: bigint;
  allowed_oracle_participants: string[];
  oracle_participant_num: number;
  oracle_participant_threshold: number;
}
function createBaseParams(): Params {
  return {
    nonceQueueSize: 0,
    nonceGenerationBatchSize: 0,
    nonceGenerationInterval: BigInt(0),
    allowedOracleParticipants: [],
    oracleParticipantNum: 0,
    oracleParticipantThreshold: 0
  };
}
export const Params = {
  typeUrl: "/side.dlc.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nonceQueueSize !== 0) {
      writer.uint32(8).uint32(message.nonceQueueSize);
    }
    if (message.nonceGenerationBatchSize !== 0) {
      writer.uint32(16).uint32(message.nonceGenerationBatchSize);
    }
    if (message.nonceGenerationInterval !== BigInt(0)) {
      writer.uint32(24).int64(message.nonceGenerationInterval);
    }
    for (const v of message.allowedOracleParticipants) {
      writer.uint32(34).string(v!);
    }
    if (message.oracleParticipantNum !== 0) {
      writer.uint32(40).uint32(message.oracleParticipantNum);
    }
    if (message.oracleParticipantThreshold !== 0) {
      writer.uint32(48).uint32(message.oracleParticipantThreshold);
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
          message.nonceQueueSize = reader.uint32();
          break;
        case 2:
          message.nonceGenerationBatchSize = reader.uint32();
          break;
        case 3:
          message.nonceGenerationInterval = reader.int64();
          break;
        case 4:
          message.allowedOracleParticipants.push(reader.string());
          break;
        case 5:
          message.oracleParticipantNum = reader.uint32();
          break;
        case 6:
          message.oracleParticipantThreshold = reader.uint32();
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
    message.nonceQueueSize = object.nonceQueueSize ?? 0;
    message.nonceGenerationBatchSize = object.nonceGenerationBatchSize ?? 0;
    message.nonceGenerationInterval = object.nonceGenerationInterval !== undefined && object.nonceGenerationInterval !== null ? BigInt(object.nonceGenerationInterval.toString()) : BigInt(0);
    message.allowedOracleParticipants = object.allowedOracleParticipants?.map(e => e) || [];
    message.oracleParticipantNum = object.oracleParticipantNum ?? 0;
    message.oracleParticipantThreshold = object.oracleParticipantThreshold ?? 0;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.nonce_queue_size !== undefined && object.nonce_queue_size !== null) {
      message.nonceQueueSize = object.nonce_queue_size;
    }
    if (object.nonce_generation_batch_size !== undefined && object.nonce_generation_batch_size !== null) {
      message.nonceGenerationBatchSize = object.nonce_generation_batch_size;
    }
    if (object.nonce_generation_interval !== undefined && object.nonce_generation_interval !== null) {
      message.nonceGenerationInterval = BigInt(object.nonce_generation_interval);
    }
    message.allowedOracleParticipants = object.allowed_oracle_participants?.map(e => e) || [];
    if (object.oracle_participant_num !== undefined && object.oracle_participant_num !== null) {
      message.oracleParticipantNum = object.oracle_participant_num;
    }
    if (object.oracle_participant_threshold !== undefined && object.oracle_participant_threshold !== null) {
      message.oracleParticipantThreshold = object.oracle_participant_threshold;
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.nonce_queue_size = message.nonceQueueSize === 0 ? undefined : message.nonceQueueSize;
    obj.nonce_generation_batch_size = message.nonceGenerationBatchSize === 0 ? undefined : message.nonceGenerationBatchSize;
    obj.nonce_generation_interval = message.nonceGenerationInterval !== BigInt(0) ? message.nonceGenerationInterval.toString() : undefined;
    if (message.allowedOracleParticipants) {
      obj.allowed_oracle_participants = message.allowedOracleParticipants.map(e => e);
    } else {
      obj.allowed_oracle_participants = message.allowedOracleParticipants;
    }
    obj.oracle_participant_num = message.oracleParticipantNum === 0 ? undefined : message.oracleParticipantNum;
    obj.oracle_participant_threshold = message.oracleParticipantThreshold === 0 ? undefined : message.oracleParticipantThreshold;
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
      typeUrl: "/side.dlc.Params",
      value: Params.encode(message).finish()
    };
  }
};