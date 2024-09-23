import BigNumber from 'bignumber.js';
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { Any } from 'cosmjs-types/google/protobuf/any';

import { AminoConverter } from '@/codegen/src/side/btcbridge/tx.amino';
import * as sideBTCBridgeRegistry from '@/codegen/src/side/btcbridge/tx.registry';
import {
  SIDEREST_URL_MAINNET,
  SIDEREST_URL_TESTNET,
  SIDE_CHAINID_MAINNET,
  SIDE_CHAINID_TESTNET
} from '@/shared/constant';
import { CosmosTransaction, CosmosTxResponse, NetworkType } from '@/shared/types';
import services from '@/ui/services';
import { useWallet } from '@/ui/utils';
import { errorPatterns } from '@/ui/utils/errorPatterns';
import { makeSignDoc as makeSignDocAmino } from '@cosmjs/amino';
import { serializeSignDoc } from '@cosmjs/amino/build/signdoc';
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate';
import { wasmTypes } from '@cosmjs/cosmwasm-stargate/build/modules';
import { fromBase64, fromHex, toBase64 } from '@cosmjs/encoding';
import { EncodeObject, GeneratedType, Registry, TxBodyEncodeObject, makeAuthInfoBytes } from '@cosmjs/proto-signing';
import {
  AminoTypes,
  createDefaultAminoConverters,
  createIbcAminoConverters,
  defaultRegistryTypes
} from '@cosmjs/stargate';

import { useCurrentAccount } from '../../accounts/hooks';
import { useNetworkType } from '../../settings/hooks';

export function getAddressTypeUrl(address: string) {
  if (address.startsWith('bc1')) {
    if (address.length === 42) {
      return {
        algo: 'segwit',
        typeUrl: '/cosmos.crypto.segwit.PubKey'
      };
    } else if (address.length === 62) {
      return {
        algo: 'taproot',
        typeUrl: '/cosmos.crypto.taproot.PubKey'
      };
    }
  } else if (address.startsWith('tb1')) {
    if (address.length === 42) {
      return {
        algo: 'segwit',
        typeUrl: '/cosmos.crypto.segwit.PubKey'
      };
    } else if (address.length === 62) {
      return {
        algo: 'taproot',
        typeUrl: '/cosmos.crypto.taproot.PubKey'
      };
    }
  } else {
    throw new Error('Please switch to Native Segwit or Taproot address ');
  }
}

const aminoTypes = new AminoTypes({
  ...createDefaultAminoConverters(),
  ...createIbcAminoConverters(),
  ...createWasmAminoConverters(),
  ...AminoConverter
});

const sideProtoRegistry: Iterable<[string, GeneratedType]> = [...sideBTCBridgeRegistry.registry];

const registry = new Registry([...defaultRegistryTypes, ...wasmTypes, ...sideProtoRegistry]);

enum BroadcastMode {
  SYNC = 'BROADCAST_MODE_SYNC',
  BLOCK = 'BROADCAST_MODE_BLOCK',
  ASYNC = 'BROADCAST_MODE_ASYNC'
}

