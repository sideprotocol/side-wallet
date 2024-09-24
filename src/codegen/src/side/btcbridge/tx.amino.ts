//@ts-nocheck
import { MsgSubmitBlockHeaders, MsgUpdateNonBtcRelayers, MsgSubmitDepositTransaction, MsgSubmitWithdrawTransaction, MsgWithdrawToBitcoin, MsgSubmitWithdrawSignatures, MsgInitiateDKG, MsgCompleteDKG, MsgUpdateParams } from './tx';
export const AminoConverter = {
  '/side.btcbridge.MsgSubmitBlockHeaders': {
    aminoType: '/side.btcbridge.MsgSubmitBlockHeaders',
    toAmino: MsgSubmitBlockHeaders.toAmino,
    fromAmino: MsgSubmitBlockHeaders.fromAmino
  },
  '/side.btcbridge.MsgUpdateNonBtcRelayers': {
    aminoType: '/side.btcbridge.MsgUpdateNonBtcRelayers',
    toAmino: MsgUpdateNonBtcRelayers.toAmino,
    fromAmino: MsgUpdateNonBtcRelayers.fromAmino
  },
  '/side.btcbridge.MsgSubmitDepositTransaction': {
    aminoType: '/side.btcbridge.MsgSubmitDepositTransaction',
    toAmino: MsgSubmitDepositTransaction.toAmino,
    fromAmino: MsgSubmitDepositTransaction.fromAmino
  },
  '/side.btcbridge.MsgSubmitWithdrawTransaction': {
    aminoType: '/side.btcbridge.MsgSubmitWithdrawTransaction',
    toAmino: MsgSubmitWithdrawTransaction.toAmino,
    fromAmino: MsgSubmitWithdrawTransaction.fromAmino
  },
  '/side.btcbridge.MsgWithdrawToBitcoin': {
    aminoType: '/side.btcbridge.MsgWithdrawToBitcoin',
    toAmino: MsgWithdrawToBitcoin.toAmino,
    fromAmino: MsgWithdrawToBitcoin.fromAmino
  },
  '/side.btcbridge.MsgSubmitWithdrawSignatures': {
    aminoType: '/side.btcbridge.MsgSubmitWithdrawSignatures',
    toAmino: MsgSubmitWithdrawSignatures.toAmino,
    fromAmino: MsgSubmitWithdrawSignatures.fromAmino
  },
  '/side.btcbridge.MsgInitiateDKG': {
    aminoType: '/side.btcbridge.MsgInitiateDKG',
    toAmino: MsgInitiateDKG.toAmino,
    fromAmino: MsgInitiateDKG.fromAmino
  },
  '/side.btcbridge.MsgCompleteDKG': {
    aminoType: '/side.btcbridge.MsgCompleteDKG',
    toAmino: MsgCompleteDKG.toAmino,
    fromAmino: MsgCompleteDKG.fromAmino
  },
  '/side.btcbridge.MsgUpdateParams': {
    aminoType: '/side.btcbridge.MsgUpdateParams',
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};