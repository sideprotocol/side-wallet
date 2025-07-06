//@ts-nocheck
import { PoolConfig, PoolConfigAmino, PoolConfigSDKType } from "./lending";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MsgCreatePool {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** pool id */
  id: string;
  /** pool config */
  config: PoolConfig;
}
export interface MsgCreatePoolProtoMsg {
  typeUrl: "/side.lending.MsgCreatePool";
  value: Uint8Array;
}
export interface MsgCreatePoolAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** pool id */
  id?: string;
  /** pool config */
  config?: PoolConfigAmino;
}
export interface MsgCreatePoolAminoMsg {
  type: "/side.lending.MsgCreatePool";
  value: MsgCreatePoolAmino;
}
export interface MsgCreatePoolSDKType {
  authority: string;
  id: string;
  config: PoolConfigSDKType;
}
export interface MsgCreatePoolResponse {}
export interface MsgCreatePoolResponseProtoMsg {
  typeUrl: "/side.lending.MsgCreatePoolResponse";
  value: Uint8Array;
}
export interface MsgCreatePoolResponseAmino {}
export interface MsgCreatePoolResponseAminoMsg {
  type: "/side.lending.MsgCreatePoolResponse";
  value: MsgCreatePoolResponseAmino;
}
export interface MsgCreatePoolResponseSDKType {}
export interface MsgUpdatePoolConfig {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** pool id */
  poolId: string;
  /** pool config */
  config: PoolConfig;
}
export interface MsgUpdatePoolConfigProtoMsg {
  typeUrl: "/side.lending.MsgUpdatePoolConfig";
  value: Uint8Array;
}
export interface MsgUpdatePoolConfigAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** pool id */
  pool_id?: string;
  /** pool config */
  config?: PoolConfigAmino;
}
export interface MsgUpdatePoolConfigAminoMsg {
  type: "/side.lending.MsgUpdatePoolConfig";
  value: MsgUpdatePoolConfigAmino;
}
export interface MsgUpdatePoolConfigSDKType {
  authority: string;
  pool_id: string;
  config: PoolConfigSDKType;
}
export interface MsgUpdatePoolConfigResponse {}
export interface MsgUpdatePoolConfigResponseProtoMsg {
  typeUrl: "/side.lending.MsgUpdatePoolConfigResponse";
  value: Uint8Array;
}
export interface MsgUpdatePoolConfigResponseAmino {}
export interface MsgUpdatePoolConfigResponseAminoMsg {
  type: "/side.lending.MsgUpdatePoolConfigResponse";
  value: MsgUpdatePoolConfigResponseAmino;
}
export interface MsgUpdatePoolConfigResponseSDKType {}
export interface MsgRepay {
  borrower: string;
  loanId: string;
}
export interface MsgRepayProtoMsg {
  typeUrl: "/side.lending.MsgRepay";
  value: Uint8Array;
}
export interface MsgRepayAmino {
  borrower?: string;
  loan_id?: string;
}
export interface MsgRepayAminoMsg {
  type: "/side.lending.MsgRepay";
  value: MsgRepayAmino;
}
export interface MsgRepaySDKType {
  borrower: string;
  loan_id: string;
}
export interface MsgRepayResponse {}
export interface MsgRepayResponseProtoMsg {
  typeUrl: "/side.lending.MsgRepayResponse";
  value: Uint8Array;
}
export interface MsgRepayResponseAmino {}
export interface MsgRepayResponseAminoMsg {
  type: "/side.lending.MsgRepayResponse";
  value: MsgRepayResponseAmino;
}
export interface MsgRepayResponseSDKType {}
export interface MsgAddLiquidity {
  lender: string;
  poolId: string;
  amount: Coin;
}
export interface MsgAddLiquidityProtoMsg {
  typeUrl: "/side.lending.MsgAddLiquidity";
  value: Uint8Array;
}
export interface MsgAddLiquidityAmino {
  lender?: string;
  pool_id?: string;
  amount?: CoinAmino;
}
export interface MsgAddLiquidityAminoMsg {
  type: "/side.lending.MsgAddLiquidity";
  value: MsgAddLiquidityAmino;
}
export interface MsgAddLiquiditySDKType {
  lender: string;
  pool_id: string;
  amount: CoinSDKType;
}
export interface MsgAddLiquidityResponse {}
export interface MsgAddLiquidityResponseProtoMsg {
  typeUrl: "/side.lending.MsgAddLiquidityResponse";
  value: Uint8Array;
}
export interface MsgAddLiquidityResponseAmino {}
export interface MsgAddLiquidityResponseAminoMsg {
  type: "/side.lending.MsgAddLiquidityResponse";
  value: MsgAddLiquidityResponseAmino;
}
export interface MsgAddLiquidityResponseSDKType {}
export interface MsgRemoveLiquidity {
  lender: string;
  ytokens: Coin;
}
export interface MsgRemoveLiquidityProtoMsg {
  typeUrl: "/side.lending.MsgRemoveLiquidity";
  value: Uint8Array;
}
export interface MsgRemoveLiquidityAmino {
  lender?: string;
  ytokens?: CoinAmino;
}
export interface MsgRemoveLiquidityAminoMsg {
  type: "/side.lending.MsgRemoveLiquidity";
  value: MsgRemoveLiquidityAmino;
}
export interface MsgRemoveLiquiditySDKType {
  lender: string;
  ytokens: CoinSDKType;
}
export interface MsgRemoveLiquidityResponse {}
export interface MsgRemoveLiquidityResponseProtoMsg {
  typeUrl: "/side.lending.MsgRemoveLiquidityResponse";
  value: Uint8Array;
}
export interface MsgRemoveLiquidityResponseAmino {}
export interface MsgRemoveLiquidityResponseAminoMsg {
  type: "/side.lending.MsgRemoveLiquidityResponse";
  value: MsgRemoveLiquidityResponseAmino;
}
export interface MsgRemoveLiquidityResponseSDKType {}
export interface MsgApply {
  borrower: string;
  borrowerPubkey: string;
  borrowerAuthPubkey: string;
  poolId: string;
  borrowAmount: Coin;
  maturity: bigint;
  dcmId: bigint;
  referrer: string;
}
export interface MsgApplyProtoMsg {
  typeUrl: "/side.lending.MsgApply";
  value: Uint8Array;
}
export interface MsgApplyAmino {
  borrower?: string;
  borrower_pubkey?: string;
  borrower_auth_pubkey?: string;
  pool_id?: string;
  borrow_amount?: CoinAmino;
  maturity?: string;
  dcm_id?: string;
  referrer?: string;
}
export interface MsgApplyAminoMsg {
  type: "/side.lending.MsgApply";
  value: MsgApplyAmino;
}
export interface MsgApplySDKType {
  borrower: string;
  borrower_pubkey: string;
  borrower_auth_pubkey: string;
  pool_id: string;
  borrow_amount: CoinSDKType;
  maturity: bigint;
  dcm_id: bigint;
  referrer: string;
}
export interface MsgApplyResponse {}
export interface MsgApplyResponseProtoMsg {
  typeUrl: "/side.lending.MsgApplyResponse";
  value: Uint8Array;
}
export interface MsgApplyResponseAmino {}
export interface MsgApplyResponseAminoMsg {
  type: "/side.lending.MsgApplyResponse";
  value: MsgApplyResponseAmino;
}
export interface MsgApplyResponseSDKType {}
export interface MsgSubmitCets {
  borrower: string;
  loanId: string;
  depositTxs: string[];
  liquidationCet: string;
  liquidationAdaptorSignatures: string[];
  defaultLiquidationAdaptorSignatures: string[];
  repaymentCet: string;
  repaymentSignatures: string[];
}
export interface MsgSubmitCetsProtoMsg {
  typeUrl: "/side.lending.MsgSubmitCets";
  value: Uint8Array;
}
export interface MsgSubmitCetsAmino {
  borrower?: string;
  loan_id?: string;
  deposit_txs?: string[];
  liquidation_cet?: string;
  liquidation_adaptor_signatures?: string[];
  default_liquidation_adaptor_signatures?: string[];
  repayment_cet?: string;
  repayment_signatures?: string[];
}
export interface MsgSubmitCetsAminoMsg {
  type: "/side.lending.MsgSubmitCets";
  value: MsgSubmitCetsAmino;
}
export interface MsgSubmitCetsSDKType {
  borrower: string;
  loan_id: string;
  deposit_txs: string[];
  liquidation_cet: string;
  liquidation_adaptor_signatures: string[];
  default_liquidation_adaptor_signatures: string[];
  repayment_cet: string;
  repayment_signatures: string[];
}
export interface MsgSubmitCetsResponse {}
export interface MsgSubmitCetsResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitCetsResponse";
  value: Uint8Array;
}
export interface MsgSubmitCetsResponseAmino {}
export interface MsgSubmitCetsResponseAminoMsg {
  type: "/side.lending.MsgSubmitCetsResponse";
  value: MsgSubmitCetsResponseAmino;
}
export interface MsgSubmitCetsResponseSDKType {}
export interface MsgSubmitDepositTransaction {
  relayer: string;
  vault: string;
  depositTx: string;
  blockHash: string;
  proof: string[];
}
export interface MsgSubmitDepositTransactionProtoMsg {
  typeUrl: "/side.lending.MsgSubmitDepositTransaction";
  value: Uint8Array;
}
export interface MsgSubmitDepositTransactionAmino {
  relayer?: string;
  vault?: string;
  deposit_tx?: string;
  block_hash?: string;
  proof?: string[];
}
export interface MsgSubmitDepositTransactionAminoMsg {
  type: "/side.lending.MsgSubmitDepositTransaction";
  value: MsgSubmitDepositTransactionAmino;
}
export interface MsgSubmitDepositTransactionSDKType {
  relayer: string;
  vault: string;
  deposit_tx: string;
  block_hash: string;
  proof: string[];
}
export interface MsgSubmitDepositTransactionResponse {}
export interface MsgSubmitDepositTransactionResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitDepositTransactionResponse";
  value: Uint8Array;
}
export interface MsgSubmitDepositTransactionResponseAmino {}
export interface MsgSubmitDepositTransactionResponseAminoMsg {
  type: "/side.lending.MsgSubmitDepositTransactionResponse";
  value: MsgSubmitDepositTransactionResponseAmino;
}
export interface MsgSubmitDepositTransactionResponseSDKType {}
export interface MsgRedeem {
  borrower: string;
  loanId: string;
  tx: string;
  signatures: string[];
}
export interface MsgRedeemProtoMsg {
  typeUrl: "/side.lending.MsgRedeem";
  value: Uint8Array;
}
export interface MsgRedeemAmino {
  borrower?: string;
  loan_id?: string;
  tx?: string;
  signatures?: string[];
}
export interface MsgRedeemAminoMsg {
  type: "/side.lending.MsgRedeem";
  value: MsgRedeemAmino;
}
export interface MsgRedeemSDKType {
  borrower: string;
  loan_id: string;
  tx: string;
  signatures: string[];
}
export interface MsgRedeemResponse {}
export interface MsgRedeemResponseProtoMsg {
  typeUrl: "/side.lending.MsgRedeemResponse";
  value: Uint8Array;
}
export interface MsgRedeemResponseAmino {}
export interface MsgRedeemResponseAminoMsg {
  type: "/side.lending.MsgRedeemResponse";
  value: MsgRedeemResponseAmino;
}
export interface MsgRedeemResponseSDKType {}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the x/dlc parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/side.lending.MsgUpdateParams";
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
   * params defines the x/dlc parameters to be updated.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/side.lending.MsgUpdateParams";
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
  typeUrl: "/side.lending.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/side.lending.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the Msg/UpdateParams response type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreatePool(): MsgCreatePool {
  return {
    authority: "",
    id: "",
    config: PoolConfig.fromPartial({})
  };
}
export const MsgCreatePool = {
  typeUrl: "/side.lending.MsgCreatePool",
  encode(message: MsgCreatePool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.config !== undefined) {
      PoolConfig.encode(message.config, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.config = PoolConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreatePool>): MsgCreatePool {
    const message = createBaseMsgCreatePool();
    message.authority = object.authority ?? "";
    message.id = object.id ?? "";
    message.config = object.config !== undefined && object.config !== null ? PoolConfig.fromPartial(object.config) : undefined;
    return message;
  },
  fromAmino(object: MsgCreatePoolAmino): MsgCreatePool {
    const message = createBaseMsgCreatePool();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = PoolConfig.fromAmino(object.config);
    }
    return message;
  },
  toAmino(message: MsgCreatePool): MsgCreatePoolAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.id = message.id === "" ? undefined : message.id;
    obj.config = message.config ? PoolConfig.toAmino(message.config) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreatePoolAminoMsg): MsgCreatePool {
    return MsgCreatePool.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreatePoolProtoMsg): MsgCreatePool {
    return MsgCreatePool.decode(message.value);
  },
  toProto(message: MsgCreatePool): Uint8Array {
    return MsgCreatePool.encode(message).finish();
  },
  toProtoMsg(message: MsgCreatePool): MsgCreatePoolProtoMsg {
    return {
      typeUrl: "/side.lending.MsgCreatePool",
      value: MsgCreatePool.encode(message).finish()
    };
  }
};
function createBaseMsgCreatePoolResponse(): MsgCreatePoolResponse {
  return {};
}
export const MsgCreatePoolResponse = {
  typeUrl: "/side.lending.MsgCreatePoolResponse",
  encode(_: MsgCreatePoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreatePoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePoolResponse();
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
  fromPartial(_: Partial<MsgCreatePoolResponse>): MsgCreatePoolResponse {
    const message = createBaseMsgCreatePoolResponse();
    return message;
  },
  fromAmino(_: MsgCreatePoolResponseAmino): MsgCreatePoolResponse {
    const message = createBaseMsgCreatePoolResponse();
    return message;
  },
  toAmino(_: MsgCreatePoolResponse): MsgCreatePoolResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreatePoolResponseAminoMsg): MsgCreatePoolResponse {
    return MsgCreatePoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreatePoolResponseProtoMsg): MsgCreatePoolResponse {
    return MsgCreatePoolResponse.decode(message.value);
  },
  toProto(message: MsgCreatePoolResponse): Uint8Array {
    return MsgCreatePoolResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreatePoolResponse): MsgCreatePoolResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgCreatePoolResponse",
      value: MsgCreatePoolResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePoolConfig(): MsgUpdatePoolConfig {
  return {
    authority: "",
    poolId: "",
    config: PoolConfig.fromPartial({})
  };
}
export const MsgUpdatePoolConfig = {
  typeUrl: "/side.lending.MsgUpdatePoolConfig",
  encode(message: MsgUpdatePoolConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.poolId !== "") {
      writer.uint32(18).string(message.poolId);
    }
    if (message.config !== undefined) {
      PoolConfig.encode(message.config, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePoolConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePoolConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.poolId = reader.string();
          break;
        case 3:
          message.config = PoolConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdatePoolConfig>): MsgUpdatePoolConfig {
    const message = createBaseMsgUpdatePoolConfig();
    message.authority = object.authority ?? "";
    message.poolId = object.poolId ?? "";
    message.config = object.config !== undefined && object.config !== null ? PoolConfig.fromPartial(object.config) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdatePoolConfigAmino): MsgUpdatePoolConfig {
    const message = createBaseMsgUpdatePoolConfig();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.config !== undefined && object.config !== null) {
      message.config = PoolConfig.fromAmino(object.config);
    }
    return message;
  },
  toAmino(message: MsgUpdatePoolConfig): MsgUpdatePoolConfigAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.config = message.config ? PoolConfig.toAmino(message.config) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePoolConfigAminoMsg): MsgUpdatePoolConfig {
    return MsgUpdatePoolConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePoolConfigProtoMsg): MsgUpdatePoolConfig {
    return MsgUpdatePoolConfig.decode(message.value);
  },
  toProto(message: MsgUpdatePoolConfig): Uint8Array {
    return MsgUpdatePoolConfig.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePoolConfig): MsgUpdatePoolConfigProtoMsg {
    return {
      typeUrl: "/side.lending.MsgUpdatePoolConfig",
      value: MsgUpdatePoolConfig.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePoolConfigResponse(): MsgUpdatePoolConfigResponse {
  return {};
}
export const MsgUpdatePoolConfigResponse = {
  typeUrl: "/side.lending.MsgUpdatePoolConfigResponse",
  encode(_: MsgUpdatePoolConfigResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdatePoolConfigResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePoolConfigResponse();
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
  fromPartial(_: Partial<MsgUpdatePoolConfigResponse>): MsgUpdatePoolConfigResponse {
    const message = createBaseMsgUpdatePoolConfigResponse();
    return message;
  },
  fromAmino(_: MsgUpdatePoolConfigResponseAmino): MsgUpdatePoolConfigResponse {
    const message = createBaseMsgUpdatePoolConfigResponse();
    return message;
  },
  toAmino(_: MsgUpdatePoolConfigResponse): MsgUpdatePoolConfigResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePoolConfigResponseAminoMsg): MsgUpdatePoolConfigResponse {
    return MsgUpdatePoolConfigResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePoolConfigResponseProtoMsg): MsgUpdatePoolConfigResponse {
    return MsgUpdatePoolConfigResponse.decode(message.value);
  },
  toProto(message: MsgUpdatePoolConfigResponse): Uint8Array {
    return MsgUpdatePoolConfigResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePoolConfigResponse): MsgUpdatePoolConfigResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgUpdatePoolConfigResponse",
      value: MsgUpdatePoolConfigResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRepay(): MsgRepay {
  return {
    borrower: "",
    loanId: ""
  };
}
export const MsgRepay = {
  typeUrl: "/side.lending.MsgRepay",
  encode(message: MsgRepay, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRepay {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRepay>): MsgRepay {
    const message = createBaseMsgRepay();
    message.borrower = object.borrower ?? "";
    message.loanId = object.loanId ?? "";
    return message;
  },
  fromAmino(object: MsgRepayAmino): MsgRepay {
    const message = createBaseMsgRepay();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    return message;
  },
  toAmino(message: MsgRepay): MsgRepayAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    return obj;
  },
  fromAminoMsg(object: MsgRepayAminoMsg): MsgRepay {
    return MsgRepay.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRepayProtoMsg): MsgRepay {
    return MsgRepay.decode(message.value);
  },
  toProto(message: MsgRepay): Uint8Array {
    return MsgRepay.encode(message).finish();
  },
  toProtoMsg(message: MsgRepay): MsgRepayProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRepay",
      value: MsgRepay.encode(message).finish()
    };
  }
};
function createBaseMsgRepayResponse(): MsgRepayResponse {
  return {};
}
export const MsgRepayResponse = {
  typeUrl: "/side.lending.MsgRepayResponse",
  encode(_: MsgRepayResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRepayResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayResponse();
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
  fromPartial(_: Partial<MsgRepayResponse>): MsgRepayResponse {
    const message = createBaseMsgRepayResponse();
    return message;
  },
  fromAmino(_: MsgRepayResponseAmino): MsgRepayResponse {
    const message = createBaseMsgRepayResponse();
    return message;
  },
  toAmino(_: MsgRepayResponse): MsgRepayResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRepayResponseAminoMsg): MsgRepayResponse {
    return MsgRepayResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRepayResponseProtoMsg): MsgRepayResponse {
    return MsgRepayResponse.decode(message.value);
  },
  toProto(message: MsgRepayResponse): Uint8Array {
    return MsgRepayResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRepayResponse): MsgRepayResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRepayResponse",
      value: MsgRepayResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddLiquidity(): MsgAddLiquidity {
  return {
    lender: "",
    poolId: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgAddLiquidity = {
  typeUrl: "/side.lending.MsgAddLiquidity",
  encode(message: MsgAddLiquidity, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lender !== "") {
      writer.uint32(10).string(message.lender);
    }
    if (message.poolId !== "") {
      writer.uint32(18).string(message.poolId);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddLiquidity {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lender = reader.string();
          break;
        case 2:
          message.poolId = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddLiquidity>): MsgAddLiquidity {
    const message = createBaseMsgAddLiquidity();
    message.lender = object.lender ?? "";
    message.poolId = object.poolId ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgAddLiquidityAmino): MsgAddLiquidity {
    const message = createBaseMsgAddLiquidity();
    if (object.lender !== undefined && object.lender !== null) {
      message.lender = object.lender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgAddLiquidity): MsgAddLiquidityAmino {
    const obj: any = {};
    obj.lender = message.lender === "" ? undefined : message.lender;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddLiquidityAminoMsg): MsgAddLiquidity {
    return MsgAddLiquidity.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddLiquidityProtoMsg): MsgAddLiquidity {
    return MsgAddLiquidity.decode(message.value);
  },
  toProto(message: MsgAddLiquidity): Uint8Array {
    return MsgAddLiquidity.encode(message).finish();
  },
  toProtoMsg(message: MsgAddLiquidity): MsgAddLiquidityProtoMsg {
    return {
      typeUrl: "/side.lending.MsgAddLiquidity",
      value: MsgAddLiquidity.encode(message).finish()
    };
  }
};
function createBaseMsgAddLiquidityResponse(): MsgAddLiquidityResponse {
  return {};
}
export const MsgAddLiquidityResponse = {
  typeUrl: "/side.lending.MsgAddLiquidityResponse",
  encode(_: MsgAddLiquidityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgAddLiquidityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddLiquidityResponse();
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
  fromPartial(_: Partial<MsgAddLiquidityResponse>): MsgAddLiquidityResponse {
    const message = createBaseMsgAddLiquidityResponse();
    return message;
  },
  fromAmino(_: MsgAddLiquidityResponseAmino): MsgAddLiquidityResponse {
    const message = createBaseMsgAddLiquidityResponse();
    return message;
  },
  toAmino(_: MsgAddLiquidityResponse): MsgAddLiquidityResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddLiquidityResponseAminoMsg): MsgAddLiquidityResponse {
    return MsgAddLiquidityResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddLiquidityResponseProtoMsg): MsgAddLiquidityResponse {
    return MsgAddLiquidityResponse.decode(message.value);
  },
  toProto(message: MsgAddLiquidityResponse): Uint8Array {
    return MsgAddLiquidityResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddLiquidityResponse): MsgAddLiquidityResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgAddLiquidityResponse",
      value: MsgAddLiquidityResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveLiquidity(): MsgRemoveLiquidity {
  return {
    lender: "",
    ytokens: Coin.fromPartial({})
  };
}
export const MsgRemoveLiquidity = {
  typeUrl: "/side.lending.MsgRemoveLiquidity",
  encode(message: MsgRemoveLiquidity, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lender !== "") {
      writer.uint32(10).string(message.lender);
    }
    if (message.ytokens !== undefined) {
      Coin.encode(message.ytokens, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveLiquidity {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lender = reader.string();
          break;
        case 2:
          message.ytokens = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveLiquidity>): MsgRemoveLiquidity {
    const message = createBaseMsgRemoveLiquidity();
    message.lender = object.lender ?? "";
    message.ytokens = object.ytokens !== undefined && object.ytokens !== null ? Coin.fromPartial(object.ytokens) : undefined;
    return message;
  },
  fromAmino(object: MsgRemoveLiquidityAmino): MsgRemoveLiquidity {
    const message = createBaseMsgRemoveLiquidity();
    if (object.lender !== undefined && object.lender !== null) {
      message.lender = object.lender;
    }
    if (object.ytokens !== undefined && object.ytokens !== null) {
      message.ytokens = Coin.fromAmino(object.ytokens);
    }
    return message;
  },
  toAmino(message: MsgRemoveLiquidity): MsgRemoveLiquidityAmino {
    const obj: any = {};
    obj.lender = message.lender === "" ? undefined : message.lender;
    obj.ytokens = message.ytokens ? Coin.toAmino(message.ytokens) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveLiquidityAminoMsg): MsgRemoveLiquidity {
    return MsgRemoveLiquidity.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveLiquidityProtoMsg): MsgRemoveLiquidity {
    return MsgRemoveLiquidity.decode(message.value);
  },
  toProto(message: MsgRemoveLiquidity): Uint8Array {
    return MsgRemoveLiquidity.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveLiquidity): MsgRemoveLiquidityProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRemoveLiquidity",
      value: MsgRemoveLiquidity.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveLiquidityResponse(): MsgRemoveLiquidityResponse {
  return {};
}
export const MsgRemoveLiquidityResponse = {
  typeUrl: "/side.lending.MsgRemoveLiquidityResponse",
  encode(_: MsgRemoveLiquidityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRemoveLiquidityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveLiquidityResponse();
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
  fromPartial(_: Partial<MsgRemoveLiquidityResponse>): MsgRemoveLiquidityResponse {
    const message = createBaseMsgRemoveLiquidityResponse();
    return message;
  },
  fromAmino(_: MsgRemoveLiquidityResponseAmino): MsgRemoveLiquidityResponse {
    const message = createBaseMsgRemoveLiquidityResponse();
    return message;
  },
  toAmino(_: MsgRemoveLiquidityResponse): MsgRemoveLiquidityResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveLiquidityResponseAminoMsg): MsgRemoveLiquidityResponse {
    return MsgRemoveLiquidityResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveLiquidityResponseProtoMsg): MsgRemoveLiquidityResponse {
    return MsgRemoveLiquidityResponse.decode(message.value);
  },
  toProto(message: MsgRemoveLiquidityResponse): Uint8Array {
    return MsgRemoveLiquidityResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveLiquidityResponse): MsgRemoveLiquidityResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRemoveLiquidityResponse",
      value: MsgRemoveLiquidityResponse.encode(message).finish()
    };
  }
};
function createBaseMsgApply(): MsgApply {
  return {
    borrower: "",
    borrowerPubkey: "",
    borrowerAuthPubkey: "",
    poolId: "",
    borrowAmount: Coin.fromPartial({}),
    maturity: BigInt(0),
    dcmId: BigInt(0),
    referrer: ""
  };
}
export const MsgApply = {
  typeUrl: "/side.lending.MsgApply",
  encode(message: MsgApply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.borrowerPubkey !== "") {
      writer.uint32(18).string(message.borrowerPubkey);
    }
    if (message.borrowerAuthPubkey !== "") {
      writer.uint32(26).string(message.borrowerAuthPubkey);
    }
    if (message.poolId !== "") {
      writer.uint32(34).string(message.poolId);
    }
    if (message.borrowAmount !== undefined) {
      Coin.encode(message.borrowAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.maturity !== BigInt(0)) {
      writer.uint32(48).int64(message.maturity);
    }
    if (message.dcmId !== BigInt(0)) {
      writer.uint32(56).uint64(message.dcmId);
    }
    if (message.referrer !== "") {
      writer.uint32(66).string(message.referrer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.borrowerPubkey = reader.string();
          break;
        case 3:
          message.borrowerAuthPubkey = reader.string();
          break;
        case 4:
          message.poolId = reader.string();
          break;
        case 5:
          message.borrowAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.maturity = reader.int64();
          break;
        case 7:
          message.dcmId = reader.uint64();
          break;
        case 8:
          message.referrer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgApply>): MsgApply {
    const message = createBaseMsgApply();
    message.borrower = object.borrower ?? "";
    message.borrowerPubkey = object.borrowerPubkey ?? "";
    message.borrowerAuthPubkey = object.borrowerAuthPubkey ?? "";
    message.poolId = object.poolId ?? "";
    message.borrowAmount = object.borrowAmount !== undefined && object.borrowAmount !== null ? Coin.fromPartial(object.borrowAmount) : undefined;
    message.maturity = object.maturity !== undefined && object.maturity !== null ? BigInt(object.maturity.toString()) : BigInt(0);
    message.dcmId = object.dcmId !== undefined && object.dcmId !== null ? BigInt(object.dcmId.toString()) : BigInt(0);
    message.referrer = object.referrer ?? "";
    return message;
  },
  fromAmino(object: MsgApplyAmino): MsgApply {
    const message = createBaseMsgApply();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.borrower_pubkey !== undefined && object.borrower_pubkey !== null) {
      message.borrowerPubkey = object.borrower_pubkey;
    }
    if (object.borrower_auth_pubkey !== undefined && object.borrower_auth_pubkey !== null) {
      message.borrowerAuthPubkey = object.borrower_auth_pubkey;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = Coin.fromAmino(object.borrow_amount);
    }
    if (object.maturity !== undefined && object.maturity !== null) {
      message.maturity = BigInt(object.maturity);
    }
    if (object.dcm_id !== undefined && object.dcm_id !== null) {
      message.dcmId = BigInt(object.dcm_id);
    }
    if (object.referrer !== undefined && object.referrer !== null) {
      message.referrer = object.referrer;
    }
    return message;
  },
  toAmino(message: MsgApply): MsgApplyAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.borrower_pubkey = message.borrowerPubkey === "" ? undefined : message.borrowerPubkey;
    obj.borrower_auth_pubkey = message.borrowerAuthPubkey === "" ? undefined : message.borrowerAuthPubkey;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.borrow_amount = message.borrowAmount ? Coin.toAmino(message.borrowAmount) : undefined;
    obj.maturity = message.maturity !== BigInt(0) ? message.maturity.toString() : undefined;
    obj.dcm_id = message.dcmId !== BigInt(0) ? message.dcmId.toString() : undefined;
    obj.referrer = message.referrer === "" ? undefined : message.referrer;
    return obj;
  },
  fromAminoMsg(object: MsgApplyAminoMsg): MsgApply {
    return MsgApply.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApplyProtoMsg): MsgApply {
    return MsgApply.decode(message.value);
  },
  toProto(message: MsgApply): Uint8Array {
    return MsgApply.encode(message).finish();
  },
  toProtoMsg(message: MsgApply): MsgApplyProtoMsg {
    return {
      typeUrl: "/side.lending.MsgApply",
      value: MsgApply.encode(message).finish()
    };
  }
};
function createBaseMsgApplyResponse(): MsgApplyResponse {
  return {};
}
export const MsgApplyResponse = {
  typeUrl: "/side.lending.MsgApplyResponse",
  encode(_: MsgApplyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApplyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApplyResponse();
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
  fromPartial(_: Partial<MsgApplyResponse>): MsgApplyResponse {
    const message = createBaseMsgApplyResponse();
    return message;
  },
  fromAmino(_: MsgApplyResponseAmino): MsgApplyResponse {
    const message = createBaseMsgApplyResponse();
    return message;
  },
  toAmino(_: MsgApplyResponse): MsgApplyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgApplyResponseAminoMsg): MsgApplyResponse {
    return MsgApplyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApplyResponseProtoMsg): MsgApplyResponse {
    return MsgApplyResponse.decode(message.value);
  },
  toProto(message: MsgApplyResponse): Uint8Array {
    return MsgApplyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgApplyResponse): MsgApplyResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgApplyResponse",
      value: MsgApplyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitCets(): MsgSubmitCets {
  return {
    borrower: "",
    loanId: "",
    depositTxs: [],
    liquidationCet: "",
    liquidationAdaptorSignatures: [],
    defaultLiquidationAdaptorSignatures: [],
    repaymentCet: "",
    repaymentSignatures: []
  };
}
export const MsgSubmitCets = {
  typeUrl: "/side.lending.MsgSubmitCets",
  encode(message: MsgSubmitCets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    for (const v of message.depositTxs) {
      writer.uint32(26).string(v!);
    }
    if (message.liquidationCet !== "") {
      writer.uint32(34).string(message.liquidationCet);
    }
    for (const v of message.liquidationAdaptorSignatures) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.defaultLiquidationAdaptorSignatures) {
      writer.uint32(50).string(v!);
    }
    if (message.repaymentCet !== "") {
      writer.uint32(58).string(message.repaymentCet);
    }
    for (const v of message.repaymentSignatures) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitCets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitCets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.depositTxs.push(reader.string());
          break;
        case 4:
          message.liquidationCet = reader.string();
          break;
        case 5:
          message.liquidationAdaptorSignatures.push(reader.string());
          break;
        case 6:
          message.defaultLiquidationAdaptorSignatures.push(reader.string());
          break;
        case 7:
          message.repaymentCet = reader.string();
          break;
        case 8:
          message.repaymentSignatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitCets>): MsgSubmitCets {
    const message = createBaseMsgSubmitCets();
    message.borrower = object.borrower ?? "";
    message.loanId = object.loanId ?? "";
    message.depositTxs = object.depositTxs?.map(e => e) || [];
    message.liquidationCet = object.liquidationCet ?? "";
    message.liquidationAdaptorSignatures = object.liquidationAdaptorSignatures?.map(e => e) || [];
    message.defaultLiquidationAdaptorSignatures = object.defaultLiquidationAdaptorSignatures?.map(e => e) || [];
    message.repaymentCet = object.repaymentCet ?? "";
    message.repaymentSignatures = object.repaymentSignatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitCetsAmino): MsgSubmitCets {
    const message = createBaseMsgSubmitCets();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    message.depositTxs = object.deposit_txs?.map(e => e) || [];
    if (object.liquidation_cet !== undefined && object.liquidation_cet !== null) {
      message.liquidationCet = object.liquidation_cet;
    }
    message.liquidationAdaptorSignatures = object.liquidation_adaptor_signatures?.map(e => e) || [];
    message.defaultLiquidationAdaptorSignatures = object.default_liquidation_adaptor_signatures?.map(e => e) || [];
    if (object.repayment_cet !== undefined && object.repayment_cet !== null) {
      message.repaymentCet = object.repayment_cet;
    }
    message.repaymentSignatures = object.repayment_signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitCets): MsgSubmitCetsAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    if (message.depositTxs) {
      obj.deposit_txs = message.depositTxs.map(e => e);
    } else {
      obj.deposit_txs = message.depositTxs;
    }
    obj.liquidation_cet = message.liquidationCet === "" ? undefined : message.liquidationCet;
    if (message.liquidationAdaptorSignatures) {
      obj.liquidation_adaptor_signatures = message.liquidationAdaptorSignatures.map(e => e);
    } else {
      obj.liquidation_adaptor_signatures = message.liquidationAdaptorSignatures;
    }
    if (message.defaultLiquidationAdaptorSignatures) {
      obj.default_liquidation_adaptor_signatures = message.defaultLiquidationAdaptorSignatures.map(e => e);
    } else {
      obj.default_liquidation_adaptor_signatures = message.defaultLiquidationAdaptorSignatures;
    }
    obj.repayment_cet = message.repaymentCet === "" ? undefined : message.repaymentCet;
    if (message.repaymentSignatures) {
      obj.repayment_signatures = message.repaymentSignatures.map(e => e);
    } else {
      obj.repayment_signatures = message.repaymentSignatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitCetsAminoMsg): MsgSubmitCets {
    return MsgSubmitCets.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitCetsProtoMsg): MsgSubmitCets {
    return MsgSubmitCets.decode(message.value);
  },
  toProto(message: MsgSubmitCets): Uint8Array {
    return MsgSubmitCets.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitCets): MsgSubmitCetsProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitCets",
      value: MsgSubmitCets.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitCetsResponse(): MsgSubmitCetsResponse {
  return {};
}
export const MsgSubmitCetsResponse = {
  typeUrl: "/side.lending.MsgSubmitCetsResponse",
  encode(_: MsgSubmitCetsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitCetsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitCetsResponse();
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
  fromPartial(_: Partial<MsgSubmitCetsResponse>): MsgSubmitCetsResponse {
    const message = createBaseMsgSubmitCetsResponse();
    return message;
  },
  fromAmino(_: MsgSubmitCetsResponseAmino): MsgSubmitCetsResponse {
    const message = createBaseMsgSubmitCetsResponse();
    return message;
  },
  toAmino(_: MsgSubmitCetsResponse): MsgSubmitCetsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitCetsResponseAminoMsg): MsgSubmitCetsResponse {
    return MsgSubmitCetsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitCetsResponseProtoMsg): MsgSubmitCetsResponse {
    return MsgSubmitCetsResponse.decode(message.value);
  },
  toProto(message: MsgSubmitCetsResponse): Uint8Array {
    return MsgSubmitCetsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitCetsResponse): MsgSubmitCetsResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitCetsResponse",
      value: MsgSubmitCetsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransaction(): MsgSubmitDepositTransaction {
  return {
    relayer: "",
    vault: "",
    depositTx: "",
    blockHash: "",
    proof: []
  };
}
export const MsgSubmitDepositTransaction = {
  typeUrl: "/side.lending.MsgSubmitDepositTransaction",
  encode(message: MsgSubmitDepositTransaction, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.relayer !== "") {
      writer.uint32(10).string(message.relayer);
    }
    if (message.vault !== "") {
      writer.uint32(18).string(message.vault);
    }
    if (message.depositTx !== "") {
      writer.uint32(26).string(message.depositTx);
    }
    if (message.blockHash !== "") {
      writer.uint32(34).string(message.blockHash);
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
          message.relayer = reader.string();
          break;
        case 2:
          message.vault = reader.string();
          break;
        case 3:
          message.depositTx = reader.string();
          break;
        case 4:
          message.blockHash = reader.string();
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
    message.relayer = object.relayer ?? "";
    message.vault = object.vault ?? "";
    message.depositTx = object.depositTx ?? "";
    message.blockHash = object.blockHash ?? "";
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitDepositTransactionAmino): MsgSubmitDepositTransaction {
    const message = createBaseMsgSubmitDepositTransaction();
    if (object.relayer !== undefined && object.relayer !== null) {
      message.relayer = object.relayer;
    }
    if (object.vault !== undefined && object.vault !== null) {
      message.vault = object.vault;
    }
    if (object.deposit_tx !== undefined && object.deposit_tx !== null) {
      message.depositTx = object.deposit_tx;
    }
    if (object.block_hash !== undefined && object.block_hash !== null) {
      message.blockHash = object.block_hash;
    }
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitDepositTransaction): MsgSubmitDepositTransactionAmino {
    const obj: any = {};
    obj.relayer = message.relayer === "" ? undefined : message.relayer;
    obj.vault = message.vault === "" ? undefined : message.vault;
    obj.deposit_tx = message.depositTx === "" ? undefined : message.depositTx;
    obj.block_hash = message.blockHash === "" ? undefined : message.blockHash;
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
      typeUrl: "/side.lending.MsgSubmitDepositTransaction",
      value: MsgSubmitDepositTransaction.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitDepositTransactionResponse(): MsgSubmitDepositTransactionResponse {
  return {};
}
export const MsgSubmitDepositTransactionResponse = {
  typeUrl: "/side.lending.MsgSubmitDepositTransactionResponse",
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
      typeUrl: "/side.lending.MsgSubmitDepositTransactionResponse",
      value: MsgSubmitDepositTransactionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedeem(): MsgRedeem {
  return {
    borrower: "",
    loanId: "",
    tx: "",
    signatures: []
  };
}
export const MsgRedeem = {
  typeUrl: "/side.lending.MsgRedeem",
  encode(message: MsgRedeem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    if (message.tx !== "") {
      writer.uint32(26).string(message.tx);
    }
    for (const v of message.signatures) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRedeem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.tx = reader.string();
          break;
        case 4:
          message.signatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeem>): MsgRedeem {
    const message = createBaseMsgRedeem();
    message.borrower = object.borrower ?? "";
    message.loanId = object.loanId ?? "";
    message.tx = object.tx ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgRedeemAmino): MsgRedeem {
    const message = createBaseMsgRedeem();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = object.tx;
    }
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgRedeem): MsgRedeemAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    obj.tx = message.tx === "" ? undefined : message.tx;
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => e);
    } else {
      obj.signatures = message.signatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgRedeemAminoMsg): MsgRedeem {
    return MsgRedeem.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemProtoMsg): MsgRedeem {
    return MsgRedeem.decode(message.value);
  },
  toProto(message: MsgRedeem): Uint8Array {
    return MsgRedeem.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeem): MsgRedeemProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRedeem",
      value: MsgRedeem.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemResponse(): MsgRedeemResponse {
  return {};
}
export const MsgRedeemResponse = {
  typeUrl: "/side.lending.MsgRedeemResponse",
  encode(_: MsgRedeemResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgRedeemResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemResponse();
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
  fromPartial(_: Partial<MsgRedeemResponse>): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    return message;
  },
  fromAmino(_: MsgRedeemResponseAmino): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    return message;
  },
  toAmino(_: MsgRedeemResponse): MsgRedeemResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRedeemResponseAminoMsg): MsgRedeemResponse {
    return MsgRedeemResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemResponseProtoMsg): MsgRedeemResponse {
    return MsgRedeemResponse.decode(message.value);
  },
  toProto(message: MsgRedeemResponse): Uint8Array {
    return MsgRedeemResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemResponse): MsgRedeemResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgRedeemResponse",
      value: MsgRedeemResponse.encode(message).finish()
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
  typeUrl: "/side.lending.MsgUpdateParams",
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
      typeUrl: "/side.lending.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/side.lending.MsgUpdateParamsResponse",
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
      typeUrl: "/side.lending.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};