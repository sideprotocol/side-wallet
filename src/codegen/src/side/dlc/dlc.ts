//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
export enum DLCOracleStatus {
  Oracle_status_Enable = 0,
  Oracle_status_Disable = 1,
  UNRECOGNIZED = -1,
}
export const DLCOracleStatusSDKType = DLCOracleStatus;
export const DLCOracleStatusAmino = DLCOracleStatus;
export function dLCOracleStatusFromJSON(object: any): DLCOracleStatus {
  switch (object) {
    case 0:
    case "Oracle_status_Enable":
      return DLCOracleStatus.Oracle_status_Enable;
    case 1:
    case "Oracle_status_Disable":
      return DLCOracleStatus.Oracle_status_Disable;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DLCOracleStatus.UNRECOGNIZED;
  }
}
export function dLCOracleStatusToJSON(object: DLCOracleStatus): string {
  switch (object) {
    case DLCOracleStatus.Oracle_status_Enable:
      return "Oracle_status_Enable";
    case DLCOracleStatus.Oracle_status_Disable:
      return "Oracle_status_Disable";
    case DLCOracleStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum DCMStatus {
  DCM_status_Enable = 0,
  DCM_status_Disable = 1,
  UNRECOGNIZED = -1,
}
export const DCMStatusSDKType = DCMStatus;
export const DCMStatusAmino = DCMStatus;
export function dCMStatusFromJSON(object: any): DCMStatus {
  switch (object) {
    case 0:
    case "DCM_status_Enable":
      return DCMStatus.DCM_status_Enable;
    case 1:
    case "DCM_status_Disable":
      return DCMStatus.DCM_status_Disable;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DCMStatus.UNRECOGNIZED;
  }
}
export function dCMStatusToJSON(object: DCMStatus): string {
  switch (object) {
    case DCMStatus.DCM_status_Enable:
      return "DCM_status_Enable";
    case DCMStatus.DCM_status_Disable:
      return "DCM_status_Disable";
    case DCMStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum DlcEventType {
  UNSPECIFIED = 0,
  PRICE = 1,
  DATE = 2,
  LENDING = 3,
  UNRECOGNIZED = -1,
}
export const DlcEventTypeSDKType = DlcEventType;
export const DlcEventTypeAmino = DlcEventType;
export function dlcEventTypeFromJSON(object: any): DlcEventType {
  switch (object) {
    case 0:
    case "UNSPECIFIED":
      return DlcEventType.UNSPECIFIED;
    case 1:
    case "PRICE":
      return DlcEventType.PRICE;
    case 2:
    case "DATE":
      return DlcEventType.DATE;
    case 3:
    case "LENDING":
      return DlcEventType.LENDING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DlcEventType.UNRECOGNIZED;
  }
}
export function dlcEventTypeToJSON(object: DlcEventType): string {
  switch (object) {
    case DlcEventType.UNSPECIFIED:
      return "UNSPECIFIED";
    case DlcEventType.PRICE:
      return "PRICE";
    case DlcEventType.DATE:
      return "DATE";
    case DlcEventType.LENDING:
      return "LENDING";
    case DlcEventType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Signing intent */
export enum SigningIntent {
  SIGNING_INTENT_DEFAULT = 0,
  UNRECOGNIZED = -1,
}
export const SigningIntentSDKType = SigningIntent;
export const SigningIntentAmino = SigningIntent;
export function signingIntentFromJSON(object: any): SigningIntent {
  switch (object) {
    case 0:
    case "SIGNING_INTENT_DEFAULT":
      return SigningIntent.SIGNING_INTENT_DEFAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SigningIntent.UNRECOGNIZED;
  }
}
export function signingIntentToJSON(object: SigningIntent): string {
  switch (object) {
    case SigningIntent.SIGNING_INTENT_DEFAULT:
      return "SIGNING_INTENT_DEFAULT";
    case SigningIntent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** DKG intent */
export enum DKGIntent {
  DKG_INTENT_DEFAULT = 0,
  DKG_INTENT_PRICE_EVENT_NONCE = 10000,
  DKG_INTENT_DATE_EVENT_NONCE = 20000,
  DKG_INTENT_LENDING_EVENT_NONCE = 30000,
  UNRECOGNIZED = -1,
}
export const DKGIntentSDKType = DKGIntent;
export const DKGIntentAmino = DKGIntent;
export function dKGIntentFromJSON(object: any): DKGIntent {
  switch (object) {
    case 0:
    case "DKG_INTENT_DEFAULT":
      return DKGIntent.DKG_INTENT_DEFAULT;
    case 10000:
    case "DKG_INTENT_PRICE_EVENT_NONCE":
      return DKGIntent.DKG_INTENT_PRICE_EVENT_NONCE;
    case 20000:
    case "DKG_INTENT_DATE_EVENT_NONCE":
      return DKGIntent.DKG_INTENT_DATE_EVENT_NONCE;
    case 30000:
    case "DKG_INTENT_LENDING_EVENT_NONCE":
      return DKGIntent.DKG_INTENT_LENDING_EVENT_NONCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DKGIntent.UNRECOGNIZED;
  }
}
export function dKGIntentToJSON(object: DKGIntent): string {
  switch (object) {
    case DKGIntent.DKG_INTENT_DEFAULT:
      return "DKG_INTENT_DEFAULT";
    case DKGIntent.DKG_INTENT_PRICE_EVENT_NONCE:
      return "DKG_INTENT_PRICE_EVENT_NONCE";
    case DKGIntent.DKG_INTENT_DATE_EVENT_NONCE:
      return "DKG_INTENT_DATE_EVENT_NONCE";
    case DKGIntent.DKG_INTENT_LENDING_EVENT_NONCE:
      return "DKG_INTENT_LENDING_EVENT_NONCE";
    case DKGIntent.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface DLCOracle {
  id: bigint;
  desc: string;
  pubkey: string;
  nonceIndex: bigint;
  time: Date;
  status: DLCOracleStatus;
}
export interface DLCOracleProtoMsg {
  typeUrl: "/side.dlc.DLCOracle";
  value: Uint8Array;
}
export interface DLCOracleAmino {
  id?: string;
  desc?: string;
  pubkey?: string;
  nonce_index?: string;
  time?: string;
  status?: DLCOracleStatus;
}
export interface DLCOracleAminoMsg {
  type: "/side.dlc.DLCOracle";
  value: DLCOracleAmino;
}
export interface DLCOracleSDKType {
  id: bigint;
  desc: string;
  pubkey: string;
  nonce_index: bigint;
  time: Date;
  status: DLCOracleStatus;
}
export interface DCM {
  id: bigint;
  desc: string;
  pubkey: string;
  time: Date;
  status: DCMStatus;
}
export interface DCMProtoMsg {
  typeUrl: "/side.dlc.DCM";
  value: Uint8Array;
}
export interface DCMAmino {
  id?: string;
  desc?: string;
  pubkey?: string;
  time?: string;
  status?: DCMStatus;
}
export interface DCMAminoMsg {
  type: "/side.dlc.DCM";
  value: DCMAmino;
}
export interface DCMSDKType {
  id: bigint;
  desc: string;
  pubkey: string;
  time: Date;
  status: DCMStatus;
}
export interface DLCNonce {
  index: bigint;
  nonce: string;
  oraclePubkey: string;
  time: Date;
}
export interface DLCNonceProtoMsg {
  typeUrl: "/side.dlc.DLCNonce";
  value: Uint8Array;
}
export interface DLCNonceAmino {
  index?: string;
  nonce?: string;
  oracle_pubkey?: string;
  time?: string;
}
export interface DLCNonceAminoMsg {
  type: "/side.dlc.DLCNonce";
  value: DLCNonceAmino;
}
export interface DLCNonceSDKType {
  index: bigint;
  nonce: string;
  oracle_pubkey: string;
  time: Date;
}
export interface DLCEvent {
  id: bigint;
  type: DlcEventType;
  nonce: string;
  pubkey: string;
  description: string;
  outcomes: string[];
  hasTriggered: boolean;
  outcomeIndex: number;
  publishAt: Date;
  triggerAt: Date;
}
export interface DLCEventProtoMsg {
  typeUrl: "/side.dlc.DLCEvent";
  value: Uint8Array;
}
export interface DLCEventAmino {
  id?: string;
  type?: DlcEventType;
  nonce?: string;
  pubkey?: string;
  description?: string;
  outcomes?: string[];
  has_triggered?: boolean;
  outcome_index?: number;
  publish_at?: string;
  trigger_at?: string;
}
export interface DLCEventAminoMsg {
  type: "/side.dlc.DLCEvent";
  value: DLCEventAmino;
}
export interface DLCEventSDKType {
  id: bigint;
  type: DlcEventType;
  nonce: string;
  pubkey: string;
  description: string;
  outcomes: string[];
  has_triggered: boolean;
  outcome_index: number;
  publish_at: Date;
  trigger_at: Date;
}
export interface DLCAttestation {
  id: bigint;
  eventId: bigint;
  outcome: string;
  pubkey: string;
  signature: string;
  time: Date;
}
export interface DLCAttestationProtoMsg {
  typeUrl: "/side.dlc.DLCAttestation";
  value: Uint8Array;
}
export interface DLCAttestationAmino {
  id?: string;
  event_id?: string;
  outcome?: string;
  pubkey?: string;
  signature?: string;
  time?: string;
}
export interface DLCAttestationAminoMsg {
  type: "/side.dlc.DLCAttestation";
  value: DLCAttestationAmino;
}
export interface DLCAttestationSDKType {
  id: bigint;
  event_id: bigint;
  outcome: string;
  pubkey: string;
  signature: string;
  time: Date;
}
/** Oracle participant liveness */
export interface OracleParticipantLiveness {
  /** consensus pub key */
  consensusPubkey: string;
  /** Indicates if the participant is alive */
  isAlive: boolean;
  /** Id of the last participating DKG */
  lastDkgId: bigint;
  /** last block height at which the participant was active */
  lastBlockHeight: bigint;
}
export interface OracleParticipantLivenessProtoMsg {
  typeUrl: "/side.dlc.OracleParticipantLiveness";
  value: Uint8Array;
}
/** Oracle participant liveness */
export interface OracleParticipantLivenessAmino {
  /** consensus pub key */
  consensus_pubkey?: string;
  /** Indicates if the participant is alive */
  is_alive?: boolean;
  /** Id of the last participating DKG */
  last_dkg_id?: string;
  /** last block height at which the participant was active */
  last_block_height?: string;
}
export interface OracleParticipantLivenessAminoMsg {
  type: "/side.dlc.OracleParticipantLiveness";
  value: OracleParticipantLivenessAmino;
}
/** Oracle participant liveness */
export interface OracleParticipantLivenessSDKType {
  consensus_pubkey: string;
  is_alive: boolean;
  last_dkg_id: bigint;
  last_block_height: bigint;
}
function createBaseDLCOracle(): DLCOracle {
  return {
    id: BigInt(0),
    desc: "",
    pubkey: "",
    nonceIndex: BigInt(0),
    time: new Date(),
    status: 0
  };
}
export const DLCOracle = {
  typeUrl: "/side.dlc.DLCOracle",
  encode(message: DLCOracle, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.desc !== "") {
      writer.uint32(18).string(message.desc);
    }
    if (message.pubkey !== "") {
      writer.uint32(26).string(message.pubkey);
    }
    if (message.nonceIndex !== BigInt(0)) {
      writer.uint32(32).uint64(message.nonceIndex);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DLCOracle {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDLCOracle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.desc = reader.string();
          break;
        case 3:
          message.pubkey = reader.string();
          break;
        case 4:
          message.nonceIndex = reader.uint64();
          break;
        case 5:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DLCOracle>): DLCOracle {
    const message = createBaseDLCOracle();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.desc = object.desc ?? "";
    message.pubkey = object.pubkey ?? "";
    message.nonceIndex = object.nonceIndex !== undefined && object.nonceIndex !== null ? BigInt(object.nonceIndex.toString()) : BigInt(0);
    message.time = object.time ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: DLCOracleAmino): DLCOracle {
    const message = createBaseDLCOracle();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = object.desc;
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey;
    }
    if (object.nonce_index !== undefined && object.nonce_index !== null) {
      message.nonceIndex = BigInt(object.nonce_index);
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = fromTimestamp(Timestamp.fromAmino(object.time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: DLCOracle): DLCOracleAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.desc = message.desc === "" ? undefined : message.desc;
    obj.pubkey = message.pubkey === "" ? undefined : message.pubkey;
    obj.nonce_index = message.nonceIndex !== BigInt(0) ? message.nonceIndex.toString() : undefined;
    obj.time = message.time ? Timestamp.toAmino(toTimestamp(message.time)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: DLCOracleAminoMsg): DLCOracle {
    return DLCOracle.fromAmino(object.value);
  },
  fromProtoMsg(message: DLCOracleProtoMsg): DLCOracle {
    return DLCOracle.decode(message.value);
  },
  toProto(message: DLCOracle): Uint8Array {
    return DLCOracle.encode(message).finish();
  },
  toProtoMsg(message: DLCOracle): DLCOracleProtoMsg {
    return {
      typeUrl: "/side.dlc.DLCOracle",
      value: DLCOracle.encode(message).finish()
    };
  }
};
function createBaseDCM(): DCM {
  return {
    id: BigInt(0),
    desc: "",
    pubkey: "",
    time: new Date(),
    status: 0
  };
}
export const DCM = {
  typeUrl: "/side.dlc.DCM",
  encode(message: DCM, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.desc !== "") {
      writer.uint32(18).string(message.desc);
    }
    if (message.pubkey !== "") {
      writer.uint32(26).string(message.pubkey);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DCM {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDCM();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.desc = reader.string();
          break;
        case 3:
          message.pubkey = reader.string();
          break;
        case 4:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DCM>): DCM {
    const message = createBaseDCM();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.desc = object.desc ?? "";
    message.pubkey = object.pubkey ?? "";
    message.time = object.time ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: DCMAmino): DCM {
    const message = createBaseDCM();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.desc !== undefined && object.desc !== null) {
      message.desc = object.desc;
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey;
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = fromTimestamp(Timestamp.fromAmino(object.time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: DCM): DCMAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.desc = message.desc === "" ? undefined : message.desc;
    obj.pubkey = message.pubkey === "" ? undefined : message.pubkey;
    obj.time = message.time ? Timestamp.toAmino(toTimestamp(message.time)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: DCMAminoMsg): DCM {
    return DCM.fromAmino(object.value);
  },
  fromProtoMsg(message: DCMProtoMsg): DCM {
    return DCM.decode(message.value);
  },
  toProto(message: DCM): Uint8Array {
    return DCM.encode(message).finish();
  },
  toProtoMsg(message: DCM): DCMProtoMsg {
    return {
      typeUrl: "/side.dlc.DCM",
      value: DCM.encode(message).finish()
    };
  }
};
function createBaseDLCNonce(): DLCNonce {
  return {
    index: BigInt(0),
    nonce: "",
    oraclePubkey: "",
    time: new Date()
  };
}
export const DLCNonce = {
  typeUrl: "/side.dlc.DLCNonce",
  encode(message: DLCNonce, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.index !== BigInt(0)) {
      writer.uint32(8).uint64(message.index);
    }
    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }
    if (message.oraclePubkey !== "") {
      writer.uint32(26).string(message.oraclePubkey);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DLCNonce {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDLCNonce();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint64();
          break;
        case 2:
          message.nonce = reader.string();
          break;
        case 3:
          message.oraclePubkey = reader.string();
          break;
        case 4:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DLCNonce>): DLCNonce {
    const message = createBaseDLCNonce();
    message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
    message.nonce = object.nonce ?? "";
    message.oraclePubkey = object.oraclePubkey ?? "";
    message.time = object.time ?? undefined;
    return message;
  },
  fromAmino(object: DLCNonceAmino): DLCNonce {
    const message = createBaseDLCNonce();
    if (object.index !== undefined && object.index !== null) {
      message.index = BigInt(object.index);
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    if (object.oracle_pubkey !== undefined && object.oracle_pubkey !== null) {
      message.oraclePubkey = object.oracle_pubkey;
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = fromTimestamp(Timestamp.fromAmino(object.time));
    }
    return message;
  },
  toAmino(message: DLCNonce): DLCNonceAmino {
    const obj: any = {};
    obj.index = message.index !== BigInt(0) ? message.index.toString() : undefined;
    obj.nonce = message.nonce === "" ? undefined : message.nonce;
    obj.oracle_pubkey = message.oraclePubkey === "" ? undefined : message.oraclePubkey;
    obj.time = message.time ? Timestamp.toAmino(toTimestamp(message.time)) : undefined;
    return obj;
  },
  fromAminoMsg(object: DLCNonceAminoMsg): DLCNonce {
    return DLCNonce.fromAmino(object.value);
  },
  fromProtoMsg(message: DLCNonceProtoMsg): DLCNonce {
    return DLCNonce.decode(message.value);
  },
  toProto(message: DLCNonce): Uint8Array {
    return DLCNonce.encode(message).finish();
  },
  toProtoMsg(message: DLCNonce): DLCNonceProtoMsg {
    return {
      typeUrl: "/side.dlc.DLCNonce",
      value: DLCNonce.encode(message).finish()
    };
  }
};
function createBaseDLCEvent(): DLCEvent {
  return {
    id: BigInt(0),
    type: 0,
    nonce: "",
    pubkey: "",
    description: "",
    outcomes: [],
    hasTriggered: false,
    outcomeIndex: 0,
    publishAt: new Date(),
    triggerAt: new Date()
  };
}
export const DLCEvent = {
  typeUrl: "/side.dlc.DLCEvent",
  encode(message: DLCEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.nonce !== "") {
      writer.uint32(26).string(message.nonce);
    }
    if (message.pubkey !== "") {
      writer.uint32(34).string(message.pubkey);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    for (const v of message.outcomes) {
      writer.uint32(50).string(v!);
    }
    if (message.hasTriggered === true) {
      writer.uint32(56).bool(message.hasTriggered);
    }
    if (message.outcomeIndex !== 0) {
      writer.uint32(64).int32(message.outcomeIndex);
    }
    if (message.publishAt !== undefined) {
      Timestamp.encode(toTimestamp(message.publishAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.triggerAt !== undefined) {
      Timestamp.encode(toTimestamp(message.triggerAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DLCEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDLCEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        case 3:
          message.nonce = reader.string();
          break;
        case 4:
          message.pubkey = reader.string();
          break;
        case 5:
          message.description = reader.string();
          break;
        case 6:
          message.outcomes.push(reader.string());
          break;
        case 7:
          message.hasTriggered = reader.bool();
          break;
        case 8:
          message.outcomeIndex = reader.int32();
          break;
        case 9:
          message.publishAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.triggerAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DLCEvent>): DLCEvent {
    const message = createBaseDLCEvent();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.type = object.type ?? 0;
    message.nonce = object.nonce ?? "";
    message.pubkey = object.pubkey ?? "";
    message.description = object.description ?? "";
    message.outcomes = object.outcomes?.map(e => e) || [];
    message.hasTriggered = object.hasTriggered ?? false;
    message.outcomeIndex = object.outcomeIndex ?? 0;
    message.publishAt = object.publishAt ?? undefined;
    message.triggerAt = object.triggerAt ?? undefined;
    return message;
  },
  fromAmino(object: DLCEventAmino): DLCEvent {
    const message = createBaseDLCEvent();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.outcomes = object.outcomes?.map(e => e) || [];
    if (object.has_triggered !== undefined && object.has_triggered !== null) {
      message.hasTriggered = object.has_triggered;
    }
    if (object.outcome_index !== undefined && object.outcome_index !== null) {
      message.outcomeIndex = object.outcome_index;
    }
    if (object.publish_at !== undefined && object.publish_at !== null) {
      message.publishAt = fromTimestamp(Timestamp.fromAmino(object.publish_at));
    }
    if (object.trigger_at !== undefined && object.trigger_at !== null) {
      message.triggerAt = fromTimestamp(Timestamp.fromAmino(object.trigger_at));
    }
    return message;
  },
  toAmino(message: DLCEvent): DLCEventAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.type = message.type === 0 ? undefined : message.type;
    obj.nonce = message.nonce === "" ? undefined : message.nonce;
    obj.pubkey = message.pubkey === "" ? undefined : message.pubkey;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.outcomes) {
      obj.outcomes = message.outcomes.map(e => e);
    } else {
      obj.outcomes = message.outcomes;
    }
    obj.has_triggered = message.hasTriggered === false ? undefined : message.hasTriggered;
    obj.outcome_index = message.outcomeIndex === 0 ? undefined : message.outcomeIndex;
    obj.publish_at = message.publishAt ? Timestamp.toAmino(toTimestamp(message.publishAt)) : undefined;
    obj.trigger_at = message.triggerAt ? Timestamp.toAmino(toTimestamp(message.triggerAt)) : undefined;
    return obj;
  },
  fromAminoMsg(object: DLCEventAminoMsg): DLCEvent {
    return DLCEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: DLCEventProtoMsg): DLCEvent {
    return DLCEvent.decode(message.value);
  },
  toProto(message: DLCEvent): Uint8Array {
    return DLCEvent.encode(message).finish();
  },
  toProtoMsg(message: DLCEvent): DLCEventProtoMsg {
    return {
      typeUrl: "/side.dlc.DLCEvent",
      value: DLCEvent.encode(message).finish()
    };
  }
};
function createBaseDLCAttestation(): DLCAttestation {
  return {
    id: BigInt(0),
    eventId: BigInt(0),
    outcome: "",
    pubkey: "",
    signature: "",
    time: new Date()
  };
}
export const DLCAttestation = {
  typeUrl: "/side.dlc.DLCAttestation",
  encode(message: DLCAttestation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.eventId !== BigInt(0)) {
      writer.uint32(16).uint64(message.eventId);
    }
    if (message.outcome !== "") {
      writer.uint32(26).string(message.outcome);
    }
    if (message.pubkey !== "") {
      writer.uint32(34).string(message.pubkey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DLCAttestation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDLCAttestation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.eventId = reader.uint64();
          break;
        case 3:
          message.outcome = reader.string();
          break;
        case 4:
          message.pubkey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        case 6:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DLCAttestation>): DLCAttestation {
    const message = createBaseDLCAttestation();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.eventId = object.eventId !== undefined && object.eventId !== null ? BigInt(object.eventId.toString()) : BigInt(0);
    message.outcome = object.outcome ?? "";
    message.pubkey = object.pubkey ?? "";
    message.signature = object.signature ?? "";
    message.time = object.time ?? undefined;
    return message;
  },
  fromAmino(object: DLCAttestationAmino): DLCAttestation {
    const message = createBaseDLCAttestation();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.event_id !== undefined && object.event_id !== null) {
      message.eventId = BigInt(object.event_id);
    }
    if (object.outcome !== undefined && object.outcome !== null) {
      message.outcome = object.outcome;
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = object.pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = fromTimestamp(Timestamp.fromAmino(object.time));
    }
    return message;
  },
  toAmino(message: DLCAttestation): DLCAttestationAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.event_id = message.eventId !== BigInt(0) ? message.eventId.toString() : undefined;
    obj.outcome = message.outcome === "" ? undefined : message.outcome;
    obj.pubkey = message.pubkey === "" ? undefined : message.pubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    obj.time = message.time ? Timestamp.toAmino(toTimestamp(message.time)) : undefined;
    return obj;
  },
  fromAminoMsg(object: DLCAttestationAminoMsg): DLCAttestation {
    return DLCAttestation.fromAmino(object.value);
  },
  fromProtoMsg(message: DLCAttestationProtoMsg): DLCAttestation {
    return DLCAttestation.decode(message.value);
  },
  toProto(message: DLCAttestation): Uint8Array {
    return DLCAttestation.encode(message).finish();
  },
  toProtoMsg(message: DLCAttestation): DLCAttestationProtoMsg {
    return {
      typeUrl: "/side.dlc.DLCAttestation",
      value: DLCAttestation.encode(message).finish()
    };
  }
};
function createBaseOracleParticipantLiveness(): OracleParticipantLiveness {
  return {
    consensusPubkey: "",
    isAlive: false,
    lastDkgId: BigInt(0),
    lastBlockHeight: BigInt(0)
  };
}
export const OracleParticipantLiveness = {
  typeUrl: "/side.dlc.OracleParticipantLiveness",
  encode(message: OracleParticipantLiveness, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consensusPubkey !== "") {
      writer.uint32(10).string(message.consensusPubkey);
    }
    if (message.isAlive === true) {
      writer.uint32(16).bool(message.isAlive);
    }
    if (message.lastDkgId !== BigInt(0)) {
      writer.uint32(24).uint64(message.lastDkgId);
    }
    if (message.lastBlockHeight !== BigInt(0)) {
      writer.uint32(32).int64(message.lastBlockHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OracleParticipantLiveness {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOracleParticipantLiveness();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusPubkey = reader.string();
          break;
        case 2:
          message.isAlive = reader.bool();
          break;
        case 3:
          message.lastDkgId = reader.uint64();
          break;
        case 4:
          message.lastBlockHeight = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OracleParticipantLiveness>): OracleParticipantLiveness {
    const message = createBaseOracleParticipantLiveness();
    message.consensusPubkey = object.consensusPubkey ?? "";
    message.isAlive = object.isAlive ?? false;
    message.lastDkgId = object.lastDkgId !== undefined && object.lastDkgId !== null ? BigInt(object.lastDkgId.toString()) : BigInt(0);
    message.lastBlockHeight = object.lastBlockHeight !== undefined && object.lastBlockHeight !== null ? BigInt(object.lastBlockHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: OracleParticipantLivenessAmino): OracleParticipantLiveness {
    const message = createBaseOracleParticipantLiveness();
    if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
      message.consensusPubkey = object.consensus_pubkey;
    }
    if (object.is_alive !== undefined && object.is_alive !== null) {
      message.isAlive = object.is_alive;
    }
    if (object.last_dkg_id !== undefined && object.last_dkg_id !== null) {
      message.lastDkgId = BigInt(object.last_dkg_id);
    }
    if (object.last_block_height !== undefined && object.last_block_height !== null) {
      message.lastBlockHeight = BigInt(object.last_block_height);
    }
    return message;
  },
  toAmino(message: OracleParticipantLiveness): OracleParticipantLivenessAmino {
    const obj: any = {};
    obj.consensus_pubkey = message.consensusPubkey === "" ? undefined : message.consensusPubkey;
    obj.is_alive = message.isAlive === false ? undefined : message.isAlive;
    obj.last_dkg_id = message.lastDkgId !== BigInt(0) ? message.lastDkgId.toString() : undefined;
    obj.last_block_height = message.lastBlockHeight !== BigInt(0) ? message.lastBlockHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: OracleParticipantLivenessAminoMsg): OracleParticipantLiveness {
    return OracleParticipantLiveness.fromAmino(object.value);
  },
  fromProtoMsg(message: OracleParticipantLivenessProtoMsg): OracleParticipantLiveness {
    return OracleParticipantLiveness.decode(message.value);
  },
  toProto(message: OracleParticipantLiveness): Uint8Array {
    return OracleParticipantLiveness.encode(message).finish();
  },
  toProtoMsg(message: OracleParticipantLiveness): OracleParticipantLivenessProtoMsg {
    return {
      typeUrl: "/side.dlc.OracleParticipantLiveness",
      value: OracleParticipantLiveness.encode(message).finish()
    };
  }
};