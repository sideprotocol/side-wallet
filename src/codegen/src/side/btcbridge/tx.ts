//@ts-nocheck
import { BlockHeader, BlockHeaderAmino, BlockHeaderSDKType, BtcConsolidation, BtcConsolidationAmino, BtcConsolidationSDKType, RunesConsolidation, RunesConsolidationAmino, RunesConsolidationSDKType, DKGParticipant, DKGParticipantAmino, DKGParticipantSDKType } from "./btcbridge";
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
/** MsgSubmitFeeRate defines the Msg/SubmitFeeRate request type. */
export interface MsgSubmitFeeRate {
  sender: string;
  feeRate: bigint;
}
export interface MsgSubmitFeeRateProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitFeeRate";
  value: Uint8Array;
}
/** MsgSubmitFeeRate defines the Msg/SubmitFeeRate request type. */
export interface MsgSubmitFeeRateAmino {
  sender?: string;
  fee_rate?: string;
}
export interface MsgSubmitFeeRateAminoMsg {
  type: "/side.btcbridge.MsgSubmitFeeRate";
  value: MsgSubmitFeeRateAmino;
}
/** MsgSubmitFeeRate defines the Msg/SubmitFeeRate request type. */
export interface MsgSubmitFeeRateSDKType {
  sender: string;
  fee_rate: bigint;
}
/** MsgSubmitFeeRateResponse defines the Msg/SubmitFeeRate response type. */
export interface MsgSubmitFeeRateResponse {}
export interface MsgSubmitFeeRateResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitFeeRateResponse";
  value: Uint8Array;
}
/** MsgSubmitFeeRateResponse defines the Msg/SubmitFeeRate response type. */
export interface MsgSubmitFeeRateResponseAmino {}
export interface MsgSubmitFeeRateResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitFeeRateResponse";
  value: MsgSubmitFeeRateResponseAmino;
}
/** MsgSubmitFeeRateResponse defines the Msg/SubmitFeeRate response type. */
export interface MsgSubmitFeeRateResponseSDKType {}
/** MsgUpdateTrustedNonBtcRelayers defines the Msg/UpdateTrustedNonBtcRelayers request type. */
export interface MsgUpdateTrustedNonBtcRelayers {
  sender: string;
  relayers: string[];
}
export interface MsgUpdateTrustedNonBtcRelayersProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers";
  value: Uint8Array;
}
/** MsgUpdateTrustedNonBtcRelayers defines the Msg/UpdateTrustedNonBtcRelayers request type. */
export interface MsgUpdateTrustedNonBtcRelayersAmino {
  sender?: string;
  relayers?: string[];
}
export interface MsgUpdateTrustedNonBtcRelayersAminoMsg {
  type: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers";
  value: MsgUpdateTrustedNonBtcRelayersAmino;
}
/** MsgUpdateTrustedNonBtcRelayers defines the Msg/UpdateTrustedNonBtcRelayers request type. */
export interface MsgUpdateTrustedNonBtcRelayersSDKType {
  sender: string;
  relayers: string[];
}
/** MsgUpdateTrustedNonBtcRelayersResponse defines the Msg/UpdateTrustedNonBtcRelayers response type. */
export interface MsgUpdateTrustedNonBtcRelayersResponse {}
export interface MsgUpdateTrustedNonBtcRelayersResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayersResponse";
  value: Uint8Array;
}
/** MsgUpdateTrustedNonBtcRelayersResponse defines the Msg/UpdateTrustedNonBtcRelayers response type. */
export interface MsgUpdateTrustedNonBtcRelayersResponseAmino {}
export interface MsgUpdateTrustedNonBtcRelayersResponseAminoMsg {
  type: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayersResponse";
  value: MsgUpdateTrustedNonBtcRelayersResponseAmino;
}
/** MsgUpdateTrustedNonBtcRelayersResponse defines the Msg/UpdateTrustedNonBtcRelayers response type. */
export interface MsgUpdateTrustedNonBtcRelayersResponseSDKType {}
/** MsgUpdateTrustedOracles defines the Msg/UpdateTrustedOracles request type. */
export interface MsgUpdateTrustedOracles {
  sender: string;
  oracles: string[];
}
export interface MsgUpdateTrustedOraclesProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles";
  value: Uint8Array;
}
/** MsgUpdateTrustedOracles defines the Msg/UpdateTrustedOracles request type. */
export interface MsgUpdateTrustedOraclesAmino {
  sender?: string;
  oracles?: string[];
}
export interface MsgUpdateTrustedOraclesAminoMsg {
  type: "/side.btcbridge.MsgUpdateTrustedOracles";
  value: MsgUpdateTrustedOraclesAmino;
}
/** MsgUpdateTrustedOracles defines the Msg/UpdateTrustedOracles request type. */
export interface MsgUpdateTrustedOraclesSDKType {
  sender: string;
  oracles: string[];
}
/** MsgUpdateTrustedOraclesResponse defines the Msg/UpdateTrustedOracles response type. */
export interface MsgUpdateTrustedOraclesResponse {}
export interface MsgUpdateTrustedOraclesResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedOraclesResponse";
  value: Uint8Array;
}
/** MsgUpdateTrustedOraclesResponse defines the Msg/UpdateTrustedOracles response type. */
export interface MsgUpdateTrustedOraclesResponseAmino {}
export interface MsgUpdateTrustedOraclesResponseAminoMsg {
  type: "/side.btcbridge.MsgUpdateTrustedOraclesResponse";
  value: MsgUpdateTrustedOraclesResponseAmino;
}
/** MsgUpdateTrustedOraclesResponse defines the Msg/UpdateTrustedOracles response type. */
export interface MsgUpdateTrustedOraclesResponseSDKType {}
/** MsgWithdrawToBitcoin defines the Msg/WithdrawToBitcoin request type. */
export interface MsgWithdrawToBitcoin {
  sender: string;
  /** withdraw amount in satoshi, etc: 100000000sat = 1btc */
  amount: string;
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
}
export interface MsgWithdrawToBitcoinAminoMsg {
  type: "/side.btcbridge.MsgWithdrawToBitcoin";
  value: MsgWithdrawToBitcoinAmino;
}
/** MsgWithdrawToBitcoin defines the Msg/WithdrawToBitcoin request type. */
export interface MsgWithdrawToBitcoinSDKType {
  sender: string;
  amount: string;
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
/** MsgSubmitSignatures defines the Msg/SubmitSignatures request type. */
export interface MsgSubmitSignatures {
  sender: string;
  txid: string;
  psbt: string;
}
export interface MsgSubmitSignaturesProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitSignatures";
  value: Uint8Array;
}
/** MsgSubmitSignatures defines the Msg/SubmitSignatures request type. */
export interface MsgSubmitSignaturesAmino {
  sender?: string;
  txid?: string;
  psbt?: string;
}
export interface MsgSubmitSignaturesAminoMsg {
  type: "/side.btcbridge.MsgSubmitSignatures";
  value: MsgSubmitSignaturesAmino;
}
/** MsgSubmitSignatures defines the Msg/SubmitSignatures request type. */
export interface MsgSubmitSignaturesSDKType {
  sender: string;
  txid: string;
  psbt: string;
}
/** MsgSubmitSignaturesResponse defines the Msg/SubmitSignatures response type. */
export interface MsgSubmitSignaturesResponse {}
export interface MsgSubmitSignaturesResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgSubmitSignaturesResponse";
  value: Uint8Array;
}
/** MsgSubmitSignaturesResponse defines the Msg/SubmitSignatures response type. */
export interface MsgSubmitSignaturesResponseAmino {}
export interface MsgSubmitSignaturesResponseAminoMsg {
  type: "/side.btcbridge.MsgSubmitSignaturesResponse";
  value: MsgSubmitSignaturesResponseAmino;
}
/** MsgSubmitSignaturesResponse defines the Msg/SubmitSignatures response type. */
export interface MsgSubmitSignaturesResponseSDKType {}
/** MsgConsolidateVaults is the Msg/ConsolidateVaults request type. */
export interface MsgConsolidateVaults {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** vault version */
  vaultVersion: bigint;
  /** fee rate */
  feeRate: bigint;
  /** btc consolidation */
  btcConsolidation?: BtcConsolidation;
  /** runes consolidations */
  runesConsolidations: RunesConsolidation[];
}
export interface MsgConsolidateVaultsProtoMsg {
  typeUrl: "/side.btcbridge.MsgConsolidateVaults";
  value: Uint8Array;
}
/** MsgConsolidateVaults is the Msg/ConsolidateVaults request type. */
export interface MsgConsolidateVaultsAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** vault version */
  vault_version?: string;
  /** fee rate */
  fee_rate?: string;
  /** btc consolidation */
  btc_consolidation?: BtcConsolidationAmino;
  /** runes consolidations */
  runes_consolidations?: RunesConsolidationAmino[];
}
export interface MsgConsolidateVaultsAminoMsg {
  type: "/side.btcbridge.MsgConsolidateVaults";
  value: MsgConsolidateVaultsAmino;
}
/** MsgConsolidateVaults is the Msg/ConsolidateVaults request type. */
export interface MsgConsolidateVaultsSDKType {
  authority: string;
  vault_version: bigint;
  fee_rate: bigint;
  btc_consolidation?: BtcConsolidationSDKType;
  runes_consolidations: RunesConsolidationSDKType[];
}
/** MsgConsolidateVaultsResponse defines the Msg/ConsolidateVaults response type. */
export interface MsgConsolidateVaultsResponse {}
export interface MsgConsolidateVaultsResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgConsolidateVaultsResponse";
  value: Uint8Array;
}
/** MsgConsolidateVaultsResponse defines the Msg/ConsolidateVaults response type. */
export interface MsgConsolidateVaultsResponseAmino {}
export interface MsgConsolidateVaultsResponseAminoMsg {
  type: "/side.btcbridge.MsgConsolidateVaultsResponse";
  value: MsgConsolidateVaultsResponseAmino;
}
/** MsgConsolidateVaultsResponse defines the Msg/ConsolidateVaults response type. */
export interface MsgConsolidateVaultsResponseSDKType {}
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
  /** indicates if disabling bridge functionalities including deposit and withdrawal */
  disableBridge: boolean;
  /** indicates if transferring the current vaults to the newly generated vaults when the DKG request is completed */
  enableTransfer: boolean;
  /** target number of the UTXOs to be transferred each time */
  targetUtxoNum: number;
  /** fee rate for vault transfer */
  feeRate: string;
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
  /** indicates if disabling bridge functionalities including deposit and withdrawal */
  disable_bridge?: boolean;
  /** indicates if transferring the current vaults to the newly generated vaults when the DKG request is completed */
  enable_transfer?: boolean;
  /** target number of the UTXOs to be transferred each time */
  target_utxo_num?: number;
  /** fee rate for vault transfer */
  fee_rate?: string;
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
  disable_bridge: boolean;
  enable_transfer: boolean;
  target_utxo_num: number;
  fee_rate: string;
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
/** MsgTransferVault is the Msg/TransferVault request type. */
export interface MsgTransferVault {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** version of the source vault */
  sourceVersion: bigint;
  /** version of the destination vault */
  destVersion: bigint;
  /** asset type */
  assetType: AssetType;
  /** a set of optional pre-built PSBTs to perform the asset transfer */
  psbts: string[];
  /** target number of the UTXOs to be transferred; only take effect when psbt not provided */
  targetUtxoNum: number;
  /** fee rate; only take effect when psbt not provided */
  feeRate: string;
}
export interface MsgTransferVaultProtoMsg {
  typeUrl: "/side.btcbridge.MsgTransferVault";
  value: Uint8Array;
}
/** MsgTransferVault is the Msg/TransferVault request type. */
export interface MsgTransferVaultAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority?: string;
  /** version of the source vault */
  source_version?: string;
  /** version of the destination vault */
  dest_version?: string;
  /** asset type */
  asset_type?: AssetType;
  /** a set of optional pre-built PSBTs to perform the asset transfer */
  psbts?: string[];
  /** target number of the UTXOs to be transferred; only take effect when psbt not provided */
  target_utxo_num?: number;
  /** fee rate; only take effect when psbt not provided */
  fee_rate?: string;
}
export interface MsgTransferVaultAminoMsg {
  type: "/side.btcbridge.MsgTransferVault";
  value: MsgTransferVaultAmino;
}
/** MsgTransferVault is the Msg/TransferVault request type. */
export interface MsgTransferVaultSDKType {
  authority: string;
  source_version: bigint;
  dest_version: bigint;
  asset_type: AssetType;
  psbts: string[];
  target_utxo_num: number;
  fee_rate: string;
}
/** MsgTransferVaultResponse defines the Msg/TransferVault response type. */
export interface MsgTransferVaultResponse {}
export interface MsgTransferVaultResponseProtoMsg {
  typeUrl: "/side.btcbridge.MsgTransferVaultResponse";
  value: Uint8Array;
}
/** MsgTransferVaultResponse defines the Msg/TransferVault response type. */
export interface MsgTransferVaultResponseAmino {}
export interface MsgTransferVaultResponseAminoMsg {
  type: "/side.btcbridge.MsgTransferVaultResponse";
  value: MsgTransferVaultResponseAmino;
}
/** MsgTransferVaultResponse defines the Msg/TransferVault response type. */
export interface MsgTransferVaultResponseSDKType {}
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
function createBaseMsgSubmitFeeRate(): MsgSubmitFeeRate {
  return {
    sender: "",
    feeRate: BigInt(0)
  };
}
export const MsgSubmitFeeRate = {
  typeUrl: "/side.btcbridge.MsgSubmitFeeRate",
  encode(message: MsgSubmitFeeRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.feeRate !== BigInt(0)) {
      writer.uint32(16).int64(message.feeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitFeeRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitFeeRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.feeRate = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitFeeRate>): MsgSubmitFeeRate {
    const message = createBaseMsgSubmitFeeRate();
    message.sender = object.sender ?? "";
    message.feeRate = object.feeRate !== undefined && object.feeRate !== null ? BigInt(object.feeRate.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgSubmitFeeRateAmino): MsgSubmitFeeRate {
    const message = createBaseMsgSubmitFeeRate();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = BigInt(object.fee_rate);
    }
    return message;
  },
  toAmino(message: MsgSubmitFeeRate): MsgSubmitFeeRateAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.fee_rate = message.feeRate !== BigInt(0) ? message.feeRate.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitFeeRateAminoMsg): MsgSubmitFeeRate {
    return MsgSubmitFeeRate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitFeeRateProtoMsg): MsgSubmitFeeRate {
    return MsgSubmitFeeRate.decode(message.value);
  },
  toProto(message: MsgSubmitFeeRate): Uint8Array {
    return MsgSubmitFeeRate.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitFeeRate): MsgSubmitFeeRateProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitFeeRate",
      value: MsgSubmitFeeRate.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitFeeRateResponse(): MsgSubmitFeeRateResponse {
  return {};
}
export const MsgSubmitFeeRateResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitFeeRateResponse",
  encode(_: MsgSubmitFeeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitFeeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitFeeRateResponse();
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
  fromPartial(_: Partial<MsgSubmitFeeRateResponse>): MsgSubmitFeeRateResponse {
    const message = createBaseMsgSubmitFeeRateResponse();
    return message;
  },
  fromAmino(_: MsgSubmitFeeRateResponseAmino): MsgSubmitFeeRateResponse {
    const message = createBaseMsgSubmitFeeRateResponse();
    return message;
  },
  toAmino(_: MsgSubmitFeeRateResponse): MsgSubmitFeeRateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitFeeRateResponseAminoMsg): MsgSubmitFeeRateResponse {
    return MsgSubmitFeeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitFeeRateResponseProtoMsg): MsgSubmitFeeRateResponse {
    return MsgSubmitFeeRateResponse.decode(message.value);
  },
  toProto(message: MsgSubmitFeeRateResponse): Uint8Array {
    return MsgSubmitFeeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitFeeRateResponse): MsgSubmitFeeRateResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitFeeRateResponse",
      value: MsgSubmitFeeRateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTrustedNonBtcRelayers(): MsgUpdateTrustedNonBtcRelayers {
  return {
    sender: "",
    relayers: []
  };
}
export const MsgUpdateTrustedNonBtcRelayers = {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
  encode(message: MsgUpdateTrustedNonBtcRelayers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.relayers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTrustedNonBtcRelayers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTrustedNonBtcRelayers();
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
  fromPartial(object: Partial<MsgUpdateTrustedNonBtcRelayers>): MsgUpdateTrustedNonBtcRelayers {
    const message = createBaseMsgUpdateTrustedNonBtcRelayers();
    message.sender = object.sender ?? "";
    message.relayers = object.relayers?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgUpdateTrustedNonBtcRelayersAmino): MsgUpdateTrustedNonBtcRelayers {
    const message = createBaseMsgUpdateTrustedNonBtcRelayers();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.relayers = object.relayers?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgUpdateTrustedNonBtcRelayers): MsgUpdateTrustedNonBtcRelayersAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.relayers) {
      obj.relayers = message.relayers.map(e => e);
    } else {
      obj.relayers = message.relayers;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTrustedNonBtcRelayersAminoMsg): MsgUpdateTrustedNonBtcRelayers {
    return MsgUpdateTrustedNonBtcRelayers.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTrustedNonBtcRelayersProtoMsg): MsgUpdateTrustedNonBtcRelayers {
    return MsgUpdateTrustedNonBtcRelayers.decode(message.value);
  },
  toProto(message: MsgUpdateTrustedNonBtcRelayers): Uint8Array {
    return MsgUpdateTrustedNonBtcRelayers.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTrustedNonBtcRelayers): MsgUpdateTrustedNonBtcRelayersProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayers",
      value: MsgUpdateTrustedNonBtcRelayers.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTrustedNonBtcRelayersResponse(): MsgUpdateTrustedNonBtcRelayersResponse {
  return {};
}
export const MsgUpdateTrustedNonBtcRelayersResponse = {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayersResponse",
  encode(_: MsgUpdateTrustedNonBtcRelayersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTrustedNonBtcRelayersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTrustedNonBtcRelayersResponse();
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
  fromPartial(_: Partial<MsgUpdateTrustedNonBtcRelayersResponse>): MsgUpdateTrustedNonBtcRelayersResponse {
    const message = createBaseMsgUpdateTrustedNonBtcRelayersResponse();
    return message;
  },
  fromAmino(_: MsgUpdateTrustedNonBtcRelayersResponseAmino): MsgUpdateTrustedNonBtcRelayersResponse {
    const message = createBaseMsgUpdateTrustedNonBtcRelayersResponse();
    return message;
  },
  toAmino(_: MsgUpdateTrustedNonBtcRelayersResponse): MsgUpdateTrustedNonBtcRelayersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTrustedNonBtcRelayersResponseAminoMsg): MsgUpdateTrustedNonBtcRelayersResponse {
    return MsgUpdateTrustedNonBtcRelayersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTrustedNonBtcRelayersResponseProtoMsg): MsgUpdateTrustedNonBtcRelayersResponse {
    return MsgUpdateTrustedNonBtcRelayersResponse.decode(message.value);
  },
  toProto(message: MsgUpdateTrustedNonBtcRelayersResponse): Uint8Array {
    return MsgUpdateTrustedNonBtcRelayersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTrustedNonBtcRelayersResponse): MsgUpdateTrustedNonBtcRelayersResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateTrustedNonBtcRelayersResponse",
      value: MsgUpdateTrustedNonBtcRelayersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTrustedOracles(): MsgUpdateTrustedOracles {
  return {
    sender: "",
    oracles: []
  };
}
export const MsgUpdateTrustedOracles = {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles",
  encode(message: MsgUpdateTrustedOracles, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.oracles) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTrustedOracles {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTrustedOracles();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.oracles.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateTrustedOracles>): MsgUpdateTrustedOracles {
    const message = createBaseMsgUpdateTrustedOracles();
    message.sender = object.sender ?? "";
    message.oracles = object.oracles?.map(e => e) || [];
    return message;
  },
  fromAmino(object: MsgUpdateTrustedOraclesAmino): MsgUpdateTrustedOracles {
    const message = createBaseMsgUpdateTrustedOracles();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.oracles = object.oracles?.map(e => e) || [];
    return message;
  },
  toAmino(message: MsgUpdateTrustedOracles): MsgUpdateTrustedOraclesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.oracles) {
      obj.oracles = message.oracles.map(e => e);
    } else {
      obj.oracles = message.oracles;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTrustedOraclesAminoMsg): MsgUpdateTrustedOracles {
    return MsgUpdateTrustedOracles.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTrustedOraclesProtoMsg): MsgUpdateTrustedOracles {
    return MsgUpdateTrustedOracles.decode(message.value);
  },
  toProto(message: MsgUpdateTrustedOracles): Uint8Array {
    return MsgUpdateTrustedOracles.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTrustedOracles): MsgUpdateTrustedOraclesProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateTrustedOracles",
      value: MsgUpdateTrustedOracles.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTrustedOraclesResponse(): MsgUpdateTrustedOraclesResponse {
  return {};
}
export const MsgUpdateTrustedOraclesResponse = {
  typeUrl: "/side.btcbridge.MsgUpdateTrustedOraclesResponse",
  encode(_: MsgUpdateTrustedOraclesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateTrustedOraclesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTrustedOraclesResponse();
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
  fromPartial(_: Partial<MsgUpdateTrustedOraclesResponse>): MsgUpdateTrustedOraclesResponse {
    const message = createBaseMsgUpdateTrustedOraclesResponse();
    return message;
  },
  fromAmino(_: MsgUpdateTrustedOraclesResponseAmino): MsgUpdateTrustedOraclesResponse {
    const message = createBaseMsgUpdateTrustedOraclesResponse();
    return message;
  },
  toAmino(_: MsgUpdateTrustedOraclesResponse): MsgUpdateTrustedOraclesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTrustedOraclesResponseAminoMsg): MsgUpdateTrustedOraclesResponse {
    return MsgUpdateTrustedOraclesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTrustedOraclesResponseProtoMsg): MsgUpdateTrustedOraclesResponse {
    return MsgUpdateTrustedOraclesResponse.decode(message.value);
  },
  toProto(message: MsgUpdateTrustedOraclesResponse): Uint8Array {
    return MsgUpdateTrustedOraclesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTrustedOraclesResponse): MsgUpdateTrustedOraclesResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgUpdateTrustedOraclesResponse",
      value: MsgUpdateTrustedOraclesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawToBitcoin(): MsgWithdrawToBitcoin {
  return {
    sender: "",
    amount: ""
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
    return message;
  },
  toAmino(message: MsgWithdrawToBitcoin): MsgWithdrawToBitcoinAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.amount = message.amount === "" ? undefined : message.amount;
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
function createBaseMsgSubmitSignatures(): MsgSubmitSignatures {
  return {
    sender: "",
    txid: "",
    psbt: ""
  };
}
export const MsgSubmitSignatures = {
  typeUrl: "/side.btcbridge.MsgSubmitSignatures",
  encode(message: MsgSubmitSignatures, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitSignatures {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitSignatures();
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
  fromPartial(object: Partial<MsgSubmitSignatures>): MsgSubmitSignatures {
    const message = createBaseMsgSubmitSignatures();
    message.sender = object.sender ?? "";
    message.txid = object.txid ?? "";
    message.psbt = object.psbt ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitSignaturesAmino): MsgSubmitSignatures {
    const message = createBaseMsgSubmitSignatures();
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
  toAmino(message: MsgSubmitSignatures): MsgSubmitSignaturesAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.txid = message.txid === "" ? undefined : message.txid;
    obj.psbt = message.psbt === "" ? undefined : message.psbt;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitSignaturesAminoMsg): MsgSubmitSignatures {
    return MsgSubmitSignatures.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitSignaturesProtoMsg): MsgSubmitSignatures {
    return MsgSubmitSignatures.decode(message.value);
  },
  toProto(message: MsgSubmitSignatures): Uint8Array {
    return MsgSubmitSignatures.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitSignatures): MsgSubmitSignaturesProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitSignatures",
      value: MsgSubmitSignatures.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitSignaturesResponse(): MsgSubmitSignaturesResponse {
  return {};
}
export const MsgSubmitSignaturesResponse = {
  typeUrl: "/side.btcbridge.MsgSubmitSignaturesResponse",
  encode(_: MsgSubmitSignaturesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSubmitSignaturesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitSignaturesResponse();
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
  fromPartial(_: Partial<MsgSubmitSignaturesResponse>): MsgSubmitSignaturesResponse {
    const message = createBaseMsgSubmitSignaturesResponse();
    return message;
  },
  fromAmino(_: MsgSubmitSignaturesResponseAmino): MsgSubmitSignaturesResponse {
    const message = createBaseMsgSubmitSignaturesResponse();
    return message;
  },
  toAmino(_: MsgSubmitSignaturesResponse): MsgSubmitSignaturesResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitSignaturesResponseAminoMsg): MsgSubmitSignaturesResponse {
    return MsgSubmitSignaturesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitSignaturesResponseProtoMsg): MsgSubmitSignaturesResponse {
    return MsgSubmitSignaturesResponse.decode(message.value);
  },
  toProto(message: MsgSubmitSignaturesResponse): Uint8Array {
    return MsgSubmitSignaturesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitSignaturesResponse): MsgSubmitSignaturesResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgSubmitSignaturesResponse",
      value: MsgSubmitSignaturesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConsolidateVaults(): MsgConsolidateVaults {
  return {
    authority: "",
    vaultVersion: BigInt(0),
    feeRate: BigInt(0),
    btcConsolidation: undefined,
    runesConsolidations: []
  };
}
export const MsgConsolidateVaults = {
  typeUrl: "/side.btcbridge.MsgConsolidateVaults",
  encode(message: MsgConsolidateVaults, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.vaultVersion !== BigInt(0)) {
      writer.uint32(16).uint64(message.vaultVersion);
    }
    if (message.feeRate !== BigInt(0)) {
      writer.uint32(24).int64(message.feeRate);
    }
    if (message.btcConsolidation !== undefined) {
      BtcConsolidation.encode(message.btcConsolidation, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.runesConsolidations) {
      RunesConsolidation.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConsolidateVaults {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsolidateVaults();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.vaultVersion = reader.uint64();
          break;
        case 3:
          message.feeRate = reader.int64();
          break;
        case 4:
          message.btcConsolidation = BtcConsolidation.decode(reader, reader.uint32());
          break;
        case 5:
          message.runesConsolidations.push(RunesConsolidation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgConsolidateVaults>): MsgConsolidateVaults {
    const message = createBaseMsgConsolidateVaults();
    message.authority = object.authority ?? "";
    message.vaultVersion = object.vaultVersion !== undefined && object.vaultVersion !== null ? BigInt(object.vaultVersion.toString()) : BigInt(0);
    message.feeRate = object.feeRate !== undefined && object.feeRate !== null ? BigInt(object.feeRate.toString()) : BigInt(0);
    message.btcConsolidation = object.btcConsolidation !== undefined && object.btcConsolidation !== null ? BtcConsolidation.fromPartial(object.btcConsolidation) : undefined;
    message.runesConsolidations = object.runesConsolidations?.map(e => RunesConsolidation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgConsolidateVaultsAmino): MsgConsolidateVaults {
    const message = createBaseMsgConsolidateVaults();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.vault_version !== undefined && object.vault_version !== null) {
      message.vaultVersion = BigInt(object.vault_version);
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = BigInt(object.fee_rate);
    }
    if (object.btc_consolidation !== undefined && object.btc_consolidation !== null) {
      message.btcConsolidation = BtcConsolidation.fromAmino(object.btc_consolidation);
    }
    message.runesConsolidations = object.runes_consolidations?.map(e => RunesConsolidation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgConsolidateVaults): MsgConsolidateVaultsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.vault_version = message.vaultVersion !== BigInt(0) ? message.vaultVersion.toString() : undefined;
    obj.fee_rate = message.feeRate !== BigInt(0) ? message.feeRate.toString() : undefined;
    obj.btc_consolidation = message.btcConsolidation ? BtcConsolidation.toAmino(message.btcConsolidation) : undefined;
    if (message.runesConsolidations) {
      obj.runes_consolidations = message.runesConsolidations.map(e => e ? RunesConsolidation.toAmino(e) : undefined);
    } else {
      obj.runes_consolidations = message.runesConsolidations;
    }
    return obj;
  },
  fromAminoMsg(object: MsgConsolidateVaultsAminoMsg): MsgConsolidateVaults {
    return MsgConsolidateVaults.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsolidateVaultsProtoMsg): MsgConsolidateVaults {
    return MsgConsolidateVaults.decode(message.value);
  },
  toProto(message: MsgConsolidateVaults): Uint8Array {
    return MsgConsolidateVaults.encode(message).finish();
  },
  toProtoMsg(message: MsgConsolidateVaults): MsgConsolidateVaultsProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgConsolidateVaults",
      value: MsgConsolidateVaults.encode(message).finish()
    };
  }
};
function createBaseMsgConsolidateVaultsResponse(): MsgConsolidateVaultsResponse {
  return {};
}
export const MsgConsolidateVaultsResponse = {
  typeUrl: "/side.btcbridge.MsgConsolidateVaultsResponse",
  encode(_: MsgConsolidateVaultsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgConsolidateVaultsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsolidateVaultsResponse();
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
  fromPartial(_: Partial<MsgConsolidateVaultsResponse>): MsgConsolidateVaultsResponse {
    const message = createBaseMsgConsolidateVaultsResponse();
    return message;
  },
  fromAmino(_: MsgConsolidateVaultsResponseAmino): MsgConsolidateVaultsResponse {
    const message = createBaseMsgConsolidateVaultsResponse();
    return message;
  },
  toAmino(_: MsgConsolidateVaultsResponse): MsgConsolidateVaultsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConsolidateVaultsResponseAminoMsg): MsgConsolidateVaultsResponse {
    return MsgConsolidateVaultsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsolidateVaultsResponseProtoMsg): MsgConsolidateVaultsResponse {
    return MsgConsolidateVaultsResponse.decode(message.value);
  },
  toProto(message: MsgConsolidateVaultsResponse): Uint8Array {
    return MsgConsolidateVaultsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConsolidateVaultsResponse): MsgConsolidateVaultsResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgConsolidateVaultsResponse",
      value: MsgConsolidateVaultsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgInitiateDKG(): MsgInitiateDKG {
  return {
    authority: "",
    participants: [],
    threshold: 0,
    vaultTypes: [],
    disableBridge: false,
    enableTransfer: false,
    targetUtxoNum: 0,
    feeRate: ""
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
    if (message.disableBridge === true) {
      writer.uint32(40).bool(message.disableBridge);
    }
    if (message.enableTransfer === true) {
      writer.uint32(48).bool(message.enableTransfer);
    }
    if (message.targetUtxoNum !== 0) {
      writer.uint32(56).uint32(message.targetUtxoNum);
    }
    if (message.feeRate !== "") {
      writer.uint32(66).string(message.feeRate);
    }
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
        case 5:
          message.disableBridge = reader.bool();
          break;
        case 6:
          message.enableTransfer = reader.bool();
          break;
        case 7:
          message.targetUtxoNum = reader.uint32();
          break;
        case 8:
          message.feeRate = reader.string();
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
    message.disableBridge = object.disableBridge ?? false;
    message.enableTransfer = object.enableTransfer ?? false;
    message.targetUtxoNum = object.targetUtxoNum ?? 0;
    message.feeRate = object.feeRate ?? "";
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
    if (object.disable_bridge !== undefined && object.disable_bridge !== null) {
      message.disableBridge = object.disable_bridge;
    }
    if (object.enable_transfer !== undefined && object.enable_transfer !== null) {
      message.enableTransfer = object.enable_transfer;
    }
    if (object.target_utxo_num !== undefined && object.target_utxo_num !== null) {
      message.targetUtxoNum = object.target_utxo_num;
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = object.fee_rate;
    }
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
    obj.disable_bridge = message.disableBridge === false ? undefined : message.disableBridge;
    obj.enable_transfer = message.enableTransfer === false ? undefined : message.enableTransfer;
    obj.target_utxo_num = message.targetUtxoNum === 0 ? undefined : message.targetUtxoNum;
    obj.fee_rate = message.feeRate === "" ? undefined : message.feeRate;
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
function createBaseMsgTransferVault(): MsgTransferVault {
  return {
    authority: "",
    sourceVersion: BigInt(0),
    destVersion: BigInt(0),
    assetType: 0,
    psbts: [],
    targetUtxoNum: 0,
    feeRate: ""
  };
}
export const MsgTransferVault = {
  typeUrl: "/side.btcbridge.MsgTransferVault",
  encode(message: MsgTransferVault, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.sourceVersion !== BigInt(0)) {
      writer.uint32(16).uint64(message.sourceVersion);
    }
    if (message.destVersion !== BigInt(0)) {
      writer.uint32(24).uint64(message.destVersion);
    }
    if (message.assetType !== 0) {
      writer.uint32(32).int32(message.assetType);
    }
    for (const v of message.psbts) {
      writer.uint32(42).string(v!);
    }
    if (message.targetUtxoNum !== 0) {
      writer.uint32(48).uint32(message.targetUtxoNum);
    }
    if (message.feeRate !== "") {
      writer.uint32(58).string(message.feeRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferVault {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferVault();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.sourceVersion = reader.uint64();
          break;
        case 3:
          message.destVersion = reader.uint64();
          break;
        case 4:
          message.assetType = reader.int32() as any;
          break;
        case 5:
          message.psbts.push(reader.string());
          break;
        case 6:
          message.targetUtxoNum = reader.uint32();
          break;
        case 7:
          message.feeRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTransferVault>): MsgTransferVault {
    const message = createBaseMsgTransferVault();
    message.authority = object.authority ?? "";
    message.sourceVersion = object.sourceVersion !== undefined && object.sourceVersion !== null ? BigInt(object.sourceVersion.toString()) : BigInt(0);
    message.destVersion = object.destVersion !== undefined && object.destVersion !== null ? BigInt(object.destVersion.toString()) : BigInt(0);
    message.assetType = object.assetType ?? 0;
    message.psbts = object.psbts?.map(e => e) || [];
    message.targetUtxoNum = object.targetUtxoNum ?? 0;
    message.feeRate = object.feeRate ?? "";
    return message;
  },
  fromAmino(object: MsgTransferVaultAmino): MsgTransferVault {
    const message = createBaseMsgTransferVault();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.source_version !== undefined && object.source_version !== null) {
      message.sourceVersion = BigInt(object.source_version);
    }
    if (object.dest_version !== undefined && object.dest_version !== null) {
      message.destVersion = BigInt(object.dest_version);
    }
    if (object.asset_type !== undefined && object.asset_type !== null) {
      message.assetType = object.asset_type;
    }
    message.psbts = object.psbts?.map(e => e) || [];
    if (object.target_utxo_num !== undefined && object.target_utxo_num !== null) {
      message.targetUtxoNum = object.target_utxo_num;
    }
    if (object.fee_rate !== undefined && object.fee_rate !== null) {
      message.feeRate = object.fee_rate;
    }
    return message;
  },
  toAmino(message: MsgTransferVault): MsgTransferVaultAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.source_version = message.sourceVersion !== BigInt(0) ? message.sourceVersion.toString() : undefined;
    obj.dest_version = message.destVersion !== BigInt(0) ? message.destVersion.toString() : undefined;
    obj.asset_type = message.assetType === 0 ? undefined : message.assetType;
    if (message.psbts) {
      obj.psbts = message.psbts.map(e => e);
    } else {
      obj.psbts = message.psbts;
    }
    obj.target_utxo_num = message.targetUtxoNum === 0 ? undefined : message.targetUtxoNum;
    obj.fee_rate = message.feeRate === "" ? undefined : message.feeRate;
    return obj;
  },
  fromAminoMsg(object: MsgTransferVaultAminoMsg): MsgTransferVault {
    return MsgTransferVault.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTransferVaultProtoMsg): MsgTransferVault {
    return MsgTransferVault.decode(message.value);
  },
  toProto(message: MsgTransferVault): Uint8Array {
    return MsgTransferVault.encode(message).finish();
  },
  toProtoMsg(message: MsgTransferVault): MsgTransferVaultProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgTransferVault",
      value: MsgTransferVault.encode(message).finish()
    };
  }
};
function createBaseMsgTransferVaultResponse(): MsgTransferVaultResponse {
  return {};
}
export const MsgTransferVaultResponse = {
  typeUrl: "/side.btcbridge.MsgTransferVaultResponse",
  encode(_: MsgTransferVaultResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgTransferVaultResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferVaultResponse();
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
  fromPartial(_: Partial<MsgTransferVaultResponse>): MsgTransferVaultResponse {
    const message = createBaseMsgTransferVaultResponse();
    return message;
  },
  fromAmino(_: MsgTransferVaultResponseAmino): MsgTransferVaultResponse {
    const message = createBaseMsgTransferVaultResponse();
    return message;
  },
  toAmino(_: MsgTransferVaultResponse): MsgTransferVaultResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgTransferVaultResponseAminoMsg): MsgTransferVaultResponse {
    return MsgTransferVaultResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTransferVaultResponseProtoMsg): MsgTransferVaultResponse {
    return MsgTransferVaultResponse.decode(message.value);
  },
  toProto(message: MsgTransferVaultResponse): Uint8Array {
    return MsgTransferVaultResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgTransferVaultResponse): MsgTransferVaultResponseProtoMsg {
    return {
      typeUrl: "/side.btcbridge.MsgTransferVaultResponse",
      value: MsgTransferVaultResponse.encode(message).finish()
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