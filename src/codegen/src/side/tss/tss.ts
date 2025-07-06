//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
/** DKG Status */
export enum DKGStatus {
  /** DKG_STATUS_UNSPECIFIED - DKG_STATUS_UNSPECIFIED defines the unknown DKG request status */
  DKG_STATUS_UNSPECIFIED = 0,
  /** DKG_STATUS_PENDING - DKG_STATUS_PENDING defines the status of the DKG request which is pending */
  DKG_STATUS_PENDING = 1,
  /** DKG_STATUS_COMPLETED - DKG_STATUS_COMPLETED defines the status of the DKG request which is completed */
  DKG_STATUS_COMPLETED = 2,
  /** DKG_STATUS_FAILED - DKG_STATUS_FAILED defines the status of the DKG request which failed */
  DKG_STATUS_FAILED = 3,
  /** DKG_STATUS_TIMEDOUT - DKG_STATUS_TIMEDOUT defines the status of the DKG request which timed out */
  DKG_STATUS_TIMEDOUT = 4,
  UNRECOGNIZED = -1,
}
export const DKGStatusSDKType = DKGStatus;
export const DKGStatusAmino = DKGStatus;
export function dKGStatusFromJSON(object: any): DKGStatus {
  switch (object) {
    case 0:
    case "DKG_STATUS_UNSPECIFIED":
      return DKGStatus.DKG_STATUS_UNSPECIFIED;
    case 1:
    case "DKG_STATUS_PENDING":
      return DKGStatus.DKG_STATUS_PENDING;
    case 2:
    case "DKG_STATUS_COMPLETED":
      return DKGStatus.DKG_STATUS_COMPLETED;
    case 3:
    case "DKG_STATUS_FAILED":
      return DKGStatus.DKG_STATUS_FAILED;
    case 4:
    case "DKG_STATUS_TIMEDOUT":
      return DKGStatus.DKG_STATUS_TIMEDOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DKGStatus.UNRECOGNIZED;
  }
}
export function dKGStatusToJSON(object: DKGStatus): string {
  switch (object) {
    case DKGStatus.DKG_STATUS_UNSPECIFIED:
      return "DKG_STATUS_UNSPECIFIED";
    case DKGStatus.DKG_STATUS_PENDING:
      return "DKG_STATUS_PENDING";
    case DKGStatus.DKG_STATUS_COMPLETED:
      return "DKG_STATUS_COMPLETED";
    case DKGStatus.DKG_STATUS_FAILED:
      return "DKG_STATUS_FAILED";
    case DKGStatus.DKG_STATUS_TIMEDOUT:
      return "DKG_STATUS_TIMEDOUT";
    case DKGStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Signing Status */
export enum SigningStatus {
  /** SIGNING_STATUS_UNSPECIFIED - SIGNING_STATUS_UNSPECIFIED defines the unknown signing status */
  SIGNING_STATUS_UNSPECIFIED = 0,
  /** SIGNING_STATUS_PENDING - SIGNING_STATUS_PENDING defines the status of the signing request which is pending */
  SIGNING_STATUS_PENDING = 1,
  /** SIGNING_STATUS_SIGNED - SIGNING_STATUS_SIGNED defines the status of the signing request which is signed */
  SIGNING_STATUS_SIGNED = 2,
  /** SIGNING_STATUS_FAILED - SIGNING_STATUS_FAILED defines the status of the signing request which failed due to unexpected reasons */
  SIGNING_STATUS_FAILED = 3,
  UNRECOGNIZED = -1,
}
export const SigningStatusSDKType = SigningStatus;
export const SigningStatusAmino = SigningStatus;
export function signingStatusFromJSON(object: any): SigningStatus {
  switch (object) {
    case 0:
    case "SIGNING_STATUS_UNSPECIFIED":
      return SigningStatus.SIGNING_STATUS_UNSPECIFIED;
    case 1:
    case "SIGNING_STATUS_PENDING":
      return SigningStatus.SIGNING_STATUS_PENDING;
    case 2:
    case "SIGNING_STATUS_SIGNED":
      return SigningStatus.SIGNING_STATUS_SIGNED;
    case 3:
    case "SIGNING_STATUS_FAILED":
      return SigningStatus.SIGNING_STATUS_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SigningStatus.UNRECOGNIZED;
  }
}
export function signingStatusToJSON(object: SigningStatus): string {
  switch (object) {
    case SigningStatus.SIGNING_STATUS_UNSPECIFIED:
      return "SIGNING_STATUS_UNSPECIFIED";
    case SigningStatus.SIGNING_STATUS_PENDING:
      return "SIGNING_STATUS_PENDING";
    case SigningStatus.SIGNING_STATUS_SIGNED:
      return "SIGNING_STATUS_SIGNED";
    case SigningStatus.SIGNING_STATUS_FAILED:
      return "SIGNING_STATUS_FAILED";
    case SigningStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Signing Type */
export enum SigningType {
  /** SIGNING_TYPE_SCHNORR - SIGNING_TYPE_SCHNORR defines the common schnorr signing */
  SIGNING_TYPE_SCHNORR = 0,
  /** SIGNING_TYPE_SCHNORR_WITH_TWEAK - SIGNING_TYPE_SCHNORR_WITH_TWEAK defines the schnorr signing with tweak */
  SIGNING_TYPE_SCHNORR_WITH_TWEAK = 1,
  /** SIGNING_TYPE_SCHNORR_WITH_COMMITMENT - SIGNING_TYPE_SCHNORR_WITH_COMMITMENT defines the schnorr signing with commitment */
  SIGNING_TYPE_SCHNORR_WITH_COMMITMENT = 2,
  /** SIGNING_TYPE_SCHNORR_ADAPTOR - SIGNING_TYPE_SCHNORR_ADAPTOR defines the schnorr adaptor signing */
  SIGNING_TYPE_SCHNORR_ADAPTOR = 3,
  UNRECOGNIZED = -1,
}
export const SigningTypeSDKType = SigningType;
export const SigningTypeAmino = SigningType;
export function signingTypeFromJSON(object: any): SigningType {
  switch (object) {
    case 0:
    case "SIGNING_TYPE_SCHNORR":
      return SigningType.SIGNING_TYPE_SCHNORR;
    case 1:
    case "SIGNING_TYPE_SCHNORR_WITH_TWEAK":
      return SigningType.SIGNING_TYPE_SCHNORR_WITH_TWEAK;
    case 2:
    case "SIGNING_TYPE_SCHNORR_WITH_COMMITMENT":
      return SigningType.SIGNING_TYPE_SCHNORR_WITH_COMMITMENT;
    case 3:
    case "SIGNING_TYPE_SCHNORR_ADAPTOR":
      return SigningType.SIGNING_TYPE_SCHNORR_ADAPTOR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SigningType.UNRECOGNIZED;
  }
}
export function signingTypeToJSON(object: SigningType): string {
  switch (object) {
    case SigningType.SIGNING_TYPE_SCHNORR:
      return "SIGNING_TYPE_SCHNORR";
    case SigningType.SIGNING_TYPE_SCHNORR_WITH_TWEAK:
      return "SIGNING_TYPE_SCHNORR_WITH_TWEAK";
    case SigningType.SIGNING_TYPE_SCHNORR_WITH_COMMITMENT:
      return "SIGNING_TYPE_SCHNORR_WITH_COMMITMENT";
    case SigningType.SIGNING_TYPE_SCHNORR_ADAPTOR:
      return "SIGNING_TYPE_SCHNORR_ADAPTOR";
    case SigningType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Refreshing Status */
export enum RefreshingStatus {
  /** REFRESHING_STATUS_UNSPECIFIED - REFRESHING_STATUS_UNSPECIFIED defines the unknown refreshing status */
  REFRESHING_STATUS_UNSPECIFIED = 0,
  /** REFRESHING_STATUS_PENDING - REFRESHING_STATUS_PENDING defines the status of the refreshing request which is pending */
  REFRESHING_STATUS_PENDING = 1,
  /** REFRESHING_STATUS_COMPLETED - REFRESHING_STATUS_COMPLETED defines the status of the refreshing request which is completed */
  REFRESHING_STATUS_COMPLETED = 2,
  /** REFRESHING_STATUS_TIMEDOUT - REFRESHING_STATUS_TIMEDOUT defines the status of the refreshing request which timed out */
  REFRESHING_STATUS_TIMEDOUT = 3,
  UNRECOGNIZED = -1,
}
export const RefreshingStatusSDKType = RefreshingStatus;
export const RefreshingStatusAmino = RefreshingStatus;
export function refreshingStatusFromJSON(object: any): RefreshingStatus {
  switch (object) {
    case 0:
    case "REFRESHING_STATUS_UNSPECIFIED":
      return RefreshingStatus.REFRESHING_STATUS_UNSPECIFIED;
    case 1:
    case "REFRESHING_STATUS_PENDING":
      return RefreshingStatus.REFRESHING_STATUS_PENDING;
    case 2:
    case "REFRESHING_STATUS_COMPLETED":
      return RefreshingStatus.REFRESHING_STATUS_COMPLETED;
    case 3:
    case "REFRESHING_STATUS_TIMEDOUT":
      return RefreshingStatus.REFRESHING_STATUS_TIMEDOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RefreshingStatus.UNRECOGNIZED;
  }
}
export function refreshingStatusToJSON(object: RefreshingStatus): string {
  switch (object) {
    case RefreshingStatus.REFRESHING_STATUS_UNSPECIFIED:
      return "REFRESHING_STATUS_UNSPECIFIED";
    case RefreshingStatus.REFRESHING_STATUS_PENDING:
      return "REFRESHING_STATUS_PENDING";
    case RefreshingStatus.REFRESHING_STATUS_COMPLETED:
      return "REFRESHING_STATUS_COMPLETED";
    case RefreshingStatus.REFRESHING_STATUS_TIMEDOUT:
      return "REFRESHING_STATUS_TIMEDOUT";
    case RefreshingStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** DKG Request */
export interface DKGRequest {
  /** request id */
  id: bigint;
  /** initiator module */
  module: string;
  /** dkg type */
  type: string;
  /** dkg intent */
  intent: number;
  /** participant set */
  participants: string[];
  /** threshold required to perform DKG */
  threshold: number;
  /** batch size of keys to be generated */
  batchSize: number;
  /** expiration time */
  expirationTime: Date;
  /** status */
  status: DKGStatus;
}
export interface DKGRequestProtoMsg {
  typeUrl: "/side.tss.DKGRequest";
  value: Uint8Array;
}
/** DKG Request */
export interface DKGRequestAmino {
  /** request id */
  id?: string;
  /** initiator module */
  module?: string;
  /** dkg type */
  type?: string;
  /** dkg intent */
  intent?: number;
  /** participant set */
  participants?: string[];
  /** threshold required to perform DKG */
  threshold?: number;
  /** batch size of keys to be generated */
  batch_size?: number;
  /** expiration time */
  expiration_time?: string;
  /** status */
  status?: DKGStatus;
}
export interface DKGRequestAminoMsg {
  type: "/side.tss.DKGRequest";
  value: DKGRequestAmino;
}
/** DKG Request */
export interface DKGRequestSDKType {
  id: bigint;
  module: string;
  type: string;
  intent: number;
  participants: string[];
  threshold: number;
  batch_size: number;
  expiration_time: Date;
  status: DKGStatus;
}
/** DKG Completion */
export interface DKGCompletion {
  /** request id */
  id: bigint;
  /** sender */
  sender: string;
  /** public keys generated by DKG */
  pubKeys: string[];
  /** participant consensus pub key */
  consensusPubkey: string;
  /** hex encoded participant signature */
  signature: string;
}
export interface DKGCompletionProtoMsg {
  typeUrl: "/side.tss.DKGCompletion";
  value: Uint8Array;
}
/** DKG Completion */
export interface DKGCompletionAmino {
  /** request id */
  id?: string;
  /** sender */
  sender?: string;
  /** public keys generated by DKG */
  pub_keys?: string[];
  /** participant consensus pub key */
  consensus_pubkey?: string;
  /** hex encoded participant signature */
  signature?: string;
}
export interface DKGCompletionAminoMsg {
  type: "/side.tss.DKGCompletion";
  value: DKGCompletionAmino;
}
/** DKG Completion */
export interface DKGCompletionSDKType {
  id: bigint;
  sender: string;
  pub_keys: string[];
  consensus_pubkey: string;
  signature: string;
}
/** Signing Options */
export interface SigningOptions {
  /** optional tweak */
  tweak: string;
  /** optional public nonce, i.e. commitment */
  nonce: string;
  /** optional adaptor point */
  adaptorPoint: string;
}
export interface SigningOptionsProtoMsg {
  typeUrl: "/side.tss.SigningOptions";
  value: Uint8Array;
}
/** Signing Options */
export interface SigningOptionsAmino {
  /** optional tweak */
  tweak?: string;
  /** optional public nonce, i.e. commitment */
  nonce?: string;
  /** optional adaptor point */
  adaptor_point?: string;
}
export interface SigningOptionsAminoMsg {
  type: "/side.tss.SigningOptions";
  value: SigningOptionsAmino;
}
/** Signing Options */
export interface SigningOptionsSDKType {
  tweak: string;
  nonce: string;
  adaptor_point: string;
}
/** Signing Request */
export interface SigningRequest {
  /** request id */
  id: bigint;
  /** initiator module */
  module: string;
  /** module specific id */
  scopedId: string;
  /** signing type */
  type: SigningType;
  /** signing intent */
  intent: number;
  /** signing pub key */
  pubKey: string;
  /** hashes to be signed */
  sigHashes: string[];
  /** signing options */
  options?: SigningOptions;
  /** creation time */
  creationTime: Date;
  /** status */
  status: SigningStatus;
}
export interface SigningRequestProtoMsg {
  typeUrl: "/side.tss.SigningRequest";
  value: Uint8Array;
}
/** Signing Request */
export interface SigningRequestAmino {
  /** request id */
  id?: string;
  /** initiator module */
  module?: string;
  /** module specific id */
  scoped_id?: string;
  /** signing type */
  type?: SigningType;
  /** signing intent */
  intent?: number;
  /** signing pub key */
  pub_key?: string;
  /** hashes to be signed */
  sig_hashes?: string[];
  /** signing options */
  options?: SigningOptionsAmino;
  /** creation time */
  creation_time?: string;
  /** status */
  status?: SigningStatus;
}
export interface SigningRequestAminoMsg {
  type: "/side.tss.SigningRequest";
  value: SigningRequestAmino;
}
/** Signing Request */
export interface SigningRequestSDKType {
  id: bigint;
  module: string;
  scoped_id: string;
  type: SigningType;
  intent: number;
  pub_key: string;
  sig_hashes: string[];
  options?: SigningOptionsSDKType;
  creation_time: Date;
  status: SigningStatus;
}
/** Refreshing Request */
export interface RefreshingRequest {
  /** request id */
  id: bigint;
  /** request id of the DKG corresponding to the key shares to be refreshed */
  dkgId: bigint;
  /** removed participant set */
  removedParticipants: string[];
  /** new threshold */
  threshold: number;
  /** expiration time */
  expirationTime: Date;
  /** status */
  status: RefreshingStatus;
}
export interface RefreshingRequestProtoMsg {
  typeUrl: "/side.tss.RefreshingRequest";
  value: Uint8Array;
}
/** Refreshing Request */
export interface RefreshingRequestAmino {
  /** request id */
  id?: string;
  /** request id of the DKG corresponding to the key shares to be refreshed */
  dkg_id?: string;
  /** removed participant set */
  removed_participants?: string[];
  /** new threshold */
  threshold?: number;
  /** expiration time */
  expiration_time?: string;
  /** status */
  status?: RefreshingStatus;
}
export interface RefreshingRequestAminoMsg {
  type: "/side.tss.RefreshingRequest";
  value: RefreshingRequestAmino;
}
/** Refreshing Request */
export interface RefreshingRequestSDKType {
  id: bigint;
  dkg_id: bigint;
  removed_participants: string[];
  threshold: number;
  expiration_time: Date;
  status: RefreshingStatus;
}
/** Refreshing Completion */
export interface RefreshingCompletion {
  /** request id */
  id: bigint;
  /** sender */
  sender: string;
  /** participant consensus pub key */
  consensusPubkey: string;
  /** hex encoded participant signature */
  signature: string;
}
export interface RefreshingCompletionProtoMsg {
  typeUrl: "/side.tss.RefreshingCompletion";
  value: Uint8Array;
}
/** Refreshing Completion */
export interface RefreshingCompletionAmino {
  /** request id */
  id?: string;
  /** sender */
  sender?: string;
  /** participant consensus pub key */
  consensus_pubkey?: string;
  /** hex encoded participant signature */
  signature?: string;
}
export interface RefreshingCompletionAminoMsg {
  type: "/side.tss.RefreshingCompletion";
  value: RefreshingCompletionAmino;
}
/** Refreshing Completion */
export interface RefreshingCompletionSDKType {
  id: bigint;
  sender: string;
  consensus_pubkey: string;
  signature: string;
}
function createBaseDKGRequest(): DKGRequest {
  return {
    id: BigInt(0),
    module: "",
    type: "",
    intent: 0,
    participants: [],
    threshold: 0,
    batchSize: 0,
    expirationTime: new Date(),
    status: 0
  };
}
export const DKGRequest = {
  typeUrl: "/side.tss.DKGRequest",
  encode(message: DKGRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.module !== "") {
      writer.uint32(18).string(message.module);
    }
    if (message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.intent !== 0) {
      writer.uint32(32).int32(message.intent);
    }
    for (const v of message.participants) {
      writer.uint32(42).string(v!);
    }
    if (message.threshold !== 0) {
      writer.uint32(48).uint32(message.threshold);
    }
    if (message.batchSize !== 0) {
      writer.uint32(56).uint32(message.batchSize);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(72).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DKGRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDKGRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.module = reader.string();
          break;
        case 3:
          message.type = reader.string();
          break;
        case 4:
          message.intent = reader.int32();
          break;
        case 5:
          message.participants.push(reader.string());
          break;
        case 6:
          message.threshold = reader.uint32();
          break;
        case 7:
          message.batchSize = reader.uint32();
          break;
        case 8:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DKGRequest>): DKGRequest {
    const message = createBaseDKGRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.module = object.module ?? "";
    message.type = object.type ?? "";
    message.intent = object.intent ?? 0;
    message.participants = object.participants?.map(e => e) || [];
    message.threshold = object.threshold ?? 0;
    message.batchSize = object.batchSize ?? 0;
    message.expirationTime = object.expirationTime ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: DKGRequestAmino): DKGRequest {
    const message = createBaseDKGRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.module !== undefined && object.module !== null) {
      message.module = object.module;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.intent !== undefined && object.intent !== null) {
      message.intent = object.intent;
    }
    message.participants = object.participants?.map(e => e) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    if (object.batch_size !== undefined && object.batch_size !== null) {
      message.batchSize = object.batch_size;
    }
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: DKGRequest): DKGRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.module = message.module === "" ? undefined : message.module;
    obj.type = message.type === "" ? undefined : message.type;
    obj.intent = message.intent === 0 ? undefined : message.intent;
    if (message.participants) {
      obj.participants = message.participants.map(e => e);
    } else {
      obj.participants = message.participants;
    }
    obj.threshold = message.threshold === 0 ? undefined : message.threshold;
    obj.batch_size = message.batchSize === 0 ? undefined : message.batchSize;
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: DKGRequestAminoMsg): DKGRequest {
    return DKGRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: DKGRequestProtoMsg): DKGRequest {
    return DKGRequest.decode(message.value);
  },
  toProto(message: DKGRequest): Uint8Array {
    return DKGRequest.encode(message).finish();
  },
  toProtoMsg(message: DKGRequest): DKGRequestProtoMsg {
    return {
      typeUrl: "/side.tss.DKGRequest",
      value: DKGRequest.encode(message).finish()
    };
  }
};
function createBaseDKGCompletion(): DKGCompletion {
  return {
    id: BigInt(0),
    sender: "",
    pubKeys: [],
    consensusPubkey: "",
    signature: ""
  };
}
export const DKGCompletion = {
  typeUrl: "/side.tss.DKGCompletion",
  encode(message: DKGCompletion, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    for (const v of message.pubKeys) {
      writer.uint32(26).string(v!);
    }
    if (message.consensusPubkey !== "") {
      writer.uint32(34).string(message.consensusPubkey);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DKGCompletion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDKGCompletion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.pubKeys.push(reader.string());
          break;
        case 4:
          message.consensusPubkey = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DKGCompletion>): DKGCompletion {
    const message = createBaseDKGCompletion();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    message.pubKeys = object.pubKeys?.map(e => e) || [];
    message.consensusPubkey = object.consensusPubkey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: DKGCompletionAmino): DKGCompletion {
    const message = createBaseDKGCompletion();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.pubKeys = object.pub_keys?.map(e => e) || [];
    if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
      message.consensusPubkey = object.consensus_pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: DKGCompletion): DKGCompletionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.pubKeys) {
      obj.pub_keys = message.pubKeys.map(e => e);
    } else {
      obj.pub_keys = message.pubKeys;
    }
    obj.consensus_pubkey = message.consensusPubkey === "" ? undefined : message.consensusPubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: DKGCompletionAminoMsg): DKGCompletion {
    return DKGCompletion.fromAmino(object.value);
  },
  fromProtoMsg(message: DKGCompletionProtoMsg): DKGCompletion {
    return DKGCompletion.decode(message.value);
  },
  toProto(message: DKGCompletion): Uint8Array {
    return DKGCompletion.encode(message).finish();
  },
  toProtoMsg(message: DKGCompletion): DKGCompletionProtoMsg {
    return {
      typeUrl: "/side.tss.DKGCompletion",
      value: DKGCompletion.encode(message).finish()
    };
  }
};
function createBaseSigningOptions(): SigningOptions {
  return {
    tweak: "",
    nonce: "",
    adaptorPoint: ""
  };
}
export const SigningOptions = {
  typeUrl: "/side.tss.SigningOptions",
  encode(message: SigningOptions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tweak !== "") {
      writer.uint32(10).string(message.tweak);
    }
    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }
    if (message.adaptorPoint !== "") {
      writer.uint32(26).string(message.adaptorPoint);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SigningOptions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSigningOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tweak = reader.string();
          break;
        case 2:
          message.nonce = reader.string();
          break;
        case 3:
          message.adaptorPoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SigningOptions>): SigningOptions {
    const message = createBaseSigningOptions();
    message.tweak = object.tweak ?? "";
    message.nonce = object.nonce ?? "";
    message.adaptorPoint = object.adaptorPoint ?? "";
    return message;
  },
  fromAmino(object: SigningOptionsAmino): SigningOptions {
    const message = createBaseSigningOptions();
    if (object.tweak !== undefined && object.tweak !== null) {
      message.tweak = object.tweak;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    if (object.adaptor_point !== undefined && object.adaptor_point !== null) {
      message.adaptorPoint = object.adaptor_point;
    }
    return message;
  },
  toAmino(message: SigningOptions): SigningOptionsAmino {
    const obj: any = {};
    obj.tweak = message.tweak === "" ? undefined : message.tweak;
    obj.nonce = message.nonce === "" ? undefined : message.nonce;
    obj.adaptor_point = message.adaptorPoint === "" ? undefined : message.adaptorPoint;
    return obj;
  },
  fromAminoMsg(object: SigningOptionsAminoMsg): SigningOptions {
    return SigningOptions.fromAmino(object.value);
  },
  fromProtoMsg(message: SigningOptionsProtoMsg): SigningOptions {
    return SigningOptions.decode(message.value);
  },
  toProto(message: SigningOptions): Uint8Array {
    return SigningOptions.encode(message).finish();
  },
  toProtoMsg(message: SigningOptions): SigningOptionsProtoMsg {
    return {
      typeUrl: "/side.tss.SigningOptions",
      value: SigningOptions.encode(message).finish()
    };
  }
};
function createBaseSigningRequest(): SigningRequest {
  return {
    id: BigInt(0),
    module: "",
    scopedId: "",
    type: 0,
    intent: 0,
    pubKey: "",
    sigHashes: [],
    options: undefined,
    creationTime: new Date(),
    status: 0
  };
}
export const SigningRequest = {
  typeUrl: "/side.tss.SigningRequest",
  encode(message: SigningRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.module !== "") {
      writer.uint32(18).string(message.module);
    }
    if (message.scopedId !== "") {
      writer.uint32(26).string(message.scopedId);
    }
    if (message.type !== 0) {
      writer.uint32(32).int32(message.type);
    }
    if (message.intent !== 0) {
      writer.uint32(40).int32(message.intent);
    }
    if (message.pubKey !== "") {
      writer.uint32(50).string(message.pubKey);
    }
    for (const v of message.sigHashes) {
      writer.uint32(58).string(v!);
    }
    if (message.options !== undefined) {
      SigningOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(80).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SigningRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSigningRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.module = reader.string();
          break;
        case 3:
          message.scopedId = reader.string();
          break;
        case 4:
          message.type = reader.int32() as any;
          break;
        case 5:
          message.intent = reader.int32();
          break;
        case 6:
          message.pubKey = reader.string();
          break;
        case 7:
          message.sigHashes.push(reader.string());
          break;
        case 8:
          message.options = SigningOptions.decode(reader, reader.uint32());
          break;
        case 9:
          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SigningRequest>): SigningRequest {
    const message = createBaseSigningRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.module = object.module ?? "";
    message.scopedId = object.scopedId ?? "";
    message.type = object.type ?? 0;
    message.intent = object.intent ?? 0;
    message.pubKey = object.pubKey ?? "";
    message.sigHashes = object.sigHashes?.map(e => e) || [];
    message.options = object.options !== undefined && object.options !== null ? SigningOptions.fromPartial(object.options) : undefined;
    message.creationTime = object.creationTime ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: SigningRequestAmino): SigningRequest {
    const message = createBaseSigningRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.module !== undefined && object.module !== null) {
      message.module = object.module;
    }
    if (object.scoped_id !== undefined && object.scoped_id !== null) {
      message.scopedId = object.scoped_id;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.intent !== undefined && object.intent !== null) {
      message.intent = object.intent;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    message.sigHashes = object.sig_hashes?.map(e => e) || [];
    if (object.options !== undefined && object.options !== null) {
      message.options = SigningOptions.fromAmino(object.options);
    }
    if (object.creation_time !== undefined && object.creation_time !== null) {
      message.creationTime = fromTimestamp(Timestamp.fromAmino(object.creation_time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: SigningRequest): SigningRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.module = message.module === "" ? undefined : message.module;
    obj.scoped_id = message.scopedId === "" ? undefined : message.scopedId;
    obj.type = message.type === 0 ? undefined : message.type;
    obj.intent = message.intent === 0 ? undefined : message.intent;
    obj.pub_key = message.pubKey === "" ? undefined : message.pubKey;
    if (message.sigHashes) {
      obj.sig_hashes = message.sigHashes.map(e => e);
    } else {
      obj.sig_hashes = message.sigHashes;
    }
    obj.options = message.options ? SigningOptions.toAmino(message.options) : undefined;
    obj.creation_time = message.creationTime ? Timestamp.toAmino(toTimestamp(message.creationTime)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: SigningRequestAminoMsg): SigningRequest {
    return SigningRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: SigningRequestProtoMsg): SigningRequest {
    return SigningRequest.decode(message.value);
  },
  toProto(message: SigningRequest): Uint8Array {
    return SigningRequest.encode(message).finish();
  },
  toProtoMsg(message: SigningRequest): SigningRequestProtoMsg {
    return {
      typeUrl: "/side.tss.SigningRequest",
      value: SigningRequest.encode(message).finish()
    };
  }
};
function createBaseRefreshingRequest(): RefreshingRequest {
  return {
    id: BigInt(0),
    dkgId: BigInt(0),
    removedParticipants: [],
    threshold: 0,
    expirationTime: new Date(),
    status: 0
  };
}
export const RefreshingRequest = {
  typeUrl: "/side.tss.RefreshingRequest",
  encode(message: RefreshingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.dkgId !== BigInt(0)) {
      writer.uint32(16).uint64(message.dkgId);
    }
    for (const v of message.removedParticipants) {
      writer.uint32(26).string(v!);
    }
    if (message.threshold !== 0) {
      writer.uint32(32).uint32(message.threshold);
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RefreshingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.dkgId = reader.uint64();
          break;
        case 3:
          message.removedParticipants.push(reader.string());
          break;
        case 4:
          message.threshold = reader.uint32();
          break;
        case 5:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<RefreshingRequest>): RefreshingRequest {
    const message = createBaseRefreshingRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.dkgId = object.dkgId !== undefined && object.dkgId !== null ? BigInt(object.dkgId.toString()) : BigInt(0);
    message.removedParticipants = object.removedParticipants?.map(e => e) || [];
    message.threshold = object.threshold ?? 0;
    message.expirationTime = object.expirationTime ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: RefreshingRequestAmino): RefreshingRequest {
    const message = createBaseRefreshingRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.dkg_id !== undefined && object.dkg_id !== null) {
      message.dkgId = BigInt(object.dkg_id);
    }
    message.removedParticipants = object.removed_participants?.map(e => e) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: RefreshingRequest): RefreshingRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.dkg_id = message.dkgId !== BigInt(0) ? message.dkgId.toString() : undefined;
    if (message.removedParticipants) {
      obj.removed_participants = message.removedParticipants.map(e => e);
    } else {
      obj.removed_participants = message.removedParticipants;
    }
    obj.threshold = message.threshold === 0 ? undefined : message.threshold;
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: RefreshingRequestAminoMsg): RefreshingRequest {
    return RefreshingRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: RefreshingRequestProtoMsg): RefreshingRequest {
    return RefreshingRequest.decode(message.value);
  },
  toProto(message: RefreshingRequest): Uint8Array {
    return RefreshingRequest.encode(message).finish();
  },
  toProtoMsg(message: RefreshingRequest): RefreshingRequestProtoMsg {
    return {
      typeUrl: "/side.tss.RefreshingRequest",
      value: RefreshingRequest.encode(message).finish()
    };
  }
};
function createBaseRefreshingCompletion(): RefreshingCompletion {
  return {
    id: BigInt(0),
    sender: "",
    consensusPubkey: "",
    signature: ""
  };
}
export const RefreshingCompletion = {
  typeUrl: "/side.tss.RefreshingCompletion",
  encode(message: RefreshingCompletion, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.consensusPubkey !== "") {
      writer.uint32(26).string(message.consensusPubkey);
    }
    if (message.signature !== "") {
      writer.uint32(34).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RefreshingCompletion {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshingCompletion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.consensusPubkey = reader.string();
          break;
        case 4:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RefreshingCompletion>): RefreshingCompletion {
    const message = createBaseRefreshingCompletion();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    message.consensusPubkey = object.consensusPubkey ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: RefreshingCompletionAmino): RefreshingCompletion {
    const message = createBaseRefreshingCompletion();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.consensus_pubkey !== undefined && object.consensus_pubkey !== null) {
      message.consensusPubkey = object.consensus_pubkey;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: RefreshingCompletion): RefreshingCompletionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.consensus_pubkey = message.consensusPubkey === "" ? undefined : message.consensusPubkey;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: RefreshingCompletionAminoMsg): RefreshingCompletion {
    return RefreshingCompletion.fromAmino(object.value);
  },
  fromProtoMsg(message: RefreshingCompletionProtoMsg): RefreshingCompletion {
    return RefreshingCompletion.decode(message.value);
  },
  toProto(message: RefreshingCompletion): Uint8Array {
    return RefreshingCompletion.encode(message).finish();
  },
  toProtoMsg(message: RefreshingCompletion): RefreshingCompletionProtoMsg {
    return {
      typeUrl: "/side.tss.RefreshingCompletion",
      value: RefreshingCompletion.encode(message).finish()
    };
  }
};