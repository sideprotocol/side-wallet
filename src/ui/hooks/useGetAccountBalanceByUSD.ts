import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { useWallet } from '../utils';

export default function useGetAccountBalanceByUSD() {
  const wallet = useWallet();
  const [accountBalanceByUSD, setAccountBalanceByUSD] = useState('0');

  useEffect(() => {
    calcTotalValue();
  }, []);

  const calcTotalValue = async () => {
    try {
      const sideBalanceList = await wallet.getSideBalanceList();
      const btcBalanceList = await wallet.getBTCBalanceList();
      const initValueSide = new BigNumber(0);
      const initValueBtc = new BigNumber(0);
      const sideTotalValue = sideBalanceList.reduce((pre, cur) => {
        return pre.plus(cur.totalValue);
      }, initValueSide);
      const btcTotalValue = btcBalanceList.reduce((pre, cur) => {
        return pre.plus(cur.totalValue);
      }, initValueBtc);
      const totalValue = sideTotalValue.plus(btcTotalValue);
      setAccountBalanceByUSD(totalValue.toString());
    } catch (err) {
      console.log(err);
    }
  };

  return accountBalanceByUSD;
}
