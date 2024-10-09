import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useCallback, useEffect, useState } from 'react';

import { MessageComposer } from '@/codegen/src/side/btcbridge/tx.registry';
import {
  BTC_BRIDGE_VAULT,
  CHAINS_ENUM,
  RUNE_BRIDGE_VAULT,
  SIDE_BTC_INDEXER,
  SIDE_RUNE_INDEXER,
  UNISAT_SERVICE_ENDPOINT
} from '@/shared/constant';
import { decodeTxToGetValue, runesUtils } from '@/shared/lib/runes-utils';
import { RuneBalance, TickPriceItem } from '@/shared/types';
import { useTools } from '@/ui/components/ActionComponent';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { SideBridgeParams } from '@/ui/services/bridge';
import { useChainType } from '@/ui/state/settings/hooks';
import { formatUnitAmount, formatWithDP, parseUnitAmount, useWallet } from '@/ui/utils';
import { toReadableAmount } from '@/ui/utils/formatter';
import { satoshisToAmount, sendAllBTC, sendRunesWithBTC } from '@/ui/wallet-sdk/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';
import { sendBTC, sendRunes } from '@unisat/wallet-sdk/lib/tx-helpers';

import { AppState } from '..';
import { useCurrentAccount } from '../accounts/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNetworkType } from '../settings/hooks';
import { useSignAndBroadcastTxRaw } from '../transactions/hooks/cosmos';
import { BridgeActions, DepositBTCBridge } from './reducer';

