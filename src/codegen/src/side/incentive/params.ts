//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** Indicates if the incentive mechanism is enabled */
  enabled: boolean;
  /** Reward per deposit tx via btc bridge */
  rewardPerDeposit: Coin;
  /** Reward per withdrawal tx via btc bridge */
  rewardPerWithdraw: Coin;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.incentive.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** Indicates if the incentive mechanism is enabled */
  enabled?: boolean;
  /** Reward per deposit tx via btc bridge */
  reward_per_deposit?: CoinAmino;
  /** Reward per withdrawal tx via btc bridge */
  reward_per_withdraw?: CoinAmino;
}
export interface ParamsAminoMsg {
  type: "/side.incentive.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  enabled: boolean;
  reward_per_deposit: CoinSDKType;
  reward_per_withdraw: CoinSDKType;
}
function createBaseParams(): Params {
  return {
    enabled: false,
    rewardPerDeposit: Coin.fromPartial({}),
    rewardPerWithdraw: Coin.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/side.incentive.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.rewardPerDeposit !== undefined) {
      Coin.encode(message.rewardPerDeposit, writer.uint32(18).fork()).ldelim();
    }
    if (message.rewardPerWithdraw !== undefined) {
      Coin.encode(message.rewardPerWithdraw, writer.uint32(26).fork()).ldelim();
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
          message.rewardPerDeposit = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.rewardPerWithdraw = Coin.decode(reader, reader.uint32());
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
    message.rewardPerDeposit = object.rewardPerDeposit !== undefined && object.rewardPerDeposit !== null ? Coin.fromPartial(object.rewardPerDeposit) : undefined;
    message.rewardPerWithdraw = object.rewardPerWithdraw !== undefined && object.rewardPerWithdraw !== null ? Coin.fromPartial(object.rewardPerWithdraw) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.reward_per_deposit !== undefined && object.reward_per_deposit !== null) {
      message.rewardPerDeposit = Coin.fromAmino(object.reward_per_deposit);
    }
    if (object.reward_per_withdraw !== undefined && object.reward_per_withdraw !== null) {
      message.rewardPerWithdraw = Coin.fromAmino(object.reward_per_withdraw);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.reward_per_deposit = message.rewardPerDeposit ? Coin.toAmino(message.rewardPerDeposit) : undefined;
    obj.reward_per_withdraw = message.rewardPerWithdraw ? Coin.toAmino(message.rewardPerWithdraw) : undefined;
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
      typeUrl: "/side.incentive.Params",
      value: Params.encode(message).finish()
    };
  }
};