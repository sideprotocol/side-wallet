//@ts-nocheck
import { BinaryReader, BinaryWriter } from '../../binary';
import { bytesFromBase64, base64FromBytes } from '../../helpers';

/** Bitcoin Signing Status */
export enum SigningStatus {
  /** SIGNING_STATUS_UNSPECIFIED - SIGNING_STATUS_UNSPECIFIED - Default value, should not be used */
  SIGNING_STATUS_UNSPECIFIED = 0,
  /** SIGNING_STATUS_CREATED - SIGNING_STATUS_CREATED - The signing request is created */
  SIGNING_STATUS_CREATED = 1,
  /** SIGNING_STATUS_SIGNED - SIGNING_STATUS_SIGNED - The signing request is signed */
  SIGNING_STATUS_SIGNED = 2,
  /** SIGNING_STATUS_BROADCASTED - SIGNING_STATUS_BROADCASTED - The signing request is broadcasted */
  SIGNING_STATUS_BROADCASTED = 3,
  /** SIGNING_STATUS_CONFIRMED - SIGNING_STATUS_CONFIRMED - The signing request is confirmed */
  SIGNING_STATUS_CONFIRMED = 4,
  /** SIGNING_STATUS_REJECTED - SIGNING_STATUS_REJECTED - The signing request is rejected */
  SIGNING_STATUS_REJECTED = 5,
  UNRECOGNIZED = -1
}
export const SigningStatusSDKType = SigningStatus;
export const SigningStatusAmino = SigningStatus;
export function signingStatusFromJSON(object: any): SigningStatus {
  switch (object) {
    case 0:
    case 'SIGNING_STATUS_UNSPECIFIED':
      return SigningStatus.SIGNING_STATUS_UNSPECIFIED;
    case 1:
    case 'SIGNING_STATUS_CREATED':
      return SigningStatus.SIGNING_STATUS_CREATED;
    case 2:
    case 'SIGNING_STATUS_SIGNED':
      return SigningStatus.SIGNING_STATUS_SIGNED;
    case 3:
    case 'SIGNING_STATUS_BROADCASTED':
      return SigningStatus.SIGNING_STATUS_BROADCASTED;
    case 4:
    case 'SIGNING_STATUS_CONFIRMED':
      return SigningStatus.SIGNING_STATUS_CONFIRMED;
    case 5:
    case 'SIGNING_STATUS_REJECTED':
      return SigningStatus.SIGNING_STATUS_REJECTED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SigningStatus.UNRECOGNIZED;
  }
}
export function signingStatusToJSON(object: SigningStatus): string {
  switch (object) {
    case SigningStatus.SIGNING_STATUS_UNSPECIFIED:
      return 'SIGNING_STATUS_UNSPECIFIED';
    case SigningStatus.SIGNING_STATUS_CREATED:
      return 'SIGNING_STATUS_CREATED';
    case SigningStatus.SIGNING_STATUS_SIGNED:
      return 'SIGNING_STATUS_SIGNED';
    case SigningStatus.SIGNING_STATUS_BROADCASTED:
      return 'SIGNING_STATUS_BROADCASTED';
    case SigningStatus.SIGNING_STATUS_CONFIRMED:
      return 'SIGNING_STATUS_CONFIRMED';
    case SigningStatus.SIGNING_STATUS_REJECTED:
      return 'SIGNING_STATUS_REJECTED';
    case SigningStatus.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
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
  typeUrl: '/side.btcbridge.BlockHeader';
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
  type: '/side.btcbridge.BlockHeader';
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
export interface BitcoinSigningRequest {
  address: string;
  txid: string;
  psbt: string;
  status: SigningStatus;
  sequence: bigint;
  /** The vault address that the request is associated with */
  vaultAddress: string;
}
export interface BitcoinSigningRequestProtoMsg {
  typeUrl: '/side.btcbridge.BitcoinSigningRequest';
  value: Uint8Array;
}
/** Bitcoin Signing Request */
export interface BitcoinSigningRequestAmino {
  address?: string;
  txid?: string;
  psbt?: string;
  status?: SigningStatus;
  sequence?: string;
  /** The vault address that the request is associated with */
  vault_address?: string;
}
export interface BitcoinSigningRequestAminoMsg {
  type: '/side.btcbridge.BitcoinSigningRequest';
  value: BitcoinSigningRequestAmino;
}
/** Bitcoin Signing Request */
export interface BitcoinSigningRequestSDKType {
  address: string;
  txid: string;
  psbt: string;
  status: SigningStatus;
  sequence: bigint;
  vault_address: string;
}
/** Bitcoin UTXO */
export interface UTXO {
  txid: string;
  vout: bigint;
  address: string;
  amount: bigint;
  /** height is used for calculating confirmations */
  height: bigint;
  pubKeyScript: Uint8Array;
  isCoinbase: boolean;
  isLocked: boolean;
}
export interface UTXOProtoMsg {
  typeUrl: '/side.btcbridge.UTXO';
  value: Uint8Array;
}
/** Bitcoin UTXO */
export interface UTXOAmino {
  txid?: string;
  vout?: string;
  address?: string;
  amount?: string;
  /** height is used for calculating confirmations */
  height?: string;
  pub_key_script?: string;
  is_coinbase?: boolean;
  is_locked?: boolean;
}
export interface UTXOAminoMsg {
  type: '/side.btcbridge.UTXO';
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
  is_coinbase: boolean;
  is_locked: boolean;
}
function createBaseBlockHeader(): BlockHeader {
  return {
    version: BigInt(0),
    hash: '',
    height: BigInt(0),
    previousBlockHash: '',
    merkleRoot: '',
    nonce: BigInt(0),
    bits: '',
    time: BigInt(0),
    ntx: BigInt(0)
  };
}
export const BlockHeader = {
  typeUrl: '/side.btcbridge.BlockHeader',
  encode(message: BlockHeader, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== BigInt(0)) {
      writer.uint32(8).uint64(message.version);
    }
    if (message.hash !== '') {
      writer.uint32(18).string(message.hash);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.previousBlockHash !== '') {
      writer.uint32(34).string(message.previousBlockHash);
    }
    if (message.merkleRoot !== '') {
      writer.uint32(42).string(message.merkleRoot);
    }
    if (message.nonce !== BigInt(0)) {
      writer.uint32(48).uint64(message.nonce);
    }
    if (message.bits !== '') {
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
    message.version =
      object.version !== undefined && object.version !== null ? BigInt(object.version.toString()) : BigInt(0);
    message.hash = object.hash ?? '';
    message.height =
      object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.previousBlockHash = object.previousBlockHash ?? '';
    message.merkleRoot = object.merkleRoot ?? '';
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.bits = object.bits ?? '';
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
    obj.hash = message.hash === '' ? undefined : message.hash;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.previous_block_hash = message.previousBlockHash === '' ? undefined : message.previousBlockHash;
    obj.merkle_root = message.merkleRoot === '' ? undefined : message.merkleRoot;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.bits = message.bits === '' ? undefined : message.bits;
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
      typeUrl: '/side.btcbridge.BlockHeader',
      value: BlockHeader.encode(message).finish()
    };
  }
};
function createBaseBitcoinSigningRequest(): BitcoinSigningRequest {
  return {
    address: '',
    txid: '',
    psbt: '',
    status: 0,
    sequence: BigInt(0),
    vaultAddress: ''
  };
}
export const BitcoinSigningRequest = {
  typeUrl: '/side.btcbridge.BitcoinSigningRequest',
  encode(message: BitcoinSigningRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== '') {
      writer.uint32(10).string(message.address);
    }
    if (message.txid !== '') {
      writer.uint32(18).string(message.txid);
    }
    if (message.psbt !== '') {
      writer.uint32(26).string(message.psbt);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(40).uint64(message.sequence);
    }
    if (message.vaultAddress !== '') {
      writer.uint32(50).string(message.vaultAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BitcoinSigningRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBitcoinSigningRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.txid = reader.string();
          break;
        case 3:
          message.psbt = reader.string();
          break;
        case 4:
          message.status = reader.int32() as any;
          break;
        case 5:
          message.sequence = reader.uint64();
          break;
        case 6:
          message.vaultAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BitcoinSigningRequest>): BitcoinSigningRequest {
    const message = createBaseBitcoinSigningRequest();
    message.address = object.address ?? '';
    message.txid = object.txid ?? '';
    message.psbt = object.psbt ?? '';
    message.status = object.status ?? 0;
    message.sequence =
      object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.vaultAddress = object.vaultAddress ?? '';
    return message;
  },
  fromAmino(object: BitcoinSigningRequestAmino): BitcoinSigningRequest {
    const message = createBaseBitcoinSigningRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.psbt !== undefined && object.psbt !== null) {
      message.psbt = object.psbt;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    if (object.vault_address !== undefined && object.vault_address !== null) {
      message.vaultAddress = object.vault_address;
    }
    return message;
  },
  toAmino(message: BitcoinSigningRequest): BitcoinSigningRequestAmino {
    const obj: any = {};
    obj.address = message.address === '' ? undefined : message.address;
    obj.txid = message.txid === '' ? undefined : message.txid;
    obj.psbt = message.psbt === '' ? undefined : message.psbt;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    obj.vault_address = message.vaultAddress === '' ? undefined : message.vaultAddress;
    return obj;
  },
  fromAminoMsg(object: BitcoinSigningRequestAminoMsg): BitcoinSigningRequest {
    return BitcoinSigningRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: BitcoinSigningRequestProtoMsg): BitcoinSigningRequest {
    return BitcoinSigningRequest.decode(message.value);
  },
  toProto(message: BitcoinSigningRequest): Uint8Array {
    return BitcoinSigningRequest.encode(message).finish();
  },
  toProtoMsg(message: BitcoinSigningRequest): BitcoinSigningRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.BitcoinSigningRequest',
      value: BitcoinSigningRequest.encode(message).finish()
    };
  }
};
function createBaseUTXO(): UTXO {
  return {
    txid: '',
    vout: BigInt(0),
    address: '',
    amount: BigInt(0),
    height: BigInt(0),
    pubKeyScript: new Uint8Array(),
    isCoinbase: false,
    isLocked: false
  };
}
export const UTXO = {
  typeUrl: '/side.btcbridge.UTXO',
  encode(message: UTXO, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.txid !== '') {
      writer.uint32(10).string(message.txid);
    }
    if (message.vout !== BigInt(0)) {
      writer.uint32(16).uint64(message.vout);
    }
    if (message.address !== '') {
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
    if (message.isCoinbase === true) {
      writer.uint32(56).bool(message.isCoinbase);
    }
    if (message.isLocked === true) {
      writer.uint32(64).bool(message.isLocked);
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
          message.isCoinbase = reader.bool();
          break;
        case 8:
          message.isLocked = reader.bool();
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
    message.txid = object.txid ?? '';
    message.vout = object.vout !== undefined && object.vout !== null ? BigInt(object.vout.toString()) : BigInt(0);
    message.address = object.address ?? '';
    message.amount =
      object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
    message.height =
      object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.pubKeyScript = object.pubKeyScript ?? new Uint8Array();
    message.isCoinbase = object.isCoinbase ?? false;
    message.isLocked = object.isLocked ?? false;
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
    if (object.is_coinbase !== undefined && object.is_coinbase !== null) {
      message.isCoinbase = object.is_coinbase;
    }
    if (object.is_locked !== undefined && object.is_locked !== null) {
      message.isLocked = object.is_locked;
    }
    return message;
  },
  toAmino(message: UTXO): UTXOAmino {
    const obj: any = {};
    obj.txid = message.txid === '' ? undefined : message.txid;
    obj.vout = message.vout !== BigInt(0) ? message.vout.toString() : undefined;
    obj.address = message.address === '' ? undefined : message.address;
    obj.amount = message.amount !== BigInt(0) ? message.amount.toString() : undefined;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.pub_key_script = message.pubKeyScript ? base64FromBytes(message.pubKeyScript) : undefined;
    obj.is_coinbase = message.isCoinbase === false ? undefined : message.isCoinbase;
    obj.is_locked = message.isLocked === false ? undefined : message.isLocked;
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
      typeUrl: '/side.btcbridge.UTXO',
      value: UTXO.encode(message).finish()
    };
  }
};
