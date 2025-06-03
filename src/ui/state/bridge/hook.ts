import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { MessageComposer } from '@/codegen/src/side/btcbridge/tx.registry';
import { CHAINS_ENUM } from '@/shared/constant';
import { runesUtils } from '@/shared/lib/runes-utils';
import { RuneBalance, TickPriceItem } from '@/shared/types';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { useChainType } from '@/ui/state/settings/hooks';
import { parseUnitAmount, useWallet } from '@/ui/utils';
import { satoshisToAmount, sendAllBTC, sendBTC, sendRunesWithBTC } from '@/ui/wallet-sdk/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';

import { AppState } from '..';
import { useCurrentAccount } from '../accounts/hooks';
import { useEnvironment } from '../environment/hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNetworkType } from '../settings/hooks';
import { useSafeBalance, useUtxos } from '../transactions/hooks';
import { useSignAndBroadcastTxRaw } from '../transactions/hooks/cosmos';
import { BridgeActions } from './reducer';

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

export function useBridgeState(): AppState['bridge'] {
  return useAppSelector((state) => state.bridge);
}

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
  const { UNISAT_IO_API } = useEnvironment();
  const { bridgeAmount, fee, exponent } = useBridgeState();
  const dispatch = useAppDispatch();

  const currentAccount = useCurrentAccount();

  const navigate = useNavigate();

  const tools = useTools();

  const safeBalance = useSafeBalance();

  const _utxos = useUtxos();

  const networkType = useNetworkType();
  const wallet = useWallet();
  const { UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL } = useEnvironment();
  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, exponent)).toNumber();

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const { params, isDeposit } = useBridgeState();

  const btcVault = params?.params?.vaults
    .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  const runeVault = params?.params?.vaults
    .filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  const bridge = async () => {
    dispatch(BridgeActions.update({ loading: true }));

    if (isDeposit) {
      try {
        abstractDepositBTC({
          amount: unitAmount,
          fee: Number(fee || '200')
        })
          .then((res) => {
            if (res) {
              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE, type: 'bridge' });
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
            navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE, type: 'bridge' });
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
        abstractDepositRune({
          amount: bridgeAmount,
          fee: Number(fee || '200'),
          runeId
        })
          .then((res) => {
            if (res) {
              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE });
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
  async function abstractDepositBTC(params) {
    const { amount, fee: feeRate } = params;

    const senderAddress = currentAccount?.address;

    const pbk = currentAccount?.pubkey;

    if (safeBalance < +satoshisToAmount(amount)) {
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
    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx, UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL);
    return txid;
  }

  async function abstractDepositRune(params) {
    const senderAddress = currentAccount.address;
    const pbk = currentAccount.pubkey;

    const { runeId, fee } = params;
    const runeAmount = runesUtils.fromDecimalAmount(bridgeAmount, exponent);

    const bridgeParams = await services.bridge.getBridgeParams(UNISAT_IO_API);

    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    if (!runeVault) {
      throw new Error('No valid vault address found.');
    }

    const btcVaultAddress = btcVault.address;

    const runeVaultAddress = runeVault.address;

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: pbk
      };
    });

    const runes_utxos = await services.unisat.getRunesUtxos(senderAddress, runeId!, UNISAT_SERVICE_ENDPOINT);

    const assetUtxosRunes = runes_utxos.map((v) => {
      return Object.assign(v, { pubkey: pbk });
    });

    assetUtxosRunes.forEach((v) => {
      v.inscriptions = [];
      v.atomicals = [];
    });

    assetUtxosRunes.sort((a, b) => {
      const bAmount = b.runes.find((v) => v.runeid == runeId)?.amount || '0';
      const aAmount = a.runes.find((v) => v.runeid == runeId)?.amount || '0';
      return compareAmount(bAmount, aAmount);
    });

    let assetUtxos = assetUtxosRunes;

    const _assetUtxos: UnspentOutput[] = [];

    // find the utxo that has the exact amount to split
    for (let i = 0; i < assetUtxos.length; i++) {
      const v = assetUtxos[i];
      if (v.runes && v.runes.length > 1) {
        const balance = v.runes.find((r) => r.runeid == runeId);
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
          const balance = v.runes.find((r) => r.runeid == runeId);
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
          if (r.runeid == runeId) {
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

    const { psbt, toSignInputs } = await sendRunesWithBTC({
      assetUtxos,
      btcUtxos: btcUtxos,
      networkType,
      toAddress: runeVaultAddress,
      btcToAddress: btcVaultAddress,
      protocolFee: Number(bridgeParams.params.protocol_fees.deposit_fee),
      assetAddress: senderAddress,
      btcAddress: senderAddress,
      feeRate: fee,
      runeid: runeId!,
      runeAmount: runeAmount,
      outputValue: 546,
      enableRBF: true
    });

    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx, UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL);
    return txid;
  }

  async function estimateNetworkFee(params: { amount: number; fee: number; to?: string; isSign?: boolean }) {
    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    const { amount, fee } = params;
    const senderAddress = currentAccount.address;

    if (safeBalance < +satoshisToAmount(amount)) {
      throw new Error(
        `Insufficient balance. Non-Inscription balance(${satoshisToAmount(
          safeBalance
        )} BTC) is lower than ${satoshisToAmount(amount)} BTC `
      );
    }

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: currentAccount.pubkey
      };
    });

    const { networkFee, walletInputs } =
      safeBalance === amount
        ? await sendAllBTC({
            btcUtxos: btcUtxos,
            toAddress: btcVault.address,
            networkType,
            feeRate: fee,
            enableRBF: true
          })
        : await sendBTC({
            btcUtxos: btcUtxos,
            tos: [{ address: btcVault.address, satoshis: amount }],
            networkType,
            changeAddress: senderAddress,
            feeRate: fee,
            enableRBF: true,
            memo: undefined,
            memos: undefined
          });

    return { networkFee, walletInputs };
  }

  return { bridge, bridgeRune, estimateNetworkFee };
};

export function useBridgeParams() {
  const dispatch = useAppDispatch();
  const { UNISAT_IO_API } = useEnvironment();

  const { data: params, isLoading } = useQuery({
    queryKey: ['bridgeParams', { UNISAT_IO_API }],
    queryFn: async () => {
      const params = await services.bridge.getBridgeParams(UNISAT_IO_API);

      dispatch(BridgeActions.update({ params }));

      return params;
    }
  });

  return { params, loading: isLoading };
}
