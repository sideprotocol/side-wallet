import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useEffect, useState } from 'react';

import {
  SIDE_BTC_INDEXER,
  SIDE_BTC_VAULT_ADDRESS_MAINNET,
  SIDE_BTC_VAULT_ADDRESS_TESTNET,
  SIDE_RUNE_INDEXER,
  SIDE_TOKENS
} from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { MessageComposer } from '@/ui/codegen/src/side/btcbridge/tx.registry';
import { useTools } from '@/ui/components/ActionComponent';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { DepositBTCBridge, bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { formatUnitAmount, formatWithDP, parseUnitAmount, useWallet } from '@/ui/utils';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { UnspentOutput } from '@unisat/wallet-sdk';
import { sendBTC } from '@unisat/wallet-sdk/lib/tx-helpers';

import { useCurrentAccount } from '../accounts/hooks';
import { useNetworkType } from '../settings/hooks';
import { useSignAndBroadcastTxRaw } from '../transactions/hooks/cosmos';

async function fetchRuneOutput(key: string) {
  return fetch(`${SIDE_RUNE_INDEXER}/output/${key}`, {
    headers: {
      Accept: 'application/json'
    }
  }).then((res) => res.json());
}

export const useBtcBalance = () => {
  const { from } = useBridgeStore();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const currentAccount = useCurrentAccount();

  const [btcBalance, setBtcBalance] = useState('0');

  const [balance, setBalance] = useState('0');

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
      bridgeStore.balance = btcBalance;

      setBalance(btcBalance);
    } else {
      const parsedBalance = formatWithDP(formatUnitAmount(balanceSideSat, 8), 8);

      bridgeStore.balance = parsedBalance;

      setBalance(parsedBalance);
    }
  }, [isDeposit, currentAccount.address, balanceSideSat, btcBalance]);

  return balance;
};

export const useRuneBalance = (base: string) => {
  const { from } = useBridgeStore();

  const isDeposit = (from?.name || '').includes('Bitcoin');
  const { data: runesBalance, loading: runeLoading } = useRuneBalances();

  const rune = runesBalance.find((rune) => rune.base === base);

  const { balanceAmount } = useGetSideTokenBalance(base);

  if (!rune || runeLoading) return '0';

  return isDeposit ? rune.balance || '0' : toReadableAmount(balanceAmount, rune.exponent || '6');
};

export const useBitcoinBtcBalance = () => {
  const currentAccount = useCurrentAccount();

  const [btcBalance, setBtcBalance] = useState('0');

  const [loading, setLoading] = useState<boolean>(true);

  async function getBtcBalance() {
    setLoading(true);

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

  // load btc balance
  useEffect(() => {
    setLoading(true);
    getBtcBalance()
      .then(setBtcBalance)
      .finally(() => setLoading(false));
  }, []);

  return {
    data: btcBalance,
    loading
  };
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

  const wallet = useWallet();

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

    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

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

export const useRuneBalances = () => {
  const assets = SIDE_TOKENS;

  const runeAssets = assets.filter((a) => a.name === 'Rune');

  const defaultMap = (runeAssets || []).reduce((acc, cur) => {
    return {
      ...acc,
      [cur.symbol]: '0'
    };
  }, {});

  const [loading, setLoading] = useState(true);

  const [bitcoinRunes, setBitcoinRunes] = useState<any[]>([]);

  const currentAccount = useCurrentAccount();

  const refetch = async () => {
    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const allRunes = await fetch(`${SIDE_RUNE_INDEXER}/runes`, {
      headers: {
        Accept: 'application/json'
      }
    }).then((res) => res.json());

    const runesOutputsData = rawUtxos.map((utxo) => {
      return `${utxo.txid}:${utxo.vout}`;
    });

    let runes: { key: string; value: any }[] = [];

    const outputs = await Promise.all(runesOutputsData.map((key: string) => fetchRuneOutput(key)));

    outputs.forEach((output) => {
      const hasRune = Object.values(output.runes).length > 0 && output.address === currentAccount.address;

      if (hasRune) {
        const newRunes = Object.entries(output.runes).map((item) => {
          return {
            key: item[0],
            value: item[1]
          };
        });

        runes = [...runes, ...newRunes];
      }
    });

    const _data = runes.reduce(
      (pre, cur) => {
        if (cur.key in pre) {
          return {
            ...pre,
            [cur.key]: BigNumber(pre[cur.key]).plus(cur.value.amount).toNumber()
          };
        } else {
          return {
            ...pre,
            [cur.key]: cur.value.amount
          };
        }
      },
      { ...defaultMap } as Record<string, number>
    );

    const predata = Object.entries(_data).map((item) => {
      const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

      const runeid = 'runes/' + `${allRunes.entries.find((entry) => entry[1].spaced_rune === item[0])?.[0] || ''}`;
      const asset = assets.find((a) => a.base === runeid);

      const balancePrice = unitPriceMap?.[asset?.coingecko_id || '']?.usd || 0;

      const price = new BigNumber(balancePrice)
        .multipliedBy(item[1])
        .dividedBy(10 ** Number(asset?.exponent || 6))
        .toFixed(2);

      const balance = toReadableAmount(item[1].toString(), asset?.exponent || 6);
      return {
        ...asset,

        logo: asset?.logo,
        name: 'Rune',
        amount: item[1],
        exponent: asset?.exponent || '6',
        symbol: item[0],
        label: '',
        chain: 'bitcoin',
        balance: balance,
        price,
        denom: runeid,
        base: runeid,
        precision: Number(asset?.exponent || 0) || '6'
      };
    });

    const filteredRunes = predata.filter((d) => (runeAssets || []).find((a) => a.base === d.denom));
    console.log('filteredRunes: ', filteredRunes);

    setBitcoinRunes(filteredRunes);
  };

  useEffect(() => {
    setLoading(true);
    refetch().finally(() => {
      setLoading(false);
    });
  }, []);

  return { data: bitcoinRunes, loading };
};

export const useRuneAndBtcBalances = () => {
  const { data: assets } = useGetSideTokenList();

  const satItem = assets.find((a) => a.base === 'sat');

  const { data: bitcoinBtcBalance, loading: btcLoaing } = useBitcoinBtcBalance();

  const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

  const balancePrice = unitPriceMap?.[satItem?.coingecko_id || '']?.usd || 0;

  const price = new BigNumber(balancePrice).multipliedBy(bitcoinBtcBalance || '0').toFixed(2);

  const { data: bitcoinRunesBalances, loading: runesLoading } = useRuneBalances();

  if (btcLoaing || runesLoading) return [];

  return [
    {
      ...satItem,
      balance: bitcoinBtcBalance,
      amount: toUnitAmount(bitcoinBtcBalance || '0', 8),
      denom: satItem?.base,
      price
    },
    ...bitcoinRunesBalances
  ];
};

export const useRuneBridge = () => {
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

  const wallet = useWallet();

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

    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

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
