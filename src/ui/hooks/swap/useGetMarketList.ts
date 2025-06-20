import { useEffect, useState } from 'react';

import services from '@/ui/services';
import { useEnvironment } from '@/ui/state/environment/hooks';

export interface IGetMarketListItem {
  tokenDenom: string;
  tokenSymbol: string;
  tokenName: string;
  tokenExponent: string;
  tokenPrecision: number;
  tokenLogo: string;
  dollarPrice: string;
  priceChange: string;
  volume: string;
  tradeCount: number;
  traderCount: number;
  tvl: string;
  marketCap: string;
}
export function useGetMarketList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IGetMarketListItem[]>([]);
  const { SERVICE_BASE_URL } = useEnvironment();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await services.dex.getMarketList({ baseURL: SERVICE_BASE_URL });
      setData(result);
    } catch (err) {
      console.log('err: ', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data
  };
}
