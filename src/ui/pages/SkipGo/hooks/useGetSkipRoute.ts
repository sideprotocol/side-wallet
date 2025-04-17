import { useQuery } from 'react-query';

import { useSkipGoState } from '@/ui/state/skipGo/hook';
import { toUnitAmount } from '@/ui/utils/formatter';

import useSkipClient from './useSkipClient';

export default function useGetSkipRoute() {
  const { skipClient } = useSkipClient();

  const { sourceAsset, sourceAssetChain, destAsset, destAssetChain, amountOut, routeConfig } = useSkipGoState();

  const {
    data: skipRoute,
    isLoading,
    error
  } = useQuery({
    queryKey: [
      'getSkipRoute',
      {
        sourceAssetDenom: sourceAsset?.denom,
        sourceAssetChainId: sourceAssetChain?.chainID,
        destAssetDenom: destAsset?.denom,
        destAssetChainId: destAssetChain?.chainID,
        amountOut,
        routeConfig
      }
    ],
    queryFn: async () => {
      return skipClient!.route({
        sourceAssetDenom: sourceAsset!.denom,
        sourceAssetChainID: sourceAssetChain!.chainID,
        destAssetDenom: destAsset!.denom,
        destAssetChainID: destAssetChain!.chainID,
        amountOut: toUnitAmount(amountOut, sourceAsset!.decimals || 8),
        ...routeConfig
      });
    },
    enabled: !!skipClient && !!sourceAsset && !!sourceAssetChain && !!destAsset && !!destAssetChain && !!amountOut,
    retry: 0
  });

  return {
    skipRoute,
    isLoading,
    error
  };
}
