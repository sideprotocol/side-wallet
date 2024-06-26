import { useEffect, useState } from 'react';

interface Asset {
  base: string;
  symbol: string;
  name: string;
  exponent: string;
  coingecko_id: string;
  logo: string;
  precision: number;
}

const assets: Asset[] = [
  {
    base: 'uside',
    symbol: 'SIDE',
    name: 'Side protocol',
    exponent: '6',
    coingecko_id: 'usd-coin',
    logo: '/images/logo/wallet-logo-white.svg',
    precision: 6
  },
  {
    base: 'sat',
    symbol: 'SATS',
    name: 'SATS',
    exponent: '8',
    coingecko_id: 'ssv-network',
    logo: 'https://assets.coingecko.com/coins/images/30666/standard/_dD8qr3M_400x400.png?1702913020',
    precision: 6
  }
];

export default function useGetSideTokenList() {
  const [data, setData] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setData(assets);
  };

  return {
    loading,
    data
  };
}
