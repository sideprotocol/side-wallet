import { useEffect, useState } from 'react';

import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export default function useGetSideTokenBalance(denom: string) {
  const [balanceAmount, setBalanceAmount] = useState('0');
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    getBalanceAmount();
  }, [denom]);

  const getBalanceAmount = async () => {
    if (denom) return;
    const cosmwasmClient = await CosmWasmClient.connect(rpcUrl);
    const { amount } = await cosmwasmClient.getBalance(currentAccount.address, denom);
    setBalanceAmount(amount);
  };

  return {
    balanceAmount
  };
}
