import { useEffect, useState } from 'react';

import { IAsset } from '@/shared/types';
import services from '@/ui/services';

import { useWallet } from '../utils';
import { useCurChain, useGetUrlList } from './useEnv';
import { useGetBalanceList } from './useGetBalanceList';

export function useGetSideBalanceList(address?: string) {
  const wallet = useWallet();
  const [sideAssets, setSideAssets] = useState<IAsset[]>([]);
  const sideChain = useCurChain();
  const { UNISAT_RUNE_URL } = useGetUrlList();

  useEffect(() => {
    getSideAssets();
  }, []);

  const getSideAssets = async () => {
    try {
      const result = await services.dex.getSideAssets();
      setSideAssets(formateTokenList(result));
    } catch (err) {
      console.log(err);
    }
  };

  function formateTokenList(tokens: IAsset[]) {
    return tokens.map((token) => {
      if (token.rune) {
        return {
          ...token,
          logo: `${UNISAT_RUNE_URL}/${token.symbol}`
        };
      }
      return token;
    });
  }

  const { balanceList, refetchBalances } = useGetBalanceList({
    assets: sideAssets,
    restUrl: sideChain.restUrl,
    address
  });

  useEffect(() => {
    wallet.setSideBalanceList(balanceList);
  }, [balanceList]);

  return {
    balanceList,
    refetchBalances
  };
}