export function useSignAndBroadcastTxRaw() {
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  // const restUrl = networkType === NetworkType.MAINNET ? SIDEREST_URL_MAINNET : SIDEREST_URL_TESTNET;
  const restUrl = networkType === NetworkType.TESTNET ? SIDEREST_URL_TESTNET : SIDEREST_URL_MAINNET;
  // const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;
  const chainId = networkType === NetworkType.TESTNET ? SIDE_CHAINID_TESTNET : SIDE_CHAINID_MAINNET;

  const mockSignAmino = async (tx: CosmosTransaction): Promise<TxRaw> => {
    const accountFromSigner = currentAccount;
    if (!accountFromSigner) {
      throw new Error('Failed to retrieve account from signer');
    }
    const pubkey = Any.fromPartial({
      typeUrl: getAddressTypeUrl(accountFromSigner.address)?.typeUrl,
      value: PubKey.encode({
        key: fromHex(accountFromSigner.pubkey)
      }).finish()
    });

    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;

    const isBitcoinWithdraw = tx.messages.some((msg) => msg.typeUrl.startsWith('/side.btcbridge.'));

    const msgs = isBitcoinWithdraw
      ? tx.messages.map((msg) => ({
          amount: msg.value.amount,
          fee_rate: msg.value.feeRate,
          sender: msg.value.sender
        }))
      : tx.messages.map((msg) => aminoTypes.toAmino(msg));

    const signDoc = makeSignDocAmino(
      msgs,
      tx.fee,
      tx.chainId,
      tx.memo,
      tx.signerData.accountNumber,
      tx.signerData.sequence
    );

    const signed = signDoc;

    const signature = mockSignature;

    const signedTxBody = {
      messages: isBitcoinWithdraw ? tx.messages : signed.msgs.map((msg) => aminoTypes.fromAmino(msg)),
      memo: signed.memo
    };

    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: signedTxBody
    };

    const signedTxBodyBytes = registry.encode(signedTxBodyEncodeObject);

    const signedGasLimit = Number(signed.fee.gas);
    const signedSequence = Number(signed.sequence);

    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signed.fee.granter,
      signed.fee.payer,
      signMode
    );

    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature)]
    });
  };

  const estimateGas = async (bodyBytes: TxRaw) => {
    // const txbytes = bodyBytes.authInfoBytes ? TxRaw.encode(bodyBytes).finish() : bodyBytes
    const txbytes = TxRaw.encode(bodyBytes).finish();
    const txString = toBase64(txbytes);
    const txRaw = {
      tx_bytes: txString
    };

    // get string
    return await fetch(`${restUrl}/cosmos/tx/v1beta1/simulate`, {
      method: 'POST',
      body: JSON.stringify(txRaw)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code && res.code !== 0) {
          throw new Error(res.message);
        }

        return res.gas_info?.gas_used;
      });
  };

  const estimateGasFee = async ({
    messages,
    memo,
    gas,
    feeAmount,
    feeDenom
  }: {
    messages: EncodeObject[];
    memo?: string;
    gas?: string;
    feeAmount?: string;
    feeDenom?: string;
  }): Promise<{ tx: CosmosTransaction }> => {
    const acc = await fetch(`${restUrl}/cosmos/auth/v1beta1/accounts/${currentAccount.address}`).then(async (res) => {
      const json = await res.json();
      return json.account;
    });
    let tx: CosmosTransaction = {
      chainId,
      signerAddress: currentAccount.address,
      messages,
      fee: {
        gas: gas || '1000000', // gas limit
        amount: [{ amount: feeAmount || '60000', denom: feeDenom || 'uside' }]
      },
      memo: memo || '',
      signerData: {
        accountNumber: acc.account_number,
        sequence: acc.sequence,
        chainId
      }
    };

    const mockTxRaw = await mockSignAmino(tx);

    const gasUsed = await estimateGas(mockTxRaw).catch((error) => {
      if (error.message.match(errorPatterns.sideBTCInsufficientFunds.pattern)) {
        throw new Error(errorPatterns.sideBTCInsufficientFunds.message);
      }

      if (error.message.match(errorPatterns.sideBTCVaultNoUTXOs.pattern)) {
        throw new Error(errorPatterns.sideBTCVaultNoUTXOs.message);
      }

      throw error;
    });

    const validGasUsed = typeof gasUsed === 'string' && BigNumber(gasUsed || '0').gt(0);

    const gasPrice = await services.node.getGasPrice({
      baseURL: restUrl
    });

    const feeEstimate = BigNumber(gasPrice.minimum_gas_price || '0.0001')
      .times(gasUsed || '0')
      .toFixed(0);

    const feeAmountEstimate = [
      {
        denom: feeDenom || 'uside',
        amount: feeEstimate
      }
    ];

    if (validGasUsed) {
      const gasWithPadding = BigNumber(gasUsed).times(1.05).toFixed(0);

      tx = {
        ...tx,
        fee: {
          ...tx.fee,
          amount: BigNumber(feeAmountEstimate[0].amount).gt(0) ? feeAmountEstimate : tx.fee.amount,
          gas: gasWithPadding
        }
      };
    }

    return { tx };
  };

  const signAndBroadcastTxRaw = async ({
    messages,
    memo,
    gas,
    feeAmount,
    feeDenom
  }: {
    messages: EncodeObject[];
    memo?: string;
    gas?: string;
    feeAmount?: string;
    feeDenom?: string;
  }): Promise<{ tx_response: CosmosTxResponse }> => {
    const { tx } = await estimateGasFee({
      messages,
      memo,
      gas,
      feeAmount,
      feeDenom
    });

    const txRaw = await signAmino(tx);
    return broadcastTx(txRaw);
  };

  const mockSignature = 'H7zK7+Cil6z3doIhLvB4IIY7G98EdTDpsPgjinsQab+pAsw0vWh1gPzGCv0z/SPLOGhaRyteMDoJYcXgJyLmHYU=';

  const signAmino = async (tx: CosmosTransaction): Promise<TxRaw> => {
    const accountFromSigner = currentAccount;
    if (!accountFromSigner) {
      throw new Error('Failed to retrieve account from signer');
    }
    const pubkey = Any.fromPartial({
      typeUrl: getAddressTypeUrl(accountFromSigner.address)?.typeUrl,
      value: PubKey.encode({
        key: fromHex(accountFromSigner.pubkey)
      }).finish()
    });

    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;

    const isBitcoinWithdraw = tx.messages.some((msg) => msg.typeUrl.startsWith('/side.btcbridge.'));

    const msgs = isBitcoinWithdraw
      ? tx.messages.map((msg) => ({
          amount: msg.value.amount,
          fee_rate: msg.value.feeRate,
          sender: msg.value.sender
        }))
      : tx.messages.map((msg) => aminoTypes.toAmino(msg));

    const signDoc = makeSignDocAmino(
      msgs,
      tx.fee,
      tx.chainId,
      tx.memo,
      tx.signerData.accountNumber,
      tx.signerData.sequence
    );

    const signed = signDoc;

    const signDocBuffer = serializeSignDoc(signDoc);

    const signString = Buffer.from(signDocBuffer).toString();

    const signature = await wallet.signMessage(signString);

    const signedTxBody = {
      messages: isBitcoinWithdraw ? tx.messages : signed.msgs.map((msg) => aminoTypes.fromAmino(msg)),
      memo: signed.memo
    };

    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: signedTxBody
    };

    const signedTxBodyBytes = registry.encode(signedTxBodyEncodeObject);

    const signedGasLimit = Number(signed.fee.gas);
    const signedSequence = Number(signed.sequence);

    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signed.fee.granter,
      signed.fee.payer,
      signMode
    );

    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature)]
    });
  };

  const broadcastTx = async (
    bodyBytes: TxRaw,
    mode: BroadcastMode = BroadcastMode.SYNC
  ): Promise<{ tx_response: CosmosTxResponse }> => {
    const txbytes = TxRaw.encode(bodyBytes).finish();
    const txString = toBase64(txbytes);
    const txRaw = {
      tx_bytes: txString,
      mode
    };
    const result = await fetch(`${restUrl}/cosmos/tx/v1beta1/txs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        Accept: '*/*'
      },
      body: JSON.stringify(txRaw)
    });
    const res = await result.json();
    if (res.code && res.code !== 0) {
      throw new Error(res.message);
    }

    if (res.tx_response && res.tx_response.code !== 0) {
      throw new Error(res.tx_response.raw_log);
    }
    return res;
  };

  return {
    signAndBroadcastTxRaw,
    estimateGasFee
  };
}
