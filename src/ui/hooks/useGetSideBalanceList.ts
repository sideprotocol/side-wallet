import { useQuery } from 'react-query';

import { IAsset } from '@/shared/types';
import services from '@/ui/services';

import { useCurChain, useGetUrlList } from './useEnv';
import { useGetBalanceList } from './useGetBalanceList';

export function useGetSideBalanceList(address?: string) {
  const sideChain = useCurChain();
  const { UNISAT_RUNE_URL } = useGetUrlList();

  const { data: sideAssets } = useQuery({
    queryKey: ['getSideAssets'],
    queryFn: async () => {
      const result = await services.dex.getSideAssets();
      return formateTokenList(result);
    }
  });

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
    assets: sideAssets || [],
    restUrl: sideChain.restUrl,
    address
  });

  return {
    balanceList,
    refetchBalances
  };
}
