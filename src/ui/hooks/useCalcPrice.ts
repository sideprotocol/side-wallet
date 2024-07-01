import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { formatUnitAmount, useWallet } from '../utils';

export function useCalcPrice(balanceAmount: string, coingecko_id: string, decimals: number | string = 6) {
  const wallet = useWallet();
  const [totalPrice, setTotalPrice] = useState('0');
  useEffect(() => {
    calcPrice();
  }, [balanceAmount, coingecko_id]);

  const calcPrice = async () => {
    const priceMap = await wallet.getCoingeckoPriceMap();
    const _totalPrice = new BigNumber(formatUnitAmount(balanceAmount, decimals))
      .multipliedBy(priceMap[coingecko_id].usd)
      .toString();
    setTotalPrice(_totalPrice);
  };
  return {
    data: totalPrice
  };
}
