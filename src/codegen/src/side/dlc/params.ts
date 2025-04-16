//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface PriceInterval {
  pricePair: string;
  interval: number;
}
export interface PriceIntervalProtoMsg {
  typeUrl: "/side.dlc.PriceInterval";
  value: Uint8Array;
}
export interface PriceIntervalAmino {
  price_pair?: string;
  interval?: number;
}
export interface PriceIntervalAminoMsg {
  type: "/side.dlc.PriceInterval";
  value: PriceIntervalAmino;
}
export interface PriceIntervalSDKType {
  price_pair: string;
  interval: number;
}
/** Params defines the parameters for the module. */
export interface Params {
  priceEventNonceQueueSize: number;
  priceIntervals: PriceInterval[];
  dateEventNonceQueueSize: number;
  dateInterval: Duration;
  lendingEventNonceQueueSize: number;
  dkgTimeoutPeriod: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.dlc.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  price_event_nonce_queue_size?: number;
  price_intervals?: PriceIntervalAmino[];
  date_event_nonce_queue_size?: number;
  date_interval?: DurationAmino;
  lending_event_nonce_queue_size?: number;
  dkg_timeout_period?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/side.dlc.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  price_event_nonce_queue_size: number;
  price_intervals: PriceIntervalSDKType[];
  date_event_nonce_queue_size: number;
  date_interval: DurationSDKType;
  lending_event_nonce_queue_size: number;
  dkg_timeout_period: DurationSDKType;
}
function createBasePriceInterval(): PriceInterval {
  return {
    pricePair: "",
    interval: 0
  };
}
export const PriceInterval = {
  typeUrl: "/side.dlc.PriceInterval",
  encode(message: PriceInterval, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pricePair !== "") {
      writer.uint32(10).string(message.pricePair);
    }
    if (message.interval !== 0) {
      writer.uint32(16).int32(message.interval);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): PriceInterval {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePriceInterval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pricePair = reader.string();
          break;
        case 2:
          message.interval = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PriceInterval>): PriceInterval {
    const message = createBasePriceInterval();
    message.pricePair = object.pricePair ?? "";
    message.interval = object.interval ?? 0;
    return message;
  },
  fromAmino(object: PriceIntervalAmino): PriceInterval {
    const message = createBasePriceInterval();
    if (object.price_pair !== undefined && object.price_pair !== null) {
      message.pricePair = object.price_pair;
    }
    if (object.interval !== undefined && object.interval !== null) {
      message.interval = object.interval;
    }
    return message;
  },
  toAmino(message: PriceInterval): PriceIntervalAmino {
    const obj: any = {};
    obj.price_pair = message.pricePair === "" ? undefined : message.pricePair;
    obj.interval = message.interval === 0 ? undefined : message.interval;
    return obj;
  },
  fromAminoMsg(object: PriceIntervalAminoMsg): PriceInterval {
    return PriceInterval.fromAmino(object.value);
  },
  fromProtoMsg(message: PriceIntervalProtoMsg): PriceInterval {
    return PriceInterval.decode(message.value);
  },
  toProto(message: PriceInterval): Uint8Array {
    return PriceInterval.encode(message).finish();
  },
  toProtoMsg(message: PriceInterval): PriceIntervalProtoMsg {
    return {
      typeUrl: "/side.dlc.PriceInterval",
      value: PriceInterval.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    priceEventNonceQueueSize: 0,
    priceIntervals: [],
    dateEventNonceQueueSize: 0,
    dateInterval: Duration.fromPartial({}),
    lendingEventNonceQueueSize: 0,
    dkgTimeoutPeriod: Duration.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/side.dlc.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.priceEventNonceQueueSize !== 0) {
      writer.uint32(8).uint32(message.priceEventNonceQueueSize);
    }
    for (const v of message.priceIntervals) {
      PriceInterval.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.dateEventNonceQueueSize !== 0) {
      writer.uint32(24).uint32(message.dateEventNonceQueueSize);
    }
    if (message.dateInterval !== undefined) {
      Duration.encode(message.dateInterval, writer.uint32(34).fork()).ldelim();
    }
    if (message.lendingEventNonceQueueSize !== 0) {
      writer.uint32(40).uint32(message.lendingEventNonceQueueSize);
    }
    if (message.dkgTimeoutPeriod !== undefined) {
      Duration.encode(message.dkgTimeoutPeriod, writer.uint32(50).fork()).ldelim();
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
          message.priceEventNonceQueueSize = reader.uint32();
          break;
        case 2:
          message.priceIntervals.push(PriceInterval.decode(reader, reader.uint32()));
          break;
        case 3:
          message.dateEventNonceQueueSize = reader.uint32();
          break;
        case 4:
          message.dateInterval = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.lendingEventNonceQueueSize = reader.uint32();
          break;
        case 6:
          message.dkgTimeoutPeriod = Duration.decode(reader, reader.uint32());
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
    message.priceEventNonceQueueSize = object.priceEventNonceQueueSize ?? 0;
    message.priceIntervals = object.priceIntervals?.map(e => PriceInterval.fromPartial(e)) || [];
    message.dateEventNonceQueueSize = object.dateEventNonceQueueSize ?? 0;
    message.dateInterval = object.dateInterval !== undefined && object.dateInterval !== null ? Duration.fromPartial(object.dateInterval) : undefined;
    message.lendingEventNonceQueueSize = object.lendingEventNonceQueueSize ?? 0;
    message.dkgTimeoutPeriod = object.dkgTimeoutPeriod !== undefined && object.dkgTimeoutPeriod !== null ? Duration.fromPartial(object.dkgTimeoutPeriod) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.price_event_nonce_queue_size !== undefined && object.price_event_nonce_queue_size !== null) {
      message.priceEventNonceQueueSize = object.price_event_nonce_queue_size;
    }
    message.priceIntervals = object.price_intervals?.map(e => PriceInterval.fromAmino(e)) || [];
    if (object.date_event_nonce_queue_size !== undefined && object.date_event_nonce_queue_size !== null) {
      message.dateEventNonceQueueSize = object.date_event_nonce_queue_size;
    }
    if (object.date_interval !== undefined && object.date_interval !== null) {
      message.dateInterval = Duration.fromAmino(object.date_interval);
    }
    if (object.lending_event_nonce_queue_size !== undefined && object.lending_event_nonce_queue_size !== null) {
      message.lendingEventNonceQueueSize = object.lending_event_nonce_queue_size;
    }
    if (object.dkg_timeout_period !== undefined && object.dkg_timeout_period !== null) {
      message.dkgTimeoutPeriod = Duration.fromAmino(object.dkg_timeout_period);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.price_event_nonce_queue_size = message.priceEventNonceQueueSize === 0 ? undefined : message.priceEventNonceQueueSize;
    if (message.priceIntervals) {
      obj.price_intervals = message.priceIntervals.map(e => e ? PriceInterval.toAmino(e) : undefined);
    } else {
      obj.price_intervals = message.priceIntervals;
    }
    obj.date_event_nonce_queue_size = message.dateEventNonceQueueSize === 0 ? undefined : message.dateEventNonceQueueSize;
    obj.date_interval = message.dateInterval ? Duration.toAmino(message.dateInterval) : undefined;
    obj.lending_event_nonce_queue_size = message.lendingEventNonceQueueSize === 0 ? undefined : message.lendingEventNonceQueueSize;
    obj.dkg_timeout_period = message.dkgTimeoutPeriod ? Duration.toAmino(message.dkgTimeoutPeriod) : undefined;
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
      typeUrl: "/side.dlc.Params",
      value: Params.encode(message).finish()
    };
  }
};