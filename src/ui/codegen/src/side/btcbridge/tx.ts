//@ts-nocheck
import { BinaryReader, BinaryWriter } from '../../binary';
import { BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, SigningStatus } from './bitcoin';

/** MsgSubmitWithdrawStatusRequest defines the Msg/SubmitWithdrawStatus request type. */
export interface MsgSubmitWithdrawStatusRequest {
  sender: string;
  txid: string;
  status: SigningStatus;
}
export interface MsgSubmitWithdrawStatusRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest';
  value: Uint8Array;
}
/** MsgSubmitWithdrawStatusRequest defines the Msg/SubmitWithdrawStatus request type. */
export interface MsgSubmitWithdrawStatusRequestAmino {
  sender?: string;
  txid?: string;
  status?: SigningStatus;
}
export interface MsgSubmitWithdrawStatusRequestAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawStatusRequest';
  value: MsgSubmitWithdrawStatusRequestAmino;
}
/** MsgSubmitWithdrawStatusRequest defines the Msg/SubmitWithdrawStatus request type. */
export interface MsgSubmitWithdrawStatusRequestSDKType {
  sender: string;
  txid: string;
  status: SigningStatus;
}
/** MsgSubmitWithdrawStatusResponse defines the Msg/SubmitWithdrawStatus response type. */
export interface MsgSubmitWithdrawStatusResponse {}
export interface MsgSubmitWithdrawStatusResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusResponse';
  value: Uint8Array;
}
/** MsgSubmitWithdrawStatusResponse defines the Msg/SubmitWithdrawStatus response type. */
export interface MsgSubmitWithdrawStatusResponseAmino {}
export interface MsgSubmitWithdrawStatusResponseAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawStatusResponse';
  value: MsgSubmitWithdrawStatusResponseAmino;
}
/** MsgSubmitWithdrawStatusResponse defines the Msg/SubmitWithdrawStatus response type. */
export interface MsgSubmitWithdrawStatusResponseSDKType {}
/** MsgBlockHeaderRequest defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeaderRequest {
  sender: string;
  blockHeaders: BlockHeader[];
}
export interface MsgSubmitBlockHeaderRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest';
  value: Uint8Array;
}
/** MsgBlockHeaderRequest defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeaderRequestAmino {
  sender?: string;
  block_headers?: BlockHeaderAmino[];
}
export interface MsgSubmitBlockHeaderRequestAminoMsg {
  type: '/side.btcbridge.MsgSubmitBlockHeaderRequest';
  value: MsgSubmitBlockHeaderRequestAmino;
}
/** MsgBlockHeaderRequest defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeaderRequestSDKType {
  sender: string;
  block_headers: BlockHeaderSDKType[];
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponse {}
export interface MsgSubmitBlockHeadersResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitBlockHeadersResponse';
  value: Uint8Array;
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponseAmino {}
export interface MsgSubmitBlockHeadersResponseAminoMsg {
  type: '/side.btcbridge.MsgSubmitBlockHeadersResponse';
  value: MsgSubmitBlockHeadersResponseAmino;
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponseSDKType {}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitDepositTransactionRequest {
  /** this is relayer address who submit the bitcoin transaction to the side chain */
  sender: string;
  blockhash: string;
  /**
   * the tx bytes in base64 format
   * used for parsing the sender of the transaction
   */
  prevTxBytes: string;
  /** the tx bytes in base64 format */
  txBytes: string;
  proof: string[];
}
export interface MsgSubmitDepositTransactionRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest';
  value: Uint8Array;
}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitDepositTransactionRequestAmino {
  /** this is relayer address who submit the bitcoin transaction to the side chain */
  sender?: string;
  blockhash?: string;
  /**
   * the tx bytes in base64 format
   * used for parsing the sender of the transaction
   */
  prev_tx_bytes?: string;
  /** the tx bytes in base64 format */
  tx_bytes?: string;
  proof?: string[];
}
export interface MsgSubmitDepositTransactionRequestAminoMsg {
  type: '/side.btcbridge.MsgSubmitDepositTransactionRequest';
  value: MsgSubmitDepositTransactionRequestAmino;
}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitDepositTransactionRequestSDKType {
  sender: string;
  blockhash: string;
  prev_tx_bytes: string;
  tx_bytes: string;
  proof: string[];
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitDepositTransactionResponse {}
export interface MsgSubmitDepositTransactionResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionResponse';
  value: Uint8Array;
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitDepositTransactionResponseAmino {}
export interface MsgSubmitDepositTransactionResponseAminoMsg {
  type: '/side.btcbridge.MsgSubmitDepositTransactionResponse';
  value: MsgSubmitDepositTransactionResponseAmino;
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitDepositTransactionResponseSDKType {}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitWithdrawTransactionRequest {
  /** this is relayer address who submit the bitcoin transaction to the side chain */
  sender: string;
  blockhash: string;
  /** the tx bytes in base64 format */
  txBytes: string;
  proof: string[];
}
export interface MsgSubmitWithdrawTransactionRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest';
  value: Uint8Array;
}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitWithdrawTransactionRequestAmino {
  /** this is relayer address who submit the bitcoin transaction to the side chain */
  sender?: string;
  blockhash?: string;
  /** the tx bytes in base64 format */
  tx_bytes?: string;
  proof?: string[];
}
export interface MsgSubmitWithdrawTransactionRequestAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest';
  value: MsgSubmitWithdrawTransactionRequestAmino;
}
/** MsgSubmitTransactionRequest defines the Msg/SubmitTransaction request type. */
export interface MsgSubmitWithdrawTransactionRequestSDKType {
  sender: string;
  blockhash: string;
  tx_bytes: string;
  proof: string[];
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponse {}
export interface MsgSubmitWithdrawTransactionResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionResponse';
  value: Uint8Array;
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponseAmino {}
export interface MsgSubmitWithdrawTransactionResponseAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawTransactionResponse';
  value: MsgSubmitWithdrawTransactionResponseAmino;
}
/** MsgSubmitTransactionResponse defines the Msg/SubmitTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponseSDKType {}
/** Msg defines the MsgUpdateSender service. */
export interface MsgUpdateQualifiedRelayersRequest {
  sender: string;
  /** update senders who can send block headers to the side chain */
  relayers: string[];
}
export interface MsgUpdateQualifiedRelayersRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest';
  value: Uint8Array;
}
/** Msg defines the MsgUpdateSender service. */
export interface MsgUpdateQualifiedRelayersRequestAmino {
  sender?: string;
  /** update senders who can send block headers to the side chain */
  relayers?: string[];
}
export interface MsgUpdateQualifiedRelayersRequestAminoMsg {
  type: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest';
  value: MsgUpdateQualifiedRelayersRequestAmino;
}
/** Msg defines the MsgUpdateSender service. */
export interface MsgUpdateQualifiedRelayersRequestSDKType {
  sender: string;
  relayers: string[];
}
/** MsgUpdateSenderResponse defines the Msg/UpdateSender response type. */
export interface MsgUpdateQualifiedRelayersResponse {}
export interface MsgUpdateQualifiedRelayersResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersResponse';
  value: Uint8Array;
}
/** MsgUpdateSenderResponse defines the Msg/UpdateSender response type. */
export interface MsgUpdateQualifiedRelayersResponseAmino {}
export interface MsgUpdateQualifiedRelayersResponseAminoMsg {
  type: '/side.btcbridge.MsgUpdateQualifiedRelayersResponse';
  value: MsgUpdateQualifiedRelayersResponseAmino;
}
/** MsgUpdateSenderResponse defines the Msg/UpdateSender response type. */
export interface MsgUpdateQualifiedRelayersResponseSDKType {}
/** MsgWithdrawBitcoinRequest defines the Msg/WithdrawBitcoin request type. */
export interface MsgWithdrawBitcoinRequest {
  sender: string;
  /** withdraw amount in satoshi, etc: 100000000sat = 1btc */
  amount: string;
  /** fee rate in sats/vB */
  feeRate: string;
}
export interface MsgWithdrawBitcoinRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest';
  value: Uint8Array;
}
/** MsgWithdrawBitcoinRequest defines the Msg/WithdrawBitcoin request type. */
export interface MsgWithdrawBitcoinRequestAmino {
  sender?: string;
  /** withdraw amount in satoshi, etc: 100000000sat = 1btc */
  amount?: string;
  /** fee rate in sats/vB */
  fee_rate?: string;
}
export interface MsgWithdrawBitcoinRequestAminoMsg {
  type: '/side.btcbridge.MsgWithdrawBitcoinRequest';
  value: MsgWithdrawBitcoinRequestAmino;
}
/** MsgWithdrawBitcoinRequest defines the Msg/WithdrawBitcoin request type. */
export interface MsgWithdrawBitcoinRequestSDKType {
  sender: string;
  amount: string;
  fee_rate: string;
}
/** MsgWithdrawBitcoinResponse defines the Msg/WithdrawBitcoin response type. */
export interface MsgWithdrawBitcoinResponse {}
export interface MsgWithdrawBitcoinResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgWithdrawBitcoinResponse';
  value: Uint8Array;
}
/** MsgWithdrawBitcoinResponse defines the Msg/WithdrawBitcoin response type. */
export interface MsgWithdrawBitcoinResponseAmino {}
export interface MsgWithdrawBitcoinResponseAminoMsg {
  type: '/side.btcbridge.MsgWithdrawBitcoinResponse';
  value: MsgWithdrawBitcoinResponseAmino;
}
/** MsgWithdrawBitcoinResponse defines the Msg/WithdrawBitcoin response type. */
export interface MsgWithdrawBitcoinResponseSDKType {}
/** MsgSubmitWithdrawSignaturesRequest defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignaturesRequest {
  sender: string;
  txid: string;
  psbt: string;
}
export interface MsgSubmitWithdrawSignaturesRequestProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest';
  value: Uint8Array;
}
/** MsgSubmitWithdrawSignaturesRequest defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignaturesRequestAmino {
  sender?: string;
  txid?: string;
  psbt?: string;
}
export interface MsgSubmitWithdrawSignaturesRequestAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest';
  value: MsgSubmitWithdrawSignaturesRequestAmino;
}
/** MsgSubmitWithdrawSignaturesRequest defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignaturesRequestSDKType {
  sender: string;
  txid: string;
  psbt: string;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponse {}
export interface MsgSubmitWithdrawSignaturesResponseProtoMsg {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesResponse';
  value: Uint8Array;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponseAmino {}
export interface MsgSubmitWithdrawSignaturesResponseAminoMsg {
  type: '/side.btcbridge.MsgSubmitWithdrawSignaturesResponse';
  value: MsgSubmitWithdrawSignaturesResponseAmino;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponseSDKType {}
function createBaseMsgSubmitWithdrawStatusRequest(): MsgSubmitWithdrawStatusRequest {
  return {
    sender: '',
    txid: '',
    status: 0
  };
}
export const MsgSubmitWithdrawStatusRequest = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
  encode(message: MsgSubmitWithdrawStatusRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.txid !== '') {
      writer.uint32(18).string(message.txid);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawStatusRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.txid = reader.string();
          break;
        case 3:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitWithdrawStatusRequest>): MsgSubmitWithdrawStatusRequest {
    const message = createBaseMsgSubmitWithdrawStatusRequest();
    message.sender = object.sender ?? '';
    message.txid = object.txid ?? '';
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: MsgSubmitWithdrawStatusRequestAmino): MsgSubmitWithdrawStatusRequest {
    const message = createBaseMsgSubmitWithdrawStatusRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: MsgSubmitWithdrawStatusRequest): MsgSubmitWithdrawStatusRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    obj.txid = message.txid === '' ? undefined : message.txid;
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawStatusRequestAminoMsg): MsgSubmitWithdrawStatusRequest {
    return MsgSubmitWithdrawStatusRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawStatusRequestProtoMsg): MsgSubmitWithdrawStatusRequest {
    return MsgSubmitWithdrawStatusRequest.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawStatusRequest): Uint8Array {
    return MsgSubmitWithdrawStatusRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawStatusRequest): MsgSubmitWithdrawStatusRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
      value: MsgSubmitWithdrawStatusRequest.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawStatusResponse(): MsgSubmitWithdrawStatusResponse {
  return {};
}
export const MsgSubmitWithdrawStatusResponse = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusResponse',
  encode(_: MsgSubmitWithdrawStatusResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawStatusResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitWithdrawStatusResponse>): MsgSubmitWithdrawStatusResponse {
    const message = createBaseMsgSubmitWithdrawStatusResponse();
    return message;
  },
  fromAmino(_: MsgSubmitWithdrawStatusResponseAmino): MsgSubmitWithdrawStatusResponse {
    const message = createBaseMsgSubmitWithdrawStatusResponse();
    return message;
  },
  toAmino(_: MsgSubmitWithdrawStatusResponse): MsgSubmitWithdrawStatusResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawStatusResponseAminoMsg): MsgSubmitWithdrawStatusResponse {
    return MsgSubmitWithdrawStatusResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawStatusResponseProtoMsg): MsgSubmitWithdrawStatusResponse {
    return MsgSubmitWithdrawStatusResponse.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawStatusResponse): Uint8Array {
    return MsgSubmitWithdrawStatusResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawStatusResponse): MsgSubmitWithdrawStatusResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusResponse',
      value: MsgSubmitWithdrawStatusResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitBlockHeaderRequest(): MsgSubmitBlockHeaderRequest {
  return {
    sender: '',
    blockHeaders: []
  };
}
export const MsgSubmitBlockHeaderRequest = {
  typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
  encode(message: MsgSubmitBlockHeaderRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.blockHeaders) {
      BlockHeader.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitBlockHeaderRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBlockHeaderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.blockHeaders.push(BlockHeader.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitBlockHeaderRequest>): MsgSubmitBlockHeaderRequest {
    const message = createBaseMsgSubmitBlockHeaderRequest();
    message.sender = object.sender ?? '';
    message.blockHeaders = object.blockHeaders?.map((e) => BlockHeader.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgSubmitBlockHeaderRequestAmino): MsgSubmitBlockHeaderRequest {
    const message = createBaseMsgSubmitBlockHeaderRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.blockHeaders = object.block_headers?.map((e) => BlockHeader.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgSubmitBlockHeaderRequest): MsgSubmitBlockHeaderRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    if (message.blockHeaders) {
      obj.block_headers = message.blockHeaders.map((e) => (e ? BlockHeader.toAmino(e) : undefined));
    } else {
      obj.block_headers = message.blockHeaders;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitBlockHeaderRequestAminoMsg): MsgSubmitBlockHeaderRequest {
    return MsgSubmitBlockHeaderRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitBlockHeaderRequestProtoMsg): MsgSubmitBlockHeaderRequest {
    return MsgSubmitBlockHeaderRequest.decode(message.value);
  },
  toProto(message: MsgSubmitBlockHeaderRequest): Uint8Array {
    return MsgSubmitBlockHeaderRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitBlockHeaderRequest): MsgSubmitBlockHeaderRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
      value: MsgSubmitBlockHeaderRequest.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitBlockHeadersResponse(): MsgSubmitBlockHeadersResponse {
  return {};
}
export const MsgSubmitBlockHeadersResponse = {
  typeUrl: '/side.btcbridge.MsgSubmitBlockHeadersResponse',
  encode(_: MsgSubmitBlockHeadersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitBlockHeadersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBlockHeadersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitBlockHeadersResponse>): MsgSubmitBlockHeadersResponse {
    const message = createBaseMsgSubmitBlockHeadersResponse();
    return message;
  },
  fromAmino(_: MsgSubmitBlockHeadersResponseAmino): MsgSubmitBlockHeadersResponse {
    const message = createBaseMsgSubmitBlockHeadersResponse();
    return message;
  },
  toAmino(_: MsgSubmitBlockHeadersResponse): MsgSubmitBlockHeadersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitBlockHeadersResponseAminoMsg): MsgSubmitBlockHeadersResponse {
    return MsgSubmitBlockHeadersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitBlockHeadersResponseProtoMsg): MsgSubmitBlockHeadersResponse {
    return MsgSubmitBlockHeadersResponse.decode(message.value);
  },
  toProto(message: MsgSubmitBlockHeadersResponse): Uint8Array {
    return MsgSubmitBlockHeadersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitBlockHeadersResponse): MsgSubmitBlockHeadersResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitBlockHeadersResponse',
      value: MsgSubmitBlockHeadersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransactionRequest(): MsgSubmitDepositTransactionRequest {
  return {
    sender: '',
    blockhash: '',
    prevTxBytes: '',
    txBytes: '',
    proof: []
  };
}
export const MsgSubmitDepositTransactionRequest = {
  typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
  encode(message: MsgSubmitDepositTransactionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.blockhash !== '') {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.prevTxBytes !== '') {
      writer.uint32(26).string(message.prevTxBytes);
    }
    if (message.txBytes !== '') {
      writer.uint32(34).string(message.txBytes);
    }
    for (const v of message.proof) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitDepositTransactionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitDepositTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.blockhash = reader.string();
          break;
        case 3:
          message.prevTxBytes = reader.string();
          break;
        case 4:
          message.txBytes = reader.string();
          break;
        case 5:
          message.proof.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitDepositTransactionRequest>): MsgSubmitDepositTransactionRequest {
    const message = createBaseMsgSubmitDepositTransactionRequest();
    message.sender = object.sender ?? '';
    message.blockhash = object.blockhash ?? '';
    message.prevTxBytes = object.prevTxBytes ?? '';
    message.txBytes = object.txBytes ?? '';
    message.proof = object.proof?.map((e) => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitDepositTransactionRequestAmino): MsgSubmitDepositTransactionRequest {
    const message = createBaseMsgSubmitDepositTransactionRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.blockhash !== undefined && object.blockhash !== null) {
      message.blockhash = object.blockhash;
    }
    if (object.prev_tx_bytes !== undefined && object.prev_tx_bytes !== null) {
      message.prevTxBytes = object.prev_tx_bytes;
    }
    if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
      message.txBytes = object.tx_bytes;
    }
    message.proof = object.proof?.map((e) => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitDepositTransactionRequest): MsgSubmitDepositTransactionRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    obj.blockhash = message.blockhash === '' ? undefined : message.blockhash;
    obj.prev_tx_bytes = message.prevTxBytes === '' ? undefined : message.prevTxBytes;
    obj.tx_bytes = message.txBytes === '' ? undefined : message.txBytes;
    if (message.proof) {
      obj.proof = message.proof.map((e) => e);
    } else {
      obj.proof = message.proof;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitDepositTransactionRequestAminoMsg): MsgSubmitDepositTransactionRequest {
    return MsgSubmitDepositTransactionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitDepositTransactionRequestProtoMsg): MsgSubmitDepositTransactionRequest {
    return MsgSubmitDepositTransactionRequest.decode(message.value);
  },
  toProto(message: MsgSubmitDepositTransactionRequest): Uint8Array {
    return MsgSubmitDepositTransactionRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitDepositTransactionRequest): MsgSubmitDepositTransactionRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
      value: MsgSubmitDepositTransactionRequest.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransactionResponse(): MsgSubmitDepositTransactionResponse {
  return {};
}
export const MsgSubmitDepositTransactionResponse = {
  typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionResponse',
  encode(_: MsgSubmitDepositTransactionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitDepositTransactionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitDepositTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitDepositTransactionResponse>): MsgSubmitDepositTransactionResponse {
    const message = createBaseMsgSubmitDepositTransactionResponse();
    return message;
  },
  fromAmino(_: MsgSubmitDepositTransactionResponseAmino): MsgSubmitDepositTransactionResponse {
    const message = createBaseMsgSubmitDepositTransactionResponse();
    return message;
  },
  toAmino(_: MsgSubmitDepositTransactionResponse): MsgSubmitDepositTransactionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitDepositTransactionResponseAminoMsg): MsgSubmitDepositTransactionResponse {
    return MsgSubmitDepositTransactionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitDepositTransactionResponseProtoMsg): MsgSubmitDepositTransactionResponse {
    return MsgSubmitDepositTransactionResponse.decode(message.value);
  },
  toProto(message: MsgSubmitDepositTransactionResponse): Uint8Array {
    return MsgSubmitDepositTransactionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitDepositTransactionResponse): MsgSubmitDepositTransactionResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionResponse',
      value: MsgSubmitDepositTransactionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawTransactionRequest(): MsgSubmitWithdrawTransactionRequest {
  return {
    sender: '',
    blockhash: '',
    txBytes: '',
    proof: []
  };
}
export const MsgSubmitWithdrawTransactionRequest = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
  encode(message: MsgSubmitWithdrawTransactionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.blockhash !== '') {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.txBytes !== '') {
      writer.uint32(34).string(message.txBytes);
    }
    for (const v of message.proof) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawTransactionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawTransactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.blockhash = reader.string();
          break;
        case 4:
          message.txBytes = reader.string();
          break;
        case 5:
          message.proof.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitWithdrawTransactionRequest>): MsgSubmitWithdrawTransactionRequest {
    const message = createBaseMsgSubmitWithdrawTransactionRequest();
    message.sender = object.sender ?? '';
    message.blockhash = object.blockhash ?? '';
    message.txBytes = object.txBytes ?? '';
    message.proof = object.proof?.map((e) => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitWithdrawTransactionRequestAmino): MsgSubmitWithdrawTransactionRequest {
    const message = createBaseMsgSubmitWithdrawTransactionRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.blockhash !== undefined && object.blockhash !== null) {
      message.blockhash = object.blockhash;
    }
    if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
      message.txBytes = object.tx_bytes;
    }
    message.proof = object.proof?.map((e) => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitWithdrawTransactionRequest): MsgSubmitWithdrawTransactionRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    obj.blockhash = message.blockhash === '' ? undefined : message.blockhash;
    obj.tx_bytes = message.txBytes === '' ? undefined : message.txBytes;
    if (message.proof) {
      obj.proof = message.proof.map((e) => e);
    } else {
      obj.proof = message.proof;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawTransactionRequestAminoMsg): MsgSubmitWithdrawTransactionRequest {
    return MsgSubmitWithdrawTransactionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawTransactionRequestProtoMsg): MsgSubmitWithdrawTransactionRequest {
    return MsgSubmitWithdrawTransactionRequest.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawTransactionRequest): Uint8Array {
    return MsgSubmitWithdrawTransactionRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawTransactionRequest): MsgSubmitWithdrawTransactionRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
      value: MsgSubmitWithdrawTransactionRequest.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawTransactionResponse(): MsgSubmitWithdrawTransactionResponse {
  return {};
}
export const MsgSubmitWithdrawTransactionResponse = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionResponse',
  encode(_: MsgSubmitWithdrawTransactionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawTransactionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitWithdrawTransactionResponse>): MsgSubmitWithdrawTransactionResponse {
    const message = createBaseMsgSubmitWithdrawTransactionResponse();
    return message;
  },
  fromAmino(_: MsgSubmitWithdrawTransactionResponseAmino): MsgSubmitWithdrawTransactionResponse {
    const message = createBaseMsgSubmitWithdrawTransactionResponse();
    return message;
  },
  toAmino(_: MsgSubmitWithdrawTransactionResponse): MsgSubmitWithdrawTransactionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawTransactionResponseAminoMsg): MsgSubmitWithdrawTransactionResponse {
    return MsgSubmitWithdrawTransactionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawTransactionResponseProtoMsg): MsgSubmitWithdrawTransactionResponse {
    return MsgSubmitWithdrawTransactionResponse.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawTransactionResponse): Uint8Array {
    return MsgSubmitWithdrawTransactionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawTransactionResponse): MsgSubmitWithdrawTransactionResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionResponse',
      value: MsgSubmitWithdrawTransactionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateQualifiedRelayersRequest(): MsgUpdateQualifiedRelayersRequest {
  return {
    sender: '',
    relayers: []
  };
}
export const MsgUpdateQualifiedRelayersRequest = {
  typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
  encode(message: MsgUpdateQualifiedRelayersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.relayers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateQualifiedRelayersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateQualifiedRelayersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.relayers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateQualifiedRelayersRequest>): MsgUpdateQualifiedRelayersRequest {
    const message = createBaseMsgUpdateQualifiedRelayersRequest();
    message.sender = object.sender ?? '';
    message.relayers = object.relayers?.map((e) => e) || [];
    return message;
  },
  fromAmino(object: MsgUpdateQualifiedRelayersRequestAmino): MsgUpdateQualifiedRelayersRequest {
    const message = createBaseMsgUpdateQualifiedRelayersRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.relayers = object.relayers?.map((e) => e) || [];
    return message;
  },
  toAmino(message: MsgUpdateQualifiedRelayersRequest): MsgUpdateQualifiedRelayersRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    if (message.relayers) {
      obj.relayers = message.relayers.map((e) => e);
    } else {
      obj.relayers = message.relayers;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateQualifiedRelayersRequestAminoMsg): MsgUpdateQualifiedRelayersRequest {
    return MsgUpdateQualifiedRelayersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateQualifiedRelayersRequestProtoMsg): MsgUpdateQualifiedRelayersRequest {
    return MsgUpdateQualifiedRelayersRequest.decode(message.value);
  },
  toProto(message: MsgUpdateQualifiedRelayersRequest): Uint8Array {
    return MsgUpdateQualifiedRelayersRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateQualifiedRelayersRequest): MsgUpdateQualifiedRelayersRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
      value: MsgUpdateQualifiedRelayersRequest.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateQualifiedRelayersResponse(): MsgUpdateQualifiedRelayersResponse {
  return {};
}
export const MsgUpdateQualifiedRelayersResponse = {
  typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersResponse',
  encode(_: MsgUpdateQualifiedRelayersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateQualifiedRelayersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateQualifiedRelayersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateQualifiedRelayersResponse>): MsgUpdateQualifiedRelayersResponse {
    const message = createBaseMsgUpdateQualifiedRelayersResponse();
    return message;
  },
  fromAmino(_: MsgUpdateQualifiedRelayersResponseAmino): MsgUpdateQualifiedRelayersResponse {
    const message = createBaseMsgUpdateQualifiedRelayersResponse();
    return message;
  },
  toAmino(_: MsgUpdateQualifiedRelayersResponse): MsgUpdateQualifiedRelayersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateQualifiedRelayersResponseAminoMsg): MsgUpdateQualifiedRelayersResponse {
    return MsgUpdateQualifiedRelayersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateQualifiedRelayersResponseProtoMsg): MsgUpdateQualifiedRelayersResponse {
    return MsgUpdateQualifiedRelayersResponse.decode(message.value);
  },
  toProto(message: MsgUpdateQualifiedRelayersResponse): Uint8Array {
    return MsgUpdateQualifiedRelayersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateQualifiedRelayersResponse): MsgUpdateQualifiedRelayersResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersResponse',
      value: MsgUpdateQualifiedRelayersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawBitcoinRequest(): MsgWithdrawBitcoinRequest {
  return {
    sender: '',
    amount: '',
    feeRate: ''
  };
}
export const MsgWithdrawBitcoinRequest = {
  typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest',
  encode(message: MsgWithdrawBitcoinRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== '') {
      writer.uint32(18).string(message.amount);
    }
    if (message.feeRate !== '') {
      writer.uint32(26).string(message.feeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawBitcoinRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBitcoinRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.feeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawBitcoinRequest>): MsgWithdrawBitcoinRequest {
    const message = createBaseMsgWithdrawBitcoinRequest();
    message.sender = object.sender ?? '';
    message.amount = object.amount ?? '';
    message.feeRate = object.feeRate ?? '';
    return message;
  },
  fromAmino(object: MsgWithdrawBitcoinRequestAmino): MsgWithdrawBitcoinRequest {
    const message = createBaseMsgWithdrawBitcoinRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = object.fee_rate;
    }
    return message;
  },
  toAmino(message: MsgWithdrawBitcoinRequest): MsgWithdrawBitcoinRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    obj.amount = message.amount === '' ? undefined : message.amount;
    obj.fee_rate = message.feeRate === '' ? undefined : message.feeRate;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawBitcoinRequestAminoMsg): MsgWithdrawBitcoinRequest {
    return MsgWithdrawBitcoinRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawBitcoinRequestProtoMsg): MsgWithdrawBitcoinRequest {
    return MsgWithdrawBitcoinRequest.decode(message.value);
  },
  toProto(message: MsgWithdrawBitcoinRequest): Uint8Array {
    return MsgWithdrawBitcoinRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawBitcoinRequest): MsgWithdrawBitcoinRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest',
      value: MsgWithdrawBitcoinRequest.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawBitcoinResponse(): MsgWithdrawBitcoinResponse {
  return {};
}
export const MsgWithdrawBitcoinResponse = {
  typeUrl: '/side.btcbridge.MsgWithdrawBitcoinResponse',
  encode(_: MsgWithdrawBitcoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawBitcoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBitcoinResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgWithdrawBitcoinResponse>): MsgWithdrawBitcoinResponse {
    const message = createBaseMsgWithdrawBitcoinResponse();
    return message;
  },
  fromAmino(_: MsgWithdrawBitcoinResponseAmino): MsgWithdrawBitcoinResponse {
    const message = createBaseMsgWithdrawBitcoinResponse();
    return message;
  },
  toAmino(_: MsgWithdrawBitcoinResponse): MsgWithdrawBitcoinResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawBitcoinResponseAminoMsg): MsgWithdrawBitcoinResponse {
    return MsgWithdrawBitcoinResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawBitcoinResponseProtoMsg): MsgWithdrawBitcoinResponse {
    return MsgWithdrawBitcoinResponse.decode(message.value);
  },
  toProto(message: MsgWithdrawBitcoinResponse): Uint8Array {
    return MsgWithdrawBitcoinResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawBitcoinResponse): MsgWithdrawBitcoinResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgWithdrawBitcoinResponse',
      value: MsgWithdrawBitcoinResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawSignaturesRequest(): MsgSubmitWithdrawSignaturesRequest {
  return {
    sender: '',
    txid: '',
    psbt: ''
  };
}
export const MsgSubmitWithdrawSignaturesRequest = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
  encode(message: MsgSubmitWithdrawSignaturesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender);
    }
    if (message.txid !== '') {
      writer.uint32(18).string(message.txid);
    }
    if (message.psbt !== '') {
      writer.uint32(26).string(message.psbt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawSignaturesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawSignaturesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.txid = reader.string();
          break;
        case 3:
          message.psbt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitWithdrawSignaturesRequest>): MsgSubmitWithdrawSignaturesRequest {
    const message = createBaseMsgSubmitWithdrawSignaturesRequest();
    message.sender = object.sender ?? '';
    message.txid = object.txid ?? '';
    message.psbt = object.psbt ?? '';
    return message;
  },
  fromAmino(object: MsgSubmitWithdrawSignaturesRequestAmino): MsgSubmitWithdrawSignaturesRequest {
    const message = createBaseMsgSubmitWithdrawSignaturesRequest();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.txid !== undefined && object.txid !== null) {
      message.txid = object.txid;
    }
    if (object.psbt !== undefined && object.psbt !== null) {
      message.psbt = object.psbt;
    }
    return message;
  },
  toAmino(message: MsgSubmitWithdrawSignaturesRequest): MsgSubmitWithdrawSignaturesRequestAmino {
    const obj: any = {};
    obj.sender = message.sender === '' ? undefined : message.sender;
    obj.txid = message.txid === '' ? undefined : message.txid;
    obj.psbt = message.psbt === '' ? undefined : message.psbt;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawSignaturesRequestAminoMsg): MsgSubmitWithdrawSignaturesRequest {
    return MsgSubmitWithdrawSignaturesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawSignaturesRequestProtoMsg): MsgSubmitWithdrawSignaturesRequest {
    return MsgSubmitWithdrawSignaturesRequest.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawSignaturesRequest): Uint8Array {
    return MsgSubmitWithdrawSignaturesRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawSignaturesRequest): MsgSubmitWithdrawSignaturesRequestProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
      value: MsgSubmitWithdrawSignaturesRequest.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawSignaturesResponse(): MsgSubmitWithdrawSignaturesResponse {
  return {};
}
export const MsgSubmitWithdrawSignaturesResponse = {
  typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesResponse',
  encode(_: MsgSubmitWithdrawSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawSignaturesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitWithdrawSignaturesResponse>): MsgSubmitWithdrawSignaturesResponse {
    const message = createBaseMsgSubmitWithdrawSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitWithdrawSignaturesResponseAmino): MsgSubmitWithdrawSignaturesResponse {
    const message = createBaseMsgSubmitWithdrawSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitWithdrawSignaturesResponse): MsgSubmitWithdrawSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawSignaturesResponseAminoMsg): MsgSubmitWithdrawSignaturesResponse {
    return MsgSubmitWithdrawSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawSignaturesResponseProtoMsg): MsgSubmitWithdrawSignaturesResponse {
    return MsgSubmitWithdrawSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawSignaturesResponse): Uint8Array {
    return MsgSubmitWithdrawSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawSignaturesResponse): MsgSubmitWithdrawSignaturesResponseProtoMsg {
    return {
      typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesResponse',
      value: MsgSubmitWithdrawSignaturesResponse.encode(message).finish()
    };
  }
};
