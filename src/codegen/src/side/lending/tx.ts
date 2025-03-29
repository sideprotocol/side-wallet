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
  /** lending asset */
  lendingAsset: string;
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
  /** lending asset */
  lending_asset?: string;
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
  lending_asset: string;
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
  stokens: Coin;
}
export interface MsgRemoveLiquidityProtoMsg {
  typeUrl: "/side.lending.MsgRemoveLiquidity";
  value: Uint8Array;
}
export interface MsgRemoveLiquidityAmino {
  lender?: string;
  stokens?: CoinAmino;
}
export interface MsgRemoveLiquidityAminoMsg {
  type: "/side.lending.MsgRemoveLiquidity";
  value: MsgRemoveLiquidityAmino;
}
export interface MsgRemoveLiquiditySDKType {
  lender: string;
  stokens: CoinSDKType;
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
  maturityTime: bigint;
  poolId: string;
  borrowAmount: Coin;
  dcmId: bigint;
}
export interface MsgApplyProtoMsg {
  typeUrl: "/side.lending.MsgApply";
  value: Uint8Array;
}
export interface MsgApplyAmino {
  borrower?: string;
  borrower_pubkey?: string;
  maturity_time?: string;
  pool_id?: string;
  borrow_amount?: CoinAmino;
  dcm_id?: string;
}
export interface MsgApplyAminoMsg {
  type: "/side.lending.MsgApply";
  value: MsgApplyAmino;
}
export interface MsgApplySDKType {
  borrower: string;
  borrower_pubkey: string;
  maturity_time: bigint;
  pool_id: string;
  borrow_amount: CoinSDKType;
  dcm_id: bigint;
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
  depositTx: string;
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
  deposit_tx?: string;
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
  deposit_tx: string;
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
export interface MsgApprove {
  relayer: string;
  vault: string;
  depositTx: string;
  blockHash: string;
  proof: string[];
}
export interface MsgApproveProtoMsg {
  typeUrl: "/side.lending.MsgApprove";
  value: Uint8Array;
}
export interface MsgApproveAmino {
  relayer?: string;
  vault?: string;
  deposit_tx?: string;
  block_hash?: string;
  proof?: string[];
}
export interface MsgApproveAminoMsg {
  type: "/side.lending.MsgApprove";
  value: MsgApproveAmino;
}
export interface MsgApproveSDKType {
  relayer: string;
  vault: string;
  deposit_tx: string;
  block_hash: string;
  proof: string[];
}
export interface MsgApproveResponse {}
export interface MsgApproveResponseProtoMsg {
  typeUrl: "/side.lending.MsgApproveResponse";
  value: Uint8Array;
}
export interface MsgApproveResponseAmino {}
export interface MsgApproveResponseAminoMsg {
  type: "/side.lending.MsgApproveResponse";
  value: MsgApproveResponseAmino;
}
export interface MsgApproveResponseSDKType {}
export interface MsgCancel {
  borrower: string;
  loanId: string;
  tx: string;
  signatures: string[];
}
export interface MsgCancelProtoMsg {
  typeUrl: "/side.lending.MsgCancel";
  value: Uint8Array;
}
export interface MsgCancelAmino {
  borrower?: string;
  loan_id?: string;
  tx?: string;
  signatures?: string[];
}
export interface MsgCancelAminoMsg {
  type: "/side.lending.MsgCancel";
  value: MsgCancelAmino;
}
export interface MsgCancelSDKType {
  borrower: string;
  loan_id: string;
  tx: string;
  signatures: string[];
}
export interface MsgCancelResponse {}
export interface MsgCancelResponseProtoMsg {
  typeUrl: "/side.lending.MsgCancelResponse";
  value: Uint8Array;
}
export interface MsgCancelResponseAmino {}
export interface MsgCancelResponseAminoMsg {
  type: "/side.lending.MsgCancelResponse";
  value: MsgCancelResponseAmino;
}
export interface MsgCancelResponseSDKType {}
export interface MsgSubmitCancellationSignatures {
  sender: string;
  loanId: string;
  signatures: string[];
}
export interface MsgSubmitCancellationSignaturesProtoMsg {
  typeUrl: "/side.lending.MsgSubmitCancellationSignatures";
  value: Uint8Array;
}
export interface MsgSubmitCancellationSignaturesAmino {
  sender?: string;
  loan_id?: string;
  signatures?: string[];
}
export interface MsgSubmitCancellationSignaturesAminoMsg {
  type: "/side.lending.MsgSubmitCancellationSignatures";
  value: MsgSubmitCancellationSignaturesAmino;
}
export interface MsgSubmitCancellationSignaturesSDKType {
  sender: string;
  loan_id: string;
  signatures: string[];
}
export interface MsgSubmitCancellationSignaturesResponse {}
export interface MsgSubmitCancellationSignaturesResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitCancellationSignaturesResponse";
  value: Uint8Array;
}
export interface MsgSubmitCancellationSignaturesResponseAmino {}
export interface MsgSubmitCancellationSignaturesResponseAminoMsg {
  type: "/side.lending.MsgSubmitCancellationSignaturesResponse";
  value: MsgSubmitCancellationSignaturesResponseAmino;
}
export interface MsgSubmitCancellationSignaturesResponseSDKType {}
export interface MsgSubmitRepaymentAdaptorSignatures {
  sender: string;
  loanId: string;
  adaptorSignatures: string[];
}
export interface MsgSubmitRepaymentAdaptorSignaturesProtoMsg {
  typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures";
  value: Uint8Array;
}
export interface MsgSubmitRepaymentAdaptorSignaturesAmino {
  sender?: string;
  loan_id?: string;
  adaptor_signatures?: string[];
}
export interface MsgSubmitRepaymentAdaptorSignaturesAminoMsg {
  type: "/side.lending.MsgSubmitRepaymentAdaptorSignatures";
  value: MsgSubmitRepaymentAdaptorSignaturesAmino;
}
export interface MsgSubmitRepaymentAdaptorSignaturesSDKType {
  sender: string;
  loan_id: string;
  adaptor_signatures: string[];
}
export interface MsgSubmitRepaymentAdaptorSignaturesResponse {}
export interface MsgSubmitRepaymentAdaptorSignaturesResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignaturesResponse";
  value: Uint8Array;
}
export interface MsgSubmitRepaymentAdaptorSignaturesResponseAmino {}
export interface MsgSubmitRepaymentAdaptorSignaturesResponseAminoMsg {
  type: "/side.lending.MsgSubmitRepaymentAdaptorSignaturesResponse";
  value: MsgSubmitRepaymentAdaptorSignaturesResponseAmino;
}
export interface MsgSubmitRepaymentAdaptorSignaturesResponseSDKType {}
export interface MsgSubmitLiquidationSignatures {
  sender: string;
  loanId: string;
  signatures: string[];
}
export interface MsgSubmitLiquidationSignaturesProtoMsg {
  typeUrl: "/side.lending.MsgSubmitLiquidationSignatures";
  value: Uint8Array;
}
export interface MsgSubmitLiquidationSignaturesAmino {
  sender?: string;
  loan_id?: string;
  signatures?: string[];
}
export interface MsgSubmitLiquidationSignaturesAminoMsg {
  type: "/side.lending.MsgSubmitLiquidationSignatures";
  value: MsgSubmitLiquidationSignaturesAmino;
}
export interface MsgSubmitLiquidationSignaturesSDKType {
  sender: string;
  loan_id: string;
  signatures: string[];
}
export interface MsgSubmitLiquidationSignaturesResponse {}
export interface MsgSubmitLiquidationSignaturesResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitLiquidationSignaturesResponse";
  value: Uint8Array;
}
export interface MsgSubmitLiquidationSignaturesResponseAmino {}
export interface MsgSubmitLiquidationSignaturesResponseAminoMsg {
  type: "/side.lending.MsgSubmitLiquidationSignaturesResponse";
  value: MsgSubmitLiquidationSignaturesResponseAmino;
}
export interface MsgSubmitLiquidationSignaturesResponseSDKType {}
export interface MsgSubmitPrice {
  sender: string;
  price: string;
}
export interface MsgSubmitPriceProtoMsg {
  typeUrl: "/side.lending.MsgSubmitPrice";
  value: Uint8Array;
}
export interface MsgSubmitPriceAmino {
  sender?: string;
  price?: string;
}
export interface MsgSubmitPriceAminoMsg {
  type: "/side.lending.MsgSubmitPrice";
  value: MsgSubmitPriceAmino;
}
export interface MsgSubmitPriceSDKType {
  sender: string;
  price: string;
}
export interface MsgSubmitPriceResponse {}
export interface MsgSubmitPriceResponseProtoMsg {
  typeUrl: "/side.lending.MsgSubmitPriceResponse";
  value: Uint8Array;
}
export interface MsgSubmitPriceResponseAmino {}
export interface MsgSubmitPriceResponseAminoMsg {
  type: "/side.lending.MsgSubmitPriceResponse";
  value: MsgSubmitPriceResponseAmino;
}
export interface MsgSubmitPriceResponseSDKType {}
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
    lendingAsset: "",
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
    if (message.lendingAsset !== "") {
      writer.uint32(26).string(message.lendingAsset);
    }
    if (message.config !== undefined) {
      PoolConfig.encode(message.config, writer.uint32(34).fork()).ldelim();
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
          message.lendingAsset = reader.string();
          break;
        case 4:
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
    message.lendingAsset = object.lendingAsset ?? "";
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
    if (object.lending_asset !== undefined && object.lending_asset !== null) {
      message.lendingAsset = object.lending_asset;
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
    obj.lending_asset = message.lendingAsset === "" ? undefined : message.lendingAsset;
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
    stokens: Coin.fromPartial({})
  };
}
export const MsgRemoveLiquidity = {
  typeUrl: "/side.lending.MsgRemoveLiquidity",
  encode(message: MsgRemoveLiquidity, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lender !== "") {
      writer.uint32(10).string(message.lender);
    }
    if (message.stokens !== undefined) {
      Coin.encode(message.stokens, writer.uint32(18).fork()).ldelim();
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
          message.stokens = Coin.decode(reader, reader.uint32());
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
    message.stokens = object.stokens !== undefined && object.stokens !== null ? Coin.fromPartial(object.stokens) : undefined;
    return message;
  },
  fromAmino(object: MsgRemoveLiquidityAmino): MsgRemoveLiquidity {
    const message = createBaseMsgRemoveLiquidity();
    if (object.lender !== undefined && object.lender !== null) {
      message.lender = object.lender;
    }
    if (object.stokens !== undefined && object.stokens !== null) {
      message.stokens = Coin.fromAmino(object.stokens);
    }
    return message;
  },
  toAmino(message: MsgRemoveLiquidity): MsgRemoveLiquidityAmino {
    const obj: any = {};
    obj.lender = message.lender === "" ? undefined : message.lender;
    obj.stokens = message.stokens ? Coin.toAmino(message.stokens) : undefined;
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
    maturityTime: BigInt(0),
    poolId: "",
    borrowAmount: Coin.fromPartial({}),
    dcmId: BigInt(0)
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
    if (message.maturityTime !== BigInt(0)) {
      writer.uint32(24).int64(message.maturityTime);
    }
    if (message.poolId !== "") {
      writer.uint32(34).string(message.poolId);
    }
    if (message.borrowAmount !== undefined) {
      Coin.encode(message.borrowAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.dcmId !== BigInt(0)) {
      writer.uint32(48).uint64(message.dcmId);
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
          message.maturityTime = reader.int64();
          break;
        case 4:
          message.poolId = reader.string();
          break;
        case 5:
          message.borrowAmount = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.dcmId = reader.uint64();
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
    message.maturityTime = object.maturityTime !== undefined && object.maturityTime !== null ? BigInt(object.maturityTime.toString()) : BigInt(0);
    message.poolId = object.poolId ?? "";
    message.borrowAmount = object.borrowAmount !== undefined && object.borrowAmount !== null ? Coin.fromPartial(object.borrowAmount) : undefined;
    message.dcmId = object.dcmId !== undefined && object.dcmId !== null ? BigInt(object.dcmId.toString()) : BigInt(0);
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
    if (object.maturity_time !== undefined && object.maturity_time !== null) {
      message.maturityTime = BigInt(object.maturity_time);
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = Coin.fromAmino(object.borrow_amount);
    }
    if (object.dcm_id !== undefined && object.dcm_id !== null) {
      message.dcmId = BigInt(object.dcm_id);
    }
    return message;
  },
  toAmino(message: MsgApply): MsgApplyAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.borrower_pubkey = message.borrowerPubkey === "" ? undefined : message.borrowerPubkey;
    obj.maturity_time = message.maturityTime !== BigInt(0) ? message.maturityTime.toString() : undefined;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.borrow_amount = message.borrowAmount ? Coin.toAmino(message.borrowAmount) : undefined;
    obj.dcm_id = message.dcmId !== BigInt(0) ? message.dcmId.toString() : undefined;
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
    depositTx: "",
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
    if (message.depositTx !== "") {
      writer.uint32(26).string(message.depositTx);
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
          message.depositTx = reader.string();
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
    message.depositTx = object.depositTx ?? "";
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
    if (object.deposit_tx !== undefined && object.deposit_tx !== null) {
      message.depositTx = object.deposit_tx;
    }
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
    obj.deposit_tx = message.depositTx === "" ? undefined : message.depositTx;
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
function createBaseMsgApprove(): MsgApprove {
  return {
    relayer: "",
    vault: "",
    depositTx: "",
    blockHash: "",
    proof: []
  };
}
export const MsgApprove = {
  typeUrl: "/side.lending.MsgApprove",
  encode(message: MsgApprove, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApprove {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApprove();
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
  fromPartial(object: Partial<MsgApprove>): MsgApprove {
    const message = createBaseMsgApprove();
    message.relayer = object.relayer ?? "";
    message.vault = object.vault ?? "";
    message.depositTx = object.depositTx ?? "";
    message.blockHash = object.blockHash ?? "";
    message.proof = object.proof?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgApproveAmino): MsgApprove {
    const message = createBaseMsgApprove();
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
  toAmino(message: MsgApprove): MsgApproveAmino {
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
  fromAminoMsg(object: MsgApproveAminoMsg): MsgApprove {
    return MsgApprove.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveProtoMsg): MsgApprove {
    return MsgApprove.decode(message.value);
  },
  toProto(message: MsgApprove): Uint8Array {
    return MsgApprove.encode(message).finish();
  },
  toProtoMsg(message: MsgApprove): MsgApproveProtoMsg {
    return {
      typeUrl: "/side.lending.MsgApprove",
      value: MsgApprove.encode(message).finish()
    };
  }
};
function createBaseMsgApproveResponse(): MsgApproveResponse {
  return {};
}
export const MsgApproveResponse = {
  typeUrl: "/side.lending.MsgApproveResponse",
  encode(_: MsgApproveResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgApproveResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgApproveResponse();
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
  fromPartial(_: Partial<MsgApproveResponse>): MsgApproveResponse {
    const message = createBaseMsgApproveResponse();
    return message;
  },
  fromAmino(_: MsgApproveResponseAmino): MsgApproveResponse {
    const message = createBaseMsgApproveResponse();
    return message;
  },
  toAmino(_: MsgApproveResponse): MsgApproveResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgApproveResponseAminoMsg): MsgApproveResponse {
    return MsgApproveResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgApproveResponseProtoMsg): MsgApproveResponse {
    return MsgApproveResponse.decode(message.value);
  },
  toProto(message: MsgApproveResponse): Uint8Array {
    return MsgApproveResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgApproveResponse): MsgApproveResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgApproveResponse",
      value: MsgApproveResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCancel(): MsgCancel {
  return {
    borrower: "",
    loanId: "",
    tx: "",
    signatures: []
  };
}
export const MsgCancel = {
  typeUrl: "/side.lending.MsgCancel",
  encode(message: MsgCancel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancel();
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
  fromPartial(object: Partial<MsgCancel>): MsgCancel {
    const message = createBaseMsgCancel();
    message.borrower = object.borrower ?? "";
    message.loanId = object.loanId ?? "";
    message.tx = object.tx ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgCancelAmino): MsgCancel {
    const message = createBaseMsgCancel();
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
  toAmino(message: MsgCancel): MsgCancelAmino {
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
  fromAminoMsg(object: MsgCancelAminoMsg): MsgCancel {
    return MsgCancel.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelProtoMsg): MsgCancel {
    return MsgCancel.decode(message.value);
  },
  toProto(message: MsgCancel): Uint8Array {
    return MsgCancel.encode(message).finish();
  },
  toProtoMsg(message: MsgCancel): MsgCancelProtoMsg {
    return {
      typeUrl: "/side.lending.MsgCancel",
      value: MsgCancel.encode(message).finish()
    };
  }
};
function createBaseMsgCancelResponse(): MsgCancelResponse {
  return {};
}
export const MsgCancelResponse = {
  typeUrl: "/side.lending.MsgCancelResponse",
  encode(_: MsgCancelResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelResponse();
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
  fromPartial(_: Partial<MsgCancelResponse>): MsgCancelResponse {
    const message = createBaseMsgCancelResponse();
    return message;
  },
  fromAmino(_: MsgCancelResponseAmino): MsgCancelResponse {
    const message = createBaseMsgCancelResponse();
    return message;
  },
  toAmino(_: MsgCancelResponse): MsgCancelResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCancelResponseAminoMsg): MsgCancelResponse {
    return MsgCancelResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelResponseProtoMsg): MsgCancelResponse {
    return MsgCancelResponse.decode(message.value);
  },
  toProto(message: MsgCancelResponse): Uint8Array {
    return MsgCancelResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelResponse): MsgCancelResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgCancelResponse",
      value: MsgCancelResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitCancellationSignatures(): MsgSubmitCancellationSignatures {
  return {
    sender: "",
    loanId: "",
    signatures: []
  };
}
export const MsgSubmitCancellationSignatures = {
  typeUrl: "/side.lending.MsgSubmitCancellationSignatures",
  encode(message: MsgSubmitCancellationSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    for (const v of message.signatures) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitCancellationSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitCancellationSignatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.signatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitCancellationSignatures>): MsgSubmitCancellationSignatures {
    const message = createBaseMsgSubmitCancellationSignatures();
    message.sender = object.sender ?? "";
    message.loanId = object.loanId ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitCancellationSignaturesAmino): MsgSubmitCancellationSignatures {
    const message = createBaseMsgSubmitCancellationSignatures();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitCancellationSignatures): MsgSubmitCancellationSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => e);
    } else {
      obj.signatures = message.signatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitCancellationSignaturesAminoMsg): MsgSubmitCancellationSignatures {
    return MsgSubmitCancellationSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitCancellationSignaturesProtoMsg): MsgSubmitCancellationSignatures {
    return MsgSubmitCancellationSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitCancellationSignatures): Uint8Array {
    return MsgSubmitCancellationSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitCancellationSignatures): MsgSubmitCancellationSignaturesProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitCancellationSignatures",
      value: MsgSubmitCancellationSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitCancellationSignaturesResponse(): MsgSubmitCancellationSignaturesResponse {
  return {};
}
export const MsgSubmitCancellationSignaturesResponse = {
  typeUrl: "/side.lending.MsgSubmitCancellationSignaturesResponse",
  encode(_: MsgSubmitCancellationSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitCancellationSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitCancellationSignaturesResponse();
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
  fromPartial(_: Partial<MsgSubmitCancellationSignaturesResponse>): MsgSubmitCancellationSignaturesResponse {
    const message = createBaseMsgSubmitCancellationSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitCancellationSignaturesResponseAmino): MsgSubmitCancellationSignaturesResponse {
    const message = createBaseMsgSubmitCancellationSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitCancellationSignaturesResponse): MsgSubmitCancellationSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitCancellationSignaturesResponseAminoMsg): MsgSubmitCancellationSignaturesResponse {
    return MsgSubmitCancellationSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitCancellationSignaturesResponseProtoMsg): MsgSubmitCancellationSignaturesResponse {
    return MsgSubmitCancellationSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitCancellationSignaturesResponse): Uint8Array {
    return MsgSubmitCancellationSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitCancellationSignaturesResponse): MsgSubmitCancellationSignaturesResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitCancellationSignaturesResponse",
      value: MsgSubmitCancellationSignaturesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitRepaymentAdaptorSignatures(): MsgSubmitRepaymentAdaptorSignatures {
  return {
    sender: "",
    loanId: "",
    adaptorSignatures: []
  };
}
export const MsgSubmitRepaymentAdaptorSignatures = {
  typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
  encode(message: MsgSubmitRepaymentAdaptorSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    for (const v of message.adaptorSignatures) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitRepaymentAdaptorSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitRepaymentAdaptorSignatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.adaptorSignatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitRepaymentAdaptorSignatures>): MsgSubmitRepaymentAdaptorSignatures {
    const message = createBaseMsgSubmitRepaymentAdaptorSignatures();
    message.sender = object.sender ?? "";
    message.loanId = object.loanId ?? "";
    message.adaptorSignatures = object.adaptorSignatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitRepaymentAdaptorSignaturesAmino): MsgSubmitRepaymentAdaptorSignatures {
    const message = createBaseMsgSubmitRepaymentAdaptorSignatures();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    message.adaptorSignatures = object.adaptor_signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitRepaymentAdaptorSignatures): MsgSubmitRepaymentAdaptorSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    if (message.adaptorSignatures) {
      obj.adaptor_signatures = message.adaptorSignatures.map(e => e);
    } else {
      obj.adaptor_signatures = message.adaptorSignatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitRepaymentAdaptorSignaturesAminoMsg): MsgSubmitRepaymentAdaptorSignatures {
    return MsgSubmitRepaymentAdaptorSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitRepaymentAdaptorSignaturesProtoMsg): MsgSubmitRepaymentAdaptorSignatures {
    return MsgSubmitRepaymentAdaptorSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitRepaymentAdaptorSignatures): Uint8Array {
    return MsgSubmitRepaymentAdaptorSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitRepaymentAdaptorSignatures): MsgSubmitRepaymentAdaptorSignaturesProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignatures",
      value: MsgSubmitRepaymentAdaptorSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitRepaymentAdaptorSignaturesResponse(): MsgSubmitRepaymentAdaptorSignaturesResponse {
  return {};
}
export const MsgSubmitRepaymentAdaptorSignaturesResponse = {
  typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignaturesResponse",
  encode(_: MsgSubmitRepaymentAdaptorSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitRepaymentAdaptorSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitRepaymentAdaptorSignaturesResponse();
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
  fromPartial(_: Partial<MsgSubmitRepaymentAdaptorSignaturesResponse>): MsgSubmitRepaymentAdaptorSignaturesResponse {
    const message = createBaseMsgSubmitRepaymentAdaptorSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitRepaymentAdaptorSignaturesResponseAmino): MsgSubmitRepaymentAdaptorSignaturesResponse {
    const message = createBaseMsgSubmitRepaymentAdaptorSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitRepaymentAdaptorSignaturesResponse): MsgSubmitRepaymentAdaptorSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitRepaymentAdaptorSignaturesResponseAminoMsg): MsgSubmitRepaymentAdaptorSignaturesResponse {
    return MsgSubmitRepaymentAdaptorSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitRepaymentAdaptorSignaturesResponseProtoMsg): MsgSubmitRepaymentAdaptorSignaturesResponse {
    return MsgSubmitRepaymentAdaptorSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitRepaymentAdaptorSignaturesResponse): Uint8Array {
    return MsgSubmitRepaymentAdaptorSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitRepaymentAdaptorSignaturesResponse): MsgSubmitRepaymentAdaptorSignaturesResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitRepaymentAdaptorSignaturesResponse",
      value: MsgSubmitRepaymentAdaptorSignaturesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitLiquidationSignatures(): MsgSubmitLiquidationSignatures {
  return {
    sender: "",
    loanId: "",
    signatures: []
  };
}
export const MsgSubmitLiquidationSignatures = {
  typeUrl: "/side.lending.MsgSubmitLiquidationSignatures",
  encode(message: MsgSubmitLiquidationSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.loanId !== "") {
      writer.uint32(18).string(message.loanId);
    }
    for (const v of message.signatures) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitLiquidationSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitLiquidationSignatures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.loanId = reader.string();
          break;
        case 3:
          message.signatures.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitLiquidationSignatures>): MsgSubmitLiquidationSignatures {
    const message = createBaseMsgSubmitLiquidationSignatures();
    message.sender = object.sender ?? "";
    message.loanId = object.loanId ?? "";
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgSubmitLiquidationSignaturesAmino): MsgSubmitLiquidationSignatures {
    const message = createBaseMsgSubmitLiquidationSignatures();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.loan_id !== undefined && object.loan_id !== null) {
      message.loanId = object.loan_id;
    }
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgSubmitLiquidationSignatures): MsgSubmitLiquidationSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.loan_id = message.loanId === "" ? undefined : message.loanId;
    if (message.signatures) {
      obj.signatures = message.signatures.map(e => e);
    } else {
      obj.signatures = message.signatures;
    }
    return obj;
  },
  fromAminoMsg(object: MsgSubmitLiquidationSignaturesAminoMsg): MsgSubmitLiquidationSignatures {
    return MsgSubmitLiquidationSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitLiquidationSignaturesProtoMsg): MsgSubmitLiquidationSignatures {
    return MsgSubmitLiquidationSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitLiquidationSignatures): Uint8Array {
    return MsgSubmitLiquidationSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitLiquidationSignatures): MsgSubmitLiquidationSignaturesProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitLiquidationSignatures",
      value: MsgSubmitLiquidationSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitLiquidationSignaturesResponse(): MsgSubmitLiquidationSignaturesResponse {
  return {};
}
export const MsgSubmitLiquidationSignaturesResponse = {
  typeUrl: "/side.lending.MsgSubmitLiquidationSignaturesResponse",
  encode(_: MsgSubmitLiquidationSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitLiquidationSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitLiquidationSignaturesResponse();
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
  fromPartial(_: Partial<MsgSubmitLiquidationSignaturesResponse>): MsgSubmitLiquidationSignaturesResponse {
    const message = createBaseMsgSubmitLiquidationSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitLiquidationSignaturesResponseAmino): MsgSubmitLiquidationSignaturesResponse {
    const message = createBaseMsgSubmitLiquidationSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitLiquidationSignaturesResponse): MsgSubmitLiquidationSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitLiquidationSignaturesResponseAminoMsg): MsgSubmitLiquidationSignaturesResponse {
    return MsgSubmitLiquidationSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitLiquidationSignaturesResponseProtoMsg): MsgSubmitLiquidationSignaturesResponse {
    return MsgSubmitLiquidationSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitLiquidationSignaturesResponse): Uint8Array {
    return MsgSubmitLiquidationSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitLiquidationSignaturesResponse): MsgSubmitLiquidationSignaturesResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitLiquidationSignaturesResponse",
      value: MsgSubmitLiquidationSignaturesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitPrice(): MsgSubmitPrice {
  return {
    sender: "",
    price: ""
  };
}
export const MsgSubmitPrice = {
  typeUrl: "/side.lending.MsgSubmitPrice",
  encode(message: MsgSubmitPrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.price !== "") {
      writer.uint32(18).string(message.price);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitPrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitPrice>): MsgSubmitPrice {
    const message = createBaseMsgSubmitPrice();
    message.sender = object.sender ?? "";
    message.price = object.price ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitPriceAmino): MsgSubmitPrice {
    const message = createBaseMsgSubmitPrice();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    return message;
  },
  toAmino(message: MsgSubmitPrice): MsgSubmitPriceAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.price = message.price === "" ? undefined : message.price;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitPriceAminoMsg): MsgSubmitPrice {
    return MsgSubmitPrice.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitPriceProtoMsg): MsgSubmitPrice {
    return MsgSubmitPrice.decode(message.value);
  },
  toProto(message: MsgSubmitPrice): Uint8Array {
    return MsgSubmitPrice.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitPrice): MsgSubmitPriceProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitPrice",
      value: MsgSubmitPrice.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitPriceResponse(): MsgSubmitPriceResponse {
  return {};
}
export const MsgSubmitPriceResponse = {
  typeUrl: "/side.lending.MsgSubmitPriceResponse",
  encode(_: MsgSubmitPriceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitPriceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitPriceResponse();
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
  fromPartial(_: Partial<MsgSubmitPriceResponse>): MsgSubmitPriceResponse {
    const message = createBaseMsgSubmitPriceResponse();
    return message;
  },
  fromAmino(_: MsgSubmitPriceResponseAmino): MsgSubmitPriceResponse {
    const message = createBaseMsgSubmitPriceResponse();
    return message;
  },
  toAmino(_: MsgSubmitPriceResponse): MsgSubmitPriceResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitPriceResponseAminoMsg): MsgSubmitPriceResponse {
    return MsgSubmitPriceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitPriceResponseProtoMsg): MsgSubmitPriceResponse {
    return MsgSubmitPriceResponse.decode(message.value);
  },
  toProto(message: MsgSubmitPriceResponse): Uint8Array {
    return MsgSubmitPriceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitPriceResponse): MsgSubmitPriceResponseProtoMsg {
    return {
      typeUrl: "/side.lending.MsgSubmitPriceResponse",
      value: MsgSubmitPriceResponse.encode(message).finish()
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