import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import qs from 'qs';
import { useEffect, useState } from 'react';

import {
  CHAINS_ENUM,
  SIDE_BTC_INDEXER,
  SIDE_BTC_VAULT_ADDRESS_MAINNET,
  SIDE_BTC_VAULT_ADDRESS_TESTNET,
  SIDE_RUNE_INDEXER,
  SIDE_RUNE_VAULT_ADDRESS_MAINNET,
  SIDE_RUNE_VAULT_ADDRESS_TESTNET,
  SIDE_TOKENS
} from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { MessageComposer } from '@/ui/codegen/src/side/btcbridge/tx.registry';
import { useTools } from '@/ui/components/ActionComponent';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { DepositBTCBridge, bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { formatUnitAmount, formatWithDP, parseUnitAmount, useWallet } from '@/ui/utils';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';
import { sendBTC, sendRunes } from '@/wallet-sdk/tx-helpers';
import { UnspentOutput } from '@unisat/wallet-sdk';

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

function compareAmount(a: string, b: string) {
  return new BigNumber(a || '0').comparedTo(new BigNumber(b || '0'));
}

export interface BridgeTxItem {
  time: number;
  txid: string;
  amount: string;
  status: 'pending' | 'confirmed';
  url: string;
}

const PENDING_RUNES_KEY = 'PENIDNG:RUNES';

const RUNE_BALANCE_KEY_PREFIX = 'RUNE_BALANCE_KEY_';

export const getPendingDeposits = (id: string, address: string) => {
  if (!id || !address) return [];
  const curStore = localStorage.getItem(PENDING_RUNES_KEY + `:${id}` + `:${address}`);

  return JSON.parse(curStore || '[]') as BridgeTxItem[];
};

export const unshiftPendingDeposits = (pending: BridgeTxItem, id: string, address: string) => {
  const curStores = getPendingDeposits(id, address);
  const newStores = [pending, ...curStores] as BridgeTxItem[];

  return localStorage.setItem(PENDING_RUNES_KEY + ':' + id + `:${address}`, JSON.stringify(newStores));
};

export const updatePendingDeposits = (pending: BridgeTxItem[], id: string, address: string) => {
  const newStores = [...pending];
  return localStorage.setItem(PENDING_RUNES_KEY + ':' + id + `:${address}`, JSON.stringify(newStores));
};

export const getRuneBalanceFromStore = (runeId: string, address: string) => {
  return localStorage.getItem(RUNE_BALANCE_KEY_PREFIX + runeId + ':' + address);
};

export const setRuneBalanceFromStore = (balance: string, runeId: string, address: string) => {
  return localStorage.setItem(RUNE_BALANCE_KEY_PREFIX + runeId + ':' + address, balance);
};

export const useBtcBalance = () => {
  const { from, loading } = useBridgeStore();

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

  const { balanceAmount: balanceSideSat } = useGetSideTokenBalance('sat', loading);

  // load btc balance
  useEffect(() => {
    getBtcBalance().then(setBtcBalance);
  }, [loading]);

  useEffect(() => {
    if (isDeposit) {
      bridgeStore.balance = btcBalance;

      setBalance(btcBalance);
    } else {
      const parsedBalance = formatWithDP(formatUnitAmount(balanceSideSat, 8), 8);

      bridgeStore.balance = parsedBalance;

      setBalance(parsedBalance);
    }
  }, [isDeposit, currentAccount.address, balanceSideSat, btcBalance, loading]);

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

export const useBitcoinRuneBalance = (base: string) => {
  const { data: runesBalance, loading: runeLoading } = useRuneBalances();

  const rune = runesBalance.find((rune) => rune.base === base);

  if (!rune || runeLoading) return '0';

  return rune.balance || '0';
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
  }, [currentAccount.address]);

  return {
    data: btcBalance,
    loading
  };
};

export const useBridge = () => {
  const { from, bridgeAmount, fee } = useBridgeStore();

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

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
              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE_SIGNET });

              // tools.toastSuccess('Deposit Successful! ');
            }
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          })
          .finally(() => {
            bridgeStore.loading = false;
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        bridgeStore.loading = false;
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
          .then((result) => {
            // tools.toastSuccess('Withdraw Successful!');

            navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          })
          .finally(() => {
            bridgeStore.loading = false;
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        bridgeStore.loading = false;
      }
    }
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
      btcUtxos: btcUtxos.sort((a, b) => b.satoshis - a.satoshis),
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

  async function estimateNetworkFee(params: DepositBTCBridge) {
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

    const { networkFee, walletInputs } = await sendBTC({
      btcUtxos: btcUtxos.sort((a, b) => b.satoshis - a.satoshis),

      tos: [{ address: BTC_BRIDGE_VAULT, satoshis: amount }],
      networkType: networkType === NetworkType.MAINNET ? 0 : 1,
      changeAddress: senderAddress,
      feeRate: fee,
      enableRBF: false,
      memo: undefined,
      memos: undefined
    });

    return { networkFee, walletInputs };
  }

  return { bridge, estimateNetworkFee };
};

export const useRuneBalances = () => {
  const assets = SIDE_TOKENS;

  const { loading: bridgeLoading } = useBridgeStore();

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

  const networkType = useNetworkType();

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
      const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

      const runeid = 'runes/' + `${allRunes.entries.find((entry) => entry[1].spaced_rune === item[0])?.[0] || ''}`;
      const asset = assets.find((a) => a.base === runeid);

      const balancePrice = priceMap?.[asset?.base || ''] || 0;

      const price = new BigNumber(balancePrice)
        .multipliedBy(item[1])
        .dividedBy(10 ** Number(asset?.exponent || 6))
        .toFixed(2);

      const pendingRunes = getPendingDeposits(`${networkType}:${runeid}`, currentAccount.address);
      console.log('pendingRunes: ', pendingRunes);

      const hasPendingRuns = pendingRunes.length > 0;

      if (!hasPendingRuns) {
        const balance = toReadableAmount(item[1].toString(), asset?.exponent || 6);
        setRuneBalanceFromStore(balance, runeid, currentAccount.address);
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
      } else {
        const pendingAmount = pendingRunes.reduce((acc, cur) => {
          return acc.plus(cur.amount);
        }, BigNumber(0));

        const storeBalance = getRuneBalanceFromStore(runeid, currentAccount.address);

        const newBalance = BigNumber(storeBalance || item[1])
          .minus(BigNumber(pendingAmount))
          .toFixed();

        return {
          ...asset,

          logo: asset?.logo,
          name: 'Rune',
          amount: item[1],
          exponent: asset?.exponent || '6',
          symbol: item[0],
          label: '',
          chain: 'bitcoin',
          balance: newBalance,
          price,
          denom: runeid,
          base: runeid,
          precision: Number(asset?.exponent || 0) || '6'
        };
      }
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
  }, [bridgeLoading, currentAccount.address]);

  return { data: bitcoinRunes, loading };
};

