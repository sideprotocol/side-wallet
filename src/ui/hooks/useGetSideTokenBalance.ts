import { useEffect, useState } from 'react';

import { SIDERPC_URL_MAINNET, SIDERPC_URL_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { useWallet } from '../utils';

export default function useGetSideTokenBalance(base: string) {
  const [balanceAmount, setBalanceAmount] = useState('0');
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const wallet = useWallet();

  useEffect(() => {
    getBalanceAmount();
  }, [base]);

  const getBalanceAmount = async () => {
    if (!base) return;
    const _balanceAmount = await wallet.getSideTokenBalance(base);
    setBalanceAmount(_balanceAmount);
    const cosmwasmClient = await CosmWasmClient.connect(
      networkType === NetworkType.MAINNET ? SIDERPC_URL_MAINNET : SIDERPC_URL_TESTNET
    );
    const { amount } = await cosmwasmClient.getBalance(currentAccount.address, base);
    await wallet.setSideTokenBalance(base, amount);
    setBalanceAmount(amount);
  };

  return {
    balanceAmount
  };
}
