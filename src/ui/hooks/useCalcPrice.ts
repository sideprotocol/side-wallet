import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { formatUnitAmount, useWallet } from '../utils';

export function useCalcPrice(balanceAmount: string, base: string, decimals?: number | string) {
  console.log('base2222: ', base);
  const wallet = useWallet();
  const [totalPrice, setTotalPrice] = useState('0');
  useEffect(() => {
    calcPrice();
  }, [balanceAmount, base]);

  const calcPrice = async () => {
    if (!base) {
      return;
    }
    const priceMap = JSON.parse(localStorage.getItem('priceMap') || '{}');
    console.log('priceMap: ', priceMap);
    let amount = balanceAmount;
    if (decimals) {
      amount = formatUnitAmount(balanceAmount, decimals);
    }

    const _totalPrice = new BigNumber(amount).multipliedBy(priceMap[base] || 0).toString();
    console.log('_totalPrice: ', _totalPrice, balanceAmount);
    setTotalPrice(_totalPrice);
  };
  return {
    data: totalPrice
  };
}
