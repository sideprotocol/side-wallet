//@ts-nocheck
import { Timestamp } from "../../google/protobuf/timestamp";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
import { Decimal } from "@cosmjs/math";
/** Epoch status */
export enum EpochStatus {
  EPOCH_STATUS_PENDING = 0,
  EPOCH_STATUS_STARTED = 1,
  EPOCH_STATUS_ENDED = 2,
  UNRECOGNIZED = -1,
}
export const EpochStatusSDKType = EpochStatus;
export const EpochStatusAmino = EpochStatus;
export function epochStatusFromJSON(object: any): EpochStatus {
  switch (object) {
    case 0:
    case "EPOCH_STATUS_PENDING":
      return EpochStatus.EPOCH_STATUS_PENDING;
    case 1:
    case "EPOCH_STATUS_STARTED":
      return EpochStatus.EPOCH_STATUS_STARTED;
    case 2:
    case "EPOCH_STATUS_ENDED":
      return EpochStatus.EPOCH_STATUS_ENDED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EpochStatus.UNRECOGNIZED;
  }
}
export function epochStatusToJSON(object: EpochStatus): string {
  switch (object) {
    case EpochStatus.EPOCH_STATUS_PENDING:
      return "EPOCH_STATUS_PENDING";
    case EpochStatus.EPOCH_STATUS_STARTED:
      return "EPOCH_STATUS_STARTED";
    case EpochStatus.EPOCH_STATUS_ENDED:
      return "EPOCH_STATUS_ENDED";
    case EpochStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Staking status */
export enum StakingStatus {
  STAKING_STATUS_UNSPECIFIED = 0,
  STAKING_STATUS_STAKED = 1,
  STAKING_STATUS_UNLOCKED = 2,
  STAKING_STATUS_UNSTAKED = 3,
  UNRECOGNIZED = -1,
}
export const StakingStatusSDKType = StakingStatus;
export const StakingStatusAmino = StakingStatus;
export function stakingStatusFromJSON(object: any): StakingStatus {
  switch (object) {
    case 0:
    case "STAKING_STATUS_UNSPECIFIED":
      return StakingStatus.STAKING_STATUS_UNSPECIFIED;
    case 1:
    case "STAKING_STATUS_STAKED":
      return StakingStatus.STAKING_STATUS_STAKED;
    case 2:
    case "STAKING_STATUS_UNLOCKED":
      return StakingStatus.STAKING_STATUS_UNLOCKED;
    case 3:
    case "STAKING_STATUS_UNSTAKED":
      return StakingStatus.STAKING_STATUS_UNSTAKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StakingStatus.UNRECOGNIZED;
  }
}
export function stakingStatusToJSON(object: StakingStatus): string {
  switch (object) {
    case StakingStatus.STAKING_STATUS_UNSPECIFIED:
      return "STAKING_STATUS_UNSPECIFIED";
    case StakingStatus.STAKING_STATUS_STAKED:
      return "STAKING_STATUS_STAKED";
    case StakingStatus.STAKING_STATUS_UNLOCKED:
      return "STAKING_STATUS_UNLOCKED";
    case StakingStatus.STAKING_STATUS_UNSTAKED:
      return "STAKING_STATUS_UNSTAKED";
    case StakingStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Epoch defines the epoch */
export interface Epoch {
  id: bigint;
  startTime: Date;
  endTime: Date;
  totalStakings: TotalStaking[];
  status: EpochStatus;
}
export interface EpochProtoMsg {
  typeUrl: "/side.farming.Epoch";
  value: Uint8Array;
}
/** Epoch defines the epoch */
export interface EpochAmino {
  id?: string;
  start_time?: string;
  end_time?: string;
  total_stakings?: TotalStakingAmino[];
  status?: EpochStatus;
}
export interface EpochAminoMsg {
  type: "/side.farming.Epoch";
  value: EpochAmino;
}
/** Epoch defines the epoch */
export interface EpochSDKType {
  id: bigint;
  start_time: Date;
  end_time: Date;
  total_stakings: TotalStakingSDKType[];
  status: EpochStatus;
}
/** Staking defines the staking */
export interface Staking {
  id: bigint;
  address: string;
  amount: Coin;
  lockDuration: Duration;
  lockMultiplier: string;
  effectiveAmount: Coin;
  pendingRewards: Coin;
  totalRewards: Coin;
  startTime: Date;
  status: StakingStatus;
}
export interface StakingProtoMsg {
  typeUrl: "/side.farming.Staking";
  value: Uint8Array;
}
/** Staking defines the staking */
export interface StakingAmino {
  id?: string;
  address?: string;
  amount?: CoinAmino;
  lock_duration?: DurationAmino;
  lock_multiplier?: string;
  effective_amount?: CoinAmino;
  pending_rewards?: CoinAmino;
  total_rewards?: CoinAmino;
  start_time?: string;
  status?: StakingStatus;
}
export interface StakingAminoMsg {
  type: "/side.farming.Staking";
  value: StakingAmino;
}
/** Staking defines the staking */
export interface StakingSDKType {
  id: bigint;
  address: string;
  amount: CoinSDKType;
  lock_duration: DurationSDKType;
  lock_multiplier: string;
  effective_amount: CoinSDKType;
  pending_rewards: CoinSDKType;
  total_rewards: CoinSDKType;
  start_time: Date;
  status: StakingStatus;
}
/** TotalStaking defines total staking per denom */
export interface TotalStaking {
  denom: string;
  amount: Coin;
  effectiveAmount: Coin;
}
export interface TotalStakingProtoMsg {
  typeUrl: "/side.farming.TotalStaking";
  value: Uint8Array;
}
/** TotalStaking defines total staking per denom */
export interface TotalStakingAmino {
  denom?: string;
  amount?: CoinAmino;
  effective_amount?: CoinAmino;
}
export interface TotalStakingAminoMsg {
  type: "/side.farming.TotalStaking";
  value: TotalStakingAmino;
}
/** TotalStaking defines total staking per denom */
export interface TotalStakingSDKType {
  denom: string;
  amount: CoinSDKType;
  effective_amount: CoinSDKType;
}
/** AccountRewardPerEpoch defines the account reward per epoch */
export interface AccountRewardPerEpoch {
  address: string;
  stakings: TotalStaking[];
  shares: string[];
  totalShare: string;
  reward: Coin;
}
export interface AccountRewardPerEpochProtoMsg {
  typeUrl: "/side.farming.AccountRewardPerEpoch";
  value: Uint8Array;
}
/** AccountRewardPerEpoch defines the account reward per epoch */
export interface AccountRewardPerEpochAmino {
  address?: string;
  stakings?: TotalStakingAmino[];
  shares?: string[];
  total_share?: string;
  reward?: CoinAmino;
}
export interface AccountRewardPerEpochAminoMsg {
  type: "/side.farming.AccountRewardPerEpoch";
  value: AccountRewardPerEpochAmino;
}
/** AccountRewardPerEpoch defines the account reward per epoch */
export interface AccountRewardPerEpochSDKType {
  address: string;
  stakings: TotalStakingSDKType[];
  shares: string[];
  total_share: string;
  reward: CoinSDKType;
}
function createBaseEpoch(): Epoch {
  return {
    id: BigInt(0),
    startTime: new Date(),
    endTime: new Date(),
    totalStakings: [],
    status: 0
  };
}
export const Epoch = {
  typeUrl: "/side.farming.Epoch",
  encode(message: Epoch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.totalStakings) {
      TotalStaking.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Epoch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpoch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.totalStakings.push(TotalStaking.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<Epoch>): Epoch {
    const message = createBaseEpoch();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.totalStakings = object.totalStakings?.map(e => TotalStaking.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: EpochAmino): Epoch {
    const message = createBaseEpoch();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    message.totalStakings = object.total_stakings?.map(e => TotalStaking.fromAmino(e)) || [];
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Epoch): EpochAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    if (message.totalStakings) {
      obj.total_stakings = message.totalStakings.map(e => e ? TotalStaking.toAmino(e) : undefined);
    } else {
      obj.total_stakings = message.totalStakings;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: EpochAminoMsg): Epoch {
    return Epoch.fromAmino(object.value);
  },
  fromProtoMsg(message: EpochProtoMsg): Epoch {
    return Epoch.decode(message.value);
  },
  toProto(message: Epoch): Uint8Array {
    return Epoch.encode(message).finish();
  },
  toProtoMsg(message: Epoch): EpochProtoMsg {
    return {
      typeUrl: "/side.farming.Epoch",
      value: Epoch.encode(message).finish()
    };
  }
};
function createBaseStaking(): Staking {
  return {
    id: BigInt(0),
    address: "",
    amount: Coin.fromPartial({}),
    lockDuration: Duration.fromPartial({}),
    lockMultiplier: "",
    effectiveAmount: Coin.fromPartial({}),
    pendingRewards: Coin.fromPartial({}),
    totalRewards: Coin.fromPartial({}),
    startTime: new Date(),
    status: 0
  };
}
export const Staking = {
  typeUrl: "/side.farming.Staking",
  encode(message: Staking, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.lockDuration !== undefined) {
      Duration.encode(message.lockDuration, writer.uint32(34).fork()).ldelim();
    }
    if (message.lockMultiplier !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.lockMultiplier, 18).atomics);
    }
    if (message.effectiveAmount !== undefined) {
      Coin.encode(message.effectiveAmount, writer.uint32(50).fork()).ldelim();
    }
    if (message.pendingRewards !== undefined) {
      Coin.encode(message.pendingRewards, writer.uint32(58).fork()).ldelim();
    }
    if (message.totalRewards !== undefined) {
      Coin.encode(message.totalRewards, writer.uint32(66).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(80).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Staking {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStaking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.lockDuration = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.lockMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.effectiveAmount = Coin.decode(reader, reader.uint32());
          break;
        case 7:
          message.pendingRewards = Coin.decode(reader, reader.uint32());
          break;
        case 8:
          message.totalRewards = Coin.decode(reader, reader.uint32());
          break;
        case 9:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<Staking>): Staking {
    const message = createBaseStaking();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.address = object.address ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.lockDuration = object.lockDuration !== undefined && object.lockDuration !== null ? Duration.fromPartial(object.lockDuration) : undefined;
    message.lockMultiplier = object.lockMultiplier ?? "";
    message.effectiveAmount = object.effectiveAmount !== undefined && object.effectiveAmount !== null ? Coin.fromPartial(object.effectiveAmount) : undefined;
    message.pendingRewards = object.pendingRewards !== undefined && object.pendingRewards !== null ? Coin.fromPartial(object.pendingRewards) : undefined;
    message.totalRewards = object.totalRewards !== undefined && object.totalRewards !== null ? Coin.fromPartial(object.totalRewards) : undefined;
    message.startTime = object.startTime ?? undefined;
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: StakingAmino): Staking {
    const message = createBaseStaking();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.lock_duration !== undefined && object.lock_duration !== null) {
      message.lockDuration = Duration.fromAmino(object.lock_duration);
    }
    if (object.lock_multiplier !== undefined && object.lock_multiplier !== null) {
      message.lockMultiplier = object.lock_multiplier;
    }
    if (object.effective_amount !== undefined && object.effective_amount !== null) {
      message.effectiveAmount = Coin.fromAmino(object.effective_amount);
    }
    if (object.pending_rewards !== undefined && object.pending_rewards !== null) {
      message.pendingRewards = Coin.fromAmino(object.pending_rewards);
    }
    if (object.total_rewards !== undefined && object.total_rewards !== null) {
      message.totalRewards = Coin.fromAmino(object.total_rewards);
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Staking): StakingAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : undefined;
    obj.lock_duration = message.lockDuration ? Duration.toAmino(message.lockDuration) : undefined;
    obj.lock_multiplier = message.lockMultiplier === "" ? undefined : message.lockMultiplier;
    obj.effective_amount = message.effectiveAmount ? Coin.toAmino(message.effectiveAmount) : undefined;
    obj.pending_rewards = message.pendingRewards ? Coin.toAmino(message.pendingRewards) : undefined;
    obj.total_rewards = message.totalRewards ? Coin.toAmino(message.totalRewards) : undefined;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: StakingAminoMsg): Staking {
    return Staking.fromAmino(object.value);
  },
  fromProtoMsg(message: StakingProtoMsg): Staking {
    return Staking.decode(message.value);
  },
  toProto(message: Staking): Uint8Array {
    return Staking.encode(message).finish();
  },
  toProtoMsg(message: Staking): StakingProtoMsg {
    return {
      typeUrl: "/side.farming.Staking",
      value: Staking.encode(message).finish()
    };
  }
};
function createBaseTotalStaking(): TotalStaking {
  return {
    denom: "",
    amount: Coin.fromPartial({}),
    effectiveAmount: Coin.fromPartial({})
  };
}
export const TotalStaking = {
  typeUrl: "/side.farming.TotalStaking",
  encode(message: TotalStaking, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.effectiveAmount !== undefined) {
      Coin.encode(message.effectiveAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TotalStaking {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalStaking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.effectiveAmount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalStaking>): TotalStaking {
    const message = createBaseTotalStaking();
    message.denom = object.denom ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.effectiveAmount = object.effectiveAmount !== undefined && object.effectiveAmount !== null ? Coin.fromPartial(object.effectiveAmount) : undefined;
    return message;
  },
  fromAmino(object: TotalStakingAmino): TotalStaking {
    const message = createBaseTotalStaking();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.effective_amount !== undefined && object.effective_amount !== null) {
      message.effectiveAmount = Coin.fromAmino(object.effective_amount);
    }
    return message;
  },
  toAmino(message: TotalStaking): TotalStakingAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : undefined;
    obj.effective_amount = message.effectiveAmount ? Coin.toAmino(message.effectiveAmount) : undefined;
    return obj;
  },
  fromAminoMsg(object: TotalStakingAminoMsg): TotalStaking {
    return TotalStaking.fromAmino(object.value);
  },
  fromProtoMsg(message: TotalStakingProtoMsg): TotalStaking {
    return TotalStaking.decode(message.value);
  },
  toProto(message: TotalStaking): Uint8Array {
    return TotalStaking.encode(message).finish();
  },
  toProtoMsg(message: TotalStaking): TotalStakingProtoMsg {
    return {
      typeUrl: "/side.farming.TotalStaking",
      value: TotalStaking.encode(message).finish()
    };
  }
};
function createBaseAccountRewardPerEpoch(): AccountRewardPerEpoch {
  return {
    address: "",
    stakings: [],
    shares: [],
    totalShare: "",
    reward: Coin.fromPartial({})
  };
}
export const AccountRewardPerEpoch = {
  typeUrl: "/side.farming.AccountRewardPerEpoch",
  encode(message: AccountRewardPerEpoch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.stakings) {
      TotalStaking.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.shares) {
      writer.uint32(26).string(Decimal.fromUserInput(v!, 18).atomics);
    }
    if (message.totalShare !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.totalShare, 18).atomics);
    }
    if (message.reward !== undefined) {
      Coin.encode(message.reward, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AccountRewardPerEpoch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountRewardPerEpoch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.stakings.push(TotalStaking.decode(reader, reader.uint32()));
          break;
        case 3:
          message.shares.push(Decimal.fromAtomics(reader.string(), 18).toString());
          break;
        case 4:
          message.totalShare = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.reward = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AccountRewardPerEpoch>): AccountRewardPerEpoch {
    const message = createBaseAccountRewardPerEpoch();
    message.address = object.address ?? "";
    message.stakings = object.stakings?.map(e => TotalStaking.fromPartial(e)) || [];
    message.shares = object.shares?.map(e => e) || [];
    message.totalShare = object.totalShare ?? "";
    message.reward = object.reward !== undefined && object.reward !== null ? Coin.fromPartial(object.reward) : undefined;
    return message;
  },
  fromAmino(object: AccountRewardPerEpochAmino): AccountRewardPerEpoch {
    const message = createBaseAccountRewardPerEpoch();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    message.stakings = object.stakings?.map(e => TotalStaking.fromAmino(e)) || [];
    message.shares = object.shares?.map(e => e) || [];
    if (object.total_share !== undefined && object.total_share !== null) {
      message.totalShare = object.total_share;
    }
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = Coin.fromAmino(object.reward);
    }
    return message;
  },
  toAmino(message: AccountRewardPerEpoch): AccountRewardPerEpochAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    if (message.stakings) {
      obj.stakings = message.stakings.map(e => e ? TotalStaking.toAmino(e) : undefined);
    } else {
      obj.stakings = message.stakings;
    }
    if (message.shares) {
      obj.shares = message.shares.map(e => e);
    } else {
      obj.shares = message.shares;
    }
    obj.total_share = message.totalShare === "" ? undefined : message.totalShare;
    obj.reward = message.reward ? Coin.toAmino(message.reward) : undefined;
    return obj;
  },
  fromAminoMsg(object: AccountRewardPerEpochAminoMsg): AccountRewardPerEpoch {
    return AccountRewardPerEpoch.fromAmino(object.value);
  },
  fromProtoMsg(message: AccountRewardPerEpochProtoMsg): AccountRewardPerEpoch {
    return AccountRewardPerEpoch.decode(message.value);
  },
  toProto(message: AccountRewardPerEpoch): Uint8Array {
    return AccountRewardPerEpoch.encode(message).finish();
  },
  toProtoMsg(message: AccountRewardPerEpoch): AccountRewardPerEpochProtoMsg {
    return {
      typeUrl: "/side.farming.AccountRewardPerEpoch",
      value: AccountRewardPerEpoch.encode(message).finish()
    };
  }
};