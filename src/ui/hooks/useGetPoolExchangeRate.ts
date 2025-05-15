import { useQuery } from 'react-query';

import services from '../services';
import { useEnvironment } from '../state/environment/hooks';

export default function useGetPoolExchangeRate({ poolId }: { poolId: string }) {
  const { sideChain } = useEnvironment();
  const { data, isLoading: loading } = useQuery({
    queryKey: ['GetPoolExchangeRate', { poolId, sideChain }],
    queryFn: async () => {
      return services.lending.getLendingPoolsExchangeRate({ pool_id: poolId }, { baseURL: sideChain.restUrl });
    },
    enabled: !!poolId
  });

  return {
    data: data?.exchange_rate || '',
    loading
  };
}
