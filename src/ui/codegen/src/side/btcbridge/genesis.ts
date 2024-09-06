//@ts-nocheck
import { BinaryReader, BinaryWriter } from '../../binary';
import { BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, UTXO, UTXOAmino, UTXOSDKType } from './bitcoin';
import { Params, ParamsAmino, ParamsSDKType } from './params';

/** GenesisState defines the btc light client module's genesis state. */
export interface GenesisState {
  params: Params;
  /** the chain tip of the bitcoin chain */
  bestBlockHeader?: BlockHeader;
  blockHeaders: BlockHeader[];
  utxos: UTXO[];
}
export interface GenesisStateProtoMsg {
  typeUrl: '/side.btcbridge.GenesisState';
  value: Uint8Array;
}
/** GenesisState defines the btc light client module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  /** the chain tip of the bitcoin chain */
  best_block_header?: BlockHeaderAmino;
  block_headers?: BlockHeaderAmino[];
  utxos?: UTXOAmino[];
}
export interface GenesisStateAminoMsg {
  type: '/side.btcbridge.GenesisState';
  value: GenesisStateAmino;
}
/** GenesisState defines the btc light client module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  best_block_header?: BlockHeaderSDKType;
  block_headers: BlockHeaderSDKType[];
  utxos: UTXOSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    bestBlockHeader: undefined,
    blockHeaders: [],
    utxos: []
  };
}
export const GenesisState = {
  typeUrl: '/side.btcbridge.GenesisState',
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.bestBlockHeader !== undefined) {
      BlockHeader.encode(message.bestBlockHeader, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.blockHeaders) {
      BlockHeader.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.utxos) {
      UTXO.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.bestBlockHeader = BlockHeader.decode(reader, reader.uint32());
          break;
        case 3:
          message.blockHeaders.push(BlockHeader.decode(reader, reader.uint32()));
          break;
        case 4:
          message.utxos.push(UTXO.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.bestBlockHeader =
      object.bestBlockHeader !== undefined && object.bestBlockHeader !== null
        ? BlockHeader.fromPartial(object.bestBlockHeader)
        : undefined;
    message.blockHeaders = object.blockHeaders?.map((e) => BlockHeader.fromPartial(e)) || [];
    message.utxos = object.utxos?.map((e) => UTXO.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.best_block_header !== undefined && object.best_block_header !== null) {
      message.bestBlockHeader = BlockHeader.fromAmino(object.best_block_header);
    }
    message.blockHeaders = object.block_headers?.map((e) => BlockHeader.fromAmino(e)) || [];
    message.utxos = object.utxos?.map((e) => UTXO.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    obj.best_block_header = message.bestBlockHeader ? BlockHeader.toAmino(message.bestBlockHeader) : undefined;
    if (message.blockHeaders) {
      obj.block_headers = message.blockHeaders.map((e) => (e ? BlockHeader.toAmino(e) : undefined));
    } else {
      obj.block_headers = message.blockHeaders;
    }
    if (message.utxos) {
      obj.utxos = message.utxos.map((e) => (e ? UTXO.toAmino(e) : undefined));
    } else {
      obj.utxos = message.utxos;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: '/side.btcbridge.GenesisState',
      value: GenesisState.encode(message).finish()
    };
  }
};
