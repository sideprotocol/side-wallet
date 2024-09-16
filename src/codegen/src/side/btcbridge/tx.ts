//@ts-nocheck
import { BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, DKGParticipant, DKGParticipantAmino, DKGParticipantSDKType } from "./btcbridge";
import { AssetType, Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
/** MsgSubmitBlockHeaders defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeaders {
  sender: string;
  blockHeaders: BlockHeader[];
}
export interface MsgSubmitBlockHeadersProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders";
  value: Uint8Array;
}
/** MsgSubmitBlockHeaders defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeadersAmino {
  sender?: string;
  block_headers?: BlockHeaderAmino[];
}
export interface MsgSubmitBlockHeadersAminoMsg {
  type: "/side.btcbridge.MsgSubmitBlockHeaders";
  value: MsgSubmitBlockHeadersAmino;
}
/** MsgSubmitBlockHeaders defines the Msg/SubmitBlockHeaders request type. */
export interface MsgSubmitBlockHeadersSDKType {
  sender: string;
  block_headers: BlockHeaderSDKType[];
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponse {}
export interface MsgSubmitBlockHeadersResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitBlockHeadersResponse";
  value: Uint8Array;
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponseAmino {}
export interface MsgSubmitBlockHeadersResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitBlockHeadersResponse";
  value: MsgSubmitBlockHeadersResponseAmino;
}
/** MsgSubmitBlockHeadersResponse defines the Msg/SubmitBlockHeaders response type. */
export interface MsgSubmitBlockHeadersResponseSDKType {}
/** MsgUpdateNonBtcRelayers defines the Msg/UpdateNonBtcRelayers request type. */
export interface MsgUpdateNonBtcRelayers {
  sender: string;
  relayers: string[];
}
export interface MsgUpdateNonBtcRelayersProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers";
  value: Uint8Array;
}
/** MsgUpdateNonBtcRelayers defines the Msg/UpdateNonBtcRelayers request type. */
export interface MsgUpdateNonBtcRelayersAmino {
  sender?: string;
  relayers?: string[];
}
export interface MsgUpdateNonBtcRelayersAminoMsg {
  type: "/side.btcbridge.MsgUpdateNonBtcRelayers";
  value: MsgUpdateNonBtcRelayersAmino;
}
/** MsgUpdateNonBtcRelayers defines the Msg/UpdateNonBtcRelayers request type. */
export interface MsgUpdateNonBtcRelayersSDKType {
  sender: string;
  relayers: string[];
}
/** MsgUpdateNonBtcRelayersResponse defines the Msg/UpdateNonBtcRelayers response type. */
export interface MsgUpdateNonBtcRelayersResponse {}
export interface MsgUpdateNonBtcRelayersResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayersResponse";
  value: Uint8Array;
}
/** MsgUpdateNonBtcRelayersResponse defines the Msg/UpdateNonBtcRelayers response type. */
export interface MsgUpdateNonBtcRelayersResponseAmino {}
export interface MsgUpdateNonBtcRelayersResponseAminoMsg {
  type: "/side.btcbridge.MsgUpdateNonBtcRelayersResponse";
  value: MsgUpdateNonBtcRelayersResponseAmino;
}
/** MsgUpdateNonBtcRelayersResponse defines the Msg/UpdateNonBtcRelayers response type. */
export interface MsgUpdateNonBtcRelayersResponseSDKType {}
/** MsgSubmitDepositTransaction defines the Msg/SubmitDepositTransaction request type. */
export interface MsgSubmitDepositTransaction {
  /** this is the relayer address who submits the bitcoin transaction to the side chain */
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
export interface MsgSubmitDepositTransactionProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction";
  value: Uint8Array;
}
/** MsgSubmitDepositTransaction defines the Msg/SubmitDepositTransaction request type. */
export interface MsgSubmitDepositTransactionAmino {
  /** this is the relayer address who submits the bitcoin transaction to the side chain */
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
export interface MsgSubmitDepositTransactionAminoMsg {
  type: "/side.btcbridge.MsgSubmitDepositTransaction";
  value: MsgSubmitDepositTransactionAmino;
}
/** MsgSubmitDepositTransaction defines the Msg/SubmitDepositTransaction request type. */
export interface MsgSubmitDepositTransactionSDKType {
  sender: string;
  blockhash: string;
  prev_tx_bytes: string;
  tx_bytes: string;
  proof: string[];
}
/** MsgSubmitDepositTransactionResponse defines the Msg/SubmitDepositTransaction response type. */
export interface MsgSubmitDepositTransactionResponse {}
export interface MsgSubmitDepositTransactionResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitDepositTransactionResponse";
  value: Uint8Array;
}
/** MsgSubmitDepositTransactionResponse defines the Msg/SubmitDepositTransaction response type. */
export interface MsgSubmitDepositTransactionResponseAmino {}
export interface MsgSubmitDepositTransactionResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitDepositTransactionResponse";
  value: MsgSubmitDepositTransactionResponseAmino;
}
/** MsgSubmitDepositTransactionResponse defines the Msg/SubmitDepositTransaction response type. */
export interface MsgSubmitDepositTransactionResponseSDKType {}
/** MsgSubmitWithdrawTransaction defines the Msg/SubmitWithdrawTransaction request type. */
export interface MsgSubmitWithdrawTransaction {
  /** this is the relayer address who submits the bitcoin transaction to the side chain */
  sender: string;
  blockhash: string;
  /** the tx bytes in base64 format */
  txBytes: string;
  proof: string[];
}
export interface MsgSubmitWithdrawTransactionProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction";
  value: Uint8Array;
}
/** MsgSubmitWithdrawTransaction defines the Msg/SubmitWithdrawTransaction request type. */
export interface MsgSubmitWithdrawTransactionAmino {
  /** this is the relayer address who submits the bitcoin transaction to the side chain */
  sender?: string;
  blockhash?: string;
  /** the tx bytes in base64 format */
  tx_bytes?: string;
  proof?: string[];
}
export interface MsgSubmitWithdrawTransactionAminoMsg {
  type: "/side.btcbridge.MsgSubmitWithdrawTransaction";
  value: MsgSubmitWithdrawTransactionAmino;
}
/** MsgSubmitWithdrawTransaction defines the Msg/SubmitWithdrawTransaction request type. */
export interface MsgSubmitWithdrawTransactionSDKType {
  sender: string;
  blockhash: string;
  tx_bytes: string;
  proof: string[];
}
/** MsgSubmitWithdrawTransactionResponse defines the Msg/SubmitWithdrawTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponse {}
export interface MsgSubmitWithdrawTransactionResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransactionResponse";
  value: Uint8Array;
}
/** MsgSubmitWithdrawTransactionResponse defines the Msg/SubmitWithdrawTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponseAmino {}
export interface MsgSubmitWithdrawTransactionResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitWithdrawTransactionResponse";
  value: MsgSubmitWithdrawTransactionResponseAmino;
}
/** MsgSubmitWithdrawTransactionResponse defines the Msg/SubmitWithdrawTransaction response type. */
export interface MsgSubmitWithdrawTransactionResponseSDKType {}
/** MsgWithdrawToBitcoin defines the Msg/WithdrawToBitcoin request type. */
export interface MsgWithdrawToBitcoin {
  sender: string;
  /** withdraw amount in satoshi, etc: 100000000sat = 1btc */
  amount: string;
  /** fee rate in sats/vB */
  feeRate: string;
}
export interface MsgWithdrawToBitcoinProtoMsg {
  typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin";
  value: Uint8Array;
}
/** MsgWithdrawToBitcoin defines the Msg/WithdrawToBitcoin request type. */
export interface MsgWithdrawToBitcoinAmino {
  sender?: string;
  /** withdraw amount in satoshi, etc: 100000000sat = 1btc */
  amount?: string;
  /** fee rate in sats/vB */
  fee_rate?: string;
}
export interface MsgWithdrawToBitcoinAminoMsg {
  type: "/side.btcbridge.MsgWithdrawToBitcoin";
  value: MsgWithdrawToBitcoinAmino;
}
/** MsgWithdrawToBitcoin defines the Msg/WithdrawToBitcoin request type. */
export interface MsgWithdrawToBitcoinSDKType {
  sender: string;
  amount: string;
  fee_rate: string;
}
/** MsgWithdrawToBitcoinResponse defines the Msg/WithdrawToBitcoin response type. */
export interface MsgWithdrawToBitcoinResponse {}
export interface MsgWithdrawToBitcoinResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgWithdrawToBitcoinResponse";
  value: Uint8Array;
}
/** MsgWithdrawToBitcoinResponse defines the Msg/WithdrawToBitcoin response type. */
export interface MsgWithdrawToBitcoinResponseAmino {}
export interface MsgWithdrawToBitcoinResponseAminoMsg {
  type: "/side.btcbridge.MsgWithdrawToBitcoinResponse";
  value: MsgWithdrawToBitcoinResponseAmino;
}
/** MsgWithdrawToBitcoinResponse defines the Msg/WithdrawToBitcoin response type. */
export interface MsgWithdrawToBitcoinResponseSDKType {}
/** MsgSubmitWithdrawSignatures defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignatures {
  sender: string;
  txid: string;
  psbt: string;
}
export interface MsgSubmitWithdrawSignaturesProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures";
  value: Uint8Array;
}
/** MsgSubmitWithdrawSignatures defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignaturesAmino {
  sender?: string;
  txid?: string;
  psbt?: string;
}
export interface MsgSubmitWithdrawSignaturesAminoMsg {
  type: "/side.btcbridge.MsgSubmitWithdrawSignatures";
  value: MsgSubmitWithdrawSignaturesAmino;
}
/** MsgSubmitWithdrawSignatures defines the Msg/SubmitWithdrawSignatures request type. */
export interface MsgSubmitWithdrawSignaturesSDKType {
  sender: string;
  txid: string;
  psbt: string;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponse {}
export interface MsgSubmitWithdrawSignaturesResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignaturesResponse";
  value: Uint8Array;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponseAmino {}
export interface MsgSubmitWithdrawSignaturesResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitWithdrawSignaturesResponse";
  value: MsgSubmitWithdrawSignaturesResponseAmino;
}
/** MsgSubmitWithdrawSignaturesResponse defines the Msg/SubmitWithdrawSignatures response type. */
export interface MsgSubmitWithdrawSignaturesResponseSDKType {}
/** MsgInitiateDKG is the Msg/InitiateDKG request type. */
export interface MsgInitiateDKG {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** expected participant set */
  participants: DKGParticipant[];
  /** threshold required to perform DKG */
  threshold: number;
  /** asset types of vaults to be generated */
  vaultTypes: AssetType[];
}
export interface MsgInitiateDKGProtoMsg {
  typeUrl: "/side.btcbridge.MsgInitiateDKG";
  value: Uint8Array;
}
/** MsgInitiateDKG is the Msg/InitiateDKG request type. */
export interface MsgInitiateDKGAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** expected participant set */
  participants?: DKGParticipantAmino[];
  /** threshold required to perform DKG */
  threshold?: number;
  /** asset types of vaults to be generated */
  vault_types?: AssetType[];
}
export interface MsgInitiateDKGAminoMsg {
  type: "/side.btcbridge.MsgInitiateDKG";
  value: MsgInitiateDKGAmino;
}
/** MsgInitiateDKG is the Msg/InitiateDKG request type. */
export interface MsgInitiateDKGSDKType {
  authority: string;
  participants: DKGParticipantSDKType[];
  threshold: number;
  vault_types: AssetType[];
}
/** MsgInitiateDKGResponse defines the Msg/InitiateDKG response type. */
export interface MsgInitiateDKGResponse {}
export interface MsgInitiateDKGResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgInitiateDKGResponse";
  value: Uint8Array;
}
/** MsgInitiateDKGResponse defines the Msg/InitiateDKG response type. */
export interface MsgInitiateDKGResponseAmino {}
export interface MsgInitiateDKGResponseAminoMsg {
  type: "/side.btcbridge.MsgInitiateDKGResponse";
  value: MsgInitiateDKGResponseAmino;
}
/** MsgInitiateDKGResponse defines the Msg/InitiateDKG response type. */
export interface MsgInitiateDKGResponseSDKType {}
/** MsgCompleteDKG is the Msg/CompleteDKG request type. */
export interface MsgCompleteDKG {
  /** the sender */
  sender: string;
  /** DKG request id */
  id: bigint;
  /** new vaults generated by DKG */
  vaults: string[];
  /** consensus address of the corresponding validator */
  consensusAddress: string;
  /** hex encoded validator signature */
  signature: string;
}
export interface MsgCompleteDKGProtoMsg {
  typeUrl: "/side.btcbridge.MsgCompleteDKG";
  value: Uint8Array;
}
/** MsgCompleteDKG is the Msg/CompleteDKG request type. */
export interface MsgCompleteDKGAmino {
  /** the sender */
  sender?: string;
  /** DKG request id */
  id?: string;
  /** new vaults generated by DKG */
  vaults?: string[];
  /** consensus address of the corresponding validator */
  consensus_address?: string;
  /** hex encoded validator signature */
  signature?: string;
}
export interface MsgCompleteDKGAminoMsg {
  type: "/side.btcbridge.MsgCompleteDKG";
  value: MsgCompleteDKGAmino;
}
/** MsgCompleteDKG is the Msg/CompleteDKG request type. */
export interface MsgCompleteDKGSDKType {
  sender: string;
  id: bigint;
  vaults: string[];
  consensus_address: string;
  signature: string;
}
/** MsgCompleteDKGResponse defines the Msg/CompleteDKG response type. */
export interface MsgCompleteDKGResponse {}
export interface MsgCompleteDKGResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgCompleteDKGResponse";
  value: Uint8Array;
}
/** MsgCompleteDKGResponse defines the Msg/CompleteDKG response type. */
export interface MsgCompleteDKGResponseAmino {}
export interface MsgCompleteDKGResponseAminoMsg {
  type: "/side.btcbridge.MsgCompleteDKGResponse";
  value: MsgCompleteDKGResponseAmino;
}
/** MsgCompleteDKGResponse defines the Msg/CompleteDKG response type. */
export interface MsgCompleteDKGResponseSDKType {}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/btcbridge parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /**
   * params defines the x/btcbridge parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/side.btcbridge.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/side.btcbridge.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgSubmitBlockHeaders(): MsgSubmitBlockHeaders {
  return {
    sender: "",
    blockHeaders: []
  };
}
export const MsgSubmitBlockHeaders = {
  typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders",
  encode(message: MsgSubmitBlockHeaders, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.blockHeaders) {
      BlockHeader.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitBlockHeaders {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBlockHeaders();
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
  fromPartial(object: Partial<MsgSubmitBlockHeaders>): MsgSubmitBlockHeaders {
    const message = createBaseMsgSubmitBlockHeaders();
    message.sender = object.sender ?? "";
    message.blockHeaders = object.blockHeaders?.map(e => BlockHeader.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgSubmitBlockHeadersAmino): MsgSubmitBlockHeaders {
    const message = createBaseMsgSubmitBlockHeaders();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.blockHeaders = object.block_headers?.map(e => BlockHeader.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgSubmitBlockHeaders): MsgSubmitBlockHeadersAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.blockHeaders) {
      obj.block_headers = message.blockHeaders.map(e => e ? BlockHeader.toAmino(e) : undefined);
    } else {
      obj.block_headers = message.blockHeaders;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitBlockHeadersAminoMsg): MsgSubmitBlockHeaders {
    return MsgSubmitBlockHeaders.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitBlockHeadersProtoMsg): MsgSubmitBlockHeaders {
    return MsgSubmitBlockHeaders.decode(message.value);
  },
  toProto(message: MsgSubmitBlockHeaders): Uint8Array {
    return MsgSubmitBlockHeaders.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitBlockHeaders): MsgSubmitBlockHeadersProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitBlockHeaders",
      value: MsgSubmitBlockHeaders.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitBlockHeadersResponse(): MsgSubmitBlockHeadersResponse {
  return {};
}
export const MsgSubmitBlockHeadersResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitBlockHeadersResponse",
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
      typeUrl: "/side.btcbridge.MsgSubmitBlockHeadersResponse",
      value: MsgSubmitBlockHeadersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateNonBtcRelayers(): MsgUpdateNonBtcRelayers {
  return {
    sender: "",
    relayers: []
  };
}
export const MsgUpdateNonBtcRelayers = {
  typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers",
  encode(message: MsgUpdateNonBtcRelayers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.relayers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateNonBtcRelayers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateNonBtcRelayers();
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
  fromPartial(object: Partial<MsgUpdateNonBtcRelayers>): MsgUpdateNonBtcRelayers {
    const message = createBaseMsgUpdateNonBtcRelayers();
    message.sender = object.sender ?? "";
    message.relayers = object.relayers?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgUpdateNonBtcRelayersAmino): MsgUpdateNonBtcRelayers {
    const message = createBaseMsgUpdateNonBtcRelayers();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.relayers = object.relayers?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgUpdateNonBtcRelayers): MsgUpdateNonBtcRelayersAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.relayers) {
      obj.relayers = message.relayers.map(e => e);
    } else {
      obj.relayers = message.relayers;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateNonBtcRelayersAminoMsg): MsgUpdateNonBtcRelayers {
    return MsgUpdateNonBtcRelayers.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateNonBtcRelayersProtoMsg): MsgUpdateNonBtcRelayers {
    return MsgUpdateNonBtcRelayers.decode(message.value);
  },
  toProto(message: MsgUpdateNonBtcRelayers): Uint8Array {
    return MsgUpdateNonBtcRelayers.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateNonBtcRelayers): MsgUpdateNonBtcRelayersProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayers",
      value: MsgUpdateNonBtcRelayers.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateNonBtcRelayersResponse(): MsgUpdateNonBtcRelayersResponse {
  return {};
}
export const MsgUpdateNonBtcRelayersResponse = {
  typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayersResponse",
  encode(_: MsgUpdateNonBtcRelayersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateNonBtcRelayersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateNonBtcRelayersResponse();
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
  fromPartial(_: Partial<MsgUpdateNonBtcRelayersResponse>): MsgUpdateNonBtcRelayersResponse {
    const message = createBaseMsgUpdateNonBtcRelayersResponse();
    return message;
  },
  fromAmino(_: MsgUpdateNonBtcRelayersResponseAmino): MsgUpdateNonBtcRelayersResponse {
    const message = createBaseMsgUpdateNonBtcRelayersResponse();
    return message;
  },
  toAmino(_: MsgUpdateNonBtcRelayersResponse): MsgUpdateNonBtcRelayersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateNonBtcRelayersResponseAminoMsg): MsgUpdateNonBtcRelayersResponse {
    return MsgUpdateNonBtcRelayersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateNonBtcRelayersResponseProtoMsg): MsgUpdateNonBtcRelayersResponse {
    return MsgUpdateNonBtcRelayersResponse.decode(message.value);
  },
  toProto(message: MsgUpdateNonBtcRelayersResponse): Uint8Array {
    return MsgUpdateNonBtcRelayersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateNonBtcRelayersResponse): MsgUpdateNonBtcRelayersResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateNonBtcRelayersResponse",
      value: MsgUpdateNonBtcRelayersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransaction(): MsgSubmitDepositTransaction {
  return {
    sender: "",
    blockhash: "",
    prevTxBytes: "",
    txBytes: "",
    proof: []
  };
}
export const MsgSubmitDepositTransaction = {
  typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction",
  encode(message: MsgSubmitDepositTransaction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.prevTxBytes !== "") {
      writer.uint32(26).string(message.prevTxBytes);
    }
    if (message.txBytes !== "") {
      writer.uint32(34).string(message.txBytes);
    }
    for (const v of message.proof) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitDepositTransaction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitDepositTransaction();
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
  fromPartial(object: Partial<MsgSubmitDepositTransaction>): MsgSubmitDepositTransaction {
    const message = createBaseMsgSubmitDepositTransaction();
    message.sender = object.sender ?? "";
    message.blockhash = object.blockhash ?? "";
    message.prevTxBytes = object.prevTxBytes ?? "";
    message.txBytes = object.txBytes ?? "";
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitDepositTransactionAmino): MsgSubmitDepositTransaction {
    const message = createBaseMsgSubmitDepositTransaction();
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
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitDepositTransaction): MsgSubmitDepositTransactionAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.blockhash = message.blockhash === "" ? undefined : message.blockhash;
    obj.prev_tx_bytes = message.prevTxBytes === "" ? undefined : message.prevTxBytes;
    obj.tx_bytes = message.txBytes === "" ? undefined : message.txBytes;
    if (message.proof) {
      obj.proof = message.proof.map(e => e);
    } else {
      obj.proof = message.proof;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitDepositTransactionAminoMsg): MsgSubmitDepositTransaction {
    return MsgSubmitDepositTransaction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitDepositTransactionProtoMsg): MsgSubmitDepositTransaction {
    return MsgSubmitDepositTransaction.decode(message.value);
  },
  toProto(message: MsgSubmitDepositTransaction): Uint8Array {
    return MsgSubmitDepositTransaction.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitDepositTransaction): MsgSubmitDepositTransactionProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitDepositTransaction",
      value: MsgSubmitDepositTransaction.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransactionResponse(): MsgSubmitDepositTransactionResponse {
  return {};
}
export const MsgSubmitDepositTransactionResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitDepositTransactionResponse",
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
      typeUrl: "/side.btcbridge.MsgSubmitDepositTransactionResponse",
      value: MsgSubmitDepositTransactionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawTransaction(): MsgSubmitWithdrawTransaction {
  return {
    sender: "",
    blockhash: "",
    txBytes: "",
    proof: []
  };
}
export const MsgSubmitWithdrawTransaction = {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction",
  encode(message: MsgSubmitWithdrawTransaction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.blockhash !== "") {
      writer.uint32(18).string(message.blockhash);
    }
    if (message.txBytes !== "") {
      writer.uint32(26).string(message.txBytes);
    }
    for (const v of message.proof) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawTransaction {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawTransaction();
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
          message.txBytes = reader.string();
          break;
        case 4:
          message.proof.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitWithdrawTransaction>): MsgSubmitWithdrawTransaction {
    const message = createBaseMsgSubmitWithdrawTransaction();
    message.sender = object.sender ?? "";
    message.blockhash = object.blockhash ?? "";
    message.txBytes = object.txBytes ?? "";
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitWithdrawTransactionAmino): MsgSubmitWithdrawTransaction {
    const message = createBaseMsgSubmitWithdrawTransaction();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.blockhash !== undefined && object.blockhash !== null) {
      message.blockhash = object.blockhash;
    }
    if (object.tx_bytes !== undefined && object.tx_bytes !== null) {
      message.txBytes = object.tx_bytes;
    }
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitWithdrawTransaction): MsgSubmitWithdrawTransactionAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.blockhash = message.blockhash === "" ? undefined : message.blockhash;
    obj.tx_bytes = message.txBytes === "" ? undefined : message.txBytes;
    if (message.proof) {
      obj.proof = message.proof.map(e => e);
    } else {
      obj.proof = message.proof;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawTransactionAminoMsg): MsgSubmitWithdrawTransaction {
    return MsgSubmitWithdrawTransaction.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawTransactionProtoMsg): MsgSubmitWithdrawTransaction {
    return MsgSubmitWithdrawTransaction.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawTransaction): Uint8Array {
    return MsgSubmitWithdrawTransaction.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawTransaction): MsgSubmitWithdrawTransactionProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransaction",
      value: MsgSubmitWithdrawTransaction.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawTransactionResponse(): MsgSubmitWithdrawTransactionResponse {
  return {};
}
export const MsgSubmitWithdrawTransactionResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransactionResponse",
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
      typeUrl: "/side.btcbridge.MsgSubmitWithdrawTransactionResponse",
      value: MsgSubmitWithdrawTransactionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawToBitcoin(): MsgWithdrawToBitcoin {
  return {
    sender: "",
    amount: "",
    feeRate: ""
  };
}
export const MsgWithdrawToBitcoin = {
  typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
  encode(message: MsgWithdrawToBitcoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.feeRate !== "") {
      writer.uint32(26).string(message.feeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawToBitcoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawToBitcoin();
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
  fromPartial(object: Partial<MsgWithdrawToBitcoin>): MsgWithdrawToBitcoin {
    const message = createBaseMsgWithdrawToBitcoin();
    message.sender = object.sender ?? "";
    message.amount = object.amount ?? "";
    message.feeRate = object.feeRate ?? "";
    return message;
  },
  fromAmino(object: MsgWithdrawToBitcoinAmino): MsgWithdrawToBitcoin {
    const message = createBaseMsgWithdrawToBitcoin();
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
  toAmino(message: MsgWithdrawToBitcoin): MsgWithdrawToBitcoinAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.fee_rate = message.feeRate === "" ? undefined : message.feeRate;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawToBitcoinAminoMsg): MsgWithdrawToBitcoin {
    return MsgWithdrawToBitcoin.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawToBitcoinProtoMsg): MsgWithdrawToBitcoin {
    return MsgWithdrawToBitcoin.decode(message.value);
  },
  toProto(message: MsgWithdrawToBitcoin): Uint8Array {
    return MsgWithdrawToBitcoin.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawToBitcoin): MsgWithdrawToBitcoinProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgWithdrawToBitcoin",
      value: MsgWithdrawToBitcoin.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawToBitcoinResponse(): MsgWithdrawToBitcoinResponse {
  return {};
}
export const MsgWithdrawToBitcoinResponse = {
  typeUrl: "/side.btcbridge.MsgWithdrawToBitcoinResponse",
  encode(_: MsgWithdrawToBitcoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgWithdrawToBitcoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawToBitcoinResponse();
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
  fromPartial(_: Partial<MsgWithdrawToBitcoinResponse>): MsgWithdrawToBitcoinResponse {
    const message = createBaseMsgWithdrawToBitcoinResponse();
    return message;
  },
  fromAmino(_: MsgWithdrawToBitcoinResponseAmino): MsgWithdrawToBitcoinResponse {
    const message = createBaseMsgWithdrawToBitcoinResponse();
    return message;
  },
  toAmino(_: MsgWithdrawToBitcoinResponse): MsgWithdrawToBitcoinResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawToBitcoinResponseAminoMsg): MsgWithdrawToBitcoinResponse {
    return MsgWithdrawToBitcoinResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawToBitcoinResponseProtoMsg): MsgWithdrawToBitcoinResponse {
    return MsgWithdrawToBitcoinResponse.decode(message.value);
  },
  toProto(message: MsgWithdrawToBitcoinResponse): Uint8Array {
    return MsgWithdrawToBitcoinResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawToBitcoinResponse): MsgWithdrawToBitcoinResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgWithdrawToBitcoinResponse",
      value: MsgWithdrawToBitcoinResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawSignatures(): MsgSubmitWithdrawSignatures {
  return {
    sender: "",
    txid: "",
    psbt: ""
  };
}
export const MsgSubmitWithdrawSignatures = {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures",
  encode(message: MsgSubmitWithdrawSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.txid !== "") {
      writer.uint32(18).string(message.txid);
    }
    if (message.psbt !== "") {
      writer.uint32(26).string(message.psbt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitWithdrawSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitWithdrawSignatures();
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
  fromPartial(object: Partial<MsgSubmitWithdrawSignatures>): MsgSubmitWithdrawSignatures {
    const message = createBaseMsgSubmitWithdrawSignatures();
    message.sender = object.sender ?? "";
    message.txid = object.txid ?? "";
    message.psbt = object.psbt ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitWithdrawSignaturesAmino): MsgSubmitWithdrawSignatures {
    const message = createBaseMsgSubmitWithdrawSignatures();
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
  toAmino(message: MsgSubmitWithdrawSignatures): MsgSubmitWithdrawSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.psbt = message.psbt === "" ? undefined : message.psbt;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitWithdrawSignaturesAminoMsg): MsgSubmitWithdrawSignatures {
    return MsgSubmitWithdrawSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitWithdrawSignaturesProtoMsg): MsgSubmitWithdrawSignatures {
    return MsgSubmitWithdrawSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitWithdrawSignatures): Uint8Array {
    return MsgSubmitWithdrawSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitWithdrawSignatures): MsgSubmitWithdrawSignaturesProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignatures",
      value: MsgSubmitWithdrawSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitWithdrawSignaturesResponse(): MsgSubmitWithdrawSignaturesResponse {
  return {};
}
export const MsgSubmitWithdrawSignaturesResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignaturesResponse",
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
      typeUrl: "/side.btcbridge.MsgSubmitWithdrawSignaturesResponse",
      value: MsgSubmitWithdrawSignaturesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgInitiateDKG(): MsgInitiateDKG {
  return {
    authority: "",
    participants: [],
    threshold: 0,
    vaultTypes: []
  };
}
export const MsgInitiateDKG = {
  typeUrl: "/side.btcbridge.MsgInitiateDKG",
  encode(message: MsgInitiateDKG, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.participants) {
      DKGParticipant.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.threshold !== 0) {
      writer.uint32(24).uint32(message.threshold);
    }
    writer.uint32(34).fork();
    for (const v of message.vaultTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgInitiateDKG {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitiateDKG();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.participants.push(DKGParticipant.decode(reader, reader.uint32()));
          break;
        case 3:
          message.threshold = reader.uint32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.vaultTypes.push(reader.int32() as any);
            }
          } else {
            message.vaultTypes.push(reader.int32() as any);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgInitiateDKG>): MsgInitiateDKG {
    const message = createBaseMsgInitiateDKG();
    message.authority = object.authority ?? "";
    message.participants = object.participants?.map(e => DKGParticipant.fromPartial(e)) || [];
    message.threshold = object.threshold ?? 0;
    message.vaultTypes = object.vaultTypes?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgInitiateDKGAmino): MsgInitiateDKG {
    const message = createBaseMsgInitiateDKG();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.participants = object.participants?.map(e => DKGParticipant.fromAmino(e)) || [];
    if (object.threshold !== undefined && object.threshold !== null) {
      message.threshold = object.threshold;
    }
    message.vaultTypes = object.vault_types?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgInitiateDKG): MsgInitiateDKGAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.participants) {
      obj.participants = message.participants.map(e => e ? DKGParticipant.toAmino(e) : undefined);
    } else {
      obj.participants = message.participants;
    }
    obj.threshold = message.threshold === 0 ? undefined : message.threshold;
    if (message.vaultTypes) {
      obj.vault_types = message.vaultTypes.map(e => e);
    } else {
      obj.vault_types = message.vaultTypes;
    }
    return obj;
  },
  fromAminoMsg(object: MsgInitiateDKGAminoMsg): MsgInitiateDKG {
    return MsgInitiateDKG.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgInitiateDKGProtoMsg): MsgInitiateDKG {
    return MsgInitiateDKG.decode(message.value);
  },
  toProto(message: MsgInitiateDKG): Uint8Array {
    return MsgInitiateDKG.encode(message).finish();
  },
  toProtoMsg(message: MsgInitiateDKG): MsgInitiateDKGProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgInitiateDKG",
      value: MsgInitiateDKG.encode(message).finish()
    };
  }
};
function createBaseMsgInitiateDKGResponse(): MsgInitiateDKGResponse {
  return {};
}
export const MsgInitiateDKGResponse = {
  typeUrl: "/side.btcbridge.MsgInitiateDKGResponse",
  encode(_: MsgInitiateDKGResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgInitiateDKGResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitiateDKGResponse();
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
  fromPartial(_: Partial<MsgInitiateDKGResponse>): MsgInitiateDKGResponse {
    const message = createBaseMsgInitiateDKGResponse();
    return message;
  },
  fromAmino(_: MsgInitiateDKGResponseAmino): MsgInitiateDKGResponse {
    const message = createBaseMsgInitiateDKGResponse();
    return message;
  },
  toAmino(_: MsgInitiateDKGResponse): MsgInitiateDKGResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgInitiateDKGResponseAminoMsg): MsgInitiateDKGResponse {
    return MsgInitiateDKGResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgInitiateDKGResponseProtoMsg): MsgInitiateDKGResponse {
    return MsgInitiateDKGResponse.decode(message.value);
  },
  toProto(message: MsgInitiateDKGResponse): Uint8Array {
    return MsgInitiateDKGResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgInitiateDKGResponse): MsgInitiateDKGResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgInitiateDKGResponse",
      value: MsgInitiateDKGResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCompleteDKG(): MsgCompleteDKG {
  return {
    sender: "",
    id: BigInt(0),
    vaults: [],
    consensusAddress: "",
    signature: ""
  };
}
export const MsgCompleteDKG = {
  typeUrl: "/side.btcbridge.MsgCompleteDKG",
  encode(message: MsgCompleteDKG, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(16).uint64(message.id);
    }
    for (const v of message.vaults) {
      writer.uint32(26).string(v!);
    }
    if (message.consensusAddress !== "") {
      writer.uint32(34).string(message.consensusAddress);
    }
    if (message.signature !== "") {
      writer.uint32(42).string(message.signature);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCompleteDKG {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCompleteDKG();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.id = reader.uint64();
          break;
        case 3:
          message.vaults.push(reader.string());
          break;
        case 4:
          message.consensusAddress = reader.string();
          break;
        case 5:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCompleteDKG>): MsgCompleteDKG {
    const message = createBaseMsgCompleteDKG();
    message.sender = object.sender ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.vaults = object.vaults?.map(e => e) || [];
    message.consensusAddress = object.consensusAddress ?? "";
    message.signature = object.signature ?? "";
    return message;
  },
  fromAmino(object: MsgCompleteDKGAmino): MsgCompleteDKG {
    const message = createBaseMsgCompleteDKG();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    message.vaults = object.vaults?.map(e => e) || [];
    if (object.consensus_address !== undefined && object.consensus_address !== null) {
      message.consensusAddress = object.consensus_address;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    }
    return message;
  },
  toAmino(message: MsgCompleteDKG): MsgCompleteDKGAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.vaults) {
      obj.vaults = message.vaults.map(e => e);
    } else {
      obj.vaults = message.vaults;
    }
    obj.consensus_address = message.consensusAddress === "" ? undefined : message.consensusAddress;
    obj.signature = message.signature === "" ? undefined : message.signature;
    return obj;
  },
  fromAminoMsg(object: MsgCompleteDKGAminoMsg): MsgCompleteDKG {
    return MsgCompleteDKG.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCompleteDKGProtoMsg): MsgCompleteDKG {
    return MsgCompleteDKG.decode(message.value);
  },
  toProto(message: MsgCompleteDKG): Uint8Array {
    return MsgCompleteDKG.encode(message).finish();
  },
  toProtoMsg(message: MsgCompleteDKG): MsgCompleteDKGProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgCompleteDKG",
      value: MsgCompleteDKG.encode(message).finish()
    };
  }
};
function createBaseMsgCompleteDKGResponse(): MsgCompleteDKGResponse {
  return {};
}
export const MsgCompleteDKGResponse = {
  typeUrl: "/side.btcbridge.MsgCompleteDKGResponse",
  encode(_: MsgCompleteDKGResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCompleteDKGResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCompleteDKGResponse();
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
  fromPartial(_: Partial<MsgCompleteDKGResponse>): MsgCompleteDKGResponse {
    const message = createBaseMsgCompleteDKGResponse();
    return message;
  },
  fromAmino(_: MsgCompleteDKGResponseAmino): MsgCompleteDKGResponse {
    const message = createBaseMsgCompleteDKGResponse();
    return message;
  },
  toAmino(_: MsgCompleteDKGResponse): MsgCompleteDKGResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCompleteDKGResponseAminoMsg): MsgCompleteDKGResponse {
    return MsgCompleteDKGResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCompleteDKGResponseProtoMsg): MsgCompleteDKGResponse {
    return MsgCompleteDKGResponse.decode(message.value);
  },
  toProto(message: MsgCompleteDKGResponse): Uint8Array {
    return MsgCompleteDKGResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCompleteDKGResponse): MsgCompleteDKGResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgCompleteDKGResponse",
      value: MsgCompleteDKGResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/side.btcbridge.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/side.btcbridge.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};