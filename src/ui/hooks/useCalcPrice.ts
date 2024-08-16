import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { formatUnitAmount, useWallet } from '../utils';

export function useCalcPrice(balanceAmount: string, base: string, decimals?: number | string) {
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
    let amount = balanceAmount;
    if (decimals) {
      amount = formatUnitAmount(balanceAmount, decimals);
    }

    const _totalPrice = new BigNumber(amount).multipliedBy(priceMap[base] || 0).toString();
    setTotalPrice(_totalPrice);
  };
  return {
    data: totalPrice
  };
}
