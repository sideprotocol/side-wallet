import { useEffect, useState } from 'react';

import { bitcoinAssets } from '../pages/Main/WalletTabScreen/BtcTokenList/hooks/useGetBitcoinTokenList';
import { sideAssets } from '../pages/Main/WalletTabScreen/SideTokenList/hooks/useGetSideTokenList';

export default function useGetTokenPrice() {
  const [tokenPriceMap, setTokenPriceMap] = useState<{
    [key: string]: {
      usd: number;
    };
  }>({});

  useEffect(() => {
    getTokenPrice();
  }, []);

  const getTokenPrice = async () => {
    const coingecko_ids = Array.from(new Set([...bitcoinAssets, ...sideAssets].map((item) => item.coingecko_id)));
    const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_ids.join(',')}`);
    const priceMap = await result.json();
    console.log(priceMap);
    setTokenPriceMap(priceMap);
  };

  return {
    tokenPriceMap
  };
}
