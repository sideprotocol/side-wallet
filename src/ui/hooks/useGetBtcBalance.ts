import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useEffect, useState } from 'react';
import * as ecc from 'tiny-secp256k1';

// import { useWalletContext } from "@/components/WalletContext";
// import Btc from "@/assets/images/btc.png";
import { decodeTxToGetValue } from '@/shared/lib/runes-utils';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import * as BridgeStore from '@/ui/stores/BridgeStore';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';

bitcoin.initEccLib(ecc);

function formatBitcoinItem(balance: string) {
  const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');

  const balancePrice = priceMap?.['sat'];
  const price = new BigNumber(balancePrice).multipliedBy(balance).toFixed(2);
  return {
    logo: '',
    name: 'Bitcoin',
    amount: toUnitAmount(balance, 8),
    exponent: 8,
    symbol: 'BTC',
    label: '',
    chain: 'bitcoin',
    balance: balance,
    price,
    precision: 8,
    coingecko_id: 'bitcoin',
    base: 'sat'
  };
}

export default function useGetBtcBalance(flag?: boolean) {
  const bridgeStore = BridgeStore.useBridgeStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('0');
  const currentAccount = useCurrentAccount();
  // const { client } = useWalletContext();

  const refetch = async () => {
    try {
      // if (!client) {
      //   setData("0");
      //   return;
      // }

      const addressInfo = await services.bridge.getAddressInfo(currentAccount.address);

      const rawUtxos = await services.bridge.getRawUtxos(currentAccount.address);

      const runesOutputsData = rawUtxos.map((utxo) => {
        return `${utxo.txid}:${utxo.vout}`;
      });

      const outputs = await Promise.all(runesOutputsData.map((key: string) => services.bridge.fetchRuneOutput(key)));

      const txs = await services.bridge.getAddressTxs(currentAccount.address);

      // const unconfirmedRunes = txs.filter((tx) => {
      //   const isRune = tx.vout.find(
      //     (out) => Number(out.value) === 546 && out.scriptpubkey_address === currentAccount.address
      //   );

      //   return isRune && !tx.status.confirmed;
      // });

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

      const _data = toReadableAmount(balance.toFixed(), 8);
      setData(_data);
    } catch (err) {
      setData('0');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [bridgeStore.from, flag, currentAccount?.address]);

  return {
    loading,
    data,
    formattedData: formatBitcoinItem(data)
  };
}
