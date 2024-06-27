import { useEffect } from 'react';

import { BITCOIN_TOKENS, SIDE_TOKENS } from '@/shared/constant';

import { useWallet } from '../utils';

export default function useGetTokenPrice() {
  const wallet = useWallet();

  useEffect(() => {
    getTokenPrice();
  }, []);

  const getTokenPrice = async () => {
    const coingecko_ids = Array.from(new Set([...BITCOIN_TOKENS, ...SIDE_TOKENS].map((item) => item.coingecko_id)));
    const result = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_ids.join(',')}&vs_currencies=usd`
    );
    const priceMap = await result.json();
    wallet.setCoingeckoPriceMap(priceMap);
  };
}
