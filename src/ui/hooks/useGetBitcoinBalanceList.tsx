import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { UNISAT_RUNE_URL } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import services from '@/ui/services';

import { useAccountBalance } from '../state/accounts/hooks';
import { toReadableAmount, toUnitAmount } from '../utils/formatter';

function formatBitcoinItem(balance: string, denomPrice: string): BalanceItem {
  const price = new BigNumber(denomPrice || '0').multipliedBy(balance).toFixed(2);

  return {
    denom: 'sat',
    denomPrice: denomPrice,
    formatAmount: balance,
    totalValue: price,
    amount: toUnitAmount(balance, '8'),
    asset: {
      denom: 'sat',
      chain: 'bitcoin',
      exponent: '8',
      logo: 'https://insider.side.one/static/token/logo/btc.svg',
      name: 'Bitcoin',
      symbol: 'BTC',
      precision: 8,
      rune: false
    }
  } as BalanceItem;
}

function useGetBtcBalance(address?: string, flag?: boolean) {
  const [data, setData] = useState<BalanceItem[]>([]);

  const [denomPrice, setDenomPrice] = useState<string>('');

  const [loading, setLoading] = useState(true);

  const accountBalance = useAccountBalance();
  const btcBalance = accountBalance?.amount;

  const fetchBitcoinItemPrice = async () => {
    const result = await services.dex.getAssetPrice('sat');

    setDenomPrice(`${result}`);
  };

  const fetchBitcoinItem = async () => {
    try {
      setLoading(true);

      if (!address || !denomPrice) {
        setData([]);
        return;
      }

      const item = formatBitcoinItem(btcBalance, denomPrice);

      setData([item]);
    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinItemPrice();
  }, []);

  useEffect(() => {
    fetchBitcoinItem();
  }, [flag, address, denomPrice]);

  return {
    data,
    loading
  };
}

function useGetAllRunesBalance(address?: string, flag?: boolean) {
  // runes balance
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BalanceItem[]>([]);

  const refetch = async () => {
    try {
      setLoading(true);

      if (!address) {
        setData([]);
        return;
      }

      const { list } = await services.unisat.getRunesList({
        address: address,
        currentPage: 1,
        pageSize: 100
      });

      const combinedList = [...list];

      const runesPrice = await services.unisat.getRunesPrice(combinedList.map((item) => `${item.spacedRune}`));

      const _data = list.map((item) => {
        return {
          denom: `runes/${item.runeid}`,
          amount: item.amount,
          denomPrice: runesPrice[`${item.spacedRune}`]?.curPrice?.toString() || '0',
          formatAmount: toReadableAmount(item.amount, item.divisibility),
          totalValue: BigNumber(toReadableAmount(item.amount, item.divisibility))
            .multipliedBy(runesPrice[`${item.spacedRune}`]?.curPrice || '0')
            .toFixed(2),
          asset: {
            denom: `runes/${item.runeid}`,
            chain: 'bitcoin',
            precision: item.divisibility,
            logo: `${UNISAT_RUNE_URL}/${item.spacedRune}`,
            name: 'Rune',
            symbol: item.spacedRune,
            rune: true,
            emoji: item.symbol,
            exponent: item.divisibility.toString()
          }
        } as BalanceItem;
      });

      setData([..._data]);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!flag && data.length > 0) return;
    refetch();
  }, [flag, address]);

  return {
    loading,
    data
  };
}

export default function useGetBitcoinBalanceList(address?: string, flag?: boolean) {
  const { data: btcBalance, loading: btcLoading } = useGetBtcBalance(address, flag);

  const { data: runesBalance, loading: runesLoading } = useGetAllRunesBalance(address, flag);

  const loading = btcLoading || runesLoading;

  const balanceList = loading ? [] : [...btcBalance, ...runesBalance];

  return {
    balanceList,
    loading
  };
}
