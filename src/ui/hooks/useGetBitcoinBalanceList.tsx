import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';

import { CHAINS_ENUM, UNISAT_RUNE_URL } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import services from '@/ui/services';

import { useFetchUtxosCallback } from '../state/transactions/hooks/index';
import { satoshisToAmount } from '../utils';
import { toReadableAmount, toUnitAmount } from '../utils/formatter';

const defaultBtcBalance: BalanceItem = {
  denom: 'sat',
  denomPrice: '0',
  formatAmount: '0',
  totalValue: '0',
  amount: '0',
  asset: {
    denom: 'sat',
    chain: CHAINS_ENUM.BTC,
    exponent: '8',
    logo: 'https://api.side.one/static/token/logo/btc.svg',
    name: 'Bitcoin',
    symbol: 'BTC',
    precision: 8,
    rune: false
  }
};

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
      chain: CHAINS_ENUM.BTC,
      exponent: '8',
      logo: 'https://api.side.one/static/token/logo/btc.svg',
      name: 'Bitcoin',
      symbol: 'BTC',
      precision: 8,
      rune: false
    }
  } as BalanceItem;
}

export default function useGetBitcoinBalanceList(address?: string, flag?: boolean) {
  const fetchUtxos = useFetchUtxosCallback();

  const { data, isLoading } = useQuery({
    queryKey: [
      'getBitcoinBalanceList',
      {
        address,
        flag
      }
    ],
    queryFn: async () => {
      try {
        // btc 资产

        const utxos = await fetchUtxos();
        const safeBalance = utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

        const btcAmount = satoshisToAmount(safeBalance);

        const { list } = await services.unisat.getRunesList({
          address: address!,
          currentPage: 1,
          pageSize: 100
        });
        const priceMap = await services.dex.getAssetsPrice({
          chain: 'bitcoin',
          denomList: ['sat', ...list.map((item) => `runes/${item.runeid}`)]
        });

        const runeBalanceList = list.map((item) => {
          const runeDenom = `runes/${item.runeid}`;
          const denomPrice = priceMap[runeDenom] || '0';
          return {
            denom: runeDenom,
            amount: item.amount,
            denomPrice,
            formatAmount: toReadableAmount(item.amount, item.divisibility),
            totalValue: BigNumber(toReadableAmount(item.amount, item.divisibility)).multipliedBy(denomPrice).toFixed(2),
            asset: {
              denom: `runes/${item.runeid}`,
              chain: CHAINS_ENUM.BTC,
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
        const btcBalance = formatBitcoinItem(btcAmount.toString(), priceMap['sat']);

        return [btcBalance, ...runeBalanceList];
      } catch (err) {
        console.log(err);
      }
      return [defaultBtcBalance];
    },
    enabled: !!address || !!flag,
    refetchInterval: 600000,
    refetchIntervalInBackground: true
  });

  return {
    balanceList: data || [defaultBtcBalance],
    loading: isLoading
  };
}