export const useRuneAndBtcBalances = () => {
  const { data: assets } = useGetSideTokenList();

  const satItem = assets.find((a) => a.base === 'sat');

  const { data: bitcoinBtcBalance, loading: btcLoaing } = useBitcoinBtcBalance();

  const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

  const balancePrice = priceMap?.[satItem?.base || ''] || 0;

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
  const { from, bridgeAmount, fee, base, loading } = useBridgeStore();

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const tools = useTools();

  const networkType = useNetworkType();

  const asset = SIDE_TOKENS.find((a) => a.base === base);

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, asset?.exponent || 6)).toNumber();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const RUNE_BRIDGE_VAULT =
    networkType === NetworkType.MAINNET ? SIDE_RUNE_VAULT_ADDRESS_MAINNET : SIDE_RUNE_VAULT_ADDRESS_TESTNET;

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const updateProofs = async () => {
    const params = qs.stringify(
      {
        events: [`btcbridge.recipient='${currentAccount.address}'`],
        order_by: '2'
      },
      { arrayFormat: 'repeat' }
    );

    const proofs = await fetch('/cosmos/tx/v1beta1/txs?' + params).then((res) => res.json());

    const confirmedTxs = proofs.tx_responses.map((res) => {
      const amount =
        res.events
          .filter((e) => e.type === 'transfer')
          ?.at(-1)
          ?.attributes?.find((a) => a.key === 'amount')?.value || '';

      const amountValue = new RegExp(base, 'i').test(amount) ? parseInt(amount) : 0;

      return {
        destinationTx: res.events.find((e) => e.type === 'btcbridge')?.attributes?.find((a) => a.key === 'txid')?.value,
        tx: res.txhash,
        amount: amountValue
      };
    });

    const id = `${networkType}:${base}`;

    const tempPendingTxs = getPendingDeposits(id, currentAccount.address);

    const filteredPendingTxs = tempPendingTxs
      .filter(
        (tx) =>
          tx.txid &&
          tx.txid !== null &&
          tx.txid !== undefined &&
          !confirmedTxs.find((item) => item.destinationTx === tx.txid)
      )
      .sort((a, b) => a.time - b.time);

    updatePendingDeposits(filteredPendingTxs, id, currentAccount.address);

    return filteredPendingTxs;
  };

  const bridge = async () => {
    bridgeStore.loading = true;

    if (isDeposit) {
      // const filteredPendingTxs = await updateProofs();

      // if (filteredPendingTxs.length > 0) {
      //   tools.toastError(
      //     'Please wait for the pending Rune bridging transaction to complete before starting a new request.'
      //   );

      //   return;
      // }
      try {
        depositRune({
          amount: unitAmount,
          fee: Number(fee || '200')
        })
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            if (res) {
              const item: BridgeTxItem = {
                amount: bridgeAmount,
                time: Date.now() / 1000,
                url: '',
                txid: res,
                status: 'pending'
              };

              const id = `${networkType}:${base}`;

              unshiftPendingDeposits(item, id, currentAccount.address || '');

              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE_SIGNET });
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
        amount: `${unitAmount}${base}`,
        feeRate: `${fee || 200}`,
        sender: currentAccount?.address
      });

      try {
        signAndBroadcastTxRaw({
          messages: [txMsg]
        })
          .then((result) => {
            // tools.toastSuccess('Withdraw Successful!');

            navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
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

  const depositRune = async (params: DepositBTCBridge) => {
    const { amount, fee, to } = params;
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
      btcUtxos: btcUtxos.filter((utxo) => utxo.satoshis !== 546),
      networkType: networkType === NetworkType.MAINNET ? 0 : 1,
      toAddress: to || RUNE_BRIDGE_VAULT,
      assetAddress: senderAddress,
      btcAddress: senderAddress,
      feeRate: fee,
      runeid: runeid!,
      runeAmount: BigNumber(amount).toFixed(),
      outputValue: 546, //
      enableRBF: true
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

export const queryAddressUtxo = async (address: string) => {
  if (!address) return;
  const utxos = await fetch(`${SIDE_BTC_INDEXER}/address/${address}/utxo`).then((res) => res.json());

  if (utxos.length === 1) {
    bridgeStore.accountUtxo = utxos[0];
    return;
  }

  const vout1 = utxos.find((utxo) => utxo.vout === 1);
  if (vout1) {
    bridgeStore.accountUtxo = vout1;
  }
};
