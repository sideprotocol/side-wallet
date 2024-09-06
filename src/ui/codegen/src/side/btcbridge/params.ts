//@ts-nocheck
import { BinaryReader, BinaryWriter } from '../../binary';

/** AssetType defines the type of asset */
export enum AssetType {
  /** ASSET_TYPE_UNSPECIFIED - Unspecified asset type */
  ASSET_TYPE_UNSPECIFIED = 0,
  /** ASSET_TYPE_BTC - BTC */
  ASSET_TYPE_BTC = 1,
  /** ASSET_TYPE_BRC20 - BRC20: ordi, sats */
  ASSET_TYPE_BRC20 = 2,
  /** ASSET_TYPE_RUNE - RUNE, dog*go*to*the*moon */
  ASSET_TYPE_RUNE = 3,
  UNRECOGNIZED = -1
}
export const AssetTypeSDKType = AssetType;
export const AssetTypeAmino = AssetType;
export function assetTypeFromJSON(object: any): AssetType {
  switch (object) {
    case 0:
    case 'ASSET_TYPE_UNSPECIFIED':
      return AssetType.ASSET_TYPE_UNSPECIFIED;
    case 1:
    case 'ASSET_TYPE_BTC':
      return AssetType.ASSET_TYPE_BTC;
    case 2:
    case 'ASSET_TYPE_BRC20':
      return AssetType.ASSET_TYPE_BRC20;
    case 3:
    case 'ASSET_TYPE_RUNE':
      return AssetType.ASSET_TYPE_RUNE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return AssetType.UNRECOGNIZED;
  }
}
export function assetTypeToJSON(object: AssetType): string {
  switch (object) {
    case AssetType.ASSET_TYPE_UNSPECIFIED:
      return 'ASSET_TYPE_UNSPECIFIED';
    case AssetType.ASSET_TYPE_BTC:
      return 'ASSET_TYPE_BTC';
    case AssetType.ASSET_TYPE_BRC20:
      return 'ASSET_TYPE_BRC20';
    case AssetType.ASSET_TYPE_RUNE:
      return 'ASSET_TYPE_RUNE';
    case AssetType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}
/** Params defines the parameters for the module. */
export interface Params {
  /** Only accept blocks sending from these addresses */
  authorizedRelayers: string[];
  /** The minimum number of confirmations required for a block to be accepted */
  confirmations: number;
  /** Indicates the maximum depth or distance from the latest block up to which transactions are considered for acceptance. */
  maxAcceptableBlockDepth: bigint;
  /** the denomanation of the voucher */
  btcVoucherDenom: string;
  vaults: Vault[];
}
export interface ParamsProtoMsg {
  typeUrl: '/side.btcbridge.Params';
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** Only accept blocks sending from these addresses */
  authorized_relayers?: string[];
  /** The minimum number of confirmations required for a block to be accepted */
  confirmations?: number;
  /** Indicates the maximum depth or distance from the latest block up to which transactions are considered for acceptance. */
  max_acceptable_block_depth?: string;
  /** the denomanation of the voucher */
  btc_voucher_denom?: string;
  vaults?: VaultAmino[];
}
export interface ParamsAminoMsg {
  type: '/side.btcbridge.Params';
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  authorized_relayers: string[];
  confirmations: number;
  max_acceptable_block_depth: bigint;
  btc_voucher_denom: string;
  vaults: VaultSDKType[];
}
/** Vault defines the parameters for the module. */
export interface Vault {
  /** the depositor should send their btc to this address */
  address: string;
  /** the pub key to which the voucher is sent */
  pubKey: string;
  /** the address to which the voucher is sent */
  assetType: AssetType;
}
export interface VaultProtoMsg {
  typeUrl: '/side.btcbridge.Vault';
  value: Uint8Array;
}
/** Vault defines the parameters for the module. */
export interface VaultAmino {
  /** the depositor should send their btc to this address */
  address?: string;
  /** the pub key to which the voucher is sent */
  pub_key?: string;
  /** the address to which the voucher is sent */
  asset_type?: AssetType;
}
export interface VaultAminoMsg {
  type: '/side.btcbridge.Vault';
  value: VaultAmino;
}
/** Vault defines the parameters for the module. */
export interface VaultSDKType {
  address: string;
  pub_key: string;
  asset_type: AssetType;
}
function createBaseParams(): Params {
  return {
    authorizedRelayers: [],
    confirmations: 0,
    maxAcceptableBlockDepth: BigInt(0),
    btcVoucherDenom: '',
    vaults: []
  };
}
export const Params = {
  typeUrl: '/side.btcbridge.Params',
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.authorizedRelayers) {
      writer.uint32(10).string(v!);
    }
    if (message.confirmations !== 0) {
      writer.uint32(16).int32(message.confirmations);
    }
    if (message.maxAcceptableBlockDepth !== BigInt(0)) {
      writer.uint32(24).uint64(message.maxAcceptableBlockDepth);
    }
    if (message.btcVoucherDenom !== '') {
      writer.uint32(34).string(message.btcVoucherDenom);
    }
    for (const v of message.vaults) {
      Vault.encode(v!, writer.uint32(42).fork()).ldelim();
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
          message.authorizedRelayers.push(reader.string());
          break;
        case 2:
          message.confirmations = reader.int32();
          break;
        case 3:
          message.maxAcceptableBlockDepth = reader.uint64();
          break;
        case 4:
          message.btcVoucherDenom = reader.string();
          break;
        case 5:
          message.vaults.push(Vault.decode(reader, reader.uint32()));
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
    message.authorizedRelayers = object.authorizedRelayers?.map((e) => e) || [];
    message.confirmations = object.confirmations ?? 0;
    message.maxAcceptableBlockDepth =
      object.maxAcceptableBlockDepth !== undefined && object.maxAcceptableBlockDepth !== null
        ? BigInt(object.maxAcceptableBlockDepth.toString())
        : BigInt(0);
    message.btcVoucherDenom = object.btcVoucherDenom ?? '';
    message.vaults = object.vaults?.map((e) => Vault.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.authorizedRelayers = object.authorized_relayers?.map((e) => e) || [];
    if (object.confirmations !== undefined && object.confirmations !== null) {
      message.confirmations = object.confirmations;
    }
    if (object.max_acceptable_block_depth !== undefined && object.max_acceptable_block_depth !== null) {
      message.maxAcceptableBlockDepth = BigInt(object.max_acceptable_block_depth);
    }
    if (object.btc_voucher_denom !== undefined && object.btc_voucher_denom !== null) {
      message.btcVoucherDenom = object.btc_voucher_denom;
    }
    message.vaults = object.vaults?.map((e) => Vault.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.authorizedRelayers) {
      obj.authorized_relayers = message.authorizedRelayers.map((e) => e);
    } else {
      obj.authorized_relayers = message.authorizedRelayers;
    }
    obj.confirmations = message.confirmations === 0 ? undefined : message.confirmations;
    obj.max_acceptable_block_depth =
      message.maxAcceptableBlockDepth !== BigInt(0) ? message.maxAcceptableBlockDepth.toString() : undefined;
    obj.btc_voucher_denom = message.btcVoucherDenom === '' ? undefined : message.btcVoucherDenom;
    if (message.vaults) {
      obj.vaults = message.vaults.map((e) => (e ? Vault.toAmino(e) : undefined));
    } else {
      obj.vaults = message.vaults;
    }
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
      typeUrl: '/side.btcbridge.Params',
      value: Params.encode(message).finish()
    };
  }
};
function createBaseVault(): Vault {
  return {
    address: '',
    pubKey: '',
    assetType: 0
  };
}
export const Vault = {
  typeUrl: '/side.btcbridge.Vault',
  encode(message: Vault, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== '') {
      writer.uint32(10).string(message.address);
    }
    if (message.pubKey !== '') {
      writer.uint32(18).string(message.pubKey);
    }
    if (message.assetType !== 0) {
      writer.uint32(32).int32(message.assetType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Vault {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pubKey = reader.string();
          break;
        case 4:
          message.assetType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Vault>): Vault {
    const message = createBaseVault();
    message.address = object.address ?? '';
    message.pubKey = object.pubKey ?? '';
    message.assetType = object.assetType ?? 0;
    return message;
  },
  fromAmino(object: VaultAmino): Vault {
    const message = createBaseVault();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = object.pub_key;
    }
    if (object.asset_type !== undefined && object.asset_type !== null) {
      message.assetType = object.asset_type;
    }
    return message;
  },
  toAmino(message: Vault): VaultAmino {
    const obj: any = {};
    obj.address = message.address === '' ? undefined : message.address;
    obj.pub_key = message.pubKey === '' ? undefined : message.pubKey;
    obj.asset_type = message.assetType === 0 ? undefined : message.assetType;
    return obj;
  },
  fromAminoMsg(object: VaultAminoMsg): Vault {
    return Vault.fromAmino(object.value);
  },
  fromProtoMsg(message: VaultProtoMsg): Vault {
    return Vault.decode(message.value);
  },
  toProto(message: Vault): Uint8Array {
    return Vault.encode(message).finish();
  },
  toProtoMsg(message: Vault): VaultProtoMsg {
    return {
      typeUrl: '/side.btcbridge.Vault',
      value: Vault.encode(message).finish()
    };
  }
};
