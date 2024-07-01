import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { formatUnitAmount, useWallet } from '../utils';

export function useCalcPrice(balanceAmount: string, coingecko_id: string, decimals?: number | string) {
  const wallet = useWallet();
  const [totalPrice, setTotalPrice] = useState('0');
  useEffect(() => {
    calcPrice();
  }, [balanceAmount, coingecko_id]);

  const calcPrice = async () => {
    if (!coingecko_id) {
      return;
    }
    const priceMap = await wallet.getCoingeckoPriceMap();
    let amount = balanceAmount;
    if (decimals) {
      amount = formatUnitAmount(balanceAmount, decimals);
    }

    const _totalPrice = new BigNumber(amount).multipliedBy(priceMap[coingecko_id].usd).toString();
    setTotalPrice(_totalPrice);
  };
  return {
    data: totalPrice
  };
}
