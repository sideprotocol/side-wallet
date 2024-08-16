//@ts-nocheck
import { MsgSubmitBlockHeaderRequest, MsgSubmitDepositTransactionRequest, MsgSubmitWithdrawTransactionRequest, MsgUpdateQualifiedRelayersRequest, MsgWithdrawBitcoinRequest, MsgSubmitWithdrawSignaturesRequest, MsgSubmitWithdrawStatusRequest } from './tx';
export const AminoConverter = {
  '/side.btcbridge.MsgSubmitBlockHeaderRequest': {
    aminoType: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
    toAmino: MsgSubmitBlockHeaderRequest.toAmino,
    fromAmino: MsgSubmitBlockHeaderRequest.fromAmino
  },
  '/side.btcbridge.MsgSubmitDepositTransactionRequest': {
    aminoType: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
    toAmino: MsgSubmitDepositTransactionRequest.toAmino,
    fromAmino: MsgSubmitDepositTransactionRequest.fromAmino
  },
  '/side.btcbridge.MsgSubmitWithdrawTransactionRequest': {
    aminoType: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
    toAmino: MsgSubmitWithdrawTransactionRequest.toAmino,
    fromAmino: MsgSubmitWithdrawTransactionRequest.fromAmino
  },
  '/side.btcbridge.MsgUpdateQualifiedRelayersRequest': {
    aminoType: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
    toAmino: MsgUpdateQualifiedRelayersRequest.toAmino,
    fromAmino: MsgUpdateQualifiedRelayersRequest.fromAmino
  },
  '/side.btcbridge.MsgWithdrawBitcoinRequest': {
    aminoType: '/side.btcbridge.MsgWithdrawBitcoinRequest',
    toAmino: MsgWithdrawBitcoinRequest.toAmino,
    fromAmino: MsgWithdrawBitcoinRequest.fromAmino
  },
  '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest': {
    aminoType: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
    toAmino: MsgSubmitWithdrawSignaturesRequest.toAmino,
    fromAmino: MsgSubmitWithdrawSignaturesRequest.fromAmino
  },
  '/side.btcbridge.MsgSubmitWithdrawStatusRequest': {
    aminoType: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
    toAmino: MsgSubmitWithdrawStatusRequest.toAmino,
    fromAmino: MsgSubmitWithdrawStatusRequest.fromAmino
  }
};