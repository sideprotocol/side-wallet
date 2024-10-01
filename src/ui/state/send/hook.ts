import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';

import { RUNE_BRIDGE_VAULT, SIDE_BTC_INDEXER, SIDE_RUNE_INDEXER } from '@/shared/constant';
import { decodeTxToGetValue } from '@/shared/lib/runes-utils';
import { RawTxInfo } from '@/shared/types';
import { DepositBTCBridge } from '@/ui/stores/BridgeStore';
import { useWallet } from '@/ui/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';
import { sendRunes } from '@unisat/wallet-sdk/lib/tx-helpers';

import { useCurrentAccount } from '../accounts/hooks';
import { useNetworkType } from '../settings/hooks';

function compareAmount(a: string, b: string) {
  return new BigNumber(a || '0').comparedTo(new BigNumber(b || '0'));
}

async function fetchRuneOutput(key: string) {
  return fetch(`${SIDE_RUNE_INDEXER}/output/${key}`, {
    headers: {
      Accept: 'application/json'
    }
  }).then((res) => res.json());
}

export const useSendRune = () => {
  const currentAccount = useCurrentAccount();

  const networkType = useNetworkType();

  const wallet = useWallet();

  const sendRune = async (params: DepositBTCBridge & { base: string; enableRBF: boolean; outputValue: number }) => {
    const { amount, fee, to, base, enableRBF, outputValue } = params;
    const senderAddress = currentAccount.address;

    const runeAmount = BigNumber(amount).toFixed();

    const runeid = base?.substring(6);

    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const btcRawUtxos = await Promise.all(
      rawUtxos.map(async (item) => {
        return fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}`).then((res) => res.json());
      })
    );

    const btcUtxos: UnspentOutput[] = [];

    const _assetUtxos: UnspentOutput[] = [];

    let assetUtxos: UnspentOutput[] = [];

    const decodeBech32 = bitcoin.address.fromBech32(senderAddress);

    const isTaproot = decodeBech32.version === 1 && decodeBech32.data.length === 32;

    btcRawUtxos.forEach((tx, index) => {
      if (decodeTxToGetValue(tx) == 0) {
        btcUtxos.push({
          txid: tx.txid,
          vout: rawUtxos[index].vout,
          satoshis: rawUtxos[index].value,
          scriptPk: tx.vout[rawUtxos[index].vout].scriptpubkey,
          pubkey: currentAccount.pubkey,
          inscriptions: [],
          atomicals: [],
          addressType: isTaproot ? 2 : 1
        });
      }
    });

    const runesOutputsData = rawUtxos.map((utxo) => `${utxo.txid}:${utxo.vout}`);

    const allRunes = await fetch(`${SIDE_RUNE_INDEXER}/runes`, {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json());

    const outputs = await Promise.all(runesOutputsData.map((key) => fetchRuneOutput(key)));

    outputs.forEach((output, index) => {
      assetUtxos.push({
        txid: rawUtxos[index].txid,
        vout: rawUtxos[index].vout,
        satoshis: output.value,
        scriptPk: btcRawUtxos[index].vout[rawUtxos[index].vout].scriptpubkey,
        pubkey: currentAccount.pubkey,
        inscriptions: [],
        atomicals: [],
        addressType: isTaproot ? 2 : 1,

        runes: Object.values(output.runes).map((rune, i) => {
          const runeid =
            allRunes.entries.find((entry) => (entry[1] as Entry).spaced_rune === Object.keys(output.runes)[i])?.[0] ||
            '';
          return {
            amount: BigNumber(rune.amount).toFixed(),
            runeid: runeid as string
          };
        })
      });
    });

    assetUtxos.sort((a, b) => {
      const bAmount = b?.runes?.find((v) => v.runeid == runeid)?.amount || '0';
      const aAmount = a?.runes?.find((v) => v.runeid == runeid)?.amount || '0';
      return compareAmount(bAmount, aAmount);
    });

    for (let i = 0; i < assetUtxos.length; i++) {
      const v = assetUtxos[i];
      if (v.runes && v.runes.length > 1) {
        const balance = v.runes.find((r) => r.runeid == runeid);
        if (balance && balance.amount == runeAmount) {
          _assetUtxos.push(v);
          break;
        }
      }
    }

    if (_assetUtxos.length == 0) {
      for (let i = 0; i < assetUtxos.length; i++) {
        const v = assetUtxos[i];
        if (v.runes) {
          const balance = v.runes.find((r) => r.runeid == runeid);
          if (balance && balance.amount == runeAmount) {
            _assetUtxos.push(v);
            break;
          }
        }
      }
    }

    if (_assetUtxos.length == 0) {
      let total = BigInt(0);
      for (let i = 0; i < assetUtxos.length; i++) {
        const v = assetUtxos[i];
        v.runes?.forEach((r) => {
          if (r.runeid == runeid) {
            total = total + BigInt(r.amount);
          }
        });
        _assetUtxos.push(v);
        if (total >= BigInt(runeAmount)) {
          break;
        }
      }
    }

    assetUtxos = _assetUtxos;

    const { psbt, toSignInputs } = await sendRunes({
      assetUtxos,
      btcUtxos: btcUtxos.sort((a, b) => b.satoshis - a.satoshis),
      networkType,
      toAddress: to || RUNE_BRIDGE_VAULT,
      assetAddress: senderAddress,
      btcAddress: senderAddress,
      feeRate: fee,
      runeid: runeid!,
      runeAmount: BigNumber(amount).toFixed(),
      outputValue: outputValue || 546, //
      enableRBF: enableRBF
    });
    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTransaction = signedPsbt.extractTransaction().toHex();

    console.log('psbt: ', psbt, toSignInputs, rawTransaction);
    return {
      psbtHex: psbt.toHex(),
      rawtx: rawTransaction,
      toAddressInfo: {
        address: to
      }
    } as RawTxInfo;
  };

  return { sendRune };
};

export const postRuneTest = async ({ rawTransaction }: { rawTransaction: string }) => {
  const res = await fetch(`${SIDE_BTC_INDEXER}/tx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: rawTransaction
  });

  return await res.text();
};
