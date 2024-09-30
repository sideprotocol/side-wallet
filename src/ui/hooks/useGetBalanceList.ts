/** @format */
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';

// import { useListener } from "./useListener";
import { BalanceItem, IAsset } from '@/shared/types';
import services from '@/ui/services';
import { Coin } from '@cosmjs/amino';

import { formatUnitAmount } from '../utils';

export const useGetBalanceList = ({
  assets,
  restUrl,
  address
}: {
  assets: IAsset[];
  restUrl: string;
  address?: string;
}) => {
  const [priceMap, setPriceMap] = useState<{ [key: string]: string }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data: result, refetch } = useQuery({
    queryKey: ['getAllBalances', { address }],
    queryFn: async () => {
      if (address) {
        return services.bank.getAllBalances(
          { address },
          {
            baseURL: restUrl
          }
        );
      }
    }
  });
  const balances = result?.balances || ([] as Coin[]);

  useEffect(() => {
    getAssetPrice();
  }, [assets]);

  const getAssetPrice = async () => {
    if (!assets.length) return;
    const result = await services.dex.getAssetsPrice(assets.map((item) => item.denom));
    setPriceMap(result);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      getAssetPrice();
    }, 500000);
  };

  const balanceList = useMemo(() => {
    let _balanceList: BalanceItem[] = [];
    if (assets.length) {
      _balanceList = assets.map((item) => {
        const denomPrice = priceMap[item.denom] || '0';

        const balance = balances.find((o) => o.denom === item.denom) || {
          amount: '0',
          denom: ''
        };

        const formatAmount = formatUnitAmount(balance.amount, item.exponent || 2);
        const totalValue = new BigNumber(denomPrice).multipliedBy(formatAmount).toString();
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
    return _balanceList;
  }, [balances, assets, priceMap]);

  return {
    balanceList,
    refetchBalances: refetch
  };
};
