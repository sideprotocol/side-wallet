//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Asset defines the farming asset */
export interface Asset {
  /** Asset denom */
  denom: string;
  /** Ratio of the reward relative to the total rewards */
  rewardRatio: string;
}
export interface AssetProtoMsg {
  typeUrl: "/side.farming.Asset";
  value: Uint8Array;
}
/** Asset defines the farming asset */
export interface AssetAmino {
  /** Asset denom */
  denom?: string;
  /** Ratio of the reward relative to the total rewards */
  reward_ratio?: string;
}
export interface AssetAminoMsg {
  type: "/side.farming.Asset";
  value: AssetAmino;
}
/** Asset defines the farming asset */
export interface AssetSDKType {
  denom: string;
  reward_ratio: string;
}
/** Params defines the parameters for the module. */
export interface Params {
  enabled: boolean;
  epochDuration: Duration;
  rewardPerEpoch: Coin;
  lockDurations: Duration[];
  eligibleAssets: Asset[];
}
export interface ParamsProtoMsg {
  typeUrl: "/side.farming.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  enabled?: boolean;
  epoch_duration?: DurationAmino;
  reward_per_epoch?: CoinAmino;
  lock_durations?: DurationAmino[];
  eligible_assets?: AssetAmino[];
}
export interface ParamsAminoMsg {
  type: "/side.farming.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  enabled: boolean;
  epoch_duration: DurationSDKType;
  reward_per_epoch: CoinSDKType;
  lock_durations: DurationSDKType[];
  eligible_assets: AssetSDKType[];
}
function createBaseAsset(): Asset {
  return {
    denom: "",
    rewardRatio: ""
  };
}
export const Asset = {
  typeUrl: "/side.farming.Asset",
  encode(message: Asset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.rewardRatio !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.rewardRatio, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Asset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.rewardRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Asset>): Asset {
    const message = createBaseAsset();
    message.denom = object.denom ?? "";
    message.rewardRatio = object.rewardRatio ?? "";
    return message;
  },
  fromAmino(object: AssetAmino): Asset {
    const message = createBaseAsset();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.reward_ratio !== undefined && object.reward_ratio !== null) {
      message.rewardRatio = object.reward_ratio;
    }
    return message;
  },
  toAmino(message: Asset): AssetAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.reward_ratio = message.rewardRatio === "" ? undefined : message.rewardRatio;
    return obj;
  },
  fromAminoMsg(object: AssetAminoMsg): Asset {
    return Asset.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetProtoMsg): Asset {
    return Asset.decode(message.value);
  },
  toProto(message: Asset): Uint8Array {
    return Asset.encode(message).finish();
  },
  toProtoMsg(message: Asset): AssetProtoMsg {
    return {
      typeUrl: "/side.farming.Asset",
      value: Asset.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    enabled: false,
    epochDuration: Duration.fromPartial({}),
    rewardPerEpoch: Coin.fromPartial({}),
    lockDurations: [],
    eligibleAssets: []
  };
}
export const Params = {
  typeUrl: "/side.farming.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.epochDuration !== undefined) {
      Duration.encode(message.epochDuration, writer.uint32(18).fork()).ldelim();
    }
    if (message.rewardPerEpoch !== undefined) {
      Coin.encode(message.rewardPerEpoch, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.lockDurations) {
      Duration.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.eligibleAssets) {
      Asset.encode(v!, writer.uint32(42).fork()).ldelim();
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
          message.enabled = reader.bool();
          break;
        case 2:
          message.epochDuration = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.rewardPerEpoch = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.lockDurations.push(Duration.decode(reader, reader.uint32()));
          break;
        case 5:
          message.eligibleAssets.push(Asset.decode(reader, reader.uint32()));
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
    message.enabled = object.enabled ?? false;
    message.epochDuration = object.epochDuration !== undefined && object.epochDuration !== null ? Duration.fromPartial(object.epochDuration) : undefined;
    message.rewardPerEpoch = object.rewardPerEpoch !== undefined && object.rewardPerEpoch !== null ? Coin.fromPartial(object.rewardPerEpoch) : undefined;
    message.lockDurations = object.lockDurations?.map(e => Duration.fromPartial(e)) || [];
    message.eligibleAssets = object.eligibleAssets?.map(e => Asset.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.epoch_duration !== undefined && object.epoch_duration !== null) {
      message.epochDuration = Duration.fromAmino(object.epoch_duration);
    }
    if (object.reward_per_epoch !== undefined && object.reward_per_epoch !== null) {
      message.rewardPerEpoch = Coin.fromAmino(object.reward_per_epoch);
    }
    message.lockDurations = object.lock_durations?.map(e => Duration.fromAmino(e)) || [];
    message.eligibleAssets = object.eligible_assets?.map(e => Asset.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.epoch_duration = message.epochDuration ? Duration.toAmino(message.epochDuration) : undefined;
    obj.reward_per_epoch = message.rewardPerEpoch ? Coin.toAmino(message.rewardPerEpoch) : undefined;
    if (message.lockDurations) {
      obj.lock_durations = message.lockDurations.map(e => e ? Duration.toAmino(e) : undefined);
    } else {
      obj.lock_durations = message.lockDurations;
    }
    if (message.eligibleAssets) {
      obj.eligible_assets = message.eligibleAssets.map(e => e ? Asset.toAmino(e) : undefined);
    } else {
      obj.eligible_assets = message.eligibleAssets;
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
      typeUrl: "/side.farming.Params",
      value: Params.encode(message).finish()
    };
  }
};