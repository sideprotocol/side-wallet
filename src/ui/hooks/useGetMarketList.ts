import services from '@/ui/services';
import { useEffect, useState } from 'react';
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
export default function useGetMarketList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IGetMarketListItem[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const result = await services.dex.getMarketList();
      setData(result);
    } catch (err) {
      console.log('err: ', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
  };
}
