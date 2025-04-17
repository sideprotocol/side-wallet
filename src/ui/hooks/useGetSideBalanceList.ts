import { useQuery } from 'react-query';

import { UNISAT_RUNE_URL, sideChain } from '@/shared/constant';
import { IAsset } from '@/shared/types';
import services from '@/ui/services';

import { useGetBalanceList } from './useGetBalanceList';

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

export function useGetSideBalanceList(address?: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['getSideAssets'],
    queryFn: async () => {
      return services.dex.getSideAssets();
    },
    refetchInterval: 600000,
    refetchIntervalInBackground: true
  });

  const { balanceList, refetchBalances, allCoinBalances, priceMap } = useGetBalanceList({
    assets: data ? formateTokenList(data) : [],
    restUrl: sideChain.restUrl,
    address
  });

  return {
    balanceList,
    refetchBalances,
    allCoinBalances,
    priceMap,
    sideAssets: data || [],
    loading: isLoading
  };
}
