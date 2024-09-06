import { useEffect, useMemo, useState, useRef } from 'react';
import { Coin } from '@cosmjs/amino';
import services from '@/ui/services';
import { IAsset } from '@/ui/constants/assets';
import BigNumber from 'bignumber.js';
import { formatUnitAmount } from '@/ui/utils/';

export interface BalanceItem {
  denom: string; // denom,
  amount: string; // user balance: unit amount
  denomPrice: string; // denom single price
  formatAmount: string; // user balance: format amount
  totalValue: string; // user balance: USD
  asset: IAsset; // asset info
}

export const useGetBalanceList = ({ assets, restUrl, address }: { assets: IAsset[]; restUrl: string; address?: string }) => {
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
          baseURL: restUrl,
        }
      );
      setBalances(result.balances);
    } catch (err) {}
  };

  const getAssetPrice = async () => {
    const _priceMap: { [key: string]: string } = {};
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      try {
        const result = await services.dex.getAssetPrice(asset?.denom);
        _priceMap[asset?.denom] = result;
      } catch (err) {}
    }
    setPriceMap(_priceMap);
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
          denom: '',
        };

        const formatAmount = formatUnitAmount(balance.amount, item.exponent || 2);
        const totalValue = new BigNumber(denomPrice).multipliedBy(formatAmount).toString();
        return {
          denom: item.denom,
          amount: balance.amount || '0',
          denomPrice,
          formatAmount,
          totalValue,
          asset: item,
        };
      });
    }
    return _balanceList;
  }, [balances, assets, priceMap]);

  return {
    balanceList,
  };
};
