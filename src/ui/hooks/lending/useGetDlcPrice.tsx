import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

import { PoolDataItem } from './useGetPoolsData';

export function useGetDlcPrice(poolConfig?: PoolDataItem['baseData']['config']) {
  const { sideChain } = useEnvironment();
  const { data, isLoading: loading } = useQuery({
    queryKey: ['getDlcPrice', { priceSymbol: poolConfig?.lending_asset.price_symbol }],
    queryFn: async () => {
      let symbol = `${poolConfig?.collateral_asset.price_symbol}${poolConfig?.lending_asset.price_symbol}`;
      if (poolConfig?.lending_asset.is_base_price_asset) {
        symbol = `${poolConfig?.lending_asset.price_symbol}${poolConfig?.collateral_asset.price_symbol}`;
      }
      const { price } = await services.lending.getDlcPrice(symbol, { baseURL: sideChain?.restUrl });
      let _price = price;
      if (poolConfig?.lending_asset.is_base_price_asset) {
        _price = new BigNumber(1).div(price).toString();
      }
      // console.log(`${poolConfig?.collateral_asset.price_symbol}${poolConfig?.lending_asset.price_symbol}`, _price);
      return _price;
    },
    enabled: !!poolConfig
  });

  return {
    loading,
    dlcPrice: data || '0'
  };
}
