/** @format */
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [balances, setBalances] = useState<Coin[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getAllBalances();
  }, [address]);

  useEffect(() => {
    getAssetPrice();
  }, [assets]);

  const getAllBalances = async () => {
    if (!address) {
      return;
    }
    try {
      const result = await services.bank.getAllBalances(
        { address },
        {
          baseURL: restUrl
        }
      );

      setBalances(result.balances);
    } catch (err) {
      console.log(err);
    }
  };

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
    refetchBalances: getAllBalances
  };
};
