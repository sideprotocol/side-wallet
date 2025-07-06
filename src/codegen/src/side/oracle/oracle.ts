//@ts-nocheck
import { Decimal } from '@cosmjs/math';

import { BinaryReader, BinaryWriter } from '../../binary';

/** Oracle Price from Price Extention */
export interface OraclePrice {
  /** id */
  symbol: string;
  price: string;
}
export interface OraclePriceProtoMsg {
  typeUrl: '/side.oracle.OraclePrice';
  value: Uint8Array;
}
/** Oracle Price from Price Extention */
export interface OraclePriceAmino {
  /** id */
  symbol?: string;
  price?: string;
}
export interface OraclePriceAminoMsg {
  type: '/side.oracle.OraclePrice';
  value: OraclePriceAmino;
}
/** Oracle Price from Price Extention */
export interface OraclePriceSDKType {
  symbol: string;
  price: string;
}
/** Bitcoin Block Header From Price Extention */
export interface BlockHeader {
  version: number;
  hash: string;
  height: number;
  previousBlockHash: string;
  merkleRoot: string;
  nonce: bigint;
  bits: string;
  time: bigint;
  ntx: number;
}
export interface BlockHeaderProtoMsg {
  typeUrl: '/side.oracle.BlockHeader';
  value: Uint8Array;
}
/** Bitcoin Block Header From Price Extention */
export interface BlockHeaderAmino {
  version?: number;
  hash?: string;
  height?: number;
  previous_block_hash?: string;
  merkle_root?: string;
  nonce?: string;
  bits?: string;
  time?: string;
  ntx?: number;
}
export interface BlockHeaderAminoMsg {
  type: '/side.oracle.BlockHeader';
  value: BlockHeaderAmino;
}
/** Bitcoin Block Header From Price Extention */
export interface BlockHeaderSDKType {
  version: number;
  hash: string;
  height: number;
  previous_block_hash: string;
  merkle_root: string;
  nonce: bigint;
  bits: string;
  time: bigint;
  ntx: number;
}
export interface OracleVoteExtension_PricesEntry {
  key: string;
  value: string;
}
export interface OracleVoteExtension_PricesEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface OracleVoteExtension_PricesEntryAmino {
  key?: string;
  value?: string;
}
export interface OracleVoteExtension_PricesEntryAminoMsg {
  type: string;
  value: OracleVoteExtension_PricesEntryAmino;
}
export interface OracleVoteExtension_PricesEntrySDKType {
  key: string;
  value: string;
}
/** Oracle Vote Extenstion */
export interface OracleVoteExtension {
  height: bigint;
  prices: {
    [key: string]: string;
  };
  blocks: BlockHeader[];
  hasError: boolean;
}
export interface OracleVoteExtensionProtoMsg {
  typeUrl: '/side.oracle.OracleVoteExtension';
  value: Uint8Array;
}
/** Oracle Vote Extenstion */
export interface OracleVoteExtensionAmino {
  height?: string;
  prices?: {
    [key: string]: string;
  };
  blocks?: BlockHeaderAmino[];
  has_error?: boolean;
}
export interface OracleVoteExtensionAminoMsg {
  type: '/side.oracle.OracleVoteExtension';
  value: OracleVoteExtensionAmino;
}
/** Oracle Vote Extenstion */
export interface OracleVoteExtensionSDKType {
  height: bigint;
  prices: {
    [key: string]: string;
  };
  blocks: BlockHeaderSDKType[];
  has_error: boolean;
}
function createBaseOraclePrice(): OraclePrice {
  return {
    symbol: '',
    price: ''
  };
}
export const OraclePrice = {
  typeUrl: '/side.oracle.OraclePrice',
  encode(message: OraclePrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.symbol !== '') {
      writer.uint32(10).string(message.symbol);
    }
    if (message.price !== '') {
      writer.uint32(18).string(Decimal.fromUserInput(message.price, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OraclePrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOraclePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        case 2:
          message.price = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OraclePrice>): OraclePrice {
    const message = createBaseOraclePrice();
    message.symbol = object.symbol ?? '';
    message.price = object.price ?? '';
    return message;
  },
  fromAmino(object: OraclePriceAmino): OraclePrice {
    const message = createBaseOraclePrice();
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    return message;
  },
  toAmino(message: OraclePrice): OraclePriceAmino {
    const obj: any = {};
    obj.symbol = message.symbol === '' ? undefined : message.symbol;
    obj.price = message.price === '' ? undefined : message.price;
    return obj;
  },
  fromAminoMsg(object: OraclePriceAminoMsg): OraclePrice {
    return OraclePrice.fromAmino(object.value);
  },
  fromProtoMsg(message: OraclePriceProtoMsg): OraclePrice {
    return OraclePrice.decode(message.value);
  },
  toProto(message: OraclePrice): Uint8Array {
    return OraclePrice.encode(message).finish();
  },
  toProtoMsg(message: OraclePrice): OraclePriceProtoMsg {
    return {
      typeUrl: '/side.oracle.OraclePrice',
      value: OraclePrice.encode(message).finish()
    };
  }
};
function createBaseBlockHeader(): BlockHeader {
  return {
    version: 0,
    hash: '',
    height: 0,
    previousBlockHash: '',
    merkleRoot: '',
    nonce: BigInt(0),
    bits: '',
    time: BigInt(0),
    ntx: 0
  };
}
export const BlockHeader = {
  typeUrl: '/side.oracle.BlockHeader',
  encode(message: BlockHeader, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    if (message.hash !== '') {
      writer.uint32(18).string(message.hash);
    }
    if (message.height !== 0) {
      writer.uint32(24).int32(message.height);
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
      writer.uint32(64).int64(message.time);
    }
    if (message.ntx !== 0) {
      writer.uint32(72).int32(message.ntx);
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
          message.version = reader.int32();
          break;
        case 2:
          message.hash = reader.string();
          break;
        case 3:
          message.height = reader.int32();
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
          message.time = reader.int64();
          break;
        case 9:
          message.ntx = reader.int32();
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
    message.version = object.version ?? 0;
    message.hash = object.hash ?? '';
    message.height = object.height ?? 0;
    message.previousBlockHash = object.previousBlockHash ?? '';
    message.merkleRoot = object.merkleRoot ?? '';
    message.nonce = object.nonce !== undefined && object.nonce !== null ? BigInt(object.nonce.toString()) : BigInt(0);
    message.bits = object.bits ?? '';
    message.time = object.time !== undefined && object.time !== null ? BigInt(object.time.toString()) : BigInt(0);
    message.ntx = object.ntx ?? 0;
    return message;
  },
  fromAmino(object: BlockHeaderAmino): BlockHeader {
    const message = createBaseBlockHeader();
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height;
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
      message.ntx = object.ntx;
    }
    return message;
  },
  toAmino(message: BlockHeader): BlockHeaderAmino {
    const obj: any = {};
    obj.version = message.version === 0 ? undefined : message.version;
    obj.hash = message.hash === '' ? undefined : message.hash;
    obj.height = message.height === 0 ? undefined : message.height;
    obj.previous_block_hash = message.previousBlockHash === '' ? undefined : message.previousBlockHash;
    obj.merkle_root = message.merkleRoot === '' ? undefined : message.merkleRoot;
    obj.nonce = message.nonce !== BigInt(0) ? message.nonce.toString() : undefined;
    obj.bits = message.bits === '' ? undefined : message.bits;
    obj.time = message.time !== BigInt(0) ? message.time.toString() : undefined;
    obj.ntx = message.ntx === 0 ? undefined : message.ntx;
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
      typeUrl: '/side.oracle.BlockHeader',
      value: BlockHeader.encode(message).finish()
    };
  }
};
function createBaseOracleVoteExtension_PricesEntry(): OracleVoteExtension_PricesEntry {
  return {
    key: '',
    value: ''
  };
}
export const OracleVoteExtension_PricesEntry = {
  encode(message: OracleVoteExtension_PricesEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OracleVoteExtension_PricesEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOracleVoteExtension_PricesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OracleVoteExtension_PricesEntry>): OracleVoteExtension_PricesEntry {
    const message = createBaseOracleVoteExtension_PricesEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
  fromAmino(object: OracleVoteExtension_PricesEntryAmino): OracleVoteExtension_PricesEntry {
    const message = createBaseOracleVoteExtension_PricesEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: OracleVoteExtension_PricesEntry): OracleVoteExtension_PricesEntryAmino {
    const obj: any = {};
    obj.key = message.key === '' ? undefined : message.key;
    obj.value = message.value === '' ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: OracleVoteExtension_PricesEntryAminoMsg): OracleVoteExtension_PricesEntry {
    return OracleVoteExtension_PricesEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: OracleVoteExtension_PricesEntryProtoMsg): OracleVoteExtension_PricesEntry {
    return OracleVoteExtension_PricesEntry.decode(message.value);
  },
  toProto(message: OracleVoteExtension_PricesEntry): Uint8Array {
    return OracleVoteExtension_PricesEntry.encode(message).finish();
  }
};
function createBaseOracleVoteExtension(): OracleVoteExtension {
  return {
    height: BigInt(0),
    prices: {},
    blocks: [],
    hasError: false
  };
}
export const OracleVoteExtension = {
  typeUrl: '/side.oracle.OracleVoteExtension',
  encode(message: OracleVoteExtension, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    Object.entries(message.prices).forEach(([key, value]) => {
      OracleVoteExtension_PricesEntry.encode(
        {
          key: key as any,
          value
        },
        writer.uint32(18).fork()
      ).ldelim();
    });
    for (const v of message.blocks) {
      BlockHeader.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.hasError === true) {
      writer.uint32(32).bool(message.hasError);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OracleVoteExtension {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOracleVoteExtension();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        case 2: {
          const entry2 = OracleVoteExtension_PricesEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.prices[entry2.key] = entry2.value;
          }
          break;
        }
        case 3:
          message.blocks.push(BlockHeader.decode(reader, reader.uint32()));
          break;
        case 4:
          message.hasError = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OracleVoteExtension>): OracleVoteExtension {
    const message = createBaseOracleVoteExtension();
    message.height =
      object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.prices = Object.entries(object.prices ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.blocks = object.blocks?.map((e) => BlockHeader.fromPartial(e)) || [];
    message.hasError = object.hasError ?? false;
    return message;
  },
  fromAmino(object: OracleVoteExtensionAmino): OracleVoteExtension {
    const message = createBaseOracleVoteExtension();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    message.prices = Object.entries(object.prices ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.blocks = object.blocks?.map((e) => BlockHeader.fromAmino(e)) || [];
    if (object.has_error !== undefined && object.has_error !== null) {
      message.hasError = object.has_error;
    }
    return message;
  },
  toAmino(message: OracleVoteExtension): OracleVoteExtensionAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.prices = {};
    if (message.prices) {
      Object.entries(message.prices).forEach(([k, v]) => {
        obj.prices[k] = v;
      });
    }
    if (message.blocks) {
      obj.blocks = message.blocks.map((e) => (e ? BlockHeader.toAmino(e) : undefined));
    } else {
      obj.blocks = message.blocks;
    }
    obj.has_error = message.hasError === false ? undefined : message.hasError;
    return obj;
  },
  fromAminoMsg(object: OracleVoteExtensionAminoMsg): OracleVoteExtension {
    return OracleVoteExtension.fromAmino(object.value);
  },
  fromProtoMsg(message: OracleVoteExtensionProtoMsg): OracleVoteExtension {
    return OracleVoteExtension.decode(message.value);
  },
  toProto(message: OracleVoteExtension): Uint8Array {
    return OracleVoteExtension.encode(message).finish();
  },
  toProtoMsg(message: OracleVoteExtension): OracleVoteExtensionProtoMsg {
    return {
      typeUrl: '/side.oracle.OracleVoteExtension',
      value: OracleVoteExtension.encode(message).finish()
    };
  }
};
