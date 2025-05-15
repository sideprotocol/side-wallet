/** @format */
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { BalanceItem, IAsset } from '@/shared/types';
import services from '@/ui/services';

import { useEnvironment } from '../state/environment/hooks';
import { formatUnitAmount } from '../utils';

// 指定的排序规则
const customOrder = ['sBTC', 'SIDE', 'USDC', 'n.USDC'];

function customSort(data: BalanceItem[]) {
  data.sort((x, y) => {
    const indexX = customOrder.indexOf(x.asset.symbol);
    const indexY = customOrder.indexOf(y.asset.symbol);

    if (indexX !== -1 && indexY !== -1) {
      return indexX - indexY;
    }

    if (indexX !== -1) return -1;
    if (indexY !== -1) return 1;

    return x.asset.symbol.localeCompare(y.asset.symbol);
  });
  return data;
}

export const useGetBalanceList = ({
  assets,
  restUrl,
  address
}: {
  assets: IAsset[];
  restUrl: string;
  address?: string;
}) => {
  const { SERVICE_BASE_URL } = useEnvironment();
  const { data: allCoinBalances, refetch: refetchBalances } = useQuery({
    queryKey: ['getAllCoinBalances', { address, SERVICE_BASE_URL }],
    queryFn: async () => {
      const result = await services.bank.getAllBalances(
        { address: address! },
        {
          baseURL: restUrl
        }
      );
      return result.balances;
    },
    enabled: !!address
  });

  const { data: priceMap } = useQuery({
    queryKey: ['getSideAssetsPrice', { SERVICE_BASE_URL }],
    queryFn: () => {
      return services.dex.getAssetsPrice(
        { chain: 'side', denomList: assets.map((item) => item.denom) },
        {
          baseURL: SERVICE_BASE_URL
        }
      );
    },
    enabled: !!assets.length,
    refetchInterval: 600000,
    refetchIntervalInBackground: true
  });

  const balanceList = useMemo(() => {
    let _balanceList: BalanceItem[] = [];
    if (assets.length && priceMap && allCoinBalances) {
      _balanceList = assets.map((item) => {
        const denomPrice = priceMap[item.denom] || '0';

        const balance = allCoinBalances.find((o) => o.denom === item.denom) || {
          amount: '0',
          denom: ''
        };

        const formatAmount = formatUnitAmount(balance.amount, +item.exponent || 6);
        const totalValue = new BigNumber(denomPrice).multipliedBy(formatAmount || '0').toFixed(2, BigNumber.ROUND_CEIL);
        return {
          denom: item.denom,
          amount: balance.amount || '0',
          denomPrice,
          formatAmount,
          totalValue,
          asset: item
        };
      });
    }
    return customSort(_balanceList);
  }, [allCoinBalances, priceMap, address]);

  return {
    balanceList,
    refetchBalances,
    allCoinBalances,
    priceMap: priceMap || {}
  };
};
