//@ts-nocheck

import { GeneratedType, Registry } from '@cosmjs/proto-signing';
import {
  MsgSubmitBlockHeaderRequest,
  MsgSubmitDepositTransactionRequest,
  MsgSubmitWithdrawTransactionRequest,
  MsgUpdateQualifiedRelayersRequest,
  MsgWithdrawBitcoinRequest,
  MsgSubmitWithdrawSignaturesRequest,
  MsgSubmitWithdrawStatusRequest,
} from './tx';

export const registry: ReadonlyArray<[string, GeneratedType]> = [
  ['/side.btcbridge.MsgSubmitBlockHeaderRequest', MsgSubmitBlockHeaderRequest],
  ['/side.btcbridge.MsgSubmitDepositTransactionRequest', MsgSubmitDepositTransactionRequest],
  ['/side.btcbridge.MsgSubmitWithdrawTransactionRequest', MsgSubmitWithdrawTransactionRequest],
  ['/side.btcbridge.MsgUpdateQualifiedRelayersRequest', MsgUpdateQualifiedRelayersRequest],
  ['/side.btcbridge.MsgWithdrawBitcoinRequest', MsgWithdrawBitcoinRequest],
  ['/side.btcbridge.MsgSubmitWithdrawSignaturesRequest', MsgSubmitWithdrawSignaturesRequest],
  ['/side.btcbridge.MsgSubmitWithdrawStatusRequest', MsgSubmitWithdrawStatusRequest],
];

export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    submitBlockHeaders(value: MsgSubmitBlockHeaderRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
        value: MsgSubmitBlockHeaderRequest.encode(value).finish(),
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
        value: MsgSubmitDepositTransactionRequest.encode(value).finish(),
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
        value: MsgSubmitWithdrawTransactionRequest.encode(value).finish(),
      };
    },
    updateQualifiedRelayers(value: MsgUpdateQualifiedRelayersRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
        value: MsgUpdateQualifiedRelayersRequest.encode(value).finish(),
      };
    },
    withdrawBitcoin(value: MsgWithdrawBitcoinRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest',
        value: MsgWithdrawBitcoinRequest.encode(value).finish(),
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignaturesRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
        value: MsgSubmitWithdrawSignaturesRequest.encode(value).finish(),
      };
    },
    submitWithdrawStatus(value: MsgSubmitWithdrawStatusRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
        value: MsgSubmitWithdrawStatusRequest.encode(value).finish(),
      };
    },
  },
  withTypeUrl: {
    submitBlockHeaders(value: MsgSubmitBlockHeaderRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
        value,
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
        value,
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
        value,
      };
    },
    updateQualifiedRelayers(value: MsgUpdateQualifiedRelayersRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
        value,
      };
    },
    withdrawBitcoin(value: MsgWithdrawBitcoinRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest',
        value,
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignaturesRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
        value,
      };
    },
    submitWithdrawStatus(value: MsgSubmitWithdrawStatusRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
        value,
      };
    },
  },
  fromPartial: {
    submitBlockHeaders(value: MsgSubmitBlockHeaderRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitBlockHeaderRequest',
        value: MsgSubmitBlockHeaderRequest.fromPartial(value),
      };
    },
    submitDepositTransaction(value: MsgSubmitDepositTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitDepositTransactionRequest',
        value: MsgSubmitDepositTransactionRequest.fromPartial(value),
      };
    },
    submitWithdrawTransaction(value: MsgSubmitWithdrawTransactionRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawTransactionRequest',
        value: MsgSubmitWithdrawTransactionRequest.fromPartial(value),
      };
    },
    updateQualifiedRelayers(value: MsgUpdateQualifiedRelayersRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgUpdateQualifiedRelayersRequest',
        value: MsgUpdateQualifiedRelayersRequest.fromPartial(value),
      };
    },
    withdrawBitcoin(value: MsgWithdrawBitcoinRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgWithdrawBitcoinRequest',
        value: MsgWithdrawBitcoinRequest.fromPartial(value),
      };
    },
    submitWithdrawSignatures(value: MsgSubmitWithdrawSignaturesRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawSignaturesRequest',
        value: MsgSubmitWithdrawSignaturesRequest.fromPartial(value),
      };
    },
    submitWithdrawStatus(value: MsgSubmitWithdrawStatusRequest) {
      return {
        typeUrl: '/side.btcbridge.MsgSubmitWithdrawStatusRequest',
        value: MsgSubmitWithdrawStatusRequest.fromPartial(value),
      };
    },
  },
};
