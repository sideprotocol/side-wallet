import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys';
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { Any } from 'cosmjs-types/google/protobuf/any';

import {
  SIDEREST_URL_MAINNET,
  SIDEREST_URL_TESTNET,
  SIDE_CHAINID_MAINNET,
  SIDE_CHAINID_TESTNET
} from '@/shared/constant';
import { CosmosTransaction, CosmosTxResponse, NetworkType } from '@/shared/types';
import { AminoConverter } from '@/ui/codegen/src/side/btcbridge/tx.amino';
import * as sideBTCBridgeRegistry from '@/ui/codegen/src/side/btcbridge/tx.registry';
import { useWallet } from '@/ui/utils';
import { makeSignDoc as makeSignDocAmino } from '@cosmjs/amino';
import { serializeSignDoc } from '@cosmjs/amino/build/signdoc';
import { createWasmAminoConverters } from '@cosmjs/cosmwasm-stargate';
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

const registry = new Registry([...defaultRegistryTypes, ...sideProtoRegistry]);

enum BroadcastMode {
  SYNC = 'BROADCAST_MODE_SYNC',
  BLOCK = 'BROADCAST_MODE_BLOCK',
  ASYNC = 'BROADCAST_MODE_ASYNC'
}

export function useSignAndBroadcastTxRaw() {
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const restUrl = networkType === NetworkType.MAINNET ? SIDEREST_URL_MAINNET : SIDEREST_URL_TESTNET;
  const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;
  console.log(chainId);

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
    const acc = await fetch(`${restUrl}/cosmos/auth/v1beta1/accounts/${currentAccount.address}`).then(async (res) => {
      const json = await res.json();
      return json.account;
    });
    const tx: CosmosTransaction = {
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
    const txRaw = await signAmino(tx);
    return broadcastTx(txRaw);
  };

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

    console.log(11);
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signed.fee.granter,
      signed.fee.payer,
      signMode
    );
    console.log(22);

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
    signAndBroadcastTxRaw
  };
}
