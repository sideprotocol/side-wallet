import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useEffect, useState } from 'react';

import wallet from '@/background/controller/wallet';
import {
  SIDE_BTC_INDEXER,
  SIDE_BTC_VAULT_ADDRESS_MAINNET,
  SIDE_BTC_VAULT_ADDRESS_TESTNET,
  SIDE_RUNE_INDEXER
} from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { MessageComposer } from '@/ui/codegen/src/side/btcbridge/tx.registry';
import { useTools } from '@/ui/components/ActionComponent';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { DepositBTCBridge, bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { formatUnitAmount, formatWithDP, parseUnitAmount } from '@/ui/utils';
import { toReadableAmount } from '@/ui/utils/formatter';
import { UnspentOutput } from '@unisat/wallet-sdk';
import { sendBTC } from '@unisat/wallet-sdk/lib/tx-helpers';

import { useCurrentAccount } from '../accounts/hooks';
import { useNetworkType } from '../settings/hooks';
import { useSignAndBroadcastTxRaw } from '../transactions/hooks/cosmos';

export const useBtcBalance = () => {
  const { from } = useBridgeStore();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const currentAccount = useCurrentAccount();

  const [btcBalance, setBtcBalance] = useState('0');

  async function fetchRuneOutput(key: string) {
    return fetch(`${SIDE_RUNE_INDEXER}/output/${key}`, {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json());
  }

  async function getBtcBalance() {
    const addressInfo = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}`).then((res) => res.json());

    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const runesOutputsData = rawUtxos.map((utxo) => {
      return `${utxo.txid}:${utxo.vout}`;
    });

    const outputs = await Promise.all(runesOutputsData.map((key: string) => fetchRuneOutput(key)));

    const txs = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/txs`).then((res) => res.json());

    const unconfirmedRunes = txs.filter((tx) => {
      const isRune = tx.vout.find(
        (out) => Number(out.value) === 546 && out.scriptpubkey_address === currentAccount.address
      );

      return isRune && !tx.status.confirmed;
    });

    let balance = BigNumber(addressInfo.mempool_stats.funded_txo_sum)
      .minus(addressInfo.mempool_stats.spent_txo_sum)
      .plus(addressInfo.chain_stats.funded_txo_sum)
      .minus(addressInfo.chain_stats.spent_txo_sum);

    outputs.forEach((output) => {
      const hasRune = Object.keys(output.runes).length > 0;

      if (hasRune) {
        balance = balance.minus(output.value);
      }
    });

    unconfirmedRunes.forEach((_) => {
      balance = balance.minus(546);
    });

    const _data = toReadableAmount(balance.toFixed(), 8);

    return _data;
  }

  const { balanceAmount: balanceSideSat } = useGetSideTokenBalance('sat');

  // load btc balance
  useEffect(() => {
    getBtcBalance().then(setBtcBalance);
  }, []);

  useEffect(() => {
    if (isDeposit) {
      //  get from indexer
      bridgeStore.balance = btcBalance;
    } else {
      const parsedBalance = formatWithDP(formatUnitAmount(balanceSideSat, 8), 8);

      bridgeStore.balance = parsedBalance;
    }
  }, [isDeposit, currentAccount.address, balanceSideSat, btcBalance]);
};

export const useBridge = () => {
  const { from, bridgeAmount, fee } = useBridgeStore();

  const currentAccount = useCurrentAccount();

  const tools = useTools();

  const networkType = useNetworkType();

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, 8)).toNumber();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const BTC_BRIDGE_VAULT =
    networkType === NetworkType.MAINNET ? SIDE_BTC_VAULT_ADDRESS_MAINNET : SIDE_BTC_VAULT_ADDRESS_TESTNET;

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const bridge = async () => {
    bridgeStore.loading = true;

    if (isDeposit) {
      try {
        depositBTC({
          amount: unitAmount,
          fee: Number(fee || '200')
        })
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            if (res) {
              tools.toastSuccess('Deposit Successful! ');
            }
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
      }
    } else {
      const txMsg = MessageComposer.withTypeUrl.withdrawBitcoin({
        amount: `${unitAmount}sat`,
        feeRate: `${fee || 200}`,
        sender: currentAccount?.address
      });

      try {
        signAndBroadcastTxRaw({
          messages: [txMsg]
        })
          .then(() => {
            tools.toastSuccess('Withdraw Successful!');
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
      }
    }
    bridgeStore.loading = false;
  };

  const depositBTC = async (params: DepositBTCBridge) => {
    const { amount, fee } = params;
    const senderAddress = currentAccount.address;

    const rawUtxos = (
      await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) => res.json())
    ).filter((utxo) => utxo.value !== 546);

    const btcRawUtxos = await Promise.all(
      rawUtxos.map(async (item) => {
        return fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}`).then((res) => res.json());
      })
    );

    const btcUtxos: UnspentOutput[] = [];

    const decodeBech32 = bitcoin.address.fromBech32(senderAddress);

    const isTaproot = decodeBech32.version === 1 && decodeBech32.data.length === 32;

    btcRawUtxos.forEach((tx) => {
      const realUtxo = rawUtxos.find((utxo) => utxo.txid === tx.txid);
      if (!realUtxo) return;

      btcUtxos.push({
        txid: tx.txid,
        vout: realUtxo.vout,
        satoshis: realUtxo.value,
        scriptPk: tx.vout[realUtxo.vout].scriptpubkey,
        pubkey: currentAccount.pubkey,
        inscriptions: [],
        atomicals: [],
        addressType: isTaproot ? 2 : 1
      });
    });

    const { psbt, toSignInputs } = await sendBTC({
      btcUtxos: btcUtxos,
      tos: [{ address: BTC_BRIDGE_VAULT, satoshis: amount }],
      networkType: networkType === NetworkType.MAINNET ? 0 : 1,
      changeAddress: senderAddress,
      feeRate: fee,
      enableRBF: false,
      memo: undefined,
      memos: undefined
    });

    console.log('networkType ', networkType === NetworkType.MAINNET ? 0 : 1, currentAccount);

    const signedPsbt = await wallet.signPsbt(psbt, toSignInputs, true);

    const rawTransaction = signedPsbt.extractTransaction().toHex();

    const res = await fetch(`${SIDE_BTC_INDEXER}/tx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: rawTransaction
    });

    return res;
  };

  return { bridge };
};
