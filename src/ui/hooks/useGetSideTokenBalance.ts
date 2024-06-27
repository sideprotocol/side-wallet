import { useEffect, useState } from 'react';

import { SIDERPC_URL_MAINNET, SIDERPC_URL_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export default function useGetSideTokenBalance(base: string) {
  const [balanceAmount, setBalanceAmount] = useState('0');
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();

  useEffect(() => {
    getBalanceAmount();
  }, [base]);

  const getBalanceAmount = async () => {
    if (!base) return;
    const cosmwasmClient = await CosmWasmClient.connect(
      networkType === NetworkType.MAINNET ? SIDERPC_URL_MAINNET : SIDERPC_URL_TESTNET
    );
    const { amount } = await cosmwasmClient.getBalance(currentAccount.address, base);
    setBalanceAmount(amount);
  };

  return {
    balanceAmount
  };
}
