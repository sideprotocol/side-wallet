import { useEffect, useState } from 'react';

export interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  coingecko_id: string;
}

export const bitcoinAssets: Asset[] = [
  {
    icon: '/images/img/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '1',
    value: '1',
    coingecko_id: 'bitcoin'
  }
];

export default function useGetBitcoinTokenList() {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setData(bitcoinAssets);
  };

  return {
    loading,
    data
  };
}
