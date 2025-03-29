//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** origination fee collector address */
  originationFeeCollector: string;
  /** protocol fee collector address */
  protocolFeeCollector: string;
  /** final timeout duration for each loan */
  finalTimeoutDuration: Duration;
}
export interface ParamsProtoMsg {
  typeUrl: "/side.lending.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** origination fee collector address */
  origination_fee_collector?: string;
  /** protocol fee collector address */
  protocol_fee_collector?: string;
  /** final timeout duration for each loan */
  final_timeout_duration?: DurationAmino;
}
export interface ParamsAminoMsg {
  type: "/side.lending.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  origination_fee_collector: string;
  protocol_fee_collector: string;
  final_timeout_duration: DurationSDKType;
}
function createBaseParams(): Params {
  return {
    originationFeeCollector: "",
    protocolFeeCollector: "",
    finalTimeoutDuration: Duration.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/side.lending.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.originationFeeCollector !== "") {
      writer.uint32(10).string(message.originationFeeCollector);
    }
    if (message.protocolFeeCollector !== "") {
      writer.uint32(18).string(message.protocolFeeCollector);
    }
    if (message.finalTimeoutDuration !== undefined) {
      Duration.encode(message.finalTimeoutDuration, writer.uint32(26).fork()).ldelim();
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
          message.originationFeeCollector = reader.string();
          break;
        case 2:
          message.protocolFeeCollector = reader.string();
          break;
        case 3:
          message.finalTimeoutDuration = Duration.decode(reader, reader.uint32());
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
    message.originationFeeCollector = object.originationFeeCollector ?? "";
    message.protocolFeeCollector = object.protocolFeeCollector ?? "";
    message.finalTimeoutDuration = object.finalTimeoutDuration !== undefined && object.finalTimeoutDuration !== null ? Duration.fromPartial(object.finalTimeoutDuration) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.origination_fee_collector !== undefined && object.origination_fee_collector !== null) {
      message.originationFeeCollector = object.origination_fee_collector;
    }
    if (object.protocol_fee_collector !== undefined && object.protocol_fee_collector !== null) {
      message.protocolFeeCollector = object.protocol_fee_collector;
    }
    if (object.final_timeout_duration !== undefined && object.final_timeout_duration !== null) {
      message.finalTimeoutDuration = Duration.fromAmino(object.final_timeout_duration);
    }
    return message;
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.origination_fee_collector = message.originationFeeCollector === "" ? undefined : message.originationFeeCollector;
    obj.protocol_fee_collector = message.protocolFeeCollector === "" ? undefined : message.protocolFeeCollector;
    obj.final_timeout_duration = message.finalTimeoutDuration ? Duration.toAmino(message.finalTimeoutDuration) : undefined;
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
      typeUrl: "/side.lending.Params",
      value: Params.encode(message).finish()
    };
  }
};