async function fetchRuneOutput(key: string, SIDE_RUNE_INDEXER: string) {
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

export function useBridgeState(): AppState['bridge'] {
  return useAppSelector((state) => state.bridge);
}

export const useBtcBalance = () => {
  const { from, loading } = useBridgeState();
  const dispatch = useAppDispatch();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const currentAccount = useCurrentAccount();
  const { balanceList } = useGetSideBalanceList(currentAccount.address);

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

    const outputs = await Promise.all(runesOutputsData.map((key: string) => fetchRuneOutput(key, SIDE_RUNE_INDEXER)));

    const txs = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/txs`).then((res) => res.json());

    const unconfirmedRunes = txs.filter((tx) => {
      return !!decodeTxToGetValue(tx) && !tx.status.confirmed;
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

    unconfirmedRunes.forEach((tx) => {
      const value = decodeTxToGetValue(tx);
      balance = balance.minus(value);
    });
    console.log('unconfirmedRunes: ', unconfirmedRunes);

    const _data = toReadableAmount(balance.toFixed(), 8);

    return _data;
  }

  const balanceSideSat = balanceList.find((item) => item.denom === 'sat')?.amount || '0';

  // const { balanceAmount: balanceSideSat } = useGetSideTokenBalance('sat', loading);

  // load btc balance
  useEffect(() => {
    getBtcBalance().then(setBtcBalance);
  }, [loading]);

  useEffect(() => {
    if (isDeposit) {
      dispatch(BridgeActions.update({ balance: btcBalance }));

      setBalance(btcBalance);
    } else {
      const parsedBalance = formatWithDP(formatUnitAmount(balanceSideSat, 8), 8);

      dispatch(BridgeActions.update({ balance: parsedBalance }));

      setBalance(parsedBalance);
    }
  }, [isDeposit, currentAccount.address, balanceSideSat, btcBalance, loading]);

  return balance;
};

export const useRuneBalanceV2 = (base: string) => {
  return 0;
};

export const useRuneListV2 = () => {
  const wallet = useWallet();
  const currentAccount = useCurrentAccount();
  const chainType = useChainType();

  const [tokens, setTokens] = useState<RuneBalance[]>([]);
  const [total, setTotal] = useState(-1);
  const [pagination, setPagination] = useState({ currentPage: 1, pageSize: 100 });
  const [priceMap, setPriceMap] = useState<{ [key: string]: TickPriceItem }>();

  const tools = useTools();
  const fetchData = async () => {
    try {
      if (!currentAccount.address) return;
      let { list, total } = await wallet.getRunesList(
        currentAccount.address,
        pagination.currentPage,
        pagination.pageSize
      );
      setTokens(list);
      setTotal(total);
      if (list.length > 0) {
        // console.log(`list.map(item=>item?.spacedRune): `, list.map(item=>item?.spacedRune));
        wallet.getRunesPrice(list.map((item) => item?.spacedRune)).then((res) => {
          console.log('res: ', res);
          setPriceMap(res);
        });
      }
    } catch (e) {
      console.log('e: ', e);
      tools.toastError((e as Error).message);
    } finally {
      // tools.showLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, currentAccount.address, chainType]);
  return {
    tokens,
    total,
    pagination,
    fetchData,
    priceMap
    // token: key
  };
};

export const useBitcoinRuneBalance = (base: string) => {
  const { tokens: runesBalance } = useRuneListV2();
  if (base === 'sat') return '0';
  const rune = runesBalance.find((rune) => base.includes(rune?.runeid));
  return runesUtils.toDecimalNumber(rune?.amount, rune?.divisibility)?.toString() || '0';
};

export const useBridge = () => {
  const { from, bridgeAmount, fee, exponent } = useBridgeState();
  const dispatch = useAppDispatch();

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const tools = useTools();

  const networkType = useNetworkType();
  const wallet = useWallet();
  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, exponent)).toNumber();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const bridge = async () => {
    dispatch(BridgeActions.update({ loading: true }));

    if (isDeposit) {
      try {
        abstractDepositBTC(
          {
            amount: unitAmount,
            fee: Number(fee || '200')
          },
          currentAccount
        )
          .then((res) => {
            console.log('res: ', res);
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
            dispatch(BridgeActions.update({ loading: false }));
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        dispatch(BridgeActions.update({ loading: false }));
      }
    } else {
      const txMsg = MessageComposer.withTypeUrl.withdrawToBitcoin({
        amount: `${unitAmount}sat`,
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
            dispatch(BridgeActions.update({ loading: false }));
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        dispatch(BridgeActions.update({ loading: false }));
      }
    }
  };

  const bridgeRune = async (runeId) => {
    dispatch(BridgeActions.update({ loading: true }));

    if (isDeposit) {
      try {
        abstractDepositRune(
          {
            amount: bridgeAmount,
            fee: Number(fee || '200'),
            runeId
          },
          currentAccount
        )
          .then((res) => {
            console.log('res: ', res);
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
            dispatch(BridgeActions.update({ loading: false }));
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        dispatch(BridgeActions.update({ loading: false }));
      }
    } else {
      console.log(runeId, 'runeid');

      const txMsg = MessageComposer.withTypeUrl.withdrawToBitcoin({
        amount: `${unitAmount}runes/${runeId}`,
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
            dispatch(BridgeActions.update({ loading: false }));
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        dispatch(BridgeActions.update({ loading: false }));
      }
    }
  };
  async function abstractDepositBTC(params, currentAccount) {
    const { amount, fee: feeRate } = params;

    const senderAddress = currentAccount?.address;

    const pbk = currentAccount?.pubkey;

    const _utxos = await services.unisat.getBTCUtxos({ address: senderAddress });

    const safeBalance = _utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

    if (safeBalance < amount) {
      throw new Error(
        `Insufficient balance. Non-Inscription balance(${satoshisToAmount(
          safeBalance
        )} BTC) is lower than ${satoshisToAmount(amount)} BTC `
      );
    }

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: pbk
      };
    });

    const bridgeParams = await services.bridge.getBridgeParams();

    const btcVault = bridgeParams.params.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });

    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    const btcVaultAddress = btcVault.address;

    const { psbt, toSignInputs } =
      safeBalance === amount
        ? await sendAllBTC({
            btcUtxos: btcUtxos,
            toAddress: btcVaultAddress,
            networkType,
            feeRate: feeRate,
            enableRBF: true
          })
        : await sendBTC({
            btcUtxos: btcUtxos,
            tos: [{ address: btcVaultAddress, satoshis: amount }],
            networkType,
            changeAddress: senderAddress,
            feeRate: feeRate,
            enableRBF: true,
            memo: undefined,
            memos: undefined
          });
    console.log('wallet: ', wallet, psbt, toSignInputs);
    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx);
    return txid;
  }

  async function abstractDepositRune(params, currentAccount) {
    const senderAddress = currentAccount?.address;
    const pbk = currentAccount?.pubkey;

    const { runeId, amount, fee } = params;
    const runeid = runeId;
    const runeAmount = runesUtils.fromDecimalAmount(bridgeAmount, exponent);

    const bridgeParams = await services.bridge.getBridgeParams();

    const btcVault = bridgeParams.params.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });

    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    const runeVault = bridgeParams.params.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });

    if (!runeVault) {
      throw new Error('No valid vault address found.');
    }

    const btcVaultAddress = btcVault.address;

    const runeVaultAddress = runeVault.address;

    const _utxos = await services.unisat.getBTCUtxos({ address: senderAddress });

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: pbk
      };
    });

    const runes_utxos = await services.unisat.getRunesUtxos(senderAddress, runeid!);

    const assetUtxosRunes = runes_utxos.map((v) => {
      return Object.assign(v, { pubkey: pbk });
    });

    assetUtxosRunes.forEach((v) => {
      v.inscriptions = [];
      v.atomicals = [];
    });

    assetUtxosRunes.sort((a, b) => {
      const bAmount = b.runes.find((v) => v.runeid == runeid)?.amount || '0';
      const aAmount = a.runes.find((v) => v.runeid == runeid)?.amount || '0';
      return compareAmount(bAmount, aAmount);
    });

    let assetUtxos = assetUtxosRunes;

    const _assetUtxos: UnspentOutput[] = [];

    // find the utxo that has the exact amount to split
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

    let p = {
      assetUtxos,
      btcUtxos: btcUtxos,
      networkType,
      toAddress: runeVaultAddress,
      btcToAddress: btcVaultAddress,
      protocolFee: Number(bridgeParams.params.protocol_fees.deposit_fee),
      assetAddress: senderAddress,
      btcAddress: senderAddress,
      feeRate: fee,
      runeid: runeid!,
      runeAmount: runeAmount,
      outputValue: 546,
      enableRBF: true
    };
    console.log('p: ', p);
    const { psbt, toSignInputs } = await sendRunesWithBTC(p);

    console.log('wallet: ', wallet, psbt, toSignInputs);
    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx);
    return txid;
  }

  async function estimateNetworkFee(params: DepositBTCBridge) {
    const { amount, fee } = params;
    const senderAddress = currentAccount.address;
    const txs = await fetch(`${UNISAT_SERVICE_ENDPOINT}/v5/address/btc-utxo?address=${currentAccount.address}`).then(
      (res) => res.json()
    );

    const rawUtxos = (
      await fetch(`${UNISAT_SERVICE_ENDPOINT}/v5/address/btc-utxo?address=${currentAccount.address}`).then((res) =>
        res.json()
      )
    ).filter((utxo) => {
      const findTx = txs.find((tx) => tx.txid === utxo.txid);
      if (!findTx) return false;
      else {
        return !decodeTxToGetValue(findTx);
      }
    });

    const btcRawUtxos = await Promise.all(
      rawUtxos.map(async (item) => {
        return fetch(`${UNISAT_SERVICE_ENDPOINT}/tx/${item.txid}`).then((res) => res.json());
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
      networkType,
      changeAddress: senderAddress,
      feeRate: fee,
      enableRBF: false,
      memo: undefined,
      memos: undefined
    });

    return { networkFee, walletInputs };
  }

  return { bridge, bridgeRune, estimateNetworkFee };
};

export const useRuneBridge = () => {
  const { from, bridgeAmount, fee, base, loading } = useBridgeState();
  const dispatch = useAppDispatch();

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const tools = useTools();

  const networkType = useNetworkType();
  const { balanceList } = useGetSideBalanceList(currentAccount.address);

  const asset = balanceList.find((a) => a.denom === base);

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, asset?.asset.exponent || 6)).toNumber();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const bridge = async () => {
    dispatch(BridgeActions.update({ loading: true }));

    if (isDeposit) {
      try {
        depositRune(
          {
            amount: unitAmount,
            fee: Number(fee || '200')
          },
          SIDE_BTC_INDEXER,
          SIDE_RUNE_INDEXER
        )
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
      const txMsg = MessageComposer.withTypeUrl.withdrawToBitcoin({
        amount: `${unitAmount}${base}`,
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
    dispatch(BridgeActions.update({ loading: false }));
  };

  const wallet = useWallet();

  const depositRune = async (params: DepositBTCBridge, SIDE_BTC_INDEXER: string, SIDE_RUNE_INDEXER: string) => {
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

    const outputs = await Promise.all(runesOutputsData.map((key) => fetchRuneOutput(key, SIDE_RUNE_INDEXER)));

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

export function useQueryAddressUtxo() {
  const dispatch = useAppDispatch();
  return useCallback(
    async (address: string, UNISAT_SERVICE_ENDPOINT: string) => {
      if (!address) return;
      const utxos = await fetch(`${UNISAT_SERVICE_ENDPOINT}/v5/address/btc-utxo?address=${address}`).then((res) =>
        res.json()
      );

      if (utxos.length === 1) {
        dispatch(BridgeActions.update({ accountUtxo: utxos[0] }));
        return;
      }

      const vout1 = utxos?.data?.find((utxo) => utxo.vout === 1);
      if (vout1) {
        dispatch(BridgeActions.update({ accountUtxo: vout1 }));
      }
    },
    [dispatch]
  );
}

const DEFAULT = {
  params: {
    confirmations: 1,
    max_acceptable_block_depth: '100',
    btc_voucher_denom: 'sat',
    deposit_enabled: true,
    withdraw_enabled: true,
    non_btc_relayers: ['tb1qzqkpqjtql2j30gwlq0vt7ltslqe72ftma767su'],
    vaults: [
      {
        address: 'tb1ptnl9qnzkzm2szu850yfy9dh5a3c5re0ttn0f6jeg669wzzj089mqljt839',
        pub_key: '',
        asset_type: 'ASSET_TYPE_BTC',
        version: '1'
      },
      {
        address: 'tb1prnk5h7mffuuce7k2wyxhclgnkmjgmjld7lyyrxua5vpswrsh5zmqxgl4ea',
        pub_key: '',
        asset_type: 'ASSET_TYPE_RUNES',
        version: '1'
      }
    ],
    protocol_limits: {
      btc_min_deposit: '10000',
      btc_min_withdraw: '20000',
      btc_max_withdraw: '500000000'
    },
    protocol_fees: {
      deposit_fee: '1000',
      withdraw_fee: '2000',
      collector: 'tb1qthnu8ck0hcgw0a33rhv7wf6mt39cxrtyr87sdw'
    },
    tss_params: {
      dkg_timeout_period: '86400s',
      participant_update_transition_period: '1209600s'
    }
  }
} as SideBridgeParams;

export function useBridgeParams() {
  const [params, setParams] = useState<SideBridgeParams>(DEFAULT);

  const [loading, setLoading] = useState(false);

  const fetchParams = async () => {
    setLoading(true);
    const params = await services.bridge.getBridgeParams();
    setParams(params);
    setLoading(false);
  };

  useEffect(() => {
    fetchParams();
  }, []);

  return { params, loading };
}
