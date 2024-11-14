//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { AssetType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../helpers";
/** Bitcoin Signing Status */
export enum SigningStatus {
  /** SIGNING_STATUS_UNSPECIFIED - SIGNING_STATUS_UNSPECIFIED - Default value, should not be used */
  SIGNING_STATUS_UNSPECIFIED = 0,
  /** SIGNING_STATUS_PENDING - SIGNING_STATUS_PENDING - The signing request is pending */
  SIGNING_STATUS_PENDING = 1,
  /** SIGNING_STATUS_BROADCASTED - SIGNING_STATUS_BROADCASTED - The signing request is broadcasted */
  SIGNING_STATUS_BROADCASTED = 2,
  /** SIGNING_STATUS_CONFIRMED - SIGNING_STATUS_CONFIRMED - The signing request is confirmed */
  SIGNING_STATUS_CONFIRMED = 3,
  /** SIGNING_STATUS_FAILED - SIGNING_STATUS_FAILED - The signing request failed to be signed or broadcast due to unexpected exceptions */
  SIGNING_STATUS_FAILED = 4,
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
    case "SIGNING_STATUS_BROADCASTED":
      return SigningStatus.SIGNING_STATUS_BROADCASTED;
    case 3:
    case "SIGNING_STATUS_CONFIRMED":
      return SigningStatus.SIGNING_STATUS_CONFIRMED;
    case 4:
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
    case SigningStatus.SIGNING_STATUS_BROADCASTED:
      return "SIGNING_STATUS_BROADCASTED";
    case SigningStatus.SIGNING_STATUS_CONFIRMED:
      return "SIGNING_STATUS_CONFIRMED";
    case SigningStatus.SIGNING_STATUS_FAILED:
      return "SIGNING_STATUS_FAILED";
    case SigningStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum DKGRequestStatus {
  /** DKG_REQUEST_STATUS_UNSPECIFIED - DKG_REQUEST_STATUS_UNSPECIFIED defines the unknown DKG request status */
  DKG_REQUEST_STATUS_UNSPECIFIED = 0,
  /** DKG_REQUEST_STATUS_PENDING - DKG_REQUEST_STATUS_PENDING defines the status of the DKG request which is pending */
  DKG_REQUEST_STATUS_PENDING = 1,
  /** DKG_REQUEST_STATUS_COMPLETED - DKG_REQUEST_STATUS_COMPLETED defines the status of the DKG request which is completed */
  DKG_REQUEST_STATUS_COMPLETED = 2,
  /** DKG_REQUEST_STATUS_FAILED - DKG_REQUEST_STATUS_FAILED defines the status of the DKG request which failed */
  DKG_REQUEST_STATUS_FAILED = 3,
  /** DKG_REQUEST_STATUS_TIMEDOUT - DKG_REQUEST_STATUS_TIMEDOUT defines the status of the DKG request which timed out */
  DKG_REQUEST_STATUS_TIMEDOUT = 4,
  UNRECOGNIZED = -1,
}
export const DKGRequestStatusSDKType = DKGRequestStatus;
export const DKGRequestStatusAmino = DKGRequestStatus;
export function dKGRequestStatusFromJSON(object: any): DKGRequestStatus {
  switch (object) {
    case 0:
    case "DKG_REQUEST_STATUS_UNSPECIFIED":
      return DKGRequestStatus.DKG_REQUEST_STATUS_UNSPECIFIED;
    case 1:
    case "DKG_REQUEST_STATUS_PENDING":
      return DKGRequestStatus.DKG_REQUEST_STATUS_PENDING;
    case 2:
    case "DKG_REQUEST_STATUS_COMPLETED":
      return DKGRequestStatus.DKG_REQUEST_STATUS_COMPLETED;
    case 3:
    case "DKG_REQUEST_STATUS_FAILED":
      return DKGRequestStatus.DKG_REQUEST_STATUS_FAILED;
    case 4:
    case "DKG_REQUEST_STATUS_TIMEDOUT":
      return DKGRequestStatus.DKG_REQUEST_STATUS_TIMEDOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DKGRequestStatus.UNRECOGNIZED;
  }
}
export function dKGRequestStatusToJSON(object: DKGRequestStatus): string {
  switch (object) {
    case DKGRequestStatus.DKG_REQUEST_STATUS_UNSPECIFIED:
      return "DKG_REQUEST_STATUS_UNSPECIFIED";
    case DKGRequestStatus.DKG_REQUEST_STATUS_PENDING:
      return "DKG_REQUEST_STATUS_PENDING";
    case DKGRequestStatus.DKG_REQUEST_STATUS_COMPLETED:
      return "DKG_REQUEST_STATUS_COMPLETED";
    case DKGRequestStatus.DKG_REQUEST_STATUS_FAILED:
      return "DKG_REQUEST_STATUS_FAILED";
    case DKGRequestStatus.DKG_REQUEST_STATUS_TIMEDOUT:
      return "DKG_REQUEST_STATUS_TIMEDOUT";
    case DKGRequestStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Bitcoin Block Header */
export interface BlockHeader {
  version: bigint;
  hash: string;
  height: bigint;
  previousBlockHash: string;
  merkleRoot: string;
  nonce: bigint;
  bits: string;
  time: bigint;
  ntx: bigint;
}
export interface BlockHeaderProtoMsg {
  typeUrl: "/side.btcbridge.BlockHeader";
  value: Uint8Array;
}
/** Bitcoin Block Header */
export interface BlockHeaderAmino {
  version?: string;
  hash?: string;
  height?: string;
  previous_block_hash?: string;
  merkle_root?: string;
  nonce?: string;
  bits?: string;
  time?: string;
  ntx?: string;
}
export interface BlockHeaderAminoMsg {
  type: "/side.btcbridge.BlockHeader";
  value: BlockHeaderAmino;
}
/** Bitcoin Block Header */
export interface BlockHeaderSDKType {
  version: bigint;
  hash: string;
  height: bigint;
  previous_block_hash: string;
  merkle_root: string;
  nonce: bigint;
  bits: string;
  time: bigint;
  ntx: bigint;
}
/** Bitcoin Signing Request */
export interface SigningRequest {
  address: string;
  sequence: bigint;
  txid: string;
  psbt: string;
  creationTime: Date;
  status: SigningStatus;
}
export interface SigningRequestProtoMsg {
  typeUrl: "/side.btcbridge.SigningRequest";
  value: Uint8Array;
}
/** Bitcoin Signing Request */
export interface SigningRequestAmino {
  address?: string;
  sequence?: string;
  txid?: string;
  psbt?: string;
  creation_time?: string;
  status?: SigningStatus;
}
export interface SigningRequestAminoMsg {
  type: "/side.btcbridge.SigningRequest";
  value: SigningRequestAmino;
}
/** Bitcoin Signing Request */
export interface SigningRequestSDKType {
  address: string;
  sequence: bigint;
  txid: string;
  psbt: string;
  creation_time: Date;
  status: SigningStatus;
}
/** Withdrawal Request */
export interface WithdrawRequest {
  address: string;
  amount: string;
  sequence: bigint;
  txid: string;
}
export interface WithdrawRequestProtoMsg {
  typeUrl: "/side.btcbridge.WithdrawRequest";
  value: Uint8Array;
}
/** Withdrawal Request */
export interface WithdrawRequestAmino {
  address?: string;
  amount?: string;
  sequence?: string;
  txid?: string;
}
export interface WithdrawRequestAminoMsg {
  type: "/side.btcbridge.WithdrawRequest";
  value: WithdrawRequestAmino;
}
/** Withdrawal Request */
export interface WithdrawRequestSDKType {
  address: string;
  amount: string;
  sequence: bigint;
  txid: string;
}
/** Bitcoin UTXO */
export interface UTXO {
  txid: string;
  vout: bigint;
  address: string;
  amount: bigint;
  height: bigint;
  pubKeyScript: Uint8Array;
  isLocked: boolean;
  /** rune balances associated with the UTXO */
  runes: RuneBalance[];
}
export interface UTXOProtoMsg {
  typeUrl: "/side.btcbridge.UTXO";
  value: Uint8Array;
}
/** Bitcoin UTXO */
export interface UTXOAmino {
  txid?: string;
  vout?: string;
  address?: string;
  amount?: string;
  height?: string;
  pub_key_script?: string;
  is_locked?: boolean;
  /** rune balances associated with the UTXO */
  runes?: RuneBalanceAmino[];
}
export interface UTXOAminoMsg {
  type: "/side.btcbridge.UTXO";
  value: UTXOAmino;
}
/** Bitcoin UTXO */
export interface UTXOSDKType {
  txid: string;
  vout: bigint;
  address: string;
  amount: bigint;
  height: bigint;
  pub_key_script: Uint8Array;
  is_locked: boolean;
  runes: RuneBalanceSDKType[];
}
/** Rune Balance */
export interface RuneBalance {
  /** serialized rune id */
  id: string;
  /** rune amount */
  amount: string;
}
export interface RuneBalanceProtoMsg {
  typeUrl: "/side.btcbridge.RuneBalance";
  value: Uint8Array;
}
/** Rune Balance */
export interface RuneBalanceAmino {
  /** serialized rune id */
  id?: string;
  /** rune amount */
  amount?: string;
}
export interface RuneBalanceAminoMsg {
  type: "/side.btcbridge.RuneBalance";
  value: RuneBalanceAmino;
}
/** Rune Balance */
export interface RuneBalanceSDKType {
  id: string;
  amount: string;
}
/** Rune ID */
export interface RuneId {
  /** block height */
  block: bigint;
  /** tx index */
  tx: number;
}
export interface RuneIdProtoMsg {
  typeUrl: "/side.btcbridge.RuneId";
  value: Uint8Array;
}
/** Rune ID */
export interface RuneIdAmino {
  /** block height */
  block?: string;
  /** tx index */
  tx?: number;
}
export interface RuneIdAminoMsg {
  type: "/side.btcbridge.RuneId";
  value: RuneIdAmino;
}
/** Rune ID */
export interface RuneIdSDKType {
  block: bigint;
  tx: number;
}
/** Rune Edict */
export interface Edict {
  id?: RuneId;
  amount: string;
  output: number;
}
export interface EdictProtoMsg {
  typeUrl: "/side.btcbridge.Edict";
  value: Uint8Array;
}
/** Rune Edict */
export interface EdictAmino {
  id?: RuneIdAmino;
  amount?: string;
  output?: number;
}
export interface EdictAminoMsg {
  type: "/side.btcbridge.Edict";
  value: EdictAmino;
}
/** Rune Edict */
export interface EdictSDKType {
  id?: RuneIdSDKType;
  amount: string;
  output: number;
}
/** BTC UTXO Consolidation */
export interface BtcConsolidation {
  /** maximum threshold of the btc value */
  targetThreshold: bigint;
  /** maximum number of the utxos to be consolidated; 0 means all */
  maxNum: number;
}
export interface BtcConsolidationProtoMsg {
  typeUrl: "/side.btcbridge.BtcConsolidation";
  value: Uint8Array;
}
/** BTC UTXO Consolidation */
export interface BtcConsolidationAmino {
  /** maximum threshold of the btc value */
  target_threshold?: string;
  /** maximum number of the utxos to be consolidated; 0 means all */
  max_num?: number;
}
export interface BtcConsolidationAminoMsg {
  type: "/side.btcbridge.BtcConsolidation";
  value: BtcConsolidationAmino;
}
/** BTC UTXO Consolidation */
export interface BtcConsolidationSDKType {
  target_threshold: bigint;
  max_num: number;
}
/** Runes UTXO Consolidation */
export interface RunesConsolidation {
  /** rune id */
  runeId: string;
  /** maximum threshold of the corresponding rune balance */
  targetThreshold: string;
  /** maximum number of the utxos to be consolidated; 0 means all */
  maxNum: number;
}
export interface RunesConsolidationProtoMsg {
  typeUrl: "/side.btcbridge.RunesConsolidation";
  value: Uint8Array;
}
/** Runes UTXO Consolidation */
export interface RunesConsolidationAmino {
  /** rune id */
  rune_id?: string;
  /** maximum threshold of the corresponding rune balance */
  target_threshold?: string;
  /** maximum number of the utxos to be consolidated; 0 means all */
  max_num?: number;
}
export interface RunesConsolidationAminoMsg {
  type: "/side.btcbridge.RunesConsolidation";
  value: RunesConsolidationAmino;
}
/** Runes UTXO Consolidation */
export interface RunesConsolidationSDKType {
  rune_id: string;
  target_threshold: string;
  max_num: number;
}
/** DKG Participant */
export interface DKGParticipant {
  /** the moniker of the corresponding validator */
  moniker: string;
  /** the operator address of the corresponding validator */
  operatorAddress: string;
  /** the consensus address of the corresponding validator */
  consensusAddress: string;
}
export interface DKGParticipantProtoMsg {
  typeUrl: "/side.btcbridge.DKGParticipant";
  value: Uint8Array;
}
/** DKG Participant */
export interface DKGParticipantAmino {
  /** the moniker of the corresponding validator */
  moniker?: string;
  /** the operator address of the corresponding validator */
  operator_address?: string;
  /** the consensus address of the corresponding validator */
  consensus_address?: string;
}
export interface DKGParticipantAminoMsg {
  type: "/side.btcbridge.DKGParticipant";
  value: DKGParticipantAmino;
}
/** DKG Participant */
export interface DKGParticipantSDKType {
  moniker: string;
  operator_address: string;
  consensus_address: string;
}
/** DKG Request */
export interface DKGRequest {
  /** the unique request id */
  id: bigint;
  /** participant set */
  participants: DKGParticipant[];
  /** threshold required to perform DKG */
  threshold: number;
  /** asset types of vaults to be generated */
  vaultTypes: AssetType[];
  /** indicates if disabling bridge deposit and withdrawal */
  disableBridge: boolean;
  /** indicates if transferring assets to the newly generated vaults when the DKG request is completed */
  enableTransfer: boolean;
  /** target number of the UTXOs to be transferred each time */
  targetUtxoNum: number;
  /** fee rate for vault transfer */
  feeRate: string;
  /** expiration time */
  expiration?: Date;
  /** status */
  status: DKGRequestStatus;
}
export interface DKGRequestProtoMsg {
  typeUrl: "/side.btcbridge.DKGRequest";
  value: Uint8Array;
}
/** DKG Request */
export interface DKGRequestAmino {
  /** the unique request id */
  id?: string;
  /** participant set */
  participants?: DKGParticipantAmino[];
  /** threshold required to perform DKG */
  threshold?: number;
  /** asset types of vaults to be generated */
  vault_types?: AssetType[];
  /** indicates if disabling bridge deposit and withdrawal */
  disable_bridge?: boolean;
  /** indicates if transferring assets to the newly generated vaults when the DKG request is completed */
  enable_transfer?: boolean;
  /** target number of the UTXOs to be transferred each time */
  target_utxo_num?: number;
  /** fee rate for vault transfer */
  fee_rate?: string;
  /** expiration time */
  expiration?: string;
  /** status */
  status?: DKGRequestStatus;
}
export interface DKGRequestAminoMsg {
  type: "/side.btcbridge.DKGRequest";
  value: DKGRequestAmino;
}
/** DKG Request */
export interface DKGRequestSDKType {
  id: bigint;
  participants: DKGParticipantSDKType[];
  threshold: number;
  vault_types: AssetType[];
  disable_bridge: boolean;
  enable_transfer: boolean;
  target_utxo_num: number;
  fee_rate: string;
  expiration?: Date;
  status: DKGRequestStatus;
}
/** DKG Completion Request */
export interface DKGCompletionRequest {
  /** request id */
  id: bigint;
  /** sender */
  sender: string;
  /** new vaults generated by DKG */
  vaults: string[];
  /** consensus address of the corresponding validator */
  consensusAddress: string;
  /** hex encoded validator signature */
  signature: string;
}
export interface DKGCompletionRequestProtoMsg {
  typeUrl: "/side.btcbridge.DKGCompletionRequest";
  value: Uint8Array;
}
/** DKG Completion Request */
export interface DKGCompletionRequestAmino {
  /** request id */
  id?: string;
  /** sender */
  sender?: string;
  /** new vaults generated by DKG */
  vaults?: string[];
  /** consensus address of the corresponding validator */
  consensus_address?: string;
  /** hex encoded validator signature */
  signature?: string;
}
export interface DKGCompletionRequestAminoMsg {
  type: "/side.btcbridge.DKGCompletionRequest";
  value: DKGCompletionRequestAmino;
}
/** DKG Completion Request */
export interface DKGCompletionRequestSDKType {
  id: bigint;
  sender: string;
  vaults: string[];
  consensus_address: string;
  signature: string;
}
function createBaseBlockHeader(): BlockHeader {
  return {
    version: BigInt(0),
    hash: "",
    height: BigInt(0),
    previousBlockHash: "",
    merkleRoot: "",
    nonce: BigInt(0),
    bits: "",
    time: BigInt(0),
    ntx: BigInt(0)
  };
}
export const BlockHeader = {
  typeUrl: "/side.btcbridge.BlockHeader",
  encode(message: BlockHeader, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== BigInt(0)) {
      writer.uint32(8).uint64(message.version);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.previousBlockHash !== "") {
      writer.uint32(34).string(message.previousBlockHash);
    }
    if (message.merkleRoot !== "") {
      writer.uint32(42).string(message.merkleRoot);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(48).uint64(message.nonce);
    }
    if (message.bits !== "") {
      writer.uint32(58).string(message.bits);
    }
    if (message.time !== BigInt(0)) {
      writer.uint32(64).uint64(message.time);
    }
    if (message.ntx !== BigInt(0)) {
      writer.uint32(72).uint64(message.ntx);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BlockHeader {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint64();
          break;
        case 2:
          message.hash = reader.string();
          break;
        case 3:
          message.height = reader.uint64();
          break;
        case 4:
          message.previousBlockHash = reader.string();
          break;
        case 5:
          message.merkleRoot = reader.string();
          break;
        case 6:
          message.nonce = reader.uint64();
          break;
        case 7:
          message.bits = reader.string();
          break;
        case 8:
          message.time = reader.uint64();
          break;
        case 9:
          message.ntx = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BlockHeader>): BlockHeader {
    const message = createBaseBlockHeader();
    message.version = object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
    message.hash = object.hash ?? "";
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.previousBlockHash = object.previousBlockHash ?? "";
    message.merkleRoot = object.merkleRoot ?? "";
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.bits = object.bits ?? "";
    message.time = object.time !== undefined && object.time !== null ? BigInt(object.time.toString()) : BigInt(0);
    message.ntx = object.ntx !== undefined && object.ntx !== null ? BigInt(object.ntx.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BlockHeaderAmino): BlockHeader {
    const message = createBaseBlockHeader();
    if (object.version !== undefined && object.version !== null) {
      message.version = BigInt(object.version);
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.previous_block_hash !== undefined && object.previous_block_hash !== null) {
      message.previousBlockHash = object.previous_block_hash;
    }
    if (object.merkle_root !== undefined && object.merkle_root !== null) {
      message.merkleRoot = object.merkle_root;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = BigInt(object.nonce);
    }
    if (object.bits !== undefined && object.bits !== null) {
      message.bits = object.bits;
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = BigInt(object.time);
    }
    if (object.ntx !== undefined && object.ntx !== null) {
      message.ntx = BigInt(object.ntx);
    }
    return message;
  },
  toAmino(message: BlockHeader): BlockHeaderAmino {
    const obj: any = {};
    obj.version = message.version !== BigInt(0) ? message.version.toString() : undefined;
    obj.hash = message.hash === "" ? undefined : message.hash;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.previous_block_hash = message.previousBlockHash === "" ? undefined : message.previousBlockHash;
    obj.merkle_root = message.merkleRoot === "" ? undefined : message.merkleRoot;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.bits = message.bits === "" ? undefined : message.bits;
    obj.time = message.time !== BigInt(0) ? message.time.toString() : undefined;
    obj.ntx = message.ntx !== BigInt(0) ? message.ntx.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BlockHeaderAminoMsg): BlockHeader {
    return BlockHeader.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockHeaderProtoMsg): BlockHeader {
    return BlockHeader.decode(message.value);
  },
  toProto(message: BlockHeader): Uint8Array {
    return BlockHeader.encode(message).finish();
  },
  toProtoMsg(message: BlockHeader): BlockHeaderProtoMsg {
    return {
      typeUrl: "/side.btcbridge.BlockHeader",
      value: BlockHeader.encode(message).finish()
    };
  }
};
function createBaseSigningRequest(): SigningRequest {
  return {
    address: "",
    sequence: BigInt(0),
    txid: "",
    psbt: "",
    creationTime: new Date(),
    status: 0
  };
}
export const SigningRequest = {
  typeUrl: "/side.btcbridge.SigningRequest",
  encode(message: SigningRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (message.txid !== "") {
      writer.uint32(26).string(message.txid);
    }
    if (message.psbt !== "") {
      writer.uint32(34).string(message.psbt);
    }
    if (message.creationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.creationTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
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
          message.address = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        case 3:
          message.txid = reader.string();
          break;
        case 4:
          message.psbt = reader.string();
          break;
        case 5:
          message.creationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<SigningRequest>): SigningRequest {
    const message = createBaseSigningRequest();
    message.address = object.address ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.txid = object.txid ?? "";
    message.psbt = object.psbt ?? "";
    message.creationTime = object.creationTime ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: SigningRequestAmino): SigningRequest {
    const message = createBaseSigningRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.psbt !== undefined && object.psbt !== null) {
      message.psbt = object.psbt;
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
    obj.address = message.address === "" ? undefined : message.address;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.psbt = message.psbt === "" ? undefined : message.psbt;
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
      typeUrl: "/side.btcbridge.SigningRequest",
      value: SigningRequest.encode(message).finish()
    };
  }
};
function createBaseWithdrawRequest(): WithdrawRequest {
  return {
    address: "",
    amount: "",
    sequence: BigInt(0),
    txid: ""
  };
}
export const WithdrawRequest = {
  typeUrl: "/side.btcbridge.WithdrawRequest",
  encode(message: WithdrawRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    if (message.txid !== "") {
      writer.uint32(34).string(message.txid);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): WithdrawRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        case 4:
          message.txid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WithdrawRequest>): WithdrawRequest {
    const message = createBaseWithdrawRequest();
    message.address = object.address ?? "";
    message.amount = object.amount ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.txid = object.txid ?? "";
    return message;
  },
  fromAmino(object: WithdrawRequestAmino): WithdrawRequest {
    const message = createBaseWithdrawRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    return message;
  },
  toAmino(message: WithdrawRequest): WithdrawRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    obj.txid = message.txid === "" ? undefined : message.txid;
    return obj;
  },
  fromAminoMsg(object: WithdrawRequestAminoMsg): WithdrawRequest {
    return WithdrawRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: WithdrawRequestProtoMsg): WithdrawRequest {
    return WithdrawRequest.decode(message.value);
  },
  toProto(message: WithdrawRequest): Uint8Array {
    return WithdrawRequest.encode(message).finish();
  },
  toProtoMsg(message: WithdrawRequest): WithdrawRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.WithdrawRequest",
      value: WithdrawRequest.encode(message).finish()
    };
  }
};
function createBaseUTXO(): UTXO {
  return {
    txid: "",
    vout: BigInt(0),
    address: "",
    amount: BigInt(0),
    height: BigInt(0),
    pubKeyScript: new Uint8Array(),
    isLocked: false,
    runes: []
  };
}
export const UTXO = {
  typeUrl: "/side.btcbridge.UTXO",
  encode(message: UTXO, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txid !== "") {
      writer.uint32(10).string(message.txid);
    }
    if (message.vout !== BigInt(0)) {
      writer.uint32(16).uint64(message.vout);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.amount !== BigInt(0)) {
      writer.uint32(32).uint64(message.amount);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(40).uint64(message.height);
    }
    if (message.pubKeyScript.length !== 0) {
      writer.uint32(50).bytes(message.pubKeyScript);
    }
    if (message.isLocked === true) {
      writer.uint32(56).bool(message.isLocked);
    }
    for (const v of message.runes) {
      RuneBalance.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): UTXO {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUTXO();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txid = reader.string();
          break;
        case 2:
          message.vout = reader.uint64();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.amount = reader.uint64();
          break;
        case 5:
          message.height = reader.uint64();
          break;
        case 6:
          message.pubKeyScript = reader.bytes();
          break;
        case 7:
          message.isLocked = reader.bool();
          break;
        case 8:
          message.runes.push(RuneBalance.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UTXO>): UTXO {
    const message = createBaseUTXO();
    message.txid = object.txid ?? "";
    message.vout = object.vout !== undefined && object.vout !== null ? BigInt(object.vout.toString()) : BigInt(0);
    message.address = object.address ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.pubKeyScript = object.pubKeyScript ?? new Uint8Array();
    message.isLocked = object.isLocked ?? false;
    message.runes = object.runes?.map(e => RuneBalance.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UTXOAmino): UTXO {
    const message = createBaseUTXO();
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.vout !== undefined && object.vout !== null) {
      message.vout = BigInt(object.vout);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = BigInt(object.amount);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.pub_key_script !== undefined && object.pub_key_script !== null) {
      message.pubKeyScript = bytesFromBase64(object.pub_key_script);
    }
    if (object.is_locked !== undefined && object.is_locked !== null) {
      message.isLocked = object.is_locked;
    }
    message.runes = object.runes?.map(e => RuneBalance.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UTXO): UTXOAmino {
    const obj: any = {};
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.vout = message.vout !== BigInt(0) ? message.vout.toString() : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    obj.amount = message.amount !== BigInt(0) ? message.amount.toString() : undefined;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.pub_key_script = message.pubKeyScript ? base64FromBytes(message.pubKeyScript) : undefined;
    obj.is_locked = message.isLocked === false ? undefined : message.isLocked;
    if (message.runes) {
      obj.runes = message.runes.map(e => e ? RuneBalance.toAmino(e) : undefined);
    } else {
      obj.runes = message.runes;
    }
    return obj;
  },
  fromAminoMsg(object: UTXOAminoMsg): UTXO {
    return UTXO.fromAmino(object.value);
  },
  fromProtoMsg(message: UTXOProtoMsg): UTXO {
    return UTXO.decode(message.value);
  },
  toProto(message: UTXO): Uint8Array {
    return UTXO.encode(message).finish();
  },
  toProtoMsg(message: UTXO): UTXOProtoMsg {
    return {
      typeUrl: "/side.btcbridge.UTXO",
      value: UTXO.encode(message).finish()
    };
  }
};
function createBaseRuneBalance(): RuneBalance {
  return {
    id: "",
    amount: ""
  };
}
export const RuneBalance = {
  typeUrl: "/side.btcbridge.RuneBalance",
  encode(message: RuneBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RuneBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuneBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RuneBalance>): RuneBalance {
    const message = createBaseRuneBalance();
    message.id = object.id ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: RuneBalanceAmino): RuneBalance {
    const message = createBaseRuneBalance();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: RuneBalance): RuneBalanceAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: RuneBalanceAminoMsg): RuneBalance {
    return RuneBalance.fromAmino(object.value);
  },
  fromProtoMsg(message: RuneBalanceProtoMsg): RuneBalance {
    return RuneBalance.decode(message.value);
  },
  toProto(message: RuneBalance): Uint8Array {
    return RuneBalance.encode(message).finish();
  },
  toProtoMsg(message: RuneBalance): RuneBalanceProtoMsg {
    return {
      typeUrl: "/side.btcbridge.RuneBalance",
      value: RuneBalance.encode(message).finish()
    };
  }
};
function createBaseRuneId(): RuneId {
  return {
    block: BigInt(0),
    tx: 0
  };
}
export const RuneId = {
  typeUrl: "/side.btcbridge.RuneId",
  encode(message: RuneId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.block !== BigInt(0)) {
      writer.uint32(8).uint64(message.block);
    }
    if (message.tx !== 0) {
      writer.uint32(16).uint32(message.tx);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RuneId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuneId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = reader.uint64();
          break;
        case 2:
          message.tx = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RuneId>): RuneId {
    const message = createBaseRuneId();
    message.block = object.block !== undefined && object.block !== null ? BigInt(object.block.toString()) : BigInt(0);
    message.tx = object.tx ?? 0;
    return message;
  },
  fromAmino(object: RuneIdAmino): RuneId {
    const message = createBaseRuneId();
    if (object.block !== undefined && object.block !== null) {
      message.block = BigInt(object.block);
    }
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = object.tx;
    }
    return message;
  },
  toAmino(message: RuneId): RuneIdAmino {
    const obj: any = {};
    obj.block = message.block !== BigInt(0) ? message.block.toString() : undefined;
    obj.tx = message.tx === 0 ? undefined : message.tx;
    return obj;
  },
  fromAminoMsg(object: RuneIdAminoMsg): RuneId {
    return RuneId.fromAmino(object.value);
  },
  fromProtoMsg(message: RuneIdProtoMsg): RuneId {
    return RuneId.decode(message.value);
  },
  toProto(message: RuneId): Uint8Array {
    return RuneId.encode(message).finish();
  },
  toProtoMsg(message: RuneId): RuneIdProtoMsg {
    return {
      typeUrl: "/side.btcbridge.RuneId",
      value: RuneId.encode(message).finish()
    };
  }
};
function createBaseEdict(): Edict {
  return {
    id: undefined,
    amount: "",
    output: 0
  };
}
export const Edict = {
  typeUrl: "/side.btcbridge.Edict",
  encode(message: Edict, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      RuneId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.output !== 0) {
      writer.uint32(24).uint32(message.output);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Edict {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEdict();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = RuneId.decode(reader, reader.uint32());
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.output = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Edict>): Edict {
    const message = createBaseEdict();
    message.id = object.id !== undefined && object.id !== null ? RuneId.fromPartial(object.id) : undefined;
    message.amount = object.amount ?? "";
    message.output = object.output ?? 0;
    return message;
  },
  fromAmino(object: EdictAmino): Edict {
    const message = createBaseEdict();
    if (object.id !== undefined && object.id !== null) {
      message.id = RuneId.fromAmino(object.id);
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.output !== undefined && object.output !== null) {
      message.output = object.output;
    }
    return message;
  },
  toAmino(message: Edict): EdictAmino {
    const obj: any = {};
    obj.id = message.id ? RuneId.toAmino(message.id) : undefined;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.output = message.output === 0 ? undefined : message.output;
    return obj;
  },
  fromAminoMsg(object: EdictAminoMsg): Edict {
    return Edict.fromAmino(object.value);
  },
  fromProtoMsg(message: EdictProtoMsg): Edict {
    return Edict.decode(message.value);
  },
  toProto(message: Edict): Uint8Array {
    return Edict.encode(message).finish();
  },
  toProtoMsg(message: Edict): EdictProtoMsg {
    return {
      typeUrl: "/side.btcbridge.Edict",
      value: Edict.encode(message).finish()
    };
  }
};
function createBaseBtcConsolidation(): BtcConsolidation {
  return {
    targetThreshold: BigInt(0),
    maxNum: 0
  };
}
export const BtcConsolidation = {
  typeUrl: "/side.btcbridge.BtcConsolidation",
  encode(message: BtcConsolidation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.targetThreshold !== BigInt(0)) {
      writer.uint32(8).int64(message.targetThreshold);
    }
    if (message.maxNum !== 0) {
      writer.uint32(16).uint32(message.maxNum);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BtcConsolidation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBtcConsolidation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.targetThreshold = reader.int64();
          break;
        case 2:
          message.maxNum = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BtcConsolidation>): BtcConsolidation {
    const message = createBaseBtcConsolidation();
    message.targetThreshold = object.targetThreshold !== undefined && object.targetThreshold !== null ? BigInt(object.targetThreshold.toString()) : BigInt(0);
    message.maxNum = object.maxNum ?? 0;
    return message;
  },
  fromAmino(object: BtcConsolidationAmino): BtcConsolidation {
    const message = createBaseBtcConsolidation();
    if (object.target_threshold !== undefined && object.target_threshold !== null) {
      message.targetThreshold = BigInt(object.target_threshold);
    }
    if (object.max_num !== undefined && object.max_num !== null) {
      message.maxNum = object.max_num;
    }
    return message;
  },
  toAmino(message: BtcConsolidation): BtcConsolidationAmino {
    const obj: any = {};
    obj.target_threshold = message.targetThreshold !== BigInt(0) ? message.targetThreshold.toString() : undefined;
    obj.max_num = message.maxNum === 0 ? undefined : message.maxNum;
    return obj;
  },
  fromAminoMsg(object: BtcConsolidationAminoMsg): BtcConsolidation {
    return BtcConsolidation.fromAmino(object.value);
  },
  fromProtoMsg(message: BtcConsolidationProtoMsg): BtcConsolidation {
    return BtcConsolidation.decode(message.value);
  },
  toProto(message: BtcConsolidation): Uint8Array {
    return BtcConsolidation.encode(message).finish();
  },
  toProtoMsg(message: BtcConsolidation): BtcConsolidationProtoMsg {
    return {
      typeUrl: "/side.btcbridge.BtcConsolidation",
      value: BtcConsolidation.encode(message).finish()
    };
  }
};
function createBaseRunesConsolidation(): RunesConsolidation {
  return {
    runeId: "",
    targetThreshold: "",
    maxNum: 0
  };
}
export const RunesConsolidation = {
  typeUrl: "/side.btcbridge.RunesConsolidation",
  encode(message: RunesConsolidation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.runeId !== "") {
      writer.uint32(10).string(message.runeId);
    }
    if (message.targetThreshold !== "") {
      writer.uint32(18).string(message.targetThreshold);
    }
    if (message.maxNum !== 0) {
      writer.uint32(24).uint32(message.maxNum);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RunesConsolidation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRunesConsolidation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.runeId = reader.string();
          break;
        case 2:
          message.targetThreshold = reader.string();
          break;
        case 3:
          message.maxNum = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RunesConsolidation>): RunesConsolidation {
    const message = createBaseRunesConsolidation();
    message.runeId = object.runeId ?? "";
    message.targetThreshold = object.targetThreshold ?? "";
    message.maxNum = object.maxNum ?? 0;
    return message;
  },
  fromAmino(object: RunesConsolidationAmino): RunesConsolidation {
    const message = createBaseRunesConsolidation();
    if (object.rune_id !== undefined && object.rune_id !== null) {
      message.runeId = object.rune_id;
    }
    if (object.target_threshold !== undefined && object.target_threshold !== null) {
      message.targetThreshold = object.target_threshold;
    }
    if (object.max_num !== undefined && object.max_num !== null) {
      message.maxNum = object.max_num;
    }
    return message;
  },
  toAmino(message: RunesConsolidation): RunesConsolidationAmino {
    const obj: any = {};
    obj.rune_id = message.runeId === "" ? undefined : message.runeId;
    obj.target_threshold = message.targetThreshold === "" ? undefined : message.targetThreshold;
    obj.max_num = message.maxNum === 0 ? undefined : message.maxNum;
    return obj;
  },
  fromAminoMsg(object: RunesConsolidationAminoMsg): RunesConsolidation {
    return RunesConsolidation.fromAmino(object.value);
  },
  fromProtoMsg(message: RunesConsolidationProtoMsg): RunesConsolidation {
    return RunesConsolidation.decode(message.value);
  },
  toProto(message: RunesConsolidation): Uint8Array {
    return RunesConsolidation.encode(message).finish();
  },
  toProtoMsg(message: RunesConsolidation): RunesConsolidationProtoMsg {
    return {
      typeUrl: "/side.btcbridge.RunesConsolidation",
      value: RunesConsolidation.encode(message).finish()
    };
  }
};
function createBaseDKGParticipant(): DKGParticipant {
  return {
    moniker: "",
    operatorAddress: "",
    consensusAddress: ""
  };
}
export const DKGParticipant = {
  typeUrl: "/side.btcbridge.DKGParticipant",
  encode(message: DKGParticipant, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.operatorAddress !== "") {
      writer.uint32(18).string(message.operatorAddress);
    }
    if (message.consensusAddress !== "") {
      writer.uint32(26).string(message.consensusAddress);
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
          message.operatorAddress = reader.string();
          break;
        case 3:
          message.consensusAddress = reader.string();
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
    message.operatorAddress = object.operatorAddress ?? "";
    message.consensusAddress = object.consensusAddress ?? "";
    return message;
  },
  fromAmino(object: DKGParticipantAmino): DKGParticipant {
    const message = createBaseDKGParticipant();
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    }
    if (object.operator_address !== undefined && object.operator_address !== null) {
      message.operatorAddress = object.operator_address;
    }
    if (object.consensus_address !== undefined && object.consensus_address !== null) {
      message.consensusAddress = object.consensus_address;
    }
    return message;
  },
  toAmino(message: DKGParticipant): DKGParticipantAmino {
    const obj: any = {};
    obj.moniker = message.moniker === "" ? undefined : message.moniker;
    obj.operator_address = message.operatorAddress === "" ? undefined : message.operatorAddress;
    obj.consensus_address = message.consensusAddress === "" ? undefined : message.consensusAddress;
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
      typeUrl: "/side.btcbridge.DKGParticipant",
      value: DKGParticipant.encode(message).finish()
    };
  }
};
function createBaseDKGRequest(): DKGRequest {
  return {
    id: BigInt(0),
    participants: [],
    threshold: 0,
    vaultTypes: [],
    disableBridge: false,
    enableTransfer: false,
    targetUtxoNum: 0,
    feeRate: "",
    expiration: undefined,
    status: 0
  };
}
export const DKGRequest = {
  typeUrl: "/side.btcbridge.DKGRequest",
  encode(message: DKGRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.participants) {
      DKGParticipant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.threshold !== 0) {
      writer.uint32(24).uint32(message.threshold);
    }
    writer.uint32(34).fork();
    for (const v of message.vaultTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.disableBridge === true) {
      writer.uint32(40).bool(message.disableBridge);
    }
    if (message.enableTransfer === true) {
      writer.uint32(48).bool(message.enableTransfer);
    }
    if (message.targetUtxoNum !== 0) {
      writer.uint32(56).uint32(message.targetUtxoNum);
    }
    if (message.feeRate !== "") {
      writer.uint32(66).string(message.feeRate);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(74).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(80).int32(message.status);
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
          message.participants.push(DKGParticipant.decode(reader, reader.uint32()));
          break;
        case 3:
          message.threshold = reader.uint32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.vaultTypes.push(reader.int32() as any);
            }
          } else {
            message.vaultTypes.push(reader.int32() as any);
          }
          break;
        case 5:
          message.disableBridge = reader.bool();
          break;
        case 6:
          message.enableTransfer = reader.bool();
          break;
        case 7:
          message.targetUtxoNum = reader.uint32();
          break;
        case 8:
          message.feeRate = reader.string();
          break;
        case 9:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<DKGRequest>): DKGRequest {
    const message = createBaseDKGRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.participants = object.participants?.map(e => DKGParticipant.fromPartial(e)) || [];
    message.threshold = object.threshold ?? 0;
    message.vaultTypes = object.vaultTypes?.map(e => e) || [];
    message.disableBridge = object.disableBridge ?? false;
    message.enableTransfer = object.enableTransfer ?? false;
    message.targetUtxoNum = object.targetUtxoNum ?? 0;
    message.feeRate = object.feeRate ?? "";
    message.expiration = object.expiration ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: DKGRequestAmino): DKGRequest {
    const message = createBaseDKGRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    message.participants = object.participants?.map(e => DKGParticipant.fromAmino(e)) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    message.vaultTypes = object.vault_types?.map(e => e) || [];
    if (object.disable_bridge !== undefined && object.disable_bridge !== null) {
      message.disableBridge = object.disable_bridge;
    }
    if (object.enable_transfer !== undefined && object.enable_transfer !== null) {
      message.enableTransfer = object.enable_transfer;
    }
    if (object.target_utxo_num !== undefined && object.target_utxo_num !== null) {
      message.targetUtxoNum = object.target_utxo_num;
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = object.fee_rate;
    }
    if (object.expiration !== undefined && object.expiration !== null) {
      message.expiration = fromTimestamp(Timestamp.fromAmino(object.expiration));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: DKGRequest): DKGRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.participants) {
      obj.participants = message.participants.map(e => e ? DKGParticipant.toAmino(e) : undefined);
    } else {
      obj.participants = message.participants;
    }
    obj.threshold = message.threshold === 0 ? undefined : message.threshold;
    if (message.vaultTypes) {
      obj.vault_types = message.vaultTypes.map(e => e);
    } else {
      obj.vault_types = message.vaultTypes;
    }
    obj.disable_bridge = message.disableBridge === false ? undefined : message.disableBridge;
    obj.enable_transfer = message.enableTransfer === false ? undefined : message.enableTransfer;
    obj.target_utxo_num = message.targetUtxoNum === 0 ? undefined : message.targetUtxoNum;
    obj.fee_rate = message.feeRate === "" ? undefined : message.feeRate;
    obj.expiration = message.expiration ? Timestamp.toAmino(toTimestamp(message.expiration)) : undefined;
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
      typeUrl: "/side.btcbridge.DKGRequest",
      value: DKGRequest.encode(message).finish()
    };
  }
};
function createBaseDKGCompletionRequest(): DKGCompletionRequest {
  return {
    id: BigInt(0),
    sender: "",
    vaults: [],
    consensusAddress: "",
    signature: ""
  };
}
export const DKGCompletionRequest = {
  typeUrl: "/side.btcbridge.DKGCompletionRequest",
  encode(message: DKGCompletionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    for (const v of message.vaults) {
      writer.uint32(26).string(v!);
    }
    if (message.consensusAddress !== "") {
      writer.uint32(34).string(message.consensusAddress);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DKGCompletionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDKGCompletionRequest();
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
          message.vaults.push(reader.string());
          break;
        case 4:
          message.consensusAddress = reader.string();
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
  fromPartial(object: Partial<DKGCompletionRequest>): DKGCompletionRequest {
    const message = createBaseDKGCompletionRequest();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    message.vaults = object.vaults?.map(e => e) || [];
    message.consensusAddress = object.consensusAddress ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: DKGCompletionRequestAmino): DKGCompletionRequest {
    const message = createBaseDKGCompletionRequest();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.vaults = object.vaults?.map(e => e) || [];
    if (object.consensus_address !== undefined && object.consensus_address !== null) {
      message.consensusAddress = object.consensus_address;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: DKGCompletionRequest): DKGCompletionRequestAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.vaults) {
      obj.vaults = message.vaults.map(e => e);
    } else {
      obj.vaults = message.vaults;
    }
    obj.consensus_address = message.consensusAddress === "" ? undefined : message.consensusAddress;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: DKGCompletionRequestAminoMsg): DKGCompletionRequest {
    return DKGCompletionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: DKGCompletionRequestProtoMsg): DKGCompletionRequest {
    return DKGCompletionRequest.decode(message.value);
  },
  toProto(message: DKGCompletionRequest): Uint8Array {
    return DKGCompletionRequest.encode(message).finish();
  },
  toProtoMsg(message: DKGCompletionRequest): DKGCompletionRequestProtoMsg {
    return {
      typeUrl: "/side.btcbridge.DKGCompletionRequest",
      value: DKGCompletionRequest.encode(message).finish()
    };
  }
};