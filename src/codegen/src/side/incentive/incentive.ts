//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Rewards */
export interface Rewards {
  address: string;
  depositCount: bigint;
  withdrawCount: bigint;
  depositReward: Coin;
  withdrawReward: Coin;
  totalAmount: Coin;
}
export interface RewardsProtoMsg {
  typeUrl: "/side.incentive.Rewards";
  value: Uint8Array;
}
/** Rewards */
export interface RewardsAmino {
  address?: string;
  deposit_count?: string;
  withdraw_count?: string;
  deposit_reward?: CoinAmino;
  withdraw_reward?: CoinAmino;
  total_amount?: CoinAmino;
}
export interface RewardsAminoMsg {
  type: "/side.incentive.Rewards";
  value: RewardsAmino;
}
/** Rewards */
export interface RewardsSDKType {
  address: string;
  deposit_count: bigint;
  withdraw_count: bigint;
  deposit_reward: CoinSDKType;
  withdraw_reward: CoinSDKType;
  total_amount: CoinSDKType;
}
/** Reward Statistics */
export interface RewardStats {
  addressCount: bigint;
  txCount: bigint;
  totalRewardAmount: Coin;
}
export interface RewardStatsProtoMsg {
  typeUrl: "/side.incentive.RewardStats";
  value: Uint8Array;
}
/** Reward Statistics */
export interface RewardStatsAmino {
  address_count?: string;
  tx_count?: string;
  total_reward_amount?: CoinAmino;
}
export interface RewardStatsAminoMsg {
  type: "/side.incentive.RewardStats";
  value: RewardStatsAmino;
}
/** Reward Statistics */
export interface RewardStatsSDKType {
  address_count: bigint;
  tx_count: bigint;
  total_reward_amount: CoinSDKType;
}
function createBaseRewards(): Rewards {
  return {
    address: "",
    depositCount: BigInt(0),
    withdrawCount: BigInt(0),
    depositReward: Coin.fromPartial({}),
    withdrawReward: Coin.fromPartial({}),
    totalAmount: Coin.fromPartial({})
  };
}
export const Rewards = {
  typeUrl: "/side.incentive.Rewards",
  encode(message: Rewards, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.depositCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.depositCount);
    }
    if (message.withdrawCount !== BigInt(0)) {
      writer.uint32(24).uint64(message.withdrawCount);
    }
    if (message.depositReward !== undefined) {
      Coin.encode(message.depositReward, writer.uint32(34).fork()).ldelim();
    }
    if (message.withdrawReward !== undefined) {
      Coin.encode(message.withdrawReward, writer.uint32(42).fork()).ldelim();
    }
    if (message.totalAmount !== undefined) {
      Coin.encode(message.totalAmount, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Rewards {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.depositCount = reader.uint64();
          break;
        case 3:
          message.withdrawCount = reader.uint64();
          break;
        case 4:
          message.depositReward = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.withdrawReward = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.totalAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Rewards>): Rewards {
    const message = createBaseRewards();
    message.address = object.address ?? "";
    message.depositCount = object.depositCount !== undefined && object.depositCount !== null ? BigInt(object.depositCount.toString()) : BigInt(0);
    message.withdrawCount = object.withdrawCount !== undefined && object.withdrawCount !== null ? BigInt(object.withdrawCount.toString()) : BigInt(0);
    message.depositReward = object.depositReward !== undefined && object.depositReward !== null ? Coin.fromPartial(object.depositReward) : undefined;
    message.withdrawReward = object.withdrawReward !== undefined && object.withdrawReward !== null ? Coin.fromPartial(object.withdrawReward) : undefined;
    message.totalAmount = object.totalAmount !== undefined && object.totalAmount !== null ? Coin.fromPartial(object.totalAmount) : undefined;
    return message;
  },
  fromAmino(object: RewardsAmino): Rewards {
    const message = createBaseRewards();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.deposit_count !== undefined && object.deposit_count !== null) {
      message.depositCount = BigInt(object.deposit_count);
    }
    if (object.withdraw_count !== undefined && object.withdraw_count !== null) {
      message.withdrawCount = BigInt(object.withdraw_count);
    }
    if (object.deposit_reward !== undefined && object.deposit_reward !== null) {
      message.depositReward = Coin.fromAmino(object.deposit_reward);
    }
    if (object.withdraw_reward !== undefined && object.withdraw_reward !== null) {
      message.withdrawReward = Coin.fromAmino(object.withdraw_reward);
    }
    if (object.total_amount !== undefined && object.total_amount !== null) {
      message.totalAmount = Coin.fromAmino(object.total_amount);
    }
    return message;
  },
  toAmino(message: Rewards): RewardsAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.deposit_count = message.depositCount !== BigInt(0) ? message.depositCount.toString() : undefined;
    obj.withdraw_count = message.withdrawCount !== BigInt(0) ? message.withdrawCount.toString() : undefined;
    obj.deposit_reward = message.depositReward ? Coin.toAmino(message.depositReward) : undefined;
    obj.withdraw_reward = message.withdrawReward ? Coin.toAmino(message.withdrawReward) : undefined;
    obj.total_amount = message.totalAmount ? Coin.toAmino(message.totalAmount) : undefined;
    return obj;
  },
  fromAminoMsg(object: RewardsAminoMsg): Rewards {
    return Rewards.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardsProtoMsg): Rewards {
    return Rewards.decode(message.value);
  },
  toProto(message: Rewards): Uint8Array {
    return Rewards.encode(message).finish();
  },
  toProtoMsg(message: Rewards): RewardsProtoMsg {
    return {
      typeUrl: "/side.incentive.Rewards",
      value: Rewards.encode(message).finish()
    };
  }
};
function createBaseRewardStats(): RewardStats {
  return {
    addressCount: BigInt(0),
    txCount: BigInt(0),
    totalRewardAmount: Coin.fromPartial({})
  };
}
export const RewardStats = {
  typeUrl: "/side.incentive.RewardStats",
  encode(message: RewardStats, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressCount !== BigInt(0)) {
      writer.uint32(8).uint64(message.addressCount);
    }
    if (message.txCount !== BigInt(0)) {
      writer.uint32(16).uint64(message.txCount);
    }
    if (message.totalRewardAmount !== undefined) {
      Coin.encode(message.totalRewardAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): RewardStats {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressCount = reader.uint64();
          break;
        case 2:
          message.txCount = reader.uint64();
          break;
        case 3:
          message.totalRewardAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardStats>): RewardStats {
    const message = createBaseRewardStats();
    message.addressCount = object.addressCount !== undefined && object.addressCount !== null ? BigInt(object.addressCount.toString()) : BigInt(0);
    message.txCount = object.txCount !== undefined && object.txCount !== null ? BigInt(object.txCount.toString()) : BigInt(0);
    message.totalRewardAmount = object.totalRewardAmount !== undefined && object.totalRewardAmount !== null ? Coin.fromPartial(object.totalRewardAmount) : undefined;
    return message;
  },
  fromAmino(object: RewardStatsAmino): RewardStats {
    const message = createBaseRewardStats();
    if (object.address_count !== undefined && object.address_count !== null) {
      message.addressCount = BigInt(object.address_count);
    }
    if (object.tx_count !== undefined && object.tx_count !== null) {
      message.txCount = BigInt(object.tx_count);
    }
    if (object.total_reward_amount !== undefined && object.total_reward_amount !== null) {
      message.totalRewardAmount = Coin.fromAmino(object.total_reward_amount);
    }
    return message;
  },
  toAmino(message: RewardStats): RewardStatsAmino {
    const obj: any = {};
    obj.address_count = message.addressCount !== BigInt(0) ? message.addressCount.toString() : undefined;
    obj.tx_count = message.txCount !== BigInt(0) ? message.txCount.toString() : undefined;
    obj.total_reward_amount = message.totalRewardAmount ? Coin.toAmino(message.totalRewardAmount) : undefined;
    return obj;
  },
  fromAminoMsg(object: RewardStatsAminoMsg): RewardStats {
    return RewardStats.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardStatsProtoMsg): RewardStats {
    return RewardStats.decode(message.value);
  },
  toProto(message: RewardStats): Uint8Array {
    return RewardStats.encode(message).finish();
  },
  toProtoMsg(message: RewardStats): RewardStatsProtoMsg {
    return {
      typeUrl: "/side.incentive.RewardStats",
      value: RewardStats.encode(message).finish()
    };
  }
};