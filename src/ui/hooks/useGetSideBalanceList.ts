import { useQuery } from 'react-query';

import { CHAINS_ENUM } from '@/shared/constant';
import { IAsset } from '@/shared/types';
import services from '@/ui/services';

import { useEnvironment } from '../state/environment/hooks';
import { useGetBalanceList } from './useGetBalanceList';

function formateTokenList(tokens: IAsset[], UNISAT_RUNE_URL: string) {
  return tokens.map((token) => {
    if (token.rune) {
      return {
        ...token,
        logo: `${UNISAT_RUNE_URL}/${token.symbol}`,
        chain: CHAINS_ENUM.SIDE
      };
    }

    return { ...token, chain: CHAINS_ENUM.SIDE };
  });
}

export function useGetSideBalanceList(address?: string) {
  const { UNISAT_RUNE_URL, sideChain, SERVICE_BASE_URL } = useEnvironment();
  const { data, isLoading } = useQuery({
    queryKey: ['getSideAssets', { SERVICE_BASE_URL }],
    queryFn: async () => {
      return services.dex.getSideAssets({ baseURL: SERVICE_BASE_URL });
    },
    refetchInterval: 600000,
    refetchIntervalInBackground: true
  });

  const { balanceList, refetchBalances, allCoinBalances, priceMap } = useGetBalanceList({
    assets: data ? formateTokenList(data, UNISAT_RUNE_URL) : [],
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
